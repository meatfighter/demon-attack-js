class RGBColor {
    constructor(public readonly r: number, public readonly g: number, public readonly b: number) {        
    }
}

export type Sprite = ImageBitmap;
export type Mask = boolean[][];

export enum Resolution {
    WIDTH = 160,
    HEIGHT = 228,
}

export enum PhysicalDimensions {
    WIDTH = 4,
    HEIGHT = 3,
}

export const colors: string[] = new Array<string>(256);

export const baseSprites: Sprite[] = new Array<Sprite>(121);
export const bunkerSprites: Sprite[] = new Array<Sprite>(62);
export const digitSprites: Sprite[][] = new Array<Sprite[]>(256); // color, digit

export const demonSprites: Sprite[][][] = new Array<Sprite[][]>(7); // palette, demon, sprite
export const demonMasks: Mask[][] = new Array<Mask[]>(6); // demon, sprite
export const demonExplosionSprites: Sprite[][][] = new Array<Sprite[][]>(7); // palette, (0=explodes, 1=splits), sprite
export const demonSpawnSprites: Sprite[][][] = new Array<Sprite[][]>(7); // palette, sprite, (0=left, 1=right)
export const demonShots: number[][] = new Array<number[]>(16); // shot, (0=left, 1=right)

export const splitDemonSprites: Sprite[][] = new Array<Sprite[]>(7); // palette, sprite
export const splitDemonMasks: Mask[] = new Array<Mask>(3); // sprite
export const splitDemonExplosionSprites: Sprite[][] = new Array<Sprite[]>(7); // palette, sprite

export let cannonSprite: Sprite;
export let cannonMask: Mask;
export const cannonExplosionSprites: Sprite[] = new Array<Sprite>(8);

async function createSprite(width: number, height: number, callback: (imageData: ImageData) => void): 
        Promise<{ imageBitmap: Sprite, imageData: ImageData }> {
    return new Promise(resolve => {
        const imageData = new ImageData(width, height);
        callback(imageData);
        createImageBitmap(imageData).then(imageBitmap => resolve({ imageBitmap, imageData }));
    });
}

function createMask(imageData: ImageData): Mask {
    const mask = new Array<boolean[]>(imageData.height);
    const { data } = imageData;
    for (let y = 0, i = 3; y < imageData.height; ++y) {
        mask[y] = new Array<boolean>(imageData.width);
        for (let x = 0; x < imageData.width; ++x, i += 4) {
            mask[y][x] = data[i] !== 0;
        }
    }
    return mask;
}

function extractPalette(): RGBColor[] {
    const palette = new Array<RGBColor>(256);
    const binStr = atob('AAAAPz8+ZGRjhISDoqKhurq50tLR6urpPT0AXl4Ke3sVmZkgtLQqzc005uY+/f1IcSMAhj0LmVcYrW8mvYYyzZs+3LBJ6s'
        + 'JUhhUAmi8OrkgewGEv0Xc+4I1N76Jb/bVoigAAnhMSsSgnwj080lFQ4mRj73V0/YaFeQBYjRJuoCeEsTuYwE6q0GG83XHM6oLcRQB4XRKPci'
        + 'ekiDu5m07KrmHcv3Hs0IL7DgCFKROZQyitXT2/dFHQi2TfoXXutYb7AACKEhOdJCiwNz3BSVHRWmTganXueYb7ABV9EjGTJEynN2e7SYDMWp'
        + 'fdaq7tecL7ACdYEkV0JGKNN36nSZe+WrDUasfoed37ADUmEldCJHZdN5V2SbGOWsylauW7ef3PADkAE1sSKHknPZc8UbNQZM1jdeZ0hv2FDj'
        + 'IAK1QRR3MjY5M2fbBIlctZreVpwv14Jy4ARU4PYmshfogzl6NDsLxTx9Ri3epwPSMAXkINe18dmXsttJY7za9K5sdX/d1k');         
    for (let i = 0x00; i <= 0xFF; ++i) {       
        const j = 3 * (i >> 1);
        const col = new RGBColor(binStr.charCodeAt(j), binStr.charCodeAt(j + 1), binStr.charCodeAt(j + 2));
        palette[i] = col;
        colors[i] = `#${((col.r << 16) | (col.g << 8) | col.b).toString(16).padStart(6, '0')}`;
    }
    return palette;
}

