import type { PageLoad } from "./$types";
import { getNodeMetadatas } from "$lib/api/node_api";

export const load: PageLoad = async ({ data, fetch }) => {
    const metadatas = getNodeMetadatas({ fetch })

    return {
        ...data,
        metadatas,
    }
}
