<script lang="ts">
    import TriangleAlert from "lucide-svelte/icons/triangle-alert";
    import type { Snippet } from "svelte";
    import { twMerge } from "tailwind-merge";

    interface Props {
        icon?: Snippet
        content: Snippet
        level: "info" | "warning" | "error"
        class?: string
    }
    const { icon = undefined, content, level, class: clazz = "" }: Props = $props();
    
</script>

<div class={twMerge(`card preset-outlined-${level}-500 grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[auto_1fr_auto]`, clazz)}>
    {#if icon}
        {@render icon()}
    {:else}
        <TriangleAlert class="text-{level}-500"/>
    {/if}
    {@render content()}
</div>
