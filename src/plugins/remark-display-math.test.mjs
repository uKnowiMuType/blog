import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { unified } from "@astrojs/markdown-remark";
import { fromHtml } from "hast-util-from-html";
import katex from "katex";
import "katex/dist/contrib/mhchem.mjs";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import { remarkDisplayMath } from "./remark-display-math.js";

const processor = unified({
	smartypants: false,
	remarkPlugins: [remarkMath, remarkDisplayMath],
	rehypePlugins: [rehypeKatex],
});
const renderer = await processor.createRenderer({ syntaxHighlight: false });

test("KaTeX renderer and the package supplying CSS use the same version", () => {
	const rendererRequire = createRequire(import.meta.resolve("rehype-katex"));
	const rendererKatex = rendererRequire("katex");
	assert.equal(
		katex.version,
		rendererKatex.version,
		"KaTeX markup and CSS must match so script sizes and fractions retain their layout",
	);
});

async function render(source) {
	const { code } = await renderer.render(source);
	const tree = fromHtml(code, { fragment: true });
	const elements = [];
	visit(tree, "element", (node) => {
		elements.push(node);
	});
	const byClass = (name) =>
		elements.filter((node) => node.properties.className?.includes(name));
	return { code, tree, elements, byClass };
}

test("single-line double dollars use display fractions; single dollars stay inline", async () => {
	const { byClass, elements } = await render(
		String.raw`行内 $\frac{1}{2}$，独立公式：$$\frac{1}{2}\tau^T H\tau$$`,
	);
	assert.equal(byClass("katex").length, 2);
	assert.equal(byClass("katex-display").length, 1);
	assert.deepEqual(
		elements
			.filter((node) => node.tagName === "math")
			.map((node) => node.properties.display),
		[undefined, "block"],
	);
});

test("align environments render after prose without a blank line", async () => {
	const { byClass, tree } = await render(
		String.raw`泰勒展开：
$$\begin{align*} L(x+\tau) &= L(x) + \nabla L(x)^T\tau \\ &\quad + \frac{1}{2}\tau^T H\tau \end{align*}$$`,
	);
	assert.equal(byClass("katex-error").length, 0);
	assert.equal(byClass("katex-display").length, 1);
	assert.equal(byClass("mtable").length, 1);
	assert.deepEqual(
		tree.children
			.filter((node) => node.type === "element")
			.map((node) => node.tagName),
		["p", "span"],
	);
});

test("multiple display formulas preserve surrounding prose and inline formatting", async () => {
	const { byClass, tree } = await render(
		"**之前** $$a=b$$ 中间 $x$ $$c=d$$ **之后**",
	);
	assert.equal(byClass("katex-display").length, 2);
	assert.equal(byClass("katex").length, 3);
	assert.deepEqual(
		tree.children
			.filter((node) => node.type === "element")
			.map((node) => node.tagName),
		["p", "span", "p", "span", "p"],
	);
});

test("native blocks, code samples and escaped dollars keep their meaning", async () => {
	const { byClass, code } = await render(
		"$$\n\\frac{1}{2}\n$$\n\n`$$a=b$$`\n\n```tex\n$$c=d$$\n```\n\n\\$\\$e=f\\$\\$",
	);
	assert.equal(byClass("katex-display").length, 1);
	assert.equal(byClass("katex").length, 1);
	assert.match(code, /<code>\$\$a=b\$\$<\/code>/);
	assert.match(code, /\$\$c=d\$\$/);
	assert.match(code, /\$\$e=f\$\$/);
});

test("the chemistry extension registers with the renderer's KaTeX instance", async () => {
	const { byClass } = await render(
		String.raw`$$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$`,
	);
	assert.equal(byClass("katex-error").length, 0);
	assert.equal(byClass("katex-display").length, 1);
});

test("nested lists and quotes support Windows line endings and Chinese text", async () => {
	const { byClass, elements } = await render(
		"> 中文说明：\r\n> $$\\frac{1}{2}$$\r\n\r\n- 列表 $$a=b$$ 后文\r\n- 下一项 $x$",
	);
	assert.equal(byClass("katex-display").length, 2);
	assert.equal(byClass("katex").length, 3);
	assert.equal(elements.filter((node) => node.tagName === "li").length, 2);
	assert.equal(
		elements.filter((node) => node.tagName === "blockquote").length,
		1,
	);
});

test("all GAA standalone formulas render without KaTeX errors", async () => {
	const source = await readFile(
		new URL("../content/posts/2025_GAA/GAA.md", import.meta.url),
		"utf8",
	);
	const expectedBlocks = [...source.matchAll(/^\$\$.+\$\$\s*$/gm)].length;
	const { byClass } = await render(
		source.replace(/^---\r?\n[\s\S]*?\r?\n---/, ""),
	);
	assert.ok(expectedBlocks > 0);
	assert.equal(byClass("katex-error").length, 0);
	assert.equal(byClass("katex-display").length, expectedBlocks);
});

test("Astro's MDX pipeline also renders single-line align environments", async () => {
	const mdxRenderer = await processor.createMdxRenderer(
		{ syntaxHighlight: false },
		{ srcDir: new URL("../", import.meta.url), optimize: false },
	);
	const { code } = await mdxRenderer.process(
		String.raw`行内 $x$。

$$\begin{align*} a &= \frac{1}{2} \\ &= 0.5 \end{align*}$$`,
		fileURLToPath(new URL("math-fixture.mdx", import.meta.url)),
		{},
	);
	assert.match(code, /katex-display/);
	assert.match(code, /mtable/);
	assert.doesNotMatch(code, /katex-error/);
});
