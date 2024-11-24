export function replaceAllCensoredWithDefault(obj: Record<string, any>) {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object") {
            if (obj[key]["censored"] === true) {
                obj[key] = obj[key]["default"] ??= ""
                return
            }
            replaceAllCensoredWithDefault(obj[key])
        }
    })
    return obj
}
