import type { RequestHandler } from "@sveltejs/kit";
import { PUBLIC_AUTH_SIGNOUT_PATH } from "$env/static/public";
import { buildAuthUrl } from "$lib/auth/urls";

export const POST: RequestHandler = async ({ cookies, fetch }) => {
    const idToken = cookies.get("id_token")

    cookies.delete("access_token", { path: "/" })
    cookies.delete("refresh_token", { path: "/" })
    cookies.delete("id_token", { path: "/" })

    await fetch(buildAuthUrl([
        PUBLIC_AUTH_SIGNOUT_PATH,
        `?id_token_hint=${idToken}`
    ]), {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })

    return new Response()
}
