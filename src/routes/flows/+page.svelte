<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";
    import IconPlus from "lucide-svelte/icons/plus"
    import { createFlow, deleteFlow, renameFlow } from "$lib/api/flow_api";
    import type { ApiProps } from "$lib/api/api";
    import { goto } from "$app/navigation";
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import ExecutionStatusIcon from "./ExecutionStatusIcon.svelte";
    import List from "$lib/components/list/List.svelte";
    import ListItem from "$lib/components/list/ListItem.svelte";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import DeleteButton from "$lib/components/delete/DeleteButton.svelte";
    import ImportFlowButton from "$lib/components/flow/import/ImportFlowButton.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    };

    async function oncreateflow() {
        const flow = await createFlow(apiProps, { name: "New Flow" });
        goto(`/flow/${flow._id}`);
    }
</script>

<Page pageName="Flows">
    {#await data.flows}
        <p>Loading...</p>
    {:then myFlows}
        <List>
            {#each myFlows as flow}
                <ListItem>
                    {#if flow.lastExecution?.status}
                        <ExecutionStatusIcon status={flow.lastExecution.status}/>
                    {/if}
                    <SettingsField
                            key="name"
                            onchange={(_, value) => renameFlow(apiProps, flow._id, value)}
                            value={flow.name}
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
            <div class="flex justify-center gap-2">
                <LoadingButton class="px-4 py-2" onclick={oncreateflow}>
                    {#snippet idle()}
                        <IconPlus/>
                    {/snippet}
                </LoadingButton>
                <ImportFlowButton {apiProps} metadatas={data.metadatas} templates={data.templates}/>
            </div>
        </List>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</Page>
