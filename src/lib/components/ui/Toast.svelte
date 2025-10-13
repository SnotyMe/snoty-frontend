<script lang="ts">
    import * as toast from "@zag-js/toast";
    import { Toast } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        toaster: toast.Store
    }
    const { toaster }: Props = $props();
</script>

<Toast.Group {toaster}>
    {#snippet children(toast)}
        <Toast {toast}>
            <Toast.Message>
                <Toast.Title>{toast.title}</Toast.Title>
                <Toast.Description>{toast.description}</Toast.Description>
            </Toast.Message>
            {#if toast.closable !== false}<Toast.CloseTrigger />{/if}
        </Toast>
    {/snippet}
</Toast.Group>
