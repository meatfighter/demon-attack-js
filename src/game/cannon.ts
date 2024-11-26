import { cannonSpriteAndMask } from "@/graphics";
import { isLeftPressed, isRightPressed, isFirePressed } from "@/input";
import { state } from "./state";

const CANNON_START_X = 87;
const CANNON_MIN_X = 25;
const CANNON_MAX_X = 135;
const CANNON_Y = 185;

export class Cannon {

    x = CANNON_START_X;

    update() {

        if (isLeftPressed()) {
            if (this.x > CANNON_MIN_X) {
                --this.x;
            }
        } else if (isRightPressed()) {
            if (this.x < CANNON_MAX_X) {
                ++this.x;
            }
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(cannonSpriteAndMask.sprite, this.x, CANNON_Y);
    }
}