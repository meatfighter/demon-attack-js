import { Easer } from "./easer";
import { Tier } from "./tier";
import { gaussianRandom, clamp, bulletIntersects } from '@/math';
import { GameState } from "./game-state";
import { demonSpriteAndMasks, demonSpawnSprites, demonExplosionSprites } from '@/graphics';
import { CannonBulletState } from "./cannon-bullet";

// demons appear bottom, middle, top around 100, 80, and 60
// demons move between 56 and 141, exact bands vary randomly
// must leave enough gap for demons to form

export class Demon {

    xEaser = new Easer();
    yEaser = new Easer();
    
    sprite = 0;
    flap = 0;
    flapCounter = 8;

    spawning = 28;

    exploding = false;
    explodingCounter = 0;

    constructor(public x: number, public y: number, public tier: Tier) {
    }

    update(gs: GameState) {
        if (this.exploding) {
            if (++this.explodingCounter === 24) {
                const { demons } = gs;
                for (let i = demons.length - 1; i >= 0; --i) {
                    if (demons[i] === this) {
                        demons.splice(i, 1);
                        break;
                    }
                }
            }
            return;
        }

        if (this.spawning > 0) {
            --this.spawning;
        } else {
            const { cannonBullet } = gs;
            if (cannonBullet.state === CannonBulletState.FIRING && bulletIntersects(cannonBullet.x, cannonBullet.y, 8, 
                    demonSpriteAndMasks[gs.demonPalette][gs.demonType][this.sprite].mask, this.x, this.y)) {
                cannonBullet.load();
                this.exploding = true;
                this.explodingCounter = Math.floor(5 * Math.random());
            }
        }

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
        x1 = clamp(x1, 20, 123);
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
        if (this.exploding) {
            const sprite = this.explodingCounter >> 3;
            if (sprite < 3) {
                // TODO EXPLODE VS SPLIT
                ctx.drawImage(demonExplosionSprites[gs.demonPalette][0][sprite], Math.floor(this.x), 
                        Math.floor(this.y));
            }
        } else if (this.spawning > 0) {
            if (this.spawning === 1) {
                ctx.drawImage(demonSpriteAndMasks[gs.demonPalette][gs.demonType][this.sprite].sprite, 
                        Math.floor(this.x), Math.floor(this.y), 32, 8);
            } else {
                const offset = (this.spawning - 1) << 2;
                ctx.drawImage(demonSpawnSprites[gs.demonPalette][this.sprite][0], Math.floor(this.x - offset), 
                        Math.floor(this.y), 32, 8);
                ctx.drawImage(demonSpawnSprites[gs.demonPalette][this.sprite][1], Math.floor(this.x + offset), 
                        Math.floor(this.y), 32, 8);
            }
        } else {
            ctx.drawImage(demonSpriteAndMasks[gs.demonPalette][gs.demonType][this.sprite].sprite, Math.floor(this.x), 
                    Math.floor(this.y));
        }
    }
}