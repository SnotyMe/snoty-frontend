<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import ThemeSwitch from "$lib/components/theme/ThemeSwitch.svelte";
    import type { PageServerData } from "./$types";
    import { MAX_COOKIE_AGE } from "$lib/utils/cookie_utils";
    import IconCopy from "lucide-svelte/icons/copy";
    import { copyToClipboard } from "$lib/utils/utils";
    import { getTheming, getToaster, setColorScheme } from "$lib/context/layout_context.svelte";

    const {
        data
    }: {
        data: PageServerData;
    } = $props();

    function setTheme(theme: string) {
        document.cookie = `theme=${theme}; path=/; max-age=${MAX_COOKIE_AGE}`;
        document.body.setAttribute("data-theme", theme);
    }

    function toggleColorScheme() {
        const isItDarkNow = document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
        const colorScheme = isItDarkNow ? "dark" : "light";
        setColorScheme(colorScheme)
        document.cookie = `colorScheme=${colorScheme}; path=/; max-age=${MAX_COOKIE_AGE}`;
    }

    const toast = getToaster();

    function copyUserId() {
        copyToClipboard(data.user.id);
        toast.create({
            title: "Copied User ID",
            description: "Your User ID was successfully copied to the clipboard!",
            type: "success"
        });
    }
</script>

<style>
    @reference "../../app.css";

    #settings-wrapper > div {
        @apply space-y-2;
    }
</style>

<Page pageName="Settings">
    <div id="settings-wrapper" class="flex flex-col justify-center text-center gap-4">
        <div>
            <h2 class="h2">Theme</h2>
            <ThemeSwitch currentTheme={data.theme} {setTheme} currentColorScheme={getTheming()?.colorScheme} {toggleColorScheme}/>
        </div>
        <div>
            <h2 class="h2">Developer Options</h2>
            <button class="btn preset-filled" onclick={copyUserId}><IconCopy/> Copy User ID</button>
        </div>
    </div>
</Page>
