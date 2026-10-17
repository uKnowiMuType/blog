<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { navigateToPage } from "@utils/navigation-utils";
import { onMount } from "svelte";
import Icon from "@/components/common/Icon.svelte";
import type { SearchResult } from "@/global";
import { FLOATING_PANEL_CLOSE_EVENT } from "@/utils/floating-panel-utils";
import { searchSite } from "@/utils/search-client";
import { getSearchUrl } from "@/utils/url-utils";

// 桌面和手机共用关键词，切换屏幕宽度时保留当前搜索。
let keyword = "";
let result: SearchResult[] = [];
let isSearching = false;
let searchFailed = false;
let mounted = false;
let debounceTimer: ReturnType<typeof setTimeout>;
let searchRequestId = 0;

const togglePanel = (): void => {
	document.getElementById("search-panel")?.classList.toggle("float-panel-closed");
};

const setPanelVisibility = (show: boolean): void => {
	document.getElementById("search-panel")?.classList.toggle("float-panel-closed", !show);
};

const handleDesktopFocus = (event: FocusEvent): void => {
	const input = event.currentTarget;
	if (input instanceof HTMLElement && input.hasAttribute("data-floating-panel-focus-return")) return;
	setPanelVisibility(true);
	search(keyword);
};

const cancelPendingSearch = (): void => {
	clearTimeout(debounceTimer);
	searchRequestId += 1;
	isSearching = false;
};

const handleResultClick = (event: MouseEvent, destination: string): void => {
	if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
	event.preventDefault();
	cancelPendingSearch();
	setPanelVisibility(false);
	keyword = "";
	result = [];
	navigateToPage(destination);
};

const handleSearchKeydown = (event: KeyboardEvent): void => {
	if (event.key !== "Enter" || event.isComposing || !keyword.trim()) return;
	event.preventDefault();
	const destination = getSearchUrl(keyword);
	cancelPendingSearch();
	setPanelVisibility(false);
	keyword = "";
	result = [];
	navigateToPage(destination);
};

const search = (value: string): void => {
	cancelPendingSearch();
	searchFailed = false;
	result = [];
	if (!value.trim()) return;

	setPanelVisibility(true);
	isSearching = true;
	const requestId = searchRequestId;
	debounceTimer = setTimeout(async () => {
		try {
			const searchResults = await searchSite(value);
			if (requestId === searchRequestId) result = searchResults;
		} catch (error) {
			if (requestId !== searchRequestId) return;
			console.error("Search error:", error);
			searchFailed = true;
		} finally {
			if (requestId === searchRequestId) isSearching = false;
		}
	}, 300);
};

onMount(() => {
	mounted = true;
	const panel = document.getElementById("search-panel");
	panel?.addEventListener(FLOATING_PANEL_CLOSE_EVENT, cancelPendingSearch);
	return () => {
		panel?.removeEventListener(FLOATING_PANEL_CLOSE_EVENT, cancelPendingSearch);
		cancelPendingSearch();
	};
});

$: if (mounted) search(keyword);
</script>

<!-- search bar for desktop view -->
<div id="search-bar" class="hidden lg:flex relative shrink-0 transition-all items-center h-11 rounded-lg
      bg-black/4 hover:bg-black/6 focus-within:bg-black/6
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
">
    <Icon icon="material-symbols:search"
          class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"></Icon>
    <input id="search-input-desktop" placeholder="{i18n(I18nKey.search)}" bind:value={keyword}
           type="search" aria-label={i18n(I18nKey.search)}
           aria-controls="search-panel" data-floating-panel-no-expanded
           on:focus={handleDesktopFocus}
           on:keydown={handleSearchKeydown}
           class="transition-all pl-10 text-sm bg-transparent outline-0
         h-full w-36 xl:w-40 2xl:w-44 text-black/50 dark:text-white/50"
    >
</div>

<!-- toggle btn for phone/tablet view -->
<button on:click={togglePanel} aria-label="Search Panel" aria-controls="search-panel" aria-expanded="false" id="search-switch"
		class="btn-plain scale-animation lg:hidden! rounded-lg w-11 h-11 active:scale-90">
    <Icon icon="material-symbols:search" class="text-[1.25rem]"></Icon>
