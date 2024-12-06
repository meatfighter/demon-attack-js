import { mainCanvas, mainCanvasWidth, mainCanvasLandscape } from '@/screen';
import { Button, ButtonType } from './button';

let leftPressed = 0;
let rightPressed = 0;
let firePressed = false;

let leftPointed = 0;
let rightPointed = 0;

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
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // document.addEventListener('touchstart', e => e.preventDefault(), { passive: false }); // prevents magnify bubbles    
    // document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    // document.addEventListener('touchend', e => e.preventDefault(), { passive: false });

    // document.addEventListener('pointerdown', e => e.preventDefault(), { passive: false });
    // document.addEventListener('pointermove', e => e.preventDefault(), { passive: false });
    // document.addEventListener('pointerup', e => e.preventDefault(), { passive: false });
    // document.addEventListener('pointercancel', e => e.preventDefault(), { passive: false });

    window.addEventListener('touchstart', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('touchend', preventDefault, { passive: false });
    window.addEventListener('touchcancel', preventDefault, { passive: false });    

    mainCanvas.addEventListener('pointerdown', onPointerDown, { passive: false });
    mainCanvas.addEventListener('pointermove', onPointerMove, { passive: false });
    mainCanvas.addEventListener('pointerup', onPointerUp, { passive: false });
    mainCanvas.addEventListener('pointercancel', onPointerCancel, { passive: false });
}

function preventDefault(e: Event) {
    e.preventDefault();
}

export function stopInput() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);

    window.removeEventListener('touchstart', preventDefault);
    window.removeEventListener('touchmove', preventDefault);
    window.removeEventListener('touchend', preventDefault);
    window.removeEventListener('touchcancel', preventDefault);     

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
        }
    }
}

function getCoordinates(e: PointerEvent): { x: number, y: number } {    
    const r = mainCanvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (!mainCanvasLandscape) {
        return { x: mainCanvasWidth - 1 - y, y: x };
    }
    return { x, y };
}

function onPointerDown(e: PointerEvent) {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    let pointer = pointers.get(e.pointerId);
    if (!pointer) {
        pointer = new Pointer();
        pointers.set(e.pointerId, pointer);
    }
    pointer.x = x;
    pointer.y = y;
    pointer.down = true;
    pointer.xDown = x;
    pointer.yDown = y;    
    updatePointed();
} 

function onPointerMove(e: PointerEvent) {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    let pointer = pointers.get(e.pointerId);
    if (!pointer) {
        pointer = new Pointer();
        pointers.set(e.pointerId, pointer);
    }
    pointer.x = x;
    pointer.y = y;
    updatePointed();
}
  
function onPointerUp(e: PointerEvent) {
    e.preventDefault();
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
    return firePressed;
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

