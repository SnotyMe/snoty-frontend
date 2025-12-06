<script lang="ts">

    interface Props {
        size: number;
    }

    const {size = 24}: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 {size} {size}" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-icon lucide-square">
    <rect width={size/2} height={size/2} x={size/4} y={size/4} rx="2"/>
</svg>
