import type { Fetch } from "$lib/api/api";
import { buildBackendUrl } from "$lib/auth/urls";

export function shouldRefreshToken(token: { exp: number | undefined, iat: number | undefined }) {
    // if there is no expiration, assume it is broken and don't refresh anything
    if (token.exp === undefined || token.iat === undefined) {
        return false;
    }

    // if the expiration is in the past, the token is invalid and should be refreshed
    if (Date.now() > token.exp * 1000) {
        return true;
    }

    // if the token lifetime is 66% over, refresh it
    const tokenLifetime = token.exp - token.iat;
    const tokenElapsed = Date.now() / 1000 - token.iat;
    return tokenElapsed > 0.66 * tokenLifetime;
}

export async function refreshAccessToken(fetch: Fetch, refreshToken: string | undefined): Promise<null | any> {
    if (refreshToken === undefined) {
        throw new Error("No refresh token provided");
    }

    const response = await fetch(buildBackendUrl(["/auth/refresh"]), {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            refresh_token: refreshToken,
        }),
    });

    if (!response.ok) {
        console.error("Failed to refresh token", response.status, response.statusText)
        return null;
    }

    return await response.json();
}
