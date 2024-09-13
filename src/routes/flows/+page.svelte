<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";
    import IconPlus from "lucide-svelte/icons/plus"
    import { createFlow, renameFlow } from "$lib/api/flow_api";
    import type { ApiProps } from "$lib/api/api";
    import { goto } from "$app/navigation";
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import ExecutionStatusIcon from "./ExecutionStatusIcon.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();

    const apiProps: ApiProps = {
        token: data.access_token!!,
        fetch: fetch
    }

    async function oncreateflow() {
        const flow = await createFlow(apiProps, { name: "New Flow" })
        goto(`/flow/${flow._id}`)
    }
</script>

<Page pageName="Flows">
    {#await data.flows}
        <p>Loading...</p>
    {:then myFlows}
        <div class="space-y-4 min-w-44 md:min-w-128">
            {#each myFlows as flow}
                <div class="card preset-filled-surface-100-900 gap-3 p-4 px-6 w-full flex justify-between items-center">
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
                </div>
            {/each}
            <div class="flex justify-center">
                <button class="px-4 py-2" onclick={oncreateflow}>
                    <IconPlus/>
                </button>
            </div>
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</Page>
