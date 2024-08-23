<script lang="ts">
    import IconMaximize from "lucide-svelte/icons/maximize-2";
    import NodeDetails from "$lib/components/node/NodeDetails.svelte";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";

    interface Props {
        metadata: NodeMetadata;
        settings: SettingsStore
    }

    let { metadata, settings }: Props = $props();
    let element: HTMLDialogElement;
</script>
<NodeDetails bind:dialog={element} {metadata} {settings}/>
<button onclick={() => element.showModal()} class="block">
    <IconMaximize/>
</button>
