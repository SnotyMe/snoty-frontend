<script lang="ts">
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import FlowLoading from "$lib/components/flow/FlowLoading.svelte";
    import Flow from "$lib/components/flow/Flow.svelte";
    import type { WorkflowWithNodes } from "$lib/model/flows";
    import type { NodeMetadataMap, NodeTemplatesMap } from "$lib/model/nodes";
    import HandleError from "$lib/components/HandleError.svelte";

    interface Props {
        data: PageData
    }

    const { data }: Props = $props();

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    };

    let flow: WorkflowWithNodes | undefined = isErrorJson(data.flow) ? undefined : data.flow;
</script>

<Page pageName={flow?.name ?? "Flow"}>
    <SvelteFlowProvider>
        {#await Promise.all([data.flow, data.metadatas, data.templates])}
            <FlowLoading/>
        {:then [flowResponse, metadatasResponse, templatesResponse]}
            <HandleError elements={[flowResponse, metadatasResponse, templatesResponse]}>
                {#snippet success(_: undefined, [flow, metadatas, templates]: [WorkflowWithNodes, NodeMetadataMap, NodeTemplatesMap])}
                    <Flow
                            {apiProps}
                            {metadatas}
                            {templates}
                            {flow}
                    />
                {/snippet}
            </HandleError>
        {:catch error}
            Error fetching flow: {error}
        {/await}
    </SvelteFlowProvider>
</Page>
