export function setRecursively(object: Record<any, any>, path: string, value: any) {
    const keys = path.split('.')
    let current = object
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {}
        }
        current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
}
