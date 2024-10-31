<script lang="ts">
    import List from "$lib/components/list/List.svelte";
    import ListItem from "$lib/components/list/ListItem.svelte";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import { triggerTask } from "$lib/api/task_api";
    import Page from "$lib/components/Page.svelte";

    const { data } = $props();
    const { tasks } = data

    const apiProps = {
        token: data.access_token,
        fetch
    }
</script>

<Page pageName="Admin">
    <div class="flex flex-col text-center">
        <h1 class="h1">Admin</h1>
        <h2 class="h2">Tasks</h2>
        {#await tasks}
            Loading...
        {:then tasks}
            <List>
                {#each tasks as task}
                    <ListItem>
                        {task.displayName}
                        <LoadingButton onclick={() => triggerTask(apiProps, task.name)}>
                            {#snippet idle()}
                                Run Task
                            {/snippet}
                        </LoadingButton>
                    </ListItem>
                {/each}
            </List>
        {/await}
    </div>
</Page>
