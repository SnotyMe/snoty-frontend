<script lang="ts">

    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";

    interface Props {
        settings: Record<string, any>
        metadata: NodeMetadata | undefined
    }

    let {
        settings,
        metadata,
    }: Props = $props();
</script>

<table class="table border-collapse">
    <tbody>
    {#each Object.entries(settings).filter((key) => key[0] !== "type") as [key, value]}
        {#if typeof value == "object"}
            <tr>
                <th colspan="2">
                    {key}
                    <svelte:self settings={value}></svelte:self>
                </th>
            </tr>
        {:else}
            <tr>
                <th>{key}</th>
                <th>
                    <SettingsField value={value} metadata={metadata?.settings.find(field => field.name === key)}/>
                </th>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
