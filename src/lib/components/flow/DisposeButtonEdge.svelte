<script lang="ts">
    import { BaseEdge, EdgeLabelRenderer, type EdgeProps, getBezierPath, useEdges } from '@xyflow/svelte';
    import IconX from 'lucide-svelte/icons/x';

    type $$Props = EdgeProps;

    export let id: $$Props['id'];
    export let sourceX: $$Props['sourceX'];
    export let sourceY: $$Props['sourceY'];
    export let sourcePosition: $$Props['sourcePosition'];
    export let targetX: $$Props['targetX'];
    export let targetY: $$Props['targetY'];
    export let targetPosition: $$Props['targetPosition'];
    export let markerEnd: $$Props['markerEnd'] = undefined;
    export let style: $$Props['style'] = undefined;
    export let data: $$Props['data'] = undefined;

    $: [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    const edges = useEdges();

    function onEdgeClick() {
        function del() {
            edges.update((eds) => eds.filter((edge) => edge.id !== id));
        }

        if (!data.ondisconnect) {
            del();
        } else {
            const promise = data.ondisconnect?.(new CustomEvent('disconnect', { detail: { id } })) as Promise<any>;
            promise.then(del).catch(error => {
                alert("Couldn't disconnect.")
                console.error("Error while attempting to disconnect", error)
            });
        }
    }
</script>

<BaseEdge path={edgePath} {markerEnd} {style}/>
<EdgeLabelRenderer>
    <div
            class="edgeButtonContainer nodrag nopan"
            style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
    >
        <button class="edgeButton border-surface-900-100 bg-surface-100-900 hover:bg-surface-200-800" on:click={onEdgeClick}>
            <IconX class="mx-auto"/>
        </button>
    </div>
</EdgeLabelRenderer>

<style lang="postcss">
    .edgeButtonContainer {
        position: absolute;
        font-size: 12pt;
        /* everything inside EdgeLabelRenderer has no pointer events by default */
        pointer-events: all;
    }

    .edgeButton {
        width: 1em;
        height: 1em;
        border-width: 1px;
        cursor: pointer;
        border-radius: 50%;
        font-size: 2em;
    }
</style>
