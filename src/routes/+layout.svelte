<script>
    import "../app.css";
    import { NavRail, NavTile, Avatar } from "@skeletonlabs/skeleton-svelte";
    import IconSettings from "lucide-svelte/icons/settings";
    import IconHome from "lucide-svelte/icons/house";
    import IconWorkflow from "lucide-svelte/icons/workflow";
    import IconMenu from "lucide-svelte/icons/menu";
    import UserMenu from "./UserMenu.svelte";

    // BLOCKED until @skeletonlabs/skeleton-svelte@1.0.0-next.4 is released
    // see https://github.com/skeletonlabs/skeleton/pull/2750
    let expanded = true;


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
</script>

<div class="card border-surface-100-900 grid h-full w-full grid-cols-[auto_1fr] border-[1px]">
    <NavRail class="navbar" expanded={false}>
        {#snippet header()}
        <NavTile id="menu" title="Menu" labelExpanded="Menu" onclick={() => expanded = !expanded}>
            <IconMenu/>
        </NavTile>
        {/snippet}
        {#snippet tiles()}
        <NavTile id="home" labelExpanded="Home" label="Home" href="/">
            <IconHome/>
        </NavTile>
        {#if data.user != null}
            <NavTile id="flows" labelExpanded="Flows" label="Flows" href="/flows">
                <IconWorkflow/>
            </NavTile>
        {/if}
        {/snippet}
        {#snippet footer()}
        <NavTile id="settings" labelExpanded="Settings" href="/settings" title="settings">
            <IconSettings/>
        </NavTile>
        {#if user != null}
        <NavTile id="avatar" labelExpanded={data.user?.name} title="user" onclick={() => profileMenuShown = !profileMenuShown}>
            <Avatar src={undefined} classes="flex justify-center items-center">{initials}</Avatar>
        </NavTile>
        {#if profileMenuShown}
            <UserMenu/>
        {/if}
        {/if}
        {/snippet}
    </NavRail>
    <div class="flex items-center justify-center">
        <slot/>
    </div>
</div>
