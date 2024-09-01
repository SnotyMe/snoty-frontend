import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { getFlows } from "$lib/api/flow_api";
import { error_json, type ErrorJson } from "$lib/api/api";
import type { Workflow } from "$lib/model/flows";

export const load: PageServerLoad = async ({ locals, fetch }): Promise<{
    flows: Promise<Workflow[] | ErrorJson>
}> => {
    const token = ensureLoggedIn(locals)
    const apiProps = { token, fetch };

    return {
        flows: getFlows(apiProps)
            .catch(error_json)
    }
}
