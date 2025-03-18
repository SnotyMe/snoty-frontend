<script>
    import IconLogOut from "lucide-svelte/icons/log-out"
    import IconSettings from "lucide-svelte/icons/settings";
    import { Navigation } from "@skeletonlabs/skeleton-svelte";
    import { page } from "$app/state";

    function logout() {
        fetch('/auth/logout', {
            method: 'POST',
        }).then(() => window.location.reload());
    }

    const { tileProps, profileMenuShown } = $props();

    const classes = "aspect-auto! flex justify-center"

    let activeUrl = $derived(page.url.pathname)
</script>

<style>
</style>

<Navigation.Tile {classes} id="settings" labelExpanded="Settings" href="/settings" selected={activeUrl === "/settings"} title="settings" {...tileProps}>
    <IconSettings/>
</Navigation.Tile>
{#if profileMenuShown}
    <hr class="border-surface-300-700 w-full h-1 border-r-5 mt-2">
    <Navigation.Tile {classes} id="logout" labelExpanded="Logout" onclick={logout} title="logout" {...tileProps} active="">
        <IconLogOut/>
    </Navigation.Tile>
{/if}
