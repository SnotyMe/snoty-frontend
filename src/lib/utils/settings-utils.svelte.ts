export function setRecursively(object: Record<any, any>, pathKey: string[], value: any): Record<any, any> | false {
    const full = structuredClone($state.snapshot(object));
    const subobj = getSubobjRecursively(full, pathKey) ?? {}

    if (subobj[lastPart(pathKey)] === value) {
        return false;
    }
    subobj[lastPart(pathKey)] = value;

    return full;
}

export function renameRecursively(object: Record<any, any>, pathKey: string[], newKey: string): Record<any, any> | false {
    const oldKey = lastPart(pathKey);

    if (oldKey === newKey) return false;

    const full = structuredClone($state.snapshot(object));
    const subobj = getSubobjRecursively(full, pathKey) ?? {}

    subobj[newKey] = subobj[oldKey];
    delete subobj[oldKey];

    return full;
}

export function deleteRecursively(object: Record<any, any>, pathKey: string[]): Record<any, any> {
    const full = structuredClone($state.snapshot(object));
    const subobj = getSubobjRecursively(full, pathKey) ?? {}

    delete subobj[lastPart(pathKey)];

    return full;
}

function getSubobjRecursively(object: Record<string, any>, pathKey: string[]): Record<string, any> | undefined {
    return getRecursively(object, removeLastPart(pathKey));
}

export function getRecursively(object: Record<string, any>, path: string[]): Record<string, any> | undefined {
    if (path.length < 1) {
        return object;
    }
    let current = object;

    for (const element of path) {
        if (current[element] === undefined) {
            console.error(`Could not find key ${element} in object ${JSON.stringify(current)}`);
            return undefined;
        }
        current = current[element];
    }

    return current;
}

function removeLastPart(path: string[]): string[] {
    return path.slice(0, path.length - 1);
}

function lastPart(path: string[]): string {
    return path[path.length - 1];
}
