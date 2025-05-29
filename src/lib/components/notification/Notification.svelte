<script lang="ts">
    import ListItem from "$lib/components/list/ListItem.svelte";
    import { formatDate } from "$lib/utils/date_utils.js";
    import IconNotificationUnread from "lucide-svelte/icons/bell-ring";
    import IconDelete from "lucide-svelte/icons/trash";
    import NotificationGoTo from "$lib/components/notification/NotificationGoTo.svelte";
    import type { Notification } from "$lib/model/notification";
    import { deleteNotification, resolveNotification } from "$lib/api/notification_api";
    import type { ApiProps } from "$lib/api/api";
    import { getToaster } from "$lib/context/layout_context.svelte";

    interface Props {
        apiProps: ApiProps
        notification: Notification
        ondelete: () => void
    }
    const { apiProps, notification, ondelete }: Props = $props();

    async function resolve() {
        notification.resolvedAt = new Date();
        await resolveNotification(apiProps, notification.attributes)
    }

    const toaster = getToaster()
    async function remove() {
        const result = await deleteNotification(apiProps, notification.id)
        if (result.ok) ondelete()
        else toaster.error({title: "Couldn't delete Notification", description: await result.text()})
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
                <button class="h-min" onclick={() => remove()}>
                    <IconDelete/>
                </button>
            {:else}
                <button class="h-min" onclick={() => resolve()}>
                    <IconNotificationUnread/>
                </button>
            {/if}
    </div>
    <p class="whitespace-pre-wrap">{notification.description}</p>
</ListItem>
