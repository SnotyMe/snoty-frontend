<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import type { PageProps } from "./$types";
    import HandleError from "$lib/components/HandleError.svelte";
    import List from "$lib/components/list/List.svelte";
    import Notification from "$lib/components/notification/Notification.svelte";
    import type { Notification as TNotification } from "$lib/model/notification";
    import { isErrorJson } from "$lib/api/api";

    const { data }: PageProps = $props();

    const apiProps = {
        token: data.access_token!,
        fetch: fetch
    };

    // mutable, reactive variable because Svelte's `:then` element is neither
    let notifications: TNotification[] = $state([]);
    const promise = data.notifications
        .then(data => {
            if (isErrorJson(data)) return data;
            notifications = data;
            return null;
        })
</script>

<Page pageName="Notifications">
    {#await promise}
        <p>Loading...</p>
    {:then element}
        <HandleError {element}>
            {#snippet success(_)}
                <div class="flex flex-col gap-4 items-center justify-center w-full h-4/5 max-h-full">
                    <h1 class="h1">Notifications</h1>
                    {#if notifications.length > 0}
                        <List class="w-4xl max-w-11/12 max-h-full overflow-y-auto">
                            {#each notifications as notification, i}
                                <Notification {apiProps} {notification} ondelete={() => notifications.splice(i, 1)}/>
                            {/each}
                        </List>
                    {:else}
                        <p>Nothing to show!</p>
                    {/if}
                </div>
            {/snippet}
        </HandleError>
    {:catch error}
        <p>Error loading notifications: {error.message}</p>
    {/await}
</Page>
