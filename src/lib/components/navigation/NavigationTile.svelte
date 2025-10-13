<script lang="ts">
    import { twMerge } from "tailwind-merge";

    interface Props {
        label: string
        labelExpanded: string

        class?: string
        hover?: string
        active?: string

        selected: boolean
        expanded: boolean

        href?: string
        onclick?: () => void
    }

    const { label, labelExpanded, class: userClass, hover: userHover, active: userActive, selected, expanded, href, onclick }: Props = $props();

    const element = $derived(href ? "a" : "button");
    const classes = $derived(twMerge(
        "btn filter-none!",
        expanded
            ? "justify-start px-4 py-2 w-full"
            : "flex items-center w-18 rounded-container aspect-square p-2 gap-1 flex-col justify-center",
        userHover?.split(" ")?.map(x => `hover:${x}`)?.join(" ") ?? "hover:preset-filled-surface-200-800",
        selected ? userActive ?? "bg-surface-300-700" : "",
        userClass
    ))
    const actualLabel = $derived(expanded ? labelExpanded : label);
</script>

<svelte:element
    this={element}
    class={classes}
    href={href}
    onclick={onclick}
>
    <slot/>
    {#if actualLabel}<span class={expanded ? "text-md" : "text-xs"}>{actualLabel}</span>{/if}
</svelte:element>
