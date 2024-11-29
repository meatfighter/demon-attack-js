import { Demon } from './demon';
import { Cannon } from './cannon';
import { CannonBullet } from './cannon-bullet';
import { DemonBullet } from './demon-bullet';

const CANNON_FIRING_SPEEDS = [ 3, 3, 4, 4, 5, 5, 5, 5, 6 ];
const DEMON_FIRING_SPEEDS = [ 8, 6, 6, 3, 5, 4 ];

export class GameState {
    level = 0;
    demonPalette = 0;
    demonType = 0;
    backgroundColor = 0;
    baseColor = 0;
    bunkers = 3;
    bunkerColor = 0;
    score = 0;
    cannon = new Cannon();
    cannonBullet = new CannonBullet();
    cannonFiringSpeed = 0;
    demons = new Array<Demon>();
    spawnDelay = 30;
    divingDemon: Demon | null = null;

    demonBullets = new Array<DemonBullet>();
    demonBulletDropTimer = 0;
    demonBulletDropTimerReset = 0;

    setLevel(level: number) {
        this.level = level;
        this.demonPalette = level % 7;
        this.demonType = (level >> 1) % 6;
        this.cannonFiringSpeed = CANNON_FIRING_SPEEDS[Math.min(8, level)];
        this.demonBulletDropTimerReset = DEMON_FIRING_SPEEDS[(level < 4) ? level : (level & 1) + 4];
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