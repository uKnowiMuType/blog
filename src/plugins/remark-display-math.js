import { SKIP, visit } from "unist-util-visit";

/** Treat $$...$$ as display math even when its delimiters share a line. */
export function remarkDisplayMath() {
	return (tree, file) => {
		const source = String(file);
		const isDisplayMath = (node) => {
			const offset = node.position?.start.offset;
			return (
				node.type === "inlineMath" &&
				typeof offset === "number" &&
				source.startsWith("$$", offset)
			);
		};

		visit(tree, "paragraph", (paragraph, index, parent) => {
			if (
				!parent ||
				index === undefined ||
				!paragraph.children.some(isDisplayMath)
			) {
				return;
			}

			const blocks = [];
			let inline = [];
			const flushParagraph = () => {
				if (inline.some((node) => node.type !== "text" || node.value.trim())) {
					const start = inline[0].position?.start;
					const end = inline[inline.length - 1].position?.end;
					blocks.push({
						...paragraph,
						children: inline,
						position: start && end ? { start, end } : paragraph.position,
					});
				}
				inline = [];
			};

			for (const node of paragraph.children) {
				if (!isDisplayMath(node)) {
					inline.push(node);
					continue;
				}

				flushParagraph();
				// Match remark-math's native block node so Markdown and MDX share
				// the same KaTeX display mode. Keep block math outside paragraphs.
				blocks.push({
					type: "math",
					meta: null,
					value: node.value,
					position: node.position,
					data: {
						hName: "pre",
						hChildren: [
							{
								type: "element",
								tagName: "code",
								properties: { className: ["language-math", "math-display"] },
								children: [{ type: "text", value: node.value }],
							},
						],
					},
				});
			}
			flushParagraph();
			parent.children.splice(index, 1, ...blocks);
			return [SKIP, index + blocks.length];
		});
	};
}
