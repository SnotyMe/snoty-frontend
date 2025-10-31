<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet<[]>;

        class?: string

        label: string
        labelExpanded: string

        selected: boolean
        expanded: boolean

        href?: string
        onclick?: () => void
    }

    const { children, class: userClass, label, labelExpanded, selected, expanded, href, onclick }: Props = $props();

    const classes = $derived(twMerge(
        "btn filter-none! hover:preset-filled-surface-200-800 data-active:bg-surface-300-700",
        expanded
            ? "justify-start px-4 py-2 w-full"
            : "flex items-center w-18 rounded-container aspect-square p-2 gap-1 flex-col justify-center",
        userClass
    ))
    const actualLabel = $derived(expanded ? labelExpanded : label);
</script>

{#snippet content()}
    {@render children()}
    {#if actualLabel}<span class={expanded ? "text-md" : "text-xs"}>{actualLabel}</span>{/if}
{/snippet}

{#if href}
    <a class={classes} {href} data-active={selected || null}>
        {@render content()}
    </a>
{:else}
    <button class={classes} {onclick} type="button">
        {@render content()}
    </button>
{/if}
