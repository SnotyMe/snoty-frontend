import { LogLevel } from "$lib/model/node_logs";

export function getLevelColor(level: LogLevel) {
    return getLevelColorName(level) + "-500";
}

function getLevelColorName(level: LogLevel) {
    switch (level) {
        case LogLevel.DEBUG:
            return "gray";
        case LogLevel.INFO:
            return "green";
        case LogLevel.WARN:
            return "orange";
        case LogLevel.ERROR:
            return "red";
    }
}

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
