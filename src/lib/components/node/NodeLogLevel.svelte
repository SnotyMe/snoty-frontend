<script lang="ts">
    import type { StandaloneNode } from "$lib/model/nodes";
    import type { ApiProps } from "$lib/api/api";
    import LogLevelSelector from "$lib/components/logs/LogLevelSelector.svelte";
    import { updateLogLevel } from "$lib/api/node_api";
    import type { LogLevel } from "$lib/model/node_logs";

    interface Props {
        node: StandaloneNode
        apiProps: ApiProps
    }
    const { node, apiProps }: Props = $props();

    function onchange(level: LogLevel | null) {
        node.logLevel = level;
        updateLogLevel(apiProps, node._id, level)
    }
</script>

<LogLevelSelector {onchange} level={node.logLevel}/>
