(()=>{"use strict";var e,t,r,n,o={},i={};function a(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={exports:{}};return o[e](r,r.exports,a),r.exports}function c(e){a.e(524).then(a.bind(a,572)).then((t=>{clearInterval(e),t.init()}))}a.m=o,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var o=Object.create(null);a.r(o);var i={};e=e||[null,t({}),t([]),t(t)];for(var c=2&n&&r;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,a.d(o,i),o},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[])),a.u=e=>({211:"jszip",524:"app"}[e]+".bundle.js"),a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},n="demon-attack-js:",a.l=(e,t,o,i)=>{if(r[e])r[e].push(t);else{var c,u;if(void 0!==o)for(var l=document.getElementsByTagName("script"),d=0;d<l.length;d++){var s=l[d];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==n+o){c=s;break}}c||(u=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.setAttribute("data-webpack",n+o),c.src=e),r[e]=[t];var p=(t,n)=>{c.onerror=c.onload=null,clearTimeout(f);var o=r[e];if(delete r[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(n))),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=p.bind(null,c.onerror),c.onload=p.bind(null,c.onload),u&&document.head.appendChild(c)}},a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&(!e||!/^http(s?):/.test(e));)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{var e={547:0};a.f.j=(t,r)=>{var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise(((r,o)=>n=e[t]=[r,o]));r.push(n[2]=o);var i=a.p+a.u(t),c=new Error;a.l(i,(r=>{if(a.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",c.name="ChunkLoadError",c.type=o,c.request=i,n[1](c)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,o,[i,c,u]=r,l=0;if(i.some((t=>0!==e[t]))){for(n in c)a.o(c,n)&&(a.m[n]=c[n]);u&&u(a)}for(t&&t(r);l<i.length;l++)o=i[l],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0},r=self.webpackChunkdemon_attack_js=self.webpackChunkdemon_attack_js||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("main-content").innerHTML='<div id="loading-div" class="loading-container">...</div>';const e=document.getElementById("loading-div"),t=window.setInterval((()=>{e.textContent="..."===e.textContent?"":e.textContent+"."}),400);setTimeout((()=>function(e){"serviceWorker"in navigator?navigator.serviceWorker.register("sw.bundle.js").then((()=>c(e))):c(e)}(t)),10)}))})();