import { FRAMES_PER_SECOND, startAnimation, stopAnimation } from './animate';
import { acquireWakeLock, releaseWakeLock } from './wake-lock';
import { NoParamVoidFunc } from './no-param-void-func';
import { enter as enterStart } from './start';
import { playSoundEffect } from './sfx';
import { PhysicalDimensions, Resolution } from './graphics';

enum State {
    GAME_START
}

let demonCanvas: HTMLCanvasElement | null;
let demonCtx: CanvasRenderingContext2D | null;

let screenCanvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

let removeMediaEventListener: NoParamVoidFunc | null = null;
let exiting = false;

let screenWidth: number;
let screenHeight: number;
let screenX: number;
let screenY: number;

let state = State.GAME_START;

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

    acquireWakeLock();

    const mainElement = document.getElementById("main-content") as HTMLElement;
    mainElement.innerHTML = `<canvas id="demon-canvas" class="canvas" width="1" height="1"></canvas>`;
    demonCanvas = document.getElementById("demon-canvas") as HTMLCanvasElement;

    updatePixelRatio();
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
    if (!demonCtx) {
        windowResized();
        return;
    }
    if (!ctx) {
        return;
    }
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, Resolution.WIDTH, Resolution.HEIGHT);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 50);
    ctx.stroke();

    console.log(`--12: ${demonCanvas!.width} ${demonCanvas!.height}`);
    demonCtx.fillStyle = 'yellow';
    demonCtx.fillRect(0, 0, demonCanvas!.width, demonCanvas!.height);
    //demonCtx.drawImage(screenCanvas, screenX, screenY, screenWidth, screenHeight);
}

function onTap() {

}

function onKeyDown(e: KeyboardEvent) {
}

function onKeyUp(e: KeyboardEvent) {
}

function windowResized() {

    if (exiting) {
        return;
    }

    demonCtx = null;
    demonCanvas = document.getElementById("demon-canvas") as HTMLCanvasElement | null;
    if (!demonCanvas) {
        return;
    }
    demonCanvas.style.display = 'none';

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    demonCanvas.style.display = 'block';
    demonCanvas.style.width = `${innerWidth}px`;
    demonCanvas.style.height = `${innerHeight}px`;    
    demonCanvas.style.position = 'absolute';
    demonCanvas.style.left = '0px';
    demonCanvas.style.top = '0px';

    const dpr = window.devicePixelRatio || 1;
    const transform = new DOMMatrix();
    if (innerWidth >= innerHeight) {
        transform.a = transform.d = dpr;
        transform.b = transform.c = transform.e = transform.f = 0;
        demonCanvas.width = Math.floor(dpr * innerWidth);
        demonCanvas.height = Math.floor(dpr * innerHeight);
    } else {
        transform.a = transform.d = transform.e = 0;
        transform.b = -dpr;
        transform.c = dpr;
        transform.f = dpr * innerWidth;
        demonCanvas.width = Math.floor(dpr * innerHeight);
        demonCanvas.height = Math.floor(dpr * innerWidth);
    }

    demonCtx = demonCanvas.getContext('2d');
    if (!demonCtx) {
        return;
    }
    demonCtx.setTransform(transform);

    screenHeight = demonCanvas.height;
    screenWidth = screenHeight * PhysicalDimensions.WIDTH / PhysicalDimensions.HEIGHT;
    if (screenWidth > demonCanvas.width) {
        screenWidth = demonCanvas.width;
        screenHeight = screenWidth * PhysicalDimensions.HEIGHT / PhysicalDimensions.WIDTH;
        screenX = 0;
        screenY = Math.round((demonCanvas.height - screenHeight) / 2);
    } else {
        screenX = Math.round((demonCanvas.width - screenWidth) / 2);
        screenY = 0;
    }

    render();
}

function onVisibilityChanged() {
    if (!exiting && document.visibilityState === 'visible') {
        acquireWakeLock();
    }
}