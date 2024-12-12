<script lang="ts">
    import { Modal, Switch } from "@skeletonlabs/skeleton-svelte";
    import IconUpload from "lucide-svelte/icons/upload";
    import IconRocket from "lucide-svelte/icons/rocket";
    import ImportFlow from "$lib/components/flow/import/ImportFlow.svelte";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import type { NodeMetadataMap, NodeTemplatesMap } from "$lib/model/nodes";
    import { importFlow } from "$lib/api/flow_export_import_api";
    import type { ApiProps } from "$lib/api/api";
    import { goto } from "$app/navigation";
    import type { FlowWithSettingsStore } from "$lib/components/flow/import/utils";

    interface Props {
        metadatas: Promise<NodeMetadataMap>
        templates: Promise<NodeTemplatesMap>
        apiProps: ApiProps
    }
    let { apiProps, metadatas, templates }: Props = $props();

    let shown = $state(false);
    let showIntermediate = $state(false);

    let flow: FlowWithSettingsStore | null = $state(null);

    async function create() {
        if (!flow) {
            console.error("Flow is null");
            return;
        }

        const mappedFlow = {
            ...flow,
            nodes: flow.nodes.map(node => ({
                ...node,
                settings: $state.snapshot(node.settingsStore.settings),
                settingsStore: null,
            }))
        };

        const createdId = await importFlow(apiProps, mappedFlow);
        await goto(`/flow/${createdId}`);
    }
</script>

<Modal
        bind:open={shown}
        triggerBase="px-4 py-2"
        contentBase="resize-y bg-surface-50-950 border-l-2 border-surface-100-900 py-2 space-y-4 shadow-xl min-w-[480px] w-[40vw] h-screen"
        positionerJustify="justify-end"
        positionerAlign=""
        positionerPadding=""
        transitionsPositionerIn={{ x: -480, duration: 200 }}
        transitionsPositionerOut={{ x: -480, duration: 200 }}
>
    {#snippet trigger()}
        <IconUpload/>
    {/snippet}
    {#snippet content()}
        <div class="h-full flex flex-col justify-between gap-2">
            {#await Promise.all([metadatas, templates])}
                <p>Loading...</p>
            {:then [metadatas, templates]}
                <ImportFlow bind:flow {showIntermediate} {metadatas} {templates}/>
            {/await}
            <div class="w-full flex justify-between px-2">
                <div class="flex flex-row items-center gap-2">
                    <button class="btn preset-filled" onclick={() => shown = false}>Close</button>
                    <Switch base="inline-flex items-center gap-1" labelClasses="!ring-0 !ring-transparent" name="show-intermediate-nodes" bind:checked={showIntermediate}>
                        Show intermediate nodes
                    </Switch>
                </div>
                <LoadingButton disabled={flow == null} onclick={create}>
                    {#snippet idle()}
                        <IconRocket/>Import
                    {/snippet}
                </LoadingButton>
            </div>
        </div>
    {/snippet}
</Modal>
