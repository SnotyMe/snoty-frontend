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
    import NavigationTile from "$lib/components/navigation/NavigationTile.svelte";

    function logout() {
        fetch('/auth/logout', {
            method: 'POST',
        }).then(() => window.location.reload());
    }

    const classes = "aspect-auto!"

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

<NavigationTile class={classes} id="settings" labelExpanded="Settings" href="/settings" selected={activeUrl === "/settings"} title="settings" {...tileProps}>
    <IconSettings/>
</NavigationTile>

{#if profileMenuShown}
    <div class="mt-2">
        <hr class="border-surface-300-700 w-full h-1 mt-2">
        <NavigationTile id="notifications" labelExpanded="Notifications" href="/notifications" selected={activeUrl === "/notifications"} title="notifications" {...tileProps} class={twMerge(classes, "relative")}>
            {#if $notificationCount > 0 && profileMenuShown}
                <NotificationBadge/>
            {/if}
            <div>
                <IconBell/>
            </div>
        </NavigationTile>
        <NavigationTile class={classes} id="logout" labelExpanded="Logout" onclick={logout} title="logout" {...tileProps} active="">
            <IconLogOut/>
        </NavigationTile>
    </div>
{/if}

{#if user != null}
    <NavigationTile
        labelExpanded={user?.name}
        onclick={() => profileMenuShown = !profileMenuShown}
        selected={profileMenuShown}
        class="relative mt-2"
        active={tileProps["hover"]}
        {...tileProps}
    >
        <div>
            {#if $notificationCount > 0 && !profileMenuShown}
                <NotificationBadge/>
            {/if}
            <Avatar class="size-16">
                <Avatar.Fallback>SIM</Avatar.Fallback>
            </Avatar>
        </div>
    </NavigationTile>
{/if}
