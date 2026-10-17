# 个人博客身份信息修改清单

检查日期：2026-10-17。项目目录：`E:/webblog/Firefly`。

本次已删除 RSS、Atom 订阅页面和 XML 源、相关入口、最新动态侧边栏组件、站点信息侧边栏组件，以及专用配置、翻译和依赖。打赏页面、配置、样式、收款码、菜单入口、文章底部打赏按钮和 `.github/FUNDING.yml` 也已删除。相册和书签导航模块（含页面、配置、样式和示例资源）已删除，顶部导航已整理为“主页、文章、项目、关于我”，不再使用“我的”分组。文章分享、独立的“动态”页面与“站点统计”组件继续使用原配置。底部 Astro 开发工具栏已通过 `E:/webblog/Firefly/astro.config.mjs` 中的 `devToolbar.enabled: false` 关闭。

顶部“链接”“社交”“我的”分组和 Firefly Blog 标题已删除，友链与留言页面、配置、示例内容及专用样式也已删除。左侧新增透明猫头图标，源文件为 `E:/webblog/Firefly/src/assets/images/logo/cat-head.png`（1254 × 1254 RGBA PNG），导航以 48 CSS 像素等比例显示，并生成 1×、2×、3×、4× 的无损 PNG。该图标也用于分享海报和结构化数据。首页横幅、个人资料均只保留 `https://github.com/uKnowiMuType`，已移除邮箱展示和专用处理分支。搜索已改为真实文章全文检索，本地预览包含草稿，正式构建仍排除草稿。

背景视频和音乐播放器模块均已删除：包括导航播放按钮、侧边栏音乐组件、全局播放管理、播放事件、专用配置、类型、翻译和示例音乐资源。图片壁纸继续使用原配置。站点统计已删除“运行时长”、运行天数计算及开始日期配置，保留文章、分类、标签、总字数和最后活动。

其余身份信息目前仅做检查，以下旧值仍需要由你填写或替换。

猫头旁的导航标题会自动显示为 `profileConfig.name + “’s blog”`。用户名只需修改 `E:/webblog/Firefly/src/config/profileConfig.ts` 中的 `name`，导航栏、个人资料、页脚和默认文章作者会同步读取；正式网站重新构建部署后生效。

## 现在会显示或影响部署的信息

| 修改位置 | 当前内容 | 修改什么、影响哪里 |
| --- | --- | --- |
| `E:/webblog/Firefly/src/config/siteConfig.ts` → `title`、`subtitle`、`description`、`keywords` | Firefly、Demo site、模板介绍及关键词 | 博客名称、浏览器标题、搜索引擎摘要与分享信息。 |
| 同上 → `site_url` | `https://uknowimutype.github.io` | GitHub Pages 站点域名；影响 canonical、站点地图和分享链接。 |
| `E:/webblog/Firefly/astro.config.mjs` → `base` | 开发为 `/`，正式构建为 `/blog/` | 本地开发地址保持不变，正式网站发布到 GitHub Pages 项目子目录。 |
| `E:/webblog/Firefly/src/config/siteConfig.ts` → `navbar.logo`、`favicon` | 透明猫头 Logo；favicon 为 `/favicon/favicon.png` | 导航栏、分享海报与结构化数据中的站点 Logo、浏览器标签图标；猫头图标的导航渲染位于 `Navbar.astro`。 |
| `E:/webblog/Firefly/src/config/profileConfig.ts` → `avatar`、`bio`、`links` | `assets/images/preview.jpg`、Hello！、个人 GitHub | 侧边栏个人资料。`name` 已改为 `uKnowiMyourType`，GitHub 链接已改为 `uKnowiMuType`，邮箱已移除。 |
| `E:/webblog/Firefly/src/config/backgroundWallpaper.ts` → `common.homeText` | Welcome to my blog!、英文副标题、个人 GitHub | 首页横幅文案和 GitHub 入口；GitHub 已统一为 `uKnowiMuType`。 |
| `E:/webblog/Firefly/src/content/spec/about.md` | “你好！我是夏叶”、模板介绍及演示地址 | 关于我页面的个人介绍。 |

## 其他示例内容与尚未启用的账号配置

