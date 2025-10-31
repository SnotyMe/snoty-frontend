<script lang="ts">
    import type { NodeMetadata } from "$lib/model/nodes";
    import IconCircleHelp from "lucide-svelte/icons/circle-help";
    import NodeHelp from "$lib/components/node/help/NodeHelp.svelte";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import { Dialog } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        metadata: NodeMetadata
    }
    const { metadata }: Props = $props();
</script>

<NodePopup>
    {#snippet trigger()}
        <Dialog.Trigger>
            <IconCircleHelp/>
        </Dialog.Trigger>
    {/snippet}
    {#snippet content()}
        <NodeHelp {metadata}/>
    {/snippet}
</NodePopup>
