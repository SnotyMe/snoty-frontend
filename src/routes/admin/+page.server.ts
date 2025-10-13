import type { LayoutServerLoad } from "./$types";
import { getRoles } from "$lib/api/user_api";
import { redirect } from '@sveltejs/kit';
import { type ApiProps, isErrorJson } from "$lib/api/api";
import { getTasks } from "$lib/api/task_api";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    const accessToken = locals.access_token;
    if (accessToken == null) {
        return redirect(307, "/auth/login");
    }

    const roles = locals.access_token != null ? await getRoles({
        token: accessToken,
        fetch: fetch
    }) : null;

    if (roles === null || isErrorJson(roles) || roles.length == 0) {
        return redirect(307, "/auth/login");
    }

    const apiProps: ApiProps = {
        token: accessToken,
        fetch: fetch
    };

    return {
        accessToken,
        roles,
        tasks: getTasks(apiProps)
    };
}
