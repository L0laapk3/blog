<script lang="ts">
	import PostCard from './post-card.svelte';
	import PostListItem from './post-list-item.svelte';
	import type { PageData } from './$types';

    export let data: PageData;

	const featuredPosts = data.posts.filter((post) => post.featured);
	const otherPosts = data.posts.filter((post) => !post.featured);
</script>

<div class="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div class="relative mx-auto max-w-7xl">
		<div class="text-center">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				From the blog
			</h1>
		</div>
		<div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
			{#each featuredPosts as { url, title, description, date }}
				<PostCard {url} {title} {description} {date} />
			{/each}
		</div>

		<!-- Lists -->
		<ul class="divide-y divide-gray-200">
			{#each otherPosts as { url, title, description, date }}
				<PostListItem {url} {title} {description} {date} />
			{/each}
		</ul>
	</div>
</div>