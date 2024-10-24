<script lang="ts">
    import { liquid } from "@codemirror/lang-liquid";
    import { dracula } from "@uiw/codemirror-theme-dracula"
    import CodeMirror from "svelte-codemirror-editor"
    import type { CodemirrorProps } from "$lib/components/node/editor/codemirror";

    let { value: initialValue, onchange }: CodemirrorProps = $props();
    let value = $state(initialValue)
    $effect(() => {
        value = initialValue
    })
</script>

<CodeMirror
        on:change={(_) => onchange(value) }
        class="resize-y w-full max-w-full"
        lineWrapping={true}
        bind:value={value}
        lang={liquid()}
        theme={dracula}
/>
