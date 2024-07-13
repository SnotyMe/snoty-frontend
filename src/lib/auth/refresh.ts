export function shouldRefreshToken(token: {exp: number | undefined, iat: number | undefined}) {
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

export function refreshToken(refreshToken: string | undefined) {
    console.log("refreshing token")
    // TODO: implement
}
