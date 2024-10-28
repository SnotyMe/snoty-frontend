import type { LayoutServerLoad } from "./$types";
import { getRoles } from "$lib/api/user_api";
import { redirect } from '@sveltejs/kit';
import type { ApiProps } from "$lib/api/api";
import { getTasks } from "$lib/api/task_api";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    let groups = locals.access_token != null ? await getRoles({
        token: locals.access_token,
        fetch: fetch
    }) : null;

    if (groups === null) {
        return redirect(307, "/auth/login");
    }

    const apiProps: ApiProps = {
        token: locals.access_token,
        fetch: fetch
    }

    return {
        groups,
        tasks: getTasks(apiProps)
    }
}
