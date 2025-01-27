<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    import type { LogLevel } from "$lib/model/node_logs";

    const LOG_LEVELS = [
        { level: "DEBUG", color: "surface" },
        { level: "INFO", color: "primary" },
        { level: "WARN", color: "warning" },
        { level: "ERROR", color: "error" },
        { level: null, color: "black" }
    ]

    interface Props {
        level: LogLevel | null
        onchange: (level: LogLevel | null) => void
    }

    const { level: initialLevel, onchange }: Props = $props();
    let selected = $state(initialLevel);

    function getLevel(level: string | null) {
        return LOG_LEVELS.find(l => l.level === level) || LOG_LEVELS[LOG_LEVELS.length - 1];
    }

    const setSelected: ChangeEventHandler<HTMLSelectElement> = (({ target: { value: level } }) => {
        if (level === "") level = null;
        selected = level;
        onchange(level);
    })
</script>

<select class="select py-0 transition-none" style="color: rgb(var(--color-{getLevel(selected).color}-500))" onchange={setSelected}>
    {#each LOG_LEVELS as { level }}
        <option value={level} selected={selected === level}>{level}</option>
    {/each}
</select>
