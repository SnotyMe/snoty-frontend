<script lang="ts">
    import { Temporal } from "temporal-polyfill";

    interface Props {
        interval: string
        onchange: (interval: string) => void
    }

    let {
        interval: initialInterval,
        onchange,
    }: Props = $props();

    const initialDuration = Temporal.Duration.from(initialInterval);
    let unit = $state(initialDuration.hours != 0 ? "hours" : initialDuration.minutes != 0 ? "minutes" : "");
    let value = $state(initialDuration[unit] as number);
    let interval: string = $derived(`PT${value ?? 0}${unit[0].toUpperCase()}`);
    let duration: Temporal.Duration = $derived(Temporal.Duration.from(interval));

    const MIN_DURATION = Temporal.Duration.from("PT5M");
    const MAX_DURATION = Temporal.Duration.from("PT24H");

    let isDurationValid = $derived(
        Temporal.Duration.compare(MIN_DURATION, duration) <= 0
        && Temporal.Duration.compare(MAX_DURATION, duration) >= 0
    );

    $effect(() => {
        if (isDurationValid) onchange(interval);
    });
</script>

<div class="flex flex-row">
    <input type="number" class="input" placeholder="Run every" bind:value/>
    <select class="select" bind:value={unit}>
        <option value="minutes">Minute{value > 1 ? "s" : ""}</option>
        <option value="hours">Hour{value > 1 ? "s" : ""}</option>
    </select>
</div>
{#if !isDurationValid}
    <p class="text-red-500">Interval must be between 5 minutes and 24 hours.</p>
{/if}
