<script lang="ts">
    import { Handle, type NodeProps, Position } from "@xyflow/svelte";
    import { type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import { createSettings } from "$lib/utils/settings.svelte";
    import IconGripVertical from "lucide-svelte/icons/grip-vertical";
    import NodeName from "$lib/components/node/NodeName.svelte";
    import NodeDeleteButton from "$lib/components/node/NodeDeleteButton.svelte";
    import NodeDetailsButton from "$lib/components/node/NodeDetailsButton.svelte";
    import Liquid from "$lib/components/template/Liquid.svelte";
    import { config } from "$lib/components/template/config";

    interface Props extends NodeProps {
        data: {
            node: StandaloneNode
            metadata: NodeMetadata
            templates: Map<string, string> | undefined
            onsettingschange?: (settings: Record<string, any>) => void
            ondelete?: () => void
        }
        clientWidth?: number
        clientHeight?: number
    }
    let {
        data,
        clientWidth = $bindable(),
        clientHeight = $bindable(),
    }: Props = $props()
    const { node, metadata, templates } = data
    // settings store, encapsulates an immutable record
    const settings = createSettings(node.settings, data.onsettingschange)
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
        <p>
            <Liquid template={templates?.get("node_bottom")} inputs={{node, config, settings: settings.settings, metadata}}/>
        </p>
        <div class="mt-2 w-full flex justify-between gap-2">
            <NodeDeleteButton ondelete={data.ondelete}/>
            <NodeDetailsButton nodeId={node._id} {settings} {metadata}/>
        </div>
    </div>
    {#if metadata?.output != null}
        <Handle type="source" position={Position.Right}/>
    {/if}
</div>
