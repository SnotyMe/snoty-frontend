<script lang="ts">
    import { example_nodes } from "$lib/data/example_data";
    import Flow from "$lib/components/flow/Flow.svelte";
    import { page } from "$app/stores";
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Page from "$lib/components/Page.svelte";

    const startNode = example_nodes.find(node => node.id == $page.params.id)
</script>

<Page title="Flow">
    {#if startNode}
        <SvelteFlowProvider>
            <Flow rootNode={startNode} involved={example_nodes}/>
        </SvelteFlowProvider>
    {:else}
        No node with this id:(
    {/if}
</Page>
