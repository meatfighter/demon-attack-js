let leftPressed = 0;
let rightPressed = 0;
let firePressed = false;

export function startInput() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
}

export function stopInput() {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('touchmove', onTouchMove);
}

export function isLeftPressed(): boolean {
    return leftPressed > rightPressed;
}

export function isRightPressed(): boolean {
    return rightPressed > leftPressed;
}

export function isFirePressed(): boolean {
    return firePressed;
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault();
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

