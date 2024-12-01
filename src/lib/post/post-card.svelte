<script lang="ts">
    import { type PostData, getLocaleDate } from "./post-data";
	export let post: PostData;
</script>

<div class="flex flex-col overflow-hidden rounded-lg shadow-lg border border-gray-200">
	<div class="flex flex-1 flex-col justify-between bg-white p-6">
		<div class="flex-1">
			<a href={post.url} class="mt-2 block">
				<p class="text-2xl font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent hover:cursor-pointer" data-sveltekit-preload-data="eager">
					{@html post.title}
				</p>
				<p class="mt-3 text-base text-gray-500">
					{@html post.description}
				</p>
			</a>
		</div>
		<div class="mt-6 flex flex-col justify-center">
			<div class="flex space-x-1 text-sm text-gray-500">
				<span>{getLocaleDate(post.date)}</span>
			</div>
		</div>
	</div>
</div>