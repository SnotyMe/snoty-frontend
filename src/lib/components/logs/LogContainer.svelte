<script lang="ts">
    import { getFlowExecutions } from "$lib/api/flow_api";
    import type { NodeId } from "$lib/model/nodes";
    import { type ApiProps } from "$lib/api/api";
    import LogTable from "$lib/components/logs/LogTable.svelte";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import ExecutionStatusIcon from "../../../routes/flows/ExecutionStatusIcon.svelte";
    import { formatDate } from "$lib/utils/date_utils";
    import { Pagination } from "@skeletonlabs/skeleton-svelte";
    import type { FlowExecution } from "$lib/model/flows";
    import type { PageChangeDetails } from "@zag-js/pagination"
    import { ArrowLeftIcon, ArrowRightIcon } from "@lucide/svelte";
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

<ExecutionListener {apiProps} {flowId} bind:allExecutions/>

<NodeDrawer horizontalAlign="right" width="80%" height="80%" {isOpen} innerClass="flex flex-col justify-between">
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
            <div class="overflow-auto shrink">
                {#each slicedSource(allExecutions) as execution}
                    {@const logs = execution.logs.filter(logFilter)}
                    <div>
                        <ExecutionStatusIcon status={execution.status}/>
                        {execution.triggeredBy.type ?? execution.triggeredBy} @ {formatDate(execution.startDate)}
                        {#if logs.length > 0}
                            <div class="bg-surface-200-800 p-1 border-2 border-surface-900-100 rounded-sm mb-2">
                                <LogTable {logs}/>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>

        <Pagination class="w-full shrink-0 mt-1 justify-center" {page} {pageSize} count={allExecutions.length} onPageChange={pageChanged}>
            <Pagination.PrevTrigger>
                <ArrowLeftIcon class="size-4" />
            </Pagination.PrevTrigger>
            <Pagination.Context>
                {#snippet children(pagination)}
                    {#each pagination().pages as page, index (page)}
                        {#if page.type === 'page'}
                            <Pagination.Item {...page}>
                                {page.value}
                            </Pagination.Item>
                        {:else}
                            <Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
                        {/if}
                    {/each}
                {/snippet}
            </Pagination.Context>
            <Pagination.NextTrigger>
                <ArrowRightIcon class="size-4" />
            </Pagination.NextTrigger>
        </Pagination>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</NodeDrawer>
