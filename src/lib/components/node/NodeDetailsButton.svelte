<script lang="ts">
    import IconExpand from "lucide-svelte/icons/expand";
    import NodeDetails from "$lib/components/node/NodeDetails.svelte";
    import type { NodeMetadata, NodeSettings } from "$lib/model/nodes";

    interface Props {
        nodeId: string
        metadata: NodeMetadata;
        settings: NodeSettings
    }

    let { nodeId, metadata, settings }: Props = $props();
    let element: HTMLDialogElement;
</script>
<NodeDetails {nodeId} bind:dialog={element} {metadata} {settings}/>
<button onclick={() => element.showModal()} class="block">
    <IconExpand/>
</button>
