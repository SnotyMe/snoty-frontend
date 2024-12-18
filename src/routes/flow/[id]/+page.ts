import { getNodeMetadatas, getNodeTemplates } from "$lib/api/node_api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data, fetch }) => {
    return {
        ...data,
        metadatas: getNodeMetadatas({ fetch }),
        templates: getNodeTemplates({ fetch }),
    };
}
