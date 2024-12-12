<script lang="ts">
    import type { StandaloneNode } from "$lib/model/nodes";
    import type { ApiProps } from "$lib/api/api";
    import type { ChangeEventHandler } from "svelte/elements";
    import { updateLogLevel } from "$lib/api/node_api";

    interface Props {
        node: StandaloneNode
        apiProps: ApiProps
    }
    const { node, apiProps }: Props = $props();

    let selected = $state(node.logLevel);

    const LOG_LEVELS = [
        { level: "DEBUG", color: "surface" },
        { level: "INFO", color: "primary" },
        { level: "WARN", color: "warning" },
        { level: "ERROR", color: "error" },
        { level: null, color: "black" }
    ]

    function getLevel(level: string) {
        return LOG_LEVELS.find(l => l.level === level) || LOG_LEVELS[LOG_LEVELS.length - 1];
    }

    const setSelected: ChangeEventHandler<HTMLSelectElement> = (({ target: { value: level } }) => {
        if (level === "") level = null;
        selected = level;
        node.logLevel = level;
        updateLogLevel(apiProps, node._id, level);
    })
</script>

<select class="select py-0 transition-none" style="color: rgb(var(--color-{getLevel(selected).color}-500))" onchange={setSelected}>
    {#each LOG_LEVELS as { level }}
        <option value={level} selected={selected === level}>{level}</option>
    {/each}
</select>
