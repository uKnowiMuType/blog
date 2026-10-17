import type { Element, Root, Text } from "hast";
import { fromHtml } from "hast-util-from-html";
import { marked } from "marked";
import type { SearchDocument } from "./search-documents";

type SearchDocumentInput = Omit<SearchDocument, "content"> & {
	body?: string;
	password?: string;
};

function textContent(node: Root | Element | Text): string {
	if (node.type === "text") return node.value;
	if (
		node.type === "element" &&
		["script", "style", "svg"].includes(node.tagName)
	) {
		return "";
	}
	return node.children
		.map((child) =>
			child.type === "text" || child.type === "element"
				? textContent(child)
				: "",
		)
		.join(" ");
}

export function createSearchDocument(
	input: SearchDocumentInput,
): SearchDocument {
	const { body, password, ...metadata } = input;
	// 加密文章只检索公开元数据，正文不能写进静态 JSON。
	const html = password ? "" : marked.parse(body || "", { async: false });
	const content = textContent(fromHtml(html, { fragment: true }))
		.replace(/\s+/g, " ")
		.trim();
	return { ...metadata, content };
}
