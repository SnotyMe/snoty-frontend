<script lang="ts">
    import { type ErrorJson, isErrorJson } from "$lib/api/api";
    import type { Snippet } from "svelte";
    import { TriangleAlert } from "lucide-svelte";

    interface Props<T> {
        element?: T | ErrorJson
        elements?: (T | ErrorJson)[]
        success: Snippet<[T, T[]?]>
    }
    const { element, elements, success }: Props<any> = $props();

    const firstErrorElement = isErrorJson(element) ? element : elements?.find(isErrorJson);
</script>

{#if firstErrorElement}
    <div class="card preset-outlined-error-500 grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[auto_1fr_auto]">
        <TriangleAlert/>
        <div>
            <p class="font-bold">Something has gone wrong.</p>
            <p class="type-scale-1 opacity-60">
                {#if firstErrorElement.code}
                    Code {firstErrorElement.code}:
                {/if}
                {firstErrorElement.message}
            </p>
        </div>
        <div class="flex gap-1">
            <button onclick={() => window.location.reload()} class="btn preset-tonal hover:preset-filled">Reload Page</button>
        </div>
    </div>
{:else}
    {@render success(element, elements)}
{/if}
