<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import { example_node_metadata } from "$lib/data/example_data";
    import { getNodeMetadata } from "$lib/model/nodes";
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
            {#each myFlows as { node, metadata }}
                <div class="card preset-filled-surface-100-900 gap-2 p-4 w-full flex justify-between items-center">
                <span>
                    {getNodeMetadata(example_node_metadata, node.descriptor)?.displayName}
                    {#each metadata?.settings?.filter(input => input.descriptive && node.settings[input.name]) ?? [] as { name }}
                        ({node.settings[name]})
                    {/each}
                </span>
                    <a href={`/flow/${node._id}`} class="btn preset-filled">
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
