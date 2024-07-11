<script lang="ts">

    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";

    interface Props {
        config: Record<string, any>
        metadata: NodeMetadata | undefined
    }

    const {
        config,
        metadata
    }: Props = $props();
</script>

<table class="table border-collapse">
    <tbody>
    {#each Object.entries(config) as [key, value]}
        {#if typeof value == "object"}
            <tr>
                <th colspan="2">
                    {key}
                    <svelte:self config={value}></svelte:self>
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
