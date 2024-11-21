import { FRAMES_PER_SECOND, startAnimation, stopAnimation } from './animate';
import { acquireWakeLock, releaseWakeLock } from './wake-lock';
import { NoParamVoidFunc } from './no-param-void-func';
import { enter as enterStart } from './start';
import { playSoundEffect } from "./sfx";

enum State {
    GAME_START
}

let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;

let removeMediaEventListener: NoParamVoidFunc | null = null;
let exiting = false;

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

    acquireWakeLock();

    const mainElement = document.getElementById("main-content") as HTMLElement;
    mainElement.innerHTML = `<canvas id="demon-canvas" class="canvas" width="1" height="1"></canvas>`;
    canvas = document.getElementById("demon-canvas") as HTMLCanvasElement;

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
    if (!ctx) {
        windowResized();
        return;
    }

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

    ctx = null;
    canvas = document.getElementById("demon-canvas") as HTMLCanvasElement | null;
    if (!canvas) {
        return;
    }
    canvas.width = canvas.height = 1;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const transform = new DOMMatrix();

    if (innerWidth >= innerHeight) {
        transform.a = transform.d = dpr;
        transform.b = transform.c = transform.e = transform.f = 0;
    } else {
        transform.a = transform.d = transform.e = 0;
        transform.b = -dpr;
        transform.c = dpr;
        transform.f = dpr * width;
        let t = width;
        width = height as number;
        height = t;
    }

    canvas.style.width = `${Math.floor(width)}px`;
    canvas.style.height = `${Math.floor(height)}px`;

    canvas.width = Math.floor(dpr * width);
    canvas.height = Math.floor(dpr * height);

    ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    ctx.setTransform(transform);

    canvas.style.left = `0px`
    canvas.style.top = `0px`;

    render();
}

function onVisibilityChanged() {
    if (!exiting && document.visibilityState === 'visible') {
        acquireWakeLock();
    }
}