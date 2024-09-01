<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";

    interface Props {
        data: PageData;
    }
    const { data }: Props = $props();
</script>

<Page pageName="Flows">
    {#await data.flows}
        <p>Loading...</p>
    {:then myFlows}
        <div class="space-y-4 min-w-96">
            {#each myFlows as flow}
                <div class="card preset-filled-surface-100-900 gap-2 p-4 w-full flex justify-between items-center">
                <span>
                    {flow.name}
                </span>
                    <a href={`/flow/${flow._id}`} class="btn preset-filled">
                        <span>View</span>
                        <span>&rarr;</span>
                    </a>
                </div>
            {/each}
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</Page>
