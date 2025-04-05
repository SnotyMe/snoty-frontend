<script lang="ts">
    import Alert from "$lib/components/ui/alert/Alert.svelte";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import type { Workflow } from "$lib/model/flows";
    import { exportFlow, type ExportOptions } from "$lib/api/flow_export_import_api";

    let options: ExportOptions = $state({
        withSensitiveData: false
    })
    
    interface Props {
        apiProps: ApiProps
        flow: Workflow
    }
    const { apiProps, flow }: Props = $props();
    
    async function download() {
        const exported = await exportFlow(apiProps, flow._id, options)
        
        if (isErrorJson(exported)) {
            alert("Something went wrong!")
            // TODO: error handling
            return
        }
        
        const url = window.URL.createObjectURL(exported)
        
        const a = document.createElement('a')
        a.style.display = "none"
        a.href = url
        a.download = `${flow.name}.json`;
        
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
    }
</script>

<style>
    .option > input {
        margin-right: 0.75em;
    }
</style>

<h1 class="h1">Export Flow</h1>
<form class="space-y-2 p-2">
    <div class="space-y-1">
        <label class="option">
            <input class="checkbox" type="checkbox" bind:checked={options.withSensitiveData}/>Include sensitive data
        </label>
        <div class="ml-8">
            <p>Will include credentials. Use when you want to create a backup for yourself.</p>
            <Alert level="warn" class="p-2">
                {#snippet content()}
                    <span class="inline">Do not share this file publicly!</span>
                {/snippet}
            </Alert>
        </div>
    </div>
    <LoadingButton clazz="mt-4!" onclick={download}>
        {#snippet idle()}
            Download
        {/snippet}
    </LoadingButton>
</form>
