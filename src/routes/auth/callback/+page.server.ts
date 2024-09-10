import type { PageServerLoad } from "./$types";
import { PUBLIC_API_HOST } from "$env/static/public";
import { redirectUrl } from "$lib/auth/urls";
import { error_json } from "$lib/api/api";

export const load: PageServerLoad = async ({ url, cookies }) => {
    const params = url.searchParams;
    const result = await fetch(
        `${PUBLIC_API_HOST}/auth/token?code=${params.get("code")}&redirect_url=${redirectUrl}`,
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
            let ops = { expires: new Date(new Date().getTime() + res.expires_in * 1000), path: "/" };
            cookies.set("access_token", res.access_token, ops)
            cookies.set("refresh_token", res.refresh_token, ops)
            cookies.set("id_token", res.id_token, ops)
            return res
        })
        .catch(error_json)
    return {
        result
    }
}
