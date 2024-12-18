import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { enumerateFlowExecutions, getFlows } from "$lib/api/flow_api";
import type { EnumeratedFlowExecution, Workflow } from "$lib/model/flows";
import { type ErrorJson, isErrorJson } from "$lib/api/api";

export const load: PageServerLoad = async ({ locals, fetch }): Promise<App.Locals & {
    flows: Promise<(Workflow & { lastExecution: EnumeratedFlowExecution | undefined })[] | ErrorJson>
}> => {
    const token = ensureLoggedIn(locals);
    const apiProps = { token, fetch };

    const flows = getFlows(apiProps);
    const flowExecutions = enumerateFlowExecutions(apiProps);

    return {
        ...locals,
        flows: Promise.all([flows, flowExecutions])
            .then(([flows, executions]) => {
                if (isErrorJson(flows)) {
                    return flows as ErrorJson;
                }
                if (isErrorJson(executions)) {
                    return executions as ErrorJson;
                }

                return flows.map(flow => ({
                    ...flow,
                    lastExecution: executions.find(exec => exec.flowId === flow._id)
                }));
            })
    };
}
