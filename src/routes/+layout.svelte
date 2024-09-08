<script>
    import "../app.css";
    import { Nav, Avatar } from "@skeletonlabs/skeleton-svelte";
    import IconSettings from "lucide-svelte/icons/settings";
    import IconHome from "lucide-svelte/icons/house";
    import IconWorkflow from "lucide-svelte/icons/workflow";
    import IconInfo from "lucide-svelte/icons/info";
    import IconMenu from "lucide-svelte/icons/menu";
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
    }
</script>

<div class="card border-surface-100-900 grid h-full w-full grid-cols-[auto_1fr] border-[1px]">
    <Nav.Rail value="nothing" classes="navbar overflow-y-scroll" {expanded}>
        {#snippet header()}
        <Nav.Tile id="menu" labelExpanded="Menu" title="menu" onclick={() => expanded = !expanded} {...tileProps}>
            <IconMenu/>
        </Nav.Tile>
        {/snippet}
        {#snippet tiles()}
        <Nav.Tile id="home" labelExpanded="Home" label="Home" href="/" {...tileProps}>
            <IconHome/>
        </Nav.Tile>
        {#if data.user != null}
            <Nav.Tile id="flows" labelExpanded="My Flows" label="Flows" href="/flows" {...tileProps}>
                <IconWorkflow/>
            </Nav.Tile>
        {/if}
        <Nav.Tile id="about" labelExpanded="About Snoty" label="About" href="/about" {...tileProps}>
            <IconInfo/>
        </Nav.Tile>
        {/snippet}
        {#snippet footer()}
        <Nav.Tile id="settings" labelExpanded="Settings" href="/settings" title="settings" {...tileProps}>
            <IconSettings/>
        </Nav.Tile>
        {#if user != null}
        <Nav.Tile id="avatar" labelExpanded={data.user?.name} title="user" onclick={() => profileMenuShown = !profileMenuShown} {...tileProps}>
            <Avatar src={undefined} classes="flex justify-center items-center">{initials}</Avatar>
        </Nav.Tile>
        {#if profileMenuShown}
            <UserMenu/>
        {/if}
        {/if}
        {/snippet}
    </Nav.Rail>
    <div class="flex items-center justify-center h-full overflow-y-scroll">
        <slot/>
    </div>
</div>
