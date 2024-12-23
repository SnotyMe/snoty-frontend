<script lang="ts">
    import type { NodeMetadata } from "$lib/model/nodes";
    import NodeSettings from "$lib/components/node/settings/NodeSettings.svelte";
    import NodeName from "$lib/components/node/settings/NodeName.svelte";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import type { NodePopupProps } from "$lib/components/node/popup";
    import { removeBoilerplate } from "$lib/utils/settings_utils";

    interface Props extends NodePopupProps {
        nodeId?: string
        metadata: NodeMetadata
        settings: NodeSettings
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
            <NodeName {settings}/>
            {#if nodeId}
                <p>{nodeId}</p>
            {/if}
        </div>
        <div class="flow-node-options table-wrap border-t-4 mt-1">
            <NodeSettings {settings} fields={removeBoilerplate(metadata.settings)} expanded={true}/>
        </div>
    {:else}
        <div class="text-center">Unknown node type</div>
    {/if}
    <slot/>
</NodePopup>
