<script lang="ts">

    interface Props {
        config: Record<string, any>
    }

    const {
        config,
    }: Props = $props();
</script>

<table class="table border-collapse">
    <tbody>
    {#each Object.entries(config) as [key, value]}
        {#if typeof value == "object"}
            <tr>
                <th>
                    {key}
                    <svelte:self config={value}></svelte:self>
                </th>
            </tr>
        {:else}
            <tr>
                <th>{key}</th>
                <th>{value}</th>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
