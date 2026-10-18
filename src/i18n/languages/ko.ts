import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ko: Translation = {
	[Key.home]: "홈",
	[Key.about]: "소개",
	[Key.archive]: "아카이브",
	[Key.search]: "검색",
	[Key.searchNoResults]: "검색 결과가 없습니다.",
	[Key.searchError]: "검색을 사용할 수 없습니다. 다시 시도해 주세요.",
	[Key.searchTypeSomething]: "검색어를 입력하세요...",
	[Key.searchLoading]: "검색 중...",
	[Key.searchSummary]: "요약",
	[Key.searchContent]: "내용",
	[Key.searchViewMore]: "더 많은 결과 보기 ({count}개 더)",
	[Key.other]: "기타",

	// 네비게이션 메뉴 그룹
	[Key.navArticles]: "글",
	[Key.all]: "전체",

	[Key.tags]: "태그",
	[Key.categories]: "카테고리",
	[Key.allCategories]: "모든 카테고리",
	[Key.allTags]: "모든 태그",
	[Key.allSeries]: "모든 시리즈",
	[Key.recentPosts]: "최근 게시글",
	[Key.postList]: "게시글 목록",
	[Key.tableOfContents]: "목차",
	[Key.tocEmpty]: "이 페이지에는 목차가 없습니다",
	[Key.dynamic]: "일상",
	[Key.dynamicDescription]: "짧은 생각과 일상을 기록합니다.",
	[Key.dynamicEmpty]: "아직 게시된 일상이 없습니다",
	[Key.dynamicSearch]: "일상 검색...",
	[Key.dynamicNoResults]: "일치하는 일상이 없습니다",
	[Key.dynamicLoading]: "일상을 불러오는 중",
	[Key.dynamicAllYears]: "모든 연도",
	[Key.dynamicLoadMore]: "더 보기",
	[Key.dynamicBackToList]: "일상 목록으로",
	[Key.dynamicProfile]: "{name}님의 프로필 보기",
	[Key.dynamicPermalink]: "이 일상의 고유 링크",
	[Key.dynamicCollapseGallery]: "접기",
	[Key.dynamicViewOriginal]: "크게 보기",
	[Key.dynamicPreviousImage]: "이전 이미지",
	[Key.dynamicNextImage]: "다음 이미지",
	[Key.dynamicViewImage]: "이미지 {index} 보기",
	[Key.dynamicSelectImage]: "이미지 {index} 선택",

	// Announcement
	[Key.announcement]: "공지사항",
	[Key.announcementClose]: "닫기",

	[Key.comments]: "댓글",
	[Key.commentSection]: "댓글",
	[Key.commentSubtitle]: "생각을 공유하고 모두와 이야기해 보세요",
	[Key.commentNotConfigured]: "댓글 시스템이 설정되지 않았습니다",

	// 프로젝트 쇼케이스
	[Key.projects]: "프로젝트",
	[Key.projectsDescription]: "제가 개발한 프로젝트입니다",
	[Key.projectDetails]: "자세히 보기",
	[Key.projectBack]: "프로젝트 목록으로 돌아가기",
	[Key.projectEmpty]: "아직 프로젝트가 없습니다",
	[Key.projectSearch]: "프로젝트 검색",
	[Key.projectStatusPlanning]: "계획 중",
	[Key.projectStatusDeveloping]: "개발 중",
	[Key.projectStatusPublished]: "출시됨",
	[Key.projectStatusArchived]: "보관됨",
	[Key.untitled]: "제목 없음",
	[Key.uncategorized]: "미분류",
	[Key.noTags]: "태그 없음",

	[Key.wordCount]: "단어",
	[Key.wordsCount]: "단어",
	[Key.minuteCount]: "분",
	[Key.minutesCount]: "분",
	[Key.postCount]: "게시글",
	[Key.postsCount]: "게시글",
	[Key.tagsCount]: "태그",
	[Key.noData]: "데이터 없음",

	[Key.themeColor]: "테마 색상",

	[Key.lightMode]: "라이트",
	[Key.darkMode]: "다크",
	[Key.systemMode]: "시스템",

	[Key.more]: "더 보기",
	[Key.collapse]: "접기",

	[Key.author]: "작성자",
	[Key.publishedAt]: "게시일",
	[Key.updatedAt]: "수정일",
	[Key.readTime]: "읽는 시간",
	[Key.license]: "라이선스",

	// Pagination
	[Key.paginationFirst]: "처음",
	[Key.paginationPrev]: "이전",
	[Key.paginationNext]: "다음",
	[Key.paginationLast]: "마지막",
	[Key.paginationPage]: "페이지",
	[Key.paginationOf]: "/",
	[Key.paginationTotal]: ", 총",
	[Key.paginationRecords]: "개",
	[Key.paginationJump]: "지정한 페이지로 이동",

	// 404 Page
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "페이지를 찾을 수 없습니다",
	[Key.notFoundDescription]:
		"죄송합니다. 방문하신 페이지가 존재하지 않거나 이동되었습니다.",
	[Key.backToHome]: "홈으로 돌아가기",

	// Last Modified Time Card
	[Key.lastModifiedPrefix]: "마지막 업데이트: ",
	[Key.lastModifiedOutdated]: "일부 내용이 오래되었을 수 있습니다",
	[Key.lastModifiedDaysAgo]: "{days}일 전",
	[Key.year]: "년",
	[Key.month]: "월",
	[Key.day]: "일",
	[Key.hour]: "시간",
	[Key.minute]: "분",
	[Key.second]: "초",

	// Page Views Statistics
	[Key.pageViews]: "조회수",
	[Key.pageViewsLoading]: "불러오는 중...",
	[Key.pageViewsError]: "통계를 불러올 수 없습니다",

	// Pinned
	[Key.pinned]: "고정됨",

	// Related Posts
	[Key.relatedPosts]: "관련 게시글",
	[Key.randomPosts]: "무작위 게시글",
	[Key.smartRecommend]: "스마트",
	[Key.randomRecommend]: "무작위",
	[Key.noRelatedPosts]: "관련 게시글이 없습니다",
	[Key.noRandomPosts]: "무작위 게시글이 없습니다",

	// 글 시리즈
	[Key.series]: "시리즈",
	[Key.seriesPartOf]: "시리즈의 일부",
	[Key.seriesPart]: "파트 {n}",
	[Key.seriesThisArticle]: "이 글",
	[Key.noSeries]: "시리즈가 없습니다",

	// Encrypted
	[Key.postEncrypted]: "이 게시글은 암호화되어 있습니다",

	// Wallpaper Mode
	[Key.wallpaperMode]: "배경화면 모드",
	[Key.wallpaperBannerMode]: "배너 배경화면",
	[Key.wallpaperFullscreenMode]: "전체화면 배경화면",
	[Key.fullscreenLayout]: "전체화면 레이아웃",
	[Key.fullscreenClassicLayout]: "클래식",
	[Key.fullscreenHeroLayout]: "히어로",
	[Key.wallpaperOverlayMode]: "오버레이 배경화면",
	[Key.wallpaperNoneMode]: "배경화면 없음",

	// Wallpaper Settings
	[Key.wallpaperSettings]: "배경화면 설정",
	[Key.wallpaperTitle]: "홈 배경화면 제목",
	[Key.wallpaperCarousel]: "배경화면 캐러셀",
	[Key.wavesAnimation]: "파도 애니메이션",
	[Key.gradientTransition]: "그라디언트 전환",
	[Key.sakuraEffect]: "벚꽃 효과",
	[Key.effectsSettings]: "효과 설정",
	[Key.overlaySettings]: "투명도 설정",
	[Key.overlayOpacity]: "배경화면 불투명도",
	[Key.overlayBlur]: "배경 흐림",
	[Key.overlayCardOpacity]: "카드 불투명도",

	// Settings Panel Tabs
	[Key.settingsTabAppearance]: "외형",
	[Key.settingsTabWallpaper]: "배경화면",
	[Key.settingsTabEffects]: "효과",

	// 카드 스타일
	[Key.cardSettings]: "카드 스타일",
	[Key.cardBorder]: "카드 테두리와 그림자",
	[Key.cardFollowTheme]: "카드 테마 색상 따르기",

	// Post List Layout
	[Key.postListLayout]: "게시글 목록 레이아웃",
	[Key.postListLayoutList]: "목록형",
	[Key.postListLayoutGrid]: "격자형",

	[Key.shareOnSocial]: "글 공유하기",
	[Key.shareOnSocialDescription]:
		"이 글이 도움이 되셨다면 다른 사람과 공유해 주세요!",

	// Site Statistics
	[Key.siteStats]: "사이트 통계",
	[Key.siteStatsPostCount]: "게시글",
	[Key.siteStatsDynamicCount]: "일상",
	[Key.siteStatsCategoryCount]: "카테고리",
	[Key.siteStatsTagCount]: "태그",
	[Key.siteStatsTotalWords]: "총 단어 수",
	[Key.siteStatsLastUpdate]: "최근 활동",
	[Key.siteStatsDaysAgo]: "{days}일 전",
	[Key.today]: "오늘",

	// Calendar Component
	[Key.calendarSunday]: "일",
	[Key.calendarMonday]: "월",
	[Key.calendarTuesday]: "화",
	[Key.calendarWednesday]: "수",
	[Key.calendarThursday]: "목",
	[Key.calendarFriday]: "금",
	[Key.calendarSaturday]: "토",
	[Key.calendarJanuary]: "1월",
	[Key.calendarFebruary]: "2월",
	[Key.calendarMarch]: "3월",
	[Key.calendarApril]: "4월",
	[Key.calendarMay]: "5월",
	[Key.calendarJune]: "6월",
	[Key.calendarJuly]: "7월",
	[Key.calendarAugust]: "8월",
	[Key.calendarSeptember]: "9월",
	[Key.calendarOctober]: "10월",
	[Key.calendarNovember]: "11월",
	[Key.calendarDecember]: "12월",
	[Key.calendar]: "사이트 캘린더",
	[Key.calendarHeatmapWeek]: "{month}의 {week}주차, 게시글 {count}개",
	[Key.advertisement]: "광고",

	[Key.shareArticle]: "공유",
	[Key.generatingPoster]: "포스터 생성 중...",
	[Key.copied]: "복사됨",
	[Key.copyLink]: "링크 복사",
	[Key.savePoster]: "포스터 저장",
	[Key.scanToRead]: "스캔하여 읽기",

	// Code Block Collapsible Configuration
	[Key.codeCollapsibleShowMore]: "더 보기",
	[Key.codeCollapsibleShowLess]: "간략히 보기",
	[Key.codeCollapsibleExpanded]: "코드 블록 펼쳐짐",
	[Key.codeCollapsibleCollapsed]: "코드 블록 접힘",
	[Key.searchAlbums]: "앨범 검색...",

	// Password Protection
	[Key.passwordProtected]: "비밀번호로 보호됨",
	[Key.passwordProtectedDesc]:
		"이 콘텐츠는 비밀번호로 보호되어 있습니다. 보려면 비밀번호를 입력하세요.",
	[Key.passwordHint]: "힌트",
	[Key.passwordPlaceholder]: "비밀번호 입력",
	[Key.passwordSubmit]: "잠금 해제",
	[Key.passwordError]: "비밀번호가 올바르지 않습니다. 다시 시도해 주세요.",

	// 몰입형 읽기
	[Key.immersiveReading]: "몰입형 읽기",
	[Key.enterImmersiveReading]: "몰입형 읽기 시작",
	[Key.exitImmersiveReading]: "몰입형 읽기 종료",
	[Key.tocExpand]: "목차 펼치기",
	[Key.tocCollapse]: "목차 접기",
};
