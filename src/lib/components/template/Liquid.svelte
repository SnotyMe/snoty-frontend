<script lang="ts">
    import * as liquidjs from "liquidjs";

    interface Props {
        template: string | undefined
        inputs: Record<string, any>
    }

    const { template, inputs }: Props = $props();

    const engine = new liquidjs.Liquid();
</script>

{#if template !== undefined}
    {@const rendered = engine.parseAndRender(template, inputs)}
    {#await rendered}
    {:then result}
        {@html result}
    {:catch error}
        <div>{error.message}</div>
    {/await}
{/if}