</button>

<!-- search panel -->
<div id="search-panel" class="float-panel float-panel-closed search-panel absolute md:w-120
top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2"
     data-floating-panel data-floating-panel-trigger="search-switch search-input-desktop" inert aria-hidden="true">

    <!-- search bar inside panel for phone/tablet -->
    <div id="search-bar-inside" class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
      bg-black/4 hover:bg-black/6 focus-within:bg-black/6
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
  ">
        <Icon icon="material-symbols:search"
              class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"></Icon>
        <input placeholder={i18n(I18nKey.search)} bind:value={keyword}
               id="search-input-mobile"
               type="search" aria-label={i18n(I18nKey.search)}
               on:keydown={handleSearchKeydown}
               class="pl-10 absolute inset-0 text-sm bg-transparent outline-0
               focus:w-60 text-black/50 dark:text-white/50"
        >
    </div>

    <!-- search results -->
    <div aria-live="polite" aria-busy={isSearching}>
    {#if isSearching}
        <div class="transition first-of-type:mt-2 lg:first-of-type:mt-0 block rounded-xl text-lg px-3 py-2 text-50">
            {i18n(I18nKey.searchLoading)}
        </div>
    {:else if result.length > 0}
        {#each result.slice(0, 5) as item}
            <a href={item.url}
               on:click={(e) => handleResultClick(e, item.url)}
               class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
           rounded-xl text-lg px-3 py-2 hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active)">
                <div class="transition text-90 inline-flex font-bold group-hover:text-(--primary)">
                    {item.meta.title}
                    <Icon icon="fa7-solid:chevron-right"
                          class="transition text-[0.75rem] translate-x-1 my-auto text-(--primary)"></Icon>
                </div>
                {#if item.excerpt}
                    <div class="transition text-sm text-50" style="display: flex; align-items: flex-start; margin-top: 0.1rem">
                        <div>
                            {@html item.excerpt}
                        </div>
                    </div>
                {/if}

                {#if item.content && item.content.includes('<mark>')}
                    <div class="transition text-sm text-30" style="display: flex; align-items: flex-start; margin-top: 0.1rem">
                        <span style="display: inline-block; background-color: var(--btn-plain-bg-active); color: var(--primary); padding: 0.1em 0.4em; border-radius: 5px; font-size: 0.75em; font-weight: 600; margin-right: 0.5em; shrink: 0;">
                            {i18n(I18nKey.searchContent)}
                        </span>
                        <div>
                            {@html item.content}
                        </div>
                    </div>
                {/if}
            </a>
        {/each}
        {#if result.length > 5}
            <a href={getSearchUrl(keyword)}
               on:click={(e) => handleResultClick(e, getSearchUrl(keyword))}
               class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active) text-(--primary) font-bold text-center">
                <span class="inline-flex items-center">
                    {i18n(I18nKey.searchViewMore).replace('{count}', (result.length - 5).toString())}
                    <Icon icon="fa7-solid:arrow-right" class="transition text-[0.75rem] ml-1"></Icon>
                </span>
            </a>
        {/if}
    {:else if searchFailed}
        <div role="status" class="px-3 py-2 text-50">
            {i18n(I18nKey.searchError)}
        </div>
    {:else if keyword.trim()}
        <div class="transition first-of-type:mt-2 lg:first-of-type:mt-0 block rounded-xl text-lg px-3 py-2 text-50">
            {i18n(I18nKey.searchNoResults)}
        </div>
    {:else}
        <div class="transition first-of-type:mt-2 lg:first-of-type:mt-0 block rounded-xl text-lg px-3 py-2 text-50">
            {i18n(I18nKey.searchTypeSomething)}
        </div>
    {/if}
    </div>
</div>

<style>
    input:focus {
        outline: 0;
    }

    .search-panel {
        max-height: calc(100vh - 100px);
        overflow-y: auto;
    }
</style>
