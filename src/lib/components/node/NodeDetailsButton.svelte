<script lang="ts">
    import IconMaximize from "lucide-svelte/icons/maximize-2";
    import NodeDetails from "$lib/components/node/NodeDetails.svelte";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";

    interface Props {
        nodeId: string
        metadata: NodeMetadata;
        settings: SettingsStore
    }

    let { nodeId, metadata, settings }: Props = $props();
    let element: HTMLDialogElement;
</script>
<NodeDetails {nodeId} bind:dialog={element} {metadata} {settings}/>
<button onclick={() => element.showModal()} class="block">
    <IconMaximize/>
</button>
