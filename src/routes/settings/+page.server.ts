import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ locals }) => {
    return {
        theme: locals.theme,
    };
})
