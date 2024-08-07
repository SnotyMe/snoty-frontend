import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { getFlow } from "$lib/api/flow_api";
import { nodeMetadata } from "$lib/api/node_api";

export const load: PageServerLoad = async ({ locals, fetch, params }) => {
    const token = ensureLoggedIn(locals)

    const flow = await getFlow({ token, fetch }, params.id)
    const metadatas = await nodeMetadata({ token, fetch })

    return {
        flow,
        metadatas,
        colorScheme: locals.colorScheme,
    }
}
