---
title: 'Solving Former <em>fast</em>'
description: 'A high-level view of features and pricing from the newest and best online text to speech generators on the market'
date: '2024-11-30'
featured: true
---

## Introduction

I was recently challenged to try to solve a game called "[Former](https://www.nrk.no/spill/former-1.17105310)". There have been some others who achieved some success using heuristic approaches in parallel to my attempt, but I wanted to go big and *prove* that the found solution is optimal.

<video src="former/former.mp4" autoplay muted loop></video>

NRK's "Former" is a daily puzzle game with a 7x9 grid where you clear the board by clicking on shapes to remove them and any connected shapes of the same color. The game uses four colors, and when shapes are removed, remaining blocks fall due to gravity, filling in gaps. The goal is to remove all shapes using the fewest moves possible in the shared daily puzzle. Thank you bing copilot for the explanation, now lets move on.

An initial guess for the number of states does not bode well: There are 33 groups to click at the start, and the optimal solution is 13 moves. If we assume that the number of available moves decreases linearly each move, this means that there would be about 1e15 states. Despite that, I went ahead with a brute force method hoping I could close the gap with algorithmic tricks.

## Basic algorithm
