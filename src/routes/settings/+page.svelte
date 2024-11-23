<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import ThemeSwitch from "$lib/components/theme/ThemeSwitch.svelte";
    import type { PageServerData } from "./$types";

    const {
        data
    }: {
        data: PageServerData;
    } = $props();

    function setTheme(theme: string) {
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;
        document.body.setAttribute("data-theme", theme)
    }

    function toggleColorScheme() {
        const isItDarkNow = document.body.classList.toggle("dark")
        document.body.classList.toggle("light")
        const colorScheme = isItDarkNow ? "dark" : "light";
        document.cookie = `colorScheme=${colorScheme}; path=/; max-age=31536000`;
    }
</script>

<Page pageName="Settings">
    <ThemeSwitch currentTheme={data.theme} {setTheme} currentColorScheme={data.colorScheme} {toggleColorScheme}/>
</Page>
