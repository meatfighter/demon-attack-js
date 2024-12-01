import { mainCanvas, mainCanvasInverseTransform, mainCanvasWidth, mainCanvasHeight } from './screen';

let leftPressed = 0;
let rightPressed = 0;
let firePressed = false;

let leftTouched = 0;
let rightTouched = 0;
let fireTouched = false;

interface TouchPosition {
    x: number;
    y: number;
}

const activePointers: Map<number, TouchPosition> = new Map();

export function startInput() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    mainCanvas.addEventListener('touchstart', onTouchStart, { passive: false });
    mainCanvas.addEventListener('touchmove', onTouchMove, { passive: false });
    mainCanvas.addEventListener('touchend', onTouchEnd, { passive: false });
    mainCanvas.addEventListener('touchcancel', onTouchCancel, { passive: false });
}

export function stopInput() {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    mainCanvas.removeEventListener('touchstart', onTouchStart);
    mainCanvas.removeEventListener('touchmove', onTouchMove);
    mainCanvas.removeEventListener('touchend', onTouchEnd);
    mainCanvas.removeEventListener('touchcancel', onTouchCancel);
}

function isInButton(p: TouchPosition, x: number, y: number): boolean {
    const dx = p.x - x;
    const dy = p.y - y;
    return dx * dx + dy * dy <= 484;
}

function updateTouched() {
    let left = false;
    let right = false;
    fireTouched = false;
    for (const p of activePointers.values()) {
        left ||= isInButton(p, 88, mainCanvasHeight - 111);
        right ||= isInButton(p, 176, mainCanvasHeight - 111);
        fireTouched ||= isInButton(p, mainCanvasWidth - 133, mainCanvasHeight - 67);
    }
    if (left) {
        leftTouched = rightTouched + 1;
    } else {
        leftTouched = 0;
    }
    if (right) {
        rightTouched = leftTouched + 1;
    } else {
        rightTouched = 0;
    }
}

function getCanvasCoordinates(touch: Touch): TouchPosition {
    const rect = mainCanvas.getBoundingClientRect();
    const p = new DOMPoint(touch.clientX - rect.left, touch.clientY - rect.top)
            .matrixTransform(mainCanvasInverseTransform);
    return { x: p.x, y: p.y };
}

function onTouchStart(event: TouchEvent) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        activePointers.set(touch.identifier, getCanvasCoordinates(touch));
    }
    updateTouched();
} 

function onTouchMove(event: TouchEvent) {
    onTouchStart(event);
}
  
function onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        activePointers.delete(event.changedTouches[i].identifier);
    }
    updateTouched();
}
  
function onTouchCancel(event: TouchEvent) {
    onTouchEnd(event);
}

export function isLeftPressed(): boolean {
    return leftPressed > rightPressed || leftTouched > rightTouched;
}

export function isRightPressed(): boolean {
    return rightPressed > leftPressed || rightTouched > leftTouched;
}

export function isFirePressed(): boolean {
    return firePressed || fireTouched;
}

function onKeyDown(e: KeyboardEvent) {
    switch(e.code) {
        case 'ArrowLeft':
            leftPressed = rightPressed + 1;
            break;
        case 'ArrowRight':
            rightPressed = leftPressed + 1;
            break;        
        case 'KeyZ':
            firePressed = true;
            break;            
    }
}

function onKeyUp(e: KeyboardEvent) {
    switch(e.code) {
        case 'ArrowLeft':
            leftPressed = 0;
            break;
        case 'ArrowRight':
            rightPressed = 0;
            break;        
        case 'KeyZ':
            firePressed = false;
            break;            
    }
}

