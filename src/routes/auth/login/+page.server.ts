import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { buildAuthUrl, redirectUrl } from "$lib/auth/urls";
import { PUBLIC_AUTH_CLIENT_ID, PUBLIC_AUTH_SIGNIN_PATH } from "$env/static/public";
import { env } from "$env/dynamic/public";

export const load: PageServerLoad = async ({ url }) => {
    return redirect(301, buildAuthUrl([
        env.PUBLIC_AUTH_SIGNIN_PATH ?? PUBLIC_AUTH_SIGNIN_PATH,
        `?client_id=${env.PUBLIC_AUTH_CLIENT_ID ?? PUBLIC_AUTH_CLIENT_ID}`,
        `&response_type=code&scope=openid${env.PUBLIC_AUTH_SCOPES ? ` ${env.PUBLIC_AUTH_SCOPES}` : ""}`,
        `&redirect_uri=${redirectUrl(url)}`
    ]));
}
