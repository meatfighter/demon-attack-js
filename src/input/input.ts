import { exit } from '@/screen';

let leftPressed = 0;
let rightPressed = 0;
let firePressed = false;

let leftTouched = false;
let rightTouched = false;

let hideCursorTimeoutId: number | null = null;
let cursorHidden = false;

class TouchData {
    timestampDown = 0;
    xDown = 0;
    yDown = 0;
    x = 0;
    y = 0;
}

const touchDatas: Map<number, TouchData> = new Map();

export function startInput() {
    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', resetHideCursorTimer);
    window.addEventListener('mouseenter', resetHideCursorTimer);
    window.addEventListener('mouseleave', cancelHideCursorTimer);
    resetHideCursorTimer();

    window.addEventListener('touchstart', onTouch, { passive: false });
    window.addEventListener('touchmove', onTouch, { passive: false });
    window.addEventListener('touchend', onTouch, { passive: false });
    window.addEventListener('touchcancel', onTouch, { passive: false });

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    leftPressed = 0;
    rightPressed = 0;
    firePressed = false;

    leftTouched = false;
    rightTouched = false;

    touchDatas.clear();
}

export function stopInput() {
    window.removeEventListener('click', onClick);
    window.removeEventListener('mousemove', resetHideCursorTimer);
    window.removeEventListener('mouseenter', resetHideCursorTimer);
    window.removeEventListener('mouseleave', cancelHideCursorTimer);
    cancelHideCursorTimer();

    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);

    window.removeEventListener('touchstart', onTouch);
    window.removeEventListener('touchmove', onTouch);
    window.removeEventListener('touchend', onTouch);
    window.removeEventListener('touchcancel', onTouch);

    leftPressed = 0;
    rightPressed = 0;
    firePressed = false;

    leftTouched = false;
    rightTouched = false;
    
    touchDatas.clear();
}

export function isLeftPressed(): boolean {
    return leftTouched || leftPressed > rightPressed;
}

export function isRightPressed(): boolean {
    return rightTouched || rightPressed > leftPressed;
}

export function isFirePressed(): boolean {
    return firePressed;
}

function cancelHideCursorTimer() {
    if (hideCursorTimeoutId !== null) {
        clearTimeout(hideCursorTimeoutId);
        hideCursorTimeoutId = null;
    }

    if (cursorHidden) {
        document.body.style.cursor = 'default';
        cursorHidden = false;
    }
}

function resetHideCursorTimer() {
    cancelHideCursorTimer();

    hideCursorTimeoutId = window.setTimeout(() => {
        document.body.style.cursor = 'none';
        cursorHidden = true;
    }, 3000);
}

function onTouch(e: TouchEvent) {
    e.preventDefault();    

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const landscape = innerWidth >= innerHeight;

    for (let i = e.changedTouches.length - 1; i >= 0; --i) {
        const t = e.changedTouches[i];
        let x: number;
        let y: number;
        if (landscape) {
            x = t.clientX;
            y = t.clientY;
        } else {
            x = innerHeight - 1 - t.clientY;
            y = t.clientX;
        }
        switch (e.type) {
            case 'touchstart': {
                const touchData = new TouchData();
                touchData.timestampDown = Date.now();
                touchData.xDown = touchData.x = x;
                touchData.yDown = touchData.y = y;
                touchDatas.set(t.identifier, touchData);
                break;
            }
            case 'touchmove': {
                resetHideCursorTimer();
                const touchData = touchDatas.get(t.identifier);
                if (touchData) {
                    touchData.x = x;
                    touchData.y = y;
                }
                break;
            }
            case 'touchend':
            case 'touchcancel': {
                const touchData = touchDatas.get(t.identifier);
                if (touchData) {
                    if (x < 64 && y < 64 && touchData.xDown < 64 && touchData.yDown < 64) {
                        exit();
                    } 
                    touchDatas.delete(t.identifier);
                }              
                break;
            }
        }
    }
    
    let td: TouchData | null = null;
    for (const [ identifier, touchData ] of Array.from(touchDatas)) {
        if (!td || touchData.timestampDown > td.timestampDown) {
            td = touchData;
        }
        outer: {
            for (let i = e.touches.length - 1; i >= 0; --i) {
                const t = e.touches[i];
                if (t.identifier === identifier) {
                    break outer;
                }      
            }
            touchDatas.delete(identifier);
        }
    }
    if (td) {
        if (td.x < innerWidth / 2) {
            leftTouched = true;
            rightTouched = false;
        } else {
            leftTouched = false;
            rightTouched = true;
        }
    } else {
        leftTouched = rightTouched = false;
    }
}

function onClick(e: MouseEvent) {
    if (!(e.clientX && e.clientY)) {
        return;
    }

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    let x: number;
    let y: number;
    if (innerWidth >= innerHeight) {
        x = e.clientX;
        y = e.clientY;
    } else {
        x = innerHeight - 1 - e.clientY;
        y = e.clientX;
    }

    if (x < 64 && y < 64) {
        exit();
    }
}

function onKeyDown(e: KeyboardEvent) {
    switch(e.code) {
        case 'KeyA':
        case 'ArrowLeft':
            leftPressed = rightPressed + 1;
            break;
        case 'KeyD':
        case 'ArrowRight':
            rightPressed = leftPressed + 1;
            break;
        case 'Escape':
            exit();
            break;    
        default:
            firePressed = true;
            break;            
    }
}

function onKeyUp(e: KeyboardEvent) {
    switch(e.code) {
        case 'KeyA':
        case 'ArrowLeft':
            leftPressed = 0;
            break;
        case 'KeyD':
        case 'ArrowRight':
            rightPressed = 0;
            break;        
        default:
            firePressed = false;
            break;            
    }
}

