<script lang="ts">
    import { liquid } from "@codemirror/lang-liquid";
    import { dracula } from "@uiw/codemirror-theme-dracula"
    import CodeMirror from "svelte-codemirror-editor"

    interface Props {
        value: string
        onchange: (value: string) => void
    }

    let { value: initialValue, onchange }: Props = $props();
    let value = $state(initialValue)
    $effect(() => value = initialValue)
</script>

<CodeMirror
        on:change={(c) => onchange(value)}
        class="resize-y w-full max-w-full"
        lineWrapping={true}
        bind:value={value}
        lang={liquid()}
        theme={dracula}
/>
