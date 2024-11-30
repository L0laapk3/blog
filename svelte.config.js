import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			layout: './src/lib/post/post.svelte',
		}),
	],
	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/blog' : '',
		},
	}
};

export default config;
