import type { PageServerLoad } from './$types';
import { posts } from '$lib/server/postList.constant';

export const load: PageServerLoad = async () => {
	return {
		posts: posts
	};
};