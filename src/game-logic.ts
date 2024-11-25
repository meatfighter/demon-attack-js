import { 
    colors,
    baseSprites,
    bunkerSprites, 
    digitSprites, 
    demonSpriteAndMasks, 
    demonExplosionSprites, 
    demonFormsSprites, 
    splitDemonSpriteAndMasks, 
    splitDemonExplosionSprites,
    cannonSpriteAndMask, 
    cannonExplosionSprites 
} from './graphics';
import { isLeftPressed, isRightPressed, isFirePressed } from './input';

// demons appear bottom, middle, top around 100, 80, and 60
// demons move between 56 and 141, exact bands vary randomly
// must leave enough gap for demons to form

enum State {
    
}

const CANNON_START_X = 87;
const CANNON_MIN_X = 25;
const CANNON_MAX_X = 135;
const CANNON_Y = 185;

//let state = State.GAME_START;
let backgroundColor = 0;
let baseColor = 0;
let bunkers = 3;
let bunkerColor = 0;
let score = 0;
let cannonX = CANNON_START_X;

export function update() {
    if (isLeftPressed()) {
        if (cannonX > CANNON_MIN_X) {
            --cannonX;
        }
    } else if (isRightPressed()) {
        if (cannonX < CANNON_MAX_X) {
            ++cannonX;
        }
    }
}

export function renderScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = colors[backgroundColor];
    ctx.fillRect(0, 0, 160, 199);

    // base
    ctx.drawImage(baseSprites[baseColor], 0, 199, 160, 29);
    for (let i = 0; i < bunkers; ++i) {
        ctx.drawImage(bunkerSprites[bunkerColor], 17 + (i << 3), 199);
    }    

    // score
    {
        let s = score;
        let x = 96;
        while (true) {
            ctx.drawImage(digitSprites[s % 10], x, 18);
            s = Math.floor(s / 10);
            if (s === 0) {
                break;
            }
            x -= 8;
        }
    }

    ctx.drawImage(cannonSpriteAndMask.sprite, cannonX, CANNON_Y);
}