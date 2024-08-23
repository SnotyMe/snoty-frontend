export function setRecursively(object: Record<any, any>, path: string | null, key: string, value: any): Record<any, any> {
    const full = { ...object };
    const subobj = findRecursively(path, full);

    subobj[key] = value;

    return full;
}

export function renameRecursively(object: Record<any, any>, path: string | null, oldKey: string, newKey: string): Record<any, any> {
    if (oldKey === newKey) return object;

    const full = { ...object };
    const subobj = findRecursively(path, full)

    subobj[newKey] = subobj[oldKey];
    delete subobj[oldKey];

    return full;
}

function findRecursively(path: string | null, object: Record<any, any>) {
    if (path === null) return object

    const keys = path.split('.');

    let current = object;

    for (let key of keys) {
        if (!current[key]) {
            current[key] = {};
        }
        current = current[key];
    }

    return current
}

export function getRecursively(object: Record<string, any>, path: string | null): any {
    if (!path) {
        return object;
    }
    const keys = path.split('.');
    let current = object;

    for (const element of keys) {
        if (current[element] === undefined) {
            console.error(`Could not find key ${element} in object ${JSON.stringify(current)}`);
            return undefined;
        }
        current = current[element];
    }

    return current;
}
