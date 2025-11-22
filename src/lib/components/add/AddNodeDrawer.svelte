<script lang="ts">
    import { descriptorAsString, type NodeMetadata } from "$lib/model/nodes";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import AddNodeList from "$lib/components/add/AddNodeList.svelte";
    import type { FlowMenusProps } from "$lib/components/add";
    import NodeHelp from "$lib/components/node/help/NodeHelp.svelte";
    import ScaleTransition from "$lib/components/transition/ScaleTransition.svelte";
    import IconArrowLeft from "lucide-svelte/icons/arrow-left"

    let { isOpen = $bindable(), flow, metadatas, onnodecreated: upstreamonnodecreated }: FlowMenusProps = $props()

    let currentHelpMetadata: NodeMetadata | null = $state(null);
    function showHelp(metadata: NodeMetadata) {
        currentHelpMetadata = metadata;
    }

    const onnodecreated: FlowMenusProps["onnodecreated"] = (node) => {
        isOpen = false;
        upstreamonnodecreated(node)
    }
</script>

<style>
    /* fixes weird SVG artifacts */
    :global(.svelte-flow__controls-addnode svg) {
        fill: none;
    }
</style>

<NodeDrawer horizontalAlign="left" width="60%" height="80%" {isOpen}>
    <div class="grid max-h-full">
        {#if currentHelpMetadata === null}
            <ScaleTransition>
                <AddNodeList {flow} {metadatas} {onnodecreated} onshowhelp={showHelp}/>
            </ScaleTransition>
        {:else}
            <ScaleTransition>
                <div class="w-full flex justify-between">
                    <button onclick={() => currentHelpMetadata = null}>
                        <IconArrowLeft/>
                    </button>
                    <p>{descriptorAsString(currentHelpMetadata.descriptor)}</p>
                </div>
                <NodeHelp metadata={currentHelpMetadata}/>
            </ScaleTransition>
        {/if}
    </div>
</NodeDrawer>
