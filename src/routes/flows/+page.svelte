<script>
    import Page from "$lib/components/Page.svelte";
    import { example_node_metadata, example_nodes } from "$lib/data/example_data";
    import { getNodeMetadata } from "$lib/model/nodes";

    const myFlows = example_nodes
        .map(node => ({
            node: node,
            metadata: getNodeMetadata(example_node_metadata, node.descriptor)
        }))
        .filter(({ metadata }) => metadata?.position === "START")

    console.log(myFlows)
</script>

<Page pageName="Flows">
    <div class="space-y-4 min-w-96">
        {#each myFlows as {node, metadata}}
            <div class="card preset-filled-surface-100-900 p-4 w-full flex justify-between items-center">
                <span>
                    {getNodeMetadata(example_node_metadata, node.descriptor)?.displayName}
                    {#each metadata?.settings?.filter(input => input.descriptive) ?? [] as { name }}
                        ({node.config[name]})
                    {/each}
                </span>
                <a href={`/flow/${node.id}`} class="btn preset-filled">
                    <span>View</span>
                    <span>&rarr;</span>
                </a>
            </div>
        {/each}
    </div>
</Page>
