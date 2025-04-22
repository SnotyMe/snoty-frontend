<script lang="ts">
    interface Props {
        notificationCount: number
    }
    const { notificationCount }: Props = $props();
</script>

<span class="badge absolute top-0 right-0 z-10 preset-filled-error-500">{notificationCount}</span>
