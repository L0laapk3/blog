export const posts = await Promise.all(
	Object.entries(import.meta.glob("/src/routes/\\(blog\\)/(**)/+page.*"))
		.map(async ([path, promise]) => {
			const mod: any = await promise();
			return {
				...mod.metadata,
				url: path.match(/src\/routes\/\(blog\)\/(.+)\/\+page\..*/)![1],
			};
		})
);