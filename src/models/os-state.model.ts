export interface OsState {
    hostname: string;
    platform: string;
    osVersion: string;
    architecture: string;
    temperature: string;
    totalMemory: number;
    freeMemory: number;
    usedMemory: number;
    freeStorage: number;
    totalStorage: number;
    cpusUsage: string[];
}
