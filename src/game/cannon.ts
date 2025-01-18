import { cannonSprite, cannonExplosionSprites } from '@/graphics';
import { isLeftPressed, isRightPressed } from '@/input';
import { GameState } from './game-state';
import { store } from '@/store';
import { play } from '@/audio';

const CANNON_START_X = 87;
const CANNON_MIN_X = 25;
const CANNON_MAX_X = 135;

export const CANNON_Y = 185;

export class Cannon {

    x = CANNON_START_X;
    exploding = false;
    explodingCounter = 0;
    exploded = false;

    reset() {
        this.x = CANNON_START_X;
        this.exploding = false;
        this.explodingCounter = 0;
        this.exploded = false;
    }

    explode() {
        this.exploding = this.exploded = true;
        play('sfx/explodes-cannon.mp3');
    }

    update(gs: GameState) {
        if (this.exploding) {
            gs.demonBullets.length = 0;            
            gs.backgroundColor = Math.max(0x00, 0x0E - (this.explodingCounter & 0xFE));
            if (++this.explodingCounter === 64) {
                this.exploding = false;
                this.explodingCounter = 0;
                this.x = CANNON_START_X;
                if (gs.bunkers === 0) {
                    gs.animatingGameOver = true;
                    if (gs.score > store.highScore) {
                        store.highScore = gs.score;
                        gs.newHighScore = true;
                    }
                    store.level = 0;
                    store.score = 0;
                    store.spawnedDemons = 0;
                    store.bunkers = 3;
                    store.cannonExploded = false;
                    play('sfx/ends-game.mp3');
                } else {
                    --gs.bunkers;
                }
            }
        } else if (isLeftPressed()) {
            if (this.x > CANNON_MIN_X) {
                this.x -= store.fast ? 2 : 1;
            }
        } else if (isRightPressed()) {
            if (this.x < CANNON_MAX_X) {
                this.x += store.fast ? 2 : 1;
            }
        }
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
        if (this.exploding) {
            ctx.drawImage(cannonExplosionSprites[this.explodingCounter >> 3], this.x - 4, CANNON_Y - 22);
        } else {
            ctx.drawImage(cannonSprite, this.x, CANNON_Y);
        }
    }
}