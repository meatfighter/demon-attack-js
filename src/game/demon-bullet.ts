import { GameState } from './game-state';
import { colors, demonShots } from '@/graphics';
import { Demon } from './demon';

const color = colors[0x4e];

// max bullet y = 190
// max draw y = 196
// bullets drop in 8 pixel units
// only lower 4 pixels drawn
// every timer, they may randomly shift, one before the upper halves are drawn

                                //  1   2   3   4   5   6   7
const DEMON_BULLET_FREQUENCIES = [  1,  6, 15, 20, 15,  6,  1 ]; // from Pascal's triangle
const DEMON_BULLET_BATCH_SIZES = new Array<number>();

function init() {
    for (let i = DEMON_BULLET_FREQUENCIES.length - 1; i >= 0; --i) {
        const value = i + 1;
        for (let j = DEMON_BULLET_FREQUENCIES[i] - 1; j >= 0; --j) {
            DEMON_BULLET_BATCH_SIZES.push(value);
        }
    }    
}

init();

export function createDemonBulletBatch(gs: GameState, demon: Demon) {
    const { demonBullets } = gs;
    let x = Math.floor(demon.x) + 4;
    for (let i = DEMON_BULLET_BATCH_SIZES[Math.floor(DEMON_BULLET_BATCH_SIZES.length * Math.random())] - 1, 
            y = 8 * Math.floor(demon.y / 8) - 2; i >= 0; --i, y -= 8) {
        demonBullets.push(new DemonBullet(demon, x, y, 
            demonShots[Math.floor(demon.split ? 2 * (1 + Math.random()) : demonShots.length * Math.random())]));
    }
}

export class DemonBullet {

    xOffset = 0;

    constructor(public demon: Demon, public x: number, public y: number, public shots: number[]) {
    }
    
    update(gs: GameState) {
        if (gs.demonBulletDropTimer !== 0) {
            return;
        }
        const r = Math.random();
        if (r < 0.25) {
            --this.xOffset;
        } else if (r < 0.5) {
            ++this.xOffset;
        }
        if (gs.level >= 8) {
            this.x = Math.floor(this.demon.x) + 4;
        }
        this.y += 8;
        if (this.y > 198) {
            const { demonBullets } = gs;
            for (let i = demonBullets.length - 1; i >= 0; --i) {
                if (demonBullets[i] === this) {
                    demonBullets.splice(i, 1);
                    break;
                }
            }
        }
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
        const yMin = Math.floor(this.demon.y + 12);

        const y0 = (gs.demonBulletDropTimer === 1) ? this.y : this.y + 4;
        const y1 = Math.min(196, y0 + 3);
        if (y0 > 196 || y1 < yMin) {
            return;
        }
        ctx.fillStyle = color;
        const x = this.x + this.xOffset;
        ctx.fillRect(x + this.shots[0], y0, 1, y1 - y0 + 1);
        if (this.shots.length > 1) {
            ctx.fillRect(x + this.shots[1], y0, 1, y1 - y0 + 1);
        }
    }
}