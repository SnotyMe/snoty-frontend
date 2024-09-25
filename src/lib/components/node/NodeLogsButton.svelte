<script lang="ts">
    import { getAllLogs } from "$lib/utils/logs.svelte";
    import IconOpenLogs from "lucide-svelte/icons/scroll-text";

    interface Props {
        nodeId: string
    }

    const { nodeId }: Props = $props();
    let logs = getAllLogs()
</script>

<button class="block" on:click={() => console.log(logs.logs)}>
    <IconOpenLogs/>
</button>
