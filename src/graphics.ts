class Color {
    constructor(public readonly r: number, public readonly g: number, public readonly b: number) {        
    }
}

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

export const digitSprites: HTMLCanvasElement[] = new Array<HTMLCanvasElement>(10);
export const demonSprites: HTMLCanvasElement[][][] = new Array<HTMLCanvasElement[][]>(7); // level, demon, sprite

export function createCanvas(width: number, height: number, callback: (imageData: ImageData) => void): 
        HTMLCanvasElement {

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to create canvas rendering context.');
    }
    const imageData = ctx.getImageData(0, 0, width, height);
    callback(imageData);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

function extractPalette(): Color[] {
    const palette = new Array<Color>(256);
    const binStr = atob('AAAAPz8+ZGRjhISDoqKhurq50tLR6urpPT0AXl4Ke3sVmZkgtLQqzc005uY+/f1IcSMAhj0LmVcYrW8mvYYyzZs+3LBJ6s'
        + 'JUhhUAmi8OrkgewGEv0Xc+4I1N76Jb/bVoigAAnhMSsSgnwj080lFQ4mRj73V0/YaFeQBYjRJuoCeEsTuYwE6q0GG83XHM6oLcRQB4XRKPci'
        + 'ekiDu5m07KrmHcv3Hs0IL7DgCFKROZQyitXT2/dFHQi2TfoXXutYb7AACKEhOdJCiwNz3BSVHRWmTganXueYb7ABV9EjGTJEynN2e7SYDMWp'
        + 'fdaq7tecL7ACdYEkV0JGKNN36nSZe+WrDUasfoed37ADUmEldCJHZdN5V2SbGOWsylauW7ef3PADkAE1sSKHknPZc8UbNQZM1jdeZ0hv2FDj'
        + 'IAK1QRR3MjY5M2fbBIlctZreVpwv14Jy4ARU4PYmshfogzl6NDsLxTx9Ri3epwPSMAXkINe18dmXsttJY7za9K5sdX/d1k');         
    for (let i = 0x00; i <= 0xFF; ++i) {       
        const j = 3 * (i >> 1);
        palette[i] = new Color(binStr.charCodeAt(j), binStr.charCodeAt(j + 1), binStr.charCodeAt(j + 2));
    }
    return palette;
}

function setColor(imageData: ImageData, x: number, y: number, color: Color) {
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
        SHIP_EXPLOSION_COLS = 56,
        PLAYER_SHIP_GFX = 61,
        LIVES_GFX = 73,
        EXPLOSION_GFX = 79,
        TELEPORT_GFX = 119,
        DEMON_GFX = 143,
        BOOM_GFX = 287,
        SMALL_DEMON_GFX = 311,
        DIGITS_GFX = 335,
        DEMON_SHOT = 435,
    }

    const palette = extractPalette();
    const digitCol = palette[0x2C];

    const binStr = atob('yMiISDgodngMDIp6alpKOkhISHiImKi4xsbGxu7ubGxGRkZGPj6cnIaGSEjk5CgoODhISGhoeHiKakp6msbGxsbu7mxsKC'
        + 'goKAAoKDgQEAYDAQAABgEEAgAKAAIQBBACBEAQABCCRAAAQJACCECACAAkgAAAAIQAiCAIAAJAEABACEAEAEgCAEQAQAQgCQAAAwcOGfACAA'
        + 'AGA85xAAQAAExGIx8CAQgAECEiJBQPDABAgoRkHwYAAEQkFA8DAAAANh0CBAoEAAAJHjIkCAoAAAKfsuRIECQAn4+HiJBkAABPmIyHiHAEAC'
        + 'dMmIyHSDIABEQkIyMUCAAgJCgkIycYABAgSERCRz8AAAAAAQEAAAAAAAMFAwAAAAAGCQkJBgAAIAQRgBRCkABABBKgFECEAAAgFGgIFCAAAA'
        + 'AQKGzGggAAgoLWbAAAAABEgoLGfBB8ZGRkZGRkZHwAGBgYGBgYGBg4AHxMTEA8DExMfAB8TEwMOAxMTHwADAx+TExMTExMAHxMTAwMfEBMfA'
        + 'B8TExMfEBMTHwAMDAwGBgMTEx8AHxMTEx8ZGRkfAB8TEwMfExMTHwAgCAQUEGEiEJACAQBgSIRRA==');

    // demons
    for (let level = 0; level < 7; ++level) {
        const colOffset = level << 3;
        demonSprites[level] = new Array<HTMLCanvasElement[]>(6);
        for (let demon = 0; demon < 6; ++demon) {
            demonSprites[level][demon] = new Array<HTMLCanvasElement>(3);
            const demonOffset = Offsets.DEMON_GFX + 24 * demon;
            for (let sprite = 0; sprite < 3; ++sprite) {                 
                const spriteOffset = demonOffset + (sprite << 3);
                demonSprites[level][demon][sprite] = createCanvas(16, 8, imageData => {
                    for (let y = 0; y < 8; ++y) {
                        const col = palette[binStr.charCodeAt(Offsets.DEMON_COLS + colOffset + y)];
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
      
    // digits    
    for (let i = 0; i < 10; ++i) {
        digitSprites[i] = createCanvas(8, 9, imageData => {
            const offset = Offsets.DIGITS_GFX + 10 * (i + 1) - 2;
            for (let y = 0; y < 9; ++y) {
                const byte = binStr.charCodeAt(offset - y);                
                for (let x = 0, mask = 0x80; x < 8; ++x, mask >>= 1) {
                    if ((byte & mask) !== 0) {                        
                        setColor(imageData, x, y, digitCol);
                    }
                }
            }
        });        
    }    
}

extractSprites();