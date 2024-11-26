import { Easer } from "./easer";
import { Enemy } from "./enemy";
import { Tier } from "./tier";
import { gaussianRandom, clamp } from '@/math';
import { state } from "./state";
import { demonSpriteAndMasks } from '@/graphics';

// demons appear bottom, middle, top around 100, 80, and 60
// demons move between 56 and 141, exact bands vary randomly
// must leave enough gap for demons to form

// bottom demons prefers to be 30 -- 122
// top, middle full range, but prefer to stay near current position

export class Demon extends Enemy {

    constructor() {
        super();

        this.tier = Tier.BOTTOM;
        const { enemies } = state;
        for (let i = enemies.length - 1; i >= 0; --i) {
            const enemy = enemies[i];
            if (enemy === this) {
                continue;
            }
            this.tier = Math.min(this.tier, enemy.tier - 1);
        }
        
        this.resetYEaser();
    }

    update() {
        super.update();

        if (this.xEaser.update()) {
            this.resetXEaser();
        }
        this.x = this.xEaser.v;

        if (this.yEaser.update()) {
            this.resetYEaser();
        }
        this.y = this.yEaser.v;
    }

    private resetXEaser() {
        if (this.x === -1) {
            this.x = Math.floor(144 * Math.random());
        }

        let x1: number;
        if (this.tier === Tier.BOTTOM) {
            const { cannon } = state;
            if (this.x + 4 < cannon.x) {
                x1 = gaussianRandom(cannon.x - 20, 2);
            } else {
                x1 = gaussianRandom(cannon.x + 11, 2);
            }
        } else {
            x1 = gaussianRandom(this.x, 32);
        }
        x1 = clamp(x1, 0, 143);
        this.xEaser.reset(this.x, x1, 2 * Math.abs(x1 - this.x + 1));
    }

    private resetYEaser() {
        let yMin = 56;
        let yMax = 141;
        
        const { enemies } = state;
        switch (this.tier) {
            case Tier.TOP:
                for (let i = enemies.length - 1; i >= 0; --i) {
                    const enemy = enemies[i];
                    if (enemy === this) {
                        continue;
                    }
                    yMax = Math.min(yMax, enemy.yEaser.getMin() - 8);
                }
                break;
            case Tier.MIDDLE:
                yMin += 8;
                yMax -= 8;
                for (let i = enemies.length - 1; i >= 0; --i) {
                    const enemy = enemies[i];
                    if (enemy === this) {
                        continue;
                    }
                    if (enemy.tier == Tier.TOP) {
                        yMin = Math.max(yMin, enemy.yEaser.getMax() + 8);
                    } else if (enemy.tier == Tier.BOTTOM) {
                        yMax = Math.min(yMax, enemy.yEaser.getMin() - 8);
                    }
                }
                break;
            case Tier.BOTTOM:
                for (let i = enemies.length - 1; i >= 0; --i) {
                    const enemy = enemies[i];
                    if (enemy === this) {
                        continue;
                    }
                    yMin = Math.max(yMin, enemy.yEaser.getMax() + 8);
                }
                break;
        }

        yMin = Math.min(yMin, yMax);
        yMax = Math.max(yMin, yMax);

        if (this.y === -1) {
            this.y = yMin + (yMax - yMin) * Math.random();
        }

        this.yEaser.reset(this.y, yMin + (yMax - yMin) * Math.random(), yMax - yMin + 1);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(demonSpriteAndMasks[state.demonPalette][state.demonType][this.sprite].sprite, Math.floor(this.x), 
                Math.floor(this.y));
    }
}