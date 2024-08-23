<script lang="ts">
    import IconAdd from "lucide-svelte/icons/square-plus"
    import { ControlButton, Panel } from "@xyflow/svelte";
    import type { ApiProps } from "$lib/api/api";
    import {
        getNodeMetadata,
        type NodeDescriptor,
        type NodeMetadata,
        type NodeMetadataMap,
        type StandaloneNode
    } from "$lib/model/nodes";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import AddNodeList from "$lib/components/add/AddNodeList.svelte";
    import type { NodeCreatedHandler } from "$lib/components/add";
    import { createSettings, nodeSettingsFromMetadata, type SettingsStore } from "$lib/utils/settings.svelte";
    import NodeDetails from "$lib/components/node/NodeDetails.svelte";
    import AddNodeButton from "$lib/components/add/AddNodeButton.svelte";

    interface Props {
        apiProps: ApiProps
        metadatas: NodeMetadataMap
        onnodecreated: NodeCreatedHandler
    }

    const { apiProps, metadatas, onnodecreated: onnodecreatedupstream }: Props = $props();

    let isOpen = $state(false);

    function toggleOpen() {
        isOpen = !isOpen;
    }

    let currentAdd: { metadata: NodeMetadata, settings: SettingsStore } | null = $state(null);
    let addDialog: HTMLDialogElement;
    function addNode(nodeDescriptor: NodeDescriptor) {
        const metadata = getNodeMetadata(metadatas, nodeDescriptor)
        const settingsStore = createSettings(nodeSettingsFromMetadata(metadata))

        currentAdd = { metadata, settings: settingsStore };
        if (addDialog) addDialog.showModal()
    }

    const onnodecreated: NodeCreatedHandler = async (node: StandaloneNode) => {
        currentAdd = null
        isOpen = false
        onnodecreatedupstream(node)
    }
</script>

<style>
    /* fixes weird SVG artifacts */
    :global(.svelte-flow__controls-addnode svg) {
        fill: none;
    }
</style>

<Panel position="top-left" class="svelte-flow__controls">
    <slot name="before">
        <ControlButton
                on:click={toggleOpen}
                class="svelte-flow__controls-addnode"
                title="add node"
                aria-label="add node"
        >
            <IconAdd/>
        </ControlButton>
    </slot>
</Panel>

<NodeDrawer horizontalAlign="left" width="60%" height="80%" {isOpen}>
    <AddNodeList {metadatas} onnodeadd={addNode}/>
</NodeDrawer>

{#key currentAdd}
    {#if currentAdd}
        <NodeDetails bind:dialog={addDialog}
                     instashow={true}
                     metadata={currentAdd.metadata}
                     settings={currentAdd.settings}>
            <AddNodeButton
                {apiProps}
                {onnodecreated}
                descriptor={currentAdd.metadata.descriptor}
                settings={currentAdd.settings}
            />
        </NodeDetails>
    {/if}
{/key}
