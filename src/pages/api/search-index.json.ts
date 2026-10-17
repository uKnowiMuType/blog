import { getSortedPosts } from "@/utils/content-utils";
import { createSearchDocument } from "@/utils/search-index";
import { getPostUrlBySlug } from "@/utils/url-utils";

export async function GET(): Promise<Response> {
	// 与文章列表使用相同的草稿筛选规则：开发时可见，正式构建时排除。
	const posts = await getSortedPosts();
	const documents = posts.map((post) =>
		createSearchDocument({
			url: getPostUrlBySlug(post.id),
			title: post.data.title,
			description: post.data.description,
			keywords: [...post.data.tags, post.data.category || ""].join(" "),
			body: post.body,
			password: post.data.password,
		}),
	);
	return Response.json(documents);
}
