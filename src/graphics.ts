class RGBColor {
    constructor(public readonly r: number, public readonly g: number, public readonly b: number) {        
    }
}

export type Sprite = HTMLCanvasElement;
export type Mask = boolean[][];

export enum Resolution {
    WIDTH = 160,
    HEIGHT = 228,
}

// TODO UNCOMMENT
// export enum PhysicalDimensions {
//     WIDTH = 4,
//     HEIGHT = 3,
// }

// TODO REMOVE
export enum PhysicalDimensions {
    WIDTH = 320,
    HEIGHT = 228,
}

export const colors: string[] = new Array<string>(256);

export const baseSprites: Sprite[] = new Array<Sprite>(121);
export const bunkerSprites: Sprite[] = new Array<Sprite>(62);
export const digitSprites: Sprite[] = new Array<Sprite>(10);

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

function createSprite(width: number, height: number, callback: (imageData: ImageData) => void): Sprite {
    const sprite = document.createElement('canvas');
    sprite.width = width;
    sprite.height = height;  
    const ctx = sprite.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to create canvas rendering context.');
    }
    const imageData = ctx.getImageData(0, 0, width, height);
    callback(imageData);
    ctx.putImageData(imageData, 0, 0);    
    return sprite;
}

function createMask(sprite: Sprite): Mask {
    const mask = new Array<boolean[]>(sprite.height);
    const ctx = sprite.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to create canvas rendering context.');
    }
    const imageData = ctx.getImageData(0, 0, sprite.width, sprite.height);
    const { data } = imageData;
    for (let y = 0, i = 3; y < sprite.height; ++y) {
        mask[y] = new Array<boolean>(sprite.width);
        for (let x = 0; x < sprite.width; ++x, i += 4) {
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

function extractSprites() {

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

    // bases
    for (let i = 0; i < 121; ++i) {
        baseSprites[i] = createSprite(1, 29, imageData => {
            for (let y = 0, j = (i === 120) ? 0x4C : ((0x8C + i) & 0xFF); y < 29; ++y) {
                setColor(imageData, 0, y, palette[j & 0xFF]);
                if (y < 6) {
                    j -= 2;
                }
            }
        });
    }    

    // bunkers
    for (let i = 0; i < 62; ++i) {
        const bunkerCol = palette[(i === 0) ? 0x4C : (0xC2 + i)];
        bunkerSprites[i] = createSprite(3, 5, imageData => {
            const offset = Offsets.BUNKER_GFX + 5;
            for (let y = 0; y < 5; ++y) {
                const byte = binStr.charCodeAt(offset - y);
                for (let x = 0, mask = 0x20; x < 3; ++x, mask >>= 1) {
                    if ((byte & mask) !== 0) {
                        setColor(imageData, x, y, bunkerCol);
                    }
                }
            }
        });
    }

    // digits    
    const digitCol = palette[0x2C];
    for (let i = 0; i < 10; ++i) {
        digitSprites[i] = createSprite(6, 9, imageData => {
            const offset = Offsets.DIGITS_GFX + 10 * (i + 1) - 2;
            for (let y = 0; y < 9; ++y) {
                const byte = binStr.charCodeAt(offset - y);
                for (let x = 0, mask = 0x40; x < 6; ++x, mask >>= 1) {
                    if ((byte & mask) !== 0) {
                        setColor(imageData, x, y, digitCol);
                    }
                }
            }
        });        
    }
  
    // demons
    for (let level = 0; level < 7; ++level) {
        const colOffset = Offsets.DEMON_COLS + (level << 3);
        demonSprites[level] = new Array<Sprite[]>(6);
        for (let demon = 0; demon < 6; ++demon) {
            const demonOffset = Offsets.DEMON_GFX + 24 * demon;
            demonSprites[level][demon] = new Array<Sprite>(3);            
            for (let sprite = 0; sprite < 3; ++sprite) {
                const spriteOffset = demonOffset + (sprite << 3);
                demonSprites[level][demon][sprite] = createSprite(16, 8, imageData => {
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
                });                
            }
        }
    }
    for (let demon = 0; demon < 6; ++demon) {
        demonMasks[demon] = new Array<Mask>(3);
        for (let sprite = 0; sprite < 3; ++sprite) {
            demonMasks[demon][sprite] = createMask(demonSprites[0][demon][sprite]);
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
                demonExplosionSprites[level][splits][2 - sprite] = createSprite(16, 8, imageData => {
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
                });
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
                demonSpawnSprites[level][sprite][right] = createSprite(8, 8, imageData => {
                    for (let y = 0; y < 8; ++y) {
                        const col = palette[binStr.charCodeAt(colOffset + y)];
                        const byte = binStr.charCodeAt(spriteOffset + y);
                        for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                            if ((byte & mask) !== 0) {
                                setColor(imageData, (right === 1) ? 7 - x : x, 7 - y, col);
                            }
                        }
                    }
                });
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
            splitDemonSprites[level][sprite] = createSprite(8, 8, imageData => {
                for (let y = 0; y < 8; ++y) {
                    const col = palette[binStr.charCodeAt(colOffset + y)];
                    const byte = binStr.charCodeAt(spriteOffset + y);
                    for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                        if ((byte & mask) !== 0) {
                            setColor(imageData, x, 7 - y, col);
                        }
                    }
                }
            });                
        }
    }
    for (let sprite = 0; sprite < 3; ++sprite) {
        splitDemonMasks[sprite] = createMask(splitDemonSprites[0][sprite]);
    }
    
    // split demon explodes
    for (let level = 0; level < 7; ++level) {
        const colOffset = Offsets.DEMON_COLS + (level << 3);
        splitDemonExplosionSprites[level] = new Array<Sprite>(3);
        for (let sprite = 0; sprite < 3; ++sprite) {
            const spriteOffset = Offsets.DEMON_SPLITS_GFX + (sprite << 3);
            splitDemonExplosionSprites[level][2 - sprite] = createSprite(8, 8, imageData => {
                for (let y = 0; y < 8; ++y) {
                    const col = palette[binStr.charCodeAt(colOffset + y)];
                    const byte = binStr.charCodeAt(spriteOffset + y);
                    for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                        if ((byte & mask) !== 0) {
                            setColor(imageData, x, 7 - y, col);
                        }
                    }
                }
            });
        }
    }    
    
    // cannon
    const cannonCol = palette[0x56];
    cannonSprite = createSprite(7, 12, imageData => {
        const offset = Offsets.CANNON_GFX + 11;
        for (let y = 0; y < 12; ++y) {
            const byte = binStr.charCodeAt(offset - y);
            for (let x = 0, mask = 0x80; x < 7; ++x, mask >>= 1) {
                if ((byte & mask) !== 0) {
                    setColor(imageData, x, y, cannonCol);
                }
            }
        }
    });
    cannonMask = createMask(cannonSprite);

    // cannon explodes
    for (let sprite = 0; sprite < 8; ++sprite) {
        const spriteOffset = Offsets.CANNON_EXPLODES_GFX + 5 * sprite;
        cannonExplosionSprites[sprite] = createSprite(16, 34, imageData => {
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
        });
    }    
}

extractSprites();