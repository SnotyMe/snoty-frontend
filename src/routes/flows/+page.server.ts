import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { enumerateFlowExecutions, getFlows } from "$lib/api/flow_api";
import type { EnumeratedFlowExecution, Workflow } from "$lib/model/flows";

export const load: PageServerLoad = async ({ locals, fetch }): Promise<App.Locals & {
    flows: Promise<(Workflow & { lastExecution: EnumeratedFlowExecution | undefined })[]>
}> => {
    const token = ensureLoggedIn(locals)
    const apiProps = { token, fetch };

    const flows = getFlows(apiProps)
    const flowExecutions = enumerateFlowExecutions(apiProps)

    return {
        ...locals,
        flows: Promise.all([flows, flowExecutions])
            .then(([flows, executions]) =>
                flows.map(flow => ({
                    ...flow,
                    lastExecution: executions.find(exec => exec.flowId === flow._id)
                }))
            )
    }
}
