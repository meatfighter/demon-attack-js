import { Easer } from "./easer";
import { Tier } from "./tier";
import { gaussianRandom, clamp } from '@/math';
import { GameState } from "./game-state";
import { demonSpriteAndMasks } from '@/graphics';

// demons appear bottom, middle, top around 100, 80, and 60
// demons move between 56 and 141, exact bands vary randomly
// must leave enough gap for demons to form

export class Demon {

    xEaser = new Easer();
    yEaser = new Easer();
    
    sprite = 0;
    flap = 0;
    flapCounter = 8;    

    constructor(public x: number, public y: number, public tier: Tier) {
        
    }

    update(gs: GameState) {
        if (--this.flapCounter === 0) {
            this.flapCounter = 8;
            this.flap = (this.flap + 1) & 3;
            this.sprite = (this.flap === 3) ? 1: this.flap;
        }

        if (this.xEaser.update()) {
            this.resetXEaser(gs);
        }
        this.x = this.xEaser.v;

        if (this.yEaser.update()) {
            this.resetYEaser(gs);
        }
        this.y = this.yEaser.v;
    }

    private resetXEaser(gs: GameState) {
        let x1: number;
        if (this.tier === Tier.BOTTOM) {
            const { cannon } = gs;
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

    private resetYEaser(gs: GameState) {
        let yMin = 56;
        let yMax = 141;
        
        const { demons } = gs;
        switch (this.tier) {
            case Tier.TOP:
                yMax -= 16;
                for (let i = demons.length - 1; i >= 0; --i) {
                    const demon = demons[i];
                    if (demon === this) {
                        continue;
                    }
                    yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
                }
                break;
            case Tier.MIDDLE:
                yMin += 8;
                yMax -= 8;
                for (let i = demons.length - 1; i >= 0; --i) {
                    const demon = demons[i];
                    if (demon === this) {
                        continue;
                    }
                    if (demon.tier == Tier.TOP) {
                        yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
                    } else if (demon.tier == Tier.BOTTOM) {
                        yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
                    }
                }
                break;
            case Tier.BOTTOM:
                yMin += 16;
                for (let i = demons.length - 1; i >= 0; --i) {
                    const demon = demons[i];
                    if (demon === this) {
                        continue;
                    }
                    yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
                }
                break;
        }

        yMin = Math.min(yMin, yMax);
        yMax = Math.max(yMin, yMax);

        this.yEaser.reset(this.y, yMin + (yMax - yMin) * Math.random(), yMax - yMin + 1);
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
        ctx.drawImage(demonSpriteAndMasks[gs.demonPalette][gs.demonType][this.sprite].sprite, Math.floor(this.x), 
                Math.floor(this.y));
    }
}