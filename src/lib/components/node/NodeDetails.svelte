<script lang="ts">
    import type { NodeMetadata, NodeSettings } from "$lib/model/nodes";
    import NodeSettingsComponent from "$lib/components/node/settings/NodeSettings.svelte";
    import NodeName from "$lib/components/node/settings/NodeName.svelte";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import type { NodePopupProps } from "$lib/components/node/popup";
    import { removeBoilerplate } from "$lib/utils/settings_utils";

    interface Props extends NodePopupProps {
        nodeId?: string
        metadata: NodeMetadata
        settings: NodeSettings & { name: string }
    }

    let {
        nodeId,
        metadata,
        settings,
        instashow,
        dialog = $bindable()
    }: Props = $props();
</script>

<NodePopup bind:dialog {instashow}>
    {#if metadata}
        <div class="flex items-center gap-2">
            <NodeName bind:settings/>
            {#if nodeId}
                <p class="text-nowrap">{nodeId}</p>
            {/if}
        </div>
        <div class="flow-node-options table-wrap border-t-4 border-surface-200-800 mt-1">
            <NodeSettingsComponent {settings} fields={removeBoilerplate(metadata.settings)}/>
        </div>
    {:else}
        <div class="text-center">Unknown node type</div>
    {/if}
    <slot/>
</NodePopup>
