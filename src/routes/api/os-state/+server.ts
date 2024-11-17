import { json } from '@sveltejs/kit';
import { execSync } from 'child_process';
import os from 'os';
import { statfsSync } from 'fs';
import { logger } from '../../../helpers/logger.helper';
import type { OsState } from '../../../models/os-state.model';

export async function GET() {
    const hostname = os.hostname();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    const platform = os.platform();
    const osVersion = os.version();
    const cpus = os.cpus();
    const cpusUsage = cpus.map((cpu) => {
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
        const usage = 100 - (100 * cpu.times.idle) / total;
        return usage.toFixed(1);
    });

    let temperature = 'N\\A';
    if (platform === 'linux') {
        try {
            const result = execSync('vcgencmd measure_temp');
            temperature = result.toString().replace('temp=', '');
        } catch (error: any) {
            logger.error(error.message);
        }
    }
    let freeStorage: number = -1;
    let totalStorage: number = -1;
    const results = statfsSync('/');
    freeStorage = results.bsize * results.bavail;
    totalStorage = results.bsize * results.blocks;

    return json({
        hostname,
        osVersion,
        temperature,
        totalMemory,
        freeMemory,
        usedMemory: totalMemory - freeMemory,
        freeStorage,
        totalStorage,
        cpusUsage
    } as OsState);
}
