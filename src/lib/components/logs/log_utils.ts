import { LogLevel } from "$lib/model/node_logs";

export function getLevelIndex(level: LogLevel) {
    switch (level) {
        case LogLevel.DEBUG:
            return 0;
        case LogLevel.INFO:
            return 1;
        case LogLevel.WARN:
            return 2;
        case LogLevel.ERROR:
            return 3;
    }
}
