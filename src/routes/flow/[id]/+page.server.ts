import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { getFlow } from "$lib/api/flow_api";
import { getNodeMetadatas, getNodeTemplates } from "$lib/api/node_api";

export const load: PageServerLoad = async ({ locals, fetch, params }) => {
    const token = ensureLoggedIn(locals)

    const flow = getFlow({ token, fetch }, params.id)
    const metadatas = getNodeMetadatas({ token, fetch })
    const templates = getNodeTemplates({ token, fetch })

    return Promise.all([flow, metadatas, templates])
        .then(([flow, metadatas, templates]) => {
            return {
                flow,
                metadatas,
                templates,
                colorScheme: locals.colorScheme,
            }
        })
}
