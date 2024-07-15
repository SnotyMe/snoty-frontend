import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { getFlows } from "$lib/api/flow_api";
import { getNodeMetadata, type NodeMetadata, type StandaloneNode } from "$lib/model/nodes";
import { example_node_metadata } from "$lib/data/example_data";

export const load: PageServerLoad = async ({ locals, fetch }): Promise<{
    flows: Promise<{ node: StandaloneNode, metadata: NodeMetadata }[]>
}> => {
    const token = ensureLoggedIn(locals)

    return {
        flows: getFlows(token, fetch)
            .then(nodes => nodes.map(node => ({
                node: node,
                metadata: getNodeMetadata(example_node_metadata, node.descriptor)
            }))).catch(e => e)
    }
}
