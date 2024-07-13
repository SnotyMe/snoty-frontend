import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete("access_token", { path: "/" })
    cookies.delete("refresh_token", { path: "/" })

    return new Response()
}
