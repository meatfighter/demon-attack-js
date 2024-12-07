export function isMobileDevice(): boolean {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    if (Array.from(gamepads).some(gamepad => gamepad !== null)) {
        return false;
    }

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera; 
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;    
    if (mobileRegex.test(userAgent)) {
        return true;
    }

    const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hoverNone = window.matchMedia('(hover: none)').matches;
    const primaryInputIsTouch = coarsePointer && hoverNone;
    if (touchSupported && primaryInputIsTouch) {
        return true;
    }

    return false;
}