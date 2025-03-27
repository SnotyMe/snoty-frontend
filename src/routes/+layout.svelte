<script lang="ts">
    import "../app.css";
    import { Avatar, Navigation, ToastProvider } from "@skeletonlabs/skeleton-svelte";
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
    import { initContext, setColorScheme } from "$lib/context/layout_context.svelte";

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

    const user = data.user;
    function _fromFullName() {
        if (user?.firstName == null || user.lastName[0] == null) return null;
        return user.firstName[0] + user.lastName[0];
    }
    let initials = (_fromFullName() ?? user?.name?.split(" ").map((name) => name[0]).join("") ?? "??")
        .substring(0, 2);

    let profileMenuShown = $state(false);

    const tileProps = {
        "active": "bg-surface-300-700",
        "hover": "hover:preset-filled-surface-200-800",
    };

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    };

    // load template API to global context
    if (browser)
        window.templateAPI = new TemplateAPI(apiProps);
</script>

<div class="card border-surface-100-900 grid h-full w-full grid-cols-[auto_1fr] border-[1px]">
    <Navigation.Rail value="nothing" classes="navbar overflow-y-auto" {expanded}>
        {#snippet header()}
        <Navigation.Tile labelExpanded="Menu" title="menu" selected={expanded} onclick={() => expanded = !expanded} {...tileProps}>
            <IconMenu/>
        </Navigation.Tile>
        {/snippet}
        {#snippet tiles()}
        <Navigation.Tile id="home" labelExpanded="Home" label="Home" href="/" selected={activeUrl === "/"} {...tileProps}>
            <IconHome/>
        </Navigation.Tile>
        {#if data.user != null}
            <!-- matches /flows and /flow/:id -->
            <Navigation.Tile id="flows" labelExpanded="My Flows" label="Flows" href="/flows" selected={activeUrl.startsWith("/flow")} {...tileProps}>
                <IconWorkflow/>
            </Navigation.Tile>
        {/if}
        <Navigation.Tile id="about" labelExpanded="About Snoty" label="About" href="/about" selected={activeUrl === "/about"} {...tileProps}>
            <IconInfo/>
        </Navigation.Tile>
        {#if !isErrorJson(data.roles) && data.roles?.includes("admin")}
            <Navigation.Tile id="admin" labelExpanded="Admin" label="Admin" href="/admin" selected={activeUrl === "/admin"} {...tileProps}>
                <IconMonitorCog/>
            </Navigation.Tile>
        {/if}
        {/snippet}
        {#snippet footer()}
        <UserMenu {profileMenuShown} {tileProps}/>
        {#if user != null}
            <Navigation.Tile id="avatar"
                             labelExpanded={data.user?.name}
                             onclick={() => profileMenuShown = !profileMenuShown}
                             selected={profileMenuShown}
                             {...tileProps}
                             active={tileProps["hover"]}>
                <Avatar src={undefined} classes="flex justify-center items-center">{initials}</Avatar>
            </Navigation.Tile>
        {/if}
        {/snippet}
    </Navigation.Rail>
    <ToastProvider>
        <div class="flex gap-2 items-center justify-center h-full overflow-y-auto">
            {@render children()}
        </div>
    </ToastProvider>
</div>
