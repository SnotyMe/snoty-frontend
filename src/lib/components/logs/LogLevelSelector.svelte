<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    import { LogLevel } from "$lib/model/node_logs";

    const choices: (LogLevel | null)[] = [
        LogLevel.DEBUG,
        LogLevel.INFO,
        LogLevel.WARN,
        LogLevel.ERROR,
        null
    ];

    interface Props {
        level: LogLevel | null
        onchange: (level: LogLevel | null) => void
    }

    const { level: initialLevel, onchange }: Props = $props();
    let selected = $state(initialLevel);

    const setSelected: ChangeEventHandler<HTMLSelectElement> = (({ target: { value: level } }) => {
        if (level === "") level = null;
        selected = level;
        onchange(level);
    })
</script>

<select class="select py-0 transition-none" style="color: var(--color-log-{selected?.toLowerCase()})" onchange={setSelected}>
    {#each choices as level}
        <option value={level} selected={selected === level}>{level}</option>
    {/each}
</select>
