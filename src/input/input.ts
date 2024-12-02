import { mainCanvas, mainCanvasInverseTransform, mainCanvasWidth, mainCanvasHeight } from '@/screen';
import { Button, ButtonType } from './button';

let leftPressed = 0;
let rightPressed = 0;
let firePressed = false;

let leftPointed = 0;
let rightPointed = 0;
let firePointed = false;

class Pointer {
    x = 0;
    y = 0;
    down = false;
    xDown = -1;
    yDown = -1;
}

const pointers: Map<number, Pointer> = new Map();
const buttons: Button[] = [];

export function addButton(button: Button) {
    buttons.push(button);
}

export function removeButton(button: Button) {
    for (let i = buttons.length - 1; i >= 0; --i) {
        if (buttons[i] === button) {
            buttons.splice(i, 1);
        }
    }
}

export function startInput() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    mainCanvas.addEventListener('pointerdown', onPointerDown);
    mainCanvas.addEventListener('pointermove', onPointerMove);
    mainCanvas.addEventListener('pointerup', onPointerUp);
    mainCanvas.addEventListener('pointercancel', onPointerCancel);
}

export function stopInput() {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    mainCanvas.removeEventListener('pointerdown', onPointerDown);
    mainCanvas.removeEventListener('pointermove', onPointerMove);
    mainCanvas.removeEventListener('pointerup', onPointerUp);
    mainCanvas.removeEventListener('pointercancel', onPointerCancel);
}

function updatePointed() {
    for (let i = buttons.length - 1; i >= 0; --i) {
        const button = buttons[i];
        button.down = button.hovered = false;
    }
    for (const p of pointers.values()) {
        for (let i = buttons.length - 1; i >= 0; --i) {
            const button = buttons[i];
            if (p.x >= button.x && p.y >= button.y && p.x < button.x + button.width && p.y < button.y + button.height) {
                if (p.down) {
                    button.down = true;
                } else {
                    button.hovered = true;
                    if (p.xDown >= button.x && p.yDown >= button.y && p.xDown < button.x + button.width 
                            && p.yDown < button.y + button.height) {
                        button.clicked = true;
                    }
                }    
            }
        }
    }
    for (let i = buttons.length - 1; i >= 0; --i) {
        const button = buttons[i];
        switch (button.buttonType) {
            case ButtonType.LEFT:
                if (button.down) {
                    leftPointed = rightPointed + 1;
                } else {
                    leftPointed = 0;
                }
                break; 
            case ButtonType.RIGHT:
                if (button.down) {
                    rightPointed = leftPointed + 1;
                } else {
                    rightPointed = 0;
                }
                break;                
            case ButtonType.FIRE:
                firePointed = button.down; 
                break;
        }
    }
}

function onPointerDown(e: PointerEvent) {
    const r = mainCanvas.getBoundingClientRect();
    const p = new DOMPoint(e.clientX - r.left, e.clientY - r.top).matrixTransform(mainCanvasInverseTransform);
    let pointer = pointers.get(e.pointerId);
    if (!pointer) {
        pointer = new Pointer();
        pointers.set(e.pointerId, pointer);
    }
    pointer.x = p.x;
    pointer.y = p.y;
    pointer.down = true;
    pointer.xDown = p.x;
    pointer.yDown = p.y;    
    updatePointed();
} 

function onPointerMove(e: PointerEvent) {
    const r = mainCanvas.getBoundingClientRect();
    const p = new DOMPoint(e.clientX - r.left, e.clientY - r.top).matrixTransform(mainCanvasInverseTransform);
    let pointer = pointers.get(e.pointerId);
    if (!pointer) {
        pointer = new Pointer();
        pointers.set(e.pointerId, pointer);
    }
    pointer.x = p.x;
    pointer.y = p.y;
    updatePointed();
}
  
function onPointerUp(e: PointerEvent) {
    const r = mainCanvas.getBoundingClientRect();
    const p = new DOMPoint(e.clientX - r.left, e.clientY - r.top).matrixTransform(mainCanvasInverseTransform);
    let pointer = pointers.get(e.pointerId);
    if (!pointer) {
        pointer = new Pointer();
        pointers.set(e.pointerId, pointer);
    }
    pointer.down = false;
    updatePointed();
    pointers.delete(e.pointerId);
}
  
function onPointerCancel(e: PointerEvent) {
    onPointerUp(e);
}

export function isLeftPressed(): boolean {
    return leftPressed > rightPressed || leftPointed > rightPointed;
}

export function isRightPressed(): boolean {
    return rightPressed > leftPressed || rightPointed > leftPointed;
}

export function isFirePressed(): boolean {
    return firePressed || firePointed;
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

