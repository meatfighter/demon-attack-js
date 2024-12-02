import { startAnimation, stopAnimation } from './animate';
import { acquireWakeLock, releaseWakeLock } from './wake-lock';
import { NoParamVoidFunc } from './no-param-void-func';
import { enter as enterStart } from './start';
import { playSoundEffect } from './sfx';
import { PhysicalDimensions, Resolution } from './graphics';
import { startInput, stopInput, addButton, removeButton } from './input/input';
import { Button, ButtonType } from './input/button';
import { renderScreen } from './game/game';

export let dpr: number;

export let mainCanvas: HTMLCanvasElement;
let mainCtx: CanvasRenderingContext2D | null;
export let mainCanvasWidth: number;
export let mainCanvasHeight: number;
export let mainCanvasInverseTransform: DOMMatrix;

let screenCanvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

let removeMediaEventListener: NoParamVoidFunc | null = null;
let exiting = false;

let screenWidth: number;
let screenHeight: number;
let screenX: number;
let screenY: number;

const leftButton = new Button();
const rightButton = new Button();
const fireButton = new Button();

function updatePixelRatio() {
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

    screenCanvas = document.createElement('canvas');
    screenCanvas.width = Resolution.WIDTH;
    screenCanvas.height = Resolution.HEIGHT;  
    ctx = screenCanvas.getContext('2d');

    const mainElement = document.getElementById("main-content") as HTMLElement;
    mainElement.innerHTML = `<canvas id="main-canvas" class="canvas" width="1" height="1"></canvas>`;
    mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    mainCanvas.style.touchAction = 'none';

    window.addEventListener('resize', windowResized);    
    document.addEventListener('visibilitychange', onVisibilityChanged);

    addButton(leftButton);
    addButton(rightButton);
    addButton(fireButton);
    startInput();

    acquireWakeLock();
    updatePixelRatio();
    startAnimation();
}

export function exit() {
    exiting = true;
    stopAnimation();
    releaseWakeLock();
    window.removeEventListener('resize', windowResized);    
    document.removeEventListener('visibilitychange', onVisibilityChanged);
    stopInput();
    removeButton(leftButton);
    removeButton(rightButton);
    removeButton(fireButton);
    
    if (removeMediaEventListener !== null) {
        removeMediaEventListener();
        removeMediaEventListener = null;
    }
}

export function render() {
    if (!mainCtx) {
        windowResized();
        return;
    }
    if (!ctx) {
        return;
    }
    
    mainCtx.imageSmoothingEnabled = false;
    mainCtx.fillStyle = '#1f1f1f';
    mainCtx.lineWidth = 1;
    mainCtx.fillRect(0, 0, mainCanvasWidth, mainCanvasHeight);

    ctx.imageSmoothingEnabled = false;
    renderScreen(ctx);

    mainCtx.drawImage(screenCanvas, screenX, screenY, screenWidth, screenHeight);

    leftButton.render(mainCtx);
    rightButton.render(mainCtx);
    fireButton.render(mainCtx);
}

function windowResized() {

    if (exiting) {
        return;
    }

    mainCtx = null;
    mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    mainCanvas.style.display = 'none';

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    mainCanvas.style.display = 'block';
    mainCanvas.style.width = `${innerWidth}px`;
    mainCanvas.style.height = `${innerHeight}px`;    
    mainCanvas.style.position = 'absolute';
    mainCanvas.style.left = '0px';
    mainCanvas.style.top = '0px';

    dpr = window.devicePixelRatio || 1;
    mainCanvas.width = Math.floor(dpr * innerWidth);
    mainCanvas.height = Math.floor(dpr * innerHeight);

    const transform = new DOMMatrix();
    if (innerWidth >= innerHeight) {
        // Landscape mode
        mainCanvasWidth = innerWidth;
        mainCanvasHeight = innerHeight;
        transform.a = transform.d = dpr;
        transform.b = transform.c = transform.e = transform.f = 0;
    } else {
        // Portrait mode
        mainCanvasWidth = innerHeight;
        mainCanvasHeight = innerWidth;
        transform.a = transform.d = transform.e = 0;
        transform.c = dpr;
        transform.b = -transform.c;        
        transform.f = dpr * innerHeight;
    }

    mainCtx = mainCanvas.getContext('2d');
    if (!mainCtx) {
        return;
    }
    mainCtx.setTransform(transform);
    mainCanvasInverseTransform = transform.inverse();

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

    leftButton.x = 88;
    leftButton.y = mainCanvasHeight / 2 - 22;
    leftButton.width = 44;
    leftButton.height = 44;
    leftButton.buttonType = ButtonType.LEFT;

    rightButton.x = 176;
    rightButton.y = mainCanvasHeight / 2 - 22;
    rightButton.width = 44;
    rightButton.height = 44;
    rightButton.buttonType = ButtonType.RIGHT;
    
    fireButton.x = mainCanvasWidth - 133;
    fireButton.y = mainCanvasHeight / 2 - 22;
    fireButton.width = 44;
    fireButton.height = 44;
    fireButton.buttonType = ButtonType.FIRE;    

    render();
}

function onVisibilityChanged() {
    if (!exiting && document.visibilityState === 'visible') {
        acquireWakeLock();
    }
}