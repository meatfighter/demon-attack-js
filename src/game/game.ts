import { 
    colors,
    baseSprites,
    bunkerSprites, 
    digitSprites, 
    demonSpriteAndMasks, 
    demonExplosionSprites, 
    demonSpawnSprites, 
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
    gs.setLevel(0);
}

function trySpawnDemon() {
    const { demons } = gs;
    let top = false;
    let middle = false;
    let bottom = false;
    for (let i = demons.length - 1; i >= 0; --i) {
        const demon = demons[i];
        if (demon.spawning > 0) {
            return;
        }
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

    if (gs.spawnDelay > 0) {
        --gs.spawnDelay;
        return;
    }

    let yMin = 56;
    let yMax = 141;
    let tier = Tier.NONE;
    if (!bottom) {
        tier = Tier.BOTTOM;
        yMin += 16;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];
            yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
        }      
    } else if (!middle) {
        tier = Tier.MIDDLE;
        yMin += 8;
        yMax -= 8;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];
            if (demon.tier == Tier.TOP) {
                yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
            } else if (demon.tier == Tier.BOTTOM) {
                yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
            }
        }
    } else if (!top) {
        tier = Tier.TOP;
        yMax -= 16;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];
            yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
        }
    }
    if (tier !== Tier.NONE && yMax - yMin + 1 >= 8) {
        demons.push(new Demon(Math.floor(20 + 103 * Math.random()), yMin + (yMax - yMin) * Math.random(), tier));
        gs.spawnDelay = 8 + Math.floor(24 * Math.random());
    }
}

export function update() {
    trySpawnDemon();

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