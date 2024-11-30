import { 
    colors,
    baseSprites,
    bunkerSprites, 
    digitSprites, 
} from '@/graphics';
import { Tier } from './tier';
import { Demon } from './demon';
import { GameState } from './game-state';

// TODO
// - DIVING COLLISION
// - GAME OVER
// - PAUSE REGION
// - IMPROVE MIN DISTANCE OF SHOOTER DEMON
// - PROMOTING FINAL DEMONS TO BOTTOM

let gs: GameState;

function init() {
    gs = new GameState();
    gs.setLevel(0); // TODO
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
            if (demon.tier < Tier.BOTTOM) {
                yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
            } else if (demon.tier > Tier.BOTTOM) {
                yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
            }
        }
    } else if (!middle) {
        tier = Tier.MIDDLE;
        yMin += 8;
        yMax -= 8;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];
            if (demon.tier < Tier.MIDDLE) {
                yMin = Math.max(yMin, demon.yEaser.getMax() + 8);
            } else if (demon.tier > Tier.MIDDLE) {
                yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
            }
        }
    } else if (!top) {
        tier = Tier.TOP;
        yMax -= 16;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];
            if (demon.tier > Tier.TOP) {
                yMax = Math.min(yMax, demon.yEaser.getMin() - 8);
            }
        }
    }
    if (tier !== Tier.NONE && yMax - yMin + 1 >= 8 && gs.spawnedDemons < 8) {        
        demons.push(new Demon(Math.floor(20 + 123 * Math.random()), yMin + (yMax - yMin) * Math.random(), tier));
        ++gs.spawnedDemons;
        gs.spawnDelay = 8 + Math.floor(24 * Math.random());
    }
}

export function update() {
    const { cannon, cannonBullet, demons, demonBullets } = gs;

    if (gs.spawnedDemons === 8 && demons.length === 0 && demonBullets.length === 0 && !cannon.exploding) {        
        gs.setLevel(gs.level + 1);
        if (cannon.exploded || gs.bunkers === 6) {            
            ++gs.level;
            cannon.reset();
            cannonBullet.load();            
        } else {
            gs.animatingExtraBunker = true;
        }
    }

    if (gs.animatingExtraBunker) {        
        if (gs.bunkerColor === bunkerSprites.length - 1) {
            gs.animatingExtraBunker = false;
            gs.bunkerColor = 0;
            ++gs.bunkers;            
            cannon.reset();
            cannonBullet.load();
        } else {
            ++gs.bunkerColor;
        }   
    }

    if (!gs.animatingExtraBunker) {
        trySpawnDemon();
    }
   
    cannon.update(gs);

    if (gs.demonBulletDropTimer === 0) {
        gs.demonBulletDropTimer = gs.demonBulletDropTimerReset;
    }
    --gs.demonBulletDropTimer;    
    for (let i = demonBullets.length - 1; i >= 0; --i) {
        demonBullets[i].update(gs);
    }

    for (let i = demons.length - 1; i >= 0; --i) {
        const demon = demons[i];
        demon.update(gs);
    }

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

    const { cannon, cannonBullet, demons, demonBullets } = gs;

    // cannon
    cannon.render(gs, ctx);

    // demon bullets
    for (let i = demonBullets.length - 1; i >= 0; --i) {
        demonBullets[i].render(gs, ctx);
    }

    // demons
    for (let i = demons.length - 1; i >= 0; --i) {
        demons[i].render(gs, ctx);
    }

    // cannon bullet
    cannonBullet.render(gs, ctx);
}

init();