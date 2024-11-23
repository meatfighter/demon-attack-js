class Color {
    constructor(public r: number, public g: number, public b: number) {        
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

export function createCanvas(width: number, height: number, 
        callback: (canvas: HTMLCanvasElement, imageData: ImageData) => void) {

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to create canvas rendering context.');
    }
    const imageData = ctx.getImageData(0, 0, width, height);
    callback(canvas, imageData);
    ctx.putImageData(imageData, 0, 0);
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
    console.log(`set color: ${x} ${y} ${color.r} ${color.g} ${color.b}`); // TODO REMOVE
    const offset = 4 * (y * imageData.width + x);
    const data = imageData.data;
    data[offset] = color.r;
    data[offset + 1] = color.g;
    data[offset + 2] = color.b;
    data[offset + 3] = 0xFF;
}

function extractSprites() {

    enum Offsets {
        ENEMY_COLS = 0,
        SHIP_EXPLOSION_COLS = 56,
        PLAYER_SHIP_GFX = 61,
        LIVES_GFX = 73,
        EXPLOSION_GFX = 79,
        TELEPORT_GFX = 119,
        ENEMY_1_GFX = 143,
        ENEMY_2_GFX = 167,
        ENEMY_3_GFX = 191,
        ENEMY_4_GFX = 215,
        ENEMY_5_GFX = 239,
        ENEMY_6_GFX = 263,
        BOOM_GFX = 287,
        SMALL_DEMON_GFX = 311,
        DIGITS_GFX = 335,
        ENEMY_SHOT = 435,
    }

    const palette = extractPalette();
    const digitCol = palette[0x2C];

    const binStr = atob('yMiISDgodngMDIp6alpKOkhISHiImKi4xsbGxu7ubGxGRkZGPj6cnIaGSEjk5CgoODhISGhoeHiKakp6msbGxsbu7mxsKC'
        + 'goKAAoKDgQEAYDAQAABgEEAgAKAAIQBBACBEAQABCCRAAAQJACCECACAAkgAAAAIQAiCAIAAJAEABACEAEAEgCAEQAQAQgCQAAAwcOGfACAA'
        + 'AGA85xAAQAAExGIx8CAQgAECEiJBQPDABAgoRkHwYAAEQkFA8DAAAANh0CBAoEAAAJHjIkCAoAAAKfsuRIECQAn4+HiJBkAABPmIyHiHAEAC'
        + 'dMmIyHSDIABEQkIyMUCAAgJCgkIycYABAgSERCRz8AAAAAAQEAAAAAAAMFAwAAAAAGCQkJBgAAIAQRgBRCkABABBKgFECEAAAgFGgIFCAAAA'
        + 'AQKGzGggAAgoLWbAAAAABEgoLGfBB8ZGRkZGRkZHwAGBgYGBgYGBg4AHxMTEA8DExMfAB8TEwMOAxMTHwADAx+TExMTExMAHxMTAwMfEBMfA'
        + 'B8TExMfEBMTHwAMDAwGBgMTEx8AHxMTEx8ZGRkfAB8TEwMfExMTHwAgCAQUEGEiEJACAQBgSIRRA==');
      
    // digits    
    for (let i = 0; i < 10; ++i) {
        createCanvas(8, 9, (canvas, imageData) => {
            digitSprites[i] = canvas;
            const offset = Offsets.DIGITS_GFX + 10 * (i + 1) - 2;
            for (let y = 0; y < 9; ++y) {
                const byte = binStr.charCodeAt(offset - y);
                console.log(`byte: ${byte.toString(16)}`); // TODO REMOVE
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