import { GameState } from './game-state';
import { cannonMask, colors, demonShots } from '@/graphics';
import { Demon } from './demon';
import { bulletIntersects } from '@/math';
import { CANNON_Y } from './cannon';

const color = colors[0x4e];

const FREQS = [
  //   1   2   3   4   5   6
    [  1,  0, 18,  5,  0,  0 ], // 0
    [  2, 18,  2,  9,  0,  0 ], // 1   
    [  1, 12,  3, 13,  0,  0 ], // 4
    [  0, 14,  1,  7,  5,  4 ], // 5
    [  0, 28,  4, 25,  2,  1 ], // 8
    [  3, 23,  2, 15,  5, 14 ], // 9
];

const BATCHES: number[][] = [];

function init() {
    for (const freqs of FREQS) {
        const bs: number[] = [];
        for (let i = 0; i < freqs.length; ++i) {
            const freq = freqs[i];
            const value = i + 1;
            for (let j = 0; j < freq; ++j) {
                bs.push(value);
            }
        }
        BATCHES.push(bs);
    }   
}

init();

export function createDemonBulletBatch(gs: GameState, demon: Demon) {
    const { level, demonBullets } = gs;
    const lasers = ((level >> 1) & 1) === 1;
    let x = Math.floor(demon.x) + 4;    
    let batchSize = 4;
    if (!lasers) {
        const levelMod12 = level % 12;
        const batch = BATCHES[((levelMod12 >> 1) & 0b110) | (levelMod12 & 0b001)];
        batchSize = batch[Math.floor(batch.length * Math.random())];
    }
    for (let i = batchSize - 1, y = 8 * Math.floor(demon.y / 8) + 6; i >= 0; --i, y -= 8) {
        if (Math.random() < 0.125) {
            y -= 8;
        }        
        demonBullets.push(new DemonBullet(demon, x, y, demonShots[lasers ? (demon.split ? 0 : 12) 
                : Math.floor(demon.split ? 2 * (1 + Math.random()) : demonShots.length * Math.random())]));
    }
    gs.demonBulletDropTimer = gs.demonBulletDropTimerReset - 1;
}

export class DemonBullet {

    xOffset = 0;

    constructor(public demon: Demon, public x: number, public y: number, public shots: number[]) {
    }
    
    update(gs: GameState) {
        const lasers = ((gs.level >> 1) & 1) === 1;
        if (gs.demonBulletDropTimer === 0) {            
            if (this.demon.split || !lasers) {
                const r = Math.random();
                if (lasers) {
                    if (r < 0.0625) {
                        --this.xOffset;
                    } else if (r < 0.125) {
                        ++this.xOffset;
                    }
                } else {
                    if (r < 0.25) {
                        --this.xOffset;
                    } else if (r < 0.5) {
                        ++this.xOffset;
                    }
                }
            }
            if (gs.level >= 8) {
                this.x = Math.floor(this.demon.x) + 4;
            }        
            this.y += 8;
            if (this.y >= 198) {
                const { demonBullets } = gs;
                for (let i = demonBullets.length - 1; i >= 0; --i) {
                    if (demonBullets[i] === this) {
                        demonBullets.splice(i, 1);
                        break;
                    }
                }
            }
        }

        const { cannon } = gs;
        if (!cannon.exploding) {
            const yMin = Math.floor(this.demon.y + 12);
            let y0: number;
            let y1: number;
            if (lasers) {
                y0 = this.y;
                y1 = y0 + 7;
            } else {
                y0 = (gs.demonBulletDropTimer === 1) ? this.y : this.y + 4;
                y1 = y0 + 3;
            }
            y0 = Math.max(yMin, y0);
            y1 = Math.min(196, y1);
            if (y0 > 196 || y1 < y0) {
                return;
            }
            
            const x = this.x + this.xOffset;
            if (bulletIntersects(x + this.shots[0], y0, y1 - y0 + 1, cannonMask, cannon.x, CANNON_Y)
                    || (this.shots.length > 1 && bulletIntersects(x + this.shots[1], y0, y1 - y0 + 1, 
                            cannonMask, cannon.x, CANNON_Y))) {
                cannon.explode();            
            }
        }
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
        const yMin = Math.floor(this.demon.y + 12);

        let y0: number;
        let y1: number;
        if (((gs.level >> 1) & 1) === 0) {
            y0 = (gs.demonBulletDropTimer === 1) ? this.y : this.y + 4;
            y1 = y0 + 3;
        } else {
            y0 = this.y;
            y1 = y0 + 7;
        }
        y0 = Math.max(yMin, y0);
        y1 = Math.min(196, y1);
        if (y0 > 196 || y1 < y0) {
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