function setColor(imageData: ImageData, x: number, y: number, color: RGBColor) {
    const offset = 4 * (y * imageData.width + x);
    const data = imageData.data;
    data[offset] = color.r;
    data[offset + 1] = color.g;
    data[offset + 2] = color.b;
    data[offset + 3] = 0xFF;
}

export async function init() {

    enum Offsets {
        DEMON_COLS = 0,
        CANNON_EXPLODES_COLS = 56,
        CANNON_GFX = 61,
        BUNKER_GFX = 73,
        CANNON_EXPLODES_GFX = 79,
        DEMON_EXPLODES_GFX = 119,
        DEMON_GFX = 143,
        DEMON_SPLITS_GFX = 287,
        SPLIT_DEMON_GFX = 311,
        DIGITS_GFX = 335,
        DEMON_SHOTS = 435,
    }

    const palette = extractPalette();

    const binStr = atob('yMiISDgodngMDIp6alpKOkhISHiImKi4xsbGxu7ubGxGRkZGPj6cnIaGSEjk5CgoODhISGhoeHiKakp6msbGxsbu7mxsKC'
        + 'goKAAoKDgQEAYDAQAABgEEAgAKAAIQBBACBEAQABCCRAAAQJACCECACAAkgAAAAIQAiCAIAAJAEABACEAEAEgCAEQAQAQgCQAAAwcOGfACAA'
        + 'AGA85xAAQAAExGIx8CAQgAECEiJBQPDABAgoRkHwYAAEQkFA8DAAAANh0CBAoEAAAJHjIkCAoAAAKfsuRIECQAn4+HiJBkAABPmIyHiHAEAC'
        + 'dMmIyHSDIABEQkIyMUCAAgJCgkIycYABAgSERCRz8AAAAAAQEAAAAAAAMFAwAAAAAGCQkJBgAAIAQRgBRCkABABBKgFECEAAAgFGgIFCAAAA'
        + 'AQKGzGggAAgoLWbAAAAABEgoLGfBB8ZGRkZGRkZHwAGBgYGBgYGBg4AHxMTEA8DExMfAB8TEwMOAxMTHwADAx+TExMTExMAHxMTAwMfEBMfA'
        + 'B8TExMfEBMTHwAMDAwGBgMTEx8AHxMTEx8ZGRkfAB8TEwMfExMTHwAgCAQUEGEiEJACAQBgSIRRA==');

    const promises: Promise<any>[] = [];

    // bases
    for (let i = 0; i < 121; ++i) {
        promises.push(createSprite(1, 29, imageData => {
            for (let y = 0, j = (i === 120) ? 0x4C : ((0x8C + i) & 0xFF); y < 29; ++y) {
                setColor(imageData, 0, y, palette[j & 0xFF]);
                if (y < 6) {
                    j -= 2;
                }
            }
        }).then(({ imageBitmap }) => baseSprites[i] = imageBitmap));
    }

    // bunkers
    for (let i = 0; i < 62; ++i) {
        const bunkerCol = palette[(i === 0) ? 0x4C : (0xC2 + i)];
        promises.push(createSprite(3, 5, imageData => {
            const offset = Offsets.BUNKER_GFX + 5;
            for (let y = 0; y < 5; ++y) {
                const byte = binStr.charCodeAt(offset - y);
                for (let x = 0, mask = 0x20; x < 3; ++x, mask >>= 1) {
                    if ((byte & mask) !== 0) {
                        setColor(imageData, x, y, bunkerCol);
                    }
                }
            }
        }).then(({ imageBitmap }) => bunkerSprites[i] = imageBitmap));
    }

    // digits        
    for (let color = 0; color < 256; ++color) {        
        const digitCol = palette[color];
        digitSprites[color] = new Array<Sprite>(10);
        for (let digit = 0; digit < 10; ++digit) {
            promises.push(createSprite(6, 9, imageData => {
                const offset = Offsets.DIGITS_GFX + 10 * (digit + 1) - 2;
                for (let y = 0; y < 9; ++y) {
                    const byte = binStr.charCodeAt(offset - y);
                    for (let x = 0, mask = 0x40; x < 6; ++x, mask >>= 1) {
                        if ((byte & mask) !== 0) {
                            setColor(imageData, x, y, digitCol);
                        }
                    }
                }
            }).then(({ imageBitmap }) => digitSprites[color][digit] = imageBitmap));        
        }
    }
  
    // demons
    for (let demon = 0; demon < 6; ++demon) {
        demonMasks[demon] = new Array<Mask>(3);
    }
    for (let level = 0; level < 7; ++level) {
        const colOffset = Offsets.DEMON_COLS + (level << 3);
        demonSprites[level] = new Array<Sprite[]>(6);
        for (let demon = 0; demon < 6; ++demon) {
            const demonOffset = Offsets.DEMON_GFX + 24 * demon;
            demonSprites[level][demon] = new Array<Sprite>(3);                    
            for (let sprite = 0; sprite < 3; ++sprite) {
                const spriteOffset = demonOffset + (sprite << 3);
                promises.push(createSprite(16, 8, imageData => {
                    for (let y = 0; y < 8; ++y) {
                        const col = palette[binStr.charCodeAt(colOffset + y)];
                        const byte = binStr.charCodeAt(spriteOffset + y);
                        for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                            if ((byte & mask) !== 0) {
                                setColor(imageData, x, 7 - y, col);
                                setColor(imageData, 15 - x, 7 - y, col);
                            }
                        }
                    }
                }).then(({ imageBitmap, imageData }) => {
                    demonSprites[level][demon][sprite] = imageBitmap;
                    if (level === 0) {
                        demonMasks[demon][sprite] = createMask(imageData);
                    }
                }));                
            }
        }
    }
   
    // demon explodes / splits
    for (let level = 0; level < 7; ++level) {
        const colOffset = Offsets.DEMON_COLS + (level << 3);
        demonExplosionSprites[level] = new Array<Sprite[]>(2);
        for (let splits = 0; splits < 2; ++splits) {            
            const splitsOffset = (splits === 0) ? Offsets.DEMON_EXPLODES_GFX : Offsets.DEMON_SPLITS_GFX;
            demonExplosionSprites[level][splits] = new Array<Sprite>(3);
            for (let sprite = 0; sprite < 3; ++sprite) {
                const spriteOffset = splitsOffset + (sprite << 3);
                promises.push(createSprite(16, 8, imageData => {
                    for (let y = 0; y < 8; ++y) {
                        const col = palette[binStr.charCodeAt(colOffset + y)];
                        const byte = binStr.charCodeAt(spriteOffset + y);
                        for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                            if ((byte & mask) !== 0) {
                                setColor(imageData, x, 7 - y, col);
                                setColor(imageData, 15 - x, 7 - y, col);
                            }
                        }
                    }
                }).then(({ imageBitmap }) => demonExplosionSprites[level][splits][2 - sprite] = imageBitmap));
            }
        }
    }

    // demon spawns
    for (let level = 0; level < 7; ++level) {
        const colOffset = Offsets.DEMON_COLS + (level << 3);
        demonSpawnSprites[level] = new Array<Sprite[]>(3);
        for (let sprite = 0; sprite < 3; ++sprite) {
            const spriteOffset = Offsets.DEMON_EXPLODES_GFX + (sprite << 3);
            demonSpawnSprites[level][sprite] = new Array<Sprite>(2);
            for (let right = 0; right < 2; ++right) {
                promises.push(createSprite(8, 8, imageData => {
                    for (let y = 0; y < 8; ++y) {
                        const col = palette[binStr.charCodeAt(colOffset + y)];
                        const byte = binStr.charCodeAt(spriteOffset + y);
                        for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                            if ((byte & mask) !== 0) {
                                setColor(imageData, (right === 1) ? 7 - x : x, 7 - y, col);
                            }
                        }
                    }
                }).then(({ imageBitmap }) => demonSpawnSprites[level][sprite][right] = imageBitmap));
            }
        }
    }

    // demon shots
    for (let shot = 0; shot < 16; ++shot) {
        demonShots[shot] = [];
        const byte = binStr.charCodeAt(Offsets.DEMON_SHOTS + shot);
        for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
            if ((byte & mask) !== 0) {
                demonShots[shot].push(x);
            }
        }
    }

    // split demons
    for (let level = 0; level < 7; ++level) {
        const colOffset = Offsets.DEMON_COLS + (level << 3);
        splitDemonSprites[level] = new Array<Sprite>(3);
        for (let sprite = 0; sprite < 3; ++sprite) {
            const spriteOffset = Offsets.SPLIT_DEMON_GFX + (sprite << 3);
            promises.push(createSprite(8, 8, imageData => {
                for (let y = 0; y < 8; ++y) {
                    const col = palette[binStr.charCodeAt(colOffset + y)];
                    const byte = binStr.charCodeAt(spriteOffset + y);
                    for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                        if ((byte & mask) !== 0) {
                            setColor(imageData, x, 7 - y, col);
                        }
                    }
                }
            }).then(({ imageBitmap, imageData }) => {
                splitDemonSprites[level][sprite] = imageBitmap;
                if (level === 0) {
                    splitDemonMasks[sprite] = createMask(imageData);
                }
            }));                
        }
    }
    
    // split demon explodes
    for (let level = 0; level < 7; ++level) {
        const colOffset = Offsets.DEMON_COLS + (level << 3);
        splitDemonExplosionSprites[level] = new Array<Sprite>(3);
        for (let sprite = 0; sprite < 3; ++sprite) {
            const spriteOffset = Offsets.DEMON_SPLITS_GFX + (sprite << 3);
            promises.push(createSprite(8, 8, imageData => {
                for (let y = 0; y < 8; ++y) {
                    const col = palette[binStr.charCodeAt(colOffset + y)];
                    const byte = binStr.charCodeAt(spriteOffset + y);
                    for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                        if ((byte & mask) !== 0) {
                            setColor(imageData, x, 7 - y, col);
                        }
                    }
                }
            }).then(({ imageBitmap} ) => splitDemonExplosionSprites[level][2 - sprite] = imageBitmap));
        }
    }
    
    // cannon
    const cannonCol = palette[0x56];
    promises.push(createSprite(7, 12, imageData => {
        const offset = Offsets.CANNON_GFX + 11;
        for (let y = 0; y < 12; ++y) {
            const byte = binStr.charCodeAt(offset - y);
            for (let x = 0, mask = 0x80; x < 7; ++x, mask >>= 1) {
                if ((byte & mask) !== 0) {
                    setColor(imageData, x, y, cannonCol);
                }
            }
        }
    }).then(({ imageBitmap, imageData }) => {
        cannonSprite = imageBitmap;
        cannonMask = createMask(imageData);
    }));    

    // cannon explodes
    for (let sprite = 0; sprite < 8; ++sprite) {
        const spriteOffset = Offsets.CANNON_EXPLODES_GFX + 5 * sprite;
        promises.push(createSprite(16, 34, imageData => {
            for (let y = 0; y < 5; ++y) {
                const col = palette[binStr.charCodeAt(Offsets.CANNON_EXPLODES_COLS + y)];
                const yOffset = 32 - (y << 3);
                const byte = binStr.charCodeAt(spriteOffset + y);
                for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                    if ((byte & mask) !== 0) {
                        setColor(imageData, x, yOffset, col);
                        setColor(imageData, 15 - x, yOffset, col);
                        setColor(imageData, x, yOffset + 1, col);
                        setColor(imageData, 15 - x, yOffset + 1, col);
                    }
                }
            }
        }).then(({ imageBitmap}) => cannonExplosionSprites[sprite] = imageBitmap));
    }
    
    await Promise.all(promises);
}