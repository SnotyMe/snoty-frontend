<script lang="ts">
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { goto } from "$app/navigation";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import { createFlow, type CreateFlowDTO } from "$lib/api/flow_api";
    import IconPlus from "lucide-svelte/icons/plus";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import { Dialog } from "@skeletonlabs/skeleton-svelte"

    interface Props {
        apiProps: ApiProps
    }

    let {apiProps}: Props = $props();

    const flow: CreateFlowDTO = $state({name: ""});

    async function create() {
        if (!flow) {
            console.error("Flow is null");
            return;
        }

        const createdFlow = await createFlow(apiProps, flow);
        if (isErrorJson(createdFlow)) {
            throw createdFlow;
        }
        await goto(`/flow/${createdFlow._id}`);
    }
</script>

<NodePopup class="w-lg">
    {#snippet trigger()}
        <Dialog.Trigger class="btn-icon-clear">
            <IconPlus/>
        </Dialog.Trigger>
    {/snippet}
    {#snippet content()}
        <Dialog.Title class="h1 text-center">Create Flow</Dialog.Title>
        <form class="space-y-2 p-2">
            <div class="flex justify-between mb-2">
                <label class="label">
                    <span class="label-text">Name <span class="text-red-500">*</span></span>
                    <input class="input" placeholder="Enter Flow Name" bind:value={flow.name}/>
                    <small class="whitespace-pre-line">
                        What functionality do you have in mind?
                        You can always change this later.
                    </small>
                </label>
            </div>
        </form>
    {/snippet}
    {#snippet actions()}
        <LoadingButton onclick={create} disabled={flow.name === ""}>
            {#snippet idle()}
                Create
            {/snippet}
        </LoadingButton>
    {/snippet}
</NodePopup>
