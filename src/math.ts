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

export function bulletIntersects(
        bulletX: number, bulletY: number, bulletHeight: number,
        mask: boolean[][], maskX: number, maskY: number): boolean {

    maskX = Math.floor(maskX);
    maskY = Math.floor(maskY);                    
    bulletX = Math.floor(bulletX) - maskX;
    bulletY = Math.floor(bulletY) - maskY;
 
    const maskMaxX = mask[0].length - 1;
    const maskMaxY = mask.length - 1;
    const bulletMaxY = bulletY + bulletHeight - 1;
    
    if (bulletMaxY < 0 || bulletX < 0 || bulletY > maskMaxY || bulletX > maskMaxX) {
        return false;
    }

    const yMax = Math.min(bulletMaxY, maskMaxY);
    for (let y = Math.max(bulletY, 0); y <= yMax; ++y) {
        if (mask[y][bulletX]) {
            return true;
        }
    }

    return false;
}