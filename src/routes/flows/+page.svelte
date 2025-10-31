<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";
    import { deleteFlow, renameFlow } from "$lib/api/flow_api";
    import { type ApiProps } from "$lib/api/api";
    import ExecutionStatusIcon from "./ExecutionStatusIcon.svelte";
    import List from "$lib/components/list/List.svelte";
    import ListItem from "$lib/components/list/ListItem.svelte";
    import DeleteButton from "$lib/components/delete/DeleteButton.svelte";
    import ImportFlowButton from "$lib/components/flow/import/ImportFlowButton.svelte";
    import HandleError from "$lib/components/HandleError.svelte";
    import NodeName from "$lib/components/node/settings/NodeName.svelte";
    import { establishGlobalStatusListener } from "$lib/api/flow_execution_listener";
    import { onDestroy } from "svelte";
    import CreateFlowButton from "$lib/components/flow/create/CreateFlowButton.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    };

    const statusListener = establishGlobalStatusListener(apiProps)
    onDestroy(() => statusListener.close())
</script>

<Page pageName="Flows">
    {#await data.flows}
        <p>Loading...</p>
    {:then myFlows}
        <List class="max-h-4/5 overflow-y-auto">
            <HandleError element={myFlows}>
                {#snippet success(element)}
                    {#each element as flow}
                        <ListItem>
                            {#if flow.lastExecution?.status}
                                <ExecutionStatusIcon {statusListener} flowId={flow._id} status={flow.lastExecution.status}/>
                            {/if}
                            <NodeName
                                    onchange={value => renameFlow(apiProps, flow._id, value)}
                                    settings={flow}
                            />
                            <a href={`/flow/${flow._id}`} class="btn preset-filled">
                                <span>View</span>
                                <span>&rarr;</span>
                            </a>
                            <DeleteButton onconfirmed={async () => { await deleteFlow(apiProps, flow._id); window.location.reload() }}>
                                {#snippet body()}
                                    The flow will be deleted, along with all its nodes, data, logs, just, everything!
                                {/snippet}
                            </DeleteButton>
                        </ListItem>
                    {/each}
                {/snippet}
            </HandleError>
        </List>
        <div class="flex justify-center gap-2">
            <CreateFlowButton {apiProps}/>
            <ImportFlowButton {apiProps} metadatas={data.metadatas} templates={data.templates}/>
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</Page>
