import { 
    colors,
    baseSprites,
    bunkerSprites, 
    digitSprites, 
} from '@/graphics';
import { Tier } from './tier';
import { Demon } from './demon';
import { GameState } from './game-state';
import { isFirePressed, isLeftPressed, isRightPressed, updateInput } from '@/input';
import { playSoundEffect } from '@/sfx';
import { clamp } from '@/math';

const PULSE_SFX = new Array<string>(6);
for (let pulse = 0; pulse < 6; ++pulse) {
    PULSE_SFX[pulse] = `sfx/pulses-${pulse}.mp3`;
}

let gs: GameState;
let lastFirePressed = false;

export function resetGame() {
    gs = new GameState();
    lastFirePressed = false;
}

export function saveGame() {
    gs.save();    
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
        playSoundEffect('sfx/spawns-demon.mp3');
    }
}

export function update() {
    updateInput();

    const { cannon, cannonBullet, demons, demonBullets } = gs;

    if (gs.animatingGameOver) {
        if (gs.baseColor < baseSprites.length - 1) {
            ++gs.baseColor;
        } else {
            if (gs.newHighScore) {
                gs.scoreColor = (gs.scoreColor + 1) & 0xFF;
            }
            if (isLeftPressed() || isRightPressed()) {
                resetGame();
            }
            if (isFirePressed()) {
                lastFirePressed = true;
            } else if (lastFirePressed) {                
                resetGame();
            }
        }
        return;
    }

    if (gs.spawnedDemons === 8 && demons.length === 0 && demonBullets.length === 0 && !cannon.exploding) {        
        gs.incrementLevel();
        if (cannon.exploded || gs.bunkers === 6) {            
            cannon.reset();
            cannonBullet.load();
            gs.pulseCounter = 0;            
        } else {
            gs.animatingExtraBunker = true;
            playSoundEffect('sfx/awards-bunker.mp3');
        }
    }

    if (gs.animatingExtraBunker) {        
        if (gs.bunkerColor === bunkerSprites.length - 1) {
            gs.animatingExtraBunker = false;
            gs.bunkerColor = 0;
            gs.pulseCounter = 0;
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
    if (gs.animatingGameOver) {
        return;
    }

    if (gs.demonBulletDropTimer === 0) {
        gs.demonBulletDropTimer = gs.demonBulletDropTimerReset;
    }
    --gs.demonBulletDropTimer;
    for (let i = demonBullets.length - 1; i >= 0; --i) {
        demonBullets[i].update(gs);
    }

    for (let i = demons.length - 1; i >= 0; --i) {
        demons[i].update(gs);
    }

    if (gs.level >= 4 && gs.spawnedDemons === 8) {
        let maxTier = Tier.TOP;
        for (let i = demons.length - 1; i >= 0; --i) {
            const demon = demons[i];
            if (demon.tier > Tier.BOTTOM) {
                continue;
            }
            maxTier = Math.max(maxTier, demons[i].tier);
        }
        const tierInc = Tier.BOTTOM - maxTier;
        if (tierInc > 0) {
            for (let i = demons.length - 1; i >= 0; --i) {
                const demon = demons[i];
                if (demon.tier > Tier.BOTTOM) {
                    continue;
                }
                demon.tier += tierInc;
            }
        }
    }  

    cannonBullet.update(gs);

    gs.pulseCounter = (gs.pulseCounter + 1) & 0x1F;
    if (gs.divingDemon) {
        if ((gs.pulseCounter & 0x0F) === 0) {
            playSoundEffect('sfx/dives-demon.mp3');
        }    
    } else if (gs.pulseCounter === 0) {
        playSoundEffect(PULSE_SFX[clamp(gs.spawnedDemons - 3, 0, 5)]);
    }
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
        const sprites = digitSprites[gs.scoreColor];
        let s = gs.score;
        let x = 96;
        while (true) {
            ctx.drawImage(sprites[s % 10], x, 18);
            s = Math.floor(s / 10);
            if (s === 0) {
                break;
            }
            x -= 8;
        }
    }

    const { cannon, cannonBullet, demons, demonBullets } = gs;

    if (gs.animatingGameOver) {
        if (gs.baseColor === baseSprites.length - 1) {
            cannon.render(gs, ctx);
        }
        return;    
    }

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