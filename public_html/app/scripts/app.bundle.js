"use strict";(self.webpackChunkdemon_attack_js=self.webpackChunkdemon_attack_js||[]).push([[524],{706:(e,t,n)=>{n.r(t),n.d(t,{init:()=>xt});var s=n(710),o=n.n(s);const i=5,r=new AudioContext;let a=!0;document.addEventListener("visibilitychange",(()=>{"visible"===document.visibilityState?(a=!0,"suspended"===r.state&&r.resume()):"hidden"===document.visibilityState&&(a=!1,"running"===r.state&&r.suspend())}));const l=r.createGain();l.connect(r.destination),l.gain.value=.1;const h=[],c=new Map;function d(e){l.gain.value=e/100}function u(e){if("suspended"===r.state)return void(a&&r.resume().then((()=>u(e))));const t=r.createBufferSource();t.buffer=c.get(e),t.connect(l),t.start()}class m{r;g;b;constructor(e,t,n){this.r=e,this.g=t,this.b=n}}var f,p;!function(e){e[e.WIDTH=160]="WIDTH",e[e.HEIGHT=228]="HEIGHT"}(f||(f={})),function(e){e[e.WIDTH=4]="WIDTH",e[e.HEIGHT=3]="HEIGHT"}(p||(p={}));const g=new Array(256),v=new Array(121),y=new Array(62),w=new Array(256),E=new Array(7),x=new Array(6),A=new Array(7),D=new Array(7),M=new Array(16),b=new Array(7),B=new Array(3),k=new Array(7);let C,O;const I=new Array(8);async function T(e,t,n){return new Promise((s=>{const o=new ImageData(e,t);n(o),createImageBitmap(o).then((e=>s({imageBitmap:e,imageData:o})))}))}function L(e){const t=new Array(e.height),{data:n}=e;for(let s=0,o=3;s<e.height;++s){t[s]=new Array(e.width);for(let i=0;i<e.width;++i,o+=4)t[s][i]=0!==n[o]}return t}function S(e,t,n,s){const o=4*(n*e.width+t),i=e.data;i[o]=s.r,i[o+1]=s.g,i[o+2]=s.b,i[o+3]=255}var N;!function(e){e[e.NONE=-1]="NONE",e[e.TOP=0]="TOP",e[e.MIDDLE=1]="MIDDLE",e[e.BOTTOM=2]="BOTTOM",e[e.DIVING=3]="DIVING"}(N||(N={}));class G{v=0;v0=0;v1=0;steps=0;s=0;reset(e,t,n){this.v=e,this.v0=e,this.v1=t,this.steps=n,this.s=0}update(){if(++this.s>=this.steps)return this.s=this.steps,this.v=this.v1,!0;const e=this.s/this.steps;let t=0;if(e<=.5){const n=2*e;t=n*n/2}else{const n=2*(e-1);t=1-n*n/2}return this.v=this.v0+t*(this.v1-this.v0),!1}getMin(){return this.v1>this.v0?this.v:this.v1}getMax(){return this.v1>this.v0?this.v1:this.v}}function F(e,t){let n,s;do{n=Math.random()}while(0===n);do{s=Math.random()}while(0===s);return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*s)*t+e}function H(e,t,n){return e<t?t:e>n?n:e}function R(e,t,n,s,o,i){o=Math.floor(o),i=Math.floor(i),e=Math.floor(e)-o,t=Math.floor(t)-i;const r=s[0].length-1,a=s.length-1,l=t+n-1;if(l<0||e<0||t>a||e>r)return!1;const h=Math.min(l,a);for(let n=Math.max(t,0);n<=h;++n)if(s[n][e])return!0;return!1}Math.PI;let _=0,X=0,P=!1,Q=!1,Y=!1,K=null,W=!1,J=!1,$=!1,z=!1;class j{timestampDown=0;xDown=0;yDown=0;x=0;y=0}const V=new Map;function Z(){return Q||_>X}function U(){return Y||X>_}function q(){return P}function ee(){null!==K&&(clearTimeout(K),K=null),W&&(document.body.style.cursor="default",W=!1)}function te(){ee(),K=window.setTimeout((()=>{document.body.style.cursor="none",W=!0}),3e3)}function ne(e){e.preventDefault();const t=window.innerWidth,n=window.innerHeight,s=t>=n;for(let t=e.changedTouches.length-1;t>=0;--t){const o=e.changedTouches[t];let i,r;switch(s?(i=o.clientX,r=o.clientY):(i=n-1-o.clientY,r=o.clientX),e.type){case"touchstart":{const e=new j;e.timestampDown=Date.now(),e.xDown=e.x=i,e.yDown=e.y=r,V.set(o.identifier,e);break}case"touchmove":{te();const e=V.get(o.identifier);e&&(e.x=i,e.y=r);break}case"touchend":case"touchcancel":{const e=V.get(o.identifier);e&&(i<64&&r<64&&e.xDown<64&&e.yDown<64&&et(),V.delete(o.identifier));break}}}let o=null;for(const[t,n]of Array.from(V)){(!o||n.timestampDown>o.timestampDown)&&(o=n);e:{for(let n=e.touches.length-1;n>=0;--n)if(e.touches[n].identifier===t)break e;V.delete(t)}}o?o.x<t/2?(Q=!0,Y=!1):(Q=!1,Y=!0):Q=Y=!1}function se(e){if(!e.clientX||!e.clientY)return;const t=window.innerWidth,n=window.innerHeight;let s,o;t>=n?(s=e.clientX,o=e.clientY):(s=n-1-e.clientY,o=e.clientX),s<64&&o<64&&et()}function oe(e){switch(e.code){case"KeyA":case"ArrowLeft":_=X+1;break;case"KeyD":case"ArrowRight":X=_+1;break;case"Escape":et();break;default:P=!0}}function ie(e){switch(e.code){case"KeyA":case"ArrowLeft":_=0;break;case"KeyD":case"ArrowRight":X=0;break;case"Escape":break;default:P=!1}}const re="demon-attack-store";class ae{highScore=0;volume=10;autofire=function(){const e="ontouchstart"in window||navigator.maxTouchPoints>0,t=window.matchMedia("(hover: hover)").matches,n=window.matchMedia("(pointer: coarse)").matches;return e&&!t&&n}();tracer=!1;fast=!1;score=0;level=0;bunkers=3;spawnedDemons=0;cannonExploded=!1}let le;function he(){localStorage.setItem(re,JSON.stringify(le))}const ce=185;class de{x=87;exploding=!1;explodingCounter=0;exploded=!1;reset(){this.x=87,this.exploding=!1,this.explodingCounter=0,this.exploded=!1}explode(){this.exploding=this.exploded=!0,u("sfx/explodes-cannon.mp3")}update(e){this.exploding?(e.demonBullets.length=0,e.backgroundColor=Math.max(0,14-(254&this.explodingCounter)),64==++this.explodingCounter&&(this.exploding=!1,this.explodingCounter=0,this.x=87,0===e.bunkers?(e.animatingGameOver=!0,e.score>le.highScore&&(le.highScore=e.score,e.newHighScore=!0),le.level=0,le.score=0,le.spawnedDemons=0,le.bunkers=3,le.cannonExploded=!1,u("sfx/ends-game.mp3")):--e.bunkers)):Z()?this.x>25&&(this.x-=le.fast?2:1):U()&&this.x<135&&(this.x+=le.fast?2:1)}render(e,t){this.exploding?t.drawImage(I[this.explodingCounter>>3],this.x-4,163):t.drawImage(C,this.x,ce)}}var ue;!function(e){e[e.LOADED=0]="LOADED",e[e.FIRING=1]="FIRING"}(ue||(ue={}));class me{color=g[110];state=ue.LOADED;x=0;y=0;autofireTimer=0;load(){this.state=ue.LOADED}update(e){Z()||U()||q()?this.autofireTimer=180:this.autofireTimer>0&&--this.autofireTimer,this.state===ue.LOADED?(this.x=e.cannon.x+3,this.y=186,!e.cannon.exploding&&(q()||le.autofire&&this.autofireTimer>0)&&(this.state=ue.FIRING,this.y-=e.cannonFiringSpeed,le.autofire||u("sfx/shoots-cannon.mp3"))):this.y<32?(this.state=ue.LOADED,this.x=e.cannon.x+3,this.y=186):(le.tracer&&(this.x=e.cannon.x+3),this.y-=e.cannonFiringSpeed)}render(e,t){if(this.state===ue.LOADED&&e.cannon.exploding)return;const n=this.y+7;if(n<32)return;const s=Math.max(32,this.y);t.fillStyle=this.color,t.fillRect(this.x,s,1,n-s+1)}}const fe=[[1,0,18,5,0,0],[2,18,2,9,0,0],[1,12,3,13,0,0],[0,14,1,7,5,4],[0,28,4,25,2,1],[3,23,2,15,5,14]],pe=[];!function(){for(const e of fe){const t=[];for(let n=0;n<e.length;++n){const s=e[n],o=n+1;for(let e=0;e<s;++e)t.push(o)}pe.push(t)}}();class ge{demon;x;y;shots;color=g[78];xOffset=0;constructor(e,t,n,s){this.demon=e,this.x=t,this.y=n,this.shots=s}update(e){const t=1==(e.level>>1&1);if(0===e.demonBulletDropTimer){if(this.demon.split||!t){const e=Math.random();t?e<.0625?--this.xOffset:e<.125&&++this.xOffset:e<.25?--this.xOffset:e<.5&&++this.xOffset}if(e.level>=8&&(this.x=Math.floor(this.demon.x)+4),this.y+=8,this.y>=198){const{demonBullets:t}=e;for(let e=t.length-1;e>=0;--e)if(t[e]===this){t.splice(e,1);break}}}const{cannon:n}=e;if(!n.exploding){const s=Math.floor(this.demon.y+12);let o,i;if(t?(o=this.y,i=o+7):(o=1===e.demonBulletDropTimer?this.y:this.y+4,i=o+3),o=Math.max(s,o),i=Math.min(196,i),o>196||i<o)return;const r=this.x+this.xOffset;(R(r+this.shots[0],o,i-o+1,O,n.x,ce)||this.shots.length>1&&R(r+this.shots[1],o,i-o+1,O,n.x,ce))&&n.explode()}}render(e,t){const n=Math.floor(this.demon.y+12);let s,o;if(e.level>>1&1?(s=this.y,o=s+7):(s=1===e.demonBulletDropTimer?this.y:this.y+4,o=s+3),s=Math.max(n,s),o=Math.min(196,o),s>196||o<s)return;t.fillStyle=this.color;const i=this.x+this.xOffset;t.fillRect(i+this.shots[0],s,1,o-s+1),this.shots.length>1&&t.fillRect(i+this.shots[1],s,1,o-s+1)}}const ve=new Array(12);for(let e=0;e<12;++e)ve[e]=`sfx/explodes-demon-${e.toString().padStart(2,"0")}.mp3`;class ye{x;y;tier;xEaser=new G;yEaser=new G;sprite=0;flap=0;flapCounter=8;spawning=28;exploding=!1;explodingCounter=0;split=!1;leftHalf=!1;partner=null;movingLeft=!1;constructor(e,t,n){this.x=e,this.y=t,this.tier=n}update(e){if(this.exploding&&24==++this.explodingCounter){if(this.split||e.level<4)return void e.removeDemon(this);this.exploding=!1,this.explodingCounter=0,this.split=!0,this.leftHalf=!0,this.partner=new ye(this.x+8,this.y,this.tier),this.partner.sprite=this.sprite,this.partner.flap=this.flap,this.partner.flapCounter=this.flapCounter,this.partner.spawning=0,this.partner.split=!0,this.partner.partner=this,this.partner.yEaser=this.yEaser,e.demons.push(this.partner)}if(this.spawning>0)--this.spawning;else if(!this.exploding){const{cannonBullet:t}=e;if(t.state===ue.FIRING&&R(t.x,t.y,le.autofire?12:8,this.split?B[this.sprite]:x[e.demonType][this.sprite],this.x,this.y)){t.load(),this.exploding=!0,this.explodingCounter=Math.floor(5*Math.random());let n=5*(Math.min(5,e.level>>1)+2);if(this.split&&(n*=this.tier===N.DIVING?3:2),e.score+=n,this.tier===N.BOTTOM&&(!this.split||this.leftHalf)){const{demonBullets:t}=e;for(let e=t.length-1;e>=0;--e)t[e].y<this.y&&t.splice(e,1)}u(ve[e.level%12])}}if(0==--this.flapCounter&&(this.flapCounter=8,this.flap=this.flap+1&3,this.sprite=3===this.flap?1:this.flap),this.tier===N.DIVING){const{cannon:t}=e;this.exploding||t.exploding||!function(e,t,n,s,o,i){t=Math.floor(t),n=Math.floor(n);const r=e[0].length-1,a=e.length-1;o=Math.floor(o)-t,i=Math.floor(i)-n;const l=o+s[0].length-1,h=i+s.length-1;if(h<0||a<i||l<0||r<o)return!1;const c=Math.max(0,o),d=Math.min(r,l),u=Math.max(0,i),m=Math.min(a,h);for(let t=u;t<=m;++t)for(let n=c;n<=d;++n)if(e[t][n])return!0;return!1}(B[this.sprite],this.x,this.y,O,t.x,ce)?(this.xEaser.update()&&this.resetXEaserForDive(e),this.x=this.xEaser.v,this.yEaser.update()&&this.resetYEaserForDive(e),this.y=this.yEaser.v,this.y>=188&&e.removeDemon(this)):(t.explode(),e.removeDemon(this))}else this.split&&!this.leftHalf?this.movingLeft?(this.x-=.75,this.x<=20&&(this.movingLeft=!1)):(this.x+=.75,this.x>=151&&(this.movingLeft=!0)):(this.xEaser.update()&&(this.tier!==N.BOTTOM||this.exploding||0!==this.spawning||!(!this.split||this.leftHalf&&this.partner)||e.divingDemon?this.resetXEaserRandomly(e):0!==e.demonBullets.length||e.cannon.exploding?(e.cannon.exploding||e.demonBullets.length>0&&e.demonBullets[e.demonBullets.length-1].y>=this.y+8)&&this.resetXEaserRandomly(e):function(e,t){const{level:n,demonBullets:s}=e,o=1==(n>>1&1);let i=Math.floor(t.x)+4,r=4;if(!o){const e=n%12,t=pe[e>>1&6|1&e];r=t[Math.floor(t.length*Math.random())]}for(let e=r-1,n=8*Math.floor(t.y/8)+6;e>=0;--e,n-=8)Math.random()<.125&&(n-=8),s.push(new ge(t,i,n,M[o?t.split?0:12:Math.floor(t.split?2*(1+Math.random()):M.length*Math.random())]));e.demonBulletDropTimer=e.demonBulletDropTimerReset-1}(e,this)),this.x=this.xEaser.v),this.split&&!this.leftHalf&&this.partner||this.yEaser.update()&&(!this.split||this.partner||e.divingDemon||e.cannon.exploding||0!==e.demonBullets.length||this.tier!==N.BOTTOM?this.resetYEaserRandomly(e):this.startDiving(e)),this.y=this.yEaser.v}startDiving(e){this.tier=N.DIVING;const{demons:t}=e;for(let e=t.length-1;e>=0;--e){const n=t[e];n!==this&&++n.tier}e.divingDemon=this,this.yEaser.v1=this.yEaser.v0-1,this.resetXEaserForDive(e),this.resetYEaserForDive(e)}resetXEaserForDive(e){this.xEaser.reset(this.x,H(this.x<e.cannon.x?this.x+20:this.x-20,20,151),32)}resetYEaserForDive(e){this.yEaser.v1<this.yEaser.v0?this.yEaser.reset(this.y,this.y+20,16):this.yEaser.reset(this.y,this.y-12,16)}resetXEaserRandomly(e){let t;if(this.tier===N.BOTTOM){const{cannon:n,cannonBullet:s}=e;t=this.x+4<n.x?F(n.x-(s.y+8<this.y?10:16),2):F(n.x+(s.y+8<this.y?3:9),2)}else t=F(this.x,32);if(t=H(t,20,this.split?151:143),this.tier===N.BOTTOM){const{demonBullets:n,demonBulletDropTimerReset:s}=e;if(n.length>0){const e=s*(198-n[n.length-1].y)/10;t=t>this.x?this.x+Math.min(e,t-this.x):this.x-Math.min(e,this.x-t)}}this.xEaser.reset(this.x,t,2*Math.abs(t-this.x+1))}resetYEaserRandomly(e){let t=56,n=141;const{demons:s}=e;switch(this.tier){case N.TOP:n-=16;for(let e=s.length-1;e>=0;--e){const t=s[e];t!==this&&t.tier>N.TOP&&(n=Math.min(n,t.yEaser.getMin()-8))}break;case N.MIDDLE:t+=8,n-=8;for(let e=s.length-1;e>=0;--e){const o=s[e];o!==this&&(o.tier<N.MIDDLE?t=Math.max(t,o.yEaser.getMax()+8):o.tier>N.MIDDLE&&(n=Math.min(n,o.yEaser.getMin()-8)))}break;case N.BOTTOM:t+=16;for(let e=s.length-1;e>=0;--e){const o=s[e];o!==this&&(o.tier<N.BOTTOM?t=Math.max(t,o.yEaser.getMax()+8):o.tier>N.BOTTOM&&(n=Math.min(n,o.yEaser.getMin()-8)))}}t=Math.min(t,n),n=Math.max(t,n),this.yEaser.reset(this.y,t+(n-t)*Math.random(),n-t+1)}render(e,t){if(this.exploding){const n=this.explodingCounter>>3;let s;s=this.split?k[e.demonPalette][n]:A[e.demonPalette][e.level<4?0:1][n],n<3&&t.drawImage(s,Math.floor(this.x),Math.floor(this.y))}else if(this.spawning>0)if(1===this.spawning)t.drawImage(E[e.demonPalette][e.demonType][this.sprite],Math.floor(this.x),Math.floor(this.y),32,8);else{const n=this.spawning-1<<2;t.drawImage(D[e.demonPalette][this.sprite][0],Math.floor(this.x-n),Math.floor(this.y),32,8),t.drawImage(D[e.demonPalette][this.sprite][1],Math.floor(this.x+n),Math.floor(this.y),32,8)}else t.drawImage(this.split?b[e.demonPalette][this.sprite]:E[e.demonPalette][e.demonType][this.sprite],Math.floor(this.x),Math.floor(this.y))}}const we=[3,3,4,4,5,5,5,5,6],Ee=[8,6,6,3,5,4];class xe{level=0;demonPalette=0;demonType=0;backgroundColor=0;baseColor=0;bunkers;bunkerColor=0;score;scoreColor=44;cannon=new de;cannonBullet=new me;cannonFiringSpeed=0;demons=new Array;spawnDelay=0;spawnedDemons;divingDemon=null;demonBullets=new Array;demonBulletDropTimer=0;demonBulletDropTimerReset=0;animatingExtraBunker=!1;animatingGameOver=!1;newHighScore=!1;pulseCounter=0;constructor(){this.setLevel(le.level),this.score=le.score,this.spawnedDemons=le.spawnedDemons,this.bunkers=le.bunkers,this.cannon.exploded=le.cannonExploded}setLevel(e){this.level=e,this.demonPalette=e%7,this.demonType=(e>>1)%6,this.cannonFiringSpeed=le.autofire?12:we[Math.min(8,e)],this.demonBulletDropTimerReset=Ee[e<4?e:4+(1&e)],this.spawnDelay=30,this.demonBulletDropTimer=0,this.spawnedDemons=0}incrementLevel(){this.setLevel(this.level+1)}countDemons(){let e=!1,t=!1,n=!1,s=null!=this.divingDemon;for(let o=this.demons.length-1;o>=0;--o)switch(this.demons[o].tier){case N.TOP:e=!0;break;case N.MIDDLE:t=!0;break;case N.BOTTOM:n=!0;break;case N.DIVING:s=!0}let o=0;return e&&++o,t&&++o,n&&++o,s&&++o,o}save(){this.animatingGameOver||this.cannon.exploding&&0===this.bunkers?(le.level=0,le.score=0,le.spawnedDemons=0,le.bunkers=3,le.cannonExploded=!1):(le.level=this.level,le.score=this.score,le.cannonExploded=this.cannon.exploded,le.spawnedDemons=Math.max(0,this.spawnedDemons-this.countDemons()),this.cannon.exploding?le.bunkers=Math.max(0,this.bunkers-1):this.animatingExtraBunker?le.bunkers=Math.min(6,this.bunkers+1):le.bunkers=this.bunkers),he()}removeDemon(e){this.divingDemon==e&&(this.divingDemon=null),e.partner&&(e.partner.partner=null);for(let t=this.demons.length-1;t>=0;--t)if(this.demons[t]===e)return void this.demons.splice(t,1)}}const Ae=new Array(6);for(let e=0;e<6;++e)Ae[e]=`sfx/pulses-${e}.mp3`;let De,Me=!1;function be(){De=new xe,Me=!1}function Be(){!function(){const e=navigator.getGamepads();if(!e)return;let t=!1,n=!1,s=!1;for(let o=e.length-1;o>=0;--o){const i=e[o];if(!i)continue;(i.buttons[14]?.pressed||i.buttons[4]?.pressed||i.buttons[10]?.pressed)&&(t=!0),(i.buttons[15]?.pressed||i.buttons[5]?.pressed||i.buttons[11]?.pressed)&&(n=!0);const r=i.axes[0];r<-.5?t=!0:r>.5&&(n=!0),(i.buttons[0]?.pressed||i.buttons[1]?.pressed||i.buttons[2]?.pressed||i.buttons[3]?.pressed||i.buttons[6]?.pressed||i.buttons[7]?.pressed||i.buttons[8]?.pressed||i.buttons[9]?.pressed)&&(s=!0)}t?J||(_=X+1):J&&(_=0),J=t,n?$||(X=_+1):$&&(X=0),$=n,s?z||(P=!0):z&&(P=!1),z=s}();const{cannon:e,cannonBullet:t,demons:n,demonBullets:s}=De;if(De.animatingGameOver)De.baseColor<v.length-1?++De.baseColor:(De.newHighScore&&(De.scoreColor=De.scoreColor+1&255),(Z()||U())&&be(),q()?Me=!0:Me&&be());else if(8!==De.spawnedDemons||0!==n.length||0!==s.length||e.exploding||(De.incrementLevel(),e.exploded||6===De.bunkers?(e.reset(),t.load(),De.pulseCounter=0):(De.animatingExtraBunker=!0,u("sfx/awards-bunker.mp3"))),De.animatingExtraBunker&&(De.bunkerColor===y.length-1?(De.animatingExtraBunker=!1,De.bunkerColor=0,De.pulseCounter=0,++De.bunkers,e.reset(),t.load()):++De.bunkerColor),De.animatingExtraBunker||function(){const{demons:e}=De;let t=!1,n=!1,s=!1;for(let o=e.length-1;o>=0;--o){const i=e[o];if(i.spawning>0)return;switch(i.tier){case N.TOP:t=!0;break;case N.MIDDLE:n=!0;break;case N.BOTTOM:s=!0}}if(De.spawnDelay>0)return void--De.spawnDelay;let o=56,i=141,r=N.NONE;if(s)if(n){if(!t){r=N.TOP,i-=16;for(let t=e.length-1;t>=0;--t){const n=e[t];n.tier>N.TOP&&(i=Math.min(i,n.yEaser.getMin()-8))}}}else{r=N.MIDDLE,o+=8,i-=8;for(let t=e.length-1;t>=0;--t){const n=e[t];n.tier<N.MIDDLE?o=Math.max(o,n.yEaser.getMax()+8):n.tier>N.MIDDLE&&(i=Math.min(i,n.yEaser.getMin()-8))}}else{r=N.BOTTOM,o+=16;for(let t=e.length-1;t>=0;--t){const n=e[t];n.tier<N.BOTTOM?o=Math.max(o,n.yEaser.getMax()+8):n.tier>N.BOTTOM&&(i=Math.min(i,n.yEaser.getMin()-8))}}r!==N.NONE&&i-o+1>=8&&De.spawnedDemons<8&&(e.push(new ye(Math.floor(20+123*Math.random()),o+(i-o)*Math.random(),r)),++De.spawnedDemons,De.spawnDelay=8+Math.floor(24*Math.random()),u("sfx/spawns-demon.mp3"))}(),e.update(De),!De.animatingGameOver){0===De.demonBulletDropTimer&&(De.demonBulletDropTimer=De.demonBulletDropTimerReset),--De.demonBulletDropTimer;for(let e=s.length-1;e>=0;--e)s[e].update(De);for(let e=n.length-1;e>=0;--e)n[e].update(De);if(De.level>=4&&8===De.spawnedDemons){let e=N.TOP;for(let t=n.length-1;t>=0;--t)n[t].tier>N.BOTTOM||(e=Math.max(e,n[t].tier));const t=N.BOTTOM-e;if(t>0)for(let e=n.length-1;e>=0;--e){const s=n[e];s.tier>N.BOTTOM||(s.tier+=t)}}t.update(De),De.pulseCounter=De.pulseCounter+1&31,De.divingDemon?15&De.pulseCounter||u("sfx/dives-demon.mp3"):0===De.pulseCounter&&u(Ae[H(De.spawnedDemons-3,0,5)])}}const ke=1e3/60,Ce=5;let Oe=!1,Ie=0,Te=0,Le=0;function Se(){Oe||(Oe=!0,Le=0,Ie=requestAnimationFrame(Ge),Te=performance.now())}function Ne(){Oe&&(Oe=!1,cancelAnimationFrame(Ie))}function Ge(){if(!Oe)return;Ie=requestAnimationFrame(Ge),tt();const e=performance.now(),t=e-Te;Te=e,Le+=t;let n=0;for(;Le>=ke&&Oe;)if(Be(),Le-=ke,++n>Ce){Le=0,Te=performance.now();break}}let Fe,He,Re,_e,Xe,Pe,Qe,Ye=null,Ke=!1;function We(){!Ke&&null===Ye&&"wakeLock"in navigator&&(Ke=!0,navigator.wakeLock.request("screen").then((e=>{Ke&&(Ye=e,Ye.addEventListener("release",(()=>{Ke||(Ye=null)})))})).catch((e=>{})).finally((()=>Ke=!1)))}let Je,$e,ze,je,Ve=null,Ze=!1;function Ue(){if(null!==Ve&&(Ve(),Ve=null),Ze)return;const e=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);e.addEventListener("change",Ue),Ve=()=>e.removeEventListener("change",Ue),nt()}function qe(){Ze||(Ze=!0,Ne(),window.removeEventListener("click",se),window.removeEventListener("mousemove",te),window.removeEventListener("mouseenter",te),window.removeEventListener("mouseleave",ee),ee(),window.removeEventListener("keydown",oe),window.removeEventListener("keyup",ie),window.removeEventListener("touchstart",ne),window.removeEventListener("touchmove",ne),window.removeEventListener("touchend",ne),window.removeEventListener("touchcancel",ne),_=0,X=0,P=!1,Q=!1,Y=!1,V.clear(),null!==Ye&&"wakeLock"in navigator&&(Ke=!1,Ye.release().then((()=>{Ke||(Ye=null)})).catch((e=>{}))),window.removeEventListener("beforeunload",ot),window.removeEventListener("resize",nt),window.removeEventListener("focus",st),window.removeEventListener("blur",st),document.removeEventListener("visibilitychange",st),null!==Ve&&(Ve(),Ve=null),De.save())}function et(){qe(),rt()}function tt(){Re?Qe&&(Re.imageSmoothingEnabled=!1,Re.fillStyle="#0F0F0F",Re.fillRect(0,0,_e,Xe),Qe.imageSmoothingEnabled=!1,function(e){e.fillStyle=g[De.backgroundColor],e.fillRect(0,0,160,199),e.drawImage(v[De.baseColor],0,199,160,29);for(let t=De.bunkers-1;t>=0;--t)e.drawImage(y[De.bunkerColor],17+(t<<3),199);{const t=w[De.scoreColor];let n=De.score,s=96;for(;e.drawImage(t[n%10],s,18),n=Math.floor(n/10),0!==n;)s-=8}const{cannon:t,cannonBullet:n,demons:s,demonBullets:o}=De;if(De.animatingGameOver)De.baseColor===v.length-1&&t.render(De,e);else{t.render(De,e);for(let t=o.length-1;t>=0;--t)o[t].render(De,e);for(let t=s.length-1;t>=0;--t)s[t].render(De,e);n.render(De,e)}}(Qe),Re.drawImage(Pe,ze,je,Je,$e),Re.imageSmoothingEnabled=!0,Re.fillStyle="#FFFFFF",Re.fillRect(27,21,18,1),Re.fillRect(27,27,18,1),Re.fillRect(27,33,18,1)):nt()}function nt(){if(Ze)return;Re=null,He=document.getElementById("main-canvas"),He.style.display="none";const e=window.innerWidth,t=window.innerHeight;He.style.display="block",He.style.width=`${e}px`,He.style.height=`${t}px`,He.style.position="absolute",He.style.left="0px",He.style.top="0px",Fe=window.devicePixelRatio||1,He.width=Math.floor(Fe*e),He.height=Math.floor(Fe*t);const n=new DOMMatrix;e>=t?(_e=e,Xe=t,n.a=n.d=Fe,n.b=n.c=n.e=n.f=0):(_e=t,Xe=e,n.a=n.d=n.e=0,n.c=Fe,n.b=-n.c,n.f=Fe*t),Re=He.getContext("2d"),Re&&(Re.setTransform(n),$e=Xe,Je=$e*p.WIDTH/p.HEIGHT,Je>_e?(Je=_e,$e=Je*p.HEIGHT/p.WIDTH,ze=0,je=Math.round((Xe-$e)/2)):(ze=Math.round((_e-Je)/2),je=0),tt())}function st(){!Ze&&"visible"===document.visibilityState&&document.hasFocus()?(We(),Se()):Ne()}function ot(){qe()}let it=!1;function rt(){document.body.style.backgroundColor="#0F0F0F",window.addEventListener("resize",ct),window.addEventListener("touchmove",lt,{passive:!1}),document.getElementById("main-content").innerHTML=`\n            <div id="start-container">\n                <div id="start-div">\n                    <div id="high-score-div">High Score: ${le.highScore}</div>\n                    <div class="volume-div">\n                        <span class="left-volume-label material-icons" id="left-volume-span" \n                                lang="en">volume_mute</span>\n                        <input type="range" id="volume-input" min="0" max="100" step="any" value="10">\n                        <span class="right-volume-label" id="right-volume-span" lang="en">100</span>\n                    </div>\n                    <div class="checkboxes-div">\n                        <div class="checkbox-item">\n                            <input type="checkbox" id="autofire-checkbox" name="autofire-checkbox">\n                            <label for="autofire-checkbox">\n                                <span class="custom-checkbox"></span>\n                                Autofire\n                            </label>\n                        </div>\n                        <div class="checkbox-item">\n                            <input type="checkbox" id="tracer-checkbox" name="tracer-checkbox">\n                            <label for="tracer-checkbox">\n                                <span class="custom-checkbox"></span>\n                                Tracer\n                            </label>\n                        </div>\n                        <div class="checkbox-item">\n                            <input type="checkbox" id="fast-checkbox" name="fast-checkbox">\n                            <label for="fast-checkbox">\n                                <span class="custom-checkbox"></span>\n                                Fast\n                            </label>\n                        </div>\n                    </div>\n                    <div id="go-div">\n                        <button id="start-button">${0===le.score&&0===le.level&&3===le.bunkers&&0===le.spawnedDemons?"Start":"Continue"}</button>\n                    </div>\n                </div>\n            </div>`,d(le.volume);const e=document.getElementById("volume-input");e.addEventListener("input",ht),e.value=String(le.volume),document.getElementById("autofire-checkbox").checked=le.autofire,document.getElementById("tracer-checkbox").checked=le.tracer,document.getElementById("fast-checkbox").checked=le.fast,document.getElementById("start-button").addEventListener("click",at),ct()}function at(){d(le.volume);const e=document.getElementById("autofire-checkbox");le.autofire=e.checked;const t=document.getElementById("tracer-checkbox");le.tracer=t.checked;const n=document.getElementById("fast-checkbox");le.fast=n.checked,function(){window.removeEventListener("resize",ct),window.removeEventListener("touchmove",lt),document.getElementById("volume-input").removeEventListener("input",ht),document.getElementById("start-button").removeEventListener("click",at);const e=document.getElementById("autofire-checkbox");le.autofire=e.checked;const t=document.getElementById("tracer-checkbox");le.tracer=t.checked;const n=document.getElementById("fast-checkbox");le.fast=n.checked,he()}(),Ze=!1,be(),document.body.style.backgroundColor="#C2BCB1",Pe=document.createElement("canvas"),Pe.width=f.WIDTH,Pe.height=f.HEIGHT,Qe=Pe.getContext("2d"),document.getElementById("main-content").innerHTML='<canvas id="main-canvas" class="canvas" width="1" height="1"></canvas>',He=document.getElementById("main-canvas"),He.style.touchAction="none",window.addEventListener("beforeunload",ot),window.addEventListener("resize",nt),window.addEventListener("focus",st),window.addEventListener("blur",st),document.addEventListener("visibilitychange",st),We(),Ue(),window.addEventListener("click",se),window.addEventListener("mousemove",te),window.addEventListener("mouseenter",te),window.addEventListener("mouseleave",ee),te(),window.addEventListener("touchstart",ne,{passive:!1}),window.addEventListener("touchmove",ne,{passive:!1}),window.addEventListener("touchend",ne,{passive:!1}),window.addEventListener("touchcancel",ne,{passive:!1}),window.addEventListener("keydown",oe),window.addEventListener("keyup",ie),_=0,X=0,P=!1,Q=!1,Y=!1,V.clear(),Se()}function lt(e){let t=e.target;for(;null!==t;){if("volume-input"===t.id){if(it)return;const n=t,s=parseFloat(n.max),o=parseFloat(n.min),i=n.getBoundingClientRect(),r=(1-(e.touches[0].clientY-i.top)/i.height)*(s-o)+o;return n.value=r.toString(),void n.dispatchEvent(new Event("input"))}t=t.parentElement}e.preventDefault()}function ht(){const e=document.getElementById("left-volume-span"),t=document.getElementById("volume-input"),n=document.getElementById("right-volume-span");le.volume=100*(+t.value-+t.min)/(+t.max-+t.min),t.style.setProperty("--thumb-position",`${le.volume}%`),0===le.volume?e.textContent="volume_off":le.volume<33?e.textContent="volume_mute":le.volume<66?e.textContent="volume_down":e.textContent="volume_up",n.textContent=String(Math.round(le.volume))}function ct(){const e=document.getElementById("start-container"),t=document.getElementById("start-div"),n=document.getElementById("left-volume-span"),s=document.getElementById("right-volume-span");e.style.width=e.style.height="",e.style.left=e.style.top="",e.style.display="none",t.style.left=t.style.top=t.style.transform="",t.style.display="none";const o=window.innerWidth,i=window.innerHeight;if(it=o>=i,e.style.left="0px",e.style.top="0px",e.style.width=`${o}px`,e.style.height=`${i}px`,e.style.display="block",t.style.display="flex",n.style.width="",n.style.display="inline-block",n.style.textAlign="center",n.textContent="🔇",n.style.transform="",s.style.width="",s.style.display="inline-block",s.style.textAlign="center",s.textContent="100",it){const e=n.getBoundingClientRect().width;n.style.width=`${e}px`;const r=s.getBoundingClientRect().width;s.style.width=`${r}px`;const a=t.getBoundingClientRect();t.style.left=(o-a.width)/2+"px",t.style.top=(i-a.height)/2+"px"}else{const e=n.getBoundingClientRect().height;n.style.width=`${e}px`;const r=s.getBoundingClientRect().height;s.style.width=`${r}px`,t.style.transform="rotate(-90deg)";const a=t.getBoundingClientRect();t.style.left=(o-a.height)/2+"px",t.style.top=(i-a.width)/2+"px"}s.textContent=String(le.volume),ht()}let dt,ut=!1;function mt(e){if(dt){if(e===dt.style.color)return;dt.style.color=e}const t="progress-bar-style";let n=document.getElementById(t);n||(n=document.createElement("style"),n.id=t,document.head.appendChild(n)),n.innerText=`\n        #loading-progress::-webkit-progress-value {\n            background-color: ${e} !important;\n        }\n        #loading-progress::-moz-progress-bar {\n            background-color: ${e} !important;\n        }\n    `}function ft(e){dt&&(dt.value=100*e.data,mt("#48D800"))}function pt(e){(new(o())).loadAsync(e).then((e=>Object.entries(e.files).forEach((e=>{const[t,n]=e;var s,o;n.dir||t.endsWith(".mp3")&&(s=t,o=n,h.push(o.async("arraybuffer").then((e=>r.decodeAudioData(e))).then((e=>c.set(s,e)))))})))),async function(){return Promise.all(h).then((()=>h.length=0))}().then((()=>{document.getElementById("loading-progress").value=100,function(){if(le)return;const e=localStorage.getItem(re);if(e)try{le=JSON.parse(e)}catch{le=new ae}else le=new ae}(),async function(){let e;!function(e){e[e.DEMON_COLS=0]="DEMON_COLS",e[e.CANNON_EXPLODES_COLS=56]="CANNON_EXPLODES_COLS",e[e.CANNON_GFX=61]="CANNON_GFX",e[e.BUNKER_GFX=73]="BUNKER_GFX",e[e.CANNON_EXPLODES_GFX=79]="CANNON_EXPLODES_GFX",e[e.DEMON_EXPLODES_GFX=119]="DEMON_EXPLODES_GFX",e[e.DEMON_GFX=143]="DEMON_GFX",e[e.DEMON_SPLITS_GFX=287]="DEMON_SPLITS_GFX",e[e.SPLIT_DEMON_GFX=311]="SPLIT_DEMON_GFX",e[e.DIGITS_GFX=335]="DIGITS_GFX",e[e.DEMON_SHOTS=435]="DEMON_SHOTS"}(e||(e={}));const t=function(){const e=new Array(256),t=atob("AAAAPz8+ZGRjhISDoqKhurq50tLR6urpPT0AXl4Ke3sVmZkgtLQqzc005uY+/f1IcSMAhj0LmVcYrW8mvYYyzZs+3LBJ6sJUhhUAmi8OrkgewGEv0Xc+4I1N76Jb/bVoigAAnhMSsSgnwj080lFQ4mRj73V0/YaFeQBYjRJuoCeEsTuYwE6q0GG83XHM6oLcRQB4XRKPciekiDu5m07KrmHcv3Hs0IL7DgCFKROZQyitXT2/dFHQi2TfoXXutYb7AACKEhOdJCiwNz3BSVHRWmTganXueYb7ABV9EjGTJEynN2e7SYDMWpfdaq7tecL7ACdYEkV0JGKNN36nSZe+WrDUasfoed37ADUmEldCJHZdN5V2SbGOWsylauW7ef3PADkAE1sSKHknPZc8UbNQZM1jdeZ0hv2FDjIAK1QRR3MjY5M2fbBIlctZreVpwv14Jy4ARU4PYmshfogzl6NDsLxTx9Ri3epwPSMAXkINe18dmXsttJY7za9K5sdX/d1k");for(let n=0;n<=255;++n){const s=3*(n>>1),o=new m(t.charCodeAt(s),t.charCodeAt(s+1),t.charCodeAt(s+2));e[n]=o,g[n]=`#${(o.r<<16|o.g<<8|o.b).toString(16).padStart(6,"0")}`}return e}(),n=atob("yMiISDgodngMDIp6alpKOkhISHiImKi4xsbGxu7ubGxGRkZGPj6cnIaGSEjk5CgoODhISGhoeHiKakp6msbGxsbu7mxsKCgoKAAoKDgQEAYDAQAABgEEAgAKAAIQBBACBEAQABCCRAAAQJACCECACAAkgAAAAIQAiCAIAAJAEABACEAEAEgCAEQAQAQgCQAAAwcOGfACAAAGA85xAAQAAExGIx8CAQgAECEiJBQPDABAgoRkHwYAAEQkFA8DAAAANh0CBAoEAAAJHjIkCAoAAAKfsuRIECQAn4+HiJBkAABPmIyHiHAEACdMmIyHSDIABEQkIyMUCAAgJCgkIycYABAgSERCRz8AAAAAAQEAAAAAAAMFAwAAAAAGCQkJBgAAIAQRgBRCkABABBKgFECEAAAgFGgIFCAAAAAQKGzGggAAgoLWbAAAAABEgoLGfBB8ZGRkZGRkZHwAGBgYGBgYGBg4AHxMTEA8DExMfAB8TEwMOAxMTHwADAx+TExMTExMAHxMTAwMfEBMfAB8TExMfEBMTHwAMDAwGBgMTEx8AHxMTEx8ZGRkfAB8TEwMfExMTHwAgCAQUEGEiEJACAQBgSIRRA=="),s=[];for(let e=0;e<121;++e)s.push(T(1,29,(n=>{for(let s=0,o=120===e?76:140+e&255;s<29;++s)S(n,0,s,t[255&o]),s<6&&(o-=2)})).then((({imageBitmap:t})=>v[e]=t)));for(let o=0;o<62;++o){const i=t[0===o?76:194+o];s.push(T(3,5,(t=>{const s=e.BUNKER_GFX+5;for(let e=0;e<5;++e){const o=n.charCodeAt(s-e);for(let n=0,s=32;n<3;++n,s>>=1)o&s&&S(t,n,e,i)}})).then((({imageBitmap:e})=>y[o]=e)))}for(let o=0;o<256;++o){const i=t[o];w[o]=new Array(10);for(let t=0;t<10;++t)s.push(T(6,9,(s=>{const o=e.DIGITS_GFX+10*(t+1)-2;for(let e=0;e<9;++e){const t=n.charCodeAt(o-e);for(let n=0,o=64;n<6;++n,o>>=1)t&o&&S(s,n,e,i)}})).then((({imageBitmap:e})=>w[o][t]=e)))}for(let e=0;e<6;++e)x[e]=new Array(3);for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);E[o]=new Array(6);for(let r=0;r<6;++r){const a=e.DEMON_GFX+24*r;E[o][r]=new Array(3);for(let e=0;e<3;++e){const l=a+(e<<3);s.push(T(16,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(l+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&(S(e,t,7-s,o),S(e,15-t,7-s,o))}})).then((({imageBitmap:t,imageData:n})=>{E[o][r][e]=t,0===o&&(x[r][e]=L(n))})))}}}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);A[o]=new Array(2);for(let r=0;r<2;++r){const a=0===r?e.DEMON_EXPLODES_GFX:e.DEMON_SPLITS_GFX;A[o][r]=new Array(3);for(let e=0;e<3;++e){const l=a+(e<<3);s.push(T(16,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(l+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&(S(e,t,7-s,o),S(e,15-t,7-s,o))}})).then((({imageBitmap:t})=>A[o][r][2-e]=t)))}}}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);D[o]=new Array(3);for(let r=0;r<3;++r){const a=e.DEMON_EXPLODES_GFX+(r<<3);D[o][r]=new Array(2);for(let e=0;e<2;++e)s.push(T(8,8,(s=>{for(let o=0;o<8;++o){const r=t[n.charCodeAt(i+o)],l=n.charCodeAt(a+o);for(let t=0,n=128;t<8;++t,n>>=1)l&n&&S(s,1===e?7-t:t,7-o,r)}})).then((({imageBitmap:t})=>D[o][r][e]=t)))}}for(let t=0;t<16;++t){M[t]=[];const s=n.charCodeAt(e.DEMON_SHOTS+t);for(let e=0,n=128;e<8;++e,n>>=1)s&n&&M[t].push(e)}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);b[o]=new Array(3);for(let r=0;r<3;++r){const a=e.SPLIT_DEMON_GFX+(r<<3);s.push(T(8,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(a+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&S(e,t,7-s,o)}})).then((({imageBitmap:e,imageData:t})=>{b[o][r]=e,0===o&&(B[r]=L(t))})))}}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);k[o]=new Array(3);for(let r=0;r<3;++r){const a=e.DEMON_SPLITS_GFX+(r<<3);s.push(T(8,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(a+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&S(e,t,7-s,o)}})).then((({imageBitmap:e})=>k[o][2-r]=e)))}}const o=t[86];s.push(T(7,12,(t=>{const s=e.CANNON_GFX+11;for(let e=0;e<12;++e){const i=n.charCodeAt(s-e);for(let n=0,s=128;n<7;++n,s>>=1)i&s&&S(t,n,e,o)}})).then((({imageBitmap:e,imageData:t})=>{C=e,O=L(t)})));for(let o=0;o<8;++o){const i=e.CANNON_EXPLODES_GFX+5*o;s.push(T(16,34,(s=>{for(let o=0;o<5;++o){const r=t[n.charCodeAt(e.CANNON_EXPLODES_COLS+o)],a=32-(o<<3),l=n.charCodeAt(i+o);for(let e=0,t=128;e<8;++e,t>>=1)l&t&&(S(s,e,a,r),S(s,15-e,a,r),S(s,e,a+1,r),S(s,15-e,a+1,r))}})).then((({imageBitmap:e})=>I[o]=e)))}await Promise.all(s)}().then((()=>{window.removeEventListener("resize",vt),window.removeEventListener("touchmove",gt),"serviceWorker"in navigator&&navigator.serviceWorker.removeEventListener("message",ft),rt()}))}))}function gt(e){e.preventDefault()}function vt(){const e=document.getElementById("progress-container"),t=document.getElementById("progress-div");e.style.width=e.style.height="",e.style.left=e.style.top="",e.style.display="none",t.style.top=t.style.left=t.style.transform="",t.style.display="none";const n=window.innerWidth,s=window.innerHeight;if(ut=n>=s,e.style.left="0px",e.style.top="0px",e.style.width=`${n}px`,e.style.height=`${s}px`,e.style.display="block",t.style.display="flex",ut){const e=t.getBoundingClientRect();t.style.left=(n-e.width)/2+"px",t.style.top=(s-e.height)/2+"px"}else{t.style.transform="rotate(-90deg)";const e=t.getBoundingClientRect();t.style.left=(n-e.height)/2+"px",t.style.top=(s-e.width)/2+"px"}}let yt=!1;function wt(e){e.preventDefault()}function Et(){const e=document.getElementById("death-div");e.style.top=e.style.left=e.style.transform="",e.style.display="none";const t=window.innerWidth,n=window.innerHeight;if(yt=t>=n,e.style.display="flex",yt){const s=e.getBoundingClientRect();e.style.left=(t-s.width)/2+"px",e.style.top=(n-s.height)/2+"px"}else{e.style.transform="rotate(-90deg)";const s=e.getBoundingClientRect();e.style.left=(t-s.height)/2+"px",e.style.top=(n-s.width)/2+"px"}}function xt(){window.addEventListener("error",(e=>{console.error(`Caught in global handler: ${e.message}`,{source:e.filename,lineno:e.lineno,colno:e.colno,error:e.error}),e.preventDefault(),window.addEventListener("resize",Et),window.addEventListener("touchmove",wt,{passive:!1}),document.getElementById("main-content").innerHTML='<div id="death-div"><span id="fatal-error">&#x1F480;</span></div>',Et()})),window.addEventListener("unhandledrejection",(e=>e.preventDefault())),document.addEventListener("dblclick",(e=>e.preventDefault()),{passive:!1}),window.addEventListener("resize",vt),window.addEventListener("touchmove",gt,{passive:!1}),document.getElementById("main-content").innerHTML='\n            <div id="progress-container">\n                <div id="progress-div">\n                    <progress id="loading-progress" value="0" max="100"></progress>\n                </div>\n            </div>',dt=document.getElementById("loading-progress"),"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",ft),vt(),async function(){for(let t=i-1;t>=0;--t)try{const t=await fetch("resources.zip");if(!t.ok)continue;const n=t.headers.get("Content-Length");if(!n)continue;const s=parseInt(n);if(isNaN(s)||s<=0)continue;const o=t.body;if(null===o)continue;const i=o.getReader(),r=[];let a=0;for(;;){const{done:t,value:n}=await i.read();if(t)break;r.push(n),a+=n.length,e=a/s,dt.value=100*e,mt("#0075FF")}const l=new Uint8Array(a);let h=0;return r.forEach((e=>{l.set(e,h),h+=e.length})),l}catch(e){if(0===t)throw e}var e;throw new Error("Failed to fetch.")}().then(pt)}}}]);