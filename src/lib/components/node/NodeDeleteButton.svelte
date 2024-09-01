<script lang="ts">
    import IconTrash from "lucide-svelte/icons/trash-2";

    interface Props {
        ondelete: () => void
    }
    let { ondelete }: Props = $props()
</script>

<button onclick={ondelete} class="block">
    <IconTrash/>
</button>
