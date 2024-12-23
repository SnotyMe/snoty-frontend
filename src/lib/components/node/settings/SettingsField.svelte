<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";
    import { enumDetails, isNumberType, plaintextDetails } from "$lib/model/node_field_details";
    import LazyCodemirrorSettingsField from "$lib/components/node/editor/codemirror/LazyCodemirrorSettingsField.svelte";

    const CENSORED = "********";

    interface Props {
        value: any
        metadata?: NodeField | undefined
        expanded?: boolean
        class?: string
    }

    let {
        value: outsideValue = $bindable(),
        metadata = undefined,
        expanded = false,
        class: clazz = "",
    }: Props = $props();

    function onchange(actualValue: any) {
        outsideValue = actualValue
    }

    function render() {
        return metadata?.censored
            ? actualValue === "" ? "" : CENSORED
            : outsideValue;
    }

    let actualValue = $state(outsideValue);
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
        displayState = render();
        onchange?.(actualValue);
    }

    function stringChanged(value: string) {
        actualValue = value;
        displayState = render();
        onchange?.(actualValue);
    }

    const type = metadata?.type;
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

    .setting-container > *:not(.input-field) {
        margin-left: var(--node-setting-padding);
    }
</style>

<div class:expanded={expanded} class="{clazz} setting-container">
    {#if type === "Boolean"}
        <input class="checkbox" type="checkbox" checked={actualValue} onchange={changed}/>
    {:else if type === "Enum"}
        <select class="select" onchange={changed}>
            {#each enumDetails(metadata).values as constant}
                {#key actualValue}
                    <option value={constant.value} selected={constant.value === actualValue}>{constant.displayName}</option>
                {/key}
            {/each}
        </select>
    {:else if isNumberType(type)}
        <input class="input-field" type="number" value={actualValue} onfocusin={clicked} onfocusout={changed} onchange={changed}/>
    {:else}
        {@const plain = plaintextDetails(metadata)}
        {#if expanded || (plain?.lines ?? 1) >= 1 || plain?.language}
            {#if (expanded || plain?.language) && metadata?.censored !== true}
                <LazyCodemirrorSettingsField
                    value={displayState}
                    onchange={stringChanged}
                    language={plain?.language}
                />
            {:else}
                <textarea
                        rows={plain?.lines ?? 1}
                        class:singleline={metadata ? (plain?.lines ?? 3) <= 1 : true}
                        wrap="soft"
                        class="w-full input-field"
                        onfocusin={clicked} onfocusout={changed}
                >{displayState}</textarea>
            {/if}
        {:else}
            <input
                    type="text"
                    class="input-field"
                    onfocusin={clicked}
                    onfocusout={changed}
                    value={displayState}
            />
        {/if}
    {/if}
</div>
