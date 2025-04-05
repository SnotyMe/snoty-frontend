<script lang="ts">
    import TriangleAlert from "lucide-svelte/icons/triangle-alert";
    import type { Snippet } from "svelte";
    import { twMerge } from "tailwind-merge";

    interface Props {
        icon?: Snippet
        content: Snippet
        level: "info" | "warn" | "error"
        class?: string
    }
    const { icon = undefined, content, level, class: clazz = "" }: Props = $props();
</script>

<style>
    div {
        border-width: 1px;
        border-color: var(--log-level);
    }
</style>

<div style="--log-level: var(--color-log-{level})" class={twMerge(`card grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[auto_1fr_auto]`, clazz)}>
    {#if icon}
        {@render icon()}
    {:else}
        <TriangleAlert/>
    {/if}
    {@render content()}
</div>
