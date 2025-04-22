<script lang="ts">
    import ListItem from "$lib/components/list/ListItem.svelte";
    import { formatDate } from "$lib/utils/date_utils.js";
    import IconNotificationRead from "lucide-svelte/icons/bell-off";
    import IconNotificationUnread from "lucide-svelte/icons/bell-ring";
    import NotificationGoTo from "$lib/components/notification/NotificationGoTo.svelte";
    import type { Notification } from "$lib/model/notification";
    import { resolveNotification } from "$lib/api/notification_api";
    import type { ApiProps } from "$lib/api/api";

    interface Props {
        apiProps: ApiProps
        notification: Notification
    }
    const { apiProps, notification: inputNotification }: Props = $props();
    let notification = $state(inputNotification);

    async function resolve() {
        notification.resolvedAt = new Date();
        await resolveNotification(apiProps, notification.attributes)
    }
</script>

<ListItem class="flex-col items-start {notification.resolvedAt && 'opacity-50'}">
    <div class="w-full flex justify-between">
        <div>
            <div class="flex gap-2">
                <NotificationGoTo attributes={notification.attributes}/>
                {formatDate(notification.lastSeenAt)}, occurred {notification.count} times
            </div>
            <h4 class="h4 text-left">{notification.title}</h4>
        </div>
            {#if notification.resolvedAt}
                <IconNotificationRead/>
            {:else}
                <button class="h-min" onclick={() => resolve()}>
                    <IconNotificationUnread/>
                </button>
            {/if}
    </div>
    <p class="whitespace-pre-wrap">{notification.description}</p>
</ListItem>
