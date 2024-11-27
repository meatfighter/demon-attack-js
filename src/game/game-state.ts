import { Demon } from './demon';
import { Cannon } from './cannon';
import { CannonBullet } from './cannon-bullet';

const CANNON_FIRING_SPEEDS = [ 3, 3, 4, 4, 5, 5, 5, 5, 6 ];

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

    setLevel(level: number) {
        this.level = level;
        this.demonPalette = level % 7;
        this.demonType = (level >> 1) % 6;
        this.cannonFiringSpeed = CANNON_FIRING_SPEEDS[Math.min(8, level)];
    }
}