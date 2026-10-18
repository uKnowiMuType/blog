import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { remarkWikiLink } from "./remark-wiki-link.js";

const postsDir = fileURLToPath(
	new URL("../../tests/fixtures/wiki-posts/", import.meta.url),
);

function transform(value, options) {
	const tree = {
		type: "root",
		children: [{ type: "paragraph", children: [{ type: "text", value }] }],
	};
	remarkWikiLink({ ...options, postsDir })(tree, {});
	return tree.children[0];
}

test("Wiki links use the Pages base and Astro's normalized post ID", () => {
	const paragraph = transform("参考 [[Published_Note]]", { base: "/blog/" });
	assert.equal(
		paragraph.children.find((child) => child.type === "link").url,
		"/blog/posts/papers/published_note/",
	);
});

test("standalone Wiki cards use the same published post URL", () => {
	const card = transform("[[Published_Note]]", { base: "/blog/" });
	assert.equal(card.data.hName, "a");
	assert.equal(
		card.data.hProperties.href,
		"/blog/posts/papers/published_note/",
	);
});

test("production references to drafts remain readable without broken links", () => {
	const paragraph = transform("参考 [[Draft_Note]]", {
		base: "/blog/",
		includeDrafts: false,
	});
	assert.ok(paragraph.children.every((child) => child.type === "text"));
	assert.ok(paragraph.children.at(-1).value.includes("Draft note"));
});

test("development retains draft links and their explicitly declared slugs", () => {
	const paragraph = transform("参考 [[Draft_Note]]", { includeDrafts: true });
	assert.equal(
		paragraph.children.find((child) => child.type === "link").url,
		"/posts/draft-note/",
	);
});
