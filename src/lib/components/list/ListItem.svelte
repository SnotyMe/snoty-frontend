<script>
    import { twMerge } from "tailwind-merge";

    const props = $props();
</script>

<div {...props} class={twMerge("card preset-filled-surface-100-900 gap-3 p-4 px-6 w-full flex justify-between items-center", props.class)}>
    <slot/>
</div>
