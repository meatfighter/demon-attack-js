import { Easer } from "./easer";
import { Tier } from "./tier";
import { gaussianRandom, clamp, bulletIntersects } from '@/math';
import { GameState } from "./game-state";
import {
    Sprite,
    SpriteAndMask, 
    demonSpriteAndMasks, 
    demonSpawnSprites, 
    demonExplosionSprites, 
    splitDemonSpriteAndMasks, 
    splitDemonExplosionSprites } from '@/graphics';
import { CannonBulletState } from "./cannon-bullet";
import { createDemonBulletBatch } from './demon-bullet';

export class Demon {

    xEaser = new Easer();
    yEaser = new Easer();
    
    sprite = 0;
    flap = 0;
    flapCounter = 8;

    spawning = 28;

    exploding = false;
    explodingCounter = 0;

    split = false;
    leftHalf = false;
    partner: Demon | null = null;
    movingLeft = false;

    constructor(public x: number, public y: number, public tier: Tier) {
    }

    update(gs: GameState) {
        if (this.exploding && ++this.explodingCounter === 24) {
            if (this.split || gs.level < 4) {
                gs.removeDemon(this);
                return;
            } else {
                this.exploding = false;
                this.explodingCounter = 0;

                this.split = true;
                this.leftHalf = true;

                this.partner = new Demon(this.x + 8, this.y, this.tier);
                this.partner.sprite = this.sprite;
                this.partner.flap = this.flap;
                this.partner.flapCounter = this.flapCounter;
                this.partner.spawning = 0;
                this.partner.split = true;
                this.partner.partner = this;
                this.partner.yEaser = this.yEaser;

                gs.demons.push(this.partner);
            }
        }

        if (this.spawning > 0) {
            --this.spawning;
        } else if (!this.exploding) {
            const { cannonBullet } = gs;
            if (cannonBullet.state === CannonBulletState.FIRING && bulletIntersects(cannonBullet.x, cannonBullet.y, 8, 
                    demonSpriteAndMasks[gs.demonPalette][gs.demonType][this.sprite].mask, this.x, this.y)) {
                cannonBullet.load();
                this.exploding = true;
                this.explodingCounter = Math.floor(5 * Math.random());
                let points = 5 * (Math.min(5, gs.level >> 1) + 2);
                if (this.split) {                    
                    points *= (this.tier === Tier.DIVING) ? 3 : 2;
                }
                gs.score += points;
                if (this.tier === Tier.BOTTOM && (!this.split || this.leftHalf)) {
                    const { demonBullets } = gs;
                    for (let i = demonBullets.length - 1; i >= 0; --i) {
                        if (demonBullets[i].y < this.y) {
                            demonBullets.splice(i, 1);
                        }
                    }
                }
            }
        }

        if (--this.flapCounter === 0) {
            this.flapCounter = 8;
            this.flap = (this.flap + 1) & 3;
            this.sprite = (this.flap === 3) ? 1: this.flap;
        }

        if (this.tier === Tier.DIVING) {
            if (this.xEaser.update()) {
                this.resetXEaserForDive(gs);
            }
            this.x = this.xEaser.v;

            if (this.yEaser.update()) {
                this.resetYEaserForDive(gs);
            }
            this.y = this.yEaser.v;

            if (this.y >= 188) {
                gs.removeDemon(this);
            }
        } else {
            if (this.split && !this.leftHalf) {
                if (this.movingLeft) {
                    this.x -= 0.75;
                    if (this.x <= 20) {
                        this.movingLeft = false;
                    }
                } else {
                    this.x += 0.75;
                    if (this.x >= 151) {
                        this.movingLeft = true;
                    }
                }
            } else {
                if (this.xEaser.update()) {
                    if (this.tier === Tier.BOTTOM && !this.exploding && this.spawning === 0 
                            && (!this.split || this.leftHalf) && !gs.divingDemon) {
                        if (gs.demonBullets.length === 0 && !gs.cannon.exploding) {
                            createDemonBulletBatch(gs, this);
                        } else if (gs.cannon.exploding || (gs.demonBullets.length > 0 
                                && gs.demonBullets[gs.demonBullets.length - 1].y >= this.y + 8)) {
                            this.resetXEaserRandomly(gs);
                        }
                    } else {
                        this.resetXEaserRandomly(gs);
                    }
                }
                this.x = this.xEaser.v;
            }

            if (!this.split || this.leftHalf || !this.partner) {
                if (this.yEaser.update()) {
                    if (this.split && !this.partner && !gs.divingDemon && this.tier === Tier.BOTTOM) {
                        this.startDiving(gs);
                    } else {
                        this.resetYEaserRandomly(gs);
                    }
                }
            }
            this.y = this.yEaser.v;
        }
    }

