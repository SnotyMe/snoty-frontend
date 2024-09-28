import { getNodeMetadatas, getNodeTemplates } from "$lib/api/node_api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data, fetch }) => {
    const metadatas = getNodeMetadatas({ fetch })
    const templates = getNodeTemplates({ fetch })

    return {
        ...data,
        metadatas,
        templates,
    }
}
