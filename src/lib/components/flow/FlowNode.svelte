<script lang="ts">
    import { Handle, type NodeProps, Position } from "@xyflow/svelte";
    import { getNodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import { example_node_metadata } from "$lib/data/example_data";
    import FlowNodeSettings from "$lib/components/flow/FlowNodeSettings.svelte";

    interface Props extends NodeProps {
        data: StandaloneNode
        clientWidth?: number
        clientHeight?: number
    }
    let {
        data,
        clientWidth = $bindable(),
        clientHeight = $bindable()
    }: Props = $props()

    const metadata = getNodeMetadata(example_node_metadata, data.descriptor)
</script>

<div bind:clientWidth={clientWidth} bind:clientHeight={clientHeight}>
    {#if metadata?.input != null}
        <Handle type="target" position={Position.Left}/>
    {/if}
    <div class="cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block divide-y-4 overflow-hidden border">
        {#if metadata}
            <p class="drag-handle cursor-pointer">{metadata.displayName}</p>
            <div class="flow-node-options table-wrap">
                <FlowNodeSettings settings={data.settings} {metadata}/>
            </div>
        {:else}
            <div class="text-center">Unknown node type</div>
        {/if}
    </div>
    {#if metadata?.output != null}
        <Handle type="source" position={Position.Right}/>
    {/if}
</div>
