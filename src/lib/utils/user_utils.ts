import type { Role } from "$lib/model/user";

export function hasAnyRole(userRoles: Role[], possibleRoles: string[]): boolean {
    return userRoles.some(role => possibleRoles.includes(role.name));
}
