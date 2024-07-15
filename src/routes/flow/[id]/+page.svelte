<script lang="ts">
    import Flow from "$lib/components/flow/Flow.svelte";
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";

    interface Props {
        data: PageData
    }
    const { data } = $props();
</script>

<Page title="Flow">
    {#if data.flow}
        <SvelteFlowProvider>
            <Flow rootNode={data.flow}/>
        </SvelteFlowProvider>
    {:else}
        No node with this id:(
    {/if}
</Page>
