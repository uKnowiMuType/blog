import type { SearchResult } from "../global";
import { type SearchDocument, searchDocuments } from "./search-documents";
import { url } from "./url-utils";

type Pagefind = {
	options: (options: { excerptLength: number }) => Promise<void>;
	search: (
		query: string,
	) => Promise<{ results: Array<{ data: () => Promise<SearchResult> }> }>;
};

let pagefindPromise: Promise<Pagefind> | undefined;
let documentsPromise: Promise<SearchDocument[]> | undefined;

async function loadPagefind(): Promise<Pagefind> {
	if (!pagefindPromise) {
		pagefindPromise = (async () => {
			const scriptUrl = url("/pagefind/pagefind.js");
			const pagefind: Pagefind = await import(/* @vite-ignore */ scriptUrl);
			await pagefind.options({ excerptLength: 30 });
			return pagefind;
		})().catch((error) => {
			pagefindPromise = undefined;
			throw error;
		});
	}
	return pagefindPromise;
}

async function loadDocuments(): Promise<SearchDocument[]> {
	// 开发环境每次读取最新文章，避免编辑笔记后仍搜索到旧内容。
	if (!documentsPromise || import.meta.env.DEV) {
		documentsPromise = fetch(url("/api/search-index.json"))
			.then((response) => {
				if (!response.ok) throw new Error(`Search index: ${response.status}`);
				return response.json();
			})
			.catch((error) => {
				documentsPromise = undefined;
				throw error;
			});
	}
	return documentsPromise;
}

export async function searchSite(keyword: string): Promise<SearchResult[]> {
	const query = keyword.trim();
	if (!query) return [];
	if (import.meta.env.PROD) {
		try {
			const pagefind = await loadPagefind();
			const response = await pagefind.search(query);
			return await Promise.all(response.results.map((item) => item.data()));
		} catch (error) {
			console.warn(
				"Pagefind unavailable; using the article search index.",
				error,
			);
		}
	}
	return searchDocuments(await loadDocuments(), query);
}
