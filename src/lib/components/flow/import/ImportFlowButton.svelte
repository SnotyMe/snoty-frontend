<script lang="ts">
    import { Dialog, Switch, Portal } from "@skeletonlabs/skeleton-svelte";
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

    let {apiProps, metadatas, templates}: Props = $props();

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
                settings: $state.snapshot(node.settings),
            }))
        };

        const createdId = await importFlow(apiProps, mappedFlow);
        await goto(`/flow/${createdId}`);
    }
</script>

<Dialog>
    <Dialog.Trigger class="btn-icon-clear">
        <IconUpload/>
    </Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop
                class="fixed inset-0 z-50 bg-surface-50-950/50 transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100"
        />
        <Dialog.Positioner class="fixed inset-0 z-50 flex justify-end">
            <Dialog.Content
                    class="resize-y bg-surface-50-950 border-l-2 border-surface-100-900 p-2 space-y-4 shadow-xl
                            min-w-[480px] w-[40vw] h-screen
                            transition transition-discrete duration-300 opacity-0 -translate-x-1/2
                            starting:data-[state=open]:opacity-0 starting:data-[state=open]:-translate-x-1/2
                            data-[state=open]:opacity-100 data-[state=open]:translate-x-0
                    "
            >
                <div class="h-full flex flex-col justify-between gap-2">
                    {#await Promise.all([metadatas, templates])}
                        <p>Loading...</p>
                    {:then [metadatas, templates]}
                        <ImportFlow bind:flow {showIntermediate} {metadatas} {templates}/>
                    {/await}

                    <div class="w-full flex justify-between">
                        <div class="flex flex-row items-center gap-2">
                            <button class="btn preset-filled" onclick={() => shown = false}>Close</button>
                            <Switch>
                                <Switch.Control>
                                    <Switch.Thumb/>
                                </Switch.Control>
                                <Switch.Label class="text-sm">Show intermediate nodes</Switch.Label>
                                <Switch.HiddenInput/>
                            </Switch>
                        </div>
                        <LoadingButton disabled={flow == null} onclick={create}>
                            {#snippet idle()}
                                <IconRocket/>
                                Import
                            {/snippet}
                        </LoadingButton>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>
