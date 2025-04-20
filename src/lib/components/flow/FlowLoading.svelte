<script lang="ts">
    import { Background, SvelteFlow } from "@xyflow/svelte";

    const nodes = $state.raw([]);
    const edges = $state.raw([]);
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
