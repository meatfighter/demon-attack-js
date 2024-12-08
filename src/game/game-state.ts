import { Demon } from './demon';
import { Cannon } from './cannon';
import { CannonBullet } from './cannon-bullet';
import { DemonBullet } from './demon-bullet';
import { store, saveStore } from '@/store';
import { Tier } from './tier';

const CANNON_FIRING_SPEEDS = [ 3, 3, 4, 4, 5, 5, 5, 5, 6 ];
const DEMON_FIRING_SPEEDS = [ 8, 6, 6, 3, 5, 4 ];

export class GameState {
    level = 0;
    demonPalette = 0;
    demonType = 0;
    backgroundColor = 0;
    baseColor = 0;
    bunkers: number;
    bunkerColor = 0;
    score: number;
    scoreColor = 0x2C;
    cannon = new Cannon();
    cannonBullet = new CannonBullet();
    cannonFiringSpeed = 0;
    demons = new Array<Demon>();
    spawnDelay = 0;
    spawnedDemons: number;
    divingDemon: Demon | null = null;
    demonBullets = new Array<DemonBullet>();
    demonBulletDropTimer = 0;
    demonBulletDropTimerReset = 0;
    animatingExtraBunker = false;
    animatingGameOver = false;
    newHighScore = false;

    constructor() {
        this.setLevel(store.level);        
        this.score = store.score;
        this.spawnedDemons = store.spawnedDemons;        
        this.bunkers = store.bunkers;
        this.cannon.exploded = store.cannonExploded;
    }

    private setLevel(level: number) {
        this.level = level;
        this.demonPalette = level % 7;
        this.demonType = (level >> 1) % 6;
        this.cannonFiringSpeed = store.autofire ? 12 : CANNON_FIRING_SPEEDS[Math.min(8, level)];
        this.demonBulletDropTimerReset = DEMON_FIRING_SPEEDS[(level < 4) ? level : (level & 1) + 4];
        this.spawnDelay = 30;
        this.demonBulletDropTimer = 0;
        this.spawnedDemons = 0;
    }

    incrementLevel() {
        this.setLevel(this.level + 1);        
    }

    private countDemons(): number {
        let top = false;
        let middle = false;
        let bottom = false;
        let diving = this.divingDemon != null;
        for (let i = this.demons.length - 1; i >= 0; --i) {
            const demon = this.demons[i];
            switch (demon.tier) {
                case Tier.TOP:
                    top = true;
                    break;
                case Tier.MIDDLE:
                    middle = true;
                    break;
                case Tier.BOTTOM:
                    bottom = true;
                    break;
                case Tier.DIVING:
                    diving = true;
                    break;            
            }
        }
        let count = 0;
        if (top) {
            ++count;
        }
        if (middle) {
            ++count;
        }
        if (bottom) {
            ++count;
        }
        if (diving) {
            ++count;
        }
        return count;
    }

    save() {
        if (this.animatingGameOver || (this.cannon.exploding && this.bunkers === 0)) {
            store.level = 0;
            store.score = 0;
            store.spawnedDemons = 0;
            store.bunkers = 3;
            store.cannonExploded = false;
        } else {
            store.level = this.level;
            store.score = this.score;                        
            store.cannonExploded = this.cannon.exploded;
            store.spawnedDemons = Math.max(0, this.spawnedDemons - this.countDemons());
            
            if (this.cannon.exploding) {
                store.bunkers = Math.max(0, this.bunkers - 1);
            } else if (this.animatingExtraBunker) {
                store.bunkers = Math.min(6, this.bunkers + 1);
            } else {
                store.bunkers = this.bunkers;
            }
        }
        saveStore();
    }

    removeDemon(demon: Demon) {
        if (this.divingDemon == demon) {
            this.divingDemon = null;
        }
        if (demon.partner) {
            demon.partner.partner = null;
        }
        for (let i = this.demons.length - 1; i >= 0; --i) {
            if (this.demons[i] === demon) {
                this.demons.splice(i, 1);
                return;
            }
        }
    }
}