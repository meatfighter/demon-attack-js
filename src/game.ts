import { FRAMES_PER_SECOND, startAnimation, stopAnimation } from './animate';
import { acquireWakeLock, releaseWakeLock } from './wake-lock';
import { NoParamVoidFunc } from './no-param-void-func';
import { enter as enterStart } from './start';
import { playSoundEffect } from './sfx';
import { PhysicalDimensions, Resolution, digitSprites, demonSpriteAndMasks, cannonSpriteAndMask, bunkerSprites, 
    baseSprites, splitDemonSpriteAndMasks, demonExplosionSprites, demonFormsSprites } from './graphics';

enum State {
    GAME_START
}

let mainCanvas: HTMLCanvasElement | null;
let mainCtx: CanvasRenderingContext2D | null;
let mainCanvasWidth: number;
let mainCanvasHeight: number;

let screenCanvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

let removeMediaEventListener: NoParamVoidFunc | null = null;
let exiting = false;

let screenWidth: number;
let screenHeight: number;
let screenX: number;
let screenY: number;

let state = State.GAME_START;
let score = 12345;
let bunkers = 6;

const updatePixelRatio = () => {
    if (removeMediaEventListener !== null) {
        removeMediaEventListener();
        removeMediaEventListener = null;
    }

    if (exiting) {
        return;
    }

    const media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    media.addEventListener("change", updatePixelRatio);
    removeMediaEventListener = () => media.removeEventListener("change", updatePixelRatio);

    windowResized();
};

export function enter() {
    exiting = false;

    document.body.style.backgroundColor = '#C2BCB1';

    window.addEventListener('resize', windowResized);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('visibilitychange', onVisibilityChanged);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    screenCanvas = document.createElement('canvas');
    screenCanvas.width = Resolution.WIDTH;
    screenCanvas.height = Resolution.HEIGHT;  
    ctx = screenCanvas.getContext('2d');

    const mainElement = document.getElementById("main-content") as HTMLElement;
    mainElement.innerHTML = `<canvas id="main-canvas" class="canvas" width="1" height="1"></canvas>`;
    mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;

    acquireWakeLock();
    updatePixelRatio();
    startAnimation();
}

export function exit() {
    exiting = true;
    stopAnimation();
    releaseWakeLock();
    window.removeEventListener('resize', windowResized);
    window.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('visibilitychange', onVisibilityChanged);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    if (removeMediaEventListener !== null) {
        removeMediaEventListener();
        removeMediaEventListener = null;
    }
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault();
}

export function update() {
    switch (state) {
        case State.GAME_START:
            updateGameStart();
            break;
    }
}

function updateGameStart() {

}

export function render() {
    if (!mainCtx) {
        windowResized();
        return;
    }
    if (!ctx) {
        return;
    }
    
    mainCtx.fillStyle = 'gray';
    mainCtx.fillRect(0, 0, mainCanvasWidth, mainCanvasHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Resolution.WIDTH, Resolution.HEIGHT);

    ctx.drawImage(baseSprites[0], 0, 199, Resolution.WIDTH, 29);

    // draw score
    // {
    //     let s = score;
    //     let x = 96;
    //     while (true) {
    //         ctx.drawImage(digitSprites[s % 10], x, 18);
    //         s = Math.floor(s / 10);
    //         if (s === 0) {
    //             break;
    //         }
    //         x -= 8;
    //     }
    // }

    // ctx.fillStyle = 'white';
    // for (let i = 0; i < 6; ++i) {
    //     for (let j = 0; j < 3; ++j) {
    //         ctx.drawImage(demonSpriteAndMasks[0][i][j].sprite, 16 * j, 8 * i);
            
    //         const { mask } = demonSpriteAndMasks[0][i][j];
    //         for (let y = 0; y < 8; ++y) {
    //             for (let x = 0; x < 16; ++x) {
    //                 if (mask[y][x]) {
    //                     ctx.fillRect(16 * j + x, 8 * i + y, 1, 1);
    //                 }
    //             }
    //         }
    //     }
    // }  
    
    for (let i = 0; i < bunkers; ++i) {
        ctx.drawImage(bunkerSprites[0], 17 + (i << 3), 199);
    }

    // for (let i = 0; i < 2; ++i) {
    //     for (let j = 0; j < 3; ++j) {
    //         ctx.drawImage(demonExplosionSprites[0][i][j], 32 * j, 16 * i);
    //     }
    // }

    ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 2; ++j) {
            ctx.drawImage(demonFormsSprites[0][i][j], 48 * j, 16 * i, 32, 8);
        }
    }

    mainCtx.imageSmoothingEnabled = false;
    mainCtx.drawImage(screenCanvas, screenX, screenY, screenWidth, screenHeight);
}

function onKeyDown(e: KeyboardEvent) {
}

function onKeyUp(e: KeyboardEvent) {
}

function windowResized() {

    if (exiting) {
        return;
    }

    mainCtx = null;
    mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement | null;
    if (!mainCanvas) {
        return;
    }
    mainCanvas.style.display = 'none';

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    mainCanvas.style.display = 'block';
    mainCanvas.style.width = `${innerWidth}px`;
    mainCanvas.style.height = `${innerHeight}px`;    
    mainCanvas.style.position = 'absolute';
    mainCanvas.style.left = '0px';
    mainCanvas.style.top = '0px';

    const dpr = window.devicePixelRatio || 1;
    mainCanvas.width = Math.floor(dpr * innerWidth);
    mainCanvas.height = Math.floor(dpr * innerHeight);

    const transform = new DOMMatrix();
    if (innerWidth >= innerHeight) {
        // Landscape mode
        mainCanvasWidth = mainCanvas.width;
        mainCanvasHeight = mainCanvas.height;
        transform.a = 1;
        transform.d = 1;
        transform.b = transform.c = transform.e = transform.f = 0;
    } else {
        // Portrait mode
        mainCanvasWidth = mainCanvas.height;
        mainCanvasHeight = mainCanvas.width;
        transform.a = 0;
        transform.b = -1;
        transform.c = 1;
        transform.d = 0;
        transform.e = 0;
        transform.f = dpr * innerHeight;
    }

    mainCtx = mainCanvas.getContext('2d');
    if (!mainCtx) {
        return;
    }
    mainCtx.setTransform(transform);

    screenHeight = mainCanvasHeight;
    screenWidth = screenHeight * PhysicalDimensions.WIDTH / PhysicalDimensions.HEIGHT;
    if (screenWidth > mainCanvasWidth) {
        screenWidth = mainCanvasWidth;
        screenHeight = screenWidth * PhysicalDimensions.HEIGHT / PhysicalDimensions.WIDTH;
        screenX = 0;
        screenY = Math.round((mainCanvasHeight - screenHeight) / 2);
    } else {
        screenX = Math.round((mainCanvasWidth - screenWidth) / 2);
        screenY = 0;
    }

    render();
}

function onVisibilityChanged() {
    if (!exiting && document.visibilityState === 'visible') {
        acquireWakeLock();
    }
}