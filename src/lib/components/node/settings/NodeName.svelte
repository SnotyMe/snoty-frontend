<script lang="ts">
    import SettingsField from "./SettingsField.svelte";

    interface Props {
        settings: {
            name: string
        }
        onchange?: (value: string) => void
    }

    const { settings, onchange }: Props = $props();

    let settingsName = $state(settings.name);
    let lastValue = $state.snapshot(settingsName);
    $effect(() => {
        if (settingsName !== lastValue) {
            lastValue = settingsName;
            onchange?.(settingsName);
        }
    });
</script>

{#key settingsName}
    <SettingsField bind:value={settingsName}/>
{/key}
