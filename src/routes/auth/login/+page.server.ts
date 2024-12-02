import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { buildAuthUrl, redirectUrl } from "$lib/auth/urls";
import { PUBLIC_AUTH_CLIENT_ID, PUBLIC_AUTH_SIGIN_PATH } from "$env/static/public";

export const load: PageServerLoad = async ({ url }) => {
    return redirect(301, buildAuthUrl([
        PUBLIC_AUTH_SIGIN_PATH,
        `?client_id=${PUBLIC_AUTH_CLIENT_ID}`,
        `&response_type=code&scope=openid`,
        `&redirect_uri=${redirectUrl(url)}`
    ]))
}
