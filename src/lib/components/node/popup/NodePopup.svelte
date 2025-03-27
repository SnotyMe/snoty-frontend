<script lang="ts">
    import type { NodePopupProps } from "$lib/components/node/popup/index";
    import { onMount } from "svelte";

    let {
        dialog = $bindable(),
        instashow = false,
    }: NodePopupProps = $props();

    if (instashow) {
        onMount(() => dialog.showModal());
    }

    function close(event: MouseEvent) {
        const rect = dialog.getBoundingClientRect();

        // when the user clicks on a <select> choice, the coordinates are 0/0
        // this prevents closing when selecting a value from a dropdown
        const clickOnPopup = event.clientX == 0 && event.clientY == 0;
        const isInDialog =
            clickOnPopup
            || (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
                && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);

        if (!isInDialog) {
            dialog.close();
        }
    }

    function closeKeypress(event: KeyboardEvent) {
        if (event.key === "Escape") {
            dialog.close();
        }
    }
</script>

<style>
    :global(body) {
        transition: filter 0.5s;
    }

    :global(body:has(dialog[open])) {
        filter: blur(0.2em)
    }

    dialog[open] {
        animation: fade-in 0.3s ease-out;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: scaleY(0);
        }
        100% {
            opacity: 1;
            transform: scaleY(1);
        }
    }
</style>

<dialog
        bind:this={dialog}
        onclick={close}
        onkeypress={closeKeypress}
        class="w-8/12 max-w-4xl h-8/12 m-auto shadow-lg cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 overflow-x-hidden border"
>
    <slot/>
</dialog>