<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import type { PageProps } from "./$types";
    import HandleError from "$lib/components/HandleError.svelte";
    import List from "$lib/components/list/List.svelte";
    import Notification from "$lib/components/notification/Notification.svelte";

    const { data }: PageProps = $props();

    const apiProps = {
        token: data.access_token!,
        fetch: fetch
    };
</script>

<Page pageName="notifications">
    {#await data.notifications}
        <p>Loading...</p>
    {:then notifications}
        <HandleError element={notifications}>
            {#snippet success(element)}
                <div class="flex flex-col gap-4 items-center">
                    <h1 class="h1">Notifications</h1>
                    {#if element.length > 0}
                        <List class="max-w-8/12">
                            {#each element as notification}
                                <Notification {apiProps} {notification}/>
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