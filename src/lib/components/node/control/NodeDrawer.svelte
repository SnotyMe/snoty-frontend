<script lang="ts">
    import type { PopupProps } from ".";

    const {
        isOpen,
        width,
        height,
        verticalAlign = "top",
        horizontalAlign
    }: PopupProps = $props();
</script>

<style>
    #container {
        position: absolute;
        --y-padding: calc(var(--flow-control-padding) * 2 + var(--flow-control-button-size));
        --x-padding: var(--flow-control-padding);

        max-width: calc(100% - 2 * var(--x-padding));
        max-height: calc(100% - var(--y-padding) - var(--flow-control-padding));

        resize: both;

        &.rtl {
            /* moves the handle to the bottom right */
            direction: rtl;
        }

        & > div {
            /* reset direction back to ltr */
            direction: ltr;
            height: 100%;
            overflow-y: auto;
        }
    }
</style>

<div class:hidden={!isOpen}
     class:rtl={horizontalAlign === "right"}
     style={`${horizontalAlign}: var(--x-padding); ${verticalAlign}: var(--y-padding); width: ${width}; height: ${height}`}
     id="container"
     class="text-sm z-10 flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 overflow-hidden block border">
    <div>
        <slot/>
    </div>
</div>
