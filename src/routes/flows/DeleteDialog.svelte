<script lang="ts">
    // TODO: switch to modal once skeleton releases them

    import IconTrash from "lucide-svelte/icons/trash"
    import type { ApiProps } from "$lib/api/api";
    import { deleteFlow } from "$lib/api/flow_api";
    import LoadingButton from "$lib/components/LoadingButton.svelte";

    interface Props {
        flowId: string;
        apiProps: ApiProps;
    }

    const { flowId, apiProps }: Props = $props();
</script>

<LoadingButton class="" onclick={() => deleteFlow(apiProps, flowId)} onloaddone={() => window.location.reload()}>
    {#snippet idle()}
        <IconTrash/>
    {/snippet}
</LoadingButton>
