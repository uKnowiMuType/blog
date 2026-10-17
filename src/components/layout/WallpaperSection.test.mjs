import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";

const component = readFileSync(
	new URL("./WallpaperSection.astro", import.meta.url),
	"utf8",
);
const scripts = [
	...component.matchAll(
		/<script is:inline data-swup-ignore-script>([\s\S]*?)<\/script>/g,
	),
].map((match) => match[1]);

function classList(names) {
	const values = new Set(names.split(" "));
	return {
		contains: (name) => values.has(name),
		add: (...items) => {
			for (const item of items) values.add(item);
		},
		remove: (...items) => {
			for (const item of items) values.delete(item);
		},
	};
}

// Run the real inline scripts with a CSS viewport whose initial font can differ
// from 16px. At 20px, lg: starts at 1280px, so 1180px must load mobile images.
function createViewport(mode, initialWidth, initialFontSize = 20) {
	let width = initialWidth;
	const queries = [];
	const slides = ["mobile", "desktop"].flatMap((device) =>
		Array.from({ length: mode === "carousel" ? 2 : 1 }, (_, index) => {
			const slide = {
				device,
				style: {},
				classList: classList(
					`${device === "mobile" ? "block lg:hidden" : "hidden lg:block"}${index === 0 ? " active" : ""}`,
				),
				image: null,
				placeholder: null,
			};
			slide.template = {
				content: {
					cloneNode: () => {
						const image = {
							complete: true,
							naturalWidth: 1000,
							style: {},
							classList: classList("opacity-0"),
							setAttribute() {},
						};
						const placeholder = { style: {}, classList: classList("") };
						return {
							querySelector: (selector) =>
								selector === "img" ? image : placeholder,
							image,
							placeholder,
						};
					},
				},
				remove: () => {
					slide.template = null;
				},
			};
			slide.querySelector = (selector) =>
				selector === "template"
					? slide.template
					: selector === "img"
						? slide.image
						: slide.placeholder;
			slide.appendChild = (fragment) => {
				slide.image = fragment.image;
				slide.placeholder = fragment.placeholder;
			};
			return slide;
		}),
	);
	const container = {
		dataset: { carouselEnabled: "false", carouselSwitchable: "false" },
		querySelectorAll: () => slides,
	};
	const window = {
		get innerWidth() {
			return width;
		},
		addEventListener() {},
		matchMedia: (query) => {
			const [, value, unit] = /min-width:\s*([\d.]+)(px|rem)/.exec(query);
			const threshold = Number(value) * (unit === "rem" ? initialFontSize : 1);
			const media = {
				get matches() {
					return width >= threshold;
				},
				listeners: [],
				addEventListener: (_event, listener) => media.listeners.push(listener),
			};
			queries.push(media);
			return media;
		},
	};
	const document = {
		getElementById: () => container,
		addEventListener() {},
	};
	runInNewContext(scripts[mode === "carousel" ? 0 : 1], {
		window,
		document,
		requestAnimationFrame: (callback) => callback(),
	});
	return {
		slides,
		resize(nextWidth) {
			const previous = queries.map((query) => query.matches);
			width = nextWidth;
			queries.forEach((query, index) => {
				if (query.matches !== previous[index]) {
					for (const listener of query.listeners) listener();
				}
			});
		},
		visibleImage() {
			const device = width >= 64 * initialFontSize ? "desktop" : "mobile";
			const visible = slides.filter(
				(slide) =>
					slide.device === device &&
					(mode === "single" || slide.classList.contains("active")),
			);
			assert.equal(visible.length, 1);
			assert.ok(visible[0].image, `${device} wallpaper must be materialized`);
			assert.equal(visible[0].image.style.opacity, "1");
			return visible[0];
		},
	};
}

for (const mode of ["carousel", "single"]) {
	test(`${mode}: loads the CSS-visible image with a larger browser font`, () => {
		const viewport = createViewport(mode, 1180);
		assert.equal(viewport.visibleImage().device, "mobile");
		assert.ok(
			viewport.slides
				.filter((slide) => slide.device === "desktop")
				.every((slide) => slide.image === null),
		);
	});

	test(`${mode}: resizing across the rem breakpoint loads both groups on demand`, () => {
		const viewport = createViewport(mode, 1400);
		const desktop = viewport.visibleImage().image;
		viewport.resize(1180);
		const mobile = viewport.visibleImage().image;
		viewport.resize(390);
		assert.equal(viewport.visibleImage().image, mobile);
		viewport.resize(1400);
		assert.equal(viewport.visibleImage().image, desktop);
	});

	test(`${mode}: keeps the default 16px font breakpoint working`, () => {
		const viewport = createViewport(mode, 1024, 16);
		assert.equal(viewport.visibleImage().device, "desktop");
		viewport.resize(1023);
		assert.equal(viewport.visibleImage().device, "mobile");
	});
}