    private startDiving(gs: GameState) {
        this.tier = Tier.DIVING;
        const { demons } = gs;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];
            if (demon === this) {
                continue;
            }
            demon.tier = Math.min(Tier.BOTTOM, demon.tier + 1);
        }
        gs.divingDemon = this;
        this.yEaser.v1 = this.yEaser.v0 - 1;
        this.resetXEaserForDive(gs);
        this.resetYEaserForDive(gs);
    }

    private resetXEaserForDive(gs: GameState) {
        this.xEaser.reset(this.x, clamp((this.x < gs.cannon.x) ? this.x + 20 : this.x - 20, 20, 151), 32);
    }

    private resetYEaserForDive(gs: GameState) {
        if (this.yEaser.v1 < this.yEaser.v0) {
            this.yEaser.reset(this.y, this.y + 20, 16);
        } else {
            this.yEaser.reset(this.y, this.y - 12, 16);
        }
    }

    private resetXEaserRandomly(gs: GameState) {
        let x1: number;
        if (this.tier === Tier.BOTTOM) {
            const { cannon, cannonBullet } = gs;
            if (this.x + 4 < cannon.x) {
                x1 = gaussianRandom(cannon.x - ((cannonBullet.y + 8 < this.y) ? 10 : 16), 2);
            } else {
                x1 = gaussianRandom(cannon.x + ((cannonBullet.y + 8 < this.y) ? 3 : 9), 2);
            }
        } else {
            x1 = gaussianRandom(this.x, 32);
        }
        x1 = clamp(x1, 20, this.split ? 151 : 143);
        if (this.tier === Tier.BOTTOM) {
            if (x1 > this.x) {
                x1 = this.x + Math.min(50, x1 - this.x);
            } else {
                x1 = this.x - Math.min(50, this.x - x1);
            }
        }
        this.xEaser.reset(this.x, x1, 2 * Math.abs(x1 - this.x + 1));
    }

    private resetYEaserRandomly(gs: GameState) {
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
                    if (demon.tier > Tier.TOP) {
                        yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
                    }
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
                    if (demon.tier < Tier.MIDDLE) {
                        yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
                    } else if (demon.tier > Tier.MIDDLE) {
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
                    if (demon.tier < Tier.BOTTOM) {
                        yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
                    } else if (demon.tier > Tier.BOTTOM) {
                        yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
                    }
                }
                break;
        }

        yMin = Math.min(yMin, yMax);
        yMax = Math.max(yMin, yMax);

        this.yEaser.reset(this.y, yMin + (yMax - yMin) * Math.random(), yMax - yMin + 1);
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
        if (this.exploding) {
            const spriteIndex = this.explodingCounter >> 3;
            let sprite: Sprite;
            if (this.split) {
                sprite = splitDemonExplosionSprites[gs.demonPalette][spriteIndex];
            } else {
                sprite = demonExplosionSprites[gs.demonPalette][gs.level < 4 ? 0 : 1][spriteIndex];
            }           
            if (spriteIndex < 3) {
                ctx.drawImage(sprite, Math.floor(this.x), Math.floor(this.y));
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
            let spriteAndMask: SpriteAndMask;
            if (this.split) {
                spriteAndMask = splitDemonSpriteAndMasks[gs.demonPalette][this.sprite];
            } else {
                spriteAndMask = demonSpriteAndMasks[gs.demonPalette][gs.demonType][this.sprite];
            }
            ctx.drawImage(spriteAndMask.sprite, Math.floor(this.x), Math.floor(this.y));
        }
    }
}