<script lang="ts">
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
            value: '{{ name }}',
            language: 'liquid',
            theme: "vs-dark",
            suggest: {
                matchOnWordStartOnly: false
            }
        });

        // auto-resize monaco with parent
        window.addEventListener('resize', () => {
            // make editor as small as possible
            editor.layout({ width: 0, height: 0 })

            // wait for next frame to ensure last layout finished
            window.requestAnimationFrame(() => {
                // get the parent dimensions and re-layout the editor
                const rect = editorContainer.getBoundingClientRect()
                editor.layout({ width: rect.width, height: rect.height })
            })
        })
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });
</script>

<div class="w-full h-full" bind:this={editorContainer}></div>
