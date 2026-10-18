import Key from "../i18nKey";
import type { Translation } from "../translation";

export const zh_CN: Translation = {
	[Key.home]: "主页",
	[Key.about]: "关于我",
	[Key.archive]: "归档",
	[Key.search]: "搜索",
	[Key.searchNoResults]: "找不到相关结果。",
	[Key.searchError]: "搜索暂时不可用，请重试。",
	[Key.searchTypeSomething]: "请输入搜索关键词。",
	[Key.searchLoading]: "正在搜索...",
	[Key.searchSummary]: "摘要",
	[Key.searchContent]: "内容",
	[Key.searchViewMore]: "查看更多结果 ({count} 个更多)",
	[Key.other]: "其他",

	// 导航栏菜单分组
	[Key.navArticles]: "文章",
	[Key.all]: "全部",

	[Key.tags]: "标签",
	[Key.categories]: "分类",
	[Key.allCategories]: "全部分类",
	[Key.allTags]: "全部标签",
	[Key.allSeries]: "全部系列",
	[Key.recentPosts]: "最新文章",
	[Key.postList]: "文章列表",
	[Key.tableOfContents]: "文章目录",
	[Key.tocEmpty]: "当前页面没有目录",
	[Key.dynamic]: "动态",
	[Key.dynamicDescription]: "随手记下此刻的想法与日常。",
	[Key.dynamicEmpty]: "还没有发布动态",
	[Key.dynamicSearch]: "搜索动态...",
	[Key.dynamicNoResults]: "没有找到匹配的动态",
	[Key.dynamicLoading]: "正在加载动态",
	[Key.dynamicAllYears]: "全部年份",
	[Key.dynamicLoadMore]: "加载更多",
	[Key.dynamicBackToList]: "返回动态列表",
	[Key.dynamicProfile]: "查看 {name} 的资料",
	[Key.dynamicPermalink]: "此动态的固定链接",
	[Key.dynamicCollapseGallery]: "收起",
	[Key.dynamicViewOriginal]: "查看大图",
	[Key.dynamicPreviousImage]: "上一张图片",
	[Key.dynamicNextImage]: "下一张图片",
	[Key.dynamicViewImage]: "查看图片 {index}",
	[Key.dynamicSelectImage]: "切换到图片 {index}",

	// 公告栏
	[Key.announcement]: "公告",
	[Key.announcementClose]: "关闭",

	[Key.comments]: "评论",
	[Key.commentSection]: "评论区",
	[Key.commentSubtitle]: "分享你的想法，与大家交流讨论",
	[Key.commentNotConfigured]: "评论系统暂未配置",

	// 项目展示页
	[Key.projects]: "项目",
	[Key.projectsDescription]: "这里展示我开发过的项目",
	[Key.projectDetails]: "查看详情",
	[Key.projectBack]: "返回项目列表",
	[Key.projectEmpty]: "暂无项目",
	[Key.projectSearch]: "搜索项目",
	[Key.projectStatusPlanning]: "计划中",
	[Key.projectStatusDeveloping]: "开发中",
	[Key.projectStatusPublished]: "已发布",
	[Key.projectStatusArchived]: "已归档",
	[Key.untitled]: "无标题",
	[Key.uncategorized]: "未分类",
	[Key.noTags]: "无标签",

	[Key.wordCount]: "字",
	[Key.wordsCount]: "字",
	[Key.minuteCount]: "分钟",
	[Key.minutesCount]: "分钟",
	[Key.postCount]: "篇文章",
	[Key.postsCount]: "篇文章",
	[Key.tagsCount]: "个标签",
	[Key.noData]: "暂无数据",

	[Key.themeColor]: "主题色相",

	[Key.lightMode]: "亮色",
	[Key.darkMode]: "暗色",
	[Key.systemMode]: "跟随系统",

	[Key.more]: "更多",
	[Key.collapse]: "收起",

	[Key.author]: "作者",
	[Key.publishedAt]: "发布于",
	[Key.updatedAt]: "更新于",
	[Key.readTime]: "阅读时长",
	[Key.license]: "许可协议",

	// 分页
	[Key.paginationFirst]: "首页",
	[Key.paginationPrev]: "上一页",
	[Key.paginationNext]: "下一页",
	[Key.paginationLast]: "末页",
	[Key.paginationPage]: "第",
	[Key.paginationOf]: "页，共",
	[Key.paginationTotal]: "页，总计",
	[Key.paginationRecords]: "条记录",
	[Key.paginationJump]: "跳转到指定页",

	// 404页面
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "页面未找到",
	[Key.notFoundDescription]: "抱歉，您访问的页面不存在或已被移动。",
	[Key.backToHome]: "返回首页",

	//最后编辑时间卡片
	[Key.lastModifiedPrefix]: "最后更新于 ",
	[Key.lastModifiedOutdated]: "部分内容可能已过时",
	[Key.lastModifiedDaysAgo]: "距今已过 {days} 天",
	[Key.year]: "年",
	[Key.month]: "月",
	[Key.day]: "日",
	[Key.hour]: "时",
	[Key.minute]: "分",
	[Key.second]: "秒",

	// 访问量统计
	[Key.pageViews]: "浏览量",
	[Key.pageViewsLoading]: "加载中...",
	[Key.pageViewsError]: "统计不可用",

	// 置顶
	[Key.pinned]: "置顶",

	// 相关文章推荐
	[Key.relatedPosts]: "相关文章",
	[Key.randomPosts]: "随机文章",
	[Key.smartRecommend]: "智能推荐",
	[Key.randomRecommend]: "随机推荐",
	[Key.noRelatedPosts]: "暂无相关文章",
	[Key.noRandomPosts]: "暂无随机文章",

	// 文章系列
	[Key.series]: "系列",
	[Key.seriesPartOf]: "所属系列",
	[Key.seriesPart]: "第 {n} 篇",
	[Key.seriesThisArticle]: "本文",
	[Key.noSeries]: "暂无系列",

	// 加密
	[Key.postEncrypted]: "本文已加密",

	// 壁纸模式
	[Key.wallpaperMode]: "壁纸模式",
	[Key.wallpaperBannerMode]: "横幅壁纸",
	[Key.wallpaperFullscreenMode]: "全屏壁纸",
	[Key.fullscreenLayout]: "全屏布局",
	[Key.fullscreenClassicLayout]: "经典模式",
	[Key.fullscreenHeroLayout]: "Hero 模式",
	[Key.wallpaperOverlayMode]: "覆盖透明",
	[Key.wallpaperNoneMode]: "纯色背景",

	// 壁纸设置
	[Key.wallpaperSettings]: "壁纸设置",
	[Key.wallpaperTitle]: "首页壁纸标题",
	[Key.wallpaperCarousel]: "壁纸轮播",
	[Key.wavesAnimation]: "水波纹动画",
	[Key.gradientTransition]: "渐变过渡",
	[Key.sakuraEffect]: "樱花特效",
	[Key.effectsSettings]: "特效设置",
	[Key.overlaySettings]: "透明设置",
	[Key.overlayOpacity]: "壁纸透明度",
	[Key.overlayBlur]: "背景模糊度",
	[Key.overlayCardOpacity]: "卡片透明度",

	// 设置面板标签
	[Key.settingsTabAppearance]: "外观",
	[Key.settingsTabWallpaper]: "壁纸",
	[Key.settingsTabEffects]: "特效",

	// 卡片样式
	[Key.cardSettings]: "卡片样式",
	[Key.cardBorder]: "卡片边框和阴影",
	[Key.cardFollowTheme]: "卡片跟随主题色",

	// 文章布局
	[Key.postListLayout]: "文章布局",
	[Key.postListLayoutList]: "列表",
	[Key.postListLayoutGrid]: "网格",

	[Key.shareOnSocial]: "文章分享",
	[Key.shareOnSocialDescription]: "如果这篇文章对你有帮助，欢迎分享给更多人！",

	// 站点统计
	[Key.siteStats]: "站点统计",
	[Key.siteStatsPostCount]: "文章",
	[Key.siteStatsDynamicCount]: "动态",
	[Key.siteStatsCategoryCount]: "分类",
	[Key.siteStatsTagCount]: "标签",
	[Key.siteStatsTotalWords]: "总字数",
	[Key.siteStatsLastUpdate]: "最后活动",
	[Key.siteStatsDaysAgo]: "{days} 天前",
	[Key.today]: "今天",

	// 日历组件
	[Key.calendarSunday]: "日",
	[Key.calendarMonday]: "一",
	[Key.calendarTuesday]: "二",
	[Key.calendarWednesday]: "三",
	[Key.calendarThursday]: "四",
	[Key.calendarFriday]: "五",
	[Key.calendarSaturday]: "六",
	[Key.calendarJanuary]: "1月",
	[Key.calendarFebruary]: "2月",
	[Key.calendarMarch]: "3月",
	[Key.calendarApril]: "4月",
	[Key.calendarMay]: "5月",
	[Key.calendarJune]: "6月",
	[Key.calendarJuly]: "7月",
	[Key.calendarAugust]: "8月",
	[Key.calendarSeptember]: "9月",
	[Key.calendarOctober]: "10月",
	[Key.calendarNovember]: "11月",
	[Key.calendarDecember]: "12月",
	[Key.calendar]: "站点日历",
	[Key.calendarHeatmapWeek]: "{month}月第{week}周，{count}篇文章",
	[Key.advertisement]: "广告",

	[Key.shareArticle]: "分享",
	[Key.generatingPoster]: "海报生成中...",
	[Key.copied]: "已复制",
	[Key.copyLink]: "复制链接",
	[Key.savePoster]: "保存海报",
	[Key.scanToRead]: "扫码阅读文章",

	// 代码块折叠配置
	[Key.codeCollapsibleShowMore]: "展开",
	[Key.codeCollapsibleShowLess]: "收起",
	[Key.codeCollapsibleExpanded]: "代码块已展开",
	[Key.codeCollapsibleCollapsed]: "代码块已折叠",
	[Key.searchAlbums]: "搜索相簿...",

	// 密码保护
	[Key.passwordProtected]: "密码保护",
	[Key.passwordProtectedDesc]: "此内容已被密码保护，请输入密码查看。",
	[Key.passwordHint]: "提示",
	[Key.passwordPlaceholder]: "请输入密码",
	[Key.passwordSubmit]: "解锁",
	[Key.passwordError]: "密码错误，请重试。",

	// 沉浸阅读
	[Key.immersiveReading]: "沉浸阅读",
	[Key.enterImmersiveReading]: "进入沉浸阅读",
	[Key.exitImmersiveReading]: "退出沉浸阅读",
	[Key.tocExpand]: "展开目录",
	[Key.tocCollapse]: "折叠目录",
};
