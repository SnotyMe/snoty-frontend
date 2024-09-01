<script lang="ts">
    import { getNodeMetadata, type NodeDescriptor, type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import AddNodeList from "$lib/components/add/AddNodeList.svelte";
    import type { AddNodeProps, NodeCreatedHandler } from "$lib/components/add";
    import { createSettings, nodeSettingsFromMetadata, type SettingsStore } from "$lib/utils/settings.svelte";
    import NodeDetails from "$lib/components/node/NodeDetails.svelte";
    import AddNodeButton from "$lib/components/add/AddNodeButton.svelte";

    let { isOpen: ogOpen = $bindable(), flowId, apiProps, metadatas, onnodecreated: onnodecreatedupstream }: AddNodeProps = $props()
    let isOpen = $state(ogOpen)
    $effect(() => {
        isOpen = ogOpen
    })

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
        ogOpen = false
        onnodecreatedupstream(node)
    }
</script>

<style>
    /* fixes weird SVG artifacts */
    :global(.svelte-flow__controls-addnode svg) {
        fill: none;
    }
</style>

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
                {flowId}
                {apiProps}
                {onnodecreated}
                descriptor={currentAdd.metadata.descriptor}
                settings={currentAdd.settings}
            />
        </NodeDetails>
    {/if}
{/key}
