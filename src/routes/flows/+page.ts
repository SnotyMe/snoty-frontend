import type { PageLoad } from "./$types";
import { getNodeMetadatas, getNodeTemplates } from "$lib/api/node_api";

export const load: PageLoad = async ({ data, fetch }) => {
    const metadatas = getNodeMetadatas({ fetch })
    const templates = getNodeTemplates({ fetch })

    return {
        ...data,
        metadatas,
        templates,
    }
}
