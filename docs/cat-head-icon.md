# 猫头图标

使用内置 image_gen 图像编辑工具，从用户提供的橘猫照片提取猫头；原照片中被截断的耳尖按现有毛色补全。输出为真实透明背景，未使用 CLI 或第三方抠图服务。

- 高清源文件：`E:/webblog/Firefly/src/assets/images/logo/cat-head.png`，1254 × 1254，RGBA PNG。
- 导航渲染：`E:/webblog/Firefly/src/components/layout/Navbar.astro`，48 CSS 像素，等比例显示，不裁切。
- Astro 为 1×、2×、3×、4× 屏幕生成 48、96、144、192 像素的无损 PNG；高清原文件仍保留在项目中。
- 站点 Logo 配置：`E:/webblog/Firefly/src/config/siteConfig.ts`，同步供分享海报和结构化数据使用。

实际使用的提示词：

> Use case: background-extraction. Asset type: high-resolution transparent PNG cat-head icon for a personal blog navigation bar. Edit target: the supplied orange tabby cat photograph. Carefully extract only this exact cat's complete head, including both ears, all facial fur, rounded cheeks, chin, and delicate whiskers. Remove the entire background, body, chest, legs and tail; end naturally just under the chin. Preserve this specific cat's expression, large olive-yellow eyes, pink nose, orange tabby stripe pattern, original photographic texture and perspective. Do not redraw as a cartoon, stylize, smooth away fur, change the face or sharpen with halos. The ear tips are clipped slightly by the source photo's top edge: minimally reconstruct only the missing tip outlines so both ears are fully contained, matching the existing fur and anatomy. Center the complete isolated head on a generous square transparent canvas at high resolution, ideally 1024x1024 or greater, with a small clear margin around all ears and whiskers. The head should occupy most of the canvas, suitable for legible display at 48 CSS pixels. Require genuine alpha transparency with clean antialiased fur edges, no white background, no checkerboard baked in, no outline, no badge, no border, no drop shadow, no text or watermark.
