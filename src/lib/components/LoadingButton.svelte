<script lang="ts">
    import type { Snippet } from "svelte";
    import IconCircleAlert from "lucide-svelte/icons/circle-alert"
    import IconLoader from "lucide-svelte/icons/loader"
    import { twMerge } from "tailwind-merge";

    interface Props {
        variant?: "button" | "icon-clear" | "empty"
        disabled?: boolean;
        onclick: () => Promise<any>
        onloaddone?: () => void
        class?: string
        loading?: Snippet
        idle: Snippet
        done?: Snippet
        error?: Snippet<[string]>
    }

    const props: Props = $props();
    const {
        variant = "button",
        disabled = false,
        onclick: handler,
        onloaddone,
        class: clazz = "",
        idle: idleSnippet,
        loading: loadingSnippet,
        done: doneSnippet,
        error: errorSnippet,
    } = props;

    let doing = $state(false);
    let done = $state(false);
    let errorMessage = $state<string | null>(null);

    async function onclick() {
        doing = true;
        done = false;
        try {
            await handler();
            done = true;
            onloaddone?.();
        } catch (e: any) {
            console.error("Error while doing something", e);
            errorMessage = e.message;
        }
        doing = false;
    }

    const baseStyle = $derived.by(() => {
        switch (variant) {
            case "button":
                return "btn preset-filled";
            case "icon-clear":
                return "btn-icon-clear";
            case "empty":
                return "";
        }
    });
</script>

<button {...props} disabled={disabled || doing} class={twMerge(baseStyle, clazz)} {onclick}>
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
