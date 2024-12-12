<script lang="ts">
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";
    import type { ApiProps } from "$lib/api/api";
    import FlowLoading from "$lib/components/flow/FlowLoading.svelte";
    import Flow from "$lib/components/flow/Flow.svelte";

    interface Props {
        data: PageData
    }
    const { data }: Props = $props();

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    };
</script>

<Page title="Flow">
    <SvelteFlowProvider>
        {#await Promise.all([data.flow, data.metadatas, data.templates])}
            <FlowLoading/>
        {:then [flow, metadatas, templates]}
            {#if flow}
                <Flow
                        {apiProps}
                        metadatas={metadatas}
                        templates={templates}
                        flow={flow}
                />
            {:else}
                No flow with this id :(
            {/if}
        {:catch error}
            Error fetching flow
        {/await}
    </SvelteFlowProvider>
</Page>
