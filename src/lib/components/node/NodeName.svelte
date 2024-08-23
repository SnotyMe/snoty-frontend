<script lang="ts">
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";

    interface Props {
        settings: SettingsStore
        metadata: NodeMetadata
    }

    const { settings, metadata }: Props = $props();
</script>

{#key settings.settings["name"]}
    <SettingsField
        key="name"
        onchange={(key, value) => settings.setProperty(null, key, value)}
        value={settings.settings["name"] ?? metadata.displayName}
    />
{/key}
