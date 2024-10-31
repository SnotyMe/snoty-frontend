<script lang="ts">
    import type { Snippet } from "svelte";
    import IconCircleAlert from "lucide-svelte/icons/circle-alert"
    import IconLoader from "lucide-svelte/icons/loader"

    interface Props {
        onclick: () => Promise<any>
        onloaddone?: () => void
        class?: string
        loading?: Snippet
        idle: Snippet
        done?: Snippet
        error?: Snippet<[string]>
    }

    const {
        onclick: handler,
        onloaddone,
        class: clazz = "btn preset-filled",
        idle: idleSnippet,
        loading: loadingSnippet,
        done: doneSnippet,
        error: errorSnippet,
    }: Props = $props();

    let doing = $state(false)
    let done = $state(false)
    let errorMessage = $state<string | null>(null)

    async function onclick() {
        doing = true
        try {
            await handler()
            done = true
            onloaddone?.()
        } catch (e: any) {
            console.error("Error while doing something", e)
            errorMessage = e.message
        }
        doing = false
    }
</script>

<button class={clazz} class:disabled={doing} {onclick}>
    {#if done && doneSnippet}
        {@render doneSnippet()}
    {:else if doing}
        {#if loadingSnippet}
            {@render loadingSnippet()}
        {:else}
            <IconLoader/>
        {/if}
    {:else if errorMessage != null}
        {#if errorSnippet}
            {@render errorSnippet(errorMessage)}
        {:else}
            <IconCircleAlert class="text-error-400-600"/>
        {/if}
    {:else}
        {@render idleSnippet()}
    {/if}
</button>
