<script lang="ts">
    import IconAdd from "lucide-svelte/icons/square-plus"
    import { ControlButton, Panel } from "@xyflow/svelte";
    import type { ApiProps } from "$lib/api/api";
    import type { NodeMetadataMap } from "$lib/model/nodes";
    import NodePopupContainer from "$lib/components/node/control/NodePopupContainer.svelte";
    import AddNodeList from "$lib/components/add/AddNodeList.svelte";

    interface Props {
        apiProps: ApiProps
        metadatas: NodeMetadataMap
    }

    const { metadatas }: Props = $props();

    let isOpen = $state(false);

    function showLogs() {
        isOpen = !isOpen;
    }
</script>

<style>
    /* fixes weird SVG artifacts */
    :global(.svelte-flow__controls-addnode svg) {
        fill: none;
    }
</style>

<Panel position="top-left">
    <slot name="before">
        <ControlButton
                on:click={showLogs}
                class="svelte-flow__controls-addnode"
                title="add node"
                aria-label="add node"
        >
            <IconAdd/>
        </ControlButton>
    </slot>
</Panel>

<NodePopupContainer horizontalAlign="left" width="60%" height="80%" {isOpen}>
    <AddNodeList {metadatas}/>
</NodePopupContainer>
