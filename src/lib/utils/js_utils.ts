export function filterObject<K extends string | number | symbol, V>(obj: Record<K, V>, filter: (entry: {
    key: K,
    value: V
}) => boolean): Record<K, V> {
    return (Object.keys(obj) as K[]).filter(key => {
        let entry = obj[key];
        return filter({ key, value: entry });
    }).reduce((res, key) => (res[key] = obj[key], res), {} as Record<K, V>);
}
