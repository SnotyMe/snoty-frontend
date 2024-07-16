import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { getFlows } from "$lib/api/flow_api";
import { type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";

export const load: PageServerLoad = async ({ locals, fetch }): Promise<{
    flows: Promise<{ node: StandaloneNode, metadata: NodeMetadata }[]>
}> => {
    const token = ensureLoggedIn(locals)
    const apiProps = { token, fetch };

    return {
        flows: getFlows(apiProps)
            .catch(e => e)
    }
}
