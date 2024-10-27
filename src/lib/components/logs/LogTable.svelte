<script lang="ts">
    import type { NodeLogEntry } from "$lib/model/node_logs";
    import LogLine from "$lib/components/logs/LogLine.svelte";

    interface Props {
        logs: NodeLogEntry[]
    }

    const { logs }: Props = $props();
</script>

<table class="border-spacing-0 w-full">
    <tbody>
    {#each logs.toReversed() as log}
        <LogLine {log}/>
    {/each}
    </tbody>
</table>
