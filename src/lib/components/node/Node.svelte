<script lang="ts">
    import { Handle, type NodeProps, Position } from "@xyflow/svelte";
    import { type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import { createSettings } from "$lib/utils/settings.svelte";
    import IconGripVertical from "lucide-svelte/icons/grip-vertical";
    import NodeName from "$lib/components/node/NodeName.svelte";
    import NodeDeleteButton from "$lib/components/node/NodeDeleteButton.svelte";
    import NodeDetailsButton from "$lib/components/node/NodeDetailsButton.svelte";

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
    const settings = createSettings(data.settings, data.onsettingschange)
    const metadata = data.metadata
</script>

<div bind:clientWidth={clientWidth} bind:clientHeight={clientHeight}>
    {#if metadata?.input != null}
        <Handle type="target" position={Position.Left}/>
    {/if}
    <div class="cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block overflow-hidden border">
        {#if metadata}
            <div class="flex items-center">
                <IconGripVertical class="drag-handle cursor-pointer"/>
                <NodeName {settings} {metadata}/>
            </div>
            <div class="flow-node-options table-wrap border-y-4 my-1">
                <NodeSettings {settings} {metadata}/>
            </div>
        {:else}
            <div class="text-center">Unknown node type</div>
        {/if}
        <div class="mt-2 w-full flex justify-between gap-2">
            <NodeDeleteButton ondelete={data.ondelete}/>
            <NodeDetailsButton nodeId={data._id} {settings} {metadata}/>
        </div>
    </div>
    {#if metadata?.output != null}
        <Handle type="source" position={Position.Right}/>
    {/if}
</div>
