<script lang="ts">
    import { Handle, type NodeProps, NodeResizeControl, Position, useStore } from "@xyflow/svelte";
    import { type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeSettings from "$lib/components/node/settings/NodeSettings.svelte";
    import NodeName from "$lib/components/node/settings/NodeName.svelte";
    import NodeDetailsButton from "$lib/components/node/NodeDetailsButton.svelte";
    import Liquid from "$lib/components/template/Liquid.svelte";
    import { config } from "$lib/components/template/config";
    import NodeHelpButton from "$lib/components/node/help/NodeHelpButton.svelte";
    import IconCircleHelp from "lucide-svelte/icons/circle-help";
    import IconScaling from "lucide-svelte/icons/move-diagonal-2";
    import IconGripVertical from "lucide-svelte/icons/grip-vertical";
    import { browser } from "$app/environment";
    import { setNodeAPI } from "$lib/components/template/node";
    import type { ApiProps } from "$lib/api/api";
    import NodeLogLevel from "$lib/components/node/NodeLogLevel.svelte";
    import DeleteButton from "$lib/components/delete/DeleteButton.svelte";
    import { removeBoilerplate } from "$lib/utils/settings_utils";
    import { page } from "$app/state";

    interface Props extends NodeProps {
        data: {
            apiProps: ApiProps
            node: StandaloneNode
            metadata: NodeMetadata
            templates: Map<string, string> | undefined
            onsettingschange?: (settings: Record<string, any>) => void
            ondelete?: () => void
            initializing: boolean
            heights: Record<string, number>
            widths: Record<string, number>
        }
    }
    let {
        data,
    }: Props = $props()
    const { apiProps, node, metadata, templates } = data;
    let settings = $state(node.settings);

    const { heights, widths } = data;

    function filterKeysHidden(hidden: boolean) {
        return Object.keys(node.settings)
            .filter(key => metadata?.settings?.find(it => it.name == key)?.hidden === hidden);
    }
    const hiddenSettings = filterKeysHidden(true);
    const unhiddenSettings = filterKeysHidden(false);
    if (browser) {
        setNodeAPI(node._id, { node, metadata, settings });
    }

    let previousSettings = $state.snapshot(settings);
    $effect(() => {
        const newSettings = $state.snapshot(settings);
        if (JSON.stringify(previousSettings) != JSON.stringify(newSettings)) {
            data.onsettingschange?.(newSettings);
            previousSettings = newSettings;
        }
    })

    const { edges } = useStore()
    let hasOutputNode = $derived(edges.some(edge => edge.source === node._id))

    const isHighlighted = page.url.searchParams.get("highlightedNode") === node._id;
</script>

<div bind:clientWidth={widths[node._id]} bind:clientHeight={heights[node._id]} class="h-full" class:animate-highlight={isHighlighted}>
    {#if metadata?.input !== null}
        <Handle type="target"
                position={Position.Left}
                class={metadata?.position === "START" ? "bg-green-500!" : ""}/>
    {/if}
    <div class:max-w-3xl={data.initializing === true} class="h-full flex flex-col cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 border overflow-hidden">
        <NodeResizeControl minWidth={150} minHeight={50} autoScale={false}>
            <IconScaling size="1em" class="absolute -translate-x-2 -translate-y-2"/>
        </NodeResizeControl>
        {#if metadata}
            <div class="flex items-center">
                <IconGripVertical class="drag-handle cursor-pointer"/>
                <NodeName bind:settings/>
            </div>
            <div class="flow-node-options grow table-wrap border-y-4 my-1 pr-0.5 overflow-y-auto">
                <NodeSettings bind:settings={settings} fields={removeBoilerplate(metadata.settings, hiddenSettings)}/>
                {#if hiddenSettings.length > 0}
                    <details>
                        <summary class="cursor-pointer">Show hidden settings</summary>
                        <NodeSettings bind:settings={settings} fields={removeBoilerplate(metadata.settings, unhiddenSettings)}/>
                    </details>
                {/if}
            </div>
            {#if templates?.has("node_bottom")}
                <details>
                    <summary class="cursor-pointer">Details</summary>
                    <Liquid template={templates?.get("node_bottom")} inputs={{node, config, settings, metadata}}/>
                </details>
            {/if}
            <div class="mt-2 w-full flex justify-between gap-2">
                <DeleteButton onconfirmed={data.ondelete}>
                    {#snippet body()}
                        Are you sure you want to delete this node? All data associated with this node will be lost.
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
                    <p>{settings.name}</p>
                </div>
                <IconCircleHelp size="5rem" class="my-6 mx-auto"/>
            </div>
        {/if}
    </div>
    {#if metadata?.output !== null}
        <Handle type="source"
                class={metadata?.position !== "END" && !hasOutputNode ? "bg-red-500!" : ""}
                position={Position.Right}/>
    {/if}
</div>
