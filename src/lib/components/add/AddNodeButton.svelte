<script lang="ts">
    import type { NodeDescriptor, NodeId, NodeSettings } from "$lib/model/nodes";
    import type { ApiProps } from "$lib/api/api";
    import { createNode, type NodeCreateDTO } from "$lib/api/node_api";
    import type { NodeCreatedHandler } from "$lib/components/add";
    import { getContext } from "svelte";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import IconDiamondPlus from "lucide-svelte/icons/diamond-plus";

    const apiProps = getContext<ApiProps>("apiProps");

    interface Props {
        flowId: NodeId
        descriptor: NodeDescriptor
        settings: NodeSettings
        onnodecreated: NodeCreatedHandler
    }
    const { flowId, descriptor, settings, onnodecreated }: Props = $props()

    async function submit() {
        try {
            const nodeCreateDTO: NodeCreateDTO = {
                descriptor,
                flowId,
                settings
            };
            const createdNode = await createNode(apiProps, nodeCreateDTO);

            onnodecreated(createdNode);
        } catch (e: any) {
            console.error(e);
            alert(`Failed to create node: ${e.message}`);
        }
    }
</script>

<LoadingButton variant="icon-clear" onclick={submit}>
    {#snippet idle()}
        <IconDiamondPlus/>
    {/snippet}
</LoadingButton>
