<script lang="ts">
    import { Handle, type NodeProps, Position } from "@xyflow/svelte";
    import { type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import { setRecursively } from "$lib/utils/utils";

    interface Props extends NodeProps {
        data: StandaloneNode & {
            onsettingschange?: (settings: Record<string, any>) => void
            metadata: NodeMetadata
        }
        clientWidth?: number
        clientHeight?: number
        onsettingschange?: (settings: Record<string, any>) => void
    }
    let {
        data,
        clientWidth = $bindable(),
        clientHeight = $bindable(),
    }: Props = $props()
    const metadata = data.metadata

    function updateSettings(key: string, value: any) {
        setRecursively(data.settings, key, value)
        data.onsettingschange?.(data.settings)
    }
</script>

<div bind:clientWidth={clientWidth} bind:clientHeight={clientHeight}>
    {#if metadata?.input != null}
        <Handle type="target" position={Position.Left}/>
    {/if}
    <div class="cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block overflow-hidden border">
        {#if metadata}
            <SettingsField key="name" onchange={updateSettings} value={data.settings["name"] ?? metadata.displayName}></SettingsField>
            <div class="flow-node-options table-wrap border-t-4">
                <NodeSettings onchange={updateSettings} settings={data.settings} {metadata}/>
            </div>
        {:else}
            <div class="text-center">Unknown node type</div>
        {/if}
        <div class="p-2 preset-filled-surface-500 drag-handle cursor-pointer"></div>
    </div>
    {#if metadata?.output != null}
        <Handle type="source" position={Position.Right}/>
    {/if}
</div>
