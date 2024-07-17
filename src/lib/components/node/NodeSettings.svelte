<script lang="ts">

    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";

    interface Props {
        settings: Record<string, any>
        metadata: NodeMetadata | undefined
        onchange: (key: string, value: any) => void
    }

    const {
        settings,
        metadata,
        onchange
    }: Props = $props();

    const filteredSettings = Object.entries(settings)
        .filter(([key]) => key !== "type" && key !== "name")

    function getMetadata(key: string) {
        return metadata?.settings.find(field => field.name === key);
    }

    function getName(key: string) {
        return getMetadata(key)?.displayName ?? key;
    }

    function getDescription(key: string) {
        return getMetadata(key)?.description ?? "";
    }
</script>

<table class="table border-collapse">
    <tbody>
    {#each filteredSettings as [key, value]}
        {#if typeof value == "object"}
            <tr>
                <th colspan="2">
                    <p title={getDescription(key)}>{getName(key)}</p>
                    <svelte:self {onchange} settings={value}></svelte:self>
                </th>
            </tr>
        {:else}
            <tr>
                <th title={getDescription(key)}>{getName(key)}</th>
                <th>
                    <SettingsField onchange={onchange} {key} value={settings[key]} metadata={metadata?.settings.find(field => field.name === key)}/>
                </th>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
