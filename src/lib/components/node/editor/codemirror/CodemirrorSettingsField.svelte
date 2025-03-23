<script lang="ts">
    import { dracula } from "@uiw/codemirror-theme-dracula"
    import { githubLight } from "@uiw/codemirror-theme-github";
    import CodeMirror from "svelte-codemirror-editor"
    import { type CodemirrorProps, getLanguage } from "$lib/components/node/editor/codemirror";
    import { getTheming } from "$lib/context/layout_context.svelte";

    let { value: initialValue, onchange, language }: CodemirrorProps = $props();
    let value = $state(initialValue);
    $effect(() => {
        value = initialValue;
    })

    const theming = getTheming()
</script>

<style>
    /* insanely scuffed fix to patch CodeMirror setting fields wrapping the last character..? */
    :global(.codemirror-wrapper.w-100n1) {
        overflow-y: hidden;
        & > div {
            width: 100.05% !important;
        }
    }
</style>

<CodeMirror
        on:change={(_) => onchange(value) }
        class="resize-y max-w-full w-100n1"
        lineWrapping={true}
        bind:value={value}
        lang={getLanguage(language)}
        theme={theming.colorScheme === "dark" ? dracula : githubLight}
/>
