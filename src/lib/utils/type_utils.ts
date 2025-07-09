type ReplaceDateWithString<T> = {
    [K in keyof T]: T[K] extends Date ? string :
        T[K] extends Date | null ? string | null :
            T[K];
};
