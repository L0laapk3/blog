import { base } from '$app/paths';
import type { PostData } from "$lib/post/post-data";



let _posts: Record<string, PostData> = {};
for (const [path, promise] of Object.entries(import.meta.glob("/src/routes/\\(blog\\)/**/+page.md") as Record<string, () => Promise<any>>)) {
	const mod: any = await promise();
	const urlRel = path.match(/src\/routes\/\(blog\)\/(.+)\/\+page\..*/)![1];
	const url = `${base}/${urlRel}`;
	_posts[url] = {
		...mod.metadata,
		url: url,
		urlRel: urlRel,
	};
}

export const posts = _posts;