import { enter as enterProgress } from "./progress";
import { enter as enterDeath } from "./death";
import { loadStore } from "./store";

export function init() {
    window.addEventListener('error', e => {
        console.error(`Caught in global handler: ${e.message}`, {
            source: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
        e.preventDefault();
        enterDeath();
    });
    window.addEventListener('unhandledrejection', e => e.preventDefault());
    document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.bundle.js').then(_ => {});
    }

    loadStore();
    enterProgress();
}

document.addEventListener('DOMContentLoaded', init);