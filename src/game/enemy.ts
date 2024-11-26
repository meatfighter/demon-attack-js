import { Tier } from "./tier";
import { Easer } from "./easer";
import { GameState } from "./state";

export abstract class Enemy {
    x = -1;
    y = -1;
    tier = Tier.BOTTOM;
    xEaser = new Easer();
    yEaser = new Easer();
    
    sprite = 0;
    flap = 0;
    flapCounter = 8;

    update() {
        if (--this.flapCounter === 0) {
            this.flapCounter = 8;
            this.flap = (this.flap + 1) & 3;
            this.sprite = (this.flap === 3) ? 1: this.flap;
        }
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}