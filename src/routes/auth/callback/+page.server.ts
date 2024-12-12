import type { PageServerLoad } from "./$types";
import { buildBackendUrl, redirectUrl } from "$lib/auth/urls";
import { error_json } from "$lib/api/api";
import { setAuthCookies } from "./auth-cookies";

export const load: PageServerLoad = async ({ url, cookies }) => {
    const params = url.searchParams;
    const result = await fetch(buildBackendUrl([
            "/auth/token",
            `?code=${params.get("code")}`,
            `&redirect_url=${redirectUrl(url)}`,
        ]),
        {
            method: "POST"
        })
        .then(res => {
            const json = res.json();
            if (res.ok) {
                return json;
            }
            return json.then(Promise.reject.bind(Promise));
        })
        .then(res => {
            setAuthCookies(url, res, cookies);
            return res;
        })
        .catch(error_json);
    return {
        result
    };
}
