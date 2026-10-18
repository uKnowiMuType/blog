import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ja: Translation = {
	[Key.home]: "ホーム",
	[Key.about]: "について",
	[Key.archive]: "アーカイブ",
	[Key.search]: "検索",
	[Key.searchNoResults]: "結果が見つかりません。",
	[Key.searchError]: "検索を利用できません。もう一度お試しください。",
	[Key.searchTypeSomething]: "検索キーワードを入力してください。",
	[Key.searchLoading]: "検索中...",
	[Key.searchSummary]: "摘要",
	[Key.searchContent]: "内容",
	[Key.searchViewMore]: "さらに結果を表示 ({count} 件)",
	[Key.other]: "その他",

	// ナビバーメニューグループ
	[Key.navArticles]: "記事",
	[Key.all]: "すべて",

	[Key.tags]: "タグ",
	[Key.categories]: "カテゴリ",
	[Key.allCategories]: "すべてのカテゴリ",
	[Key.allTags]: "すべてのタグ",
	[Key.allSeries]: "すべてのシリーズ",
	[Key.recentPosts]: "最近の投稿",
	[Key.postList]: "投稿リスト",
	[Key.tableOfContents]: "目次",
	[Key.tocEmpty]: "このページには目次がありません",
	[Key.dynamic]: "つぶやき",
	[Key.dynamicDescription]: "日々の短い思いや出来事を記録します。",
	[Key.dynamicEmpty]: "まだ投稿がありません",
	[Key.dynamicSearch]: "投稿を検索...",
	[Key.dynamicNoResults]: "一致する投稿がありません",
	[Key.dynamicLoading]: "投稿を読み込んでいます",
	[Key.dynamicAllYears]: "すべての年",
	[Key.dynamicLoadMore]: "さらに読み込む",
	[Key.dynamicBackToList]: "投稿一覧へ戻る",
	[Key.dynamicProfile]: "{name}のプロフィールを見る",
	[Key.dynamicPermalink]: "この投稿への固定リンク",
	[Key.dynamicCollapseGallery]: "閉じる",
	[Key.dynamicViewOriginal]: "拡大表示",
	[Key.dynamicPreviousImage]: "前の画像",
	[Key.dynamicNextImage]: "次の画像",
	[Key.dynamicViewImage]: "画像 {index} を表示",
	[Key.dynamicSelectImage]: "画像 {index} に切り替え",

	// お知らせ
	[Key.announcement]: "お知らせ",
	[Key.announcementClose]: "閉じる",

	[Key.comments]: "コメント",
	[Key.commentSection]: "コメント欄",
	[Key.commentSubtitle]: "あなたの考えを共有し、みんなと議論しましょう",
	[Key.commentNotConfigured]: "コメントシステムが設定されていません",

	// プロジェクト展示ページ
	[Key.projects]: "プロジェクト",
	[Key.projectsDescription]: "私が開発したプロジェクトです",
	[Key.projectDetails]: "詳細を見る",
	[Key.projectBack]: "プロジェクト一覧へ戻る",
	[Key.projectEmpty]: "プロジェクトはまだありません",
	[Key.projectSearch]: "プロジェクトを検索",
	[Key.projectStatusPlanning]: "計画中",
	[Key.projectStatusDeveloping]: "開発中",
	[Key.projectStatusPublished]: "公開済み",
	[Key.projectStatusArchived]: "アーカイブ",
	[Key.untitled]: "無題",
	[Key.uncategorized]: "未分類",
	[Key.noTags]: "タグなし",

	[Key.wordCount]: "語",
	[Key.wordsCount]: "語",
	[Key.minuteCount]: "分",
	[Key.minutesCount]: "分",
	[Key.postCount]: "投稿",
	[Key.postsCount]: "投稿",
	[Key.tagsCount]: "タグ",
	[Key.noData]: "データなし",

	[Key.themeColor]: "テーマカラー",

	[Key.lightMode]: "ライト",
	[Key.darkMode]: "ダーク",
	[Key.systemMode]: "システム",

	[Key.more]: "もっと",
	[Key.collapse]: "折りたたむ",

	[Key.author]: "著者",
	[Key.publishedAt]: "公開日",
	[Key.updatedAt]: "更新日",
	[Key.readTime]: "読了時間",
	[Key.license]: "ライセンス",

	// ページネーション
	[Key.paginationFirst]: "最初",
	[Key.paginationPrev]: "前へ",
	[Key.paginationNext]: "次へ",
	[Key.paginationLast]: "最後",
	[Key.paginationPage]: "",
	[Key.paginationOf]: "ページ、全",
	[Key.paginationTotal]: "ページ、合計",
	[Key.paginationRecords]: "件",
	[Key.paginationJump]: "指定ページへ移動",

	// 404ページ
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "ページが見つかりません",
	[Key.notFoundDescription]:
		"申し訳ありませんが、アクセスしたページは存在しないか、移動されています。",
	[Key.backToHome]: "ホームに戻る",

	// 最終更新時間カード
	[Key.lastModifiedPrefix]: "最終更新日：",
	[Key.lastModifiedOutdated]: "一部の内容が古くなっている可能性があります",
	[Key.lastModifiedDaysAgo]: "{days}日前",
	[Key.year]: "年",
	[Key.month]: "月",
	[Key.day]: "日",
	[Key.hour]: "時",
	[Key.minute]: "分",
	[Key.second]: "秒",

	// ページビュー統計
	[Key.pageViews]: "閲覧数",
	[Key.pageViewsLoading]: "読み込み中...",
	[Key.pageViewsError]: "統計利用不可",

	// ピン留め
	[Key.pinned]: "ピン留め",

	// 関連記事
	[Key.relatedPosts]: "関連記事",
	[Key.randomPosts]: "ランダム記事",
	[Key.smartRecommend]: "スマート",
	[Key.randomRecommend]: "ランダム",
	[Key.noRelatedPosts]: "関連記事がありません",
	[Key.noRandomPosts]: "ランダム記事がありません",

	// 記事シリーズ
	[Key.series]: "シリーズ",
	[Key.seriesPartOf]: "シリーズの一部",
	[Key.seriesPart]: "パート {n}",
	[Key.seriesThisArticle]: "この記事",
	[Key.noSeries]: "シリーズはありません",

	// 暗号化
	[Key.postEncrypted]: "この記事は暗号化されています",

	// 壁紙モード
	[Key.wallpaperMode]: "壁紙モード",
	[Key.wallpaperBannerMode]: "バナー壁紙",
	[Key.wallpaperFullscreenMode]: "フルスクリーン壁紙",
	[Key.fullscreenLayout]: "フルスクリーンレイアウト",
	[Key.fullscreenClassicLayout]: "クラシック",
	[Key.fullscreenHeroLayout]: "ヒーロー",
	[Key.wallpaperOverlayMode]: "透明",
	[Key.wallpaperNoneMode]: "単色背景",

	// 壁紙設定
	[Key.wallpaperSettings]: "壁紙設定",
	[Key.wallpaperTitle]: "ホーム壁紙タイトル",
	[Key.wallpaperCarousel]: "壁紙カルーセル",
	[Key.wavesAnimation]: "波アニメーション",
	[Key.gradientTransition]: "グラデーション遷移",
	[Key.sakuraEffect]: "桜エフェクト",
	[Key.effectsSettings]: "エフェクト設定",
	[Key.overlaySettings]: "透明設定",
	[Key.overlayOpacity]: "壁紙の透明度",
	[Key.overlayBlur]: "背景ぼかし",
	[Key.overlayCardOpacity]: "カード透明度",

	// 設定パネルタブ
	[Key.settingsTabAppearance]: "外観",
	[Key.settingsTabWallpaper]: "壁紙",
	[Key.settingsTabEffects]: "エフェクト",

	// カードスタイル
	[Key.cardSettings]: "カードスタイル",
	[Key.cardBorder]: "カードのボーダーと影",
	[Key.cardFollowTheme]: "カードのテーマカラー追随",

	// 投稿リストレイアウト
	[Key.postListLayout]: "投稿リストレイアウト",
	[Key.postListLayoutList]: "リスト",
	[Key.postListLayoutGrid]: "グリッド",

	[Key.shareOnSocial]: "記事を共有",
	[Key.shareOnSocialDescription]:
		"この記事が役に立ったなら、ぜひ他の人と共有してください！",

	// サイト統計
	[Key.siteStats]: "サイト統計",
	[Key.siteStatsPostCount]: "記事",
	[Key.siteStatsDynamicCount]: "投稿",
	[Key.siteStatsCategoryCount]: "カテゴリー",
	[Key.siteStatsTagCount]: "タグ",
	[Key.siteStatsTotalWords]: "総文字数",
	[Key.siteStatsLastUpdate]: "最終活動",
	[Key.siteStatsDaysAgo]: "{days} 日前",
	[Key.today]: "今日",

	// カレンダーコンポーネント
	[Key.calendarSunday]: "日",
	[Key.calendarMonday]: "月",
	[Key.calendarTuesday]: "火",
	[Key.calendarWednesday]: "水",
	[Key.calendarThursday]: "木",
	[Key.calendarFriday]: "金",
	[Key.calendarSaturday]: "土",
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
	[Key.calendar]: "サイトカレンダー",
	[Key.calendarHeatmapWeek]: "{month}月第{week}週、{count}記事",
	[Key.advertisement]: "広告",

	[Key.shareArticle]: "共有",
	[Key.generatingPoster]: "ポスター生成中...",
	[Key.copied]: "コピーしました",
	[Key.copyLink]: "リンクをコピー",
	[Key.savePoster]: "ポスターを保存",
	[Key.scanToRead]: "QRコードで読む",

	// コードブロック折りたたみ設定
	[Key.codeCollapsibleShowMore]: "展開する",
	[Key.codeCollapsibleShowLess]: "折りたたむ",
	[Key.codeCollapsibleExpanded]: "コードブロックが展開されました",
	[Key.codeCollapsibleCollapsed]: "コードブロックが折りたたまれました",
	[Key.searchAlbums]: "アルバムを検索...",

	// パスワード保護
	[Key.passwordProtected]: "パスワード保護",
	[Key.passwordProtectedDesc]:
		"このコンテンツはパスワードで保護されています。表示するにはパスワードを入力してください。",
	[Key.passwordHint]: "ヒント",
	[Key.passwordPlaceholder]: "パスワードを入力",
	[Key.passwordSubmit]: "ロック解除",
	[Key.passwordError]: "パスワードが間違っています。もう一度お試しください。",

	// 没入型リーディング
	[Key.immersiveReading]: "没入型リーディング",
	[Key.enterImmersiveReading]: "没入型リーディングに入る",
	[Key.exitImmersiveReading]: "没入型リーディングを終了する",
	[Key.tocExpand]: "目錄を開く",
	[Key.tocCollapse]: "目錄をたたむ",
};
