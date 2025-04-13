<script lang="ts">
    import IconRocket from "lucide-svelte/icons/rocket";
    import IconCircleCheck from "lucide-svelte/icons/circle-check";
    import { triggerFlow } from "$lib/api/flow_api";
    import type { ApiProps } from "$lib/api/api";
    import { FlowExecutionStatus, type Workflow } from "$lib/model/flows";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import { establishListener } from "$lib/api/flow_execution_listener";
    import type { FlowEndedEvent } from "$lib/api/flow_execution_listener.js";
    import { getToaster } from "$lib/context/layout_context.svelte";

    interface Props {
        apiProps: ApiProps
        flow: Workflow
    }
    const { apiProps, flow }: Props = $props();

    let statusPromiseResolve: (_: FlowExecutionStatus) => void;
    let statusPromise: Promise<FlowExecutionStatus>;
    function reinitPromise() {
        statusPromise = new Promise(resolve => {
            statusPromiseResolve = resolve;
        });
    }
    reinitPromise()

    const executionListener = establishListener(apiProps, flow._id, ["FlowEnded"])
    executionListener.addEventListener("FlowEnded", (event) => {
        const { status }: FlowEndedEvent = JSON.parse(event.data)
        statusPromiseResolve(status)
    })

    const toaster = getToaster()

    async function trigger() {
        await triggerFlow(apiProps, flow._id)
        toaster.info({
            title: "Flow triggered!",
            description: "Flows may take a while before running."
        })

        const status = await statusPromise;
        reinitPromise();

        switch (status) {
            case FlowExecutionStatus.SUCCESS:
                toaster.success({
                    title: "Flow succeeded!",
                })
                break;
            case FlowExecutionStatus.FAILED:
                toaster.error({
                    title: "Flow failed!",
                    description: "Take a look at the journal to figure out why."
                })
                throw Error("Flow failed")
            default:
                console.error("FlowExecutionStatus was neither SUCCESS nor FAILED")
        }
    }
</script>

<style>
    :global(.svelte-flow__controls-button.svelte-flow__controls-trigger) {
        border-bottom: none;
        border-right: 1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)));

        &:disabled {
            /* accounts for the visual width change due to the 50% opacity */
            border-right-width: 2px;
        }
    }
</style>

<LoadingButton
        onclick={trigger}
        class="svelte-flow__controls-button svelte-flow__controls-trigger no-fill"
        title="trigger run"
        aria-label="trigger run"
>
    {#snippet idle()}
        <IconRocket/>
    {/snippet}
    {#snippet done()}
        <IconCircleCheck class="text-success-400-600"/>
    {/snippet}
</LoadingButton>
