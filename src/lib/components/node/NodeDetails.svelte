<script lang="ts">
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";
    import NodeName from "$lib/components/node/NodeName.svelte";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import type { NodePopupProps } from "$lib/components/node/popup";

    interface Props extends NodePopupProps {
        nodeId?: string
        metadata: NodeMetadata
        settings: SettingsStore
    }

    let {
        nodeId,
        metadata,
        settings,
        instashow,
        dialog = $bindable()
    }: Props = $props()
</script>

<NodePopup bind:dialog {instashow}>
    {#if metadata}
        <div class="flex items-center gap-2">
            <NodeName settings={settings} {metadata}/>
            {#if nodeId}
                <p>{nodeId}</p>
            {/if}
        </div>
        <div class="flow-node-options table-wrap border-t-4 mt-1">
            <NodeSettings settings={settings} {metadata} expanded={true}/>
        </div>
    {:else}
        <div class="text-center">Unknown node type</div>
    {/if}
    <slot/>
</NodePopup>
