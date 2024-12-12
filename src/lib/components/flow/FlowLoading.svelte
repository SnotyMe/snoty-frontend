<script lang="ts">
    import { writable } from "svelte/store";
    import { Background, SvelteFlow } from "@xyflow/svelte";

    const nodes = writable([]);
    const edges = writable([]);
</script>

<SvelteFlow proOptions={{hideAttribution: true}}
            {nodes}
            {edges}
>
    <Background/>
    <div class="w-full h-full flex justify-center items-center">
        <p>Loading...</p>
    </div>
</SvelteFlow>
