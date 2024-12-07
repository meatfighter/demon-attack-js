import { isMobileDevice } from './mobile';

export const LOCAL_STORAGE_KEY = 'demon-attack-store';

export class Store {
    highScore = 0;
    
    volume = 10;

    autofire = isMobileDevice();
    tracer = false;
    fast = false;
   
    score = 0;
    level = 0;
    bunkers = 3;
    spawnedDemons = 0;
}

export let store: Store;

export function saveStore() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}

export function loadStore() {
    if (store) {
        return;
    }

    const str = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (str) {
        try {
            store = JSON.parse(str) as Store;
        } catch {
            store = new Store();            
        }
    } else {
        store = new Store();
    }
}