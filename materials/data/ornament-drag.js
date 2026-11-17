// Relocation owns only this outer wrapper. The ornament inside is untouched.
export function installOrnamentDrag({button:wrapper,getBounds=()=>null,getAreaTop=()=>0,settings={},collisionWorld=null,getRadius=()=>44,onImpact=()=>{}}) {
  const controller=new AbortController(),signal=controller.signal;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let position={x:0,y:0},manual=false,press=null,velocity={x:0,y:0};
  let frame=0,lastTime=0,suppressClick=false,inTick=false,simulationTime=null;
  let scrollOffset=0,scrollVelocity=0,areaTop=getAreaTop(),initialized=false;
  const restitution=settings.ornamentBounceRestitution??.72;
  const stiffness=settings.ornamentSpringStiffness??65,damping=settings.ornamentSpringDamping??9;
  const maxScrollOffset=settings.ornamentSpringMaxOffset??64;
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  function verticalResponse(){
    const bounds=getBounds();if(!bounds)return {tempo:1,gain:1};
    const y=position.y+scrollOffset,min=bounds.y[0],max=bounds.y[1];
    const level=clamp((y-min)/Math.max(1,max-min),0,1);
    const edge=clamp(Math.min(y-min,max-y)/80,0,1);
    const tempo=clamp((settings.ornamentTempoTopFactor??.28)+((settings.ornamentTempoBottomFactor??2.8)-(settings.ornamentTempoTopFactor??.28))*Math.pow(level,settings.ornamentTempoCurve??1.7),.45,2.4);
    return {tempo,gain:(.4+.9*level)*(.75+.25*edge)};
  }
  function wallImpact(axis,edge){
    const nx=axis==='x'?(edge==='min'?-1:1):0,ny=axis==='y'?(edge==='min'?-1:1):0;
    const bounds=getBounds(),radius=getRadius(),half=(wrapper.offsetWidth??radius*2)/2;
    const x=axis==='x'?bounds.x[edge==='min'?0:1]:clamp(position.x,...bounds.x);
    const y=axis==='y'?bounds.y[edge==='min'?0:1]:clamp(position.y+scrollOffset,...bounds.y);
    onImpact({kind:'wall',impactTime:simulationTime??performance.now(),speed:Math.abs(velocity[axis]),nx,ny,x:x+half+nx*radius,y:y+half+ny*radius});
  }
  function contain(bounce=false){
    const bounds=getBounds();if(!bounds)return;
    for(const axis of ['x','y']){
      const min=bounds[axis][0],max=bounds[axis][1];
      if(max<=min){position[axis]=min;velocity[axis]=0;continue;}
      if(!bounce){position[axis]=clamp(position[axis],min,max);continue;}
      while(position[axis]<min||position[axis]>max){
        if(position[axis]<min){wallImpact(axis,'min');position[axis]=min+(min-position[axis])*restitution;velocity[axis]=Math.abs(velocity[axis])*restitution;}
        else{wallImpact(axis,'max');position[axis]=max-(position[axis]-max)*restitution;velocity[axis]=-Math.abs(velocity[axis])*restitution;}
      }
    }
  }
  function wake(){if(!frame&&!inTick&&!press&&!reduced.matches){lastTime=performance.now();frame=requestAnimationFrame(tick);}}
  const paint=()=>{
    const bounds=getBounds();
    const y=bounds?clamp(position.y+scrollOffset,...bounds.y):position.y+scrollOffset;
    wrapper.style.translate=`${position.x}px ${y}px`;
  };
  function stop(){cancelAnimationFrame(frame);frame=0;lastTime=0;velocity={x:0,y:0};}
  function tick(now){
    frame=0;inTick=true;
    const elapsed=Math.max(0,now-lastTime)/1000;lastTime=now;
    // Small physics steps keep spring and wall collisions stable after slow frames.
    const stepSize=Math.min(1/120,getRadius()/Math.max(1,Math.hypot(velocity.x,velocity.y))/2);
    const steps=Math.max(1,Math.ceil(elapsed/stepSize)),dt=elapsed/steps;
    const {tempo}=verticalResponse();
    for(let i=0;i<steps;i++){
      simulationTime=now-(steps-i-1)*dt*1000;
      const decay=Math.exp(-dt/.75);
      position.x+=velocity.x*.75*(1-decay);
      position.y+=velocity.y*.75*(1-decay);
      velocity.x*=decay;velocity.y*=decay;contain(true);
      scrollVelocity+=(-stiffness/(tempo*tempo)*scrollOffset-damping/tempo*scrollVelocity)*dt;
      scrollOffset+=scrollVelocity*dt;
      collisionWorld?.resolve(api,simulationTime);
    }
    simulationTime=null;
    if(Math.abs(scrollOffset)<.05&&Math.abs(scrollVelocity)<.5)scrollOffset=scrollVelocity=0;
    paint();inTick=false;
    if((Math.hypot(velocity.x,velocity.y)>.1||scrollOffset||scrollVelocity)&&!reduced.matches)frame=requestAnimationFrame(tick);
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
    position.x+=dx;position.y+=dy;contain();paint();collisionWorld?.resolve(api);
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
    contain();press=null;delete wrapper.dataset.dragging;
    if(wrapper.hasPointerCapture(active.id))wrapper.releasePointerCapture(active.id);
    paint();
  }
  wrapper.addEventListener('pointerdown',event=>{
    if(!event.isPrimary||(event.pointerType==='mouse'&&event.button!==0))return;
    if(press)release({pointerId:press.id,type:'pointercancel'});
    event.preventDefault();position.y+=scrollOffset;scrollOffset=scrollVelocity=0;stop();contain();paint();suppressClick=false;
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
  window.addEventListener('scroll',()=>{
    const top=getAreaTop(),delta=top-areaTop;areaTop=top;
    if(!delta)return;
    if(press){position.y-=delta;contain();paint();return;}
    if(reduced.matches)return;
    scrollOffset=clamp(scrollOffset-delta*verticalResponse().gain,-maxScrollOffset,maxScrollOffset);
    paint();wake();
  },{passive:true,signal});
  window.addEventListener('resize',()=>{contain();paint();},{signal});
  reduced.addEventListener('change',()=>{if(reduced.matches)stop();},{signal});
  const api={
    body(){
      if(!initialized)return null;
      const radius=getRadius(),half=(wrapper.offsetWidth??radius*2)/2,bounds=getBounds();
      const y=bounds?clamp(position.y+scrollOffset,...bounds.y):position.y+scrollOffset;
      return {x:position.x+half,y:y+half,radius,
        vx:press?press.vx:velocity.x,vy:press?press.vy:velocity.y+scrollVelocity,
        inverseMass:press?0:1/(radius*radius)};
    },
    collide(hit){
      if(hit.impactSpeed)onImpact({kind:'ornament',impactTime:hit.impactTime,speed:hit.impactSpeed,nx:hit.nx,ny:hit.ny});
      if(press)return;
      manual=true;
      position.x+=hit.dx;position.y+=scrollOffset+hit.dy;scrollOffset=scrollVelocity=0;
      velocity={x:hit.vx,y:hit.vy};contain();paint();wake();
    },
    draw(x,y){initialized=true;if(!manual&&!press){position={x,y};paint();}return false;},
    destroy(){const id=press?.id;press=null;stop();removeBody?.();controller.abort();if(id!==undefined&&wrapper.hasPointerCapture(id))wrapper.releasePointerCapture(id);delete wrapper.dataset.dragging;}
  };
  const removeBody=collisionWorld?.add(api);
  return api;
}
