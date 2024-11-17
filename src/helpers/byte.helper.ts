export function bytesToGb(value: number, toFixed: number | undefined = undefined) {
    const result = value / Math.pow(1024, 3);
    if (toFixed !== undefined) {
        return result.toFixed(toFixed);
    }
    return result;
}
