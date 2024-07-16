<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";

    const CENSORED = "********";

    interface Props {
        key: string
        value: any
        metadata?: NodeField | undefined
        onchange?: (key: string, value: any) => void
    }

    let { key, value: actualValue, metadata = undefined, onchange }: Props = $props();

    // actually displayed value
    let valueState = $state(actualValue);
    if (metadata?.censored) {
        valueState = CENSORED;
    }

    function clicked() {
        if (metadata?.censored) {
            valueState = actualValue;
        }
    }

    function focusout(event: FocusEvent) {
        actualValue = (event.target as HTMLInputElement).value;
        valueState = actualValue;
        if (metadata?.censored) {
            valueState = CENSORED;
        }
        onchange?.(key, actualValue);
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
    <input type="text" value={valueState} onfocusin={clicked} onfocusout={focusout}/>
</div>
