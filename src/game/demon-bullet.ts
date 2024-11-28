import { GameState } from './game-state';
import { colors } from '@/graphics';
import { Demon } from './demon';

const color = colors[0x4e];

// min bullet height 190
// bullets drop in 8 pixel units
// only lower 4 pixels drawn
// every timer, they may randomly shift, one before the upper halves are drawn

export class DemonBullet {
    
    constructor(public demon: Demon) {        
    }
    
    update(gs: GameState) {
    }

    render(gs: GameState, ctx: CanvasRenderingContext2D) {
    }
}