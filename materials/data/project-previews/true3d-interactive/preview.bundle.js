function $s(i){let e=!0,t,n,r=()=>{e&&(e=!1,cancelAnimationFrame(t),clearTimeout(n),i())};return t=requestAnimationFrame(()=>{t=requestAnimationFrame(r)}),n=setTimeout(r,120),()=>{e=!1,cancelAnimationFrame(t),clearTimeout(n)}}async function Oh(i,e={}){if(typeof DecompressionStream=="function")try{let n=await fetch(`${i}.gz`,e);if(n.ok)return n.headers.get("content-encoding")?.includes("gzip")?n.json():await new Response(n.body.pipeThrough(new DecompressionStream("gzip"))).json()}catch(n){if(n.name==="AbortError")throw n}let t=await fetch(i,e);if(!t.ok)throw new Error(`${i}: ${t.status}`);return t.json()}function dm({width:i=1024,coarse:e=!1,pixelRatio:t=1,floatColor:n=!0,maxTextures:r=16}={}){let s=e||i<=768;return{singleScene:s,depthCompositing:!s&&n&&r>=12,pixelRatio:Math.min(t,s?1.5:2),shadowSize:s?1024:2048}}function Lc(i={}){return dm({width:window.innerWidth,coarse:matchMedia("(pointer: coarse)").matches,pixelRatio:window.devicePixelRatio||1,...i})}var bn=Object.freeze({shoulder:"#477db8",hip:"#b67942",xfactor:"#8d69b3",bend:"#4a9488",sideTilt:"#b76f86"});var js={"geometric-rotations":{xfactor:!0,groups:[{id:"shoulder",label:"Shoulder",type:"geometric",subtype:"shoulder_turn_tilt",keys:["turn","tilt"],labels:{turn:"Shoulder turn",tilt:"Shoulder tilt"},color:bn.shoulder,shape:"circle",planeKeys:["turn"]},{id:"hip",label:"Hip",type:"geometric",subtype:"hip_turn_tilt",keys:["turn","tilt"],labels:{turn:"Hip turn",tilt:"Hip tilt"},color:bn.hip,shape:"circle",planeKeys:["turn"]}]},"geometric-spine":{groups:[{id:"bend",label:"Spine bend",type:"geometric",subtype:"spine_bend_tilt",keys:["bend"],labels:{bend:"Spine bend"},color:bn.bend,shape:"square",horizontalScale:1.4,verticalScale:1.7,planeKeys:["bend"]},{id:"side-tilt",label:"Spine side tilt",type:"geometric",subtype:"spine_bend_tilt",keys:["tilt"],labels:{tilt:"Spine side tilt"},color:bn.sideTilt,shape:"square",horizontalScale:1.4,verticalScale:1.7,planeKeys:["tilt"]}]},"hip-translation":{combined:!0,unit:" units",groups:[...[["sway","Sway","#7540c8"],["thrust","Thrust","#e69a00"],["lift","Lift","#009eaf"]].map(([i,e,t])=>({id:i,label:e,color:t,type:"position",subtype:"hip_sway_thrust_lift",keys:[i],labels:{[i]:e}}))]},"body-turns":{groups:[{id:"shoulder",label:"Shoulder turn",type:"kinematic",subtype:"shoulder_turn_on_spine_plane",keys:["turn"],labels:{turn:"Shoulder turn"},color:bn.shoulder,shape:"circle",planeKeys:["turn"]},{id:"hip",label:"Hip turn",type:"kinematic",subtype:"hip_turn_on_spine_plane",keys:["turn"],labels:{turn:"Hip turn"},color:bn.hip,shape:"circle",planeKeys:["turn"]}]}};function zh(i){let e=i.toLowerCase();return e==="absolute hip sway thrust and lift"?"hip-translation":e.startsWith("absolute hip, shoulder rotations")?"geometric-rotations":["geometric spine bend and side tilt","absolute spine bend and tilt"].includes(e)?"geometric-spine":["body rotation hip and shoulder turn","relative hip and shoulder rotation"].includes(e)?"body-turns":null}function Bh({streams:i,mapping:e,present:t,onDrop:n=()=>{},timeoutMs:r=2e3}){let s=new Set,o=new Set,a=!1,c=!1;async function l(h,p){let f=e[h.name]?.[p];if(!Number.isInteger(f))throw new Error(`Invalid sync frame: ${h.name}/${p}`);let g;try{let x=await Promise.race([Promise.resolve().then(()=>h.decode(f)),new Promise((m,d)=>{g=setTimeout(()=>d(new Error(`Frame decode timed out: ${h.name}`)),r)})]);if(x!==f)throw new Error(`Decoded frame mismatch: ${h.name}, expected ${f}, got ${x}`);return{name:h.name,raw:f}}finally{clearTimeout(g)}}function u(h,p){s.delete(h),h.reset?.(),n(h.name,p)}return{get busy(){return a},async advance(h){if(c||a)return!1;for(let f of i)f.ready()&&!s.has(f)&&!o.has(f)&&(o.add(f),l(f,h).then(()=>{c||s.add(f)},g=>{c||u(f,g)}).finally(()=>o.delete(f)));let p=i.filter(f=>s.has(f)&&f.ready());if(!p.length)return t(h,[]),!0;a=!0;try{let f=await Promise.allSettled(p.map(x=>l(x,h)));if(c)return!1;let g=[];return f.forEach((x,m)=>{x.status==="fulfilled"?g.push(x.value):u(p[m],x.reason)}),t(h,g),!0}finally{a=!1}},dispose(){c=!0,i.forEach(h=>h.reset?.())}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Uu="170";var fm=0,kh=1,pm=2;var Kd=1,Fu=2,Yi=3,pr=0,Fn=1,Vt=2,Ci=0,gs=1,Hh=2,Vh=3,Gh=4,mm=5,Or=100,gm=101,xm=102,ym=103,_m=104,vm=200,bm=201,Mm=202,wm=203,dl=204,fl=205,Sm=206,Em=207,Am=208,Tm=209,Rm=210,Cm=211,Pm=212,Im=213,Lm=214,pl=0,ml=1,gl=2,vs=3,xl=4,yl=5,_l=6,vl=7,Qd=0,Dm=1,Um=2,Pi=0,Fm=1,Nm=2,Om=3,Nu=4,zm=5,Bm=6,km=7;var ef=300,bs=301,Ms=302,uo=303,bl=304,Za=306,Ml=1e3,kr=1001,wl=1002,jn=1003,Hm=1004;var Yo=1005;var $n=1006,Dc=1007;var Hr=1008;var Ji=1009,tf=1010,nf=1011,ho=1012,Ou=1013,Ki=1014,Ri=1015,vr=1016,zu=1017,Bu=1018,ws=1020,rf=35902,sf=1021,of=1022,yi=1023,af=1024,cf=1025,xs=1026,Ss=1027,ku=1028,Hu=1029,lf=1030,Vu=1031;var Gu=1033,_a=33776,va=33777,ba=33778,Ma=33779,Sl=35840,El=35841,Al=35842,Tl=35843,Rl=36196,Cl=37492,Pl=37496,Il=37808,Ll=37809,Dl=37810,Ul=37811,Fl=37812,Nl=37813,Ol=37814,zl=37815,Bl=37816,kl=37817,Hl=37818,Vl=37819,Gl=37820,Wl=37821,wa=36492,Xl=36494,ql=36495,uf=36283,Yl=36284,$l=36285,jl=36286;var Sa=2300,Zl=2301,Uc=2302,Wh=2400,Xh=2401,qh=2402;var Vm=3200,Gm=3201;var hf=0,Wm=1,fr="",xn="srgb",Is="srgb-linear",Ja="linear",Bt="srgb";var Qr=7680;var Yh=519,Xm=512,qm=513,Ym=514,df=515,$m=516,jm=517,Zm=518,Jm=519,$h=35044;var jh="300 es",ji=2e3,Ea=2001,mr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zh=1234567,so=Math.PI/180,fo=180/Math.PI;function Ls(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]).toLowerCase()}function an(i,e,t){return Math.max(e,Math.min(t,i))}function Wu(i,e){return(i%e+e)%e}function Km(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Qm(i,e,t){return i!==e?(t-i)/(e-i):0}function oo(i,e,t){return(1-t)*i+t*e}function eg(i,e,t,n){return oo(i,e,1-Math.exp(-t*n))}function tg(i,e=1){return e-Math.abs(Wu(i,e*2)-e)}function ng(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ig(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function rg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function sg(i,e){return i+Math.random()*(e-i)}function og(i){return i*(.5-Math.random())}function ag(i){i!==void 0&&(Zh=i);let e=Zh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cg(i){return i*so}function lg(i){return i*fo}function ug(i){return(i&i-1)===0&&i!==0}function hg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function dg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fg(i,e,t,n,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),p=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,c*h,c*p,a*l);break;case"YZY":i.set(c*p,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*p,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ps(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var On={DEG2RAD:so,RAD2DEG:fo,generateUUID:Ls,clamp:an,euclideanModulo:Wu,mapLinear:Km,inverseLerp:Qm,lerp:oo,damp:eg,pingpong:tg,smoothstep:ng,smootherstep:ig,randInt:rg,randFloat:sg,randFloatSpread:og,seededRandom:ag,degToRad:cg,radToDeg:lg,isPowerOfTwo:ug,ceilPowerOfTwo:hg,floorPowerOfTwo:dg,setQuaternionFromProperEuler:fg,normalize:Cn,denormalize:ps},ke=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(an(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dt=class i{constructor(e,t,n,r,s,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],p=n[2],f=n[5],g=n[8],x=r[0],m=r[3],d=r[6],v=r[1],y=r[4],_=r[7],w=r[2],E=r[5],A=r[8];return s[0]=o*x+a*v+c*w,s[3]=o*m+a*y+c*E,s[6]=o*d+a*_+c*A,s[1]=l*x+u*v+h*w,s[4]=l*m+u*y+h*E,s[7]=l*d+u*_+h*A,s[2]=p*x+f*v+g*w,s[5]=p*m+f*y+g*E,s[8]=p*d+f*_+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,p=a*c-u*s,f=l*s-o*c,g=t*h+n*p+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=h*x,e[1]=(r*l-u*n)*x,e[2]=(a*n-r*o)*x,e[3]=p*x,e[4]=(u*t-r*c)*x,e[5]=(r*s-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Fc.makeScale(e,t)),this}rotate(e){return this.premultiply(Fc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Fc=new dt;function ff(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Aa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pg(){let i=Aa("canvas");return i.style.display="block",i}var Jh={};function io(i){i in Jh||(Jh[i]=!0,console.warn(i))}function mg(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function gg(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function xg(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Tt={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Bt&&(i.r=Zi(i.r),i.g=Zi(i.g),i.b=Zi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Bt&&(i.r=ys(i.r),i.g=ys(i.g),i.b=ys(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fr?Ja:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Zi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Kh=[.64,.33,.3,.6,.15,.06],Qh=[.2126,.7152,.0722],ed=[.3127,.329],td=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nd=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Tt.define({[Is]:{primaries:Kh,whitePoint:ed,transfer:Ja,toXYZ:td,fromXYZ:nd,luminanceCoefficients:Qh,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:Kh,whitePoint:ed,transfer:Bt,toXYZ:td,fromXYZ:nd,luminanceCoefficients:Qh,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}});var es,Jl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{es===void 0&&(es=Aa("canvas")),es.width=e.width,es.height=e.height;let n=es.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=es}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Aa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Zi(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zi(t[n]/255)*255):t[n]=Zi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},yg=0,Ta=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=Ls(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Nc(r[o].image)):s.push(Nc(r[o]))}else s=Nc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Nc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var _g=0,Sn=class i extends mr{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=kr,r=kr,s=$n,o=Hr,a=yi,c=Ji,l=i.DEFAULT_ANISOTROPY,u=fr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=Ls(),this.name="",this.source=new Ta(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ef)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ml:e.x=e.x-Math.floor(e.x);break;case kr:e.x=e.x<0?0:1;break;case wl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ml:e.y=e.y-Math.floor(e.y);break;case kr:e.y=e.y<0?0:1;break;case wl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=ef;Sn.DEFAULT_ANISOTROPY=1;var Zt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],u=c[4],h=c[8],p=c[1],f=c[5],g=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(u-p)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,_=(f+1)/2,w=(d+1)/2,E=(u+p)/4,A=(h+x)/4,T=(g+m)/4;return y>_&&y>w?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=E/n,s=A/n):_>w?_<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),n=E/r,s=T/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=A/s,r=T/s),this.set(n,r,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(p-u)*(p-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-x)/v,this.z=(p-u)/v,this.w=Math.acos((l+f+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Kl=class extends mr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Zt(0,0,e,t),this.scissorTest=!1,this.viewport=new Zt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Sn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Ta(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ni=class extends Kl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ra=class extends Sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jn,this.minFilter=jn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ql=class extends Sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jn,this.minFilter=jn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Jt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3],p=s[o+0],f=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=p,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(h!==x||c!==p||l!==f||u!==g){let m=1-a,d=c*p+l*f+u*g+h*x,v=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){let w=Math.sqrt(y),E=Math.atan2(w,d*v);m=Math.sin(m*E)/w,a=Math.sin(a*E)/w}let _=a*v;if(c=c*m+p*_,l=l*m+f*_,u=u*m+g*_,h=h*m+x*_,m===1-a){let w=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=w,l*=w,u*=w,h*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],p=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+u*h+c*f-l*p,e[t+1]=c*g+u*p+l*h-a*f,e[t+2]=l*g+u*f+a*p-c*h,e[t+3]=u*g-a*h-c*p-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),p=c(n/2),f=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=p*u*h+l*f*g,this._y=l*f*h-p*u*g,this._z=l*u*g+p*f*h,this._w=l*u*h-p*f*g;break;case"YXZ":this._x=p*u*h+l*f*g,this._y=l*f*h-p*u*g,this._z=l*u*g-p*f*h,this._w=l*u*h+p*f*g;break;case"ZXY":this._x=p*u*h-l*f*g,this._y=l*f*h+p*u*g,this._z=l*u*g+p*f*h,this._w=l*u*h-p*f*g;break;case"ZYX":this._x=p*u*h-l*f*g,this._y=l*f*h+p*u*g,this._z=l*u*g-p*f*h,this._w=l*u*h+p*f*g;break;case"YZX":this._x=p*u*h+l*f*g,this._y=l*f*h+p*u*g,this._z=l*u*g-p*f*h,this._w=l*u*h-p*f*g;break;case"XZY":this._x=p*u*h-l*f*g,this._y=l*f*h-p*u*g,this._z=l*u*g+p*f*h,this._w=l*u*h+p*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],p=n+a+h;if(p>0){let f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(u-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(an(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,p=Math.sin(t*u)/l;return this._w=o*h+this._w*p,this._x=n*h+this._x*p,this._y=r*h+this._y*p,this._z=s*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(id.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(id.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Oc.copy(this).projectOnVector(e),this.sub(Oc)}reflect(e){return this.sub(Oc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(an(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Oc=new D,id=new Jt,ii=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,mi):mi.fromBufferAttribute(s,o),mi.applyMatrix4(e.matrixWorld),this.expandByPoint(mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$o.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$o.copy(n.boundingBox)),$o.applyMatrix4(e.matrixWorld),this.union($o)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mi),mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),jo.subVectors(this.max,Zs),ts.subVectors(e.a,Zs),ns.subVectors(e.b,Zs),is.subVectors(e.c,Zs),ar.subVectors(ns,ts),cr.subVectors(is,ns),Pr.subVectors(ts,is);let t=[0,-ar.z,ar.y,0,-cr.z,cr.y,0,-Pr.z,Pr.y,ar.z,0,-ar.x,cr.z,0,-cr.x,Pr.z,0,-Pr.x,-ar.y,ar.x,0,-cr.y,cr.x,0,-Pr.y,Pr.x,0];return!zc(t,ts,ns,is,jo)||(t=[1,0,0,0,1,0,0,0,1],!zc(t,ts,ns,is,jo))?!1:(Zo.crossVectors(ar,cr),t=[Zo.x,Zo.y,Zo.z],zc(t,ts,ns,is,jo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Vi=[new D,new D,new D,new D,new D,new D,new D,new D],mi=new D,$o=new ii,ts=new D,ns=new D,is=new D,ar=new D,cr=new D,Pr=new D,Zs=new D,jo=new D,Zo=new D,Ir=new D;function zc(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ir.fromArray(i,s);let a=r.x*Math.abs(Ir.x)+r.y*Math.abs(Ir.y)+r.z*Math.abs(Ir.z),c=e.dot(Ir),l=t.dot(Ir),u=n.dot(Ir);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var vg=new ii,Js=new D,Bc=new D,gr=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):vg.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);let t=Js.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Js,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(Bc)),this.expandByPoint(Js.copy(e.center).sub(Bc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Gi=new D,kc=new D,Jo=new D,lr=new D,Hc=new D,Ko=new D,Vc=new D,po=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gi.copy(this.origin).addScaledVector(this.direction,t),Gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){kc.copy(e).add(t).multiplyScalar(.5),Jo.copy(t).sub(e).normalize(),lr.copy(this.origin).sub(kc);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Jo),a=lr.dot(this.direction),c=-lr.dot(Jo),l=lr.lengthSq(),u=Math.abs(1-o*o),h,p,f,g;if(u>0)if(h=o*c-a,p=o*a-c,g=s*u,h>=0)if(p>=-g)if(p<=g){let x=1/u;h*=x,p*=x,f=h*(h+o*p+2*a)+p*(o*h+p+2*c)+l}else p=s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*c)+l;else p=-s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*c)+l;else p<=-g?(h=Math.max(0,-(-o*s+a)),p=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+p*(p+2*c)+l):p<=g?(h=0,p=Math.min(Math.max(-s,-c),s),f=p*(p+2*c)+l):(h=Math.max(0,-(o*s+a)),p=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+p*(p+2*c)+l);else p=o>0?-s:s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(kc).addScaledVector(Jo,p),f}intersectSphere(e,t){Gi.subVectors(e.center,this.origin);let n=Gi.dot(this.direction),r=Gi.dot(Gi)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,r=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,r=(e.min.x-p.x)*l),u>=0?(s=(e.min.y-p.y)*u,o=(e.max.y-p.y)*u):(s=(e.max.y-p.y)*u,o=(e.min.y-p.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-p.z)*h,c=(e.max.z-p.z)*h):(a=(e.max.z-p.z)*h,c=(e.min.z-p.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gi)!==null}intersectTriangle(e,t,n,r,s){Hc.subVectors(t,e),Ko.subVectors(n,e),Vc.crossVectors(Hc,Ko);let o=this.direction.dot(Vc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;lr.subVectors(this.origin,e);let c=a*this.direction.dot(Ko.crossVectors(lr,Ko));if(c<0)return null;let l=a*this.direction.dot(Hc.cross(lr));if(l<0||c+l>o)return null;let u=-a*lr.dot(Vc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},bt=class i{constructor(e,t,n,r,s,o,a,c,l,u,h,p,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,h,p,f,g,x,m)}set(e,t,n,r,s,o,a,c,l,u,h,p,f,g,x,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=p,d[3]=f,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/rs.setFromMatrixColumn(e,0).length(),s=1/rs.setFromMatrixColumn(e,1).length(),o=1/rs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let p=o*u,f=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=p-x*l,t[9]=-a*c,t[2]=x-p*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let p=c*u,f=c*h,g=l*u,x=l*h;t[0]=p+x*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=x+p*a,t[10]=o*c}else if(e.order==="ZXY"){let p=c*u,f=c*h,g=l*u,x=l*h;t[0]=p-x*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=x-p*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let p=o*u,f=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=g*l-f,t[8]=p*l+x,t[1]=c*h,t[5]=x*l+p,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let p=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-p*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*h+g,t[10]=p-x*h}else if(e.order==="XZY"){let p=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=p*h+x,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=x*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bg,e,Mg)}lookAt(e,t,n){let r=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),ur.crossVectors(n,qn),ur.lengthSq()===0&&(Math.abs(n.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),ur.crossVectors(n,qn)),ur.normalize(),Qo.crossVectors(qn,ur),r[0]=ur.x,r[4]=Qo.x,r[8]=qn.x,r[1]=ur.y,r[5]=Qo.y,r[9]=qn.y,r[2]=ur.z,r[6]=Qo.z,r[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],p=n[9],f=n[13],g=n[2],x=n[6],m=n[10],d=n[14],v=n[3],y=n[7],_=n[11],w=n[15],E=r[0],A=r[4],T=r[8],b=r[12],M=r[1],C=r[5],F=r[9],H=r[13],q=r[2],X=r[6],I=r[10],ee=r[14],W=r[3],z=r[7],V=r[11],k=r[15];return s[0]=o*E+a*M+c*q+l*W,s[4]=o*A+a*C+c*X+l*z,s[8]=o*T+a*F+c*I+l*V,s[12]=o*b+a*H+c*ee+l*k,s[1]=u*E+h*M+p*q+f*W,s[5]=u*A+h*C+p*X+f*z,s[9]=u*T+h*F+p*I+f*V,s[13]=u*b+h*H+p*ee+f*k,s[2]=g*E+x*M+m*q+d*W,s[6]=g*A+x*C+m*X+d*z,s[10]=g*T+x*F+m*I+d*V,s[14]=g*b+x*H+m*ee+d*k,s[3]=v*E+y*M+_*q+w*W,s[7]=v*A+y*C+_*X+w*z,s[11]=v*T+y*F+_*I+w*V,s[15]=v*b+y*H+_*ee+w*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],p=e[10],f=e[14],g=e[3],x=e[7],m=e[11],d=e[15];return g*(+s*c*h-r*l*h-s*a*p+n*l*p+r*a*f-n*c*f)+x*(+t*c*f-t*l*p+s*o*p-r*o*f+r*l*u-s*c*u)+m*(+t*l*h-t*a*f-s*o*h+n*o*f+s*a*u-n*l*u)+d*(-r*a*u-t*c*h+t*a*p+r*o*h-n*o*p+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],p=e[10],f=e[11],g=e[12],x=e[13],m=e[14],d=e[15],v=h*m*l-x*p*l+x*c*f-a*m*f-h*c*d+a*p*d,y=g*p*l-u*m*l-g*c*f+o*m*f+u*c*d-o*p*d,_=u*x*l-g*h*l+g*a*f-o*x*f-u*a*d+o*h*d,w=g*h*c-u*x*c-g*a*p+o*x*p+u*a*m-o*h*m,E=t*v+n*y+r*_+s*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return e[0]=v*A,e[1]=(x*p*s-h*m*s-x*r*f+n*m*f+h*r*d-n*p*d)*A,e[2]=(a*m*s-x*c*s+x*r*l-n*m*l-a*r*d+n*c*d)*A,e[3]=(h*c*s-a*p*s-h*r*l+n*p*l+a*r*f-n*c*f)*A,e[4]=y*A,e[5]=(u*m*s-g*p*s+g*r*f-t*m*f-u*r*d+t*p*d)*A,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*d-t*c*d)*A,e[7]=(o*p*s-u*c*s+u*r*l-t*p*l-o*r*f+t*c*f)*A,e[8]=_*A,e[9]=(g*h*s-u*x*s-g*n*f+t*x*f+u*n*d-t*h*d)*A,e[10]=(o*x*s-g*a*s+g*n*l-t*x*l-o*n*d+t*a*d)*A,e[11]=(u*a*s-o*h*s-u*n*l+t*h*l+o*n*f-t*a*f)*A,e[12]=w*A,e[13]=(u*x*r-g*h*r+g*n*p-t*x*p-u*n*m+t*h*m)*A,e[14]=(g*a*r-o*x*r-g*n*c+t*x*c+o*n*m-t*a*m)*A,e[15]=(o*h*r-u*a*r+u*n*c-t*h*c-o*n*p+t*a*p)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,h=a+a,p=s*l,f=s*u,g=s*h,x=o*u,m=o*h,d=a*h,v=c*l,y=c*u,_=c*h,w=n.x,E=n.y,A=n.z;return r[0]=(1-(x+d))*w,r[1]=(f+_)*w,r[2]=(g-y)*w,r[3]=0,r[4]=(f-_)*E,r[5]=(1-(p+d))*E,r[6]=(m+v)*E,r[7]=0,r[8]=(g+y)*A,r[9]=(m-v)*A,r[10]=(1-(p+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=rs.set(r[0],r[1],r[2]).length(),o=rs.set(r[4],r[5],r[6]).length(),a=rs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],gi.copy(this);let l=1/s,u=1/o,h=1/a;return gi.elements[0]*=l,gi.elements[1]*=l,gi.elements[2]*=l,gi.elements[4]*=u,gi.elements[5]*=u,gi.elements[6]*=u,gi.elements[8]*=h,gi.elements[9]*=h,gi.elements[10]*=h,t.setFromRotationMatrix(gi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=ji){let c=this.elements,l=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r),f,g;if(a===ji)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ea)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=ji){let c=this.elements,l=1/(t-e),u=1/(n-r),h=1/(o-s),p=(t+e)*l,f=(n+r)*u,g,x;if(a===ji)g=(o+s)*h,x=-2*h;else if(a===Ea)g=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},rs=new D,gi=new bt,bg=new D(0,0,0),Mg=new D(1,1,1),ur=new D,Qo=new D,qn=new D,rd=new bt,sd=new Jt,Nn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],p=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(an(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-an(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(an(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-an(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(an(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-an(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sd.setFromEuler(this),this.setFromQuaternion(sd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Nn.DEFAULT_ORDER="XYZ";var mo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},wg=0,od=new D,ss=new Jt,Wi=new bt,ea=new D,Ks=new D,Sg=new D,Eg=new Jt,ad=new D(1,0,0),cd=new D(0,1,0),ld=new D(0,0,1),ud={type:"added"},Ag={type:"removed"},os={type:"childadded",child:null},Gc={type:"childremoved",child:null},pn=class i extends mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new Nn,n=new Jt,r=new D(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new bt},normalMatrix:{value:new dt}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(ad,e)}rotateY(e){return this.rotateOnAxis(cd,e)}rotateZ(e){return this.rotateOnAxis(ld,e)}translateOnAxis(e,t){return od.copy(e).applyQuaternion(this.quaternion),this.position.add(od.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ad,e)}translateY(e){return this.translateOnAxis(cd,e)}translateZ(e){return this.translateOnAxis(ld,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ea.copy(e):ea.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wi.lookAt(Ks,ea,this.up):Wi.lookAt(ea,Ks,this.up),this.quaternion.setFromRotationMatrix(Wi),r&&(Wi.extractRotation(r.matrixWorld),ss.setFromRotationMatrix(Wi),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ud),os.child=e,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ag),Gc.child=e,this.dispatchEvent(Gc),Gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ud),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,Sg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,Eg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),p=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};pn.DEFAULT_UP=new D(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xi=new D,Xi=new D,Wc=new D,qi=new D,as=new D,cs=new D,hd=new D,Xc=new D,qc=new D,Yc=new D,$c=new Zt,jc=new Zt,Zc=new Zt,zr=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),xi.subVectors(e,t),r.cross(xi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){xi.subVectors(r,t),Xi.subVectors(n,t),Wc.subVectors(e,t);let o=xi.dot(xi),a=xi.dot(Xi),c=xi.dot(Wc),l=Xi.dot(Xi),u=Xi.dot(Wc),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;let p=1/h,f=(l*c-a*u)*p,g=(o*u-a*c)*p;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,qi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,qi.x),c.addScaledVector(o,qi.y),c.addScaledVector(a,qi.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return $c.setScalar(0),jc.setScalar(0),Zc.setScalar(0),$c.fromBufferAttribute(e,t),jc.fromBufferAttribute(e,n),Zc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector($c,s.x),o.addScaledVector(jc,s.y),o.addScaledVector(Zc,s.z),o}static isFrontFacing(e,t,n,r){return xi.subVectors(n,t),Xi.subVectors(e,t),xi.cross(Xi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xi.subVectors(this.c,this.b),Xi.subVectors(this.a,this.b),xi.cross(Xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;as.subVectors(r,n),cs.subVectors(s,n),Xc.subVectors(e,n);let c=as.dot(Xc),l=cs.dot(Xc);if(c<=0&&l<=0)return t.copy(n);qc.subVectors(e,r);let u=as.dot(qc),h=cs.dot(qc);if(u>=0&&h<=u)return t.copy(r);let p=c*h-u*l;if(p<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(as,o);Yc.subVectors(e,s);let f=as.dot(Yc),g=cs.dot(Yc);if(g>=0&&f<=g)return t.copy(s);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(cs,a);let m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return hd.subVectors(s,r),a=(h-u)/(h-u+(f-g)),t.copy(r).addScaledVector(hd,a);let d=1/(m+x+p);return o=x*d,a=p*d,t.copy(n).addScaledVector(as,o).addScaledVector(cs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},pf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hr={h:0,s:0,l:0},ta={h:0,s:0,l:0};function Jc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Tt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Tt.workingColorSpace){if(e=Wu(e,1),t=an(t,0,1),n=an(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Jc(o,s,e+1/3),this.g=Jc(o,s,e),this.b=Jc(o,s,e-1/3)}return Tt.toWorkingColorSpace(this,r),this}setStyle(e,t=xn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xn){let n=pf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}copyLinearToSRGB(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return Tt.fromWorkingColorSpace(wn.copy(this),e),Math.round(an(wn.r*255,0,255))*65536+Math.round(an(wn.g*255,0,255))*256+Math.round(an(wn.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.fromWorkingColorSpace(wn.copy(this),t);let n=wn.r,r=wn.g,s=wn.b,o=Math.max(n,r,s),a=Math.min(n,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Tt.workingColorSpace){return Tt.fromWorkingColorSpace(wn.copy(this),t),e.r=wn.r,e.g=wn.g,e.b=wn.b,e}getStyle(e=xn){Tt.fromWorkingColorSpace(wn.copy(this),e);let t=wn.r,n=wn.g,r=wn.b;return e!==xn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(hr),this.setHSL(hr.h+e,hr.s+t,hr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hr),e.getHSL(ta);let n=oo(hr.h,ta.h,t),r=oo(hr.s,ta.s,t),s=oo(hr.l,ta.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},wn=new Je;Je.NAMES=pf;var Tg=0,xr=class extends mr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Ls(),this.name="",this.blending=gs,this.side=pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=fl,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==pr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dl&&(n.blendSrc=this.blendSrc),this.blendDst!==fl&&(n.blendDst=this.blendDst),this.blendEquation!==Or&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},$t=class extends xr{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=Qd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var nn=new D,na=new ke,Zn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$h,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)na.fromBufferAttribute(this,t),na.applyMatrix3(e),this.setXY(t,na.x,na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix3(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ps(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ps(t,this.array)),t}setX(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ps(t,this.array)),t}setY(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ps(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ps(t,this.array)),t}setW(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),r=Cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),r=Cn(r,this.array),s=Cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$h&&(e.usage=this.usage),e}};var Ca=class extends Zn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Pa=class extends Zn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var rt=class extends Zn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Rg=0,ti=new bt,Kc=new pn,ls=new D,Yn=new ii,Qs=new ii,fn=new D,Mt=class i extends mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ff(e)?Pa:Ca)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new dt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,n){return ti.makeTranslation(e,t,n),this.applyMatrix4(ti),this}scale(e,t,n){return ti.makeScale(e,t,n),this.applyMatrix4(ti),this}lookAt(e){return Kc.lookAt(e),Kc.updateMatrix(),this.applyMatrix4(Kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new rt(n,3))}else{for(let n=0,r=t.count;n<r;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Yn.setFromBufferAttribute(s),this.morphTargetsRelative?(fn.addVectors(this.boundingBox.min,Yn.min),this.boundingBox.expandByPoint(fn),fn.addVectors(this.boundingBox.max,Yn.max),this.boundingBox.expandByPoint(fn)):(this.boundingBox.expandByPoint(Yn.min),this.boundingBox.expandByPoint(Yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(Yn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Qs.setFromBufferAttribute(a),this.morphTargetsRelative?(fn.addVectors(Yn.min,Qs.min),Yn.expandByPoint(fn),fn.addVectors(Yn.max,Qs.max),Yn.expandByPoint(fn)):(Yn.expandByPoint(Qs.min),Yn.expandByPoint(Qs.max))}Yn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)fn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(fn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)fn.fromBufferAttribute(a,l),c&&(ls.fromBufferAttribute(e,l),fn.add(ls)),r=Math.max(r,n.distanceToSquared(fn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new D,c[T]=new D;let l=new D,u=new D,h=new D,p=new ke,f=new ke,g=new ke,x=new D,m=new D;function d(T,b,M){l.fromBufferAttribute(n,T),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,M),p.fromBufferAttribute(s,T),f.fromBufferAttribute(s,b),g.fromBufferAttribute(s,M),u.sub(l),h.sub(l),f.sub(p),g.sub(p);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(C),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),a[T].add(x),a[b].add(x),a[M].add(x),c[T].add(m),c[b].add(m),c[M].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let T=0,b=v.length;T<b;++T){let M=v[T],C=M.start,F=M.count;for(let H=C,q=C+F;H<q;H+=3)d(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let y=new D,_=new D,w=new D,E=new D;function A(T){w.fromBufferAttribute(r,T),E.copy(w);let b=a[T];y.copy(b),y.sub(w.multiplyScalar(w.dot(b))).normalize(),_.crossVectors(E,b);let C=_.dot(c[T])<0?-1:1;o.setXYZW(T,y.x,y.y,y.z,C)}for(let T=0,b=v.length;T<b;++T){let M=v[T],C=M.start,F=M.count;for(let H=C,q=C+F;H<q;H+=3)A(e.getX(H+0)),A(e.getX(H+1)),A(e.getX(H+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);let r=new D,s=new D,o=new D,a=new D,c=new D,l=new D,u=new D,h=new D;if(e)for(let p=0,f=e.count;p<f;p+=3){let g=e.getX(p+0),x=e.getX(p+1),m=e.getX(p+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,f=t.count;p<f;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)fn.fromBufferAttribute(e,t),fn.normalize(),e.setXYZ(t,fn.x,fn.y,fn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,p=new l.constructor(c.length*u),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let d=0;d<u;d++)p[g++]=l[f++]}return new Zn(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){let p=l[u],f=e(p,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,p=l.length;h<p;h++){let f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],h=s[l];for(let p=0,f=h.length;p<f;p++)u.push(h[p].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},dd=new bt,Lr=new po,ia=new gr,fd=new D,ra=new D,sa=new D,oa=new D,Qc=new D,aa=new D,pd=new D,ca=new D,it=class extends pn{constructor(e=new Mt,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){aa.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],h=s[c];u!==0&&(Qc.fromBufferAttribute(h,e),o?aa.addScaledVector(Qc,u):aa.addScaledVector(Qc.sub(t),u))}t.add(aa)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(ia.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(ia,fd)===null||Lr.origin.distanceToSquared(fd)>(e.far-e.near)**2))&&(dd.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(dd),!(n.boundingBox!==null&&Lr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Lr)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,p=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){let m=p[g],d=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=v,w=y;_<w;_+=3){let E=a.getX(_),A=a.getX(_+1),T=a.getX(_+2);r=la(this,d,e,n,l,u,h,E,A,T),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,d=x;m<d;m+=3){let v=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);r=la(this,o,e,n,l,u,h,v,y,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){let m=p[g],d=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=v,w=y;_<w;_+=3){let E=_,A=_+1,T=_+2;r=la(this,d,e,n,l,u,h,E,A,T),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,d=x;m<d;m+=3){let v=m,y=m+1,_=m+2;r=la(this,o,e,n,l,u,h,v,y,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Cg(i,e,t,n,r,s,o,a){let c;if(e.side===Fn?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===pr,a),c===null)return null;ca.copy(a),ca.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ca);return l<t.near||l>t.far?null:{distance:l,point:ca.clone(),object:i}}function la(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,ra),i.getVertexPosition(c,sa),i.getVertexPosition(l,oa);let u=Cg(i,e,t,n,ra,sa,oa,pd);if(u){let h=new D;zr.getBarycoord(pd,ra,sa,oa,h),r&&(u.uv=zr.getInterpolatedAttribute(r,a,c,l,h,new ke)),s&&(u.uv1=zr.getInterpolatedAttribute(s,a,c,l,h,new ke)),o&&(u.normal=zr.getInterpolatedAttribute(o,a,c,l,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let p={a,b:c,c:l,normal:new D,materialIndex:0};zr.getNormal(ra,sa,oa,p.normal),u.face=p,u.barycoord=h}return u}var Ii=class i extends Mt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],h=[],p=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(u,3)),this.setAttribute("uv",new rt(h,2));function g(x,m,d,v,y,_,w,E,A,T,b){let M=_/A,C=w/T,F=_/2,H=w/2,q=E/2,X=A+1,I=T+1,ee=0,W=0,z=new D;for(let V=0;V<I;V++){let k=V*C-H;for(let O=0;O<X;O++){let te=O*M-F;z[x]=te*v,z[m]=k*y,z[d]=q,l.push(z.x,z.y,z.z),z[x]=0,z[m]=0,z[d]=E>0?1:-1,u.push(z.x,z.y,z.z),h.push(O/A),h.push(1-V/T),ee+=1}}for(let V=0;V<T;V++)for(let k=0;k<A;k++){let O=p+k+X*V,te=p+k+X*(V+1),U=p+(k+1)+X*(V+1),J=p+(k+1)+X*V;c.push(O,te,J),c.push(te,U,J),W+=6}a.addGroup(f,W,b),f+=W,p+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Es(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Pn(i){let e={};for(let t=0;t<i.length;t++){let n=Es(i[t]);for(let r in n)e[r]=n[r]}return e}function Pg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function mf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}var Ig={clone:Es,merge:Pn},Lg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ln=class extends xr{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lg,this.fragmentShader=Dg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=Pg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},As=class extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},dr=new D,md=new ke,gd=new ke,In=class extends As{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fo*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dr.x,dr.y).multiplyScalar(-e/dr.z),dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(dr.x,dr.y).multiplyScalar(-e/dr.z)}getViewSize(e,t){return this.getViewBounds(e,md,gd),t.subVectors(gd,md)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(so*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},us=-90,hs=1,eu=class extends pn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new In(us,hs,e,t);r.layers=this.layers,this.add(r);let s=new In(us,hs,e,t);s.layers=this.layers,this.add(s);let o=new In(us,hs,e,t);o.layers=this.layers,this.add(o);let a=new In(us,hs,e,t);a.layers=this.layers,this.add(a);let c=new In(us,hs,e,t);c.layers=this.layers,this.add(c);let l=new In(us,hs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===ji)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,p,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ia=class extends Sn{constructor(e,t,n,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:bs,super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},tu=class extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ia(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:$n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ii(5,5,5),s=new Ln({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:Ci});s.uniforms.tEquirect.value=t;let o=new it(r,s),a=t.minFilter;return t.minFilter===Hr&&(t.minFilter=$n),new eu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}},el=new D,Ug=new D,Fg=new dt,$i=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=el.subVectors(n,t).cross(Ug.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(el),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fg.getNormalMatrix(e),r=this.coplanarPoint(el).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Dr=new gr,ua=new D,go=class{constructor(e=new $i,t=new $i,n=new $i,r=new $i,s=new $i,o=new $i){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ji){let n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],h=r[6],p=r[7],f=r[8],g=r[9],x=r[10],m=r[11],d=r[12],v=r[13],y=r[14],_=r[15];if(n[0].setComponents(c-s,p-l,m-f,_-d).normalize(),n[1].setComponents(c+s,p+l,m+f,_+d).normalize(),n[2].setComponents(c+o,p+u,m+g,_+v).normalize(),n[3].setComponents(c-o,p-u,m-g,_-v).normalize(),n[4].setComponents(c-a,p-h,m-x,_-y).normalize(),t===ji)n[5].setComponents(c+a,p+h,m+x,_+y).normalize();else if(t===Ea)n[5].setComponents(a,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dr)}intersectsSprite(e){return Dr.center.set(0,0,0),Dr.radius=.7071067811865476,Dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ua.x=r.normal.x>0?e.max.x:e.min.x,ua.y=r.normal.y>0?e.max.y:e.min.y,ua.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ua)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function gf(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ng(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,h=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let p=0;for(let f=1;f<h.length;f++){let g=h[p],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++p,h[p]=x)}h.length=p+1;for(let f=0,g=h.length;f<g;f++){let x=h[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var yr=class i extends Mt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=e/a,p=t/c,f=[],g=[],x=[],m=[];for(let d=0;d<u;d++){let v=d*p-o;for(let y=0;y<l;y++){let _=y*h-s;g.push(_,-v,0),x.push(0,0,1),m.push(y/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<a;v++){let y=v+l*d,_=v+l*(d+1),w=v+1+l*(d+1),E=v+1+l*d;f.push(y,_,E),f.push(_,w,E)}this.setIndex(f),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(x,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Og=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,o0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,a0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,c0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,u0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,f0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,x0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,v0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,b0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,M0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,E0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,T0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,C0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,I0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,L0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,U0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,F0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,O0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,z0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,B0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,k0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,W0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,X0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,q0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,j0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Z0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,J0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ex=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ox=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ax=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ux=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,dx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,px=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ex=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ax=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Px=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ix=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ox=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$x=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ey=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ty=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ny=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ry=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ay=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ly=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,py=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,my=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:Og,alphahash_pars_fragment:zg,alphamap_fragment:Bg,alphamap_pars_fragment:kg,alphatest_fragment:Hg,alphatest_pars_fragment:Vg,aomap_fragment:Gg,aomap_pars_fragment:Wg,batching_pars_vertex:Xg,batching_vertex:qg,begin_vertex:Yg,beginnormal_vertex:$g,bsdfs:jg,iridescence_fragment:Zg,bumpmap_pars_fragment:Jg,clipping_planes_fragment:Kg,clipping_planes_pars_fragment:Qg,clipping_planes_pars_vertex:e0,clipping_planes_vertex:t0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:r0,color_vertex:s0,common:o0,cube_uv_reflection_fragment:a0,defaultnormal_vertex:c0,displacementmap_pars_vertex:l0,displacementmap_vertex:u0,emissivemap_fragment:h0,emissivemap_pars_fragment:d0,colorspace_fragment:f0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:x0,envmap_pars_vertex:y0,envmap_physical_pars_fragment:C0,envmap_vertex:_0,fog_vertex:v0,fog_pars_vertex:b0,fog_fragment:M0,fog_pars_fragment:w0,gradientmap_pars_fragment:S0,lightmap_pars_fragment:E0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:T0,lights_pars_begin:R0,lights_toon_fragment:P0,lights_toon_pars_fragment:I0,lights_phong_fragment:L0,lights_phong_pars_fragment:D0,lights_physical_fragment:U0,lights_physical_pars_fragment:F0,lights_fragment_begin:N0,lights_fragment_maps:O0,lights_fragment_end:z0,logdepthbuf_fragment:B0,logdepthbuf_pars_fragment:k0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:V0,map_fragment:G0,map_pars_fragment:W0,map_particle_fragment:X0,map_particle_pars_fragment:q0,metalnessmap_fragment:Y0,metalnessmap_pars_fragment:$0,morphinstance_vertex:j0,morphcolor_vertex:Z0,morphnormal_vertex:J0,morphtarget_pars_vertex:K0,morphtarget_vertex:Q0,normal_fragment_begin:ex,normal_fragment_maps:tx,normal_pars_fragment:nx,normal_pars_vertex:ix,normal_vertex:rx,normalmap_pars_fragment:sx,clearcoat_normal_fragment_begin:ox,clearcoat_normal_fragment_maps:ax,clearcoat_pars_fragment:cx,iridescence_pars_fragment:lx,opaque_fragment:ux,packing:hx,premultiplied_alpha_fragment:dx,project_vertex:fx,dithering_fragment:px,dithering_pars_fragment:mx,roughnessmap_fragment:gx,roughnessmap_pars_fragment:xx,shadowmap_pars_fragment:yx,shadowmap_pars_vertex:_x,shadowmap_vertex:vx,shadowmask_pars_fragment:bx,skinbase_vertex:Mx,skinning_pars_vertex:wx,skinning_vertex:Sx,skinnormal_vertex:Ex,specularmap_fragment:Ax,specularmap_pars_fragment:Tx,tonemapping_fragment:Rx,tonemapping_pars_fragment:Cx,transmission_fragment:Px,transmission_pars_fragment:Ix,uv_pars_fragment:Lx,uv_pars_vertex:Dx,uv_vertex:Ux,worldpos_vertex:Fx,background_vert:Nx,background_frag:Ox,backgroundCube_vert:zx,backgroundCube_frag:Bx,cube_vert:kx,cube_frag:Hx,depth_vert:Vx,depth_frag:Gx,distanceRGBA_vert:Wx,distanceRGBA_frag:Xx,equirect_vert:qx,equirect_frag:Yx,linedashed_vert:$x,linedashed_frag:jx,meshbasic_vert:Zx,meshbasic_frag:Jx,meshlambert_vert:Kx,meshlambert_frag:Qx,meshmatcap_vert:ey,meshmatcap_frag:ty,meshnormal_vert:ny,meshnormal_frag:iy,meshphong_vert:ry,meshphong_frag:sy,meshphysical_vert:oy,meshphysical_frag:ay,meshtoon_vert:cy,meshtoon_frag:ly,points_vert:uy,points_frag:hy,shadow_vert:dy,shadow_frag:fy,sprite_vert:py,sprite_frag:my},Ce={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Ti={basic:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Pn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Pn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Pn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Pn([Ce.points,Ce.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Pn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Pn([Ce.common,Ce.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Pn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Pn([Ce.sprite,Ce.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:Pn([Ce.common,Ce.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:Pn([Ce.lights,Ce.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Ti.physical={uniforms:Pn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};var ha={r:0,b:0,g:0},Ur=new Nn,gy=new bt;function xy(i,e,t,n,r,s,o){let a=new Je(0),c=s===!0?0:1,l,u,h=null,p=0,f=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function x(v){let y=!1,_=g(v);_===null?d(a,c):_&&_.isColor&&(d(_,1),y=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,y){let _=g(y);_&&(_.isCubeTexture||_.mapping===Za)?(u===void 0&&(u=new it(new Ii(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:Es(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ur.copy(y.backgroundRotation),Ur.x*=-1,Ur.y*=-1,Ur.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ur.y*=-1,Ur.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(gy.makeRotationFromEuler(Ur)),u.material.toneMapped=Tt.getTransfer(_.colorSpace)!==Bt,(h!==_||p!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,p=_.version,f=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new it(new yr(2,2),new Ln({name:"BackgroundMaterial",uniforms:Es(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Tt.getTransfer(_.colorSpace)!==Bt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||p!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,p=_.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function d(v,y){v.getRGB(ha,mf(i)),n.buffers.color.setClear(ha.r,ha.g,ha.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(a,c)},render:x,addToRenderList:m}}function yy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null),s=r,o=!1;function a(M,C,F,H,q){let X=!1,I=h(H,F,C);s!==I&&(s=I,l(s.object)),X=f(M,H,F,q),X&&g(M,H,F,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,_(M,C,F,H),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function h(M,C,F){let H=F.wireframe===!0,q=n[M.id];q===void 0&&(q={},n[M.id]=q);let X=q[C.id];X===void 0&&(X={},q[C.id]=X);let I=X[H];return I===void 0&&(I=p(c()),X[H]=I),I}function p(M){let C=[],F=[],H=[];for(let q=0;q<t;q++)C[q]=0,F[q]=0,H[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:F,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,C,F,H){let q=s.attributes,X=C.attributes,I=0,ee=F.getAttributes();for(let W in ee)if(ee[W].location>=0){let V=q[W],k=X[W];if(k===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(k=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(k=M.instanceColor)),V===void 0||V.attribute!==k||k&&V.data!==k.data)return!0;I++}return s.attributesNum!==I||s.index!==H}function g(M,C,F,H){let q={},X=C.attributes,I=0,ee=F.getAttributes();for(let W in ee)if(ee[W].location>=0){let V=X[W];V===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(V=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(V=M.instanceColor));let k={};k.attribute=V,V&&V.data&&(k.data=V.data),q[W]=k,I++}s.attributes=q,s.attributesNum=I,s.index=H}function x(){let M=s.newAttributes;for(let C=0,F=M.length;C<F;C++)M[C]=0}function m(M){d(M,0)}function d(M,C){let F=s.newAttributes,H=s.enabledAttributes,q=s.attributeDivisors;F[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),q[M]!==C&&(i.vertexAttribDivisor(M,C),q[M]=C)}function v(){let M=s.newAttributes,C=s.enabledAttributes;for(let F=0,H=C.length;F<H;F++)C[F]!==M[F]&&(i.disableVertexAttribArray(F),C[F]=0)}function y(M,C,F,H,q,X,I){I===!0?i.vertexAttribIPointer(M,C,F,q,X):i.vertexAttribPointer(M,C,F,H,q,X)}function _(M,C,F,H){x();let q=H.attributes,X=F.getAttributes(),I=C.defaultAttributeValues;for(let ee in X){let W=X[ee];if(W.location>=0){let z=q[ee];if(z===void 0&&(ee==="instanceMatrix"&&M.instanceMatrix&&(z=M.instanceMatrix),ee==="instanceColor"&&M.instanceColor&&(z=M.instanceColor)),z!==void 0){let V=z.normalized,k=z.itemSize,O=e.get(z);if(O===void 0)continue;let te=O.buffer,U=O.type,J=O.bytesPerElement,Q=U===i.INT||U===i.UNSIGNED_INT||z.gpuType===Ou;if(z.isInterleavedBufferAttribute){let ge=z.data,ae=ge.stride,ie=z.offset;if(ge.isInstancedInterleavedBuffer){for(let Ae=0;Ae<W.locationSize;Ae++)d(W.location+Ae,ge.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Ae=0;Ae<W.locationSize;Ae++)m(W.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Ae=0;Ae<W.locationSize;Ae++)y(W.location+Ae,k/W.locationSize,U,V,ae*J,(ie+k/W.locationSize*Ae)*J,Q)}else{if(z.isInstancedBufferAttribute){for(let ge=0;ge<W.locationSize;ge++)d(W.location+ge,z.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let ge=0;ge<W.locationSize;ge++)m(W.location+ge);i.bindBuffer(i.ARRAY_BUFFER,te);for(let ge=0;ge<W.locationSize;ge++)y(W.location+ge,k/W.locationSize,U,V,k*J,k/W.locationSize*ge*J,Q)}}else if(I!==void 0){let V=I[ee];if(V!==void 0)switch(V.length){case 2:i.vertexAttrib2fv(W.location,V);break;case 3:i.vertexAttrib3fv(W.location,V);break;case 4:i.vertexAttrib4fv(W.location,V);break;default:i.vertexAttrib1fv(W.location,V)}}}}v()}function w(){T();for(let M in n){let C=n[M];for(let F in C){let H=C[F];for(let q in H)u(H[q].object),delete H[q];delete C[F]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;let C=n[M.id];for(let F in C){let H=C[F];for(let q in H)u(H[q].object),delete H[q];delete C[F]}delete n[M.id]}function A(M){for(let C in n){let F=n[C];if(F[M.id]===void 0)continue;let H=F[M.id];for(let q in H)u(H[q].object),delete H[q];delete F[M.id]}}function T(){b(),o=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:T,resetDefaultState:b,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function _y(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function c(l,u,h,p){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],u[g],p[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,p,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*p[x];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function vy(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==yi&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let T=A===vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Ji&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ri&&!T)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:w,maxSamples:E}}function by(i){let e=this,t=null,n=0,r=!1,s=!1,o=new $i,a=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let f=h.length!==0||p||n!==0||r;return r=p,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=u(h,p,0)},this.setState=function(h,p,f){let g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{let v=s?0:n,y=v*4,_=d.clippingState||null;c.value=_,_=u(g,p,y,f);for(let w=0;w!==y;++w)_[w]=t[w];d.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,p,f,g){let x=h!==null?h.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let d=f+x*4,v=p.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,_=f;y!==x;++y,_+=4)o.copy(h[y]).applyMatrix4(v,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function My(i){let e=new WeakMap;function t(o,a){return a===uo?o.mapping=bs:a===bl&&(o.mapping=Ms),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===uo||a===bl)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new tu(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var La=class extends As{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ms=4,xd=[.125,.215,.35,.446,.526,.582],Br=20,tl=new La,yd=new Je,nl=null,il=0,rl=0,sl=!1,Nr=(1+Math.sqrt(5))/2,ds=1/Nr,_d=[new D(-Nr,ds,0),new D(Nr,ds,0),new D(-ds,0,Nr),new D(ds,0,Nr),new D(0,Nr,-ds),new D(0,Nr,ds),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Da=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){nl=this._renderer.getRenderTarget(),il=this._renderer.getActiveCubeFace(),rl=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Md(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nl,il,rl),this._renderer.xr.enabled=sl,e.scissorTest=!1,da(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===Ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nl=this._renderer.getRenderTarget(),il=this._renderer.getActiveCubeFace(),rl=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:vr,format:yi,colorSpace:Is,depthBuffer:!1},r=vd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vd(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wy(s)),this._blurMaterial=Sy(s,e,t)}return r}_compileMaterial(e){let t=new it(this._lodPlanes[0],e);this._renderer.compile(t,tl)}_sceneToCubeUV(e,t,n,r){let a=new In(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,p=u.toneMapping;u.getClearColor(yd),u.toneMapping=Pi,u.autoClear=!1;let f=new $t({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),g=new it(new Ii,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(yd),x=!0);for(let d=0;d<6;d++){let v=d%3;v===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):v===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let y=this._cubeSize;da(r,v*y,d>2?y:0,y,y),u.setRenderTarget(r),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===bs||e.mapping===Ms;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Md()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bd());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new it(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;da(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,tl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=_d[(r-s-1)%_d.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new it(this._lodPlanes[r],l),p=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Br-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Br;m>Br&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Br}`);let d=[],v=0;for(let A=0;A<Br;++A){let T=A/x,b=Math.exp(-T*T/2);d.push(b),A===0?v+=b:A<m&&(v+=2*b)}for(let A=0;A<d.length;A++)d[A]=d[A]/v;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);let{_lodMax:y}=this;p.dTheta.value=g,p.mipInt.value=y-n;let _=this._sizeLods[r],w=3*_*(r>y-ms?r-y+ms:0),E=4*(this._cubeSize-_);da(t,w,E,3*_,2*_),c.setRenderTarget(t),c.render(h,tl)}};function wy(i){let e=[],t=[],n=[],r=i,s=i-ms+1+xd.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let c=1/a;o>i-ms?c=xd[o-i+ms-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,p=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,d=1,v=new Float32Array(x*g*f),y=new Float32Array(m*g*f),_=new Float32Array(d*g*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,T=E>2?0:-1,b=[A,T,0,A+2/3,T,0,A+2/3,T+1,0,A,T,0,A+2/3,T+1,0,A,T+1,0];v.set(b,x*g*E),y.set(p,m*g*E);let M=[E,E,E,E,E,E];_.set(M,d*g*E)}let w=new Mt;w.setAttribute("position",new Zn(v,x)),w.setAttribute("uv",new Zn(y,m)),w.setAttribute("faceIndex",new Zn(_,d)),e.push(w),r>ms&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function vd(i,e,t){let n=new ni(i,e,t);return n.texture.mapping=Za,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function da(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Sy(i,e,t){let n=new Float32Array(Br),r=new D(0,1,0);return new Ln({name:"SphericalGaussianBlur",defines:{n:Br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function bd(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Md(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Xu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ey(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===uo||c===bl,u=c===bs||c===Ms;if(l||u){let h=e.get(a),p=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new Da(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return l&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Da(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){let c=a.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Ay(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&io("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Ty(i,e,t,n){let r={},s=new WeakMap;function o(h){let p=h.target;p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);for(let g in p.morphAttributes){let x=p.morphAttributes[g];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}p.removeEventListener("dispose",o),delete r[p.id];let f=s.get(p);f&&(e.remove(f),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(h,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,t.memory.geometries++),p}function c(h){let p=h.attributes;for(let g in p)e.update(p[g],i.ARRAY_BUFFER);let f=h.morphAttributes;for(let g in f){let x=f[g];for(let m=0,d=x.length;m<d;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(h){let p=[],f=h.index,g=h.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let y=0,_=v.length;y<_;y+=3){let w=v[y+0],E=v[y+1],A=v[y+2];p.push(w,E,E,A,A,w)}}else if(g!==void 0){let v=g.array;x=g.version;for(let y=0,_=v.length/3-1;y<_;y+=3){let w=y+0,E=y+1,A=y+2;p.push(w,E,E,A,A,w)}}else return;let m=new(ff(p)?Pa:Ca)(p,1);m.version=x;let d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){let p=s.get(h);if(p){let f=h.index;f!==null&&p.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Ry(i,e,t){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function c(p,f){i.drawElements(n,f,s,p*o),t.update(f,n,1)}function l(p,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,p*o,g),t.update(f,n,g))}function u(p,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,p,0,g);let m=0;for(let d=0;d<g;d++)m+=f[d];t.update(m,n,1)}function h(p,f,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<p.length;d++)l(p[d]/o,f[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,p,0,x,0,g);let d=0;for(let v=0;v<g;v++)d+=f[v]*x[v];t.update(d,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Cy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Py(i,e,t){let n=new WeakMap,r=new Zt;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,p=n.get(a);if(p===void 0||p.count!==h){let b=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",b)};p!==void 0&&p.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*w*4*h),A=new Ra(E,_,w,h);A.type=Ri,A.needsUpdate=!0;let T=y*4;for(let M=0;M<h;M++){let C=m[M],F=d[M],H=v[M],q=_*w*4*M;for(let X=0;X<C.count;X++){let I=X*T;f===!0&&(r.fromBufferAttribute(C,X),E[q+I+0]=r.x,E[q+I+1]=r.y,E[q+I+2]=r.z,E[q+I+3]=0),g===!0&&(r.fromBufferAttribute(F,X),E[q+I+4]=r.x,E[q+I+5]=r.y,E[q+I+6]=r.z,E[q+I+7]=0),x===!0&&(r.fromBufferAttribute(H,X),E[q+I+8]=r.x,E[q+I+9]=r.y,E[q+I+10]=r.z,E[q+I+11]=H.itemSize===4?r.w:1)}}p={count:h,texture:A,size:new ke(_,w)},n.set(a,p),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function Iy(i,e,t,n){let r=new WeakMap;function s(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==l&&(p.update(),r.set(p,l))}return h}function o(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}var Ts=class extends Sn{constructor(e,t,n,r,s,o,a,c,l,u=xs){if(u!==xs&&u!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===xs&&(n=Ki),n===void 0&&u===Ss&&(n=ws),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:jn,this.minFilter=c!==void 0?c:jn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},xf=new Sn,wd=new Ts(1,1),yf=new Ra,_f=new Ql,vf=new Ia,Sd=[],Ed=[],Ad=new Float32Array(16),Td=new Float32Array(9),Rd=new Float32Array(4);function Ds(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Sd[r];if(s===void 0&&(s=new Float32Array(r),Sd[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function cn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ka(i,e){let t=Ed[e];t===void 0&&(t=new Int32Array(e),Ed[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ly(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Dy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2fv(this.addr,e),ln(t,e)}}function Uy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(cn(t,e))return;i.uniform3fv(this.addr,e),ln(t,e)}}function Fy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4fv(this.addr,e),ln(t,e)}}function Ny(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(cn(t,n))return;Rd.set(n),i.uniformMatrix2fv(this.addr,!1,Rd),ln(t,n)}}function Oy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(cn(t,n))return;Td.set(n),i.uniformMatrix3fv(this.addr,!1,Td),ln(t,n)}}function zy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(cn(t,n))return;Ad.set(n),i.uniformMatrix4fv(this.addr,!1,Ad),ln(t,n)}}function By(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ky(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2iv(this.addr,e),ln(t,e)}}function Hy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3iv(this.addr,e),ln(t,e)}}function Vy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4iv(this.addr,e),ln(t,e)}}function Gy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2uiv(this.addr,e),ln(t,e)}}function Xy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3uiv(this.addr,e),ln(t,e)}}function qy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4uiv(this.addr,e),ln(t,e)}}function Yy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(wd.compareFunction=df,s=wd):s=xf,t.setTexture2D(e||s,r)}function $y(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||_f,r)}function jy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||vf,r)}function Zy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||yf,r)}function Jy(i){switch(i){case 5126:return Ly;case 35664:return Dy;case 35665:return Uy;case 35666:return Fy;case 35674:return Ny;case 35675:return Oy;case 35676:return zy;case 5124:case 35670:return By;case 35667:case 35671:return ky;case 35668:case 35672:return Hy;case 35669:case 35673:return Vy;case 5125:return Gy;case 36294:return Wy;case 36295:return Xy;case 36296:return qy;case 35678:case 36198:case 36298:case 36306:case 35682:return Yy;case 35679:case 36299:case 36307:return $y;case 35680:case 36300:case 36308:case 36293:return jy;case 36289:case 36303:case 36311:case 36292:return Zy}}function Ky(i,e){i.uniform1fv(this.addr,e)}function Qy(i,e){let t=Ds(e,this.size,2);i.uniform2fv(this.addr,t)}function e_(i,e){let t=Ds(e,this.size,3);i.uniform3fv(this.addr,t)}function t_(i,e){let t=Ds(e,this.size,4);i.uniform4fv(this.addr,t)}function n_(i,e){let t=Ds(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function i_(i,e){let t=Ds(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function r_(i,e){let t=Ds(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function s_(i,e){i.uniform1iv(this.addr,e)}function o_(i,e){i.uniform2iv(this.addr,e)}function a_(i,e){i.uniform3iv(this.addr,e)}function c_(i,e){i.uniform4iv(this.addr,e)}function l_(i,e){i.uniform1uiv(this.addr,e)}function u_(i,e){i.uniform2uiv(this.addr,e)}function h_(i,e){i.uniform3uiv(this.addr,e)}function d_(i,e){i.uniform4uiv(this.addr,e)}function f_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||xf,s[o])}function p_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||_f,s[o])}function m_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||vf,s[o])}function g_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||yf,s[o])}function x_(i){switch(i){case 5126:return Ky;case 35664:return Qy;case 35665:return e_;case 35666:return t_;case 35674:return n_;case 35675:return i_;case 35676:return r_;case 5124:case 35670:return s_;case 35667:case 35671:return o_;case 35668:case 35672:return a_;case 35669:case 35673:return c_;case 5125:return l_;case 36294:return u_;case 36295:return h_;case 36296:return d_;case 35678:case 36198:case 36298:case 36306:case 35682:return f_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}var nu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jy(t.type)}},iu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=x_(t.type)}},ru=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},ol=/(\w+)(\])?(\[|\.)?/g;function Cd(i,e){i.seq.push(e),i.map[e.id]=e}function y_(i,e,t){let n=i.name,r=n.length;for(ol.lastIndex=0;;){let s=ol.exec(n),o=ol.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Cd(t,l===void 0?new nu(a,i,e):new iu(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new ru(a),Cd(t,h)),t=h}}}var _s=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);y_(s,o,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function Pd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var __=37297,v_=0;function b_(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Id=new dt;function M_(i){Tt._getMatrix(Id,Tt.workingColorSpace,i);let e=`mat3( ${Id.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(i)){case Ja:return[e,"LinearTransferOETF"];case Bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ld(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+b_(i.getShaderSource(e),o)}else return r}function w_(i,e){let t=M_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function S_(i,e){let t;switch(e){case Fm:t="Linear";break;case Nm:t="Reinhard";break;case Om:t="Cineon";break;case Nu:t="ACESFilmic";break;case Bm:t="AgX";break;case km:t="Neutral";break;case zm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var fa=new D;function E_(){Tt.getLuminanceCoefficients(fa);let i=fa.x.toFixed(4),e=fa.y.toFixed(4),t=fa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ro).join(`
`)}function T_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function R_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ro(i){return i!==""}function Dd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ud(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var C_=/^[ \t]*#include +<([\w\d./]+)>/gm;function su(i){return i.replace(C_,I_)}var P_=new Map;function I_(i,e){let t=pt[e];if(t===void 0){let n=P_.get(e);if(n!==void 0)t=pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return su(t)}var L_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fd(i){return i.replace(L_,D_)}function D_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Nd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function U_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Kd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yi&&(e="SHADOWMAP_TYPE_VSM"),e}function F_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case bs:case Ms:e="ENVMAP_TYPE_CUBE";break;case Za:e="ENVMAP_TYPE_CUBE_UV";break}return e}function N_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ms:e="ENVMAP_MODE_REFRACTION";break}return e}function O_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qd:e="ENVMAP_BLENDING_MULTIPLY";break;case Dm:e="ENVMAP_BLENDING_MIX";break;case Um:e="ENVMAP_BLENDING_ADD";break}return e}function z_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function B_(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=U_(t),l=F_(t),u=N_(t),h=O_(t),p=z_(t),f=A_(t),g=T_(s),x=r.createProgram(),m,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ro).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ro).join(`
`),d.length>0&&(d+=`
`)):(m=[Nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ro).join(`
`),d=[Nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?pt.tonemapping_pars_fragment:"",t.toneMapping!==Pi?S_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,w_("linearToOutputTexel",t.outputColorSpace),E_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ro).join(`
`)),o=su(o),o=Dd(o,t),o=Ud(o,t),a=su(a),a=Dd(a,t),a=Ud(a,t),o=Fd(o),a=Fd(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===jh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let y=v+m+o,_=v+d+a,w=Pd(r,r.VERTEX_SHADER,y),E=Pd(r,r.FRAGMENT_SHADER,_);r.attachShader(x,w),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){let F=r.getProgramInfoLog(x).trim(),H=r.getShaderInfoLog(w).trim(),q=r.getShaderInfoLog(E).trim(),X=!0,I=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,w,E);else{let ee=Ld(r,w,"vertex"),W=Ld(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+ee+`
`+W)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(H===""||q==="")&&(I=!1);I&&(C.diagnostics={runnable:X,programLog:F,vertexShader:{log:H,prefix:m},fragmentShader:{log:q,prefix:d}})}r.deleteShader(w),r.deleteShader(E),T=new _s(r,x),b=R_(r,x)}let T;this.getUniforms=function(){return T===void 0&&A(this),T};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,__)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=v_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}var k_=0,ou=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new au(e),t.set(e,n)),n}},au=class{constructor(e){this.id=k_++,this.code=e,this.usedTimes=0}};function H_(i,e,t,n,r,s,o){let a=new mo,c=new ou,l=new Set,u=[],h=r.logarithmicDepthBuffer,p=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,C,F,H){let q=F.fog,X=H.geometry,I=b.isMeshStandardMaterial?F.environment:null,ee=(b.isMeshStandardMaterial?t:e).get(b.envMap||I),W=ee&&ee.mapping===Za?ee.image.height:null,z=g[b.type];b.precision!==null&&(f=r.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let V=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,k=V!==void 0?V.length:0,O=0;X.morphAttributes.position!==void 0&&(O=1),X.morphAttributes.normal!==void 0&&(O=2),X.morphAttributes.color!==void 0&&(O=3);let te,U,J,Q;if(z){let St=Ti[z];te=St.vertexShader,U=St.fragmentShader}else te=b.vertexShader,U=b.fragmentShader,c.update(b),J=c.getVertexShaderID(b),Q=c.getFragmentShaderID(b);let ge=i.getRenderTarget(),ae=i.state.buffers.depth.getReversed(),ie=H.isInstancedMesh===!0,Ae=H.isBatchedMesh===!0,de=!!b.map,Y=!!b.matcap,G=!!ee,B=!!b.aoMap,Se=!!b.lightMap,ne=!!b.bumpMap,We=!!b.normalMap,Ie=!!b.displacementMap,ot=!!b.emissiveMap,Be=!!b.metalnessMap,P=!!b.roughnessMap,S=b.anisotropy>0,j=b.clearcoat>0,ce=b.dispersion>0,le=b.iridescence>0,pe=b.sheen>0,Ye=b.transmission>0,Ee=S&&!!b.anisotropyMap,Oe=j&&!!b.clearcoatMap,xt=j&&!!b.clearcoatNormalMap,ve=j&&!!b.clearcoatRoughnessMap,He=le&&!!b.iridescenceMap,je=le&&!!b.iridescenceThicknessMap,ze=pe&&!!b.sheenColorMap,Te=pe&&!!b.sheenRoughnessMap,ft=!!b.specularMap,at=!!b.specularColorMap,Nt=!!b.specularIntensityMap,L=Ye&&!!b.transmissionMap,Re=Ye&&!!b.thicknessMap,he=!!b.gradientMap,me=!!b.alphaMap,Le=b.alphaTest>0,De=!!b.alphaHash,Ze=!!b.extensions,kt=Pi;b.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(kt=i.toneMapping);let rn={shaderID:z,shaderType:b.type,shaderName:b.name,vertexShader:te,fragmentShader:U,defines:b.defines,customVertexShaderID:J,customFragmentShaderID:Q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&H._colorsTexture!==null,instancing:ie,instancingColor:ie&&H.instanceColor!==null,instancingMorph:ie&&H.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Is,alphaToCoverage:!!b.alphaToCoverage,map:de,matcap:Y,envMap:G,envMapMode:G&&ee.mapping,envMapCubeUVHeight:W,aoMap:B,lightMap:Se,bumpMap:ne,normalMap:We,displacementMap:p&&Ie,emissiveMap:ot,normalMapObjectSpace:We&&b.normalMapType===Wm,normalMapTangentSpace:We&&b.normalMapType===hf,metalnessMap:Be,roughnessMap:P,anisotropy:S,anisotropyMap:Ee,clearcoat:j,clearcoatMap:Oe,clearcoatNormalMap:xt,clearcoatRoughnessMap:ve,dispersion:ce,iridescence:le,iridescenceMap:He,iridescenceThicknessMap:je,sheen:pe,sheenColorMap:ze,sheenRoughnessMap:Te,specularMap:ft,specularColorMap:at,specularIntensityMap:Nt,transmission:Ye,transmissionMap:L,thicknessMap:Re,gradientMap:he,opaque:b.transparent===!1&&b.blending===gs&&b.alphaToCoverage===!1,alphaMap:me,alphaTest:Le,alphaHash:De,combine:b.combine,mapUv:de&&x(b.map.channel),aoMapUv:B&&x(b.aoMap.channel),lightMapUv:Se&&x(b.lightMap.channel),bumpMapUv:ne&&x(b.bumpMap.channel),normalMapUv:We&&x(b.normalMap.channel),displacementMapUv:Ie&&x(b.displacementMap.channel),emissiveMapUv:ot&&x(b.emissiveMap.channel),metalnessMapUv:Be&&x(b.metalnessMap.channel),roughnessMapUv:P&&x(b.roughnessMap.channel),anisotropyMapUv:Ee&&x(b.anisotropyMap.channel),clearcoatMapUv:Oe&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:xt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:je&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Te&&x(b.sheenRoughnessMap.channel),specularMapUv:ft&&x(b.specularMap.channel),specularColorMapUv:at&&x(b.specularColorMap.channel),specularIntensityMapUv:Nt&&x(b.specularIntensityMap.channel),transmissionMapUv:L&&x(b.transmissionMap.channel),thicknessMapUv:Re&&x(b.thicknessMap.channel),alphaMapUv:me&&x(b.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(We||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!X.attributes.uv&&(de||me),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ae,skinning:H.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:O,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:kt,decodeVideoTexture:de&&b.map.isVideoTexture===!0&&Tt.getTransfer(b.map.colorSpace)===Bt,decodeVideoTextureEmissive:ot&&b.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(b.emissiveMap.colorSpace)===Bt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Vt,flipSided:b.side===Fn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ze&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ze&&b.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return rn.vertexUv1s=l.has(1),rn.vertexUv2s=l.has(2),rn.vertexUv3s=l.has(3),l.clear(),rn}function d(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let C in b.defines)M.push(C),M.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(v(M,b),y(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function v(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let M=g[b.type],C;if(M){let F=Ti[M];C=Ig.clone(F.uniforms)}else C=b.uniforms;return C}function w(b,M){let C;for(let F=0,H=u.length;F<H;F++){let q=u[F];if(q.cacheKey===M){C=q,++C.usedTimes;break}}return C===void 0&&(C=new B_(i,M,b,s),u.push(C)),C}function E(b){if(--b.usedTimes===0){let M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function A(b){c.remove(b)}function T(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:_,acquireProgram:w,releaseProgram:E,releaseShaderCache:A,programs:u,dispose:T}}function V_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function G_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Od(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zd(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,p,f,g,x,m){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:p,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[e]=d):(d.id=h.id,d.object=h,d.geometry=p,d.material=f,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=x,d.group=m),e++,d}function a(h,p,f,g,x,m){let d=o(h,p,f,g,x,m);f.transmission>0?n.push(d):f.transparent===!0?r.push(d):t.push(d)}function c(h,p,f,g,x,m){let d=o(h,p,f,g,x,m);f.transmission>0?n.unshift(d):f.transparent===!0?r.unshift(d):t.unshift(d)}function l(h,p){t.length>1&&t.sort(h||G_),n.length>1&&n.sort(p||Od),r.length>1&&r.sort(p||Od)}function u(){for(let h=e,p=i.length;h<p;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function W_(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new zd,i.set(n,[o])):r>=s.length?(o=new zd,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function X_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Je};break;case"SpotLight":t={position:new D,direction:new D,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function q_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Y_=0;function $_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function j_(i){let e=new X_,t=q_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let r=new D,s=new bt,o=new bt;function a(l){let u=0,h=0,p=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,x=0,m=0,d=0,v=0,y=0,_=0,w=0,E=0,A=0;l.sort($_);for(let b=0,M=l.length;b<M;b++){let C=l[b],F=C.color,H=C.intensity,q=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=F.r*H,h+=F.g*H,p+=F.b*H;else if(C.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(C.sh.coefficients[I],H);A++}else if(C.isDirectionalLight){let I=e.get(C);if(I.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let ee=C.shadow,W=t.get(C);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=C.shadow.matrix,v++}n.directional[f]=I,f++}else if(C.isSpotLight){let I=e.get(C);I.position.setFromMatrixPosition(C.matrixWorld),I.color.copy(F).multiplyScalar(H),I.distance=q,I.coneCos=Math.cos(C.angle),I.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),I.decay=C.decay,n.spot[x]=I;let ee=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,ee.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[x]=ee.matrix,C.castShadow){let W=t.get(C);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=X,_++}x++}else if(C.isRectAreaLight){let I=e.get(C);I.color.copy(F).multiplyScalar(H),I.halfWidth.set(C.width*.5,0,0),I.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=I,m++}else if(C.isPointLight){let I=e.get(C);if(I.color.copy(C.color).multiplyScalar(C.intensity),I.distance=C.distance,I.decay=C.decay,C.castShadow){let ee=C.shadow,W=t.get(C);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,W.shadowCameraNear=ee.camera.near,W.shadowCameraFar=ee.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,y++}n.point[g]=I,g++}else if(C.isHemisphereLight){let I=e.get(C);I.skyColor.copy(C.color).multiplyScalar(H),I.groundColor.copy(C.groundColor).multiplyScalar(H),n.hemi[d]=I,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=p;let T=n.hash;(T.directionalLength!==f||T.pointLength!==g||T.spotLength!==x||T.rectAreaLength!==m||T.hemiLength!==d||T.numDirectionalShadows!==v||T.numPointShadows!==y||T.numSpotShadows!==_||T.numSpotMaps!==w||T.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,T.directionalLength=f,T.pointLength=g,T.spotLength=x,T.rectAreaLength=m,T.hemiLength=d,T.numDirectionalShadows=v,T.numPointShadows=y,T.numSpotShadows=_,T.numSpotMaps=w,T.numLightProbes=A,n.version=Y_++)}function c(l,u){let h=0,p=0,f=0,g=0,x=0,m=u.matrixWorldInverse;for(let d=0,v=l.length;d<v;d++){let y=l[d];if(y.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),h++}else if(y.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),p++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Bd(i){let e=new j_(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Z_(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Bd(i),e.set(r,[a])):s>=o.length?(a=new Bd(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var cu=class extends xr{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Vm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},lu=class extends xr{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},J_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,K_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Q_(i,e,t){let n=new go,r=new ke,s=new ke,o=new Zt,a=new cu({depthPacking:Gm}),c=new lu,l={},u=t.maxTextureSize,h={[pr]:Fn,[Fn]:pr,[Vt]:Vt},p=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:J_,fragmentShader:K_}),f=p.clone();f.defines.HORIZONTAL_PASS=1;let g=new Mt;g.setAttribute("position",new Zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new it(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kd;let d=this.type;this.render=function(E,A,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Ci),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let H=d!==Yi&&this.type===Yi,q=d===Yi&&this.type!==Yi;for(let X=0,I=E.length;X<I;X++){let ee=E[X],W=ee.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let z=W.getFrameExtents();if(r.multiply(z),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/z.x),r.x=s.x*z.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/z.y),r.y=s.y*z.y,W.mapSize.y=s.y)),W.map===null||H===!0||q===!0){let k=this.type!==Yi?{minFilter:jn,magFilter:jn}:{};W.map!==null&&W.map.dispose(),W.map=new ni(r.x,r.y,k),W.map.texture.name=ee.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let V=W.getViewportCount();for(let k=0;k<V;k++){let O=W.getViewport(k);o.set(s.x*O.x,s.y*O.y,s.x*O.z,s.y*O.w),F.viewport(o),W.updateMatrices(ee,k),n=W.getFrustum(),_(A,T,W.camera,ee,this.type)}W.isPointLightShadow!==!0&&this.type===Yi&&v(W,T),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,C)};function v(E,A){let T=e.update(x);p.defines.VSM_SAMPLES!==E.blurSamples&&(p.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ni(r.x,r.y)),p.uniforms.shadow_pass.value=E.map.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,T,p,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,T,f,x,null)}function y(E,A,T,b){let M=null,C=T.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)M=C;else if(M=T.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let F=M.uuid,H=A.uuid,q=l[F];q===void 0&&(q={},l[F]=q);let X=q[H];X===void 0&&(X=M.clone(),q[H]=X,A.addEventListener("dispose",w)),M=X}if(M.visible=A.visible,M.wireframe=A.wireframe,b===Yi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:h[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,T.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let F=i.properties.get(M);F.light=T}return M}function _(E,A,T,b,M){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Yi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,E.matrixWorld);let H=e.update(E),q=E.material;if(Array.isArray(q)){let X=H.groups;for(let I=0,ee=X.length;I<ee;I++){let W=X[I],z=q[W.materialIndex];if(z&&z.visible){let V=y(E,z,b,M);E.onBeforeShadow(i,E,A,T,H,V,W),i.renderBufferDirect(T,null,H,V,E,W),E.onAfterShadow(i,E,A,T,H,V,W)}}}else if(q.visible){let X=y(E,q,b,M);E.onBeforeShadow(i,E,A,T,H,X,null),i.renderBufferDirect(T,null,H,X,E,null),E.onAfterShadow(i,E,A,T,H,X,null)}}let F=E.children;for(let H=0,q=F.length;H<q;H++)_(F[H],A,T,b,M)}function w(E){E.target.removeEventListener("dispose",w);for(let T in l){let b=l[T],M=E.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var ev={[pl]:ml,[gl]:_l,[xl]:vl,[vs]:yl,[ml]:pl,[_l]:gl,[vl]:xl,[yl]:vs};function tv(i,e){function t(){let L=!1,Re=new Zt,he=null,me=new Zt(0,0,0,0);return{setMask:function(Le){he!==Le&&!L&&(i.colorMask(Le,Le,Le,Le),he=Le)},setLocked:function(Le){L=Le},setClear:function(Le,De,Ze,kt,rn){rn===!0&&(Le*=kt,De*=kt,Ze*=kt),Re.set(Le,De,Ze,kt),me.equals(Re)===!1&&(i.clearColor(Le,De,Ze,kt),me.copy(Re))},reset:function(){L=!1,he=null,me.set(-1,0,0,0)}}}function n(){let L=!1,Re=!1,he=null,me=null,Le=null;return{setReversed:function(De){if(Re!==De){let Ze=e.get("EXT_clip_control");Re?Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.ZERO_TO_ONE_EXT):Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.NEGATIVE_ONE_TO_ONE_EXT);let kt=Le;Le=null,this.setClear(kt)}Re=De},getReversed:function(){return Re},setTest:function(De){De?ge(i.DEPTH_TEST):ae(i.DEPTH_TEST)},setMask:function(De){he!==De&&!L&&(i.depthMask(De),he=De)},setFunc:function(De){if(Re&&(De=ev[De]),me!==De){switch(De){case pl:i.depthFunc(i.NEVER);break;case ml:i.depthFunc(i.ALWAYS);break;case gl:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case xl:i.depthFunc(i.EQUAL);break;case yl:i.depthFunc(i.GEQUAL);break;case _l:i.depthFunc(i.GREATER);break;case vl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=De}},setLocked:function(De){L=De},setClear:function(De){Le!==De&&(Re&&(De=1-De),i.clearDepth(De),Le=De)},reset:function(){L=!1,he=null,me=null,Le=null,Re=!1}}}function r(){let L=!1,Re=null,he=null,me=null,Le=null,De=null,Ze=null,kt=null,rn=null;return{setTest:function(St){L||(St?ge(i.STENCIL_TEST):ae(i.STENCIL_TEST))},setMask:function(St){Re!==St&&!L&&(i.stencilMask(St),Re=St)},setFunc:function(St,_n,ui){(he!==St||me!==_n||Le!==ui)&&(i.stencilFunc(St,_n,ui),he=St,me=_n,Le=ui)},setOp:function(St,_n,ui){(De!==St||Ze!==_n||kt!==ui)&&(i.stencilOp(St,_n,ui),De=St,Ze=_n,kt=ui)},setLocked:function(St){L=St},setClear:function(St){rn!==St&&(i.clearStencil(St),rn=St)},reset:function(){L=!1,Re=null,he=null,me=null,Le=null,De=null,Ze=null,kt=null,rn=null}}}let s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap,u={},h={},p=new WeakMap,f=[],g=null,x=!1,m=null,d=null,v=null,y=null,_=null,w=null,E=null,A=new Je(0,0,0),T=0,b=!1,M=null,C=null,F=null,H=null,q=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),I=!1,ee=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(W)[1]),I=ee>=1):W.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),I=ee>=2);let z=null,V={},k=i.getParameter(i.SCISSOR_BOX),O=i.getParameter(i.VIEWPORT),te=new Zt().fromArray(k),U=new Zt().fromArray(O);function J(L,Re,he,me){let Le=new Uint8Array(4),De=i.createTexture();i.bindTexture(L,De),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ze=0;Ze<he;Ze++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(Re,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(Re+Ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return De}let Q={};Q[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ge(i.DEPTH_TEST),o.setFunc(vs),ne(!1),We(kh),ge(i.CULL_FACE),B(Ci);function ge(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function ae(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function ie(L,Re){return h[L]!==Re?(i.bindFramebuffer(L,Re),h[L]=Re,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Re),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Re),!0):!1}function Ae(L,Re){let he=f,me=!1;if(L){he=p.get(Re),he===void 0&&(he=[],p.set(Re,he));let Le=L.textures;if(he.length!==Le.length||he[0]!==i.COLOR_ATTACHMENT0){for(let De=0,Ze=Le.length;De<Ze;De++)he[De]=i.COLOR_ATTACHMENT0+De;he.length=Le.length,me=!0}}else he[0]!==i.BACK&&(he[0]=i.BACK,me=!0);me&&i.drawBuffers(he)}function de(L){return g!==L?(i.useProgram(L),g=L,!0):!1}let Y={[Or]:i.FUNC_ADD,[gm]:i.FUNC_SUBTRACT,[xm]:i.FUNC_REVERSE_SUBTRACT};Y[ym]=i.MIN,Y[_m]=i.MAX;let G={[vm]:i.ZERO,[bm]:i.ONE,[Mm]:i.SRC_COLOR,[dl]:i.SRC_ALPHA,[Rm]:i.SRC_ALPHA_SATURATE,[Am]:i.DST_COLOR,[Sm]:i.DST_ALPHA,[wm]:i.ONE_MINUS_SRC_COLOR,[fl]:i.ONE_MINUS_SRC_ALPHA,[Tm]:i.ONE_MINUS_DST_COLOR,[Em]:i.ONE_MINUS_DST_ALPHA,[Cm]:i.CONSTANT_COLOR,[Pm]:i.ONE_MINUS_CONSTANT_COLOR,[Im]:i.CONSTANT_ALPHA,[Lm]:i.ONE_MINUS_CONSTANT_ALPHA};function B(L,Re,he,me,Le,De,Ze,kt,rn,St){if(L===Ci){x===!0&&(ae(i.BLEND),x=!1);return}if(x===!1&&(ge(i.BLEND),x=!0),L!==mm){if(L!==m||St!==b){if((d!==Or||_!==Or)&&(i.blendEquation(i.FUNC_ADD),d=Or,_=Or),St)switch(L){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hh:i.blendFunc(i.ONE,i.ONE);break;case Vh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Vh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,y=null,w=null,E=null,A.set(0,0,0),T=0,m=L,b=St}return}Le=Le||Re,De=De||he,Ze=Ze||me,(Re!==d||Le!==_)&&(i.blendEquationSeparate(Y[Re],Y[Le]),d=Re,_=Le),(he!==v||me!==y||De!==w||Ze!==E)&&(i.blendFuncSeparate(G[he],G[me],G[De],G[Ze]),v=he,y=me,w=De,E=Ze),(kt.equals(A)===!1||rn!==T)&&(i.blendColor(kt.r,kt.g,kt.b,rn),A.copy(kt),T=rn),m=L,b=!1}function Se(L,Re){L.side===Vt?ae(i.CULL_FACE):ge(i.CULL_FACE);let he=L.side===Fn;Re&&(he=!he),ne(he),L.blending===gs&&L.transparent===!1?B(Ci):B(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);let me=L.stencilWrite;a.setTest(me),me&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ot(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ge(i.SAMPLE_ALPHA_TO_COVERAGE):ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function ne(L){M!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),M=L)}function We(L){L!==fm?(ge(i.CULL_FACE),L!==C&&(L===kh?i.cullFace(i.BACK):L===pm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ae(i.CULL_FACE),C=L}function Ie(L){L!==F&&(I&&i.lineWidth(L),F=L)}function ot(L,Re,he){L?(ge(i.POLYGON_OFFSET_FILL),(H!==Re||q!==he)&&(i.polygonOffset(Re,he),H=Re,q=he)):ae(i.POLYGON_OFFSET_FILL)}function Be(L){L?ge(i.SCISSOR_TEST):ae(i.SCISSOR_TEST)}function P(L){L===void 0&&(L=i.TEXTURE0+X-1),z!==L&&(i.activeTexture(L),z=L)}function S(L,Re,he){he===void 0&&(z===null?he=i.TEXTURE0+X-1:he=z);let me=V[he];me===void 0&&(me={type:void 0,texture:void 0},V[he]=me),(me.type!==L||me.texture!==Re)&&(z!==he&&(i.activeTexture(he),z=he),i.bindTexture(L,Re||Q[L]),me.type=L,me.texture=Re)}function j(){let L=V[z];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ce(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function le(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ye(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function He(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function je(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(L){te.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),te.copy(L))}function Te(L){U.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),U.copy(L))}function ft(L,Re){let he=l.get(Re);he===void 0&&(he=new WeakMap,l.set(Re,he));let me=he.get(L);me===void 0&&(me=i.getUniformBlockIndex(Re,L.name),he.set(L,me))}function at(L,Re){let me=l.get(Re).get(L);c.get(Re)!==me&&(i.uniformBlockBinding(Re,me,L.__bindingPointIndex),c.set(Re,me))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},z=null,V={},h={},p=new WeakMap,f=[],g=null,x=!1,m=null,d=null,v=null,y=null,_=null,w=null,E=null,A=new Je(0,0,0),T=0,b=!1,M=null,C=null,F=null,H=null,q=null,te.set(0,0,i.canvas.width,i.canvas.height),U.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ge,disable:ae,bindFramebuffer:ie,drawBuffers:Ae,useProgram:de,setBlending:B,setMaterial:Se,setFlipSided:ne,setCullFace:We,setLineWidth:Ie,setPolygonOffset:ot,setScissorTest:Be,activeTexture:P,bindTexture:S,unbindTexture:j,compressedTexImage2D:ce,compressedTexImage3D:le,texImage2D:He,texImage3D:je,updateUBOMapping:ft,uniformBlockBinding:at,texStorage2D:xt,texStorage3D:ve,texSubImage2D:pe,texSubImage3D:Ye,compressedTexSubImage2D:Ee,compressedTexSubImage3D:Oe,scissor:ze,viewport:Te,reset:Nt}}function kd(i,e,t,n){let r=nv(n);switch(t){case sf:return i*e;case af:return i*e;case cf:return i*e*2;case ku:return i*e/r.components*r.byteLength;case Hu:return i*e/r.components*r.byteLength;case lf:return i*e*2/r.components*r.byteLength;case Vu:return i*e*2/r.components*r.byteLength;case of:return i*e*3/r.components*r.byteLength;case yi:return i*e*4/r.components*r.byteLength;case Gu:return i*e*4/r.components*r.byteLength;case _a:case va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ba:case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:case Tl:return Math.max(i,16)*Math.max(e,8)/4;case Sl:case Al:return Math.max(i,8)*Math.max(e,8)/2;case Rl:case Cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Il:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ll:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Dl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case zl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Bl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case kl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Vl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Gl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case wa:case Xl:case ql:return Math.ceil(i/4)*Math.ceil(e/4)*16;case uf:case Yl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case $l:case jl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nv(i){switch(i){case Ji:case tf:return{byteLength:1,components:1};case ho:case nf:case vr:return{byteLength:2,components:1};case zu:case Bu:return{byteLength:2,components:4};case Ki:case Ou:case Ri:return{byteLength:4,components:1};case rf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function iv(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ke,u=new WeakMap,h,p=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return f?new OffscreenCanvas(P,S):Aa("canvas")}function x(P,S,j){let ce=1,le=Be(P);if((le.width>j||le.height>j)&&(ce=j/Math.max(le.width,le.height)),ce<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let pe=Math.floor(ce*le.width),Ye=Math.floor(ce*le.height);h===void 0&&(h=g(pe,Ye));let Ee=S?g(pe,Ye):h;return Ee.width=pe,Ee.height=Ye,Ee.getContext("2d").drawImage(P,0,0,pe,Ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+pe+"x"+Ye+")."),Ee}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){i.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(P,S,j,ce,le=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let pe=S;if(S===i.RED&&(j===i.FLOAT&&(pe=i.R32F),j===i.HALF_FLOAT&&(pe=i.R16F),j===i.UNSIGNED_BYTE&&(pe=i.R8)),S===i.RED_INTEGER&&(j===i.UNSIGNED_BYTE&&(pe=i.R8UI),j===i.UNSIGNED_SHORT&&(pe=i.R16UI),j===i.UNSIGNED_INT&&(pe=i.R32UI),j===i.BYTE&&(pe=i.R8I),j===i.SHORT&&(pe=i.R16I),j===i.INT&&(pe=i.R32I)),S===i.RG&&(j===i.FLOAT&&(pe=i.RG32F),j===i.HALF_FLOAT&&(pe=i.RG16F),j===i.UNSIGNED_BYTE&&(pe=i.RG8)),S===i.RG_INTEGER&&(j===i.UNSIGNED_BYTE&&(pe=i.RG8UI),j===i.UNSIGNED_SHORT&&(pe=i.RG16UI),j===i.UNSIGNED_INT&&(pe=i.RG32UI),j===i.BYTE&&(pe=i.RG8I),j===i.SHORT&&(pe=i.RG16I),j===i.INT&&(pe=i.RG32I)),S===i.RGB_INTEGER&&(j===i.UNSIGNED_BYTE&&(pe=i.RGB8UI),j===i.UNSIGNED_SHORT&&(pe=i.RGB16UI),j===i.UNSIGNED_INT&&(pe=i.RGB32UI),j===i.BYTE&&(pe=i.RGB8I),j===i.SHORT&&(pe=i.RGB16I),j===i.INT&&(pe=i.RGB32I)),S===i.RGBA_INTEGER&&(j===i.UNSIGNED_BYTE&&(pe=i.RGBA8UI),j===i.UNSIGNED_SHORT&&(pe=i.RGBA16UI),j===i.UNSIGNED_INT&&(pe=i.RGBA32UI),j===i.BYTE&&(pe=i.RGBA8I),j===i.SHORT&&(pe=i.RGBA16I),j===i.INT&&(pe=i.RGBA32I)),S===i.RGB&&j===i.UNSIGNED_INT_5_9_9_9_REV&&(pe=i.RGB9_E5),S===i.RGBA){let Ye=le?Ja:Tt.getTransfer(ce);j===i.FLOAT&&(pe=i.RGBA32F),j===i.HALF_FLOAT&&(pe=i.RGBA16F),j===i.UNSIGNED_BYTE&&(pe=Ye===Bt?i.SRGB8_ALPHA8:i.RGBA8),j===i.UNSIGNED_SHORT_4_4_4_4&&(pe=i.RGBA4),j===i.UNSIGNED_SHORT_5_5_5_1&&(pe=i.RGB5_A1)}return(pe===i.R16F||pe===i.R32F||pe===i.RG16F||pe===i.RG32F||pe===i.RGBA16F||pe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function _(P,S){let j;return P?S===null||S===Ki||S===ws?j=i.DEPTH24_STENCIL8:S===Ri?j=i.DEPTH32F_STENCIL8:S===ho&&(j=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ki||S===ws?j=i.DEPTH_COMPONENT24:S===Ri?j=i.DEPTH_COMPONENT32F:S===ho&&(j=i.DEPTH_COMPONENT16),j}function w(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==jn&&P.minFilter!==$n?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function E(P){let S=P.target;S.removeEventListener("dispose",E),T(S),S.isVideoTexture&&u.delete(S)}function A(P){let S=P.target;S.removeEventListener("dispose",A),M(S)}function T(P){let S=n.get(P);if(S.__webglInit===void 0)return;let j=P.source,ce=p.get(j);if(ce){let le=ce[S.__cacheKey];le.usedTimes--,le.usedTimes===0&&b(P),Object.keys(ce).length===0&&p.delete(j)}n.remove(P)}function b(P){let S=n.get(P);i.deleteTexture(S.__webglTexture);let j=P.source,ce=p.get(j);delete ce[S.__cacheKey],o.memory.textures--}function M(P){let S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(S.__webglFramebuffer[ce]))for(let le=0;le<S.__webglFramebuffer[ce].length;le++)i.deleteFramebuffer(S.__webglFramebuffer[ce][le]);else i.deleteFramebuffer(S.__webglFramebuffer[ce]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[ce])}else{if(Array.isArray(S.__webglFramebuffer))for(let ce=0;ce<S.__webglFramebuffer.length;ce++)i.deleteFramebuffer(S.__webglFramebuffer[ce]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ce=0;ce<S.__webglColorRenderbuffer.length;ce++)S.__webglColorRenderbuffer[ce]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[ce]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let j=P.textures;for(let ce=0,le=j.length;ce<le;ce++){let pe=n.get(j[ce]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(j[ce])}n.remove(P)}let C=0;function F(){C=0}function H(){let P=C;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),C+=1,P}function q(P){let S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function X(P,S){let j=n.get(P);if(P.isVideoTexture&&Ie(P),P.isRenderTargetTexture===!1&&P.version>0&&j.__version!==P.version){let ce=P.image;if(ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{U(j,P,S);return}}t.bindTexture(i.TEXTURE_2D,j.__webglTexture,i.TEXTURE0+S)}function I(P,S){let j=n.get(P);if(P.version>0&&j.__version!==P.version){U(j,P,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,j.__webglTexture,i.TEXTURE0+S)}function ee(P,S){let j=n.get(P);if(P.version>0&&j.__version!==P.version){U(j,P,S);return}t.bindTexture(i.TEXTURE_3D,j.__webglTexture,i.TEXTURE0+S)}function W(P,S){let j=n.get(P);if(P.version>0&&j.__version!==P.version){J(j,P,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture,i.TEXTURE0+S)}let z={[Ml]:i.REPEAT,[kr]:i.CLAMP_TO_EDGE,[wl]:i.MIRRORED_REPEAT},V={[jn]:i.NEAREST,[Hm]:i.NEAREST_MIPMAP_NEAREST,[Yo]:i.NEAREST_MIPMAP_LINEAR,[$n]:i.LINEAR,[Dc]:i.LINEAR_MIPMAP_NEAREST,[Hr]:i.LINEAR_MIPMAP_LINEAR},k={[Xm]:i.NEVER,[Jm]:i.ALWAYS,[qm]:i.LESS,[df]:i.LEQUAL,[Ym]:i.EQUAL,[Zm]:i.GEQUAL,[$m]:i.GREATER,[jm]:i.NOTEQUAL};function O(P,S){if(S.type===Ri&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===$n||S.magFilter===Dc||S.magFilter===Yo||S.magFilter===Hr||S.minFilter===$n||S.minFilter===Dc||S.minFilter===Yo||S.minFilter===Hr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,z[S.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,z[S.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,z[S.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,V[S.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,V[S.minFilter]),S.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,k[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===jn||S.minFilter!==Yo&&S.minFilter!==Hr||S.type===Ri&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let j=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function te(P,S){let j=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",E));let ce=S.source,le=p.get(ce);le===void 0&&(le={},p.set(ce,le));let pe=q(S);if(pe!==P.__cacheKey){le[pe]===void 0&&(le[pe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,j=!0),le[pe].usedTimes++;let Ye=le[P.__cacheKey];Ye!==void 0&&(le[P.__cacheKey].usedTimes--,Ye.usedTimes===0&&b(S)),P.__cacheKey=pe,P.__webglTexture=le[pe].texture}return j}function U(P,S,j){let ce=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ce=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ce=i.TEXTURE_3D);let le=te(P,S),pe=S.source;t.bindTexture(ce,P.__webglTexture,i.TEXTURE0+j);let Ye=n.get(pe);if(pe.version!==Ye.__version||le===!0){t.activeTexture(i.TEXTURE0+j);let Ee=Tt.getPrimaries(Tt.workingColorSpace),Oe=S.colorSpace===fr?null:Tt.getPrimaries(S.colorSpace),xt=S.colorSpace===fr||Ee===Oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let ve=x(S.image,!1,r.maxTextureSize);ve=ot(S,ve);let He=s.convert(S.format,S.colorSpace),je=s.convert(S.type),ze=y(S.internalFormat,He,je,S.colorSpace,S.isVideoTexture);O(ce,S);let Te,ft=S.mipmaps,at=S.isVideoTexture!==!0,Nt=Ye.__version===void 0||le===!0,L=pe.dataReady,Re=w(S,ve);if(S.isDepthTexture)ze=_(S.format===Ss,S.type),Nt&&(at?t.texStorage2D(i.TEXTURE_2D,1,ze,ve.width,ve.height):t.texImage2D(i.TEXTURE_2D,0,ze,ve.width,ve.height,0,He,je,null));else if(S.isDataTexture)if(ft.length>0){at&&Nt&&t.texStorage2D(i.TEXTURE_2D,Re,ze,ft[0].width,ft[0].height);for(let he=0,me=ft.length;he<me;he++)Te=ft[he],at?L&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Te.width,Te.height,He,je,Te.data):t.texImage2D(i.TEXTURE_2D,he,ze,Te.width,Te.height,0,He,je,Te.data);S.generateMipmaps=!1}else at?(Nt&&t.texStorage2D(i.TEXTURE_2D,Re,ze,ve.width,ve.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve.width,ve.height,He,je,ve.data)):t.texImage2D(i.TEXTURE_2D,0,ze,ve.width,ve.height,0,He,je,ve.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){at&&Nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,ze,ft[0].width,ft[0].height,ve.depth);for(let he=0,me=ft.length;he<me;he++)if(Te=ft[he],S.format!==yi)if(He!==null)if(at){if(L)if(S.layerUpdates.size>0){let Le=kd(Te.width,Te.height,S.format,S.type);for(let De of S.layerUpdates){let Ze=Te.data.subarray(De*Le/Te.data.BYTES_PER_ELEMENT,(De+1)*Le/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,De,Te.width,Te.height,1,He,Ze)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Te.width,Te.height,ve.depth,He,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,ze,Te.width,Te.height,ve.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Te.width,Te.height,ve.depth,He,je,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,ze,Te.width,Te.height,ve.depth,0,He,je,Te.data)}else{at&&Nt&&t.texStorage2D(i.TEXTURE_2D,Re,ze,ft[0].width,ft[0].height);for(let he=0,me=ft.length;he<me;he++)Te=ft[he],S.format!==yi?He!==null?at?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,Te.width,Te.height,He,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,he,ze,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?L&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Te.width,Te.height,He,je,Te.data):t.texImage2D(i.TEXTURE_2D,he,ze,Te.width,Te.height,0,He,je,Te.data)}else if(S.isDataArrayTexture)if(at){if(Nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,ze,ve.width,ve.height,ve.depth),L)if(S.layerUpdates.size>0){let he=kd(ve.width,ve.height,S.format,S.type);for(let me of S.layerUpdates){let Le=ve.data.subarray(me*he/ve.data.BYTES_PER_ELEMENT,(me+1)*he/ve.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ve.width,ve.height,1,He,je,Le)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,He,je,ve.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ze,ve.width,ve.height,ve.depth,0,He,je,ve.data);else if(S.isData3DTexture)at?(Nt&&t.texStorage3D(i.TEXTURE_3D,Re,ze,ve.width,ve.height,ve.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,He,je,ve.data)):t.texImage3D(i.TEXTURE_3D,0,ze,ve.width,ve.height,ve.depth,0,He,je,ve.data);else if(S.isFramebufferTexture){if(Nt)if(at)t.texStorage2D(i.TEXTURE_2D,Re,ze,ve.width,ve.height);else{let he=ve.width,me=ve.height;for(let Le=0;Le<Re;Le++)t.texImage2D(i.TEXTURE_2D,Le,ze,he,me,0,He,je,null),he>>=1,me>>=1}}else if(ft.length>0){if(at&&Nt){let he=Be(ft[0]);t.texStorage2D(i.TEXTURE_2D,Re,ze,he.width,he.height)}for(let he=0,me=ft.length;he<me;he++)Te=ft[he],at?L&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,He,je,Te):t.texImage2D(i.TEXTURE_2D,he,ze,He,je,Te);S.generateMipmaps=!1}else if(at){if(Nt){let he=Be(ve);t.texStorage2D(i.TEXTURE_2D,Re,ze,he.width,he.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,He,je,ve)}else t.texImage2D(i.TEXTURE_2D,0,ze,He,je,ve);m(S)&&d(ce),Ye.__version=pe.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function J(P,S,j){if(S.image.length!==6)return;let ce=te(P,S),le=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+j);let pe=n.get(le);if(le.version!==pe.__version||ce===!0){t.activeTexture(i.TEXTURE0+j);let Ye=Tt.getPrimaries(Tt.workingColorSpace),Ee=S.colorSpace===fr?null:Tt.getPrimaries(S.colorSpace),Oe=S.colorSpace===fr||Ye===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let xt=S.isCompressedTexture||S.image[0].isCompressedTexture,ve=S.image[0]&&S.image[0].isDataTexture,He=[];for(let me=0;me<6;me++)!xt&&!ve?He[me]=x(S.image[me],!0,r.maxCubemapSize):He[me]=ve?S.image[me].image:S.image[me],He[me]=ot(S,He[me]);let je=He[0],ze=s.convert(S.format,S.colorSpace),Te=s.convert(S.type),ft=y(S.internalFormat,ze,Te,S.colorSpace),at=S.isVideoTexture!==!0,Nt=pe.__version===void 0||ce===!0,L=le.dataReady,Re=w(S,je);O(i.TEXTURE_CUBE_MAP,S);let he;if(xt){at&&Nt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ft,je.width,je.height);for(let me=0;me<6;me++){he=He[me].mipmaps;for(let Le=0;Le<he.length;Le++){let De=he[Le];S.format!==yi?ze!==null?at?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le,0,0,De.width,De.height,ze,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le,ft,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):at?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le,0,0,De.width,De.height,ze,Te,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le,ft,De.width,De.height,0,ze,Te,De.data)}}}else{if(he=S.mipmaps,at&&Nt){he.length>0&&Re++;let me=Be(He[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ft,me.width,me.height)}for(let me=0;me<6;me++)if(ve){at?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,He[me].width,He[me].height,ze,Te,He[me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ft,He[me].width,He[me].height,0,ze,Te,He[me].data);for(let Le=0;Le<he.length;Le++){let Ze=he[Le].image[me].image;at?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le+1,0,0,Ze.width,Ze.height,ze,Te,Ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le+1,ft,Ze.width,Ze.height,0,ze,Te,Ze.data)}}else{at?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,ze,Te,He[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ft,ze,Te,He[me]);for(let Le=0;Le<he.length;Le++){let De=he[Le];at?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le+1,0,0,ze,Te,De.image[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le+1,ft,ze,Te,De.image[me])}}}m(S)&&d(i.TEXTURE_CUBE_MAP),pe.__version=le.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Q(P,S,j,ce,le,pe){let Ye=s.convert(j.format,j.colorSpace),Ee=s.convert(j.type),Oe=y(j.internalFormat,Ye,Ee,j.colorSpace),xt=n.get(S),ve=n.get(j);if(ve.__renderTarget=S,!xt.__hasExternalTextures){let He=Math.max(1,S.width>>pe),je=Math.max(1,S.height>>pe);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,pe,Oe,He,je,S.depth,0,Ye,Ee,null):t.texImage2D(le,pe,Oe,He,je,0,Ye,Ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),We(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,le,ve.__webglTexture,0,ne(S)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ce,le,ve.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(P,S,j){if(i.bindRenderbuffer(i.RENDERBUFFER,P),S.depthBuffer){let ce=S.depthTexture,le=ce&&ce.isDepthTexture?ce.type:null,pe=_(S.stencilBuffer,le),Ye=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=ne(S);We(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,pe,S.width,S.height):j?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,pe,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,pe,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ye,i.RENDERBUFFER,P)}else{let ce=S.textures;for(let le=0;le<ce.length;le++){let pe=ce[le],Ye=s.convert(pe.format,pe.colorSpace),Ee=s.convert(pe.type),Oe=y(pe.internalFormat,Ye,Ee,pe.colorSpace),xt=ne(S);j&&We(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,Oe,S.width,S.height):We(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,Oe,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Oe,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ae(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ce=n.get(S.depthTexture);ce.__renderTarget=S,(!ce.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);let le=ce.__webglTexture,pe=ne(S);if(S.depthTexture.format===xs)We(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0);else if(S.depthTexture.format===Ss)We(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function ie(P){let S=n.get(P),j=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){let ce=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),ce){let le=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,ce.removeEventListener("dispose",le)};ce.addEventListener("dispose",le),S.__depthDisposeCallback=le}S.__boundDepthTexture=ce}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");ae(S.__webglFramebuffer,P)}else if(j){S.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[ce]),S.__webglDepthbuffer[ce]===void 0)S.__webglDepthbuffer[ce]=i.createRenderbuffer(),ge(S.__webglDepthbuffer[ce],P,!1);else{let le=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer[ce];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,pe)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ge(S.__webglDepthbuffer,P,!1);else{let ce=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,le)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ae(P,S,j){let ce=n.get(P);S!==void 0&&Q(ce.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),j!==void 0&&ie(P)}function de(P){let S=P.texture,j=n.get(P),ce=n.get(S);P.addEventListener("dispose",A);let le=P.textures,pe=P.isWebGLCubeRenderTarget===!0,Ye=le.length>1;if(Ye||(ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture()),ce.__version=S.version,o.memory.textures++),pe){j.__webglFramebuffer=[];for(let Ee=0;Ee<6;Ee++)if(S.mipmaps&&S.mipmaps.length>0){j.__webglFramebuffer[Ee]=[];for(let Oe=0;Oe<S.mipmaps.length;Oe++)j.__webglFramebuffer[Ee][Oe]=i.createFramebuffer()}else j.__webglFramebuffer[Ee]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){j.__webglFramebuffer=[];for(let Ee=0;Ee<S.mipmaps.length;Ee++)j.__webglFramebuffer[Ee]=i.createFramebuffer()}else j.__webglFramebuffer=i.createFramebuffer();if(Ye)for(let Ee=0,Oe=le.length;Ee<Oe;Ee++){let xt=n.get(le[Ee]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&We(P)===!1){j.__webglMultisampledFramebuffer=i.createFramebuffer(),j.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let Ee=0;Ee<le.length;Ee++){let Oe=le[Ee];j.__webglColorRenderbuffer[Ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,j.__webglColorRenderbuffer[Ee]);let xt=s.convert(Oe.format,Oe.colorSpace),ve=s.convert(Oe.type),He=y(Oe.internalFormat,xt,ve,Oe.colorSpace,P.isXRRenderTarget===!0),je=ne(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,je,He,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,j.__webglColorRenderbuffer[Ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(j.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(j.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),O(i.TEXTURE_CUBE_MAP,S);for(let Ee=0;Ee<6;Ee++)if(S.mipmaps&&S.mipmaps.length>0)for(let Oe=0;Oe<S.mipmaps.length;Oe++)Q(j.__webglFramebuffer[Ee][Oe],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Oe);else Q(j.__webglFramebuffer[Ee],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0);m(S)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ye){for(let Ee=0,Oe=le.length;Ee<Oe;Ee++){let xt=le[Ee],ve=n.get(xt);t.bindTexture(i.TEXTURE_2D,ve.__webglTexture),O(i.TEXTURE_2D,xt),Q(j.__webglFramebuffer,P,xt,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,0),m(xt)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let Ee=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ee=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,ce.__webglTexture),O(Ee,S),S.mipmaps&&S.mipmaps.length>0)for(let Oe=0;Oe<S.mipmaps.length;Oe++)Q(j.__webglFramebuffer[Oe],P,S,i.COLOR_ATTACHMENT0,Ee,Oe);else Q(j.__webglFramebuffer,P,S,i.COLOR_ATTACHMENT0,Ee,0);m(S)&&d(Ee),t.unbindTexture()}P.depthBuffer&&ie(P)}function Y(P){let S=P.textures;for(let j=0,ce=S.length;j<ce;j++){let le=S[j];if(m(le)){let pe=v(P),Ye=n.get(le).__webglTexture;t.bindTexture(pe,Ye),d(pe),t.unbindTexture()}}}let G=[],B=[];function Se(P){if(P.samples>0){if(We(P)===!1){let S=P.textures,j=P.width,ce=P.height,le=i.COLOR_BUFFER_BIT,pe=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ye=n.get(P),Ee=S.length>1;if(Ee)for(let Oe=0;Oe<S.length;Oe++)t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer);for(let Oe=0;Oe<S.length;Oe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),Ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ye.__webglColorRenderbuffer[Oe]);let xt=n.get(S[Oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,xt,0)}i.blitFramebuffer(0,0,j,ce,0,0,j,ce,le,i.NEAREST),c===!0&&(G.length=0,B.length=0,G.push(i.COLOR_ATTACHMENT0+Oe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(G.push(pe),B.push(pe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,G))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Ee)for(let Oe=0;Oe<S.length;Oe++){t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.RENDERBUFFER,Ye.__webglColorRenderbuffer[Oe]);let xt=n.get(S[Oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.TEXTURE_2D,xt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let S=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function ne(P){return Math.min(r.maxSamples,P.samples)}function We(P){let S=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ie(P){let S=o.render.frame;u.get(P)!==S&&(u.set(P,S),P.update())}function ot(P,S){let j=P.colorSpace,ce=P.format,le=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||j!==Is&&j!==fr&&(Tt.getTransfer(j)===Bt?(ce!==yi||le!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),S}function Be(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.setTexture2D=X,this.setTexture2DArray=I,this.setTexture3D=ee,this.setTextureCube=W,this.rebindTextures=Ae,this.setupRenderTarget=de,this.updateRenderTargetMipmap=Y,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=We}function rv(i,e){function t(n,r=fr){let s,o=Tt.getTransfer(r);if(n===Ji)return i.UNSIGNED_BYTE;if(n===zu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Bu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tf)return i.BYTE;if(n===nf)return i.SHORT;if(n===ho)return i.UNSIGNED_SHORT;if(n===Ou)return i.INT;if(n===Ki)return i.UNSIGNED_INT;if(n===Ri)return i.FLOAT;if(n===vr)return i.HALF_FLOAT;if(n===sf)return i.ALPHA;if(n===of)return i.RGB;if(n===yi)return i.RGBA;if(n===af)return i.LUMINANCE;if(n===cf)return i.LUMINANCE_ALPHA;if(n===xs)return i.DEPTH_COMPONENT;if(n===Ss)return i.DEPTH_STENCIL;if(n===ku)return i.RED;if(n===Hu)return i.RED_INTEGER;if(n===lf)return i.RG;if(n===Vu)return i.RG_INTEGER;if(n===Gu)return i.RGBA_INTEGER;if(n===_a||n===va||n===ba||n===Ma)if(o===Bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===_a)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===va)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ba)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ma)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===_a)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===va)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ba)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ma)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sl||n===El||n===Al||n===Tl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Sl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===El)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Al)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Tl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rl||n===Cl||n===Pl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Rl||n===Cl)return o===Bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Pl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Il||n===Ll||n===Dl||n===Ul||n===Fl||n===Nl||n===Ol||n===zl||n===Bl||n===kl||n===Hl||n===Vl||n===Gl||n===Wl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Il)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ll)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Dl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ul)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Nl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ol)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Hl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wa||n===Xl||n===ql)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===wa)return o===Bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ql)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uf||n===Yl||n===$l||n===jl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===wa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Yl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$l)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var uu=class extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},yn=class extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}},sv={type:"move"},ao=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],p=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&p>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sv)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new yn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ov=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,av=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,hu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new Sn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ln({vertexShader:ov,fragmentShader:av,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new it(new yr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},du=class extends mr{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,p=null,f=null,g=null,x=new hu,m=t.getContextAttributes(),d=null,v=null,y=[],_=[],w=new ke,E=null,A=new In;A.viewport=new Zt;let T=new In;T.viewport=new Zt;let b=[A,T],M=new uu,C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let J=y[U];return J===void 0&&(J=new ao,y[U]=J),J.getTargetRaySpace()},this.getControllerGrip=function(U){let J=y[U];return J===void 0&&(J=new ao,y[U]=J),J.getGripSpace()},this.getHand=function(U){let J=y[U];return J===void 0&&(J=new ao,y[U]=J),J.getHandSpace()};function H(U){let J=_.indexOf(U.inputSource);if(J===-1)return;let Q=y[J];Q!==void 0&&(Q.update(U.inputSource,U.frame,l||o),Q.dispatchEvent({type:U.type,data:U.inputSource}))}function q(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",X);for(let U=0;U<y.length;U++){let J=_[U];J!==null&&(_[U]=null,y[U].disconnect(J))}C=null,F=null,x.reset(),e.setRenderTarget(d),f=null,p=null,h=null,r=null,v=null,te.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){s=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(U){if(r=U,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",q),r.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0){let J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new ni(f.framebufferWidth,f.framebufferHeight,{format:yi,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,Q=null,ge=null;m.depth&&(ge=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=m.stencil?Ss:xs,Q=m.stencil?ws:Ki);let ae={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:s};h=new XRWebGLBinding(r,t),p=h.createProjectionLayer(ae),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),v=new ni(p.textureWidth,p.textureHeight,{format:yi,type:Ji,depthTexture:new Ts(p.textureWidth,p.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),te.setContext(r),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function X(U){for(let J=0;J<U.removed.length;J++){let Q=U.removed[J],ge=_.indexOf(Q);ge>=0&&(_[ge]=null,y[ge].disconnect(Q))}for(let J=0;J<U.added.length;J++){let Q=U.added[J],ge=_.indexOf(Q);if(ge===-1){for(let ie=0;ie<y.length;ie++)if(ie>=_.length){_.push(Q),ge=ie;break}else if(_[ie]===null){_[ie]=Q,ge=ie;break}if(ge===-1)break}let ae=y[ge];ae&&ae.connect(Q)}}let I=new D,ee=new D;function W(U,J,Q){I.setFromMatrixPosition(J.matrixWorld),ee.setFromMatrixPosition(Q.matrixWorld);let ge=I.distanceTo(ee),ae=J.projectionMatrix.elements,ie=Q.projectionMatrix.elements,Ae=ae[14]/(ae[10]-1),de=ae[14]/(ae[10]+1),Y=(ae[9]+1)/ae[5],G=(ae[9]-1)/ae[5],B=(ae[8]-1)/ae[0],Se=(ie[8]+1)/ie[0],ne=Ae*B,We=Ae*Se,Ie=ge/(-B+Se),ot=Ie*-B;if(J.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(ot),U.translateZ(Ie),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),ae[10]===-1)U.projectionMatrix.copy(J.projectionMatrix),U.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let Be=Ae+Ie,P=de+Ie,S=ne-ot,j=We+(ge-ot),ce=Y*de/P*Be,le=G*de/P*Be;U.projectionMatrix.makePerspective(S,j,ce,le,Be,P),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function z(U,J){J===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(J.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(r===null)return;let J=U.near,Q=U.far;x.texture!==null&&(x.depthNear>0&&(J=x.depthNear),x.depthFar>0&&(Q=x.depthFar)),M.near=T.near=A.near=J,M.far=T.far=A.far=Q,(C!==M.near||F!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,F=M.far),A.layers.mask=U.layers.mask|2,T.layers.mask=U.layers.mask|4,M.layers.mask=A.layers.mask|T.layers.mask;let ge=U.parent,ae=M.cameras;z(M,ge);for(let ie=0;ie<ae.length;ie++)z(ae[ie],ge);ae.length===2?W(M,A,T):M.projectionMatrix.copy(A.projectionMatrix),V(U,M,ge)};function V(U,J,Q){Q===null?U.matrix.copy(J.matrixWorld):(U.matrix.copy(Q.matrixWorld),U.matrix.invert(),U.matrix.multiply(J.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(J.projectionMatrix),U.projectionMatrixInverse.copy(J.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=fo*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&f===null))return c},this.setFoveation=function(U){c=U,p!==null&&(p.fixedFoveation=U),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=U)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let k=null;function O(U,J){if(u=J.getViewerPose(l||o),g=J,u!==null){let Q=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ge=!1;Q.length!==M.cameras.length&&(M.cameras.length=0,ge=!0);for(let ie=0;ie<Q.length;ie++){let Ae=Q[ie],de=null;if(f!==null)de=f.getViewport(Ae);else{let G=h.getViewSubImage(p,Ae);de=G.viewport,ie===0&&(e.setRenderTargetTextures(v,G.colorTexture,p.ignoreDepthValues?void 0:G.depthStencilTexture),e.setRenderTarget(v))}let Y=b[ie];Y===void 0&&(Y=new In,Y.layers.enable(ie),Y.viewport=new Zt,b[ie]=Y),Y.matrix.fromArray(Ae.transform.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.projectionMatrix.fromArray(Ae.projectionMatrix),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert(),Y.viewport.set(de.x,de.y,de.width,de.height),ie===0&&(M.matrix.copy(Y.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ge===!0&&M.cameras.push(Y)}let ae=r.enabledFeatures;if(ae&&ae.includes("depth-sensing")){let ie=h.getDepthInformation(Q[0]);ie&&ie.isValid&&ie.texture&&x.init(e,ie,r.renderState)}}for(let Q=0;Q<y.length;Q++){let ge=_[Q],ae=y[Q];ge!==null&&ae!==void 0&&ae.update(ge,J,l||o)}k&&k(U,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let te=new gf;te.setAnimationLoop(O),this.setAnimationLoop=function(U){k=U},this.dispose=function(){}}},Fr=new Nn,cv=new bt;function lv(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,mf(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,v,y,_){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),p(m,d),d.isMeshPhysicalMaterial&&f(m,d,_)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),x(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,v,y):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Fn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Fn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let v=e.get(d),y=v.envMap,_=v.envMapRotation;y&&(m.envMap.value=y,Fr.copy(_),Fr.x*=-1,Fr.y*=-1,Fr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Fr.y*=-1,Fr.z*=-1),m.envMapRotation.value.setFromMatrix4(cv.makeRotationFromEuler(Fr)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,v,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=y*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function p(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function f(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Fn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function uv(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){let _=y.program;n.uniformBlockBinding(v,_)}function l(v,y){let _=r[v.id];_===void 0&&(g(v),_=u(v),r[v.id]=_,v.addEventListener("dispose",m));let w=y.program;n.updateUBOMapping(v,w);let E=e.render.frame;s[v.id]!==E&&(p(v),s[v.id]=E)}function u(v){let y=h();v.__bindingPointIndex=y;let _=i.createBuffer(),w=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,w,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(v){let y=r[v.id],_=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,A=_.length;E<A;E++){let T=Array.isArray(_[E])?_[E]:[_[E]];for(let b=0,M=T.length;b<M;b++){let C=T[b];if(f(C,E,b,w)===!0){let F=C.__offset,H=Array.isArray(C.value)?C.value:[C.value],q=0;for(let X=0;X<H.length;X++){let I=H[X],ee=x(I);typeof I=="number"||typeof I=="boolean"?(C.__data[0]=I,i.bufferSubData(i.UNIFORM_BUFFER,F+q,C.__data)):I.isMatrix3?(C.__data[0]=I.elements[0],C.__data[1]=I.elements[1],C.__data[2]=I.elements[2],C.__data[3]=0,C.__data[4]=I.elements[3],C.__data[5]=I.elements[4],C.__data[6]=I.elements[5],C.__data[7]=0,C.__data[8]=I.elements[6],C.__data[9]=I.elements[7],C.__data[10]=I.elements[8],C.__data[11]=0):(I.toArray(C.__data,q),q+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,_,w){let E=v.value,A=y+"_"+_;if(w[A]===void 0)return typeof E=="number"||typeof E=="boolean"?w[A]=E:w[A]=E.clone(),!0;{let T=w[A];if(typeof E=="number"||typeof E=="boolean"){if(T!==E)return w[A]=E,!0}else if(T.equals(E)===!1)return T.copy(E),!0}return!1}function g(v){let y=v.uniforms,_=0,w=16;for(let A=0,T=y.length;A<T;A++){let b=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,C=b.length;M<C;M++){let F=b[M],H=Array.isArray(F.value)?F.value:[F.value];for(let q=0,X=H.length;q<X;q++){let I=H[q],ee=x(I),W=_%w,z=W%ee.boundary,V=W+z;_+=z,V!==0&&w-V<ee.storage&&(_+=w-V),F.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=_,_+=ee.storage}}}let E=_%w;return E>0&&(_+=w-E),v.__size=_,v.__cache={},this}function x(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){let y=v.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(let v in r)i.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:c,update:l,dispose:d}}var Ua=class{constructor(e={}){let{canvas:t=pg(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,d=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xn,this.toneMapping=Pi,this.toneMappingExposure=1;let _=this,w=!1,E=0,A=0,T=null,b=-1,M=null,C=new Zt,F=new Zt,H=null,q=new Je(0),X=0,I=t.width,ee=t.height,W=1,z=null,V=null,k=new Zt(0,0,I,ee),O=new Zt(0,0,I,ee),te=!1,U=new go,J=!1,Q=!1,ge=new bt,ae=new bt,ie=new D,Ae=new Zt,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Y=!1;function G(){return T===null?W:1}let B=n;function Se(R,Z){return t.getContext(R,Z)}try{let R={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uu}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",De,!1),B===null){let Z="webgl2";if(B=Se(Z,R),B===null)throw Se(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ne,We,Ie,ot,Be,P,S,j,ce,le,pe,Ye,Ee,Oe,xt,ve,He,je,ze,Te,ft,at,Nt,L;function Re(){ne=new Ay(B),ne.init(),at=new rv(B,ne),We=new vy(B,ne,e,at),Ie=new tv(B,ne),We.reverseDepthBuffer&&p&&Ie.buffers.depth.setReversed(!0),ot=new Cy(B),Be=new V_,P=new iv(B,ne,Ie,Be,We,at,ot),S=new My(_),j=new Ey(_),ce=new Ng(B),Nt=new yy(B,ce),le=new Ty(B,ce,ot,Nt),pe=new Iy(B,le,ce,ot),ze=new Py(B,We,P),ve=new by(Be),Ye=new H_(_,S,j,ne,We,Nt,ve),Ee=new lv(_,Be),Oe=new W_,xt=new Z_(ne),je=new xy(_,S,j,Ie,pe,f,c),He=new Q_(_,pe,We),L=new uv(B,ot,We,Ie),Te=new _y(B,ne,ot),ft=new Ry(B,ne,ot),ot.programs=Ye.programs,_.capabilities=We,_.extensions=ne,_.properties=Be,_.renderLists=Oe,_.shadowMap=He,_.state=Ie,_.info=ot}Re();let he=new du(_,B);this.xr=he,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let R=ne.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=ne.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(R){R!==void 0&&(W=R,this.setSize(I,ee,!1))},this.getSize=function(R){return R.set(I,ee)},this.setSize=function(R,Z,re=!0){if(he.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=R,ee=Z,t.width=Math.floor(R*W),t.height=Math.floor(Z*W),re===!0&&(t.style.width=R+"px",t.style.height=Z+"px"),this.setViewport(0,0,R,Z)},this.getDrawingBufferSize=function(R){return R.set(I*W,ee*W).floor()},this.setDrawingBufferSize=function(R,Z,re){I=R,ee=Z,W=re,t.width=Math.floor(R*re),t.height=Math.floor(Z*re),this.setViewport(0,0,R,Z)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(k)},this.setViewport=function(R,Z,re,se){R.isVector4?k.set(R.x,R.y,R.z,R.w):k.set(R,Z,re,se),Ie.viewport(C.copy(k).multiplyScalar(W).round())},this.getScissor=function(R){return R.copy(O)},this.setScissor=function(R,Z,re,se){R.isVector4?O.set(R.x,R.y,R.z,R.w):O.set(R,Z,re,se),Ie.scissor(F.copy(O).multiplyScalar(W).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(R){Ie.setScissorTest(te=R)},this.setOpaqueSort=function(R){z=R},this.setTransparentSort=function(R){V=R},this.getClearColor=function(R){return R.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor.apply(je,arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha.apply(je,arguments)},this.clear=function(R=!0,Z=!0,re=!0){let se=0;if(R){let K=!1;if(T!==null){let Me=T.texture.format;K=Me===Gu||Me===Vu||Me===Hu}if(K){let Me=T.texture.type,Ue=Me===Ji||Me===Ki||Me===ho||Me===ws||Me===zu||Me===Bu,Ve=je.getClearColor(),Ge=je.getClearAlpha(),nt=Ve.r,ut=Ve.g,Xe=Ve.b;Ue?(g[0]=nt,g[1]=ut,g[2]=Xe,g[3]=Ge,B.clearBufferuiv(B.COLOR,0,g)):(x[0]=nt,x[1]=ut,x[2]=Xe,x[3]=Ge,B.clearBufferiv(B.COLOR,0,x))}else se|=B.COLOR_BUFFER_BIT}Z&&(se|=B.DEPTH_BUFFER_BIT),re&&(se|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",De,!1),Oe.dispose(),xt.dispose(),Be.dispose(),S.dispose(),j.dispose(),pe.dispose(),Nt.dispose(),L.dispose(),Ye.dispose(),he.dispose(),he.removeEventListener("sessionstart",hi),he.removeEventListener("sessionend",Vs),Bi.stop()};function me(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Le(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let R=ot.autoReset,Z=He.enabled,re=He.autoUpdate,se=He.needsUpdate,K=He.type;Re(),ot.autoReset=R,He.enabled=Z,He.autoUpdate=re,He.needsUpdate=se,He.type=K}function De(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ze(R){let Z=R.target;Z.removeEventListener("dispose",Ze),kt(Z)}function kt(R){rn(R),Be.remove(R)}function rn(R){let Z=Be.get(R).programs;Z!==void 0&&(Z.forEach(function(re){Ye.releaseProgram(re)}),R.isShaderMaterial&&Ye.releaseShaderCache(R))}this.renderBufferDirect=function(R,Z,re,se,K,Me){Z===null&&(Z=de);let Ue=K.isMesh&&K.matrixWorld.determinant()<0,Ve=Ws(R,Z,re,se,K);Ie.setMaterial(se,Ue);let Ge=re.index,nt=1;if(se.wireframe===!0){if(Ge=le.getWireframeAttribute(re),Ge===void 0)return;nt=2}let ut=re.drawRange,Xe=re.attributes.position,_t=ut.start*nt,ht=(ut.start+ut.count)*nt;Me!==null&&(_t=Math.max(_t,Me.start*nt),ht=Math.min(ht,(Me.start+Me.count)*nt)),Ge!==null?(_t=Math.max(_t,0),ht=Math.min(ht,Ge.count)):Xe!=null&&(_t=Math.max(_t,0),ht=Math.min(ht,Xe.count));let Rt=ht-_t;if(Rt<0||Rt===1/0)return;Nt.setup(K,se,Ve,re,Ge);let hn,Et=Te;if(Ge!==null&&(hn=ce.get(Ge),Et=ft,Et.setIndex(hn)),K.isMesh)se.wireframe===!0?(Ie.setLineWidth(se.wireframeLinewidth*G()),Et.setMode(B.LINES)):Et.setMode(B.TRIANGLES);else if(K.isLine){let qe=se.linewidth;qe===void 0&&(qe=1),Ie.setLineWidth(qe*G()),K.isLineSegments?Et.setMode(B.LINES):K.isLineLoop?Et.setMode(B.LINE_LOOP):Et.setMode(B.LINE_STRIP)}else K.isPoints?Et.setMode(B.POINTS):K.isSprite&&Et.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Et.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))Et.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let qe=K._multiDrawStarts,tn=K._multiDrawCounts,vt=K._multiDrawCount,An=Ge?ce.get(Ge).bytesPerElement:1,Qn=Be.get(se).currentProgram.getUniforms();for(let Tn=0;Tn<vt;Tn++)Qn.setValue(B,"_gl_DrawID",Tn),Et.render(qe[Tn]/An,tn[Tn])}else if(K.isInstancedMesh)Et.renderInstances(_t,Rt,K.count);else if(re.isInstancedBufferGeometry){let qe=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,tn=Math.min(re.instanceCount,qe);Et.renderInstances(_t,Rt,tn)}else Et.render(_t,Rt)};function St(R,Z,re){R.transparent===!0&&R.side===Vt&&R.forceSinglePass===!1?(R.side=Fn,R.needsUpdate=!0,Rr(R,Z,re),R.side=pr,R.needsUpdate=!0,Rr(R,Z,re),R.side=Vt):Rr(R,Z,re)}this.compile=function(R,Z,re=null){re===null&&(re=R),d=xt.get(re),d.init(Z),y.push(d),re.traverseVisible(function(K){K.isLight&&K.layers.test(Z.layers)&&(d.pushLight(K),K.castShadow&&d.pushShadow(K))}),R!==re&&R.traverseVisible(function(K){K.isLight&&K.layers.test(Z.layers)&&(d.pushLight(K),K.castShadow&&d.pushShadow(K))}),d.setupLights();let se=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let Me=K.material;if(Me)if(Array.isArray(Me))for(let Ue=0;Ue<Me.length;Ue++){let Ve=Me[Ue];St(Ve,re,K),se.add(Ve)}else St(Me,re,K),se.add(Me)}),y.pop(),d=null,se},this.compileAsync=function(R,Z,re=null){let se=this.compile(R,Z,re);return new Promise(K=>{function Me(){if(se.forEach(function(Ue){Be.get(Ue).currentProgram.isReady()&&se.delete(Ue)}),se.size===0){K(R);return}setTimeout(Me,10)}ne.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let _n=null;function ui(R){_n&&_n(R)}function hi(){Bi.stop()}function Vs(){Bi.start()}let Bi=new gf;Bi.setAnimationLoop(ui),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(R){_n=R,he.setAnimationLoop(R),R===null?Bi.stop():Bi.start()},he.addEventListener("sessionstart",hi),he.addEventListener("sessionend",Vs),this.render=function(R,Z){if(Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(he.cameraAutoUpdate===!0&&he.updateCamera(Z),Z=he.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,Z,T),d=xt.get(R,y.length),d.init(Z),y.push(d),ae.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),U.setFromProjectionMatrix(ae),Q=this.localClippingEnabled,J=ve.init(this.clippingPlanes,Q),m=Oe.get(R,v.length),m.init(),v.push(m),he.enabled===!0&&he.isPresenting===!0){let Me=_.xr.getDepthSensingMesh();Me!==null&&rr(Me,Z,-1/0,_.sortObjects)}rr(R,Z,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(z,V),Y=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,Y&&je.addToRenderList(m,R),this.info.render.frame++,J===!0&&ve.beginShadows();let re=d.state.shadowsArray;He.render(re,R,Z),J===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset();let se=m.opaque,K=m.transmissive;if(d.setupLights(),Z.isArrayCamera){let Me=Z.cameras;if(K.length>0)for(let Ue=0,Ve=Me.length;Ue<Ve;Ue++){let Ge=Me[Ue];Ar(se,K,R,Ge)}Y&&je.render(R);for(let Ue=0,Ve=Me.length;Ue<Ve;Ue++){let Ge=Me[Ue];Er(m,R,Ge,Ge.viewport)}}else K.length>0&&Ar(se,K,R,Z),Y&&je.render(R),Er(m,R,Z);T!==null&&(P.updateMultisampleRenderTarget(T),P.updateRenderTargetMipmap(T)),R.isScene===!0&&R.onAfterRender(_,R,Z),Nt.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(d=y[y.length-1],J===!0&&ve.setGlobalState(_.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function rr(R,Z,re,se){if(R.visible===!1)return;if(R.layers.test(Z.layers)){if(R.isGroup)re=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Z);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||U.intersectsSprite(R)){se&&Ae.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ae);let Ue=pe.update(R),Ve=R.material;Ve.visible&&m.push(R,Ue,Ve,re,Ae.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||U.intersectsObject(R))){let Ue=pe.update(R),Ve=R.material;if(se&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ae.copy(R.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Ae.copy(Ue.boundingSphere.center)),Ae.applyMatrix4(R.matrixWorld).applyMatrix4(ae)),Array.isArray(Ve)){let Ge=Ue.groups;for(let nt=0,ut=Ge.length;nt<ut;nt++){let Xe=Ge[nt],_t=Ve[Xe.materialIndex];_t&&_t.visible&&m.push(R,Ue,_t,re,Ae.z,Xe)}}else Ve.visible&&m.push(R,Ue,Ve,re,Ae.z,null)}}let Me=R.children;for(let Ue=0,Ve=Me.length;Ue<Ve;Ue++)rr(Me[Ue],Z,re,se)}function Er(R,Z,re,se){let K=R.opaque,Me=R.transmissive,Ue=R.transparent;d.setupLightsView(re),J===!0&&ve.setGlobalState(_.clippingPlanes,re),se&&Ie.viewport(C.copy(se)),K.length>0&&Tr(K,Z,re),Me.length>0&&Tr(Me,Z,re),Ue.length>0&&Tr(Ue,Z,re),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Ar(R,Z,re,se){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[se.id]===void 0&&(d.state.transmissionRenderTarget[se.id]=new ni(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?vr:Ji,minFilter:Hr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace}));let Me=d.state.transmissionRenderTarget[se.id],Ue=se.viewport||C;Me.setSize(Ue.z,Ue.w);let Ve=_.getRenderTarget();_.setRenderTarget(Me),_.getClearColor(q),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),Y&&je.render(re);let Ge=_.toneMapping;_.toneMapping=Pi;let nt=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),d.setupLightsView(se),J===!0&&ve.setGlobalState(_.clippingPlanes,se),Tr(R,re,se),P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me),ne.has("WEBGL_multisampled_render_to_texture")===!1){let ut=!1;for(let Xe=0,_t=Z.length;Xe<_t;Xe++){let ht=Z[Xe],Rt=ht.object,hn=ht.geometry,Et=ht.material,qe=ht.group;if(Et.side===Vt&&Rt.layers.test(se.layers)){let tn=Et.side;Et.side=Fn,Et.needsUpdate=!0,Kn(Rt,re,se,hn,Et,qe),Et.side=tn,Et.needsUpdate=!0,ut=!0}}ut===!0&&(P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me))}_.setRenderTarget(Ve),_.setClearColor(q,X),nt!==void 0&&(se.viewport=nt),_.toneMapping=Ge}function Tr(R,Z,re){let se=Z.isScene===!0?Z.overrideMaterial:null;for(let K=0,Me=R.length;K<Me;K++){let Ue=R[K],Ve=Ue.object,Ge=Ue.geometry,nt=se===null?Ue.material:se,ut=Ue.group;Ve.layers.test(re.layers)&&Kn(Ve,Z,re,Ge,nt,ut)}}function Kn(R,Z,re,se,K,Me){R.onBeforeRender(_,Z,re,se,K,Me),R.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(_,Z,re,se,R,Me),K.transparent===!0&&K.side===Vt&&K.forceSinglePass===!1?(K.side=Fn,K.needsUpdate=!0,_.renderBufferDirect(re,Z,se,K,R,Me),K.side=pr,K.needsUpdate=!0,_.renderBufferDirect(re,Z,se,K,R,Me),K.side=Vt):_.renderBufferDirect(re,Z,se,K,R,Me),R.onAfterRender(_,Z,re,se,K,Me)}function Rr(R,Z,re){Z.isScene!==!0&&(Z=de);let se=Be.get(R),K=d.state.lights,Me=d.state.shadowsArray,Ue=K.state.version,Ve=Ye.getParameters(R,K.state,Me,Z,re),Ge=Ye.getProgramCacheKey(Ve),nt=se.programs;se.environment=R.isMeshStandardMaterial?Z.environment:null,se.fog=Z.fog,se.envMap=(R.isMeshStandardMaterial?j:S).get(R.envMap||se.environment),se.envMapRotation=se.environment!==null&&R.envMap===null?Z.environmentRotation:R.envMapRotation,nt===void 0&&(R.addEventListener("dispose",Ze),nt=new Map,se.programs=nt);let ut=nt.get(Ge);if(ut!==void 0){if(se.currentProgram===ut&&se.lightsStateVersion===Ue)return jr(R,Ve),ut}else Ve.uniforms=Ye.getUniforms(R),R.onBeforeCompile(Ve,_),ut=Ye.acquireProgram(Ve,Ge),nt.set(Ge,ut),se.uniforms=Ve.uniforms;let Xe=se.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Xe.clippingPlanes=ve.uniform),jr(R,Ve),se.needsLights=Ho(R),se.lightsStateVersion=Ue,se.needsLights&&(Xe.ambientLightColor.value=K.state.ambient,Xe.lightProbe.value=K.state.probe,Xe.directionalLights.value=K.state.directional,Xe.directionalLightShadows.value=K.state.directionalShadow,Xe.spotLights.value=K.state.spot,Xe.spotLightShadows.value=K.state.spotShadow,Xe.rectAreaLights.value=K.state.rectArea,Xe.ltc_1.value=K.state.rectAreaLTC1,Xe.ltc_2.value=K.state.rectAreaLTC2,Xe.pointLights.value=K.state.point,Xe.pointLightShadows.value=K.state.pointShadow,Xe.hemisphereLights.value=K.state.hemi,Xe.directionalShadowMap.value=K.state.directionalShadowMap,Xe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Xe.spotShadowMap.value=K.state.spotShadowMap,Xe.spotLightMatrix.value=K.state.spotLightMatrix,Xe.spotLightMap.value=K.state.spotLightMap,Xe.pointShadowMap.value=K.state.pointShadowMap,Xe.pointShadowMatrix.value=K.state.pointShadowMatrix),se.currentProgram=ut,se.uniformsList=null,ut}function Gs(R){if(R.uniformsList===null){let Z=R.currentProgram.getUniforms();R.uniformsList=_s.seqWithValue(Z.seq,R.uniforms)}return R.uniformsList}function jr(R,Z){let re=Be.get(R);re.outputColorSpace=Z.outputColorSpace,re.batching=Z.batching,re.batchingColor=Z.batchingColor,re.instancing=Z.instancing,re.instancingColor=Z.instancingColor,re.instancingMorph=Z.instancingMorph,re.skinning=Z.skinning,re.morphTargets=Z.morphTargets,re.morphNormals=Z.morphNormals,re.morphColors=Z.morphColors,re.morphTargetsCount=Z.morphTargetsCount,re.numClippingPlanes=Z.numClippingPlanes,re.numIntersection=Z.numClipIntersection,re.vertexAlphas=Z.vertexAlphas,re.vertexTangents=Z.vertexTangents,re.toneMapping=Z.toneMapping}function Ws(R,Z,re,se,K){Z.isScene!==!0&&(Z=de),P.resetTextureUnits();let Me=Z.fog,Ue=se.isMeshStandardMaterial?Z.environment:null,Ve=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Is,Ge=(se.isMeshStandardMaterial?j:S).get(se.envMap||Ue),nt=se.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,ut=!!re.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),Xe=!!re.morphAttributes.position,_t=!!re.morphAttributes.normal,ht=!!re.morphAttributes.color,Rt=Pi;se.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Rt=_.toneMapping);let hn=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,Et=hn!==void 0?hn.length:0,qe=Be.get(se),tn=d.state.lights;if(J===!0&&(Q===!0||R!==M)){let gn=R===M&&se.id===b;ve.setState(se,R,gn)}let vt=!1;se.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==tn.state.version||qe.outputColorSpace!==Ve||K.isBatchedMesh&&qe.batching===!1||!K.isBatchedMesh&&qe.batching===!0||K.isBatchedMesh&&qe.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&qe.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&qe.instancing===!1||!K.isInstancedMesh&&qe.instancing===!0||K.isSkinnedMesh&&qe.skinning===!1||!K.isSkinnedMesh&&qe.skinning===!0||K.isInstancedMesh&&qe.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&qe.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&qe.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&qe.instancingMorph===!1&&K.morphTexture!==null||qe.envMap!==Ge||se.fog===!0&&qe.fog!==Me||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==ve.numPlanes||qe.numIntersection!==ve.numIntersection)||qe.vertexAlphas!==nt||qe.vertexTangents!==ut||qe.morphTargets!==Xe||qe.morphNormals!==_t||qe.morphColors!==ht||qe.toneMapping!==Rt||qe.morphTargetsCount!==Et)&&(vt=!0):(vt=!0,qe.__version=se.version);let An=qe.currentProgram;vt===!0&&(An=Rr(se,Z,K));let Qn=!1,Tn=!1,ki=!1,mt=An.getUniforms(),Lt=qe.uniforms;if(Ie.useProgram(An.program)&&(Qn=!0,Tn=!0,ki=!0),se.id!==b&&(b=se.id,Tn=!0),Qn||M!==R){Ie.buffers.depth.getReversed()?(ge.copy(R.projectionMatrix),gg(ge),xg(ge),mt.setValue(B,"projectionMatrix",ge)):mt.setValue(B,"projectionMatrix",R.projectionMatrix),mt.setValue(B,"viewMatrix",R.matrixWorldInverse);let Gn=mt.map.cameraPosition;Gn!==void 0&&Gn.setValue(B,ie.setFromMatrixPosition(R.matrixWorld)),We.logarithmicDepthBuffer&&mt.setValue(B,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&mt.setValue(B,"isOrthographic",R.isOrthographicCamera===!0),M!==R&&(M=R,Tn=!0,ki=!0)}if(K.isSkinnedMesh){mt.setOptional(B,K,"bindMatrix"),mt.setOptional(B,K,"bindMatrixInverse");let gn=K.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),mt.setValue(B,"boneTexture",gn.boneTexture,P))}K.isBatchedMesh&&(mt.setOptional(B,K,"batchingTexture"),mt.setValue(B,"batchingTexture",K._matricesTexture,P),mt.setOptional(B,K,"batchingIdTexture"),mt.setValue(B,"batchingIdTexture",K._indirectTexture,P),mt.setOptional(B,K,"batchingColorTexture"),K._colorsTexture!==null&&mt.setValue(B,"batchingColorTexture",K._colorsTexture,P));let di=re.morphAttributes;if((di.position!==void 0||di.normal!==void 0||di.color!==void 0)&&ze.update(K,re,An),(Tn||qe.receiveShadow!==K.receiveShadow)&&(qe.receiveShadow=K.receiveShadow,mt.setValue(B,"receiveShadow",K.receiveShadow)),se.isMeshGouraudMaterial&&se.envMap!==null&&(Lt.envMap.value=Ge,Lt.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),se.isMeshStandardMaterial&&se.envMap===null&&Z.environment!==null&&(Lt.envMapIntensity.value=Z.environmentIntensity),Tn&&(mt.setValue(B,"toneMappingExposure",_.toneMappingExposure),qe.needsLights&&ko(Lt,ki),Me&&se.fog===!0&&Ee.refreshFogUniforms(Lt,Me),Ee.refreshMaterialUniforms(Lt,se,W,ee,d.state.transmissionRenderTarget[R.id]),_s.upload(B,Gs(qe),Lt,P)),se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(_s.upload(B,Gs(qe),Lt,P),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&mt.setValue(B,"center",K.center),mt.setValue(B,"modelViewMatrix",K.modelViewMatrix),mt.setValue(B,"normalMatrix",K.normalMatrix),mt.setValue(B,"modelMatrix",K.matrixWorld),se.isShaderMaterial||se.isRawShaderMaterial){let gn=se.uniformsGroups;for(let Gn=0,Un=gn.length;Gn<Un;Gn++){let wi=gn[Gn];L.update(wi,An),L.bind(wi,An)}}return An}function ko(R,Z){R.ambientLightColor.needsUpdate=Z,R.lightProbe.needsUpdate=Z,R.directionalLights.needsUpdate=Z,R.directionalLightShadows.needsUpdate=Z,R.pointLights.needsUpdate=Z,R.pointLightShadows.needsUpdate=Z,R.spotLights.needsUpdate=Z,R.spotLightShadows.needsUpdate=Z,R.rectAreaLights.needsUpdate=Z,R.hemisphereLights.needsUpdate=Z}function Ho(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(R,Z,re){Be.get(R.texture).__webglTexture=Z,Be.get(R.depthTexture).__webglTexture=re;let se=Be.get(R);se.__hasExternalTextures=!0,se.__autoAllocateDepthBuffer=re===void 0,se.__autoAllocateDepthBuffer||ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),se.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,Z){let re=Be.get(R);re.__webglFramebuffer=Z,re.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(R,Z=0,re=0){T=R,E=Z,A=re;let se=!0,K=null,Me=!1,Ue=!1;if(R){let Ge=Be.get(R);if(Ge.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(B.FRAMEBUFFER,null),se=!1;else if(Ge.__webglFramebuffer===void 0)P.setupRenderTarget(R);else if(Ge.__hasExternalTextures)P.rebindTextures(R,Be.get(R.texture).__webglTexture,Be.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Xe=R.depthTexture;if(Ge.__boundDepthTexture!==Xe){if(Xe!==null&&Be.has(Xe)&&(R.width!==Xe.image.width||R.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(R)}}let nt=R.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Ue=!0);let ut=Be.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ut[Z])?K=ut[Z][re]:K=ut[Z],Me=!0):R.samples>0&&P.useMultisampledRTT(R)===!1?K=Be.get(R).__webglMultisampledFramebuffer:Array.isArray(ut)?K=ut[re]:K=ut,C.copy(R.viewport),F.copy(R.scissor),H=R.scissorTest}else C.copy(k).multiplyScalar(W).floor(),F.copy(O).multiplyScalar(W).floor(),H=te;if(Ie.bindFramebuffer(B.FRAMEBUFFER,K)&&se&&Ie.drawBuffers(R,K),Ie.viewport(C),Ie.scissor(F),Ie.setScissorTest(H),Me){let Ge=Be.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ge.__webglTexture,re)}else if(Ue){let Ge=Be.get(R.texture),nt=Z||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ge.__webglTexture,re||0,nt)}b=-1},this.readRenderTargetPixels=function(R,Z,re,se,K,Me,Ue){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=Be.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ve=Ve[Ue]),Ve){Ie.bindFramebuffer(B.FRAMEBUFFER,Ve);try{let Ge=R.texture,nt=Ge.format,ut=Ge.type;if(!We.textureFormatReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=R.width-se&&re>=0&&re<=R.height-K&&B.readPixels(Z,re,se,K,at.convert(nt),at.convert(ut),Me)}finally{let Ge=T!==null?Be.get(T).__webglFramebuffer:null;Ie.bindFramebuffer(B.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(R,Z,re,se,K,Me,Ue){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=Be.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ve=Ve[Ue]),Ve){let Ge=R.texture,nt=Ge.format,ut=Ge.type;if(!We.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Z>=0&&Z<=R.width-se&&re>=0&&re<=R.height-K){Ie.bindFramebuffer(B.FRAMEBUFFER,Ve);let Xe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Xe),B.bufferData(B.PIXEL_PACK_BUFFER,Me.byteLength,B.STREAM_READ),B.readPixels(Z,re,se,K,at.convert(nt),at.convert(ut),0);let _t=T!==null?Be.get(T).__webglFramebuffer:null;Ie.bindFramebuffer(B.FRAMEBUFFER,_t);let ht=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await mg(B,ht,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Xe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Me),B.deleteBuffer(Xe),B.deleteSync(ht),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,Z=null,re=0){R.isTexture!==!0&&(io("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Z=arguments[0]||null,R=arguments[1]);let se=Math.pow(2,-re),K=Math.floor(R.image.width*se),Me=Math.floor(R.image.height*se),Ue=Z!==null?Z.x:0,Ve=Z!==null?Z.y:0;P.setTexture2D(R,0),B.copyTexSubImage2D(B.TEXTURE_2D,re,0,0,Ue,Ve,K,Me),Ie.unbindTexture()},this.copyTextureToTexture=function(R,Z,re=null,se=null,K=0){R.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture function signature has changed."),se=arguments[0]||null,R=arguments[1],Z=arguments[2],K=arguments[3]||0,re=null);let Me,Ue,Ve,Ge,nt,ut,Xe,_t,ht,Rt=R.isCompressedTexture?R.mipmaps[K]:R.image;re!==null?(Me=re.max.x-re.min.x,Ue=re.max.y-re.min.y,Ve=re.isBox3?re.max.z-re.min.z:1,Ge=re.min.x,nt=re.min.y,ut=re.isBox3?re.min.z:0):(Me=Rt.width,Ue=Rt.height,Ve=Rt.depth||1,Ge=0,nt=0,ut=0),se!==null?(Xe=se.x,_t=se.y,ht=se.z):(Xe=0,_t=0,ht=0);let hn=at.convert(Z.format),Et=at.convert(Z.type),qe;Z.isData3DTexture?(P.setTexture3D(Z,0),qe=B.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(P.setTexture2DArray(Z,0),qe=B.TEXTURE_2D_ARRAY):(P.setTexture2D(Z,0),qe=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,Z.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,Z.unpackAlignment);let tn=B.getParameter(B.UNPACK_ROW_LENGTH),vt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),An=B.getParameter(B.UNPACK_SKIP_PIXELS),Qn=B.getParameter(B.UNPACK_SKIP_ROWS),Tn=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Rt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Rt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ge),B.pixelStorei(B.UNPACK_SKIP_ROWS,nt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ut);let ki=R.isDataArrayTexture||R.isData3DTexture,mt=Z.isDataArrayTexture||Z.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){let Lt=Be.get(R),di=Be.get(Z),gn=Be.get(Lt.__renderTarget),Gn=Be.get(di.__renderTarget);Ie.bindFramebuffer(B.READ_FRAMEBUFFER,gn.__webglFramebuffer),Ie.bindFramebuffer(B.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Un=0;Un<Ve;Un++)ki&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Be.get(R).__webglTexture,K,ut+Un),R.isDepthTexture?(mt&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Be.get(Z).__webglTexture,K,ht+Un),B.blitFramebuffer(Ge,nt,Me,Ue,Xe,_t,Me,Ue,B.DEPTH_BUFFER_BIT,B.NEAREST)):mt?B.copyTexSubImage3D(qe,K,Xe,_t,ht+Un,Ge,nt,Me,Ue):B.copyTexSubImage2D(qe,K,Xe,_t,ht+Un,Ge,nt,Me,Ue);Ie.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else mt?R.isDataTexture||R.isData3DTexture?B.texSubImage3D(qe,K,Xe,_t,ht,Me,Ue,Ve,hn,Et,Rt.data):Z.isCompressedArrayTexture?B.compressedTexSubImage3D(qe,K,Xe,_t,ht,Me,Ue,Ve,hn,Rt.data):B.texSubImage3D(qe,K,Xe,_t,ht,Me,Ue,Ve,hn,Et,Rt):R.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,K,Xe,_t,Me,Ue,hn,Et,Rt.data):R.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,K,Xe,_t,Rt.width,Rt.height,hn,Rt.data):B.texSubImage2D(B.TEXTURE_2D,K,Xe,_t,Me,Ue,hn,Et,Rt);B.pixelStorei(B.UNPACK_ROW_LENGTH,tn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,vt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,An),B.pixelStorei(B.UNPACK_SKIP_ROWS,Qn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Tn),K===0&&Z.generateMipmaps&&B.generateMipmap(qe),Ie.unbindTexture()},this.copyTextureToTexture3D=function(R,Z,re=null,se=null,K=0){return R.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture3D function signature has changed."),re=arguments[0]||null,se=arguments[1]||null,R=arguments[2],Z=arguments[3],K=arguments[4]||0),io('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,Z,re,se,K)},this.initRenderTarget=function(R){Be.get(R).__webglFramebuffer===void 0&&P.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),Ie.unbindTexture()},this.resetState=function(){E=0,A=0,T=null,Ie.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}};var Rs=class extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var fu=class extends Sn{constructor(e=null,t=1,n=1,r,s,o,a,c,l=jn,u=jn,h,p){super(null,o,a,c,l,u,r,s,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _r=class extends Zn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fs=new bt,Hd=new bt,pa=[],Vd=new ii,hv=new bt,eo=new it,to=new gr,xo=class extends it{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _r(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,hv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ii),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fs),Vd.copy(e.boundingBox).applyMatrix4(fs),this.boundingBox.union(Vd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fs),to.copy(e.boundingSphere).applyMatrix4(fs),this.boundingSphere.union(to)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(eo.geometry=this.geometry,eo.material=this.material,eo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),to.copy(this.boundingSphere),to.applyMatrix4(n),e.ray.intersectsSphere(to)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,fs),Hd.multiplyMatrices(n,fs),eo.matrixWorld=Hd,eo.raycast(e,pa);for(let o=0,a=pa.length;o<a;o++){let c=pa[o];c.instanceId=s,c.object=this,t.push(c)}pa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _r(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new fu(new Float32Array(r*this.count),r,this.count,ku,Ri));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Dn=class extends xr{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Fa=new D,Na=new D,Gd=new bt,no=new po,ma=new gr,al=new D,Wd=new D,Li=class extends pn{constructor(e=new Mt,t=new Dn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Fa.fromBufferAttribute(t,r-1),Na.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Fa.distanceTo(Na);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(r),ma.radius+=s,e.ray.intersectsSphere(ma)===!1)return;Gd.copy(r).invert(),no.copy(e.ray).applyMatrix4(Gd);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let d=u.getX(x),v=u.getX(x+1),y=ga(this,e,no,c,d,v);y&&t.push(y)}if(this.isLineLoop){let x=u.getX(g-1),m=u.getX(f),d=ga(this,e,no,c,x,m);d&&t.push(d)}}else{let f=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let d=ga(this,e,no,c,x,x+1);d&&t.push(d)}if(this.isLineLoop){let x=ga(this,e,no,c,g-1,f);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ga(i,e,t,n,r,s){let o=i.geometry.attributes.position;if(Fa.fromBufferAttribute(o,r),Na.fromBufferAttribute(o,s),t.distanceSqToSegment(Fa,Na,al,Wd)>n)return;al.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(al);if(!(c<e.near||c>e.far))return{distance:c,point:Wd.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}var Xd=new D,qd=new D,Vr=class extends Li{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Xd.fromBufferAttribute(t,r),qd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Xd.distanceTo(qd);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Cs=class extends Sn{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},ri=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,s=n.length,o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);let u=n[r],p=n[r+1]-u,f=(o-u)/p;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new ke:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new D,r=[],s=[],o=[],a=new D,c=new bt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new D)}s[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),h=Math.abs(r[0].y),p=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(an(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(an(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},yo=class extends ri{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ke){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=c-this.aX,f=l-this.aY;c=p*u-f*h+this.aX,l=p*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},pu=class extends yo{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function qu(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let p=(o-s)/l-(a-s)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+h)+(c-a)/h;p*=u,f*=u,r(o,a,p,f)},calc:function(s){let o=s*s,a=o*s;return i+e*s+t*o+n*a}}}var xa=new D,cl=new qu,ll=new qu,ul=new qu,mu=class extends ri{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new D){let n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(xa.subVectors(r[0],r[1]).add(r[0]),l=xa);let h=r[a%s],p=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(xa.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=xa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),cl.initNonuniformCatmullRom(l.x,h.x,p.x,u.x,g,x,m),ll.initNonuniformCatmullRom(l.y,h.y,p.y,u.y,g,x,m),ul.initNonuniformCatmullRom(l.z,h.z,p.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(cl.initCatmullRom(l.x,h.x,p.x,u.x,this.tension),ll.initCatmullRom(l.y,h.y,p.y,u.y,this.tension),ul.initCatmullRom(l.z,h.z,p.z,u.z,this.tension));return n.set(cl.calc(c),ll.calc(c),ul.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new D().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Yd(i,e,t,n,r){let s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function dv(i,e){let t=1-i;return t*t*e}function fv(i,e){return 2*(1-i)*i*e}function pv(i,e){return i*i*e}function co(i,e,t,n){return dv(i,e)+fv(i,t)+pv(i,n)}function mv(i,e){let t=1-i;return t*t*t*e}function gv(i,e){let t=1-i;return 3*t*t*i*e}function xv(i,e){return 3*(1-i)*i*i*e}function yv(i,e){return i*i*i*e}function lo(i,e,t,n,r){return mv(i,e)+gv(i,t)+xv(i,n)+yv(i,r)}var Oa=class extends ri{constructor(e=new ke,t=new ke,n=new ke,r=new ke){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ke){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(lo(e,r.x,s.x,o.x,a.x),lo(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},gu=class extends ri{constructor(e=new D,t=new D,n=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new D){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(lo(e,r.x,s.x,o.x,a.x),lo(e,r.y,s.y,o.y,a.y),lo(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},za=class extends ri{constructor(e=new ke,t=new ke){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ke){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ke){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_o=class extends ri{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends ri{constructor(e=new ke,t=new ke,n=new ke){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ke){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(co(e,r.x,s.x,o.x),co(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends ri{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(co(e,r.x,s.x,o.x),co(e,r.y,s.y,o.y),co(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ha=class extends ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ke){let n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(Yd(a,c.x,l.x,u.x,h.x),Yd(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ke().fromArray(r))}return this}},xu=Object.freeze({__proto__:null,ArcCurve:pu,CatmullRomCurve3:mu,CubicBezierCurve:Oa,CubicBezierCurve3:gu,EllipseCurve:yo,LineCurve:za,LineCurve3:_o,QuadraticBezierCurve:Ba,QuadraticBezierCurve3:ka,SplineCurve:Ha}),yu=class extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xu[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new xu[r.type]().fromJSON(r))}return this}},_u=class extends yu{constructor(e){super(),this.type="Path",this.currentPoint=new ke,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new za(this.currentPoint.clone(),new ke(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Ba(this.currentPoint.clone(),new ke(e,t),new ke(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){let a=new Oa(this.currentPoint.clone(),new ke(e,t),new ke(n,r),new ke(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ha(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){let l=new yo(e,t,n,r,s,o,a,c);if(this.curves.length>0){let h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},vu=class i extends Mt{constructor(e=[new ke(0,-.5),new ke(.5,0),new ke(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=an(r,0,Math.PI*2);let s=[],o=[],a=[],c=[],l=[],u=1/t,h=new D,p=new ke,f=new D,g=new D,x=new D,m=0,d=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,d=e[v+1].y-e[v].y,f.x=d*1,f.y=-m,f.z=d*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:m=e[v+1].x-e[v].x,d=e[v+1].y-e[v].y,f.x=d*1,f.y=-m,f.z=d*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let v=0;v<=t;v++){let y=n+v*u*r,_=Math.sin(y),w=Math.cos(y);for(let E=0;E<=e.length-1;E++){h.x=e[E].x*_,h.y=e[E].y,h.z=e[E].x*w,o.push(h.x,h.y,h.z),p.x=v/t,p.y=E/(e.length-1),a.push(p.x,p.y);let A=c[3*E+0]*_,T=c[3*E+1],b=c[3*E+0]*w;l.push(A,T,b)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){let _=y+v*e.length,w=_,E=_+e.length,A=_+e.length+1,T=_+1;s.push(w,E,T),s.push(A,T,E)}this.setIndex(s),this.setAttribute("position",new rt(o,3)),this.setAttribute("uv",new rt(a,2)),this.setAttribute("normal",new rt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Va=class i extends vu{constructor(e=1,t=1,n=4,r=8){let s=new _u;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new i(e.radius,e.length,e.capSegments,e.radialSegments)}},vo=class i extends Mt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],o=[],a=[],c=[],l=new D,u=new ke;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,p=3;h<=t;h++,p+=3){let f=n+h/t*r;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[p]/e+1)/2,u.y=(o[p+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new rt(o,3)),this.setAttribute("normal",new rt(a,3)),this.setAttribute("uv",new rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},_i=class i extends Mt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],p=[],f=[],g=0,x=[],m=n/2,d=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new rt(h,3)),this.setAttribute("normal",new rt(p,3)),this.setAttribute("uv",new rt(f,2));function v(){let _=new D,w=new D,E=0,A=(t-e)/n;for(let T=0;T<=s;T++){let b=[],M=T/s,C=M*(t-e)+e;for(let F=0;F<=r;F++){let H=F/r,q=H*c+a,X=Math.sin(q),I=Math.cos(q);w.x=C*X,w.y=-M*n+m,w.z=C*I,h.push(w.x,w.y,w.z),_.set(X,A,I).normalize(),p.push(_.x,_.y,_.z),f.push(H,1-M),b.push(g++)}x.push(b)}for(let T=0;T<r;T++)for(let b=0;b<s;b++){let M=x[b][T],C=x[b+1][T],F=x[b+1][T+1],H=x[b][T+1];(e>0||b!==0)&&(u.push(M,C,H),E+=3),(t>0||b!==s-1)&&(u.push(C,F,H),E+=3)}l.addGroup(d,E,0),d+=E}function y(_){let w=g,E=new ke,A=new D,T=0,b=_===!0?e:t,M=_===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,m*M,0),p.push(0,M,0),f.push(.5,.5),g++;let C=g;for(let F=0;F<=r;F++){let q=F/r*c+a,X=Math.cos(q),I=Math.sin(q);A.x=b*I,A.y=m*M,A.z=b*X,h.push(A.x,A.y,A.z),p.push(0,M,0),E.x=X*.5+.5,E.y=I*.5*M+.5,f.push(E.x,E.y),g++}for(let F=0;F<r;F++){let H=w+F,q=C+F;_===!0?u.push(q,q+1,H):u.push(q+1,q,H),T+=3}l.addGroup(d,T,_===!0?1:2),d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var bo=class i extends Mt{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);let a=[],c=[],l=[],u=[],h=e,p=(t-e)/r,f=new D,g=new ke;for(let x=0;x<=r;x++){for(let m=0;m<=n;m++){let d=s+m/n*o;f.x=h*Math.cos(d),f.y=h*Math.sin(d),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=p}for(let x=0;x<r;x++){let m=x*(n+1);for(let d=0;d<n;d++){let v=d+m,y=v,_=v+n+1,w=v+n+2,E=v+1;a.push(y,_,E),a.push(_,w,E)}}this.setIndex(a),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var si=class i extends Mt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],h=new D,p=new D,f=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){let v=[],y=d/n,_=0;d===0&&o===0?_=.5/t:d===n&&c===Math.PI&&(_=-.5/t);for(let w=0;w<=t;w++){let E=w/t;h.x=-e*Math.cos(r+E*s)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(r+E*s)*Math.sin(o+y*a),g.push(h.x,h.y,h.z),p.copy(h).normalize(),x.push(p.x,p.y,p.z),m.push(E+_,1-y),v.push(l++)}u.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){let y=u[d][v+1],_=u[d][v],w=u[d+1][v],E=u[d+1][v+1];(d!==0||o>0)&&f.push(y,_,E),(d!==n-1||c<Math.PI)&&f.push(_,w,E)}this.setIndex(f),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(x,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ga=class i extends Mt{constructor(e=new ka(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,c=new D,l=new ke,u=new D,h=[],p=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new rt(h,3)),this.setAttribute("normal",new rt(p,3)),this.setAttribute("uv",new rt(f,2));function x(){for(let y=0;y<t;y++)m(y);m(s===!1?t:0),v(),d()}function m(y){u=e.getPointAt(y/t,u);let _=o.normals[y],w=o.binormals[y];for(let E=0;E<=r;E++){let A=E/r*Math.PI*2,T=Math.sin(A),b=-Math.cos(A);c.x=b*_.x+T*w.x,c.y=b*_.y+T*w.y,c.z=b*_.z+T*w.z,c.normalize(),p.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function d(){for(let y=1;y<=t;y++)for(let _=1;_<=r;_++){let w=(r+1)*(y-1)+(_-1),E=(r+1)*y+(_-1),A=(r+1)*y+_,T=(r+1)*(y-1)+_;g.push(w,E,T),g.push(E,A,T)}}function v(){for(let y=0;y<=t;y++)for(let _=0;_<=r;_++)l.x=y/t,l.y=_/r,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new xu[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Qi=class extends xr{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hf,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wa=class extends Qi{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ke(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return an(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Xa=class extends Dn{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ya(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function _v(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ps=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},bu=class extends Ps{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wh,endingEnd:Wh}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xh:s=e,a=2*t-n;break;case qh:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Xh:o=e,c=2*n-t;break;case qh:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,p=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),x=g*g,m=x*g,d=-p*m+2*p*x-p*g,v=(1+p)*m+(-1.5-2*p)*x+(-.5+p)*g+1,y=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let w=0;w!==a;++w)s[w]=d*o[u+w]+v*o[l+w]+y*o[c+w]+_*o[h+w];return s}},Mu=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),h=1-u;for(let p=0;p!==a;++p)s[p]=o[l+p]*h+o[c+p]*u;return s}},wu=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},vi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ya(t,this.TimeBufferType),this.values=ya(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ya(e.times,Array),values:ya(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new wu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Mu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new bu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Sa:t=this.InterpolantFactoryMethodDiscrete;break;case Zl:t=this.InterpolantFactoryMethodLinear;break;case Uc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sa;case this.InterpolantFactoryMethodLinear:return Zl;case this.InterpolantFactoryMethodSmooth:return Uc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&_v(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Uc,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let h=a*n,p=h-n,f=h+n;for(let g=0;g!==n;++g){let x=t[h+g];if(x!==t[p+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,p=o*n;for(let f=0;f!==n;++f)t[p+f]=t[h+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=Zl;var Gr=class extends vi{constructor(e,t,n){super(e,t,n)}};Gr.prototype.ValueTypeName="bool";Gr.prototype.ValueBufferType=Array;Gr.prototype.DefaultInterpolation=Sa;Gr.prototype.InterpolantFactoryMethodLinear=void 0;Gr.prototype.InterpolantFactoryMethodSmooth=void 0;var Su=class extends vi{};Su.prototype.ValueTypeName="color";var Eu=class extends vi{};Eu.prototype.ValueTypeName="number";var Au=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Jt.slerpFlat(s,0,o,l-a,o,l,c);return s}},qa=class extends vi{InterpolantFactoryMethodLinear(e){return new Au(this.times,this.values,this.getValueSize(),e)}};qa.prototype.ValueTypeName="quaternion";qa.prototype.InterpolantFactoryMethodSmooth=void 0;var Wr=class extends vi{constructor(e,t,n){super(e,t,n)}};Wr.prototype.ValueTypeName="string";Wr.prototype.ValueBufferType=Array;Wr.prototype.DefaultInterpolation=Sa;Wr.prototype.InterpolantFactoryMethodLinear=void 0;Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var Tu=class extends vi{};Tu.prototype.ValueTypeName="vector";var Ru=class{constructor(e,t,n){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,p=l.length;h<p;h+=2){let f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},vv=new Ru,Cu=class{constructor(e){this.manager=e!==void 0?e:vv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Cu.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ya=class extends pn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},$a=class extends Ya{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},hl=new bt,$d=new D,jd=new D,Pu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new go,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;$d.setFromMatrixPosition(e.matrixWorld),t.position.copy($d),jd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jd),t.updateMatrixWorld(),hl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(hl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Iu=class extends Pu{constructor(){super(new La(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Mo=class extends Ya{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new Iu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Yu="\\[\\]\\.:\\/",bv=new RegExp("["+Yu+"]","g"),$u="[^"+Yu+"]",Mv="[^"+Yu.replace("\\.","")+"]",wv=/((?:WC+[\/:])*)/.source.replace("WC",$u),Sv=/(WCOD+)?/.source.replace("WCOD",Mv),Ev=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$u),Av=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$u),Tv=new RegExp("^"+wv+Sv+Ev+Av+"$"),Rv=["material","materials","bones","map"],Lu=class{constructor(e,t,n){let r=n||qt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},qt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(bv,"")}static parseTrackName(e){let t=Tv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Rv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};qt.Composite=Lu;qt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qt.prototype.GetterByBindingType=[qt.prototype._getValue_direct,qt.prototype._getValue_array,qt.prototype._getValue_arrayElement,qt.prototype._getValue_toArray];qt.prototype.SetterByBindingTypeAndVersioning=[[qt.prototype._setValue_direct,qt.prototype._setValue_direct_setNeedsUpdate,qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_array,qt.prototype._setValue_array_setNeedsUpdate,qt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_arrayElement,qt.prototype._setValue_arrayElement_setNeedsUpdate,qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_fromArray,qt.prototype._setValue_fromArray_setNeedsUpdate,qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var yb=new Float32Array(1);var Zd=new bt,ja=class{constructor(e,t,n=0,r=1/0){this.ray=new po(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new mo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zd),this}intersectObject(e,t=!0,n=[]){return Du(e,this,n,t),n.sort(Jd),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Du(e[r],this,n,t);return n.sort(Jd),n}};function Jd(i,e){return i.distance-e.distance}function Du(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let o=0,a=s.length;o<a;o++)Du(s[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uu);function bf(i,{layers:e=8,supersampling:t=2}={}){let n=()=>{let m=new ni(1,1,{type:vr,depthBuffer:!0});return m.depthTexture=new Ts(1,1,Ki),m},r=new ni(1,1,{type:vr,depthBuffer:!1}),s=n(),o=Array.from({length:e},n),a=new ke,c={opaque:{value:s.texture},opaqueDepth:{value:s.depthTexture},applyToneMapping:{value:!1},toneMappingExposure:{value:1}};o.forEach((m,d)=>c["layer"+d]={value:m.texture});let l=new Ln({uniforms:c,depthTest:!1,depthWrite:!1,vertexShader:"varying vec2 uvScreen; void main(){uvScreen=uv;gl_Position=vec4(position.xy,0.0,1.0);}",fragmentShader:`
   #ifndef TONE_MAPPING
   #include <tonemapping_pars_fragment>
   vec3 toneMapping(vec3 color){return ACESFilmicToneMapping(color);}
   #endif
   uniform bool applyToneMapping;
   varying vec2 uvScreen; uniform sampler2D opaque; uniform sampler2D opaqueDepth;
${o.map((m,d)=>`uniform sampler2D layer${d};`).join(`
`)}
   void main(){vec4 sampleColor;vec4 result=vec4(0.0);
    ${o.map((m,d)=>e-1-d).map(m=>`sampleColor=texture2D(layer${m},uvScreen);
    if(sampleColor.a>0.0)sampleColor.rgb/=sampleColor.a;
    if(applyToneMapping){
    sampleColor=sRGBTransferOETF(sampleColor);
    }
    result.rgb=sampleColor.rgb*sampleColor.a+result.rgb*(1.0-sampleColor.a);
    result.a=sampleColor.a+result.a*(1.0-sampleColor.a);`).join(`
`)}
    if(result.a>0.0)result.rgb/=result.a;
    gl_FragColor=result;
    if(applyToneMapping){gl_FragColor=sRGBTransferEOTF(gl_FragColor);}
    // Premultiplied resolve keeps partially covered edges from gaining halos.
    gl_FragColor.rgb*=gl_FragColor.a;
    #include <colorspace_fragment>
   }`}),u=new Rs,h=new it(new yr(2,2),l),p=new As;u.add(h);let f=new Ln({toneMapped:!1,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{image:{value:r.texture}},vertexShader:l.vertexShader,fragmentShader:`varying vec2 uvScreen;uniform sampler2D image;void main(){
   gl_FragColor=texture2D(image,uvScreen);
   if(gl_FragColor.a>0.0)gl_FragColor.rgb/=gl_FragColor.a;
   #include <colorspace_fragment>
  }`}),g=new Map;function x(m){if(g.has(m))return g.get(m);let d={enabled:{value:!1},first:{value:!0},previous:{value:null},opaque:{value:s.depthTexture},size:{value:a},bias:{value:0},toneMap:{value:!1},exposure:{value:1}},v=m.onBeforeCompile,y=m.customProgramCacheKey;return m.onBeforeCompile=function(_,...w){v.call(this,_,...w),Object.assign(_.uniforms,{peelEnabled:d.enabled,peelFirst:d.first,peelPrevious:d.previous,peelOpaque:d.opaque,peelSize:d.size,peelBias:d.bias,peelToneMap:d.toneMap,toneMappingExposure:d.exposure}),_.fragmentShader=`#ifndef TONE_MAPPING
#include <tonemapping_pars_fragment>
#endif
uniform bool peelToneMap;
uniform bool peelEnabled; uniform bool peelFirst; uniform sampler2D peelPrevious; uniform sampler2D peelOpaque; uniform vec2 peelSize; uniform float peelBias;
`+_.fragmentShader,_.fragmentShader=_.fragmentShader.replace("#include <colorspace_fragment>",`if(peelEnabled){if(peelToneMap)gl_FragColor.rgb=ACESFilmicToneMapping(gl_FragColor.rgb);gl_FragColor.rgb*=gl_FragColor.a;}
#include <colorspace_fragment>`),_.fragmentShader=_.fragmentShader.replace(/void\s+main\s*\(\s*\)\s*\{/,`void main(){
    gl_FragDepth=gl_FragCoord.z;
    if(peelEnabled){vec2 screenUV=gl_FragCoord.xy/peelSize;
     float surfaceDepth=gl_FragCoord.z-peelBias;gl_FragDepth=surfaceDepth;
     if(surfaceDepth>=texture2D(peelOpaque,screenUV).r)discard;
     if(!peelFirst&&surfaceDepth<=texture2D(peelPrevious,screenUV).r+0.000001)discard;
    }`)},m.customProgramCacheKey=function(){return y.call(this)+"|depth-peeling-v1"},m.needsUpdate=!0,d.restore=()=>{m.onBeforeCompile=v,m.customProgramCacheKey=y,m.needsUpdate=!0},g.set(m,d),d}return{render(m,d){if(i.getDrawingBufferSize(a),a.multiplyScalar(t).floor(),s.width!==a.x||s.height!==a.y)for(let M of[s,...o,r])M.setSize(a.x,a.y);c.applyToneMapping.value=i.toneMapping!==void 0&&i.toneMapping!==Pi,c.toneMappingExposure.value=i.toneMappingExposure??1;let v=[],y=new Map;m.traverse(M=>{if(!M.material||!M.visible)return;let C=Array.isArray(M.material)?M.material:[M.material],F=C.some(H=>H.transparent&&H.opacity>0);if(v.push({object:M,transparent:F}),F){for(let H of C)if(!y.has(H)){let q=x(H);q.toneMap.value=c.applyToneMapping.value&&H.toneMapped,q.exposure.value=i.toneMappingExposure??1,q.bias.value=Math.max(0,M.renderOrder-15)*2e-6,y.set(H,{depthWrite:H.depthWrite,blending:H.blending,forceSinglePass:H.forceSinglePass,state:q})}}});let _=m.background,w=i.getClearColor(new Je),E=i.getClearAlpha(),A=i.autoClear,T=i.shadowMap.autoUpdate,b=i.getRenderTarget();try{i.autoClear=!0,T&&v.some(({object:M,transparent:C})=>C&&M.castShadow)&&(i.setRenderTarget(s),i.render(m,d),i.shadowMap.autoUpdate=!1);for(let{object:M,transparent:C}of v)C&&(M.visible=!1);i.setRenderTarget(s),i.render(m,d),i.shadowMap.autoUpdate=!1,i.setRenderTarget(b),i.render(m,d);for(let{object:M,transparent:C}of v)M.visible=C;m.background=null,i.setClearColor(0,0);for(let[M,{state:C}]of y)M.depthWrite=!0,M.blending=Ci,M.forceSinglePass=!0,C.enabled.value=!0;o.forEach((M,C)=>{for(let{state:F}of y.values())F.first.value=C===0,F.previous.value=C?o[C-1].depthTexture:s.depthTexture;i.setRenderTarget(M),i.render(m,d)}),i.setRenderTarget(r),h.material=l,i.render(u,p),i.setRenderTarget(b),i.autoClear=!1,h.material=f,i.render(u,p)}finally{h.material=l,v.forEach(({object:M})=>M.visible=!0);for(let[M,C]of y)M.depthWrite=C.depthWrite,M.blending=C.blending,M.forceSinglePass=C.forceSinglePass,C.state.enabled.value=!1;m.background=_,i.setClearColor(w,E),i.autoClear=A,i.shadowMap.autoUpdate=T,i.setRenderTarget(b)}},dispose(){g.forEach(m=>m.restore()),g.clear(),s.dispose(),r.dispose(),f.dispose(),o.forEach(m=>m.dispose()),h.geometry.dispose(),l.dispose()}}}function Mf(i,e=i,t=0,n=0){let r=Math.max(0,Math.min(i,e));return{clearHeight:r,cameraZoomScale:i>0?r/i:1,centerY:r/2,offsetX:-t,offsetY:(i-r)/2-n}}function wf(i,e,t,n){let r=1-t.clearHeight/e;return{offsetX:t.offsetX+n.x*i/2,offsetY:t.offsetY+(r-n.y)*e/2}}function ju(i,e=.08,t=0,n=0){let r=i.map(f=>f.x),s=i.map(f=>f.y),o=Math.min(...r),a=Math.max(...r),c=Math.min(...s),l=Math.max(...s),u=1-e,h=a-o,p=l-c;return{zoomFactor:Math.min(2*(u-Math.abs(t))/Math.max(h,1e-8),2*(u-Math.abs(n))/Math.max(p,1e-8)),centerX:(o+a)/2,centerY:(c+l)/2,targetX:t,targetY:n}}var ue=(i,e)=>i.map((t,n)=>t+e[n]),st=(i,e)=>i.map((t,n)=>t-e[n]),oe=(i,e)=>i.map(t=>t*e),un=(i,e)=>i.reduce((t,n,r)=>t+n*e[r],0),Ut=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Ot=i=>Math.hypot(...i),be=i=>{let e=Ot(i);if(e<1e-10)throw new Error("This frame has no usable direction for this measurement.");return oe(i,1/e)},Ct=(i,e)=>st(i,oe(e,un(i,e)/un(e,e))),lt={x:[1,0,0],y:[0,1,0],z:[0,0,1]},Xr=i=>i*180/Math.PI,Cv=i=>i*Math.PI/180,br=(i,e,t)=>{let n=be(Ct(i,t)),r=be(Ct(e,t));return Xr(Math.atan2(un(be(t),Ut(n,r)),un(n,r)))},wo=(i,e)=>Xr(Math.asin(Math.max(-1,Math.min(1,un(be(i),be(e))))));function gt(i,e,t){let n=be(e),r=Cv(t);return ue(ue(oe(i,Math.cos(r)),oe(Ut(n,i),Math.sin(r))),oe(n,un(n,i)*(1-Math.cos(r))))}function Sf(i,e){let t=be(e),n=be(Ct(i,t));return{x:n,y:t,z:be(Ut(n,t))}}function Ef({x:i,y:e,z:t}){let n=new bt().set(i[0],e[0],t[0],0,i[1],e[1],t[1],0,i[2],e[2],t[2],0,0,0,0,1),r=new Nn().setFromRotationMatrix(n,"YXZ");return{turn:Xr(r.y),bend:Xr(r.x),tilt:Xr(r.z)}}function Af(i,e,t){let n=e.meta,r=n.orientation,s=n.position?.[0],o=n.scale;if(!Array.isArray(r)||r.length!==3||r.some(m=>!Array.isArray(m)||m.length!==3||!m.every(Number.isFinite))||!Array.isArray(s)||s.length!==3||!s.every(Number.isFinite)||!(o>0))throw new Error("Metric alignment metadata is incomplete.");let a=Object.fromEntries(i.joints.map((m,d)=>[m,d])),c=m=>oe(st([0,1,2].map(d=>un(m,r.map(v=>v[d]))),s),1/o),l=m=>{let d=ue(oe(m,o),s);return r.map(v=>un(v,d))},u=i.reconstruction[t.frame].map(c),h=i.reconstruction[n.ref_frame_id].map(c);function p(m,d=u){let v=d[a[m]];if(!v||!v.every(Number.isFinite))throw new Error(`Missing measurement joint: ${m}`);return v}let f=(m,d,v)=>oe(ue(p(m,v),p(d,v)),.5),g=(m,d=u)=>({joints:[`right_${m}`,`left_${m}`],from:p(`right_${m}`,d),to:p(`left_${m}`,d),vector:st(p(`left_${m}`,d),p(`right_${m}`,d))});function x(m="entire"){let d=m==="lower"?["torso","thorax","clavicle"]:["clavicle"],v=m==="upper"?["thorax","torso","root"]:["root"],y=T=>T.find(b=>Object.hasOwn(a,b)),_=y(d),w=y(v),E=_?p(_):f("left_shoulder","right_shoulder"),A=w?p(w):f("left_hip","right_hip");return{from:A,to:E,vector:st(E,A),joints:[...w?[w]:["right_hip","left_hip"],..._?[_]:["right_shoulder","left_shoulder"]]}}return{data:i,metrics:e,entry:t,meta:n,pose:u,reference:h,point:p,midpoint:f,lateral:g,spine:x,source:l,normalized:c,unit:be}}var Rf={kinematic:"Body rotations",geometric:"Geometric angles",position:"Geometric translation"},Qa={torso_turn_bend_tilt:"Torso: turn, forward bend, tilt",hip_turn_on_spine_plane:"Hip: turn",shoulder_turn_on_spine_plane:"Shoulder: turn",shoulder_turn_tilt:"Shoulder: turn, tilt",hip_turn_tilt:"Hip: turn, tilt",spine_bend_tilt:"Spine: forward bend, side tilt",spine_azimuth_polar_spin:"Spine: lean direction, inclination, twist",hip_sway_thrust_lift:"Hip: sway, thrust, lift"},Zu={turn:"Turn",bend:"Forward bend",tilt:"Side tilt",azimuth:"Lean direction",polar:"Lean from vertical",spin:"Twist around the spine",sway:"Sway",thrust:"Thrust",lift:"Lift"};var Cf=["X \xB7 right to left","Y \xB7 up","Z \xB7 forward"],So=(i,e)=>i[e]??e.replaceAll("_"," "),ec={torso_turn_bend_tilt:"The shoulders define the torso\u2019s left\u2013right direction, and the upper spine defines up. Compare this frame with the reference-pose axes, then rotate through turn, forward bend and side tilt in that order.",hip_turn_on_spine_plane:"Use the lower spine as the rotation axis. Project the hip line and the reference left\u2013right direction onto the plane across that axis, then compare their directions.",shoulder_turn_on_spine_plane:"Use the lower spine as the rotation axis. Project the shoulder line and the reference left\u2013right direction onto the plane across that axis, then compare their directions.",shoulder_turn_tilt:"Follow the line from the right shoulder to the left shoulder. Its direction across the reference horizontal plane gives turn; its angle above or below that plane gives tilt.",hip_turn_tilt:"Follow the line from the right hip to the left hip. Its direction across the reference horizontal plane gives turn; its angle above or below that plane gives tilt.",spine_bend_tilt:"Follow the spine from the hip center to the shoulder center. For forward bend, compare it with its projection onto the sideways\u2013up plane. For side tilt, compare it with its projection onto the forward\u2013up plane.",spine_azimuth_polar_spin:"Treat the spine and shoulders as a rigid T. Rotate its lean direction around global up, incline it toward the spine, then twist the crossbar around that spine.",hip_sway_thrust_lift:"Displacement starts at the reference hip center. One unit is the reference pose\u2019s mean length of ten shoulder, arm, hip and leg segments. Compare the two hip centers, then measure sway (sideways), thrust (forward), and lift (vertical) along the global reference axes."};Qa.torso_turn_bend_tilt_by_shoulder=Qa.torso_turn_bend_tilt;ec.torso_turn_bend_tilt_by_shoulder=ec.torso_turn_bend_tilt;var Tf={torso_turn_bend_tilt:"Shoulders and upper spine",hip_turn_on_spine_plane:"Around the lower spine",shoulder_turn_on_spine_plane:"Around the lower spine",shoulder_turn_tilt:"Relative to the horizontal plane",hip_turn_tilt:"Relative to the horizontal plane",spine_bend_tilt:"Relative to the vertical reference planes",spine_azimuth_polar_spin:"Rigid T formed by spine and shoulders",hip_sway_thrust_lift:"Relative to the global reference"};Tf.torso_turn_bend_tilt_by_shoulder=Tf.torso_turn_bend_tilt;var Pt={input:"#168568",projection:"#507fca",result:"#a752b8",axis:"#87988d",reference:"#ce8b21"},Qt=(i,e,t,n=Pt.input,r=1)=>({kind:"vector",from:i,to:ue(i,oe(e,r)),label:t,color:n}),Pf=(i,e,t=Pt.reference)=>({kind:"point",position:i,label:e,color:t}),Us=(i,e,t,n=Pt.input)=>({kind:"vector",from:i,to:e,label:t,color:n}),bi=(i,e,t=Pt.input,n="selected")=>({...Us(i.from,i.to,e,t),jointPair:{pose:n,joints:i.joints}}),If=(i,e,t,n)=>({kind:"plane",origin:i,normal:be(e),radius:t,label:n,color:Pt.projection}),Mr=(i,e,t,n,r,s)=>({kind:"arc",origin:i,from:be(Ct(e,t)),normal:be(t),degrees:n,radius:r,label:s,color:Pt.result}),tc=(i,e,t,n,r="Projection")=>({kind:"projection",origin:i,direction:be(e),target:be(Ct(be(e),t)),size:n,label:r,color:Pt.projection}),jt=(i,e,t=[],n="")=>({title:i,text:e,visuals:t,detail:n});function er(i,e,t){let n=i.point("left_ankle",i.reference),r=i.point("right_ankle",i.reference),s=oe(ue(n,r),.5);return jt("Set the global directions","Use the reference frame\u2019s right-to-left ankle direction for X, with its vertical component removed. Y points up; the two directions determine forward Z. These axes stay fixed for the selected frame.",[bi({from:r,to:n,joints:["right_ankle","left_ankle"]},"Reference ankle direction",Pt.reference,"reference"),...Object.entries(lt).map(([o,a],c)=>Qt(s,a,Cf[c],Pt.axis,t))],"Reference-frame alignment is applied before this measurement.")}function Fs(i,e,t,n,r,s,o){let a=Ct(e,t),c=Ct(n,t);return[If(i,t,s*1.2,o),Qt(i,be(e),"Selected direction",Pt.input,s),tc(i,e,t,s,"Projected direction"),Qt(i,be(c),"Zero direction",Pt.axis,s),Mr(i,c,t,r,s*.7,"Signed turn")]}function Eo(i,e,t,n,r,s){let o=Ct(e,t),a=Pv(o,e,t);return[If(i,t,r*1.2,s),Qt(i,be(e),"Selected direction",Pt.input,r),tc(i,e,t,r),{...Mr(i,o,a,Math.abs(n),r*.7,"Inclination"),value:n}]}function Pv(i,e,t){let n=[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]];return Ot(n)>1e-9?n:be(st(t,oe(be(i),t.reduce((r,s,o)=>r+s*be(i)[o],0))))}function Iv(i){let e=i.lateral("shoulder"),t=i.spine("upper"),n=Sf(e.vector,t.vector),r=Ef(n),s=t.from,o=Ot(i.spine().vector)*.85,a=gt(lt.x,lt.y,r.turn),c=lt.y,l=gt(c,a,r.bend),u=a,h=[er(i,s,o),jt("Build the torso directions","Take right shoulder \u2192 left shoulder and spine midpoint \u2192 shoulder center. Keep the spine direction; remove its component from the shoulder direction, then normalize the directions.",[bi(e,"Shoulder direction"),bi(t,"Upper spine"),tc(s,e.vector,t.vector,o,"Shoulder \u2192 perpendicular direction"),Qt(s,n.y,"Torso up",Pt.input,o),Qt(s,n.z,"Torso forward",Pt.axis,o)])],p=jt("Read the turn","The first rotation turns the global frame around its up axis. This is the Y step of the ordered Y \u2192 X \u2192 Z torso rotation.",[Qt(s,lt.x,"Global left",Pt.axis,o),Qt(s,a,"After turn",Pt.input,o),Qt(s,lt.y,"Turn axis",Pt.axis,o),Mr(s,lt.x,lt.y,r.turn,o*.7,"Turn")]),f=jt("Read the forward bend","Keep the turn, then bend around the turned left axis. This is the X step; it is not the angle of the spine projected onto a fixed global plane.",[Qt(s,c,"Before bend",Pt.axis,o),Qt(s,l,"After bend",Pt.input,o),Qt(s,a,"Bend axis",Pt.projection,o),Mr(s,c,a,r.bend,o*.7,"Forward bend")]),g=jt("Read the side tilt","Keep the turn and bend, then rotate around the resulting forward axis. This final Z step completes the torso frame.",[Qt(s,u,"Before tilt",Pt.axis,o),Qt(s,n.x,"After tilt",Pt.input,o),Qt(s,n.z,"Tilt axis",Pt.projection,o),Mr(s,u,n.z,r.tilt,o*.7,"Side tilt")]);return{values:r,items:{turn:[...h,p],bend:[...h,p,f],tilt:[...h,p,f,g]}}}function Lf(i,e){let t=i.lateral(e),n=i.spine("lower"),r=n.from,s=Ot(i.spine().vector)*.85,o=br(lt.x,t.vector,n.vector);return{values:{turn:o},items:{turn:[er(i,r,s),jt("Choose the moving plane",`Use hip center \u2192 spine midpoint as the plane normal. Take right ${e} \u2192 left ${e} as the direction to measure.`,[bi(n,"Lower spine normal",Pt.result),bi(t,`${e==="hip"?"Hip":"Shoulder"} direction`)]),jt("Project and read the turn","Project both global X and the selected direction onto the plane perpendicular to the lower spine. Read the signed rotation from projected X to the projected direction around the spine normal.",Fs(r,t.vector,n.vector,lt.x,o,s,"Lower-spine plane"))]}}}var Df={torso_turn_bend_tilt:Iv,hip_turn_on_spine_plane:i=>Lf(i,"hip"),shoulder_turn_on_spine_plane:i=>Lf(i,"shoulder")};function Uf(i,e){let t=i.lateral(e),n=oe(t.from.map((c,l)=>c+t.to[l]),.5),r=Ot(i.spine().vector)*.85,s=br(lt.x,t.vector,lt.y),o=wo(t.vector,lt.y),a=[er(i,n,r),jt("Choose the measured direction",`Use the direction from the right ${e} to the left ${e}.`,[bi(t,`${e==="hip"?"Hip":"Shoulder"} direction`)])];return{values:{turn:s,tilt:o},items:{turn:[...a,jt("Project and read the turn","Project the direction onto the horizontal XZ plane. Read its signed rotation from global X around the up axis.",Fs(n,t.vector,lt.y,lt.x,s,r,"Horizontal XZ plane"))],tilt:[...a,jt("Read the tilt above the plane","Project the direction onto the horizontal XZ plane. Read the angle between the original direction and its projection; the Y component gives its sign.",Eo(n,t.vector,lt.y,o,r,"Horizontal XZ plane"))]}}}function Lv(i){let e=i.spine(),t=e.from,n=Ot(e.vector)*.85,r=wo(e.vector,lt.z),s=wo(e.vector,lt.x),o=[er(i,t,n),jt("Choose the entire spine","Use hip center \u2192 shoulder center as the measured direction.",[bi(e,"Entire spine")])];return{values:{bend:r,tilt:s},items:{bend:[...o,jt("Read the forward bend","Remove the forward Z component to project the spine onto the XY plane. The angle from that projection to the spine gives forward bend; the Z component gives its sign.",Eo(t,e.vector,lt.z,r,n,"XY plane"))],tilt:[...o,jt("Read the side tilt","Remove the sideways X component to project the spine onto the YZ plane. The angle from that projection to the spine gives side tilt; the X component gives its sign.",Eo(t,e.vector,lt.x,s,n,"YZ plane"))]}}}function Dv(i){let e=i.spine(),t=i.lateral("shoulder"),n=e.from,r=Ot(e.vector)*.85,s=br(lt.z,e.vector,lt.y),o=wo(e.vector,lt.y),a=Math.sign(o)*(90-Math.abs(o)),c=gt(gt(lt.x,lt.x,a),lt.y,s),l=br(c,t.vector,e.vector),u=[er(i,n,r),jt("Choose spine and shoulder directions","Use hip center \u2192 shoulder center for the spine and right shoulder \u2192 left shoulder for the crossbar.",[bi(e,"Entire spine"),bi(t,"Shoulder crossbar")])],h=jt("Read the lean direction","Project the spine onto the horizontal XZ plane. Measure the signed rotation from global forward Z around global up Y.",Fs(n,e.vector,lt.y,lt.z,s,r,"Horizontal XZ plane")),p=jt("Read the lean from vertical","First read the spine\u2019s elevation above the horizontal plane. Convert elevation to signed lean from vertical: sign(elevation) \xD7 (90\xB0 \u2212 |elevation|).",[...Eo(n,e.vector,lt.y,o,r,"Horizontal XZ plane"),Qt(n,lt.y,"Vertical",Pt.axis,r),Mr(n,lt.y,Math.abs(a)>1e-8?be([e.vector[2],0,-e.vector[0]]):lt.x,Math.abs(a),r*.95,"Lean from vertical")],`Elevation ${o.toFixed(2)}\xB0 \u2192 lean ${a.toFixed(2)}\xB0`),f=jt("Read the twist","Tilt and turn a zero-twist frame using the lean and lean direction. Project its left axis and the shoulder crossbar onto the plane perpendicular to the actual spine, then read the signed rotation around the spine.",Fs(n,t.vector,e.vector,c,l,r,"Plane perpendicular to spine"));return{values:{azimuth:s,polar:a,spin:l},items:{azimuth:[...u,h],polar:[...u,p],spin:[...u,h,p,f]}}}var Ff={shoulder_turn_tilt:i=>Uf(i,"shoulder"),hip_turn_tilt:i=>Uf(i,"hip"),spine_bend_tilt:Lv,spine_azimuth_polar_spin:Dv};function Uv(i){let e=i.point("root",i.reference),t=i.point("root"),n=st(t,e),r=Ot(i.spine().vector)*.85,s=[er(i,e,r),jt("Normalize the pose","The fixed origin is the midpoint between the reference frame\u2019s ankles. Rotate into the reference axes, subtract that origin, and divide by the reference mean length of ten shoulder, arm, hip and leg segments. One unit is that reference mean segment length.",[Pf([0,0,0],"Origin \xB7 reference ankle midpoint"),Qt([0,0,0],lt.x,"1 normalized unit",Pt.reference,1),...Object.entries(lt).map(([a,c])=>Qt([0,0,0],c,`${a.toUpperCase()} from normalized origin`,Pt.axis,r)),Us(e,t,"Hip center displacement")]),jt("Compare hip centers","Subtract the reference hip center from the selected hip center. The normalized origin is at the reference ankles; the displacement is measured from the reference hip center.",[Us(e,t,"Selected \u2212 reference hip center")])],o={values:{sway:n[0],thrust:n[2],lift:n[1]},items:{}};for(let[a,c]of[["sway",0],["thrust",2],["lift",1]]){let l=[0,0,0];l[c]=n[c],o.items[a]=[...s,jt("Read the component",`Read the ${"XYZ"[c]} component of the hip-center displacement, in normalized length units.`,[Us(e,t,"Full displacement",Pt.axis),Us(e,ue(e,l),`${"XYZ"[c]} component`,Pt.result)])]}return o}var Nf={hip_sway_thrust_lift:Uv};var Fv={kinematic:Df,geometric:Ff,position:Nf};function Ns(i,e,t){let n=Fv[t.type]?.[t.subtype];if(!n)throw new Error("No explanation is registered for this metric.");let r=Af(i,e,t),s=n(r),o=e.metrics?.[t.type]?.[t.subtype],a=Object.entries(s.items).map(([c,l])=>{let u=o?.[c]?.[t.frame],h=s.values[c];if(!Number.isFinite(u)||!Number.isFinite(h))throw new Error(`No usable ${c} value at this frame.`);let p=t.type==="position"?Math.abs(u-h):Math.abs((u-h+540)%360-180);return{key:c,label:So(Zu,c),value:u,computed:h,matches:p<1e-5,unit:t.type==="position"?" units":"\xB0",steps:l}});return{title:So(Qa,t.subtype),category:So(Rf,t.type),context:r,items:a}}var Nv=[["left_shoulder","right_shoulder"],["left_shoulder","left_elbow"],["left_elbow","left_wrist"],["right_shoulder","right_elbow"],["right_elbow","right_wrist"],["left_hip","right_hip"],["left_hip","left_knee"],["left_knee","left_ankle"],["right_hip","right_knee"],["right_knee","right_ankle"]],Ov=[["sway","x",0],["thrust","z",2],["lift","y",1]];function nc(i){let e=u=>i.data.joints.includes("root")?i.point("root",u):i.midpoint("left_hip","right_hip",u),t=e(i.reference),n=e(i.pose),r=st(n,t),s=Nv.map(u=>{let h=i.point(u[0],i.reference),p=i.point(u[1],i.reference);return{joints:u,from:i.source(h),to:i.source(p),length:Ot(st(p,h))}}),o=t,a=Ov.map(([u,h,p])=>{let f=[0,0,0];f[p]=r[p];let g=o;return o=ue(o,f),{key:u,axis:h,value:r[p],from:i.source(g),to:i.source(o)}}),c=i.source([0,0,0]),l=i.source([1,0,0]);return{origin:c,unitEnd:l,bones:s,components:a,referenceRoot:i.source(t),selectedRoot:i.source(n),scale:i.meta.scale,meanLength:s.reduce((u,h)=>u+h.length,0)/s.length,referenceHips:{joints:["right_hip","left_hip"],from:i.source(i.point("right_hip",i.reference)),to:i.source(i.point("left_hip",i.reference))},selectedHips:{joints:["right_hip","left_hip"],from:i.source(i.point("right_hip")),to:i.source(i.point("left_hip"))}}}function zv(i,e,t){let n=Ns(i,e,{type:"position",subtype:"hip_sway_thrust_lift",frame:t}),r=nc(n.context),s=r.referenceRoot,o=r.selectedRoot,a=[o[0],s[1],s[2]],c=[s[0],s[1],o[2]],l=[o[0],s[1],o[2]],u=(h,p)=>h.map((f,g)=>(f+p[g])/2);return{origin:s,hip:o,lines:[["sway",s,a],["sway",c,l],["thrust",s,c],["thrust",a,l],["lift",l,o]],anchors:{sway:u(c,l),thrust:u(a,l),lift:o}}}function Of({scene:i,toWorld:e,data:t,metrics:n,canvas:r},s,o){let a=new Map(s.map(f=>[f.id,new Ln({uniforms:{color:{value:new Je(f.color)},resolution:{value:new ke(1,1)},width:{value:2}},vertexShader:`attribute vec3 other; attribute float side; uniform vec2 resolution; uniform float width;
   void main(){vec4 p=projectionMatrix*modelViewMatrix*vec4(position,1.0);
    vec4 q=projectionMatrix*modelViewMatrix*vec4(other,1.0);
    vec2 delta=(q.xy/q.w-p.xy/p.w)*resolution;
    vec2 normal=length(delta)>0.00001?normalize(vec2(-delta.y,delta.x)):vec2(0.0);
    p.xy+=normal*side*width/resolution*p.w;gl_Position=p;}`,fragmentShader:`uniform vec3 color; void main(){gl_FragColor=vec4(color,1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,side:Vt,depthTest:!0,depthWrite:!0})])),c=Array.from({length:5},(f,g)=>{let x=new Mt;x.setAttribute("position",new rt(new Float32Array(12),3)),x.setAttribute("other",new rt(new Float32Array(12),3)),x.setAttribute("side",new rt([1,-1,-1,1],1)),x.setIndex([0,1,2,2,1,3]);let m=new it(x,a.get(s[g<2?0:g<4?1:2].id));return m.frustumCulled=!1,m.renderOrder=0,m.visible=!1,i.add(m),m}),l=new si(.007,16,12),u=[["#8b9198","Translation origin"],["#168568","Current hip center"]].map(([f,g])=>{let x=new it(l,new $t({color:f,transparent:!0,opacity:.35,depthWrite:!1}));return x.name=g,x.visible=!1,i.add(x),x}),h=new Map,p;return{setFrame(f){h.has(f)||(h.set(f,zv(t,n,f)),h.size>24&&h.delete(h.keys().next().value));let g=p=h.get(f);g.lines.forEach(([x,m,d],v)=>{let y=c[v],_=e(m),w=e(d);y.material=a.get(x),y.visible=_.distanceToSquared(w)>1e-16;let E=y.geometry.attributes.position,A=y.geometry.attributes.other;[_,_,w,w].forEach((T,b)=>E.setXYZ(b,T.x,T.y,T.z)),[w,w,_,_].forEach((T,b)=>A.setXYZ(b,T.x,T.y,T.z)),E.needsUpdate=A.needsUpdate=!0}),u.forEach(x=>x.visible=!0),u[0].position.copy(e(g.origin)),u[1].position.copy(e(g.hip));for(let x of s){let m=o.get(`${x.id}:${x.id}`);m.anchor=g.anchors[x.id],m.measurement=n.metrics.position.hip_sway_thrust_lift[x.id][f]}},updateView(f,g,x){a.forEach(m=>m.uniforms.resolution.value.set(g,x))},dispose(){c.forEach(f=>{i.remove(f),f.geometry.dispose()}),a.forEach(f=>f.dispose()),u.forEach(f=>{i.remove(f),f.material.dispose()}),l.dispose()}}}var Ne=i=>Math.max(0,Math.min(1,i)),Pe=i=>{let e=Ne(i);return e*e*(3-2*e)};function zf(i){return{directions:Pe(i/.22),projection:Pe((i-.18)/.35),angle:Pe((i-.55)/.3)}}function Bf(i,e){let t=new Set,n=[];return i.forEach((r,s)=>{e!==void 0&&s!==e||r.steps.forEach((o,a)=>{t.has(o)||(t.add(o),n.push({itemIndex:s,stepIndex:a}))})}),n}function Di(i,e){return i==="focus"?Pe(e):i==="grow"?1:i==="release"?1-Pe(e):0}function Ui(i,e,t,n){let r=(s,o,a)=>ue(oe(s,1-a),oe(o,a));return t==="focus"?{from:i.from,to:i.from}:t==="grow"?{from:i.from,to:r(i.from,i.to,n)}:t==="release"?{from:i.from,to:i.to}:{from:r(i.from,e.from,n),to:r(i.to,e.to,n)}}function Bv(i){let e=Ne(i);return e<.17?{phase:"focus",progress:Pe(e/.17),strength:Pe(e/.17),stretch:0}:e<.65?{phase:"grow",progress:Pe((e-.17)/.48),strength:1,stretch:Pe((e-.17)/.48)}:e<.82?{phase:"release",progress:Pe((e-.65)/.17),strength:1-Pe((e-.65)/.17),stretch:1}:{phase:"align",progress:Pe((e-.82)/.18),strength:0,stretch:1}}function Ao(i,e,t){return{id:`${i}-${e}-focus`,title:"Joint pair",duration:850,motionDuration:650,step:t,jointPair:{name:e,phase:"focus"}}}function To(i,e,t){return{id:`${i}-${e}-release`,title:"Release joint pair",duration:850,motionDuration:650,step:t,jointPair:{name:e,phase:"release"}}}function ic(i){let e=Ne(i);return e<.24?{phase:"camera-in",strength:0,stretch:0,camera:Pe(e/.2)}:e>.88?{phase:"camera-out",strength:0,stretch:1,camera:1-Pe((e-.88)/.12)}:{...Bv((e-.24)/.64),camera:1}}var Ju=(i,e)=>oe(ue(i,e),.5),zt=(i,e,t)=>ue(oe(i,1-t),oe(e,t));function kf(i,e,t){let n=be(t),r=be(st(e,i)),s=be(Ct(r,n));return{origin:Ju(i,e),right:i,left:e,rawX:r,x:s,y:n,z:be(Ut(s,n)),length:Ot(st(e,i))/2}}function zn(i,e,t){let n=Object.fromEntries(i.joints.map((u,h)=>[u,h])),r=(u,h)=>{let p=i.reconstruction[u][n[h]];if(!p)throw new Error(`Missing axis joint: ${h}`);return p},s=u=>u.find(h=>Object.hasOwn(n,h)),o=s(["clavicle"]),a=s(["thorax","torso","root"]),c=o?r(t,o):Ju(r(t,"left_shoulder"),r(t,"right_shoulder")),l=a?r(t,a):Ju(r(t,"left_hip"),r(t,"right_hip"));return{reference:{...kf(r(e.ref_frame_id,"right_ankle"),r(e.ref_frame_id,"left_ankle"),[0,-1,0]),jointPairs:{lateral:{joints:["right_ankle","left_ankle"],from:r(e.ref_frame_id,"right_ankle"),to:r(e.ref_frame_id,"left_ankle")}}},torso:{...kf(r(t,"right_shoulder"),r(t,"left_shoulder"),st(c,l)),jointPairs:{lateral:{joints:["right_shoulder","left_shoulder"],from:r(t,"right_shoulder"),to:r(t,"left_shoulder")},up:{joints:[...a?[a]:["right_hip","left_hip"],...o?[o]:["right_shoulder","left_shoulder"]],from:l,to:c}}}}}var kv=["grow","shrink","up","orthogonalize","plane","forward","plane-fade","complete"];function Hv(i,e,t){let n=Math.max(-1,Math.min(1,i.reduce((s,o,a)=>s+o*e[a],0))),r=Math.acos(n);return r<1e-8?[...e]:be(ue(oe(i,Math.sin((1-t)*r)),oe(e,Math.sin(t*r))))}function Fi(i,e,t,n){let r=kv.indexOf(e),s=i.origin,o=i.length,a=Ne((t-.28)/.72),c={from:i.right,to:i.right},l=null,u=null,h=0,p=0;if(r===0&&(c.to=zt(i.right,i.left,t)),r===1&&(c={from:zt(i.right,s,t),to:i.left}),r>=2){let g=r===3?Hv(i.rawX,i.x,a):r>3?i.x:i.rawX;c={from:s,to:ue(s,oe(g,o))},l={from:s,to:ue(s,oe(i.y,o*(r===2?t:1)))}}e==="up"&&n&&i.jointPairs?.up&&(l=Ui(i.jointPairs.up,{from:s,to:ue(s,oe(i.y,o))},n,t)),r>=4&&r<=6&&(h=r===4?t:1,p=r===6?1-t:1),r>=5&&(u={from:s,to:ue(s,oe(i.z,o*(r===5?t:1)))});let f=r===3?{origin:s,from:i.y,normal:be(Ut(i.y,be(st(c.to,c.from)))),angle:Xr(Math.acos(Math.max(-1,Math.min(1,un(i.y,be(st(c.to,c.from))))))),opacity:Pe(Ne(t/.18)),radius:o*.42,axis:"z",rightAngle:!0,squareProgress:Pe(Ne((a-.65)/.35))}:null;return{x:c,y:l,z:u,plane:h,planeOpacity:p,frame:i,opacity:1,highlight:r===3?"x":null,angleMarker:f}}function Ft(i,e=1){return{...Fi(i,"complete",1),opacity:e}}var en={x:"#7540c8",y:"#009eaf",z:"#e69a00"},Hf={x:"#a46bff",y:"#00d8ed",z:"#ffc338"};function Os(i,e,t){let n=Math.max(0,Math.min(1,t));return"#"+[1,3,5].map(r=>Math.round(parseInt(i.slice(r,r+2),16)*(1-n)+parseInt(e.slice(r,r+2),16)*n).toString(16).padStart(2,"0")).join("")}function Vf(i,e,t){let n=en[i],r=en[e],s=Math.max(0,Math.min(1,t));return"#"+[1,3,5].map(o=>Math.round(parseInt(n.slice(o,o+2),16)*(1-s)+parseInt(r.slice(o,o+2),16)*s).toString(16).padStart(2,"0")).join("")}var Gf={reference:"#8b9198"},rc="#d22681";function wr(i,e){let t=new Mt;t.setAttribute("position",new rt(new Float32Array(12),3)),t.setIndex([0,1,2,0,2,3]);let n=64,r=new Mt;r.setAttribute("position",new rt(new Float32Array((n+2)*3),3)),r.setIndex(Array.from({length:n},(a,c)=>[0,c+1,c+2]).flat());let s=new $t({color:en.y,transparent:!0,opacity:0,depthWrite:!1,side:Vt}),o=new it(t,s);return o.renderOrder=15,i.add(o),{update(a){if(o.visible=!!a&&a.opacity>0,!o.visible)return;o.geometry=a.shape==="circle"?r:t;let c=o.geometry.attributes.position;if(a.shape==="circle"){let l=e(a.origin);c.setXYZ(0,l.x,l.y,l.z);for(let u=0;u<=n;u++){let h=u/n*Math.PI*2,p=e(ue(a.origin,ue(oe(a.u,Math.cos(h)*a.size),oe(a.v,Math.sin(h)*a.size))));c.setXYZ(u+1,p.x,p.y,p.z)}}else[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([u,h],p)=>{let f=e(ue(a.origin,ue(oe(a.u,u*a.size),oe(a.v,h*a.size))));t.attributes.position.setXYZ(p,f.x,f.y,f.z)});c.needsUpdate=!0,o.geometry.computeBoundingSphere(),s.opacity=(a.fillOpacity??.12)*a.opacity,s.color.set(a.color??en[a.axis??"y"])},dispose(){i.remove(o),t.dispose(),r.dispose(),s.dispose()}}}function Wf(i,e=96){let t=i.rightAngle?Ne(i.squareProgress??(Math.abs(Math.abs(i.angle)-90)<.05?1:0)):0,n=oe(i.from,i.radius),r=oe(gt(i.from,i.normal,i.angle),i.radius);return{points:Array.from({length:e+1},(o,a)=>{let c=a/e,l=oe(gt(i.from,i.normal,i.angle*c),i.radius),u=c<=.5?ue(n,oe(r,c*2)):ue(oe(n,(1-c)*2),r),h=ue(oe(l,1-t),oe(u,t));return ue(i.origin,h)}),amount:t}}function qr(i,e){let n=new Mt,r=new rt(new Float32Array(98*3),3);n.setAttribute("position",r),n.setIndex(Array.from({length:96},(h,p)=>[0,p+1,p+2]).flat());let s=new $t({transparent:!0,opacity:.2,depthWrite:!1,side:Vt}),o=new it(n,s);o.renderOrder=16,i.add(o);let a=new Mt,c=new rt(new Float32Array(99*3),3);a.setAttribute("position",c);let l=new Li(a,new Dn({transparent:!0,opacity:0,depthWrite:!1}));l.renderOrder=18,i.add(l);function u(h){if(o.visible=!!h&&Math.abs(h.angle)>.01,l.visible=!1,!o.visible)return;let{points:p,amount:f}=Wf(h,96),g=e(h.origin);r.setXYZ(0,g.x,g.y,g.z),c.setXYZ(0,g.x,g.y,g.z),p.forEach((m,d)=>{let v=e(m);r.setXYZ(d+1,v.x,v.y,v.z),c.setXYZ(d+1,v.x,v.y,v.z)}),c.setXYZ(98,g.x,g.y,g.z),r.needsUpdate=!0,c.needsUpdate=!0,n.computeBoundingSphere(),a.computeBoundingSphere();let x=h.opacity??1;s.opacity=(h.fillOpacity??.28)*x,l.visible=f>0||!!h.outline,l.material.opacity=.75*(h.outline?1:f)*x,s.color.set(h.color??rc),l.material.color.copy(s.color)}return{update:u,dispose(){n.dispose(),s.dispose(),a.dispose(),l.material.dispose(),i.remove(o,l)}}}function sc(i,e){let t=[qr(i,e),qr(i,e)];return{update(n=[]){t.forEach((r,s)=>r.update(n[s]))},dispose(){t.forEach(n=>n.dispose())}}}function Xf(i,e){let t=Object.fromEntries(i.joints.map((a,c)=>[a,c])),n=zn(i,e.meta,0).reference,r=i.reconstruction[0],s=oe(ue(r[t.left_ankle],r[t.right_ankle]),.5),o=i.reconstruction.map(a=>{let c=["shoulder","hip"].map(h=>{let p=a[t[`right_${h}`]],f=a[t[`left_${h}`]];if(![p,f].every(x=>Array.isArray(x)&&x.length===3&&x.every(Number.isFinite)))return null;let g=Ct(st(f,p),n.y);return Ot(g)>1e-10?be(g):null});if(c.some(h=>!h))return null;let[l,u]=c;return{shoulder:l,hip:u,angle:br(u,l,n.y)}});return{origin:s,normal:n.y,u:n.x,v:n.z,frames:o}}function qf({scene:i,toWorld:e},t,n){let r=wr(i,e),s=qr(i,e);r.update({origin:t.origin,u:t.u,v:t.v,size:n,shape:"circle",color:bn.xfactor,opacity:1,fillOpacity:.12});let o=new _i(1,1,1,12),a=new D(0,1,0),c=["shoulder","hip"].map(l=>{let u=new it(o,new $t({color:bn[l]}));return u.name=`X-factor projected ${l} direction`,i.add(u),{region:l,mesh:u}});return{setFrame(l){let u=t.frames[l];for(let{region:p,mesh:f}of c){if(f.visible=!!u,!u)continue;let g=e(ue(t.origin,oe(u[p],-n))),x=e(ue(t.origin,oe(u[p],n))),m=x.clone().sub(g);f.position.copy(g).add(x).multiplyScalar(.5),f.quaternion.setFromUnitVectors(a,m.clone().normalize()),f.scale.set(.004,m.length(),.004)}let h=u?{origin:t.origin,from:u.hip,normal:t.normal,angle:u.angle,radius:n,color:bn.xfactor,opacity:1,fillOpacity:.38,outline:!0}:void 0;return s.update(h),h},dispose(){r.dispose(),s.dispose();for(let{mesh:l}of c)i.remove(l),l.material.dispose();o.dispose()}}}var Ku={torso_turn_bend_tilt:{turn:"y",bend:"x",tilt:"z"},hip_turn_on_spine_plane:{turn:"x"},shoulder_turn_on_spine_plane:{turn:"x"},shoulder_turn_tilt:{turn:"x",tilt:"y"},hip_turn_tilt:{turn:"x",tilt:"y"},spine_bend_tilt:{bend:"z",tilt:"x"},spine_azimuth_polar_spin:{azimuth:"z",polar:"y",spin:"x"},hip_sway_thrust_lift:{sway:"x",thrust:"z",lift:"y"}};Ku.torso_turn_bend_tilt_by_shoulder=Ku.torso_turn_bend_tilt;function oc(i,e){return en[Ku[i]?.[e]]}function Yf(i,e,t,n=1e3,r){let s=i.filter(Number.isFinite),o=r?.low??Math.min(...s),a=r?.high??Math.max(...s),c=a-o||1,l=!1,u="";for(let h=0;h<i.length;h++){if(!Number.isFinite(i[h])){l=!1;continue}let p=h/Math.max(1,i.length-1)*n,f=e+t-(i[h]-o)/c*t;u+=(l?"L":"M")+p.toFixed(2)+","+f.toFixed(2),l=!0}return{path:u,low:s.length?o:0,high:s.length?a:0}}function Qu(i,e=4){let t=i.flatMap(u=>u.values).filter(Number.isFinite),n=t.length?Math.min(...t):0,r=t.length?Math.max(...t):1;if(n===r){let u=Math.max(1,Math.abs(n)*.1);n-=u,r+=u}let s=(r-n)/e,o=10**Math.floor(Math.log10(s)),a=s/o,c=(a<1.5?1:a<3?2:a<7?5:10)*o;n=Math.floor(n/c)*c,r=Math.ceil(r/c)*c;let l=Array.from({length:Math.round((r-n)/c)+1},(u,h)=>Number((n+h*c).toPrecision(12)));return{low:n,high:r,step:c,ticks:l}}function Vv(i,e,t="geometric-rotations",n){let s=js[t].groups.flatMap(o=>o.keys.map(a=>({key:`${o.id}-${a}`,group:o.id,label:o.labels[a],color:o.color,dashed:o.keys.length>1&&a==="tilt",values:Array.from({length:e},(c,l)=>{let u=i.metrics?.[o.type]?.[o.subtype]?.[a]?.[l];return Number.isFinite(u)?u:null})})));return n&&s.push({key:"xfactor-angle",group:"xfactor",label:"X-factor",color:bn.xfactor,dashed:!1,values:Array.from({length:e},(o,a)=>Number.isFinite(n[a])?n[a]:null)}),s}function $f({canvas:i,metrics:e,frameCount:t,xFactorValues:n,feature:r="geometric-rotations"}){let s=document.createElement("div");s.className="snapshot-rotation-plots snapshot-bottom-strip";let o=Vv(e,t,r,n),a=js[r],c=a.groups.map(u=>({id:u.id,label:u.label,color:u.color}));n&&c.push({id:"xfactor",label:"X-factor",color:bn.xfactor}),a.combined&&(c=[{id:"translation",label:"Hip translation",color:"#65766d"}],s.style.height="76px"),s.style.setProperty("--measurement-rows",c.length),s.style.setProperty("--measurement-chart-height",a.combined?"43px":c.length===3?"20px":"36px");let l=c.map(u=>Gv({root:s,frameCount:t,region:u.id,label:u.label,color:u.color,unit:a.unit??"\xB0",channels:a.combined?o:o.filter(h=>h.group===u.id)}));return i.parentElement.append(s),{setFrame(u){l.forEach(h=>h.setFrame(u)),s.dataset.frame=u},dispose(){s.remove()}}}function Gv({root:i,frameCount:e,region:t,label:n,color:r,channels:s,unit:o="\xB0"}){let a="http://www.w3.org/2000/svg",c=new Set(s.map(A=>A.key)),l=new Map,u=Qu(s,2),h=document.createElement("div");h.className="snapshot-rotation-plot",h.setAttribute("aria-label",`${n} line plot`),h.style.setProperty("--rotation-panel-color",r),h.style.setProperty("--rotation-panel-fill",r+"21"),h.style.setProperty("--rotation-panel-border",r+"99");let p=document.createElement("div");p.className="snapshot-rotation-legend";for(let A of s){let T=document.createElement("button"),b=document.createElement("i");T.type="button",T.setAttribute("aria-pressed","true"),T.setAttribute("aria-label",`Toggle ${A.label}`),T.style.color=A.color,b.style.borderTopStyle=A.dashed?"dashed":"solid",T.append(b,document.createTextNode(A.label)),p.append(T),T.onclick=()=>{c.has(A.key)?c.delete(A.key):c.add(A.key),T.setAttribute("aria-pressed",String(c.has(A.key))),v()}}let f=document.createElement("div");f.className="snapshot-rotation-chart";let g=document.createElement("div");g.className="snapshot-rotation-ticks";let x=document.createElementNS(a,"svg");x.setAttribute("viewBox","0 0 1000 120"),x.setAttribute("preserveAspectRatio","none"),x.setAttribute("role","img"),x.setAttribute("aria-label",`${n} measurements in ${o.trim()} with a synchronized playback cursor`);let m=(A,T)=>{let b=document.createElementNS(a,A);for(let[M,C]of Object.entries(T))b.setAttribute(M,C);return x.append(b),b},d=document.createElementNS(a,"g");x.prepend(d);for(let A of s)l.set(A.key,m("path",{fill:"none",stroke:A.color,"stroke-width":1.5,"stroke-dasharray":A.dashed?"5 3":"none","vector-effect":"non-scaling-stroke"}));function v(){let A=s.filter(b=>c.has(b.key));A.length&&(u=Qu(A,2)),g.replaceChildren(),d.replaceChildren();let T=b=>(u.high-b)/(u.high-u.low)*120;for(let[b,M]of[[u.high,"4px"],[u.low,"calc(100% - 4px)"]]){let C=document.createElement("span");C.textContent=`${b}${o==="\xB0"?o:""}`,C.style.top=M,g.append(C)}for(let b of u.ticks){let M=m("line",{x1:0,x2:1e3,y1:T(b),y2:T(b),stroke:b===0?"#afbfaa88":"#dbe4d688","stroke-width":.65,"vector-effect":"non-scaling-stroke"});d.append(M)}for(let b of s){let M=l.get(b.key);M.style.display=c.has(b.key)?"":"none",M.setAttribute("d",Yf(b.values,0,120,1e3,u).path)}w.hidden=!0,_.style.display="none",h.dataset.range=JSON.stringify([u.low,u.high])}let y=m("line",{x1:0,x2:0,y1:0,y2:120,stroke:"#29463b","stroke-width":1.4,"vector-effect":"non-scaling-stroke"}),_=m("line",{x1:0,x2:0,y1:0,y2:120,stroke:"#29463b","stroke-width":1,"stroke-dasharray":"3 3","vector-effect":"non-scaling-stroke"});_.style.display="none";let w=document.createElement("div");w.className="snapshot-rotation-tooltip",w.hidden=!0;let E=A=>{let T=x.getBoundingClientRect(),b=Math.max(0,Math.min(1,(A.clientX-T.left)/T.width)),M=Math.round(b*Math.max(0,e-1));_.style.display="",_.setAttribute("x1",b*1e3),_.setAttribute("x2",b*1e3),w.replaceChildren();for(let C of s){if(!c.has(C.key))continue;let F=document.createElement("div");F.style.color=C.color;let H=C.values[M];F.textContent=`${C.label}: ${Number.isFinite(H)?H.toFixed(o==="\xB0"?1:3)+o:"\u2014"}`,w.append(F)}w.style.left=`${b*100}%`,w.style.transform=b>.5?"translateX(-100%)":"none",w.hidden=c.size===0};return x.addEventListener("pointermove",E),x.addEventListener("pointerleave",()=>{w.hidden=!0,_.style.display="none"}),h.addEventListener("pointerdown",A=>A.stopPropagation()),h.addEventListener("wheel",A=>A.stopPropagation(),{passive:!0}),v(),f.append(g,x,w),h.append(p,f),i.append(h),{setFrame(A){let T=Math.max(0,Math.min(e-1,A))/Math.max(1,e-1)*1e3;y.setAttribute("x1",T),y.setAttribute("x2",T),h.dataset.frame=A},dispose(){h.remove()}}}function jf(i,e=()=>1){let t=new Set,n=new Set,r=new Map,s=[...i].sort((o,a)=>e(a.key)-e(o.key));for(let{key:o,state:a}of s){let c={...a};for(let l of["originalReferenceAxes","referenceAxes","torsoAxes"]){let u=a[l];if(!u)continue;let h={...u};for(let p of["x","y","z"]){let f=u[p];if(!f)continue;let x=(l==="torsoAxes"?"target":"measurement")+JSON.stringify([f.from,f.to].map(m=>m.map(d=>Math.round(d*1e7)/1e7)));t.has(x)?delete h[p]:t.add(x)}c[l]=h}a.guides&&(c.guides=a.guides.filter(l=>n.has(l.id)?!1:(n.add(l.id),!0))),r.set(o,c)}return i.map(({key:o})=>({key:o,state:r.get(o)}))}function oi(i,e){if(e.transition===void 0)return i;let t=i.segments.find(u=>u.id==="finish"),n=e.transition*1e3,r=e.type==="position"?.22:e.subtype==="spine_azimuth_polar_spin"||e.subtype.startsWith("torso_")?.34:e.subtype.endsWith("_on_spine_plane")?.4:.38,s=Math.min(1200,t.duration*.2),o=s+(t.duration-s)*r,a={...t,id:"review-transition",title:"Prepare review",completion:!1,start:t.start,end:t.start+n,duration:n},c={...t,start:a.end,duration:Math.max(0,t.duration-n)},l=i.segments.flatMap(u=>u===t?[a,c]:[u]);return{...i,segments:l,sample(u){let h=u;u>=a.start&&u<a.end?h=t.start+o*(u-a.start)/Math.max(1e-9,n):u>=c.start&&u<c.end&&(h=t.start+o+(t.duration-o)*(u-c.start)/Math.max(1e-9,c.duration));let p=i.sample(h);return u>=a.start&&u<a.end&&(p.segment="review-transition"),p.segment==="finish"&&(p.reviewDuration=t.duration),p}}}function mn(i,e){let t=Math.min(1200,e*.2)/e;return{holding:i<t,progress:Math.max(0,(i-t)/(1-t))}}function Mi(i,e,t=.4){let r=Math.max(1,e-Math.min(1200,e*.2)),s=Math.min(180/r,(t-.22)*.3);return i<.22?1-Pe(Ne(i/.22)):Pe(Ne((i-.22-s)/(t-.22-s)))}function Ni(i,e,t=.4,n=[]){if(i.segment!=="finish"||!i.torsoAxes)return;let r=e.find(l=>l.id==="finish"),s=mn(i.progress,r.duration);if(s.holding)return;let o=s.progress,a=Math.max(1,r.duration-Math.min(1200,r.duration*.2)),c=o<t?Mi(o,r.duration,t):1;for(let{at:l,ready:u}of n){let h=Math.min(240/a,.05),p=Math.min(100/a,(u-l)*.3);o>=l-h&&o<l?c*=Pe(Ne((l-o)/h)):o>=l&&o<u&&(c*=Pe(Ne((o-l-p)/(u-l-p))))}i.torsoAxes.opacity=(i.torsoAxes.opacity??1)*c}function Bn(){return[{id:"result-preview",title:"Selected pose \xB7 final result",duration:2200,intro:!0,opening:"result"},{id:"intro",title:"Reference + selected pose",duration:1600,motionDuration:1100,intro:!0,opening:"reference"}]}function eh(i,e,t){return i.opening?{referencePose:i.opening==="result"?0:.5*Pe(Ne(e)),selectedPose:1,values:Object.fromEntries(Object.entries(t).map(([n,r])=>[n,i.opening==="result"?r:0]))}:null}function ai(i,e,t,n){let r=eh(e,t,n);return r?(Object.assign(i,r),!0):!1}function yt(i,e){let t=be(i),n=be(Ut(e,t)),r=be(Ut(t,n));return new Jt().setFromRotationMatrix(new bt().makeBasis(new D(...n),new D(...r),new D(...t)))}function kn(i){let e=new D(...i.z).addScaledVector(new D(...i.x),.65);return yt(e.toArray(),i.y)}function th(i){let e=[0,1,2].map(n=>Math.min(...i.map(r=>r[n]))),t=[0,1,2].map(n=>Math.max(...i.map(r=>r[n])));return[0,1].flatMap(n=>[0,1].flatMap(r=>[0,1].map(s=>[n?t[0]:e[0],r?t[1]:e[1],s?t[2]:e[2]])))}function Wt(i,e,t){let n=i.clone().slerp(e,t);return{direction:new D(0,0,1).applyQuaternion(n).toArray(),up:new D(0,1,0).applyQuaternion(n).toArray()}}function ci(i,e){return{...i,up:[...e]}}function nh(i,e,t=.4){let n=new D(...e).normalize(),r=new D(...i.direction).normalize(),s=r.dot(n);if(s>=t)return i;let o=r.clone().addScaledVector(n,-s);return o.lengthSq()<1e-12&&o.crossVectors(n,new D(...i.up)),o.lengthSq()<1e-12&&o.crossVectors(n,new D(1,0,0)),o.normalize().multiplyScalar(Math.sqrt(1-t*t)).addScaledVector(n,t),{...i,direction:o.toArray()}}function Hn(i,e,t,n,r){let s=new D(...n).normalize(),o=new D(...r).normalize(),a=new D().crossVectors(s,o).normalize();function c(x){let m=new D(0,0,1).applyQuaternion(x);return{yaw:Math.atan2(m.dot(a),m.dot(o)),pitch:Math.asin(Math.max(-1,Math.min(1,m.dot(s))))}}let l=c(i),u=c(e),h=Math.atan2(Math.sin(u.yaw-l.yaw),Math.cos(u.yaw-l.yaw)),p=l.yaw+h*t,f=l.pitch+(u.pitch-l.pitch)*t;return{direction:o.clone().multiplyScalar(Math.cos(p)*Math.cos(f)).addScaledVector(a,Math.sin(p)*Math.cos(f)).addScaledVector(s,Math.sin(f)).toArray(),up:[...n]}}function ac(i,e,t=6,n=15){let r=new D(...e).normalize(),s=new D(0,0,1).applyQuaternion(i),o=Math.asin(Math.max(-1,Math.min(1,s.dot(r)))),a=Math.max(t*Math.PI/180,Math.min(n*Math.PI/180,o)),c=s.clone().addScaledVector(r,-s.dot(r)).normalize();return yt(c.multiplyScalar(Math.cos(a)).addScaledVector(r,Math.sin(a)).toArray(),e)}function Zf(i,e,t,n){let r=new D(...t).normalize(),s=new D(...e).dot(r),o=new D(0,0,1).applyQuaternion(i);return Math.abs(s)>1e-8&&(o.addScaledVector(r,-o.dot(r)).normalize(),o.addScaledVector(r,Math.sign(s)*.35).normalize()),ac(yt(o.toArray(),n),n)}function Jf(i,e){let t=i.z.map((a,c)=>a+.65*i.x[c]+.35*i.y[c]),n=yt(t,i.y),r=.32,s=.3;function o(a,c,l){let u=mn(c,l);if(u.holding)return e.sample(a,{id:"finish"},1);let h=Ne(u.progress);if(h<.22){e.sample(a,{id:"finish"},1);let p=yt(a.camera.direction,a.camera.up),f=Pe(h/.22);return a.camera=Hn(p,n,f,i.y,i.z),a.focus=1+(r-1)*f,a.selectedPose=.1+(s-.1)*f,a.referenceAxes.opacity=1-f,a.values={turn:0,bend:0,tilt:0},a.sectors=[],a}if(h<.34)e.setAngles(a,0),a.referenceAxes.opacity=Mi(h,l,.34),a.sectors=[];else if(h<.88){let p=(h-.34)/.54*3,f=Math.min(2,Math.floor(p)),g=Ne((p-f-.25)/.75);e.sample(a,{id:["turn","bend","tilt"][f]},Pe(g))}else e.sample(a,{id:"finish"},1);return a.camera=Wt(n,n,1),a.focus=r,a.selectedPose=s,a}return{sample:o,view:n,focus:r,pose:s}}function Kf(i){let{origin:e,x:t,y:n,z:r,length:s}=i,o=a=>ue(e,oe(a,s));return{points:[e,o(t),o(n),ue(o(t),oe(n,s)),o(r)],orientation:yt(be(ue(ue(oe(t,.7),oe(n,.45)),r)),n)}}function cc(i,e,t=[0,0,-1],n=[0,-1,0]){let r=be(st(i.to,i.from)),s=Ct(t,r);Ot(s)<1e-6&&(s=Ct(Math.abs(r[1])<.9?[0,1,0]:[1,0,0],r));let o=be(s),a=Ct(n,o);return Ot(a)<1e-6&&(a=Ct(r,o)),{points:[i.from,i.to,...e?[e.from,e.to]:[]],orientation:yt(o,a)}}function Vn(i,e,t=[0,-1,0],{maxAlignment:n=.9,targetAlignment:r=.85}={}){let s=be(st(e.to,e.from)),o=Wt(i,i,1).direction,a=un(s,o);if(Math.abs(a)<=n)return i;let c=Ct(o,s);Ot(c)<1e-6&&(c=Wt(cc(e,null,o,t).orientation,cc(e,null,o,t).orientation,1).direction);let l=ue(oe(be(c),Math.sqrt(1-r*r)),oe(s,Math.sign(a)*r));return yt(l,t)}function lc(i,e,t=[0,-1,0]){let n=Kf(i),r=[...n.points,...Object.values(i.jointPairs).flatMap(a=>[a.from,a.to])],s=yt(ue(i.z,oe(i.y,.35)),i.y),o=n.orientation;for(let a of Object.values(i.jointPairs))o=Vn(o,a,t);return(a,c)=>{let l=a==="in"?c:a==="out"?1-c:1,u=a==="in"?e:a==="cross"?s:a==="out"?n.orientation:o,h=a==="out"?e:a==="angle"||a==="orthogonalize"?s:a==="in"||a==="hold"?o:n.orientation,p=["in","out","angle","cross"].includes(a)?c:1;return{pairFocus:{points:r,amount:l},camera:Wt(u,h,p)}}}function Ro(i){if(i!==void 0&&(typeof i!="number"||!Number.isFinite(i)||i<=0))throw new Error("Snapshot duration must be a positive number of seconds")}function Co(i){if(i!==void 0&&(typeof i!="number"||!Number.isFinite(i)||i<0))throw new Error("Snapshot stay must be a nonnegative number of seconds")}function En(i,e,t){if(e&&typeof e=="object"){let l=e;return l.explain!==void 0?Wv(i,l):En(i,l.duration,l.stay)}Ro(e),Co(t);let r=i.filter(l=>!(t!==void 0&&l.completion)).reduce((l,u)=>l+u.duration,0),s=e===void 0?r:e*1e3,o=s/r,a=0;for(let l of i)l.duration=t!==void 0&&l.completion?t*1e3:l.duration*o,l.motionDuration!==void 0&&(l.motionDuration*=o),l.start=a,a+=l.duration,l.end=a;let c=s+(t===void 0?0:i.filter(l=>l.completion).length*t*1e3);if(i.length){let l=i.at(-1);l.end=c,l.duration=c-l.start}return c}function Wv(i,e){Ro(e.explain);for(let c of["start_stay","transition","review","end_stay"])Co(e[c]);let t=e.review*1e3,n=Math.min(800,t*.1),r=new Map([["result-preview",e.start_stay*1e3],["finish",t-n+(e.transition??0)*1e3],["reset",n]]);i.push({id:"end-stay",title:"Selected pose \xB7 final result",opening:"result",duration:e.end_stay*1e3}),r.set("end-stay",e.end_stay*1e3);let s=i.filter(c=>!r.has(c.id)).reduce((c,l)=>c+l.duration,0),o=e.explain*1e3/s,a=0;for(let c of i){let l=r.has(c.id)?c.duration?r.get(c.id)/c.duration:0:o;c.duration=r.get(c.id)??c.duration*o,c.motionDuration!==void 0&&(c.motionDuration*=l),c.start=a,a+=c.duration,c.end=a}return a}var Xv={grow:"Right \u2192 left",shrink:"Head \u2192 midpoint",up:"Up direction",orthogonalize:"Remove the up component",plane:"Left\u2013up plane",forward:"Forward direction","plane-fade":"Forward axis ready"},qv=[["grow",1500],["shrink",1200],["up",1500],["orthogonalize",1700],["plane",1300],["forward",1500],["plane-fade",850]];function Po(i,e,t=i){return qv.flatMap(([n,r])=>{let s={id:i+"-"+n,title:t+" \xB7 "+Xv[n],duration:r+500,motionDuration:r,step:n};return n==="grow"?[{id:i+"-lateral-camera-in",title:"Focus on the axis set",duration:1700,motionDuration:1200,step:"grow",constructionCamera:i,view:"in"},Ao(i,"lateral","grow"),{...s,jointPair:{name:"lateral",phase:"grow"}},To(i,"lateral","grow")]:n==="shrink"?[{...s,jointPair:{name:"lateral",phase:"align"}}]:n==="up"&&e.jointPairs.up?[Ao(i,"up","up"),{...s,jointPair:{name:"up",phase:"grow"}},To(i,"up","up"),{id:i+"-up-align",title:"Align the up-vector head",duration:1700,motionDuration:1200,step:"up",jointPair:{name:"up",phase:"align"}}]:n==="plane"?[{id:i+"-cross-camera-in",title:"View the cross product",duration:1700,motionDuration:1200,step:"plane",constructionCamera:i,view:"cross"},s]:n==="plane-fade"?[s,{id:i+"-cross-camera-out",title:"See the completed axis set",duration:1700,motionDuration:1200,step:"complete",constructionCamera:i,view:"out"}]:n!=="orthogonalize"?[s]:[{id:i+"-angle-camera",title:"View the left\u2013up angle",duration:1700,motionDuration:1200,step:"orthogonalize",constructionCamera:i,view:"angle"},{id:i+"-angle-reveal",title:"See the left\u2013up angle",duration:3e3,motionDuration:700,step:"orthogonalize",anglePhase:"reveal"},{...s,anglePhase:"remove"}]})}function uc(i,e,t,n){let r=e.jointPair,s=r?[{pose:n,joints:i.jointPairs[r.name].joints,strength:Di(r.phase,t)}]:[],o;return r?.name==="up"?o=Fi(i,e.step,t,r.phase):r?o=Fi(i,e.step,r.phase==="focus"?0:r.phase==="release"?1:t):e.anglePhase?(o=Fi(i,e.step,e.anglePhase==="remove"?.28+.72*t:0),o.angleMarker.opacity=e.anglePhase==="reveal"?t:1,o.componentPlane={origin:i.origin,u:i.x,v:i.z,size:i.length*1.1,axis:"y",opacity:e.anglePhase==="reveal"?Pe(t):1-Pe(Ne((t-.8)/.2))}):o=Fi(i,e.step,t),{axes:o,highlights:s}}function Oi(i,e){let t=i.sectors?.[0];if(!t)return;let n=Pe(Ne(e/.12))*Pe(Ne((1-e)/.12));if(n<=0)return;let r=be(t.normal),s=t.origin;for(let o of["referenceAxes","torsoAxes","originalReferenceAxes","originalTorsoAxes"]){let a=i[o];if(!(!a||(a.opacity??1)<=0))for(let c of["x","y","z"]){let l=a[c];if(!l||(l.opacity??1)<=0)continue;let u=st(l.to,l.from);if(Ot(u)<1e-8||Math.abs(un(be(u),r))<.99999||Ot(Ut(st(l.from,s),r))>1e-6)continue;let h=l.colorAxis??c;l.color=Os(l.color??en[h],Hf[h],n)}}}function Qf(i,e,t,n){let r=g=>t.orientation.map(x=>x.reduce((m,d,v)=>m+d*g[v],0));function s(g,x,m){let d=gt(lt.x,lt.y,g),v=lt.y,y=gt(lt.z,lt.y,g);return v=gt(v,d,x),y=gt(y,d,x),d=gt(d,y,m),v=gt(v,y,m),{...i,origin:e.origin,length:e.length,x:r(d),y:r(v),z:r(y),rawX:r(d)}}let o={turn:s(0,0,0),bend:s(n.turn,0,0),tilt:s(n.turn,n.bend,0)},a=25*Math.PI/180,c=ue(oe(o.turn.y,Math.cos(a)),oe(o.bend.x,Math.sin(a))),l=(g,x,m)=>Hn(g,x,m,i.y,i.z),u={front:kn(i),turn:yt(c,i.y),bend:yt(o.bend.x,i.y),tilt:yt(o.tilt.z,i.y)};function h(g,x){let m={turn:"y",bend:"x",tilt:"z"}[g];return["x","y","z"].filter(d=>d!==m).map(d=>({origin:e.origin,from:o[g][d],normal:o[g][m],angle:x,radius:e.length*.85,axis:m,direction:d}))}function p(g,x,m){let d=["camera-turn","turn","camera-bend","bend","camera-tilt","tilt","finish","reset"],v=d.indexOf(x.id),y=v>1?n.turn:x.id==="turn"?n.turn*m:0,_=v>3?n.bend:x.id==="bend"?n.bend*m:0,w=v>5?n.tilt:x.id==="tilt"?n.tilt*m:0;if(g.values={turn:y,bend:_,tilt:w},g.referenceAxes=Ft(s(y,_,w)),x.cameraFor){let E=x.cameraFor,A={turn:"front",bend:"turn",tilt:"bend"}[E];g.camera=l(u[A],u[E],m),g.referenceAxes.highlight={turn:"y",bend:"x",tilt:"z"}[E]}else{let E=v<=1?"turn":v<=3?"bend":"tilt";g.camera=l(u[E],u[E],1)}if(["turn","bend","tilt"].includes(x.id)){let E=x.id,A={turn:"y",bend:"x",tilt:"z"}[E];g.active=E,g.referenceAxes.highlight=A,g.sectors=h(E,g.values[E]),Oi(g,m)}return x.id==="finish"&&(g.sectors=h("tilt",n.tilt)),x.id==="reset"&&(g.camera=l(u.tilt,u.front,m),g.focus=1-m,g.referencePose=.5*m,g.selectedPose=.1+.9*m,g.referenceAxes.opacity=1-m,g.torsoAxes.opacity=.42*(1-m)),g}function f(g,x){g.values=Object.fromEntries(Object.entries(n).map(([m,d])=>[m,d*x])),g.referenceAxes=Ft(s(g.values.turn,g.values.bend,g.values.tilt))}return{sample:p,setAngles:f}}function Io(i){let{data:e,meta:t,entry:n}=i.context,r=zn(e,t,n.frame),s=Object.fromEntries(i.items.map(x=>[x.key,x.computed])),o={...r.torso,origin:i.context.source(i.context.midpoint("left_hip","right_hip"))};r.measurement=o;let a=[...Bn(),{id:"reference-focus",title:"Reference pose",duration:1100},...Po("reference",r.reference,"Reference"),{id:"selected-focus",title:"Selected pose",duration:1300},...Po("torso",r.torso,"Torso"),{id:"target-root",title:"Move torso axes to hip center",duration:2200,motionDuration:1700},{id:"compare",title:"Two coordinate frames",duration:1200,motionDuration:700},{id:"align",title:"Align origins and lengths",duration:2700,motionDuration:2200},...["turn","bend","tilt"].flatMap(x=>[{id:"camera-"+x,title:"View along "+{turn:"Y",bend:"X",tilt:"Z"}[x]+" axis",duration:1800,motionDuration:1300,cameraFor:x},{id:x,title:{turn:"Turn \xB7 Y axis",bend:"Forward bend \xB7 X axis",tilt:"Side tilt \xB7 Z axis"}[x],duration:3900,motionDuration:3400}]),{id:"finish",title:"Aligned",duration:3e3,completion:!0},{id:"reset",title:"Reference + selected pose",duration:1200}],c=En(a,n),l=Qf(r.reference,o,t,s),u=Jf(r.reference,l),h=kn(r.reference),p=Object.fromEntries(["reference","torso"].map(x=>[x,lc(r[x],h)]));function f(x){let m=Ne(x/c)*c,d=a.find(A=>m<A.end)??a.at(-1),v=m-d.start,y=Ne(v/Math.max(1e-9,d.duration)),_=Pe(Ne(v/Math.max(1e-9,d.motionDuration??d.duration))),w={segment:d.id,title:d.title,progress:y,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{turn:0,bend:0,tilt:0},active:null,focus:0,focusOrigin:o.origin,camera:Wt(h,h,1),sectors:[],jointHighlights:[],pairFocus:null};function E(A){let T=uc(r[A],d,_,A==="reference"?"reference":"selected");return w.jointHighlights=T.highlights,T.axes}if(ai(w,d,_,s))return w;if(d.id==="reference-focus")return w.referencePose=.5-.22*_,w.selectedPose=1-_,w;if(d.constructionCamera){let A=d.constructionCamera,T=r[A];w.referencePose=A==="reference"?.28:0,w.selectedPose=A==="torso"?.28:0;let b=Fi(T,d.step,d.view==="out"?1:0);return w.referenceAxes=A==="reference"?b:Ft(r.reference),A==="torso"&&(w.torsoAxes=b),Object.assign(w,p[A](d.view,_)),w}return d.id.startsWith("reference-")?(w.referencePose=.28,w.selectedPose=0,w.referenceAxes=E("reference"),Object.assign(w,p.reference(d.step==="orthogonalize"?"orthogonalize":["plane","forward","plane-fade"].includes(d.step)?"cross-hold":"hold",1)),w):(w.referenceAxes=Ft(r.reference),d.id==="selected-focus"?(w.referencePose=.28*(1-_),w.selectedPose=.28*_,w):(w.referencePose=0,d.id.startsWith("torso-")?(w.selectedPose=.28,w.torsoAxes=E("torso"),Object.assign(w,p.torso(d.step==="orthogonalize"?"orthogonalize":["plane","forward","plane-fade"].includes(d.step)?"cross-hold":"hold",1)),w):d.id==="target-root"?(w.selectedPose=.28,w.torsoAxes=Ft({...r.torso,origin:zt(r.torso.origin,o.origin,_)}),w):(w.torsoAxes=Ft(o,.42),d.id==="compare"?(w.selectedPose=.28-.18*_,w.torsoAxes.opacity=1-.58*_,w):(w.selectedPose=.1,d.id==="align"?(w.referenceAxes=Ft({...r.reference,origin:zt(r.reference.origin,o.origin,_),length:r.reference.length*(1-_)+r.torso.length*_}),w.focus=Pe(Ne((_-.7)/.3)),w):(w.focus=1,d.id==="finish"?u.sample(w,y,d.duration):(l.sample(w,d,_),d.id==="reset"&&a.find(A=>A.completion).duration>0&&(w.camera=Wt(u.view,h,_),w.focus=u.focus*(1-_),w.selectedPose=u.pose+(1-u.pose)*_),w))))))}function g(x){let m=f(x);Ni(m,a,.34);for(let d of["x","y","z"])m.torsoAxes?.[d]&&(m.torsoAxes[d].keepVisible=!0);return m.segment==="reset"&&(m.referencePose=0),m.camera=ci(m.camera,r.reference.y),m}return oi({segments:a,duration:c,frames:r,values:s,sample:g},n)}function zi(i,e){let t=lc(i,e);return{segments:Po("reference",i),sample(n,r,s){if(!r.id.startsWith("reference-")||!r.step)return!1;if(n.referencePose=.28,n.selectedPose=0,r.constructionCamera)n.referenceAxes=Fi(i,r.step,r.view==="out"?1:0),Object.assign(n,t(r.view,s));else{let o=uc(i,r,s,"reference");n.referenceAxes=o.axes,n.jointHighlights=o.highlights,Object.assign(n,t(r.step==="orthogonalize"?"orthogonalize":["plane","forward","plane-fade"].includes(r.step)?"cross-hold":"hold",1))}return!0}}}function Yr(i,e,t,n){let r=be(Ct(i,e));return{direction:t==="project"?zt(i,r,n):r,originalOpacity:t==="fade"?1-n:1}}function tr(i,e,t,n){let r=be(Ut(e,i));return un(r,n)<0&&(r=oe(r,-1)),yt(ue(r,oe(e,.12)),t)}function Sr(i,e,{origin:t,radius:n,axis:r="y",opacity:s=1}){let o=be(i),a=be(Ct(i,e)),c=Ut(a,o),l=Math.hypot(...c);return{origin:t,from:a,to:o,normal:be(l>1e-8?c:Ut(a,e)),angle:Math.atan2(l,Math.max(-1,Math.min(1,un(a,o))))*180/Math.PI,radius:n,axis:r,opacity:s,rightAngle:!1,squareProgress:0}}function $r(i,e,t,{origin:n,radius:r,axis:s="y",opacity:o=1}){let a=be(i),c=be(e),l=Ut(a,c),u=Math.hypot(...l);return{origin:n,from:a,to:c,normal:be(u>1e-8?l:Ut(a,t)),angle:Math.atan2(u,Math.max(-1,Math.min(1,un(a,c))))*180/Math.PI,radius:r,axis:s,opacity:o,fillOpacity:.36,outline:!0}}function Lo(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=t.subtype.startsWith("shoulder")?"shoulder":"hip",o=e.lateral(s),a=e.spine("lower"),c=ae=>({from:e.source(ae.from),to:e.source(ae.to),joints:ae.joints}),l={lateral:c(o),up:c(a)},u=s==="shoulder"?oe(ue(l.lateral.from,l.lateral.to),.5):l.up.from,h=be(st(l.up.to,l.up.from)),p=be(st(l.lateral.to,l.lateral.from)),f=r.x,g=be(Ct(f,h)),x=be(Ct(p,h)),m=be(Ut(g,h)),d=Math.max(Math.hypot(...st(l.lateral.to,l.lateral.from))*.65,Math.hypot(...st(l.up.to,l.up.from))),v={origin:u,x:g,y:h,z:m,length:d},y={...v,x,z:be(Ut(x,h))},_={turn:i.items[0].computed},w=kn(r),E=yt(ue(ue(m,oe(g,.5)),oe(h,.65)),r.y),A=yt(h,r.y),T=ue(ue(m,oe(g,.5)),oe(h,.65)),b=tr(f,h,r.y,T),M=tr(p,h,r.y,T),C=(ae,ie,Ae)=>Hn(ae,ie,Ae,r.y,r.z),F=Vn(E,l.up,r.y),H=Vn(b,l.lateral,r.y,s==="shoulder"?{maxAlignment:.5,targetAlignment:.4}:void 0),q=zi(r,w),X=[...Object.values(l).flatMap(ae=>[ae.from,ae.to]),...[-1,1].flatMap(ae=>[-1,1].map(ie=>ue(u,ue(oe(g,d*ae),oe(m,d*ie))))),ue(u,oe(h,d))],I=(ae,ie=1600,Ae={})=>({id:ae,title:ae.replaceAll("-"," "),duration:ie+500,motionDuration:ie,...Ae}),ee=ae=>[{...Ao("selected",ae,ae),id:ae+"-focus",pair:ae,phase:"focus"},I(ae+"-grow",1600,{pair:ae,phase:"grow"}),{...To("selected",ae,ae),id:ae+"-release",pair:ae,phase:"release"},I(ae+"-align",1400,{pair:ae,phase:"align"})],W=[...Bn(),I("reference-focus",1100),...q.segments,I("selected-focus",1700),I("measurement-camera",1800),...ee("up"),I("plane",1400),I("reference-align",1800),I("reference-trim",1200),I("baseline-camera",1500),I("baseline-angle",700,{hold:2300}),I("baseline-project",1800),I("baseline-fade",1200),...H===b?[]:[I("lateral-stretch-camera",1500)],...ee("lateral"),I("lateral-camera",1500),I("lateral-angle",700,{hold:2300}),I("lateral-project",1800),I("lateral-fade",1200),I("rotation-camera",1600),I("turn",3400),{id:"finish",title:"Review the lower-spine turn",duration:6e3,completion:!0},I("reset",1200)];for(let ae of W)ae.hold&&(ae.duration=ae.motionDuration+ae.hold);let z=En(W,t),V=ae=>W.findIndex(ie=>ie.id===ae),k=(ae,ie)=>V(ie)>=0&&W.indexOf(ae)>=V(ie),O=ae=>({from:u,to:ue(u,oe(ae,d))});function te(ae,ie=1){let Ae=Ft(v,ie);return Ae.x=O(ae),Ae.y=null,Ae.z=null,Ae}function U(ae,ie,Ae){return Sr(ae,h,{origin:u,radius:d*.38,opacity:Ae})}function J(ae,ie){ae.referenceAxes=te(gt(g,h,_.turn*ie)),ae.referenceAxes.y=null,ae.torsoAxes=te(x,.42),ae.values.turn=ie===0?0:_.turn*ie,ae.active="turn",ae.sectors=[{origin:u,from:g,normal:h,angle:_.turn*ie,radius:d*.8,axis:"y"}],Oi(ae,ie)}function Q(ae){let ie=W.find(P=>ae<P.end)??W.at(-1),Ae=ae-ie.start,de=Ne(Ae/Math.max(1e-9,ie.duration)),Y=Pe(Ne(Ae/Math.max(1e-9,ie.motionDuration??ie.duration))),G={segment:ie.id,title:ie.title,progress:de,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{turn:0},active:null,focus:0,focusOrigin:u,camera:Wt(w,w,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(G,ie,Y,_))return G;if(ie.id==="reference-focus")return G.referencePose=.5-.22*Y,G.selectedPose=1-Y,G;if(q.sample(G,ie,Y))return G;if(G.referencePose=0,G.selectedPose=.28,G.referenceAxes=Ft(r),ie.id==="selected-focus")return G.referencePose=.28*(1-Y),G.selectedPose=.28*Y,G;let B=k(ie,"reference-align"),Se=ie.id==="reference-align"?Y:B?1:0,ne={...r,origin:zt(r.origin,u,Se),length:r.length*(1-Se)+d*Se};G.referenceAxes=Ft(ne);let We=[ne.origin,...["x","y","z"].map(P=>ue(ne.origin,oe(ne[P],ne.length)))],Ie=[...X,...We];if(G.camera=C(w,F,ie.id==="measurement-camera"?Y:1),G.pairFocus={points:Ie,amount:ie.id==="measurement-camera"?Y:1},k(ie,"baseline-camera")&&(G.camera=C(F,b,ie.id==="baseline-camera"?Y:1)),k(ie,"lateral-stretch-camera")&&(G.camera=C(b,H,ie.id==="lateral-stretch-camera"?Y:1)),k(ie,"lateral-camera")&&(G.camera=C(H,M,ie.id==="lateral-camera"?Y:1)),ie.id==="measurement-camera")return G;if(G.torsoAxes=te(p,.65),k(ie,"baseline-camera")||(G.torsoAxes.y=O(h)),G.torsoAxes.x=k(ie,"lateral-focus")?O(p):null,ie.pair){let P=l[ie.pair],S=O(ie.pair==="up"?h:p),j=Ui(P,S,ie.phase,Y);G.jointHighlights=[{pose:"selected",joints:P.joints,strength:Di(ie.phase,Y)}],ie.pair==="lateral"?G.torsoAxes.x=j:G.torsoAxes.y=j}if(k(ie,"plane")&&(G.plane={origin:u,u:g,v:m,size:d*(ie.id==="plane"?Y:1),opacity:1}),ie.id==="reference-trim"&&(G.referenceAxes.y.opacity=1-Y,G.referenceAxes.z.opacity=1-Y,G.torsoAxes.y.opacity=1-Y),k(ie,"baseline-camera")&&(G.referenceAxes.y=null,G.referenceAxes.z=null,G.torsoAxes.y=null),!k(ie,"baseline-angle"))return G;let ot=f,Be=p;if(k(ie,"baseline-project")){let P=ie.id==="baseline-project"?"project":"fade",S=Yr(f,h,P,ie.id==="baseline-fade"||P==="project"?Y:1);ot=S.direction,S.originalOpacity>0&&(G.originalReferenceAxes=te(f,S.originalOpacity),G.originalReferenceAxes.y=null)}if(k(ie,"lateral-project")){let P=ie.id==="lateral-project"?"project":"fade",S=Yr(p,h,P,ie.id==="lateral-fade"||P==="project"?Y:1);Be=S.direction,S.originalOpacity>0&&(G.originalTorsoAxes=te(p,.65*S.originalOpacity),G.originalTorsoAxes.y=null)}if(G.referenceAxes.x=O(ot),k(ie,"baseline-project")&&!k(ie,"lateral-focus")&&(G.referenceAxes.projectionSweep=$r(f,ot,h,{origin:u,radius:d*.5,opacity:ie.id==="baseline-fade"?1-Y:k(ie,"baseline-fade")?0:1})),k(ie,"lateral-project")&&!k(ie,"rotation-camera")&&(G.torsoAxes.projectionSweep=$r(p,Be,h,{origin:u,radius:d*.5,opacity:ie.id==="lateral-fade"?1-Y:k(ie,"lateral-fade")?0:1})),k(ie,"lateral-fade")&&(G.torsoAxes.opacity=ie.id==="lateral-fade"?.65-.23*Y:.42),!ie.pair&&k(ie,"lateral-focus")&&(G.torsoAxes.x=O(Be)),["baseline-angle","baseline-project"].includes(ie.id)&&(G.referenceAxes.angleMarker=U(ot,ie.id==="baseline-project"?Y:0,ie.id==="baseline-angle"?Y:1)),["lateral-angle","lateral-project"].includes(ie.id)&&(G.torsoAxes.angleMarker=U(Be,ie.id==="lateral-project"?Y:0,ie.id==="lateral-angle"?Y:1)),ie.id==="rotation-camera")return G.camera=C(M,A,Y),G;if(ie.id==="turn")return J(G,Y),G.camera=Wt(A,A,1),G;if(ie.id==="finish"){let P=mn(de,ie.duration);if(P.holding)return J(G,1),G.camera=Wt(A,A,1),G;let S=P.progress;if(G.pairFocus=null,S<.22){J(G,1);let ce=Pe(S/.22);G.referenceAxes.opacity=1-ce,G.values.turn=0,G.sectors=[],G.camera=C(A,E,ce),G.pairFocus={points:Ie,amount:1-ce},G.focus=.32*ce}else S<.4?(J(G,0),G.referenceAxes.opacity=Mi(S,ie.duration,.4),G.sectors=[],G.focus=.32,G.camera=Wt(E,E,1)):(J(G,Pe(Ne((S-.48)/.4))),G.focus=.32,G.camera=Wt(E,E,1));let j=Pe(Ne(S/.22));return G.selectedPose=.28+.02*j,G.plane.opacity=1-.4*j,G}return ie.id==="reset"&&(J(G,1),G.referenceAxes.opacity=1-Y,G.torsoAxes.opacity=.42*(1-Y),G.plane.opacity=.6*(1-Y),G.pairFocus=null,G.focus=.32*(1-Y),G.camera=Wt(E,w,Y),G.referencePose=.5*Y,G.selectedPose=.3+.7*Y,G.sectors=[]),G}function ge(ae){let ie=Q(ae);return Ni(ie,W,.4),ie.segment==="reset"&&(ie.referencePose=0),ie.camera=ci(ie.camera,r.y),ie}return oi({segments:W,duration:z,frames:{reference:r,torso:y},values:_,sample:ge},t)}function ep(i,e,t){let n=i.y,r=i.x,s=be(Ct(e,n)),o=be(Ut(s,n));function a(c,l){let u=c==="tilt";return{direction:gt(u?s:r,u?o:n,t[c]*l),values:{turn:u?t.turn:l===0?0:t.turn*l,tilt:u?l===0?0:t.tilt*l:0},sector:{from:u?s:r,normal:u?o:n,angle:t[c]*l,axis:u?"z":"y"}}}return{up:n,base:r,horizontal:s,tiltAxis:o,sample:a}}function Do(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=e.lateral(t.subtype.startsWith("hip")?"hip":"shoulder"),o={from:e.source(s.from),to:e.source(s.to),joints:s.joints},a=oe(ue(o.from,o.to),.5),c=be(st(o.to,o.from)),l=Math.hypot(...st(o.to,o.from))*.65,u=Object.fromEntries(i.items.map(k=>[k.key,k.computed])),h=ep(r,c,u),{base:p,up:f,horizontal:g}=h,x={...r,origin:a,length:l},m={...x,x:c,y:f,z:be(Ut(c,f))},d=kn(r),v=yt(ue(ue(r.z,oe(p,.55)),oe(f,.45)),f),y=Vn(v,o,f,{maxAlignment:.5,targetAlignment:.4}),_=tr(c,f,f,ue(r.z,oe(p,.5))),w=yt(ue(oe(f,Math.cos(Math.PI/30)),oe(r.z,Math.sin(Math.PI/30))),f),E=(k,O,te)=>Hn(k,O,te,f,r.z),A=zi(r,d),T=(k,O=1600,te=500)=>({id:k,title:k.replaceAll("-"," "),duration:O+te,motionDuration:O}),b=[...Bn(),T("reference-focus",1100),...A.segments,T("selected-focus",1300),T("measurement-camera",1800),T("reference-align",1800),T("plane",1400),T("reference-trim",1100),...["focus","grow","release","align"].map(k=>({...T("lateral-"+k,k==="grow"?1600:1100),pairPhase:k})),T("projection-camera",1500),T("projection-angle",700,2300),T("projection",1800),T("original-fade",1100),T("turn-camera",1500),T("turn",3400),T("tilt-camera",1600),T("tilt-ready",1100),T("tilt",3400),{id:"finish",title:"Review "+(t.subtype.startsWith("hip")?"hip":"shoulder")+" turn and tilt",duration:6e3,completion:!0},T("reset",1200)],M=En(b,t),C=k=>b.findIndex(O=>O.id===k),F=(k,O)=>b.indexOf(k)>=C(O),H=k=>({from:a,to:ue(a,oe(k,l))});function q(k,O=1){let te=Ft(x,O);return te.x=H(k),te.y=null,te.z=null,te}function X(k){return q(k)}let I=[o.from,o.to,...[-1,1].flatMap(k=>[-1,1].map(O=>ue(a,ue(oe(p,l*k),oe(r.z,l*O))))),ue(a,oe(c,l))];function ee(k,O){let te=Vf("x","y",O);k.referenceAxes.x.color=te,k.valueColors={tilt:te}}function W(k,O,te){let U=h.sample(O,te);k.referenceAxes=X(U.direction),k.torsoAxes=q(O==="turn"?g:c,.42),O==="tilt"&&ee(k,1),k.values=U.values,k.active=O,k.sectors=[{...U.sector,origin:a,radius:l*.8}],Oi(k,te)}function z(k){let O=b.find(Ae=>k<Ae.end)??b.at(-1),te=k-O.start,U=Ne(te/Math.max(1e-9,O.duration)),J=Pe(Ne(te/Math.max(1e-9,O.motionDuration??O.duration))),Q={segment:O.id,title:O.title,progress:U,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{turn:0,tilt:0},active:null,focus:0,focusOrigin:a,camera:Wt(d,d,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(Q,O,J,u))return Q;if(O.id==="reference-focus")return Q.referencePose=.5-.22*J,Q.selectedPose=1-J,Q;if(A.sample(Q,O,J))return Q;if(Q.referencePose=0,Q.selectedPose=.28,Q.referenceAxes=Ft(r),O.id==="selected-focus")return Q.referencePose=.28*(1-J),Q.selectedPose=.28*J,Q;let ge=O.id==="reference-align"?J:F(O,"reference-align")?1:0,ae={...r,origin:zt(r.origin,a,ge),length:r.length*(1-ge)+l*ge};Q.referenceAxes=Ft(ae);let ie=[...I,ae.origin,...["x","y","z"].map(Ae=>ue(ae.origin,oe(ae[Ae],ae.length)))];if(Q.pairFocus={points:ie,amount:O.id==="measurement-camera"?J:1},Q.camera=E(d,y,O.id==="measurement-camera"?J:1),O.id==="measurement-camera")return Q;if(Q.torsoAxes=F(O,"lateral-focus")?q(c,.65):null,F(O,"plane")&&(Q.plane={origin:a,u:p,v:r.z,size:l*(O.id==="plane"?J:1),opacity:1}),O.id==="reference-trim"&&(Q.referenceAxes.y.opacity=1-J,Q.referenceAxes.z.opacity=1-J),F(O,"lateral-focus")&&(Q.referenceAxes.y=null,Q.referenceAxes.z=null),O.pairPhase)return Q.torsoAxes.x=Ui(o,H(c),O.pairPhase,J),Q.jointHighlights=[{pose:"selected",joints:o.joints,strength:Di(O.pairPhase,J)}],Q;if(!F(O,"projection-camera"))return Q;if(Q.referenceAxes=X(p),Q.camera=E(y,_,O.id==="projection-camera"?J:1),O.id==="projection-angle"&&(Q.torsoAxes.angleMarker=Sr(c,f,{origin:a,radius:l*.38,opacity:J})),F(O,"projection")){let Ae=O.id==="projection"?"project":"fade",de=Yr(c,f,Ae,O.id==="original-fade"||Ae==="project"?J:1);Q.torsoAxes=q(de.direction,O.id==="original-fade"?.65-.23*J:F(O,"original-fade")?.42:.65),de.originalOpacity>0&&(Q.originalTorsoAxes=q(c,.65*de.originalOpacity)),Q.torsoAxes.projectionSweep=$r(c,de.direction,f,{origin:a,radius:l*.5,opacity:de.originalOpacity}),O.id==="projection"&&(Q.torsoAxes.angleMarker=Sr(de.direction,f,{origin:a,radius:l*.38}))}if(F(O,"turn-camera")&&(Q.torsoAxes=q(g,.42)),O.id==="turn-camera")return Q.camera=E(_,w,J),Q;if(O.id==="turn")return W(Q,"turn",J),Q.camera=E(w,w,1),Q;if(O.id==="tilt-camera"||O.id==="tilt-ready"){W(Q,"tilt",0),Q.sectors=[];let Ae=O.id==="tilt-camera"?J:1;return ee(Q,Ae),Q.torsoAxes.opacity=.42*Ae,Q.camera=E(w,_,Ae),Q}if(O.id==="tilt")return W(Q,"tilt",J),Q.camera=E(_,_,1),Q;if(O.id==="finish"){let Ae=mn(U,O.duration);if(W(Q,"tilt",1),Q.camera=E(_,_,1),Ae.holding)return Q;let de=Ae.progress;if(de<.22){let G=Pe(de/.22);Q.referenceAxes.opacity=1-G,Q.values={turn:0,tilt:0},Q.sectors=[],Q.camera=E(_,v,G),Q.pairFocus={points:ie,amount:1-G},Q.focus=.32*G}else Q.pairFocus=null,Q.focus=.32,Q.camera=E(v,v,1),de<.38?(W(Q,"turn",0),Q.referenceAxes.opacity=Mi(de,O.duration,.38),Q.sectors=[]):de<.64?W(Q,"turn",Pe(Ne((de-.44)/.2))):(W(Q,"tilt",Pe(Ne((de-.71)/.2))),ee(Q,Pe(Ne((de-.64)/.07))));let Y=Pe(Ne(de/.22));return Q.selectedPose=.28+.02*Y,Q.plane.opacity=1-.4*Y,Q}return O.id==="reset"&&(W(Q,"tilt",1),Q.referenceAxes.opacity=1-J,Q.torsoAxes.opacity=.42*(1-J),Q.plane.opacity=.6*(1-J),Q.sectors=[],Q.pairFocus=null,Q.focus=.32*(1-J),Q.camera=E(v,d,J),Q.referencePose=.5*J,Q.selectedPose=.3+.7*J),Q}function V(k){let O=z(k);return Ni(O,b,.38,[{at:.64,ready:.71}]),O.segment==="reset"&&(O.referencePose=0),O.camera=ci(O.camera,f),O}return oi({segments:b,duration:M,frames:{reference:r,torso:m},values:u,sample:V},t)}function tp(i,e,t){let n=Ct(i,e),r=be(n),s=be(Ut(r,e));return{projected:n,baseline:r,axis:s,value:t,sample:o=>({direction:gt(r,s,t*o),angle:o===0?0:t*o})}}function hc(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=e.spine(),o={from:e.source(s.from),to:e.source(s.to),joints:s.joints},a=o.from,c=be(st(o.to,o.from)),l=Math.hypot(...st(o.to,o.from)),u=r.y,h=Math.min(r.length,l*.4),p={...r,origin:a,length:l},f={...p,y:c},g=Object.fromEntries(i.items.map(z=>[z.key,z.computed])),x=kn(r),m=ue(ue(r.z,oe(r.x,.55)),oe(u,.35)),d=yt(m,u),v=Vn(d,o,u,{maxAlignment:.7,targetAlignment:.6}),y=(z,V,k)=>Hn(z,V,k,u,r.z),_=zi(r,x),w={bend:{normal:r.z,axis:"z",u:r.x,v:u},tilt:{normal:r.x,axis:"x",u,v:r.z}};for(let[z,V]of Object.entries(w))V.measure=tp(c,V.normal,g[z]),V.view=Zf(tr(c,V.normal,u,m),c,V.normal,u);let E=(z,V=1600,k=500,O={})=>({id:z,title:z.replaceAll("-"," "),duration:V+k,motionDuration:V,...O}),A=z=>[E(z+"-camera",1500),E(z+"-reference-fade",1200,900),E(z+"-ready",700),E(z,3200)],T=[...Bn(),E("reference-focus",1100),..._.segments,E("selected-focus",1300),E("measurement-camera",1800),E("reference-align",1800),E("reference-trim",1100),E("bend-plane",1400),...["focus","grow","release","align"].map(z=>E("spine-"+z,z==="grow"?1600:1100,500,{pairPhase:z})),...A("bend"),E("plane-switch",1400),E("tilt-plane",1400),...A("tilt"),{id:"finish",title:"Review spine bend and tilt",duration:6e3,completion:!0},E("reset",1200)],b=En(T,t),M=z=>T.findIndex(V=>V.id===z),C=(z,V)=>T.indexOf(z)>=M(V),F=z=>({from:a,to:ue(a,oe(z,l))});function H(z,V=1){let k=Ft(p,V);return k.x=F(z),k.y=null,k.z=null,k}function q(z,V=1,k=1){let O=w[z];return{origin:a,u:O.u,v:O.v,size:l*V,opacity:k,axis:O.axis}}let X=[o.from,o.to,...[-1,1].flatMap(z=>[-1,1].flatMap(V=>["bend","tilt"].map(k=>ue(a,ue(oe(w[k].u,l*z),oe(w[k].v,l*V))))))];function I(z,V,k){let O=w[V].measure.sample(k);z.referenceAxes=H(O.direction,1),z.referenceAxes.x.colorAxis=w[V].axis,z.torsoAxes=H(c,.42),z.values={bend:V==="bend"?O.angle:g.bend,tilt:V==="tilt"?O.angle:0},z.active=V,z.sectors=[{origin:a,from:w[V].measure.baseline,normal:w[V].measure.axis,angle:O.angle,radius:l*.8,axis:w[V].axis}],Oi(z,k)}function ee(z){let V=T.find(de=>z<de.end)??T.at(-1),k=z-V.start,O=Ne(k/Math.max(1e-9,V.duration)),te=Pe(Ne(k/Math.max(1e-9,V.motionDuration??V.duration))),U={segment:V.id,title:V.title,progress:O,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{bend:0,tilt:0},active:null,focus:0,focusOrigin:a,camera:Wt(x,x,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(U,V,te,g))return U;if(V.id==="reference-focus")return U.referencePose=.5-.22*te,U.selectedPose=1-te,U;if(_.sample(U,V,te))return U;if(U.referencePose=0,U.selectedPose=.28,U.referenceAxes=Ft(r),V.id==="selected-focus")return U.referencePose=.28*(1-te),U.selectedPose=.28*te,U;let J=V.id==="reference-align"?te:C(V,"reference-align")?1:0,Q={...r,origin:zt(r.origin,a,J),length:r.length*(1-J)+h*J};U.referenceAxes=Ft(Q,C(V,"bend-plane")?.3:1);let ge=[...X,Q.origin,...["x","y","z"].map(de=>ue(Q.origin,oe(Q[de],Q.length)))];if(U.pairFocus={points:ge,amount:V.id==="measurement-camera"?te:1},U.camera=y(x,v,V.id==="measurement-camera"?te:1),V.id==="measurement-camera")return U;if(C(V,"bend-plane")&&(U.plane=q("bend",V.id==="bend-plane"?te:1)),V.id==="reference-trim"&&(U.referenceAxes=Ft({...p,length:h},1-.7*te)),C(V,"spine-focus")&&(U.referenceAxes.x=null,U.referenceAxes.y=null,U.referenceAxes.z=null),V.pairPhase)return U.torsoAxes=H(c,.65),U.torsoAxes.x=Ui(o,F(c),V.pairPhase,te),U.jointHighlights=[{pose:"selected",joints:o.joints,strength:Di(V.pairPhase,te)}],U;if(!C(V,"bend-camera"))return U;let ae=C(V,"tilt-plane")?"tilt":"bend",ie=w[ae];U.plane=q(ae,V.id==="tilt-plane"?te:1),U.referenceAxes=H(u,1),U.referenceAxes.x=null,U.torsoAxes=H(c,.42),ae==="tilt"&&(U.values.bend=g.bend);let Ae=ae==="bend"?v:w.bend.view;if(U.camera=y(Ae,ie.view,V.id===ae+"-camera"?te:C(V,ae+"-camera")?1:0),V.id==="plane-switch")return I(U,"bend",1),U.referenceAxes.opacity=1-te,U.plane=q("bend",1,1-te),U.camera=y(w.bend.view,w.bend.view,1),U.sectors=[],U;if(V.id==="tilt-plane")return U.referenceAxes=H(u,1),U.referenceAxes.x=null,U.camera=y(w.bend.view,w.bend.view,1),U;if(V.id===ae+"-reference-fade"||V.id===ae+"-ready")return I(U,ae,0),U.referenceAxes.x.opacity=V.id===ae+"-reference-fade"?te:1,U.sectors=[],U;if(V.id===ae)return I(U,ae,te),U;if(V.id==="finish"){I(U,"tilt",1),U.camera=y(w.tilt.view,w.tilt.view,1);let de=mn(O,V.duration);if(de.holding)return U;let Y=de.progress;if(U.plane=q("tilt",1,.6),Y<.22){let G=Pe(Y/.22);U.referenceAxes.opacity=1-G,U.values={bend:0,tilt:0},U.sectors=[],U.camera=y(w.tilt.view,d,G),U.pairFocus={points:ge,amount:1-G},U.focus=.32*G,U.plane.opacity=1-.4*G}else if(U.pairFocus=null,U.focus=.32,U.camera=y(d,d,1),Y<.38)I(U,"bend",0),U.referenceAxes.opacity=Mi(Y,V.duration,.38),U.sectors=[],U.plane=q("bend",1,.6);else{let We=Ne((Y-.38)/.62),Ie=.04+.36,ot=Ie+.07,Be=ot+.08,P=Be+.05;if(We<ot){I(U,"bend",Pe(Ne((We-.04)/.36)));let S=1-Pe(Ne((We-Ie)/.07));U.plane=q("bend",1,.6*S),U.referenceAxes.opacity=S,U.sectors.forEach(j=>{j.opacity=S})}else if(We<Be)I(U,"bend",1),U.plane=null,U.referenceAxes.opacity=0,U.sectors=[];else{I(U,"tilt",Pe(Ne((We-P)/.36)));let S=Pe(Ne((We-Be)/.05));U.plane=q("tilt",1,.6*S),U.referenceAxes.opacity=S}}return U.selectedPose=.28+.02*Pe(Ne(Y/.22)),U}return V.id==="reset"&&(I(U,"tilt",1),U.referenceAxes.opacity=1-te,U.torsoAxes.opacity=.42*(1-te),U.plane=q("tilt",1,.6*(1-te)),U.sectors=[],U.pairFocus=null,U.focus=.32*(1-te),U.camera=y(d,x,te),U.referencePose=.5*te,U.selectedPose=.3+.7*te),U}function W(z){let V=ee(z);if(Ni(V,T,.38),V.segment!=="end-stay"&&M(V.segment)>=M("spine-focus")){let k=V.segment==="reset"?1-Pe(Ne((z-T.find(O=>O.id==="reset").start)/(T.find(O=>O.id==="reset").motionDuration??T.find(O=>O.id==="reset").duration))):1;V.originalReferenceAxes=Ft({...p,length:h},.3*k)}return V.segment==="reset"&&(V.referencePose=0),V.camera=ci(V.camera,u),V}return oi({segments:T,duration:b,frames:{reference:r,torso:f},values:g,targetAxisColors:{x:"y"},sample:W},t)}function np(i,e,t,n){let r=be(Ct(e,i.y)),s=be(Ct(t,e)),o=gt(i.x,i.y,n.azimuth),a=gt(i.z,i.y,n.azimuth),c=gt(i.y,o,n.polar),l=gt(a,o,n.polar),u={x:s,y:e,z:be(Ut(s,e))};function h(f,g){let x=f==="azimuth"?n.azimuth*g:n.azimuth,m=f==="azimuth"?0:f==="polar"?n.polar*g:n.polar,d=f==="spin"?n.spin*g:0,v=gt(i.x,i.y,x),y=gt(i.z,i.y,x),_=gt(i.y,v,m),w=gt(y,v,m);return{frame:{x:gt(v,_,d),y:_,z:gt(w,_,d)},values:{azimuth:g===0&&f==="azimuth"?0:x,polar:g===0&&f==="polar"?0:m,spin:g===0&&f==="spin"?0:d}}}return{target:u,horizontal:r,turnedX:o,tiltedY:c,tiltedZ:l,sample:h,sectors:(f,g)=>f==="azimuth"?[{from:i.z,normal:i.y,angle:g,axis:"y"}]:f==="polar"?[{from:i.y,normal:o,angle:g,axis:"x"}]:[1,-1].map(x=>({from:oe(o,x),normal:e,angle:g,axis:"y"}))}}function dc(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=de=>({from:e.source(de.from),to:e.source(de.to),joints:de.joints}),o={spine:s(e.spine()),shoulder:s(e.lateral("shoulder"))},a=o.spine.from,c=Math.hypot(...st(o.spine.to,a)),l=be(st(o.spine.to,a)),u=be(st(o.shoulder.to,o.shoulder.from)),h=Math.hypot(...st(o.shoulder.to,o.shoulder.from))/2,p=Object.fromEntries(i.items.map(de=>[de.key,de.computed])),f=np(r,l,u,p),g={...r,origin:a,length:c},x={...g,...f.target},m=r.y,d=kn(r),v=ue(ue(r.z,oe(r.x,.55)),oe(m,.35)),y=yt(v,m),_=Vn(y,o.spine,m,{maxAlignment:.7,targetAlignment:.6}),w=Vn(_,o.shoulder,m,{maxAlignment:.5,targetAlignment:.4}),E=tr(u,l,m,v),A=yt(nh(Wt(E,E,1),l).direction,m),T=yt(ue(oe(m,Math.cos(Math.PI/30)),oe(r.z,Math.sin(Math.PI/30))),m),b=ac(yt(f.turnedX,m),m),M=ac(yt(ue(l,oe(r.z,.12)),m),m,6,65),C={azimuth:T,polar:b,spin:M},F=(de,Y,G)=>Hn(de,Y,G,m,r.z),H=zi(r,d),q=(de,Y=1600,G=500,B={})=>({id:de,title:de.replaceAll("-"," "),duration:Y+G,motionDuration:Y,...B}),X=de=>["focus","grow","release","align"].map(Y=>q(de+"-"+Y,Y==="grow"?1600:1100,500,{pair:de,pairPhase:Y})),I=[...Bn(),q("reference-focus",1100),...H.segments,q("selected-focus",1300),q("measurement-camera",1800),q("reference-align",2200),...X("spine"),q("shoulder-camera",1500),...X("shoulder"),q("crossbar-plane",1300),q("crossbar-camera",1500),q("crossbar-angle",700,1700),q("crossbar-project",1800),q("crossbar-original-fade",1100),q("reference-t",1500,1e3),...["azimuth","polar","spin"].flatMap(de=>[q(de+"-camera",1600),...de==="azimuth"?[q("azimuth-plane",1300)]:[],q(de+"-ready",650,900),q(de,3400),...de==="azimuth"?[q("forward-fade",1100)]:[]]),{id:"finish",title:"Review the T orientation",duration:8e3,completion:!0},q("reset",1200)],ee=En(I,t),W=de=>I.findIndex(Y=>Y.id===de),z=(de,Y)=>I.indexOf(de)>=W(Y),V=(de=1)=>{let Y=Ft(g,de);return Y.x=Y.y=Y.z=null,Y},k=de=>ue(a,oe(de.y,c));function O(de,Y=1){let G=k(de),B=V(Y);return B.frame={...g,...de},B.y={from:a,to:G,shape:"bar",stopAt:"x"},B.x={from:ue(G,oe(de.x,-h)),to:ue(G,oe(de.x,h)),shape:"bar"},B}function te(de,Y=1){let G=O(de,Y);return G.y.keepVisible=!0,G.z={from:a,to:ue(a,oe(de.z,c*.5)),opacity:.4},G}let U=de=>O(f.target,de),J=(de,Y=1,G=1)=>de==="azimuth"?{origin:a,u:r.x,v:r.z,size:c*.7*G,opacity:Y,axis:"y"}:de==="polar"?{origin:a,u:m,v:f.horizontal,size:c*.7*G,opacity:Y,axis:"x"}:{origin:o.spine.to,u:f.turnedX,v:f.tiltedZ,size:h*1.6*G,opacity:Y,axis:"y"},ge=[...Object.values(o).flatMap(de=>[de.from,de.to]),ue(a,oe(m,c)),...[-1,1].flatMap(de=>[-1,1].map(Y=>ue(a,ue(oe(r.x,c*.7*de),oe(r.z,c*.7*Y)))))];function ae(de,Y,G){let B=f.sample(Y,G);de.referenceAxes=Y==="azimuth"?te(B.frame):O(B.frame),de.referenceAxes.y.keepVisible=!0,de.torsoAxes=U(.42),de.values=B.values,de.active=Y,de.plane=J(Y),de.sectors=f.sectors(Y,p[Y]*G).map(Se=>({...Se,origin:Y==="spin"?o.spine.to:a,radius:Y==="spin"?h*.9:c*.65})),Oi(de,G)}function ie(de){let Y=I.find(S=>de<S.end)??I.at(-1),G=de-Y.start,B=Ne(G/Math.max(1e-9,Y.duration)),Se=Pe(Ne(G/Math.max(1e-9,Y.motionDuration??Y.duration))),ne={segment:Y.id,title:Y.title,progress:B,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{azimuth:0,polar:0,spin:0},active:null,focus:0,focusOrigin:a,camera:Wt(d,d,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(ne,Y,Se,p))return ne;if(Y.id==="reference-focus")return ne.referencePose=.5-.22*Se,ne.selectedPose=1-Se,ne;if(H.sample(ne,Y,Se))return ne;if(ne.referencePose=0,ne.selectedPose=.28,ne.referenceAxes=Ft(r),Y.id==="selected-focus")return ne.referencePose=.28*(1-Se),ne.selectedPose=.28*Se,ne;let We=Y.id==="reference-align"?Se:z(Y,"reference-align")?1:0,Ie={...r,origin:zt(r.origin,a,We),length:r.length*(1-We)+c*We},ot=te(r);if(ne.referenceAxes=te(r),Y.id==="reference-align"){let S=Ft(r);for(let j of["x","y","z"])ne.referenceAxes[j]={...ot[j],from:zt(S[j].from,ot[j].from,Se),to:zt(S[j].to,ot[j].to,Se)},j==="z"&&(ne.referenceAxes.z.opacity=1-.6*Se),j!=="z"&&(delete ne.referenceAxes[j].shape,ne.referenceAxes[j].shapeBlend=Se)}else z(Y,"reference-align")||(ne.referenceAxes=Ft(r));let Be=[...ge,Ie.origin,...["x","y","z"].map(S=>ue(Ie.origin,oe(Ie[S],Ie.length)))];if(ne.pairFocus={points:Be,amount:Y.id==="measurement-camera"?Se:1},ne.camera=F(d,_,Y.id==="measurement-camera"?Se:1),Y.id==="measurement-camera"||!z(Y,"spine-focus"))return ne;if(ne.referenceAxes=te(r),ne.torsoAxes=V(.65),ne.torsoAxes.y={from:a,to:o.spine.to,shape:"bar",stopAt:"x"},z(Y,"shoulder-camera")&&(ne.camera=F(_,w,Y.id==="shoulder-camera"?Se:1)),z(Y,"shoulder-focus")&&(ne.torsoAxes.x={from:ue(o.spine.to,oe(u,-h)),to:ue(o.spine.to,oe(u,h)),shape:"bar"}),Y.pair){let S=o[Y.pair],j=Y.pair==="spine"?{from:a,to:o.spine.to}:{from:ue(o.spine.to,oe(u,-h)),to:ue(o.spine.to,oe(u,h))},ce=Ui(S,j,Y.pairPhase,Se);return Y.pairPhase==="align"&&(ce.shapeBlend=Se),ne.torsoAxes[Y.pair==="spine"?"y":"x"]=ce,ne.jointHighlights=[{pose:"selected",joints:S.joints,strength:Di(Y.pairPhase,Se)}],ne}if(!z(Y,"crossbar-plane"))return ne;if(ne.plane=J("spin",1,Y.id==="crossbar-plane"?Se:1),z(Y,"crossbar-camera")&&(ne.camera=F(w,A,Y.id==="crossbar-camera"?Se:1)),Y.id==="crossbar-angle"&&(ne.torsoAxes.angleMarker=Sr(u,l,{origin:o.spine.to,radius:h*.65,opacity:Se})),z(Y,"crossbar-project")){let S=Yr(u,l,Y.id==="crossbar-project"?"project":"fade",Y.id==="crossbar-original-fade"||Y.id==="crossbar-project"?Se:1),j=o.spine.to;ne.torsoAxes.x={from:ue(j,oe(S.direction,-h)),to:ue(j,oe(S.direction,h)),shape:"bar"},S.originalOpacity>0&&(ne.originalTorsoAxes=V(.65*S.originalOpacity),ne.originalTorsoAxes.x={from:ue(j,oe(u,-h)),to:ue(j,oe(u,h)),shape:"bar"}),ne.torsoAxes.projectionSweep=$r(u,S.direction,l,{origin:j,radius:h*.8,opacity:S.originalOpacity}),Y.id==="crossbar-project"&&(ne.torsoAxes.angleMarker=Sr(S.direction,l,{origin:j,radius:h*.65}))}if(z(Y,"reference-t")&&(ne.referenceAxes=te(r),ne.torsoAxes=U(.42),ne.plane=J("spin")),Y.id==="forward-fade")return ae(ne,"azimuth",1),ne.referenceAxes.z.opacity=.4*(1-Se),ne.camera=F(T,T,1),ne;if(Y.id==="azimuth-plane")return ae(ne,"azimuth",0),ne.sectors=[],ne.plane=J("azimuth",1,Se),ne.camera=F(T,T,1),ne;let P=["azimuth","polar","spin"];for(let S of P){if(!z(Y,S+"-camera"))continue;let j=S==="azimuth"?A:C[P[P.indexOf(S)-1]];if(ne.camera=F(j,C[S],Y.id===S+"-camera"?Se:1),Y.id===S+"-camera"||Y.id===S+"-ready")return ae(ne,S,0),ne.sectors=[],S==="azimuth"&&Y.id==="azimuth-camera"?ne.plane=Se<1?J("spin",1,1-Se):null:S==="polar"&&(ne.plane=J(S,Y.id===S+"-camera"?Se:1)),ne;if(Y.id===S)return ae(ne,S,Se),ne}if(Y.id==="finish"){ae(ne,"spin",1),ne.camera=F(M,M,1);let S=mn(B,Y.duration);if(S.holding)return ne;let j=S.progress;if(j<.22){let ce=Pe(j/.22);ne.referenceAxes.opacity=1-ce,ne.values={azimuth:0,polar:0,spin:0},ne.sectors=[],ne.camera=F(M,y,ce),ne.pairFocus={points:Be,amount:1-ce},ne.focus=.28*ce}else if(ne.pairFocus=null,ne.focus=.28,ne.camera=F(y,y,1),j<.34)ae(ne,"azimuth",0),ne.referenceAxes.opacity=Mi(j,Y.duration,.34),ne.sectors=[];else{let ce=(j-.34)/.57*3,le=Math.min(2,Math.floor(ce)),pe=Pe(Ne((ce-le-.22)/.78));ae(ne,P[le],pe),le===1&&ce-le<.22&&(ne.referenceAxes.z={from:a,to:ue(a,oe(f.sample("azimuth",1).frame.z,c*.5)),opacity:.4*(1-Pe((ce-le)/.22))})}return ne.selectedPose=.28+.02*Pe(Ne(j/.22)),ne}return Y.id==="reset"&&(ae(ne,"spin",1),ne.referenceAxes.opacity=1-Se,ne.torsoAxes.opacity=.42*(1-Se),ne.plane.opacity=1-Se,ne.sectors=[],ne.pairFocus=null,ne.focus=.28*(1-Se),ne.camera=F(y,d,Se),ne.selectedPose=.3+.7*Se),ne}function Ae(de){let Y=ie(de),G=W(Y.segment);if(Ni(Y,I,.34),G>=W("crossbar-plane")&&G<=W("azimuth-camera")){let B=nh(Y.camera,l),Se=Y.segment==="crossbar-plane"?Pe(Ne((de-I[G].start)/I[G].motionDuration)):1;Y.camera={...Y.camera,direction:be(zt(Y.camera.direction,B.direction,Se))}}return Y.camera=ci(Y.camera,m),Y}return oi({segments:I,duration:ee,frames:{reference:r,torso:x},values:p,sample:Ae},t)}function ip(i,e,t,n,r=1){let s=e[t],o=ue(s.from,oe(st(s.to,s.from),n)),a=[],c=e.map((u,h)=>oe(st(u.to,u.from),h<t?1:h===t?n:0)),l=new Set;return e.forEach((u,h)=>{if(h>t||Ot(c[h])<1e-10)return;let p=[0,1,2].filter(g=>g!==h),f=en[u.axis];for(let g=0;g<4;g++){let x=i;p.forEach((y,_)=>{g&1<<_&&(x=ue(x,c[y]))});let m=ue(x,c[h]),d=JSON.stringify([x,m].map(y=>y.map(_=>Math.round(_*1e9)/1e9)));if(l.has(d))continue;l.add(d);let v=g===0;a.push({id:v?"axis-measure-"+u.key:"axis-connector-"+u.key+"-"+g,kind:v?"arrow":"line",from:x,to:m,color:f,width:v?h===t?4.5:3.4:1.7,dashed:!v,opacity:h===t?r:1})}}),a.push({id:"measurement-cursor",kind:"point",from:o,color:Os(t?en[e[t-1].axis]:"#8b9198",en[s.axis],r),radius:3.5,opacity:1}),a}function fc(i){let e=i.context,t=nc(e),n=zn(e.data,e.meta,e.entry.frame).reference,r=kn(n),s=n.y,o=yt(ue(ue(n.z,oe(n.x,.7)),oe(s,.4)),s),a=o;for(let X of[t.referenceHips,t.selectedHips,...t.components])Ot(st(X.to,X.from))>1e-9&&(a=Vn(a,X,s,{maxAlignment:.85,targetAlignment:.75}));let c=zi(n,r),l=(X,I,ee)=>Hn(X,I,ee,s,n.z),u=Object.fromEntries(t.components.map(X=>[X.key,X.value])),h=t.components.map(X=>X.key),p=(X,I=1500,ee=500,W={})=>({id:X,title:X.replaceAll("-"," "),duration:I+ee,motionDuration:I,...W}),f=[...Bn(),p("reference-focus",1100),...c.segments,p("reference-root",2200),p("scale-camera",1600),p("scale-highlight",1300),p("scale-duplicate",1400),p("scale-align",2400),p("scale-mean",2200),p("unit-align",1800),p("unit-axes",1700),p("unit-fade",1e3),p("unit-ready",700),p("selected-focus",1400),p("root-camera",2e3),p("root-markers",1e3),p("displacement",1800),...h.flatMap(X=>[p(X+"-ready",600,800),p(X,2200,800)]),{id:"finish",title:"Review hip displacement",duration:8e3,completion:!0},p("reset",1200)],g=En(f,e.entry),x=X=>f.findIndex(I=>I.id===X),m=(X,I)=>f.indexOf(X)>=x(I),d=[...e.reference,...e.pose].map(e.source),v=th(t.components.flatMap(X=>[X.from,X.to])),y=ue(t.referenceRoot,ue(oe(n.x,t.scale*2.1),oe(s,t.scale*.7))),_=ue(y,oe(s,-t.scale*.63)),w=ue(_,oe(n.x,t.scale)),E=ue(t.referenceRoot,oe(n.x,t.scale)),A=th([...d,y,ue(y,oe(n.x,t.scale*Math.max(...t.bones.map(X=>X.length)))),ue(y,oe(s,-t.scale*1.5))]);function T(X=n.length,I=1,ee=1){let W=Ft({...n,origin:t.referenceRoot,length:X},I);W.widthScale=ee;for(let z of["x","y","z"])W[z].keepVisible=!0;return W}let b=(X,I,ee,W,z={})=>({id:X,from:I,to:ee,color:W,...z});function M(X,I=1){X.guides.push(b("reference-root",t.referenceRoot,null,"#8b9198",{kind:"point",radius:5,opacity:I}),b("selected-root",t.selectedRoot,null,"#168568",{kind:"point",radius:5,opacity:I}))}function C(X,I,ee){let W=m(I,"scale-mean")?1:I.id==="scale-align"?ee:0,z=I.id==="scale-mean"?ee:m(I,"unit-align")?1:0,V=I.id==="scale-highlight"?ee:I.id==="scale-duplicate"?1:I.id==="scale-align"?1-ee:0;if(X.boneHighlights=t.bones.map(k=>{let O=k.joints.includes("left_shoulder")&&k.joints.includes("right_shoulder")?"clavicle":k.joints.includes("left_hip")&&k.joints.includes("right_hip")?"root":null;return{pose:"reference",pairs:O?k.joints.map(te=>[O,te]):[k.joints],strength:V}}),m(I,"scale-duplicate")&&!m(I,"unit-align")&&t.bones.forEach((k,O)=>{let te=ue(y,oe(s,-O*t.scale*.14)),U=ue(te,oe(n.x,k.length*t.scale));X.boneGuides.push({id:"scale-"+O,from:zt(zt(k.from,te,W),_,z),to:zt(zt(k.to,U,W),w,z),opacity:(I.id==="scale-duplicate"?ee:1)*(1-z),jointTrim:1-W})}),z>0||m(I,"unit-align")){let k=I.id==="unit-align"?ee:m(I,"unit-axes")?1:0,O=I.id==="unit-fade"?1-ee:m(I,"unit-ready")?0:z,te=zt(_,t.referenceRoot,k),U=zt(w,E,k);X.boneGuides.push({id:"unit-bone",from:te,to:U,opacity:O}),X.guides.push(b("unit-label",U,null,"#657168",{kind:"point",radius:0,label:"1 unit",opacity:O}))}}function F(X,I,ee,W=1,z=0){let V=h.indexOf(I);X.active=I,X.values={sway:0,thrust:0,lift:0};let k=t.components[V],O=zt(k.from,k.to,ee);X.guides.push(b("displacement",O,t.selectedRoot,"#8b9198",{kind:"line",width:1.7,dashed:!0})),t.components.forEach((J,Q)=>{let ge=Q<V?1:Q===V?ee:0;X.values[J.key]=J.value*ge});let te=ip(t.referenceRoot,t.components,V,ee,W),U=te.find(J=>J.id==="measurement-cursor");z>0&&(U.color=Os(en.y,"#168568",z)),X.guides.push(...te)}function H(X){let I=f.find(k=>X<k.end)??f.at(-1),ee=Pe(Ne((X-I.start)/Math.max(1e-9,I.motionDuration??I.duration))),W=Ne((X-I.start)/Math.max(1e-9,I.duration)),z={segment:I.id,title:I.title,progress:W,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{sway:0,thrust:0,lift:0},active:null,focus:0,focusOrigin:t.referenceRoot,camera:l(r,r,1),guides:[],boneGuides:[],boneHighlights:[],sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(z,I,ee,u))return z;if(I.id==="reference-focus")return z.referencePose=.5-.22*ee,z.selectedPose=1-ee,z;if(c.sample(z,I,ee))return z;if(z.referencePose=.28,z.selectedPose=0,z.referenceAxes=T(),I.id==="reference-root")return z.referenceAxes=Ft({...n,origin:zt(n.origin,t.referenceRoot,ee)}),z;if(z.camera=l(r,o,I.id==="scale-camera"?ee:1),z.pairFocus={points:A,amount:I.id==="scale-camera"?ee:1},I.id==="scale-camera")return z;if(!m(I,"selected-focus")){C(z,I,ee);let k=I.id==="unit-axes"?ee:m(I,"unit-fade")?1:0;return z.referenceAxes=T(n.length+(t.scale-n.length)*k),z}if(z.referenceAxes=T(t.scale),z.selectedPose=I.id==="selected-focus"?.35*ee:.35,I.id==="selected-focus")return z;let V=I.id==="root-camera"?ee:1;if(z.camera=l(o,a,V),z.pairFocus={points:A.map((k,O)=>zt(k,v[O],V)),amount:1},z.referencePose=.28-.18*V,z.selectedPose=.35-.23*V,z.referenceAxes=T(t.scale,1-.75*V,1-.4*V),I.id==="root-camera"||(M(z,I.id==="root-markers"?ee:1),I.id==="root-markers"))return z;if(I.id==="displacement")return z.guides.push(b("displacement",t.referenceRoot,zt(t.referenceRoot,t.selectedRoot,ee),"#8b9198",{kind:"line",width:1.7,dashed:!0})),z;for(let k of h)if(I.id===k+"-ready"||I.id===k){let O=I.id===k?1:ee,te=k==="lift"&&I.id===k?Pe(Ne((X-I.start-I.motionDuration)/(I.duration-I.motionDuration))):0;return F(z,k,I.id===k?ee:0,O,te),z}if(F(z,"lift",1,1,1),I.id==="finish"){let k=mn(W,I.duration);if(k.holding)return z;let O=k.progress;if(z.camera=l(a,a,1),z.pairFocus={points:v,amount:1},z.guides=z.guides.filter(te=>!h.includes(te.id)&&!te.id.startsWith("axis-measure-")&&!te.id.startsWith("axis-connector-")&&te.id!=="measurement-cursor"&&te.id!=="displacement"),O<.22)z.values={sway:0,thrust:0,lift:0},z.guides=z.guides.map(te=>te.id==="displacement"?{...te,opacity:.25*(1-O/.22)}:te);else{let te=(O-.22)/.78*3,U=Math.min(2,Math.floor(te)),J=Pe(Ne((te-U-.24)/.76)),Q=te-U,ge=Pe(Ne(Q/.18));F(z,h[U],J,ge,U===2?Pe(Ne((Q-.9)/.1)):0)}}return I.id==="reset"&&(z.guides=z.guides.map(k=>({...k,opacity:(k.opacity??1)*(1-ee)})),z.referenceAxes.opacity*=1-ee,z.pairFocus={points:v,amount:1-ee},z.camera=l(a,r,ee),z.referencePose=.1*(1-ee),z.selectedPose=.12+.88*ee),z}function q(X){let I=H(X);return I.camera=ci(I.camera,s),I}return oi({segments:f,duration:g,values:u,geometry:t,frames:{reference:n,torso:{...n,origin:t.referenceRoot}},sample:q},e.entry)}var rp={torso_turn_bend_tilt:Io,torso_turn_bend_tilt_by_shoulder:Io,hip_turn_on_spine_plane:Lo,shoulder_turn_on_spine_plane:Lo,shoulder_turn_tilt:Do,hip_turn_tilt:Do,spine_bend_tilt:hc,spine_azimuth_polar_spin:dc,hip_sway_thrust_lift:fc};function sp(i,e,t){let n=new Map;return{sample(r,s){if(!s.length)return[];let o=n.get(r);if(!o){let a=Ns(i,e,{type:t.type,subtype:t.subtype,frame:r}),c=rp[t.subtype];if(!c)throw new Error("Unsupported video metric");o=c(a),n.set(r,o),n.size>24&&n.delete(n.keys().next().value)}return s.map(a=>{let c=o.segments.find(u=>u.id===a);if(!c)throw new Error("Unknown measurement");let l=o.sample(c.start+(c.motionDuration??c.duration));if(t.subtype==="hip_sway_thrust_lift"){let u=o.segments.find(h=>h.id==="lift");l=o.sample(u.start+(u.motionDuration??u.duration)),l={...l,active:a,guides:l.guides.filter(h=>h.id==="axis-measure-"+a||h.id==="reference-root"||h.id==="selected-root")}}["torso_turn_bend_tilt","torso_turn_bend_tilt_by_shoulder"].includes(t.subtype)&&(l.originalReferenceAxes=o.sample(c.start).referenceAxes);for(let[u,h]of Object.entries(o.targetAxisColors??{}))l.torsoAxes?.[u]&&(l.torsoAxes[u].colorAxis=h);return{key:a,state:l}})}}}function Uo(i,e,t,n,r){let s=e.clone().sub(i),o=s.length();if(o<1e-7)return null;let a=w=>-w.clone().applyMatrix4(t.matrixWorldInverse).z,c=a(i),l=a(e),u=l-c,h=t.near*1.0001,p=t.far*.9999,f=0,g=1;if(Math.abs(u)<1e-12){if(c<h||c>p)return null}else{let w=(h-c)/u,E=(p-c)/u;if(f=Math.max(0,Math.min(w,E)),g=Math.min(1,Math.max(w,E)),f>=g)return null}let x=i.clone().lerp(e,f).project(t),m=i.clone().lerp(e,g).project(t),d=t.getWorldDirection(new D),v=s.multiplyScalar(1/o).dot(d),y=Math.acos(Math.min(1,Math.abs(v)))*180/Math.PI,_=Pe(Ne((18-y)/12));return{x:(x.x+1)*n/2,y:(1-x.y)*r/2,tx:(m.x+1)*n/2,ty:(1-m.y)*r/2,markerOpacity:_,arrowOpacity:1-_,toward:v<0}}function pc(i,e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"g");n.classList.add("explain-end-on-marker");let r=document.createElementNS(t,"circle"),s=document.createElementNS(t,"path"),o=document.createElementNS(t,"title");return r.setAttribute("r","3.5"),r.setAttribute("fill",e),s.setAttribute("fill","none"),s.setAttribute("stroke",e),s.setAttribute("stroke-width","2.5"),s.setAttribute("stroke-linecap","round"),n.append(o,r,s),i.append(n),{setColor(a){r.setAttribute("fill",a),s.setAttribute("stroke",a)},update(a,c=11,l=3.5){if(n.style.display=a&&a.markerOpacity>0?"":"none",!a)return;n.style.opacity=a.markerOpacity,n.setAttribute("transform",`translate(${a.tx} ${a.ty})`),n.dataset.direction=a.toward?"toward":"away",r.setAttribute("r",l);let u=c*.4;s.setAttribute("d",`M${-u} ${-u} L${u} ${u} M${-u} ${u} L${u} ${-u}`),r.style.display=a.toward?"":"none",s.style.display=a.toward?"none":"",o.textContent=a.toward?"Arrow points toward you":"Arrow points away from you"}}}function op(i,e,t,n,r,s=r){let o=Math.hypot(e.x-i.x,e.y-i.y),a=Math.hypot(n.x-t.x,n.y-t.y);if(o<1e-7||a<1e-7)return null;let c=(e.x-i.x)/o,l=(e.y-i.y)/o,u=Math.min(r/2,o/2),h=-(n.y-t.y)/a,p=(n.x-t.x)/a;(i.x-t.x)*h+(i.y-t.y)*p<0&&(h=-h,p=-p);let f=d=>(d.x-t.x)*h+(d.y-t.y)*p-s/2,g=(d,v)=>({x:i.x+c*d-l*v,y:i.y+l*d+c*v}),x=[g(o,-u),g(o,u)];for(let d=0;d<=24;d++){let v=Math.PI/2+d*Math.PI/24;x.push(g(u+u*Math.cos(v),u*Math.sin(v)))}let m=[];for(let d=0;d<x.length;d++){let v=x[d],y=x[(d+1)%x.length],_=f(v),w=f(y);if(_>=0&&m.push(v),_>=0!=w>=0){let E=_/(_-w);m.push({x:v.x+(y.x-v.x)*E,y:v.y+(y.y-v.y)*E})}}return m.length>=3?m.map((d,v)=>`${v?"L":"M"}${d.x} ${d.y}`).join(" ")+" Z":null}function ap(i,e,t,n,r=1){let s=e.x-i.x,o=e.y-i.y,a=Math.hypot(s,o);if(a<1e-7)return null;let c=((t.x-i.x)*s+(t.y-i.y)*o)/a,l=Math.abs((t.x-i.x)*o-(t.y-i.y)*s)/a;if(c<0||c>a||l>n)return null;let u=Math.min(1,a/(n*9))*(1-r)+r,h=n*u,p=h*3*(1-r),f=h*(1.35*(1-r)+.5*r);return p>0&&c>a-p?2*f*(a-c)/p:h}function mc(i,e,t,n,r){let s=Math.hypot(t-i,n-e);if(s<1e-7)return null;let o=(t-i)/s,a=(n-e)/s,c=Math.min(r/2,s/2),l=(u,h)=>`${i+o*u-a*h} ${e+a*u+o*h}`;return`M${l(c,-c)} L${l(s-c,-c)} A${c} ${c} 0 0 1 ${l(s-c,c)} L${l(c,c)} A${c} ${c} 0 0 1 ${l(c,-c)} Z`}function Fo(i,e,t,n,r,s=0){let o=t-i,a=n-e,c=Math.hypot(o,a);if(c<1e-7||c<4&&s<1)return null;let l=o/c,u=a/c,h=Math.max(0,Math.min(1,s)),p=Math.min(1,c/(r*9))*(1-h)+h,f=r*p,g=f*3*(1-h),x=f*(1.35*(1-h)+.5*h),m=(d,v)=>`${i+l*d-u*v} ${e+u*d+l*v}`;return`M${m(0,-f/2)} L${m(c-g,-f/2)} L${m(c-g,-x)} L${m(c,0)} L${m(c-g,x)} L${m(c-g,f/2)} L${m(0,f/2)} Z`}function cp(i){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.classList.add("explain-flat-axes"),t.setAttribute("aria-hidden","true"),i.parentElement.append(t);let n=[];return{add(r,s=2.4){let o=document.createElementNS(e,"path");o.setAttribute("fill",r),o.setAttribute("stroke","none"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("paint-order","stroke"),t.append(o);let a=pc(t,r),c={visible:!0,from:null,to:null,path:o,marker:a,width:s,setEndpoints(l,u){this.from=l.clone(),this.to=u.clone()}};return n.push(c),c},updateView(r,s,o){t.setAttribute("viewBox",`0 0 ${s} ${o}`),t.style.width=s+"px",t.style.height=o+"px";for(let a of n){let c=a.visible&&a.from&&a.to?Uo(a.from,a.to,r,s,o):null,l=c?Fo(c.x,c.y,c.tx,c.ty,a.width):null;a.path.style.display=l?"":"none",l&&a.path.setAttribute("d",l),a.path.style.opacity=c?.arrowOpacity??0,a.marker.update(c)}},clear(){n=[],t.replaceChildren()},dispose(){t.remove()}}}function nr(i,e,t,n,r={}){let s="http://www.w3.org/2000/svg",o=document.createElementNS(s,"svg");o.classList.add("explain-flat-axes"),o.setAttribute("aria-hidden","true"),n.parentElement.append(o);let a,c=qr(i,e),l=qr(i,e),u=wr(i,e),h=document.createElementNS(s,"text");h.setAttribute("fill",rc),h.setAttribute("font-size","11"),h.setAttribute("font-family","system-ui"),h.setAttribute("stroke","#f4f7f0"),h.setAttribute("stroke-width","3"),h.setAttribute("paint-order","stroke"),o.append(h);let p=Object.fromEntries(Object.entries(en).map(([d,v])=>{let y=en[r[d]]??v,_=document.createElementNS(s,"g"),w=document.createElementNS(s,"path"),E=document.createElementNS(s,"text");w.setAttribute("stroke","none"),w.setAttribute("fill",y),w.setAttribute("stroke-linejoin","round"),w.setAttribute("paint-order","stroke"),E.setAttribute("fill",y),E.setAttribute("font-size","14"),E.setAttribute("font-weight","600"),E.textContent=d.toUpperCase(),_.append(w);let A=pc(_,y);return _.append(E),o.append(_),[d,{group:_,line:w,marker:A,label:E}]})),f=new Mt;f.setAttribute("position",new rt(new Float32Array(12),3)),f.setIndex([0,1,2,0,2,3]);let g=new it(f,new $t({color:en.z,transparent:!0,opacity:.13,depthWrite:!1,side:Vt}));g.renderOrder=17,i.add(g);function x(d){a=d;for(let[v,{line:y,marker:_,label:w}]of Object.entries(p)){let E=a?.[v]?.color??en[a?.[v]?.colorAxis??r[v]??v];y.setAttribute("fill",E),w.setAttribute("fill",E),_.setColor(E)}if(u.update(a?.componentPlane),c.update(a?.angleMarker),l.update(a?.projectionSweep),g.visible=!!a&&a.plane>0&&a.planeOpacity>0,g.visible){let{origin:v,x:y,y:_,length:w}=a.frame,E=w*a.plane;[v,ue(v,oe(y,E)),ue(ue(v,oe(y,E)),oe(_,E)),ue(v,oe(_,E))].forEach((T,b)=>{let M=e(T);f.attributes.position.setXYZ(b,M.x,M.y,M.z)}),f.attributes.position.needsUpdate=!0,f.computeBoundingSphere(),g.material.opacity=.17*a.planeOpacity*a.opacity}}function m(d,v,y){if(o.style.width=v+"px",o.style.height=y+"px",o.setAttribute("viewBox",`0 0 ${v} ${y}`),o.style.opacity=a?.opacity??0,o.style.zIndex="3",h.style.display=a?.angleMarker?"":"none",h.style.opacity=a?.angleMarker?.opacity??1,a?.angleMarker){let _=a.angleMarker,w=e(ue(_.origin,oe(ue(_.from,_.to??a.frame.x),_.radius*.7))).project(d);h.setAttribute("x",(w.x+1)*v/2+4),h.setAttribute("y",(1-w.y)*y/2-4),h.textContent=(Math.abs(_.angle-90)<.05?"90":_.angle.toFixed(1))+"\xB0"}for(let[_,{group:w,line:E,marker:A,label:T}]of Object.entries(p)){let b=t*(a?.widthScale??1),M=a?.[_];if(w.style.display=M?"":"none",!M)continue;w.style.opacity=M.opacity??1;let C=Uo(e(M.from),e(M.to),d,v,y);if(!C){w.style.display="none";continue}let{x:F,y:H,tx:q,ty:X,arrowOpacity:I,markerOpacity:ee}=C,W=M.shape==="bar"?1:M.shapeBlend??0,z=W===1,V,k=M.stopAt&&a[M.stopAt];if(z&&k){let U=Uo(e(k.from),e(k.to),d,v,y);if(U){let J={x:U.x,y:U.y},Q={x:U.tx,y:U.ty},ge=ap(J,Q,{x:q,y:X},b,k.shape==="bar"?1:k.shapeBlend??0);ge!==null&&(V=op({x:F,y:H},{x:q,y:X},J,Q,b,ge))}}let O=V!==void 0?V:W===1?mc(F,H,q,X,b):Fo(F,H,q,X,b,W),te=M.color??en[M.colorAxis??r[_]??_];E.setAttribute("fill",te),E.setAttribute("stroke","none"),O&&E.setAttribute("d",O),E.style.display=O?"":"none",E.style.opacity=z||M.keepVisible?1:I,A.update(z||M.keepVisible?null:C,b>=4?15:10),T.style.display=ee>0&&!z&&!M.keepVisible?"":"none",T.style.opacity=ee,T.setAttribute("x",q+20),T.setAttribute("y",X-15)}}return{update:x,updateView:m,dispose(){u.dispose(),c.dispose(),l.dispose(),o.remove(),f.dispose(),g.material.dispose(),i.remove(g)}}}function gc(i,e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.classList.add("explain-flat-axes"),n.setAttribute("aria-hidden","true"),e.parentElement.append(n);let r=new Map,s=[];function o(a){if(r.has(a))return r.get(a);let c=document.createElementNS(t,"g"),l=document.createElementNS(t,"path"),u=document.createElementNS(t,"circle"),h=document.createElementNS(t,"text");h.setAttribute("font-size","11"),h.setAttribute("font-family","system-ui"),h.setAttribute("paint-order","stroke"),h.setAttribute("stroke","#f4f7f0"),h.setAttribute("stroke-width","3"),c.append(l,u,h),n.append(c);let p={group:c,path:l,point:u,label:h};return r.set(a,p),p}return{update(a=[]){s=a},updateView(a,c,l){n.setAttribute("viewBox",`0 0 ${c} ${l}`),n.style.width=c+"px",n.style.height=l+"px";for(let{group:h}of r.values())h.style.display="none";let u=h=>{let p=i(h).project(a);return p.z>=-1&&p.z<=1?{x:(p.x+1)*c/2,y:(1-p.y)*l/2}:null};for(let h of s){let p=u(h.from);if(!p)continue;let f=h.to?u(h.to):p;if(!f)continue;let{group:g,path:x,point:m,label:d}=o(h.id),v=h.width??2.7,y=h.color??"#507867";g.style.display="",g.style.opacity=h.opacity??1,m.style.display=h.kind==="point"?"":"none",x.style.display=h.kind==="point"?"none":"",m.setAttribute("cx",p.x),m.setAttribute("cy",p.y),m.setAttribute("r",h.radius??4),m.setAttribute("fill",y),x.setAttribute("fill",h.kind==="line"||h.kind==="ruler"?"none":y),x.setAttribute("stroke",h.kind==="line"||h.kind==="ruler"?y:"none"),x.setAttribute("stroke-width",v),x.setAttribute("stroke-linecap","round"),x.setAttribute("stroke-dasharray",h.dashed?"5 4":"none");let _=h.kind==="bar"?mc(p.x,p.y,f.x,f.y,v):Fo(p.x,p.y,f.x,f.y,v,h.shapeBlend??0);if((h.kind==="line"||h.kind==="ruler")&&(_=`M${p.x} ${p.y} L${f.x} ${f.y}`,h.kind==="ruler")){let w=Math.hypot(f.x-p.x,f.y-p.y);if(w>1e-7){let E=-(f.y-p.y)/w*5,A=(f.x-p.x)/w*5;_+=` M${p.x-E} ${p.y-A} L${p.x+E} ${p.y+A} M${f.x-E} ${f.y-A} L${f.x+E} ${f.y+A}`}}x.style.display=_&&h.kind!=="point"?"":"none",_&&x.setAttribute("d",_),d.style.display=h.label?"":"none",d.textContent=h.label??"",d.setAttribute("x",f.x+8),d.setAttribute("y",f.y-8),d.setAttribute("fill",y)}},dispose(){n.remove(),r.clear()}}}function zs({scene:i,toWorld:e,canvas:t,data:n,metrics:r,setPoses:s,requestRender:o=()=>{},axisWidthScale:a=1,prepareState:c=l=>l}){let l,u=[],h=0,p,f,g=new Map,x=new Map,m=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,d=(b,M)=>b&&{...b,opacity:(b.opacity??1)*M},v=(b,M)=>b&&{...d(b,M),planeOpacity:b.planeOpacity??0,componentPlane:d(b.componentPlane,M),angleMarker:d(b.angleMarker,M),projectionSweep:d(b.projectionSweep,M)};function y(){if(!f)return;let b=m()?1:Math.min(1,(performance.now()-f.start)/280),M=b*b*(3-2*b);for(let[C,F]of f.from)x.set(C,F+((u.includes(C)?1:0)-F)*M);b===1&&(f=void 0)}function _(){y(),A(),o(),p=f?requestAnimationFrame(_):void 0}let w=()=>{for(let b of g.values())b.dispose();g.clear()};function E(b){if(g.has(b))return g.get(b);let M=nr(i,e,2.7*a,t),C=nr(i,e,2.7*a,t),F=nr(i,e,4.5*a,t),H=wr(i,e),q=sc(i,e),X=gc(e,t),I={update(ee){M.update(ee.originalReferenceAxes),C.update(ee.referenceAxes),F.update(ee.torsoAxes),H.update(ee.plane),q.update(ee.sectors),X.update(ee.guides)},updateView(ee,W,z){M.updateView(ee,W,z),C.updateView(ee,W,z),F.updateView(ee,W,z),X.updateView(ee,W,z)},dispose(){M.dispose(),C.dispose(),F.dispose(),H.dispose(),q.dispose(),X.dispose()}};return g.set(b,I),I}function A(){T();let b=[...x].filter(([,M])=>M>0);if(!l||!b.length){s(0,1);return}try{for(let{key:M,state:C}of jf(l.sample(h,b.map(([F])=>F)),F=>x.get(F))){let F=c(C),H=x.get(M);E(M).update({...F,originalReferenceAxes:v(F.originalReferenceAxes,H),referenceAxes:v(F.referenceAxes,H),torsoAxes:v(F.torsoAxes,H),plane:d(F.plane,H),sectors:F.sectors?.map(q=>d(q,H)),guides:F.guides?.map(q=>d(q,H))})}s(0,1-.65*Math.max(...b.map(([,M])=>M)))}catch(M){w(),s(0,1),console.warn("Measurement overlay unavailable for frame",h,M)}}function T(){for(let[b,M]of g)!u.includes(b)&&!(x.get(b)>0)&&(M.dispose(),g.delete(b))}return{setMetric(b,M){cancelAnimationFrame(p),f=void 0,x.clear(),M.forEach(C=>x.set(C,1)),w(),l=sp(n,r,b),u=[...M],A()},setSelection(b){y(),u=[...b],u.forEach(M=>{x.has(M)||x.set(M,0)}),f={start:performance.now(),from:new Map(x)},cancelAnimationFrame(p),_()},setFrame(b){h=b,A()},updateView(b,M,C){for(let F of g.values())F.updateView(b,M,C)},dispose(){cancelAnimationFrame(p),w(),s(0,1)}}}function Yv(i){let e=i.joints.indexOf("left_shoulder"),t=i.joints.indexOf("right_shoulder"),n=i.reconstruction.flatMap(r=>{let s=r[e],o=r[t];if(![s,o].every(c=>Array.isArray(c)&&c.length===3&&c.every(Number.isFinite)))return[];let a=Math.hypot(...s.map((c,l)=>c-o[l]));return a>0?[a]:[]});if(!n.length)throw new Error("Missing shoulder width for rotation radius");return n.reduce((r,s)=>r+s,0)/n.length*1.95}function $v(i,e,t){let{color:n,shape:r}=t,s=c=>c?.map((l,u)=>l*(u===1?t.verticalScale??1:t.horizontalScale??1)),o=c=>c&&{...c,u:s(c.u),v:s(c.v),size:e,color:n,shape:r,opacity:1,fillOpacity:.12},a=c=>{if(!c)return c;let{x:l,y:u,z:h,angleMarker:p,projectionSweep:f,...g}=c;return{...g,opacity:1,componentPlane:o(c.componentPlane)}};return{...i,referenceAxes:a(i.referenceAxes),torsoAxes:a(i.torsoAxes),originalReferenceAxes:a(i.originalReferenceAxes),plane:t.planeKeys.includes(i.active)?o(i.plane):null,guides:[],sectors:i.sectors?.map(c=>({...c,radius:e*(t.verticalScale??1),color:n,opacity:1,fillOpacity:.38,outline:!0}))}}function lp(i){let e=i.feature??"geometric-rotations",t=js[e];if(!t)throw new Error(`Unknown measurement feature: ${e}`);let n="http://www.w3.org/2000/svg",r=document.createElementNS(n,"svg");r.classList.add("rotation-angle-labels"),r.setAttribute("aria-hidden","true"),i.canvas.parentElement.append(r);let s=new Map,o=Yv(i.data),a=t.xfactor?Xf(i.data,i.metrics):null,c=$f({canvas:i.canvas,metrics:i.metrics,frameCount:i.data.reconstruction.length,feature:e,xFactorValues:a?.frames.map(f=>f?.angle??null)}),l=(f,g,x)=>{let m=document.createElementNS(n,"g"),d=document.createElementNS(n,"path"),v=document.createElementNS(n,"circle"),y=document.createElementNS(n,"rect"),_=document.createElementNS(n,"text"),w=document.createElementNS(n,"text"),E=document.createElementNS(n,"text");d.setAttribute("fill","none"),d.setAttribute("stroke-linejoin","round"),v.setAttribute("r","2.2"),v.setAttribute("fill",x),d.setAttribute("stroke",x),d.setAttribute("stroke-opacity",".6"),d.setAttribute("stroke-width","1"),y.setAttribute("fill",x),y.setAttribute("fill-opacity",".13"),y.setAttribute("stroke",x),y.setAttribute("stroke-width",".7"),y.setAttribute("rx","4"),y.setAttribute("width","154"),y.setAttribute("height","44"),_.setAttribute("fill",x),_.setAttribute("font-size","11"),_.setAttribute("font-family","system-ui"),_.setAttribute("x","7"),_.setAttribute("y","15.5");for(let T of[w,E])T.setAttribute("fill",x),T.setAttribute("font-family","system-ui"),T.setAttribute("x","7");w.setAttribute("font-size","10"),w.setAttribute("y","28"),E.setAttribute("font-size","15"),E.setAttribute("font-weight","600"),E.setAttribute("y","34"),m.append(y,_,w,E),r.append(d,v,m);let A={group:m,line:d,dot:v,box:y,text:_,kind:w,value:E,title:g};return s.set(f,A),A},u=t.combined?[]:t.groups.map(f=>{for(let x of f.keys)l(`${f.id}:${x}`,f.labels[x],f.color);let g=zs({...i,setPoses:()=>{},axisWidthScale:1.4,prepareState:x=>{let m=$v(x,o,f),d=s.get(`${f.id}:${x.active}`);return d&&(d.sector=m.sectors?.[0]),m}});return g.setMetric({type:f.type,subtype:f.subtype},f.keys),g});if(t.combined){for(let f of t.groups)l(`${f.id}:${f.id}`,f.label,f.color);u.push(Of(i,t.groups,s))}let h,p;return a&&(p=l("xfactor","X-factor",bn.xfactor),h=qf(i,a,o),p.sector=h.setFrame(0)),{setFrame(f){u.forEach(g=>g.setFrame(f)),h&&(p.sector=h.setFrame(f)),c.setFrame(f)},updateView(f,g,x){u.forEach(C=>C.updateView(f,g,x)),r.setAttribute("viewBox",`0 0 ${g} ${x}`);let m=[...s.keys()],v=i.canvas.parentElement.querySelector(".snapshot-bottom-strip")?.offsetTop??x,y=8,_=3,w=Math.max(20,Math.min(42,(v-y-6-_*(m.length-1))/m.length)),E=Math.max(8,Math.min(10,w*.27)),A=Math.max(10,Math.min(15,w*.4)),T=document.createElement("canvas").getContext("2d");T.font=`${E}px system-ui`;let b=Math.max(...[...s.values()].map(C=>T.measureText(g<260&&C.title.length>16?C.title.replace("Shoulder","Sh.").replace("Spine","Sp."):C.title).width));T.font=`600 ${A}px system-ui`;let M=Math.ceil(Math.max(b,T.measureText("-180.0\xB0").width)+16);for(let[C,F]of s){let H=F.sector;if(!H&&!F.anchor){F.group.style.display=F.line.style.display=F.dot.style.display="none";continue}let q=H?oe(gt(H.from,H.normal,H.angle*.5),H.radius*.96):[0,0,0],X=i.toWorld(F.anchor??ue(H.origin,q)),I=X.clone().project(f),ee=X.clone().applyMatrix4(f.matrixWorldInverse).z<0&&I.z>=-1&&I.z<=1&&Math.abs(I.x)<1.15&&Math.abs(I.y)<1.15;if(F.group.style.display=F.line.style.display=F.dot.style.display=ee?"":"none",!ee)continue;let W=(I.x+1)*g/2,z=(1-I.y)*x/2,V=Math.max(5,g-M-8),k=y+m.indexOf(C)*(w+_);F.group.setAttribute("transform",`translate(${V},${k})`),F.box.setAttribute("width",M),F.box.setAttribute("height",w),F.text.setAttribute("font-size",E),F.text.setAttribute("y",w*.36),F.value.setAttribute("y",w*.81);let[O,te]=F.title.split(" ");F.text.textContent=g<260&&F.title.length>16?F.title.replace("Shoulder","Sh.").replace("Spine","Sp."):F.title,F.kind.textContent="",F.value.setAttribute("font-size",A),F.value.textContent=H?`${H.angle.toFixed(1)}\xB0`:`${F.measurement.toFixed(3)} units`,V=Math.max(5,g-M-8),F.box.setAttribute("width",M),F.group.setAttribute("transform",`translate(${V},${k})`),F.group.setAttribute("aria-label",`${F.title}: ${F.value.textContent}`),F.line.setAttribute("d",`M ${W} ${z} V ${k+w/2} H ${V}`),F.dot.setAttribute("cx",W),F.dot.setAttribute("cy",z)}},dispose(){u.forEach(f=>f.dispose()),r.remove(),c.dispose(),h?.dispose()}}}var xc=(i,e)=>i.map((t,n)=>t+e[n]),No=(i,e)=>i.map((t,n)=>t-e[n]),Bs=(i,e)=>i.map(t=>t*e),ih=(i,e)=>i.reduce((t,n,r)=>t+n*e[r],0),up=i=>{let e=Math.hypot(...i);if(e<1e-8)throw new Error("Degenerate Hogan plane reference");return Bs(i,1/e)};function hp({head:i,leftAnkle:e,rightAnkle:t,shoulder:n,hip:r,trajectory:s,margin:o=.08}){let a=up([t[0]-e[0],0,t[2]-e[2]]),c=[n,r],l=c.map(v=>{let y=No(v,i),_=up(No(y,Bs(a,ih(y,a))));if(_[1]<=0)throw new Error("Hogan plane must rise above the club head");return _}),u=[i,...c,...s],h=u.map(v=>ih(No(v,i),a)),p=Math.min(...h)-o,f=Math.max(...h)+o,g=Math.max(f-p,...l.map(v=>Math.max(...u.map(y=>ih(No(y,i),v)))+o)),x=(p+f-g)/2,m=xc(i,Bs(a,x)),d=xc(m,Bs(a,g));return l.map((v,y)=>({name:y?"Hip plane":"Shoulder plane",side:g,along:a,rise:v,corners:[m,d,xc(d,Bs(v,g)),xc(m,Bs(v,g))]}))}function dp(i,e,t){let n=i.flatMap(r=>{let s=r[e],o=r[t];if(![s,o].every(c=>Array.isArray(c)&&c.length===3&&c.every(Number.isFinite)))return[];let a=Math.hypot(...No(s,o));return a>0?[a]:[]});if(!n.length)throw new Error("No valid club shaft lengths");return n.reduce((r,s)=>r+s,0)/n.length}var jv="http://www.w3.org/2000/svg",ks=(i,e={})=>{let t=document.createElementNS(jv,i);for(let[n,r]of Object.entries(e))t.setAttribute(n,String(r));return t};function Zv(i,e,t){let n=Math.hypot(e.x-i.x,e.y-i.y);if(n<=2*t)return null;let r=t/n;return{start:r,end:1-r}}function Jv(i,e,t){return i*e/(t*(1-i)+i*e)}function fp(i,{names:e,edges:t}){let n=ks("svg",{"aria-hidden":"true","data-vector-pose":"true"});Object.assign(n.style,{position:"absolute",pointerEvents:"none",overflow:"hidden",zIndex:"1"}),getComputedStyle(i.parentElement).position==="static"&&(i.parentElement.style.position="relative"),i.after(n);let r=new Map,s=new ja,o=new D,a=(u,h,p,f)=>{let g=u.clone().applyMatrix4(h.matrixWorldInverse);if(g.z>=-h.near)return null;let x=u.clone().project(h);return!Number.isFinite(x.x)||!Number.isFinite(x.y)||x.z>1?null:{x:(x.x+1)*p/2,y:(1-x.y)*f/2,depth:-g.z,world:u}};function c(u){let h=r.get(u);if(h)return h;let p=ks("g",{"data-camera":u.view||String(r.size)}),f=ks("path",{fill:"none",stroke:u.overlayColor,"stroke-linecap":"round","vector-effect":"non-scaling-stroke"}),g=e.map(x=>{let m=ks("g",{"data-joint":x}),d=ks("circle",{fill:"none",stroke:u.overlayColor,"vector-effect":"non-scaling-stroke"}),v=ks("circle",{fill:x.startsWith("left_")?"#3b82f6":x.startsWith("right_")?"#ef4444":u.overlayColor});return m.append(d,v),{group:m,ring:d,dot:v}});return p.append(f,...g.map(x=>x.group)),n.append(p),h={group:p,path:f,joints:g},r.set(u,h),h}function l({camera:u,scene:h,overlays:p,frame:f,w:g,h:x}){n.setAttribute("viewBox",`0 0 ${g} ${x}`),n.setAttribute("width",g),n.setAttribute("height",x),n.style.left=`${i.offsetLeft}px`,n.style.top=`${i.offsetTop}px`,n.style.width=`${g}px`,n.style.height=`${x}px`,n.dataset.frame=String(f),h.updateMatrixWorld(!0),u.getWorldPosition(o);let m=[];h.traverseVisible(y=>{let _=Array.isArray(y.material)?y.material:[y.material];y.isMesh&&_.some(w=>w&&w.visible&&w.depthWrite&&!w.transparent)&&m.push(y)});let d=y=>{let _=y.clone().sub(o),w=_.length();return s.ray.set(o,_.multiplyScalar(1/w)),s.near=u.near,s.far=Math.max(0,w-Math.max(1e-4,w*1e-5)),s.intersectObjects(m,!1).length===0},v=[...p].sort((y,_)=>{let w=E=>E.group.localToWorld(new D(0,0,-E.depth)).applyMatrix4(u.matrixWorldInverse).z;return w(y)-w(_)});for(let y of v){let _=c(y);n.append(_.group);let w=y.group.localToWorld(new D(0,0,-y.depth)),E=y.group.localToWorld(new D(y.depth/y.K[0][0],0,-y.depth)),A=y.group.localToWorld(new D(0,y.depth/y.K[1][1],-y.depth)),T=w.clone().project(u),b=E.project(u),M=A.project(u),C=Math.max(1e-4,Math.hypot((b.x-T.x)*g/2,(b.y-T.y)*x/2),Math.hypot((M.x-T.x)*g/2,(M.y-T.y)*x/2)),F=Math.sqrt(C),H=Math.max(10,Math.min(36,16*F)),q=H*.15,X=y.raw.pred[f],I=e.map((W,z)=>{let V=X?.[y.mapping[z]];if(!V||!Number.isFinite(V[0])||!Number.isFinite(V[1])||V.length>2&&V[2]<=0||V[0]===0&&V[1]===0)return null;let k=y.group.localToWorld(new D((V[0]-y.K[0][2])*y.depth/y.K[0][0],-(V[1]-y.K[1][2])*y.depth/y.K[1][1],-y.depth));return a(k,u,g,x)}),ee="";for(let[W,z]of t){let V=I[W],k=I[z];if(!V||!k)continue;let O=Zv(V,k,H*.425);if(!O)continue;let te=Math.hypot(k.x-V.x,k.y-V.y)*(O.end-O.start),U=Math.max(1,Math.ceil(te/6)),J=!1;for(let Q=0;Q<U;Q++){let ge=O.start+(O.end-O.start)*Q/U,ae=O.start+(O.end-O.start)*(Q+1)/U,ie=(ge+ae)/2,Ae=Jv(ie,V.depth,k.depth);if(!d(V.world.clone().lerp(k.world,Ae))){J=!1;continue}let de=G=>V.x+(k.x-V.x)*G,Y=G=>V.y+(k.y-V.y)*G;J||(ee+=`M${de(ge).toFixed(3)},${Y(ge).toFixed(3)}`),ee+=`L${de(ae).toFixed(3)},${Y(ae).toFixed(3)}`,J=!0}}_.path.setAttribute("d",ee),_.path.setAttribute("stroke-width",q),I.forEach((W,z)=>{let V=_.joints[z],k=e[z]!=="golf_club_shaft"&&W&&d(W.world);if(V.group.style.display=k?"":"none",!!k){for(let O of[V.ring,V.dot])O.setAttribute("cx",W.x),O.setAttribute("cy",W.y);V.ring.setAttribute("r",H*.425),V.ring.setAttribute("stroke-width",H*.15),V.dot.setAttribute("r",H*.29)}})}}return{render:l,dispose(){n.remove(),r.clear()}}}function pp(i){let e=new Sn(i);return e.isVideoTexture=!0,e.minFilter=e.magFilter=$n,e.generateMipmaps=!1,e.colorSpace=xn,e.update=()=>{},e.commit=()=>{e.needsUpdate=!0},e}function Kv(i){let e=Math.max(1e-4,i);return Math.max(10,Math.min(36,16*Math.sqrt(e)))/e}function mp(i,{names:e,edges:t,getPose:n,makeCanvas:r=()=>document.createElement("canvas")}){let s=r(),o=s.getContext("2d"),a=r(),c=a.getContext("2d"),l,u=!1,h=1,p=new Cs(s);p.minFilter=p.magFilter=$n,p.generateMipmaps=!1,p.colorSpace=xn;let f=()=>{let g=a.width,x=a.height;if(!u)return;(s.width!==g||s.height!==x)&&(s.width=g,s.height=x),o.clearRect(0,0,g,x),o.drawImage(a,0,0,g,x);let m=n(l),d=Kv(h),v=d*.425,y=d*.15,_=w=>w&&Number.isFinite(w[0])&&Number.isFinite(w[1])&&!(w[0]===0&&w[1]===0)&&(w.length<3||w[2]>0);o.strokeStyle="#ffce69",o.lineWidth=y,o.lineCap="round",o.beginPath();for(let[w,E]of t){let A=m?.[w],T=m?.[E];if(!_(A)||!_(T))continue;let b=T[0]-A[0],M=T[1]-A[1],C=Math.hypot(b,M);C<=2*v||(o.moveTo(A[0]+b*v/C,A[1]+M*v/C),o.lineTo(T[0]-b*v/C,T[1]-M*v/C))}o.stroke(),e.forEach((w,E)=>{let A=m?.[E];w==="golf_club_shaft"||!_(A)||(o.beginPath(),o.arc(A[0],A[1],v,0,Math.PI*2),o.stroke(),o.fillStyle=w.startsWith("left_")?"#3b82f6":w.startsWith("right_")?"#ef4444":"#ffce69",o.beginPath(),o.arc(A[0],A[1],d*.29,0,Math.PI*2),o.fill())}),p.needsUpdate=!0};return p.commit=g=>{let x=i.videoWidth,m=i.videoHeight;!x||!m||((a.width!==x||a.height!==m)&&(a.width=x,a.height=m),c.clearRect(0,0,x,m),c.drawImage(i,0,0,x,m),l=g,u=!0,f())},p.setImageScale=g=>{!Number.isFinite(g)||g<=0||Math.abs(g-h)<1e-5||(h=g,f())},p}function gp(i,e,t){let n=Math.max(0,Math.min(1,t)),r=i.position.clone(),s=i.quaternion.clone(),o=i.fov,a=i.zoom,c=e.position.length(),l=r.length(),u=new D(0,1,0),h=new D,p=_=>new Jt().setFromRotationMatrix(new bt().lookAt(_,h,u)),f=p(e.position).invert().multiply(e.rotation),g=p(r).invert().multiply(s),x=new Jt().setFromUnitVectors(e.position.clone().normalize(),r.clone().normalize()),m=new Jt().slerp(x,n),d=On.lerp(c,l,n);i.position.copy(e.position).normalize().applyQuaternion(m).multiplyScalar(d),i.quaternion.copy(p(i.position)).multiply(f.slerp(g,n));let v=(_,w,E)=>_*Math.tan(On.degToRad(w/2))/E,y=On.lerp(v(c,e.fov,e.zoom),v(l,o,a),n);i.fov=On.lerp(e.fov,o,n),i.zoom=d*Math.tan(On.degToRad(i.fov/2))/y}var xp=[{type:"kinematic",subtype:"shoulder_turn_on_spine_plane",key:"turn"},{type:"kinematic",subtype:"hip_turn_on_spine_plane",key:"turn"}];function yp(i){let e=xp.map(({key:t,...n})=>{let r=zs({...i,setPoses:()=>{},axisWidthScale:1.4,prepareState:s=>{let o=c=>c&&{...c,opacity:1,fillOpacity:.65},a=c=>{if(!c)return c;let{x:l,y:u,z:h,...p}=c;return{...p,opacity:1,componentPlane:o(c.componentPlane)}};return{...s,referenceAxes:a(s.referenceAxes),torsoAxes:a(s.torsoAxes),originalReferenceAxes:a(s.originalReferenceAxes),plane:o(s.plane),sectors:s.sectors?.map(c=>({...c,opacity:1,fillOpacity:.85}))}}});return r.setMetric(n,[t]),r});return{setFrame(t){e.forEach(n=>n.setFrame(t))},updateView(t,n,r){e.forEach(s=>s.updateView(t,n,r))},dispose(){e.forEach(t=>t.dispose())}}}var _p=new WeakMap;function vp(i,e){_p.set(i,e)}function bp(i,{duration:e=200,fadeIncoming:t=!1}={}){let n=i.querySelector(":scope > .viewer-transition-cover");n?.remove();let r=i.getBoundingClientRect().height;if(!r||!i.children.length)return()=>{};let s=document.createElement("div");s.className="viewer-transition-cover";let a=matchMedia("(prefers-reduced-motion: reduce)").matches?0:e;s.style.transitionDuration=`${a}ms`,s.setAttribute("aria-hidden","true"),s.inert=!0;let c=n&&!n.classList.contains("is-finished")?n:i,l=c.getBoundingClientRect(),u=getComputedStyle(c),h=parseFloat(u.borderLeftWidth)||0,p=parseFloat(u.borderTopWidth)||0;for(let d of c.children){let v=d.cloneNode(!0),y=d.getBoundingClientRect();y.width&&y.height&&Object.assign(v.style,{position:"absolute",boxSizing:"border-box",left:`${y.left-l.left-h}px`,top:`${y.top-l.top-p}px`,width:`${y.width}px`,height:`${y.height}px`,margin:"0",right:"auto",bottom:"auto"}),s.append(v)}let f=c.querySelectorAll("canvas"),g=s.querySelectorAll("canvas");f.forEach((d,v)=>{_p.get(d)?.();let y=g[v];y.width=d.width,y.height=d.height,y.getContext("2d")?.drawImage(d,0,0)}),s.querySelectorAll("[id]").forEach(d=>d.removeAttribute("id")),i.style.minHeight=`${r}px`;let x=!1,m=[];return Object.assign(()=>{x&&requestAnimationFrame(()=>requestAnimationFrame(()=>{t&&(m=[...i.children].filter(d=>d!==s&&!d.classList.contains("viewer-transition-cover")&&!d.classList.contains("video-source-decoders")));for(let d of m)d.style.removeProperty("opacity"),d.animate([{opacity:0},{opacity:1}],{duration:a,easing:"ease"});s.classList.add("is-finished"),setTimeout(()=>{s.parentNode===i&&!i.querySelector(".viewer-transition-cover:not(.is-finished)")&&i.style.removeProperty("min-height"),s.remove()},a+20)}))},{mount(){t&&(m=[...i.children].filter(d=>!d.classList.contains("video-source-decoders")),m.forEach(d=>d.style.opacity="0")),i.append(s),x=!0}})}function Mp(i,e=0,t=i.length-1){let n=[1/0,1/0,1/0],r=[-1/0,-1/0,-1/0],s=0;for(let o=e;o<=t;o++)for(let a of i[o]??[])if(!(!Array.isArray(a)||a.length!==3||!a.every(Number.isFinite))){s++;for(let c=0;c<3;c++)n[c]=Math.min(n[c],a[c]),r[c]=Math.max(r[c],a[c])}if(!s)throw new Error("No valid 3D points for rotation center");return n.map((o,a)=>(o+r[a])/2)}function wp(i,e,t){let n=Math.max(e,t);i.shadow.intensity=Math.max(0,Math.min(1,n))}function Sp(i=()=>{},e={request:t=>requestAnimationFrame(t),cancel:t=>cancelAnimationFrame(t),now:()=>performance.now(),reduced:()=>matchMedia("(prefers-reduced-motion: reduce)").matches}){let t=new Jt,n=new Jt,r=0,s=0,o=1,a=!1,c=!1,l,u,h=new D(0,1,0),p=new D(0,0,1),f=()=>1-Math.abs(n.dot(t))>1e-10;function g(){u!==void 0&&e.cancel(u),u=void 0,l=void 0}function x(m){g();let d=n.clone(),v=r,y=s,_=o,w=e.now();l=m?"reset":"resume";function E(A){let T=e.reduced()?1:Math.min(1,(A-w)/750),b=T*T*(3-2*T);n.copy(d).slerp(t,b),m&&(r=v*(1-b),s=y*(1-b),o=Math.exp(Math.log(_)*(1-b))),T===1?(u=void 0,l=void 0):u=e.request(E),i()}u=e.request(E)}return{get rotated(){return f()},get canRotate(){return!a||!c},get returning(){return!!l},get panX(){return r},get panY(){return s},get zoom(){return o},setPlayback(m,d){a=m,c=d,l==="resume"&&(!a||!c)&&g(),a&&c&&f()&&!l&&x(!1)},orient(m,d){return p.copy(m).applyQuaternion(n),h.copy(d).applyQuaternion(n),{direction:p.clone(),up:h.clone()}},orbitPoint(m,d){return m.clone().sub(d).applyQuaternion(n).add(d)},rotate(m,d){if(a&&c)return;g();let v=new Jt().setFromAxisAngle(new D(0,1,0),-m*.008),y=new D().crossVectors(h,p).normalize().applyQuaternion(v),_=new Jt().setFromAxisAngle(y,-d*.008);n.premultiply(v).premultiply(_).normalize(),i()},pan(m,d){r+=m,s+=d,i()},zoomBy(m){let d=o*m;Number.isFinite(d)&&d>0&&(r*=m,s*=m,o=d,i())},reset(){x(!0)},dispose:g}}function Ep(i){let e=document.createElement("div");e.className="explain-playback-feedback",e.setAttribute("aria-hidden","true");let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg"),r=document.createElementNS(t,"path");n.setAttribute("viewBox","0 0 32 32"),n.append(r),e.append(n),i.parentElement.append(e);let s;return{show(o){s?.cancel(),e.dataset.action=o?"play":"pause",r.setAttribute("d",o?"M11 7 L25 16 L11 25 Z":"M9 8 H14 V24 H9 Z M18 8 H23 V24 H18 Z");let a=matchMedia("(prefers-reduced-motion: reduce)").matches,c=l=>`translate(-50%,-50%) scale(${a?1:l})`;s=e.animate([{opacity:.95,transform:c(.85)},{opacity:.95,transform:c(1),offset:.2},{opacity:0,transform:c(1.4)}],{duration:a?250:650,easing:"ease-out"})},dispose(){s?.cancel(),e.remove()}}}function Ap(i,e,t=()=>{},n=()=>{},r=()=>!0){let s=new Map,o=!1,a=!1,c=()=>{let[d,v]=[...s.values()];return Math.hypot(d.x-v.x,d.y-v.y)},l=d=>{d.pointerType==="mouse"&&d.button!==0&&d.button!==2||(s.size||(o=!1,a=!1),s.set(d.pointerId,{x:d.clientX,y:d.clientY,startX:d.clientX,startY:d.clientY,button:d.button}),s.size>1&&(o=!0,a=!0),i.setPointerCapture(d.pointerId))},u=d=>{let v=s.get(d.pointerId);if(!v)return;let y=s.size===2?c():0;Math.hypot(d.clientX-v.startX,d.clientY-v.startY)>5&&(o=!0,a=!0);let _=d.clientX-v.x,w=d.clientY-v.y;v.x=d.clientX,v.y=d.clientY,o&&(s.size===2||v.button===2?t(_/(s.size===2?2:1),w/(s.size===2?2:1)):r()&&n(_,w)),s.size===2&&y>0&&e(c()/y)},h=d=>{o&&(a=!0),s.delete(d.pointerId)},m=[["contextmenu",d=>d.preventDefault()],["pointerdown",l],["pointermove",u],["pointerup",h],["pointercancel",d=>{a=!0,s.delete(d.pointerId)}],["lostpointercapture",h],["click",d=>{a&&(d.preventDefault(),d.stopImmediatePropagation())},!0],["wheel",d=>{d.preventDefault(),e(Math.exp(-d.deltaY*(d.ctrlKey?.01:.001)))},{passive:!1}]];return m.forEach(([d,v,y])=>i.addEventListener(d,v,y)),()=>m.forEach(([d,v,y])=>i.removeEventListener(d,v,y))}function yc(i,e,{feedback:t=Ep(i)}={}){let n=a=>{i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",a?"Pause explanation":"Play explanation"),i.setAttribute("aria-pressed",String(a)),i.dataset.playing=String(a)},r=()=>{e.setPlaying(!e.playing),t.show(e.playing)},s=a=>{(a.button===0||a.button===void 0)&&r()},o=a=>{(a.key===" "||a.key==="Enter")&&!a.repeat&&(a.preventDefault(),r())};return i.addEventListener("click",s),i.addEventListener("keydown",o),n(e.playing),{update:n,dispose(){i.removeEventListener("click",s),i.removeEventListener("keydown",o),t.dispose()}}}function Tp(i,e){let t=Math.sqrt(e*e-i*i),n=new D(0,1,0);function r(l){let u=l.clone();return u.side=Vt,u.forceSinglePass=!1,u}function s(l){return new it(new _i(1,1,1,24,1,!0),r(l))}function o(l,u,h){let p=h.clone().sub(u),f=p.length(),g=f-2*t;l.visible=g>1e-7,l.visible&&(l.position.copy(u).add(h).multiplyScalar(.5),l.quaternion.setFromUnitVectors(n,p.multiplyScalar(1/f)),l.scale.set(i,g,i))}function a(l){return new it(new si(e,24,16),r(l))}function c(l,u){l.position.copy(u)}return{bone:s,joint:a,placeBone:o,placeJoint:c,cut:t}}function Rp(i,e,t,n,r,s=1,o){let a=i.points.map(e),c=new D;a.forEach(h=>c.add(h)),c.multiplyScalar(1/a.length);let l=Math.max(.035,...a.map(h=>h.distanceTo(c))),u=(o?Oo(a,c,o.direction,o.up,o.verticalHalfFov,o.aspect,.78):l/(Math.sin(t)*.62))*(i.distanceScale??1);return{zoom:1+(s-1)*(1-i.amount),target:r.clone().lerp(c,i.amount),distance:n+((o?u:Math.min(n,u))-n)*i.amount}}function Oo(i,e,t,n,r,s,o=.84){let a=t.clone().normalize(),c=new D().crossVectors(n,a).normalize();c.lengthSq()<1e-12&&c.crossVectors(new D(0,0,1),a).normalize();let l=new D().crossVectors(a,c).normalize(),u=Math.tan(r)*o,h=u*s,p=.1;for(let f of i){let g=f.x-e.x,x=f.y-e.y,m=f.z-e.z,d=g*a.x+x*a.y+m*a.z;p=Math.max(p,d+Math.abs(g*c.x+x*c.y+m*c.z)/h,d+Math.abs(g*l.x+x*l.y+m*l.z)/u)}return p+.035}function Cp(i,e,t,n=e.sample(t)){let r=e.segments.find(l=>l.id==="intro"),s=e.segments.find(l=>l.id==="finish");if(t>=r.start&&t<s.start)return{restricted:!0,pivot:null};if(n.segment!=="finish"||i.type==="position")return{restricted:!1,pivot:null};let o=mn(n.progress,s.duration),a=i.transition===void 0&&(o.holding||o.progress<.22),c=i.subtype==="spine_azimuth_polar_spin"?n.torsoAxes?.y?.to:n.sectors?.[0]?.origin??n.torsoAxes?.frame?.origin??n.referenceAxes?.frame?.origin;return{restricted:a,pivot:c??null}}function It(i,e,t){let n=document.createElement(i);return e!==void 0&&(n.textContent=e),t&&(n.className=t),n}function Pp(i,e){let t=It("button",void 0,"explain-reset-view");t.type="button",t.setAttribute("aria-label","Reset view"),t.title="Reset view";let n="http://www.w3.org/2000/svg",r=document.createElementNS(n,"svg"),s=document.createElementNS(n,"path");return r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("aria-hidden","true"),s.setAttribute("d","M4 10a8 8 0 1 1 1 7M4 4v6h6"),r.append(s),t.append(r),t.onclick=o=>{o.stopPropagation(),e.reset()},i.parentElement.append(t),{dispose(){t.remove()}}}function Ip(i){let e=o=>i.segments.find(a=>a.id===o),t=e("result-preview"),n=e("intro"),r=e("finish"),s=e("end-stay");return[t&&{key:"start",label:"Start",start:t.start,end:t.end},n&&{key:"explain",label:"Explain",start:n.start,end:r?.start??i.duration},r&&{key:"review",label:"Review",start:r.start,end:s?.start??i.duration},s&&{key:"end",label:"End",start:s.start,end:s.end}].filter(o=>o&&o.end>o.start)}function Lp(i,e,t){let n=It("div",void 0,"explain-stage-timeline"),r=It("nav",void 0,"explain-stage-tags");r.setAttribute("aria-label","Explanation stages");let s=Ip(i),o=s.map(a=>{let c=It("button",a.label,"explain-stage-tag");return c.type="button",c.style.flexGrow=a.end-a.start,c.setAttribute("aria-label",`Jump to ${a.label.toLowerCase()} stage`),c.title=`${a.label} \xB7 ${(a.start/1e3).toFixed(1)}s`,c.onclick=()=>t(a.start),r.append(c),c});return n.append(e,r),{root:n,update(a){let c=s.findIndex(l=>a>=l.start&&a<l.end);o.forEach((l,u)=>{u===c?l.setAttribute("aria-current","step"):l.removeAttribute("aria-current")})}}}var Qv={"result-preview":"Preview the selected pose and its final measurements.",intro:"Bring in the reference pose to establish the comparison.","reference-focus":"Isolate the reference pose to build the fixed directions.","selected-focus":"Bring in the selected pose to measure its change.","measurement-camera":"Move closer so the measurement geometry is easier to see.","reference-root":"Move the reference axes to the reference hip center, the displacement origin.","scale-camera":"Frame the reference bones so their lengths can be compared.","scale-highlight":"Make the ten reference bones solid to show the lengths used for normalization.","scale-duplicate":"Copy the bone lengths so they can be compared together.","scale-align":"Line up the copied bones to compare their lengths.","scale-mean":"Average the bone lengths to define one normalized unit.","unit-align":"Move the unit bone beside the reference axis to compare lengths.","unit-axes":"Resize each reference axis to one normalized unit.","unit-fade":"Fade the sample bone; the axes now carry the unit length.","unit-ready":"Keep the unit axes at the reference hip center as the displacement origin.","root-camera":"Zoom into the roots and soften the axes to make small offsets visible.","root-markers":"Mark both hip centers to show the start and end of displacement.",displacement:"Connect the hip centers to show their total displacement.","target-root":"Move the torso axes to the hip center so both frames share a pivot.",compare:"Compare the two axis sets before aligning their origins and lengths.",align:"Match the origins and lengths so only orientation differs.","baseline-camera":"Face the projection plane so the direction change is visible.","baseline-angle":"Show how far the reference direction lies outside the spine plane.","baseline-project":"Project the reference direction onto the spine plane to isolate turn.","baseline-fade":"Keep only the projected reference direction for comparison.","projection-camera":"Face the projection plane so the direction change is visible.","projection-angle":"Show the direction\u2019s angle to the plane before projection.",projection:"Project onto the horizontal plane to separate turn from tilt.","original-fade":"Fade the original direction so the projected one stays clear.","lateral-camera":"Face the projection plane to compare the selected direction with it.","lateral-stretch-camera":"Adjust the view so the joint-to-joint arrow is easy to see.","lateral-angle":"Show the selected direction\u2019s angle to the spine plane before projection.","lateral-project":"Project the selected direction onto the spine plane to isolate turn.","lateral-fade":"Keep only the projected selected direction for the turn comparison.","rotation-camera":"Face the rotation plane so the turning angle is easy to see.","turn-camera":"Look toward up to see the turn across the horizontal plane.","bend-camera":"Move to the leaning side so forward bend is easier to see.","tilt-camera":"Move to the side to reveal tilt above or below the plane.","bend-plane":"Expand the sideways\u2013up plane to compare the spine\u2019s forward bend.","tilt-plane":"Expand the forward\u2013up plane to compare the spine\u2019s side tilt.","plane-switch":"Fade the bend comparison to prepare the side-tilt plane.","bend-reference-fade":"Show the spine\u2019s planar reference to establish the starting direction.","tilt-reference-fade":"Show the spine\u2019s planar reference to establish the starting direction.","bend-ready":"Compare the spine with its planar reference before measuring bend.","shoulder-camera":"Frame both shoulders so the crossbar\u2019s source is clear.","crossbar-plane":"Build a plane across the spine to set a perpendicular crossbar.","crossbar-camera":"Angle the view so the shoulder projection stays visible.","crossbar-angle":"Show the shoulder line\u2019s angle to the plane before projection.","crossbar-project":"Project the shoulder line across the spine to make a rigid T.","crossbar-original-fade":"Fade the original shoulder line so the rigid crossbar stays clear.","reference-t":"Compare the reference and body T before rotating.","azimuth-camera":"Look down to see the T\u2019s horizontal lean direction.","azimuth-plane":"Show the horizontal plane at the root to measure lean direction.","azimuth-ready":"Compare forward with the horizontal lean direction before turning.","forward-fade":"Fade forward now that lean direction is established.","polar-camera":"Move to the side to see how far the T leans.","polar-ready":"Compare the upright stem with the body spine before inclining.","spin-camera":"Look along the spine to see the crossbar\u2019s twist.","spin-ready":"Compare both crossbars before twisting around the spine.","sway-ready":"Start with sway to isolate sideways displacement.","thrust-ready":"Next, isolate forward displacement along the reference forward axis.","lift-ready":"Finally, isolate vertical displacement along the reference up axis.",reset:"Fade the helpers to return to the selected pose."};function eb(i){let e=i.startsWith("reference-")?"reference":i.startsWith("torso-")?"torso":null;if(!e)return;let t=i.slice(e.length+1),n=e==="reference",r=n?"reference ankles":"shoulders",s=n?"reference":"torso";return{"lateral-camera-in":`Move closer so both ${r} and the full arrow stay visible.`,"lateral-focus":`Highlight the ${r} to show where left\u2013right comes from.`,grow:`Connect right to left to define the ${s}\u2019s left\u2013right direction.`,"lateral-release":"Release the joint emphasis so the direction stays in focus.",shrink:"Anchor left\u2013right at the midpoint to build a coordinate frame.","up-focus":"Highlight the upper-spine joints to show where up comes from.",up:n?"Add global up so the left\u2013right direction can be leveled.":"Use the upper spine to define the torso\u2019s up direction.","up-release":"Release the joint emphasis so the up direction stays in focus.","up-align":"Move up to the shared origin to compare the two directions.","angle-camera":"Face the two directions so their angle is easy to see.","angle-reveal":"Show the angle to up before making the two directions perpendicular.",orthogonalize:"Remove the up component to make left\u2013right perpendicular to up.","cross-camera-in":"Choose an oblique view to see the plane and forward together.",plane:"Grow the left\u2013up plane to establish the forward direction.",forward:"Draw forward perpendicular to the plane to complete the axes.","plane-fade":"Fade the construction plane; keep the three directions.","cross-camera-out":`Pull back to see the completed ${s} axes.`}[t]}function rh(i,e){let t=i.subtype.startsWith("torso_"),n=i.subtype==="spine_bend_tilt",r=i.subtype.startsWith("hip")?"hip":"shoulder";return{turn:t?"Rotate around up to measure torso turn.":i.type==="kinematic"?`Rotate toward the projected ${r} direction to measure turn.`:`Rotate across the horizontal plane to measure ${r} turn.`,bend:t?"Rotate around the turned left\u2013right axis to measure forward bend.":"Rotate the planar reference toward the spine to measure forward bend.",tilt:t?"Rotate around forward to measure side tilt.":n?"Rotate the planar reference toward the spine to measure side tilt.":`Rotate from horizontal toward the ${r} line to measure tilt.`,azimuth:"Turn the reference T around global up to match the lean direction.",polar:"Incline the reference T toward the spine to measure lean from vertical.",spin:"Twist around the spine until the crossbars match.",sway:"Measure sway along left\u2013right; the dashed line shows its projection.",thrust:"Measure thrust along forward; the dashed line shows its projection.",lift:"Measure lift along up; the dashed line shows its projection."}[e]}function tb(i,e,t){let n=i.context.entry,r=e.id,s=n.subtype.startsWith("hip")?"hips":"shoulders",o=n.subtype==="spine_azimuth_polar_spin";if(r==="finish"){let l=mn(t.progress,t.reviewDuration??e.duration);if(l.holding)return"Hold the completed result so the final comparison is clear.";if(l.progress<.22)return n.type==="position"?"Reset the numbers to review each displacement component.":"Fade the comparison vectors so their directions can reset while hidden.";let u=o||n.subtype.startsWith("torso_")?.34:n.type==="geometric"?.38:.4;return n.type!=="position"&&l.progress<u?"Bring the reset vectors back before replaying the measurements.":t.active?"Review: "+rh(n,t.active):"Review the same comparison to see how the result is measured."}if(r==="reference-align")return o?"Rearrange the reference axes into a root-based T for comparison.":n.subtype==="spine_bend_tilt"?"Move and shrink the reference axes to keep a compact direction guide.":n.type==="kinematic"?"Move the reference axes onto the spine-plane origin for comparison.":`Move the reference axes to the ${s==="hips"?"hip":"shoulder"} center for comparison.`;if(r==="reference-trim")return n.subtype==="spine_bend_tilt"?"Make the compact reference translucent so the spine stays clear.":"Fade unused axes so the measured direction stays clear.";let a=eb(r);if(a)return a;if(r==="plane")return n.type==="kinematic"?"Build a plane perpendicular to the lower spine to compare turn.":"Create the reference horizontal plane to separate turn from tilt.";if(r==="tilt-ready")return n.subtype==="spine_bend_tilt"?"Compare the spine with its planar reference before measuring tilt.":`Compare the ${s} with the horizontal plane before measuring tilt.`;if(r.startsWith("camera-"))return`Look toward the ${r==="camera-turn"?"up":r==="camera-bend"?"left\u2013right":"forward"} axis to see this rotation clearly.`;let c=r.match(/^(up|spine|lateral|shoulder)-(focus|grow|release|align)$/);if(c){let[,,l]=c,u=c[1],h=u==="up"?"lower-spine joints":u==="spine"?"hip and shoulder centers":u==="shoulder"?"shoulders":s;return l==="focus"?`Highlight the ${h} to show where this direction comes from.`:l==="grow"?u==="spine"?"Connect hip center to shoulder center to define the spine direction.":u==="up"?"Connect the lower-spine joints to define the rotation axis.":`Connect right to left to define the ${h.replace(/s$/,"")} direction.`:l==="release"?"Release the joint emphasis so the measured direction stays clear.":o?`Turn the ${u==="spine"?"spine arrow into the T\u2019s stem":"shoulder arrow into the T\u2019s crossbar"}.`:"Anchor the direction at the measurement origin for comparison."}return Qv[r]??rh(n,r)}function sh(i,e,t){let n=e.id;if(n==="finish"){let r=mn(t.progress,t.reviewDuration??e.duration);if(r.holding||!t.active)return null;let s=i.context.entry.subtype==="spine_azimuth_polar_spin"||i.context.entry.subtype.startsWith("torso_")?.34:i.context.entry.type==="geometric"?.38:.4;return r.progress<s?null:rh(i.context.entry,t.active)??null}return/camera|focus|release|fade|ready|markers|preview|intro|reset|compare|trim|align|shrink|highlight|duplicate/.test(n)||["selected-focus","reference-root","target-root","scale-align","unit-fade","plane-switch","reference-t","displacement"].includes(n)||/angle/.test(n)?null:tb(i,e,t)??null}function Dp(i,e){let t=[];for(let n=0;n<e.segments.length;n++){let r=e.segments[n];if(r.completion)continue;let s=sh(i,r,e.sample(r.start+r.duration*.5));if(!s)continue;let o=r.start,a=e.segments[n-1];a&&(r.id.endsWith("grow")&&a.id.endsWith("focus")&&(o=a.start),/(?:project|projection|orthogonalize)$/.test(r.id)&&/(?:angle|angle-reveal)$/.test(a.id)&&(o=a.start));let c=r.id.match(/^(reference|torso)-(plane|forward)$/),l=r.id.match(/^(reference|torso)-(up|orthogonalize)$/),u=c?"Use the left\u2013up plane to define forward, perpendicular to both directions.":l?l[1]==="reference"?"Use global up to level the left\u2013right direction.":"Use the upper spine as up; make left\u2013right perpendicular to it.":s,h=t.at(-1);if(h?.text===u){h.actionEnd=r.end;continue}t.push({start:o,actionEnd:r.end,text:u})}for(let n=0;n<t.length;n++){let r=t[n],s=Math.max(2800,Math.min(5e3,r.text.split(/\s+/).length*230)),o=e.segments.find(a=>a.start>=r.actionEnd-1e-6&&["selected-focus","finish","reset"].includes(a.id))?.start??e.duration;r.end=Math.min(t[n+1]?.start??e.duration,o,Math.max(r.actionEnd,r.start+s))}return{cues:t,sample(n){let r=e.segments.find(s=>n>=s.start&&n<s.end);return r?.completion?sh(i,r,e.sample(n)):t.find(s=>n>=s.start&&n<s.end)?.text??null}}}function Up(i){let e=It("div",void 0,"explain-step-caption");e.setAttribute("aria-label","Step explanation"),e.setAttribute("aria-live","off"),i.parentElement.append(e);let t,n,r=new Set;function s(){for(let o of r)o.cancel();r.clear(),e.replaceChildren(),t=void 0}return{update(o,{immediate:a=!1}={}){if(o===n)return;n=o;let c=matchMedia("(prefers-reduced-motion: reduce)").matches;if(a||c){s(),o&&(t=It("span",o,"explain-step-caption-text"),e.append(t));return}let l=t;if(l){let u=l.animate([{opacity:1},{opacity:0}],{duration:160,fill:"forwards"});r.add(u),u.finished.then(()=>{l.remove(),r.delete(u)}).catch(()=>{})}if(t=void 0,o){t=It("span",o,"explain-step-caption-text"),e.append(t);let u=t.animate([{opacity:0},{opacity:1}],{duration:180,fill:"both"});r.add(u),u.finished.then(()=>r.delete(u)).catch(()=>{})}},dispose(){s(),e.remove()}}}function _c({root:i,target:e,onAdvance:t,onPlayingChange:n=()=>{},playing:r=!matchMedia("(prefers-reduced-motion: reduce)").matches},s={request:o=>requestAnimationFrame(o),cancel:o=>cancelAnimationFrame(o),observe:(o,a)=>{let c=new IntersectionObserver(l=>a(l[0].isIntersecting));return c.observe(o),()=>c.disconnect()},hidden:()=>document.hidden}){let o,a,c=!1,l=!1,u=s.observe(e,p=>{c=p,o=void 0});function h(p){if(l||!i.isConnected)return;let f=r&&c&&!s.hidden()&&!i.closest("[inert]");f&&t(o===void 0?0:p-o),o=f?p:void 0,a=s.request(h)}return a=s.request(h),{get playing(){return r},setPlaying(p){r=!!p,o=void 0,n(r)},dispose(){l=!0,s.cancel(a),u()}}}function Fp(i,e){let t=new yn;t.name="normalization-bone-copies",i.add(t);let n=new Map,r=new D(0,1,0),s=.012,o=Math.sqrt(.022**2-s**2);function a(c){if(n.has(c))return n.get(c);let l=new Va(1,1,6,16),u=new Float32Array(l.attributes.position.array),h=new Qi({color:"#8b9198",roughness:.38,metalness:.08,transparent:!0}),p=new it(l,h);p.castShadow=!0,p.receiveShadow=!0,t.add(p);let f={mesh:p,original:u};return n.set(c,f),f}return{update(c=[]){for(let{mesh:l}of n.values())l.visible=!1;for(let l of c){let u=e(l.from),h=e(l.to),p=h.clone().sub(u),f=p.length(),g=f-2*o*(l.jointTrim??0);if(g<1e-7)continue;let{mesh:x,original:m}=a(l.id),d=Math.min(s,g/2),v=Math.max(0,(g-2*d)/2),y=x.geometry.attributes.position;for(let _=0;_<y.count;_++){let w=m[_*3+1];y.setXYZ(_,m[_*3]*d,Math.sign(w)*v+(w-Math.sign(w)*.5)*d,m[_*3+2]*d)}y.needsUpdate=!0,x.geometry.computeBoundingSphere(),x.scale.setScalar(1),x.position.copy(u).add(h).multiplyScalar(.5),x.quaternion.setFromUnitVectors(r,p.multiplyScalar(1/f)),x.material.color.set(l.color??"#8b9198"),x.material.opacity=l.opacity??1,x.material.depthWrite=x.material.opacity>.999,x.visible=x.material.opacity>.001}},dispose(){for(let{mesh:c}of n.values())c.geometry.dispose(),c.material.dispose();i.remove(t),n.clear()}}}var nb=1e-7,Np=i=>i.from&&i.to?Math.hypot(...i.to.map((e,t)=>e-i.from[t])):1;function zo(i){let e=new Map;function t(n,r,s="opacity",o=1,a=1,c){if(!r)return;let l=r[s]??1;l*o<=nb||e.set(n,{opacity:l*o,extent:a,signature:c,set:u=>{r[s]=l*u}})}for(let n of["referencePose","selectedPose"])t(n,i,n);for(let n of["referenceAxes","torsoAxes","originalReferenceAxes","originalTorsoAxes"]){let r=i[n];if(!r)continue;let s=r.opacity??1;for(let o of["x","y","z"])if(r[o]){let a=r[o];t(n+"."+o,a,"opacity",s,Np(a),{from:a.from,to:a.to,color:a.color??a.colorAxis??o,shape:a.shape??"arrow"})}for(let o of["angleMarker","projectionSweep"])r[o]&&t(n+"."+o,r[o],"opacity",s,Math.abs(r[o].angle));r.componentPlane&&t(n+".componentPlane",r.componentPlane,"opacity",s,r.componentPlane.size),r.plane>0&&t(n+".plane",r,"planeOpacity",s,r.plane)}if(i.plane){let n=i.plane,r=[n.axis??"y",...n.u??[],...n.v??[]].join(",");t("plane:"+r,n,"opacity",1,n.size)}for(let[n,r]of(i.sectors??[]).entries())t(`sector:${r.axis}:${r.direction??n}`,r,"opacity",1,Math.abs(r.angle));for(let n of["guides","boneGuides"])for(let r of i[n]??[])t(n+":"+r.id,r,"opacity",1,r.kind==="point"?r.radius??4:Np(r));return e}function ib(i,e){let t=i.signature,n=e.signature;return t&&n&&t.color===n.color&&t.shape===n.shape&&Math.abs(i.opacity-e.opacity)<.02&&["from","to"].every(r=>t[r].every((s,o)=>Math.abs(s-n[r][o])<1e-6))}function Op(i,{fadeDuration:e=240}={}){let t=new Set([0,i.duration]);for(let c=0;c<i.duration;c+=40)t.add(c);for(let c of i.segments){let l=c.completion?64:4;for(let u=0;u<=l;u++)t.add(c.start+c.duration*u/l);c.motionDuration!==void 0&&t.add(c.start+c.motionDuration)}let n=[],r=[...t].sort((c,l)=>c-l),s=r[0],o=zo(i.sample(s));function a(c,l,u,h){let p=l,f=u;for(let y=0;y<20;y++){let _=(p+f)/2;zo(i.sample(_)).has(c)===h?f=_:p=_}let g=(p+f)/2,x=Math.min(.001,(u-l)/100),m=zo(i.sample(h?g+x:g-x)).get(c);if(!m||m.opacity<.01||m.extent<1e-5)return;let d=i.segments.find(y=>(h?g+x:g-x)>=y.start&&(h?g+x:g-x)<y.end),v=Math.min(e,(d?.duration??e)*.35);n.push({key:c,time:g,appearing:h,duration:v})}for(let c of r.slice(1)){let l=zo(i.sample(c)),u=[...o.keys()].filter(f=>!l.has(f)),h=[...l.keys()].filter(f=>!o.has(f)),p=new Set;for(let f of u)for(let g of h)ib(o.get(f),l.get(g))&&(p.add(f),p.add(g));for(let f of u)p.has(f)||a(f,s,c,!1);for(let f of h)p.has(f)||a(f,s,c,!0);o=l,s=c}return{events:n,sample(c){let l=i.sample(c),u=zo(l),h=new Map;for(let p of n){let f=p.appearing?c-p.time:p.time-c;if(f<0||f>p.duration||!u.has(p.key))continue;let g=Pe(Ne(f/p.duration));h.set(p.key,Math.min(h.get(p.key)??1,g))}for(let[p,f]of h)u.get(p).set(f);return l}}}function li(i,e,{scene:t,toWorld:n,setPoses:r,draw:s,canvas:o,setFocus:a,setCamera:c,setPairFocus:l,setRotationPivot:u,navigation:h},p){let f=p(e),g=wr(t,n),x=nr(t,n,2.7,o),m=nr(t,n,4.5,o,f.targetAxisColors),d=sc(t,n),v=nr(t,n,2.7,o),y=nr(t,n,4.5,o,f.targetAxisColors),_=gc(n,o),w=Fp(t,n),E=Op(f),A=Up(o),T=Dp(e,f);i.classList.add("metric-explanation"),i.setAttribute("aria-label","Animated measurement coordinate frames");let b=It("div",void 0,"explain-item-options"),M={};b.setAttribute("role","group"),b.setAttribute("aria-label","Measurement values");for(let O of e.items){let te=It("button");te.type="button";let U=It("strong","0.00"+O.unit),J=oc(e.context.entry.subtype,O.key);J&&te.style.setProperty("--metric-axis-color",J),te.append(It("span",O.label),U),b.append(te),M[O.key]={button:te,output:U},te.onclick=()=>z(f.segments.find(Q=>Q.id===O.key).start)}let C=It("input",void 0,"explain-time-slider");C.type="range",C.min=0,C.max=f.duration,C.step="any",C.value=0,C.setAttribute("aria-label","Explanation timeline");let F=Lp(f,C,O=>V(O,{preservePlayback:!0}));i.append(b,F.root);let H=h?Pp(o,h):null,q=(O,te=f.sample(X))=>{let U=Cp(e.context.entry,f,X,te);u?.(U.pivot),h?.setPlayback(U.restricted,O)},X=0,I,ee=!matchMedia("(prefers-reduced-motion: reduce)").matches;function W(){let O=E.sample(X);q(k.playing,O),F.update(X),A.update(T.sample(X),{immediate:!k.playing}),v.update(O.originalReferenceAxes),y.update(O.originalTorsoAxes),x.update(O.referenceAxes),m.update(O.torsoAxes),d.update(O.sectors),g.update(O.plane),_.update(O.guides),w.update(O.boneGuides),l(O.pairFocus),c(O.camera),r(O.referencePose,O.selectedPose,O.jointHighlights,O.boneHighlights),a(O.focusOrigin??f.frames.torso.origin,O.focus),C.value=X,C.setAttribute("aria-valuetext",O.title);for(let[te,{button:U,output:J}]of Object.entries(M)){let Q=O.valueColors?.[te]??oc(e.context.entry.subtype,te);Q&&U.style.setProperty("--metric-axis-color",Q),J.textContent=O.values[te].toFixed(2)+e.items.find(ge=>ge.key===te).unit,U.setAttribute("aria-pressed",String(O.active===te))}s()}function z(O){let te=i.closest(".metric-snapshot"),U=te?bp(te,{duration:320,fadeIncoming:!0}):void 0;V(O),U?.mount?.(),U?.()}function V(O,{preservePlayback:te=!1}={}){X=Math.max(0,Math.min(f.duration,Number(O))),te||k.setPlaying(!1),W()}let k=_c({root:i,target:o,playing:ee,onPlayingChange:O=>{q(O),I?.update(O)},onAdvance:O=>{h?.returning||(X=(X+O)%f.duration,W())}});return I=yc(o,k),C.oninput=()=>V(C.value,{preservePlayback:!0}),W(),{updateView(O,te,U){v.updateView(O,te,U),y.updateView(O,te,U),x.updateView(O,te,U),m.updateView(O,te,U),_.updateView(O,te,U)},dispose(){H?.dispose(),I.dispose(),k.dispose(),v.dispose(),y.dispose(),x.dispose(),m.dispose(),d.dispose(),g.dispose(),_.dispose(),w.dispose(),A.dispose(),r(.5,1)}}}function zp(i,e,t){return li(i,e,t,dc)}function Bp(i,e,t){return li(i,e,t,fc)}function kp(i,e,t){return li(i,e,t,hc)}function oh(i,e,t){return li(i,e,t,Do)}function Hp({title:i,description:e}){let t=It("header",void 0,"snapshot-card-header");return t.append(It("h4",i,"snapshot-sample-title")),e&&t.append(It("p",e,"snapshot-metric-description")),t}function ah(i,e,t){return li(i,e,t,Lo)}function ch(i,e,t){return li(i,e,t,Io)}function lh(i,e,t,n){let r=[...Bn(),...Bf(i,t).map(({itemIndex:o,stepIndex:a})=>({itemIndex:o,stepIndex:a,duration:Math.max(4400,i[o].steps[a].visuals.filter(c=>c.jointPair).length*5300)}))];n!==void 0&&r.push({...r.at(-1),completion:!0,duration:0});let s=En(r,e,n);return{segments:r,duration:s,sample(o){let a=r.find(c=>o<c.end)??r.at(-1);return{segment:a,progress:a.completion?1:Ne((o-a.start)/a.duration)}}}}function Vp(i,e,{show:t,animate:n,canvas:r,opening:s}){i.classList.add("metric-explanation"),i.setAttribute("aria-label","Animated measurement explanation"),i.append(It("p",e.category,"explain-category"),It("h5",e.title,"explain-title"));let o=It("div",void 0,"explain-item-options");o.setAttribute("role","group"),o.setAttribute("aria-label","Measurement component");let a=It("progress");a.max=1,a.value=0,a.setAttribute("aria-label","Construction progress"),i.append(o,a);let c,l,u=[],h=[],p=0,f=lh(e.items,e.context.entry.duration,void 0,e.context.entry.stay),g=!matchMedia("(prefers-reduced-motion: reduce)").matches;function x(){let{segment:v,progress:y}=f.sample(p);if(v!==l&&(u.forEach((_,w)=>_.setAttribute("aria-pressed",String(w===(v.itemIndex??0)))),t(v.intro?[]:e.items[v.itemIndex].steps[v.stepIndex].visuals),l=v),a.value=v.intro?0:y,v.intro){let _=v.motionDuration?Math.min(1,(p-v.start)/v.motionDuration):y,w=Object.fromEntries(e.items.map(A=>[A.key,A.value])),E=eh(v,_,w);s?.(E),h.forEach((A,T)=>A.textContent=E.values[e.items[T].key].toFixed(2)+e.items[T].unit)}else h.forEach((_,w)=>{let E=e.items[w],A=w<v.itemIndex?E.value:w===v.itemIndex&&v.stepIndex===E.steps.length-1?E.value*y:0;_.textContent=A.toFixed(2)+E.unit}),n(y)}function m(v){f=lh(e.items,e.context.entry.duration,v,e.context.entry.stay),p=0,l=void 0,d.setPlaying(!0),x()}e.items.forEach((v,y)=>{let _=It("button");_.type="button";let w=It("strong",`${v.value.toFixed(2)}${v.unit}`);h.push(w),_.append(It("span",v.label),w),_.onclick=()=>m(y),o.append(_),u.push(_)});let d=_c({root:i,target:i.parentElement.querySelector("canvas")??i,playing:g,onPlayingChange:v=>c?.update(v),onAdvance:v=>{p=(p+v)%f.duration,x()}});return c=yc(r,d),g||(p=f.duration),x(),{dispose(){c.dispose(),d.dispose()}}}function Gp(i){let e=document.createElement("div");e.className="explain-scene-labels",e.setAttribute("aria-hidden","true"),i.parentElement.append(e);let t=document.createElementNS("http://www.w3.org/2000/svg","svg");e.append(t);let n=[];function r(){n.forEach(a=>a.element.remove()),n=[],t.replaceChildren()}function s(a,c,l){let u=document.createElement("span");u.textContent=c,u.style.color=l,e.append(u);let h={position:a,element:u,color:l};return n.push(h),{setText(p){u.textContent=p},setPosition(p){h.position=p}}}function o(a,c,l){e.style.width=c+"px",e.style.height=l+"px",t.setAttribute("viewBox",`0 0 ${c} ${l}`),t.replaceChildren();let u=[];for(let{position:h,element:p,color:f}of n){let g=h.clone().project(a);if(g.z>1||g.z<-1){p.hidden=!0;continue}p.hidden=!1;let x=(g.x+1)*c/2,m=(1-g.y)*l/2,d=p.offsetWidth,v=p.offsetHeight,y,_=1/0;for(let[E,A]of[[10,-v-5],[10,5],[-d-10,-v-5],[-d-10,5],[10,-v-32],[-d-10,-v-32],[10,32],[-d-10,32],[10,60],[-d-10,60]]){let T=Math.max(3,Math.min(c-d-3,x+E)),b=Math.max(3,Math.min(l-v-3,m+A)),C=u.reduce((F,H)=>F+Math.max(0,Math.min(T+d+4,H.x+H.w)-Math.max(T-4,H.x))*Math.max(0,Math.min(b+v+3,H.y+H.h)-Math.max(b-3,H.y)),0)*100+Math.hypot(T-x,b-m);C<_&&(y={x:T,y:b,w:d,h:v},_=C)}u.push(y),p.style.left=y.x+"px",p.style.top=y.y+"px";let w=document.createElementNS(t.namespaceURI,"line");w.setAttribute("x1",x),w.setAttribute("y1",m),w.setAttribute("x2",Math.max(y.x,Math.min(y.x+d,x))),w.setAttribute("y2",Math.max(y.y,Math.min(y.y+v,m))),w.setAttribute("stroke",f),t.append(w)}}return{add:s,clear:r,update:o,dispose(){e.remove()}}}function Wp(i,e,t){let n=cp(t),r=Gp(t),s=new yn;s.name="metric-explanation",i.add(s);let o=[],a=[];function c(){r.clear(),n.clear(),o=[];let g=new Set,x=new Set;s.traverse(m=>{m.geometry&&g.add(m.geometry),m.material&&x.add(m.material)}),s.clear(),g.forEach(m=>m.dispose()),x.forEach(m=>{m.map?.dispose(),m.dispose()})}function l(g,x,m=!1){let d=new Mt().setFromPoints(g),v=m?new Xa({color:x,dashSize:.025,gapSize:.015,depthWrite:!1}):new Dn({color:x,depthWrite:!1}),y=new Li(d,v);return m&&y.computeLineDistances(),s.add(y),y}function u(g,x){return n.add(x)}function h(g,x,m){g.visible=x.distanceTo(m)>1e-7,g.setEndpoints(x,m)}function p(g,x){c();let m=y=>e(x(y)),d=g.filter(y=>y.jointPair).length,v=0;for(let y of g)if(y.kind==="point"){let _=new it(new si(.018,16,12),new $t({color:y.color}));_.position.copy(m(y.position)),s.add(_),r.add(_.position,y.label,y.color),o.push(w=>_.scale.setScalar(.5+.5*w.directions))}else if(y.kind==="vector"){let _=m(y.from),w=m(y.to),E=u(_,y.color);if(r.add(w,y.label,y.color),y.jointPair){let A=v++;o.push(T=>{let b=ic(Math.max(0,Math.min(1,T.progress*d-A)));h(E,_,_.clone().lerp(w,b.stretch)),a.push({...y.jointPair,strength:b.strength})})}else o.push(A=>h(E,_,_.clone().lerp(w,A.directions)))}else if(y.kind==="projection"){let _=m(y.origin),w=m(ue(y.origin,oe(y.direction,y.size))),E=m(ue(y.origin,oe(y.target,y.size))),A=u(_,y.color),T=l([w,w],y.color,!0),b=r.add(w,y.label,y.color);o.push(M=>{let C=w.clone().lerp(E,M.projection);h(A,_,C),b.setPosition(C);let F=T.geometry.attributes.position;F.setXYZ(1,C.x,C.y,C.z),F.needsUpdate=!0,T.computeLineDistances(),T.visible=M.projection>0})}else if(y.kind==="plane"){let _=be(y.normal),w=be(Ut(_,Math.abs(_[1])<.9?[0,1,0]:[1,0,0])),E=be(Ut(_,w)),A=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([C,F])=>m(ue(y.origin,ue(oe(w,C*y.radius),oe(E,F*y.radius))))),T=new Mt().setFromPoints(A);T.setIndex([0,1,2,0,2,3]),T.computeVertexNormals();let b=new $t({color:y.color,opacity:0,transparent:!0,side:Vt,depthWrite:!1});s.add(new it(T,b));let M=l([...A,A[0]],y.color,!0);r.add(A[2],y.label,y.color),o.push(C=>{b.opacity=.1*C.directions,M.visible=C.directions>.2})}else if(y.kind==="arc"){let w=Array.from({length:97},(M,C)=>m(ue(y.origin,oe(gt(y.from,y.normal,y.degrees*C/96),y.radius)))),E=l(w,y.color),A=m(y.origin),T=u(A,y.color),b=r.add(w[0],`${y.label} 0.0\xB0`,y.color);o.push(M=>{E.geometry.setDrawRange(0,Math.floor(M.angle*96)+1);let C=m(ue(y.origin,oe(gt(y.from,y.normal,y.degrees*M.angle),y.radius)));h(T,A,C),T.visible=M.directions>.8,b.setPosition(C),b.setText(`${y.label} ${((y.value??y.degrees)*M.angle).toFixed(1)}\xB0`)})}f(0)}function f(g){a=[];let x={...zf(g),progress:g};return o.forEach(m=>m(x)),a}return{show:p,animate:f,updateLabels(g,x,m){r.update(g,x,m),n.updateView(g,x,m)},dispose(){c(),r.dispose(),n.dispose(),i.remove(s)}}}var sb=new Map([["position.hip_sway_thrust_lift",Bp],["geometric.spine_azimuth_polar_spin",zp],["geometric.shoulder_turn_tilt",oh],["geometric.hip_turn_tilt",oh],["geometric.spine_bend_tilt",kp],["kinematic.hip_turn_on_spine_plane",ah],["kinematic.shoulder_turn_on_spine_plane",ah],["kinematic.torso_turn_bend_tilt",ch],["kinematic.torso_turn_bend_tilt_by_shoulder",ch]]);function ob(i,e,{scene:t,toWorld:n,canvas:r,setPoses:s,draw:o,setCamera:a,setPairFocus:c}){let l=Wp(t,n,r),u=!1,h=[],p=e.context,f=yt(p.meta.orientation.map(m=>m[2]),p.meta.orientation.map(m=>m[1]));function g(m){if(!h.length){c(null),a(null);return}let d=m*h.length,v=Math.min(h.length-1,Math.floor(d)),y=h[v],_=ic(Math.min(1,d-v)),w=y.jointPair.pose==="reference"?p.reference:p.pose,E=y.jointPair.joints.map(b=>p.source(p.point(b,w))),A={from:p.source(y.from),to:p.source(y.to)},T=cc({from:E[0],to:E.at(-1)},A,p.meta.orientation.map(b=>b[2]),p.meta.orientation.map(b=>b[1]));c({points:[...T.points,...E],amount:_.camera}),a(Wt(f,T.orientation,_.camera))}let x=Vp(i,e,{canvas:r,opening:m=>{s(m.referencePose,m.selectedPose),o()},show:m=>{h=m.filter(d=>d.jointPair),g(0),u=m.length>0,s(u?.28:.5,u?.28:1),l.show(m,e.context.source),o()},animate:m=>{g(m);let d=l.animate(m);u&&s(.28,.28,d),o()}});return{updateView:l.updateLabels,dispose(){x.dispose(),l.dispose()}}}function Xp(i,{id:e,poseData:t,metrics:n,entry:r,...s}){let o=Ns(t,n,r),a=It("div",void 0,"snapshot-explain-layout"),c=It("div",void 0,"snapshot-explain-figure"),l=It("aside");return c.append(s.canvas),a.append(c,l),i.append(Hp({title:o.title,description:ec[r.subtype]}),a),i.classList.add("snapshot-explained"),(sb.get(`${r.type}.${r.subtype}`)??ob)(l,o,s)}var ab=[["nose","atlas"],["nose","top_head"],["nose","left_ear"],["nose","right_ear"],["root","left_hip"],["root","right_hip"],["root","torso"],["torso","clavicle"],["clavicle","left_shoulder"],["clavicle","right_shoulder"],["clavicle","atlas"],["left_hip","left_knee"],["right_hip","right_knee"],["left_knee","left_ankle"],["right_knee","right_ankle"],["left_shoulder","left_elbow"],["right_shoulder","right_elbow"],["left_elbow","left_wrist"],["right_elbow","right_wrist"],["golf_club_grip","golf_club_heel"],["golf_club_heel","golf_club_head"]];function qp(i){if(!Array.isArray(i)||i.some(r=>typeof r!="string")||new Set(i).size!==i.length)throw new Error("Expected a unique joint name list");let e=Object.fromEntries(i.map((r,s)=>[r,s])),t=ab.map(r=>r.map(s=>{if(!Object.hasOwn(e,s))throw new Error(`Missing pose joint: ${s}`);return e[s]})),n=t.filter(r=>r.every(s=>i[s].startsWith("golf_club_")));return{names:i,edges:t,indexes:e,clubEdges:n}}var cb=i=>Object.fromEntries(["duration","stay","start_stay","explain","transition","review","end_stay"].filter(e=>i[e]!==void 0).map(e=>[e,i[e]]));function Yp(i,e,t){if(!i||!["kinematic","geometric","position"].includes(i.type))throw new Error("Snapshot type must be kinematic, geometric or position");if(typeof i.subtype!="string"||!Object.hasOwn(e.metrics?.[i.type]??{},i.subtype))throw new Error("Unknown snapshot metric subtype");Ro(i.duration),Co(i.stay),lb(i);let n=i.frame,r=e.meta?.ref_frame_id;for(let[s,o]of[["selected",n],["reference",r]])if(!Number.isInteger(o)||o<0||o>=t)throw new Error(`Invalid ${s} snapshot frame`);return{frame:n,referenceFrame:r,type:i.type,subtype:i.subtype,...cb(i)}}function lb(i){i.explain!==void 0&&Ro(i.explain);for(let e of["start_stay","transition","review","end_stay"])i[e]!==void 0&&Co(i[e])}function $p(i,e,t,n){let r=t.clone();return i.copy(e).slerp(r,n)}function uh(i,e){if(i.position.y>=e)return;let t=i.position.clone(),n=Math.max(t.length(),Math.abs(e)+1e-6),r=e,s=Math.hypot(t.x,t.z),o=Math.sqrt(Math.max(0,n*n-r*r))/(s||1);i.position.set(s?t.x*o:0,r,s?t.z*o:Math.sqrt(Math.max(0,n*n-r*r)));let a=i.quaternion.clone().setFromUnitVectors(t.normalize(),i.position.clone().normalize());i.quaternion.premultiply(a)}function jp(i,e,t){if(i.y>=t)return;let n=i.clone().sub(e),r=t-e.y,s=Math.max(n.length(),Math.abs(r)+1e-6),o=Math.hypot(n.x,n.z),a=Math.sqrt(Math.max(0,s*s-r*r));i.set(e.x+(o?n.x/o*a:0),t,e.z+(o?n.z/o*a:a))}var Bo=["nose","atlas","top_head","left_ear","right_ear","left_shoulder","right_shoulder","left_elbow","right_elbow","left_wrist","right_wrist","left_hip","right_hip","left_knee","right_knee","left_ankle","right_ankle","golf_club_grip","golf_club_shaft","golf_club_heel","golf_club_head"],Zp=[[0,1],[0,2],[0,3],[0,4],[5,6],[5,7],[7,9],[6,8],[8,10],[5,11],[6,12],[11,12],[11,13],[13,15],[12,14],[14,16],[17,19],[19,20]],Yt=i=>Array.isArray(i)&&i.length===3&&i.every(Number.isFinite);async function ub(i){let e=await fetch(i);if(!e.ok)throw new Error(`${i}: ${e.status}`);return e.json()}async function Jp(i,e,t,{poseData:n,showCameras:r=!1,autoPlay:s=!0,cameraVideos:o={},rawDetections:a={},bannerMode:c=!1,bannerMetrics:l,snapshotMetrics:u,videoMetrics:h,calibratedViews:p=!1,hoganPlanes:f=!1,defaultZoomScale:g=1,measurementMetrics:x,measurementFeature:m="geometric-rotations",showRawDetections:d=!0,compositeDetections:v=!1}={}){let y=n??await ub(`materials/data/3d_results/${encodeURIComponent(e)}.json`),{reconstruction:_,calibration:w,joints:E}=y,{names:A,edges:T,indexes:b,clubEdges:M}=qp(E),C=N=>A[N]?.startsWith("golf_club_"),F=u?Yp(t,u,_.length):null,H=F?.referenceFrame,q=t.range??t.ranage??[0,_.length-1],X=Array.isArray(q)?q.map((N,$)=>N===null?$===0?0:_.length-1:N):q;if(!Array.isArray(X)||X.length!==2||!X.every(Number.isInteger)||X[0]<0||X[1]<X[0]||X[1]>=_.length)throw new Error("Invalid snapshot frame range");let[I,ee]=X,W=(f?["golf_club_head"]:x?["golf_club_head"]:t.joints||[]).map(N=>N==="golf_club_haed"?"golf_club_head":N);if(W.some(N=>!A.includes(N)))throw new Error("Unknown trail joint");let z=Math.min(ee,Math.max(I,F?.frame??t.highlight_index??I)),V=0,k=0,O=2,te=1,U=document.createElement("h4");U.textContent=`Swing ${e}`,U.className="media-item-title";let J=document.createElement("canvas");J.setAttribute("aria-label",`3D pose for swing ${e}`),J.setAttribute("role","img"),F||i.append(U),i.append(J);let Q=fp(J,{names:Bo,edges:Zp}),ge=F?[_[H],_[F.frame]]:_.slice(I,ee+1),ae=ge.flat().filter(Yt);if(!ae.length)throw new Error("No valid 3D points");let ie=[0,1,2].map(N=>Math.min(...ae.map($=>$[N]))),Ae=[0,1,2].map(N=>Math.max(...ae.map($=>$[N]))),de=F?Mp(_,I,ee):ie.map((N,$)=>(N+Ae[$])/2),Y=Math.max(...ae.map(N=>Math.hypot(...N.map(($,fe)=>$-de[fe]))))||1,G=N=>{let $=N.sort((fe,_e)=>fe-_e);return $[Math.floor($.length/2)]},B=ge,Se=G(B.map(N=>Math.max(...[N[b.left_ankle],N[b.right_ankle]].filter(Yt).map($=>$[1]))).filter(Number.isFinite)),ne=Se-G(B.map(N=>N[b.top_head]).filter(Yt).map(N=>N[1])),We=(ne>0?ne:Y*2)/8,Ie=10**Math.floor(Math.log10(We)),ot=[1,2,5,10].map(N=>N*Ie).reduce((N,$)=>Math.abs(N-We)<Math.abs($-We)?N:$),Be=B.filter(N=>Yt(N[b.left_hip])&&Yt(N[b.right_hip])).map(N=>N[b.left_hip].map(($,fe)=>($+N[b.right_hip][fe])/2)),P=Be.length?G(Be.map(N=>N[0])):de[0],S=Be.length?G(Be.map(N=>N[2])):de[2],j=Math.max(...ae.map(N=>Math.max(Math.abs(N[0]-P),Math.abs(N[2]-S))))||ot,ce=ne>0?ne:Y,le=N=>new D((N[0]-de[0])/ce,-(N[1]-de[1])/ce,-(N[2]-de[2])/ce),pe=f?(()=>{let N=_[I],$=xe=>{let we=N[b[xe]];if(!Yt(we))throw new Error(`Missing Hogan reference joint: ${xe}`);return le(we).toArray()},fe=(xe,we)=>$(xe).map((ye,Ke)=>(ye+$(we)[Ke])/2),_e=B.map(xe=>xe[b.golf_club_head]).filter(Yt).map(xe=>le(xe).toArray());return hp({head:$("golf_club_head"),leftAnkle:$("left_ankle"),rightAnkle:$("right_ankle"),shoulder:fe("left_shoulder","right_shoulder"),hip:fe("left_hip","right_hip"),trajectory:_e})})():null,Ye=f?dp(B,b.golf_club_grip,b.golf_club_heel)/ce/10:0,Ee,Oe,xt,ve,He=new D,je=1,ze=new Rs;ze.background=new Je("#f4f7f0");let Te=new Ua({canvas:J,antialias:!0}),ft=Lc({floatColor:!!Te.extensions.get("EXT_color_buffer_float"),maxTextures:Te.capabilities.maxTextures}),at=r&&!c&&ft.depthCompositing?bf(Te):null;J.dataset.renderMode=at?"depth-composited":"native";let Nt=()=>at?at.render(ze,L):Te.render(ze,L);vp(J,Nt),Te.setPixelRatio(ft.pixelRatio),Te.shadowMap.enabled=!0,Te.shadowMap.type=Fu,Te.toneMapping=Nu,Te.toneMappingExposure=1.2;let L=new In(45,1,.01,100),Re=Y/ce,he=ae.map(le);ze.add(new $a("#ffffff","#7d8974",2));let me=new Mo("#fff6df",3);me.position.set(-2,4,3),me.castShadow=!0,me.shadow.mapSize.set(ft.shadowSize,ft.shadowSize);let Le=Math.max(3,Re*1.8);Object.assign(me.shadow.camera,{left:-Le,right:Le,top:Le,bottom:-Le,near:.1,far:20}),me.shadow.normalBias=.005,me.shadow.bias=-15e-5,ze.add(me);let De=new Mo("#dceaff",1);De.position.set(3,1,-3),ze.add(De);let Ze=N=>new Qi({color:N,roughness:.38,metalness:.08}),kt=Ze("#63f5b4");(c||F)&&(kt.transparent=!0);let rn={left:Ze("#3b82f6"),right:Ze("#ef4444"),center:kt};(c||F)&&Object.values(rn).forEach(N=>{N.transparent=!0});let St=.012,_n=.022,ui=new _i(1,1,1,16),hi=Tp(St,_n),Vs=m==="hip-translation",Bi=new si(_n,24,16),rr=new D(0,1,0),Er=T.map(([N,$])=>{let fe=Vs?hi.bone(kt):new it(ui,kt);return fe.castShadow=!0,fe.receiveShadow=!1,c&&(fe.renderOrder=2),ze.add(fe),{a:N,b:$,mesh:fe}}),Ar=A.map((N,$)=>{let fe=rn[N.startsWith("left_")?"left":N.startsWith("right_")?"right":"center"],_e=c?new it(Bi,fe):hi.joint(fe);return _e.castShadow=!0,_e.receiveShadow=!1,c&&(_e.renderOrder=3),ze.add(_e),_e}),Tr=N=>{N.castShadow=!0};F&&[...Er.map(N=>N.mesh),...Ar.filter(Boolean)].forEach(Tr);let Kn,Rr=[],Gs=[],jr=1;if(F){let N=xe=>{let we=Ze(xe);return we.transparent=!0,we.opacity=.5,we.depthWrite=!1,we},$={left:N("#3b82f6"),right:N("#ef4444"),center:N(Gf.reference)},fe=_[H],_e=xe=>xe.startsWith("left_")?"left":xe.startsWith("right_")?"right":"center";Kn=new yn,Kn.name="reference-pose",ze.add(Kn);for(let[xe,we]of T){if(!Yt(fe[xe])||!Yt(fe[we]))continue;let ye=le(fe[xe]),Ke=le(fe[we]);if(Ke.clone().sub(ye).length()<=1e-8)continue;let ct=hi.bone($.center);hi.placeBone(ct,ye,Ke),ct.visible=!C(xe)&&!C(we),Kn.add(ct),Gs.push({a:xe,b:we,mesh:ct})}A.forEach((xe,we)=>{if(!Yt(fe[we]))return;let ye=hi.joint($[_e(xe)]);hi.placeJoint(ye,le(fe[we])),ye.visible=!C(we),Rr[we]=ye,Kn.add(ye)}),Kn.traverse(xe=>{xe.isMesh&&Tr(xe)})}function Ws(N,$,fe=[],_e=[]){if(!(!F&&!h&&!x)){jr=$,wp(me,N,$),Kn&&(Kn.visible=N>.001),Kn?.traverse(xe=>{xe.material&&(xe.material.opacity=N,xe.material.transparent=!0,xe.material.depthWrite=N>.999,xe.castShadow=!0)});for(let xe of[...Er.map(we=>we.mesh),...Ar.filter(Boolean)])xe.material.transparent=!0,xe.material.opacity=$,xe.material.depthWrite=$>.999,xe.castShadow=!0;for(let xe of fe){let we=xe.pose==="reference"?N:$,ye=xe.pose==="reference"?Rr:Ar;for(let Ke of xe.joints){let et=ye[b[Ke]];if(!et)continue;let $e=we+(1-we)*Math.max(0,Math.min(1,xe.strength));et.material.opacity=Math.max(et.material.opacity,$e),et.material.depthWrite=$e>.999}}for(let xe of _e){let we=xe.pose==="reference"?Gs:Er,ye=xe.pose==="reference"?N:$;for(let Ke of xe.pairs){let et=Ke.map($e=>b[$e]);for(let $e of we){if(!($e.a===et[0]&&$e.b===et[1]||$e.a===et[1]&&$e.b===et[0]))continue;let ct=ye+(1-ye)*Math.max(0,Math.min(1,xe.strength));$e.mesh.material.opacity=Math.max($e.mesh.material.opacity,ct),$e.mesh.material.depthWrite=ct>.999}}}}}let ko=[],Ho=new _i(1,1,1,8),R=new si(.006,8,6),Z=new pn,re=Number.isFinite(t.fps)&&t.fps>0?t.fps:60,se=new Map,K=0;for(let N of new Set([...W,"golf_club_head"])){let $=A.indexOf(N),fe=new Float64Array(_.length);for(let _e=1;_e<_.length;_e++){let xe=_[_e-1]?.[$],we=_[_e]?.[$];!Yt(xe)||!Yt(we)||(fe[_e]=Math.hypot(we[0]-xe[0],we[1]-xe[1],we[2]-xe[2])*re,K=Math.max(K,fe[_e]))}se.set(N,fe)}W.forEach(N=>{let $=A.indexOf(N),fe=[],_e=[];for(let ye=I;ye<=ee;ye++){let Ke=_[ye]?.[$];if(!Yt(Ke))continue;let et=le(Ke);_e.push({point:et,frame:ye});let $e=_[ye-1]?.[$];if(ye===I||!Yt($e))continue;let ct=le($e),Qe=et.clone().sub(ct),Ht=Qe.length();Ht>1e-6&&fe.push({from:ct,to:et,delta:Qe,length:Ht,frame:ye})}let xe=Ze("#ffffff");xe.transparent=!0,xe.depthWrite=!1;let we={playbackFrame:{value:z},historyFrames:{value:Math.max(1,(ee-I+1)*.3)}};xe.userData.playbackFrame=we.playbackFrame,xe.onBeforeCompile=ye=>{f&&(ye.vertexShader=`attribute vec3 trailFrom; attribute vec3 trailTo; varying vec3 trailPoint;
`+ye.vertexShader,ye.vertexShader=ye.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
trailPoint=mix(trailFrom,trailTo,position.y+0.5);`),ye.fragmentShader=`varying vec3 trailPoint; uniform vec3 paneAnchor; uniform vec3 paneAlong; uniform vec3 paneRise0; uniform vec3 paneRise1; uniform float paneSide; uniform float offPlaneTolerance; uniform vec3 toleranceColor; uniform vec3 insideColor; uniform vec3 outsideColor; uniform vec3 futureColor;
`+ye.fragmentShader,Object.assign(ye.uniforms,{paneAnchor:{value:new D(...pe[0].corners[0])},paneAlong:{value:new D(...pe[0].along)},paneRise0:{value:new D(...pe[0].rise)},paneRise1:{value:new D(...pe[1].rise)},paneSide:{value:pe[0].side},offPlaneTolerance:{value:Ye},toleranceColor:{value:new Je("#4e9b70")},insideColor:{value:new Je("#477db8")},outsideColor:{value:new Je("#c45b62")},futureColor:{value:new Je("#92999f")}})),ye.vertexShader=`attribute float historyFrame;
varying float trailAge;
`+ye.vertexShader,ye.vertexShader=ye.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
trailAge = historyFrame;`),ye.fragmentShader=`uniform float playbackFrame;
uniform float historyFrames;
varying float trailAge;
`+ye.fragmentShader,ye.fragmentShader=ye.fragmentShader.replace("#include <color_fragment>",f?`#include <color_fragment>
vec3 offset=trailPoint-paneAnchor;
float cosine=dot(paneRise0,paneRise1),denominator=max(1e-10,1.0-cosine*cosine);
float u=(dot(offset,paneRise0)-cosine*dot(offset,paneRise1))/denominator;
float v=(dot(offset,paneRise1)-cosine*dot(offset,paneRise0))/denominator;
float x=dot(offset,paneAlong);
bool inside=x>=-1e-6&&x<=paneSide+1e-6&&u>=-1e-6&&v>=-1e-6&&u+v<=paneSide+1e-6;
// Distance to the nearest finite pane, measured perpendicular to its surface
// when the projection lies inside it; edges use the true Euclidean distance.
vec3 nearest0=paneAlong*clamp(x,0.0,paneSide)+paneRise0*clamp(dot(offset,paneRise0),0.0,paneSide);
vec3 nearest1=paneAlong*clamp(x,0.0,paneSide)+paneRise1*clamp(dot(offset,paneRise1),0.0,paneSide);
bool nearPlane=min(length(offset-nearest0),length(offset-nearest1))<offPlaneTolerance;
bool finished=trailAge<=playbackFrame;
diffuseColor.rgb=finished?(inside?insideColor:(nearPlane?toleranceColor:outsideColor)):futureColor;
diffuseColor.a*=finished?1.0:0.5;`:`#include <color_fragment>
float age = playbackFrame - trailAge;
if (age < 0.0 || age >= historyFrames) discard;
diffuseColor.a *= 1.0 - age / historyFrames;`),ye.uniforms.playbackFrame=we.playbackFrame,ye.uniforms.historyFrames=we.historyFrames,xe.userData.shader=ye};for(let[ye,Ke,et]of[[fe,Ho,!0],[_e,R,!1]]){if(!ye.length)continue;let $e=Ke.clone();$e.setAttribute("historyFrame",new _r(new Float32Array(ye.map(Qe=>Qe.frame)),1)),f&&($e.setAttribute("trailFrom",new _r(new Float32Array(ye.flatMap(Qe=>(et?Qe.from:Qe.point).toArray())),3)),$e.setAttribute("trailTo",new _r(new Float32Array(ye.flatMap(Qe=>(et?Qe.to:Qe.point).toArray())),3)));let ct=new xo($e,xe,ye.length);ye.forEach((Qe,Ht)=>{Z.position.copy(et?Qe.from.clone().add(Qe.to).multiplyScalar(.5):Qe.point),Z.quaternion.identity(),Z.scale.set(1,1,1),et&&(Z.quaternion.setFromUnitVectors(rr,Qe.delta.clone().normalize()),Z.scale.set(.006,Qe.length,.006)),Z.updateMatrix(),ct.setMatrixAt(Ht,Z.matrix);let wt=K>0?se.get(N)[Qe.frame]/K:0;ct.setColorAt(Ht,new Je().setHSL((1-wt)*2/3,1,.5))}),ct.instanceMatrix.needsUpdate=!0,ct.instanceColor.needsUpdate=!0,ct.computeBoundingSphere(),ct.receiveShadow=!f,ct.visible=!0,ze.add(ct),ko.push({mesh:ct,frames:ye.map(Qe=>Qe.frame)})}});let Me=[],Ue=Math.max(1,Math.round(re*.1)),Ve=Math.max(1,(ee-I+1)*.3),Ge=se.get("golf_club_head")||se.get(W[0]);for(let N=I;!f&&N<=ee;N+=Ue){let $=[];for(let[we,ye]of M){if(!Yt(_[N]?.[we])||!Yt(_[N]?.[ye]))continue;let Ke=le(_[N][we]),et=le(_[N][ye]),$e=et.clone().sub(Ke),ct=$e.length();ct>1e-6&&$.push({from:Ke,to:et,delta:$e,length:ct})}if(!$.length)continue;let fe=K>0&&Ge?Ge[N]/K:0,_e=Ze(new Je().setHSL((1-fe)*2/3,1,.5));_e.transparent=!0,_e.depthWrite=!1;let xe=new xo(Ho,_e,$.length);$.forEach((we,ye)=>{Z.position.copy(we.from).add(we.to).multiplyScalar(.5),Z.quaternion.setFromUnitVectors(rr,we.delta.clone().normalize()),Z.scale.set(.0035,we.length,.0035),Z.updateMatrix(),xe.setMatrixAt(ye,Z.matrix)}),xe.instanceMatrix.needsUpdate=!0,xe.computeBoundingSphere(),xe.receiveShadow=!0,c&&(xe.renderOrder=1.5),ze.add(xe),Me.push({mesh:xe,frame:N})}let nt=le([P,Se+_n*ce,S]),ut=r?Math.max(0,...Object.values(w||{}).filter(N=>Yt(N.t)).map(N=>Math.max(Math.abs(N.t[0]-P),Math.abs(N.t[2]-S)))):0,_t=2*(r?Math.max(j,ut+Math.max(ot,.25*ce)):j)/ce,ht=new it(new Ii(_t,.025,_t),new Qi({color:"#e2eadf",roughness:.95,transparent:!1}));ht.position.copy(nt),ht.position.y-=.0125,ht.receiveShadow=!0,ht.renderOrder=-20,ze.add(ht);let Rt=_t/2,hn=ot/ce*(r&&!c?2:1),Et=[];for(let N=-Math.floor(Rt/hn);N<=Math.floor(Rt/hn);N++){let $=N*hn;Et.push($,0,-Rt,$,0,Rt,-Rt,0,$,Rt,0,$)}let qe=new Mt;qe.setAttribute("position",new rt(Et,3));let tn=new Vr(qe,new Dn({color:"#c5d1c0"}));tn.position.copy(nt),tn.position.y+=.001,tn.renderOrder=-19,ze.add(tn);let vt=[],An=[],Qn=new Map,Tn=[],ki=new Map,mt="free-view",Lt,di,gn,Gn=0,Un=0,wi=new yn;ze.add(wi);let fi=[];fi.push(()=>Q.dispose());let hh=[],tm=Ze("#46545a"),nm=Ze("#283438"),im=new _i(1,1,1,12),rm=new si(1,16,10);function dh(N){let $=new it(im,tm);return $.castShadow=$.receiveShadow=!0,N.add($),$}function fh(N,$,fe,_e){let xe=fe.clone().sub($);N.position.copy($).add(fe).multiplyScalar(.5),N.quaternion.setFromUnitVectors(rr,xe.clone().normalize()),N.scale.set(_e,xe.length(),_e)}function sm(N){for(let $ of hh){let fe=$.position.clone(),_e=Math.max(.03,fe.y-N),xe=fe.clone();xe.y=N+_e*.65,fh($.column,fe,xe,.012);for(let we=0;we<3;we++){let ye=we*Math.PI*2/3+Math.PI/6,Ke=Math.min(.22,_e*.35),et=new D(fe.x+Math.cos(ye)*Ke,N+.009,fe.z+Math.sin(ye)*Ke);fh($.legs[we],xe,et,.009),$.feet[we].position.copy(et),$.feet[we].scale.set(.018,.009,.018)}}}let Zr=Re;for(let[N,$]of Object.entries(r||p?w||{}:{})){let{R:fe,t:_e}=$;if(!Array.isArray(fe)||fe.length!==3||!fe.every(At=>Yt(At))||!Yt(_e))continue;let xe=At=>fe.map(on=>on.reduce((ei,Hi,qo)=>ei+Hi*At[qo],0)),ye=le(_e);Zr=Math.max(Zr,ye.length()+.25);let Ke=At=>{let on=xe(At);return new D(on[0],-on[1],-on[2])},et=Ke([1,0,0]),$e=Ke([0,-1,0]),ct=Ke([0,0,-1]);if(!r){let At=new Jt().setFromRotationMatrix(new bt().makeBasis(et,$e,ct));Qn.set(N,{position:ye.clone(),rotation:At,K:$.intrinsic,video:o[N]});continue}let Qe=new yn;Qe.position.copy(ye),Qe.quaternion.setFromRotationMatrix(new bt().makeBasis(et,$e,ct)),wi.add(Qe);let Ht=new yn;Ht.userData.cameraView=N,ze.add(Ht),An.push(Ht);let Rn={position:new D(0,-.045,.045).applyQuaternion(Qe.quaternion).add(ye),column:dh(Ht),legs:[],feet:[]};for(let At=0;At<3;At++){Rn.legs.push(dh(Ht));let on=new it(rm,nm);on.castShadow=on.receiveShadow=!0,Ht.add(on),Rn.feet.push(on)}hh.push(Rn);let pi=Ze(N==="face-on"?"#ef4444":"#3b82f6"),Fe=Ze("#34474b"),tt=(At,on,ei)=>{let Hi=new it(At,on);return Hi.position.set(...ei),Hi.castShadow=Hi.receiveShadow=!0,Qe.add(Hi),Hi};tt(new Ii(.18,.12,.09),pi,[0,0,.045]),tt(new Ii(.055,.04,.055),Fe,[.045,.078,.045]),tt(new Ii(.035,.09,.072),Fe,[-.097,-.005,.045]);let Dt=tt(new _i(.048,.04,.084,32,1,!0),Fe,[0,0,-.04]);Dt.rotation.x=Math.PI/2;let Gt=tt(new vo(.034,24),new Qi({color:"#69b8ce",metalness:.55,roughness:.16}),[0,0,-.082]);Gt.rotation.y=Math.PI;let dn=tt(new bo(.034,.04,32),Fe,[0,0,-.082]);dn.rotation.y=Math.PI;let qs=Ke([0,0,1]).normalize(),Cr=Be.length?le([P,G(Be.map(At=>At[1])),S]):new D,sn=ye.distanceTo(Cr)/3,Xt=$.intrinsic,Vo=Xt?.[0]?.[0]>0?Math.min(.7,Xt[0][2]/Xt[0][0]):.35,Go=Xt?.[1]?.[1]>0?Math.min(.7,Xt[1][2]/Xt[1][1]):.35,Wo=[[-Vo,-Go],[Vo,-Go],[Vo,Go],[-Vo,Go]].map(([At,on])=>new D(At*sn,on*sn,-sn)),Lh=[];for(let At=0;At<4;At++)Lh.push(0,0,0,...Wo[At].toArray(),...Wo[At].toArray(),...Wo[(At+1)%4].toArray());let Dh=new Mt;Dh.setAttribute("position",new rt(Lh,3)),Qe.add(new Vr(Dh,new Dn({color:"#78a84a",transparent:!0,opacity:.8}))),Qe.children.forEach(At=>{At.userData.cameraView=N}),An.push(...Qe.children);for(let At of Wo){let on=At.clone().applyQuaternion(Qe.quaternion).add(ye);Zr=Math.max(Zr,on.length()+.15)}Qn.set(N,{position:ye.clone(),rotation:Qe.quaternion.clone(),K:$.intrinsic,video:o[N]});let Xo=a[N]??{joints:Bo,pred:[]};d&&!f&&Xo?.joints&&Xo?.pred&&vt.push({view:N,raw:Xo,mapping:Bo.map(At=>Xo.joints.indexOf(At)),overlayColor:"#ffce69",K:Xt,depth:sn,group:Qe});let vn=o[N];if(vn){let At=v?mp(vn,{names:Bo,edges:Zp,getPose:or=>{let Ys=vt.find(Ic=>Ic.view===N);return Ys?.mapping.map(Ic=>Ys.raw.pred[or]?.[Ic])}}):pp(vn);Tn.push(At);let on=new $t({map:At,side:Vt,toneMapped:!1,transparent:!0,opacity:c||v?1:.3,depthWrite:!1});c&&(on.depthTest=!1);let ei=new it(new yr(1,1),on);c&&(ei.renderOrder=1);let Hi=()=>{let or=Number(vn.dataset.sourceWidth)||vn.videoWidth||Xt[0][2]*2,Ys=Number(vn.dataset.sourceHeight)||vn.videoHeight||Xt[1][2]*2;ei.scale.set(or*sn/Xt[0][0],Ys*sn/Xt[1][1],1),ei.position.set((or/2-Xt[0][2])*sn/Xt[0][0],-(Ys/2-Xt[1][2])*sn/Xt[1][1],-sn),At.needsUpdate=!0,ph(),Kt()};Qe.add(ei),ei.visible=!1,ki.set(N,{texture:At,screen:ei,frame:null});let qo=()=>{vn.readyState>=2&&Hi()};for(let or of["loadeddata","resize"])vn.addEventListener(or,qo);fi.push(()=>{for(let or of["loadeddata","resize"])vn.removeEventListener(or,qo)});let Uh=()=>{};vn.addEventListener("seeked",Uh),fi.push(()=>vn.removeEventListener("seeked",Uh));let Fh=Number(vn.dataset.sourceWidth)||vn.videoWidth||Xt[0][2]*2,Nh=Number(vn.dataset.sourceHeight)||vn.videoHeight||Xt[1][2]*2;ei.scale.set(Fh*sn/Xt[0][0],Nh*sn/Xt[1][1],1),ei.position.set((Fh/2-Xt[0][2])*sn/Xt[0][0],-(Nh/2-Xt[1][2])*sn/Xt[1][1],-sn)}}let vc=1/0;for(let N of _)for(let $=0;$<N.length;$++)Yt(N[$])&&(vc=Math.min(vc,le(N[$]).y-_n));function ph(){wi.updateWorldMatrix(!0,!0);let N=new ii().setFromObject(wi),fe=Math.min(vc,N.isEmpty()?1/0:N.min.y)-.002;ht.position.y=fe-.0125,tn.position.y=fe+.001,sm(fe)}if(ph(),f){let N=pe,$=new yn;$.name="hogan-planes";let fe=document.createElement("canvas");fe.width=256,fe.height=128;let _e=fe.getContext("2d"),xe=_e.createLinearGradient(0,0,0,128);xe.addColorStop(0,"#b5cfdf"),xe.addColorStop(.46,"#e8f1ee"),xe.addColorStop(.52,"#a6b6a1"),xe.addColorStop(1,"#55644f"),_e.fillStyle=xe,_e.fillRect(0,0,256,128);for(let[ye,Ke,et]of[[42,28,.9],[171,45,.65]]){let $e=_e.createLinearGradient(ye-Ke,0,ye+Ke,0);$e.addColorStop(0,"rgba(255,255,255,0)"),$e.addColorStop(.5,`rgba(255,255,255,${et})`),$e.addColorStop(1,"rgba(255,255,255,0)"),_e.fillStyle=$e,_e.fillRect(ye-Ke,12,Ke*2,70)}let we=new Cs(fe);we.mapping=uo,we.colorSpace=xn,fi.push(()=>we.dispose()),N.forEach((ye,Ke)=>{let et=new Mt;et.setAttribute("position",new rt(ye.corners.flat(),3)),et.setIndex([0,1,2,0,2,3]),et.computeVertexNormals(),et.setAttribute("uv",new rt([0,0,1,0,1,1,0,1],2));let $e=Ke?"#e6ad53":"#68adc6",ct=new $t({color:$e,transparent:!0,opacity:.23,side:Vt,depthWrite:!1}),Qe=new it(et,ct);Qe.name=ye.name,Qe.receiveShadow=!1,$.add(Qe);let Ht=new Li(new Mt().setFromPoints([1,2,3,0].map(Rn=>new D(...ye.corners[Rn]))),new Dn({color:$e,transparent:!0,opacity:.65,depthWrite:!1}));$.add(Ht);let wt=new Wa({color:Ke?"#c3c7b6":"#a8cfce",transparent:!0,opacity:.48,roughness:.08,metalness:.1,envMap:we,envMapIntensity:1.2,depthWrite:!1});for(let[Rn,Xs]of[[0,1],[1,2],[2,3],[3,0]]){if(Ke&&Rn===0&&Xs===1)continue;let pi=new _o(new D(...ye.corners[Rn]),new D(...ye.corners[Xs]));$.add(new it(new Ga(pi,1,.003,6,!1),wt))}}),$.add(new Li(new Mt().setFromPoints(N[0].corners.slice(0,2).map(ye=>new D(...ye))),new Dn({color:"#739c9b",transparent:!0,opacity:.8,depthWrite:!1}))),ze.add($),J.dataset.hoganPlanes=JSON.stringify(N)}ht.visible=tn.visible=!c;let Si=new yn;Si.visible=r&&!c,ze.add(Si);let om=new bo(.994,1.006,192),am=new vo(1.22,48);function mh(N){let $=new it(om,new $t({color:N,toneMapped:!1,side:Vt}));return $.rotation.x=-Math.PI/2,Si.add($),$}function bc(N){let $=new it(am,new $t({color:N,toneMapped:!1,side:Vt}));return $.rotation.x=-Math.PI/2,Si.add($),$}function gh(N){let $=new Mt;$.setAttribute("position",new rt(new Float32Array(12),3)),$.setIndex([0,1,2,0,2,3]);let fe=new it($,new $t({color:N,toneMapped:!1,side:Vt}));return fe.frustumCulled=!1,Si.add(fe),fe}let xh=[];for(let[N,$]of Qn){let fe=N==="face-on"?"#ef4444":"#3b82f6";xh.push({position:$.position,ring:mh(fe),marker:bc(fe),connection:gh(fe)})}let Mc=bc("#63f5b4");Mc.scale.set(.06,.06,1);let wc=new Vr(new Mt().setFromPoints([new D(-.065,0,0),new D(.065,0,0),new D(0,0,-.065),new D(0,0,.065)]),new Dn({color:"#63f5b4",toneMapped:!1}));Si.add(wc);let yh=mh("#63f5b4"),Sc=bc("#63f5b4"),_h=gh("#63f5b4"),Ec=new Vr(new Mt().setFromPoints([new D(-.045,0,0),new D(.045,0,0),new D(0,0,-.045),new D(0,0,.045)]),new Dn({color:"#63f5b4",toneMapped:!1}));Si.add(Ec),Si.traverse(N=>{N.material&&(N.renderOrder=10,N.frustumCulled=!1,N.material.transparent=!1,N.material.depthWrite=!0,N.material.depthTest=!0,N.material.polygonOffset=!0,N.material.polygonOffsetFactor=-2,N.material.polygonOffsetUnits=-2)});for(let N of[yh,Sc,_h,Ec,Mc,wc])N.visible=!1;function cm(){if(!Si.visible)return;let N=ht.position.y+.0125+.003;Mc.position.set(0,N,0),wc.position.set(0,N,0);let $=(fe,_e,xe,we)=>{let ye=Math.hypot(we.x,we.z);fe.position.set(0,N,0),fe.scale.set(ye,ye,1),_e.position.set(we.x,N,we.z),_e.scale.set(.055,.055,1);let Ke=Math.hypot(we.x,we.z)||1;(($e,ct,Qe)=>{let Ht=$e.geometry.attributes.position,wt=-we.z/Ke*ct,Rn=we.x/Ke*ct;Ht.setXYZ(0,wt,Qe,Rn),Ht.setXYZ(1,we.x+wt,Qe,we.z+Rn),Ht.setXYZ(2,we.x-wt,Qe,we.z-Rn),Ht.setXYZ(3,-wt,Qe,-Rn),Ht.needsUpdate=!0})(xe,.008,N)};xh.forEach(fe=>$(fe.ring,fe.marker,fe.connection,fe.position)),$(yh,Sc,_h,L.position),Ec.position.copy(Sc.position)}let vh=[...he],Jr=new ii().setFromObject(wi);if(!Jr.isEmpty())for(let N of[Jr.min.x,Jr.max.x])for(let $ of[ht.position.y,Jr.max.y])for(let fe of[Jr.min.z,Jr.max.z])vh.push(new D(N,$,fe));let bh=_.slice(I,ee+1).flatMap(N=>N.filter(($,fe)=>!C(fe)&&Yt($)).map(le));if(wi.updateWorldMatrix(!0,!0),wi.traverse(N=>{if(!N.isMesh)return;N.geometry.computeBoundingBox();let $=N.geometry.boundingBox;for(let fe of[$.min.x,$.max.x])for(let _e of[$.min.y,$.max.y])for(let xe of[$.min.z,$.max.z])bh.push(new D(fe,_e,xe).applyMatrix4(N.matrixWorld))}),v){let N=new Je("#f4f7f0");ht.material.color.lerp(N,.55),tn.material.color.lerp(ht.material.color,.7),Si.traverse($=>{$.material?.color&&$.material.color.lerp(N,.75)})}let lm=new D(Math.sin(-.65)*Math.cos(.3),Math.sin(.3),Math.cos(-.65)*Math.cos(.3)),Kr=!c,Ei=0,Ai=0;te=1,Object.keys(o).length&&(V=-.65,k=.3);let Wn=F?Sp(Kt):null;Wn&&fi.push(()=>Wn.dispose());let Mh=0,wh=0,Sh,Eh,sr;function Kt(){let N=J.clientWidth,$=J.clientHeight;if(!N||!$)return;(N!==Mh||$!==wh)&&(Te.setSize(N,$,!1),Mh=N,wh=$),L.aspect=N/$;let fe=Wn?.zoom??O,_e=Wn?.panX??Ei,xe=Wn?.panY??Ai;L.zoom=fe*je*(mt==="free-view"?6:1);let we=i.querySelector(".snapshot-bottom-strip"),ye=Mf($,we?.offsetTop??$,_e,xe);(Kr||we)&&L.setViewOffset(N,$,ye.offsetX,ye.offsetY,N,$),L.fov=45;let Ke=On.degToRad(L.fov/2),et=Math.min(Ke,Math.atan(Math.tan(Ke)*L.aspect)),$e=Math.max(Re,Zr*.85)*te/(Math.sin(et)*.84),ct=He.clone();if(m==="hip-translation"){let Fe=y.reconstruction[0],tt=y.joints,Dt=Fe[tt.indexOf("root")]??Fe[tt.indexOf("left_hip")].map((Gt,dn)=>(Gt+Fe[tt.indexOf("right_hip")][dn])/2);ct.copy(le(Dt))}let Qe;if(F&&Oe){let Fe=le(Oe.direction.map((Gt,dn)=>Gt+de[dn])).normalize(),tt=le(Oe.up.map((Gt,dn)=>Gt+de[dn])).normalize(),Dt=Wn.orient(Fe,tt);Qe={direction:Fe,up:tt,verticalHalfFov:Ke,aspect:L.aspect,manual:Dt},$e=Oo(he,ct,Fe,tt,Ke,L.aspect)*te}if(h&&mt==="free-view"){if(Eh!==L.aspect){let Fe=Object.keys(o).length?-.65:0,tt=Object.keys(o).length?.3:0,Dt=new D(Math.sin(Fe)*Math.cos(tt),Math.sin(tt),Math.cos(Fe)*Math.cos(tt));Sh=Oo(he,ct,Dt,new D(0,1,0),Ke,L.aspect),Eh=L.aspect}$e=Sh*te}if(xt){let Fe=Rp(xt,le,et,$e,ct,je,Qe);ct.copy(Fe.target),$e=Fe.distance,L.zoom=fe*Fe.zoom}mt==="free-view"&&($e=6*te*Oo(vh,new D,lm,new D(0,1,0),Ke,L.aspect,.94)),L.near=mt==="free-view"?Math.max(.01,$e*.1):.01,L.far=Math.max(100,$e+Zr*5);let Ht=ht.position.y+.0125+.02;mt==="free-view"&&(k=Math.max(k,Math.asin(Math.max(-.999,Math.min(.999,Ht/$e))))),L.position.set($e*Math.sin(V)*Math.cos(k),$e*Math.sin(k),$e*Math.cos(V)*Math.cos(k)),L.position.add(ct),L.up.set(0,1,0),L.lookAt(ct),L.fov=45,An.forEach(Fe=>{Fe.visible=c||Fe.userData.cameraView===mt?!1:mt==="free-view"||Lt&&Lt.progress<.75});let wt=Qn.get(mt);if(wt){let Fe=Number(wt.video?.dataset.sourceWidth)||wt.video?.videoWidth||wt.K[0][2]*2,tt=Number(wt.video?.dataset.sourceHeight)||wt.video?.videoHeight||wt.K[1][2]*2,Dt=new Jt().setFromEuler(new Nn(Un,Gn,0,"YXZ")),Gt=wt.rotation.clone().multiply(Dt).multiply(wt.rotation.clone().invert());L.position.copy(wt.position).multiplyScalar(te).applyQuaternion(Gt),L.quaternion.copy(Gt).multiply(wt.rotation),L.fov=On.radToDeg(2*Math.atan(c?Fe/(2*wt.K[0][0]*L.aspect):Math.max(tt/(2*wt.K[1][1]),Fe/(2*wt.K[0][0]*L.aspect))))}if(wt&&we&&(L.zoom*=ye.cameraZoomScale*.9),L.zoom*=g,wt&&m==="hip-translation"){L.setViewOffset(N,$,ye.offsetX+_e,ye.offsetY+xe,N,$),uh(L,Ht),L.updateProjectionMatrix(),L.updateMatrixWorld(!0);let Fe=ct.clone().project(L),tt=wf(N,$,ye,Fe);L.setViewOffset(N,$,tt.offsetX,tt.offsetY,N,$)}let Rn=L.view?.offsetX??ye.offsetX,Xs=L.view?.offsetY??ye.offsetY;if(Lt){let Fe=Lt.progress;L.near=On.lerp(Lt.near,L.near,Fe),Lt.freeTransition?gp(L,Lt,Fe):(L.position.lerpVectors(Lt.position,L.position,Fe),$p(L.quaternion,Lt.rotation,L.quaternion,Fe),L.fov=On.lerp(Lt.fov,L.fov,Fe),L.zoom=On.lerp(Lt.zoom,L.zoom,Fe)),(Kr||we)&&L.setViewOffset(N,$,On.lerp(Lt.offsetX,Rn,Fe),On.lerp(Lt.offsetY,Xs,Fe),N,$)}if(Oe){let{direction:Fe}=Qe,tt=Qe.manual.up,Dt=ve?le(ve):ct,Gt=ct.clone().addScaledVector(Fe,$e);L.position.copy(Wn.orbitPoint(Gt,Dt)),L.up.copy(tt);let dn=Wn.orbitPoint(ct,Dt);jp(L.position,Dt,Ht),L.lookAt(dn)}else uh(L,Ht);if(L.updateProjectionMatrix(),!sr||sr.w!==N||sr.h!==$||sr.stripTop!==(we?.offsetTop??$)){let Fe=L.zoom,tt=L.view?.offsetX??0,Dt=L.view?.offsetY??0;L.updateMatrixWorld(!0);let Gt=()=>bh.map(Xt=>Xt.clone().project(L)),dn=ju(Gt()),qs=1-Math.max(1,we?.offsetTop??$)/$,Cr=()=>ju(Gt(),.08,0,qs);L.setViewOffset(N,$,(L.view?.offsetX??0)+dn.centerX*N/2,(L.view?.offsetY??0)-dn.centerY*$/2,N,$),L.updateProjectionMatrix(),L.zoom*=Cr().zoomFactor,L.updateProjectionMatrix();let sn=Cr();L.setViewOffset(N,$,(L.view?.offsetX??0)+(sn.centerX-sn.targetX)*N/2,(L.view?.offsetY??0)+(sn.targetY-sn.centerY)*$/2,N,$),L.updateProjectionMatrix(),sr={w:N,h:$,stripTop:we?.offsetTop??$,factor:L.zoom/Fe,x:(L.view.offsetX-tt)/N,y:(L.view.offsetY-Dt)/$}}else L.zoom*=sr.factor,L.setViewOffset(N,$,(L.view?.offsetX??0)+sr.x*N,(L.view?.offsetY??0)+sr.y*$,N,$),L.updateProjectionMatrix();cm(),ht.material.opacity=1,ht.material.depthWrite=!0,tn.material.transparent=!1,tn.material.opacity=1,tn.material.depthWrite=!0;let pi=_[z];for(let{a:Fe,b:tt,mesh:Dt}of Er){if(Dt.visible=jr>.001&&Yt(pi[Fe])&&Yt(pi[tt]),!Dt.visible)continue;let Gt=le(pi[Fe]),dn=le(pi[tt]),qs=dn.clone().sub(Gt),Cr=qs.length();Dt.visible=Cr>1e-8,Dt.visible&&(Vs?hi.placeBone(Dt,Gt,dn):(Dt.position.copy(Gt).add(dn).multiplyScalar(.5),Dt.quaternion.setFromUnitVectors(rr,qs.normalize()),Dt.scale.set(St,Cr,St)))}Ar.forEach((Fe,tt)=>{Fe&&(Fe.visible=jr>.001&&Yt(pi[tt]),Fe.visible&&(c?Fe.position.copy(le(pi[tt])):hi.placeJoint(Fe,le(pi[tt]))))});for(let Fe of ko){let tt=0,Dt=Fe.frames.length;for(;tt<Dt;){let Gt=tt+Dt>>>1;Fe.frames[Gt]<=z?tt=Gt+1:Dt=Gt}Fe.mesh.count=f?Fe.frames.length:tt,Fe.mesh.material.userData.playbackFrame.value=z}for(let Fe of Me){let tt=z-Fe.frame;Fe.mesh.visible=tt>0&&tt<Ve,Fe.mesh.visible&&(Fe.mesh.material.opacity=.75*(1-tt/Ve))}if(L.updateMatrixWorld(),v){ze.updateMatrixWorld(!0);for(let Fe of vt){let tt=Fe.group.localToWorld(new D(0,0,-Fe.depth)).project(L),Dt=Fe.group.localToWorld(new D(Fe.depth/Fe.K[0][0],0,-Fe.depth)).project(L),Gt=Fe.group.localToWorld(new D(0,Fe.depth/Fe.K[1][1],-Fe.depth)).project(L),dn=Math.max(Math.hypot((Dt.x-tt.x)*N/2,(Dt.y-tt.y)*$/2),Math.hypot((Gt.x-tt.x)*N/2,(Gt.y-tt.y)*$/2));ki.get(Fe.view)?.texture.setImageScale(dn)}}Q.render({camera:L,scene:ze,overlays:v?[]:vt,frame:z,w:N,h:$}),J.dataset.frame=String(z),Ee?.(L,N,$),Nt()}let um=N=>!Number.isFinite(N)||N<=0?O:h?N:Math.max(.4,N),Ah=N=>{let $=um(O*N),fe=$/O;Ei*=fe,Ai*=fe,O=$};if(F)fi.push(Ap(J,N=>Wn.zoomBy(N),(N,$)=>Wn.pan(N,$),(N,$)=>Wn.rotate(N,$),()=>Wn.canRotate));else{let N=new Map,$=()=>{let[_e,xe]=[...N.values()];return Math.hypot(_e.x-xe.x,_e.y-xe.y)};J.onpointerdown=_e=>{Lt||_e.pointerType==="mouse"&&_e.button!==0&&!(Kr&&_e.button===2)||(_e.preventDefault(),N.set(_e.pointerId,{x:_e.clientX,y:_e.clientY,button:_e.button}),J.setPointerCapture(_e.pointerId))},J.onpointermove=_e=>{let xe=N.get(_e.pointerId);if(!xe)return;let we=N.size===2?$():0,ye=_e.clientX-xe.x,Ke=_e.clientY-xe.y;if(N.set(_e.pointerId,{x:_e.clientX,y:_e.clientY,button:xe.button}),N.size===2){let et=$();we>0&&Ah(et/we),Kr&&(Ei+=ye/2,Ai+=Ke/2)}else if(N.size===1)if(Kr&&xe.button===2)Ei+=ye,Ai+=Ke;else if(mt==="free-view")V-=ye*.01,k=Math.max(-1.4,Math.min(1.4,k+Ke*.01));else{let et=h?.01:8e-4/Math.max(1,O);Gn-=ye*et,Un=Math.max(-1.4,Math.min(1.4,Un-Ke*et))}Kt()},Kr&&J.addEventListener("contextmenu",_e=>_e.preventDefault());let fe=_e=>N.delete(_e.pointerId);J.onpointerup=J.onpointercancel=J.onlostpointercapture=fe,J.addEventListener("wheel",_e=>{_e.preventDefault(),!Lt&&(Ah(Math.exp(-_e.deltaY*(_e.ctrlKey?.01:.001))),Kt())},{passive:!1})}let Th=new ResizeObserver(Kt);Th.observe(J),Kt();let Ac,Tc=!1,Rh=!0,Xn,Rc={setView(N,{animate:$=!0}={}){let fe=Qn.has(N)?N:"free-view",_e=fe===mt,xe=_e&&fe==="free-view",we=Object.keys(o).length?-.65:0,ye=Object.keys(o).length?.3:0;if(_e&&!Lt&&(xe?V===we&&k===ye:Gn===0&&Un===0)&&Ei===0&&Ai===0&&(fe==="free-view"||te===1))return;let et=O;cancelAnimationFrame(di);let $e={position:L.position.clone(),rotation:L.quaternion.clone(),fov:L.fov,near:L.near,zoom:L.zoom,offsetX:L.view?.offsetX||0,offsetY:L.view?.offsetY||0,progress:0,freeTransition:mt==="free-view"!=(fe==="free-view")};if(mt==="free-view"&&(gn={yaw:V,pitch:k,zoom:O,panX:Ei,panY:Ai}),fe!=="free-view"&&(te=1),mt=fe,Gn=Un=0,xe?(V=we,k=ye,Ei=Ai=0,O=et,gn={yaw:V,pitch:k,zoom:O,panX:Ei,panY:Ai}):fe==="free-view"&&gn?{yaw:V,pitch:k,zoom:O,panX:Ei,panY:Ai}=gn:(Ei=Ai=0,O=_e?et:1),!$||matchMedia("(prefers-reduced-motion: reduce)").matches){Lt=void 0,Kt();return}Lt=$e;let ct=performance.now();function Qe(Ht){if(Tc)return;let wt=Math.min(1,(Ht-ct)/1e3);$e.progress=wt*wt*wt*(wt*(wt*6-15)+10),wt===1&&(Lt=void 0),Kt(),wt<1&&(di=requestAnimationFrame(Qe))}di=requestAnimationFrame(Qe)},setDistance(N){let $=Number(N);Number.isFinite($)&&(cancelAnimationFrame(di),Lt=void 0,te=Math.max(.4,Math.min(3,$)),Kt())},setRawDetections(N,$){let fe=vt.find(_e=>_e.view===N);fe&&(fe.raw=$,fe.mapping=Bo.map(_e=>$.joints.indexOf(_e)),Kt())},presentFrame(N,$=[]){z=Math.max(I,Math.min(ee,Math.floor(N)));let fe=new Map($.map(_e=>[_e.name,_e.raw]));for(let[_e,xe]of ki)xe.screen.visible=fe.has(_e),xe.frame=fe.has(_e)?z:null,xe.screen.visible&&xe.texture.commit(z);J.dataset.syncState=JSON.stringify({frame:z,views:Object.fromEntries(fe)}),Xn?.setFrame(z),Kt()},setPlaying(N){Rh=!!N},setFrame(N){z=Math.max(I,Math.min(ee,Math.floor(N))),Xn?.setFrame(z),Kt()},setMetricSelection(N,$=[]){Xn?.setMetric(N,$),Kt()},setMeasurementSelection(N){Xn?.setSelection(N),Kt()},dispose(){cancelAnimationFrame(di),fi.forEach(fe=>fe()),Tc=!0,cancelAnimationFrame(Ac),Th.disconnect(),at?.dispose(),Te.dispose(),ft.singleScene&&Te.forceContextLoss();let N=new Set,$=new Set;ze.traverse(fe=>{fe.geometry&&N.add(fe.geometry),fe.material&&$.add(fe.material)}),N.forEach(fe=>fe.dispose()),$.forEach(fe=>{fe.map?.dispose(),fe.dispose()})}};if(c&&l&&(Xn=yp({scene:ze,toWorld:le,canvas:J,data:y,metrics:l,requestRender:Kt}),Ee=Xn.updateView,fi.push(()=>Xn.dispose())),h&&(Xn=zs({scene:ze,toWorld:le,canvas:J,data:y,metrics:h,requestRender:Kt,setPoses:Ws}),Ee=Xn.updateView,fi.push(()=>Xn.dispose())),x&&(m==="hip-translation"&&Ws(0,.35),Xn=lp({scene:ze,toWorld:le,canvas:J,data:y,metrics:x,feature:m,requestRender:Kt}),Ee=Xn.updateView,fi.push(()=>Xn.dispose())),F){let N=Xp(i,{id:e,poseData:y,metrics:u,entry:t,scene:ze,toWorld:le,setPoses:Ws,draw:Kt,canvas:J,navigation:Wn,setRotationPivot:$=>{ve=$},setCamera:$=>{Oe=$},setPairFocus:$=>{xt=$},setFocus:($,fe)=>{He.copy(le($)).multiplyScalar(fe),je=1+2.4*fe}});Ee=N.updateView,Kt(),fi.push(()=>N.dispose())}if(F&&(await new Promise(N=>requestAnimationFrame(()=>{Kt(),N()})),i.querySelector(".snapshot-placeholder")?.remove(),i.setAttribute("aria-busy","false")),!s)return Rc.setFrame(I),Rc;let hm=ee-I+1,Cc=z-I,Pc,Ch=!1,Ph=new IntersectionObserver(N=>{Ch=N[0].isIntersecting});Ph.observe(J);function Ih(N){if(Tc||!J.isConnected){Ph.disconnect();return}let $=Rh&&Ch&&!document.hidden&&!i.inert;if($&&Pc!==void 0){Cc=(Cc+(N-Pc)*re/1e3)%hm;let fe=I+Math.floor(Cc);fe!==z&&(z=fe,Kt())}Pc=$?N:void 0,Ac=requestAnimationFrame(Ih)}return Ac=requestAnimationFrame(Ih),Rc}function Kp(i,e,t,n=""){let r=document.createElement("div");r.className=`snapshot-info ${n}`;let s=document.createElement("button");s.className="snapshot-info-button",s.type="button",s.setAttribute("aria-label",e),s.setAttribute("aria-controls",i),s.setAttribute("aria-expanded","false");let o="http://www.w3.org/2000/svg",a=document.createElementNS(o,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("aria-hidden","true");for(let[u,h]of[["circle",{cx:12,cy:12,r:9,fill:"none",stroke:"currentColor","stroke-width":2}],["circle",{cx:12,cy:7,r:1,fill:"currentColor"}],["path",{d:"M12 11v6",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round"}]]){let p=document.createElementNS(o,u);for(let[f,g]of Object.entries(h))p.setAttribute(f,g);a.append(p)}s.append(a);let c=document.createElement("div");c.className="snapshot-info-panel",c.id=i,c.setAttribute("role","note"),c.setAttribute("aria-hidden","true"),c.inert=!0;for(let{gesture:u,action:h}of t){let p=document.createElement("p"),f=document.createElement("strong");f.textContent=`${u}: `,p.append(f,document.createTextNode(h)),c.append(p)}let l=u=>{c.classList.toggle("is-open",u),c.inert=!u,c.setAttribute("aria-hidden",String(!u)),s.setAttribute("aria-expanded",String(u))};return s.addEventListener("click",()=>l(s.getAttribute("aria-expanded")!=="true")),document.addEventListener("click",u=>{r.contains(u.target)||l(!1)}),document.addEventListener("keydown",u=>{u.key==="Escape"&&s.getAttribute("aria-expanded")==="true"&&(l(!1),s.focus())}),r.append(s,c),r}function Qp(i,{getTimes:e,onRequest:t,onSettled:n,requirePresentedFrame:r=!1}){let s=null,o=null,a=!1,c=!1,l,u,h=new Set,p=null;function f(){if(!(s!==null||o!==null||i.seeking)){for(let m of h)m();h.clear()}}function g(){if(o===null){x();return}if(!c||!a)return;clearTimeout(u),l!==void 0&&i.cancelVideoFrameCallback?.(l),l=void 0;let m=o;o=null,m!==null&&(p=m,n(m)),s!==null?x():f()}function x(){if(i.seeking||o!==null||s===null)return;let m=e(),d=s;s=null,o=d,a=!i.requestVideoFrameCallback,c=!1;let v=m[d],y=(m[d+1]??v+1/30)-v,_=v+Math.min(y/2,.01);if(Math.abs(i.currentTime-_)<1e-6&&(!r||p===d))a=!0,c=!0,g();else{if(i.requestVideoFrameCallback){let w=()=>{l=i.requestVideoFrameCallback((E,A)=>{if(l=void 0,A.mediaTime<v-1e-5||A.mediaTime>=v+y-1e-5){w();return}a=!0,g()})};w()}i.currentTime=_}}return i.addEventListener("seeked",()=>{c=!0,o!==null&&!a&&!r&&(clearTimeout(u),u=setTimeout(()=>{a=!0,g()},250)),g()}),{request(m){let d=Math.max(0,Math.min(e().length-1,m));s=d,t(d),x()},whenIdle(){return s===null&&o===null&&!i.seeking?Promise.resolve():new Promise(m=>h.add(m))},reset(){clearTimeout(u),l!==void 0&&i.cancelVideoFrameCallback?.(l),l=void 0,a=!1,c=!1,s=null,o=null;for(let m of h)m();h.clear()}}}var Hs=i=>Oh(i);var ir=(i,e,t)=>{let n=document.createElement(i);return e!==void 0&&(n.textContent=e),t&&(n.className=t),n};async function em(i,e,t,n,r){let s=ir("div",void 0,"snapshot-overview-header"),o=ir("div",void 0,"camera-view-options");o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshot POV"),o.append(ir("span","Select POV:","camera-view-label"));let a=Kp(`snapshot-gestures-${r}`,"Snapshot gestures",[{gesture:"Left mouse drag / one-finger drag",action:"Rotate the view."},{gesture:"Right mouse drag / two-finger drag",action:"Pan the view."},{gesture:"Scroll / pinch",action:"Zoom around the window center, including after panning."},{gesture:"Select the current POV again",action:"Recenter its position and rotation while keeping zoom. Free view remembers its orientation when switching views."}],"section-info"),c=[];for(let[G,B]of[["face-on","Face-on view"],["down-the-line","Down-the-line view"],["free-view","Free-view"]]){let Se=ir("button",B);Se.type="button",Se.disabled=!0,Se.setAttribute("aria-pressed",String(G==="free-view")),o.append(Se),c.push([Se,G])}s.append(ir("h3",n,"snapshot-feature-title"),o,a);let l=ir("div",void 0,"snapshot-overview-scene"),u=ir("p","Loading swing\u2026","snapshot-overview-status");u.setAttribute("role","status");let h=ir("div",void 0,"video-source-decoders");l.append(u),i.append(s,l,h);let p=n.toLowerCase(),f=p.startsWith("hogan's plane"),g=zh(n),x=!f&&!g;if(p!=="club movement"&&!f&&!g){u.remove(),i.dataset.ready="true";return}let m=Hs(`materials/data/3d_results/${encodeURIComponent(e)}.json`),d=g?Hs(`materials/data/metrics/${e}.json`):Promise.resolve(void 0);m.catch(()=>{}),d.catch(()=>{});let v=await Hs("materials/data/snapshot-videos.json"),y=v.find(G=>G.id===e);if(!y||y.alignmentError)throw new Error(y?.alignmentError||`Missing snapshot swing ${e}`);let _=await Hs(y.sync),w={},E=[],A=[],T=new Set,b=y.views.map(G=>({name:G.name,ready:()=>!1})),M=!1;for(let G of y.views){let B=ir("video");B.muted=B.defaultMuted=!0,B.playsInline=!0,B.preload="auto",B.setAttribute("muted",""),B.setAttribute("playsinline",""),B.setAttribute("aria-hidden","true"),B.tabIndex=-1,G.imageSize&&(B.dataset.sourceWidth=String(G.imageSize[0]),B.dataset.sourceHeight=String(G.imageSize[1])),w[G.name]=B,h.append(B)}let[C,F]=await Promise.all([d,m]),H=await Jp(l,e,{...t,joints:t.joints??["golf_club_head"],range:[0,y.frames-1],fps:y.fps},{poseData:F,showCameras:!0,autoPlay:!1,cameraVideos:w,hoganPlanes:f,defaultZoomScale:r==="banner-club"?2.5:g==="hip-translation"?10.5:1.25,measurementMetrics:C,measurementFeature:g,showRawDetections:x,compositeDetections:r==="banner-club"});y.views.forEach((G,B)=>{let Se=w[G.name];x&&Hs(`materials/data/2d_detections/${e}/${G.name}.json`).then(ne=>{M||(H.setRawDetections(G.name,{...ne,pred:_.mapping[G.name].map(We=>ne.pred[We])}),T.add(G.name))}).catch(ne=>console.warn("Snapshot 2D overlay unavailable",ne)),Hs(G.timing||G.src+".frames.json").then(ne=>{if(M)return;A[B]=ne;let We=null;E[B]=Qp(Se,{getTimes:()=>A[B],onRequest:()=>{},onSettled:Ie=>{We=Ie},requirePresentedFrame:!0}),Object.assign(b[B],{ready:()=>Se.readyState>=2&&!Se.error&&(!x||T.has(G.name)),decode:async Ie=>(We=null,E[B].request(Ie),await E[B].whenIdle(),We),reset:()=>E[B].reset()})}).catch(ne=>console.warn("Snapshot video timing unavailable",ne)),Se.addEventListener("error",()=>console.warn(`Snapshot video unavailable: ${G.name}`))}),l.querySelector("h4")?.remove();for(let[G,B]of c)G.disabled=!1,G.onclick=()=>{H.setView(B),c.forEach(([Se,ne])=>Se.setAttribute("aria-pressed",String(B===ne)))};u.remove(),i.dataset.ready="true";let q=!1,X=!1,I=0,ee=()=>{if(!(M||X||!q||window.previewPaused)){X=!0;for(let G of y.views){let B=w[G.name];B.src=G.src,B.load()}}},W=G=>{G.source!==parent||G.data?.type!=="preview-visibility"||!G.data.visible||($s(ee),cancelAnimationFrame(I),I=requestAnimationFrame(Y))};window.addEventListener("message",W),$s(()=>{q=!0,ee()});let[z,V]=t.range?.map((G,B)=>G===null?B?y.frames-1:0:G)??[0,y.frames-1],k=0,O,te=!1,U,J=new URLSearchParams(location.search).has("snapshotPerf"),Q=[],ge,ae,ie=Bh({streams:b,mapping:_.mapping,present:(G,B)=>{if(!M&&(ae=performance.now(),H.presentFrame(G,B),i.dataset.frame=String(G),J)){let Se=performance.now();if(ge!==void 0&&Q.push({gap:Se-ge,render:Se-ae,matched:B.length}),ge=Se,Q.length>120&&Q.shift(),Q.length&&Q.length%12===0){let ne=Q.map(Ie=>Ie.gap).sort((Ie,ot)=>Ie-ot),We=Q.map(Ie=>Ie.render).sort((Ie,ot)=>Ie-ot);i.dataset.playbackStats=JSON.stringify({samples:Q.length,medianGap:ne[Math.floor(ne.length*.5)],p95Gap:ne[Math.floor(ne.length*.95)],medianRender:We[Math.floor(We.length*.5)],matched:B.length})}}},onDrop:(G,B)=>console.warn(`Snapshot camera withdrawn until ready: ${G}`,B)}),Ae=new IntersectionObserver(G=>{te=G[0].isIntersecting});Ae.observe(i);let de=()=>{M||(M=!0,cancelAnimationFrame(I),window.removeEventListener("message",W),Ae.disconnect(),ie.dispose(),H.dispose(),Object.values(w).forEach(G=>{G.pause(),G.removeAttribute("src"),G.load(),G.remove()}))};function Y(G){if(I=0,M)return;if(!i.isConnected){de();return}let B=te&&!i.inert&&!document.hidden&&!window.previewPaused;if(B){O!==void 0&&!ie.busy&&(k+=Math.min(G-O,1e3/y.fps)*y.fps/1e3);let Se=z+Math.floor(k)%(V-z+1);Se!==U&&!ie.busy&&(U=Se,ie.advance(Se))}B||(ge=void 0),O=B?G:void 0,M||(I=requestAnimationFrame(Y))}return I=requestAnimationFrame(Y),de}window.previewPaused=window.parent!==window;window.addEventListener("pointermove",i=>{i.pointerType==="mouse"&&parent.postMessage({type:"preview-pointer",x:i.clientX,y:i.clientY,pointerType:i.pointerType},location.origin)},{capture:!0,passive:!0});window.addEventListener("message",i=>{i.source===parent&&i.data?.type==="preview-visibility"&&(window.previewPaused=!i.data.visible)});try{await em(document.getElementById("feature-card"),"00",{range:[0,null]},"Absolute hip, shoulder rotations and x factor","feature-2");let i=document.querySelector(".snapshot-overview-scene"),e=document.createElement("div");e.className="preview-measurement-layer",e.append(...i.querySelectorAll(".rotation-angle-labels,.snapshot-rotation-plots")),i.append(e),$s(()=>parent.postMessage({type:"preview-ready"},location.origin))}catch(i){document.getElementById("feature-card").textContent="Preview unavailable. Open the project to explore the demo.",console.error(i)}
