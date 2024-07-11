<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";

    const CENSORED = "********";

    interface Props {
        value: any
        metadata?: NodeField | undefined
    }

    let { value: initialValue, metadata = undefined }: Props = $props();

    let value = $state(initialValue);
    if (metadata?.censored) {
        value = CENSORED;
    }

    function clicked(event: MouseEvent) {
        if (metadata?.censored) {
            (event.target as HTMLInputElement).value = initialValue;
        }
    }

    function focusout(event: FocusEvent) {
        if (metadata?.censored) {
            initialValue = (event.target as HTMLInputElement).value;
            (event.target as HTMLInputElement).value = CENSORED;
        }
    }
</script>

<style>
    input {
        background: none;
    }

    div, input {
        width: 100%;
    }
</style>

<div>
    <input type="text" bind:value={value} onmousedown={clicked} onfocusout={focusout}/>
</div>
