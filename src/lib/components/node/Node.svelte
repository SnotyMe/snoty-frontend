<script lang="ts">
    import { Handle, type NodeProps, NodeResizeControl, Position, useStore } from "@xyflow/svelte";
    import { type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import { createSettings } from "$lib/utils/settings.svelte";
    import IconGripVertical from "lucide-svelte/icons/grip-vertical";
    import NodeName from "$lib/components/node/NodeName.svelte";
    import NodeDetailsButton from "$lib/components/node/NodeDetailsButton.svelte";
    import Liquid from "$lib/components/template/Liquid.svelte";
    import { config } from "$lib/components/template/config";
    import NodeHelpButton from "$lib/components/node/help/NodeHelpButton.svelte";
    import IconCircleHelp from "lucide-svelte/icons/circle-help";
    import IconScaling from "lucide-svelte/icons/move-diagonal-2";
    import { browser } from "$app/environment";
    import { setNodeAPI } from "$lib/components/template/node";
    import type { ApiProps } from "$lib/api/api";
    import NodeLogLevel from "$lib/components/node/NodeLogLevel.svelte";
    import DeleteButton from "$lib/components/delete/DeleteButton.svelte";

    interface Props extends NodeProps {
        data: {
            apiProps: ApiProps
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
    const { apiProps, node, metadata, templates } = data
    const settings = createSettings(node.settings, data.onsettingschange)
    function filterKeysHidden(hidden: boolean) {
        return Object.keys(node.settings)
            .filter(key => metadata?.settings?.find(it => it.name == key)?.hidden === hidden)
    }
    const hiddenSettings = filterKeysHidden(true)
    const unhiddenSettings = filterKeysHidden(false)
    if (browser) {
        setNodeAPI(node._id, { node, metadata, settings: settings })
    }

    const { edges } = useStore()
    let hasOutputNode = $derived($edges.some(edge => edge.source === node._id))
</script>

<div bind:clientWidth={clientWidth} bind:clientHeight={clientHeight} class="h-full">
    {#if metadata?.input !== null}
        <Handle type="target"
                position={Position.Left}
                class={metadata?.position === "START" ? "!bg-green-500" : ""}/>
    {/if}
    <div class="h-full cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block overflow-auto border">
        <NodeResizeControl minWidth={150} minHeight={50}>
            <IconScaling size="1em" class="absolute -translate-x-2 -translate-y-2"/>
        </NodeResizeControl>
        {#if metadata}
            <div class="flex items-center">
                <IconGripVertical class="drag-handle cursor-pointer"/>
                <NodeName {settings} {metadata}/>
            </div>
            <div class="flow-node-options table-wrap border-y-4 my-1">
                <NodeSettings {settings} excludedKeys={hiddenSettings} {metadata}/>
                {#if hiddenSettings.length > 0}
                    <details>
                        <summary class="cursor-pointer">Show hidden settings</summary>
                        <NodeSettings {settings} excludedKeys={unhiddenSettings} {metadata}/>
                    </details>
                {/if}
            </div>
            {#if templates?.has("node_bottom")}
                <details>
                    <summary class="cursor-pointer">Details</summary>
                    <Liquid template={templates?.get("node_bottom")} inputs={{node, config, settings: settings.settings, metadata}}/>
                </details>
            {/if}
            <div class="mt-2 w-full flex justify-between gap-2">
                <DeleteButton onconfirmed={data.ondelete}>
                    {#snippet body()}
                        Are you sure you want to delete this node? All states will be lost.
                    {/snippet}
                </DeleteButton>
                <div class="flex gap-1">
                    <NodeLogLevel {node} {apiProps}/>
                    <NodeHelpButton {metadata}/>
                    <NodeDetailsButton nodeId={node._id} {settings} {metadata}/>
                </div>
            </div>
        {:else}
            <div>
                <div class="flex items-center">
                    <IconGripVertical class="drag-handle cursor-pointer"/>
                    <p>{settings.settings.name}</p>
                </div>
                <IconCircleHelp size="5rem" class="my-6 mx-auto"/>
            </div>
        {/if}
    </div>
    {#if metadata?.output !== null}
        <Handle type="source"
                class={metadata?.position === "MIDDLE" && !hasOutputNode ? "!bg-red-500" : ""}
                position={Position.Right}/>
    {/if}
</div>
