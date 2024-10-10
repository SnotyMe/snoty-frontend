<script lang="ts">
    interface Props {
        value: string
        onfocusout: (value: string) => void
    }
    const { value }: Props = $props();

    import { onDestroy, onMount } from 'svelte';
    import loader from '@monaco-editor/loader';
    import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

    let editor: Monaco.editor.IStandaloneCodeEditor;
    let monaco: typeof Monaco;
    let editorContainer: HTMLElement;

    onMount(async () => {
        const monacoEditor = await import("monaco-editor");
        loader.config({ monaco: monacoEditor.default });

        monaco = await loader.init();
        const configure = (await import("$lib/editor/monaco/monaco"));
        configure.configurations.forEach(config => config(monaco))

        editor = monaco.editor.create(editorContainer, {
            value,
            language: 'liquid',
            theme: "vs-dark",
            minimap: {
                enabled: false,
            },
            tabFocusMode: true,
            lineNumbersMinChars: 2,
            automaticLayout: true,
            suggest: {
                matchOnWordStartOnly: false
            }
        });
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });
</script>

<div class="w-full min-h-48 resize" bind:this={editorContainer}></div>
