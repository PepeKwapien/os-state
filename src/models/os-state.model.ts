export interface OsState {
    hostname: string;
    osVersion: string;
    temperature: string;
    totalMemory: number;
    freeMemory: number;
    usedMemory: number;
    freeStorage: number;
    totalStorage: number;
    cpusUsage: string[];
}
