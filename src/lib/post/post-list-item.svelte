<script lang="ts">
    import { type PostData, getLocaleDate } from "./post-data";
	export let post: PostData;
</script>

<li class="py-4">
	<div class="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<a href={post.url} class="mt-3 text-2xl font-bold tracking-tight text-gray-900 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent hover:cursor-pointer" data-sveltekit-preload-data="eager">
				{@html post.title}
			</a>
			<p class="mx-auto mt-2 max-w-xl text-lg text-gray-900">
				{getLocaleDate(post.date)}
			</p>
		</div>
	</div>
</li>