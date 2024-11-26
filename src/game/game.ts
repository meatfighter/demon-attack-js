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
} from '@/graphics';
import { isLeftPressed, isRightPressed, isFirePressed } from '@/input';
import { Enemy } from './enemy';
import { Tier } from './tier';
import { Demon } from './demon';
import { state } from './state';

// demons appear bottom, middle, top around 100, 80, and 60
// demons move between 56 and 141, exact bands vary randomly
// must leave enough gap for demons to form

function init() {
    state.setLevel(10);
    const { enemies } = state;
    for (let tier = Tier.BOTTOM; tier >= Tier.TOP; --tier) {
        enemies.push(new Demon());
    }
}

export function update() {
    const { cannon, enemies } = state;
    for (let i = enemies.length - 1; i >= 0; --i) {
        const enemy = enemies[i];
        enemy.update();
    }
    cannon.update();
}

export function renderScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = colors[state.backgroundColor];
    ctx.fillRect(0, 0, 160, 199);

    // base
    ctx.drawImage(baseSprites[state.baseColor], 0, 199, 160, 29);
    for (let i = state.bunkers - 1; i >= 0; --i) {
        ctx.drawImage(bunkerSprites[state.bunkerColor], 17 + (i << 3), 199);
    }    

    // score
    {
        let s = state.score;
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

    // enemies and cannon
    const { cannon, enemies } = state;
    for (let i = enemies.length - 1; i >= 0; --i) {
        const enemy = enemies[i];
        enemy.render(ctx);
    }
    cannon.render(ctx);    
}

init();