<script lang="ts">
    import type { ApiProps } from "$lib/api/api";
    import type { Workflow } from "$lib/model/flows";
    import RecurringScheduleForm from "$lib/components/flow/settings/RecurringScheduleForm.svelte";
    import { updateFlowSettings } from "$lib/api/flow_api";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import CronScheduleForm from "$lib/components/flow/settings/CronScheduleForm.svelte";
    import { Dialog } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        apiProps: ApiProps
        flow: Workflow
        onclose: () => void
    }

    const {
        apiProps,
        flow,
        onclose,
    }: Props = $props();
    let settings = $state(flow.settings)

    async function update() {
        const response = await updateFlowSettings(apiProps, flow._id, settings)
        if (!response.ok) throw Error(`updating settings: ${await response.text()}`)

        onclose()
    }
</script>

<Dialog.Title class="h1 text-center">Flow Settings</Dialog.Title>
<div class="space-y-8">
    <div>
        <div class="flex justify-between mb-2">
            <h4 class="h4">Schedule</h4>
            <select class="select w-min"
                    onchange={e => { settings.schedule = { type: e.target.value } }}
                    value={settings.schedule.type}
            >
                <option value="recurring">Recurring</option>
                <option value="cron">Cron</option>
                <option value="never">Never</option>
            </select>
        </div>
        {#if settings.schedule.type === "recurring"}
            <RecurringScheduleForm
                interval={settings.schedule.interval ?? "PT15M"}
                onchange={interval => settings.schedule.interval = interval}
            />
        {:else if settings.schedule.type === "cron"}
            <CronScheduleForm
                expression={settings.schedule.expression ?? "0 8 * * *"}
                onchange={expression => settings.schedule.expression = expression}
            />
        {:else if settings.schedule.type === "never"}
            <!-- no settings -->
        {:else}
            <p class="text-error-500">Flow schedule type {settings.schedule.type} is not supported</p>
        {/if}
    </div>
    <div class="flex justify-end">
        <LoadingButton class="btn preset-filled" onclick={update}>
            {#snippet idle()}
                Save
            {/snippet}
        </LoadingButton>
    </div>
</div>
