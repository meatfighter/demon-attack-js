import { GameState } from './game-state';
import { colors } from '@/graphics';
import { isFirePressed } from '@/input';

enum State {
    LOADED,
    FIRING,        
}

const color = colors[0x6e];

export class CannonBullet {

    state = State.LOADED;
    x = 0;
    y = 0;

    update(gs: GameState) {
        if (this.state === State.LOADED) {
            this.x = gs.cannon.x + 3;
            this.y = 186;
            if (isFirePressed()) {
                this.state = State.FIRING;
                this.y -= gs.cannonFiringSpeed;
            }
        } else {            
            if (this.y < 32) {
                this.state = State.LOADED;
                this.x = gs.cannon.x + 3;
                this.y = 186;              
            } else {
                this.y -= gs.cannonFiringSpeed;
            }
        }
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
        const endY = this.y + 7;
        if (endY < 32) {
            return;
        }
        const startY = Math.max(32, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.x, startY, 1, endY - startY + 1);
    }
}