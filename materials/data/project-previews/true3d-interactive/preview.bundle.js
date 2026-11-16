async function Nh(i,e={}){if(typeof DecompressionStream=="function")try{let n=await fetch(`${i}.gz`,e);if(n.ok)return n.headers.get("content-encoding")?.includes("gzip")?n.json():await new Response(n.body.pipeThrough(new DecompressionStream("gzip"))).json()}catch(n){if(n.name==="AbortError")throw n}let t=await fetch(i,e);if(!t.ok)throw new Error(`${i}: ${t.status}`);return t.json()}function hm({width:i=1024,coarse:e=!1,pixelRatio:t=1,floatColor:n=!0,maxTextures:r=16}={}){let s=e||i<=768;return{singleScene:s,depthCompositing:!s&&n&&r>=12,pixelRatio:Math.min(t,s?1.5:2),shadowSize:s?1024:2048}}function Ic(i={}){return hm({width:window.innerWidth,coarse:matchMedia("(pointer: coarse)").matches,pixelRatio:window.devicePixelRatio||1,...i})}var bn=Object.freeze({shoulder:"#477db8",hip:"#b67942",xfactor:"#8d69b3",bend:"#4a9488",sideTilt:"#b76f86"});var $s={"geometric-rotations":{xfactor:!0,groups:[{id:"shoulder",label:"Shoulder",type:"geometric",subtype:"shoulder_turn_tilt",keys:["turn","tilt"],labels:{turn:"Shoulder turn",tilt:"Shoulder tilt"},color:bn.shoulder,shape:"circle",planeKeys:["turn"]},{id:"hip",label:"Hip",type:"geometric",subtype:"hip_turn_tilt",keys:["turn","tilt"],labels:{turn:"Hip turn",tilt:"Hip tilt"},color:bn.hip,shape:"circle",planeKeys:["turn"]}]},"geometric-spine":{groups:[{id:"bend",label:"Spine bend",type:"geometric",subtype:"spine_bend_tilt",keys:["bend"],labels:{bend:"Spine bend"},color:bn.bend,shape:"square",horizontalScale:1.4,verticalScale:1.7,planeKeys:["bend"]},{id:"side-tilt",label:"Spine side tilt",type:"geometric",subtype:"spine_bend_tilt",keys:["tilt"],labels:{tilt:"Spine side tilt"},color:bn.sideTilt,shape:"square",horizontalScale:1.4,verticalScale:1.7,planeKeys:["tilt"]}]},"hip-translation":{combined:!0,unit:" units",groups:[...[["sway","Sway","#7540c8"],["thrust","Thrust","#e69a00"],["lift","Lift","#009eaf"]].map(([i,e,t])=>({id:i,label:e,color:t,type:"position",subtype:"hip_sway_thrust_lift",keys:[i],labels:{[i]:e}}))]},"body-turns":{groups:[{id:"shoulder",label:"Shoulder turn",type:"kinematic",subtype:"shoulder_turn_on_spine_plane",keys:["turn"],labels:{turn:"Shoulder turn"},color:bn.shoulder,shape:"circle",planeKeys:["turn"]},{id:"hip",label:"Hip turn",type:"kinematic",subtype:"hip_turn_on_spine_plane",keys:["turn"],labels:{turn:"Hip turn"},color:bn.hip,shape:"circle",planeKeys:["turn"]}]}};function Oh(i){let e=i.toLowerCase();return e==="absolute hip sway thrust and lift"?"hip-translation":e.startsWith("absolute hip, shoulder rotations")?"geometric-rotations":["geometric spine bend and side tilt","absolute spine bend and tilt"].includes(e)?"geometric-spine":["body rotation hip and shoulder turn","relative hip and shoulder rotation"].includes(e)?"body-turns":null}function zh({streams:i,mapping:e,present:t,onDrop:n=()=>{},timeoutMs:r=2e3}){let s=new Set,o=new Set,a=!1,c=!1;async function l(h,p){let f=e[h.name]?.[p];if(!Number.isInteger(f))throw new Error(`Invalid sync frame: ${h.name}/${p}`);let g;try{let x=await Promise.race([Promise.resolve().then(()=>h.decode(f)),new Promise((m,d)=>{g=setTimeout(()=>d(new Error(`Frame decode timed out: ${h.name}`)),r)})]);if(x!==f)throw new Error(`Decoded frame mismatch: ${h.name}, expected ${f}, got ${x}`);return{name:h.name,raw:f}}finally{clearTimeout(g)}}function u(h,p){s.delete(h),h.reset?.(),n(h.name,p)}return{get busy(){return a},async advance(h){if(c||a)return!1;for(let f of i)f.ready()&&!s.has(f)&&!o.has(f)&&(o.add(f),l(f,h).then(()=>{c||s.add(f)},g=>{c||u(f,g)}).finally(()=>o.delete(f)));let p=i.filter(f=>s.has(f)&&f.ready());if(!p.length)return t(h,[]),!0;a=!0;try{let f=await Promise.allSettled(p.map(x=>l(x,h)));if(c)return!1;let g=[];return f.forEach((x,m)=>{x.status==="fulfilled"?g.push(x.value):u(p[m],x.reason)}),t(h,g),!0}finally{a=!1}},dispose(){c=!0,i.forEach(h=>h.reset?.())}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Du="170";var dm=0,Bh=1,fm=2;var Jd=1,Uu=2,Yi=3,pr=0,Fn=1,Vt=2,Ci=0,gs=1,kh=2,Hh=3,Vh=4,pm=5,Or=100,mm=101,gm=102,xm=103,ym=104,_m=200,vm=201,bm=202,Mm=203,hl=204,dl=205,wm=206,Sm=207,Em=208,Am=209,Tm=210,Rm=211,Cm=212,Pm=213,Im=214,fl=0,pl=1,ml=2,vs=3,gl=4,xl=5,yl=6,_l=7,Kd=0,Lm=1,Dm=2,Pi=0,Um=1,Fm=2,Nm=3,Fu=4,Om=5,zm=6,Bm=7;var Qd=300,bs=301,Ms=302,lo=303,vl=304,ja=306,bl=1e3,kr=1001,Ml=1002,jn=1003,km=1004;var qo=1005;var $n=1006,Lc=1007;var Hr=1008;var Ji=1009,ef=1010,tf=1011,uo=1012,Nu=1013,Ki=1014,Ri=1015,vr=1016,Ou=1017,zu=1018,ws=1020,nf=35902,rf=1021,sf=1022,yi=1023,of=1024,af=1025,xs=1026,Ss=1027,Bu=1028,ku=1029,cf=1030,Hu=1031;var Vu=1033,ya=33776,_a=33777,va=33778,ba=33779,wl=35840,Sl=35841,El=35842,Al=35843,Tl=36196,Rl=37492,Cl=37496,Pl=37808,Il=37809,Ll=37810,Dl=37811,Ul=37812,Fl=37813,Nl=37814,Ol=37815,zl=37816,Bl=37817,kl=37818,Hl=37819,Vl=37820,Gl=37821,Ma=36492,Wl=36494,Xl=36495,lf=36283,ql=36284,Yl=36285,$l=36286;var wa=2300,jl=2301,Dc=2302,Gh=2400,Wh=2401,Xh=2402;var Hm=3200,Vm=3201;var uf=0,Gm=1,fr="",xn="srgb",Is="srgb-linear",Za="linear",Bt="srgb";var Qr=7680;var qh=519,Wm=512,Xm=513,qm=514,hf=515,Ym=516,$m=517,jm=518,Zm=519,Yh=35044;var $h="300 es",ji=2e3,Sa=2001,mr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jh=1234567,ro=Math.PI/180,ho=180/Math.PI;function Ls(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]).toLowerCase()}function an(i,e,t){return Math.max(e,Math.min(t,i))}function Gu(i,e){return(i%e+e)%e}function Jm(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Km(i,e,t){return i!==e?(t-i)/(e-i):0}function so(i,e,t){return(1-t)*i+t*e}function Qm(i,e,t,n){return so(i,e,1-Math.exp(-t*n))}function eg(i,e=1){return e-Math.abs(Gu(i,e*2)-e)}function tg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ng(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ig(i,e){return i+Math.floor(Math.random()*(e-i+1))}function rg(i,e){return i+Math.random()*(e-i)}function sg(i){return i*(.5-Math.random())}function og(i){i!==void 0&&(jh=i);let e=jh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ag(i){return i*ro}function cg(i){return i*ho}function lg(i){return(i&i-1)===0&&i!==0}function ug(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function hg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function dg(i,e,t,n,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),p=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,c*h,c*p,a*l);break;case"YZY":i.set(c*p,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*p,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ps(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var On={DEG2RAD:ro,RAD2DEG:ho,generateUUID:Ls,clamp:an,euclideanModulo:Gu,mapLinear:Jm,inverseLerp:Km,lerp:so,damp:Qm,pingpong:eg,smoothstep:tg,smootherstep:ng,randInt:ig,randFloat:rg,randFloatSpread:sg,seededRandom:og,degToRad:ag,radToDeg:cg,isPowerOfTwo:lg,ceilPowerOfTwo:ug,floorPowerOfTwo:hg,setQuaternionFromProperEuler:dg,normalize:Cn,denormalize:ps},Be=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(an(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dt=class i{constructor(e,t,n,r,s,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],p=n[2],f=n[5],g=n[8],x=r[0],m=r[3],d=r[6],v=r[1],y=r[4],_=r[7],w=r[2],E=r[5],A=r[8];return s[0]=o*x+a*v+c*w,s[3]=o*m+a*y+c*E,s[6]=o*d+a*_+c*A,s[1]=l*x+u*v+h*w,s[4]=l*m+u*y+h*E,s[7]=l*d+u*_+h*A,s[2]=p*x+f*v+g*w,s[5]=p*m+f*y+g*E,s[8]=p*d+f*_+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,p=a*c-u*s,f=l*s-o*c,g=t*h+n*p+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=h*x,e[1]=(r*l-u*n)*x,e[2]=(a*n-r*o)*x,e[3]=p*x,e[4]=(u*t-r*c)*x,e[5]=(r*s-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Uc.makeScale(e,t)),this}rotate(e){return this.premultiply(Uc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Uc=new dt;function df(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ea(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fg(){let i=Ea("canvas");return i.style.display="block",i}var Zh={};function no(i){i in Zh||(Zh[i]=!0,console.warn(i))}function pg(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function mg(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function gg(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Tt={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Bt&&(i.r=Zi(i.r),i.g=Zi(i.g),i.b=Zi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Bt&&(i.r=ys(i.r),i.g=ys(i.g),i.b=ys(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fr?Za:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Zi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Jh=[.64,.33,.3,.6,.15,.06],Kh=[.2126,.7152,.0722],Qh=[.3127,.329],ed=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),td=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Tt.define({[Is]:{primaries:Jh,whitePoint:Qh,transfer:Za,toXYZ:ed,fromXYZ:td,luminanceCoefficients:Kh,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:Jh,whitePoint:Qh,transfer:Bt,toXYZ:ed,fromXYZ:td,luminanceCoefficients:Kh,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}});var es,Zl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{es===void 0&&(es=Ea("canvas")),es.width=e.width,es.height=e.height;let n=es.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=es}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ea("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Zi(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zi(t[n]/255)*255):t[n]=Zi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},xg=0,Aa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=Ls(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Fc(r[o].image)):s.push(Fc(r[o]))}else s=Fc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Fc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var yg=0,Sn=class i extends mr{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=kr,r=kr,s=$n,o=Hr,a=yi,c=Ji,l=i.DEFAULT_ANISOTROPY,u=fr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=Ls(),this.name="",this.source=new Aa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bl:e.x=e.x-Math.floor(e.x);break;case kr:e.x=e.x<0?0:1;break;case Ml:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bl:e.y=e.y-Math.floor(e.y);break;case kr:e.y=e.y<0?0:1;break;case Ml:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Qd;Sn.DEFAULT_ANISOTROPY=1;var Zt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],u=c[4],h=c[8],p=c[1],f=c[5],g=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(u-p)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,_=(f+1)/2,w=(d+1)/2,E=(u+p)/4,A=(h+x)/4,T=(g+m)/4;return y>_&&y>w?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=E/n,s=A/n):_>w?_<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),n=E/r,s=T/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=A/s,r=T/s),this.set(n,r,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(p-u)*(p-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-x)/v,this.z=(p-u)/v,this.w=Math.acos((l+f+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jl=class extends mr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Zt(0,0,e,t),this.scissorTest=!1,this.viewport=new Zt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Sn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Aa(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ni=class extends Jl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ta=class extends Sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jn,this.minFilter=jn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kl=class extends Sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jn,this.minFilter=jn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Jt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3],p=s[o+0],f=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=p,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(h!==x||c!==p||l!==f||u!==g){let m=1-a,d=c*p+l*f+u*g+h*x,v=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){let w=Math.sqrt(y),E=Math.atan2(w,d*v);m=Math.sin(m*E)/w,a=Math.sin(a*E)/w}let _=a*v;if(c=c*m+p*_,l=l*m+f*_,u=u*m+g*_,h=h*m+x*_,m===1-a){let w=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=w,l*=w,u*=w,h*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],p=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+u*h+c*f-l*p,e[t+1]=c*g+u*p+l*h-a*f,e[t+2]=l*g+u*f+a*p-c*h,e[t+3]=u*g-a*h-c*p-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),p=c(n/2),f=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=p*u*h+l*f*g,this._y=l*f*h-p*u*g,this._z=l*u*g+p*f*h,this._w=l*u*h-p*f*g;break;case"YXZ":this._x=p*u*h+l*f*g,this._y=l*f*h-p*u*g,this._z=l*u*g-p*f*h,this._w=l*u*h+p*f*g;break;case"ZXY":this._x=p*u*h-l*f*g,this._y=l*f*h+p*u*g,this._z=l*u*g+p*f*h,this._w=l*u*h-p*f*g;break;case"ZYX":this._x=p*u*h-l*f*g,this._y=l*f*h+p*u*g,this._z=l*u*g-p*f*h,this._w=l*u*h+p*f*g;break;case"YZX":this._x=p*u*h+l*f*g,this._y=l*f*h+p*u*g,this._z=l*u*g-p*f*h,this._w=l*u*h-p*f*g;break;case"XZY":this._x=p*u*h-l*f*g,this._y=l*f*h-p*u*g,this._z=l*u*g+p*f*h,this._w=l*u*h+p*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],p=n+a+h;if(p>0){let f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(u-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(an(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,p=Math.sin(t*u)/l;return this._w=o*h+this._w*p,this._x=n*h+this._x*p,this._y=r*h+this._y*p,this._z=s*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Nc.copy(this).projectOnVector(e),this.sub(Nc)}reflect(e){return this.sub(Nc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(an(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nc=new D,nd=new Jt,ii=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,mi):mi.fromBufferAttribute(s,o),mi.applyMatrix4(e.matrixWorld),this.expandByPoint(mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yo.copy(n.boundingBox)),Yo.applyMatrix4(e.matrixWorld),this.union(Yo)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mi),mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(js),$o.subVectors(this.max,js),ts.subVectors(e.a,js),ns.subVectors(e.b,js),is.subVectors(e.c,js),ar.subVectors(ns,ts),cr.subVectors(is,ns),Pr.subVectors(ts,is);let t=[0,-ar.z,ar.y,0,-cr.z,cr.y,0,-Pr.z,Pr.y,ar.z,0,-ar.x,cr.z,0,-cr.x,Pr.z,0,-Pr.x,-ar.y,ar.x,0,-cr.y,cr.x,0,-Pr.y,Pr.x,0];return!Oc(t,ts,ns,is,$o)||(t=[1,0,0,0,1,0,0,0,1],!Oc(t,ts,ns,is,$o))?!1:(jo.crossVectors(ar,cr),t=[jo.x,jo.y,jo.z],Oc(t,ts,ns,is,$o))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Vi=[new D,new D,new D,new D,new D,new D,new D,new D],mi=new D,Yo=new ii,ts=new D,ns=new D,is=new D,ar=new D,cr=new D,Pr=new D,js=new D,$o=new D,jo=new D,Ir=new D;function Oc(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ir.fromArray(i,s);let a=r.x*Math.abs(Ir.x)+r.y*Math.abs(Ir.y)+r.z*Math.abs(Ir.z),c=e.dot(Ir),l=t.dot(Ir),u=n.dot(Ir);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var _g=new ii,Zs=new D,zc=new D,gr=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):_g.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zs.subVectors(e,this.center);let t=Zs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Zs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zs.copy(e.center).add(zc)),this.expandByPoint(Zs.copy(e.center).sub(zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Gi=new D,Bc=new D,Zo=new D,lr=new D,kc=new D,Jo=new D,Hc=new D,fo=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gi.copy(this.origin).addScaledVector(this.direction,t),Gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Bc.copy(e).add(t).multiplyScalar(.5),Zo.copy(t).sub(e).normalize(),lr.copy(this.origin).sub(Bc);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Zo),a=lr.dot(this.direction),c=-lr.dot(Zo),l=lr.lengthSq(),u=Math.abs(1-o*o),h,p,f,g;if(u>0)if(h=o*c-a,p=o*a-c,g=s*u,h>=0)if(p>=-g)if(p<=g){let x=1/u;h*=x,p*=x,f=h*(h+o*p+2*a)+p*(o*h+p+2*c)+l}else p=s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*c)+l;else p=-s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*c)+l;else p<=-g?(h=Math.max(0,-(-o*s+a)),p=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+p*(p+2*c)+l):p<=g?(h=0,p=Math.min(Math.max(-s,-c),s),f=p*(p+2*c)+l):(h=Math.max(0,-(o*s+a)),p=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+p*(p+2*c)+l);else p=o>0?-s:s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Bc).addScaledVector(Zo,p),f}intersectSphere(e,t){Gi.subVectors(e.center,this.origin);let n=Gi.dot(this.direction),r=Gi.dot(Gi)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,r=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,r=(e.min.x-p.x)*l),u>=0?(s=(e.min.y-p.y)*u,o=(e.max.y-p.y)*u):(s=(e.max.y-p.y)*u,o=(e.min.y-p.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-p.z)*h,c=(e.max.z-p.z)*h):(a=(e.max.z-p.z)*h,c=(e.min.z-p.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gi)!==null}intersectTriangle(e,t,n,r,s){kc.subVectors(t,e),Jo.subVectors(n,e),Hc.crossVectors(kc,Jo);let o=this.direction.dot(Hc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;lr.subVectors(this.origin,e);let c=a*this.direction.dot(Jo.crossVectors(lr,Jo));if(c<0)return null;let l=a*this.direction.dot(kc.cross(lr));if(l<0||c+l>o)return null;let u=-a*lr.dot(Hc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},bt=class i{constructor(e,t,n,r,s,o,a,c,l,u,h,p,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,h,p,f,g,x,m)}set(e,t,n,r,s,o,a,c,l,u,h,p,f,g,x,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=p,d[3]=f,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/rs.setFromMatrixColumn(e,0).length(),s=1/rs.setFromMatrixColumn(e,1).length(),o=1/rs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let p=o*u,f=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=p-x*l,t[9]=-a*c,t[2]=x-p*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let p=c*u,f=c*h,g=l*u,x=l*h;t[0]=p+x*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=x+p*a,t[10]=o*c}else if(e.order==="ZXY"){let p=c*u,f=c*h,g=l*u,x=l*h;t[0]=p-x*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=x-p*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let p=o*u,f=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=g*l-f,t[8]=p*l+x,t[1]=c*h,t[5]=x*l+p,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let p=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-p*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*h+g,t[10]=p-x*h}else if(e.order==="XZY"){let p=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=p*h+x,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=x*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vg,e,bg)}lookAt(e,t,n){let r=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),ur.crossVectors(n,qn),ur.lengthSq()===0&&(Math.abs(n.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),ur.crossVectors(n,qn)),ur.normalize(),Ko.crossVectors(qn,ur),r[0]=ur.x,r[4]=Ko.x,r[8]=qn.x,r[1]=ur.y,r[5]=Ko.y,r[9]=qn.y,r[2]=ur.z,r[6]=Ko.z,r[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],p=n[9],f=n[13],g=n[2],x=n[6],m=n[10],d=n[14],v=n[3],y=n[7],_=n[11],w=n[15],E=r[0],A=r[4],T=r[8],b=r[12],M=r[1],C=r[5],F=r[9],V=r[13],Y=r[2],X=r[6],I=r[10],Q=r[14],W=r[3],B=r[7],H=r[11],k=r[15];return s[0]=o*E+a*M+c*Y+l*W,s[4]=o*A+a*C+c*X+l*B,s[8]=o*T+a*F+c*I+l*H,s[12]=o*b+a*V+c*Q+l*k,s[1]=u*E+h*M+p*Y+f*W,s[5]=u*A+h*C+p*X+f*B,s[9]=u*T+h*F+p*I+f*H,s[13]=u*b+h*V+p*Q+f*k,s[2]=g*E+x*M+m*Y+d*W,s[6]=g*A+x*C+m*X+d*B,s[10]=g*T+x*F+m*I+d*H,s[14]=g*b+x*V+m*Q+d*k,s[3]=v*E+y*M+_*Y+w*W,s[7]=v*A+y*C+_*X+w*B,s[11]=v*T+y*F+_*I+w*H,s[15]=v*b+y*V+_*Q+w*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],p=e[10],f=e[14],g=e[3],x=e[7],m=e[11],d=e[15];return g*(+s*c*h-r*l*h-s*a*p+n*l*p+r*a*f-n*c*f)+x*(+t*c*f-t*l*p+s*o*p-r*o*f+r*l*u-s*c*u)+m*(+t*l*h-t*a*f-s*o*h+n*o*f+s*a*u-n*l*u)+d*(-r*a*u-t*c*h+t*a*p+r*o*h-n*o*p+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],p=e[10],f=e[11],g=e[12],x=e[13],m=e[14],d=e[15],v=h*m*l-x*p*l+x*c*f-a*m*f-h*c*d+a*p*d,y=g*p*l-u*m*l-g*c*f+o*m*f+u*c*d-o*p*d,_=u*x*l-g*h*l+g*a*f-o*x*f-u*a*d+o*h*d,w=g*h*c-u*x*c-g*a*p+o*x*p+u*a*m-o*h*m,E=t*v+n*y+r*_+s*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return e[0]=v*A,e[1]=(x*p*s-h*m*s-x*r*f+n*m*f+h*r*d-n*p*d)*A,e[2]=(a*m*s-x*c*s+x*r*l-n*m*l-a*r*d+n*c*d)*A,e[3]=(h*c*s-a*p*s-h*r*l+n*p*l+a*r*f-n*c*f)*A,e[4]=y*A,e[5]=(u*m*s-g*p*s+g*r*f-t*m*f-u*r*d+t*p*d)*A,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*d-t*c*d)*A,e[7]=(o*p*s-u*c*s+u*r*l-t*p*l-o*r*f+t*c*f)*A,e[8]=_*A,e[9]=(g*h*s-u*x*s-g*n*f+t*x*f+u*n*d-t*h*d)*A,e[10]=(o*x*s-g*a*s+g*n*l-t*x*l-o*n*d+t*a*d)*A,e[11]=(u*a*s-o*h*s-u*n*l+t*h*l+o*n*f-t*a*f)*A,e[12]=w*A,e[13]=(u*x*r-g*h*r+g*n*p-t*x*p-u*n*m+t*h*m)*A,e[14]=(g*a*r-o*x*r-g*n*c+t*x*c+o*n*m-t*a*m)*A,e[15]=(o*h*r-u*a*r+u*n*c-t*h*c-o*n*p+t*a*p)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,h=a+a,p=s*l,f=s*u,g=s*h,x=o*u,m=o*h,d=a*h,v=c*l,y=c*u,_=c*h,w=n.x,E=n.y,A=n.z;return r[0]=(1-(x+d))*w,r[1]=(f+_)*w,r[2]=(g-y)*w,r[3]=0,r[4]=(f-_)*E,r[5]=(1-(p+d))*E,r[6]=(m+v)*E,r[7]=0,r[8]=(g+y)*A,r[9]=(m-v)*A,r[10]=(1-(p+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=rs.set(r[0],r[1],r[2]).length(),o=rs.set(r[4],r[5],r[6]).length(),a=rs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],gi.copy(this);let l=1/s,u=1/o,h=1/a;return gi.elements[0]*=l,gi.elements[1]*=l,gi.elements[2]*=l,gi.elements[4]*=u,gi.elements[5]*=u,gi.elements[6]*=u,gi.elements[8]*=h,gi.elements[9]*=h,gi.elements[10]*=h,t.setFromRotationMatrix(gi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=ji){let c=this.elements,l=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r),f,g;if(a===ji)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Sa)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=ji){let c=this.elements,l=1/(t-e),u=1/(n-r),h=1/(o-s),p=(t+e)*l,f=(n+r)*u,g,x;if(a===ji)g=(o+s)*h,x=-2*h;else if(a===Sa)g=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},rs=new D,gi=new bt,vg=new D(0,0,0),bg=new D(1,1,1),ur=new D,Ko=new D,qn=new D,id=new bt,rd=new Jt,Nn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],p=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(an(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-an(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(an(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-an(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(an(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-an(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return id.makeRotationFromQuaternion(e),this.setFromRotationMatrix(id,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rd.setFromEuler(this),this.setFromQuaternion(rd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Nn.DEFAULT_ORDER="XYZ";var po=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Mg=0,sd=new D,ss=new Jt,Wi=new bt,Qo=new D,Js=new D,wg=new D,Sg=new Jt,od=new D(1,0,0),ad=new D(0,1,0),cd=new D(0,0,1),ld={type:"added"},Eg={type:"removed"},os={type:"childadded",child:null},Vc={type:"childremoved",child:null},pn=class i extends mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new Nn,n=new Jt,r=new D(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new bt},normalMatrix:{value:new dt}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new po,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(od,e)}rotateY(e){return this.rotateOnAxis(ad,e)}rotateZ(e){return this.rotateOnAxis(cd,e)}translateOnAxis(e,t){return sd.copy(e).applyQuaternion(this.quaternion),this.position.add(sd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(od,e)}translateY(e){return this.translateOnAxis(ad,e)}translateZ(e){return this.translateOnAxis(cd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qo.copy(e):Qo.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wi.lookAt(Js,Qo,this.up):Wi.lookAt(Qo,Js,this.up),this.quaternion.setFromRotationMatrix(Wi),r&&(Wi.extractRotation(r.matrixWorld),ss.setFromRotationMatrix(Wi),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ld),os.child=e,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Eg),Vc.child=e,this.dispatchEvent(Vc),Vc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ld),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,e,wg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,Sg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),p=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};pn.DEFAULT_UP=new D(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xi=new D,Xi=new D,Gc=new D,qi=new D,as=new D,cs=new D,ud=new D,Wc=new D,Xc=new D,qc=new D,Yc=new Zt,$c=new Zt,jc=new Zt,zr=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),xi.subVectors(e,t),r.cross(xi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){xi.subVectors(r,t),Xi.subVectors(n,t),Gc.subVectors(e,t);let o=xi.dot(xi),a=xi.dot(Xi),c=xi.dot(Gc),l=Xi.dot(Xi),u=Xi.dot(Gc),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;let p=1/h,f=(l*c-a*u)*p,g=(o*u-a*c)*p;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,qi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,qi.x),c.addScaledVector(o,qi.y),c.addScaledVector(a,qi.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return Yc.setScalar(0),$c.setScalar(0),jc.setScalar(0),Yc.fromBufferAttribute(e,t),$c.fromBufferAttribute(e,n),jc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Yc,s.x),o.addScaledVector($c,s.y),o.addScaledVector(jc,s.z),o}static isFrontFacing(e,t,n,r){return xi.subVectors(n,t),Xi.subVectors(e,t),xi.cross(Xi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xi.subVectors(this.c,this.b),Xi.subVectors(this.a,this.b),xi.cross(Xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;as.subVectors(r,n),cs.subVectors(s,n),Wc.subVectors(e,n);let c=as.dot(Wc),l=cs.dot(Wc);if(c<=0&&l<=0)return t.copy(n);Xc.subVectors(e,r);let u=as.dot(Xc),h=cs.dot(Xc);if(u>=0&&h<=u)return t.copy(r);let p=c*h-u*l;if(p<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(as,o);qc.subVectors(e,s);let f=as.dot(qc),g=cs.dot(qc);if(g>=0&&f<=g)return t.copy(s);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(cs,a);let m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return ud.subVectors(s,r),a=(h-u)/(h-u+(f-g)),t.copy(r).addScaledVector(ud,a);let d=1/(m+x+p);return o=x*d,a=p*d,t.copy(n).addScaledVector(as,o).addScaledVector(cs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ff={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hr={h:0,s:0,l:0},ea={h:0,s:0,l:0};function Zc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Tt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Tt.workingColorSpace){if(e=Gu(e,1),t=an(t,0,1),n=an(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Zc(o,s,e+1/3),this.g=Zc(o,s,e),this.b=Zc(o,s,e-1/3)}return Tt.toWorkingColorSpace(this,r),this}setStyle(e,t=xn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xn){let n=ff[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}copyLinearToSRGB(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return Tt.fromWorkingColorSpace(wn.copy(this),e),Math.round(an(wn.r*255,0,255))*65536+Math.round(an(wn.g*255,0,255))*256+Math.round(an(wn.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.fromWorkingColorSpace(wn.copy(this),t);let n=wn.r,r=wn.g,s=wn.b,o=Math.max(n,r,s),a=Math.min(n,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Tt.workingColorSpace){return Tt.fromWorkingColorSpace(wn.copy(this),t),e.r=wn.r,e.g=wn.g,e.b=wn.b,e}getStyle(e=xn){Tt.fromWorkingColorSpace(wn.copy(this),e);let t=wn.r,n=wn.g,r=wn.b;return e!==xn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(hr),this.setHSL(hr.h+e,hr.s+t,hr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hr),e.getHSL(ea);let n=so(hr.h,ea.h,t),r=so(hr.s,ea.s,t),s=so(hr.l,ea.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},wn=new Je;Je.NAMES=ff;var Ag=0,xr=class extends mr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=Ls(),this.name="",this.blending=gs,this.side=pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hl,this.blendDst=dl,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==pr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==hl&&(n.blendSrc=this.blendSrc),this.blendDst!==dl&&(n.blendDst=this.blendDst),this.blendEquation!==Or&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},$t=class extends xr{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=Kd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var nn=new D,ta=new Be,Zn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yh,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix3(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ps(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ps(t,this.array)),t}setX(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ps(t,this.array)),t}setY(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ps(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ps(t,this.array)),t}setW(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),r=Cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),r=Cn(r,this.array),s=Cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yh&&(e.usage=this.usage),e}};var Ra=class extends Zn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ca=class extends Zn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var rt=class extends Zn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Tg=0,ti=new bt,Jc=new pn,ls=new D,Yn=new ii,Ks=new ii,fn=new D,Mt=class i extends mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(df(e)?Ca:Ra)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new dt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,n){return ti.makeTranslation(e,t,n),this.applyMatrix4(ti),this}scale(e,t,n){return ti.makeScale(e,t,n),this.applyMatrix4(ti),this}lookAt(e){return Jc.lookAt(e),Jc.updateMatrix(),this.applyMatrix4(Jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new rt(n,3))}else{for(let n=0,r=t.count;n<r;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Yn.setFromBufferAttribute(s),this.morphTargetsRelative?(fn.addVectors(this.boundingBox.min,Yn.min),this.boundingBox.expandByPoint(fn),fn.addVectors(this.boundingBox.max,Yn.max),this.boundingBox.expandByPoint(fn)):(this.boundingBox.expandByPoint(Yn.min),this.boundingBox.expandByPoint(Yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(Yn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Ks.setFromBufferAttribute(a),this.morphTargetsRelative?(fn.addVectors(Yn.min,Ks.min),Yn.expandByPoint(fn),fn.addVectors(Yn.max,Ks.max),Yn.expandByPoint(fn)):(Yn.expandByPoint(Ks.min),Yn.expandByPoint(Ks.max))}Yn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)fn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(fn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)fn.fromBufferAttribute(a,l),c&&(ls.fromBufferAttribute(e,l),fn.add(ls)),r=Math.max(r,n.distanceToSquared(fn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new D,c[T]=new D;let l=new D,u=new D,h=new D,p=new Be,f=new Be,g=new Be,x=new D,m=new D;function d(T,b,M){l.fromBufferAttribute(n,T),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,M),p.fromBufferAttribute(s,T),f.fromBufferAttribute(s,b),g.fromBufferAttribute(s,M),u.sub(l),h.sub(l),f.sub(p),g.sub(p);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(C),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),a[T].add(x),a[b].add(x),a[M].add(x),c[T].add(m),c[b].add(m),c[M].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let T=0,b=v.length;T<b;++T){let M=v[T],C=M.start,F=M.count;for(let V=C,Y=C+F;V<Y;V+=3)d(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let y=new D,_=new D,w=new D,E=new D;function A(T){w.fromBufferAttribute(r,T),E.copy(w);let b=a[T];y.copy(b),y.sub(w.multiplyScalar(w.dot(b))).normalize(),_.crossVectors(E,b);let C=_.dot(c[T])<0?-1:1;o.setXYZW(T,y.x,y.y,y.z,C)}for(let T=0,b=v.length;T<b;++T){let M=v[T],C=M.start,F=M.count;for(let V=C,Y=C+F;V<Y;V+=3)A(e.getX(V+0)),A(e.getX(V+1)),A(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);let r=new D,s=new D,o=new D,a=new D,c=new D,l=new D,u=new D,h=new D;if(e)for(let p=0,f=e.count;p<f;p+=3){let g=e.getX(p+0),x=e.getX(p+1),m=e.getX(p+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,f=t.count;p<f;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)fn.fromBufferAttribute(e,t),fn.normalize(),e.setXYZ(t,fn.x,fn.y,fn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,p=new l.constructor(c.length*u),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let d=0;d<u;d++)p[g++]=l[f++]}return new Zn(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){let p=l[u],f=e(p,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,p=l.length;h<p;h++){let f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],h=s[l];for(let p=0,f=h.length;p<f;p++)u.push(h[p].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},hd=new bt,Lr=new fo,na=new gr,dd=new D,ia=new D,ra=new D,sa=new D,Kc=new D,oa=new D,fd=new D,aa=new D,it=class extends pn{constructor(e=new Mt,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){oa.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],h=s[c];u!==0&&(Kc.fromBufferAttribute(h,e),o?oa.addScaledVector(Kc,u):oa.addScaledVector(Kc.sub(t),u))}t.add(oa)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(na.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(na,dd)===null||Lr.origin.distanceToSquared(dd)>(e.far-e.near)**2))&&(hd.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(hd),!(n.boundingBox!==null&&Lr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Lr)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,p=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){let m=p[g],d=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=v,w=y;_<w;_+=3){let E=a.getX(_),A=a.getX(_+1),T=a.getX(_+2);r=ca(this,d,e,n,l,u,h,E,A,T),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,d=x;m<d;m+=3){let v=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);r=ca(this,o,e,n,l,u,h,v,y,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){let m=p[g],d=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=v,w=y;_<w;_+=3){let E=_,A=_+1,T=_+2;r=ca(this,d,e,n,l,u,h,E,A,T),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,d=x;m<d;m+=3){let v=m,y=m+1,_=m+2;r=ca(this,o,e,n,l,u,h,v,y,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Rg(i,e,t,n,r,s,o,a){let c;if(e.side===Fn?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===pr,a),c===null)return null;aa.copy(a),aa.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(aa);return l<t.near||l>t.far?null:{distance:l,point:aa.clone(),object:i}}function ca(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,ia),i.getVertexPosition(c,ra),i.getVertexPosition(l,sa);let u=Rg(i,e,t,n,ia,ra,sa,fd);if(u){let h=new D;zr.getBarycoord(fd,ia,ra,sa,h),r&&(u.uv=zr.getInterpolatedAttribute(r,a,c,l,h,new Be)),s&&(u.uv1=zr.getInterpolatedAttribute(s,a,c,l,h,new Be)),o&&(u.normal=zr.getInterpolatedAttribute(o,a,c,l,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let p={a,b:c,c:l,normal:new D,materialIndex:0};zr.getNormal(ia,ra,sa,p.normal),u.face=p,u.barycoord=h}return u}var Ii=class i extends Mt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],h=[],p=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(u,3)),this.setAttribute("uv",new rt(h,2));function g(x,m,d,v,y,_,w,E,A,T,b){let M=_/A,C=w/T,F=_/2,V=w/2,Y=E/2,X=A+1,I=T+1,Q=0,W=0,B=new D;for(let H=0;H<I;H++){let k=H*C-V;for(let z=0;z<X;z++){let te=z*M-F;B[x]=te*v,B[m]=k*y,B[d]=Y,l.push(B.x,B.y,B.z),B[x]=0,B[m]=0,B[d]=E>0?1:-1,u.push(B.x,B.y,B.z),h.push(z/A),h.push(1-H/T),Q+=1}}for(let H=0;H<T;H++)for(let k=0;k<A;k++){let z=p+k+X*H,te=p+k+X*(H+1),U=p+(k+1)+X*(H+1),j=p+(k+1)+X*H;c.push(z,te,j),c.push(te,U,j),W+=6}a.addGroup(f,W,b),f+=W,p+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Es(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Pn(i){let e={};for(let t=0;t<i.length;t++){let n=Es(i[t]);for(let r in n)e[r]=n[r]}return e}function Cg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function pf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}var Pg={clone:Es,merge:Pn},Ig=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ln=class extends xr{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ig,this.fragmentShader=Lg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=Cg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},As=class extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},dr=new D,pd=new Be,md=new Be,In=class extends As{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ho*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ro*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ho*2*Math.atan(Math.tan(ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dr.x,dr.y).multiplyScalar(-e/dr.z),dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(dr.x,dr.y).multiplyScalar(-e/dr.z)}getViewSize(e,t){return this.getViewBounds(e,pd,md),t.subVectors(md,pd)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ro*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},us=-90,hs=1,Ql=class extends pn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new In(us,hs,e,t);r.layers=this.layers,this.add(r);let s=new In(us,hs,e,t);s.layers=this.layers,this.add(s);let o=new In(us,hs,e,t);o.layers=this.layers,this.add(o);let a=new In(us,hs,e,t);a.layers=this.layers,this.add(a);let c=new In(us,hs,e,t);c.layers=this.layers,this.add(c);let l=new In(us,hs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===ji)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Sa)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,p,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Pa=class extends Sn{constructor(e,t,n,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:bs,super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},eu=class extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Pa(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:$n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ii(5,5,5),s=new Ln({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:Ci});s.uniforms.tEquirect.value=t;let o=new it(r,s),a=t.minFilter;return t.minFilter===Hr&&(t.minFilter=$n),new Ql(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}},Qc=new D,Dg=new D,Ug=new dt,$i=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Qc.subVectors(n,t).cross(Dg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Qc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ug.getNormalMatrix(e),r=this.coplanarPoint(Qc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Dr=new gr,la=new D,mo=class{constructor(e=new $i,t=new $i,n=new $i,r=new $i,s=new $i,o=new $i){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ji){let n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],h=r[6],p=r[7],f=r[8],g=r[9],x=r[10],m=r[11],d=r[12],v=r[13],y=r[14],_=r[15];if(n[0].setComponents(c-s,p-l,m-f,_-d).normalize(),n[1].setComponents(c+s,p+l,m+f,_+d).normalize(),n[2].setComponents(c+o,p+u,m+g,_+v).normalize(),n[3].setComponents(c-o,p-u,m-g,_-v).normalize(),n[4].setComponents(c-a,p-h,m-x,_-y).normalize(),t===ji)n[5].setComponents(c+a,p+h,m+x,_+y).normalize();else if(t===Sa)n[5].setComponents(a,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dr)}intersectsSprite(e){return Dr.center.set(0,0,0),Dr.radius=.7071067811865476,Dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(la.x=r.normal.x>0?e.max.x:e.min.x,la.y=r.normal.y>0?e.max.y:e.min.y,la.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(la)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function mf(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Fg(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,h=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let p=0;for(let f=1;f<h.length;f++){let g=h[p],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++p,h[p]=x)}h.length=p+1;for(let f=0,g=h.length;f<g;f++){let x=h[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var yr=class i extends Mt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=e/a,p=t/c,f=[],g=[],x=[],m=[];for(let d=0;d<u;d++){let v=d*p-o;for(let y=0;y<l;y++){let _=y*h-s;g.push(_,-v,0),x.push(0,0,1),m.push(y/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<a;v++){let y=v+l*d,_=v+l*(d+1),w=v+1+l*(d+1),E=v+1+l*d;f.push(y,_,E),f.push(_,w,E)}this.setIndex(f),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(x,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Ng=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Og=`#ifdef USE_ALPHAHASH
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
#endif`,zg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vg=`#ifdef USE_AOMAP
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
#endif`,Gg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wg=`#ifdef USE_BATCHING
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
#endif`,Xg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$g=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jg=`#ifdef USE_IRIDESCENCE
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
#endif`,Zg=`#ifdef USE_BUMPMAP
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
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,t0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,s0=`#define PI 3.141592653589793
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
} // validated`,o0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,a0=`vec3 transformedNormal = objectNormal;
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
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d0="gl_FragColor = linearToOutputTexel( gl_FragColor );",f0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,p0=`#ifdef USE_ENVMAP
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
#endif`,m0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,g0=`#ifdef USE_ENVMAP
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
#endif`,x0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,v0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w0=`#ifdef USE_GRADIENTMAP
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
}`,S0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T0=`uniform bool receiveShadow;
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
#endif`,R0=`#ifdef USE_ENVMAP
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
#endif`,C0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,P0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,D0=`PhysicalMaterial material;
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
#endif`,U0=`struct PhysicalMaterial {
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
}`,F0=`
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
#endif`,N0=`#if defined( RE_IndirectDiffuse )
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
#endif`,O0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,B0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,V0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,X0=`#if defined( USE_POINTS_UV )
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
#endif`,q0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,j0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Z0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`#ifdef USE_MORPHTARGETS
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
#endif`,K0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ex=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ix=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rx=`#ifdef USE_NORMALMAP
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
#endif`,sx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ox=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ax=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ux=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_x=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vx=`float getShadowMask() {
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
}`,bx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mx=`#ifdef USE_SKINNING
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
#endif`,wx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sx=`#ifdef USE_SKINNING
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
#endif`,Ex=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cx=`#ifdef USE_TRANSMISSION
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
#endif`,Px=`#ifdef USE_TRANSMISSION
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ux=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Fx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nx=`uniform sampler2D t2D;
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
}`,Ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`#include <common>
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
}`,Vx=`#if DEPTH_PACKING == 3200
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
}`,Gx=`#define DISTANCE
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
}`,Wx=`#define DISTANCE
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
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`uniform float scale;
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
}`,$x=`uniform vec3 diffuse;
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
}`,jx=`#include <common>
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
}`,Zx=`uniform vec3 diffuse;
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
}`,Jx=`#define LAMBERT
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
}`,Kx=`#define LAMBERT
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
}`,Qx=`#define MATCAP
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
}`,ey=`#define MATCAP
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
}`,ty=`#define NORMAL
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
}`,ny=`#define NORMAL
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
}`,iy=`#define PHONG
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
}`,ry=`#define PHONG
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
}`,sy=`#define STANDARD
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
}`,oy=`#define STANDARD
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
}`,ay=`#define TOON
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
}`,cy=`#define TOON
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
}`,ly=`uniform float size;
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
}`,uy=`uniform vec3 diffuse;
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
}`,hy=`#include <common>
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
}`,dy=`uniform vec3 color;
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
}`,fy=`uniform float rotation;
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
}`,py=`uniform vec3 diffuse;
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
}`,pt={alphahash_fragment:Ng,alphahash_pars_fragment:Og,alphamap_fragment:zg,alphamap_pars_fragment:Bg,alphatest_fragment:kg,alphatest_pars_fragment:Hg,aomap_fragment:Vg,aomap_pars_fragment:Gg,batching_pars_vertex:Wg,batching_vertex:Xg,begin_vertex:qg,beginnormal_vertex:Yg,bsdfs:$g,iridescence_fragment:jg,bumpmap_pars_fragment:Zg,clipping_planes_fragment:Jg,clipping_planes_pars_fragment:Kg,clipping_planes_pars_vertex:Qg,clipping_planes_vertex:e0,color_fragment:t0,color_pars_fragment:n0,color_pars_vertex:i0,color_vertex:r0,common:s0,cube_uv_reflection_fragment:o0,defaultnormal_vertex:a0,displacementmap_pars_vertex:c0,displacementmap_vertex:l0,emissivemap_fragment:u0,emissivemap_pars_fragment:h0,colorspace_fragment:d0,colorspace_pars_fragment:f0,envmap_fragment:p0,envmap_common_pars_fragment:m0,envmap_pars_fragment:g0,envmap_pars_vertex:x0,envmap_physical_pars_fragment:R0,envmap_vertex:y0,fog_vertex:_0,fog_pars_vertex:v0,fog_fragment:b0,fog_pars_fragment:M0,gradientmap_pars_fragment:w0,lightmap_pars_fragment:S0,lights_lambert_fragment:E0,lights_lambert_pars_fragment:A0,lights_pars_begin:T0,lights_toon_fragment:C0,lights_toon_pars_fragment:P0,lights_phong_fragment:I0,lights_phong_pars_fragment:L0,lights_physical_fragment:D0,lights_physical_pars_fragment:U0,lights_fragment_begin:F0,lights_fragment_maps:N0,lights_fragment_end:O0,logdepthbuf_fragment:z0,logdepthbuf_pars_fragment:B0,logdepthbuf_pars_vertex:k0,logdepthbuf_vertex:H0,map_fragment:V0,map_pars_fragment:G0,map_particle_fragment:W0,map_particle_pars_fragment:X0,metalnessmap_fragment:q0,metalnessmap_pars_fragment:Y0,morphinstance_vertex:$0,morphcolor_vertex:j0,morphnormal_vertex:Z0,morphtarget_pars_vertex:J0,morphtarget_vertex:K0,normal_fragment_begin:Q0,normal_fragment_maps:ex,normal_pars_fragment:tx,normal_pars_vertex:nx,normal_vertex:ix,normalmap_pars_fragment:rx,clearcoat_normal_fragment_begin:sx,clearcoat_normal_fragment_maps:ox,clearcoat_pars_fragment:ax,iridescence_pars_fragment:cx,opaque_fragment:lx,packing:ux,premultiplied_alpha_fragment:hx,project_vertex:dx,dithering_fragment:fx,dithering_pars_fragment:px,roughnessmap_fragment:mx,roughnessmap_pars_fragment:gx,shadowmap_pars_fragment:xx,shadowmap_pars_vertex:yx,shadowmap_vertex:_x,shadowmask_pars_fragment:vx,skinbase_vertex:bx,skinning_pars_vertex:Mx,skinning_vertex:wx,skinnormal_vertex:Sx,specularmap_fragment:Ex,specularmap_pars_fragment:Ax,tonemapping_fragment:Tx,tonemapping_pars_fragment:Rx,transmission_fragment:Cx,transmission_pars_fragment:Px,uv_pars_fragment:Ix,uv_pars_vertex:Lx,uv_vertex:Dx,worldpos_vertex:Ux,background_vert:Fx,background_frag:Nx,backgroundCube_vert:Ox,backgroundCube_frag:zx,cube_vert:Bx,cube_frag:kx,depth_vert:Hx,depth_frag:Vx,distanceRGBA_vert:Gx,distanceRGBA_frag:Wx,equirect_vert:Xx,equirect_frag:qx,linedashed_vert:Yx,linedashed_frag:$x,meshbasic_vert:jx,meshbasic_frag:Zx,meshlambert_vert:Jx,meshlambert_frag:Kx,meshmatcap_vert:Qx,meshmatcap_frag:ey,meshnormal_vert:ty,meshnormal_frag:ny,meshphong_vert:iy,meshphong_frag:ry,meshphysical_vert:sy,meshphysical_frag:oy,meshtoon_vert:ay,meshtoon_frag:cy,points_vert:ly,points_frag:uy,shadow_vert:hy,shadow_frag:dy,sprite_vert:fy,sprite_frag:py},Ce={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Ti={basic:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Pn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Pn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Pn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Pn([Ce.points,Ce.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Pn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Pn([Ce.common,Ce.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Pn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Pn([Ce.sprite,Ce.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:Pn([Ce.common,Ce.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:Pn([Ce.lights,Ce.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Ti.physical={uniforms:Pn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};var ua={r:0,b:0,g:0},Ur=new Nn,my=new bt;function gy(i,e,t,n,r,s,o){let a=new Je(0),c=s===!0?0:1,l,u,h=null,p=0,f=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function x(v){let y=!1,_=g(v);_===null?d(a,c):_&&_.isColor&&(d(_,1),y=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,y){let _=g(y);_&&(_.isCubeTexture||_.mapping===ja)?(u===void 0&&(u=new it(new Ii(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:Es(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ur.copy(y.backgroundRotation),Ur.x*=-1,Ur.y*=-1,Ur.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ur.y*=-1,Ur.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(my.makeRotationFromEuler(Ur)),u.material.toneMapped=Tt.getTransfer(_.colorSpace)!==Bt,(h!==_||p!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,p=_.version,f=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new it(new yr(2,2),new Ln({name:"BackgroundMaterial",uniforms:Es(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Tt.getTransfer(_.colorSpace)!==Bt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||p!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,p=_.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function d(v,y){v.getRGB(ua,pf(i)),n.buffers.color.setClear(ua.r,ua.g,ua.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(a,c)},render:x,addToRenderList:m}}function xy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null),s=r,o=!1;function a(M,C,F,V,Y){let X=!1,I=h(V,F,C);s!==I&&(s=I,l(s.object)),X=f(M,V,F,Y),X&&g(M,V,F,Y),Y!==null&&e.update(Y,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,_(M,C,F,V),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function h(M,C,F){let V=F.wireframe===!0,Y=n[M.id];Y===void 0&&(Y={},n[M.id]=Y);let X=Y[C.id];X===void 0&&(X={},Y[C.id]=X);let I=X[V];return I===void 0&&(I=p(c()),X[V]=I),I}function p(M){let C=[],F=[],V=[];for(let Y=0;Y<t;Y++)C[Y]=0,F[Y]=0,V[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:F,attributeDivisors:V,object:M,attributes:{},index:null}}function f(M,C,F,V){let Y=s.attributes,X=C.attributes,I=0,Q=F.getAttributes();for(let W in Q)if(Q[W].location>=0){let H=Y[W],k=X[W];if(k===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(k=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(k=M.instanceColor)),H===void 0||H.attribute!==k||k&&H.data!==k.data)return!0;I++}return s.attributesNum!==I||s.index!==V}function g(M,C,F,V){let Y={},X=C.attributes,I=0,Q=F.getAttributes();for(let W in Q)if(Q[W].location>=0){let H=X[W];H===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(H=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(H=M.instanceColor));let k={};k.attribute=H,H&&H.data&&(k.data=H.data),Y[W]=k,I++}s.attributes=Y,s.attributesNum=I,s.index=V}function x(){let M=s.newAttributes;for(let C=0,F=M.length;C<F;C++)M[C]=0}function m(M){d(M,0)}function d(M,C){let F=s.newAttributes,V=s.enabledAttributes,Y=s.attributeDivisors;F[M]=1,V[M]===0&&(i.enableVertexAttribArray(M),V[M]=1),Y[M]!==C&&(i.vertexAttribDivisor(M,C),Y[M]=C)}function v(){let M=s.newAttributes,C=s.enabledAttributes;for(let F=0,V=C.length;F<V;F++)C[F]!==M[F]&&(i.disableVertexAttribArray(F),C[F]=0)}function y(M,C,F,V,Y,X,I){I===!0?i.vertexAttribIPointer(M,C,F,Y,X):i.vertexAttribPointer(M,C,F,V,Y,X)}function _(M,C,F,V){x();let Y=V.attributes,X=F.getAttributes(),I=C.defaultAttributeValues;for(let Q in X){let W=X[Q];if(W.location>=0){let B=Y[Q];if(B===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(B=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(B=M.instanceColor)),B!==void 0){let H=B.normalized,k=B.itemSize,z=e.get(B);if(z===void 0)continue;let te=z.buffer,U=z.type,j=z.bytesPerElement,ee=U===i.INT||U===i.UNSIGNED_INT||B.gpuType===Nu;if(B.isInterleavedBufferAttribute){let xe=B.data,ie=xe.stride,ne=B.offset;if(xe.isInstancedInterleavedBuffer){for(let Ee=0;Ee<W.locationSize;Ee++)d(W.location+Ee,xe.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Ee=0;Ee<W.locationSize;Ee++)m(W.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Ee=0;Ee<W.locationSize;Ee++)y(W.location+Ee,k/W.locationSize,U,H,ie*j,(ne+k/W.locationSize*Ee)*j,ee)}else{if(B.isInstancedBufferAttribute){for(let xe=0;xe<W.locationSize;xe++)d(W.location+xe,B.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let xe=0;xe<W.locationSize;xe++)m(W.location+xe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let xe=0;xe<W.locationSize;xe++)y(W.location+xe,k/W.locationSize,U,H,k*j,k/W.locationSize*xe*j,ee)}}else if(I!==void 0){let H=I[Q];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(W.location,H);break;case 3:i.vertexAttrib3fv(W.location,H);break;case 4:i.vertexAttrib4fv(W.location,H);break;default:i.vertexAttrib1fv(W.location,H)}}}}v()}function w(){T();for(let M in n){let C=n[M];for(let F in C){let V=C[F];for(let Y in V)u(V[Y].object),delete V[Y];delete C[F]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;let C=n[M.id];for(let F in C){let V=C[F];for(let Y in V)u(V[Y].object),delete V[Y];delete C[F]}delete n[M.id]}function A(M){for(let C in n){let F=n[C];if(F[M.id]===void 0)continue;let V=F[M.id];for(let Y in V)u(V[Y].object),delete V[Y];delete F[M.id]}}function T(){b(),o=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:T,resetDefaultState:b,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function yy(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function c(l,u,h,p){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],u[g],p[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,p,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*p[x];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function _y(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==yi&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let T=A===vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Ji&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ri&&!T)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:w,maxSamples:E}}function vy(i){let e=this,t=null,n=0,r=!1,s=!1,o=new $i,a=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let f=h.length!==0||p||n!==0||r;return r=p,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=u(h,p,0)},this.setState=function(h,p,f){let g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{let v=s?0:n,y=v*4,_=d.clippingState||null;c.value=_,_=u(g,p,y,f);for(let w=0;w!==y;++w)_[w]=t[w];d.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,p,f,g){let x=h!==null?h.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let d=f+x*4,v=p.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,_=f;y!==x;++y,_+=4)o.copy(h[y]).applyMatrix4(v,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function by(i){let e=new WeakMap;function t(o,a){return a===lo?o.mapping=bs:a===vl&&(o.mapping=Ms),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===lo||a===vl)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new eu(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Ia=class extends As{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ms=4,gd=[.125,.215,.35,.446,.526,.582],Br=20,el=new Ia,xd=new Je,tl=null,nl=0,il=0,rl=!1,Nr=(1+Math.sqrt(5))/2,ds=1/Nr,yd=[new D(-Nr,ds,0),new D(Nr,ds,0),new D(-ds,0,Nr),new D(ds,0,Nr),new D(0,Nr,-ds),new D(0,Nr,ds),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],La=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){tl=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tl,nl,il),this._renderer.xr.enabled=rl,e.scissorTest=!1,ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===Ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tl=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:vr,format:yi,colorSpace:Is,depthBuffer:!1},r=_d(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_d(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=My(s)),this._blurMaterial=wy(s,e,t)}return r}_compileMaterial(e){let t=new it(this._lodPlanes[0],e);this._renderer.compile(t,el)}_sceneToCubeUV(e,t,n,r){let a=new In(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,p=u.toneMapping;u.getClearColor(xd),u.toneMapping=Pi,u.autoClear=!1;let f=new $t({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),g=new it(new Ii,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(xd),x=!0);for(let d=0;d<6;d++){let v=d%3;v===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):v===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let y=this._cubeSize;ha(r,v*y,d>2?y:0,y,y),u.setRenderTarget(r),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===bs||e.mapping===Ms;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vd());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new it(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;ha(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,el)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=yd[(r-s-1)%yd.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new it(this._lodPlanes[r],l),p=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Br-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Br;m>Br&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Br}`);let d=[],v=0;for(let A=0;A<Br;++A){let T=A/x,b=Math.exp(-T*T/2);d.push(b),A===0?v+=b:A<m&&(v+=2*b)}for(let A=0;A<d.length;A++)d[A]=d[A]/v;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);let{_lodMax:y}=this;p.dTheta.value=g,p.mipInt.value=y-n;let _=this._sizeLods[r],w=3*_*(r>y-ms?r-y+ms:0),E=4*(this._cubeSize-_);ha(t,w,E,3*_,2*_),c.setRenderTarget(t),c.render(h,el)}};function My(i){let e=[],t=[],n=[],r=i,s=i-ms+1+gd.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let c=1/a;o>i-ms?c=gd[o-i+ms-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,p=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,d=1,v=new Float32Array(x*g*f),y=new Float32Array(m*g*f),_=new Float32Array(d*g*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,T=E>2?0:-1,b=[A,T,0,A+2/3,T,0,A+2/3,T+1,0,A,T,0,A+2/3,T+1,0,A,T+1,0];v.set(b,x*g*E),y.set(p,m*g*E);let M=[E,E,E,E,E,E];_.set(M,d*g*E)}let w=new Mt;w.setAttribute("position",new Zn(v,x)),w.setAttribute("uv",new Zn(y,m)),w.setAttribute("faceIndex",new Zn(_,d)),e.push(w),r>ms&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function _d(i,e,t){let n=new ni(i,e,t);return n.texture.mapping=ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ha(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function wy(i,e,t){let n=new Float32Array(Br),r=new D(0,1,0);return new Ln({name:"SphericalGaussianBlur",defines:{n:Br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Wu(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function vd(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wu(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function bd(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Wu(){return`

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
	`}function Sy(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===lo||c===vl,u=c===bs||c===Ms;if(l||u){let h=e.get(a),p=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new La(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return l&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new La(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){let c=a.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Ey(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&no("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Ay(i,e,t,n){let r={},s=new WeakMap;function o(h){let p=h.target;p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);for(let g in p.morphAttributes){let x=p.morphAttributes[g];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}p.removeEventListener("dispose",o),delete r[p.id];let f=s.get(p);f&&(e.remove(f),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(h,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,t.memory.geometries++),p}function c(h){let p=h.attributes;for(let g in p)e.update(p[g],i.ARRAY_BUFFER);let f=h.morphAttributes;for(let g in f){let x=f[g];for(let m=0,d=x.length;m<d;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(h){let p=[],f=h.index,g=h.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let y=0,_=v.length;y<_;y+=3){let w=v[y+0],E=v[y+1],A=v[y+2];p.push(w,E,E,A,A,w)}}else if(g!==void 0){let v=g.array;x=g.version;for(let y=0,_=v.length/3-1;y<_;y+=3){let w=y+0,E=y+1,A=y+2;p.push(w,E,E,A,A,w)}}else return;let m=new(df(p)?Ca:Ra)(p,1);m.version=x;let d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){let p=s.get(h);if(p){let f=h.index;f!==null&&p.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Ty(i,e,t){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function c(p,f){i.drawElements(n,f,s,p*o),t.update(f,n,1)}function l(p,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,p*o,g),t.update(f,n,g))}function u(p,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,p,0,g);let m=0;for(let d=0;d<g;d++)m+=f[d];t.update(m,n,1)}function h(p,f,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<p.length;d++)l(p[d]/o,f[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,p,0,x,0,g);let d=0;for(let v=0;v<g;v++)d+=f[v]*x[v];t.update(d,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Ry(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Cy(i,e,t){let n=new WeakMap,r=new Zt;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,p=n.get(a);if(p===void 0||p.count!==h){let b=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",b)};p!==void 0&&p.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*w*4*h),A=new Ta(E,_,w,h);A.type=Ri,A.needsUpdate=!0;let T=y*4;for(let M=0;M<h;M++){let C=m[M],F=d[M],V=v[M],Y=_*w*4*M;for(let X=0;X<C.count;X++){let I=X*T;f===!0&&(r.fromBufferAttribute(C,X),E[Y+I+0]=r.x,E[Y+I+1]=r.y,E[Y+I+2]=r.z,E[Y+I+3]=0),g===!0&&(r.fromBufferAttribute(F,X),E[Y+I+4]=r.x,E[Y+I+5]=r.y,E[Y+I+6]=r.z,E[Y+I+7]=0),x===!0&&(r.fromBufferAttribute(V,X),E[Y+I+8]=r.x,E[Y+I+9]=r.y,E[Y+I+10]=r.z,E[Y+I+11]=V.itemSize===4?r.w:1)}}p={count:h,texture:A,size:new Be(_,w)},n.set(a,p),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function Py(i,e,t,n){let r=new WeakMap;function s(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==l&&(p.update(),r.set(p,l))}return h}function o(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}var Ts=class extends Sn{constructor(e,t,n,r,s,o,a,c,l,u=xs){if(u!==xs&&u!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===xs&&(n=Ki),n===void 0&&u===Ss&&(n=ws),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:jn,this.minFilter=c!==void 0?c:jn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},gf=new Sn,Md=new Ts(1,1),xf=new Ta,yf=new Kl,_f=new Pa,wd=[],Sd=[],Ed=new Float32Array(16),Ad=new Float32Array(9),Td=new Float32Array(4);function Ds(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=wd[r];if(s===void 0&&(s=new Float32Array(r),wd[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function cn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ja(i,e){let t=Sd[e];t===void 0&&(t=new Int32Array(e),Sd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Iy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ly(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2fv(this.addr,e),ln(t,e)}}function Dy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(cn(t,e))return;i.uniform3fv(this.addr,e),ln(t,e)}}function Uy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4fv(this.addr,e),ln(t,e)}}function Fy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(cn(t,n))return;Td.set(n),i.uniformMatrix2fv(this.addr,!1,Td),ln(t,n)}}function Ny(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(cn(t,n))return;Ad.set(n),i.uniformMatrix3fv(this.addr,!1,Ad),ln(t,n)}}function Oy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(cn(t,n))return;Ed.set(n),i.uniformMatrix4fv(this.addr,!1,Ed),ln(t,n)}}function zy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function By(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2iv(this.addr,e),ln(t,e)}}function ky(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3iv(this.addr,e),ln(t,e)}}function Hy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4iv(this.addr,e),ln(t,e)}}function Vy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Gy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2uiv(this.addr,e),ln(t,e)}}function Wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3uiv(this.addr,e),ln(t,e)}}function Xy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4uiv(this.addr,e),ln(t,e)}}function qy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Md.compareFunction=hf,s=Md):s=gf,t.setTexture2D(e||s,r)}function Yy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||yf,r)}function $y(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||_f,r)}function jy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||xf,r)}function Zy(i){switch(i){case 5126:return Iy;case 35664:return Ly;case 35665:return Dy;case 35666:return Uy;case 35674:return Fy;case 35675:return Ny;case 35676:return Oy;case 5124:case 35670:return zy;case 35667:case 35671:return By;case 35668:case 35672:return ky;case 35669:case 35673:return Hy;case 5125:return Vy;case 36294:return Gy;case 36295:return Wy;case 36296:return Xy;case 35678:case 36198:case 36298:case 36306:case 35682:return qy;case 35679:case 36299:case 36307:return Yy;case 35680:case 36300:case 36308:case 36293:return $y;case 36289:case 36303:case 36311:case 36292:return jy}}function Jy(i,e){i.uniform1fv(this.addr,e)}function Ky(i,e){let t=Ds(e,this.size,2);i.uniform2fv(this.addr,t)}function Qy(i,e){let t=Ds(e,this.size,3);i.uniform3fv(this.addr,t)}function e_(i,e){let t=Ds(e,this.size,4);i.uniform4fv(this.addr,t)}function t_(i,e){let t=Ds(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function n_(i,e){let t=Ds(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function i_(i,e){let t=Ds(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function r_(i,e){i.uniform1iv(this.addr,e)}function s_(i,e){i.uniform2iv(this.addr,e)}function o_(i,e){i.uniform3iv(this.addr,e)}function a_(i,e){i.uniform4iv(this.addr,e)}function c_(i,e){i.uniform1uiv(this.addr,e)}function l_(i,e){i.uniform2uiv(this.addr,e)}function u_(i,e){i.uniform3uiv(this.addr,e)}function h_(i,e){i.uniform4uiv(this.addr,e)}function d_(i,e,t){let n=this.cache,r=e.length,s=Ja(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||gf,s[o])}function f_(i,e,t){let n=this.cache,r=e.length,s=Ja(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||yf,s[o])}function p_(i,e,t){let n=this.cache,r=e.length,s=Ja(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||_f,s[o])}function m_(i,e,t){let n=this.cache,r=e.length,s=Ja(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||xf,s[o])}function g_(i){switch(i){case 5126:return Jy;case 35664:return Ky;case 35665:return Qy;case 35666:return e_;case 35674:return t_;case 35675:return n_;case 35676:return i_;case 5124:case 35670:return r_;case 35667:case 35671:return s_;case 35668:case 35672:return o_;case 35669:case 35673:return a_;case 5125:return c_;case 36294:return l_;case 36295:return u_;case 36296:return h_;case 35678:case 36198:case 36298:case 36306:case 35682:return d_;case 35679:case 36299:case 36307:return f_;case 35680:case 36300:case 36308:case 36293:return p_;case 36289:case 36303:case 36311:case 36292:return m_}}var tu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Zy(t.type)}},nu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=g_(t.type)}},iu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},sl=/(\w+)(\])?(\[|\.)?/g;function Rd(i,e){i.seq.push(e),i.map[e.id]=e}function x_(i,e,t){let n=i.name,r=n.length;for(sl.lastIndex=0;;){let s=sl.exec(n),o=sl.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Rd(t,l===void 0?new tu(a,i,e):new nu(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new iu(a),Rd(t,h)),t=h}}}var _s=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);x_(s,o,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function Cd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var y_=37297,__=0;function v_(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Pd=new dt;function b_(i){Tt._getMatrix(Pd,Tt.workingColorSpace,i);let e=`mat3( ${Pd.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(i)){case Za:return[e,"LinearTransferOETF"];case Bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Id(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+v_(i.getShaderSource(e),o)}else return r}function M_(i,e){let t=b_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function w_(i,e){let t;switch(e){case Um:t="Linear";break;case Fm:t="Reinhard";break;case Nm:t="Cineon";break;case Fu:t="ACESFilmic";break;case zm:t="AgX";break;case Bm:t="Neutral";break;case Om:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var da=new D;function S_(){Tt.getLuminanceCoefficients(da);let i=da.x.toFixed(4),e=da.y.toFixed(4),t=da.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(io).join(`
`)}function A_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function T_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function io(i){return i!==""}function Ld(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var R_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ru(i){return i.replace(R_,P_)}var C_=new Map;function P_(i,e){let t=pt[e];if(t===void 0){let n=C_.get(e);if(n!==void 0)t=pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ru(t)}var I_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ud(i){return i.replace(I_,L_)}function L_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Fd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function D_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Jd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Uu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yi&&(e="SHADOWMAP_TYPE_VSM"),e}function U_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case bs:case Ms:e="ENVMAP_TYPE_CUBE";break;case ja:e="ENVMAP_TYPE_CUBE_UV";break}return e}function F_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ms:e="ENVMAP_MODE_REFRACTION";break}return e}function N_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Kd:e="ENVMAP_BLENDING_MULTIPLY";break;case Lm:e="ENVMAP_BLENDING_MIX";break;case Dm:e="ENVMAP_BLENDING_ADD";break}return e}function O_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function z_(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=D_(t),l=U_(t),u=F_(t),h=N_(t),p=O_(t),f=E_(t),g=A_(s),x=r.createProgram(),m,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(io).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(io).join(`
`),d.length>0&&(d+=`
`)):(m=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(io).join(`
`),d=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?pt.tonemapping_pars_fragment:"",t.toneMapping!==Pi?w_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,M_("linearToOutputTexel",t.outputColorSpace),S_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(io).join(`
`)),o=ru(o),o=Ld(o,t),o=Dd(o,t),a=ru(a),a=Ld(a,t),a=Dd(a,t),o=Ud(o),a=Ud(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===$h?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let y=v+m+o,_=v+d+a,w=Cd(r,r.VERTEX_SHADER,y),E=Cd(r,r.FRAGMENT_SHADER,_);r.attachShader(x,w),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){let F=r.getProgramInfoLog(x).trim(),V=r.getShaderInfoLog(w).trim(),Y=r.getShaderInfoLog(E).trim(),X=!0,I=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,w,E);else{let Q=Id(r,w,"vertex"),W=Id(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+Q+`
`+W)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(V===""||Y==="")&&(I=!1);I&&(C.diagnostics={runnable:X,programLog:F,vertexShader:{log:V,prefix:m},fragmentShader:{log:Y,prefix:d}})}r.deleteShader(w),r.deleteShader(E),T=new _s(r,x),b=T_(r,x)}let T;this.getUniforms=function(){return T===void 0&&A(this),T};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,y_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=__++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}var B_=0,su=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ou(e),t.set(e,n)),n}},ou=class{constructor(e){this.id=B_++,this.code=e,this.usedTimes=0}};function k_(i,e,t,n,r,s,o){let a=new po,c=new su,l=new Set,u=[],h=r.logarithmicDepthBuffer,p=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,C,F,V){let Y=F.fog,X=V.geometry,I=b.isMeshStandardMaterial?F.environment:null,Q=(b.isMeshStandardMaterial?t:e).get(b.envMap||I),W=Q&&Q.mapping===ja?Q.image.height:null,B=g[b.type];b.precision!==null&&(f=r.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let H=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,k=H!==void 0?H.length:0,z=0;X.morphAttributes.position!==void 0&&(z=1),X.morphAttributes.normal!==void 0&&(z=2),X.morphAttributes.color!==void 0&&(z=3);let te,U,j,ee;if(B){let St=Ti[B];te=St.vertexShader,U=St.fragmentShader}else te=b.vertexShader,U=b.fragmentShader,c.update(b),j=c.getVertexShaderID(b),ee=c.getFragmentShaderID(b);let xe=i.getRenderTarget(),ie=i.state.buffers.depth.getReversed(),ne=V.isInstancedMesh===!0,Ee=V.isBatchedMesh===!0,de=!!b.map,O=!!b.matcap,q=!!Q,G=!!b.aoMap,Ae=!!b.lightMap,ae=!!b.bumpMap,Ve=!!b.normalMap,ke=!!b.displacementMap,ut=!!b.emissiveMap,ze=!!b.metalnessMap,P=!!b.roughnessMap,S=b.anisotropy>0,Z=b.clearcoat>0,ce=b.dispersion>0,le=b.iridescence>0,pe=b.sheen>0,Ye=b.transmission>0,Se=S&&!!b.anisotropyMap,Ne=Z&&!!b.clearcoatMap,xt=Z&&!!b.clearcoatNormalMap,ve=Z&&!!b.clearcoatRoughnessMap,He=le&&!!b.iridescenceMap,je=le&&!!b.iridescenceThicknessMap,Oe=pe&&!!b.sheenColorMap,Te=pe&&!!b.sheenRoughnessMap,ft=!!b.specularMap,ot=!!b.specularColorMap,Nt=!!b.specularIntensityMap,L=Ye&&!!b.transmissionMap,Re=Ye&&!!b.thicknessMap,he=!!b.gradientMap,me=!!b.alphaMap,Ie=b.alphaTest>0,Le=!!b.alphaHash,Ze=!!b.extensions,kt=Pi;b.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(kt=i.toneMapping);let rn={shaderID:B,shaderType:b.type,shaderName:b.name,vertexShader:te,fragmentShader:U,defines:b.defines,customVertexShaderID:j,customFragmentShaderID:ee,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ee,batchingColor:Ee&&V._colorsTexture!==null,instancing:ne,instancingColor:ne&&V.instanceColor!==null,instancingMorph:ne&&V.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Is,alphaToCoverage:!!b.alphaToCoverage,map:de,matcap:O,envMap:q,envMapMode:q&&Q.mapping,envMapCubeUVHeight:W,aoMap:G,lightMap:Ae,bumpMap:ae,normalMap:Ve,displacementMap:p&&ke,emissiveMap:ut,normalMapObjectSpace:Ve&&b.normalMapType===Gm,normalMapTangentSpace:Ve&&b.normalMapType===uf,metalnessMap:ze,roughnessMap:P,anisotropy:S,anisotropyMap:Se,clearcoat:Z,clearcoatMap:Ne,clearcoatNormalMap:xt,clearcoatRoughnessMap:ve,dispersion:ce,iridescence:le,iridescenceMap:He,iridescenceThicknessMap:je,sheen:pe,sheenColorMap:Oe,sheenRoughnessMap:Te,specularMap:ft,specularColorMap:ot,specularIntensityMap:Nt,transmission:Ye,transmissionMap:L,thicknessMap:Re,gradientMap:he,opaque:b.transparent===!1&&b.blending===gs&&b.alphaToCoverage===!1,alphaMap:me,alphaTest:Ie,alphaHash:Le,combine:b.combine,mapUv:de&&x(b.map.channel),aoMapUv:G&&x(b.aoMap.channel),lightMapUv:Ae&&x(b.lightMap.channel),bumpMapUv:ae&&x(b.bumpMap.channel),normalMapUv:Ve&&x(b.normalMap.channel),displacementMapUv:ke&&x(b.displacementMap.channel),emissiveMapUv:ut&&x(b.emissiveMap.channel),metalnessMapUv:ze&&x(b.metalnessMap.channel),roughnessMapUv:P&&x(b.roughnessMap.channel),anisotropyMapUv:Se&&x(b.anisotropyMap.channel),clearcoatMapUv:Ne&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:xt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:je&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Te&&x(b.sheenRoughnessMap.channel),specularMapUv:ft&&x(b.specularMap.channel),specularColorMapUv:ot&&x(b.specularColorMap.channel),specularIntensityMapUv:Nt&&x(b.specularIntensityMap.channel),transmissionMapUv:L&&x(b.transmissionMap.channel),thicknessMapUv:Re&&x(b.thicknessMap.channel),alphaMapUv:me&&x(b.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ve||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!X.attributes.uv&&(de||me),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ie,skinning:V.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:z,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:kt,decodeVideoTexture:de&&b.map.isVideoTexture===!0&&Tt.getTransfer(b.map.colorSpace)===Bt,decodeVideoTextureEmissive:ut&&b.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(b.emissiveMap.colorSpace)===Bt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Vt,flipSided:b.side===Fn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ze&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ze&&b.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return rn.vertexUv1s=l.has(1),rn.vertexUv2s=l.has(2),rn.vertexUv3s=l.has(3),l.clear(),rn}function d(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let C in b.defines)M.push(C),M.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(v(M,b),y(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function v(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let M=g[b.type],C;if(M){let F=Ti[M];C=Pg.clone(F.uniforms)}else C=b.uniforms;return C}function w(b,M){let C;for(let F=0,V=u.length;F<V;F++){let Y=u[F];if(Y.cacheKey===M){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new z_(i,M,b,s),u.push(C)),C}function E(b){if(--b.usedTimes===0){let M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function A(b){c.remove(b)}function T(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:_,acquireProgram:w,releaseProgram:E,releaseShaderCache:A,programs:u,dispose:T}}function H_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function V_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Nd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Od(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,p,f,g,x,m){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:p,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[e]=d):(d.id=h.id,d.object=h,d.geometry=p,d.material=f,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=x,d.group=m),e++,d}function a(h,p,f,g,x,m){let d=o(h,p,f,g,x,m);f.transmission>0?n.push(d):f.transparent===!0?r.push(d):t.push(d)}function c(h,p,f,g,x,m){let d=o(h,p,f,g,x,m);f.transmission>0?n.unshift(d):f.transparent===!0?r.unshift(d):t.unshift(d)}function l(h,p){t.length>1&&t.sort(h||V_),n.length>1&&n.sort(p||Nd),r.length>1&&r.sort(p||Nd)}function u(){for(let h=e,p=i.length;h<p;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function G_(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new Od,i.set(n,[o])):r>=s.length?(o=new Od,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function W_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Je};break;case"SpotLight":t={position:new D,direction:new D,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function X_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var q_=0;function Y_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $_(i){let e=new W_,t=X_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let r=new D,s=new bt,o=new bt;function a(l){let u=0,h=0,p=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,x=0,m=0,d=0,v=0,y=0,_=0,w=0,E=0,A=0;l.sort(Y_);for(let b=0,M=l.length;b<M;b++){let C=l[b],F=C.color,V=C.intensity,Y=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=F.r*V,h+=F.g*V,p+=F.b*V;else if(C.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(C.sh.coefficients[I],V);A++}else if(C.isDirectionalLight){let I=e.get(C);if(I.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Q=C.shadow,W=t.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=C.shadow.matrix,v++}n.directional[f]=I,f++}else if(C.isSpotLight){let I=e.get(C);I.position.setFromMatrixPosition(C.matrixWorld),I.color.copy(F).multiplyScalar(V),I.distance=Y,I.coneCos=Math.cos(C.angle),I.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),I.decay=C.decay,n.spot[x]=I;let Q=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,Q.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[x]=Q.matrix,C.castShadow){let W=t.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=X,_++}x++}else if(C.isRectAreaLight){let I=e.get(C);I.color.copy(F).multiplyScalar(V),I.halfWidth.set(C.width*.5,0,0),I.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=I,m++}else if(C.isPointLight){let I=e.get(C);if(I.color.copy(C.color).multiplyScalar(C.intensity),I.distance=C.distance,I.decay=C.decay,C.castShadow){let Q=C.shadow,W=t.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,y++}n.point[g]=I,g++}else if(C.isHemisphereLight){let I=e.get(C);I.skyColor.copy(C.color).multiplyScalar(V),I.groundColor.copy(C.groundColor).multiplyScalar(V),n.hemi[d]=I,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=p;let T=n.hash;(T.directionalLength!==f||T.pointLength!==g||T.spotLength!==x||T.rectAreaLength!==m||T.hemiLength!==d||T.numDirectionalShadows!==v||T.numPointShadows!==y||T.numSpotShadows!==_||T.numSpotMaps!==w||T.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,T.directionalLength=f,T.pointLength=g,T.spotLength=x,T.rectAreaLength=m,T.hemiLength=d,T.numDirectionalShadows=v,T.numPointShadows=y,T.numSpotShadows=_,T.numSpotMaps=w,T.numLightProbes=A,n.version=q_++)}function c(l,u){let h=0,p=0,f=0,g=0,x=0,m=u.matrixWorldInverse;for(let d=0,v=l.length;d<v;d++){let y=l[d];if(y.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),h++}else if(y.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),p++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function zd(i){let e=new $_(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function j_(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new zd(i),e.set(r,[a])):s>=o.length?(a=new zd(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var au=class extends xr{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Hm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},cu=class extends xr{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Z_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J_=`uniform sampler2D shadow_pass;
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
}`;function K_(i,e,t){let n=new mo,r=new Be,s=new Be,o=new Zt,a=new au({depthPacking:Vm}),c=new cu,l={},u=t.maxTextureSize,h={[pr]:Fn,[Fn]:pr,[Vt]:Vt},p=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:Z_,fragmentShader:J_}),f=p.clone();f.defines.HORIZONTAL_PASS=1;let g=new Mt;g.setAttribute("position",new Zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new it(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jd;let d=this.type;this.render=function(E,A,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Ci),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let V=d!==Yi&&this.type===Yi,Y=d===Yi&&this.type!==Yi;for(let X=0,I=E.length;X<I;X++){let Q=E[X],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let B=W.getFrameExtents();if(r.multiply(B),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/B.x),r.x=s.x*B.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/B.y),r.y=s.y*B.y,W.mapSize.y=s.y)),W.map===null||V===!0||Y===!0){let k=this.type!==Yi?{minFilter:jn,magFilter:jn}:{};W.map!==null&&W.map.dispose(),W.map=new ni(r.x,r.y,k),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let H=W.getViewportCount();for(let k=0;k<H;k++){let z=W.getViewport(k);o.set(s.x*z.x,s.y*z.y,s.x*z.z,s.y*z.w),F.viewport(o),W.updateMatrices(Q,k),n=W.getFrustum(),_(A,T,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===Yi&&v(W,T),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,C)};function v(E,A){let T=e.update(x);p.defines.VSM_SAMPLES!==E.blurSamples&&(p.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ni(r.x,r.y)),p.uniforms.shadow_pass.value=E.map.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,T,p,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,T,f,x,null)}function y(E,A,T,b){let M=null,C=T.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)M=C;else if(M=T.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let F=M.uuid,V=A.uuid,Y=l[F];Y===void 0&&(Y={},l[F]=Y);let X=Y[V];X===void 0&&(X=M.clone(),Y[V]=X,A.addEventListener("dispose",w)),M=X}if(M.visible=A.visible,M.wireframe=A.wireframe,b===Yi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:h[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,T.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let F=i.properties.get(M);F.light=T}return M}function _(E,A,T,b,M){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Yi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,E.matrixWorld);let V=e.update(E),Y=E.material;if(Array.isArray(Y)){let X=V.groups;for(let I=0,Q=X.length;I<Q;I++){let W=X[I],B=Y[W.materialIndex];if(B&&B.visible){let H=y(E,B,b,M);E.onBeforeShadow(i,E,A,T,V,H,W),i.renderBufferDirect(T,null,V,H,E,W),E.onAfterShadow(i,E,A,T,V,H,W)}}}else if(Y.visible){let X=y(E,Y,b,M);E.onBeforeShadow(i,E,A,T,V,X,null),i.renderBufferDirect(T,null,V,X,E,null),E.onAfterShadow(i,E,A,T,V,X,null)}}let F=E.children;for(let V=0,Y=F.length;V<Y;V++)_(F[V],A,T,b,M)}function w(E){E.target.removeEventListener("dispose",w);for(let T in l){let b=l[T],M=E.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var Q_={[fl]:pl,[ml]:yl,[gl]:_l,[vs]:xl,[pl]:fl,[yl]:ml,[_l]:gl,[xl]:vs};function ev(i,e){function t(){let L=!1,Re=new Zt,he=null,me=new Zt(0,0,0,0);return{setMask:function(Ie){he!==Ie&&!L&&(i.colorMask(Ie,Ie,Ie,Ie),he=Ie)},setLocked:function(Ie){L=Ie},setClear:function(Ie,Le,Ze,kt,rn){rn===!0&&(Ie*=kt,Le*=kt,Ze*=kt),Re.set(Ie,Le,Ze,kt),me.equals(Re)===!1&&(i.clearColor(Ie,Le,Ze,kt),me.copy(Re))},reset:function(){L=!1,he=null,me.set(-1,0,0,0)}}}function n(){let L=!1,Re=!1,he=null,me=null,Ie=null;return{setReversed:function(Le){if(Re!==Le){let Ze=e.get("EXT_clip_control");Re?Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.ZERO_TO_ONE_EXT):Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.NEGATIVE_ONE_TO_ONE_EXT);let kt=Ie;Ie=null,this.setClear(kt)}Re=Le},getReversed:function(){return Re},setTest:function(Le){Le?xe(i.DEPTH_TEST):ie(i.DEPTH_TEST)},setMask:function(Le){he!==Le&&!L&&(i.depthMask(Le),he=Le)},setFunc:function(Le){if(Re&&(Le=Q_[Le]),me!==Le){switch(Le){case fl:i.depthFunc(i.NEVER);break;case pl:i.depthFunc(i.ALWAYS);break;case ml:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case gl:i.depthFunc(i.EQUAL);break;case xl:i.depthFunc(i.GEQUAL);break;case yl:i.depthFunc(i.GREATER);break;case _l:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=Le}},setLocked:function(Le){L=Le},setClear:function(Le){Ie!==Le&&(Re&&(Le=1-Le),i.clearDepth(Le),Ie=Le)},reset:function(){L=!1,he=null,me=null,Ie=null,Re=!1}}}function r(){let L=!1,Re=null,he=null,me=null,Ie=null,Le=null,Ze=null,kt=null,rn=null;return{setTest:function(St){L||(St?xe(i.STENCIL_TEST):ie(i.STENCIL_TEST))},setMask:function(St){Re!==St&&!L&&(i.stencilMask(St),Re=St)},setFunc:function(St,_n,ui){(he!==St||me!==_n||Ie!==ui)&&(i.stencilFunc(St,_n,ui),he=St,me=_n,Ie=ui)},setOp:function(St,_n,ui){(Le!==St||Ze!==_n||kt!==ui)&&(i.stencilOp(St,_n,ui),Le=St,Ze=_n,kt=ui)},setLocked:function(St){L=St},setClear:function(St){rn!==St&&(i.clearStencil(St),rn=St)},reset:function(){L=!1,Re=null,he=null,me=null,Ie=null,Le=null,Ze=null,kt=null,rn=null}}}let s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap,u={},h={},p=new WeakMap,f=[],g=null,x=!1,m=null,d=null,v=null,y=null,_=null,w=null,E=null,A=new Je(0,0,0),T=0,b=!1,M=null,C=null,F=null,V=null,Y=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),I=!1,Q=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),I=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),I=Q>=2);let B=null,H={},k=i.getParameter(i.SCISSOR_BOX),z=i.getParameter(i.VIEWPORT),te=new Zt().fromArray(k),U=new Zt().fromArray(z);function j(L,Re,he,me){let Ie=new Uint8Array(4),Le=i.createTexture();i.bindTexture(L,Le),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ze=0;Ze<he;Ze++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(Re,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Ie):i.texImage2D(Re+Ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ie);return Le}let ee={};ee[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),ee[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ee[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),xe(i.DEPTH_TEST),o.setFunc(vs),ae(!1),Ve(Bh),xe(i.CULL_FACE),G(Ci);function xe(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function ie(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function ne(L,Re){return h[L]!==Re?(i.bindFramebuffer(L,Re),h[L]=Re,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Re),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Re),!0):!1}function Ee(L,Re){let he=f,me=!1;if(L){he=p.get(Re),he===void 0&&(he=[],p.set(Re,he));let Ie=L.textures;if(he.length!==Ie.length||he[0]!==i.COLOR_ATTACHMENT0){for(let Le=0,Ze=Ie.length;Le<Ze;Le++)he[Le]=i.COLOR_ATTACHMENT0+Le;he.length=Ie.length,me=!0}}else he[0]!==i.BACK&&(he[0]=i.BACK,me=!0);me&&i.drawBuffers(he)}function de(L){return g!==L?(i.useProgram(L),g=L,!0):!1}let O={[Or]:i.FUNC_ADD,[mm]:i.FUNC_SUBTRACT,[gm]:i.FUNC_REVERSE_SUBTRACT};O[xm]=i.MIN,O[ym]=i.MAX;let q={[_m]:i.ZERO,[vm]:i.ONE,[bm]:i.SRC_COLOR,[hl]:i.SRC_ALPHA,[Tm]:i.SRC_ALPHA_SATURATE,[Em]:i.DST_COLOR,[wm]:i.DST_ALPHA,[Mm]:i.ONE_MINUS_SRC_COLOR,[dl]:i.ONE_MINUS_SRC_ALPHA,[Am]:i.ONE_MINUS_DST_COLOR,[Sm]:i.ONE_MINUS_DST_ALPHA,[Rm]:i.CONSTANT_COLOR,[Cm]:i.ONE_MINUS_CONSTANT_COLOR,[Pm]:i.CONSTANT_ALPHA,[Im]:i.ONE_MINUS_CONSTANT_ALPHA};function G(L,Re,he,me,Ie,Le,Ze,kt,rn,St){if(L===Ci){x===!0&&(ie(i.BLEND),x=!1);return}if(x===!1&&(xe(i.BLEND),x=!0),L!==pm){if(L!==m||St!==b){if((d!==Or||_!==Or)&&(i.blendEquation(i.FUNC_ADD),d=Or,_=Or),St)switch(L){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFunc(i.ONE,i.ONE);break;case Hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,y=null,w=null,E=null,A.set(0,0,0),T=0,m=L,b=St}return}Ie=Ie||Re,Le=Le||he,Ze=Ze||me,(Re!==d||Ie!==_)&&(i.blendEquationSeparate(O[Re],O[Ie]),d=Re,_=Ie),(he!==v||me!==y||Le!==w||Ze!==E)&&(i.blendFuncSeparate(q[he],q[me],q[Le],q[Ze]),v=he,y=me,w=Le,E=Ze),(kt.equals(A)===!1||rn!==T)&&(i.blendColor(kt.r,kt.g,kt.b,rn),A.copy(kt),T=rn),m=L,b=!1}function Ae(L,Re){L.side===Vt?ie(i.CULL_FACE):xe(i.CULL_FACE);let he=L.side===Fn;Re&&(he=!he),ae(he),L.blending===gs&&L.transparent===!1?G(Ci):G(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);let me=L.stencilWrite;a.setTest(me),me&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ut(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?xe(i.SAMPLE_ALPHA_TO_COVERAGE):ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function ae(L){M!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),M=L)}function Ve(L){L!==dm?(xe(i.CULL_FACE),L!==C&&(L===Bh?i.cullFace(i.BACK):L===fm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ie(i.CULL_FACE),C=L}function ke(L){L!==F&&(I&&i.lineWidth(L),F=L)}function ut(L,Re,he){L?(xe(i.POLYGON_OFFSET_FILL),(V!==Re||Y!==he)&&(i.polygonOffset(Re,he),V=Re,Y=he)):ie(i.POLYGON_OFFSET_FILL)}function ze(L){L?xe(i.SCISSOR_TEST):ie(i.SCISSOR_TEST)}function P(L){L===void 0&&(L=i.TEXTURE0+X-1),B!==L&&(i.activeTexture(L),B=L)}function S(L,Re,he){he===void 0&&(B===null?he=i.TEXTURE0+X-1:he=B);let me=H[he];me===void 0&&(me={type:void 0,texture:void 0},H[he]=me),(me.type!==L||me.texture!==Re)&&(B!==he&&(i.activeTexture(he),B=he),i.bindTexture(L,Re||ee[L]),me.type=L,me.texture=Re)}function Z(){let L=H[B];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ce(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function le(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ye(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ne(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function He(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function je(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(L){te.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),te.copy(L))}function Te(L){U.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),U.copy(L))}function ft(L,Re){let he=l.get(Re);he===void 0&&(he=new WeakMap,l.set(Re,he));let me=he.get(L);me===void 0&&(me=i.getUniformBlockIndex(Re,L.name),he.set(L,me))}function ot(L,Re){let me=l.get(Re).get(L);c.get(Re)!==me&&(i.uniformBlockBinding(Re,me,L.__bindingPointIndex),c.set(Re,me))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},B=null,H={},h={},p=new WeakMap,f=[],g=null,x=!1,m=null,d=null,v=null,y=null,_=null,w=null,E=null,A=new Je(0,0,0),T=0,b=!1,M=null,C=null,F=null,V=null,Y=null,te.set(0,0,i.canvas.width,i.canvas.height),U.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:xe,disable:ie,bindFramebuffer:ne,drawBuffers:Ee,useProgram:de,setBlending:G,setMaterial:Ae,setFlipSided:ae,setCullFace:Ve,setLineWidth:ke,setPolygonOffset:ut,setScissorTest:ze,activeTexture:P,bindTexture:S,unbindTexture:Z,compressedTexImage2D:ce,compressedTexImage3D:le,texImage2D:He,texImage3D:je,updateUBOMapping:ft,uniformBlockBinding:ot,texStorage2D:xt,texStorage3D:ve,texSubImage2D:pe,texSubImage3D:Ye,compressedTexSubImage2D:Se,compressedTexSubImage3D:Ne,scissor:Oe,viewport:Te,reset:Nt}}function Bd(i,e,t,n){let r=tv(n);switch(t){case rf:return i*e;case of:return i*e;case af:return i*e*2;case Bu:return i*e/r.components*r.byteLength;case ku:return i*e/r.components*r.byteLength;case cf:return i*e*2/r.components*r.byteLength;case Hu:return i*e*2/r.components*r.byteLength;case sf:return i*e*3/r.components*r.byteLength;case yi:return i*e*4/r.components*r.byteLength;case Vu:return i*e*4/r.components*r.byteLength;case ya:case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case va:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:case Al:return Math.max(i,16)*Math.max(e,8)/4;case wl:case El:return Math.max(i,8)*Math.max(e,8)/2;case Tl:case Rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Il:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ll:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ol:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case zl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case kl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Hl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Gl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ma:case Wl:case Xl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case lf:case ql:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Yl:case $l:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tv(i){switch(i){case Ji:case ef:return{byteLength:1,components:1};case uo:case tf:case vr:return{byteLength:2,components:1};case Ou:case zu:return{byteLength:2,components:4};case Ki:case Nu:case Ri:return{byteLength:4,components:1};case nf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function nv(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Be,u=new WeakMap,h,p=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return f?new OffscreenCanvas(P,S):Ea("canvas")}function x(P,S,Z){let ce=1,le=ze(P);if((le.width>Z||le.height>Z)&&(ce=Z/Math.max(le.width,le.height)),ce<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let pe=Math.floor(ce*le.width),Ye=Math.floor(ce*le.height);h===void 0&&(h=g(pe,Ye));let Se=S?g(pe,Ye):h;return Se.width=pe,Se.height=Ye,Se.getContext("2d").drawImage(P,0,0,pe,Ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+pe+"x"+Ye+")."),Se}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){i.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(P,S,Z,ce,le=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let pe=S;if(S===i.RED&&(Z===i.FLOAT&&(pe=i.R32F),Z===i.HALF_FLOAT&&(pe=i.R16F),Z===i.UNSIGNED_BYTE&&(pe=i.R8)),S===i.RED_INTEGER&&(Z===i.UNSIGNED_BYTE&&(pe=i.R8UI),Z===i.UNSIGNED_SHORT&&(pe=i.R16UI),Z===i.UNSIGNED_INT&&(pe=i.R32UI),Z===i.BYTE&&(pe=i.R8I),Z===i.SHORT&&(pe=i.R16I),Z===i.INT&&(pe=i.R32I)),S===i.RG&&(Z===i.FLOAT&&(pe=i.RG32F),Z===i.HALF_FLOAT&&(pe=i.RG16F),Z===i.UNSIGNED_BYTE&&(pe=i.RG8)),S===i.RG_INTEGER&&(Z===i.UNSIGNED_BYTE&&(pe=i.RG8UI),Z===i.UNSIGNED_SHORT&&(pe=i.RG16UI),Z===i.UNSIGNED_INT&&(pe=i.RG32UI),Z===i.BYTE&&(pe=i.RG8I),Z===i.SHORT&&(pe=i.RG16I),Z===i.INT&&(pe=i.RG32I)),S===i.RGB_INTEGER&&(Z===i.UNSIGNED_BYTE&&(pe=i.RGB8UI),Z===i.UNSIGNED_SHORT&&(pe=i.RGB16UI),Z===i.UNSIGNED_INT&&(pe=i.RGB32UI),Z===i.BYTE&&(pe=i.RGB8I),Z===i.SHORT&&(pe=i.RGB16I),Z===i.INT&&(pe=i.RGB32I)),S===i.RGBA_INTEGER&&(Z===i.UNSIGNED_BYTE&&(pe=i.RGBA8UI),Z===i.UNSIGNED_SHORT&&(pe=i.RGBA16UI),Z===i.UNSIGNED_INT&&(pe=i.RGBA32UI),Z===i.BYTE&&(pe=i.RGBA8I),Z===i.SHORT&&(pe=i.RGBA16I),Z===i.INT&&(pe=i.RGBA32I)),S===i.RGB&&Z===i.UNSIGNED_INT_5_9_9_9_REV&&(pe=i.RGB9_E5),S===i.RGBA){let Ye=le?Za:Tt.getTransfer(ce);Z===i.FLOAT&&(pe=i.RGBA32F),Z===i.HALF_FLOAT&&(pe=i.RGBA16F),Z===i.UNSIGNED_BYTE&&(pe=Ye===Bt?i.SRGB8_ALPHA8:i.RGBA8),Z===i.UNSIGNED_SHORT_4_4_4_4&&(pe=i.RGBA4),Z===i.UNSIGNED_SHORT_5_5_5_1&&(pe=i.RGB5_A1)}return(pe===i.R16F||pe===i.R32F||pe===i.RG16F||pe===i.RG32F||pe===i.RGBA16F||pe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function _(P,S){let Z;return P?S===null||S===Ki||S===ws?Z=i.DEPTH24_STENCIL8:S===Ri?Z=i.DEPTH32F_STENCIL8:S===uo&&(Z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ki||S===ws?Z=i.DEPTH_COMPONENT24:S===Ri?Z=i.DEPTH_COMPONENT32F:S===uo&&(Z=i.DEPTH_COMPONENT16),Z}function w(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==jn&&P.minFilter!==$n?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function E(P){let S=P.target;S.removeEventListener("dispose",E),T(S),S.isVideoTexture&&u.delete(S)}function A(P){let S=P.target;S.removeEventListener("dispose",A),M(S)}function T(P){let S=n.get(P);if(S.__webglInit===void 0)return;let Z=P.source,ce=p.get(Z);if(ce){let le=ce[S.__cacheKey];le.usedTimes--,le.usedTimes===0&&b(P),Object.keys(ce).length===0&&p.delete(Z)}n.remove(P)}function b(P){let S=n.get(P);i.deleteTexture(S.__webglTexture);let Z=P.source,ce=p.get(Z);delete ce[S.__cacheKey],o.memory.textures--}function M(P){let S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(S.__webglFramebuffer[ce]))for(let le=0;le<S.__webglFramebuffer[ce].length;le++)i.deleteFramebuffer(S.__webglFramebuffer[ce][le]);else i.deleteFramebuffer(S.__webglFramebuffer[ce]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[ce])}else{if(Array.isArray(S.__webglFramebuffer))for(let ce=0;ce<S.__webglFramebuffer.length;ce++)i.deleteFramebuffer(S.__webglFramebuffer[ce]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ce=0;ce<S.__webglColorRenderbuffer.length;ce++)S.__webglColorRenderbuffer[ce]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[ce]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let Z=P.textures;for(let ce=0,le=Z.length;ce<le;ce++){let pe=n.get(Z[ce]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(Z[ce])}n.remove(P)}let C=0;function F(){C=0}function V(){let P=C;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),C+=1,P}function Y(P){let S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function X(P,S){let Z=n.get(P);if(P.isVideoTexture&&ke(P),P.isRenderTargetTexture===!1&&P.version>0&&Z.__version!==P.version){let ce=P.image;if(ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{U(Z,P,S);return}}t.bindTexture(i.TEXTURE_2D,Z.__webglTexture,i.TEXTURE0+S)}function I(P,S){let Z=n.get(P);if(P.version>0&&Z.__version!==P.version){U(Z,P,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Z.__webglTexture,i.TEXTURE0+S)}function Q(P,S){let Z=n.get(P);if(P.version>0&&Z.__version!==P.version){U(Z,P,S);return}t.bindTexture(i.TEXTURE_3D,Z.__webglTexture,i.TEXTURE0+S)}function W(P,S){let Z=n.get(P);if(P.version>0&&Z.__version!==P.version){j(Z,P,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture,i.TEXTURE0+S)}let B={[bl]:i.REPEAT,[kr]:i.CLAMP_TO_EDGE,[Ml]:i.MIRRORED_REPEAT},H={[jn]:i.NEAREST,[km]:i.NEAREST_MIPMAP_NEAREST,[qo]:i.NEAREST_MIPMAP_LINEAR,[$n]:i.LINEAR,[Lc]:i.LINEAR_MIPMAP_NEAREST,[Hr]:i.LINEAR_MIPMAP_LINEAR},k={[Wm]:i.NEVER,[Zm]:i.ALWAYS,[Xm]:i.LESS,[hf]:i.LEQUAL,[qm]:i.EQUAL,[jm]:i.GEQUAL,[Ym]:i.GREATER,[$m]:i.NOTEQUAL};function z(P,S){if(S.type===Ri&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===$n||S.magFilter===Lc||S.magFilter===qo||S.magFilter===Hr||S.minFilter===$n||S.minFilter===Lc||S.minFilter===qo||S.minFilter===Hr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,B[S.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,B[S.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,B[S.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,H[S.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,H[S.minFilter]),S.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,k[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===jn||S.minFilter!==qo&&S.minFilter!==Hr||S.type===Ri&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let Z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function te(P,S){let Z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",E));let ce=S.source,le=p.get(ce);le===void 0&&(le={},p.set(ce,le));let pe=Y(S);if(pe!==P.__cacheKey){le[pe]===void 0&&(le[pe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Z=!0),le[pe].usedTimes++;let Ye=le[P.__cacheKey];Ye!==void 0&&(le[P.__cacheKey].usedTimes--,Ye.usedTimes===0&&b(S)),P.__cacheKey=pe,P.__webglTexture=le[pe].texture}return Z}function U(P,S,Z){let ce=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ce=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ce=i.TEXTURE_3D);let le=te(P,S),pe=S.source;t.bindTexture(ce,P.__webglTexture,i.TEXTURE0+Z);let Ye=n.get(pe);if(pe.version!==Ye.__version||le===!0){t.activeTexture(i.TEXTURE0+Z);let Se=Tt.getPrimaries(Tt.workingColorSpace),Ne=S.colorSpace===fr?null:Tt.getPrimaries(S.colorSpace),xt=S.colorSpace===fr||Se===Ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let ve=x(S.image,!1,r.maxTextureSize);ve=ut(S,ve);let He=s.convert(S.format,S.colorSpace),je=s.convert(S.type),Oe=y(S.internalFormat,He,je,S.colorSpace,S.isVideoTexture);z(ce,S);let Te,ft=S.mipmaps,ot=S.isVideoTexture!==!0,Nt=Ye.__version===void 0||le===!0,L=pe.dataReady,Re=w(S,ve);if(S.isDepthTexture)Oe=_(S.format===Ss,S.type),Nt&&(ot?t.texStorage2D(i.TEXTURE_2D,1,Oe,ve.width,ve.height):t.texImage2D(i.TEXTURE_2D,0,Oe,ve.width,ve.height,0,He,je,null));else if(S.isDataTexture)if(ft.length>0){ot&&Nt&&t.texStorage2D(i.TEXTURE_2D,Re,Oe,ft[0].width,ft[0].height);for(let he=0,me=ft.length;he<me;he++)Te=ft[he],ot?L&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Te.width,Te.height,He,je,Te.data):t.texImage2D(i.TEXTURE_2D,he,Oe,Te.width,Te.height,0,He,je,Te.data);S.generateMipmaps=!1}else ot?(Nt&&t.texStorage2D(i.TEXTURE_2D,Re,Oe,ve.width,ve.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve.width,ve.height,He,je,ve.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,ve.width,ve.height,0,He,je,ve.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ot&&Nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Oe,ft[0].width,ft[0].height,ve.depth);for(let he=0,me=ft.length;he<me;he++)if(Te=ft[he],S.format!==yi)if(He!==null)if(ot){if(L)if(S.layerUpdates.size>0){let Ie=Bd(Te.width,Te.height,S.format,S.type);for(let Le of S.layerUpdates){let Ze=Te.data.subarray(Le*Ie/Te.data.BYTES_PER_ELEMENT,(Le+1)*Ie/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,Le,Te.width,Te.height,1,He,Ze)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Te.width,Te.height,ve.depth,He,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,Oe,Te.width,Te.height,ve.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Te.width,Te.height,ve.depth,He,je,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,Oe,Te.width,Te.height,ve.depth,0,He,je,Te.data)}else{ot&&Nt&&t.texStorage2D(i.TEXTURE_2D,Re,Oe,ft[0].width,ft[0].height);for(let he=0,me=ft.length;he<me;he++)Te=ft[he],S.format!==yi?He!==null?ot?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,Te.width,Te.height,He,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,he,Oe,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?L&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Te.width,Te.height,He,je,Te.data):t.texImage2D(i.TEXTURE_2D,he,Oe,Te.width,Te.height,0,He,je,Te.data)}else if(S.isDataArrayTexture)if(ot){if(Nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Oe,ve.width,ve.height,ve.depth),L)if(S.layerUpdates.size>0){let he=Bd(ve.width,ve.height,S.format,S.type);for(let me of S.layerUpdates){let Ie=ve.data.subarray(me*he/ve.data.BYTES_PER_ELEMENT,(me+1)*he/ve.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ve.width,ve.height,1,He,je,Ie)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,He,je,ve.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,ve.width,ve.height,ve.depth,0,He,je,ve.data);else if(S.isData3DTexture)ot?(Nt&&t.texStorage3D(i.TEXTURE_3D,Re,Oe,ve.width,ve.height,ve.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,He,je,ve.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,ve.width,ve.height,ve.depth,0,He,je,ve.data);else if(S.isFramebufferTexture){if(Nt)if(ot)t.texStorage2D(i.TEXTURE_2D,Re,Oe,ve.width,ve.height);else{let he=ve.width,me=ve.height;for(let Ie=0;Ie<Re;Ie++)t.texImage2D(i.TEXTURE_2D,Ie,Oe,he,me,0,He,je,null),he>>=1,me>>=1}}else if(ft.length>0){if(ot&&Nt){let he=ze(ft[0]);t.texStorage2D(i.TEXTURE_2D,Re,Oe,he.width,he.height)}for(let he=0,me=ft.length;he<me;he++)Te=ft[he],ot?L&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,He,je,Te):t.texImage2D(i.TEXTURE_2D,he,Oe,He,je,Te);S.generateMipmaps=!1}else if(ot){if(Nt){let he=ze(ve);t.texStorage2D(i.TEXTURE_2D,Re,Oe,he.width,he.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,He,je,ve)}else t.texImage2D(i.TEXTURE_2D,0,Oe,He,je,ve);m(S)&&d(ce),Ye.__version=pe.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function j(P,S,Z){if(S.image.length!==6)return;let ce=te(P,S),le=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+Z);let pe=n.get(le);if(le.version!==pe.__version||ce===!0){t.activeTexture(i.TEXTURE0+Z);let Ye=Tt.getPrimaries(Tt.workingColorSpace),Se=S.colorSpace===fr?null:Tt.getPrimaries(S.colorSpace),Ne=S.colorSpace===fr||Ye===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let xt=S.isCompressedTexture||S.image[0].isCompressedTexture,ve=S.image[0]&&S.image[0].isDataTexture,He=[];for(let me=0;me<6;me++)!xt&&!ve?He[me]=x(S.image[me],!0,r.maxCubemapSize):He[me]=ve?S.image[me].image:S.image[me],He[me]=ut(S,He[me]);let je=He[0],Oe=s.convert(S.format,S.colorSpace),Te=s.convert(S.type),ft=y(S.internalFormat,Oe,Te,S.colorSpace),ot=S.isVideoTexture!==!0,Nt=pe.__version===void 0||ce===!0,L=le.dataReady,Re=w(S,je);z(i.TEXTURE_CUBE_MAP,S);let he;if(xt){ot&&Nt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ft,je.width,je.height);for(let me=0;me<6;me++){he=He[me].mipmaps;for(let Ie=0;Ie<he.length;Ie++){let Le=he[Ie];S.format!==yi?Oe!==null?ot?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie,0,0,Le.width,Le.height,Oe,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie,ft,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ot?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie,0,0,Le.width,Le.height,Oe,Te,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie,ft,Le.width,Le.height,0,Oe,Te,Le.data)}}}else{if(he=S.mipmaps,ot&&Nt){he.length>0&&Re++;let me=ze(He[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ft,me.width,me.height)}for(let me=0;me<6;me++)if(ve){ot?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,He[me].width,He[me].height,Oe,Te,He[me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ft,He[me].width,He[me].height,0,Oe,Te,He[me].data);for(let Ie=0;Ie<he.length;Ie++){let Ze=he[Ie].image[me].image;ot?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie+1,0,0,Ze.width,Ze.height,Oe,Te,Ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie+1,ft,Ze.width,Ze.height,0,Oe,Te,Ze.data)}}else{ot?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Oe,Te,He[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ft,Oe,Te,He[me]);for(let Ie=0;Ie<he.length;Ie++){let Le=he[Ie];ot?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie+1,0,0,Oe,Te,Le.image[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie+1,ft,Oe,Te,Le.image[me])}}}m(S)&&d(i.TEXTURE_CUBE_MAP),pe.__version=le.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ee(P,S,Z,ce,le,pe){let Ye=s.convert(Z.format,Z.colorSpace),Se=s.convert(Z.type),Ne=y(Z.internalFormat,Ye,Se,Z.colorSpace),xt=n.get(S),ve=n.get(Z);if(ve.__renderTarget=S,!xt.__hasExternalTextures){let He=Math.max(1,S.width>>pe),je=Math.max(1,S.height>>pe);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,pe,Ne,He,je,S.depth,0,Ye,Se,null):t.texImage2D(le,pe,Ne,He,je,0,Ye,Se,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Ve(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,le,ve.__webglTexture,0,ae(S)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ce,le,ve.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(P,S,Z){if(i.bindRenderbuffer(i.RENDERBUFFER,P),S.depthBuffer){let ce=S.depthTexture,le=ce&&ce.isDepthTexture?ce.type:null,pe=_(S.stencilBuffer,le),Ye=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=ae(S);Ve(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se,pe,S.width,S.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,pe,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,pe,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ye,i.RENDERBUFFER,P)}else{let ce=S.textures;for(let le=0;le<ce.length;le++){let pe=ce[le],Ye=s.convert(pe.format,pe.colorSpace),Se=s.convert(pe.type),Ne=y(pe.internalFormat,Ye,Se,pe.colorSpace),xt=ae(S);Z&&Ve(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,Ne,S.width,S.height):Ve(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,Ne,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Ne,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ie(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ce=n.get(S.depthTexture);ce.__renderTarget=S,(!ce.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);let le=ce.__webglTexture,pe=ae(S);if(S.depthTexture.format===xs)Ve(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0);else if(S.depthTexture.format===Ss)Ve(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function ne(P){let S=n.get(P),Z=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){let ce=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),ce){let le=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,ce.removeEventListener("dispose",le)};ce.addEventListener("dispose",le),S.__depthDisposeCallback=le}S.__boundDepthTexture=ce}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(Z)throw new Error("target.depthTexture not supported in Cube render targets");ie(S.__webglFramebuffer,P)}else if(Z){S.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[ce]),S.__webglDepthbuffer[ce]===void 0)S.__webglDepthbuffer[ce]=i.createRenderbuffer(),xe(S.__webglDepthbuffer[ce],P,!1);else{let le=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer[ce];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,pe)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),xe(S.__webglDepthbuffer,P,!1);else{let ce=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,le)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(P,S,Z){let ce=n.get(P);S!==void 0&&ee(ce.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Z!==void 0&&ne(P)}function de(P){let S=P.texture,Z=n.get(P),ce=n.get(S);P.addEventListener("dispose",A);let le=P.textures,pe=P.isWebGLCubeRenderTarget===!0,Ye=le.length>1;if(Ye||(ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture()),ce.__version=S.version,o.memory.textures++),pe){Z.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(S.mipmaps&&S.mipmaps.length>0){Z.__webglFramebuffer[Se]=[];for(let Ne=0;Ne<S.mipmaps.length;Ne++)Z.__webglFramebuffer[Se][Ne]=i.createFramebuffer()}else Z.__webglFramebuffer[Se]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){Z.__webglFramebuffer=[];for(let Se=0;Se<S.mipmaps.length;Se++)Z.__webglFramebuffer[Se]=i.createFramebuffer()}else Z.__webglFramebuffer=i.createFramebuffer();if(Ye)for(let Se=0,Ne=le.length;Se<Ne;Se++){let xt=n.get(le[Se]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Ve(P)===!1){Z.__webglMultisampledFramebuffer=i.createFramebuffer(),Z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let Se=0;Se<le.length;Se++){let Ne=le[Se];Z.__webglColorRenderbuffer[Se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Z.__webglColorRenderbuffer[Se]);let xt=s.convert(Ne.format,Ne.colorSpace),ve=s.convert(Ne.type),He=y(Ne.internalFormat,xt,ve,Ne.colorSpace,P.isXRRenderTarget===!0),je=ae(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,je,He,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,Z.__webglColorRenderbuffer[Se])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(Z.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(Z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),z(i.TEXTURE_CUBE_MAP,S);for(let Se=0;Se<6;Se++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)ee(Z.__webglFramebuffer[Se][Ne],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ne);else ee(Z.__webglFramebuffer[Se],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);m(S)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ye){for(let Se=0,Ne=le.length;Se<Ne;Se++){let xt=le[Se],ve=n.get(xt);t.bindTexture(i.TEXTURE_2D,ve.__webglTexture),z(i.TEXTURE_2D,xt),ee(Z.__webglFramebuffer,P,xt,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,0),m(xt)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let Se=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Se=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Se,ce.__webglTexture),z(Se,S),S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)ee(Z.__webglFramebuffer[Ne],P,S,i.COLOR_ATTACHMENT0,Se,Ne);else ee(Z.__webglFramebuffer,P,S,i.COLOR_ATTACHMENT0,Se,0);m(S)&&d(Se),t.unbindTexture()}P.depthBuffer&&ne(P)}function O(P){let S=P.textures;for(let Z=0,ce=S.length;Z<ce;Z++){let le=S[Z];if(m(le)){let pe=v(P),Ye=n.get(le).__webglTexture;t.bindTexture(pe,Ye),d(pe),t.unbindTexture()}}}let q=[],G=[];function Ae(P){if(P.samples>0){if(Ve(P)===!1){let S=P.textures,Z=P.width,ce=P.height,le=i.COLOR_BUFFER_BIT,pe=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ye=n.get(P),Se=S.length>1;if(Se)for(let Ne=0;Ne<S.length;Ne++)t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer);for(let Ne=0;Ne<S.length;Ne++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),Se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ye.__webglColorRenderbuffer[Ne]);let xt=n.get(S[Ne]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,xt,0)}i.blitFramebuffer(0,0,Z,ce,0,0,Z,ce,le,i.NEAREST),c===!0&&(q.length=0,G.length=0,q.push(i.COLOR_ATTACHMENT0+Ne),P.depthBuffer&&P.resolveDepthBuffer===!1&&(q.push(pe),G.push(pe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,G)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,q))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Se)for(let Ne=0;Ne<S.length;Ne++){t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.RENDERBUFFER,Ye.__webglColorRenderbuffer[Ne]);let xt=n.get(S[Ne]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.TEXTURE_2D,xt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let S=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function ae(P){return Math.min(r.maxSamples,P.samples)}function Ve(P){let S=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ke(P){let S=o.render.frame;u.get(P)!==S&&(u.set(P,S),P.update())}function ut(P,S){let Z=P.colorSpace,ce=P.format,le=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Z!==Is&&Z!==fr&&(Tt.getTransfer(Z)===Bt?(ce!==yi||le!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Z)),S}function ze(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.setTexture2D=X,this.setTexture2DArray=I,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=Ee,this.setupRenderTarget=de,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=Ve}function iv(i,e){function t(n,r=fr){let s,o=Tt.getTransfer(r);if(n===Ji)return i.UNSIGNED_BYTE;if(n===Ou)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ef)return i.BYTE;if(n===tf)return i.SHORT;if(n===uo)return i.UNSIGNED_SHORT;if(n===Nu)return i.INT;if(n===Ki)return i.UNSIGNED_INT;if(n===Ri)return i.FLOAT;if(n===vr)return i.HALF_FLOAT;if(n===rf)return i.ALPHA;if(n===sf)return i.RGB;if(n===yi)return i.RGBA;if(n===of)return i.LUMINANCE;if(n===af)return i.LUMINANCE_ALPHA;if(n===xs)return i.DEPTH_COMPONENT;if(n===Ss)return i.DEPTH_STENCIL;if(n===Bu)return i.RED;if(n===ku)return i.RED_INTEGER;if(n===cf)return i.RG;if(n===Hu)return i.RG_INTEGER;if(n===Vu)return i.RGBA_INTEGER;if(n===ya||n===_a||n===va||n===ba)if(o===Bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ya)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===va)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ya)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_a)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===va)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wl||n===Sl||n===El||n===Al)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===wl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===El)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Al)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Tl||n===Rl||n===Cl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Tl||n===Rl)return o===Bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Cl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Pl||n===Il||n===Ll||n===Dl||n===Ul||n===Fl||n===Nl||n===Ol||n===zl||n===Bl||n===kl||n===Hl||n===Vl||n===Gl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Pl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Il)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ll)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ul)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ol)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Gl)return o===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ma||n===Wl||n===Xl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ma)return o===Bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lf||n===ql||n===Yl||n===$l)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ma)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ql)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$l)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var lu=class extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},yn=class extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}},rv={type:"move"},oo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],p=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&p>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rv)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new yn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},sv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ov=`
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

}`,uu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new Sn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ln({vertexShader:sv,fragmentShader:ov,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new it(new yr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hu=class extends mr{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,p=null,f=null,g=null,x=new uu,m=t.getContextAttributes(),d=null,v=null,y=[],_=[],w=new Be,E=null,A=new In;A.viewport=new Zt;let T=new In;T.viewport=new Zt;let b=[A,T],M=new lu,C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let j=y[U];return j===void 0&&(j=new oo,y[U]=j),j.getTargetRaySpace()},this.getControllerGrip=function(U){let j=y[U];return j===void 0&&(j=new oo,y[U]=j),j.getGripSpace()},this.getHand=function(U){let j=y[U];return j===void 0&&(j=new oo,y[U]=j),j.getHandSpace()};function V(U){let j=_.indexOf(U.inputSource);if(j===-1)return;let ee=y[j];ee!==void 0&&(ee.update(U.inputSource,U.frame,l||o),ee.dispatchEvent({type:U.type,data:U.inputSource}))}function Y(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",X);for(let U=0;U<y.length;U++){let j=_[U];j!==null&&(_[U]=null,y[U].disconnect(j))}C=null,F=null,x.reset(),e.setRenderTarget(d),f=null,p=null,h=null,r=null,v=null,te.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){s=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(U){if(r=U,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0){let j={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,j),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new ni(f.framebufferWidth,f.framebufferHeight,{format:yi,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let j=null,ee=null,xe=null;m.depth&&(xe=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=m.stencil?Ss:xs,ee=m.stencil?ws:Ki);let ie={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};h=new XRWebGLBinding(r,t),p=h.createProjectionLayer(ie),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),v=new ni(p.textureWidth,p.textureHeight,{format:yi,type:Ji,depthTexture:new Ts(p.textureWidth,p.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),te.setContext(r),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function X(U){for(let j=0;j<U.removed.length;j++){let ee=U.removed[j],xe=_.indexOf(ee);xe>=0&&(_[xe]=null,y[xe].disconnect(ee))}for(let j=0;j<U.added.length;j++){let ee=U.added[j],xe=_.indexOf(ee);if(xe===-1){for(let ne=0;ne<y.length;ne++)if(ne>=_.length){_.push(ee),xe=ne;break}else if(_[ne]===null){_[ne]=ee,xe=ne;break}if(xe===-1)break}let ie=y[xe];ie&&ie.connect(ee)}}let I=new D,Q=new D;function W(U,j,ee){I.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(ee.matrixWorld);let xe=I.distanceTo(Q),ie=j.projectionMatrix.elements,ne=ee.projectionMatrix.elements,Ee=ie[14]/(ie[10]-1),de=ie[14]/(ie[10]+1),O=(ie[9]+1)/ie[5],q=(ie[9]-1)/ie[5],G=(ie[8]-1)/ie[0],Ae=(ne[8]+1)/ne[0],ae=Ee*G,Ve=Ee*Ae,ke=xe/(-G+Ae),ut=ke*-G;if(j.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(ut),U.translateZ(ke),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),ie[10]===-1)U.projectionMatrix.copy(j.projectionMatrix),U.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let ze=Ee+ke,P=de+ke,S=ae-ut,Z=Ve+(xe-ut),ce=O*de/P*ze,le=q*de/P*ze;U.projectionMatrix.makePerspective(S,Z,ce,le,ze,P),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function B(U,j){j===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(j.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(r===null)return;let j=U.near,ee=U.far;x.texture!==null&&(x.depthNear>0&&(j=x.depthNear),x.depthFar>0&&(ee=x.depthFar)),M.near=T.near=A.near=j,M.far=T.far=A.far=ee,(C!==M.near||F!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,F=M.far),A.layers.mask=U.layers.mask|2,T.layers.mask=U.layers.mask|4,M.layers.mask=A.layers.mask|T.layers.mask;let xe=U.parent,ie=M.cameras;B(M,xe);for(let ne=0;ne<ie.length;ne++)B(ie[ne],xe);ie.length===2?W(M,A,T):M.projectionMatrix.copy(A.projectionMatrix),H(U,M,xe)};function H(U,j,ee){ee===null?U.matrix.copy(j.matrixWorld):(U.matrix.copy(ee.matrixWorld),U.matrix.invert(),U.matrix.multiply(j.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(j.projectionMatrix),U.projectionMatrixInverse.copy(j.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=ho*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&f===null))return c},this.setFoveation=function(U){c=U,p!==null&&(p.fixedFoveation=U),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=U)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let k=null;function z(U,j){if(u=j.getViewerPose(l||o),g=j,u!==null){let ee=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let xe=!1;ee.length!==M.cameras.length&&(M.cameras.length=0,xe=!0);for(let ne=0;ne<ee.length;ne++){let Ee=ee[ne],de=null;if(f!==null)de=f.getViewport(Ee);else{let q=h.getViewSubImage(p,Ee);de=q.viewport,ne===0&&(e.setRenderTargetTextures(v,q.colorTexture,p.ignoreDepthValues?void 0:q.depthStencilTexture),e.setRenderTarget(v))}let O=b[ne];O===void 0&&(O=new In,O.layers.enable(ne),O.viewport=new Zt,b[ne]=O),O.matrix.fromArray(Ee.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(Ee.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(de.x,de.y,de.width,de.height),ne===0&&(M.matrix.copy(O.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),xe===!0&&M.cameras.push(O)}let ie=r.enabledFeatures;if(ie&&ie.includes("depth-sensing")){let ne=h.getDepthInformation(ee[0]);ne&&ne.isValid&&ne.texture&&x.init(e,ne,r.renderState)}}for(let ee=0;ee<y.length;ee++){let xe=_[ee],ie=y[ee];xe!==null&&ie!==void 0&&ie.update(xe,j,l||o)}k&&k(U,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}let te=new mf;te.setAnimationLoop(z),this.setAnimationLoop=function(U){k=U},this.dispose=function(){}}},Fr=new Nn,av=new bt;function cv(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,pf(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,v,y,_){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),p(m,d),d.isMeshPhysicalMaterial&&f(m,d,_)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),x(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,v,y):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Fn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Fn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let v=e.get(d),y=v.envMap,_=v.envMapRotation;y&&(m.envMap.value=y,Fr.copy(_),Fr.x*=-1,Fr.y*=-1,Fr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Fr.y*=-1,Fr.z*=-1),m.envMapRotation.value.setFromMatrix4(av.makeRotationFromEuler(Fr)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,v,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=y*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function p(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function f(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Fn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function lv(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){let _=y.program;n.uniformBlockBinding(v,_)}function l(v,y){let _=r[v.id];_===void 0&&(g(v),_=u(v),r[v.id]=_,v.addEventListener("dispose",m));let w=y.program;n.updateUBOMapping(v,w);let E=e.render.frame;s[v.id]!==E&&(p(v),s[v.id]=E)}function u(v){let y=h();v.__bindingPointIndex=y;let _=i.createBuffer(),w=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,w,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(v){let y=r[v.id],_=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,A=_.length;E<A;E++){let T=Array.isArray(_[E])?_[E]:[_[E]];for(let b=0,M=T.length;b<M;b++){let C=T[b];if(f(C,E,b,w)===!0){let F=C.__offset,V=Array.isArray(C.value)?C.value:[C.value],Y=0;for(let X=0;X<V.length;X++){let I=V[X],Q=x(I);typeof I=="number"||typeof I=="boolean"?(C.__data[0]=I,i.bufferSubData(i.UNIFORM_BUFFER,F+Y,C.__data)):I.isMatrix3?(C.__data[0]=I.elements[0],C.__data[1]=I.elements[1],C.__data[2]=I.elements[2],C.__data[3]=0,C.__data[4]=I.elements[3],C.__data[5]=I.elements[4],C.__data[6]=I.elements[5],C.__data[7]=0,C.__data[8]=I.elements[6],C.__data[9]=I.elements[7],C.__data[10]=I.elements[8],C.__data[11]=0):(I.toArray(C.__data,Y),Y+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,_,w){let E=v.value,A=y+"_"+_;if(w[A]===void 0)return typeof E=="number"||typeof E=="boolean"?w[A]=E:w[A]=E.clone(),!0;{let T=w[A];if(typeof E=="number"||typeof E=="boolean"){if(T!==E)return w[A]=E,!0}else if(T.equals(E)===!1)return T.copy(E),!0}return!1}function g(v){let y=v.uniforms,_=0,w=16;for(let A=0,T=y.length;A<T;A++){let b=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,C=b.length;M<C;M++){let F=b[M],V=Array.isArray(F.value)?F.value:[F.value];for(let Y=0,X=V.length;Y<X;Y++){let I=V[Y],Q=x(I),W=_%w,B=W%Q.boundary,H=W+B;_+=B,H!==0&&w-H<Q.storage&&(_+=w-H),F.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=_,_+=Q.storage}}}let E=_%w;return E>0&&(_+=w-E),v.__size=_,v.__cache={},this}function x(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){let y=v.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(let v in r)i.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:c,update:l,dispose:d}}var Da=class{constructor(e={}){let{canvas:t=fg(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,d=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xn,this.toneMapping=Pi,this.toneMappingExposure=1;let _=this,w=!1,E=0,A=0,T=null,b=-1,M=null,C=new Zt,F=new Zt,V=null,Y=new Je(0),X=0,I=t.width,Q=t.height,W=1,B=null,H=null,k=new Zt(0,0,I,Q),z=new Zt(0,0,I,Q),te=!1,U=new mo,j=!1,ee=!1,xe=new bt,ie=new bt,ne=new D,Ee=new Zt,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O=!1;function q(){return T===null?W:1}let G=n;function Ae(R,J){return t.getContext(R,J)}try{let R={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Du}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",Le,!1),G===null){let J="webgl2";if(G=Ae(J,R),G===null)throw Ae(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ae,Ve,ke,ut,ze,P,S,Z,ce,le,pe,Ye,Se,Ne,xt,ve,He,je,Oe,Te,ft,ot,Nt,L;function Re(){ae=new Ey(G),ae.init(),ot=new iv(G,ae),Ve=new _y(G,ae,e,ot),ke=new ev(G,ae),Ve.reverseDepthBuffer&&p&&ke.buffers.depth.setReversed(!0),ut=new Ry(G),ze=new H_,P=new nv(G,ae,ke,ze,Ve,ot,ut),S=new by(_),Z=new Sy(_),ce=new Fg(G),Nt=new xy(G,ce),le=new Ay(G,ce,ut,Nt),pe=new Py(G,le,ce,ut),Oe=new Cy(G,Ve,P),ve=new vy(ze),Ye=new k_(_,S,Z,ae,Ve,Nt,ve),Se=new cv(_,ze),Ne=new G_,xt=new j_(ae),je=new gy(_,S,Z,ke,pe,f,c),He=new K_(_,pe,Ve),L=new lv(G,ut,Ve,ke),Te=new yy(G,ae,ut),ft=new Ty(G,ae,ut),ut.programs=Ye.programs,_.capabilities=Ve,_.extensions=ae,_.properties=ze,_.renderLists=Ne,_.shadowMap=He,_.state=ke,_.info=ut}Re();let he=new hu(_,G);this.xr=he,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let R=ae.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=ae.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(R){R!==void 0&&(W=R,this.setSize(I,Q,!1))},this.getSize=function(R){return R.set(I,Q)},this.setSize=function(R,J,re=!0){if(he.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=R,Q=J,t.width=Math.floor(R*W),t.height=Math.floor(J*W),re===!0&&(t.style.width=R+"px",t.style.height=J+"px"),this.setViewport(0,0,R,J)},this.getDrawingBufferSize=function(R){return R.set(I*W,Q*W).floor()},this.setDrawingBufferSize=function(R,J,re){I=R,Q=J,W=re,t.width=Math.floor(R*re),t.height=Math.floor(J*re),this.setViewport(0,0,R,J)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(k)},this.setViewport=function(R,J,re,se){R.isVector4?k.set(R.x,R.y,R.z,R.w):k.set(R,J,re,se),ke.viewport(C.copy(k).multiplyScalar(W).round())},this.getScissor=function(R){return R.copy(z)},this.setScissor=function(R,J,re,se){R.isVector4?z.set(R.x,R.y,R.z,R.w):z.set(R,J,re,se),ke.scissor(F.copy(z).multiplyScalar(W).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(R){ke.setScissorTest(te=R)},this.setOpaqueSort=function(R){B=R},this.setTransparentSort=function(R){H=R},this.getClearColor=function(R){return R.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor.apply(je,arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha.apply(je,arguments)},this.clear=function(R=!0,J=!0,re=!0){let se=0;if(R){let K=!1;if(T!==null){let Me=T.texture.format;K=Me===Vu||Me===Hu||Me===ku}if(K){let Me=T.texture.type,De=Me===Ji||Me===Ki||Me===uo||Me===ws||Me===Ou||Me===zu,Ge=je.getClearColor(),We=je.getClearAlpha(),nt=Ge.r,lt=Ge.g,Xe=Ge.b;De?(g[0]=nt,g[1]=lt,g[2]=Xe,g[3]=We,G.clearBufferuiv(G.COLOR,0,g)):(x[0]=nt,x[1]=lt,x[2]=Xe,x[3]=We,G.clearBufferiv(G.COLOR,0,x))}else se|=G.COLOR_BUFFER_BIT}J&&(se|=G.DEPTH_BUFFER_BIT),re&&(se|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",Le,!1),Ne.dispose(),xt.dispose(),ze.dispose(),S.dispose(),Z.dispose(),pe.dispose(),Nt.dispose(),L.dispose(),Ye.dispose(),he.dispose(),he.removeEventListener("sessionstart",hi),he.removeEventListener("sessionend",Vs),Bi.stop()};function me(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let R=ut.autoReset,J=He.enabled,re=He.autoUpdate,se=He.needsUpdate,K=He.type;Re(),ut.autoReset=R,He.enabled=J,He.autoUpdate=re,He.needsUpdate=se,He.type=K}function Le(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ze(R){let J=R.target;J.removeEventListener("dispose",Ze),kt(J)}function kt(R){rn(R),ze.remove(R)}function rn(R){let J=ze.get(R).programs;J!==void 0&&(J.forEach(function(re){Ye.releaseProgram(re)}),R.isShaderMaterial&&Ye.releaseShaderCache(R))}this.renderBufferDirect=function(R,J,re,se,K,Me){J===null&&(J=de);let De=K.isMesh&&K.matrixWorld.determinant()<0,Ge=Ws(R,J,re,se,K);ke.setMaterial(se,De);let We=re.index,nt=1;if(se.wireframe===!0){if(We=le.getWireframeAttribute(re),We===void 0)return;nt=2}let lt=re.drawRange,Xe=re.attributes.position,_t=lt.start*nt,ht=(lt.start+lt.count)*nt;Me!==null&&(_t=Math.max(_t,Me.start*nt),ht=Math.min(ht,(Me.start+Me.count)*nt)),We!==null?(_t=Math.max(_t,0),ht=Math.min(ht,We.count)):Xe!=null&&(_t=Math.max(_t,0),ht=Math.min(ht,Xe.count));let Rt=ht-_t;if(Rt<0||Rt===1/0)return;Nt.setup(K,se,Ge,re,We);let hn,Et=Te;if(We!==null&&(hn=ce.get(We),Et=ft,Et.setIndex(hn)),K.isMesh)se.wireframe===!0?(ke.setLineWidth(se.wireframeLinewidth*q()),Et.setMode(G.LINES)):Et.setMode(G.TRIANGLES);else if(K.isLine){let qe=se.linewidth;qe===void 0&&(qe=1),ke.setLineWidth(qe*q()),K.isLineSegments?Et.setMode(G.LINES):K.isLineLoop?Et.setMode(G.LINE_LOOP):Et.setMode(G.LINE_STRIP)}else K.isPoints?Et.setMode(G.POINTS):K.isSprite&&Et.setMode(G.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Et.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))Et.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let qe=K._multiDrawStarts,tn=K._multiDrawCounts,vt=K._multiDrawCount,An=We?ce.get(We).bytesPerElement:1,Qn=ze.get(se).currentProgram.getUniforms();for(let Tn=0;Tn<vt;Tn++)Qn.setValue(G,"_gl_DrawID",Tn),Et.render(qe[Tn]/An,tn[Tn])}else if(K.isInstancedMesh)Et.renderInstances(_t,Rt,K.count);else if(re.isInstancedBufferGeometry){let qe=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,tn=Math.min(re.instanceCount,qe);Et.renderInstances(_t,Rt,tn)}else Et.render(_t,Rt)};function St(R,J,re){R.transparent===!0&&R.side===Vt&&R.forceSinglePass===!1?(R.side=Fn,R.needsUpdate=!0,Rr(R,J,re),R.side=pr,R.needsUpdate=!0,Rr(R,J,re),R.side=Vt):Rr(R,J,re)}this.compile=function(R,J,re=null){re===null&&(re=R),d=xt.get(re),d.init(J),y.push(d),re.traverseVisible(function(K){K.isLight&&K.layers.test(J.layers)&&(d.pushLight(K),K.castShadow&&d.pushShadow(K))}),R!==re&&R.traverseVisible(function(K){K.isLight&&K.layers.test(J.layers)&&(d.pushLight(K),K.castShadow&&d.pushShadow(K))}),d.setupLights();let se=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let Me=K.material;if(Me)if(Array.isArray(Me))for(let De=0;De<Me.length;De++){let Ge=Me[De];St(Ge,re,K),se.add(Ge)}else St(Me,re,K),se.add(Me)}),y.pop(),d=null,se},this.compileAsync=function(R,J,re=null){let se=this.compile(R,J,re);return new Promise(K=>{function Me(){if(se.forEach(function(De){ze.get(De).currentProgram.isReady()&&se.delete(De)}),se.size===0){K(R);return}setTimeout(Me,10)}ae.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let _n=null;function ui(R){_n&&_n(R)}function hi(){Bi.stop()}function Vs(){Bi.start()}let Bi=new mf;Bi.setAnimationLoop(ui),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(R){_n=R,he.setAnimationLoop(R),R===null?Bi.stop():Bi.start()},he.addEventListener("sessionstart",hi),he.addEventListener("sessionend",Vs),this.render=function(R,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(he.cameraAutoUpdate===!0&&he.updateCamera(J),J=he.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,J,T),d=xt.get(R,y.length),d.init(J),y.push(d),ie.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),U.setFromProjectionMatrix(ie),ee=this.localClippingEnabled,j=ve.init(this.clippingPlanes,ee),m=Ne.get(R,v.length),m.init(),v.push(m),he.enabled===!0&&he.isPresenting===!0){let Me=_.xr.getDepthSensingMesh();Me!==null&&rr(Me,J,-1/0,_.sortObjects)}rr(R,J,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(B,H),O=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,O&&je.addToRenderList(m,R),this.info.render.frame++,j===!0&&ve.beginShadows();let re=d.state.shadowsArray;He.render(re,R,J),j===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset();let se=m.opaque,K=m.transmissive;if(d.setupLights(),J.isArrayCamera){let Me=J.cameras;if(K.length>0)for(let De=0,Ge=Me.length;De<Ge;De++){let We=Me[De];Ar(se,K,R,We)}O&&je.render(R);for(let De=0,Ge=Me.length;De<Ge;De++){let We=Me[De];Er(m,R,We,We.viewport)}}else K.length>0&&Ar(se,K,R,J),O&&je.render(R),Er(m,R,J);T!==null&&(P.updateMultisampleRenderTarget(T),P.updateRenderTargetMipmap(T)),R.isScene===!0&&R.onAfterRender(_,R,J),Nt.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(d=y[y.length-1],j===!0&&ve.setGlobalState(_.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function rr(R,J,re,se){if(R.visible===!1)return;if(R.layers.test(J.layers)){if(R.isGroup)re=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(J);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||U.intersectsSprite(R)){se&&Ee.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ie);let De=pe.update(R),Ge=R.material;Ge.visible&&m.push(R,De,Ge,re,Ee.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||U.intersectsObject(R))){let De=pe.update(R),Ge=R.material;if(se&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ee.copy(R.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Ee.copy(De.boundingSphere.center)),Ee.applyMatrix4(R.matrixWorld).applyMatrix4(ie)),Array.isArray(Ge)){let We=De.groups;for(let nt=0,lt=We.length;nt<lt;nt++){let Xe=We[nt],_t=Ge[Xe.materialIndex];_t&&_t.visible&&m.push(R,De,_t,re,Ee.z,Xe)}}else Ge.visible&&m.push(R,De,Ge,re,Ee.z,null)}}let Me=R.children;for(let De=0,Ge=Me.length;De<Ge;De++)rr(Me[De],J,re,se)}function Er(R,J,re,se){let K=R.opaque,Me=R.transmissive,De=R.transparent;d.setupLightsView(re),j===!0&&ve.setGlobalState(_.clippingPlanes,re),se&&ke.viewport(C.copy(se)),K.length>0&&Tr(K,J,re),Me.length>0&&Tr(Me,J,re),De.length>0&&Tr(De,J,re),ke.buffers.depth.setTest(!0),ke.buffers.depth.setMask(!0),ke.buffers.color.setMask(!0),ke.setPolygonOffset(!1)}function Ar(R,J,re,se){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[se.id]===void 0&&(d.state.transmissionRenderTarget[se.id]=new ni(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?vr:Ji,minFilter:Hr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace}));let Me=d.state.transmissionRenderTarget[se.id],De=se.viewport||C;Me.setSize(De.z,De.w);let Ge=_.getRenderTarget();_.setRenderTarget(Me),_.getClearColor(Y),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),O&&je.render(re);let We=_.toneMapping;_.toneMapping=Pi;let nt=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),d.setupLightsView(se),j===!0&&ve.setGlobalState(_.clippingPlanes,se),Tr(R,re,se),P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me),ae.has("WEBGL_multisampled_render_to_texture")===!1){let lt=!1;for(let Xe=0,_t=J.length;Xe<_t;Xe++){let ht=J[Xe],Rt=ht.object,hn=ht.geometry,Et=ht.material,qe=ht.group;if(Et.side===Vt&&Rt.layers.test(se.layers)){let tn=Et.side;Et.side=Fn,Et.needsUpdate=!0,Kn(Rt,re,se,hn,Et,qe),Et.side=tn,Et.needsUpdate=!0,lt=!0}}lt===!0&&(P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me))}_.setRenderTarget(Ge),_.setClearColor(Y,X),nt!==void 0&&(se.viewport=nt),_.toneMapping=We}function Tr(R,J,re){let se=J.isScene===!0?J.overrideMaterial:null;for(let K=0,Me=R.length;K<Me;K++){let De=R[K],Ge=De.object,We=De.geometry,nt=se===null?De.material:se,lt=De.group;Ge.layers.test(re.layers)&&Kn(Ge,J,re,We,nt,lt)}}function Kn(R,J,re,se,K,Me){R.onBeforeRender(_,J,re,se,K,Me),R.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(_,J,re,se,R,Me),K.transparent===!0&&K.side===Vt&&K.forceSinglePass===!1?(K.side=Fn,K.needsUpdate=!0,_.renderBufferDirect(re,J,se,K,R,Me),K.side=pr,K.needsUpdate=!0,_.renderBufferDirect(re,J,se,K,R,Me),K.side=Vt):_.renderBufferDirect(re,J,se,K,R,Me),R.onAfterRender(_,J,re,se,K,Me)}function Rr(R,J,re){J.isScene!==!0&&(J=de);let se=ze.get(R),K=d.state.lights,Me=d.state.shadowsArray,De=K.state.version,Ge=Ye.getParameters(R,K.state,Me,J,re),We=Ye.getProgramCacheKey(Ge),nt=se.programs;se.environment=R.isMeshStandardMaterial?J.environment:null,se.fog=J.fog,se.envMap=(R.isMeshStandardMaterial?Z:S).get(R.envMap||se.environment),se.envMapRotation=se.environment!==null&&R.envMap===null?J.environmentRotation:R.envMapRotation,nt===void 0&&(R.addEventListener("dispose",Ze),nt=new Map,se.programs=nt);let lt=nt.get(We);if(lt!==void 0){if(se.currentProgram===lt&&se.lightsStateVersion===De)return jr(R,Ge),lt}else Ge.uniforms=Ye.getUniforms(R),R.onBeforeCompile(Ge,_),lt=Ye.acquireProgram(Ge,We),nt.set(We,lt),se.uniforms=Ge.uniforms;let Xe=se.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Xe.clippingPlanes=ve.uniform),jr(R,Ge),se.needsLights=ko(R),se.lightsStateVersion=De,se.needsLights&&(Xe.ambientLightColor.value=K.state.ambient,Xe.lightProbe.value=K.state.probe,Xe.directionalLights.value=K.state.directional,Xe.directionalLightShadows.value=K.state.directionalShadow,Xe.spotLights.value=K.state.spot,Xe.spotLightShadows.value=K.state.spotShadow,Xe.rectAreaLights.value=K.state.rectArea,Xe.ltc_1.value=K.state.rectAreaLTC1,Xe.ltc_2.value=K.state.rectAreaLTC2,Xe.pointLights.value=K.state.point,Xe.pointLightShadows.value=K.state.pointShadow,Xe.hemisphereLights.value=K.state.hemi,Xe.directionalShadowMap.value=K.state.directionalShadowMap,Xe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Xe.spotShadowMap.value=K.state.spotShadowMap,Xe.spotLightMatrix.value=K.state.spotLightMatrix,Xe.spotLightMap.value=K.state.spotLightMap,Xe.pointShadowMap.value=K.state.pointShadowMap,Xe.pointShadowMatrix.value=K.state.pointShadowMatrix),se.currentProgram=lt,se.uniformsList=null,lt}function Gs(R){if(R.uniformsList===null){let J=R.currentProgram.getUniforms();R.uniformsList=_s.seqWithValue(J.seq,R.uniforms)}return R.uniformsList}function jr(R,J){let re=ze.get(R);re.outputColorSpace=J.outputColorSpace,re.batching=J.batching,re.batchingColor=J.batchingColor,re.instancing=J.instancing,re.instancingColor=J.instancingColor,re.instancingMorph=J.instancingMorph,re.skinning=J.skinning,re.morphTargets=J.morphTargets,re.morphNormals=J.morphNormals,re.morphColors=J.morphColors,re.morphTargetsCount=J.morphTargetsCount,re.numClippingPlanes=J.numClippingPlanes,re.numIntersection=J.numClipIntersection,re.vertexAlphas=J.vertexAlphas,re.vertexTangents=J.vertexTangents,re.toneMapping=J.toneMapping}function Ws(R,J,re,se,K){J.isScene!==!0&&(J=de),P.resetTextureUnits();let Me=J.fog,De=se.isMeshStandardMaterial?J.environment:null,Ge=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Is,We=(se.isMeshStandardMaterial?Z:S).get(se.envMap||De),nt=se.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,lt=!!re.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),Xe=!!re.morphAttributes.position,_t=!!re.morphAttributes.normal,ht=!!re.morphAttributes.color,Rt=Pi;se.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Rt=_.toneMapping);let hn=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,Et=hn!==void 0?hn.length:0,qe=ze.get(se),tn=d.state.lights;if(j===!0&&(ee===!0||R!==M)){let gn=R===M&&se.id===b;ve.setState(se,R,gn)}let vt=!1;se.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==tn.state.version||qe.outputColorSpace!==Ge||K.isBatchedMesh&&qe.batching===!1||!K.isBatchedMesh&&qe.batching===!0||K.isBatchedMesh&&qe.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&qe.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&qe.instancing===!1||!K.isInstancedMesh&&qe.instancing===!0||K.isSkinnedMesh&&qe.skinning===!1||!K.isSkinnedMesh&&qe.skinning===!0||K.isInstancedMesh&&qe.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&qe.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&qe.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&qe.instancingMorph===!1&&K.morphTexture!==null||qe.envMap!==We||se.fog===!0&&qe.fog!==Me||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==ve.numPlanes||qe.numIntersection!==ve.numIntersection)||qe.vertexAlphas!==nt||qe.vertexTangents!==lt||qe.morphTargets!==Xe||qe.morphNormals!==_t||qe.morphColors!==ht||qe.toneMapping!==Rt||qe.morphTargetsCount!==Et)&&(vt=!0):(vt=!0,qe.__version=se.version);let An=qe.currentProgram;vt===!0&&(An=Rr(se,J,K));let Qn=!1,Tn=!1,ki=!1,mt=An.getUniforms(),Lt=qe.uniforms;if(ke.useProgram(An.program)&&(Qn=!0,Tn=!0,ki=!0),se.id!==b&&(b=se.id,Tn=!0),Qn||M!==R){ke.buffers.depth.getReversed()?(xe.copy(R.projectionMatrix),mg(xe),gg(xe),mt.setValue(G,"projectionMatrix",xe)):mt.setValue(G,"projectionMatrix",R.projectionMatrix),mt.setValue(G,"viewMatrix",R.matrixWorldInverse);let Gn=mt.map.cameraPosition;Gn!==void 0&&Gn.setValue(G,ne.setFromMatrixPosition(R.matrixWorld)),Ve.logarithmicDepthBuffer&&mt.setValue(G,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&mt.setValue(G,"isOrthographic",R.isOrthographicCamera===!0),M!==R&&(M=R,Tn=!0,ki=!0)}if(K.isSkinnedMesh){mt.setOptional(G,K,"bindMatrix"),mt.setOptional(G,K,"bindMatrixInverse");let gn=K.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),mt.setValue(G,"boneTexture",gn.boneTexture,P))}K.isBatchedMesh&&(mt.setOptional(G,K,"batchingTexture"),mt.setValue(G,"batchingTexture",K._matricesTexture,P),mt.setOptional(G,K,"batchingIdTexture"),mt.setValue(G,"batchingIdTexture",K._indirectTexture,P),mt.setOptional(G,K,"batchingColorTexture"),K._colorsTexture!==null&&mt.setValue(G,"batchingColorTexture",K._colorsTexture,P));let di=re.morphAttributes;if((di.position!==void 0||di.normal!==void 0||di.color!==void 0)&&Oe.update(K,re,An),(Tn||qe.receiveShadow!==K.receiveShadow)&&(qe.receiveShadow=K.receiveShadow,mt.setValue(G,"receiveShadow",K.receiveShadow)),se.isMeshGouraudMaterial&&se.envMap!==null&&(Lt.envMap.value=We,Lt.flipEnvMap.value=We.isCubeTexture&&We.isRenderTargetTexture===!1?-1:1),se.isMeshStandardMaterial&&se.envMap===null&&J.environment!==null&&(Lt.envMapIntensity.value=J.environmentIntensity),Tn&&(mt.setValue(G,"toneMappingExposure",_.toneMappingExposure),qe.needsLights&&Bo(Lt,ki),Me&&se.fog===!0&&Se.refreshFogUniforms(Lt,Me),Se.refreshMaterialUniforms(Lt,se,W,Q,d.state.transmissionRenderTarget[R.id]),_s.upload(G,Gs(qe),Lt,P)),se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(_s.upload(G,Gs(qe),Lt,P),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&mt.setValue(G,"center",K.center),mt.setValue(G,"modelViewMatrix",K.modelViewMatrix),mt.setValue(G,"normalMatrix",K.normalMatrix),mt.setValue(G,"modelMatrix",K.matrixWorld),se.isShaderMaterial||se.isRawShaderMaterial){let gn=se.uniformsGroups;for(let Gn=0,Un=gn.length;Gn<Un;Gn++){let wi=gn[Gn];L.update(wi,An),L.bind(wi,An)}}return An}function Bo(R,J){R.ambientLightColor.needsUpdate=J,R.lightProbe.needsUpdate=J,R.directionalLights.needsUpdate=J,R.directionalLightShadows.needsUpdate=J,R.pointLights.needsUpdate=J,R.pointLightShadows.needsUpdate=J,R.spotLights.needsUpdate=J,R.spotLightShadows.needsUpdate=J,R.rectAreaLights.needsUpdate=J,R.hemisphereLights.needsUpdate=J}function ko(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(R,J,re){ze.get(R.texture).__webglTexture=J,ze.get(R.depthTexture).__webglTexture=re;let se=ze.get(R);se.__hasExternalTextures=!0,se.__autoAllocateDepthBuffer=re===void 0,se.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),se.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,J){let re=ze.get(R);re.__webglFramebuffer=J,re.__useDefaultFramebuffer=J===void 0},this.setRenderTarget=function(R,J=0,re=0){T=R,E=J,A=re;let se=!0,K=null,Me=!1,De=!1;if(R){let We=ze.get(R);if(We.__useDefaultFramebuffer!==void 0)ke.bindFramebuffer(G.FRAMEBUFFER,null),se=!1;else if(We.__webglFramebuffer===void 0)P.setupRenderTarget(R);else if(We.__hasExternalTextures)P.rebindTextures(R,ze.get(R.texture).__webglTexture,ze.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Xe=R.depthTexture;if(We.__boundDepthTexture!==Xe){if(Xe!==null&&ze.has(Xe)&&(R.width!==Xe.image.width||R.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(R)}}let nt=R.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(De=!0);let lt=ze.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(lt[J])?K=lt[J][re]:K=lt[J],Me=!0):R.samples>0&&P.useMultisampledRTT(R)===!1?K=ze.get(R).__webglMultisampledFramebuffer:Array.isArray(lt)?K=lt[re]:K=lt,C.copy(R.viewport),F.copy(R.scissor),V=R.scissorTest}else C.copy(k).multiplyScalar(W).floor(),F.copy(z).multiplyScalar(W).floor(),V=te;if(ke.bindFramebuffer(G.FRAMEBUFFER,K)&&se&&ke.drawBuffers(R,K),ke.viewport(C),ke.scissor(F),ke.setScissorTest(V),Me){let We=ze.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+J,We.__webglTexture,re)}else if(De){let We=ze.get(R.texture),nt=J||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,We.__webglTexture,re||0,nt)}b=-1},this.readRenderTargetPixels=function(R,J,re,se,K,Me,De){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=ze.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(Ge=Ge[De]),Ge){ke.bindFramebuffer(G.FRAMEBUFFER,Ge);try{let We=R.texture,nt=We.format,lt=We.type;if(!Ve.textureFormatReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ve.textureTypeReadable(lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=R.width-se&&re>=0&&re<=R.height-K&&G.readPixels(J,re,se,K,ot.convert(nt),ot.convert(lt),Me)}finally{let We=T!==null?ze.get(T).__webglFramebuffer:null;ke.bindFramebuffer(G.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(R,J,re,se,K,Me,De){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=ze.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(Ge=Ge[De]),Ge){let We=R.texture,nt=We.format,lt=We.type;if(!Ve.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ve.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(J>=0&&J<=R.width-se&&re>=0&&re<=R.height-K){ke.bindFramebuffer(G.FRAMEBUFFER,Ge);let Xe=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,Xe),G.bufferData(G.PIXEL_PACK_BUFFER,Me.byteLength,G.STREAM_READ),G.readPixels(J,re,se,K,ot.convert(nt),ot.convert(lt),0);let _t=T!==null?ze.get(T).__webglFramebuffer:null;ke.bindFramebuffer(G.FRAMEBUFFER,_t);let ht=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await pg(G,ht,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,Xe),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Me),G.deleteBuffer(Xe),G.deleteSync(ht),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,J=null,re=0){R.isTexture!==!0&&(no("WebGLRenderer: copyFramebufferToTexture function signature has changed."),J=arguments[0]||null,R=arguments[1]);let se=Math.pow(2,-re),K=Math.floor(R.image.width*se),Me=Math.floor(R.image.height*se),De=J!==null?J.x:0,Ge=J!==null?J.y:0;P.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,re,0,0,De,Ge,K,Me),ke.unbindTexture()},this.copyTextureToTexture=function(R,J,re=null,se=null,K=0){R.isTexture!==!0&&(no("WebGLRenderer: copyTextureToTexture function signature has changed."),se=arguments[0]||null,R=arguments[1],J=arguments[2],K=arguments[3]||0,re=null);let Me,De,Ge,We,nt,lt,Xe,_t,ht,Rt=R.isCompressedTexture?R.mipmaps[K]:R.image;re!==null?(Me=re.max.x-re.min.x,De=re.max.y-re.min.y,Ge=re.isBox3?re.max.z-re.min.z:1,We=re.min.x,nt=re.min.y,lt=re.isBox3?re.min.z:0):(Me=Rt.width,De=Rt.height,Ge=Rt.depth||1,We=0,nt=0,lt=0),se!==null?(Xe=se.x,_t=se.y,ht=se.z):(Xe=0,_t=0,ht=0);let hn=ot.convert(J.format),Et=ot.convert(J.type),qe;J.isData3DTexture?(P.setTexture3D(J,0),qe=G.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(P.setTexture2DArray(J,0),qe=G.TEXTURE_2D_ARRAY):(P.setTexture2D(J,0),qe=G.TEXTURE_2D),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,J.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,J.unpackAlignment);let tn=G.getParameter(G.UNPACK_ROW_LENGTH),vt=G.getParameter(G.UNPACK_IMAGE_HEIGHT),An=G.getParameter(G.UNPACK_SKIP_PIXELS),Qn=G.getParameter(G.UNPACK_SKIP_ROWS),Tn=G.getParameter(G.UNPACK_SKIP_IMAGES);G.pixelStorei(G.UNPACK_ROW_LENGTH,Rt.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Rt.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,We),G.pixelStorei(G.UNPACK_SKIP_ROWS,nt),G.pixelStorei(G.UNPACK_SKIP_IMAGES,lt);let ki=R.isDataArrayTexture||R.isData3DTexture,mt=J.isDataArrayTexture||J.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){let Lt=ze.get(R),di=ze.get(J),gn=ze.get(Lt.__renderTarget),Gn=ze.get(di.__renderTarget);ke.bindFramebuffer(G.READ_FRAMEBUFFER,gn.__webglFramebuffer),ke.bindFramebuffer(G.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Un=0;Un<Ge;Un++)ki&&G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ze.get(R).__webglTexture,K,lt+Un),R.isDepthTexture?(mt&&G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ze.get(J).__webglTexture,K,ht+Un),G.blitFramebuffer(We,nt,Me,De,Xe,_t,Me,De,G.DEPTH_BUFFER_BIT,G.NEAREST)):mt?G.copyTexSubImage3D(qe,K,Xe,_t,ht+Un,We,nt,Me,De):G.copyTexSubImage2D(qe,K,Xe,_t,ht+Un,We,nt,Me,De);ke.bindFramebuffer(G.READ_FRAMEBUFFER,null),ke.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else mt?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(qe,K,Xe,_t,ht,Me,De,Ge,hn,Et,Rt.data):J.isCompressedArrayTexture?G.compressedTexSubImage3D(qe,K,Xe,_t,ht,Me,De,Ge,hn,Rt.data):G.texSubImage3D(qe,K,Xe,_t,ht,Me,De,Ge,hn,Et,Rt):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,K,Xe,_t,Me,De,hn,Et,Rt.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,K,Xe,_t,Rt.width,Rt.height,hn,Rt.data):G.texSubImage2D(G.TEXTURE_2D,K,Xe,_t,Me,De,hn,Et,Rt);G.pixelStorei(G.UNPACK_ROW_LENGTH,tn),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,vt),G.pixelStorei(G.UNPACK_SKIP_PIXELS,An),G.pixelStorei(G.UNPACK_SKIP_ROWS,Qn),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Tn),K===0&&J.generateMipmaps&&G.generateMipmap(qe),ke.unbindTexture()},this.copyTextureToTexture3D=function(R,J,re=null,se=null,K=0){return R.isTexture!==!0&&(no("WebGLRenderer: copyTextureToTexture3D function signature has changed."),re=arguments[0]||null,se=arguments[1]||null,R=arguments[2],J=arguments[3],K=arguments[4]||0),no('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,J,re,se,K)},this.initRenderTarget=function(R){ze.get(R).__webglFramebuffer===void 0&&P.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),ke.unbindTexture()},this.resetState=function(){E=0,A=0,T=null,ke.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}};var Rs=class extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var du=class extends Sn{constructor(e=null,t=1,n=1,r,s,o,a,c,l=jn,u=jn,h,p){super(null,o,a,c,l,u,r,s,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _r=class extends Zn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fs=new bt,kd=new bt,fa=[],Hd=new ii,uv=new bt,Qs=new it,eo=new gr,go=class extends it{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _r(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,uv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ii),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fs),Hd.copy(e.boundingBox).applyMatrix4(fs),this.boundingBox.union(Hd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fs),eo.copy(e.boundingSphere).applyMatrix4(fs),this.boundingSphere.union(eo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Qs.geometry=this.geometry,Qs.material=this.material,Qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),eo.copy(this.boundingSphere),eo.applyMatrix4(n),e.ray.intersectsSphere(eo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,fs),kd.multiplyMatrices(n,fs),Qs.matrixWorld=kd,Qs.raycast(e,fa);for(let o=0,a=fa.length;o<a;o++){let c=fa[o];c.instanceId=s,c.object=this,t.push(c)}fa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _r(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new du(new Float32Array(r*this.count),r,this.count,Bu,Ri));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Dn=class extends xr{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ua=new D,Fa=new D,Vd=new bt,to=new fo,pa=new gr,ol=new D,Gd=new D,Li=class extends pn{constructor(e=new Mt,t=new Dn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Ua.fromBufferAttribute(t,r-1),Fa.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Ua.distanceTo(Fa);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(r),pa.radius+=s,e.ray.intersectsSphere(pa)===!1)return;Vd.copy(r).invert(),to.copy(e.ray).applyMatrix4(Vd);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let d=u.getX(x),v=u.getX(x+1),y=ma(this,e,to,c,d,v);y&&t.push(y)}if(this.isLineLoop){let x=u.getX(g-1),m=u.getX(f),d=ma(this,e,to,c,x,m);d&&t.push(d)}}else{let f=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let d=ma(this,e,to,c,x,x+1);d&&t.push(d)}if(this.isLineLoop){let x=ma(this,e,to,c,g-1,f);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ma(i,e,t,n,r,s){let o=i.geometry.attributes.position;if(Ua.fromBufferAttribute(o,r),Fa.fromBufferAttribute(o,s),t.distanceSqToSegment(Ua,Fa,ol,Gd)>n)return;ol.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ol);if(!(c<e.near||c>e.far))return{distance:c,point:Gd.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}var Wd=new D,Xd=new D,Vr=class extends Li{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Wd.fromBufferAttribute(t,r),Xd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Wd.distanceTo(Xd);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Cs=class extends Sn{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},ri=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,s=n.length,o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);let u=n[r],p=n[r+1]-u,f=(o-u)/p;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new Be:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new D,r=[],s=[],o=[],a=new D,c=new bt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new D)}s[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),h=Math.abs(r[0].y),p=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(an(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(an(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},xo=class extends ri{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new Be){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=c-this.aX,f=l-this.aY;c=p*u-f*h+this.aX,l=p*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},fu=class extends xo{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Xu(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let p=(o-s)/l-(a-s)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+h)+(c-a)/h;p*=u,f*=u,r(o,a,p,f)},calc:function(s){let o=s*s,a=o*s;return i+e*s+t*o+n*a}}}var ga=new D,al=new Xu,cl=new Xu,ll=new Xu,pu=class extends ri{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new D){let n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(ga.subVectors(r[0],r[1]).add(r[0]),l=ga);let h=r[a%s],p=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(ga.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=ga),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),al.initNonuniformCatmullRom(l.x,h.x,p.x,u.x,g,x,m),cl.initNonuniformCatmullRom(l.y,h.y,p.y,u.y,g,x,m),ll.initNonuniformCatmullRom(l.z,h.z,p.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(al.initCatmullRom(l.x,h.x,p.x,u.x,this.tension),cl.initCatmullRom(l.y,h.y,p.y,u.y,this.tension),ll.initCatmullRom(l.z,h.z,p.z,u.z,this.tension));return n.set(al.calc(c),cl.calc(c),ll.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new D().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function qd(i,e,t,n,r){let s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function hv(i,e){let t=1-i;return t*t*e}function dv(i,e){return 2*(1-i)*i*e}function fv(i,e){return i*i*e}function ao(i,e,t,n){return hv(i,e)+dv(i,t)+fv(i,n)}function pv(i,e){let t=1-i;return t*t*t*e}function mv(i,e){let t=1-i;return 3*t*t*i*e}function gv(i,e){return 3*(1-i)*i*i*e}function xv(i,e){return i*i*i*e}function co(i,e,t,n,r){return pv(i,e)+mv(i,t)+gv(i,n)+xv(i,r)}var Na=class extends ri{constructor(e=new Be,t=new Be,n=new Be,r=new Be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Be){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(co(e,r.x,s.x,o.x,a.x),co(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},mu=class extends ri{constructor(e=new D,t=new D,n=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new D){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(co(e,r.x,s.x,o.x,a.x),co(e,r.y,s.y,o.y,a.y),co(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Oa=class extends ri{constructor(e=new Be,t=new Be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Be){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yo=class extends ri{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},za=class extends ri{constructor(e=new Be,t=new Be,n=new Be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Be){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(ao(e,r.x,s.x,o.x),ao(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends ri{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(ao(e,r.x,s.x,o.x),ao(e,r.y,s.y,o.y),ao(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Be){let n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(qd(a,c.x,l.x,u.x,h.x),qd(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new Be().fromArray(r))}return this}},gu=Object.freeze({__proto__:null,ArcCurve:fu,CatmullRomCurve3:pu,CubicBezierCurve:Na,CubicBezierCurve3:mu,EllipseCurve:xo,LineCurve:Oa,LineCurve3:yo,QuadraticBezierCurve:za,QuadraticBezierCurve3:Ba,SplineCurve:ka}),xu=class extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new gu[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new gu[r.type]().fromJSON(r))}return this}},yu=class extends xu{constructor(e){super(),this.type="Path",this.currentPoint=new Be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Oa(this.currentPoint.clone(),new Be(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new za(this.currentPoint.clone(),new Be(e,t),new Be(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){let a=new Na(this.currentPoint.clone(),new Be(e,t),new Be(n,r),new Be(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ka(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){let l=new xo(e,t,n,r,s,o,a,c);if(this.curves.length>0){let h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},_u=class i extends Mt{constructor(e=[new Be(0,-.5),new Be(.5,0),new Be(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=an(r,0,Math.PI*2);let s=[],o=[],a=[],c=[],l=[],u=1/t,h=new D,p=new Be,f=new D,g=new D,x=new D,m=0,d=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,d=e[v+1].y-e[v].y,f.x=d*1,f.y=-m,f.z=d*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:m=e[v+1].x-e[v].x,d=e[v+1].y-e[v].y,f.x=d*1,f.y=-m,f.z=d*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let v=0;v<=t;v++){let y=n+v*u*r,_=Math.sin(y),w=Math.cos(y);for(let E=0;E<=e.length-1;E++){h.x=e[E].x*_,h.y=e[E].y,h.z=e[E].x*w,o.push(h.x,h.y,h.z),p.x=v/t,p.y=E/(e.length-1),a.push(p.x,p.y);let A=c[3*E+0]*_,T=c[3*E+1],b=c[3*E+0]*w;l.push(A,T,b)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){let _=y+v*e.length,w=_,E=_+e.length,A=_+e.length+1,T=_+1;s.push(w,E,T),s.push(A,T,E)}this.setIndex(s),this.setAttribute("position",new rt(o,3)),this.setAttribute("uv",new rt(a,2)),this.setAttribute("normal",new rt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Ha=class i extends _u{constructor(e=1,t=1,n=4,r=8){let s=new yu;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new i(e.radius,e.length,e.capSegments,e.radialSegments)}},_o=class i extends Mt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],o=[],a=[],c=[],l=new D,u=new Be;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,p=3;h<=t;h++,p+=3){let f=n+h/t*r;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[p]/e+1)/2,u.y=(o[p+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new rt(o,3)),this.setAttribute("normal",new rt(a,3)),this.setAttribute("uv",new rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},_i=class i extends Mt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],p=[],f=[],g=0,x=[],m=n/2,d=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new rt(h,3)),this.setAttribute("normal",new rt(p,3)),this.setAttribute("uv",new rt(f,2));function v(){let _=new D,w=new D,E=0,A=(t-e)/n;for(let T=0;T<=s;T++){let b=[],M=T/s,C=M*(t-e)+e;for(let F=0;F<=r;F++){let V=F/r,Y=V*c+a,X=Math.sin(Y),I=Math.cos(Y);w.x=C*X,w.y=-M*n+m,w.z=C*I,h.push(w.x,w.y,w.z),_.set(X,A,I).normalize(),p.push(_.x,_.y,_.z),f.push(V,1-M),b.push(g++)}x.push(b)}for(let T=0;T<r;T++)for(let b=0;b<s;b++){let M=x[b][T],C=x[b+1][T],F=x[b+1][T+1],V=x[b][T+1];(e>0||b!==0)&&(u.push(M,C,V),E+=3),(t>0||b!==s-1)&&(u.push(C,F,V),E+=3)}l.addGroup(d,E,0),d+=E}function y(_){let w=g,E=new Be,A=new D,T=0,b=_===!0?e:t,M=_===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,m*M,0),p.push(0,M,0),f.push(.5,.5),g++;let C=g;for(let F=0;F<=r;F++){let Y=F/r*c+a,X=Math.cos(Y),I=Math.sin(Y);A.x=b*I,A.y=m*M,A.z=b*X,h.push(A.x,A.y,A.z),p.push(0,M,0),E.x=X*.5+.5,E.y=I*.5*M+.5,f.push(E.x,E.y),g++}for(let F=0;F<r;F++){let V=w+F,Y=C+F;_===!0?u.push(Y,Y+1,V):u.push(Y+1,Y,V),T+=3}l.addGroup(d,T,_===!0?1:2),d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var vo=class i extends Mt{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);let a=[],c=[],l=[],u=[],h=e,p=(t-e)/r,f=new D,g=new Be;for(let x=0;x<=r;x++){for(let m=0;m<=n;m++){let d=s+m/n*o;f.x=h*Math.cos(d),f.y=h*Math.sin(d),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=p}for(let x=0;x<r;x++){let m=x*(n+1);for(let d=0;d<n;d++){let v=d+m,y=v,_=v+n+1,w=v+n+2,E=v+1;a.push(y,_,E),a.push(_,w,E)}}this.setIndex(a),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var si=class i extends Mt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],h=new D,p=new D,f=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){let v=[],y=d/n,_=0;d===0&&o===0?_=.5/t:d===n&&c===Math.PI&&(_=-.5/t);for(let w=0;w<=t;w++){let E=w/t;h.x=-e*Math.cos(r+E*s)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(r+E*s)*Math.sin(o+y*a),g.push(h.x,h.y,h.z),p.copy(h).normalize(),x.push(p.x,p.y,p.z),m.push(E+_,1-y),v.push(l++)}u.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){let y=u[d][v+1],_=u[d][v],w=u[d+1][v],E=u[d+1][v+1];(d!==0||o>0)&&f.push(y,_,E),(d!==n-1||c<Math.PI)&&f.push(_,w,E)}this.setIndex(f),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(x,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Va=class i extends Mt{constructor(e=new Ba(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,c=new D,l=new Be,u=new D,h=[],p=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new rt(h,3)),this.setAttribute("normal",new rt(p,3)),this.setAttribute("uv",new rt(f,2));function x(){for(let y=0;y<t;y++)m(y);m(s===!1?t:0),v(),d()}function m(y){u=e.getPointAt(y/t,u);let _=o.normals[y],w=o.binormals[y];for(let E=0;E<=r;E++){let A=E/r*Math.PI*2,T=Math.sin(A),b=-Math.cos(A);c.x=b*_.x+T*w.x,c.y=b*_.y+T*w.y,c.z=b*_.z+T*w.z,c.normalize(),p.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function d(){for(let y=1;y<=t;y++)for(let _=1;_<=r;_++){let w=(r+1)*(y-1)+(_-1),E=(r+1)*y+(_-1),A=(r+1)*y+_,T=(r+1)*(y-1)+_;g.push(w,E,T),g.push(E,A,T)}}function v(){for(let y=0;y<=t;y++)for(let _=0;_<=r;_++)l.x=y/t,l.y=_/r,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new gu[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Qi=class extends xr{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uf,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ga=class extends Qi{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return an(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Wa=class extends Dn{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function xa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function yv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ps=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},vu=class extends Ps{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gh,endingEnd:Gh}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Wh:s=e,a=2*t-n;break;case Xh:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Wh:o=e,c=2*n-t;break;case Xh:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,p=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),x=g*g,m=x*g,d=-p*m+2*p*x-p*g,v=(1+p)*m+(-1.5-2*p)*x+(-.5+p)*g+1,y=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let w=0;w!==a;++w)s[w]=d*o[u+w]+v*o[l+w]+y*o[c+w]+_*o[h+w];return s}},bu=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),h=1-u;for(let p=0;p!==a;++p)s[p]=o[l+p]*h+o[c+p]*u;return s}},Mu=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},vi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xa(t,this.TimeBufferType),this.values=xa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xa(e.times,Array),values:xa(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case wa:t=this.InterpolantFactoryMethodDiscrete;break;case jl:t=this.InterpolantFactoryMethodLinear;break;case Dc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wa;case this.InterpolantFactoryMethodLinear:return jl;case this.InterpolantFactoryMethodSmooth:return Dc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&yv(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Dc,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let h=a*n,p=h-n,f=h+n;for(let g=0;g!==n;++g){let x=t[h+g];if(x!==t[p+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,p=o*n;for(let f=0;f!==n;++f)t[p+f]=t[h+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=jl;var Gr=class extends vi{constructor(e,t,n){super(e,t,n)}};Gr.prototype.ValueTypeName="bool";Gr.prototype.ValueBufferType=Array;Gr.prototype.DefaultInterpolation=wa;Gr.prototype.InterpolantFactoryMethodLinear=void 0;Gr.prototype.InterpolantFactoryMethodSmooth=void 0;var wu=class extends vi{};wu.prototype.ValueTypeName="color";var Su=class extends vi{};Su.prototype.ValueTypeName="number";var Eu=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Jt.slerpFlat(s,0,o,l-a,o,l,c);return s}},Xa=class extends vi{InterpolantFactoryMethodLinear(e){return new Eu(this.times,this.values,this.getValueSize(),e)}};Xa.prototype.ValueTypeName="quaternion";Xa.prototype.InterpolantFactoryMethodSmooth=void 0;var Wr=class extends vi{constructor(e,t,n){super(e,t,n)}};Wr.prototype.ValueTypeName="string";Wr.prototype.ValueBufferType=Array;Wr.prototype.DefaultInterpolation=wa;Wr.prototype.InterpolantFactoryMethodLinear=void 0;Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var Au=class extends vi{};Au.prototype.ValueTypeName="vector";var Tu=class{constructor(e,t,n){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,p=l.length;h<p;h+=2){let f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},_v=new Tu,Ru=class{constructor(e){this.manager=e!==void 0?e:_v,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ru.DEFAULT_MATERIAL_NAME="__DEFAULT";var qa=class extends pn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Ya=class extends qa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ul=new bt,Yd=new D,$d=new D,Cu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mo,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Yd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yd),$d.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($d),t.updateMatrixWorld(),ul.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ul),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ul)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Pu=class extends Cu{constructor(){super(new Ia(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bo=class extends qa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new Pu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var qu="\\[\\]\\.:\\/",vv=new RegExp("["+qu+"]","g"),Yu="[^"+qu+"]",bv="[^"+qu.replace("\\.","")+"]",Mv=/((?:WC+[\/:])*)/.source.replace("WC",Yu),wv=/(WCOD+)?/.source.replace("WCOD",bv),Sv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Yu),Ev=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Yu),Av=new RegExp("^"+Mv+wv+Sv+Ev+"$"),Tv=["material","materials","bones","map"],Iu=class{constructor(e,t,n){let r=n||qt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},qt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vv,"")}static parseTrackName(e){let t=Av.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Tv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};qt.Composite=Iu;qt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qt.prototype.GetterByBindingType=[qt.prototype._getValue_direct,qt.prototype._getValue_array,qt.prototype._getValue_arrayElement,qt.prototype._getValue_toArray];qt.prototype.SetterByBindingTypeAndVersioning=[[qt.prototype._setValue_direct,qt.prototype._setValue_direct_setNeedsUpdate,qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_array,qt.prototype._setValue_array_setNeedsUpdate,qt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_arrayElement,qt.prototype._setValue_arrayElement_setNeedsUpdate,qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_fromArray,qt.prototype._setValue_fromArray_setNeedsUpdate,qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gb=new Float32Array(1);var jd=new bt,$a=class{constructor(e,t,n=0,r=1/0){this.ray=new fo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new po,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return jd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jd),this}intersectObject(e,t=!0,n=[]){return Lu(e,this,n,t),n.sort(Zd),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Lu(e[r],this,n,t);return n.sort(Zd),n}};function Zd(i,e){return i.distance-e.distance}function Lu(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let o=0,a=s.length;o<a;o++)Lu(s[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Du}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Du);function vf(i,{layers:e=8,supersampling:t=2}={}){let n=()=>{let m=new ni(1,1,{type:vr,depthBuffer:!0});return m.depthTexture=new Ts(1,1,Ki),m},r=new ni(1,1,{type:vr,depthBuffer:!1}),s=n(),o=Array.from({length:e},n),a=new Be,c={opaque:{value:s.texture},opaqueDepth:{value:s.depthTexture},applyToneMapping:{value:!1},toneMappingExposure:{value:1}};o.forEach((m,d)=>c["layer"+d]={value:m.texture});let l=new Ln({uniforms:c,depthTest:!1,depthWrite:!1,vertexShader:"varying vec2 uvScreen; void main(){uvScreen=uv;gl_Position=vec4(position.xy,0.0,1.0);}",fragmentShader:`
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
    }`)},m.customProgramCacheKey=function(){return y.call(this)+"|depth-peeling-v1"},m.needsUpdate=!0,d.restore=()=>{m.onBeforeCompile=v,m.customProgramCacheKey=y,m.needsUpdate=!0},g.set(m,d),d}return{render(m,d){if(i.getDrawingBufferSize(a),a.multiplyScalar(t).floor(),s.width!==a.x||s.height!==a.y)for(let M of[s,...o,r])M.setSize(a.x,a.y);c.applyToneMapping.value=i.toneMapping!==void 0&&i.toneMapping!==Pi,c.toneMappingExposure.value=i.toneMappingExposure??1;let v=[],y=new Map;m.traverse(M=>{if(!M.material||!M.visible)return;let C=Array.isArray(M.material)?M.material:[M.material],F=C.some(V=>V.transparent&&V.opacity>0);if(v.push({object:M,transparent:F}),F){for(let V of C)if(!y.has(V)){let Y=x(V);Y.toneMap.value=c.applyToneMapping.value&&V.toneMapped,Y.exposure.value=i.toneMappingExposure??1,Y.bias.value=Math.max(0,M.renderOrder-15)*2e-6,y.set(V,{depthWrite:V.depthWrite,blending:V.blending,forceSinglePass:V.forceSinglePass,state:Y})}}});let _=m.background,w=i.getClearColor(new Je),E=i.getClearAlpha(),A=i.autoClear,T=i.shadowMap.autoUpdate,b=i.getRenderTarget();try{i.autoClear=!0,T&&v.some(({object:M,transparent:C})=>C&&M.castShadow)&&(i.setRenderTarget(s),i.render(m,d),i.shadowMap.autoUpdate=!1);for(let{object:M,transparent:C}of v)C&&(M.visible=!1);i.setRenderTarget(s),i.render(m,d),i.shadowMap.autoUpdate=!1,i.setRenderTarget(b),i.render(m,d);for(let{object:M,transparent:C}of v)M.visible=C;m.background=null,i.setClearColor(0,0);for(let[M,{state:C}]of y)M.depthWrite=!0,M.blending=Ci,M.forceSinglePass=!0,C.enabled.value=!0;o.forEach((M,C)=>{for(let{state:F}of y.values())F.first.value=C===0,F.previous.value=C?o[C-1].depthTexture:s.depthTexture;i.setRenderTarget(M),i.render(m,d)}),i.setRenderTarget(r),h.material=l,i.render(u,p),i.setRenderTarget(b),i.autoClear=!1,h.material=f,i.render(u,p)}finally{h.material=l,v.forEach(({object:M})=>M.visible=!0);for(let[M,C]of y)M.depthWrite=C.depthWrite,M.blending=C.blending,M.forceSinglePass=C.forceSinglePass,C.state.enabled.value=!1;m.background=_,i.setClearColor(w,E),i.autoClear=A,i.shadowMap.autoUpdate=T,i.setRenderTarget(b)}},dispose(){g.forEach(m=>m.restore()),g.clear(),s.dispose(),r.dispose(),f.dispose(),o.forEach(m=>m.dispose()),h.geometry.dispose(),l.dispose()}}}function bf(i,e=i,t=0,n=0){let r=Math.max(0,Math.min(i,e));return{clearHeight:r,cameraZoomScale:i>0?r/i:1,centerY:r/2,offsetX:-t,offsetY:(i-r)/2-n}}function Mf(i,e,t,n){let r=1-t.clearHeight/e;return{offsetX:t.offsetX+n.x*i/2,offsetY:t.offsetY+(r-n.y)*e/2}}function $u(i,e=.08,t=0,n=0){let r=i.map(f=>f.x),s=i.map(f=>f.y),o=Math.min(...r),a=Math.max(...r),c=Math.min(...s),l=Math.max(...s),u=1-e,h=a-o,p=l-c;return{zoomFactor:Math.min(2*(u-Math.abs(t))/Math.max(h,1e-8),2*(u-Math.abs(n))/Math.max(p,1e-8)),centerX:(o+a)/2,centerY:(c+l)/2,targetX:t,targetY:n}}var ue=(i,e)=>i.map((t,n)=>t+e[n]),st=(i,e)=>i.map((t,n)=>t-e[n]),oe=(i,e)=>i.map(t=>t*e),un=(i,e)=>i.reduce((t,n,r)=>t+n*e[r],0),Ut=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Ot=i=>Math.hypot(...i),be=i=>{let e=Ot(i);if(e<1e-10)throw new Error("This frame has no usable direction for this measurement.");return oe(i,1/e)},Ct=(i,e)=>st(i,oe(e,un(i,e)/un(e,e))),ct={x:[1,0,0],y:[0,1,0],z:[0,0,1]},Xr=i=>i*180/Math.PI,Rv=i=>i*Math.PI/180,br=(i,e,t)=>{let n=be(Ct(i,t)),r=be(Ct(e,t));return Xr(Math.atan2(un(be(t),Ut(n,r)),un(n,r)))},Mo=(i,e)=>Xr(Math.asin(Math.max(-1,Math.min(1,un(be(i),be(e))))));function gt(i,e,t){let n=be(e),r=Rv(t);return ue(ue(oe(i,Math.cos(r)),oe(Ut(n,i),Math.sin(r))),oe(n,un(n,i)*(1-Math.cos(r))))}function wf(i,e){let t=be(e),n=be(Ct(i,t));return{x:n,y:t,z:be(Ut(n,t))}}function Sf({x:i,y:e,z:t}){let n=new bt().set(i[0],e[0],t[0],0,i[1],e[1],t[1],0,i[2],e[2],t[2],0,0,0,0,1),r=new Nn().setFromRotationMatrix(n,"YXZ");return{turn:Xr(r.y),bend:Xr(r.x),tilt:Xr(r.z)}}function Ef(i,e,t){let n=e.meta,r=n.orientation,s=n.position?.[0],o=n.scale;if(!Array.isArray(r)||r.length!==3||r.some(m=>!Array.isArray(m)||m.length!==3||!m.every(Number.isFinite))||!Array.isArray(s)||s.length!==3||!s.every(Number.isFinite)||!(o>0))throw new Error("Metric alignment metadata is incomplete.");let a=Object.fromEntries(i.joints.map((m,d)=>[m,d])),c=m=>oe(st([0,1,2].map(d=>un(m,r.map(v=>v[d]))),s),1/o),l=m=>{let d=ue(oe(m,o),s);return r.map(v=>un(v,d))},u=i.reconstruction[t.frame].map(c),h=i.reconstruction[n.ref_frame_id].map(c);function p(m,d=u){let v=d[a[m]];if(!v||!v.every(Number.isFinite))throw new Error(`Missing measurement joint: ${m}`);return v}let f=(m,d,v)=>oe(ue(p(m,v),p(d,v)),.5),g=(m,d=u)=>({joints:[`right_${m}`,`left_${m}`],from:p(`right_${m}`,d),to:p(`left_${m}`,d),vector:st(p(`left_${m}`,d),p(`right_${m}`,d))});function x(m="entire"){let d=m==="lower"?["torso","thorax","clavicle"]:["clavicle"],v=m==="upper"?["thorax","torso","root"]:["root"],y=T=>T.find(b=>Object.hasOwn(a,b)),_=y(d),w=y(v),E=_?p(_):f("left_shoulder","right_shoulder"),A=w?p(w):f("left_hip","right_hip");return{from:A,to:E,vector:st(E,A),joints:[...w?[w]:["right_hip","left_hip"],..._?[_]:["right_shoulder","left_shoulder"]]}}return{data:i,metrics:e,entry:t,meta:n,pose:u,reference:h,point:p,midpoint:f,lateral:g,spine:x,source:l,normalized:c,unit:be}}var Tf={kinematic:"Body rotations",geometric:"Geometric angles",position:"Geometric translation"},Ka={torso_turn_bend_tilt:"Torso: turn, forward bend, tilt",hip_turn_on_spine_plane:"Hip: turn",shoulder_turn_on_spine_plane:"Shoulder: turn",shoulder_turn_tilt:"Shoulder: turn, tilt",hip_turn_tilt:"Hip: turn, tilt",spine_bend_tilt:"Spine: forward bend, side tilt",spine_azimuth_polar_spin:"Spine: lean direction, inclination, twist",hip_sway_thrust_lift:"Hip: sway, thrust, lift"},ju={turn:"Turn",bend:"Forward bend",tilt:"Side tilt",azimuth:"Lean direction",polar:"Lean from vertical",spin:"Twist around the spine",sway:"Sway",thrust:"Thrust",lift:"Lift"};var Rf=["X \xB7 right to left","Y \xB7 up","Z \xB7 forward"],wo=(i,e)=>i[e]??e.replaceAll("_"," "),Qa={torso_turn_bend_tilt:"The shoulders define the torso\u2019s left\u2013right direction, and the upper spine defines up. Compare this frame with the reference-pose axes, then rotate through turn, forward bend and side tilt in that order.",hip_turn_on_spine_plane:"Use the lower spine as the rotation axis. Project the hip line and the reference left\u2013right direction onto the plane across that axis, then compare their directions.",shoulder_turn_on_spine_plane:"Use the lower spine as the rotation axis. Project the shoulder line and the reference left\u2013right direction onto the plane across that axis, then compare their directions.",shoulder_turn_tilt:"Follow the line from the right shoulder to the left shoulder. Its direction across the reference horizontal plane gives turn; its angle above or below that plane gives tilt.",hip_turn_tilt:"Follow the line from the right hip to the left hip. Its direction across the reference horizontal plane gives turn; its angle above or below that plane gives tilt.",spine_bend_tilt:"Follow the spine from the hip center to the shoulder center. For forward bend, compare it with its projection onto the sideways\u2013up plane. For side tilt, compare it with its projection onto the forward\u2013up plane.",spine_azimuth_polar_spin:"Treat the spine and shoulders as a rigid T. Rotate its lean direction around global up, incline it toward the spine, then twist the crossbar around that spine.",hip_sway_thrust_lift:"Displacement starts at the reference hip center. One unit is the reference pose\u2019s mean length of ten shoulder, arm, hip and leg segments. Compare the two hip centers, then measure sway (sideways), thrust (forward), and lift (vertical) along the global reference axes."};Ka.torso_turn_bend_tilt_by_shoulder=Ka.torso_turn_bend_tilt;Qa.torso_turn_bend_tilt_by_shoulder=Qa.torso_turn_bend_tilt;var Af={torso_turn_bend_tilt:"Shoulders and upper spine",hip_turn_on_spine_plane:"Around the lower spine",shoulder_turn_on_spine_plane:"Around the lower spine",shoulder_turn_tilt:"Relative to the horizontal plane",hip_turn_tilt:"Relative to the horizontal plane",spine_bend_tilt:"Relative to the vertical reference planes",spine_azimuth_polar_spin:"Rigid T formed by spine and shoulders",hip_sway_thrust_lift:"Relative to the global reference"};Af.torso_turn_bend_tilt_by_shoulder=Af.torso_turn_bend_tilt;var Pt={input:"#168568",projection:"#507fca",result:"#a752b8",axis:"#87988d",reference:"#ce8b21"},Qt=(i,e,t,n=Pt.input,r=1)=>({kind:"vector",from:i,to:ue(i,oe(e,r)),label:t,color:n}),Cf=(i,e,t=Pt.reference)=>({kind:"point",position:i,label:e,color:t}),Us=(i,e,t,n=Pt.input)=>({kind:"vector",from:i,to:e,label:t,color:n}),bi=(i,e,t=Pt.input,n="selected")=>({...Us(i.from,i.to,e,t),jointPair:{pose:n,joints:i.joints}}),Pf=(i,e,t,n)=>({kind:"plane",origin:i,normal:be(e),radius:t,label:n,color:Pt.projection}),Mr=(i,e,t,n,r,s)=>({kind:"arc",origin:i,from:be(Ct(e,t)),normal:be(t),degrees:n,radius:r,label:s,color:Pt.result}),ec=(i,e,t,n,r="Projection")=>({kind:"projection",origin:i,direction:be(e),target:be(Ct(be(e),t)),size:n,label:r,color:Pt.projection}),jt=(i,e,t=[],n="")=>({title:i,text:e,visuals:t,detail:n});function er(i,e,t){let n=i.point("left_ankle",i.reference),r=i.point("right_ankle",i.reference),s=oe(ue(n,r),.5);return jt("Set the global directions","Use the reference frame\u2019s right-to-left ankle direction for X, with its vertical component removed. Y points up; the two directions determine forward Z. These axes stay fixed for the selected frame.",[bi({from:r,to:n,joints:["right_ankle","left_ankle"]},"Reference ankle direction",Pt.reference,"reference"),...Object.entries(ct).map(([o,a],c)=>Qt(s,a,Rf[c],Pt.axis,t))],"Reference-frame alignment is applied before this measurement.")}function Fs(i,e,t,n,r,s,o){let a=Ct(e,t),c=Ct(n,t);return[Pf(i,t,s*1.2,o),Qt(i,be(e),"Selected direction",Pt.input,s),ec(i,e,t,s,"Projected direction"),Qt(i,be(c),"Zero direction",Pt.axis,s),Mr(i,c,t,r,s*.7,"Signed turn")]}function So(i,e,t,n,r,s){let o=Ct(e,t),a=Cv(o,e,t);return[Pf(i,t,r*1.2,s),Qt(i,be(e),"Selected direction",Pt.input,r),ec(i,e,t,r),{...Mr(i,o,a,Math.abs(n),r*.7,"Inclination"),value:n}]}function Cv(i,e,t){let n=[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]];return Ot(n)>1e-9?n:be(st(t,oe(be(i),t.reduce((r,s,o)=>r+s*be(i)[o],0))))}function Pv(i){let e=i.lateral("shoulder"),t=i.spine("upper"),n=wf(e.vector,t.vector),r=Sf(n),s=t.from,o=Ot(i.spine().vector)*.85,a=gt(ct.x,ct.y,r.turn),c=ct.y,l=gt(c,a,r.bend),u=a,h=[er(i,s,o),jt("Build the torso directions","Take right shoulder \u2192 left shoulder and spine midpoint \u2192 shoulder center. Keep the spine direction; remove its component from the shoulder direction, then normalize the directions.",[bi(e,"Shoulder direction"),bi(t,"Upper spine"),ec(s,e.vector,t.vector,o,"Shoulder \u2192 perpendicular direction"),Qt(s,n.y,"Torso up",Pt.input,o),Qt(s,n.z,"Torso forward",Pt.axis,o)])],p=jt("Read the turn","The first rotation turns the global frame around its up axis. This is the Y step of the ordered Y \u2192 X \u2192 Z torso rotation.",[Qt(s,ct.x,"Global left",Pt.axis,o),Qt(s,a,"After turn",Pt.input,o),Qt(s,ct.y,"Turn axis",Pt.axis,o),Mr(s,ct.x,ct.y,r.turn,o*.7,"Turn")]),f=jt("Read the forward bend","Keep the turn, then bend around the turned left axis. This is the X step; it is not the angle of the spine projected onto a fixed global plane.",[Qt(s,c,"Before bend",Pt.axis,o),Qt(s,l,"After bend",Pt.input,o),Qt(s,a,"Bend axis",Pt.projection,o),Mr(s,c,a,r.bend,o*.7,"Forward bend")]),g=jt("Read the side tilt","Keep the turn and bend, then rotate around the resulting forward axis. This final Z step completes the torso frame.",[Qt(s,u,"Before tilt",Pt.axis,o),Qt(s,n.x,"After tilt",Pt.input,o),Qt(s,n.z,"Tilt axis",Pt.projection,o),Mr(s,u,n.z,r.tilt,o*.7,"Side tilt")]);return{values:r,items:{turn:[...h,p],bend:[...h,p,f],tilt:[...h,p,f,g]}}}function If(i,e){let t=i.lateral(e),n=i.spine("lower"),r=n.from,s=Ot(i.spine().vector)*.85,o=br(ct.x,t.vector,n.vector);return{values:{turn:o},items:{turn:[er(i,r,s),jt("Choose the moving plane",`Use hip center \u2192 spine midpoint as the plane normal. Take right ${e} \u2192 left ${e} as the direction to measure.`,[bi(n,"Lower spine normal",Pt.result),bi(t,`${e==="hip"?"Hip":"Shoulder"} direction`)]),jt("Project and read the turn","Project both global X and the selected direction onto the plane perpendicular to the lower spine. Read the signed rotation from projected X to the projected direction around the spine normal.",Fs(r,t.vector,n.vector,ct.x,o,s,"Lower-spine plane"))]}}}var Lf={torso_turn_bend_tilt:Pv,hip_turn_on_spine_plane:i=>If(i,"hip"),shoulder_turn_on_spine_plane:i=>If(i,"shoulder")};function Df(i,e){let t=i.lateral(e),n=oe(t.from.map((c,l)=>c+t.to[l]),.5),r=Ot(i.spine().vector)*.85,s=br(ct.x,t.vector,ct.y),o=Mo(t.vector,ct.y),a=[er(i,n,r),jt("Choose the measured direction",`Use the direction from the right ${e} to the left ${e}.`,[bi(t,`${e==="hip"?"Hip":"Shoulder"} direction`)])];return{values:{turn:s,tilt:o},items:{turn:[...a,jt("Project and read the turn","Project the direction onto the horizontal XZ plane. Read its signed rotation from global X around the up axis.",Fs(n,t.vector,ct.y,ct.x,s,r,"Horizontal XZ plane"))],tilt:[...a,jt("Read the tilt above the plane","Project the direction onto the horizontal XZ plane. Read the angle between the original direction and its projection; the Y component gives its sign.",So(n,t.vector,ct.y,o,r,"Horizontal XZ plane"))]}}}function Iv(i){let e=i.spine(),t=e.from,n=Ot(e.vector)*.85,r=Mo(e.vector,ct.z),s=Mo(e.vector,ct.x),o=[er(i,t,n),jt("Choose the entire spine","Use hip center \u2192 shoulder center as the measured direction.",[bi(e,"Entire spine")])];return{values:{bend:r,tilt:s},items:{bend:[...o,jt("Read the forward bend","Remove the forward Z component to project the spine onto the XY plane. The angle from that projection to the spine gives forward bend; the Z component gives its sign.",So(t,e.vector,ct.z,r,n,"XY plane"))],tilt:[...o,jt("Read the side tilt","Remove the sideways X component to project the spine onto the YZ plane. The angle from that projection to the spine gives side tilt; the X component gives its sign.",So(t,e.vector,ct.x,s,n,"YZ plane"))]}}}function Lv(i){let e=i.spine(),t=i.lateral("shoulder"),n=e.from,r=Ot(e.vector)*.85,s=br(ct.z,e.vector,ct.y),o=Mo(e.vector,ct.y),a=Math.sign(o)*(90-Math.abs(o)),c=gt(gt(ct.x,ct.x,a),ct.y,s),l=br(c,t.vector,e.vector),u=[er(i,n,r),jt("Choose spine and shoulder directions","Use hip center \u2192 shoulder center for the spine and right shoulder \u2192 left shoulder for the crossbar.",[bi(e,"Entire spine"),bi(t,"Shoulder crossbar")])],h=jt("Read the lean direction","Project the spine onto the horizontal XZ plane. Measure the signed rotation from global forward Z around global up Y.",Fs(n,e.vector,ct.y,ct.z,s,r,"Horizontal XZ plane")),p=jt("Read the lean from vertical","First read the spine\u2019s elevation above the horizontal plane. Convert elevation to signed lean from vertical: sign(elevation) \xD7 (90\xB0 \u2212 |elevation|).",[...So(n,e.vector,ct.y,o,r,"Horizontal XZ plane"),Qt(n,ct.y,"Vertical",Pt.axis,r),Mr(n,ct.y,Math.abs(a)>1e-8?be([e.vector[2],0,-e.vector[0]]):ct.x,Math.abs(a),r*.95,"Lean from vertical")],`Elevation ${o.toFixed(2)}\xB0 \u2192 lean ${a.toFixed(2)}\xB0`),f=jt("Read the twist","Tilt and turn a zero-twist frame using the lean and lean direction. Project its left axis and the shoulder crossbar onto the plane perpendicular to the actual spine, then read the signed rotation around the spine.",Fs(n,t.vector,e.vector,c,l,r,"Plane perpendicular to spine"));return{values:{azimuth:s,polar:a,spin:l},items:{azimuth:[...u,h],polar:[...u,p],spin:[...u,h,p,f]}}}var Uf={shoulder_turn_tilt:i=>Df(i,"shoulder"),hip_turn_tilt:i=>Df(i,"hip"),spine_bend_tilt:Iv,spine_azimuth_polar_spin:Lv};function Dv(i){let e=i.point("root",i.reference),t=i.point("root"),n=st(t,e),r=Ot(i.spine().vector)*.85,s=[er(i,e,r),jt("Normalize the pose","The fixed origin is the midpoint between the reference frame\u2019s ankles. Rotate into the reference axes, subtract that origin, and divide by the reference mean length of ten shoulder, arm, hip and leg segments. One unit is that reference mean segment length.",[Cf([0,0,0],"Origin \xB7 reference ankle midpoint"),Qt([0,0,0],ct.x,"1 normalized unit",Pt.reference,1),...Object.entries(ct).map(([a,c])=>Qt([0,0,0],c,`${a.toUpperCase()} from normalized origin`,Pt.axis,r)),Us(e,t,"Hip center displacement")]),jt("Compare hip centers","Subtract the reference hip center from the selected hip center. The normalized origin is at the reference ankles; the displacement is measured from the reference hip center.",[Us(e,t,"Selected \u2212 reference hip center")])],o={values:{sway:n[0],thrust:n[2],lift:n[1]},items:{}};for(let[a,c]of[["sway",0],["thrust",2],["lift",1]]){let l=[0,0,0];l[c]=n[c],o.items[a]=[...s,jt("Read the component",`Read the ${"XYZ"[c]} component of the hip-center displacement, in normalized length units.`,[Us(e,t,"Full displacement",Pt.axis),Us(e,ue(e,l),`${"XYZ"[c]} component`,Pt.result)])]}return o}var Ff={hip_sway_thrust_lift:Dv};var Uv={kinematic:Lf,geometric:Uf,position:Ff};function Ns(i,e,t){let n=Uv[t.type]?.[t.subtype];if(!n)throw new Error("No explanation is registered for this metric.");let r=Ef(i,e,t),s=n(r),o=e.metrics?.[t.type]?.[t.subtype],a=Object.entries(s.items).map(([c,l])=>{let u=o?.[c]?.[t.frame],h=s.values[c];if(!Number.isFinite(u)||!Number.isFinite(h))throw new Error(`No usable ${c} value at this frame.`);let p=t.type==="position"?Math.abs(u-h):Math.abs((u-h+540)%360-180);return{key:c,label:wo(ju,c),value:u,computed:h,matches:p<1e-5,unit:t.type==="position"?" units":"\xB0",steps:l}});return{title:wo(Ka,t.subtype),category:wo(Tf,t.type),context:r,items:a}}var Fv=[["left_shoulder","right_shoulder"],["left_shoulder","left_elbow"],["left_elbow","left_wrist"],["right_shoulder","right_elbow"],["right_elbow","right_wrist"],["left_hip","right_hip"],["left_hip","left_knee"],["left_knee","left_ankle"],["right_hip","right_knee"],["right_knee","right_ankle"]],Nv=[["sway","x",0],["thrust","z",2],["lift","y",1]];function tc(i){let e=u=>i.data.joints.includes("root")?i.point("root",u):i.midpoint("left_hip","right_hip",u),t=e(i.reference),n=e(i.pose),r=st(n,t),s=Fv.map(u=>{let h=i.point(u[0],i.reference),p=i.point(u[1],i.reference);return{joints:u,from:i.source(h),to:i.source(p),length:Ot(st(p,h))}}),o=t,a=Nv.map(([u,h,p])=>{let f=[0,0,0];f[p]=r[p];let g=o;return o=ue(o,f),{key:u,axis:h,value:r[p],from:i.source(g),to:i.source(o)}}),c=i.source([0,0,0]),l=i.source([1,0,0]);return{origin:c,unitEnd:l,bones:s,components:a,referenceRoot:i.source(t),selectedRoot:i.source(n),scale:i.meta.scale,meanLength:s.reduce((u,h)=>u+h.length,0)/s.length,referenceHips:{joints:["right_hip","left_hip"],from:i.source(i.point("right_hip",i.reference)),to:i.source(i.point("left_hip",i.reference))},selectedHips:{joints:["right_hip","left_hip"],from:i.source(i.point("right_hip")),to:i.source(i.point("left_hip"))}}}function Ov(i,e,t){let n=Ns(i,e,{type:"position",subtype:"hip_sway_thrust_lift",frame:t}),r=tc(n.context),s=r.referenceRoot,o=r.selectedRoot,a=[o[0],s[1],s[2]],c=[s[0],s[1],o[2]],l=[o[0],s[1],o[2]],u=(h,p)=>h.map((f,g)=>(f+p[g])/2);return{origin:s,hip:o,lines:[["sway",s,a],["sway",c,l],["thrust",s,c],["thrust",a,l],["lift",l,o]],anchors:{sway:u(c,l),thrust:u(a,l),lift:o}}}function Nf({scene:i,toWorld:e,data:t,metrics:n,canvas:r},s,o){let a=new Map(s.map(f=>[f.id,new Ln({uniforms:{color:{value:new Je(f.color)},resolution:{value:new Be(1,1)},width:{value:2}},vertexShader:`attribute vec3 other; attribute float side; uniform vec2 resolution; uniform float width;
   void main(){vec4 p=projectionMatrix*modelViewMatrix*vec4(position,1.0);
    vec4 q=projectionMatrix*modelViewMatrix*vec4(other,1.0);
    vec2 delta=(q.xy/q.w-p.xy/p.w)*resolution;
    vec2 normal=length(delta)>0.00001?normalize(vec2(-delta.y,delta.x)):vec2(0.0);
    p.xy+=normal*side*width/resolution*p.w;gl_Position=p;}`,fragmentShader:`uniform vec3 color; void main(){gl_FragColor=vec4(color,1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,side:Vt,depthTest:!0,depthWrite:!0})])),c=Array.from({length:5},(f,g)=>{let x=new Mt;x.setAttribute("position",new rt(new Float32Array(12),3)),x.setAttribute("other",new rt(new Float32Array(12),3)),x.setAttribute("side",new rt([1,-1,-1,1],1)),x.setIndex([0,1,2,2,1,3]);let m=new it(x,a.get(s[g<2?0:g<4?1:2].id));return m.frustumCulled=!1,m.renderOrder=0,m.visible=!1,i.add(m),m}),l=new si(.007,16,12),u=[["#8b9198","Translation origin"],["#168568","Current hip center"]].map(([f,g])=>{let x=new it(l,new $t({color:f,transparent:!0,opacity:.35,depthWrite:!1}));return x.name=g,x.visible=!1,i.add(x),x}),h=new Map,p;return{setFrame(f){h.has(f)||(h.set(f,Ov(t,n,f)),h.size>24&&h.delete(h.keys().next().value));let g=p=h.get(f);g.lines.forEach(([x,m,d],v)=>{let y=c[v],_=e(m),w=e(d);y.material=a.get(x),y.visible=_.distanceToSquared(w)>1e-16;let E=y.geometry.attributes.position,A=y.geometry.attributes.other;[_,_,w,w].forEach((T,b)=>E.setXYZ(b,T.x,T.y,T.z)),[w,w,_,_].forEach((T,b)=>A.setXYZ(b,T.x,T.y,T.z)),E.needsUpdate=A.needsUpdate=!0}),u.forEach(x=>x.visible=!0),u[0].position.copy(e(g.origin)),u[1].position.copy(e(g.hip));for(let x of s){let m=o.get(`${x.id}:${x.id}`);m.anchor=g.anchors[x.id],m.measurement=n.metrics.position.hip_sway_thrust_lift[x.id][f]}},updateView(f,g,x){a.forEach(m=>m.uniforms.resolution.value.set(g,x))},dispose(){c.forEach(f=>{i.remove(f),f.geometry.dispose()}),a.forEach(f=>f.dispose()),u.forEach(f=>{i.remove(f),f.material.dispose()}),l.dispose()}}}var Fe=i=>Math.max(0,Math.min(1,i)),Pe=i=>{let e=Fe(i);return e*e*(3-2*e)};function Of(i){return{directions:Pe(i/.22),projection:Pe((i-.18)/.35),angle:Pe((i-.55)/.3)}}function zf(i,e){let t=new Set,n=[];return i.forEach((r,s)=>{e!==void 0&&s!==e||r.steps.forEach((o,a)=>{t.has(o)||(t.add(o),n.push({itemIndex:s,stepIndex:a}))})}),n}function Di(i,e){return i==="focus"?Pe(e):i==="grow"?1:i==="release"?1-Pe(e):0}function Ui(i,e,t,n){let r=(s,o,a)=>ue(oe(s,1-a),oe(o,a));return t==="focus"?{from:i.from,to:i.from}:t==="grow"?{from:i.from,to:r(i.from,i.to,n)}:t==="release"?{from:i.from,to:i.to}:{from:r(i.from,e.from,n),to:r(i.to,e.to,n)}}function zv(i){let e=Fe(i);return e<.17?{phase:"focus",progress:Pe(e/.17),strength:Pe(e/.17),stretch:0}:e<.65?{phase:"grow",progress:Pe((e-.17)/.48),strength:1,stretch:Pe((e-.17)/.48)}:e<.82?{phase:"release",progress:Pe((e-.65)/.17),strength:1-Pe((e-.65)/.17),stretch:1}:{phase:"align",progress:Pe((e-.82)/.18),strength:0,stretch:1}}function Eo(i,e,t){return{id:`${i}-${e}-focus`,title:"Joint pair",duration:850,motionDuration:650,step:t,jointPair:{name:e,phase:"focus"}}}function Ao(i,e,t){return{id:`${i}-${e}-release`,title:"Release joint pair",duration:850,motionDuration:650,step:t,jointPair:{name:e,phase:"release"}}}function nc(i){let e=Fe(i);return e<.24?{phase:"camera-in",strength:0,stretch:0,camera:Pe(e/.2)}:e>.88?{phase:"camera-out",strength:0,stretch:1,camera:1-Pe((e-.88)/.12)}:{...zv((e-.24)/.64),camera:1}}var Zu=(i,e)=>oe(ue(i,e),.5),zt=(i,e,t)=>ue(oe(i,1-t),oe(e,t));function Bf(i,e,t){let n=be(t),r=be(st(e,i)),s=be(Ct(r,n));return{origin:Zu(i,e),right:i,left:e,rawX:r,x:s,y:n,z:be(Ut(s,n)),length:Ot(st(e,i))/2}}function zn(i,e,t){let n=Object.fromEntries(i.joints.map((u,h)=>[u,h])),r=(u,h)=>{let p=i.reconstruction[u][n[h]];if(!p)throw new Error(`Missing axis joint: ${h}`);return p},s=u=>u.find(h=>Object.hasOwn(n,h)),o=s(["clavicle"]),a=s(["thorax","torso","root"]),c=o?r(t,o):Zu(r(t,"left_shoulder"),r(t,"right_shoulder")),l=a?r(t,a):Zu(r(t,"left_hip"),r(t,"right_hip"));return{reference:{...Bf(r(e.ref_frame_id,"right_ankle"),r(e.ref_frame_id,"left_ankle"),[0,-1,0]),jointPairs:{lateral:{joints:["right_ankle","left_ankle"],from:r(e.ref_frame_id,"right_ankle"),to:r(e.ref_frame_id,"left_ankle")}}},torso:{...Bf(r(t,"right_shoulder"),r(t,"left_shoulder"),st(c,l)),jointPairs:{lateral:{joints:["right_shoulder","left_shoulder"],from:r(t,"right_shoulder"),to:r(t,"left_shoulder")},up:{joints:[...a?[a]:["right_hip","left_hip"],...o?[o]:["right_shoulder","left_shoulder"]],from:l,to:c}}}}}var Bv=["grow","shrink","up","orthogonalize","plane","forward","plane-fade","complete"];function kv(i,e,t){let n=Math.max(-1,Math.min(1,i.reduce((s,o,a)=>s+o*e[a],0))),r=Math.acos(n);return r<1e-8?[...e]:be(ue(oe(i,Math.sin((1-t)*r)),oe(e,Math.sin(t*r))))}function Fi(i,e,t,n){let r=Bv.indexOf(e),s=i.origin,o=i.length,a=Fe((t-.28)/.72),c={from:i.right,to:i.right},l=null,u=null,h=0,p=0;if(r===0&&(c.to=zt(i.right,i.left,t)),r===1&&(c={from:zt(i.right,s,t),to:i.left}),r>=2){let g=r===3?kv(i.rawX,i.x,a):r>3?i.x:i.rawX;c={from:s,to:ue(s,oe(g,o))},l={from:s,to:ue(s,oe(i.y,o*(r===2?t:1)))}}e==="up"&&n&&i.jointPairs?.up&&(l=Ui(i.jointPairs.up,{from:s,to:ue(s,oe(i.y,o))},n,t)),r>=4&&r<=6&&(h=r===4?t:1,p=r===6?1-t:1),r>=5&&(u={from:s,to:ue(s,oe(i.z,o*(r===5?t:1)))});let f=r===3?{origin:s,from:i.y,normal:be(Ut(i.y,be(st(c.to,c.from)))),angle:Xr(Math.acos(Math.max(-1,Math.min(1,un(i.y,be(st(c.to,c.from))))))),opacity:Pe(Fe(t/.18)),radius:o*.42,axis:"z",rightAngle:!0,squareProgress:Pe(Fe((a-.65)/.35))}:null;return{x:c,y:l,z:u,plane:h,planeOpacity:p,frame:i,opacity:1,highlight:r===3?"x":null,angleMarker:f}}function Ft(i,e=1){return{...Fi(i,"complete",1),opacity:e}}var en={x:"#7540c8",y:"#009eaf",z:"#e69a00"},kf={x:"#a46bff",y:"#00d8ed",z:"#ffc338"};function Os(i,e,t){let n=Math.max(0,Math.min(1,t));return"#"+[1,3,5].map(r=>Math.round(parseInt(i.slice(r,r+2),16)*(1-n)+parseInt(e.slice(r,r+2),16)*n).toString(16).padStart(2,"0")).join("")}function Hf(i,e,t){let n=en[i],r=en[e],s=Math.max(0,Math.min(1,t));return"#"+[1,3,5].map(o=>Math.round(parseInt(n.slice(o,o+2),16)*(1-s)+parseInt(r.slice(o,o+2),16)*s).toString(16).padStart(2,"0")).join("")}var Vf={reference:"#8b9198"},ic="#d22681";function wr(i,e){let t=new Mt;t.setAttribute("position",new rt(new Float32Array(12),3)),t.setIndex([0,1,2,0,2,3]);let n=64,r=new Mt;r.setAttribute("position",new rt(new Float32Array((n+2)*3),3)),r.setIndex(Array.from({length:n},(a,c)=>[0,c+1,c+2]).flat());let s=new $t({color:en.y,transparent:!0,opacity:0,depthWrite:!1,side:Vt}),o=new it(t,s);return o.renderOrder=15,i.add(o),{update(a){if(o.visible=!!a&&a.opacity>0,!o.visible)return;o.geometry=a.shape==="circle"?r:t;let c=o.geometry.attributes.position;if(a.shape==="circle"){let l=e(a.origin);c.setXYZ(0,l.x,l.y,l.z);for(let u=0;u<=n;u++){let h=u/n*Math.PI*2,p=e(ue(a.origin,ue(oe(a.u,Math.cos(h)*a.size),oe(a.v,Math.sin(h)*a.size))));c.setXYZ(u+1,p.x,p.y,p.z)}}else[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([u,h],p)=>{let f=e(ue(a.origin,ue(oe(a.u,u*a.size),oe(a.v,h*a.size))));t.attributes.position.setXYZ(p,f.x,f.y,f.z)});c.needsUpdate=!0,o.geometry.computeBoundingSphere(),s.opacity=(a.fillOpacity??.12)*a.opacity,s.color.set(a.color??en[a.axis??"y"])},dispose(){i.remove(o),t.dispose(),r.dispose(),s.dispose()}}}function Gf(i,e=96){let t=i.rightAngle?Fe(i.squareProgress??(Math.abs(Math.abs(i.angle)-90)<.05?1:0)):0,n=oe(i.from,i.radius),r=oe(gt(i.from,i.normal,i.angle),i.radius);return{points:Array.from({length:e+1},(o,a)=>{let c=a/e,l=oe(gt(i.from,i.normal,i.angle*c),i.radius),u=c<=.5?ue(n,oe(r,c*2)):ue(oe(n,(1-c)*2),r),h=ue(oe(l,1-t),oe(u,t));return ue(i.origin,h)}),amount:t}}function qr(i,e){let n=new Mt,r=new rt(new Float32Array(98*3),3);n.setAttribute("position",r),n.setIndex(Array.from({length:96},(h,p)=>[0,p+1,p+2]).flat());let s=new $t({transparent:!0,opacity:.2,depthWrite:!1,side:Vt}),o=new it(n,s);o.renderOrder=16,i.add(o);let a=new Mt,c=new rt(new Float32Array(99*3),3);a.setAttribute("position",c);let l=new Li(a,new Dn({transparent:!0,opacity:0,depthWrite:!1}));l.renderOrder=18,i.add(l);function u(h){if(o.visible=!!h&&Math.abs(h.angle)>.01,l.visible=!1,!o.visible)return;let{points:p,amount:f}=Gf(h,96),g=e(h.origin);r.setXYZ(0,g.x,g.y,g.z),c.setXYZ(0,g.x,g.y,g.z),p.forEach((m,d)=>{let v=e(m);r.setXYZ(d+1,v.x,v.y,v.z),c.setXYZ(d+1,v.x,v.y,v.z)}),c.setXYZ(98,g.x,g.y,g.z),r.needsUpdate=!0,c.needsUpdate=!0,n.computeBoundingSphere(),a.computeBoundingSphere();let x=h.opacity??1;s.opacity=(h.fillOpacity??.28)*x,l.visible=f>0||!!h.outline,l.material.opacity=.75*(h.outline?1:f)*x,s.color.set(h.color??ic),l.material.color.copy(s.color)}return{update:u,dispose(){n.dispose(),s.dispose(),a.dispose(),l.material.dispose(),i.remove(o,l)}}}function rc(i,e){let t=[qr(i,e),qr(i,e)];return{update(n=[]){t.forEach((r,s)=>r.update(n[s]))},dispose(){t.forEach(n=>n.dispose())}}}function Wf(i,e){let t=Object.fromEntries(i.joints.map((a,c)=>[a,c])),n=zn(i,e.meta,0).reference,r=i.reconstruction[0],s=oe(ue(r[t.left_ankle],r[t.right_ankle]),.5),o=i.reconstruction.map(a=>{let c=["shoulder","hip"].map(h=>{let p=a[t[`right_${h}`]],f=a[t[`left_${h}`]];if(![p,f].every(x=>Array.isArray(x)&&x.length===3&&x.every(Number.isFinite)))return null;let g=Ct(st(f,p),n.y);return Ot(g)>1e-10?be(g):null});if(c.some(h=>!h))return null;let[l,u]=c;return{shoulder:l,hip:u,angle:br(u,l,n.y)}});return{origin:s,normal:n.y,u:n.x,v:n.z,frames:o}}function Xf({scene:i,toWorld:e},t,n){let r=wr(i,e),s=qr(i,e);r.update({origin:t.origin,u:t.u,v:t.v,size:n,shape:"circle",color:bn.xfactor,opacity:1,fillOpacity:.12});let o=new _i(1,1,1,12),a=new D(0,1,0),c=["shoulder","hip"].map(l=>{let u=new it(o,new $t({color:bn[l]}));return u.name=`X-factor projected ${l} direction`,i.add(u),{region:l,mesh:u}});return{setFrame(l){let u=t.frames[l];for(let{region:p,mesh:f}of c){if(f.visible=!!u,!u)continue;let g=e(ue(t.origin,oe(u[p],-n))),x=e(ue(t.origin,oe(u[p],n))),m=x.clone().sub(g);f.position.copy(g).add(x).multiplyScalar(.5),f.quaternion.setFromUnitVectors(a,m.clone().normalize()),f.scale.set(.004,m.length(),.004)}let h=u?{origin:t.origin,from:u.hip,normal:t.normal,angle:u.angle,radius:n,color:bn.xfactor,opacity:1,fillOpacity:.38,outline:!0}:void 0;return s.update(h),h},dispose(){r.dispose(),s.dispose();for(let{mesh:l}of c)i.remove(l),l.material.dispose();o.dispose()}}}var Ju={torso_turn_bend_tilt:{turn:"y",bend:"x",tilt:"z"},hip_turn_on_spine_plane:{turn:"x"},shoulder_turn_on_spine_plane:{turn:"x"},shoulder_turn_tilt:{turn:"x",tilt:"y"},hip_turn_tilt:{turn:"x",tilt:"y"},spine_bend_tilt:{bend:"z",tilt:"x"},spine_azimuth_polar_spin:{azimuth:"z",polar:"y",spin:"x"},hip_sway_thrust_lift:{sway:"x",thrust:"z",lift:"y"}};Ju.torso_turn_bend_tilt_by_shoulder=Ju.torso_turn_bend_tilt;function sc(i,e){return en[Ju[i]?.[e]]}function qf(i,e,t,n=1e3,r){let s=i.filter(Number.isFinite),o=r?.low??Math.min(...s),a=r?.high??Math.max(...s),c=a-o||1,l=!1,u="";for(let h=0;h<i.length;h++){if(!Number.isFinite(i[h])){l=!1;continue}let p=h/Math.max(1,i.length-1)*n,f=e+t-(i[h]-o)/c*t;u+=(l?"L":"M")+p.toFixed(2)+","+f.toFixed(2),l=!0}return{path:u,low:s.length?o:0,high:s.length?a:0}}function Ku(i,e=4){let t=i.flatMap(u=>u.values).filter(Number.isFinite),n=t.length?Math.min(...t):0,r=t.length?Math.max(...t):1;if(n===r){let u=Math.max(1,Math.abs(n)*.1);n-=u,r+=u}let s=(r-n)/e,o=10**Math.floor(Math.log10(s)),a=s/o,c=(a<1.5?1:a<3?2:a<7?5:10)*o;n=Math.floor(n/c)*c,r=Math.ceil(r/c)*c;let l=Array.from({length:Math.round((r-n)/c)+1},(u,h)=>Number((n+h*c).toPrecision(12)));return{low:n,high:r,step:c,ticks:l}}function Hv(i,e,t="geometric-rotations",n){let s=$s[t].groups.flatMap(o=>o.keys.map(a=>({key:`${o.id}-${a}`,group:o.id,label:o.labels[a],color:o.color,dashed:o.keys.length>1&&a==="tilt",values:Array.from({length:e},(c,l)=>{let u=i.metrics?.[o.type]?.[o.subtype]?.[a]?.[l];return Number.isFinite(u)?u:null})})));return n&&s.push({key:"xfactor-angle",group:"xfactor",label:"X-factor",color:bn.xfactor,dashed:!1,values:Array.from({length:e},(o,a)=>Number.isFinite(n[a])?n[a]:null)}),s}function Yf({canvas:i,metrics:e,frameCount:t,xFactorValues:n,feature:r="geometric-rotations"}){let s=document.createElement("div");s.className="snapshot-rotation-plots snapshot-bottom-strip";let o=Hv(e,t,r,n),a=$s[r],c=a.groups.map(u=>({id:u.id,label:u.label,color:u.color}));n&&c.push({id:"xfactor",label:"X-factor",color:bn.xfactor}),a.combined&&(c=[{id:"translation",label:"Hip translation",color:"#65766d"}],s.style.height="76px"),s.style.setProperty("--measurement-rows",c.length),s.style.setProperty("--measurement-chart-height",a.combined?"43px":c.length===3?"20px":"36px");let l=c.map(u=>Vv({root:s,frameCount:t,region:u.id,label:u.label,color:u.color,unit:a.unit??"\xB0",channels:a.combined?o:o.filter(h=>h.group===u.id)}));return i.parentElement.append(s),{setFrame(u){l.forEach(h=>h.setFrame(u)),s.dataset.frame=u},dispose(){s.remove()}}}function Vv({root:i,frameCount:e,region:t,label:n,color:r,channels:s,unit:o="\xB0"}){let a="http://www.w3.org/2000/svg",c=new Set(s.map(A=>A.key)),l=new Map,u=Ku(s,2),h=document.createElement("div");h.className="snapshot-rotation-plot",h.setAttribute("aria-label",`${n} line plot`),h.style.setProperty("--rotation-panel-color",r),h.style.setProperty("--rotation-panel-fill",r+"21"),h.style.setProperty("--rotation-panel-border",r+"99");let p=document.createElement("div");p.className="snapshot-rotation-legend";for(let A of s){let T=document.createElement("button"),b=document.createElement("i");T.type="button",T.setAttribute("aria-pressed","true"),T.setAttribute("aria-label",`Toggle ${A.label}`),T.style.color=A.color,b.style.borderTopStyle=A.dashed?"dashed":"solid",T.append(b,document.createTextNode(A.label)),p.append(T),T.onclick=()=>{c.has(A.key)?c.delete(A.key):c.add(A.key),T.setAttribute("aria-pressed",String(c.has(A.key))),v()}}let f=document.createElement("div");f.className="snapshot-rotation-chart";let g=document.createElement("div");g.className="snapshot-rotation-ticks";let x=document.createElementNS(a,"svg");x.setAttribute("viewBox","0 0 1000 120"),x.setAttribute("preserveAspectRatio","none"),x.setAttribute("role","img"),x.setAttribute("aria-label",`${n} measurements in ${o.trim()} with a synchronized playback cursor`);let m=(A,T)=>{let b=document.createElementNS(a,A);for(let[M,C]of Object.entries(T))b.setAttribute(M,C);return x.append(b),b},d=document.createElementNS(a,"g");x.prepend(d);for(let A of s)l.set(A.key,m("path",{fill:"none",stroke:A.color,"stroke-width":1.5,"stroke-dasharray":A.dashed?"5 3":"none","vector-effect":"non-scaling-stroke"}));function v(){let A=s.filter(b=>c.has(b.key));A.length&&(u=Ku(A,2)),g.replaceChildren(),d.replaceChildren();let T=b=>(u.high-b)/(u.high-u.low)*120;for(let[b,M]of[[u.high,"4px"],[u.low,"calc(100% - 4px)"]]){let C=document.createElement("span");C.textContent=`${b}${o==="\xB0"?o:""}`,C.style.top=M,g.append(C)}for(let b of u.ticks){let M=m("line",{x1:0,x2:1e3,y1:T(b),y2:T(b),stroke:b===0?"#afbfaa88":"#dbe4d688","stroke-width":.65,"vector-effect":"non-scaling-stroke"});d.append(M)}for(let b of s){let M=l.get(b.key);M.style.display=c.has(b.key)?"":"none",M.setAttribute("d",qf(b.values,0,120,1e3,u).path)}w.hidden=!0,_.style.display="none",h.dataset.range=JSON.stringify([u.low,u.high])}let y=m("line",{x1:0,x2:0,y1:0,y2:120,stroke:"#29463b","stroke-width":1.4,"vector-effect":"non-scaling-stroke"}),_=m("line",{x1:0,x2:0,y1:0,y2:120,stroke:"#29463b","stroke-width":1,"stroke-dasharray":"3 3","vector-effect":"non-scaling-stroke"});_.style.display="none";let w=document.createElement("div");w.className="snapshot-rotation-tooltip",w.hidden=!0;let E=A=>{let T=x.getBoundingClientRect(),b=Math.max(0,Math.min(1,(A.clientX-T.left)/T.width)),M=Math.round(b*Math.max(0,e-1));_.style.display="",_.setAttribute("x1",b*1e3),_.setAttribute("x2",b*1e3),w.replaceChildren();for(let C of s){if(!c.has(C.key))continue;let F=document.createElement("div");F.style.color=C.color;let V=C.values[M];F.textContent=`${C.label}: ${Number.isFinite(V)?V.toFixed(o==="\xB0"?1:3)+o:"\u2014"}`,w.append(F)}w.style.left=`${b*100}%`,w.style.transform=b>.5?"translateX(-100%)":"none",w.hidden=c.size===0};return x.addEventListener("pointermove",E),x.addEventListener("pointerleave",()=>{w.hidden=!0,_.style.display="none"}),h.addEventListener("pointerdown",A=>A.stopPropagation()),h.addEventListener("wheel",A=>A.stopPropagation(),{passive:!0}),v(),f.append(g,x,w),h.append(p,f),i.append(h),{setFrame(A){let T=Math.max(0,Math.min(e-1,A))/Math.max(1,e-1)*1e3;y.setAttribute("x1",T),y.setAttribute("x2",T),h.dataset.frame=A},dispose(){h.remove()}}}function $f(i,e=()=>1){let t=new Set,n=new Set,r=new Map,s=[...i].sort((o,a)=>e(a.key)-e(o.key));for(let{key:o,state:a}of s){let c={...a};for(let l of["originalReferenceAxes","referenceAxes","torsoAxes"]){let u=a[l];if(!u)continue;let h={...u};for(let p of["x","y","z"]){let f=u[p];if(!f)continue;let x=(l==="torsoAxes"?"target":"measurement")+JSON.stringify([f.from,f.to].map(m=>m.map(d=>Math.round(d*1e7)/1e7)));t.has(x)?delete h[p]:t.add(x)}c[l]=h}a.guides&&(c.guides=a.guides.filter(l=>n.has(l.id)?!1:(n.add(l.id),!0))),r.set(o,c)}return i.map(({key:o})=>({key:o,state:r.get(o)}))}function oi(i,e){if(e.transition===void 0)return i;let t=i.segments.find(u=>u.id==="finish"),n=e.transition*1e3,r=e.type==="position"?.22:e.subtype==="spine_azimuth_polar_spin"||e.subtype.startsWith("torso_")?.34:e.subtype.endsWith("_on_spine_plane")?.4:.38,s=Math.min(1200,t.duration*.2),o=s+(t.duration-s)*r,a={...t,id:"review-transition",title:"Prepare review",completion:!1,start:t.start,end:t.start+n,duration:n},c={...t,start:a.end,duration:Math.max(0,t.duration-n)},l=i.segments.flatMap(u=>u===t?[a,c]:[u]);return{...i,segments:l,sample(u){let h=u;u>=a.start&&u<a.end?h=t.start+o*(u-a.start)/Math.max(1e-9,n):u>=c.start&&u<c.end&&(h=t.start+o+(t.duration-o)*(u-c.start)/Math.max(1e-9,c.duration));let p=i.sample(h);return u>=a.start&&u<a.end&&(p.segment="review-transition"),p.segment==="finish"&&(p.reviewDuration=t.duration),p}}}function mn(i,e){let t=Math.min(1200,e*.2)/e;return{holding:i<t,progress:Math.max(0,(i-t)/(1-t))}}function Mi(i,e,t=.4){let r=Math.max(1,e-Math.min(1200,e*.2)),s=Math.min(180/r,(t-.22)*.3);return i<.22?1-Pe(Fe(i/.22)):Pe(Fe((i-.22-s)/(t-.22-s)))}function Ni(i,e,t=.4,n=[]){if(i.segment!=="finish"||!i.torsoAxes)return;let r=e.find(l=>l.id==="finish"),s=mn(i.progress,r.duration);if(s.holding)return;let o=s.progress,a=Math.max(1,r.duration-Math.min(1200,r.duration*.2)),c=o<t?Mi(o,r.duration,t):1;for(let{at:l,ready:u}of n){let h=Math.min(240/a,.05),p=Math.min(100/a,(u-l)*.3);o>=l-h&&o<l?c*=Pe(Fe((l-o)/h)):o>=l&&o<u&&(c*=Pe(Fe((o-l-p)/(u-l-p))))}i.torsoAxes.opacity=(i.torsoAxes.opacity??1)*c}function Bn(){return[{id:"result-preview",title:"Selected pose \xB7 final result",duration:2200,intro:!0,opening:"result"},{id:"intro",title:"Reference + selected pose",duration:1600,motionDuration:1100,intro:!0,opening:"reference"}]}function Qu(i,e,t){return i.opening?{referencePose:i.opening==="result"?0:.5*Pe(Fe(e)),selectedPose:1,values:Object.fromEntries(Object.entries(t).map(([n,r])=>[n,i.opening==="result"?r:0]))}:null}function ai(i,e,t,n){let r=Qu(e,t,n);return r?(Object.assign(i,r),!0):!1}function yt(i,e){let t=be(i),n=be(Ut(e,t)),r=be(Ut(t,n));return new Jt().setFromRotationMatrix(new bt().makeBasis(new D(...n),new D(...r),new D(...t)))}function kn(i){let e=new D(...i.z).addScaledVector(new D(...i.x),.65);return yt(e.toArray(),i.y)}function eh(i){let e=[0,1,2].map(n=>Math.min(...i.map(r=>r[n]))),t=[0,1,2].map(n=>Math.max(...i.map(r=>r[n])));return[0,1].flatMap(n=>[0,1].flatMap(r=>[0,1].map(s=>[n?t[0]:e[0],r?t[1]:e[1],s?t[2]:e[2]])))}function Wt(i,e,t){let n=i.clone().slerp(e,t);return{direction:new D(0,0,1).applyQuaternion(n).toArray(),up:new D(0,1,0).applyQuaternion(n).toArray()}}function ci(i,e){return{...i,up:[...e]}}function th(i,e,t=.4){let n=new D(...e).normalize(),r=new D(...i.direction).normalize(),s=r.dot(n);if(s>=t)return i;let o=r.clone().addScaledVector(n,-s);return o.lengthSq()<1e-12&&o.crossVectors(n,new D(...i.up)),o.lengthSq()<1e-12&&o.crossVectors(n,new D(1,0,0)),o.normalize().multiplyScalar(Math.sqrt(1-t*t)).addScaledVector(n,t),{...i,direction:o.toArray()}}function Hn(i,e,t,n,r){let s=new D(...n).normalize(),o=new D(...r).normalize(),a=new D().crossVectors(s,o).normalize();function c(x){let m=new D(0,0,1).applyQuaternion(x);return{yaw:Math.atan2(m.dot(a),m.dot(o)),pitch:Math.asin(Math.max(-1,Math.min(1,m.dot(s))))}}let l=c(i),u=c(e),h=Math.atan2(Math.sin(u.yaw-l.yaw),Math.cos(u.yaw-l.yaw)),p=l.yaw+h*t,f=l.pitch+(u.pitch-l.pitch)*t;return{direction:o.clone().multiplyScalar(Math.cos(p)*Math.cos(f)).addScaledVector(a,Math.sin(p)*Math.cos(f)).addScaledVector(s,Math.sin(f)).toArray(),up:[...n]}}function oc(i,e,t=6,n=15){let r=new D(...e).normalize(),s=new D(0,0,1).applyQuaternion(i),o=Math.asin(Math.max(-1,Math.min(1,s.dot(r)))),a=Math.max(t*Math.PI/180,Math.min(n*Math.PI/180,o)),c=s.clone().addScaledVector(r,-s.dot(r)).normalize();return yt(c.multiplyScalar(Math.cos(a)).addScaledVector(r,Math.sin(a)).toArray(),e)}function jf(i,e,t,n){let r=new D(...t).normalize(),s=new D(...e).dot(r),o=new D(0,0,1).applyQuaternion(i);return Math.abs(s)>1e-8&&(o.addScaledVector(r,-o.dot(r)).normalize(),o.addScaledVector(r,Math.sign(s)*.35).normalize()),oc(yt(o.toArray(),n),n)}function Zf(i,e){let t=i.z.map((a,c)=>a+.65*i.x[c]+.35*i.y[c]),n=yt(t,i.y),r=.32,s=.3;function o(a,c,l){let u=mn(c,l);if(u.holding)return e.sample(a,{id:"finish"},1);let h=Fe(u.progress);if(h<.22){e.sample(a,{id:"finish"},1);let p=yt(a.camera.direction,a.camera.up),f=Pe(h/.22);return a.camera=Hn(p,n,f,i.y,i.z),a.focus=1+(r-1)*f,a.selectedPose=.1+(s-.1)*f,a.referenceAxes.opacity=1-f,a.values={turn:0,bend:0,tilt:0},a.sectors=[],a}if(h<.34)e.setAngles(a,0),a.referenceAxes.opacity=Mi(h,l,.34),a.sectors=[];else if(h<.88){let p=(h-.34)/.54*3,f=Math.min(2,Math.floor(p)),g=Fe((p-f-.25)/.75);e.sample(a,{id:["turn","bend","tilt"][f]},Pe(g))}else e.sample(a,{id:"finish"},1);return a.camera=Wt(n,n,1),a.focus=r,a.selectedPose=s,a}return{sample:o,view:n,focus:r,pose:s}}function Jf(i){let{origin:e,x:t,y:n,z:r,length:s}=i,o=a=>ue(e,oe(a,s));return{points:[e,o(t),o(n),ue(o(t),oe(n,s)),o(r)],orientation:yt(be(ue(ue(oe(t,.7),oe(n,.45)),r)),n)}}function ac(i,e,t=[0,0,-1],n=[0,-1,0]){let r=be(st(i.to,i.from)),s=Ct(t,r);Ot(s)<1e-6&&(s=Ct(Math.abs(r[1])<.9?[0,1,0]:[1,0,0],r));let o=be(s),a=Ct(n,o);return Ot(a)<1e-6&&(a=Ct(r,o)),{points:[i.from,i.to,...e?[e.from,e.to]:[]],orientation:yt(o,a)}}function Vn(i,e,t=[0,-1,0],{maxAlignment:n=.9,targetAlignment:r=.85}={}){let s=be(st(e.to,e.from)),o=Wt(i,i,1).direction,a=un(s,o);if(Math.abs(a)<=n)return i;let c=Ct(o,s);Ot(c)<1e-6&&(c=Wt(ac(e,null,o,t).orientation,ac(e,null,o,t).orientation,1).direction);let l=ue(oe(be(c),Math.sqrt(1-r*r)),oe(s,Math.sign(a)*r));return yt(l,t)}function cc(i,e,t=[0,-1,0]){let n=Jf(i),r=[...n.points,...Object.values(i.jointPairs).flatMap(a=>[a.from,a.to])],s=yt(ue(i.z,oe(i.y,.35)),i.y),o=n.orientation;for(let a of Object.values(i.jointPairs))o=Vn(o,a,t);return(a,c)=>{let l=a==="in"?c:a==="out"?1-c:1,u=a==="in"?e:a==="cross"?s:a==="out"?n.orientation:o,h=a==="out"?e:a==="angle"||a==="orthogonalize"?s:a==="in"||a==="hold"?o:n.orientation,p=["in","out","angle","cross"].includes(a)?c:1;return{pairFocus:{points:r,amount:l},camera:Wt(u,h,p)}}}function To(i){if(i!==void 0&&(typeof i!="number"||!Number.isFinite(i)||i<=0))throw new Error("Snapshot duration must be a positive number of seconds")}function Ro(i){if(i!==void 0&&(typeof i!="number"||!Number.isFinite(i)||i<0))throw new Error("Snapshot stay must be a nonnegative number of seconds")}function En(i,e,t){if(e&&typeof e=="object"){let l=e;return l.explain!==void 0?Gv(i,l):En(i,l.duration,l.stay)}To(e),Ro(t);let r=i.filter(l=>!(t!==void 0&&l.completion)).reduce((l,u)=>l+u.duration,0),s=e===void 0?r:e*1e3,o=s/r,a=0;for(let l of i)l.duration=t!==void 0&&l.completion?t*1e3:l.duration*o,l.motionDuration!==void 0&&(l.motionDuration*=o),l.start=a,a+=l.duration,l.end=a;let c=s+(t===void 0?0:i.filter(l=>l.completion).length*t*1e3);if(i.length){let l=i.at(-1);l.end=c,l.duration=c-l.start}return c}function Gv(i,e){To(e.explain);for(let c of["start_stay","transition","review","end_stay"])Ro(e[c]);let t=e.review*1e3,n=Math.min(800,t*.1),r=new Map([["result-preview",e.start_stay*1e3],["finish",t-n+(e.transition??0)*1e3],["reset",n]]);i.push({id:"end-stay",title:"Selected pose \xB7 final result",opening:"result",duration:e.end_stay*1e3}),r.set("end-stay",e.end_stay*1e3);let s=i.filter(c=>!r.has(c.id)).reduce((c,l)=>c+l.duration,0),o=e.explain*1e3/s,a=0;for(let c of i){let l=r.has(c.id)?c.duration?r.get(c.id)/c.duration:0:o;c.duration=r.get(c.id)??c.duration*o,c.motionDuration!==void 0&&(c.motionDuration*=l),c.start=a,a+=c.duration,c.end=a}return a}var Wv={grow:"Right \u2192 left",shrink:"Head \u2192 midpoint",up:"Up direction",orthogonalize:"Remove the up component",plane:"Left\u2013up plane",forward:"Forward direction","plane-fade":"Forward axis ready"},Xv=[["grow",1500],["shrink",1200],["up",1500],["orthogonalize",1700],["plane",1300],["forward",1500],["plane-fade",850]];function Co(i,e,t=i){return Xv.flatMap(([n,r])=>{let s={id:i+"-"+n,title:t+" \xB7 "+Wv[n],duration:r+500,motionDuration:r,step:n};return n==="grow"?[{id:i+"-lateral-camera-in",title:"Focus on the axis set",duration:1700,motionDuration:1200,step:"grow",constructionCamera:i,view:"in"},Eo(i,"lateral","grow"),{...s,jointPair:{name:"lateral",phase:"grow"}},Ao(i,"lateral","grow")]:n==="shrink"?[{...s,jointPair:{name:"lateral",phase:"align"}}]:n==="up"&&e.jointPairs.up?[Eo(i,"up","up"),{...s,jointPair:{name:"up",phase:"grow"}},Ao(i,"up","up"),{id:i+"-up-align",title:"Align the up-vector head",duration:1700,motionDuration:1200,step:"up",jointPair:{name:"up",phase:"align"}}]:n==="plane"?[{id:i+"-cross-camera-in",title:"View the cross product",duration:1700,motionDuration:1200,step:"plane",constructionCamera:i,view:"cross"},s]:n==="plane-fade"?[s,{id:i+"-cross-camera-out",title:"See the completed axis set",duration:1700,motionDuration:1200,step:"complete",constructionCamera:i,view:"out"}]:n!=="orthogonalize"?[s]:[{id:i+"-angle-camera",title:"View the left\u2013up angle",duration:1700,motionDuration:1200,step:"orthogonalize",constructionCamera:i,view:"angle"},{id:i+"-angle-reveal",title:"See the left\u2013up angle",duration:3e3,motionDuration:700,step:"orthogonalize",anglePhase:"reveal"},{...s,anglePhase:"remove"}]})}function lc(i,e,t,n){let r=e.jointPair,s=r?[{pose:n,joints:i.jointPairs[r.name].joints,strength:Di(r.phase,t)}]:[],o;return r?.name==="up"?o=Fi(i,e.step,t,r.phase):r?o=Fi(i,e.step,r.phase==="focus"?0:r.phase==="release"?1:t):e.anglePhase?(o=Fi(i,e.step,e.anglePhase==="remove"?.28+.72*t:0),o.angleMarker.opacity=e.anglePhase==="reveal"?t:1,o.componentPlane={origin:i.origin,u:i.x,v:i.z,size:i.length*1.1,axis:"y",opacity:e.anglePhase==="reveal"?Pe(t):1-Pe(Fe((t-.8)/.2))}):o=Fi(i,e.step,t),{axes:o,highlights:s}}function Oi(i,e){let t=i.sectors?.[0];if(!t)return;let n=Pe(Fe(e/.12))*Pe(Fe((1-e)/.12));if(n<=0)return;let r=be(t.normal),s=t.origin;for(let o of["referenceAxes","torsoAxes","originalReferenceAxes","originalTorsoAxes"]){let a=i[o];if(!(!a||(a.opacity??1)<=0))for(let c of["x","y","z"]){let l=a[c];if(!l||(l.opacity??1)<=0)continue;let u=st(l.to,l.from);if(Ot(u)<1e-8||Math.abs(un(be(u),r))<.99999||Ot(Ut(st(l.from,s),r))>1e-6)continue;let h=l.colorAxis??c;l.color=Os(l.color??en[h],kf[h],n)}}}function Kf(i,e,t,n){let r=g=>t.orientation.map(x=>x.reduce((m,d,v)=>m+d*g[v],0));function s(g,x,m){let d=gt(ct.x,ct.y,g),v=ct.y,y=gt(ct.z,ct.y,g);return v=gt(v,d,x),y=gt(y,d,x),d=gt(d,y,m),v=gt(v,y,m),{...i,origin:e.origin,length:e.length,x:r(d),y:r(v),z:r(y),rawX:r(d)}}let o={turn:s(0,0,0),bend:s(n.turn,0,0),tilt:s(n.turn,n.bend,0)},a=25*Math.PI/180,c=ue(oe(o.turn.y,Math.cos(a)),oe(o.bend.x,Math.sin(a))),l=(g,x,m)=>Hn(g,x,m,i.y,i.z),u={front:kn(i),turn:yt(c,i.y),bend:yt(o.bend.x,i.y),tilt:yt(o.tilt.z,i.y)};function h(g,x){let m={turn:"y",bend:"x",tilt:"z"}[g];return["x","y","z"].filter(d=>d!==m).map(d=>({origin:e.origin,from:o[g][d],normal:o[g][m],angle:x,radius:e.length*.85,axis:m,direction:d}))}function p(g,x,m){let d=["camera-turn","turn","camera-bend","bend","camera-tilt","tilt","finish","reset"],v=d.indexOf(x.id),y=v>1?n.turn:x.id==="turn"?n.turn*m:0,_=v>3?n.bend:x.id==="bend"?n.bend*m:0,w=v>5?n.tilt:x.id==="tilt"?n.tilt*m:0;if(g.values={turn:y,bend:_,tilt:w},g.referenceAxes=Ft(s(y,_,w)),x.cameraFor){let E=x.cameraFor,A={turn:"front",bend:"turn",tilt:"bend"}[E];g.camera=l(u[A],u[E],m),g.referenceAxes.highlight={turn:"y",bend:"x",tilt:"z"}[E]}else{let E=v<=1?"turn":v<=3?"bend":"tilt";g.camera=l(u[E],u[E],1)}if(["turn","bend","tilt"].includes(x.id)){let E=x.id,A={turn:"y",bend:"x",tilt:"z"}[E];g.active=E,g.referenceAxes.highlight=A,g.sectors=h(E,g.values[E]),Oi(g,m)}return x.id==="finish"&&(g.sectors=h("tilt",n.tilt)),x.id==="reset"&&(g.camera=l(u.tilt,u.front,m),g.focus=1-m,g.referencePose=.5*m,g.selectedPose=.1+.9*m,g.referenceAxes.opacity=1-m,g.torsoAxes.opacity=.42*(1-m)),g}function f(g,x){g.values=Object.fromEntries(Object.entries(n).map(([m,d])=>[m,d*x])),g.referenceAxes=Ft(s(g.values.turn,g.values.bend,g.values.tilt))}return{sample:p,setAngles:f}}function Po(i){let{data:e,meta:t,entry:n}=i.context,r=zn(e,t,n.frame),s=Object.fromEntries(i.items.map(x=>[x.key,x.computed])),o={...r.torso,origin:i.context.source(i.context.midpoint("left_hip","right_hip"))};r.measurement=o;let a=[...Bn(),{id:"reference-focus",title:"Reference pose",duration:1100},...Co("reference",r.reference,"Reference"),{id:"selected-focus",title:"Selected pose",duration:1300},...Co("torso",r.torso,"Torso"),{id:"target-root",title:"Move torso axes to hip center",duration:2200,motionDuration:1700},{id:"compare",title:"Two coordinate frames",duration:1200,motionDuration:700},{id:"align",title:"Align origins and lengths",duration:2700,motionDuration:2200},...["turn","bend","tilt"].flatMap(x=>[{id:"camera-"+x,title:"View along "+{turn:"Y",bend:"X",tilt:"Z"}[x]+" axis",duration:1800,motionDuration:1300,cameraFor:x},{id:x,title:{turn:"Turn \xB7 Y axis",bend:"Forward bend \xB7 X axis",tilt:"Side tilt \xB7 Z axis"}[x],duration:3900,motionDuration:3400}]),{id:"finish",title:"Aligned",duration:3e3,completion:!0},{id:"reset",title:"Reference + selected pose",duration:1200}],c=En(a,n),l=Kf(r.reference,o,t,s),u=Zf(r.reference,l),h=kn(r.reference),p=Object.fromEntries(["reference","torso"].map(x=>[x,cc(r[x],h)]));function f(x){let m=Fe(x/c)*c,d=a.find(A=>m<A.end)??a.at(-1),v=m-d.start,y=Fe(v/Math.max(1e-9,d.duration)),_=Pe(Fe(v/Math.max(1e-9,d.motionDuration??d.duration))),w={segment:d.id,title:d.title,progress:y,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{turn:0,bend:0,tilt:0},active:null,focus:0,focusOrigin:o.origin,camera:Wt(h,h,1),sectors:[],jointHighlights:[],pairFocus:null};function E(A){let T=lc(r[A],d,_,A==="reference"?"reference":"selected");return w.jointHighlights=T.highlights,T.axes}if(ai(w,d,_,s))return w;if(d.id==="reference-focus")return w.referencePose=.5-.22*_,w.selectedPose=1-_,w;if(d.constructionCamera){let A=d.constructionCamera,T=r[A];w.referencePose=A==="reference"?.28:0,w.selectedPose=A==="torso"?.28:0;let b=Fi(T,d.step,d.view==="out"?1:0);return w.referenceAxes=A==="reference"?b:Ft(r.reference),A==="torso"&&(w.torsoAxes=b),Object.assign(w,p[A](d.view,_)),w}return d.id.startsWith("reference-")?(w.referencePose=.28,w.selectedPose=0,w.referenceAxes=E("reference"),Object.assign(w,p.reference(d.step==="orthogonalize"?"orthogonalize":["plane","forward","plane-fade"].includes(d.step)?"cross-hold":"hold",1)),w):(w.referenceAxes=Ft(r.reference),d.id==="selected-focus"?(w.referencePose=.28*(1-_),w.selectedPose=.28*_,w):(w.referencePose=0,d.id.startsWith("torso-")?(w.selectedPose=.28,w.torsoAxes=E("torso"),Object.assign(w,p.torso(d.step==="orthogonalize"?"orthogonalize":["plane","forward","plane-fade"].includes(d.step)?"cross-hold":"hold",1)),w):d.id==="target-root"?(w.selectedPose=.28,w.torsoAxes=Ft({...r.torso,origin:zt(r.torso.origin,o.origin,_)}),w):(w.torsoAxes=Ft(o,.42),d.id==="compare"?(w.selectedPose=.28-.18*_,w.torsoAxes.opacity=1-.58*_,w):(w.selectedPose=.1,d.id==="align"?(w.referenceAxes=Ft({...r.reference,origin:zt(r.reference.origin,o.origin,_),length:r.reference.length*(1-_)+r.torso.length*_}),w.focus=Pe(Fe((_-.7)/.3)),w):(w.focus=1,d.id==="finish"?u.sample(w,y,d.duration):(l.sample(w,d,_),d.id==="reset"&&a.find(A=>A.completion).duration>0&&(w.camera=Wt(u.view,h,_),w.focus=u.focus*(1-_),w.selectedPose=u.pose+(1-u.pose)*_),w))))))}function g(x){let m=f(x);Ni(m,a,.34);for(let d of["x","y","z"])m.torsoAxes?.[d]&&(m.torsoAxes[d].keepVisible=!0);return m.segment==="reset"&&(m.referencePose=0),m.camera=ci(m.camera,r.reference.y),m}return oi({segments:a,duration:c,frames:r,values:s,sample:g},n)}function zi(i,e){let t=cc(i,e);return{segments:Co("reference",i),sample(n,r,s){if(!r.id.startsWith("reference-")||!r.step)return!1;if(n.referencePose=.28,n.selectedPose=0,r.constructionCamera)n.referenceAxes=Fi(i,r.step,r.view==="out"?1:0),Object.assign(n,t(r.view,s));else{let o=lc(i,r,s,"reference");n.referenceAxes=o.axes,n.jointHighlights=o.highlights,Object.assign(n,t(r.step==="orthogonalize"?"orthogonalize":["plane","forward","plane-fade"].includes(r.step)?"cross-hold":"hold",1))}return!0}}}function Yr(i,e,t,n){let r=be(Ct(i,e));return{direction:t==="project"?zt(i,r,n):r,originalOpacity:t==="fade"?1-n:1}}function tr(i,e,t,n){let r=be(Ut(e,i));return un(r,n)<0&&(r=oe(r,-1)),yt(ue(r,oe(e,.12)),t)}function Sr(i,e,{origin:t,radius:n,axis:r="y",opacity:s=1}){let o=be(i),a=be(Ct(i,e)),c=Ut(a,o),l=Math.hypot(...c);return{origin:t,from:a,to:o,normal:be(l>1e-8?c:Ut(a,e)),angle:Math.atan2(l,Math.max(-1,Math.min(1,un(a,o))))*180/Math.PI,radius:n,axis:r,opacity:s,rightAngle:!1,squareProgress:0}}function $r(i,e,t,{origin:n,radius:r,axis:s="y",opacity:o=1}){let a=be(i),c=be(e),l=Ut(a,c),u=Math.hypot(...l);return{origin:n,from:a,to:c,normal:be(u>1e-8?l:Ut(a,t)),angle:Math.atan2(u,Math.max(-1,Math.min(1,un(a,c))))*180/Math.PI,radius:r,axis:s,opacity:o,fillOpacity:.36,outline:!0}}function Io(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=t.subtype.startsWith("shoulder")?"shoulder":"hip",o=e.lateral(s),a=e.spine("lower"),c=ie=>({from:e.source(ie.from),to:e.source(ie.to),joints:ie.joints}),l={lateral:c(o),up:c(a)},u=s==="shoulder"?oe(ue(l.lateral.from,l.lateral.to),.5):l.up.from,h=be(st(l.up.to,l.up.from)),p=be(st(l.lateral.to,l.lateral.from)),f=r.x,g=be(Ct(f,h)),x=be(Ct(p,h)),m=be(Ut(g,h)),d=Math.max(Math.hypot(...st(l.lateral.to,l.lateral.from))*.65,Math.hypot(...st(l.up.to,l.up.from))),v={origin:u,x:g,y:h,z:m,length:d},y={...v,x,z:be(Ut(x,h))},_={turn:i.items[0].computed},w=kn(r),E=yt(ue(ue(m,oe(g,.5)),oe(h,.65)),r.y),A=yt(h,r.y),T=ue(ue(m,oe(g,.5)),oe(h,.65)),b=tr(f,h,r.y,T),M=tr(p,h,r.y,T),C=(ie,ne,Ee)=>Hn(ie,ne,Ee,r.y,r.z),F=Vn(E,l.up,r.y),V=Vn(b,l.lateral,r.y,s==="shoulder"?{maxAlignment:.5,targetAlignment:.4}:void 0),Y=zi(r,w),X=[...Object.values(l).flatMap(ie=>[ie.from,ie.to]),...[-1,1].flatMap(ie=>[-1,1].map(ne=>ue(u,ue(oe(g,d*ie),oe(m,d*ne))))),ue(u,oe(h,d))],I=(ie,ne=1600,Ee={})=>({id:ie,title:ie.replaceAll("-"," "),duration:ne+500,motionDuration:ne,...Ee}),Q=ie=>[{...Eo("selected",ie,ie),id:ie+"-focus",pair:ie,phase:"focus"},I(ie+"-grow",1600,{pair:ie,phase:"grow"}),{...Ao("selected",ie,ie),id:ie+"-release",pair:ie,phase:"release"},I(ie+"-align",1400,{pair:ie,phase:"align"})],W=[...Bn(),I("reference-focus",1100),...Y.segments,I("selected-focus",1700),I("measurement-camera",1800),...Q("up"),I("plane",1400),I("reference-align",1800),I("reference-trim",1200),I("baseline-camera",1500),I("baseline-angle",700,{hold:2300}),I("baseline-project",1800),I("baseline-fade",1200),...V===b?[]:[I("lateral-stretch-camera",1500)],...Q("lateral"),I("lateral-camera",1500),I("lateral-angle",700,{hold:2300}),I("lateral-project",1800),I("lateral-fade",1200),I("rotation-camera",1600),I("turn",3400),{id:"finish",title:"Review the lower-spine turn",duration:6e3,completion:!0},I("reset",1200)];for(let ie of W)ie.hold&&(ie.duration=ie.motionDuration+ie.hold);let B=En(W,t),H=ie=>W.findIndex(ne=>ne.id===ie),k=(ie,ne)=>H(ne)>=0&&W.indexOf(ie)>=H(ne),z=ie=>({from:u,to:ue(u,oe(ie,d))});function te(ie,ne=1){let Ee=Ft(v,ne);return Ee.x=z(ie),Ee.y=null,Ee.z=null,Ee}function U(ie,ne,Ee){return Sr(ie,h,{origin:u,radius:d*.38,opacity:Ee})}function j(ie,ne){ie.referenceAxes=te(gt(g,h,_.turn*ne)),ie.referenceAxes.y=null,ie.torsoAxes=te(x,.42),ie.values.turn=ne===0?0:_.turn*ne,ie.active="turn",ie.sectors=[{origin:u,from:g,normal:h,angle:_.turn*ne,radius:d*.8,axis:"y"}],Oi(ie,ne)}function ee(ie){let ne=W.find(P=>ie<P.end)??W.at(-1),Ee=ie-ne.start,de=Fe(Ee/Math.max(1e-9,ne.duration)),O=Pe(Fe(Ee/Math.max(1e-9,ne.motionDuration??ne.duration))),q={segment:ne.id,title:ne.title,progress:de,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{turn:0},active:null,focus:0,focusOrigin:u,camera:Wt(w,w,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(q,ne,O,_))return q;if(ne.id==="reference-focus")return q.referencePose=.5-.22*O,q.selectedPose=1-O,q;if(Y.sample(q,ne,O))return q;if(q.referencePose=0,q.selectedPose=.28,q.referenceAxes=Ft(r),ne.id==="selected-focus")return q.referencePose=.28*(1-O),q.selectedPose=.28*O,q;let G=k(ne,"reference-align"),Ae=ne.id==="reference-align"?O:G?1:0,ae={...r,origin:zt(r.origin,u,Ae),length:r.length*(1-Ae)+d*Ae};q.referenceAxes=Ft(ae);let Ve=[ae.origin,...["x","y","z"].map(P=>ue(ae.origin,oe(ae[P],ae.length)))],ke=[...X,...Ve];if(q.camera=C(w,F,ne.id==="measurement-camera"?O:1),q.pairFocus={points:ke,amount:ne.id==="measurement-camera"?O:1},k(ne,"baseline-camera")&&(q.camera=C(F,b,ne.id==="baseline-camera"?O:1)),k(ne,"lateral-stretch-camera")&&(q.camera=C(b,V,ne.id==="lateral-stretch-camera"?O:1)),k(ne,"lateral-camera")&&(q.camera=C(V,M,ne.id==="lateral-camera"?O:1)),ne.id==="measurement-camera")return q;if(q.torsoAxes=te(p,.65),k(ne,"baseline-camera")||(q.torsoAxes.y=z(h)),q.torsoAxes.x=k(ne,"lateral-focus")?z(p):null,ne.pair){let P=l[ne.pair],S=z(ne.pair==="up"?h:p),Z=Ui(P,S,ne.phase,O);q.jointHighlights=[{pose:"selected",joints:P.joints,strength:Di(ne.phase,O)}],ne.pair==="lateral"?q.torsoAxes.x=Z:q.torsoAxes.y=Z}if(k(ne,"plane")&&(q.plane={origin:u,u:g,v:m,size:d*(ne.id==="plane"?O:1),opacity:1}),ne.id==="reference-trim"&&(q.referenceAxes.y.opacity=1-O,q.referenceAxes.z.opacity=1-O,q.torsoAxes.y.opacity=1-O),k(ne,"baseline-camera")&&(q.referenceAxes.y=null,q.referenceAxes.z=null,q.torsoAxes.y=null),!k(ne,"baseline-angle"))return q;let ut=f,ze=p;if(k(ne,"baseline-project")){let P=ne.id==="baseline-project"?"project":"fade",S=Yr(f,h,P,ne.id==="baseline-fade"||P==="project"?O:1);ut=S.direction,S.originalOpacity>0&&(q.originalReferenceAxes=te(f,S.originalOpacity),q.originalReferenceAxes.y=null)}if(k(ne,"lateral-project")){let P=ne.id==="lateral-project"?"project":"fade",S=Yr(p,h,P,ne.id==="lateral-fade"||P==="project"?O:1);ze=S.direction,S.originalOpacity>0&&(q.originalTorsoAxes=te(p,.65*S.originalOpacity),q.originalTorsoAxes.y=null)}if(q.referenceAxes.x=z(ut),k(ne,"baseline-project")&&!k(ne,"lateral-focus")&&(q.referenceAxes.projectionSweep=$r(f,ut,h,{origin:u,radius:d*.5,opacity:ne.id==="baseline-fade"?1-O:k(ne,"baseline-fade")?0:1})),k(ne,"lateral-project")&&!k(ne,"rotation-camera")&&(q.torsoAxes.projectionSweep=$r(p,ze,h,{origin:u,radius:d*.5,opacity:ne.id==="lateral-fade"?1-O:k(ne,"lateral-fade")?0:1})),k(ne,"lateral-fade")&&(q.torsoAxes.opacity=ne.id==="lateral-fade"?.65-.23*O:.42),!ne.pair&&k(ne,"lateral-focus")&&(q.torsoAxes.x=z(ze)),["baseline-angle","baseline-project"].includes(ne.id)&&(q.referenceAxes.angleMarker=U(ut,ne.id==="baseline-project"?O:0,ne.id==="baseline-angle"?O:1)),["lateral-angle","lateral-project"].includes(ne.id)&&(q.torsoAxes.angleMarker=U(ze,ne.id==="lateral-project"?O:0,ne.id==="lateral-angle"?O:1)),ne.id==="rotation-camera")return q.camera=C(M,A,O),q;if(ne.id==="turn")return j(q,O),q.camera=Wt(A,A,1),q;if(ne.id==="finish"){let P=mn(de,ne.duration);if(P.holding)return j(q,1),q.camera=Wt(A,A,1),q;let S=P.progress;if(q.pairFocus=null,S<.22){j(q,1);let ce=Pe(S/.22);q.referenceAxes.opacity=1-ce,q.values.turn=0,q.sectors=[],q.camera=C(A,E,ce),q.pairFocus={points:ke,amount:1-ce},q.focus=.32*ce}else S<.4?(j(q,0),q.referenceAxes.opacity=Mi(S,ne.duration,.4),q.sectors=[],q.focus=.32,q.camera=Wt(E,E,1)):(j(q,Pe(Fe((S-.48)/.4))),q.focus=.32,q.camera=Wt(E,E,1));let Z=Pe(Fe(S/.22));return q.selectedPose=.28+.02*Z,q.plane.opacity=1-.4*Z,q}return ne.id==="reset"&&(j(q,1),q.referenceAxes.opacity=1-O,q.torsoAxes.opacity=.42*(1-O),q.plane.opacity=.6*(1-O),q.pairFocus=null,q.focus=.32*(1-O),q.camera=Wt(E,w,O),q.referencePose=.5*O,q.selectedPose=.3+.7*O,q.sectors=[]),q}function xe(ie){let ne=ee(ie);return Ni(ne,W,.4),ne.segment==="reset"&&(ne.referencePose=0),ne.camera=ci(ne.camera,r.y),ne}return oi({segments:W,duration:B,frames:{reference:r,torso:y},values:_,sample:xe},t)}function Qf(i,e,t){let n=i.y,r=i.x,s=be(Ct(e,n)),o=be(Ut(s,n));function a(c,l){let u=c==="tilt";return{direction:gt(u?s:r,u?o:n,t[c]*l),values:{turn:u?t.turn:l===0?0:t.turn*l,tilt:u?l===0?0:t.tilt*l:0},sector:{from:u?s:r,normal:u?o:n,angle:t[c]*l,axis:u?"z":"y"}}}return{up:n,base:r,horizontal:s,tiltAxis:o,sample:a}}function Lo(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=e.lateral(t.subtype.startsWith("hip")?"hip":"shoulder"),o={from:e.source(s.from),to:e.source(s.to),joints:s.joints},a=oe(ue(o.from,o.to),.5),c=be(st(o.to,o.from)),l=Math.hypot(...st(o.to,o.from))*.65,u=Object.fromEntries(i.items.map(k=>[k.key,k.computed])),h=Qf(r,c,u),{base:p,up:f,horizontal:g}=h,x={...r,origin:a,length:l},m={...x,x:c,y:f,z:be(Ut(c,f))},d=kn(r),v=yt(ue(ue(r.z,oe(p,.55)),oe(f,.45)),f),y=Vn(v,o,f,{maxAlignment:.5,targetAlignment:.4}),_=tr(c,f,f,ue(r.z,oe(p,.5))),w=yt(ue(oe(f,Math.cos(Math.PI/30)),oe(r.z,Math.sin(Math.PI/30))),f),E=(k,z,te)=>Hn(k,z,te,f,r.z),A=zi(r,d),T=(k,z=1600,te=500)=>({id:k,title:k.replaceAll("-"," "),duration:z+te,motionDuration:z}),b=[...Bn(),T("reference-focus",1100),...A.segments,T("selected-focus",1300),T("measurement-camera",1800),T("reference-align",1800),T("plane",1400),T("reference-trim",1100),...["focus","grow","release","align"].map(k=>({...T("lateral-"+k,k==="grow"?1600:1100),pairPhase:k})),T("projection-camera",1500),T("projection-angle",700,2300),T("projection",1800),T("original-fade",1100),T("turn-camera",1500),T("turn",3400),T("tilt-camera",1600),T("tilt-ready",1100),T("tilt",3400),{id:"finish",title:"Review "+(t.subtype.startsWith("hip")?"hip":"shoulder")+" turn and tilt",duration:6e3,completion:!0},T("reset",1200)],M=En(b,t),C=k=>b.findIndex(z=>z.id===k),F=(k,z)=>b.indexOf(k)>=C(z),V=k=>({from:a,to:ue(a,oe(k,l))});function Y(k,z=1){let te=Ft(x,z);return te.x=V(k),te.y=null,te.z=null,te}function X(k){return Y(k)}let I=[o.from,o.to,...[-1,1].flatMap(k=>[-1,1].map(z=>ue(a,ue(oe(p,l*k),oe(r.z,l*z))))),ue(a,oe(c,l))];function Q(k,z){let te=Hf("x","y",z);k.referenceAxes.x.color=te,k.valueColors={tilt:te}}function W(k,z,te){let U=h.sample(z,te);k.referenceAxes=X(U.direction),k.torsoAxes=Y(z==="turn"?g:c,.42),z==="tilt"&&Q(k,1),k.values=U.values,k.active=z,k.sectors=[{...U.sector,origin:a,radius:l*.8}],Oi(k,te)}function B(k){let z=b.find(Ee=>k<Ee.end)??b.at(-1),te=k-z.start,U=Fe(te/Math.max(1e-9,z.duration)),j=Pe(Fe(te/Math.max(1e-9,z.motionDuration??z.duration))),ee={segment:z.id,title:z.title,progress:U,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{turn:0,tilt:0},active:null,focus:0,focusOrigin:a,camera:Wt(d,d,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(ee,z,j,u))return ee;if(z.id==="reference-focus")return ee.referencePose=.5-.22*j,ee.selectedPose=1-j,ee;if(A.sample(ee,z,j))return ee;if(ee.referencePose=0,ee.selectedPose=.28,ee.referenceAxes=Ft(r),z.id==="selected-focus")return ee.referencePose=.28*(1-j),ee.selectedPose=.28*j,ee;let xe=z.id==="reference-align"?j:F(z,"reference-align")?1:0,ie={...r,origin:zt(r.origin,a,xe),length:r.length*(1-xe)+l*xe};ee.referenceAxes=Ft(ie);let ne=[...I,ie.origin,...["x","y","z"].map(Ee=>ue(ie.origin,oe(ie[Ee],ie.length)))];if(ee.pairFocus={points:ne,amount:z.id==="measurement-camera"?j:1},ee.camera=E(d,y,z.id==="measurement-camera"?j:1),z.id==="measurement-camera")return ee;if(ee.torsoAxes=F(z,"lateral-focus")?Y(c,.65):null,F(z,"plane")&&(ee.plane={origin:a,u:p,v:r.z,size:l*(z.id==="plane"?j:1),opacity:1}),z.id==="reference-trim"&&(ee.referenceAxes.y.opacity=1-j,ee.referenceAxes.z.opacity=1-j),F(z,"lateral-focus")&&(ee.referenceAxes.y=null,ee.referenceAxes.z=null),z.pairPhase)return ee.torsoAxes.x=Ui(o,V(c),z.pairPhase,j),ee.jointHighlights=[{pose:"selected",joints:o.joints,strength:Di(z.pairPhase,j)}],ee;if(!F(z,"projection-camera"))return ee;if(ee.referenceAxes=X(p),ee.camera=E(y,_,z.id==="projection-camera"?j:1),z.id==="projection-angle"&&(ee.torsoAxes.angleMarker=Sr(c,f,{origin:a,radius:l*.38,opacity:j})),F(z,"projection")){let Ee=z.id==="projection"?"project":"fade",de=Yr(c,f,Ee,z.id==="original-fade"||Ee==="project"?j:1);ee.torsoAxes=Y(de.direction,z.id==="original-fade"?.65-.23*j:F(z,"original-fade")?.42:.65),de.originalOpacity>0&&(ee.originalTorsoAxes=Y(c,.65*de.originalOpacity)),ee.torsoAxes.projectionSweep=$r(c,de.direction,f,{origin:a,radius:l*.5,opacity:de.originalOpacity}),z.id==="projection"&&(ee.torsoAxes.angleMarker=Sr(de.direction,f,{origin:a,radius:l*.38}))}if(F(z,"turn-camera")&&(ee.torsoAxes=Y(g,.42)),z.id==="turn-camera")return ee.camera=E(_,w,j),ee;if(z.id==="turn")return W(ee,"turn",j),ee.camera=E(w,w,1),ee;if(z.id==="tilt-camera"||z.id==="tilt-ready"){W(ee,"tilt",0),ee.sectors=[];let Ee=z.id==="tilt-camera"?j:1;return Q(ee,Ee),ee.torsoAxes.opacity=.42*Ee,ee.camera=E(w,_,Ee),ee}if(z.id==="tilt")return W(ee,"tilt",j),ee.camera=E(_,_,1),ee;if(z.id==="finish"){let Ee=mn(U,z.duration);if(W(ee,"tilt",1),ee.camera=E(_,_,1),Ee.holding)return ee;let de=Ee.progress;if(de<.22){let q=Pe(de/.22);ee.referenceAxes.opacity=1-q,ee.values={turn:0,tilt:0},ee.sectors=[],ee.camera=E(_,v,q),ee.pairFocus={points:ne,amount:1-q},ee.focus=.32*q}else ee.pairFocus=null,ee.focus=.32,ee.camera=E(v,v,1),de<.38?(W(ee,"turn",0),ee.referenceAxes.opacity=Mi(de,z.duration,.38),ee.sectors=[]):de<.64?W(ee,"turn",Pe(Fe((de-.44)/.2))):(W(ee,"tilt",Pe(Fe((de-.71)/.2))),Q(ee,Pe(Fe((de-.64)/.07))));let O=Pe(Fe(de/.22));return ee.selectedPose=.28+.02*O,ee.plane.opacity=1-.4*O,ee}return z.id==="reset"&&(W(ee,"tilt",1),ee.referenceAxes.opacity=1-j,ee.torsoAxes.opacity=.42*(1-j),ee.plane.opacity=.6*(1-j),ee.sectors=[],ee.pairFocus=null,ee.focus=.32*(1-j),ee.camera=E(v,d,j),ee.referencePose=.5*j,ee.selectedPose=.3+.7*j),ee}function H(k){let z=B(k);return Ni(z,b,.38,[{at:.64,ready:.71}]),z.segment==="reset"&&(z.referencePose=0),z.camera=ci(z.camera,f),z}return oi({segments:b,duration:M,frames:{reference:r,torso:m},values:u,sample:H},t)}function ep(i,e,t){let n=Ct(i,e),r=be(n),s=be(Ut(r,e));return{projected:n,baseline:r,axis:s,value:t,sample:o=>({direction:gt(r,s,t*o),angle:o===0?0:t*o})}}function uc(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=e.spine(),o={from:e.source(s.from),to:e.source(s.to),joints:s.joints},a=o.from,c=be(st(o.to,o.from)),l=Math.hypot(...st(o.to,o.from)),u=r.y,h=Math.min(r.length,l*.4),p={...r,origin:a,length:l},f={...p,y:c},g=Object.fromEntries(i.items.map(B=>[B.key,B.computed])),x=kn(r),m=ue(ue(r.z,oe(r.x,.55)),oe(u,.35)),d=yt(m,u),v=Vn(d,o,u,{maxAlignment:.7,targetAlignment:.6}),y=(B,H,k)=>Hn(B,H,k,u,r.z),_=zi(r,x),w={bend:{normal:r.z,axis:"z",u:r.x,v:u},tilt:{normal:r.x,axis:"x",u,v:r.z}};for(let[B,H]of Object.entries(w))H.measure=ep(c,H.normal,g[B]),H.view=jf(tr(c,H.normal,u,m),c,H.normal,u);let E=(B,H=1600,k=500,z={})=>({id:B,title:B.replaceAll("-"," "),duration:H+k,motionDuration:H,...z}),A=B=>[E(B+"-camera",1500),E(B+"-reference-fade",1200,900),E(B+"-ready",700),E(B,3200)],T=[...Bn(),E("reference-focus",1100),..._.segments,E("selected-focus",1300),E("measurement-camera",1800),E("reference-align",1800),E("reference-trim",1100),E("bend-plane",1400),...["focus","grow","release","align"].map(B=>E("spine-"+B,B==="grow"?1600:1100,500,{pairPhase:B})),...A("bend"),E("plane-switch",1400),E("tilt-plane",1400),...A("tilt"),{id:"finish",title:"Review spine bend and tilt",duration:6e3,completion:!0},E("reset",1200)],b=En(T,t),M=B=>T.findIndex(H=>H.id===B),C=(B,H)=>T.indexOf(B)>=M(H),F=B=>({from:a,to:ue(a,oe(B,l))});function V(B,H=1){let k=Ft(p,H);return k.x=F(B),k.y=null,k.z=null,k}function Y(B,H=1,k=1){let z=w[B];return{origin:a,u:z.u,v:z.v,size:l*H,opacity:k,axis:z.axis}}let X=[o.from,o.to,...[-1,1].flatMap(B=>[-1,1].flatMap(H=>["bend","tilt"].map(k=>ue(a,ue(oe(w[k].u,l*B),oe(w[k].v,l*H))))))];function I(B,H,k){let z=w[H].measure.sample(k);B.referenceAxes=V(z.direction,1),B.referenceAxes.x.colorAxis=w[H].axis,B.torsoAxes=V(c,.42),B.values={bend:H==="bend"?z.angle:g.bend,tilt:H==="tilt"?z.angle:0},B.active=H,B.sectors=[{origin:a,from:w[H].measure.baseline,normal:w[H].measure.axis,angle:z.angle,radius:l*.8,axis:w[H].axis}],Oi(B,k)}function Q(B){let H=T.find(de=>B<de.end)??T.at(-1),k=B-H.start,z=Fe(k/Math.max(1e-9,H.duration)),te=Pe(Fe(k/Math.max(1e-9,H.motionDuration??H.duration))),U={segment:H.id,title:H.title,progress:z,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{bend:0,tilt:0},active:null,focus:0,focusOrigin:a,camera:Wt(x,x,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(U,H,te,g))return U;if(H.id==="reference-focus")return U.referencePose=.5-.22*te,U.selectedPose=1-te,U;if(_.sample(U,H,te))return U;if(U.referencePose=0,U.selectedPose=.28,U.referenceAxes=Ft(r),H.id==="selected-focus")return U.referencePose=.28*(1-te),U.selectedPose=.28*te,U;let j=H.id==="reference-align"?te:C(H,"reference-align")?1:0,ee={...r,origin:zt(r.origin,a,j),length:r.length*(1-j)+h*j};U.referenceAxes=Ft(ee,C(H,"bend-plane")?.3:1);let xe=[...X,ee.origin,...["x","y","z"].map(de=>ue(ee.origin,oe(ee[de],ee.length)))];if(U.pairFocus={points:xe,amount:H.id==="measurement-camera"?te:1},U.camera=y(x,v,H.id==="measurement-camera"?te:1),H.id==="measurement-camera")return U;if(C(H,"bend-plane")&&(U.plane=Y("bend",H.id==="bend-plane"?te:1)),H.id==="reference-trim"&&(U.referenceAxes=Ft({...p,length:h},1-.7*te)),C(H,"spine-focus")&&(U.referenceAxes.x=null,U.referenceAxes.y=null,U.referenceAxes.z=null),H.pairPhase)return U.torsoAxes=V(c,.65),U.torsoAxes.x=Ui(o,F(c),H.pairPhase,te),U.jointHighlights=[{pose:"selected",joints:o.joints,strength:Di(H.pairPhase,te)}],U;if(!C(H,"bend-camera"))return U;let ie=C(H,"tilt-plane")?"tilt":"bend",ne=w[ie];U.plane=Y(ie,H.id==="tilt-plane"?te:1),U.referenceAxes=V(u,1),U.referenceAxes.x=null,U.torsoAxes=V(c,.42),ie==="tilt"&&(U.values.bend=g.bend);let Ee=ie==="bend"?v:w.bend.view;if(U.camera=y(Ee,ne.view,H.id===ie+"-camera"?te:C(H,ie+"-camera")?1:0),H.id==="plane-switch")return I(U,"bend",1),U.referenceAxes.opacity=1-te,U.plane=Y("bend",1,1-te),U.camera=y(w.bend.view,w.bend.view,1),U.sectors=[],U;if(H.id==="tilt-plane")return U.referenceAxes=V(u,1),U.referenceAxes.x=null,U.camera=y(w.bend.view,w.bend.view,1),U;if(H.id===ie+"-reference-fade"||H.id===ie+"-ready")return I(U,ie,0),U.referenceAxes.x.opacity=H.id===ie+"-reference-fade"?te:1,U.sectors=[],U;if(H.id===ie)return I(U,ie,te),U;if(H.id==="finish"){I(U,"tilt",1),U.camera=y(w.tilt.view,w.tilt.view,1);let de=mn(z,H.duration);if(de.holding)return U;let O=de.progress;if(U.plane=Y("tilt",1,.6),O<.22){let q=Pe(O/.22);U.referenceAxes.opacity=1-q,U.values={bend:0,tilt:0},U.sectors=[],U.camera=y(w.tilt.view,d,q),U.pairFocus={points:xe,amount:1-q},U.focus=.32*q,U.plane.opacity=1-.4*q}else if(U.pairFocus=null,U.focus=.32,U.camera=y(d,d,1),O<.38)I(U,"bend",0),U.referenceAxes.opacity=Mi(O,H.duration,.38),U.sectors=[],U.plane=Y("bend",1,.6);else{let Ve=Fe((O-.38)/.62),ke=.04+.36,ut=ke+.07,ze=ut+.08,P=ze+.05;if(Ve<ut){I(U,"bend",Pe(Fe((Ve-.04)/.36)));let S=1-Pe(Fe((Ve-ke)/.07));U.plane=Y("bend",1,.6*S),U.referenceAxes.opacity=S,U.sectors.forEach(Z=>{Z.opacity=S})}else if(Ve<ze)I(U,"bend",1),U.plane=null,U.referenceAxes.opacity=0,U.sectors=[];else{I(U,"tilt",Pe(Fe((Ve-P)/.36)));let S=Pe(Fe((Ve-ze)/.05));U.plane=Y("tilt",1,.6*S),U.referenceAxes.opacity=S}}return U.selectedPose=.28+.02*Pe(Fe(O/.22)),U}return H.id==="reset"&&(I(U,"tilt",1),U.referenceAxes.opacity=1-te,U.torsoAxes.opacity=.42*(1-te),U.plane=Y("tilt",1,.6*(1-te)),U.sectors=[],U.pairFocus=null,U.focus=.32*(1-te),U.camera=y(d,x,te),U.referencePose=.5*te,U.selectedPose=.3+.7*te),U}function W(B){let H=Q(B);if(Ni(H,T,.38),H.segment!=="end-stay"&&M(H.segment)>=M("spine-focus")){let k=H.segment==="reset"?1-Pe(Fe((B-T.find(z=>z.id==="reset").start)/(T.find(z=>z.id==="reset").motionDuration??T.find(z=>z.id==="reset").duration))):1;H.originalReferenceAxes=Ft({...p,length:h},.3*k)}return H.segment==="reset"&&(H.referencePose=0),H.camera=ci(H.camera,u),H}return oi({segments:T,duration:b,frames:{reference:r,torso:f},values:g,targetAxisColors:{x:"y"},sample:W},t)}function tp(i,e,t,n){let r=be(Ct(e,i.y)),s=be(Ct(t,e)),o=gt(i.x,i.y,n.azimuth),a=gt(i.z,i.y,n.azimuth),c=gt(i.y,o,n.polar),l=gt(a,o,n.polar),u={x:s,y:e,z:be(Ut(s,e))};function h(f,g){let x=f==="azimuth"?n.azimuth*g:n.azimuth,m=f==="azimuth"?0:f==="polar"?n.polar*g:n.polar,d=f==="spin"?n.spin*g:0,v=gt(i.x,i.y,x),y=gt(i.z,i.y,x),_=gt(i.y,v,m),w=gt(y,v,m);return{frame:{x:gt(v,_,d),y:_,z:gt(w,_,d)},values:{azimuth:g===0&&f==="azimuth"?0:x,polar:g===0&&f==="polar"?0:m,spin:g===0&&f==="spin"?0:d}}}return{target:u,horizontal:r,turnedX:o,tiltedY:c,tiltedZ:l,sample:h,sectors:(f,g)=>f==="azimuth"?[{from:i.z,normal:i.y,angle:g,axis:"y"}]:f==="polar"?[{from:i.y,normal:o,angle:g,axis:"x"}]:[1,-1].map(x=>({from:oe(o,x),normal:e,angle:g,axis:"y"}))}}function hc(i){let e=i.context,{entry:t,meta:n}=e,r=zn(e.data,n,t.frame).reference,s=de=>({from:e.source(de.from),to:e.source(de.to),joints:de.joints}),o={spine:s(e.spine()),shoulder:s(e.lateral("shoulder"))},a=o.spine.from,c=Math.hypot(...st(o.spine.to,a)),l=be(st(o.spine.to,a)),u=be(st(o.shoulder.to,o.shoulder.from)),h=Math.hypot(...st(o.shoulder.to,o.shoulder.from))/2,p=Object.fromEntries(i.items.map(de=>[de.key,de.computed])),f=tp(r,l,u,p),g={...r,origin:a,length:c},x={...g,...f.target},m=r.y,d=kn(r),v=ue(ue(r.z,oe(r.x,.55)),oe(m,.35)),y=yt(v,m),_=Vn(y,o.spine,m,{maxAlignment:.7,targetAlignment:.6}),w=Vn(_,o.shoulder,m,{maxAlignment:.5,targetAlignment:.4}),E=tr(u,l,m,v),A=yt(th(Wt(E,E,1),l).direction,m),T=yt(ue(oe(m,Math.cos(Math.PI/30)),oe(r.z,Math.sin(Math.PI/30))),m),b=oc(yt(f.turnedX,m),m),M=oc(yt(ue(l,oe(r.z,.12)),m),m,6,65),C={azimuth:T,polar:b,spin:M},F=(de,O,q)=>Hn(de,O,q,m,r.z),V=zi(r,d),Y=(de,O=1600,q=500,G={})=>({id:de,title:de.replaceAll("-"," "),duration:O+q,motionDuration:O,...G}),X=de=>["focus","grow","release","align"].map(O=>Y(de+"-"+O,O==="grow"?1600:1100,500,{pair:de,pairPhase:O})),I=[...Bn(),Y("reference-focus",1100),...V.segments,Y("selected-focus",1300),Y("measurement-camera",1800),Y("reference-align",2200),...X("spine"),Y("shoulder-camera",1500),...X("shoulder"),Y("crossbar-plane",1300),Y("crossbar-camera",1500),Y("crossbar-angle",700,1700),Y("crossbar-project",1800),Y("crossbar-original-fade",1100),Y("reference-t",1500,1e3),...["azimuth","polar","spin"].flatMap(de=>[Y(de+"-camera",1600),...de==="azimuth"?[Y("azimuth-plane",1300)]:[],Y(de+"-ready",650,900),Y(de,3400),...de==="azimuth"?[Y("forward-fade",1100)]:[]]),{id:"finish",title:"Review the T orientation",duration:8e3,completion:!0},Y("reset",1200)],Q=En(I,t),W=de=>I.findIndex(O=>O.id===de),B=(de,O)=>I.indexOf(de)>=W(O),H=(de=1)=>{let O=Ft(g,de);return O.x=O.y=O.z=null,O},k=de=>ue(a,oe(de.y,c));function z(de,O=1){let q=k(de),G=H(O);return G.frame={...g,...de},G.y={from:a,to:q,shape:"bar",stopAt:"x"},G.x={from:ue(q,oe(de.x,-h)),to:ue(q,oe(de.x,h)),shape:"bar"},G}function te(de,O=1){let q=z(de,O);return q.y.keepVisible=!0,q.z={from:a,to:ue(a,oe(de.z,c*.5)),opacity:.4},q}let U=de=>z(f.target,de),j=(de,O=1,q=1)=>de==="azimuth"?{origin:a,u:r.x,v:r.z,size:c*.7*q,opacity:O,axis:"y"}:de==="polar"?{origin:a,u:m,v:f.horizontal,size:c*.7*q,opacity:O,axis:"x"}:{origin:o.spine.to,u:f.turnedX,v:f.tiltedZ,size:h*1.6*q,opacity:O,axis:"y"},xe=[...Object.values(o).flatMap(de=>[de.from,de.to]),ue(a,oe(m,c)),...[-1,1].flatMap(de=>[-1,1].map(O=>ue(a,ue(oe(r.x,c*.7*de),oe(r.z,c*.7*O)))))];function ie(de,O,q){let G=f.sample(O,q);de.referenceAxes=O==="azimuth"?te(G.frame):z(G.frame),de.referenceAxes.y.keepVisible=!0,de.torsoAxes=U(.42),de.values=G.values,de.active=O,de.plane=j(O),de.sectors=f.sectors(O,p[O]*q).map(Ae=>({...Ae,origin:O==="spin"?o.spine.to:a,radius:O==="spin"?h*.9:c*.65})),Oi(de,q)}function ne(de){let O=I.find(S=>de<S.end)??I.at(-1),q=de-O.start,G=Fe(q/Math.max(1e-9,O.duration)),Ae=Pe(Fe(q/Math.max(1e-9,O.motionDuration??O.duration))),ae={segment:O.id,title:O.title,progress:G,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{azimuth:0,polar:0,spin:0},active:null,focus:0,focusOrigin:a,camera:Wt(d,d,1),sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(ae,O,Ae,p))return ae;if(O.id==="reference-focus")return ae.referencePose=.5-.22*Ae,ae.selectedPose=1-Ae,ae;if(V.sample(ae,O,Ae))return ae;if(ae.referencePose=0,ae.selectedPose=.28,ae.referenceAxes=Ft(r),O.id==="selected-focus")return ae.referencePose=.28*(1-Ae),ae.selectedPose=.28*Ae,ae;let Ve=O.id==="reference-align"?Ae:B(O,"reference-align")?1:0,ke={...r,origin:zt(r.origin,a,Ve),length:r.length*(1-Ve)+c*Ve},ut=te(r);if(ae.referenceAxes=te(r),O.id==="reference-align"){let S=Ft(r);for(let Z of["x","y","z"])ae.referenceAxes[Z]={...ut[Z],from:zt(S[Z].from,ut[Z].from,Ae),to:zt(S[Z].to,ut[Z].to,Ae)},Z==="z"&&(ae.referenceAxes.z.opacity=1-.6*Ae),Z!=="z"&&(delete ae.referenceAxes[Z].shape,ae.referenceAxes[Z].shapeBlend=Ae)}else B(O,"reference-align")||(ae.referenceAxes=Ft(r));let ze=[...xe,ke.origin,...["x","y","z"].map(S=>ue(ke.origin,oe(ke[S],ke.length)))];if(ae.pairFocus={points:ze,amount:O.id==="measurement-camera"?Ae:1},ae.camera=F(d,_,O.id==="measurement-camera"?Ae:1),O.id==="measurement-camera"||!B(O,"spine-focus"))return ae;if(ae.referenceAxes=te(r),ae.torsoAxes=H(.65),ae.torsoAxes.y={from:a,to:o.spine.to,shape:"bar",stopAt:"x"},B(O,"shoulder-camera")&&(ae.camera=F(_,w,O.id==="shoulder-camera"?Ae:1)),B(O,"shoulder-focus")&&(ae.torsoAxes.x={from:ue(o.spine.to,oe(u,-h)),to:ue(o.spine.to,oe(u,h)),shape:"bar"}),O.pair){let S=o[O.pair],Z=O.pair==="spine"?{from:a,to:o.spine.to}:{from:ue(o.spine.to,oe(u,-h)),to:ue(o.spine.to,oe(u,h))},ce=Ui(S,Z,O.pairPhase,Ae);return O.pairPhase==="align"&&(ce.shapeBlend=Ae),ae.torsoAxes[O.pair==="spine"?"y":"x"]=ce,ae.jointHighlights=[{pose:"selected",joints:S.joints,strength:Di(O.pairPhase,Ae)}],ae}if(!B(O,"crossbar-plane"))return ae;if(ae.plane=j("spin",1,O.id==="crossbar-plane"?Ae:1),B(O,"crossbar-camera")&&(ae.camera=F(w,A,O.id==="crossbar-camera"?Ae:1)),O.id==="crossbar-angle"&&(ae.torsoAxes.angleMarker=Sr(u,l,{origin:o.spine.to,radius:h*.65,opacity:Ae})),B(O,"crossbar-project")){let S=Yr(u,l,O.id==="crossbar-project"?"project":"fade",O.id==="crossbar-original-fade"||O.id==="crossbar-project"?Ae:1),Z=o.spine.to;ae.torsoAxes.x={from:ue(Z,oe(S.direction,-h)),to:ue(Z,oe(S.direction,h)),shape:"bar"},S.originalOpacity>0&&(ae.originalTorsoAxes=H(.65*S.originalOpacity),ae.originalTorsoAxes.x={from:ue(Z,oe(u,-h)),to:ue(Z,oe(u,h)),shape:"bar"}),ae.torsoAxes.projectionSweep=$r(u,S.direction,l,{origin:Z,radius:h*.8,opacity:S.originalOpacity}),O.id==="crossbar-project"&&(ae.torsoAxes.angleMarker=Sr(S.direction,l,{origin:Z,radius:h*.65}))}if(B(O,"reference-t")&&(ae.referenceAxes=te(r),ae.torsoAxes=U(.42),ae.plane=j("spin")),O.id==="forward-fade")return ie(ae,"azimuth",1),ae.referenceAxes.z.opacity=.4*(1-Ae),ae.camera=F(T,T,1),ae;if(O.id==="azimuth-plane")return ie(ae,"azimuth",0),ae.sectors=[],ae.plane=j("azimuth",1,Ae),ae.camera=F(T,T,1),ae;let P=["azimuth","polar","spin"];for(let S of P){if(!B(O,S+"-camera"))continue;let Z=S==="azimuth"?A:C[P[P.indexOf(S)-1]];if(ae.camera=F(Z,C[S],O.id===S+"-camera"?Ae:1),O.id===S+"-camera"||O.id===S+"-ready")return ie(ae,S,0),ae.sectors=[],S==="azimuth"&&O.id==="azimuth-camera"?ae.plane=Ae<1?j("spin",1,1-Ae):null:S==="polar"&&(ae.plane=j(S,O.id===S+"-camera"?Ae:1)),ae;if(O.id===S)return ie(ae,S,Ae),ae}if(O.id==="finish"){ie(ae,"spin",1),ae.camera=F(M,M,1);let S=mn(G,O.duration);if(S.holding)return ae;let Z=S.progress;if(Z<.22){let ce=Pe(Z/.22);ae.referenceAxes.opacity=1-ce,ae.values={azimuth:0,polar:0,spin:0},ae.sectors=[],ae.camera=F(M,y,ce),ae.pairFocus={points:ze,amount:1-ce},ae.focus=.28*ce}else if(ae.pairFocus=null,ae.focus=.28,ae.camera=F(y,y,1),Z<.34)ie(ae,"azimuth",0),ae.referenceAxes.opacity=Mi(Z,O.duration,.34),ae.sectors=[];else{let ce=(Z-.34)/.57*3,le=Math.min(2,Math.floor(ce)),pe=Pe(Fe((ce-le-.22)/.78));ie(ae,P[le],pe),le===1&&ce-le<.22&&(ae.referenceAxes.z={from:a,to:ue(a,oe(f.sample("azimuth",1).frame.z,c*.5)),opacity:.4*(1-Pe((ce-le)/.22))})}return ae.selectedPose=.28+.02*Pe(Fe(Z/.22)),ae}return O.id==="reset"&&(ie(ae,"spin",1),ae.referenceAxes.opacity=1-Ae,ae.torsoAxes.opacity=.42*(1-Ae),ae.plane.opacity=1-Ae,ae.sectors=[],ae.pairFocus=null,ae.focus=.28*(1-Ae),ae.camera=F(y,d,Ae),ae.selectedPose=.3+.7*Ae),ae}function Ee(de){let O=ne(de),q=W(O.segment);if(Ni(O,I,.34),q>=W("crossbar-plane")&&q<=W("azimuth-camera")){let G=th(O.camera,l),Ae=O.segment==="crossbar-plane"?Pe(Fe((de-I[q].start)/I[q].motionDuration)):1;O.camera={...O.camera,direction:be(zt(O.camera.direction,G.direction,Ae))}}return O.camera=ci(O.camera,m),O}return oi({segments:I,duration:Q,frames:{reference:r,torso:x},values:p,sample:Ee},t)}function np(i,e,t,n,r=1){let s=e[t],o=ue(s.from,oe(st(s.to,s.from),n)),a=[],c=e.map((u,h)=>oe(st(u.to,u.from),h<t?1:h===t?n:0)),l=new Set;return e.forEach((u,h)=>{if(h>t||Ot(c[h])<1e-10)return;let p=[0,1,2].filter(g=>g!==h),f=en[u.axis];for(let g=0;g<4;g++){let x=i;p.forEach((y,_)=>{g&1<<_&&(x=ue(x,c[y]))});let m=ue(x,c[h]),d=JSON.stringify([x,m].map(y=>y.map(_=>Math.round(_*1e9)/1e9)));if(l.has(d))continue;l.add(d);let v=g===0;a.push({id:v?"axis-measure-"+u.key:"axis-connector-"+u.key+"-"+g,kind:v?"arrow":"line",from:x,to:m,color:f,width:v?h===t?4.5:3.4:1.7,dashed:!v,opacity:h===t?r:1})}}),a.push({id:"measurement-cursor",kind:"point",from:o,color:Os(t?en[e[t-1].axis]:"#8b9198",en[s.axis],r),radius:3.5,opacity:1}),a}function dc(i){let e=i.context,t=tc(e),n=zn(e.data,e.meta,e.entry.frame).reference,r=kn(n),s=n.y,o=yt(ue(ue(n.z,oe(n.x,.7)),oe(s,.4)),s),a=o;for(let X of[t.referenceHips,t.selectedHips,...t.components])Ot(st(X.to,X.from))>1e-9&&(a=Vn(a,X,s,{maxAlignment:.85,targetAlignment:.75}));let c=zi(n,r),l=(X,I,Q)=>Hn(X,I,Q,s,n.z),u=Object.fromEntries(t.components.map(X=>[X.key,X.value])),h=t.components.map(X=>X.key),p=(X,I=1500,Q=500,W={})=>({id:X,title:X.replaceAll("-"," "),duration:I+Q,motionDuration:I,...W}),f=[...Bn(),p("reference-focus",1100),...c.segments,p("reference-root",2200),p("scale-camera",1600),p("scale-highlight",1300),p("scale-duplicate",1400),p("scale-align",2400),p("scale-mean",2200),p("unit-align",1800),p("unit-axes",1700),p("unit-fade",1e3),p("unit-ready",700),p("selected-focus",1400),p("root-camera",2e3),p("root-markers",1e3),p("displacement",1800),...h.flatMap(X=>[p(X+"-ready",600,800),p(X,2200,800)]),{id:"finish",title:"Review hip displacement",duration:8e3,completion:!0},p("reset",1200)],g=En(f,e.entry),x=X=>f.findIndex(I=>I.id===X),m=(X,I)=>f.indexOf(X)>=x(I),d=[...e.reference,...e.pose].map(e.source),v=eh(t.components.flatMap(X=>[X.from,X.to])),y=ue(t.referenceRoot,ue(oe(n.x,t.scale*2.1),oe(s,t.scale*.7))),_=ue(y,oe(s,-t.scale*.63)),w=ue(_,oe(n.x,t.scale)),E=ue(t.referenceRoot,oe(n.x,t.scale)),A=eh([...d,y,ue(y,oe(n.x,t.scale*Math.max(...t.bones.map(X=>X.length)))),ue(y,oe(s,-t.scale*1.5))]);function T(X=n.length,I=1,Q=1){let W=Ft({...n,origin:t.referenceRoot,length:X},I);W.widthScale=Q;for(let B of["x","y","z"])W[B].keepVisible=!0;return W}let b=(X,I,Q,W,B={})=>({id:X,from:I,to:Q,color:W,...B});function M(X,I=1){X.guides.push(b("reference-root",t.referenceRoot,null,"#8b9198",{kind:"point",radius:5,opacity:I}),b("selected-root",t.selectedRoot,null,"#168568",{kind:"point",radius:5,opacity:I}))}function C(X,I,Q){let W=m(I,"scale-mean")?1:I.id==="scale-align"?Q:0,B=I.id==="scale-mean"?Q:m(I,"unit-align")?1:0,H=I.id==="scale-highlight"?Q:I.id==="scale-duplicate"?1:I.id==="scale-align"?1-Q:0;if(X.boneHighlights=t.bones.map(k=>{let z=k.joints.includes("left_shoulder")&&k.joints.includes("right_shoulder")?"clavicle":k.joints.includes("left_hip")&&k.joints.includes("right_hip")?"root":null;return{pose:"reference",pairs:z?k.joints.map(te=>[z,te]):[k.joints],strength:H}}),m(I,"scale-duplicate")&&!m(I,"unit-align")&&t.bones.forEach((k,z)=>{let te=ue(y,oe(s,-z*t.scale*.14)),U=ue(te,oe(n.x,k.length*t.scale));X.boneGuides.push({id:"scale-"+z,from:zt(zt(k.from,te,W),_,B),to:zt(zt(k.to,U,W),w,B),opacity:(I.id==="scale-duplicate"?Q:1)*(1-B),jointTrim:1-W})}),B>0||m(I,"unit-align")){let k=I.id==="unit-align"?Q:m(I,"unit-axes")?1:0,z=I.id==="unit-fade"?1-Q:m(I,"unit-ready")?0:B,te=zt(_,t.referenceRoot,k),U=zt(w,E,k);X.boneGuides.push({id:"unit-bone",from:te,to:U,opacity:z}),X.guides.push(b("unit-label",U,null,"#657168",{kind:"point",radius:0,label:"1 unit",opacity:z}))}}function F(X,I,Q,W=1,B=0){let H=h.indexOf(I);X.active=I,X.values={sway:0,thrust:0,lift:0};let k=t.components[H],z=zt(k.from,k.to,Q);X.guides.push(b("displacement",z,t.selectedRoot,"#8b9198",{kind:"line",width:1.7,dashed:!0})),t.components.forEach((j,ee)=>{let xe=ee<H?1:ee===H?Q:0;X.values[j.key]=j.value*xe});let te=np(t.referenceRoot,t.components,H,Q,W),U=te.find(j=>j.id==="measurement-cursor");B>0&&(U.color=Os(en.y,"#168568",B)),X.guides.push(...te)}function V(X){let I=f.find(k=>X<k.end)??f.at(-1),Q=Pe(Fe((X-I.start)/Math.max(1e-9,I.motionDuration??I.duration))),W=Fe((X-I.start)/Math.max(1e-9,I.duration)),B={segment:I.id,title:I.title,progress:W,referencePose:.5,selectedPose:1,referenceAxes:null,torsoAxes:null,values:{sway:0,thrust:0,lift:0},active:null,focus:0,focusOrigin:t.referenceRoot,camera:l(r,r,1),guides:[],boneGuides:[],boneHighlights:[],sectors:[],jointHighlights:[],pairFocus:null,plane:null};if(ai(B,I,Q,u))return B;if(I.id==="reference-focus")return B.referencePose=.5-.22*Q,B.selectedPose=1-Q,B;if(c.sample(B,I,Q))return B;if(B.referencePose=.28,B.selectedPose=0,B.referenceAxes=T(),I.id==="reference-root")return B.referenceAxes=Ft({...n,origin:zt(n.origin,t.referenceRoot,Q)}),B;if(B.camera=l(r,o,I.id==="scale-camera"?Q:1),B.pairFocus={points:A,amount:I.id==="scale-camera"?Q:1},I.id==="scale-camera")return B;if(!m(I,"selected-focus")){C(B,I,Q);let k=I.id==="unit-axes"?Q:m(I,"unit-fade")?1:0;return B.referenceAxes=T(n.length+(t.scale-n.length)*k),B}if(B.referenceAxes=T(t.scale),B.selectedPose=I.id==="selected-focus"?.35*Q:.35,I.id==="selected-focus")return B;let H=I.id==="root-camera"?Q:1;if(B.camera=l(o,a,H),B.pairFocus={points:A.map((k,z)=>zt(k,v[z],H)),amount:1},B.referencePose=.28-.18*H,B.selectedPose=.35-.23*H,B.referenceAxes=T(t.scale,1-.75*H,1-.4*H),I.id==="root-camera"||(M(B,I.id==="root-markers"?Q:1),I.id==="root-markers"))return B;if(I.id==="displacement")return B.guides.push(b("displacement",t.referenceRoot,zt(t.referenceRoot,t.selectedRoot,Q),"#8b9198",{kind:"line",width:1.7,dashed:!0})),B;for(let k of h)if(I.id===k+"-ready"||I.id===k){let z=I.id===k?1:Q,te=k==="lift"&&I.id===k?Pe(Fe((X-I.start-I.motionDuration)/(I.duration-I.motionDuration))):0;return F(B,k,I.id===k?Q:0,z,te),B}if(F(B,"lift",1,1,1),I.id==="finish"){let k=mn(W,I.duration);if(k.holding)return B;let z=k.progress;if(B.camera=l(a,a,1),B.pairFocus={points:v,amount:1},B.guides=B.guides.filter(te=>!h.includes(te.id)&&!te.id.startsWith("axis-measure-")&&!te.id.startsWith("axis-connector-")&&te.id!=="measurement-cursor"&&te.id!=="displacement"),z<.22)B.values={sway:0,thrust:0,lift:0},B.guides=B.guides.map(te=>te.id==="displacement"?{...te,opacity:.25*(1-z/.22)}:te);else{let te=(z-.22)/.78*3,U=Math.min(2,Math.floor(te)),j=Pe(Fe((te-U-.24)/.76)),ee=te-U,xe=Pe(Fe(ee/.18));F(B,h[U],j,xe,U===2?Pe(Fe((ee-.9)/.1)):0)}}return I.id==="reset"&&(B.guides=B.guides.map(k=>({...k,opacity:(k.opacity??1)*(1-Q)})),B.referenceAxes.opacity*=1-Q,B.pairFocus={points:v,amount:1-Q},B.camera=l(a,r,Q),B.referencePose=.1*(1-Q),B.selectedPose=.12+.88*Q),B}function Y(X){let I=V(X);return I.camera=ci(I.camera,s),I}return oi({segments:f,duration:g,values:u,geometry:t,frames:{reference:n,torso:{...n,origin:t.referenceRoot}},sample:Y},e.entry)}var ip={torso_turn_bend_tilt:Po,torso_turn_bend_tilt_by_shoulder:Po,hip_turn_on_spine_plane:Io,shoulder_turn_on_spine_plane:Io,shoulder_turn_tilt:Lo,hip_turn_tilt:Lo,spine_bend_tilt:uc,spine_azimuth_polar_spin:hc,hip_sway_thrust_lift:dc};function rp(i,e,t){let n=new Map;return{sample(r,s){if(!s.length)return[];let o=n.get(r);if(!o){let a=Ns(i,e,{type:t.type,subtype:t.subtype,frame:r}),c=ip[t.subtype];if(!c)throw new Error("Unsupported video metric");o=c(a),n.set(r,o),n.size>24&&n.delete(n.keys().next().value)}return s.map(a=>{let c=o.segments.find(u=>u.id===a);if(!c)throw new Error("Unknown measurement");let l=o.sample(c.start+(c.motionDuration??c.duration));if(t.subtype==="hip_sway_thrust_lift"){let u=o.segments.find(h=>h.id==="lift");l=o.sample(u.start+(u.motionDuration??u.duration)),l={...l,active:a,guides:l.guides.filter(h=>h.id==="axis-measure-"+a||h.id==="reference-root"||h.id==="selected-root")}}["torso_turn_bend_tilt","torso_turn_bend_tilt_by_shoulder"].includes(t.subtype)&&(l.originalReferenceAxes=o.sample(c.start).referenceAxes);for(let[u,h]of Object.entries(o.targetAxisColors??{}))l.torsoAxes?.[u]&&(l.torsoAxes[u].colorAxis=h);return{key:a,state:l}})}}}function Do(i,e,t,n,r){let s=e.clone().sub(i),o=s.length();if(o<1e-7)return null;let a=w=>-w.clone().applyMatrix4(t.matrixWorldInverse).z,c=a(i),l=a(e),u=l-c,h=t.near*1.0001,p=t.far*.9999,f=0,g=1;if(Math.abs(u)<1e-12){if(c<h||c>p)return null}else{let w=(h-c)/u,E=(p-c)/u;if(f=Math.max(0,Math.min(w,E)),g=Math.min(1,Math.max(w,E)),f>=g)return null}let x=i.clone().lerp(e,f).project(t),m=i.clone().lerp(e,g).project(t),d=t.getWorldDirection(new D),v=s.multiplyScalar(1/o).dot(d),y=Math.acos(Math.min(1,Math.abs(v)))*180/Math.PI,_=Pe(Fe((18-y)/12));return{x:(x.x+1)*n/2,y:(1-x.y)*r/2,tx:(m.x+1)*n/2,ty:(1-m.y)*r/2,markerOpacity:_,arrowOpacity:1-_,toward:v<0}}function fc(i,e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"g");n.classList.add("explain-end-on-marker");let r=document.createElementNS(t,"circle"),s=document.createElementNS(t,"path"),o=document.createElementNS(t,"title");return r.setAttribute("r","3.5"),r.setAttribute("fill",e),s.setAttribute("fill","none"),s.setAttribute("stroke",e),s.setAttribute("stroke-width","2.5"),s.setAttribute("stroke-linecap","round"),n.append(o,r,s),i.append(n),{setColor(a){r.setAttribute("fill",a),s.setAttribute("stroke",a)},update(a,c=11,l=3.5){if(n.style.display=a&&a.markerOpacity>0?"":"none",!a)return;n.style.opacity=a.markerOpacity,n.setAttribute("transform",`translate(${a.tx} ${a.ty})`),n.dataset.direction=a.toward?"toward":"away",r.setAttribute("r",l);let u=c*.4;s.setAttribute("d",`M${-u} ${-u} L${u} ${u} M${-u} ${u} L${u} ${-u}`),r.style.display=a.toward?"":"none",s.style.display=a.toward?"none":"",o.textContent=a.toward?"Arrow points toward you":"Arrow points away from you"}}}function sp(i,e,t,n,r,s=r){let o=Math.hypot(e.x-i.x,e.y-i.y),a=Math.hypot(n.x-t.x,n.y-t.y);if(o<1e-7||a<1e-7)return null;let c=(e.x-i.x)/o,l=(e.y-i.y)/o,u=Math.min(r/2,o/2),h=-(n.y-t.y)/a,p=(n.x-t.x)/a;(i.x-t.x)*h+(i.y-t.y)*p<0&&(h=-h,p=-p);let f=d=>(d.x-t.x)*h+(d.y-t.y)*p-s/2,g=(d,v)=>({x:i.x+c*d-l*v,y:i.y+l*d+c*v}),x=[g(o,-u),g(o,u)];for(let d=0;d<=24;d++){let v=Math.PI/2+d*Math.PI/24;x.push(g(u+u*Math.cos(v),u*Math.sin(v)))}let m=[];for(let d=0;d<x.length;d++){let v=x[d],y=x[(d+1)%x.length],_=f(v),w=f(y);if(_>=0&&m.push(v),_>=0!=w>=0){let E=_/(_-w);m.push({x:v.x+(y.x-v.x)*E,y:v.y+(y.y-v.y)*E})}}return m.length>=3?m.map((d,v)=>`${v?"L":"M"}${d.x} ${d.y}`).join(" ")+" Z":null}function op(i,e,t,n,r=1){let s=e.x-i.x,o=e.y-i.y,a=Math.hypot(s,o);if(a<1e-7)return null;let c=((t.x-i.x)*s+(t.y-i.y)*o)/a,l=Math.abs((t.x-i.x)*o-(t.y-i.y)*s)/a;if(c<0||c>a||l>n)return null;let u=Math.min(1,a/(n*9))*(1-r)+r,h=n*u,p=h*3*(1-r),f=h*(1.35*(1-r)+.5*r);return p>0&&c>a-p?2*f*(a-c)/p:h}function pc(i,e,t,n,r){let s=Math.hypot(t-i,n-e);if(s<1e-7)return null;let o=(t-i)/s,a=(n-e)/s,c=Math.min(r/2,s/2),l=(u,h)=>`${i+o*u-a*h} ${e+a*u+o*h}`;return`M${l(c,-c)} L${l(s-c,-c)} A${c} ${c} 0 0 1 ${l(s-c,c)} L${l(c,c)} A${c} ${c} 0 0 1 ${l(c,-c)} Z`}function Uo(i,e,t,n,r,s=0){let o=t-i,a=n-e,c=Math.hypot(o,a);if(c<1e-7||c<4&&s<1)return null;let l=o/c,u=a/c,h=Math.max(0,Math.min(1,s)),p=Math.min(1,c/(r*9))*(1-h)+h,f=r*p,g=f*3*(1-h),x=f*(1.35*(1-h)+.5*h),m=(d,v)=>`${i+l*d-u*v} ${e+u*d+l*v}`;return`M${m(0,-f/2)} L${m(c-g,-f/2)} L${m(c-g,-x)} L${m(c,0)} L${m(c-g,x)} L${m(c-g,f/2)} L${m(0,f/2)} Z`}function ap(i){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.classList.add("explain-flat-axes"),t.setAttribute("aria-hidden","true"),i.parentElement.append(t);let n=[];return{add(r,s=2.4){let o=document.createElementNS(e,"path");o.setAttribute("fill",r),o.setAttribute("stroke","none"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("paint-order","stroke"),t.append(o);let a=fc(t,r),c={visible:!0,from:null,to:null,path:o,marker:a,width:s,setEndpoints(l,u){this.from=l.clone(),this.to=u.clone()}};return n.push(c),c},updateView(r,s,o){t.setAttribute("viewBox",`0 0 ${s} ${o}`),t.style.width=s+"px",t.style.height=o+"px";for(let a of n){let c=a.visible&&a.from&&a.to?Do(a.from,a.to,r,s,o):null,l=c?Uo(c.x,c.y,c.tx,c.ty,a.width):null;a.path.style.display=l?"":"none",l&&a.path.setAttribute("d",l),a.path.style.opacity=c?.arrowOpacity??0,a.marker.update(c)}},clear(){n=[],t.replaceChildren()},dispose(){t.remove()}}}function nr(i,e,t,n,r={}){let s="http://www.w3.org/2000/svg",o=document.createElementNS(s,"svg");o.classList.add("explain-flat-axes"),o.setAttribute("aria-hidden","true"),n.parentElement.append(o);let a,c=qr(i,e),l=qr(i,e),u=wr(i,e),h=document.createElementNS(s,"text");h.setAttribute("fill",ic),h.setAttribute("font-size","11"),h.setAttribute("font-family","system-ui"),h.setAttribute("stroke","#f4f7f0"),h.setAttribute("stroke-width","3"),h.setAttribute("paint-order","stroke"),o.append(h);let p=Object.fromEntries(Object.entries(en).map(([d,v])=>{let y=en[r[d]]??v,_=document.createElementNS(s,"g"),w=document.createElementNS(s,"path"),E=document.createElementNS(s,"text");w.setAttribute("stroke","none"),w.setAttribute("fill",y),w.setAttribute("stroke-linejoin","round"),w.setAttribute("paint-order","stroke"),E.setAttribute("fill",y),E.setAttribute("font-size","14"),E.setAttribute("font-weight","600"),E.textContent=d.toUpperCase(),_.append(w);let A=fc(_,y);return _.append(E),o.append(_),[d,{group:_,line:w,marker:A,label:E}]})),f=new Mt;f.setAttribute("position",new rt(new Float32Array(12),3)),f.setIndex([0,1,2,0,2,3]);let g=new it(f,new $t({color:en.z,transparent:!0,opacity:.13,depthWrite:!1,side:Vt}));g.renderOrder=17,i.add(g);function x(d){a=d;for(let[v,{line:y,marker:_,label:w}]of Object.entries(p)){let E=a?.[v]?.color??en[a?.[v]?.colorAxis??r[v]??v];y.setAttribute("fill",E),w.setAttribute("fill",E),_.setColor(E)}if(u.update(a?.componentPlane),c.update(a?.angleMarker),l.update(a?.projectionSweep),g.visible=!!a&&a.plane>0&&a.planeOpacity>0,g.visible){let{origin:v,x:y,y:_,length:w}=a.frame,E=w*a.plane;[v,ue(v,oe(y,E)),ue(ue(v,oe(y,E)),oe(_,E)),ue(v,oe(_,E))].forEach((T,b)=>{let M=e(T);f.attributes.position.setXYZ(b,M.x,M.y,M.z)}),f.attributes.position.needsUpdate=!0,f.computeBoundingSphere(),g.material.opacity=.17*a.planeOpacity*a.opacity}}function m(d,v,y){if(o.style.width=v+"px",o.style.height=y+"px",o.setAttribute("viewBox",`0 0 ${v} ${y}`),o.style.opacity=a?.opacity??0,o.style.zIndex="3",h.style.display=a?.angleMarker?"":"none",h.style.opacity=a?.angleMarker?.opacity??1,a?.angleMarker){let _=a.angleMarker,w=e(ue(_.origin,oe(ue(_.from,_.to??a.frame.x),_.radius*.7))).project(d);h.setAttribute("x",(w.x+1)*v/2+4),h.setAttribute("y",(1-w.y)*y/2-4),h.textContent=(Math.abs(_.angle-90)<.05?"90":_.angle.toFixed(1))+"\xB0"}for(let[_,{group:w,line:E,marker:A,label:T}]of Object.entries(p)){let b=t*(a?.widthScale??1),M=a?.[_];if(w.style.display=M?"":"none",!M)continue;w.style.opacity=M.opacity??1;let C=Do(e(M.from),e(M.to),d,v,y);if(!C){w.style.display="none";continue}let{x:F,y:V,tx:Y,ty:X,arrowOpacity:I,markerOpacity:Q}=C,W=M.shape==="bar"?1:M.shapeBlend??0,B=W===1,H,k=M.stopAt&&a[M.stopAt];if(B&&k){let U=Do(e(k.from),e(k.to),d,v,y);if(U){let j={x:U.x,y:U.y},ee={x:U.tx,y:U.ty},xe=op(j,ee,{x:Y,y:X},b,k.shape==="bar"?1:k.shapeBlend??0);xe!==null&&(H=sp({x:F,y:V},{x:Y,y:X},j,ee,b,xe))}}let z=H!==void 0?H:W===1?pc(F,V,Y,X,b):Uo(F,V,Y,X,b,W),te=M.color??en[M.colorAxis??r[_]??_];E.setAttribute("fill",te),E.setAttribute("stroke","none"),z&&E.setAttribute("d",z),E.style.display=z?"":"none",E.style.opacity=B||M.keepVisible?1:I,A.update(B||M.keepVisible?null:C,b>=4?15:10),T.style.display=Q>0&&!B&&!M.keepVisible?"":"none",T.style.opacity=Q,T.setAttribute("x",Y+20),T.setAttribute("y",X-15)}}return{update:x,updateView:m,dispose(){u.dispose(),c.dispose(),l.dispose(),o.remove(),f.dispose(),g.material.dispose(),i.remove(g)}}}function mc(i,e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.classList.add("explain-flat-axes"),n.setAttribute("aria-hidden","true"),e.parentElement.append(n);let r=new Map,s=[];function o(a){if(r.has(a))return r.get(a);let c=document.createElementNS(t,"g"),l=document.createElementNS(t,"path"),u=document.createElementNS(t,"circle"),h=document.createElementNS(t,"text");h.setAttribute("font-size","11"),h.setAttribute("font-family","system-ui"),h.setAttribute("paint-order","stroke"),h.setAttribute("stroke","#f4f7f0"),h.setAttribute("stroke-width","3"),c.append(l,u,h),n.append(c);let p={group:c,path:l,point:u,label:h};return r.set(a,p),p}return{update(a=[]){s=a},updateView(a,c,l){n.setAttribute("viewBox",`0 0 ${c} ${l}`),n.style.width=c+"px",n.style.height=l+"px";for(let{group:h}of r.values())h.style.display="none";let u=h=>{let p=i(h).project(a);return p.z>=-1&&p.z<=1?{x:(p.x+1)*c/2,y:(1-p.y)*l/2}:null};for(let h of s){let p=u(h.from);if(!p)continue;let f=h.to?u(h.to):p;if(!f)continue;let{group:g,path:x,point:m,label:d}=o(h.id),v=h.width??2.7,y=h.color??"#507867";g.style.display="",g.style.opacity=h.opacity??1,m.style.display=h.kind==="point"?"":"none",x.style.display=h.kind==="point"?"none":"",m.setAttribute("cx",p.x),m.setAttribute("cy",p.y),m.setAttribute("r",h.radius??4),m.setAttribute("fill",y),x.setAttribute("fill",h.kind==="line"||h.kind==="ruler"?"none":y),x.setAttribute("stroke",h.kind==="line"||h.kind==="ruler"?y:"none"),x.setAttribute("stroke-width",v),x.setAttribute("stroke-linecap","round"),x.setAttribute("stroke-dasharray",h.dashed?"5 4":"none");let _=h.kind==="bar"?pc(p.x,p.y,f.x,f.y,v):Uo(p.x,p.y,f.x,f.y,v,h.shapeBlend??0);if((h.kind==="line"||h.kind==="ruler")&&(_=`M${p.x} ${p.y} L${f.x} ${f.y}`,h.kind==="ruler")){let w=Math.hypot(f.x-p.x,f.y-p.y);if(w>1e-7){let E=-(f.y-p.y)/w*5,A=(f.x-p.x)/w*5;_+=` M${p.x-E} ${p.y-A} L${p.x+E} ${p.y+A} M${f.x-E} ${f.y-A} L${f.x+E} ${f.y+A}`}}x.style.display=_&&h.kind!=="point"?"":"none",_&&x.setAttribute("d",_),d.style.display=h.label?"":"none",d.textContent=h.label??"",d.setAttribute("x",f.x+8),d.setAttribute("y",f.y-8),d.setAttribute("fill",y)}},dispose(){n.remove(),r.clear()}}}function zs({scene:i,toWorld:e,canvas:t,data:n,metrics:r,setPoses:s,requestRender:o=()=>{},axisWidthScale:a=1,prepareState:c=l=>l}){let l,u=[],h=0,p,f,g=new Map,x=new Map,m=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,d=(b,M)=>b&&{...b,opacity:(b.opacity??1)*M},v=(b,M)=>b&&{...d(b,M),planeOpacity:b.planeOpacity??0,componentPlane:d(b.componentPlane,M),angleMarker:d(b.angleMarker,M),projectionSweep:d(b.projectionSweep,M)};function y(){if(!f)return;let b=m()?1:Math.min(1,(performance.now()-f.start)/280),M=b*b*(3-2*b);for(let[C,F]of f.from)x.set(C,F+((u.includes(C)?1:0)-F)*M);b===1&&(f=void 0)}function _(){y(),A(),o(),p=f?requestAnimationFrame(_):void 0}let w=()=>{for(let b of g.values())b.dispose();g.clear()};function E(b){if(g.has(b))return g.get(b);let M=nr(i,e,2.7*a,t),C=nr(i,e,2.7*a,t),F=nr(i,e,4.5*a,t),V=wr(i,e),Y=rc(i,e),X=mc(e,t),I={update(Q){M.update(Q.originalReferenceAxes),C.update(Q.referenceAxes),F.update(Q.torsoAxes),V.update(Q.plane),Y.update(Q.sectors),X.update(Q.guides)},updateView(Q,W,B){M.updateView(Q,W,B),C.updateView(Q,W,B),F.updateView(Q,W,B),X.updateView(Q,W,B)},dispose(){M.dispose(),C.dispose(),F.dispose(),V.dispose(),Y.dispose(),X.dispose()}};return g.set(b,I),I}function A(){T();let b=[...x].filter(([,M])=>M>0);if(!l||!b.length){s(0,1);return}try{for(let{key:M,state:C}of $f(l.sample(h,b.map(([F])=>F)),F=>x.get(F))){let F=c(C),V=x.get(M);E(M).update({...F,originalReferenceAxes:v(F.originalReferenceAxes,V),referenceAxes:v(F.referenceAxes,V),torsoAxes:v(F.torsoAxes,V),plane:d(F.plane,V),sectors:F.sectors?.map(Y=>d(Y,V)),guides:F.guides?.map(Y=>d(Y,V))})}s(0,1-.65*Math.max(...b.map(([,M])=>M)))}catch(M){w(),s(0,1),console.warn("Measurement overlay unavailable for frame",h,M)}}function T(){for(let[b,M]of g)!u.includes(b)&&!(x.get(b)>0)&&(M.dispose(),g.delete(b))}return{setMetric(b,M){cancelAnimationFrame(p),f=void 0,x.clear(),M.forEach(C=>x.set(C,1)),w(),l=rp(n,r,b),u=[...M],A()},setSelection(b){y(),u=[...b],u.forEach(M=>{x.has(M)||x.set(M,0)}),f={start:performance.now(),from:new Map(x)},cancelAnimationFrame(p),_()},setFrame(b){h=b,A()},updateView(b,M,C){for(let F of g.values())F.updateView(b,M,C)},dispose(){cancelAnimationFrame(p),w(),s(0,1)}}}function qv(i){let e=i.joints.indexOf("left_shoulder"),t=i.joints.indexOf("right_shoulder"),n=i.reconstruction.flatMap(r=>{let s=r[e],o=r[t];if(![s,o].every(c=>Array.isArray(c)&&c.length===3&&c.every(Number.isFinite)))return[];let a=Math.hypot(...s.map((c,l)=>c-o[l]));return a>0?[a]:[]});if(!n.length)throw new Error("Missing shoulder width for rotation radius");return n.reduce((r,s)=>r+s,0)/n.length*1.95}function Yv(i,e,t){let{color:n,shape:r}=t,s=c=>c?.map((l,u)=>l*(u===1?t.verticalScale??1:t.horizontalScale??1)),o=c=>c&&{...c,u:s(c.u),v:s(c.v),size:e,color:n,shape:r,opacity:1,fillOpacity:.12},a=c=>{if(!c)return c;let{x:l,y:u,z:h,angleMarker:p,projectionSweep:f,...g}=c;return{...g,opacity:1,componentPlane:o(c.componentPlane)}};return{...i,referenceAxes:a(i.referenceAxes),torsoAxes:a(i.torsoAxes),originalReferenceAxes:a(i.originalReferenceAxes),plane:t.planeKeys.includes(i.active)?o(i.plane):null,guides:[],sectors:i.sectors?.map(c=>({...c,radius:e*(t.verticalScale??1),color:n,opacity:1,fillOpacity:.38,outline:!0}))}}function cp(i){let e=i.feature??"geometric-rotations",t=$s[e];if(!t)throw new Error(`Unknown measurement feature: ${e}`);let n="http://www.w3.org/2000/svg",r=document.createElementNS(n,"svg");r.classList.add("rotation-angle-labels"),r.setAttribute("aria-hidden","true"),i.canvas.parentElement.append(r);let s=new Map,o=qv(i.data),a=t.xfactor?Wf(i.data,i.metrics):null,c=Yf({canvas:i.canvas,metrics:i.metrics,frameCount:i.data.reconstruction.length,feature:e,xFactorValues:a?.frames.map(f=>f?.angle??null)}),l=(f,g,x)=>{let m=document.createElementNS(n,"g"),d=document.createElementNS(n,"path"),v=document.createElementNS(n,"circle"),y=document.createElementNS(n,"rect"),_=document.createElementNS(n,"text"),w=document.createElementNS(n,"text"),E=document.createElementNS(n,"text");d.setAttribute("fill","none"),d.setAttribute("stroke-linejoin","round"),v.setAttribute("r","2.2"),v.setAttribute("fill",x),d.setAttribute("stroke",x),d.setAttribute("stroke-opacity",".6"),d.setAttribute("stroke-width","1"),y.setAttribute("fill",x),y.setAttribute("fill-opacity",".13"),y.setAttribute("stroke",x),y.setAttribute("stroke-width",".7"),y.setAttribute("rx","4"),y.setAttribute("width","154"),y.setAttribute("height","44"),_.setAttribute("fill",x),_.setAttribute("font-size","11"),_.setAttribute("font-family","system-ui"),_.setAttribute("x","7"),_.setAttribute("y","15.5");for(let T of[w,E])T.setAttribute("fill",x),T.setAttribute("font-family","system-ui"),T.setAttribute("x","7");w.setAttribute("font-size","10"),w.setAttribute("y","28"),E.setAttribute("font-size","15"),E.setAttribute("font-weight","600"),E.setAttribute("y","34"),m.append(y,_,w,E),r.append(d,v,m);let A={group:m,line:d,dot:v,box:y,text:_,kind:w,value:E,title:g};return s.set(f,A),A},u=t.combined?[]:t.groups.map(f=>{for(let x of f.keys)l(`${f.id}:${x}`,f.labels[x],f.color);let g=zs({...i,setPoses:()=>{},axisWidthScale:1.4,prepareState:x=>{let m=Yv(x,o,f),d=s.get(`${f.id}:${x.active}`);return d&&(d.sector=m.sectors?.[0]),m}});return g.setMetric({type:f.type,subtype:f.subtype},f.keys),g});if(t.combined){for(let f of t.groups)l(`${f.id}:${f.id}`,f.label,f.color);u.push(Nf(i,t.groups,s))}let h,p;return a&&(p=l("xfactor","X-factor",bn.xfactor),h=Xf(i,a,o),p.sector=h.setFrame(0)),{setFrame(f){u.forEach(g=>g.setFrame(f)),h&&(p.sector=h.setFrame(f)),c.setFrame(f)},updateView(f,g,x){u.forEach(C=>C.updateView(f,g,x)),r.setAttribute("viewBox",`0 0 ${g} ${x}`);let m=[...s.keys()],v=i.canvas.parentElement.querySelector(".snapshot-bottom-strip")?.offsetTop??x,y=8,_=3,w=Math.max(20,Math.min(42,(v-y-6-_*(m.length-1))/m.length)),E=Math.max(8,Math.min(10,w*.27)),A=Math.max(10,Math.min(15,w*.4)),T=document.createElement("canvas").getContext("2d");T.font=`${E}px system-ui`;let b=Math.max(...[...s.values()].map(C=>T.measureText(g<260&&C.title.length>16?C.title.replace("Shoulder","Sh.").replace("Spine","Sp."):C.title).width));T.font=`600 ${A}px system-ui`;let M=Math.ceil(Math.max(b,T.measureText("-180.0\xB0").width)+16);for(let[C,F]of s){let V=F.sector;if(!V&&!F.anchor){F.group.style.display=F.line.style.display=F.dot.style.display="none";continue}let Y=V?oe(gt(V.from,V.normal,V.angle*.5),V.radius*.96):[0,0,0],X=i.toWorld(F.anchor??ue(V.origin,Y)),I=X.clone().project(f),Q=X.clone().applyMatrix4(f.matrixWorldInverse).z<0&&I.z>=-1&&I.z<=1&&Math.abs(I.x)<1.15&&Math.abs(I.y)<1.15;if(F.group.style.display=F.line.style.display=F.dot.style.display=Q?"":"none",!Q)continue;let W=(I.x+1)*g/2,B=(1-I.y)*x/2,H=Math.max(5,g-M-8),k=y+m.indexOf(C)*(w+_);F.group.setAttribute("transform",`translate(${H},${k})`),F.box.setAttribute("width",M),F.box.setAttribute("height",w),F.text.setAttribute("font-size",E),F.text.setAttribute("y",w*.36),F.value.setAttribute("y",w*.81);let[z,te]=F.title.split(" ");F.text.textContent=g<260&&F.title.length>16?F.title.replace("Shoulder","Sh.").replace("Spine","Sp."):F.title,F.kind.textContent="",F.value.setAttribute("font-size",A),F.value.textContent=V?`${V.angle.toFixed(1)}\xB0`:`${F.measurement.toFixed(3)} units`,H=Math.max(5,g-M-8),F.box.setAttribute("width",M),F.group.setAttribute("transform",`translate(${H},${k})`),F.group.setAttribute("aria-label",`${F.title}: ${F.value.textContent}`),F.line.setAttribute("d",`M ${W} ${B} V ${k+w/2} H ${H}`),F.dot.setAttribute("cx",W),F.dot.setAttribute("cy",B)}},dispose(){u.forEach(f=>f.dispose()),r.remove(),c.dispose(),h?.dispose()}}}var gc=(i,e)=>i.map((t,n)=>t+e[n]),Fo=(i,e)=>i.map((t,n)=>t-e[n]),Bs=(i,e)=>i.map(t=>t*e),nh=(i,e)=>i.reduce((t,n,r)=>t+n*e[r],0),lp=i=>{let e=Math.hypot(...i);if(e<1e-8)throw new Error("Degenerate Hogan plane reference");return Bs(i,1/e)};function up({head:i,leftAnkle:e,rightAnkle:t,shoulder:n,hip:r,trajectory:s,margin:o=.08}){let a=lp([t[0]-e[0],0,t[2]-e[2]]),c=[n,r],l=c.map(v=>{let y=Fo(v,i),_=lp(Fo(y,Bs(a,nh(y,a))));if(_[1]<=0)throw new Error("Hogan plane must rise above the club head");return _}),u=[i,...c,...s],h=u.map(v=>nh(Fo(v,i),a)),p=Math.min(...h)-o,f=Math.max(...h)+o,g=Math.max(f-p,...l.map(v=>Math.max(...u.map(y=>nh(Fo(y,i),v)))+o)),x=(p+f-g)/2,m=gc(i,Bs(a,x)),d=gc(m,Bs(a,g));return l.map((v,y)=>({name:y?"Hip plane":"Shoulder plane",side:g,along:a,rise:v,corners:[m,d,gc(d,Bs(v,g)),gc(m,Bs(v,g))]}))}function hp(i,e,t){let n=i.flatMap(r=>{let s=r[e],o=r[t];if(![s,o].every(c=>Array.isArray(c)&&c.length===3&&c.every(Number.isFinite)))return[];let a=Math.hypot(...Fo(s,o));return a>0?[a]:[]});if(!n.length)throw new Error("No valid club shaft lengths");return n.reduce((r,s)=>r+s,0)/n.length}var $v="http://www.w3.org/2000/svg",ks=(i,e={})=>{let t=document.createElementNS($v,i);for(let[n,r]of Object.entries(e))t.setAttribute(n,String(r));return t};function jv(i,e,t){let n=Math.hypot(e.x-i.x,e.y-i.y);if(n<=2*t)return null;let r=t/n;return{start:r,end:1-r}}function Zv(i,e,t){return i*e/(t*(1-i)+i*e)}function dp(i,{names:e,edges:t}){let n=ks("svg",{"aria-hidden":"true","data-vector-pose":"true"});Object.assign(n.style,{position:"absolute",pointerEvents:"none",overflow:"hidden",zIndex:"1"}),getComputedStyle(i.parentElement).position==="static"&&(i.parentElement.style.position="relative"),i.after(n);let r=new Map,s=new $a,o=new D,a=(u,h,p,f)=>{let g=u.clone().applyMatrix4(h.matrixWorldInverse);if(g.z>=-h.near)return null;let x=u.clone().project(h);return!Number.isFinite(x.x)||!Number.isFinite(x.y)||x.z>1?null:{x:(x.x+1)*p/2,y:(1-x.y)*f/2,depth:-g.z,world:u}};function c(u){let h=r.get(u);if(h)return h;let p=ks("g",{"data-camera":u.view||String(r.size)}),f=ks("path",{fill:"none",stroke:u.overlayColor,"stroke-linecap":"round","vector-effect":"non-scaling-stroke"}),g=e.map(x=>{let m=ks("g",{"data-joint":x}),d=ks("circle",{fill:"none",stroke:u.overlayColor,"vector-effect":"non-scaling-stroke"}),v=ks("circle",{fill:x.startsWith("left_")?"#3b82f6":x.startsWith("right_")?"#ef4444":u.overlayColor});return m.append(d,v),{group:m,ring:d,dot:v}});return p.append(f,...g.map(x=>x.group)),n.append(p),h={group:p,path:f,joints:g},r.set(u,h),h}function l({camera:u,scene:h,overlays:p,frame:f,w:g,h:x}){n.setAttribute("viewBox",`0 0 ${g} ${x}`),n.setAttribute("width",g),n.setAttribute("height",x),n.style.left=`${i.offsetLeft}px`,n.style.top=`${i.offsetTop}px`,n.style.width=`${g}px`,n.style.height=`${x}px`,n.dataset.frame=String(f),h.updateMatrixWorld(!0),u.getWorldPosition(o);let m=[];h.traverseVisible(y=>{let _=Array.isArray(y.material)?y.material:[y.material];y.isMesh&&_.some(w=>w&&w.visible&&w.depthWrite&&!w.transparent)&&m.push(y)});let d=y=>{let _=y.clone().sub(o),w=_.length();return s.ray.set(o,_.multiplyScalar(1/w)),s.near=u.near,s.far=Math.max(0,w-Math.max(1e-4,w*1e-5)),s.intersectObjects(m,!1).length===0},v=[...p].sort((y,_)=>{let w=E=>E.group.localToWorld(new D(0,0,-E.depth)).applyMatrix4(u.matrixWorldInverse).z;return w(y)-w(_)});for(let y of v){let _=c(y);n.append(_.group);let w=y.group.localToWorld(new D(0,0,-y.depth)),E=y.group.localToWorld(new D(y.depth/y.K[0][0],0,-y.depth)),A=y.group.localToWorld(new D(0,y.depth/y.K[1][1],-y.depth)),T=w.clone().project(u),b=E.project(u),M=A.project(u),C=Math.max(1e-4,Math.hypot((b.x-T.x)*g/2,(b.y-T.y)*x/2),Math.hypot((M.x-T.x)*g/2,(M.y-T.y)*x/2)),F=Math.sqrt(C),V=Math.max(10,Math.min(36,16*F)),Y=V*.15,X=y.raw.pred[f],I=e.map((W,B)=>{let H=X?.[y.mapping[B]];if(!H||!Number.isFinite(H[0])||!Number.isFinite(H[1])||H.length>2&&H[2]<=0||H[0]===0&&H[1]===0)return null;let k=y.group.localToWorld(new D((H[0]-y.K[0][2])*y.depth/y.K[0][0],-(H[1]-y.K[1][2])*y.depth/y.K[1][1],-y.depth));return a(k,u,g,x)}),Q="";for(let[W,B]of t){let H=I[W],k=I[B];if(!H||!k)continue;let z=jv(H,k,V*.425);if(!z)continue;let te=Math.hypot(k.x-H.x,k.y-H.y)*(z.end-z.start),U=Math.max(1,Math.ceil(te/6)),j=!1;for(let ee=0;ee<U;ee++){let xe=z.start+(z.end-z.start)*ee/U,ie=z.start+(z.end-z.start)*(ee+1)/U,ne=(xe+ie)/2,Ee=Zv(ne,H.depth,k.depth);if(!d(H.world.clone().lerp(k.world,Ee))){j=!1;continue}let de=q=>H.x+(k.x-H.x)*q,O=q=>H.y+(k.y-H.y)*q;j||(Q+=`M${de(xe).toFixed(3)},${O(xe).toFixed(3)}`),Q+=`L${de(ie).toFixed(3)},${O(ie).toFixed(3)}`,j=!0}}_.path.setAttribute("d",Q),_.path.setAttribute("stroke-width",Y),I.forEach((W,B)=>{let H=_.joints[B],k=e[B]!=="golf_club_shaft"&&W&&d(W.world);if(H.group.style.display=k?"":"none",!!k){for(let z of[H.ring,H.dot])z.setAttribute("cx",W.x),z.setAttribute("cy",W.y);H.ring.setAttribute("r",V*.425),H.ring.setAttribute("stroke-width",V*.15),H.dot.setAttribute("r",V*.29)}})}}return{render:l,dispose(){n.remove(),r.clear()}}}function fp(i){let e=new Sn(i);return e.isVideoTexture=!0,e.minFilter=e.magFilter=$n,e.generateMipmaps=!1,e.colorSpace=xn,e.update=()=>{},e.commit=()=>{e.needsUpdate=!0},e}function Jv(i){let e=Math.max(1e-4,i);return Math.max(10,Math.min(36,16*Math.sqrt(e)))/e}function pp(i,{names:e,edges:t,getPose:n,makeCanvas:r=()=>document.createElement("canvas")}){let s=r(),o=s.getContext("2d"),a=r(),c=a.getContext("2d"),l,u=!1,h=1,p=new Cs(s);p.minFilter=p.magFilter=$n,p.generateMipmaps=!1,p.colorSpace=xn;let f=()=>{let g=a.width,x=a.height;if(!u)return;(s.width!==g||s.height!==x)&&(s.width=g,s.height=x),o.clearRect(0,0,g,x),o.drawImage(a,0,0,g,x);let m=n(l),d=Jv(h),v=d*.425,y=d*.15,_=w=>w&&Number.isFinite(w[0])&&Number.isFinite(w[1])&&!(w[0]===0&&w[1]===0)&&(w.length<3||w[2]>0);o.strokeStyle="#ffce69",o.lineWidth=y,o.lineCap="round",o.beginPath();for(let[w,E]of t){let A=m?.[w],T=m?.[E];if(!_(A)||!_(T))continue;let b=T[0]-A[0],M=T[1]-A[1],C=Math.hypot(b,M);C<=2*v||(o.moveTo(A[0]+b*v/C,A[1]+M*v/C),o.lineTo(T[0]-b*v/C,T[1]-M*v/C))}o.stroke(),e.forEach((w,E)=>{let A=m?.[E];w==="golf_club_shaft"||!_(A)||(o.beginPath(),o.arc(A[0],A[1],v,0,Math.PI*2),o.stroke(),o.fillStyle=w.startsWith("left_")?"#3b82f6":w.startsWith("right_")?"#ef4444":"#ffce69",o.beginPath(),o.arc(A[0],A[1],d*.29,0,Math.PI*2),o.fill())}),p.needsUpdate=!0};return p.commit=g=>{let x=i.videoWidth,m=i.videoHeight;!x||!m||((a.width!==x||a.height!==m)&&(a.width=x,a.height=m),c.clearRect(0,0,x,m),c.drawImage(i,0,0,x,m),l=g,u=!0,f())},p.setImageScale=g=>{!Number.isFinite(g)||g<=0||Math.abs(g-h)<1e-5||(h=g,f())},p}function mp(i,e,t){let n=Math.max(0,Math.min(1,t)),r=i.position.clone(),s=i.quaternion.clone(),o=i.fov,a=i.zoom,c=e.position.length(),l=r.length(),u=new D(0,1,0),h=new D,p=_=>new Jt().setFromRotationMatrix(new bt().lookAt(_,h,u)),f=p(e.position).invert().multiply(e.rotation),g=p(r).invert().multiply(s),x=new Jt().setFromUnitVectors(e.position.clone().normalize(),r.clone().normalize()),m=new Jt().slerp(x,n),d=On.lerp(c,l,n);i.position.copy(e.position).normalize().applyQuaternion(m).multiplyScalar(d),i.quaternion.copy(p(i.position)).multiply(f.slerp(g,n));let v=(_,w,E)=>_*Math.tan(On.degToRad(w/2))/E,y=On.lerp(v(c,e.fov,e.zoom),v(l,o,a),n);i.fov=On.lerp(e.fov,o,n),i.zoom=d*Math.tan(On.degToRad(i.fov/2))/y}var gp=[{type:"kinematic",subtype:"shoulder_turn_on_spine_plane",key:"turn"},{type:"kinematic",subtype:"hip_turn_on_spine_plane",key:"turn"}];function xp(i){let e=gp.map(({key:t,...n})=>{let r=zs({...i,setPoses:()=>{},axisWidthScale:1.4,prepareState:s=>{let o=c=>c&&{...c,opacity:1,fillOpacity:.65},a=c=>{if(!c)return c;let{x:l,y:u,z:h,...p}=c;return{...p,opacity:1,componentPlane:o(c.componentPlane)}};return{...s,referenceAxes:a(s.referenceAxes),torsoAxes:a(s.torsoAxes),originalReferenceAxes:a(s.originalReferenceAxes),plane:o(s.plane),sectors:s.sectors?.map(c=>({...c,opacity:1,fillOpacity:.85}))}}});return r.setMetric(n,[t]),r});return{setFrame(t){e.forEach(n=>n.setFrame(t))},updateView(t,n,r){e.forEach(s=>s.updateView(t,n,r))},dispose(){e.forEach(t=>t.dispose())}}}var yp=new WeakMap;function _p(i,e){yp.set(i,e)}function vp(i,{duration:e=200,fadeIncoming:t=!1}={}){let n=i.querySelector(":scope > .viewer-transition-cover");n?.remove();let r=i.getBoundingClientRect().height;if(!r||!i.children.length)return()=>{};let s=document.createElement("div");s.className="viewer-transition-cover";let a=matchMedia("(prefers-reduced-motion: reduce)").matches?0:e;s.style.transitionDuration=`${a}ms`,s.setAttribute("aria-hidden","true"),s.inert=!0;let c=n&&!n.classList.contains("is-finished")?n:i,l=c.getBoundingClientRect(),u=getComputedStyle(c),h=parseFloat(u.borderLeftWidth)||0,p=parseFloat(u.borderTopWidth)||0;for(let d of c.children){let v=d.cloneNode(!0),y=d.getBoundingClientRect();y.width&&y.height&&Object.assign(v.style,{position:"absolute",boxSizing:"border-box",left:`${y.left-l.left-h}px`,top:`${y.top-l.top-p}px`,width:`${y.width}px`,height:`${y.height}px`,margin:"0",right:"auto",bottom:"auto"}),s.append(v)}let f=c.querySelectorAll("canvas"),g=s.querySelectorAll("canvas");f.forEach((d,v)=>{yp.get(d)?.();let y=g[v];y.width=d.width,y.height=d.height,y.getContext("2d")?.drawImage(d,0,0)}),s.querySelectorAll("[id]").forEach(d=>d.removeAttribute("id")),i.style.minHeight=`${r}px`;let x=!1,m=[];return Object.assign(()=>{x&&requestAnimationFrame(()=>requestAnimationFrame(()=>{t&&(m=[...i.children].filter(d=>d!==s&&!d.classList.contains("viewer-transition-cover")&&!d.classList.contains("video-source-decoders")));for(let d of m)d.style.removeProperty("opacity"),d.animate([{opacity:0},{opacity:1}],{duration:a,easing:"ease"});s.classList.add("is-finished"),setTimeout(()=>{s.parentNode===i&&!i.querySelector(".viewer-transition-cover:not(.is-finished)")&&i.style.removeProperty("min-height"),s.remove()},a+20)}))},{mount(){t&&(m=[...i.children].filter(d=>!d.classList.contains("video-source-decoders")),m.forEach(d=>d.style.opacity="0")),i.append(s),x=!0}})}function bp(i,e=0,t=i.length-1){let n=[1/0,1/0,1/0],r=[-1/0,-1/0,-1/0],s=0;for(let o=e;o<=t;o++)for(let a of i[o]??[])if(!(!Array.isArray(a)||a.length!==3||!a.every(Number.isFinite))){s++;for(let c=0;c<3;c++)n[c]=Math.min(n[c],a[c]),r[c]=Math.max(r[c],a[c])}if(!s)throw new Error("No valid 3D points for rotation center");return n.map((o,a)=>(o+r[a])/2)}function Mp(i,e,t){let n=Math.max(e,t);i.shadow.intensity=Math.max(0,Math.min(1,n))}function wp(i=()=>{},e={request:t=>requestAnimationFrame(t),cancel:t=>cancelAnimationFrame(t),now:()=>performance.now(),reduced:()=>matchMedia("(prefers-reduced-motion: reduce)").matches}){let t=new Jt,n=new Jt,r=0,s=0,o=1,a=!1,c=!1,l,u,h=new D(0,1,0),p=new D(0,0,1),f=()=>1-Math.abs(n.dot(t))>1e-10;function g(){u!==void 0&&e.cancel(u),u=void 0,l=void 0}function x(m){g();let d=n.clone(),v=r,y=s,_=o,w=e.now();l=m?"reset":"resume";function E(A){let T=e.reduced()?1:Math.min(1,(A-w)/750),b=T*T*(3-2*T);n.copy(d).slerp(t,b),m&&(r=v*(1-b),s=y*(1-b),o=Math.exp(Math.log(_)*(1-b))),T===1?(u=void 0,l=void 0):u=e.request(E),i()}u=e.request(E)}return{get rotated(){return f()},get canRotate(){return!a||!c},get returning(){return!!l},get panX(){return r},get panY(){return s},get zoom(){return o},setPlayback(m,d){a=m,c=d,l==="resume"&&(!a||!c)&&g(),a&&c&&f()&&!l&&x(!1)},orient(m,d){return p.copy(m).applyQuaternion(n),h.copy(d).applyQuaternion(n),{direction:p.clone(),up:h.clone()}},orbitPoint(m,d){return m.clone().sub(d).applyQuaternion(n).add(d)},rotate(m,d){if(a&&c)return;g();let v=new Jt().setFromAxisAngle(new D(0,1,0),-m*.008),y=new D().crossVectors(h,p).normalize().applyQuaternion(v),_=new Jt().setFromAxisAngle(y,-d*.008);n.premultiply(v).premultiply(_).normalize(),i()},pan(m,d){r+=m,s+=d,i()},zoomBy(m){let d=o*m;Number.isFinite(d)&&d>0&&(r*=m,s*=m,o=d,i())},reset(){x(!0)},dispose:g}}function Sp(i){let e=document.createElement("div");e.className="explain-playback-feedback",e.setAttribute("aria-hidden","true");let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg"),r=document.createElementNS(t,"path");n.setAttribute("viewBox","0 0 32 32"),n.append(r),e.append(n),i.parentElement.append(e);let s;return{show(o){s?.cancel(),e.dataset.action=o?"play":"pause",r.setAttribute("d",o?"M11 7 L25 16 L11 25 Z":"M9 8 H14 V24 H9 Z M18 8 H23 V24 H18 Z");let a=matchMedia("(prefers-reduced-motion: reduce)").matches,c=l=>`translate(-50%,-50%) scale(${a?1:l})`;s=e.animate([{opacity:.95,transform:c(.85)},{opacity:.95,transform:c(1),offset:.2},{opacity:0,transform:c(1.4)}],{duration:a?250:650,easing:"ease-out"})},dispose(){s?.cancel(),e.remove()}}}function Ep(i,e,t=()=>{},n=()=>{},r=()=>!0){let s=new Map,o=!1,a=!1,c=()=>{let[d,v]=[...s.values()];return Math.hypot(d.x-v.x,d.y-v.y)},l=d=>{d.pointerType==="mouse"&&d.button!==0&&d.button!==2||(s.size||(o=!1,a=!1),s.set(d.pointerId,{x:d.clientX,y:d.clientY,startX:d.clientX,startY:d.clientY,button:d.button}),s.size>1&&(o=!0,a=!0),i.setPointerCapture(d.pointerId))},u=d=>{let v=s.get(d.pointerId);if(!v)return;let y=s.size===2?c():0;Math.hypot(d.clientX-v.startX,d.clientY-v.startY)>5&&(o=!0,a=!0);let _=d.clientX-v.x,w=d.clientY-v.y;v.x=d.clientX,v.y=d.clientY,o&&(s.size===2||v.button===2?t(_/(s.size===2?2:1),w/(s.size===2?2:1)):r()&&n(_,w)),s.size===2&&y>0&&e(c()/y)},h=d=>{o&&(a=!0),s.delete(d.pointerId)},m=[["contextmenu",d=>d.preventDefault()],["pointerdown",l],["pointermove",u],["pointerup",h],["pointercancel",d=>{a=!0,s.delete(d.pointerId)}],["lostpointercapture",h],["click",d=>{a&&(d.preventDefault(),d.stopImmediatePropagation())},!0],["wheel",d=>{d.preventDefault(),e(Math.exp(-d.deltaY*(d.ctrlKey?.01:.001)))},{passive:!1}]];return m.forEach(([d,v,y])=>i.addEventListener(d,v,y)),()=>m.forEach(([d,v,y])=>i.removeEventListener(d,v,y))}function xc(i,e,{feedback:t=Sp(i)}={}){let n=a=>{i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",a?"Pause explanation":"Play explanation"),i.setAttribute("aria-pressed",String(a)),i.dataset.playing=String(a)},r=()=>{e.setPlaying(!e.playing),t.show(e.playing)},s=a=>{(a.button===0||a.button===void 0)&&r()},o=a=>{(a.key===" "||a.key==="Enter")&&!a.repeat&&(a.preventDefault(),r())};return i.addEventListener("click",s),i.addEventListener("keydown",o),n(e.playing),{update:n,dispose(){i.removeEventListener("click",s),i.removeEventListener("keydown",o),t.dispose()}}}function Ap(i,e){let t=Math.sqrt(e*e-i*i),n=new D(0,1,0);function r(l){let u=l.clone();return u.side=Vt,u.forceSinglePass=!1,u}function s(l){return new it(new _i(1,1,1,24,1,!0),r(l))}function o(l,u,h){let p=h.clone().sub(u),f=p.length(),g=f-2*t;l.visible=g>1e-7,l.visible&&(l.position.copy(u).add(h).multiplyScalar(.5),l.quaternion.setFromUnitVectors(n,p.multiplyScalar(1/f)),l.scale.set(i,g,i))}function a(l){return new it(new si(e,24,16),r(l))}function c(l,u){l.position.copy(u)}return{bone:s,joint:a,placeBone:o,placeJoint:c,cut:t}}function Tp(i,e,t,n,r,s=1,o){let a=i.points.map(e),c=new D;a.forEach(h=>c.add(h)),c.multiplyScalar(1/a.length);let l=Math.max(.035,...a.map(h=>h.distanceTo(c))),u=(o?No(a,c,o.direction,o.up,o.verticalHalfFov,o.aspect,.78):l/(Math.sin(t)*.62))*(i.distanceScale??1);return{zoom:1+(s-1)*(1-i.amount),target:r.clone().lerp(c,i.amount),distance:n+((o?u:Math.min(n,u))-n)*i.amount}}function No(i,e,t,n,r,s,o=.84){let a=t.clone().normalize(),c=new D().crossVectors(n,a).normalize();c.lengthSq()<1e-12&&c.crossVectors(new D(0,0,1),a).normalize();let l=new D().crossVectors(a,c).normalize(),u=Math.tan(r)*o,h=u*s,p=.1;for(let f of i){let g=f.x-e.x,x=f.y-e.y,m=f.z-e.z,d=g*a.x+x*a.y+m*a.z;p=Math.max(p,d+Math.abs(g*c.x+x*c.y+m*c.z)/h,d+Math.abs(g*l.x+x*l.y+m*l.z)/u)}return p+.035}function Rp(i,e,t,n=e.sample(t)){let r=e.segments.find(l=>l.id==="intro"),s=e.segments.find(l=>l.id==="finish");if(t>=r.start&&t<s.start)return{restricted:!0,pivot:null};if(n.segment!=="finish"||i.type==="position")return{restricted:!1,pivot:null};let o=mn(n.progress,s.duration),a=i.transition===void 0&&(o.holding||o.progress<.22),c=i.subtype==="spine_azimuth_polar_spin"?n.torsoAxes?.y?.to:n.sectors?.[0]?.origin??n.torsoAxes?.frame?.origin??n.referenceAxes?.frame?.origin;return{restricted:a,pivot:c??null}}function It(i,e,t){let n=document.createElement(i);return e!==void 0&&(n.textContent=e),t&&(n.className=t),n}function Cp(i,e){let t=It("button",void 0,"explain-reset-view");t.type="button",t.setAttribute("aria-label","Reset view"),t.title="Reset view";let n="http://www.w3.org/2000/svg",r=document.createElementNS(n,"svg"),s=document.createElementNS(n,"path");return r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("aria-hidden","true"),s.setAttribute("d","M4 10a8 8 0 1 1 1 7M4 4v6h6"),r.append(s),t.append(r),t.onclick=o=>{o.stopPropagation(),e.reset()},i.parentElement.append(t),{dispose(){t.remove()}}}function Pp(i){let e=o=>i.segments.find(a=>a.id===o),t=e("result-preview"),n=e("intro"),r=e("finish"),s=e("end-stay");return[t&&{key:"start",label:"Start",start:t.start,end:t.end},n&&{key:"explain",label:"Explain",start:n.start,end:r?.start??i.duration},r&&{key:"review",label:"Review",start:r.start,end:s?.start??i.duration},s&&{key:"end",label:"End",start:s.start,end:s.end}].filter(o=>o&&o.end>o.start)}function Ip(i,e,t){let n=It("div",void 0,"explain-stage-timeline"),r=It("nav",void 0,"explain-stage-tags");r.setAttribute("aria-label","Explanation stages");let s=Pp(i),o=s.map(a=>{let c=It("button",a.label,"explain-stage-tag");return c.type="button",c.style.flexGrow=a.end-a.start,c.setAttribute("aria-label",`Jump to ${a.label.toLowerCase()} stage`),c.title=`${a.label} \xB7 ${(a.start/1e3).toFixed(1)}s`,c.onclick=()=>t(a.start),r.append(c),c});return n.append(e,r),{root:n,update(a){let c=s.findIndex(l=>a>=l.start&&a<l.end);o.forEach((l,u)=>{u===c?l.setAttribute("aria-current","step"):l.removeAttribute("aria-current")})}}}var Kv={"result-preview":"Preview the selected pose and its final measurements.",intro:"Bring in the reference pose to establish the comparison.","reference-focus":"Isolate the reference pose to build the fixed directions.","selected-focus":"Bring in the selected pose to measure its change.","measurement-camera":"Move closer so the measurement geometry is easier to see.","reference-root":"Move the reference axes to the reference hip center, the displacement origin.","scale-camera":"Frame the reference bones so their lengths can be compared.","scale-highlight":"Make the ten reference bones solid to show the lengths used for normalization.","scale-duplicate":"Copy the bone lengths so they can be compared together.","scale-align":"Line up the copied bones to compare their lengths.","scale-mean":"Average the bone lengths to define one normalized unit.","unit-align":"Move the unit bone beside the reference axis to compare lengths.","unit-axes":"Resize each reference axis to one normalized unit.","unit-fade":"Fade the sample bone; the axes now carry the unit length.","unit-ready":"Keep the unit axes at the reference hip center as the displacement origin.","root-camera":"Zoom into the roots and soften the axes to make small offsets visible.","root-markers":"Mark both hip centers to show the start and end of displacement.",displacement:"Connect the hip centers to show their total displacement.","target-root":"Move the torso axes to the hip center so both frames share a pivot.",compare:"Compare the two axis sets before aligning their origins and lengths.",align:"Match the origins and lengths so only orientation differs.","baseline-camera":"Face the projection plane so the direction change is visible.","baseline-angle":"Show how far the reference direction lies outside the spine plane.","baseline-project":"Project the reference direction onto the spine plane to isolate turn.","baseline-fade":"Keep only the projected reference direction for comparison.","projection-camera":"Face the projection plane so the direction change is visible.","projection-angle":"Show the direction\u2019s angle to the plane before projection.",projection:"Project onto the horizontal plane to separate turn from tilt.","original-fade":"Fade the original direction so the projected one stays clear.","lateral-camera":"Face the projection plane to compare the selected direction with it.","lateral-stretch-camera":"Adjust the view so the joint-to-joint arrow is easy to see.","lateral-angle":"Show the selected direction\u2019s angle to the spine plane before projection.","lateral-project":"Project the selected direction onto the spine plane to isolate turn.","lateral-fade":"Keep only the projected selected direction for the turn comparison.","rotation-camera":"Face the rotation plane so the turning angle is easy to see.","turn-camera":"Look toward up to see the turn across the horizontal plane.","bend-camera":"Move to the leaning side so forward bend is easier to see.","tilt-camera":"Move to the side to reveal tilt above or below the plane.","bend-plane":"Expand the sideways\u2013up plane to compare the spine\u2019s forward bend.","tilt-plane":"Expand the forward\u2013up plane to compare the spine\u2019s side tilt.","plane-switch":"Fade the bend comparison to prepare the side-tilt plane.","bend-reference-fade":"Show the spine\u2019s planar reference to establish the starting direction.","tilt-reference-fade":"Show the spine\u2019s planar reference to establish the starting direction.","bend-ready":"Compare the spine with its planar reference before measuring bend.","shoulder-camera":"Frame both shoulders so the crossbar\u2019s source is clear.","crossbar-plane":"Build a plane across the spine to set a perpendicular crossbar.","crossbar-camera":"Angle the view so the shoulder projection stays visible.","crossbar-angle":"Show the shoulder line\u2019s angle to the plane before projection.","crossbar-project":"Project the shoulder line across the spine to make a rigid T.","crossbar-original-fade":"Fade the original shoulder line so the rigid crossbar stays clear.","reference-t":"Compare the reference and body T before rotating.","azimuth-camera":"Look down to see the T\u2019s horizontal lean direction.","azimuth-plane":"Show the horizontal plane at the root to measure lean direction.","azimuth-ready":"Compare forward with the horizontal lean direction before turning.","forward-fade":"Fade forward now that lean direction is established.","polar-camera":"Move to the side to see how far the T leans.","polar-ready":"Compare the upright stem with the body spine before inclining.","spin-camera":"Look along the spine to see the crossbar\u2019s twist.","spin-ready":"Compare both crossbars before twisting around the spine.","sway-ready":"Start with sway to isolate sideways displacement.","thrust-ready":"Next, isolate forward displacement along the reference forward axis.","lift-ready":"Finally, isolate vertical displacement along the reference up axis.",reset:"Fade the helpers to return to the selected pose."};function Qv(i){let e=i.startsWith("reference-")?"reference":i.startsWith("torso-")?"torso":null;if(!e)return;let t=i.slice(e.length+1),n=e==="reference",r=n?"reference ankles":"shoulders",s=n?"reference":"torso";return{"lateral-camera-in":`Move closer so both ${r} and the full arrow stay visible.`,"lateral-focus":`Highlight the ${r} to show where left\u2013right comes from.`,grow:`Connect right to left to define the ${s}\u2019s left\u2013right direction.`,"lateral-release":"Release the joint emphasis so the direction stays in focus.",shrink:"Anchor left\u2013right at the midpoint to build a coordinate frame.","up-focus":"Highlight the upper-spine joints to show where up comes from.",up:n?"Add global up so the left\u2013right direction can be leveled.":"Use the upper spine to define the torso\u2019s up direction.","up-release":"Release the joint emphasis so the up direction stays in focus.","up-align":"Move up to the shared origin to compare the two directions.","angle-camera":"Face the two directions so their angle is easy to see.","angle-reveal":"Show the angle to up before making the two directions perpendicular.",orthogonalize:"Remove the up component to make left\u2013right perpendicular to up.","cross-camera-in":"Choose an oblique view to see the plane and forward together.",plane:"Grow the left\u2013up plane to establish the forward direction.",forward:"Draw forward perpendicular to the plane to complete the axes.","plane-fade":"Fade the construction plane; keep the three directions.","cross-camera-out":`Pull back to see the completed ${s} axes.`}[t]}function ih(i,e){let t=i.subtype.startsWith("torso_"),n=i.subtype==="spine_bend_tilt",r=i.subtype.startsWith("hip")?"hip":"shoulder";return{turn:t?"Rotate around up to measure torso turn.":i.type==="kinematic"?`Rotate toward the projected ${r} direction to measure turn.`:`Rotate across the horizontal plane to measure ${r} turn.`,bend:t?"Rotate around the turned left\u2013right axis to measure forward bend.":"Rotate the planar reference toward the spine to measure forward bend.",tilt:t?"Rotate around forward to measure side tilt.":n?"Rotate the planar reference toward the spine to measure side tilt.":`Rotate from horizontal toward the ${r} line to measure tilt.`,azimuth:"Turn the reference T around global up to match the lean direction.",polar:"Incline the reference T toward the spine to measure lean from vertical.",spin:"Twist around the spine until the crossbars match.",sway:"Measure sway along left\u2013right; the dashed line shows its projection.",thrust:"Measure thrust along forward; the dashed line shows its projection.",lift:"Measure lift along up; the dashed line shows its projection."}[e]}function eb(i,e,t){let n=i.context.entry,r=e.id,s=n.subtype.startsWith("hip")?"hips":"shoulders",o=n.subtype==="spine_azimuth_polar_spin";if(r==="finish"){let l=mn(t.progress,t.reviewDuration??e.duration);if(l.holding)return"Hold the completed result so the final comparison is clear.";if(l.progress<.22)return n.type==="position"?"Reset the numbers to review each displacement component.":"Fade the comparison vectors so their directions can reset while hidden.";let u=o||n.subtype.startsWith("torso_")?.34:n.type==="geometric"?.38:.4;return n.type!=="position"&&l.progress<u?"Bring the reset vectors back before replaying the measurements.":t.active?"Review: "+ih(n,t.active):"Review the same comparison to see how the result is measured."}if(r==="reference-align")return o?"Rearrange the reference axes into a root-based T for comparison.":n.subtype==="spine_bend_tilt"?"Move and shrink the reference axes to keep a compact direction guide.":n.type==="kinematic"?"Move the reference axes onto the spine-plane origin for comparison.":`Move the reference axes to the ${s==="hips"?"hip":"shoulder"} center for comparison.`;if(r==="reference-trim")return n.subtype==="spine_bend_tilt"?"Make the compact reference translucent so the spine stays clear.":"Fade unused axes so the measured direction stays clear.";let a=Qv(r);if(a)return a;if(r==="plane")return n.type==="kinematic"?"Build a plane perpendicular to the lower spine to compare turn.":"Create the reference horizontal plane to separate turn from tilt.";if(r==="tilt-ready")return n.subtype==="spine_bend_tilt"?"Compare the spine with its planar reference before measuring tilt.":`Compare the ${s} with the horizontal plane before measuring tilt.`;if(r.startsWith("camera-"))return`Look toward the ${r==="camera-turn"?"up":r==="camera-bend"?"left\u2013right":"forward"} axis to see this rotation clearly.`;let c=r.match(/^(up|spine|lateral|shoulder)-(focus|grow|release|align)$/);if(c){let[,,l]=c,u=c[1],h=u==="up"?"lower-spine joints":u==="spine"?"hip and shoulder centers":u==="shoulder"?"shoulders":s;return l==="focus"?`Highlight the ${h} to show where this direction comes from.`:l==="grow"?u==="spine"?"Connect hip center to shoulder center to define the spine direction.":u==="up"?"Connect the lower-spine joints to define the rotation axis.":`Connect right to left to define the ${h.replace(/s$/,"")} direction.`:l==="release"?"Release the joint emphasis so the measured direction stays clear.":o?`Turn the ${u==="spine"?"spine arrow into the T\u2019s stem":"shoulder arrow into the T\u2019s crossbar"}.`:"Anchor the direction at the measurement origin for comparison."}return Kv[r]??ih(n,r)}function rh(i,e,t){let n=e.id;if(n==="finish"){let r=mn(t.progress,t.reviewDuration??e.duration);if(r.holding||!t.active)return null;let s=i.context.entry.subtype==="spine_azimuth_polar_spin"||i.context.entry.subtype.startsWith("torso_")?.34:i.context.entry.type==="geometric"?.38:.4;return r.progress<s?null:ih(i.context.entry,t.active)??null}return/camera|focus|release|fade|ready|markers|preview|intro|reset|compare|trim|align|shrink|highlight|duplicate/.test(n)||["selected-focus","reference-root","target-root","scale-align","unit-fade","plane-switch","reference-t","displacement"].includes(n)||/angle/.test(n)?null:eb(i,e,t)??null}function Lp(i,e){let t=[];for(let n=0;n<e.segments.length;n++){let r=e.segments[n];if(r.completion)continue;let s=rh(i,r,e.sample(r.start+r.duration*.5));if(!s)continue;let o=r.start,a=e.segments[n-1];a&&(r.id.endsWith("grow")&&a.id.endsWith("focus")&&(o=a.start),/(?:project|projection|orthogonalize)$/.test(r.id)&&/(?:angle|angle-reveal)$/.test(a.id)&&(o=a.start));let c=r.id.match(/^(reference|torso)-(plane|forward)$/),l=r.id.match(/^(reference|torso)-(up|orthogonalize)$/),u=c?"Use the left\u2013up plane to define forward, perpendicular to both directions.":l?l[1]==="reference"?"Use global up to level the left\u2013right direction.":"Use the upper spine as up; make left\u2013right perpendicular to it.":s,h=t.at(-1);if(h?.text===u){h.actionEnd=r.end;continue}t.push({start:o,actionEnd:r.end,text:u})}for(let n=0;n<t.length;n++){let r=t[n],s=Math.max(2800,Math.min(5e3,r.text.split(/\s+/).length*230)),o=e.segments.find(a=>a.start>=r.actionEnd-1e-6&&["selected-focus","finish","reset"].includes(a.id))?.start??e.duration;r.end=Math.min(t[n+1]?.start??e.duration,o,Math.max(r.actionEnd,r.start+s))}return{cues:t,sample(n){let r=e.segments.find(s=>n>=s.start&&n<s.end);return r?.completion?rh(i,r,e.sample(n)):t.find(s=>n>=s.start&&n<s.end)?.text??null}}}function Dp(i){let e=It("div",void 0,"explain-step-caption");e.setAttribute("aria-label","Step explanation"),e.setAttribute("aria-live","off"),i.parentElement.append(e);let t,n,r=new Set;function s(){for(let o of r)o.cancel();r.clear(),e.replaceChildren(),t=void 0}return{update(o,{immediate:a=!1}={}){if(o===n)return;n=o;let c=matchMedia("(prefers-reduced-motion: reduce)").matches;if(a||c){s(),o&&(t=It("span",o,"explain-step-caption-text"),e.append(t));return}let l=t;if(l){let u=l.animate([{opacity:1},{opacity:0}],{duration:160,fill:"forwards"});r.add(u),u.finished.then(()=>{l.remove(),r.delete(u)}).catch(()=>{})}if(t=void 0,o){t=It("span",o,"explain-step-caption-text"),e.append(t);let u=t.animate([{opacity:0},{opacity:1}],{duration:180,fill:"both"});r.add(u),u.finished.then(()=>r.delete(u)).catch(()=>{})}},dispose(){s(),e.remove()}}}function yc({root:i,target:e,onAdvance:t,onPlayingChange:n=()=>{},playing:r=!matchMedia("(prefers-reduced-motion: reduce)").matches},s={request:o=>requestAnimationFrame(o),cancel:o=>cancelAnimationFrame(o),observe:(o,a)=>{let c=new IntersectionObserver(l=>a(l[0].isIntersecting));return c.observe(o),()=>c.disconnect()},hidden:()=>document.hidden}){let o,a,c=!1,l=!1,u=s.observe(e,p=>{c=p,o=void 0});function h(p){if(l||!i.isConnected)return;let f=r&&c&&!s.hidden()&&!i.closest("[inert]");f&&t(o===void 0?0:p-o),o=f?p:void 0,a=s.request(h)}return a=s.request(h),{get playing(){return r},setPlaying(p){r=!!p,o=void 0,n(r)},dispose(){l=!0,s.cancel(a),u()}}}function Up(i,e){let t=new yn;t.name="normalization-bone-copies",i.add(t);let n=new Map,r=new D(0,1,0),s=.012,o=Math.sqrt(.022**2-s**2);function a(c){if(n.has(c))return n.get(c);let l=new Ha(1,1,6,16),u=new Float32Array(l.attributes.position.array),h=new Qi({color:"#8b9198",roughness:.38,metalness:.08,transparent:!0}),p=new it(l,h);p.castShadow=!0,p.receiveShadow=!0,t.add(p);let f={mesh:p,original:u};return n.set(c,f),f}return{update(c=[]){for(let{mesh:l}of n.values())l.visible=!1;for(let l of c){let u=e(l.from),h=e(l.to),p=h.clone().sub(u),f=p.length(),g=f-2*o*(l.jointTrim??0);if(g<1e-7)continue;let{mesh:x,original:m}=a(l.id),d=Math.min(s,g/2),v=Math.max(0,(g-2*d)/2),y=x.geometry.attributes.position;for(let _=0;_<y.count;_++){let w=m[_*3+1];y.setXYZ(_,m[_*3]*d,Math.sign(w)*v+(w-Math.sign(w)*.5)*d,m[_*3+2]*d)}y.needsUpdate=!0,x.geometry.computeBoundingSphere(),x.scale.setScalar(1),x.position.copy(u).add(h).multiplyScalar(.5),x.quaternion.setFromUnitVectors(r,p.multiplyScalar(1/f)),x.material.color.set(l.color??"#8b9198"),x.material.opacity=l.opacity??1,x.material.depthWrite=x.material.opacity>.999,x.visible=x.material.opacity>.001}},dispose(){for(let{mesh:c}of n.values())c.geometry.dispose(),c.material.dispose();i.remove(t),n.clear()}}}var tb=1e-7,Fp=i=>i.from&&i.to?Math.hypot(...i.to.map((e,t)=>e-i.from[t])):1;function Oo(i){let e=new Map;function t(n,r,s="opacity",o=1,a=1,c){if(!r)return;let l=r[s]??1;l*o<=tb||e.set(n,{opacity:l*o,extent:a,signature:c,set:u=>{r[s]=l*u}})}for(let n of["referencePose","selectedPose"])t(n,i,n);for(let n of["referenceAxes","torsoAxes","originalReferenceAxes","originalTorsoAxes"]){let r=i[n];if(!r)continue;let s=r.opacity??1;for(let o of["x","y","z"])if(r[o]){let a=r[o];t(n+"."+o,a,"opacity",s,Fp(a),{from:a.from,to:a.to,color:a.color??a.colorAxis??o,shape:a.shape??"arrow"})}for(let o of["angleMarker","projectionSweep"])r[o]&&t(n+"."+o,r[o],"opacity",s,Math.abs(r[o].angle));r.componentPlane&&t(n+".componentPlane",r.componentPlane,"opacity",s,r.componentPlane.size),r.plane>0&&t(n+".plane",r,"planeOpacity",s,r.plane)}if(i.plane){let n=i.plane,r=[n.axis??"y",...n.u??[],...n.v??[]].join(",");t("plane:"+r,n,"opacity",1,n.size)}for(let[n,r]of(i.sectors??[]).entries())t(`sector:${r.axis}:${r.direction??n}`,r,"opacity",1,Math.abs(r.angle));for(let n of["guides","boneGuides"])for(let r of i[n]??[])t(n+":"+r.id,r,"opacity",1,r.kind==="point"?r.radius??4:Fp(r));return e}function nb(i,e){let t=i.signature,n=e.signature;return t&&n&&t.color===n.color&&t.shape===n.shape&&Math.abs(i.opacity-e.opacity)<.02&&["from","to"].every(r=>t[r].every((s,o)=>Math.abs(s-n[r][o])<1e-6))}function Np(i,{fadeDuration:e=240}={}){let t=new Set([0,i.duration]);for(let c=0;c<i.duration;c+=40)t.add(c);for(let c of i.segments){let l=c.completion?64:4;for(let u=0;u<=l;u++)t.add(c.start+c.duration*u/l);c.motionDuration!==void 0&&t.add(c.start+c.motionDuration)}let n=[],r=[...t].sort((c,l)=>c-l),s=r[0],o=Oo(i.sample(s));function a(c,l,u,h){let p=l,f=u;for(let y=0;y<20;y++){let _=(p+f)/2;Oo(i.sample(_)).has(c)===h?f=_:p=_}let g=(p+f)/2,x=Math.min(.001,(u-l)/100),m=Oo(i.sample(h?g+x:g-x)).get(c);if(!m||m.opacity<.01||m.extent<1e-5)return;let d=i.segments.find(y=>(h?g+x:g-x)>=y.start&&(h?g+x:g-x)<y.end),v=Math.min(e,(d?.duration??e)*.35);n.push({key:c,time:g,appearing:h,duration:v})}for(let c of r.slice(1)){let l=Oo(i.sample(c)),u=[...o.keys()].filter(f=>!l.has(f)),h=[...l.keys()].filter(f=>!o.has(f)),p=new Set;for(let f of u)for(let g of h)nb(o.get(f),l.get(g))&&(p.add(f),p.add(g));for(let f of u)p.has(f)||a(f,s,c,!1);for(let f of h)p.has(f)||a(f,s,c,!0);o=l,s=c}return{events:n,sample(c){let l=i.sample(c),u=Oo(l),h=new Map;for(let p of n){let f=p.appearing?c-p.time:p.time-c;if(f<0||f>p.duration||!u.has(p.key))continue;let g=Pe(Fe(f/p.duration));h.set(p.key,Math.min(h.get(p.key)??1,g))}for(let[p,f]of h)u.get(p).set(f);return l}}}function li(i,e,{scene:t,toWorld:n,setPoses:r,draw:s,canvas:o,setFocus:a,setCamera:c,setPairFocus:l,setRotationPivot:u,navigation:h},p){let f=p(e),g=wr(t,n),x=nr(t,n,2.7,o),m=nr(t,n,4.5,o,f.targetAxisColors),d=rc(t,n),v=nr(t,n,2.7,o),y=nr(t,n,4.5,o,f.targetAxisColors),_=mc(n,o),w=Up(t,n),E=Np(f),A=Dp(o),T=Lp(e,f);i.classList.add("metric-explanation"),i.setAttribute("aria-label","Animated measurement coordinate frames");let b=It("div",void 0,"explain-item-options"),M={};b.setAttribute("role","group"),b.setAttribute("aria-label","Measurement values");for(let z of e.items){let te=It("button");te.type="button";let U=It("strong","0.00"+z.unit),j=sc(e.context.entry.subtype,z.key);j&&te.style.setProperty("--metric-axis-color",j),te.append(It("span",z.label),U),b.append(te),M[z.key]={button:te,output:U},te.onclick=()=>B(f.segments.find(ee=>ee.id===z.key).start)}let C=It("input",void 0,"explain-time-slider");C.type="range",C.min=0,C.max=f.duration,C.step="any",C.value=0,C.setAttribute("aria-label","Explanation timeline");let F=Ip(f,C,z=>H(z,{preservePlayback:!0}));i.append(b,F.root);let V=h?Cp(o,h):null,Y=(z,te=f.sample(X))=>{let U=Rp(e.context.entry,f,X,te);u?.(U.pivot),h?.setPlayback(U.restricted,z)},X=0,I,Q=!matchMedia("(prefers-reduced-motion: reduce)").matches;function W(){let z=E.sample(X);Y(k.playing,z),F.update(X),A.update(T.sample(X),{immediate:!k.playing}),v.update(z.originalReferenceAxes),y.update(z.originalTorsoAxes),x.update(z.referenceAxes),m.update(z.torsoAxes),d.update(z.sectors),g.update(z.plane),_.update(z.guides),w.update(z.boneGuides),l(z.pairFocus),c(z.camera),r(z.referencePose,z.selectedPose,z.jointHighlights,z.boneHighlights),a(z.focusOrigin??f.frames.torso.origin,z.focus),C.value=X,C.setAttribute("aria-valuetext",z.title);for(let[te,{button:U,output:j}]of Object.entries(M)){let ee=z.valueColors?.[te]??sc(e.context.entry.subtype,te);ee&&U.style.setProperty("--metric-axis-color",ee),j.textContent=z.values[te].toFixed(2)+e.items.find(xe=>xe.key===te).unit,U.setAttribute("aria-pressed",String(z.active===te))}s()}function B(z){let te=i.closest(".metric-snapshot"),U=te?vp(te,{duration:320,fadeIncoming:!0}):void 0;H(z),U?.mount?.(),U?.()}function H(z,{preservePlayback:te=!1}={}){X=Math.max(0,Math.min(f.duration,Number(z))),te||k.setPlaying(!1),W()}let k=yc({root:i,target:o,playing:Q,onPlayingChange:z=>{Y(z),I?.update(z)},onAdvance:z=>{h?.returning||(X=(X+z)%f.duration,W())}});return I=xc(o,k),C.oninput=()=>H(C.value,{preservePlayback:!0}),W(),{updateView(z,te,U){v.updateView(z,te,U),y.updateView(z,te,U),x.updateView(z,te,U),m.updateView(z,te,U),_.updateView(z,te,U)},dispose(){V?.dispose(),I.dispose(),k.dispose(),v.dispose(),y.dispose(),x.dispose(),m.dispose(),d.dispose(),g.dispose(),_.dispose(),w.dispose(),A.dispose(),r(.5,1)}}}function Op(i,e,t){return li(i,e,t,hc)}function zp(i,e,t){return li(i,e,t,dc)}function Bp(i,e,t){return li(i,e,t,uc)}function sh(i,e,t){return li(i,e,t,Lo)}function kp({title:i,description:e}){let t=It("header",void 0,"snapshot-card-header");return t.append(It("h4",i,"snapshot-sample-title")),e&&t.append(It("p",e,"snapshot-metric-description")),t}function oh(i,e,t){return li(i,e,t,Io)}function ah(i,e,t){return li(i,e,t,Po)}function ch(i,e,t,n){let r=[...Bn(),...zf(i,t).map(({itemIndex:o,stepIndex:a})=>({itemIndex:o,stepIndex:a,duration:Math.max(4400,i[o].steps[a].visuals.filter(c=>c.jointPair).length*5300)}))];n!==void 0&&r.push({...r.at(-1),completion:!0,duration:0});let s=En(r,e,n);return{segments:r,duration:s,sample(o){let a=r.find(c=>o<c.end)??r.at(-1);return{segment:a,progress:a.completion?1:Fe((o-a.start)/a.duration)}}}}function Hp(i,e,{show:t,animate:n,canvas:r,opening:s}){i.classList.add("metric-explanation"),i.setAttribute("aria-label","Animated measurement explanation"),i.append(It("p",e.category,"explain-category"),It("h5",e.title,"explain-title"));let o=It("div",void 0,"explain-item-options");o.setAttribute("role","group"),o.setAttribute("aria-label","Measurement component");let a=It("progress");a.max=1,a.value=0,a.setAttribute("aria-label","Construction progress"),i.append(o,a);let c,l,u=[],h=[],p=0,f=ch(e.items,e.context.entry.duration,void 0,e.context.entry.stay),g=!matchMedia("(prefers-reduced-motion: reduce)").matches;function x(){let{segment:v,progress:y}=f.sample(p);if(v!==l&&(u.forEach((_,w)=>_.setAttribute("aria-pressed",String(w===(v.itemIndex??0)))),t(v.intro?[]:e.items[v.itemIndex].steps[v.stepIndex].visuals),l=v),a.value=v.intro?0:y,v.intro){let _=v.motionDuration?Math.min(1,(p-v.start)/v.motionDuration):y,w=Object.fromEntries(e.items.map(A=>[A.key,A.value])),E=Qu(v,_,w);s?.(E),h.forEach((A,T)=>A.textContent=E.values[e.items[T].key].toFixed(2)+e.items[T].unit)}else h.forEach((_,w)=>{let E=e.items[w],A=w<v.itemIndex?E.value:w===v.itemIndex&&v.stepIndex===E.steps.length-1?E.value*y:0;_.textContent=A.toFixed(2)+E.unit}),n(y)}function m(v){f=ch(e.items,e.context.entry.duration,v,e.context.entry.stay),p=0,l=void 0,d.setPlaying(!0),x()}e.items.forEach((v,y)=>{let _=It("button");_.type="button";let w=It("strong",`${v.value.toFixed(2)}${v.unit}`);h.push(w),_.append(It("span",v.label),w),_.onclick=()=>m(y),o.append(_),u.push(_)});let d=yc({root:i,target:i.parentElement.querySelector("canvas")??i,playing:g,onPlayingChange:v=>c?.update(v),onAdvance:v=>{p=(p+v)%f.duration,x()}});return c=xc(r,d),g||(p=f.duration),x(),{dispose(){c.dispose(),d.dispose()}}}function Vp(i){let e=document.createElement("div");e.className="explain-scene-labels",e.setAttribute("aria-hidden","true"),i.parentElement.append(e);let t=document.createElementNS("http://www.w3.org/2000/svg","svg");e.append(t);let n=[];function r(){n.forEach(a=>a.element.remove()),n=[],t.replaceChildren()}function s(a,c,l){let u=document.createElement("span");u.textContent=c,u.style.color=l,e.append(u);let h={position:a,element:u,color:l};return n.push(h),{setText(p){u.textContent=p},setPosition(p){h.position=p}}}function o(a,c,l){e.style.width=c+"px",e.style.height=l+"px",t.setAttribute("viewBox",`0 0 ${c} ${l}`),t.replaceChildren();let u=[];for(let{position:h,element:p,color:f}of n){let g=h.clone().project(a);if(g.z>1||g.z<-1){p.hidden=!0;continue}p.hidden=!1;let x=(g.x+1)*c/2,m=(1-g.y)*l/2,d=p.offsetWidth,v=p.offsetHeight,y,_=1/0;for(let[E,A]of[[10,-v-5],[10,5],[-d-10,-v-5],[-d-10,5],[10,-v-32],[-d-10,-v-32],[10,32],[-d-10,32],[10,60],[-d-10,60]]){let T=Math.max(3,Math.min(c-d-3,x+E)),b=Math.max(3,Math.min(l-v-3,m+A)),C=u.reduce((F,V)=>F+Math.max(0,Math.min(T+d+4,V.x+V.w)-Math.max(T-4,V.x))*Math.max(0,Math.min(b+v+3,V.y+V.h)-Math.max(b-3,V.y)),0)*100+Math.hypot(T-x,b-m);C<_&&(y={x:T,y:b,w:d,h:v},_=C)}u.push(y),p.style.left=y.x+"px",p.style.top=y.y+"px";let w=document.createElementNS(t.namespaceURI,"line");w.setAttribute("x1",x),w.setAttribute("y1",m),w.setAttribute("x2",Math.max(y.x,Math.min(y.x+d,x))),w.setAttribute("y2",Math.max(y.y,Math.min(y.y+v,m))),w.setAttribute("stroke",f),t.append(w)}}return{add:s,clear:r,update:o,dispose(){e.remove()}}}function Gp(i,e,t){let n=ap(t),r=Vp(t),s=new yn;s.name="metric-explanation",i.add(s);let o=[],a=[];function c(){r.clear(),n.clear(),o=[];let g=new Set,x=new Set;s.traverse(m=>{m.geometry&&g.add(m.geometry),m.material&&x.add(m.material)}),s.clear(),g.forEach(m=>m.dispose()),x.forEach(m=>{m.map?.dispose(),m.dispose()})}function l(g,x,m=!1){let d=new Mt().setFromPoints(g),v=m?new Wa({color:x,dashSize:.025,gapSize:.015,depthWrite:!1}):new Dn({color:x,depthWrite:!1}),y=new Li(d,v);return m&&y.computeLineDistances(),s.add(y),y}function u(g,x){return n.add(x)}function h(g,x,m){g.visible=x.distanceTo(m)>1e-7,g.setEndpoints(x,m)}function p(g,x){c();let m=y=>e(x(y)),d=g.filter(y=>y.jointPair).length,v=0;for(let y of g)if(y.kind==="point"){let _=new it(new si(.018,16,12),new $t({color:y.color}));_.position.copy(m(y.position)),s.add(_),r.add(_.position,y.label,y.color),o.push(w=>_.scale.setScalar(.5+.5*w.directions))}else if(y.kind==="vector"){let _=m(y.from),w=m(y.to),E=u(_,y.color);if(r.add(w,y.label,y.color),y.jointPair){let A=v++;o.push(T=>{let b=nc(Math.max(0,Math.min(1,T.progress*d-A)));h(E,_,_.clone().lerp(w,b.stretch)),a.push({...y.jointPair,strength:b.strength})})}else o.push(A=>h(E,_,_.clone().lerp(w,A.directions)))}else if(y.kind==="projection"){let _=m(y.origin),w=m(ue(y.origin,oe(y.direction,y.size))),E=m(ue(y.origin,oe(y.target,y.size))),A=u(_,y.color),T=l([w,w],y.color,!0),b=r.add(w,y.label,y.color);o.push(M=>{let C=w.clone().lerp(E,M.projection);h(A,_,C),b.setPosition(C);let F=T.geometry.attributes.position;F.setXYZ(1,C.x,C.y,C.z),F.needsUpdate=!0,T.computeLineDistances(),T.visible=M.projection>0})}else if(y.kind==="plane"){let _=be(y.normal),w=be(Ut(_,Math.abs(_[1])<.9?[0,1,0]:[1,0,0])),E=be(Ut(_,w)),A=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([C,F])=>m(ue(y.origin,ue(oe(w,C*y.radius),oe(E,F*y.radius))))),T=new Mt().setFromPoints(A);T.setIndex([0,1,2,0,2,3]),T.computeVertexNormals();let b=new $t({color:y.color,opacity:0,transparent:!0,side:Vt,depthWrite:!1});s.add(new it(T,b));let M=l([...A,A[0]],y.color,!0);r.add(A[2],y.label,y.color),o.push(C=>{b.opacity=.1*C.directions,M.visible=C.directions>.2})}else if(y.kind==="arc"){let w=Array.from({length:97},(M,C)=>m(ue(y.origin,oe(gt(y.from,y.normal,y.degrees*C/96),y.radius)))),E=l(w,y.color),A=m(y.origin),T=u(A,y.color),b=r.add(w[0],`${y.label} 0.0\xB0`,y.color);o.push(M=>{E.geometry.setDrawRange(0,Math.floor(M.angle*96)+1);let C=m(ue(y.origin,oe(gt(y.from,y.normal,y.degrees*M.angle),y.radius)));h(T,A,C),T.visible=M.directions>.8,b.setPosition(C),b.setText(`${y.label} ${((y.value??y.degrees)*M.angle).toFixed(1)}\xB0`)})}f(0)}function f(g){a=[];let x={...Of(g),progress:g};return o.forEach(m=>m(x)),a}return{show:p,animate:f,updateLabels(g,x,m){r.update(g,x,m),n.updateView(g,x,m)},dispose(){c(),r.dispose(),n.dispose(),i.remove(s)}}}var rb=new Map([["position.hip_sway_thrust_lift",zp],["geometric.spine_azimuth_polar_spin",Op],["geometric.shoulder_turn_tilt",sh],["geometric.hip_turn_tilt",sh],["geometric.spine_bend_tilt",Bp],["kinematic.hip_turn_on_spine_plane",oh],["kinematic.shoulder_turn_on_spine_plane",oh],["kinematic.torso_turn_bend_tilt",ah],["kinematic.torso_turn_bend_tilt_by_shoulder",ah]]);function sb(i,e,{scene:t,toWorld:n,canvas:r,setPoses:s,draw:o,setCamera:a,setPairFocus:c}){let l=Gp(t,n,r),u=!1,h=[],p=e.context,f=yt(p.meta.orientation.map(m=>m[2]),p.meta.orientation.map(m=>m[1]));function g(m){if(!h.length){c(null),a(null);return}let d=m*h.length,v=Math.min(h.length-1,Math.floor(d)),y=h[v],_=nc(Math.min(1,d-v)),w=y.jointPair.pose==="reference"?p.reference:p.pose,E=y.jointPair.joints.map(b=>p.source(p.point(b,w))),A={from:p.source(y.from),to:p.source(y.to)},T=ac({from:E[0],to:E.at(-1)},A,p.meta.orientation.map(b=>b[2]),p.meta.orientation.map(b=>b[1]));c({points:[...T.points,...E],amount:_.camera}),a(Wt(f,T.orientation,_.camera))}let x=Hp(i,e,{canvas:r,opening:m=>{s(m.referencePose,m.selectedPose),o()},show:m=>{h=m.filter(d=>d.jointPair),g(0),u=m.length>0,s(u?.28:.5,u?.28:1),l.show(m,e.context.source),o()},animate:m=>{g(m);let d=l.animate(m);u&&s(.28,.28,d),o()}});return{updateView:l.updateLabels,dispose(){x.dispose(),l.dispose()}}}function Wp(i,{id:e,poseData:t,metrics:n,entry:r,...s}){let o=Ns(t,n,r),a=It("div",void 0,"snapshot-explain-layout"),c=It("div",void 0,"snapshot-explain-figure"),l=It("aside");return c.append(s.canvas),a.append(c,l),i.append(kp({title:o.title,description:Qa[r.subtype]}),a),i.classList.add("snapshot-explained"),(rb.get(`${r.type}.${r.subtype}`)??sb)(l,o,s)}var ob=[["nose","atlas"],["nose","top_head"],["nose","left_ear"],["nose","right_ear"],["root","left_hip"],["root","right_hip"],["root","torso"],["torso","clavicle"],["clavicle","left_shoulder"],["clavicle","right_shoulder"],["clavicle","atlas"],["left_hip","left_knee"],["right_hip","right_knee"],["left_knee","left_ankle"],["right_knee","right_ankle"],["left_shoulder","left_elbow"],["right_shoulder","right_elbow"],["left_elbow","left_wrist"],["right_elbow","right_wrist"],["golf_club_grip","golf_club_heel"],["golf_club_heel","golf_club_head"]];function Xp(i){if(!Array.isArray(i)||i.some(r=>typeof r!="string")||new Set(i).size!==i.length)throw new Error("Expected a unique joint name list");let e=Object.fromEntries(i.map((r,s)=>[r,s])),t=ob.map(r=>r.map(s=>{if(!Object.hasOwn(e,s))throw new Error(`Missing pose joint: ${s}`);return e[s]})),n=t.filter(r=>r.every(s=>i[s].startsWith("golf_club_")));return{names:i,edges:t,indexes:e,clubEdges:n}}var ab=i=>Object.fromEntries(["duration","stay","start_stay","explain","transition","review","end_stay"].filter(e=>i[e]!==void 0).map(e=>[e,i[e]]));function qp(i,e,t){if(!i||!["kinematic","geometric","position"].includes(i.type))throw new Error("Snapshot type must be kinematic, geometric or position");if(typeof i.subtype!="string"||!Object.hasOwn(e.metrics?.[i.type]??{},i.subtype))throw new Error("Unknown snapshot metric subtype");To(i.duration),Ro(i.stay),cb(i);let n=i.frame,r=e.meta?.ref_frame_id;for(let[s,o]of[["selected",n],["reference",r]])if(!Number.isInteger(o)||o<0||o>=t)throw new Error(`Invalid ${s} snapshot frame`);return{frame:n,referenceFrame:r,type:i.type,subtype:i.subtype,...ab(i)}}function cb(i){i.explain!==void 0&&To(i.explain);for(let e of["start_stay","transition","review","end_stay"])i[e]!==void 0&&Ro(i[e])}function Yp(i,e,t,n){let r=t.clone();return i.copy(e).slerp(r,n)}function lh(i,e){if(i.position.y>=e)return;let t=i.position.clone(),n=Math.max(t.length(),Math.abs(e)+1e-6),r=e,s=Math.hypot(t.x,t.z),o=Math.sqrt(Math.max(0,n*n-r*r))/(s||1);i.position.set(s?t.x*o:0,r,s?t.z*o:Math.sqrt(Math.max(0,n*n-r*r)));let a=i.quaternion.clone().setFromUnitVectors(t.normalize(),i.position.clone().normalize());i.quaternion.premultiply(a)}function $p(i,e,t){if(i.y>=t)return;let n=i.clone().sub(e),r=t-e.y,s=Math.max(n.length(),Math.abs(r)+1e-6),o=Math.hypot(n.x,n.z),a=Math.sqrt(Math.max(0,s*s-r*r));i.set(e.x+(o?n.x/o*a:0),t,e.z+(o?n.z/o*a:a))}var zo=["nose","atlas","top_head","left_ear","right_ear","left_shoulder","right_shoulder","left_elbow","right_elbow","left_wrist","right_wrist","left_hip","right_hip","left_knee","right_knee","left_ankle","right_ankle","golf_club_grip","golf_club_shaft","golf_club_heel","golf_club_head"],jp=[[0,1],[0,2],[0,3],[0,4],[5,6],[5,7],[7,9],[6,8],[8,10],[5,11],[6,12],[11,12],[11,13],[13,15],[12,14],[14,16],[17,19],[19,20]],Yt=i=>Array.isArray(i)&&i.length===3&&i.every(Number.isFinite);async function lb(i){let e=await fetch(i);if(!e.ok)throw new Error(`${i}: ${e.status}`);return e.json()}async function Zp(i,e,t,{poseData:n,showCameras:r=!1,autoPlay:s=!0,cameraVideos:o={},rawDetections:a={},bannerMode:c=!1,bannerMetrics:l,snapshotMetrics:u,videoMetrics:h,calibratedViews:p=!1,hoganPlanes:f=!1,defaultZoomScale:g=1,measurementMetrics:x,measurementFeature:m="geometric-rotations",showRawDetections:d=!0,compositeDetections:v=!1}={}){let y=n??await lb(`materials/data/3d_results/${encodeURIComponent(e)}.json`),{reconstruction:_,calibration:w,joints:E}=y,{names:A,edges:T,indexes:b,clubEdges:M}=Xp(E),C=N=>A[N]?.startsWith("golf_club_"),F=u?qp(t,u,_.length):null,V=F?.referenceFrame,Y=t.range??t.ranage??[0,_.length-1],X=Array.isArray(Y)?Y.map((N,$)=>N===null?$===0?0:_.length-1:N):Y;if(!Array.isArray(X)||X.length!==2||!X.every(Number.isInteger)||X[0]<0||X[1]<X[0]||X[1]>=_.length)throw new Error("Invalid snapshot frame range");let[I,Q]=X,W=(f?["golf_club_head"]:x?["golf_club_head"]:t.joints||[]).map(N=>N==="golf_club_haed"?"golf_club_head":N);if(W.some(N=>!A.includes(N)))throw new Error("Unknown trail joint");let B=Math.min(Q,Math.max(I,F?.frame??t.highlight_index??I)),H=0,k=0,z=2,te=1,U=document.createElement("h4");U.textContent=`Swing ${e}`,U.className="media-item-title";let j=document.createElement("canvas");j.setAttribute("aria-label",`3D pose for swing ${e}`),j.setAttribute("role","img"),F||i.append(U),i.append(j);let ee=dp(j,{names:zo,edges:jp}),xe=F?[_[V],_[F.frame]]:_.slice(I,Q+1),ie=xe.flat().filter(Yt);if(!ie.length)throw new Error("No valid 3D points");let ne=[0,1,2].map(N=>Math.min(...ie.map($=>$[N]))),Ee=[0,1,2].map(N=>Math.max(...ie.map($=>$[N]))),de=F?bp(_,I,Q):ne.map((N,$)=>(N+Ee[$])/2),O=Math.max(...ie.map(N=>Math.hypot(...N.map(($,fe)=>$-de[fe]))))||1,q=N=>{let $=N.sort((fe,_e)=>fe-_e);return $[Math.floor($.length/2)]},G=xe,Ae=q(G.map(N=>Math.max(...[N[b.left_ankle],N[b.right_ankle]].filter(Yt).map($=>$[1]))).filter(Number.isFinite)),ae=Ae-q(G.map(N=>N[b.top_head]).filter(Yt).map(N=>N[1])),Ve=(ae>0?ae:O*2)/8,ke=10**Math.floor(Math.log10(Ve)),ut=[1,2,5,10].map(N=>N*ke).reduce((N,$)=>Math.abs(N-Ve)<Math.abs($-Ve)?N:$),ze=G.filter(N=>Yt(N[b.left_hip])&&Yt(N[b.right_hip])).map(N=>N[b.left_hip].map(($,fe)=>($+N[b.right_hip][fe])/2)),P=ze.length?q(ze.map(N=>N[0])):de[0],S=ze.length?q(ze.map(N=>N[2])):de[2],Z=Math.max(...ie.map(N=>Math.max(Math.abs(N[0]-P),Math.abs(N[2]-S))))||ut,ce=ae>0?ae:O,le=N=>new D((N[0]-de[0])/ce,-(N[1]-de[1])/ce,-(N[2]-de[2])/ce),pe=f?(()=>{let N=_[I],$=ge=>{let we=N[b[ge]];if(!Yt(we))throw new Error(`Missing Hogan reference joint: ${ge}`);return le(we).toArray()},fe=(ge,we)=>$(ge).map((ye,Ke)=>(ye+$(we)[Ke])/2),_e=G.map(ge=>ge[b.golf_club_head]).filter(Yt).map(ge=>le(ge).toArray());return up({head:$("golf_club_head"),leftAnkle:$("left_ankle"),rightAnkle:$("right_ankle"),shoulder:fe("left_shoulder","right_shoulder"),hip:fe("left_hip","right_hip"),trajectory:_e})})():null,Ye=f?hp(G,b.golf_club_grip,b.golf_club_heel)/ce/10:0,Se,Ne,xt,ve,He=new D,je=1,Oe=new Rs;Oe.background=new Je("#f4f7f0");let Te=new Da({canvas:j,antialias:!0}),ft=Ic({floatColor:!!Te.extensions.get("EXT_color_buffer_float"),maxTextures:Te.capabilities.maxTextures}),ot=r&&!c&&ft.depthCompositing?vf(Te):null;j.dataset.renderMode=ot?"depth-composited":"native";let Nt=()=>ot?ot.render(Oe,L):Te.render(Oe,L);_p(j,Nt),Te.setPixelRatio(ft.pixelRatio),Te.shadowMap.enabled=!0,Te.shadowMap.type=Uu,Te.toneMapping=Fu,Te.toneMappingExposure=1.2;let L=new In(45,1,.01,100),Re=O/ce,he=ie.map(le);Oe.add(new Ya("#ffffff","#7d8974",2));let me=new bo("#fff6df",3);me.position.set(-2,4,3),me.castShadow=!0,me.shadow.mapSize.set(ft.shadowSize,ft.shadowSize);let Ie=Math.max(3,Re*1.8);Object.assign(me.shadow.camera,{left:-Ie,right:Ie,top:Ie,bottom:-Ie,near:.1,far:20}),me.shadow.normalBias=.005,me.shadow.bias=-15e-5,Oe.add(me);let Le=new bo("#dceaff",1);Le.position.set(3,1,-3),Oe.add(Le);let Ze=N=>new Qi({color:N,roughness:.38,metalness:.08}),kt=Ze("#63f5b4");(c||F)&&(kt.transparent=!0);let rn={left:Ze("#3b82f6"),right:Ze("#ef4444"),center:kt};(c||F)&&Object.values(rn).forEach(N=>{N.transparent=!0});let St=.012,_n=.022,ui=new _i(1,1,1,16),hi=Ap(St,_n),Vs=m==="hip-translation",Bi=new si(_n,24,16),rr=new D(0,1,0),Er=T.map(([N,$])=>{let fe=Vs?hi.bone(kt):new it(ui,kt);return fe.castShadow=!0,fe.receiveShadow=!1,c&&(fe.renderOrder=2),Oe.add(fe),{a:N,b:$,mesh:fe}}),Ar=A.map((N,$)=>{let fe=rn[N.startsWith("left_")?"left":N.startsWith("right_")?"right":"center"],_e=c?new it(Bi,fe):hi.joint(fe);return _e.castShadow=!0,_e.receiveShadow=!1,c&&(_e.renderOrder=3),Oe.add(_e),_e}),Tr=N=>{N.castShadow=!0};F&&[...Er.map(N=>N.mesh),...Ar.filter(Boolean)].forEach(Tr);let Kn,Rr=[],Gs=[],jr=1;if(F){let N=ge=>{let we=Ze(ge);return we.transparent=!0,we.opacity=.5,we.depthWrite=!1,we},$={left:N("#3b82f6"),right:N("#ef4444"),center:N(Vf.reference)},fe=_[V],_e=ge=>ge.startsWith("left_")?"left":ge.startsWith("right_")?"right":"center";Kn=new yn,Kn.name="reference-pose",Oe.add(Kn);for(let[ge,we]of T){if(!Yt(fe[ge])||!Yt(fe[we]))continue;let ye=le(fe[ge]),Ke=le(fe[we]);if(Ke.clone().sub(ye).length()<=1e-8)continue;let at=hi.bone($.center);hi.placeBone(at,ye,Ke),at.visible=!C(ge)&&!C(we),Kn.add(at),Gs.push({a:ge,b:we,mesh:at})}A.forEach((ge,we)=>{if(!Yt(fe[we]))return;let ye=hi.joint($[_e(ge)]);hi.placeJoint(ye,le(fe[we])),ye.visible=!C(we),Rr[we]=ye,Kn.add(ye)}),Kn.traverse(ge=>{ge.isMesh&&Tr(ge)})}function Ws(N,$,fe=[],_e=[]){if(!(!F&&!h&&!x)){jr=$,Mp(me,N,$),Kn&&(Kn.visible=N>.001),Kn?.traverse(ge=>{ge.material&&(ge.material.opacity=N,ge.material.transparent=!0,ge.material.depthWrite=N>.999,ge.castShadow=!0)});for(let ge of[...Er.map(we=>we.mesh),...Ar.filter(Boolean)])ge.material.transparent=!0,ge.material.opacity=$,ge.material.depthWrite=$>.999,ge.castShadow=!0;for(let ge of fe){let we=ge.pose==="reference"?N:$,ye=ge.pose==="reference"?Rr:Ar;for(let Ke of ge.joints){let et=ye[b[Ke]];if(!et)continue;let $e=we+(1-we)*Math.max(0,Math.min(1,ge.strength));et.material.opacity=Math.max(et.material.opacity,$e),et.material.depthWrite=$e>.999}}for(let ge of _e){let we=ge.pose==="reference"?Gs:Er,ye=ge.pose==="reference"?N:$;for(let Ke of ge.pairs){let et=Ke.map($e=>b[$e]);for(let $e of we){if(!($e.a===et[0]&&$e.b===et[1]||$e.a===et[1]&&$e.b===et[0]))continue;let at=ye+(1-ye)*Math.max(0,Math.min(1,ge.strength));$e.mesh.material.opacity=Math.max($e.mesh.material.opacity,at),$e.mesh.material.depthWrite=at>.999}}}}}let Bo=[],ko=new _i(1,1,1,8),R=new si(.006,8,6),J=new pn,re=Number.isFinite(t.fps)&&t.fps>0?t.fps:60,se=new Map,K=0;for(let N of new Set([...W,"golf_club_head"])){let $=A.indexOf(N),fe=new Float64Array(_.length);for(let _e=1;_e<_.length;_e++){let ge=_[_e-1]?.[$],we=_[_e]?.[$];!Yt(ge)||!Yt(we)||(fe[_e]=Math.hypot(we[0]-ge[0],we[1]-ge[1],we[2]-ge[2])*re,K=Math.max(K,fe[_e]))}se.set(N,fe)}W.forEach(N=>{let $=A.indexOf(N),fe=[],_e=[];for(let ye=I;ye<=Q;ye++){let Ke=_[ye]?.[$];if(!Yt(Ke))continue;let et=le(Ke);_e.push({point:et,frame:ye});let $e=_[ye-1]?.[$];if(ye===I||!Yt($e))continue;let at=le($e),Qe=et.clone().sub(at),Ht=Qe.length();Ht>1e-6&&fe.push({from:at,to:et,delta:Qe,length:Ht,frame:ye})}let ge=Ze("#ffffff");ge.transparent=!0,ge.depthWrite=!1;let we={playbackFrame:{value:B},historyFrames:{value:Math.max(1,(Q-I+1)*.3)}};ge.userData.playbackFrame=we.playbackFrame,ge.onBeforeCompile=ye=>{f&&(ye.vertexShader=`attribute vec3 trailFrom; attribute vec3 trailTo; varying vec3 trailPoint;
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
diffuseColor.a *= 1.0 - age / historyFrames;`),ye.uniforms.playbackFrame=we.playbackFrame,ye.uniforms.historyFrames=we.historyFrames,ge.userData.shader=ye};for(let[ye,Ke,et]of[[fe,ko,!0],[_e,R,!1]]){if(!ye.length)continue;let $e=Ke.clone();$e.setAttribute("historyFrame",new _r(new Float32Array(ye.map(Qe=>Qe.frame)),1)),f&&($e.setAttribute("trailFrom",new _r(new Float32Array(ye.flatMap(Qe=>(et?Qe.from:Qe.point).toArray())),3)),$e.setAttribute("trailTo",new _r(new Float32Array(ye.flatMap(Qe=>(et?Qe.to:Qe.point).toArray())),3)));let at=new go($e,ge,ye.length);ye.forEach((Qe,Ht)=>{J.position.copy(et?Qe.from.clone().add(Qe.to).multiplyScalar(.5):Qe.point),J.quaternion.identity(),J.scale.set(1,1,1),et&&(J.quaternion.setFromUnitVectors(rr,Qe.delta.clone().normalize()),J.scale.set(.006,Qe.length,.006)),J.updateMatrix(),at.setMatrixAt(Ht,J.matrix);let wt=K>0?se.get(N)[Qe.frame]/K:0;at.setColorAt(Ht,new Je().setHSL((1-wt)*2/3,1,.5))}),at.instanceMatrix.needsUpdate=!0,at.instanceColor.needsUpdate=!0,at.computeBoundingSphere(),at.receiveShadow=!f,at.visible=!0,Oe.add(at),Bo.push({mesh:at,frames:ye.map(Qe=>Qe.frame)})}});let Me=[],De=Math.max(1,Math.round(re*.1)),Ge=Math.max(1,(Q-I+1)*.3),We=se.get("golf_club_head")||se.get(W[0]);for(let N=I;!f&&N<=Q;N+=De){let $=[];for(let[we,ye]of M){if(!Yt(_[N]?.[we])||!Yt(_[N]?.[ye]))continue;let Ke=le(_[N][we]),et=le(_[N][ye]),$e=et.clone().sub(Ke),at=$e.length();at>1e-6&&$.push({from:Ke,to:et,delta:$e,length:at})}if(!$.length)continue;let fe=K>0&&We?We[N]/K:0,_e=Ze(new Je().setHSL((1-fe)*2/3,1,.5));_e.transparent=!0,_e.depthWrite=!1;let ge=new go(ko,_e,$.length);$.forEach((we,ye)=>{J.position.copy(we.from).add(we.to).multiplyScalar(.5),J.quaternion.setFromUnitVectors(rr,we.delta.clone().normalize()),J.scale.set(.0035,we.length,.0035),J.updateMatrix(),ge.setMatrixAt(ye,J.matrix)}),ge.instanceMatrix.needsUpdate=!0,ge.computeBoundingSphere(),ge.receiveShadow=!0,c&&(ge.renderOrder=1.5),Oe.add(ge),Me.push({mesh:ge,frame:N})}let nt=le([P,Ae+_n*ce,S]),lt=r?Math.max(0,...Object.values(w||{}).filter(N=>Yt(N.t)).map(N=>Math.max(Math.abs(N.t[0]-P),Math.abs(N.t[2]-S)))):0,_t=2*(r?Math.max(Z,lt+Math.max(ut,.25*ce)):Z)/ce,ht=new it(new Ii(_t,.025,_t),new Qi({color:"#e2eadf",roughness:.95,transparent:!1}));ht.position.copy(nt),ht.position.y-=.0125,ht.receiveShadow=!0,ht.renderOrder=-20,Oe.add(ht);let Rt=_t/2,hn=ut/ce*(r&&!c?2:1),Et=[];for(let N=-Math.floor(Rt/hn);N<=Math.floor(Rt/hn);N++){let $=N*hn;Et.push($,0,-Rt,$,0,Rt,-Rt,0,$,Rt,0,$)}let qe=new Mt;qe.setAttribute("position",new rt(Et,3));let tn=new Vr(qe,new Dn({color:"#c5d1c0"}));tn.position.copy(nt),tn.position.y+=.001,tn.renderOrder=-19,Oe.add(tn);let vt=[],An=[],Qn=new Map,Tn=[],ki=new Map,mt="free-view",Lt,di,gn,Gn=0,Un=0,wi=new yn;Oe.add(wi);let fi=[];fi.push(()=>ee.dispose());let uh=[],em=Ze("#46545a"),tm=Ze("#283438"),nm=new _i(1,1,1,12),im=new si(1,16,10);function hh(N){let $=new it(nm,em);return $.castShadow=$.receiveShadow=!0,N.add($),$}function dh(N,$,fe,_e){let ge=fe.clone().sub($);N.position.copy($).add(fe).multiplyScalar(.5),N.quaternion.setFromUnitVectors(rr,ge.clone().normalize()),N.scale.set(_e,ge.length(),_e)}function rm(N){for(let $ of uh){let fe=$.position.clone(),_e=Math.max(.03,fe.y-N),ge=fe.clone();ge.y=N+_e*.65,dh($.column,fe,ge,.012);for(let we=0;we<3;we++){let ye=we*Math.PI*2/3+Math.PI/6,Ke=Math.min(.22,_e*.35),et=new D(fe.x+Math.cos(ye)*Ke,N+.009,fe.z+Math.sin(ye)*Ke);dh($.legs[we],ge,et,.009),$.feet[we].position.copy(et),$.feet[we].scale.set(.018,.009,.018)}}}let Zr=Re;for(let[N,$]of Object.entries(r||p?w||{}:{})){let{R:fe,t:_e}=$;if(!Array.isArray(fe)||fe.length!==3||!fe.every(At=>Yt(At))||!Yt(_e))continue;let ge=At=>fe.map(on=>on.reduce((ei,Hi,Xo)=>ei+Hi*At[Xo],0)),ye=le(_e);Zr=Math.max(Zr,ye.length()+.25);let Ke=At=>{let on=ge(At);return new D(on[0],-on[1],-on[2])},et=Ke([1,0,0]),$e=Ke([0,-1,0]),at=Ke([0,0,-1]);if(!r){let At=new Jt().setFromRotationMatrix(new bt().makeBasis(et,$e,at));Qn.set(N,{position:ye.clone(),rotation:At,K:$.intrinsic,video:o[N]});continue}let Qe=new yn;Qe.position.copy(ye),Qe.quaternion.setFromRotationMatrix(new bt().makeBasis(et,$e,at)),wi.add(Qe);let Ht=new yn;Ht.userData.cameraView=N,Oe.add(Ht),An.push(Ht);let Rn={position:new D(0,-.045,.045).applyQuaternion(Qe.quaternion).add(ye),column:hh(Ht),legs:[],feet:[]};for(let At=0;At<3;At++){Rn.legs.push(hh(Ht));let on=new it(im,tm);on.castShadow=on.receiveShadow=!0,Ht.add(on),Rn.feet.push(on)}uh.push(Rn);let pi=Ze(N==="face-on"?"#ef4444":"#3b82f6"),Ue=Ze("#34474b"),tt=(At,on,ei)=>{let Hi=new it(At,on);return Hi.position.set(...ei),Hi.castShadow=Hi.receiveShadow=!0,Qe.add(Hi),Hi};tt(new Ii(.18,.12,.09),pi,[0,0,.045]),tt(new Ii(.055,.04,.055),Ue,[.045,.078,.045]),tt(new Ii(.035,.09,.072),Ue,[-.097,-.005,.045]);let Dt=tt(new _i(.048,.04,.084,32,1,!0),Ue,[0,0,-.04]);Dt.rotation.x=Math.PI/2;let Gt=tt(new _o(.034,24),new Qi({color:"#69b8ce",metalness:.55,roughness:.16}),[0,0,-.082]);Gt.rotation.y=Math.PI;let dn=tt(new vo(.034,.04,32),Ue,[0,0,-.082]);dn.rotation.y=Math.PI;let qs=Ke([0,0,1]).normalize(),Cr=ze.length?le([P,q(ze.map(At=>At[1])),S]):new D,sn=ye.distanceTo(Cr)/3,Xt=$.intrinsic,Ho=Xt?.[0]?.[0]>0?Math.min(.7,Xt[0][2]/Xt[0][0]):.35,Vo=Xt?.[1]?.[1]>0?Math.min(.7,Xt[1][2]/Xt[1][1]):.35,Go=[[-Ho,-Vo],[Ho,-Vo],[Ho,Vo],[-Ho,Vo]].map(([At,on])=>new D(At*sn,on*sn,-sn)),Ih=[];for(let At=0;At<4;At++)Ih.push(0,0,0,...Go[At].toArray(),...Go[At].toArray(),...Go[(At+1)%4].toArray());let Lh=new Mt;Lh.setAttribute("position",new rt(Ih,3)),Qe.add(new Vr(Lh,new Dn({color:"#78a84a",transparent:!0,opacity:.8}))),Qe.children.forEach(At=>{At.userData.cameraView=N}),An.push(...Qe.children);for(let At of Go){let on=At.clone().applyQuaternion(Qe.quaternion).add(ye);Zr=Math.max(Zr,on.length()+.15)}Qn.set(N,{position:ye.clone(),rotation:Qe.quaternion.clone(),K:$.intrinsic,video:o[N]});let Wo=a[N]??{joints:zo,pred:[]};d&&!f&&Wo?.joints&&Wo?.pred&&vt.push({view:N,raw:Wo,mapping:zo.map(At=>Wo.joints.indexOf(At)),overlayColor:"#ffce69",K:Xt,depth:sn,group:Qe});let vn=o[N];if(vn){let At=v?pp(vn,{names:zo,edges:jp,getPose:or=>{let Ys=vt.find(Pc=>Pc.view===N);return Ys?.mapping.map(Pc=>Ys.raw.pred[or]?.[Pc])}}):fp(vn);Tn.push(At);let on=new $t({map:At,side:Vt,toneMapped:!1,transparent:!0,opacity:c||v?1:.3,depthWrite:!1});c&&(on.depthTest=!1);let ei=new it(new yr(1,1),on);c&&(ei.renderOrder=1);let Hi=()=>{let or=Number(vn.dataset.sourceWidth)||vn.videoWidth||Xt[0][2]*2,Ys=Number(vn.dataset.sourceHeight)||vn.videoHeight||Xt[1][2]*2;ei.scale.set(or*sn/Xt[0][0],Ys*sn/Xt[1][1],1),ei.position.set((or/2-Xt[0][2])*sn/Xt[0][0],-(Ys/2-Xt[1][2])*sn/Xt[1][1],-sn),At.needsUpdate=!0,fh(),Kt()};Qe.add(ei),ei.visible=!1,ki.set(N,{texture:At,screen:ei,frame:null});let Xo=()=>{vn.readyState>=2&&Hi()};for(let or of["loadeddata","resize"])vn.addEventListener(or,Xo);fi.push(()=>{for(let or of["loadeddata","resize"])vn.removeEventListener(or,Xo)});let Dh=()=>{};vn.addEventListener("seeked",Dh),fi.push(()=>vn.removeEventListener("seeked",Dh));let Uh=Number(vn.dataset.sourceWidth)||vn.videoWidth||Xt[0][2]*2,Fh=Number(vn.dataset.sourceHeight)||vn.videoHeight||Xt[1][2]*2;ei.scale.set(Uh*sn/Xt[0][0],Fh*sn/Xt[1][1],1),ei.position.set((Uh/2-Xt[0][2])*sn/Xt[0][0],-(Fh/2-Xt[1][2])*sn/Xt[1][1],-sn)}}let _c=1/0;for(let N of _)for(let $=0;$<N.length;$++)Yt(N[$])&&(_c=Math.min(_c,le(N[$]).y-_n));function fh(){wi.updateWorldMatrix(!0,!0);let N=new ii().setFromObject(wi),fe=Math.min(_c,N.isEmpty()?1/0:N.min.y)-.002;ht.position.y=fe-.0125,tn.position.y=fe+.001,rm(fe)}if(fh(),f){let N=pe,$=new yn;$.name="hogan-planes";let fe=document.createElement("canvas");fe.width=256,fe.height=128;let _e=fe.getContext("2d"),ge=_e.createLinearGradient(0,0,0,128);ge.addColorStop(0,"#b5cfdf"),ge.addColorStop(.46,"#e8f1ee"),ge.addColorStop(.52,"#a6b6a1"),ge.addColorStop(1,"#55644f"),_e.fillStyle=ge,_e.fillRect(0,0,256,128);for(let[ye,Ke,et]of[[42,28,.9],[171,45,.65]]){let $e=_e.createLinearGradient(ye-Ke,0,ye+Ke,0);$e.addColorStop(0,"rgba(255,255,255,0)"),$e.addColorStop(.5,`rgba(255,255,255,${et})`),$e.addColorStop(1,"rgba(255,255,255,0)"),_e.fillStyle=$e,_e.fillRect(ye-Ke,12,Ke*2,70)}let we=new Cs(fe);we.mapping=lo,we.colorSpace=xn,fi.push(()=>we.dispose()),N.forEach((ye,Ke)=>{let et=new Mt;et.setAttribute("position",new rt(ye.corners.flat(),3)),et.setIndex([0,1,2,0,2,3]),et.computeVertexNormals(),et.setAttribute("uv",new rt([0,0,1,0,1,1,0,1],2));let $e=Ke?"#e6ad53":"#68adc6",at=new $t({color:$e,transparent:!0,opacity:.23,side:Vt,depthWrite:!1}),Qe=new it(et,at);Qe.name=ye.name,Qe.receiveShadow=!1,$.add(Qe);let Ht=new Li(new Mt().setFromPoints([1,2,3,0].map(Rn=>new D(...ye.corners[Rn]))),new Dn({color:$e,transparent:!0,opacity:.65,depthWrite:!1}));$.add(Ht);let wt=new Ga({color:Ke?"#c3c7b6":"#a8cfce",transparent:!0,opacity:.48,roughness:.08,metalness:.1,envMap:we,envMapIntensity:1.2,depthWrite:!1});for(let[Rn,Xs]of[[0,1],[1,2],[2,3],[3,0]]){if(Ke&&Rn===0&&Xs===1)continue;let pi=new yo(new D(...ye.corners[Rn]),new D(...ye.corners[Xs]));$.add(new it(new Va(pi,1,.003,6,!1),wt))}}),$.add(new Li(new Mt().setFromPoints(N[0].corners.slice(0,2).map(ye=>new D(...ye))),new Dn({color:"#739c9b",transparent:!0,opacity:.8,depthWrite:!1}))),Oe.add($),j.dataset.hoganPlanes=JSON.stringify(N)}ht.visible=tn.visible=!c;let Si=new yn;Si.visible=r&&!c,Oe.add(Si);let sm=new vo(.994,1.006,192),om=new _o(1.22,48);function ph(N){let $=new it(sm,new $t({color:N,toneMapped:!1,side:Vt}));return $.rotation.x=-Math.PI/2,Si.add($),$}function vc(N){let $=new it(om,new $t({color:N,toneMapped:!1,side:Vt}));return $.rotation.x=-Math.PI/2,Si.add($),$}function mh(N){let $=new Mt;$.setAttribute("position",new rt(new Float32Array(12),3)),$.setIndex([0,1,2,0,2,3]);let fe=new it($,new $t({color:N,toneMapped:!1,side:Vt}));return fe.frustumCulled=!1,Si.add(fe),fe}let gh=[];for(let[N,$]of Qn){let fe=N==="face-on"?"#ef4444":"#3b82f6";gh.push({position:$.position,ring:ph(fe),marker:vc(fe),connection:mh(fe)})}let bc=vc("#63f5b4");bc.scale.set(.06,.06,1);let Mc=new Vr(new Mt().setFromPoints([new D(-.065,0,0),new D(.065,0,0),new D(0,0,-.065),new D(0,0,.065)]),new Dn({color:"#63f5b4",toneMapped:!1}));Si.add(Mc);let xh=ph("#63f5b4"),wc=vc("#63f5b4"),yh=mh("#63f5b4"),Sc=new Vr(new Mt().setFromPoints([new D(-.045,0,0),new D(.045,0,0),new D(0,0,-.045),new D(0,0,.045)]),new Dn({color:"#63f5b4",toneMapped:!1}));Si.add(Sc),Si.traverse(N=>{N.material&&(N.renderOrder=10,N.frustumCulled=!1,N.material.transparent=!1,N.material.depthWrite=!0,N.material.depthTest=!0,N.material.polygonOffset=!0,N.material.polygonOffsetFactor=-2,N.material.polygonOffsetUnits=-2)});for(let N of[xh,wc,yh,Sc,bc,Mc])N.visible=!1;function am(){if(!Si.visible)return;let N=ht.position.y+.0125+.003;bc.position.set(0,N,0),Mc.position.set(0,N,0);let $=(fe,_e,ge,we)=>{let ye=Math.hypot(we.x,we.z);fe.position.set(0,N,0),fe.scale.set(ye,ye,1),_e.position.set(we.x,N,we.z),_e.scale.set(.055,.055,1);let Ke=Math.hypot(we.x,we.z)||1;(($e,at,Qe)=>{let Ht=$e.geometry.attributes.position,wt=-we.z/Ke*at,Rn=we.x/Ke*at;Ht.setXYZ(0,wt,Qe,Rn),Ht.setXYZ(1,we.x+wt,Qe,we.z+Rn),Ht.setXYZ(2,we.x-wt,Qe,we.z-Rn),Ht.setXYZ(3,-wt,Qe,-Rn),Ht.needsUpdate=!0})(ge,.008,N)};gh.forEach(fe=>$(fe.ring,fe.marker,fe.connection,fe.position)),$(xh,wc,yh,L.position),Sc.position.copy(wc.position)}let _h=[...he],Jr=new ii().setFromObject(wi);if(!Jr.isEmpty())for(let N of[Jr.min.x,Jr.max.x])for(let $ of[ht.position.y,Jr.max.y])for(let fe of[Jr.min.z,Jr.max.z])_h.push(new D(N,$,fe));let vh=_.slice(I,Q+1).flatMap(N=>N.filter(($,fe)=>!C(fe)&&Yt($)).map(le));if(wi.updateWorldMatrix(!0,!0),wi.traverse(N=>{if(!N.isMesh)return;N.geometry.computeBoundingBox();let $=N.geometry.boundingBox;for(let fe of[$.min.x,$.max.x])for(let _e of[$.min.y,$.max.y])for(let ge of[$.min.z,$.max.z])vh.push(new D(fe,_e,ge).applyMatrix4(N.matrixWorld))}),v){let N=new Je("#f4f7f0");ht.material.color.lerp(N,.55),tn.material.color.lerp(ht.material.color,.7),Si.traverse($=>{$.material?.color&&$.material.color.lerp(N,.75)})}let cm=new D(Math.sin(-.65)*Math.cos(.3),Math.sin(.3),Math.cos(-.65)*Math.cos(.3)),Kr=!c,Ei=0,Ai=0;te=1,Object.keys(o).length&&(H=-.65,k=.3);let Wn=F?wp(Kt):null;Wn&&fi.push(()=>Wn.dispose());let bh=0,Mh=0,wh,Sh,sr;function Kt(){let N=j.clientWidth,$=j.clientHeight;if(!N||!$)return;(N!==bh||$!==Mh)&&(Te.setSize(N,$,!1),bh=N,Mh=$),L.aspect=N/$;let fe=Wn?.zoom??z,_e=Wn?.panX??Ei,ge=Wn?.panY??Ai;L.zoom=fe*je*(mt==="free-view"?6:1);let we=i.querySelector(".snapshot-bottom-strip"),ye=bf($,we?.offsetTop??$,_e,ge);(Kr||we)&&L.setViewOffset(N,$,ye.offsetX,ye.offsetY,N,$),L.fov=45;let Ke=On.degToRad(L.fov/2),et=Math.min(Ke,Math.atan(Math.tan(Ke)*L.aspect)),$e=Math.max(Re,Zr*.85)*te/(Math.sin(et)*.84),at=He.clone();if(m==="hip-translation"){let Ue=y.reconstruction[0],tt=y.joints,Dt=Ue[tt.indexOf("root")]??Ue[tt.indexOf("left_hip")].map((Gt,dn)=>(Gt+Ue[tt.indexOf("right_hip")][dn])/2);at.copy(le(Dt))}let Qe;if(F&&Ne){let Ue=le(Ne.direction.map((Gt,dn)=>Gt+de[dn])).normalize(),tt=le(Ne.up.map((Gt,dn)=>Gt+de[dn])).normalize(),Dt=Wn.orient(Ue,tt);Qe={direction:Ue,up:tt,verticalHalfFov:Ke,aspect:L.aspect,manual:Dt},$e=No(he,at,Ue,tt,Ke,L.aspect)*te}if(h&&mt==="free-view"){if(Sh!==L.aspect){let Ue=Object.keys(o).length?-.65:0,tt=Object.keys(o).length?.3:0,Dt=new D(Math.sin(Ue)*Math.cos(tt),Math.sin(tt),Math.cos(Ue)*Math.cos(tt));wh=No(he,at,Dt,new D(0,1,0),Ke,L.aspect),Sh=L.aspect}$e=wh*te}if(xt){let Ue=Tp(xt,le,et,$e,at,je,Qe);at.copy(Ue.target),$e=Ue.distance,L.zoom=fe*Ue.zoom}mt==="free-view"&&($e=6*te*No(_h,new D,cm,new D(0,1,0),Ke,L.aspect,.94)),L.near=mt==="free-view"?Math.max(.01,$e*.1):.01,L.far=Math.max(100,$e+Zr*5);let Ht=ht.position.y+.0125+.02;mt==="free-view"&&(k=Math.max(k,Math.asin(Math.max(-.999,Math.min(.999,Ht/$e))))),L.position.set($e*Math.sin(H)*Math.cos(k),$e*Math.sin(k),$e*Math.cos(H)*Math.cos(k)),L.position.add(at),L.up.set(0,1,0),L.lookAt(at),L.fov=45,An.forEach(Ue=>{Ue.visible=c||Ue.userData.cameraView===mt?!1:mt==="free-view"||Lt&&Lt.progress<.75});let wt=Qn.get(mt);if(wt){let Ue=Number(wt.video?.dataset.sourceWidth)||wt.video?.videoWidth||wt.K[0][2]*2,tt=Number(wt.video?.dataset.sourceHeight)||wt.video?.videoHeight||wt.K[1][2]*2,Dt=new Jt().setFromEuler(new Nn(Un,Gn,0,"YXZ")),Gt=wt.rotation.clone().multiply(Dt).multiply(wt.rotation.clone().invert());L.position.copy(wt.position).multiplyScalar(te).applyQuaternion(Gt),L.quaternion.copy(Gt).multiply(wt.rotation),L.fov=On.radToDeg(2*Math.atan(c?Ue/(2*wt.K[0][0]*L.aspect):Math.max(tt/(2*wt.K[1][1]),Ue/(2*wt.K[0][0]*L.aspect))))}if(wt&&we&&(L.zoom*=ye.cameraZoomScale*.9),L.zoom*=g,wt&&m==="hip-translation"){L.setViewOffset(N,$,ye.offsetX+_e,ye.offsetY+ge,N,$),lh(L,Ht),L.updateProjectionMatrix(),L.updateMatrixWorld(!0);let Ue=at.clone().project(L),tt=Mf(N,$,ye,Ue);L.setViewOffset(N,$,tt.offsetX,tt.offsetY,N,$)}let Rn=L.view?.offsetX??ye.offsetX,Xs=L.view?.offsetY??ye.offsetY;if(Lt){let Ue=Lt.progress;L.near=On.lerp(Lt.near,L.near,Ue),Lt.freeTransition?mp(L,Lt,Ue):(L.position.lerpVectors(Lt.position,L.position,Ue),Yp(L.quaternion,Lt.rotation,L.quaternion,Ue),L.fov=On.lerp(Lt.fov,L.fov,Ue),L.zoom=On.lerp(Lt.zoom,L.zoom,Ue)),(Kr||we)&&L.setViewOffset(N,$,On.lerp(Lt.offsetX,Rn,Ue),On.lerp(Lt.offsetY,Xs,Ue),N,$)}if(Ne){let{direction:Ue}=Qe,tt=Qe.manual.up,Dt=ve?le(ve):at,Gt=at.clone().addScaledVector(Ue,$e);L.position.copy(Wn.orbitPoint(Gt,Dt)),L.up.copy(tt);let dn=Wn.orbitPoint(at,Dt);$p(L.position,Dt,Ht),L.lookAt(dn)}else lh(L,Ht);if(L.updateProjectionMatrix(),!sr||sr.w!==N||sr.h!==$||sr.stripTop!==(we?.offsetTop??$)){let Ue=L.zoom,tt=L.view?.offsetX??0,Dt=L.view?.offsetY??0;L.updateMatrixWorld(!0);let Gt=()=>vh.map(Xt=>Xt.clone().project(L)),dn=$u(Gt()),qs=1-Math.max(1,we?.offsetTop??$)/$,Cr=()=>$u(Gt(),.08,0,qs);L.setViewOffset(N,$,(L.view?.offsetX??0)+dn.centerX*N/2,(L.view?.offsetY??0)-dn.centerY*$/2,N,$),L.updateProjectionMatrix(),L.zoom*=Cr().zoomFactor,L.updateProjectionMatrix();let sn=Cr();L.setViewOffset(N,$,(L.view?.offsetX??0)+(sn.centerX-sn.targetX)*N/2,(L.view?.offsetY??0)+(sn.targetY-sn.centerY)*$/2,N,$),L.updateProjectionMatrix(),sr={w:N,h:$,stripTop:we?.offsetTop??$,factor:L.zoom/Ue,x:(L.view.offsetX-tt)/N,y:(L.view.offsetY-Dt)/$}}else L.zoom*=sr.factor,L.setViewOffset(N,$,(L.view?.offsetX??0)+sr.x*N,(L.view?.offsetY??0)+sr.y*$,N,$),L.updateProjectionMatrix();am(),ht.material.opacity=1,ht.material.depthWrite=!0,tn.material.transparent=!1,tn.material.opacity=1,tn.material.depthWrite=!0;let pi=_[B];for(let{a:Ue,b:tt,mesh:Dt}of Er){if(Dt.visible=jr>.001&&Yt(pi[Ue])&&Yt(pi[tt]),!Dt.visible)continue;let Gt=le(pi[Ue]),dn=le(pi[tt]),qs=dn.clone().sub(Gt),Cr=qs.length();Dt.visible=Cr>1e-8,Dt.visible&&(Vs?hi.placeBone(Dt,Gt,dn):(Dt.position.copy(Gt).add(dn).multiplyScalar(.5),Dt.quaternion.setFromUnitVectors(rr,qs.normalize()),Dt.scale.set(St,Cr,St)))}Ar.forEach((Ue,tt)=>{Ue&&(Ue.visible=jr>.001&&Yt(pi[tt]),Ue.visible&&(c?Ue.position.copy(le(pi[tt])):hi.placeJoint(Ue,le(pi[tt]))))});for(let Ue of Bo){let tt=0,Dt=Ue.frames.length;for(;tt<Dt;){let Gt=tt+Dt>>>1;Ue.frames[Gt]<=B?tt=Gt+1:Dt=Gt}Ue.mesh.count=f?Ue.frames.length:tt,Ue.mesh.material.userData.playbackFrame.value=B}for(let Ue of Me){let tt=B-Ue.frame;Ue.mesh.visible=tt>0&&tt<Ge,Ue.mesh.visible&&(Ue.mesh.material.opacity=.75*(1-tt/Ge))}if(L.updateMatrixWorld(),v){Oe.updateMatrixWorld(!0);for(let Ue of vt){let tt=Ue.group.localToWorld(new D(0,0,-Ue.depth)).project(L),Dt=Ue.group.localToWorld(new D(Ue.depth/Ue.K[0][0],0,-Ue.depth)).project(L),Gt=Ue.group.localToWorld(new D(0,Ue.depth/Ue.K[1][1],-Ue.depth)).project(L),dn=Math.max(Math.hypot((Dt.x-tt.x)*N/2,(Dt.y-tt.y)*$/2),Math.hypot((Gt.x-tt.x)*N/2,(Gt.y-tt.y)*$/2));ki.get(Ue.view)?.texture.setImageScale(dn)}}ee.render({camera:L,scene:Oe,overlays:v?[]:vt,frame:B,w:N,h:$}),j.dataset.frame=String(B),Se?.(L,N,$),Nt()}let lm=N=>!Number.isFinite(N)||N<=0?z:h?N:Math.max(.4,N),Eh=N=>{let $=lm(z*N),fe=$/z;Ei*=fe,Ai*=fe,z=$};if(F)fi.push(Ep(j,N=>Wn.zoomBy(N),(N,$)=>Wn.pan(N,$),(N,$)=>Wn.rotate(N,$),()=>Wn.canRotate));else{let N=new Map,$=()=>{let[_e,ge]=[...N.values()];return Math.hypot(_e.x-ge.x,_e.y-ge.y)};j.onpointerdown=_e=>{Lt||_e.pointerType==="mouse"&&_e.button!==0&&!(Kr&&_e.button===2)||(_e.preventDefault(),N.set(_e.pointerId,{x:_e.clientX,y:_e.clientY,button:_e.button}),j.setPointerCapture(_e.pointerId))},j.onpointermove=_e=>{let ge=N.get(_e.pointerId);if(!ge)return;let we=N.size===2?$():0,ye=_e.clientX-ge.x,Ke=_e.clientY-ge.y;if(N.set(_e.pointerId,{x:_e.clientX,y:_e.clientY,button:ge.button}),N.size===2){let et=$();we>0&&Eh(et/we),Kr&&(Ei+=ye/2,Ai+=Ke/2)}else if(N.size===1)if(Kr&&ge.button===2)Ei+=ye,Ai+=Ke;else if(mt==="free-view")H-=ye*.01,k=Math.max(-1.4,Math.min(1.4,k+Ke*.01));else{let et=h?.01:8e-4/Math.max(1,z);Gn-=ye*et,Un=Math.max(-1.4,Math.min(1.4,Un-Ke*et))}Kt()},Kr&&j.addEventListener("contextmenu",_e=>_e.preventDefault());let fe=_e=>N.delete(_e.pointerId);j.onpointerup=j.onpointercancel=j.onlostpointercapture=fe,j.addEventListener("wheel",_e=>{_e.preventDefault(),!Lt&&(Eh(Math.exp(-_e.deltaY*(_e.ctrlKey?.01:.001))),Kt())},{passive:!1})}let Ah=new ResizeObserver(Kt);Ah.observe(j),Kt();let Ec,Ac=!1,Th=!0,Xn,Tc={setView(N,{animate:$=!0}={}){let fe=Qn.has(N)?N:"free-view",_e=fe===mt,ge=_e&&fe==="free-view",we=Object.keys(o).length?-.65:0,ye=Object.keys(o).length?.3:0;if(_e&&!Lt&&(ge?H===we&&k===ye:Gn===0&&Un===0)&&Ei===0&&Ai===0&&(fe==="free-view"||te===1))return;let et=z;cancelAnimationFrame(di);let $e={position:L.position.clone(),rotation:L.quaternion.clone(),fov:L.fov,near:L.near,zoom:L.zoom,offsetX:L.view?.offsetX||0,offsetY:L.view?.offsetY||0,progress:0,freeTransition:mt==="free-view"!=(fe==="free-view")};if(mt==="free-view"&&(gn={yaw:H,pitch:k,zoom:z,panX:Ei,panY:Ai}),fe!=="free-view"&&(te=1),mt=fe,Gn=Un=0,ge?(H=we,k=ye,Ei=Ai=0,z=et,gn={yaw:H,pitch:k,zoom:z,panX:Ei,panY:Ai}):fe==="free-view"&&gn?{yaw:H,pitch:k,zoom:z,panX:Ei,panY:Ai}=gn:(Ei=Ai=0,z=_e?et:1),!$||matchMedia("(prefers-reduced-motion: reduce)").matches){Lt=void 0,Kt();return}Lt=$e;let at=performance.now();function Qe(Ht){if(Ac)return;let wt=Math.min(1,(Ht-at)/1e3);$e.progress=wt*wt*wt*(wt*(wt*6-15)+10),wt===1&&(Lt=void 0),Kt(),wt<1&&(di=requestAnimationFrame(Qe))}di=requestAnimationFrame(Qe)},setDistance(N){let $=Number(N);Number.isFinite($)&&(cancelAnimationFrame(di),Lt=void 0,te=Math.max(.4,Math.min(3,$)),Kt())},setRawDetections(N,$){let fe=vt.find(_e=>_e.view===N);fe&&(fe.raw=$,fe.mapping=zo.map(_e=>$.joints.indexOf(_e)),Kt())},presentFrame(N,$=[]){B=Math.max(I,Math.min(Q,Math.floor(N)));let fe=new Map($.map(_e=>[_e.name,_e.raw]));for(let[_e,ge]of ki)ge.screen.visible=fe.has(_e),ge.frame=fe.has(_e)?B:null,ge.screen.visible&&ge.texture.commit(B);j.dataset.syncState=JSON.stringify({frame:B,views:Object.fromEntries(fe)}),Xn?.setFrame(B),Kt()},setPlaying(N){Th=!!N},setFrame(N){B=Math.max(I,Math.min(Q,Math.floor(N))),Xn?.setFrame(B),Kt()},setMetricSelection(N,$=[]){Xn?.setMetric(N,$),Kt()},setMeasurementSelection(N){Xn?.setSelection(N),Kt()},dispose(){cancelAnimationFrame(di),fi.forEach(fe=>fe()),Ac=!0,cancelAnimationFrame(Ec),Ah.disconnect(),ot?.dispose(),Te.dispose(),ft.singleScene&&Te.forceContextLoss();let N=new Set,$=new Set;Oe.traverse(fe=>{fe.geometry&&N.add(fe.geometry),fe.material&&$.add(fe.material)}),N.forEach(fe=>fe.dispose()),$.forEach(fe=>{fe.map?.dispose(),fe.dispose()})}};if(c&&l&&(Xn=xp({scene:Oe,toWorld:le,canvas:j,data:y,metrics:l,requestRender:Kt}),Se=Xn.updateView,fi.push(()=>Xn.dispose())),h&&(Xn=zs({scene:Oe,toWorld:le,canvas:j,data:y,metrics:h,requestRender:Kt,setPoses:Ws}),Se=Xn.updateView,fi.push(()=>Xn.dispose())),x&&(m==="hip-translation"&&Ws(0,.35),Xn=cp({scene:Oe,toWorld:le,canvas:j,data:y,metrics:x,feature:m,requestRender:Kt}),Se=Xn.updateView,fi.push(()=>Xn.dispose())),F){let N=Wp(i,{id:e,poseData:y,metrics:u,entry:t,scene:Oe,toWorld:le,setPoses:Ws,draw:Kt,canvas:j,navigation:Wn,setRotationPivot:$=>{ve=$},setCamera:$=>{Ne=$},setPairFocus:$=>{xt=$},setFocus:($,fe)=>{He.copy(le($)).multiplyScalar(fe),je=1+2.4*fe}});Se=N.updateView,Kt(),fi.push(()=>N.dispose())}if(F&&(await new Promise(N=>requestAnimationFrame(()=>{Kt(),N()})),i.querySelector(".snapshot-placeholder")?.remove(),i.setAttribute("aria-busy","false")),!s)return Tc.setFrame(I),Tc;let um=Q-I+1,Rc=B-I,Cc,Rh=!1,Ch=new IntersectionObserver(N=>{Rh=N[0].isIntersecting});Ch.observe(j);function Ph(N){if(Ac||!j.isConnected){Ch.disconnect();return}let $=Th&&Rh&&!document.hidden&&!i.inert;if($&&Cc!==void 0){Rc=(Rc+(N-Cc)*re/1e3)%um;let fe=I+Math.floor(Rc);fe!==B&&(B=fe,Kt())}Cc=$?N:void 0,Ec=requestAnimationFrame(Ph)}return Ec=requestAnimationFrame(Ph),Tc}function Jp(i,e,t,n=""){let r=document.createElement("div");r.className=`snapshot-info ${n}`;let s=document.createElement("button");s.className="snapshot-info-button",s.type="button",s.setAttribute("aria-label",e),s.setAttribute("aria-controls",i),s.setAttribute("aria-expanded","false");let o="http://www.w3.org/2000/svg",a=document.createElementNS(o,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("aria-hidden","true");for(let[u,h]of[["circle",{cx:12,cy:12,r:9,fill:"none",stroke:"currentColor","stroke-width":2}],["circle",{cx:12,cy:7,r:1,fill:"currentColor"}],["path",{d:"M12 11v6",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round"}]]){let p=document.createElementNS(o,u);for(let[f,g]of Object.entries(h))p.setAttribute(f,g);a.append(p)}s.append(a);let c=document.createElement("div");c.className="snapshot-info-panel",c.id=i,c.setAttribute("role","note"),c.setAttribute("aria-hidden","true"),c.inert=!0;for(let{gesture:u,action:h}of t){let p=document.createElement("p"),f=document.createElement("strong");f.textContent=`${u}: `,p.append(f,document.createTextNode(h)),c.append(p)}let l=u=>{c.classList.toggle("is-open",u),c.inert=!u,c.setAttribute("aria-hidden",String(!u)),s.setAttribute("aria-expanded",String(u))};return s.addEventListener("click",()=>l(s.getAttribute("aria-expanded")!=="true")),document.addEventListener("click",u=>{r.contains(u.target)||l(!1)}),document.addEventListener("keydown",u=>{u.key==="Escape"&&s.getAttribute("aria-expanded")==="true"&&(l(!1),s.focus())}),r.append(s,c),r}function Kp(i,{getTimes:e,onRequest:t,onSettled:n,requirePresentedFrame:r=!1}){let s=null,o=null,a=!1,c=!1,l,u,h=new Set,p=null;function f(){if(!(s!==null||o!==null||i.seeking)){for(let m of h)m();h.clear()}}function g(){if(o===null){x();return}if(!c||!a)return;clearTimeout(u),l!==void 0&&i.cancelVideoFrameCallback?.(l),l=void 0;let m=o;o=null,m!==null&&(p=m,n(m)),s!==null?x():f()}function x(){if(i.seeking||o!==null||s===null)return;let m=e(),d=s;s=null,o=d,a=!i.requestVideoFrameCallback,c=!1;let v=m[d],y=(m[d+1]??v+1/30)-v,_=v+Math.min(y/2,.01);if(Math.abs(i.currentTime-_)<1e-6&&(!r||p===d))a=!0,c=!0,g();else{if(i.requestVideoFrameCallback){let w=()=>{l=i.requestVideoFrameCallback((E,A)=>{if(l=void 0,A.mediaTime<v-1e-5||A.mediaTime>=v+y-1e-5){w();return}a=!0,g()})};w()}i.currentTime=_}}return i.addEventListener("seeked",()=>{c=!0,o!==null&&!a&&!r&&(clearTimeout(u),u=setTimeout(()=>{a=!0,g()},250)),g()}),{request(m){let d=Math.max(0,Math.min(e().length-1,m));s=d,t(d),x()},whenIdle(){return s===null&&o===null&&!i.seeking?Promise.resolve():new Promise(m=>h.add(m))},reset(){clearTimeout(u),l!==void 0&&i.cancelVideoFrameCallback?.(l),l=void 0,a=!1,c=!1,s=null,o=null;for(let m of h)m();h.clear()}}}var Hs=i=>Nh(i);var ir=(i,e,t)=>{let n=document.createElement(i);return e!==void 0&&(n.textContent=e),t&&(n.className=t),n};async function Qp(i,e,t,n,r){let s=ir("div",void 0,"snapshot-overview-header"),o=ir("div",void 0,"camera-view-options");o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshot POV"),o.append(ir("span","Select POV:","camera-view-label"));let a=Jp(`snapshot-gestures-${r}`,"Snapshot gestures",[{gesture:"Left mouse drag / one-finger drag",action:"Rotate the view."},{gesture:"Right mouse drag / two-finger drag",action:"Pan the view."},{gesture:"Scroll / pinch",action:"Zoom around the window center, including after panning."},{gesture:"Select the current POV again",action:"Recenter its position and rotation while keeping zoom. Free view remembers its orientation when switching views."}],"section-info"),c=[];for(let[O,q]of[["face-on","Face-on view"],["down-the-line","Down-the-line view"],["free-view","Free-view"]]){let G=ir("button",q);G.type="button",G.disabled=!0,G.setAttribute("aria-pressed",String(O==="free-view")),o.append(G),c.push([G,O])}s.append(ir("h3",n,"snapshot-feature-title"),o,a);let l=ir("div",void 0,"snapshot-overview-scene"),u=ir("p","Loading swing\u2026","snapshot-overview-status");u.setAttribute("role","status");let h=ir("div",void 0,"video-source-decoders");l.append(u),i.append(s,l,h);let p=n.toLowerCase(),f=p.startsWith("hogan's plane"),g=Oh(n),x=!f&&!g;if(p!=="club movement"&&!f&&!g){u.remove(),i.dataset.ready="true";return}let m=Hs(`materials/data/3d_results/${encodeURIComponent(e)}.json`),d=g?Hs(`materials/data/metrics/${e}.json`):Promise.resolve(void 0);m.catch(()=>{}),d.catch(()=>{});let v=await Hs("materials/data/snapshot-videos.json"),y=v.find(O=>O.id===e);if(!y||y.alignmentError)throw new Error(y?.alignmentError||`Missing snapshot swing ${e}`);let _=await Hs(y.sync),w={},E=[],A=[],T=new Set,b=y.views.map(O=>({name:O.name,ready:()=>!1})),M=!1;for(let O of y.views){let q=ir("video");q.muted=q.defaultMuted=!0,q.playsInline=!0,q.preload="auto",q.setAttribute("muted",""),q.setAttribute("playsinline",""),q.setAttribute("aria-hidden","true"),q.tabIndex=-1,O.imageSize&&(q.dataset.sourceWidth=String(O.imageSize[0]),q.dataset.sourceHeight=String(O.imageSize[1])),w[O.name]=q,h.append(q)}let[C,F]=await Promise.all([d,m]),V=await Zp(l,e,{...t,joints:t.joints??["golf_club_head"],range:[0,y.frames-1],fps:y.fps},{poseData:F,showCameras:!0,autoPlay:!1,cameraVideos:w,hoganPlanes:f,defaultZoomScale:r==="banner-club"?2.5:g==="hip-translation"?10.5:1.25,measurementMetrics:C,measurementFeature:g,showRawDetections:x,compositeDetections:r==="banner-club"});y.views.forEach((O,q)=>{let G=w[O.name];x&&Hs(`materials/data/2d_detections/${e}/${O.name}.json`).then(Ae=>{M||(V.setRawDetections(O.name,{...Ae,pred:_.mapping[O.name].map(ae=>Ae.pred[ae])}),T.add(O.name))}).catch(Ae=>console.warn("Snapshot 2D overlay unavailable",Ae)),Hs(O.timing||O.src+".frames.json").then(Ae=>{if(M)return;A[q]=Ae;let ae=null;E[q]=Kp(G,{getTimes:()=>A[q],onRequest:()=>{},onSettled:Ve=>{ae=Ve},requirePresentedFrame:!0}),Object.assign(b[q],{ready:()=>G.readyState>=2&&!G.error&&(!x||T.has(O.name)),decode:async Ve=>(ae=null,E[q].request(Ve),await E[q].whenIdle(),ae),reset:()=>E[q].reset()})}).catch(Ae=>console.warn("Snapshot video timing unavailable",Ae)),G.addEventListener("error",()=>console.warn(`Snapshot video unavailable: ${O.name}`))}),l.querySelector("h4")?.remove();for(let[O,q]of c)O.disabled=!1,O.onclick=()=>{V.setView(q),c.forEach(([G,Ae])=>G.setAttribute("aria-pressed",String(q===Ae)))};u.remove(),i.dataset.ready="true";let Y=!1,X=!1,I=()=>{if(!(M||X||!Y||window.previewPaused)){X=!0;for(let O of y.views){let q=w[O.name];q.src=O.src,q.load()}}},Q=O=>{O.source!==parent||O.data?.type!=="preview-visibility"||!O.data.visible||requestAnimationFrame(()=>requestAnimationFrame(I))};window.addEventListener("message",Q),requestAnimationFrame(()=>requestAnimationFrame(()=>{Y=!0,I()}));let[W,B]=t.range?.map((O,q)=>O===null?q?y.frames-1:0:O)??[0,y.frames-1],H=0,k,z=!1,te,U=new URLSearchParams(location.search).has("snapshotPerf"),j=[],ee,xe,ie=zh({streams:b,mapping:_.mapping,present:(O,q)=>{if(!M&&(xe=performance.now(),V.presentFrame(O,q),i.dataset.frame=String(O),U)){let G=performance.now();if(ee!==void 0&&j.push({gap:G-ee,render:G-xe,matched:q.length}),ee=G,j.length>120&&j.shift(),j.length&&j.length%12===0){let Ae=j.map(Ve=>Ve.gap).sort((Ve,ke)=>Ve-ke),ae=j.map(Ve=>Ve.render).sort((Ve,ke)=>Ve-ke);i.dataset.playbackStats=JSON.stringify({samples:j.length,medianGap:Ae[Math.floor(Ae.length*.5)],p95Gap:Ae[Math.floor(Ae.length*.95)],medianRender:ae[Math.floor(ae.length*.5)],matched:q.length})}}},onDrop:(O,q)=>console.warn(`Snapshot camera withdrawn until ready: ${O}`,q)}),ne=new IntersectionObserver(O=>{z=O[0].isIntersecting});ne.observe(i);let Ee=()=>{M||(M=!0,window.removeEventListener("message",Q),ne.disconnect(),ie.dispose(),V.dispose(),Object.values(w).forEach(O=>{O.pause(),O.removeAttribute("src"),O.load(),O.remove()}))};function de(O){if(M)return;if(!i.isConnected){Ee();return}let q=z&&!i.inert&&!document.hidden&&!window.previewPaused;if(q){k!==void 0&&!ie.busy&&(H+=Math.min(O-k,1e3/y.fps)*y.fps/1e3);let G=W+Math.floor(H)%(B-W+1);G!==te&&!ie.busy&&(te=G,ie.advance(G))}q||(ee=void 0),k=q?O:void 0,M||requestAnimationFrame(de)}return requestAnimationFrame(de),Ee}window.previewPaused=window.parent!==window;window.addEventListener("pointermove",i=>{i.pointerType==="mouse"&&parent.postMessage({type:"preview-pointer",x:i.clientX,y:i.clientY,pointerType:i.pointerType},location.origin)},{capture:!0,passive:!0});window.addEventListener("message",i=>{i.source===parent&&i.data?.type==="preview-visibility"&&(window.previewPaused=!i.data.visible)});try{await Qp(document.getElementById("feature-card"),"00",{range:[0,null]},"Absolute hip, shoulder rotations and x factor","feature-2");let i=document.querySelector(".snapshot-overview-scene"),e=document.createElement("div");e.className="preview-measurement-layer",e.append(...i.querySelectorAll(".rotation-angle-labels,.snapshot-rotation-plots")),i.append(e),requestAnimationFrame(()=>requestAnimationFrame(()=>parent.postMessage({type:"preview-ready"},location.origin)))}catch(i){document.getElementById("feature-card").textContent="Preview unavailable. Open the project to explore the demo.",console.error(i)}
