<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";
    import { enumDetails, plaintextDetails } from "$lib/model/node_field_details";

    const CENSORED = "********";

    interface Props {
        key: string
        value: any
        metadata?: NodeField | undefined
        onchange?: (key: string, value: any) => void
        expanded?: boolean
    }

    let { key, value: outsideValue, metadata = undefined, onchange, expanded = false }: Props = $props();

    function render() {
        return metadata?.censored
            ? actualValue === "" ? "" : CENSORED
            : outsideValue;
    }

    let actualValue = outsideValue;
    $effect(() => {
        actualValue = outsideValue;
        displayState = render();
    });

    // actually displayed value
    let displayState = $state(render());

    function clicked() {
        if (metadata?.censored) {
            displayState = actualValue;
        }
    }

    function changed(event: UIEvent) {
        if (metadata?.type === "Boolean") {
            // we want true / false
            actualValue = (event.target as HTMLInputElement).checked;
        } else {
            actualValue = (event.target as HTMLInputElement).value;
        }
        displayState = render()
        onchange?.(key, actualValue);
    }

    const type = metadata?.type
</script>

<style>
    input {
        background: none;
    }

    div, input[type=text], textarea {
        width: 100%;
        --tw-ring-opacity: 0;

        &:focus {
            --tw-ring-opacity: 1;
        }
    }

    input[type="checkbox"] {
        --tw-ring-offset-width: 0px;
    }

    .singleline {
        resize: none;
    }

    .expanded * {
        padding-top: calc(0.5rem * var(--space-scale-factor));
        padding-bottom: calc(0.5rem * var(--space-scale-factor));
    }
</style>

<div class:expanded={expanded}>
    {#if type === "Boolean"}
        <input class="checkbox" type="checkbox" checked={actualValue} onchange={changed}/>
    {:else if type === "Enum"}
        <select class="select" onchange={changed}>
            {#each enumDetails(metadata).values as constant}
                <option value={constant.value} selected={constant.value === actualValue}>{constant.displayName}</option>
            {/each}
        </select>
    {:else}
        {#if expanded || (plaintextDetails(metadata)?.lines ?? -1) > 1}
            <textarea
                    rows="3"
                    class:singleline={(plaintextDetails(metadata)?.lines ?? -1) <= 1}
                    wrap="soft"
                    class="w-full input px-2 py-0.5 border-transparent"
                    onfocusin={clicked} onfocusout={changed}
            >{displayState}</textarea>
        {:else}
            <input
                    type="text"
                    class="input px-2 py-0.5 border-transparent"
                    onfocusin={clicked}
                    onfocusout={changed}
                    value={displayState}
            />
        {/if}
    {/if}
</div>
