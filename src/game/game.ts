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
import { Tier } from './tier';
import { Demon } from './demon';
import { GameState } from './game-state';

// demons appear bottom, middle, top around 100, 80, and 60
// demons move between 56 and 141, exact bands vary randomly
// must leave enough gap for demons to form

let gs: GameState;

function init() {
    gs = new GameState();
    gs.setLevel(20);
    const { demons } = gs;
    for (let tier = Tier.BOTTOM; tier >= Tier.TOP; --tier) {
        demons.push(new Demon(gs));
    }
}

function trySpawnDemon() {
    const { demons } = gs;
    let top = false;
    let middle = false;
    let bottom = false;
    for (let i = demons.length - 1; i >= 0; --i) {
        const demon = demons[i];
        switch (demon.tier) {
            case Tier.TOP:
                top = true;
                break;
            case Tier.MIDDLE:
                middle = true;
                break;
            case Tier.BOTTOM:
                bottom = true;
                break;        
        }
    }
    if (!bottom) {
        return;
    }
    if (!middle) {
        return;
    }
    if (!top) {
        const minY = 56;
        let maxY = 141;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];            
            maxY = Math.min(maxY, demon.yEaser.getMin() - 1);
        }
        if (maxY - minY + 1 >= 8) {

        }
        return;
    }
}

export function update() {
    const { cannon, cannonBullet, demons } = gs;
    for (let i = demons.length - 1; i >= 0; --i) {
        const demon = demons[i];
        demon.update(gs);
    }
    cannon.update(gs);
    cannonBullet.update(gs);
}

export function renderScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = colors[gs.backgroundColor];
    ctx.fillRect(0, 0, 160, 199);

    // base
    ctx.drawImage(baseSprites[gs.baseColor], 0, 199, 160, 29);
    for (let i = gs.bunkers - 1; i >= 0; --i) {
        ctx.drawImage(bunkerSprites[gs.bunkerColor], 17 + (i << 3), 199);
    }    

    // score
    {
        let s = gs.score;
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

    // demons and cannon
    const { cannon, cannonBullet, demons } = gs;
    for (let i = demons.length - 1; i >= 0; --i) {
        const demon = demons[i];
        demon.render(gs, ctx);
    }
    cannon.render(gs, ctx);
    cannonBullet.render(gs, ctx);
}

init();