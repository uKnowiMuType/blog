import assert from "node:assert/strict";
import test from "node:test";
import { remarkWikiLink } from "./remark-wiki-link.js";

function transform(value, options) {
	const tree = {
		type: "root",
		children: [{ type: "paragraph", children: [{ type: "text", value }] }],
	};
	remarkWikiLink(options)(tree, {});
	return tree.children[0];
}

test("Wiki links use the Pages base and Astro's normalized post ID", () => {
	const paragraph = transform("参考 [[2024_TPA]]", { base: "/blog/" });
	assert.equal(
		paragraph.children.find((child) => child.type === "link").url,
		"/blog/posts/adversarial-attacks/2024_tpa/2024_tpa/",
	);
});

test("standalone Wiki cards use the same published post URL", () => {
	const card = transform("[[2024_TPA]]", { base: "/blog/" });
	assert.equal(card.data.hName, "a");
	assert.equal(
		card.data.hProperties.href,
		"/blog/posts/adversarial-attacks/2024_tpa/2024_tpa/",
	);
});

test("production references to drafts remain readable without broken links", () => {
	const paragraph = transform("参考 [[2023_PGN]]", {
		base: "/blog/",
		includeDrafts: false,
	});
	assert.ok(paragraph.children.every((child) => child.type === "text"));
	assert.ok(paragraph.children.at(-1).value.includes("PGN"));
});

test("development retains draft links and their explicitly declared slugs", () => {
	const paragraph = transform("参考 [[2023_PGN]]", { includeDrafts: true });
	assert.equal(
		paragraph.children.find((child) => child.type === "link").url,
		"/posts/pgn/",
	);
});
