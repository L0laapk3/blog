<script lang="ts">
    import { type PostData, getLocaleDate } from "./post-data";
	export let title: string;
	export let date: string;
</script>

<article>
	<div class="mx-auto max-w-6xl py-16 px-4 sm:pt-24 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
				{@html title}
			</h1>
			<p class="mx-auto mt-3 max-w-xl text-xl text-gray-900">
				{getLocaleDate(date)}
			</p>
		</div>
	</div>

	<section class="w-full bg-white pb-16 px-4">
		<div class="prose max-w-4xl mx-auto text-gray-900">
			<slot/>
		</div>
	</section>
</article>
