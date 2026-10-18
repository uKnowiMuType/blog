import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ru: Translation = {
	[Key.home]: "Главная",
	[Key.about]: "О нас",
	[Key.archive]: "Архив",
	[Key.search]: "Поиск",
	[Key.searchNoResults]: "Результаты не найдены.",
	[Key.searchError]: "Поиск недоступен. Попробуйте ещё раз.",
	[Key.searchTypeSomething]: "Введите ключевое слово для поиска...",
	[Key.searchLoading]: "Поиск...",
	[Key.searchSummary]: "Резюме",
	[Key.searchContent]: "Содержание",
	[Key.searchViewMore]: "Показать еще ({count} шт)",
	[Key.other]: "Прочее",

	// Группы меню навигации
	[Key.navArticles]: "Статьи",
	[Key.all]: "Все",

	[Key.tags]: "Теги",
	[Key.categories]: "Категории",
	[Key.allCategories]: "Все категории",
	[Key.allTags]: "Все теги",
	[Key.allSeries]: "Все серии",
	[Key.recentPosts]: "Последние посты",
	[Key.postList]: "Список постов",
	[Key.tableOfContents]: "Содержание",
	[Key.tocEmpty]: "На этой странице нет оглавления",
	[Key.dynamic]: "Моменты",
	[Key.dynamicDescription]: "Короткие мысли и моменты повседневной жизни.",
	[Key.dynamicEmpty]: "Пока нет публикаций",
	[Key.dynamicSearch]: "Поиск публикаций...",
	[Key.dynamicNoResults]: "Подходящие публикации не найдены",
	[Key.dynamicLoading]: "Загрузка публикаций",
	[Key.dynamicAllYears]: "Все годы",
	[Key.dynamicLoadMore]: "Загрузить ещё",
	[Key.dynamicBackToList]: "Назад к публикациям",
	[Key.dynamicProfile]: "Открыть профиль {name}",
	[Key.dynamicPermalink]: "Постоянная ссылка на публикацию",
	[Key.dynamicCollapseGallery]: "Свернуть",
	[Key.dynamicViewOriginal]: "Открыть оригинал",
	[Key.dynamicPreviousImage]: "Предыдущее изображение",
	[Key.dynamicNextImage]: "Следующее изображение",
	[Key.dynamicViewImage]: "Открыть изображение {index}",
	[Key.dynamicSelectImage]: "Выбрать изображение {index}",

	// Объявление
	[Key.announcement]: "Объявление",
	[Key.announcementClose]: "Закрыть",

	[Key.comments]: "Комментарии",
	[Key.commentSection]: "Комментарии",
	[Key.commentSubtitle]: "Поделитесь своими мыслями и обсудите с остальными",
	[Key.commentNotConfigured]: "Система комментариев не настроена",

	// Витрина проектов
	[Key.projects]: "Проекты",
	[Key.projectsDescription]: "Мои разработанные проекты",
	[Key.projectDetails]: "Подробнее",
	[Key.projectBack]: "К списку проектов",
	[Key.projectEmpty]: "Проектов пока нет",
	[Key.projectSearch]: "Поиск проектов",
	[Key.projectStatusPlanning]: "В планах",
	[Key.projectStatusDeveloping]: "В разработке",
	[Key.projectStatusPublished]: "Опубликовано",
	[Key.projectStatusArchived]: "В архиве",
	[Key.untitled]: "Без названия",
	[Key.uncategorized]: "Без категории",
	[Key.noTags]: "Нет тегов",

	[Key.wordCount]: "слово",
	[Key.wordsCount]: "слова",
	[Key.minuteCount]: "минута",
	[Key.minutesCount]: "минуты",
	[Key.postCount]: "пост",
	[Key.postsCount]: "постов",
	[Key.tagsCount]: "тегов",
	[Key.noData]: "Нет данных",

	[Key.themeColor]: "Цвет темы",

	[Key.lightMode]: "Светлая",
	[Key.darkMode]: "Тёмная",
	[Key.systemMode]: "Система",

	[Key.more]: "Ещё",
	[Key.collapse]: "Свернуть",

	[Key.author]: "Автор",
	[Key.publishedAt]: "Опубликовано",
	[Key.updatedAt]: "Обновлено",
	[Key.readTime]: "Время чтения",
	[Key.license]: "Лицензия",

	// Пагинация
	[Key.paginationFirst]: "Первая",
	[Key.paginationPrev]: "Предыдущая",
	[Key.paginationNext]: "Следующая",
	[Key.paginationLast]: "Последняя",
	[Key.paginationPage]: "Страница",
	[Key.paginationOf]: "из",
	[Key.paginationTotal]: ", всего",
	[Key.paginationRecords]: " записей",
	[Key.paginationJump]: "Перейти к странице",

	// 404 Страница
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Страница не найдена",
	[Key.notFoundDescription]:
		"Извините, страница, которую вы посетили, не существует или была перемещена.",
	[Key.backToHome]: "Вернуться на главную",

	// Последнее изменение
	[Key.lastModifiedPrefix]: "Последнее обновление: ",
	[Key.lastModifiedOutdated]: "Некоторый контент может быть устаревшим",
	[Key.lastModifiedDaysAgo]: "{days} дней назад",
	[Key.year]: "год",
	[Key.month]: "месяц",
	[Key.day]: "день",
	[Key.hour]: "час",
	[Key.minute]: "минута",
	[Key.second]: "секунда",

	// Статистика просмотров
	[Key.pageViews]: "Просмотры",
	[Key.pageViewsLoading]: "Загрузка...",
	[Key.pageViewsError]: "Статистика недоступна",

	// Закреплено
	[Key.pinned]: "Закреплено",

	// Похожие статьи
	[Key.relatedPosts]: "Похожие статьи",
	[Key.randomPosts]: "Случайные статьи",
	[Key.smartRecommend]: "Умный",
	[Key.randomRecommend]: "Случайный",
	[Key.noRelatedPosts]: "Нет похожих статей",
	[Key.noRandomPosts]: "Нет случайных статей",

	// Серия статей
	[Key.series]: "Серии",
	[Key.seriesPartOf]: "Часть серии",
	[Key.seriesPart]: "Часть {n}",
	[Key.seriesThisArticle]: "Эта статья",
	[Key.noSeries]: "Пока нет серий",

	// Зашифровано
	[Key.postEncrypted]: "Эта статья зашифрована",

	// Режим обоев
	[Key.wallpaperMode]: "Режим обоев",
	[Key.wallpaperBannerMode]: "Баннер обои",
	[Key.wallpaperFullscreenMode]: "Полноэкранные обои",
	[Key.fullscreenLayout]: "Полноэкранный макет",
	[Key.fullscreenClassicLayout]: "Классический",
	[Key.fullscreenHeroLayout]: "Hero",
	[Key.wallpaperOverlayMode]: "Прозрачный",
	[Key.wallpaperNoneMode]: "Однотонный фон",

	// Настройки обоев
	[Key.wallpaperSettings]: "Настройки обоев",
	[Key.wallpaperTitle]: "Заголовок главных обоев",
	[Key.wallpaperCarousel]: "Карусель обоев",
	[Key.wavesAnimation]: "Анимация волн",
	[Key.gradientTransition]: "Градиентный переход",
	[Key.sakuraEffect]: "Эффект сакуры",
	[Key.effectsSettings]: "Настройки эффектов",
	[Key.overlaySettings]: "Настройки прозрачности",
	[Key.overlayOpacity]: "Прозрачность обоев",
	[Key.overlayBlur]: "Размытие фона",
	[Key.overlayCardOpacity]: "Прозрачность карточек",

	// Вкладки панели настроек
	[Key.settingsTabAppearance]: "Оформление",
	[Key.settingsTabWallpaper]: "Обои",
	[Key.settingsTabEffects]: "Эффекты",

	// Стиль карточек
	[Key.cardSettings]: "Стиль карточек",
	[Key.cardBorder]: "Рамка и тень карточек",
	[Key.cardFollowTheme]: "Карточки跟随主题色",

	// Макет списка сообщений
	[Key.postListLayout]: "Макет списка сообщений",
	[Key.postListLayoutList]: "Список",
	[Key.postListLayoutGrid]: "Сетка",

	[Key.shareOnSocial]: "Поделиться статьей",
	[Key.shareOnSocialDescription]:
		"Если эта статья помогла вам, пожалуйста, поделитесь ею с другими!",

	// Статистика сайта
	[Key.siteStats]: "Статистика сайта",
	[Key.siteStatsPostCount]: "Статьи",
	[Key.siteStatsDynamicCount]: "Публикации",
	[Key.siteStatsCategoryCount]: "Категории",
	[Key.siteStatsTagCount]: "Теги",
	[Key.siteStatsTotalWords]: "Всего слов",
	[Key.siteStatsLastUpdate]: "Последняя активность",
	[Key.siteStatsDaysAgo]: "{days} дней назад",
	[Key.today]: "Сегодня",

	// Компонент календаря
	[Key.calendarSunday]: "Вс",
	[Key.calendarMonday]: "Пн",
	[Key.calendarTuesday]: "Вт",
	[Key.calendarWednesday]: "Ср",
	[Key.calendarThursday]: "Чт",
	[Key.calendarFriday]: "Пт",
	[Key.calendarSaturday]: "Сб",
	[Key.calendarJanuary]: "Янв",
	[Key.calendarFebruary]: "Фев",
	[Key.calendarMarch]: "Мар",
	[Key.calendarApril]: "Апр",
	[Key.calendarMay]: "Май",
	[Key.calendarJune]: "Июн",
	[Key.calendarJuly]: "Июл",
	[Key.calendarAugust]: "Авг",
	[Key.calendarSeptember]: "Сен",
	[Key.calendarOctober]: "Окт",
	[Key.calendarNovember]: "Ноя",
	[Key.calendarDecember]: "Дек",
	[Key.calendar]: "Календарь сайта",
	[Key.calendarHeatmapWeek]: "Неделя {week} {month}, {count} записей",
	[Key.advertisement]: "Реклама",

	[Key.shareArticle]: "Поделиться",
	[Key.generatingPoster]: "Создание постера...",
	[Key.copied]: "Скопировано",
	[Key.copyLink]: "Копировать ссылку",
	[Key.savePoster]: "Сохранить постер",
	[Key.scanToRead]: "Сканируйте, чтобы прочитать",

	// Конфигурация блоков коллапсируемого кода
	[Key.codeCollapsibleShowMore]: "Развернуть",
	[Key.codeCollapsibleShowLess]: "Свернуть",
	[Key.codeCollapsibleExpanded]: "Блок кода развернут",
	[Key.codeCollapsibleCollapsed]: "Блок кода свернут",
	[Key.searchAlbums]: "Поиск альбомов...",

	// Защита паролем
	[Key.passwordProtected]: "Защищено паролем",
	[Key.passwordProtectedDesc]:
		"Этот контент защищён паролем. Пожалуйста, введите пароль для просмотра.",
	[Key.passwordHint]: "Подсказка",
	[Key.passwordPlaceholder]: "Введите пароль",
	[Key.passwordSubmit]: "Разблокировать",
	[Key.passwordError]: "Неверный пароль, попробуйте снова.",

	// Чтение без отвлечений
	[Key.immersiveReading]: "Чтение без отвлечений",
	[Key.enterImmersiveReading]: "Войти в режим чтения",
	[Key.exitImmersiveReading]: "Выйти из режима чтения",
	[Key.tocExpand]: "Развернуть оглавление",
	[Key.tocCollapse]: "Свернуть оглавление",
};
