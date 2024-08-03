import type { NodeId } from "$lib/model/nodes";

export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
}

export interface NodeLogEntry {
    timestamp: Date
    message: string
    node: NodeId | null
    level: LogLevel
}
