<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";
    import {
        ENUM,
        PLAINTEXT
    } from "$lib/model/node_field_details";
    import Code from "$lib/components/Code.svelte";
    import { getDefaultValueFormattedIfPresent, getPolyDetails } from "$lib/model/node_field_defaults";

    interface Props {
        field: NodeField
    }
    const { field }: Props = $props();

    const details = getPolyDetails(field)
    const defaultValue = getDefaultValueFormattedIfPresent(field)
</script>

<span class="chip preset-filled">{field.name}</span>

{field.type}

{#if details?.type === PLAINTEXT}
    ({#if details.lines === 1}
        Singleline
    {:else if details.lines > 1}
        max. <Code>{details.lines}</Code> lines
    {/if})
{/if}

{#if field.description}
    - {field.description}
{/if}
<div class="ml-4">
    {#if defaultValue !== null}
        <p>Default: <Code>{defaultValue}</Code></p>
    {/if}
    {#if details?.type === ENUM}
        <p>Choices:
            {#each details.values.map(v => v.displayName) as value, i}
                {#if i !== 0},{/if}
                <Code>{value}</Code>
            {/each}
        </p>
    {/if}
</div>
