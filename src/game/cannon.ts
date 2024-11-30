import { cannonSprite, cannonExplosionSprites } from "@/graphics";
import { isLeftPressed, isRightPressed } from "@/input";
import { GameState } from "./game-state";

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
    }

    update(gs: GameState) {
        if (this.exploding) {
            gs.demonBullets.length = 0;            
            gs.backgroundColor = Math.max(0x00, 0x0E - (this.explodingCounter & 0xFE));
            if (++this.explodingCounter === 64) {
                this.exploding = false;
                this.explodingCounter = 0;
                this.x = CANNON_START_X;
            }
        } else if (isLeftPressed()) {
            if (this.x > CANNON_MIN_X) {
                --this.x;
            }
        } else if (isRightPressed()) {
            if (this.x < CANNON_MAX_X) {
                ++this.x;
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