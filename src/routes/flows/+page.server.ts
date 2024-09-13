import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import type { FlowExecution, Workflow } from "$lib/model/flows";
import { getFlowExecutions, getFlows } from "$lib/api/flow_api";

export const load: PageServerLoad = async ({ locals, fetch }): Promise<{
    flows: Promise<(Workflow & { lastExecution: FlowExecution | undefined })[]>
}> => {
    const token = ensureLoggedIn(locals)
    const apiProps = { token, fetch };

    const flows = getFlows(apiProps)
    const flowExecutions = getFlowExecutions(apiProps)

    console.log(flows, flowExecutions)

    const flows2 = await Promise.all([flows, flowExecutions])
        .then(([flows, executions]) =>
            flows.map(flow => ({
                ...flow,
                lastExecution: executions.find(exec => exec.flowId === flow._id)
            }))
        )
    console.log(flows2)

    return {
        flows: flows2
    }
}
