<script lang="ts">
    import { example_nodes } from "$lib/data/example_data";
    import Flow from "$lib/components/flow/Flow.svelte";
    import { page } from "$app/stores";

    const startNode = example_nodes.find(node => node.id == $page.params.id)
</script>

<style>
    main {
        height: 100vh;
    }
</style>

<main>
    {#if startNode}
        <Flow rootNode={startNode} involved={example_nodes}/>
    {:else}
        No node with this id:(
    {/if}
</main>
