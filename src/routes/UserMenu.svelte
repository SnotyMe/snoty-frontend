<script>
    import IconSettings from "lucide-svelte/icons/settings";
    import IconLogOut from "lucide-svelte/icons/log-out"
    import IconBell from "lucide-svelte/icons/bell";
    import { Navigation, Avatar } from "@skeletonlabs/skeleton-svelte";
    import { page } from "$app/state";
    import { getNotificationCount } from "$lib/api/notification_api.js";
    import { isErrorJson } from "$lib/api/api.js";
    import NotificationBadge from "$lib/components/notification/NotificationBadge.svelte";
    import { twMerge } from "tailwind-merge";
    import { notificationCount } from "$lib/components/notification/notification_store";

    function logout() {
        fetch('/auth/logout', {
            method: 'POST',
        }).then(() => window.location.reload());
    }

    const classes = "aspect-auto! flex justify-center"

    const { apiProps, user, tileProps } = $props();

    let activeUrl = $derived(page.url.pathname)

    if (user && apiProps) {
        getNotificationCount(apiProps)
            .then(e => {
                if (isErrorJson(e)) {
                    console.error("Failed to get notification count: " + e.message);
                } else {
                    $notificationCount = e;
                }
            })
    }

    let profileMenuShown = $state(false);

    function _fromFullName() {
        if (user?.firstName == null || user.lastName[0] == null) return null;
        return user.firstName[0] + user.lastName[0];
    }
    let initials = (_fromFullName() ?? user?.name?.split(" ").map((name) => name[0]).join("") ?? "??")
        .substring(0, 2);
</script>

<Navigation.Tile {classes} id="settings" labelExpanded="Settings" href="/settings" selected={activeUrl === "/settings"} title="settings" {...tileProps}>
    <IconSettings/>
</Navigation.Tile>
{#if profileMenuShown}
    <hr class="border-surface-300-700 w-full h-1 mt-2">
    <Navigation.Tile id="notifications" labelExpanded="Notifications" href="/notifications" selected={activeUrl === "/notifications"} title="notifications" {...tileProps} classes={twMerge(classes, "relative justify-center")}>
        {#if $notificationCount > 0 && profileMenuShown}
            <NotificationBadge/>
        {/if}
        <div>
            <IconBell/>
        </div>
    </Navigation.Tile>
    <Navigation.Tile {classes} id="logout" labelExpanded="Logout" onclick={logout} title="logout" {...tileProps} active="">
        <IconLogOut/>
    </Navigation.Tile>
{/if}

{#if user != null}
    <Navigation.Tile id="avatar"
                     labelExpanded={user?.name}
                     onclick={() => profileMenuShown = !profileMenuShown}
                     selected={profileMenuShown}
                     {...tileProps}
                     classes="relative justify-center"
                     active={tileProps["hover"]}>
        {#if $notificationCount > 0 && !profileMenuShown}
            <NotificationBadge/>
        {/if}
        <Avatar src={undefined} classes="flex justify-center items-center">{initials}</Avatar>
    </Navigation.Tile>
{/if}
