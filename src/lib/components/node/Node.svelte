<script lang="ts">
    import { Handle, type NodeProps, Position } from "@xyflow/svelte";
    import { type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import { createSettings } from "$lib/utils/settings.svelte";
    import NodeDetailsButton from "$lib/components/node/NodeDetailsButton.svelte";
    import NodeName from "$lib/components/node/NodeName.svelte";
    import NodeDeleteButton from "$lib/components/node/NodeDeleteButton.svelte";

    interface Props extends NodeProps {
        data: StandaloneNode & {
            onsettingschange?: (settings: Record<string, any>) => void
            ondelete: () => void
            metadata: NodeMetadata
        }
        clientWidth?: number
        clientHeight?: number
    }
    let {
        data,
        clientWidth = $bindable(),
        clientHeight = $bindable(),
    }: Props = $props()
    // settings store, encapsulates an immutable record
    const settings = createSettings(data.settings)
    $effect(() => data.onsettingschange?.(settings.settings))
    const metadata = data.metadata
</script>

<div bind:clientWidth={clientWidth} bind:clientHeight={clientHeight}>
    {#if metadata?.input != null}
        <Handle type="target" position={Position.Left}/>
    {/if}
    <div class="cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block overflow-hidden border">
        {#if metadata}
            <NodeName {settings} {metadata}/>
            <div class="flow-node-options table-wrap border-t-4 mt-1">
                <NodeSettings {settings} {metadata}/>
            </div>
        {:else}
            <div class="text-center">Unknown node type</div>
        {/if}
        <div class="w-full flex gap-2">
            <NodeDeleteButton ondelete={data.ondelete}/>
            <div class="w-full p-2 preset-filled-surface-500 drag-handle cursor-pointer"></div>
            <NodeDetailsButton nodeId={data._id} {settings} {metadata}/>
        </div>
    </div>
    {#if metadata?.output != null}
        <Handle type="source" position={Position.Right}/>
    {/if}
</div>
