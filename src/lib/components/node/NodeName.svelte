<script lang="ts">
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeSettings } from "$lib/model/nodes";

    interface Props {
        settings: NodeSettings
    }

    const { settings }: Props = $props();
</script>

{#key settings.name}
    <SettingsField bind:value={settings.name}/>
{/key}
