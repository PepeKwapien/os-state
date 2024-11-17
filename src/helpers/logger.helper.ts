import { createWriteStream } from 'fs';

export function logToFile(message: string) {
    const logStream = createWriteStream('logs.txt', { flags: 'a' });
    logStream.write(`${message}\n`);
    logStream.end();
}

export const logger = {
    info: (message: string) => logToFile(`[INFO] ${message}`),
    warn: (message: string) => logToFile(`[WARN] ${message}`),
    error: (message: string) => logToFile(`[ERROR] ${message}`)
};
