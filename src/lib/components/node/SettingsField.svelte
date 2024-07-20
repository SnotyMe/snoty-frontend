<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";
    import { enumDetails } from "$lib/model/node_field_details";

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

    function changed(event: UIEvent) {
        if (metadata?.type === "Boolean") {
            // we want true / false
            actualValue = (event.target as HTMLInputElement).checked;
        } else {
            actualValue = (event.target as HTMLInputElement).value;
        }
        valueState = actualValue;
        if (metadata?.censored) {
            valueState = CENSORED;
        }
        onchange?.(key, actualValue);
    }

    const type = metadata?.type
</script>

<style>
    input {
        background: none;
    }

    div, input[type="text"] {
        width: 100%;
        --tw-ring-opacity: 0;

        &:focus {
            --tw-ring-opacity: 1;
        }
    }

    input[type="checkbox"] {
        --tw-ring-offset-width: 0px;
    }
</style>

<div>
    {#if type === "Boolean"}
        <input class="checkbox" type="checkbox" checked={actualValue} onchange={changed}/>
    {:else if type === "Enum"}
        <select class="select" onchange={changed}>
            {#each enumDetails(metadata).values as constant}
                <option value={constant.value} selected={constant.value === actualValue}>{constant.displayName}</option>
            {/each}
        </select>
    {:else}
        <input class="input px-2 py-0.5 border-transparent" type="text" value={valueState} onfocusin={clicked} onfocusout={changed}/>
    {/if}
</div>
