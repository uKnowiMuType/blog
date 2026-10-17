import type { SearchResult } from "../global";

export type SearchDocument = {
	url: string;
	title: string;
	description: string;
	keywords: string;
	content: string;
};

function escapeHtml(value: string): string {
	const entities: Record<string, string> = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	};
	return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function highlight(value: string, terms: string[]): string {
	const pattern = terms
		.toSorted((a, b) => b.length - a.length)
		.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		.join("|");
	const matches = value.matchAll(new RegExp(pattern, "gi"));
	let result = "";
	let offset = 0;
	for (const match of matches) {
		result += escapeHtml(value.slice(offset, match.index));
		result += `<mark>${escapeHtml(match[0])}</mark>`;
		offset = match.index + match[0].length;
	}
	return result + escapeHtml(value.slice(offset));
}

function excerpt(document: SearchDocument, terms: string[]): string {
	const text = document.content || document.description || document.keywords;
	const lowerText = text.toLowerCase();
	const positions = terms
		.map((term) => lowerText.indexOf(term))
		.filter((position) => position >= 0);
	const firstMatch = positions.length ? Math.min(...positions) : 0;
	const start = Math.max(0, firstMatch - 60);
	const end = Math.min(text.length, Math.max(start + 180, firstMatch + 80));
	return `${start ? "…" : ""}${highlight(text.slice(start, end), terms)}${end < text.length ? "…" : ""}`;
}

/** 本地预览和 Pagefind 加载失败时使用同一份文章全文索引。 */
export function searchDocuments(
	documents: SearchDocument[],
	query: string,
): SearchResult[] {
	const terms = [...new Set(query.trim().toLowerCase().split(/\s+/))].filter(
		Boolean,
	);
	if (!terms.length) return [];

	return documents
		.map((document) => {
			const title = document.title.toLowerCase();
			const keywords = document.keywords.toLowerCase();
			const searchable =
				`${title} ${keywords} ${document.description} ${document.content}`.toLowerCase();
			const score = terms.every((term) => searchable.includes(term))
				? terms.reduce(
						(total, term) =>
							total +
							(title.includes(term) ? 40 : keywords.includes(term) ? 10 : 1),
						0,
					)
				: 0;
			return { document, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.map(({ document }) => ({
			url: document.url,
			meta: { title: document.title },
			excerpt: excerpt(document, terms),
		}));
}
