<script lang="ts">
    import { getFlowExecutions } from "$lib/api/flow_api";
    import type { NodeId } from "$lib/model/nodes";
    import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
    import LogTable from "$lib/components/logs/LogTable.svelte";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import ExecutionStatusIcon from "../../../routes/flows/ExecutionStatusIcon.svelte";
    import { formatDate } from "$lib/utils/date_utils";
    import { Pagination } from "@skeletonlabs/skeleton-svelte";
    import type { FlowExecution } from "$lib/model/flows";
    import IconArrowLeft from 'lucide-svelte/icons/arrow-left';
    import IconArrowRight from 'lucide-svelte/icons/arrow-right';
    import IconEllipsis from 'lucide-svelte/icons/ellipsis';
    import IconFirst from 'lucide-svelte/icons/chevrons-left';
    import IconLast from 'lucide-svelte/icons/chevron-right';
    import type { PageChangeDetails } from "@zag-js/pagination"
    import LogLevelSelector from "$lib/components/logs/LogLevelSelector.svelte";
    import { LogLevel, type NodeLogEntry } from "$lib/model/node_logs";
    import { getLevelIndex } from "$lib/components/logs/log_utils";
    import ExecutionListener from "$lib/components/logs/ExecutionListener.svelte";

    interface Props {
        isOpen: boolean
        flowId: NodeId
        apiProps: ApiProps
    }
    const { isOpen, flowId, apiProps }: Props = $props();

    const requestPageSize = 10;
    let allExecutions: FlowExecution[] = $state([]);
    const initialPromise = getFlowExecutions(apiProps, flowId, null, requestPageSize * 2)
        .then(fetched => {
            allExecutions = fetched
            return fetched
        });

    let page = $state(1);
    let pageSize = $state(requestPageSize);
    const slicedSource = $derived((s: FlowExecution[]) => s.slice((page - 1) * pageSize, page * pageSize));

    function pageChanged(changeDetails: PageChangeDetails) {
        page = changeDetails.page;
        if (page > 0 && requestPageSize * page >= allExecutions.length - 1) {
            const lastNode = allExecutions[allExecutions.length - 1].jobId;
            getFlowExecutions(apiProps, flowId, lastNode, requestPageSize)
                .then(newExecutions => allExecutions = allExecutions.concat(newExecutions));
        }
    }

    const filters: {
        logLevel: LogLevel | null
    } = $state({
        logLevel: null
    })
    function logFilter(entry: NodeLogEntry) {
        return filters.logLevel === null || getLevelIndex(entry.level) >= getLevelIndex(filters.logLevel);
    }
</script>

<ExecutionListener {flowId} bind:allExecutions/>

<NodeDrawer horizontalAlign="right" width="70%" height="70%" {isOpen} innerClass="flex flex-col justify-between">
    {#await initialPromise}
        <div>Loading logs...</div>
    {:then _}
        <div>
            <div class="flex p-1 justify-between">
                <b>Flow Logs</b>
                <div>
                    <LogLevelSelector onchange={level => filters.logLevel = level} level={null}/>
                </div>
            </div>
            <button onclick={() => authenticatedApiFetch(apiProps, `wiring/flow/${flowId}/send`)}>
                Send
            </button>
            <div class="overflow-auto flex-shrink">
                {#each slicedSource(allExecutions) as execution}
                    {@const logs = execution.logs.filter(logFilter)}
                    <div>
                        <ExecutionStatusIcon status={execution.status}/>
                        {execution.triggeredBy.type ?? execution.triggeredBy} @ {formatDate(execution.startDate)}
                        {#if logs.length > 0}
                            <div class="bg-surface-200-800 p-1 border-2 border-surface-900-100 rounded mb-2">
                                <LogTable {logs}/>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>

        <Pagination classes="flex-shrink-0 mt-1 justify-center" data={allExecutions} bind:page bind:pageSize onPageChange={pageChanged}>
            {#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
            {#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
            {#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
            {#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
            {#snippet labelLast()}<IconLast class="size-4" />{/snippet}
        </Pagination>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</NodeDrawer>
