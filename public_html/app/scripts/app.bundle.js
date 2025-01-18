"use strict";(self.webpackChunkdemon_attack_js=self.webpackChunkdemon_attack_js||[]).push([[524],{572:(e,t,n)=>{n.r(t),n.d(t,{init:()=>Mt});const s=5,o=new AudioContext;o.onstatechange=()=>{"suspended"===o.state&&u()};let i=!0;document.addEventListener("visibilitychange",(()=>{"visible"===document.visibilityState?(i=!0,"suspended"===o.state&&o.resume()):"hidden"===document.visibilityState&&(i=!1,u(),"running"===o.state&&o.suspend())}));const r=o.createGain();r.connect(o.destination),r.gain.value=.1;const a=[],l=new Map,h=new Map;function c(e){r.gain.value=e/100}function d(e,t=!1){if("suspended"===o.state)return void(i&&o.resume().then((()=>d(e))));if(t){if(h.has(e))return}else!function(e){const t=h.get(e);t&&(h.delete(e),t.stop())}(e);const n=o.createBufferSource();n.buffer=l.get(e),n.connect(r),n.loop=t,h.set(e,n),n.onended=()=>h.delete(e),n.start()}function u(){for(const e of h.values())e.stop();h.clear()}class m{r;g;b;constructor(e,t,n){this.r=e,this.g=t,this.b=n}}var f,p;!function(e){e[e.WIDTH=160]="WIDTH",e[e.HEIGHT=228]="HEIGHT"}(f||(f={})),function(e){e[e.WIDTH=4]="WIDTH",e[e.HEIGHT=3]="HEIGHT"}(p||(p={}));const g=new Array(256),v=new Array(121),y=new Array(62),w=new Array(256),x=new Array(7),E=new Array(6),A=new Array(7),M=new Array(7),D=new Array(16),b=new Array(7),B=new Array(3),k=new Array(7);let C,O;const I=new Array(8);async function T(e,t,n){return new Promise((s=>{const o=new ImageData(e,t);n(o),createImageBitmap(o).then((e=>s({imageBitmap:e,imageData:o})))}))}function L(e){const t=new Array(e.height),{data:n}=e;for(let s=0,o=3;s<e.height;++s){t[s]=new Array(e.width);for(let i=0;i<e.width;++i,o+=4)t[s][i]=0!==n[o]}return t}function S(e,t,n,s){const o=4*(n*e.width+t),i=e.data;i[o]=s.r,i[o+1]=s.g,i[o+2]=s.b,i[o+3]=255}var N;!function(e){e[e.NONE=-1]="NONE",e[e.TOP=0]="TOP",e[e.MIDDLE=1]="MIDDLE",e[e.BOTTOM=2]="BOTTOM",e[e.DIVING=3]="DIVING"}(N||(N={}));class G{v=0;v0=0;v1=0;steps=0;s=0;reset(e,t,n){this.v=e,this.v0=e,this.v1=t,this.steps=n,this.s=0}update(){if(++this.s>=this.steps)return this.s=this.steps,this.v=this.v1,!0;const e=this.s/this.steps;let t=0;if(e<=.5){const n=2*e;t=n*n/2}else{const n=2*(e-1);t=1-n*n/2}return this.v=this.v0+t*(this.v1-this.v0),!1}getMin(){return this.v1>this.v0?this.v:this.v1}getMax(){return this.v1>this.v0?this.v1:this.v}}function F(e,t){let n,s;do{n=Math.random()}while(0===n);do{s=Math.random()}while(0===s);return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*s)*t+e}function H(e,t,n){return e<t?t:e>n?n:e}function R(e,t,n,s,o,i){o=Math.floor(o),i=Math.floor(i),e=Math.floor(e)-o,t=Math.floor(t)-i;const r=s[0].length-1,a=s.length-1,l=t+n-1;if(l<0||e<0||t>a||e>r)return!1;const h=Math.min(l,a);for(let n=Math.max(t,0);n<=h;++n)if(s[n][e])return!0;return!1}Math.PI;const _=.5;let X=0,P=0,Q=!1,Y=!1,K=!1,W=null,J=!1,$=!1,z=!1,j=!1;class V{timestampDown=0;xDown=0;yDown=0;x=0;y=0}const Z=new Map;function U(){X=0,P=0,Q=!1,Y=!1,K=!1,Z.clear()}function q(){return Y||X>P}function ee(){return K||P>X}function te(){return Q}function ne(){null!==W&&(clearTimeout(W),W=null),J&&(document.body.style.cursor="default",J=!1)}function se(){ne(),W=window.setTimeout((()=>{document.body.style.cursor="none",J=!0}),3e3)}function oe(e){e.preventDefault();const t=window.innerWidth,n=window.innerHeight,s=t>=n;for(let t=e.changedTouches.length-1;t>=0;--t){const o=e.changedTouches[t];let i,r;switch(s?(i=o.clientX,r=o.clientY):(i=n-1-o.clientY,r=o.clientX),e.type){case"touchstart":{const e=new V;e.timestampDown=Date.now(),e.xDown=e.x=i,e.yDown=e.y=r,Z.set(o.identifier,e);break}case"touchmove":{se();const e=Z.get(o.identifier);e&&(e.x=i,e.y=r);break}case"touchend":case"touchcancel":{const e=Z.get(o.identifier);e&&(i<64&&r<64&&e.xDown<64&&e.yDown<64&&nt(),Z.delete(o.identifier));break}}}let o=null;for(const[t,n]of Array.from(Z)){(n.x>=64||n.y>=64)&&(!o||n.timestampDown>o.timestampDown)&&(o=n);e:{for(let n=e.touches.length-1;n>=0;--n)if(e.touches[n].identifier===t)break e;Z.delete(t)}}o?o.x<t/2?(Y=!0,K=!1):(Y=!1,K=!0):Y=K=!1}function ie(e){if(!e.clientX||!e.clientY)return;const t=window.innerWidth,n=window.innerHeight;let s,o;t>=n?(s=e.clientX,o=e.clientY):(s=n-1-e.clientY,o=e.clientX),s<64&&o<64&&nt()}function re(e){switch(e.code){case"KeyA":case"ArrowLeft":X=P+1;break;case"KeyD":case"ArrowRight":P=X+1;break;case"Escape":nt();break;default:Q=!0}}function ae(e){switch(e.code){case"KeyA":case"ArrowLeft":X=0;break;case"KeyD":case"ArrowRight":P=0;break;case"Escape":break;default:Q=!1}}const le="demon-attack-store";class he{highScore=0;volume=10;autofire=function(){const e="ontouchstart"in window||navigator.maxTouchPoints>0,t=window.matchMedia("(hover: hover)").matches,n=window.matchMedia("(pointer: coarse)").matches;return e&&!t&&n}();tracer=!1;fast=!1;score=0;level=0;bunkers=3;spawnedDemons=0;cannonExploded=!1}let ce;function de(){localStorage.setItem(le,JSON.stringify(ce))}const ue=185;class me{x=87;exploding=!1;explodingCounter=0;exploded=!1;reset(){this.x=87,this.exploding=!1,this.explodingCounter=0,this.exploded=!1}explode(){this.exploding=this.exploded=!0,d("sfx/explodes-cannon.mp3")}update(e){this.exploding?(e.demonBullets.length=0,e.backgroundColor=Math.max(0,14-(254&this.explodingCounter)),64==++this.explodingCounter&&(this.exploding=!1,this.explodingCounter=0,this.x=87,0===e.bunkers?(e.animatingGameOver=!0,e.score>ce.highScore&&(ce.highScore=e.score,e.newHighScore=!0),ce.level=0,ce.score=0,ce.spawnedDemons=0,ce.bunkers=3,ce.cannonExploded=!1,d("sfx/ends-game.mp3")):--e.bunkers)):q()?this.x>25&&(this.x-=ce.fast?2:1):ee()&&this.x<135&&(this.x+=ce.fast?2:1)}render(e,t){this.exploding?t.drawImage(I[this.explodingCounter>>3],this.x-4,163):t.drawImage(C,this.x,ue)}}var fe;!function(e){e[e.LOADED=0]="LOADED",e[e.FIRING=1]="FIRING"}(fe||(fe={}));class pe{color=g[110];state=fe.LOADED;x=0;y=0;autofireTimer=0;load(){this.state=fe.LOADED}update(e){q()||ee()||te()?this.autofireTimer=180:this.autofireTimer>0&&--this.autofireTimer,this.state===fe.LOADED?(this.x=e.cannon.x+3,this.y=186,!e.cannon.exploding&&(te()||ce.autofire&&this.autofireTimer>0)&&(this.state=fe.FIRING,this.y-=e.cannonFiringSpeed,ce.autofire||d("sfx/shoots-cannon.mp3"))):this.y<32?(this.state=fe.LOADED,this.x=e.cannon.x+3,this.y=186):(ce.tracer&&(this.x=e.cannon.x+3),this.y-=e.cannonFiringSpeed)}render(e,t){if(this.state===fe.LOADED&&e.cannon.exploding)return;const n=this.y+7;if(n<32)return;const s=Math.max(32,this.y);t.fillStyle=this.color,t.fillRect(this.x,s,1,n-s+1)}}const ge=[[1,0,18,5,0,0],[2,18,2,9,0,0],[1,12,3,13,0,0],[0,14,1,7,5,4],[0,28,4,25,2,1],[3,23,2,15,5,14]],ve=[];!function(){for(const e of ge){const t=[];for(let n=0;n<e.length;++n){const s=e[n],o=n+1;for(let e=0;e<s;++e)t.push(o)}ve.push(t)}}();class ye{demon;x;y;shots;color=g[78];xOffset=0;constructor(e,t,n,s){this.demon=e,this.x=t,this.y=n,this.shots=s}update(e){const t=1==(e.level>>1&1);if(0===e.demonBulletDropTimer){if(this.demon.split||!t){const e=Math.random();t?e<.0625?--this.xOffset:e<.125&&++this.xOffset:e<.25?--this.xOffset:e<.5&&++this.xOffset}if(e.level>=8&&(this.x=Math.floor(this.demon.x)+4),this.y+=8,this.y>=198){const{demonBullets:t}=e;for(let e=t.length-1;e>=0;--e)if(t[e]===this){t.splice(e,1);break}}}const{cannon:n}=e;if(!n.exploding){const s=Math.floor(this.demon.y+12);let o,i;if(t?(o=this.y,i=o+7):(o=1===e.demonBulletDropTimer?this.y:this.y+4,i=o+3),o=Math.max(s,o),i=Math.min(196,i),o>196||i<o)return;const r=this.x+this.xOffset;(R(r+this.shots[0],o,i-o+1,O,n.x,ue)||this.shots.length>1&&R(r+this.shots[1],o,i-o+1,O,n.x,ue))&&n.explode()}}render(e,t){const n=Math.floor(this.demon.y+12);let s,o;if(e.level>>1&1?(s=this.y,o=s+7):(s=1===e.demonBulletDropTimer?this.y:this.y+4,o=s+3),s=Math.max(n,s),o=Math.min(196,o),s>196||o<s)return;t.fillStyle=this.color;const i=this.x+this.xOffset;t.fillRect(i+this.shots[0],s,1,o-s+1),this.shots.length>1&&t.fillRect(i+this.shots[1],s,1,o-s+1)}}const we=new Array(12);for(let e=0;e<12;++e)we[e]=`sfx/explodes-demon-${e.toString().padStart(2,"0")}.mp3`;class xe{x;y;tier;xEaser=new G;yEaser=new G;sprite=0;flap=0;flapCounter=8;spawning=28;exploding=!1;explodingCounter=0;split=!1;leftHalf=!1;partner=null;movingLeft=!1;constructor(e,t,n){this.x=e,this.y=t,this.tier=n}update(e){if(this.exploding&&24==++this.explodingCounter){if(this.split||e.level<4)return void e.removeDemon(this);this.exploding=!1,this.explodingCounter=0,this.split=!0,this.leftHalf=!0,this.partner=new xe(this.x+8,this.y,this.tier),this.partner.sprite=this.sprite,this.partner.flap=this.flap,this.partner.flapCounter=this.flapCounter,this.partner.spawning=0,this.partner.split=!0,this.partner.partner=this,this.partner.yEaser=this.yEaser,e.demons.push(this.partner)}if(this.spawning>0)--this.spawning;else if(!this.exploding){const{cannonBullet:t}=e;if(t.state===fe.FIRING&&R(t.x,t.y,ce.autofire?12:8,this.split?B[this.sprite]:E[e.demonType][this.sprite],this.x,this.y)){t.load(),this.exploding=!0,this.explodingCounter=Math.floor(5*Math.random());let n=5*(Math.min(5,e.level>>1)+2);if(this.split&&(n*=this.tier===N.DIVING?3:2),e.score+=n,this.tier===N.BOTTOM&&(!this.split||this.leftHalf)){const{demonBullets:t}=e;for(let e=t.length-1;e>=0;--e)t[e].y<this.y&&t.splice(e,1)}d(we[e.level%12])}}if(0==--this.flapCounter&&(this.flapCounter=8,this.flap=this.flap+1&3,this.sprite=3===this.flap?1:this.flap),this.tier===N.DIVING){const{cannon:t}=e;this.exploding||t.exploding||!function(e,t,n,s,o,i){t=Math.floor(t),n=Math.floor(n);const r=e[0].length-1,a=e.length-1;o=Math.floor(o)-t,i=Math.floor(i)-n;const l=o+s[0].length-1,h=i+s.length-1;if(h<0||a<i||l<0||r<o)return!1;const c=Math.max(0,o),d=Math.min(r,l),u=Math.max(0,i),m=Math.min(a,h);for(let t=u;t<=m;++t)for(let n=c;n<=d;++n)if(e[t][n]&&s[t-i][n-o])return!0;return!1}(B[this.sprite],this.x,this.y,O,t.x,ue)?(this.xEaser.update()&&this.resetXEaserForDive(e),this.x=this.xEaser.v,this.yEaser.update()&&this.resetYEaserForDive(e),this.y=this.yEaser.v,this.y>=188&&e.removeDemon(this)):(t.explode(),e.removeDemon(this))}else this.split&&!this.leftHalf?this.movingLeft?(this.x-=.75,this.x<=20&&(this.movingLeft=!1)):(this.x+=.75,this.x>=151&&(this.movingLeft=!0)):(this.xEaser.update()&&(this.tier!==N.BOTTOM||this.exploding||0!==this.spawning||!(!this.split||this.leftHalf&&this.partner)||e.divingDemon?this.resetXEaserRandomly(e):0!==e.demonBullets.length||e.cannon.exploding?(e.cannon.exploding||e.demonBullets.length>0&&e.demonBullets[e.demonBullets.length-1].y>=this.y+8)&&this.resetXEaserRandomly(e):function(e,t){const{level:n,demonBullets:s}=e,o=1==(n>>1&1);let i=Math.floor(t.x)+4,r=4;if(!o){const e=n%12,t=ve[e>>1&6|1&e];r=t[Math.floor(t.length*Math.random())]}for(let e=r-1,n=8*Math.floor(t.y/8)+6;e>=0;--e,n-=8)Math.random()<.125&&(n-=8),s.push(new ye(t,i,n,D[o?t.split?0:12:Math.floor(t.split?2*(1+Math.random()):D.length*Math.random())]));e.demonBulletDropTimer=e.demonBulletDropTimerReset-1}(e,this)),this.x=this.xEaser.v),this.split&&!this.leftHalf&&this.partner||this.yEaser.update()&&(!this.split||this.partner||e.divingDemon||e.cannon.exploding||0!==e.demonBullets.length||this.tier!==N.BOTTOM?this.resetYEaserRandomly(e):this.startDiving(e)),this.y=this.yEaser.v}startDiving(e){this.tier=N.DIVING;const{demons:t}=e;for(let e=t.length-1;e>=0;--e){const n=t[e];n!==this&&++n.tier}e.divingDemon=this,this.yEaser.v1=this.yEaser.v0-1,this.resetXEaserForDive(e),this.resetYEaserForDive(e)}resetXEaserForDive(e){this.xEaser.reset(this.x,H(this.x<e.cannon.x?this.x+20:this.x-20,20,151),32)}resetYEaserForDive(e){this.yEaser.v1<this.yEaser.v0?this.yEaser.reset(this.y,this.y+20,16):this.yEaser.reset(this.y,this.y-12,16)}resetXEaserRandomly(e){let t;if(this.tier===N.BOTTOM){const{cannon:n,cannonBullet:s}=e;t=this.x+4<n.x?F(n.x-(s.y+8<this.y?10:16),2):F(n.x+(s.y+8<this.y?3:9),2)}else t=F(this.x,32);if(t=H(t,20,this.split?151:143),this.tier===N.BOTTOM){const{demonBullets:n,demonBulletDropTimerReset:s}=e;if(n.length>0){const e=s*(198-n[n.length-1].y)/10;t=t>this.x?this.x+Math.min(e,t-this.x):this.x-Math.min(e,this.x-t)}}this.xEaser.reset(this.x,t,2*Math.abs(t-this.x+1))}resetYEaserRandomly(e){let t=56,n=141;const{demons:s}=e;switch(this.tier){case N.TOP:n-=16;for(let e=s.length-1;e>=0;--e){const t=s[e];t!==this&&t.tier>N.TOP&&(n=Math.min(n,t.yEaser.getMin()-8))}break;case N.MIDDLE:t+=8,n-=8;for(let e=s.length-1;e>=0;--e){const o=s[e];o!==this&&(o.tier<N.MIDDLE?t=Math.max(t,o.yEaser.getMax()+8):o.tier>N.MIDDLE&&(n=Math.min(n,o.yEaser.getMin()-8)))}break;case N.BOTTOM:t+=16;for(let e=s.length-1;e>=0;--e){const o=s[e];o!==this&&(o.tier<N.BOTTOM?t=Math.max(t,o.yEaser.getMax()+8):o.tier>N.BOTTOM&&(n=Math.min(n,o.yEaser.getMin()-8)))}}t=Math.min(t,n),n=Math.max(t,n),this.yEaser.reset(this.y,t+(n-t)*Math.random(),n-t+1)}render(e,t){if(this.exploding){const n=this.explodingCounter>>3;let s;s=this.split?k[e.demonPalette][n]:A[e.demonPalette][e.level<4?0:1][n],n<3&&t.drawImage(s,Math.floor(this.x),Math.floor(this.y))}else if(this.spawning>0)if(1===this.spawning)t.drawImage(x[e.demonPalette][e.demonType][this.sprite],Math.floor(this.x),Math.floor(this.y),32,8);else{const n=this.spawning-1<<2;t.drawImage(M[e.demonPalette][this.sprite][0],Math.floor(this.x-n),Math.floor(this.y),32,8),t.drawImage(M[e.demonPalette][this.sprite][1],Math.floor(this.x+n),Math.floor(this.y),32,8)}else t.drawImage(this.split?b[e.demonPalette][this.sprite]:x[e.demonPalette][e.demonType][this.sprite],Math.floor(this.x),Math.floor(this.y))}}const Ee=[3,3,4,4,5,5,5,5,6],Ae=[8,6,6,3,5,4];class Me{level=0;demonPalette=0;demonType=0;backgroundColor=0;baseColor=0;bunkers;bunkerColor=0;score;scoreColor=44;cannon=new me;cannonBullet=new pe;cannonFiringSpeed=0;demons=new Array;spawnDelay=0;spawnedDemons;divingDemon=null;demonBullets=new Array;demonBulletDropTimer=0;demonBulletDropTimerReset=0;animatingExtraBunker=!1;animatingGameOver=!1;newHighScore=!1;pulseCounter=0;constructor(){this.setLevel(ce.level),this.score=ce.score,this.spawnedDemons=ce.spawnedDemons,this.bunkers=ce.bunkers,this.cannon.exploded=ce.cannonExploded}setLevel(e){this.level=e,this.demonPalette=e%7,this.demonType=(e>>1)%6,this.cannonFiringSpeed=ce.autofire?12:Ee[Math.min(8,e)],this.demonBulletDropTimerReset=Ae[e<4?e:4+(1&e)],this.spawnDelay=30,this.demonBulletDropTimer=0,this.spawnedDemons=0}incrementLevel(){this.setLevel(this.level+1)}countDemons(){let e=!1,t=!1,n=!1,s=null!=this.divingDemon;for(let o=this.demons.length-1;o>=0;--o)switch(this.demons[o].tier){case N.TOP:e=!0;break;case N.MIDDLE:t=!0;break;case N.BOTTOM:n=!0;break;case N.DIVING:s=!0}let o=0;return e&&++o,t&&++o,n&&++o,s&&++o,o}save(){this.animatingGameOver||this.cannon.exploding&&0===this.bunkers?(ce.level=0,ce.score=0,ce.spawnedDemons=0,ce.bunkers=3,ce.cannonExploded=!1):(ce.level=this.level,ce.score=this.score,ce.cannonExploded=this.cannon.exploded,ce.spawnedDemons=Math.max(0,this.spawnedDemons-this.countDemons()),this.cannon.exploding?ce.bunkers=Math.max(0,this.bunkers-1):this.animatingExtraBunker?ce.bunkers=Math.min(6,this.bunkers+1):ce.bunkers=this.bunkers),de()}removeDemon(e){this.divingDemon==e&&(this.divingDemon=null),e.partner&&(e.partner.partner=null);for(let t=this.demons.length-1;t>=0;--t)if(this.demons[t]===e)return void this.demons.splice(t,1)}}const De=new Array(6);for(let e=0;e<6;++e)De[e]=`sfx/pulses-${e}.mp3`;let be,Be=!1;function ke(){be=new Me,Be=!1}function Ce(){!function(){const e=navigator.getGamepads();if(!e)return;let t=!1,n=!1,s=!1;for(let o=e.length-1;o>=0;--o){const i=e[o];if(!i)continue;(i.buttons[14]?.pressed||i.buttons[4]?.pressed||i.buttons[10]?.pressed)&&(t=!0),(i.buttons[15]?.pressed||i.buttons[5]?.pressed||i.buttons[11]?.pressed)&&(n=!0);const r=i.axes[0],a=i.axes[2];r<-_||a<-_?t=!0:(r>_||a>_)&&(n=!0),(i.buttons[0]?.pressed||i.buttons[1]?.pressed||i.buttons[2]?.pressed||i.buttons[3]?.pressed||i.buttons[6]?.pressed||i.buttons[7]?.pressed||i.buttons[8]?.pressed||i.buttons[9]?.pressed)&&(s=!0)}t?$||(X=P+1):$&&(X=0),$=t,n?z||(P=X+1):z&&(P=0),z=n,s?j||(Q=!0):j&&(Q=!1),j=s}();const{cannon:e,cannonBullet:t,demons:n,demonBullets:s}=be;if(be.animatingGameOver)be.baseColor<v.length-1?++be.baseColor:(be.newHighScore&&(be.scoreColor=be.scoreColor+1&255),(q()||ee())&&ke(),te()?Be=!0:Be&&ke());else if(8!==be.spawnedDemons||0!==n.length||0!==s.length||e.exploding||(be.incrementLevel(),e.exploded||6===be.bunkers?(e.reset(),t.load(),be.pulseCounter=0):(be.animatingExtraBunker=!0,d("sfx/awards-bunker.mp3"))),be.animatingExtraBunker&&(be.bunkerColor===y.length-1?(be.animatingExtraBunker=!1,be.bunkerColor=0,be.pulseCounter=0,++be.bunkers,e.reset(),t.load()):++be.bunkerColor),be.animatingExtraBunker||function(){const{demons:e}=be;let t=!1,n=!1,s=!1;for(let o=e.length-1;o>=0;--o){const i=e[o];if(i.spawning>0)return;switch(i.tier){case N.TOP:t=!0;break;case N.MIDDLE:n=!0;break;case N.BOTTOM:s=!0}}if(be.spawnDelay>0)return void--be.spawnDelay;let o=56,i=141,r=N.NONE;if(s)if(n){if(!t){r=N.TOP,i-=16;for(let t=e.length-1;t>=0;--t){const n=e[t];n.tier>N.TOP&&(i=Math.min(i,n.yEaser.getMin()-8))}}}else{r=N.MIDDLE,o+=8,i-=8;for(let t=e.length-1;t>=0;--t){const n=e[t];n.tier<N.MIDDLE?o=Math.max(o,n.yEaser.getMax()+8):n.tier>N.MIDDLE&&(i=Math.min(i,n.yEaser.getMin()-8))}}else{r=N.BOTTOM,o+=16;for(let t=e.length-1;t>=0;--t){const n=e[t];n.tier<N.BOTTOM?o=Math.max(o,n.yEaser.getMax()+8):n.tier>N.BOTTOM&&(i=Math.min(i,n.yEaser.getMin()-8))}}r!==N.NONE&&i-o+1>=8&&be.spawnedDemons<8&&(e.push(new xe(Math.floor(20+123*Math.random()),o+(i-o)*Math.random(),r)),++be.spawnedDemons,be.spawnDelay=8+Math.floor(24*Math.random()),d("sfx/spawns-demon.mp3"))}(),e.update(be),!be.animatingGameOver){0===be.demonBulletDropTimer&&(be.demonBulletDropTimer=be.demonBulletDropTimerReset),--be.demonBulletDropTimer;for(let e=s.length-1;e>=0;--e)s[e].update(be);for(let e=n.length-1;e>=0;--e)n[e].update(be);if(be.level>=4&&8===be.spawnedDemons){let e=N.TOP;for(let t=n.length-1;t>=0;--t)n[t].tier>N.BOTTOM||(e=Math.max(e,n[t].tier));const t=N.BOTTOM-e;if(t>0)for(let e=n.length-1;e>=0;--e){const s=n[e];s.tier>N.BOTTOM||(s.tier+=t)}}t.update(be),be.pulseCounter=be.pulseCounter+1&31,be.divingDemon?15&be.pulseCounter||d("sfx/dives-demon.mp3"):0===be.pulseCounter&&d(De[H(be.spawnedDemons-3,0,5)])}}const Oe=1e3/60,Ie=5;let Te=!1,Le=0,Se=0,Ne=0;function Ge(){Te||(Te=!0,Ne=0,Le=requestAnimationFrame(He),Se=performance.now())}function Fe(){Te&&(Te=!1,cancelAnimationFrame(Le))}function He(){if(!Te)return;Le=requestAnimationFrame(He),st();const e=performance.now(),t=e-Se;Se=e,Ne+=t;let n=0;for(;Ne>=Oe&&Te;)if(Ce(),Ne-=Oe,++n>Ie){Ne=0,Se=performance.now();break}}let Re,_e,Xe,Pe,Qe,Ye,Ke,We=null,Je=!1;function $e(){!Je&&null===We&&"wakeLock"in navigator&&(Je=!0,navigator.wakeLock.request("screen").then((e=>{Je&&(We=e,We.addEventListener("release",(()=>{Je||(We=null)})))})).catch((e=>{})).finally((()=>Je=!1)))}let ze,je,Ve,Ze,Ue=null,qe=!1;function et(){if(null!==Ue&&(Ue(),Ue=null),qe)return;const e=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);e.addEventListener("change",et),Ue=()=>e.removeEventListener("change",et),ot()}function tt(){qe||(qe=!0,Fe(),window.removeEventListener("click",ie),window.removeEventListener("mousemove",se),window.removeEventListener("mouseenter",se),window.removeEventListener("mouseleave",ne),ne(),window.removeEventListener("keydown",re),window.removeEventListener("keyup",ae),window.removeEventListener("touchstart",oe),window.removeEventListener("touchmove",oe),window.removeEventListener("touchend",oe),window.removeEventListener("touchcancel",oe),U(),u(),null!==We&&"wakeLock"in navigator&&(Je=!1,We.release().then((()=>{Je||(We=null)})).catch((e=>{}))),window.removeEventListener("beforeunload",rt),window.removeEventListener("resize",ot),window.removeEventListener("focus",it),window.removeEventListener("blur",it),document.removeEventListener("visibilitychange",it),null!==Ue&&(Ue(),Ue=null),be.save())}function nt(){tt(),lt()}function st(){Xe?Ke&&(Xe.imageSmoothingEnabled=!1,Xe.fillStyle="#0F0F0F",Xe.fillRect(0,0,Pe,Qe),Ke.imageSmoothingEnabled=!1,function(e){e.fillStyle=g[be.backgroundColor],e.fillRect(0,0,160,199),e.drawImage(v[be.baseColor],0,199,160,29);for(let t=be.bunkers-1;t>=0;--t)e.drawImage(y[be.bunkerColor],17+(t<<3),199);{const t=w[be.scoreColor];let n=be.score,s=96;for(;e.drawImage(t[n%10],s,18),n=Math.floor(n/10),0!==n;)s-=8}const{cannon:t,cannonBullet:n,demons:s,demonBullets:o}=be;if(be.animatingGameOver)be.baseColor===v.length-1&&t.render(be,e);else{t.render(be,e);for(let t=o.length-1;t>=0;--t)o[t].render(be,e);for(let t=s.length-1;t>=0;--t)s[t].render(be,e);n.render(be,e)}}(Ke),Xe.drawImage(Ye,Ve,Ze,ze,je),Xe.imageSmoothingEnabled=!0,Xe.fillStyle="#FFFFFF",Xe.fillRect(27,21,18,1),Xe.fillRect(27,27,18,1),Xe.fillRect(27,33,18,1)):ot()}function ot(){if(qe)return;Xe=null,_e=document.getElementById("main-canvas"),_e.style.display="none";const e=window.innerWidth,t=window.innerHeight;_e.style.display="block",_e.style.width=`${e}px`,_e.style.height=`${t}px`,_e.style.position="absolute",_e.style.left="0px",_e.style.top="0px",Re=window.devicePixelRatio||1,_e.width=Math.floor(Re*e),_e.height=Math.floor(Re*t);const n=new DOMMatrix;e>=t?(Pe=e,Qe=t,n.a=n.d=Re,n.b=n.c=n.e=n.f=0):(Pe=t,Qe=e,n.a=n.d=n.e=0,n.c=Re,n.b=-n.c,n.f=Re*t),Xe=_e.getContext("2d"),Xe&&(Xe.setTransform(n),je=Qe,ze=je*p.WIDTH/p.HEIGHT,ze>Pe?(ze=Pe,je=ze*p.HEIGHT/p.WIDTH,Ve=0,Ze=Math.round((Qe-je)/2)):(Ve=Math.round((Pe-ze)/2),Ze=0),st())}function it(){!qe&&"visible"===document.visibilityState&&document.hasFocus()?($e(),U(),Ge()):(Fe(),u())}function rt(){tt()}let at=!1;function lt(){document.body.style.backgroundColor="#0F0F0F",window.addEventListener("resize",ut),window.addEventListener("touchmove",ct,{passive:!1}),document.getElementById("main-content").innerHTML=`\n            <div id="start-container">\n                <div id="start-div">\n                    <div id="high-score-div">High Score: ${ce.highScore}</div>\n                    <div class="volume-div">\n                        <span class="left-volume-label material-icons" id="left-volume-span" \n                                lang="en">volume_mute</span>\n                        <input type="range" id="volume-input" min="0" max="100" step="any" value="10">\n                        <span class="right-volume-label" id="right-volume-span" lang="en">100</span>\n                    </div>\n                    <div class="checkboxes-div">\n                        <div class="checkbox-item">\n                            <input type="checkbox" id="autofire-checkbox" name="autofire-checkbox">\n                            <label for="autofire-checkbox">\n                                <span class="custom-checkbox"></span>\n                                Autofire\n                            </label>\n                        </div>\n                        <div class="checkbox-item">\n                            <input type="checkbox" id="tracer-checkbox" name="tracer-checkbox">\n                            <label for="tracer-checkbox">\n                                <span class="custom-checkbox"></span>\n                                Tracer\n                            </label>\n                        </div>\n                        <div class="checkbox-item">\n                            <input type="checkbox" id="fast-checkbox" name="fast-checkbox">\n                            <label for="fast-checkbox">\n                                <span class="custom-checkbox"></span>\n                                Fast\n                            </label>\n                        </div>\n                    </div>\n                    <div id="go-div">\n                        <button id="start-button">${0===ce.score&&0===ce.level&&3===ce.bunkers&&0===ce.spawnedDemons?"Start":"Continue"}</button>\n                    </div>\n                </div>\n            </div>`,c(ce.volume);const e=document.getElementById("volume-input");e.addEventListener("input",dt),e.value=String(ce.volume),document.getElementById("autofire-checkbox").checked=ce.autofire,document.getElementById("tracer-checkbox").checked=ce.tracer,document.getElementById("fast-checkbox").checked=ce.fast,document.getElementById("start-button").addEventListener("click",ht),ut()}function ht(){c(ce.volume);const e=document.getElementById("autofire-checkbox");ce.autofire=e.checked;const t=document.getElementById("tracer-checkbox");ce.tracer=t.checked;const n=document.getElementById("fast-checkbox");ce.fast=n.checked,function(){window.removeEventListener("resize",ut),window.removeEventListener("touchmove",ct),document.getElementById("volume-input").removeEventListener("input",dt),document.getElementById("start-button").removeEventListener("click",ht);const e=document.getElementById("autofire-checkbox");ce.autofire=e.checked;const t=document.getElementById("tracer-checkbox");ce.tracer=t.checked;const n=document.getElementById("fast-checkbox");ce.fast=n.checked,de()}(),qe=!1,ke(),document.body.style.backgroundColor="#C2BCB1",Ye=document.createElement("canvas"),Ye.width=f.WIDTH,Ye.height=f.HEIGHT,Ke=Ye.getContext("2d"),document.getElementById("main-content").innerHTML='<canvas id="main-canvas" class="canvas" width="1" height="1"></canvas>',_e=document.getElementById("main-canvas"),_e.style.touchAction="none",window.addEventListener("beforeunload",rt),window.addEventListener("resize",ot),window.addEventListener("focus",it),window.addEventListener("blur",it),document.addEventListener("visibilitychange",it),$e(),et(),window.addEventListener("click",ie),window.addEventListener("mousemove",se),window.addEventListener("mouseenter",se),window.addEventListener("mouseleave",ne),se(),window.addEventListener("touchstart",oe,{passive:!1}),window.addEventListener("touchmove",oe,{passive:!1}),window.addEventListener("touchend",oe,{passive:!1}),window.addEventListener("touchcancel",oe,{passive:!1}),window.addEventListener("keydown",re),window.addEventListener("keyup",ae),U(),Ge()}function ct(e){let t=e.target;for(;null!==t;){if("volume-input"===t.id){if(at)return;const n=t,s=parseFloat(n.max),o=parseFloat(n.min),i=n.getBoundingClientRect(),r=(1-(e.touches[0].clientY-i.top)/i.height)*(s-o)+o;return n.value=r.toString(),void n.dispatchEvent(new Event("input"))}t=t.parentElement}e.preventDefault()}function dt(){const e=document.getElementById("left-volume-span"),t=document.getElementById("volume-input"),n=document.getElementById("right-volume-span");ce.volume=100*(+t.value-+t.min)/(+t.max-+t.min),t.style.setProperty("--thumb-position",`${ce.volume}%`),0===ce.volume?e.textContent="volume_off":ce.volume<33?e.textContent="volume_mute":ce.volume<66?e.textContent="volume_down":e.textContent="volume_up",n.textContent=String(Math.round(ce.volume))}function ut(){const e=document.getElementById("start-container"),t=document.getElementById("start-div"),n=document.getElementById("left-volume-span"),s=document.getElementById("right-volume-span");e.style.width=e.style.height="",e.style.left=e.style.top="",e.style.display="none",t.style.left=t.style.top=t.style.transform="",t.style.display="none";const o=window.innerWidth,i=window.innerHeight;if(at=o>=i,e.style.left="0px",e.style.top="0px",e.style.width=`${o}px`,e.style.height=`${i}px`,e.style.display="block",t.style.display="flex",n.style.width="",n.style.display="inline-block",n.style.textAlign="center",n.textContent="🔇",n.style.transform="",s.style.width="",s.style.display="inline-block",s.style.textAlign="center",s.textContent="100",at){const e=n.getBoundingClientRect().width;n.style.width=`${e}px`;const r=s.getBoundingClientRect().width;s.style.width=`${r}px`;const a=t.getBoundingClientRect();t.style.left=(o-a.width)/2+"px",t.style.top=(i-a.height)/2+"px"}else{const e=n.getBoundingClientRect().height;n.style.width=`${e}px`;const r=s.getBoundingClientRect().height;s.style.width=`${r}px`,t.style.transform="rotate(-90deg)";const a=t.getBoundingClientRect();t.style.left=(o-a.height)/2+"px",t.style.top=(i-a.width)/2+"px"}s.textContent=String(ce.volume),dt()}let mt,ft=!1;function pt(e){if(mt){if(e===mt.style.color)return;mt.style.color=e}const t="progress-bar-style";let n=document.getElementById(t);n||(n=document.createElement("style"),n.id=t,document.head.appendChild(n)),n.innerText=`\n        #loading-progress::-webkit-progress-value {\n            background-color: ${e} !important;\n        }\n        #loading-progress::-moz-progress-bar {\n            background-color: ${e} !important;\n        }\n    `}function gt(e){mt&&(mt.value=100*e.data,pt("#48D800"))}function vt(e){n.e(211).then(n.t.bind(n,710,23)).then((({default:t})=>{(new t).loadAsync(e).then((e=>Object.entries(e.files).forEach((e=>{const[t,n]=e;var s,i;n.dir||t.endsWith(".mp3")&&(s=t,i=n,a.push(i.async("arraybuffer").then((e=>o.decodeAudioData(e))).then((e=>l.set(s,e)))))}))))})),async function(){return Promise.all(a).then((()=>a.length=0))}().then((()=>{document.getElementById("loading-progress").value=100,setTimeout((()=>{!function(){if(ce)return;const e=localStorage.getItem(le);if(e)try{ce=JSON.parse(e)}catch{ce=new he}else ce=new he}(),async function(){let e;!function(e){e[e.DEMON_COLS=0]="DEMON_COLS",e[e.CANNON_EXPLODES_COLS=56]="CANNON_EXPLODES_COLS",e[e.CANNON_GFX=61]="CANNON_GFX",e[e.BUNKER_GFX=73]="BUNKER_GFX",e[e.CANNON_EXPLODES_GFX=79]="CANNON_EXPLODES_GFX",e[e.DEMON_EXPLODES_GFX=119]="DEMON_EXPLODES_GFX",e[e.DEMON_GFX=143]="DEMON_GFX",e[e.DEMON_SPLITS_GFX=287]="DEMON_SPLITS_GFX",e[e.SPLIT_DEMON_GFX=311]="SPLIT_DEMON_GFX",e[e.DIGITS_GFX=335]="DIGITS_GFX",e[e.DEMON_SHOTS=435]="DEMON_SHOTS"}(e||(e={}));const t=function(){const e=new Array(256),t=atob("AAAAPz8+ZGRjhISDoqKhurq50tLR6urpPT0AXl4Ke3sVmZkgtLQqzc005uY+/f1IcSMAhj0LmVcYrW8mvYYyzZs+3LBJ6sJUhhUAmi8OrkgewGEv0Xc+4I1N76Jb/bVoigAAnhMSsSgnwj080lFQ4mRj73V0/YaFeQBYjRJuoCeEsTuYwE6q0GG83XHM6oLcRQB4XRKPciekiDu5m07KrmHcv3Hs0IL7DgCFKROZQyitXT2/dFHQi2TfoXXutYb7AACKEhOdJCiwNz3BSVHRWmTganXueYb7ABV9EjGTJEynN2e7SYDMWpfdaq7tecL7ACdYEkV0JGKNN36nSZe+WrDUasfoed37ADUmEldCJHZdN5V2SbGOWsylauW7ef3PADkAE1sSKHknPZc8UbNQZM1jdeZ0hv2FDjIAK1QRR3MjY5M2fbBIlctZreVpwv14Jy4ARU4PYmshfogzl6NDsLxTx9Ri3epwPSMAXkINe18dmXsttJY7za9K5sdX/d1k");for(let n=0;n<=255;++n){const s=3*(n>>1),o=new m(t.charCodeAt(s),t.charCodeAt(s+1),t.charCodeAt(s+2));e[n]=o,g[n]=`#${(o.r<<16|o.g<<8|o.b).toString(16).padStart(6,"0")}`}return e}(),n=atob("yMiISDgodngMDIp6alpKOkhISHiImKi4xsbGxu7ubGxGRkZGPj6cnIaGSEjk5CgoODhISGhoeHiKakp6msbGxsbu7mxsKCgoKAAoKDgQEAYDAQAABgEEAgAKAAIQBBACBEAQABCCRAAAQJACCECACAAkgAAAAIQAiCAIAAJAEABACEAEAEgCAEQAQAQgCQAAAwcOGfACAAAGA85xAAQAAExGIx8CAQgAECEiJBQPDABAgoRkHwYAAEQkFA8DAAAANh0CBAoEAAAJHjIkCAoAAAKfsuRIECQAn4+HiJBkAABPmIyHiHAEACdMmIyHSDIABEQkIyMUCAAgJCgkIycYABAgSERCRz8AAAAAAQEAAAAAAAMFAwAAAAAGCQkJBgAAIAQRgBRCkABABBKgFECEAAAgFGgIFCAAAAAQKGzGggAAgoLWbAAAAABEgoLGfBB8ZGRkZGRkZHwAGBgYGBgYGBg4AHxMTEA8DExMfAB8TEwMOAxMTHwADAx+TExMTExMAHxMTAwMfEBMfAB8TExMfEBMTHwAMDAwGBgMTEx8AHxMTEx8ZGRkfAB8TEwMfExMTHwAgCAQUEGEiEJACAQBgSIRRA=="),s=[];for(let e=0;e<121;++e)s.push(T(1,29,(n=>{for(let s=0,o=120===e?76:140+e&255;s<29;++s)S(n,0,s,t[255&o]),s<6&&(o-=2)})).then((({imageBitmap:t})=>v[e]=t)));for(let o=0;o<62;++o){const i=t[0===o?76:194+o];s.push(T(3,5,(t=>{const s=e.BUNKER_GFX+5;for(let e=0;e<5;++e){const o=n.charCodeAt(s-e);for(let n=0,s=32;n<3;++n,s>>=1)o&s&&S(t,n,e,i)}})).then((({imageBitmap:e})=>y[o]=e)))}for(let o=0;o<256;++o){const i=t[o];w[o]=new Array(10);for(let t=0;t<10;++t)s.push(T(6,9,(s=>{const o=e.DIGITS_GFX+10*(t+1)-2;for(let e=0;e<9;++e){const t=n.charCodeAt(o-e);for(let n=0,o=64;n<6;++n,o>>=1)t&o&&S(s,n,e,i)}})).then((({imageBitmap:e})=>w[o][t]=e)))}for(let e=0;e<6;++e)E[e]=new Array(3);for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);x[o]=new Array(6);for(let r=0;r<6;++r){const a=e.DEMON_GFX+24*r;x[o][r]=new Array(3);for(let e=0;e<3;++e){const l=a+(e<<3);s.push(T(16,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(l+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&(S(e,t,7-s,o),S(e,15-t,7-s,o))}})).then((({imageBitmap:t,imageData:n})=>{x[o][r][e]=t,0===o&&(E[r][e]=L(n))})))}}}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);A[o]=new Array(2);for(let r=0;r<2;++r){const a=0===r?e.DEMON_EXPLODES_GFX:e.DEMON_SPLITS_GFX;A[o][r]=new Array(3);for(let e=0;e<3;++e){const l=a+(e<<3);s.push(T(16,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(l+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&(S(e,t,7-s,o),S(e,15-t,7-s,o))}})).then((({imageBitmap:t})=>A[o][r][2-e]=t)))}}}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);M[o]=new Array(3);for(let r=0;r<3;++r){const a=e.DEMON_EXPLODES_GFX+(r<<3);M[o][r]=new Array(2);for(let e=0;e<2;++e)s.push(T(8,8,(s=>{for(let o=0;o<8;++o){const r=t[n.charCodeAt(i+o)],l=n.charCodeAt(a+o);for(let t=0,n=128;t<8;++t,n>>=1)l&n&&S(s,1===e?7-t:t,7-o,r)}})).then((({imageBitmap:t})=>M[o][r][e]=t)))}}for(let t=0;t<16;++t){D[t]=[];const s=n.charCodeAt(e.DEMON_SHOTS+t);for(let e=0,n=128;e<8;++e,n>>=1)s&n&&D[t].push(e)}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);b[o]=new Array(3);for(let r=0;r<3;++r){const a=e.SPLIT_DEMON_GFX+(r<<3);s.push(T(8,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(a+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&S(e,t,7-s,o)}})).then((({imageBitmap:e,imageData:t})=>{b[o][r]=e,0===o&&(B[r]=L(t))})))}}for(let o=0;o<7;++o){const i=e.DEMON_COLS+(o<<3);k[o]=new Array(3);for(let r=0;r<3;++r){const a=e.DEMON_SPLITS_GFX+(r<<3);s.push(T(8,8,(e=>{for(let s=0;s<8;++s){const o=t[n.charCodeAt(i+s)],r=n.charCodeAt(a+s);for(let t=0,n=128;t<8;++t,n>>=1)r&n&&S(e,t,7-s,o)}})).then((({imageBitmap:e})=>k[o][2-r]=e)))}}const o=t[86];s.push(T(7,12,(t=>{const s=e.CANNON_GFX+11;for(let e=0;e<12;++e){const i=n.charCodeAt(s-e);for(let n=0,s=128;n<7;++n,s>>=1)i&s&&S(t,n,e,o)}})).then((({imageBitmap:e,imageData:t})=>{C=e,O=L(t)})));for(let o=0;o<8;++o){const i=e.CANNON_EXPLODES_GFX+5*o;s.push(T(16,34,(s=>{for(let o=0;o<5;++o){const r=t[n.charCodeAt(e.CANNON_EXPLODES_COLS+o)],a=32-(o<<3),l=n.charCodeAt(i+o);for(let e=0,t=128;e<8;++e,t>>=1)l&t&&(S(s,e,a,r),S(s,15-e,a,r),S(s,e,a+1,r),S(s,15-e,a+1,r))}})).then((({imageBitmap:e})=>I[o]=e)))}await Promise.all(s)}().then((()=>{window.removeEventListener("resize",wt),window.removeEventListener("touchmove",yt),"serviceWorker"in navigator&&navigator.serviceWorker.removeEventListener("message",gt),lt()}))}),10)}))}function yt(e){e.preventDefault()}function wt(){const e=document.getElementById("progress-container"),t=document.getElementById("progress-div");e.style.width=e.style.height="",e.style.left=e.style.top="",e.style.display="none",t.style.top=t.style.left=t.style.transform="",t.style.display="none";const n=window.innerWidth,s=window.innerHeight;if(ft=n>=s,e.style.left="0px",e.style.top="0px",e.style.width=`${n}px`,e.style.height=`${s}px`,e.style.display="block",t.style.display="flex",ft){const e=t.getBoundingClientRect();t.style.left=(n-e.width)/2+"px",t.style.top=(s-e.height)/2+"px"}else{t.style.transform="rotate(-90deg)";const e=t.getBoundingClientRect();t.style.left=(n-e.height)/2+"px",t.style.top=(s-e.width)/2+"px"}}let xt=!1;function Et(e){e.preventDefault()}function At(){const e=document.getElementById("death-div");e.style.top=e.style.left=e.style.transform="",e.style.display="none";const t=window.innerWidth,n=window.innerHeight;if(xt=t>=n,e.style.display="flex",xt){const s=e.getBoundingClientRect();e.style.left=(t-s.width)/2+"px",e.style.top=(n-s.height)/2+"px"}else{e.style.transform="rotate(-90deg)";const s=e.getBoundingClientRect();e.style.left=(t-s.height)/2+"px",e.style.top=(n-s.width)/2+"px"}}function Mt(){window.addEventListener("error",(e=>{console.error(`Caught in global handler: ${e.message}`,{source:e.filename,lineno:e.lineno,colno:e.colno,error:e.error}),e.preventDefault(),window.addEventListener("resize",At),window.addEventListener("touchmove",Et,{passive:!1}),document.getElementById("main-content").innerHTML='<div id="death-div"><span id="fatal-error">&#x1F480;</span></div>',At()})),window.addEventListener("unhandledrejection",(e=>e.preventDefault())),document.addEventListener("dblclick",(e=>e.preventDefault()),{passive:!1}),window.addEventListener("resize",wt),window.addEventListener("touchmove",yt,{passive:!1}),document.getElementById("main-content").innerHTML='\n            <div id="progress-container">\n                <div id="progress-div">\n                    <progress id="loading-progress" value="0" max="100"></progress>\n                </div>\n            </div>',mt=document.getElementById("loading-progress"),"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",gt),wt(),async function(){for(let t=s-1;t>=0;--t)try{const t=await fetch("resources.zip");if(!t.ok)continue;const n=t.headers.get("Content-Length");if(!n)continue;const s=parseInt(n);if(isNaN(s)||s<=0)continue;const o=t.body;if(null===o)continue;const i=o.getReader(),r=[];let a=0;for(;;){const{done:t,value:n}=await i.read();if(t)break;r.push(n),a+=n.length,e=a/s,mt.value=100*e,pt("#0075FF")}const l=new Uint8Array(a);let h=0;return r.forEach((e=>{l.set(e,h),h+=e.length})),l}catch(e){if(0===t)throw e}var e;throw new Error("Failed to fetch.")}().then(vt)}}}]);