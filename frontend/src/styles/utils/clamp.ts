// Restrict <tt>val</tt> to [min,max]; if it goes outside that
// range then set it to the min or max value as appropriate
export function clamp(val: number, min: number, max: number) {
    return val > max ? max : val < min ? min : val
}
