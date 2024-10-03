<script lang="ts">
    import type { ScaleParams } from "svelte/transition"
    import { scale } from "svelte/transition"

    interface ScaleTransitionProps extends ScaleParams {}

    const ogProps: ScaleTransitionProps = $props()
    const transitionProps = {
        ...ogProps,
        duration: 400
    }
</script>

<style>
    div {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;
    }
</style>

<div transition:scale={transitionProps}>
    <slot/>
</div>
