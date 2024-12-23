<script lang="ts">
    import "../app.css";
    import { Navigation, Avatar } from "@skeletonlabs/skeleton-svelte";
    import IconSettings from "lucide-svelte/icons/settings";
    import IconHome from "lucide-svelte/icons/house";
    import IconWorkflow from "lucide-svelte/icons/workflow";
    import IconInfo from "lucide-svelte/icons/info";
    import IconMenu from "lucide-svelte/icons/menu";
    import IconMonitorCog from "lucide-svelte/icons/monitor-cog";
    import UserMenu from "./UserMenu.svelte";

    let expanded = $state(false);

    const {
        data
    } = $props();

    const user = data.user;
    function _fromFullName() {
        if (user?.firstName == null || user.lastName[0] == null) return null;
        return user.firstName[0] + user.lastName[0];
    }
    let initials = (_fromFullName() ?? user?.name?.split(" ").map((name) => name[0]).join("") ?? "??")
        .substring(0, 2);

    let profileMenuShown = $state(false);

    const tileProps = {
        active: "",
    };

    import { browser } from "$app/environment";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { TemplateAPI } from "$lib/components/template/api";

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
        <Navigation.Tile id="menu" labelExpanded="Menu" title="menu" onclick={() => expanded = !expanded} {...tileProps}>
            <IconMenu/>
        </Navigation.Tile>
        {/snippet}
        {#snippet tiles()}
        <Navigation.Tile id="home" labelExpanded="Home" label="Home" href="/" {...tileProps}>
            <IconHome/>
        </Navigation.Tile>
        {#if data.user != null}
            <Navigation.Tile id="flows" labelExpanded="My Flows" label="Flows" href="/flows" {...tileProps}>
                <IconWorkflow/>
            </Navigation.Tile>
        {/if}
        <Navigation.Tile id="about" labelExpanded="About Snoty" label="About" href="/about" {...tileProps}>
            <IconInfo/>
        </Navigation.Tile>
        {#if !isErrorJson(data.roles) && data.roles?.includes("admin")}
            <Navigation.Tile id="admin" labelExpanded="Admin" label="Admin" href="/admin" {...tileProps}>
                <IconMonitorCog/>
            </Navigation.Tile>
        {/if}
        {/snippet}
        {#snippet footer()}
        <Navigation.Tile id="settings" labelExpanded="Settings" href="/settings" title="settings" {...tileProps}>
            <IconSettings/>
        </Navigation.Tile>
        {#if user != null}
            <Navigation.Tile id="avatar" labelExpanded={data.user?.name} title="user" onclick={() => profileMenuShown = !profileMenuShown} {...tileProps}>
                <Avatar src={undefined} classes="flex justify-center items-center">{initials}</Avatar>
            </Navigation.Tile>
            {#if profileMenuShown}
                <UserMenu/>
            {/if}
        {/if}
        {/snippet}
    </Navigation.Rail>
    <div class="flex gap-2 items-center justify-center h-full overflow-y-auto">
        <slot/>
    </div>
</div>
