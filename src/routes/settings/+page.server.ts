import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ locals }) => {
    return {
        colorScheme: locals.colorScheme,
        theme: locals.theme,
    }
})
