// src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';
import { posts } from '$lib/server/posts.constant';

export const load: PageServerLoad = async () => {
    return {
        posts: posts
    };
};