import { GameState } from './game-state';
import { colors } from '@/graphics';
import { isLeftPressed, isRightPressed, isFirePressed } from '@/input/input';
import { config } from '@/config';

export enum CannonBulletState {
    LOADED,
    FIRING,        
}

const color = colors[0x6e];

export class CannonBullet {

    state = CannonBulletState.LOADED;
    x = 0;
    y = 0;
    autofireTimer = 0;

    load() {
        this.state = CannonBulletState.LOADED;
    }

    update(gs: GameState) {
        if (isLeftPressed() || isRightPressed() || isFirePressed()) {
            this.autofireTimer = 180;
        } else if (this.autofireTimer > 0) {
            --this.autofireTimer;
        }

        if (this.state === CannonBulletState.LOADED) {
            this.x = gs.cannon.x + 3;
            this.y = 186;
            if (!gs.cannon.exploding && (isFirePressed() || (config.autofire && this.autofireTimer > 0))) {
                this.state = CannonBulletState.FIRING;
                this.y -= gs.cannonFiringSpeed;
            }
        } else {            
            if (this.y < 32) {
                this.state = CannonBulletState.LOADED;
                this.x = gs.cannon.x + 3;
                this.y = 186;              
            } else {
                if (config.tracer) {
                    this.x = gs.cannon.x + 3;
                }
                this.y -= gs.cannonFiringSpeed;
            }
        }
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
        if (this.state === CannonBulletState.LOADED && gs.cannon.exploding) {
            return;
        }
        const endY = this.y + 7;
        if (endY < 32) {
            return;
        }
        const startY = Math.max(32, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.x, startY, 1, endY - startY + 1);
    }
}