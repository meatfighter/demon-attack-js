export function gaussianRandom(mean: number, stdDev: number): number {
    let u: number;
    let v: number;
    do {
        u = Math.random();
    } while (u === 0);
    do {
        v = Math.random();
    } while(v === 0);
    return (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)) * stdDev + mean;
}

export function clamp(value: number, min: number, max: number) {
    return (value < min) ? min : (value > max) ? max : value;
}