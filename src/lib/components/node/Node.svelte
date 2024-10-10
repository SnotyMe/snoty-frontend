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
    import NodeHelpButton from "$lib/components/node/help/NodeHelpButton.svelte";
    import IconCircleHelp from "lucide-svelte/icons/circle-help";
    import { browser } from "$app/environment";
    import { setNodeAPI } from "$lib/components/template/node";

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
    const settings = createSettings(node.settings, data.onsettingschange)
    function filterKeysHidden(hidden: boolean) {
        return Object.keys(node.settings)
            .filter(key => metadata.settings.find(it => it.name == key)?.hidden === hidden)
    }
    const hiddenSettings = filterKeysHidden(true)
    const unhiddenSettings = filterKeysHidden(false)
    if (browser) {
        setNodeAPI(node._id, { node, metadata, settings: settings })
    }
</script>

<div bind:clientWidth={clientWidth} bind:clientHeight={clientHeight}>
    {#if metadata?.input !== null}
        <Handle type="target" position={Position.Left}/>
    {/if}
    <div class="cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block overflow-hidden border">
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
                <NodeDeleteButton ondelete={data.ondelete}/>
                <div class="flex gap-1">
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
        <Handle type="source" position={Position.Right}/>
    {/if}
</div>
