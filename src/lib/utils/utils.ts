export function setRecursively(object: Record<any, any>, path: string, value: any): Record<any, any> {
    const keys = path.split('.');
    let result: Record<any, any> = { ...object }; // create a shallow copy of the object
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        } else {
            current[keys[i]] = { ...current[keys[i]] }; // create a shallow copy of the nested object
        }
        current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;

    return result;
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
