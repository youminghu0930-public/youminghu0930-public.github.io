import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
const source=await readFile(new URL('../materials/data/ornament-drag.js',import.meta.url),'utf8');
const {installOrnamentDrag}=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('relocation carries a complete ornament through catches, reversals, and release',()=>{
  let now=0,next=0;const frames=new Map(),events=new Map(),windowEvents=new Map();
  Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>now}});
  globalThis.requestAnimationFrame=f=>{frames.set(++next,f);return next};
  globalThis.cancelAnimationFrame=id=>frames.delete(id);
  globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
  globalThis.window={addEventListener(type,f){windowEvents.set(type,f)}};
  const wrapper={style:{},dataset:{},addEventListener(type,f){events.set(type,f)},setPointerCapture(){},hasPointerCapture(){return false}};
  const drag=installOrnamentDrag({button:wrapper});
  const fire=(type,x,y,time)=>{
    now=time;(windowEvents.get(type)||events.get(type))({type,clientX:x,clientY:y,timeStamp:time,pointerId:1,isPrimary:true,pointerType:'mouse',button:0,preventDefault(){}});
  };
  const step=time=>{now=time;const pending=[...frames.values()];frames.clear();pending.forEach(f=>f(time))};
  const x=()=>parseFloat(wrapper.style.translate);
  drag.draw(100,100);
  fire('pointerdown',100,100,0);fire('pointermove',180,100,40);
  assert.equal(x(),180,'wrapper must follow the pointer directly');
  fire('pointerup',180,100,40);step(140);assert(x()>180,'release must coast');
  const catchX=x();fire('pointerdown',catchX,100,140);
  assert.equal(frames.size,0,'pickup must cancel the old animation immediately');
  fire('pointermove',catchX-30,100,160);assert.equal(x(),catchX-30);
  drag.draw(500,500);assert.equal(x(),catchX-30,'scene positioning must not fight a held object');
  fire('pointermove',catchX+10,100,180);fire('pointerup',catchX+10,100,180);
  const releaseX=x();step(200);assert(x()>releaseX,'latest rightward reversal must replace leftward velocity');
  step(30000);assert.equal(frames.size,0,'friction must eventually stop the animation');
  fire('pointerdown',100,100,31000);fire('pointermove',100.5,100,36000);fire('pointerup',100.5,100,36000);
  const tiny=x();step(36100);assert(x()>tiny,'a gentle flick after holding must retain momentum');
  fire('pointerdown',100,100,36200);fire('pointermove',150,100,36220);fire('pointercancel',150,100,36220);
  assert.equal(frames.size,0,'cancel must not launch a throw');
  // A swallowed release must never leave all future pickups ignored.
  fire('pointerdown',100,100,37000);fire('pointermove',120,100,37020);
  fire('pointerdown',120,100,37100);fire('pointermove',100,100,37120);
  const recovered=x();fire('pointerup',100,100,37120);step(37220);
  assert(x()<recovered,'a new pickup must recover from a missed release and follow the new direction');
  drag.destroy();

  let areaTop=0;
  const bounded=installOrnamentDrag({button:wrapper,getBounds:()=>({x:[0,300],y:[0,300]}),getAreaTop:()=>areaTop});
  bounded.draw(260,150);
  fire('pointerdown',260,150,40000);fire('pointermove',280,150,40020);fire('pointerup',280,150,40020);
  step(40120);const afterImpact=x();assert(afterImpact<300,'wall must contain the ornament');
  step(40220);assert(x()<afterImpact,'wall collision must reverse momentum');
  step(60000);
  const y=()=>parseFloat(wrapper.style.translate.split(' ')[1]);
  const restY=y();areaTop=-40;windowEvents.get('scroll')();
  assert(y()>restY,'scroll must produce a visible lag/spring response');
  step(60100);assert.notEqual(y(),restY,'spring should settle gradually');
  step(70000);assert(Math.abs(y()-restY)<.1,'scroll spring must return to its resting position');
  fire('pointerdown',100,100,71000);fire('pointermove',1000,100,71020);assert.equal(x(),300);
  fire('pointermove',999,100,71040);assert.equal(x(),299,'reversing at a wall must respond immediately');
  fire('pointerup',999,100,71040);step(71140);assert(x()<299,'release away from a wall must retain momentum');
  bounded.destroy();
});
