---
title: 'Solving Former <em>fast</em>'
description: 'A high-level view of features and pricing from the newest and best online text to speech generators on the market'
date: '2024-11-30'
featured: true
---

<script>
	import { base } from '$app/paths';
</script>

## Introduction

I was recently challenged to try to solve a game called "[Former](https://www.nrk.no/spill/former-1.17105310)". There have been some others who achieved some success using heuristic approaches in parallel to my attempt, but I wanted to go big and exhaustively *prove* that the found solution is optimal.

<video src="former/former.mp4" autoplay muted loop></video>

NRK's "Former" is a daily puzzle game with a 7x9 grid where you clear the board by clicking on shapes to remove them and any connected shapes of the same color. The game uses four colors, and when shapes are removed, remaining blocks fall due to gravity, filling in gaps. The goal is to remove all shapes using the fewest moves possible in the shared daily puzzle. Thank you bing copilot for the explanation, now lets move on.

An initial guess for the number of states does not bode well: There are 33 groups to click at the start, and the optimal solution is 13 moves. If we assume that the number of available moves decreases linearly each move, this means that there would be about 1e15 states. Despite that, I went ahead with a brute force method hoping I could close the gap with algorithmic tricks.

## Basic algorithm
### State layout
Choosing how to store a state is one of those things where the right answer is never clear until you've tried all contenders. But changing layout often requires rewriting most code so if you don't have forever you just have to make a guess.

Either way, the cell count of 63 makes me happy since it fits nicely in an uint64 when storing 1 bit per cell.
I opted to store the state in a total of 3 U64's, and assign each of the 63 cells to a specific bit index. This way I can use bitwise operations on the entire board at once.
The first two U64's together form a 2 bit number representing 1 of 4 colors. The third U64 is used as a mask storing which cells are occupied and which are empty. Initially I opted store the cells in a row-major order, meaning that the bottom row is stored in the lsb. But I soon switched to a column-major order instead, such that minus operations can be used to make column masks (more on this later).

<img src="former/bit_order.png"/>

```cpp
struct Board {
	U64 occupied;
	std::array<U64, 2> color;
};
```

### Search
Based on previous experiences I opted to implement a iterative deepening depth-first search to not get bogged down by memory accesses.

To iterate through the valid moves, an arbitrary cell is selected from the valid moves bitboard. (Since I want to exhaustively prove no solutions of sol_depth - 1 exist, move ordering doesn't matter so much) Unfortunately a loop is then needed to floodfill and find connected cells. I try to precompute as much as possible: before iterating over moves, I computer for each direction which cells are the same color as their neighbor. Comparing cells to eachother is a bit funky with the 1 bit per cell format, requiring multiple xor operations. masks are used to prevent the last bit from one row/column from interacting with the first bit of the next row/column. When flood filling down, the occupied bit does not need to be checked as gravity enforces that cells below occupied cells are always occupied.

```cpp
U64 leftSame  = occupied & ~((types[0] << HEIGHT) ^ types[0]) & ~((types[1] << HEIGHT) ^ types[1]) & ~MASK_LEFT;
U64 rightSame = occupied & ~((types[0] >> HEIGHT) ^ types[0]) & ~((types[1] >> HEIGHT) ^ types[1]) & ~MASK_RIGHT;
U64 upSame    = occupied & ~((types[0] << 1     ) ^ types[0]) & ~((types[1] << 1     ) ^ types[1]) & ~MASK_BOTTOM;
U64 downSame  =            ~((types[0] >> 1     ) ^ types[0]) & ~((types[1] >> 1     ) ^ types[1]) & ~MASK_TOP;
```

the floodfill loop grows `move` by adding all direct neighbors of the same color each iteration, until `move` stops changing. Performance profiling showed that it is beneficial to do 2 floodfill steps at a time.
```
while (validMoves) {
	U64 move = bits & -bits;
	U64 lastMove;
	do {
		for (size_t i = 0; i < 2; i++) { // unroll 2 iterations at a time to make branch predictor happy
			lastMove = move;
			move |= ((move << HEIGHT) & leftSame) | ((move >> HEIGHT) & rightSame) | ((move << 1) & upSame) | ((move >> 1) & downSame);
		}
	} while (lastMove != move);
	validMoves &= ~move;
	
	// process the move
	...
}
```

### Gravity
Here is where things get fun. The x86 instruction set has many flaws, but now I saw an opportunity to use my favorite one: parallel bit deposition.

<img src="../pdep.gif"/>
