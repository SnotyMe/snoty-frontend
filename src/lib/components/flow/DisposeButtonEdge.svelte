<script lang="ts">
    import { BaseEdge, EdgeLabel, type EdgeProps, getBezierPath, useEdges } from '@xyflow/svelte';
    import IconX from 'lucide-svelte/icons/x';

    const {
        id,
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        markerEnd,
        style,
        data,
    }: EdgeProps = $props();

    let [edgePath, labelX, labelY] = $derived(
        getBezierPath({
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
        }),
    );

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
<EdgeLabel class="edgeButtonContainer" style="background: none!important" x={labelX} y={labelY}>
    <button class="edgeButton border-surface-900-100 bg-surface-100-900 hover:bg-surface-200-800" onclick={onEdgeClick}>
        <IconX class="mx-auto"/>
    </button>
</EdgeLabel>

<style>
    :global(.edgeButtonContainer) {
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
