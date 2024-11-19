export function isNumeric(value: any) {
    if (typeof value === 'number') return true;
    if (typeof value != 'string') return false;
    return !Number.isNaN(value) && !isNaN(parseFloat(value));
}
