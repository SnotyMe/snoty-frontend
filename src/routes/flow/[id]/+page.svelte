<script lang="ts">
    import Flow from "$lib/components/flow/Flow.svelte";
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";
    import type { ApiProps } from "$lib/api/api";

    interface Props {
        data: PageData
    }
    const { data }: Props = $props();

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    }
</script>

<Page title="Flow">
    {#if data.flow}
        <SvelteFlowProvider>
            <Flow {apiProps} rootNode={data.flow}/>
        </SvelteFlowProvider>
    {:else}
        No node with this id:(
    {/if}
</Page>
