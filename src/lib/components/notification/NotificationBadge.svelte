<script lang="ts">
    import { notificationCount } from "$lib/components/notification/notification_store";
</script>

<span class="badge absolute px-1.5 py-0.5 top-0 right-0 z-10 preset-filled-error-500">{$notificationCount}</span>
