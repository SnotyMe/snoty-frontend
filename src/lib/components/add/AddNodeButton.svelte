<script lang="ts">
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { NodeDescriptor, NodeId } from "$lib/model/nodes";
    import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
    import type { ApiProps } from "$lib/api/api";
    import { createNode, type NodeCreateDTO } from "$lib/api/node_api";
    import type { NodeCreatedHandler } from "$lib/components/add";

    interface Props {
        flowId: NodeId
        apiProps: ApiProps
        descriptor: NodeDescriptor
        settings: SettingsStore
        onnodecreated: NodeCreatedHandler
    }
    const { flowId, apiProps, descriptor, settings, onnodecreated }: Props = $props()

    let submitting = $state(false);

    async function submit() {
        submitting = true;
        try {
            const nodeCreateDTO: NodeCreateDTO = {
                descriptor,
                flowId,
                settings: settings.settings
            };
            const createdNode = await createNode(apiProps, nodeCreateDTO);

            onnodecreated(createdNode);
        } catch (e: any) {
            console.error(e);
            alert(`Failed to create node: ${e.message}`);
        }
        submitting = false;
    }
</script>

<button class="btn preset-filled-primary-500 float-right px-10" onclick={submit} disabled={submitting}>
    {#if submitting}
        <ProgressRing size="size-6" meterStroke="stroke-surface-900-100" trackStroke="stroke-surface-200-800" />
    {:else}
        Add this Node
    {/if}
</button>
