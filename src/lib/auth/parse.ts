import { jwtDecode } from "jwt-decode";
import type { User } from "$lib/model/user";

export function parseToken(jwt: string) {
    const data = jwtDecode(jwt)
    const dataAny = data as any;
    return {
        user: {
            id: data.sub!,
            name: dataAny.name,
            firstName: dataAny.given_name,
            lastName: dataAny.family_name,
            groups: dataAny.groups,
        } as User,
        exp: data.exp,
        iat: data.iat
    }
}
