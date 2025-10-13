<script lang="ts">
    import "../app.css";
    import { Avatar, Navigation, createToaster } from "@skeletonlabs/skeleton-svelte";
    import NavigationTile from "$lib/components/navigation/NavigationTile.svelte";
    import IconHome from "lucide-svelte/icons/house";
    import IconWorkflow from "lucide-svelte/icons/workflow";
    import IconInfo from "lucide-svelte/icons/info";
    import IconMenu from "lucide-svelte/icons/menu";
    import IconMonitorCog from "lucide-svelte/icons/monitor-cog";
    import UserMenu from "./UserMenu.svelte";
    import { browser } from "$app/environment";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { TemplateAPI } from "$lib/components/template/api";
    import { page } from "$app/state";
    import { initContext, setColorScheme, setToaster } from "$lib/context/layout_context.svelte";
    import { setContext } from "svelte";
    import Toast from "$lib/components/ui/Toast.svelte";

    let expanded = $state(false);

    let activeUrl = $derived(page.url.pathname)

    const {
        data,
        children,
    } = $props();

    if (browser) {
        initContext()
        setColorScheme(document.documentElement.className as App.ColorScheme);
    }

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    };
    setContext("apiProps", apiProps);

    // load template API to global context
    if (browser)
        window.templateAPI = new TemplateAPI(apiProps);

    const toaster = createToaster({
        placement: "bottom-end"
    });
    setToaster(toaster);

    const tileProps = $derived({
        expanded,
        hover: "preset-filled-surface-200-800",
    });
</script>

<div class="card border-surface-100-900 grid h-full w-full grid-cols-[auto_1fr] border-[1px]">
    <Navigation layout={expanded ? "sidebar" : "rail"} class={`p-1 overflow-y-auto ${expanded ? "grid grid-rows-[1fr_auto_1fr] gap-4" : "w-auto"}`}>
        <Navigation.Header>
            <NavigationTile labelExpanded="Menu" selected={expanded} onclick={() => expanded = !expanded} {...tileProps}>
                <IconMenu/>
            </NavigationTile>
        </Navigation.Header>
        <Navigation.Content>
            <Navigation.Menu class="gap-1">
                <NavigationTile labelExpanded="Home" label="Home" href="/" selected={activeUrl === "/"} {...tileProps}>
                    <IconHome/>
                </NavigationTile>
                {#if data.user != null}
                    <!-- matches /flows and /flow/:id -->
                    <NavigationTile labelExpanded="My Flows" label="Flows" href="/flows" selected={activeUrl.startsWith("/flow")} {...tileProps}>
                        <IconWorkflow/>
                    </NavigationTile>
                {/if}
                <NavigationTile labelExpanded="About Snoty" label="About" href="/about" selected={activeUrl === "/about"} {...tileProps}>
                    <IconInfo/>
                </NavigationTile>
                {#if !isErrorJson(data.roles) && data.roles != null && hasAnyRole(data.roles, ["admin"])}
                    <NavigationTile labelExpanded="Admin" label="Admin" href="/admin" selected={activeUrl === "/admin"} {...tileProps}>
                        <IconMonitorCog/>
                    </NavigationTile>
                {/if}
            </Navigation.Menu>
        </Navigation.Content>
        <Navigation.Footer class="flex flex-col justify-end">
            <UserMenu {apiProps} user={data.user} {tileProps}/>
        </Navigation.Footer>
    </Navigation>
    <Toast {toaster}/>
    <div class="flex flex-col gap-2 items-center justify-center h-full overflow-y-auto">
        {@render children()}
    </div>
</div>
