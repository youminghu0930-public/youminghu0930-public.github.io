// Relocation owns only this outer wrapper. The ornament inside is untouched.
export function installOrnamentDrag({button:wrapper}) {
  const controller=new AbortController(),signal=controller.signal;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let position={x:0,y:0},manual=false,press=null,velocity={x:0,y:0};
  let frame=0,lastTime=0,suppressClick=false;
  const paint=()=>{wrapper.style.translate=`${position.x}px ${position.y}px`;};
  function stop(){cancelAnimationFrame(frame);frame=0;lastTime=0;velocity={x:0,y:0};}
  function tick(now){
    frame=0;
    const dt=Math.max(0,now-lastTime)/1000;lastTime=now;
    const decay=Math.exp(-dt/.75);
    position.x+=velocity.x*.75*(1-decay);
    position.y+=velocity.y*.75*(1-decay);
    velocity.x*=decay;velocity.y*=decay;paint();
    if(Math.hypot(velocity.x,velocity.y)>.1&&!reduced.matches)frame=requestAnimationFrame(tick);
    else stop();
  }
  function move(event){
    if(!press||event.pointerId!==press.id)return;
    // Recover when a browser/window transition swallowed the original pointerup.
    if(event.pointerType==='mouse'&&event.buttons===0){release({...event,type:'pointerup',pointerId:event.pointerId,clientX:event.clientX,clientY:event.clientY,timeStamp:event.timeStamp});return;}
    const dx=event.clientX-press.lastX,dy=event.clientY-press.lastY;
    if(!dx&&!dy)return;
    const dt=Math.max(1,Math.min(60,event.timeStamp-press.lastTime))/1000;
    // The newest movement is authoritative, even after a complete reversal.
    press.vx=dx/dt;press.vy=dy/dt;
    press.lastX=event.clientX;press.lastY=event.clientY;press.lastTime=event.timeStamp;
    press.dragging=true;manual=true;suppressClick=true;wrapper.dataset.dragging='true';
    position.x+=dx;position.y+=dy;paint();
  }
  function release(event){
    if(!press||event.pointerId!==press.id)return;
    const active=press;
    if(event.type==='pointerup'&&active.dragging){
      // Apply the final location, but mouse-up jitter must not replace throw velocity.
      if(Number.isFinite(event.clientX)&&Number.isFinite(event.clientY)){
        position.x+=event.clientX-active.lastX;position.y+=event.clientY-active.lastY;
      }
      const idle=Math.max(0,event.timeStamp-active.lastTime);
      const fade=Math.exp(-idle/250);
      if(!reduced.matches){
        // Motion's power .8 and time constant .75s, integrated as velocity decay.
        velocity={x:active.vx*.8/.75*fade,y:active.vy*.8/.75*fade};
        lastTime=performance.now();frame=requestAnimationFrame(tick);
      }
    }
    press=null;delete wrapper.dataset.dragging;
    if(wrapper.hasPointerCapture(active.id))wrapper.releasePointerCapture(active.id);
    paint();
  }
  wrapper.addEventListener('pointerdown',event=>{
    if(!event.isPrimary||(event.pointerType==='mouse'&&event.button!==0))return;
    if(press)release({pointerId:press.id,type:'pointercancel'});
    event.preventDefault();stop();suppressClick=false;
    press={id:event.pointerId,lastX:event.clientX,lastY:event.clientY,lastTime:event.timeStamp,vx:0,vy:0,dragging:false};
    wrapper.setPointerCapture(event.pointerId);
  },{signal});
  // Window capture survives crossing animated artwork and unexpected capture loss.
  window.addEventListener('pointermove',move,{capture:true,signal});
  for(const type of ['pointerup','pointercancel'])window.addEventListener(type,release,{capture:true,signal});
  window.addEventListener('blur',()=>{if(press)release({pointerId:press.id,type:'pointercancel'});},{signal});
  wrapper.addEventListener('click',event=>{
    if(!suppressClick||event.detail===0)return;
    event.preventDefault();event.stopImmediatePropagation();suppressClick=false;
  },{capture:true,signal});
  wrapper.addEventListener('dragstart',event=>event.preventDefault(),{signal});
  reduced.addEventListener('change',()=>{if(reduced.matches)stop();},{signal});
  return {
    draw(x,y){if(!manual&&!press){position={x,y};paint();}return false;},
    destroy(){const id=press?.id;press=null;stop();controller.abort();if(id!==undefined&&wrapper.hasPointerCapture(id))wrapper.releasePointerCapture(id);delete wrapper.dataset.dragging;}
  };
}
