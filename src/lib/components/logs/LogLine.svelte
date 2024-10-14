<script lang="ts">
    import ArrowRight from "lucide-svelte/icons/chevron-right";
    import ArrowDown from "lucide-svelte/icons/chevron-down";
    import type { NodeLogEntry } from "$lib/model/node_logs";
    import { getLevelColor } from "$lib/components/logs/log_utils";
    import { formatDate, formattedDateLength } from "$lib/utils/date_utils";

    interface Props {
        log: NodeLogEntry
    }

    const { log }: Props = $props();

    let expanded = $state(false);
    let lastWasContainer = false;
    function toggleExpanded(target: "container" | "handle") {
        if (target === "container") {
            // it only acted if it was closed previously
            lastWasContainer = !expanded;
            expanded = true;
        } else if (target == "handle") {
            // prevents insta-closing when the container just opened it
            if (!lastWasContainer) {
                expanded = !expanded;
            }
            lastWasContainer = false;
        }
    }
</script>

<style>
    tr {
        margin-top: 20px;
        vertical-align: top;
    }

    .level {
        position: relative;
        padding-right: 0.5em;

        &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0.1em;
            bottom: 0.1em;
            left: 0.2em;
            width: 0.25em;
        }
    }

    td.message {
        white-space: nowrap;
        overflow: clip;
        text-overflow: ellipsis;

        &.expanded {
            white-space: normal;
            /* leave some more space for the expanded message */
            padding-bottom: 0.5em;
        }
    }

    td:not(.message) {
        width: max-content;
    }

    tr:not(:has(td.message.expanded)) {
        cursor: pointer;
    }
</style>

<tr class="my-4" onmousedown={() => toggleExpanded("container")}>
    <td class="level after:bg-{getLevelColor(log.level)}"></td>
    <td class="cursor-pointer" onmouseup={() => toggleExpanded("handle")}>
        {#if expanded}<ArrowDown/>{:else}<ArrowRight/>{/if}
    </td>
    <td style="width: {formattedDateLength-1}ch">
        {formatDate(log.timestamp)}
    </td>
    <td class="message" class:expanded={expanded}>
        {log.message}
    </td>
</tr>
