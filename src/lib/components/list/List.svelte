<script>
    import { twMerge } from "tailwind-merge";

    const props = $props();
</script>

<div {...props} class={twMerge("space-y-4 min-w-44 md:min-w-128", props.class)}>
    <slot/>
</div>
