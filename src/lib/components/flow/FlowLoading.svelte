<script lang="ts">
    import { writable } from "svelte/store";
    import type { ColorMode } from "@xyflow/svelte";
    import { Background, SvelteFlow } from "@xyflow/svelte";

    export let colorScheme: ColorMode

    const nodes = writable([])
    const edges = writable([])
</script>

<SvelteFlow proOptions={{hideAttribution: true}}
            colorMode="dark"
            {nodes}
            {edges}
>
    <Background/>
    <div class="w-full h-full flex justify-center items-center">
        <p>Loading...</p>
    </div>
</SvelteFlow>
