<script lang="ts">
    import { getNodeMetadata, type NodeDescriptor, type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import AddNodeList from "$lib/components/add/AddNodeList.svelte";
    import type { AddNodeProps, NodeCreatedHandler } from "$lib/components/add";
    import { createSettings, nodeSettingsFromMetadata, type SettingsStore } from "$lib/utils/settings.svelte";
    import NodeDetails from "$lib/components/node/NodeDetails.svelte";
    import AddNodeButton from "$lib/components/add/AddNodeButton.svelte";
    import NodeHelp from "$lib/components/node/help/NodeHelp.svelte";
    import ScaleTransition from "$lib/components/transition/ScaleTransition.svelte";
    import IconArrowLeft from "lucide-svelte/icons/arrow-left"

    let { isOpen: ogOpen = $bindable(), flow, apiProps, metadatas, onnodecreated: onnodecreatedupstream }: AddNodeProps = $props()
    let isOpen = $state(ogOpen);
    $effect(() => {
        isOpen = ogOpen;
    })

    let currentAdd: { metadata: NodeMetadata, settings: SettingsStore } | null = $state(null);
    let addDialog: HTMLDialogElement;
    function addNode(nodeDescriptor: NodeDescriptor) {
        const metadata = getNodeMetadata(metadatas, nodeDescriptor);
        const settingsStore = createSettings(nodeSettingsFromMetadata(metadata));

        currentAdd = { metadata, settings: settingsStore };
        addDialog?.showModal();
    }

    const onnodecreated: NodeCreatedHandler = async (node: StandaloneNode) => {
        currentAdd = null;
        ogOpen = false;
        onnodecreatedupstream(node);
    }

    let currentHelpMetadata: NodeMetadata | null = $state(null);
    function showHelp(metadata: NodeMetadata) {
        currentHelpMetadata = metadata;
    }
</script>

<style>
    /* fixes weird SVG artifacts */
    :global(.svelte-flow__controls-addnode svg) {
        fill: none;
    }
</style>

<NodeDrawer horizontalAlign="left" width="60%" height="80%" {isOpen}>
    <div class="grid">
        {#if currentHelpMetadata === null}
            <ScaleTransition>
                <AddNodeList {metadatas} onnodeadd={addNode} onshowhelp={showHelp}/>
            </ScaleTransition>
        {:else}
            <ScaleTransition>
                <button onclick={() => currentHelpMetadata = null}>
                    <IconArrowLeft/>
                </button>
                <NodeHelp metadata={currentHelpMetadata}/>
            </ScaleTransition>
        {/if}
    </div>
</NodeDrawer>

{#key currentAdd}
    {#if currentAdd}
        <NodeDetails bind:dialog={addDialog}
                     instashow={true}
                     metadata={currentAdd.metadata}
                     settings={currentAdd.settings}>
            <AddNodeButton
                flowId={flow._id}
                {apiProps}
                {onnodecreated}
                descriptor={currentAdd.metadata.descriptor}
                settings={currentAdd.settings}
            />
        </NodeDetails>
    {/if}
{/key}