| 修改位置 | 当前状态／内容 | 如何处理 |
| --- | --- | --- |
| `E:/webblog/Firefly/src/config/commentConfig.ts` | 当前 `type: "none"`；Giscus 指向 `CuteLeaf/Firefly`，其他评论服务也有示例地址 | 启用评论前，填写自己的服务地址，或整组替换 Giscus 的 `repo`、`repoId`、`categoryId`；Disqus 的 `shortname` 仍是 `firefly`。 |
| `E:/webblog/Firefly/src/config/dynamicConfig.ts` → `memos` | 当前关闭；`parent: "users/xiaye"`，示例实例地址 | 使用 Memos 数据源时，填写自己的实例和用户标识。 |
| `E:/webblog/Firefly/src/config/siteConfig.ts` → `bilibili`、`bangumi`、`vndb`、`mal` | 对应页面目前关闭，保留了示例账号和 MAL Client ID | 启用这些页面时换成自己的账号及应用配置。 |
| `E:/webblog/Firefly/src/content/projects/` | 仍有 Firefly、example-project 示例项目 | 换成自己的论文复现或安全研究项目，或删除不需要的示例。 |
| `E:/webblog/Firefly/src/content/dynamic/` | 仍有模板演示动态 | 独立“动态”页面仍启用，按需替换内容。 |
| `E:/webblog/Firefly/src/config/sidebarConfig.ts` → 广告项 | 广告目前关闭，但保留了模板推广链接 | 若启用广告，先换成自己的内容。 |
| `E:/webblog/Firefly/.github/ISSUE_TEMPLATE/`、`E:/webblog/Firefly/.github/pull_request_template.md` | 仍有 CuteLeaf 指派人和上游贡献链接 | 如使用本仓库的 Issues／PR 模板，改为自己的维护者与说明。 |

## 已由个人资料配置统一控制的信息

页脚版权名、页面作者、默认文章作者和分享海报作者会读取 `profileConfig.name`。文章 frontmatter 中的 `author` 可以单独覆盖文章作者。

`E:/webblog/Firefly/src/config/FooterConfig.html` 目前只有注释，额外页脚文字可在这里添加。

Git 远程仓库已是 `https://github.com/uKnowiMuType/blog.git`。头像路径目前为 `assets/images/preview.jpg`；Logo、背景图和 favicon 可以从上面对应配置替换。

页脚的 “Powered by Astro & Firefly”、代码作者注释以及许可证中的 CuteLeaf 是框架和主题来源署名，不是博客作者资料。本次保留这些来源信息。

## 项目清理

已根据页面入口、导入关系、配置、动态资源加载和构建脚本核对，删除 14 个未使用文件（约 2.37 MiB）：旧的 `DropdownPanel.svelte`、`DynamicItem.astro`、`widget/SpineModel.astro`，旧 PlantUML 渲染脚本、PhotoSwipe 和滚动条样式、两个未引用的工具函数文件、旧文章隔离脚本、未使用的 Marked/Highlight 静态脚本及配套样式、模板头像，以及重复的 `public/favicon/cat-head.png`。

高清猫头源图保留在 `E:/webblog/Firefly/src/assets/images/logo/cat-head.png`；文章、草稿、文章附件、个人背景图、当前头像和 favicon 均保留。已清理 30 条失效的图片缓存记录、7 个空目录、32 个历史检查日志和临时备份。仍被配置或动态导入使用的资源、MDX 组件、公式与搜索回归测试、部署文件和依赖锁文件继续保留。

清理后 `pnpm check`、`pnpm type-check`、`pnpm build` 和 17 项公式／搜索回归测试均通过；生成 33 个页面，234 个内容文件的 SHA-256 校验值保持一致。

## 壁纸窗口适配

`E:/webblog/Firefly/src/components/layout/WallpaperSection.astro` 的图片选择和断点监听现统一使用 `(min-width: 64rem)`，与 Tailwind 的 `lg:` 样式一致。旧脚本使用固定 `1024px`，浏览器默认字号较大时会加载被 CSS 隐藏的图片组，造成窄窗口只显示底色。单图及多图模式均已修正；窗口缩放跨过断点时，会按需加载新显示的图片组。

已新增 6 项断点回归测试，覆盖 16px／20px 默认字号及来回切换。连同原有公式、搜索测试共 23 项通过，代码检查、类型检查和构建通过；已在 390、1000、1168、1280、1366 像素窗口宽度下核对图片选择与显示。

## GitHub Pages 部署

源代码仓库：`https://github.com/uKnowiMuType/blog`。线上地址：`https://uknowimutype.github.io/blog/`。

`.github/workflows/deploy.yml` 在推送到 `main` 或手动运行时执行：安装锁定的依赖、代码与类型检查、27 项回归测试、完整构建、上传静态产物并部署到 GitHub Pages。运行环境为 Node.js 24、pnpm 11.22.0；Pages 使用 GitHub Actions 构建模式。

本地继续运行 `pnpm dev`，正式部署运行 `pnpm build`；修改完成后提交并推送到 `main` 即会自动更新网站。文章的 `draft` 状态保持不变，正式网页排除草稿。
