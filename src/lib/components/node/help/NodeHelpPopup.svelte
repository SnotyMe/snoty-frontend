<script lang="ts">
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";
    import type { NodePopupProps } from "$lib/components/node/popup";
    import NodeHelp from "./NodeHelp.svelte";

    interface Props extends NodePopupProps {
        metadata: NodeMetadata
    }
    let { metadata, dialog = $bindable() }: Props = $props()
</script>

<NodePopup bind:dialog>
    <NodeHelp {metadata}/>
</NodePopup>
