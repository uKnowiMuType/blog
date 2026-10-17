import assert from "node:assert/strict";
import test from "node:test";
import { type SearchDocument, searchDocuments } from "./search-documents";
import { createSearchDocument } from "./search-index";

const documents: SearchDocument[] = [
	{
		url: "/blog/posts/gaa/",
		title: "GAA 论文阅读笔记",
		description: "对抗攻击方法",
		keywords: "论文阅读 网络安全",
		content: "通过替代间隙损失提高迁移攻击的成功率。",
	},
	{
		url: "/blog/posts/pgn/",
		title: "PGN",
		description: "另一篇论文",
		keywords: "对抗攻击",
		content: "这篇方法与 GAA 进行比较，包含 C++ 示例。",
	},
];

test("matches Chinese body text and retains the article URL and highlight", () => {
	const [result] = searchDocuments(documents, "替代间隙");
	assert.equal(result.url, "/blog/posts/gaa/");
	assert.ok(result.excerpt.includes("<mark>替代间隙</mark>"));
});

test("matches titles without case sensitivity and ranks title before body", () => {
	assert.deepEqual(
		searchDocuments(documents, "  gaa  ").map((result) => result.meta.title),
		["GAA 论文阅读笔记", "PGN"],
	);
});

test("matches metadata and requires all words in a multi-word query", () => {
	assert.equal(searchDocuments(documents, "网络安全 成功率").length, 1);
	assert.equal(searchDocuments(documents, "网络安全 PGN").length, 0);
});

test("handles whitespace and unmatched searches without fake results", () => {
	assert.deepEqual(searchDocuments(documents, "  "), []);
	assert.deepEqual(searchDocuments(documents, "不存在的词"), []);
});

test("treats regexp characters in a query literally", () => {
	assert.ok(
		searchDocuments(documents, "C++")[0].excerpt.includes("<mark>C++</mark>"),
	);
	assert.deepEqual(searchDocuments(documents, ".*"), []);
});

test("escapes article HTML before adding highlight markup", () => {
	const result = searchDocuments(
		[
			{
				...documents[0],
				content: '<img src=x onerror="alert(1)"> GAA & attack',
			},
		],
		"GAA",
	)[0];
	assert.ok(result.excerpt.includes("&lt;img"));
	assert.ok(result.excerpt.includes("&amp;"));
	assert.ok(result.excerpt.includes("<mark>GAA</mark>"));
	assert.ok(!result.excerpt.includes("<img"));
});

test("extracts Markdown text and skips scripts and styles", () => {
	const document = createSearchDocument({
		...documents[0],
		body: "## 标题\n\n**网络安全**与[论文](https://example.com)\n<script>hiddenScript</script><style>hiddenStyle</style>",
	});
	assert.equal(document.content, "标题 网络安全 与 论文");
});

test("never puts encrypted article body into a searchable document", () => {
	const document = createSearchDocument({
		...documents[0],
		password: "secret",
		body: "私密正文 hiddenContent",
	});
	assert.equal(document.content, "");
	assert.deepEqual(searchDocuments([document], "hiddenContent"), []);
	assert.equal(searchDocuments([document], "GAA").length, 1);
});
