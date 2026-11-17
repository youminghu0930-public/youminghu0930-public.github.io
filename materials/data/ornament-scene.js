// Repositioning ornaments belong to the landing's coordinate space, not the page.
export function installOrnamentScene({hero,createOrnament,kinds,design}) {
  const settings=design.effects;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  const layer=document.createElement('div');
  layer.className='landing-ornament-scene';
  const items=kinds.map((kind,index)=>{
    const button=createOrnament(kind);layer.append(button);
    return {button,index,x:null,y:null,localY:null,exitX:null,exitY:null,manual:null,dragging:false,suppressClick:false,clickTimer:0,vx:0,vy:0,scrollOffset:0,scrollVelocity:0};
  });
  hero.append(layer);
  let frame=0,lastTime=0,lastAreaTop=null,disposed=false,exiting=false;
  const controller=new AbortController();
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  function draw(time) {
    frame=0;
    if(disposed || document.hidden) return;
    const bounds=hero.getBoundingClientRect(), area=layer.getBoundingClientRect();
    if(bounds.bottom<=0 || bounds.top>=innerHeight) {lastTime=0;lastAreaTop=area.top;return;}
    const scrollDelta=lastAreaTop===null?0:area.top-lastAreaTop;lastAreaTop=area.top;
    const title=hero.querySelector('h1');
    const words=Array.from(title.querySelectorAll('.title-word'));
    const rects=words.length?words.map(word=>word.getBoundingClientRect()):[title.getBoundingClientRect()];
    const heading={left:Math.min(...rects.map(r=>r.left)),right:Math.max(...rects.map(r=>r.right)),top:Math.min(...rects.map(r=>r.top)),bottom:Math.max(...rects.map(r=>r.bottom))};
    const exitThreshold=mobile.matches?82:90;
    if(!exiting && heading.bottom<=exitThreshold) {
      exiting=true;
      for(const item of items) {
        item.exitX=item.x;
        item.exitY=item.localY;
      }
    } else if(exiting && heading.bottom>exitThreshold+60) exiting=false;
    const delta=lastTime?Math.min(40,time-lastTime):16;lastTime=time;
    let moving=false;
    for(const item of items) {
      const size=item.button.offsetWidth, radius=size*settings.ornamentSceneFootprint;
      const left=radius+8,right=Math.max(left,innerWidth-radius-18);
      const top=Math.min(innerHeight/2,(mobile.matches?92:100)+radius);
      const bottom=Math.max(top,innerHeight-radius-22);
      // Once there is insufficient visible room, the section carries the items
      // offscreen naturally; they never cross its bottom edge into the stripe.
      let target;
      if(item.manual) {
        const visual=item.button.getBoundingClientRect();
        const insetX=visual.width/2+8,insetY=visual.height/2+8;
        const maxX=Math.max(insetX,area.width-insetX),maxY=Math.max(insetY,area.height-insetY);
        const minY=Math.min(maxY,80+insetY);
        let localX=clamp(item.manual.x*area.width,insetX,maxX),localY=clamp(item.manual.y*area.height,minY,maxY);
        if(reduced.matches||item.dragging)item.vx=item.vy=0;
        else {
          // Integrate drag exactly so coasting feels the same at different frame rates.
          const friction=settings.ornamentCoastFriction;
          const decay=Math.exp(-friction*delta/1000),travel=(1-decay)/friction;
          localX+=item.vx*travel;localY+=item.vy*travel;
          item.vx*=decay;item.vy*=decay;
          const rebound=settings.ornamentBounceRestitution;
          if(maxX===insetX){localX=insetX;item.vx=0;}
          else if(localX<insetX){localX=insetX+(insetX-localX);item.vx=Math.abs(item.vx)*rebound;}
          else if(localX>maxX){localX=maxX-(localX-maxX);item.vx=-Math.abs(item.vx)*rebound;}
          if(maxY===minY){localY=minY;item.vy=0;}
          else if(localY<minY){localY=minY+(minY-localY);item.vy=Math.abs(item.vy)*rebound;}
          else if(localY>maxY){localY=maxY-(localY-maxY);item.vy=-Math.abs(item.vy)*rebound;}
          if(Math.hypot(item.vx,item.vy)>settings.ornamentRestSpeed)moving=true;
          else item.vx=item.vy=0;
        }
        localX=clamp(localX,insetX,maxX);localY=clamp(localY,minY,maxY);
        item.manual={x:localX/Math.max(1,area.width),y:localY/Math.max(1,area.height)};
        target={x:area.left+localX,y:area.top+localY};
      } else if(!exiting) {
        target={x:clamp(item.index?heading.right+radius*.65:heading.left-radius*.6,left,right),
          y:clamp(item.index?heading.bottom+radius*.45:heading.top-radius*.6,bounds.top+radius+8,Math.max(bounds.top+radius+8,bottom))};
        if(mobile.matches) {
          const gap=settings.ornamentMobileContentGap;
          if(item.index) {
            const beside=heading.right+radius+gap;
            const details=hero.querySelector('.hero-details')?.getBoundingClientRect();
            target.x=Math.min(beside,right);
            target.y=beside<=right
              ? Math.min(heading.bottom-radius*.15,(details?.top??heading.bottom+16)-radius-gap)
              : heading.top-radius-gap;
          } else {
            target.x=clamp(heading.left,left,right);
            target.y=heading.top-radius-gap;
          }
          target.y=Math.max(bounds.top+radius+8,target.y);
        }
      } else {
        // Keep the last section-relative position. There are no new lower
        // destinations during exit; scrolling simply carries it upward.
        target={x:item.exitX??clamp(item.index?heading.right:heading.left,left,right),
          y:item.exitY===null?heading.top:bounds.top+item.exitY};
      }
      const x=target.x,y=target.y;
      // Give higher and lower ornaments different response tempos. Near an
      // edge, shorten the response slightly so the motion clears it naturally.
      const visibleTop=Math.max(0,bounds.top);
      const visibleBottom=Math.max(visibleTop+1,Math.min(innerHeight,bounds.bottom));
      const level=clamp((y-visibleTop)/(visibleBottom-visibleTop),0,1);
      const edgeDistance=Math.max(0,Math.min(y-visibleTop-radius,bounds.bottom-y-radius));
      const edgeProximity=1-clamp(edgeDistance/settings.ornamentTempoEdgeRange,0,1);
      const tempoLevel=Math.pow(level,settings.ornamentTempoCurve);
      const verticalFactor=settings.ornamentTempoTopFactor+(settings.ornamentTempoBottomFactor-settings.ornamentTempoTopFactor)*tempoLevel;
      const response=settings.ornamentSceneResponseMs*verticalFactor*(1-settings.ornamentTempoEdgeBoost*edgeProximity);
      const blend=reduced.matches?1:1-Math.exp(-delta/response);
      if(item.x===null||item.manual){item.x=x;item.y=y;}
      else {item.x+=(x-item.x)*blend;item.y+=(y-item.y)*blend;}
      if(Math.hypot(x-item.x,y-item.y)>.25)moving=true;
      item.size=size;item.radius=radius;
      item.localY=item.y-bounds.top;
    }
    // Move the whole pair upward together as the stripe approaches. Independent
    // clamps collapsed their separation; a shared offset preserves it exactly.
    const automatic=items.filter(item=>!item.manual);
    const lowest=automatic.length?Math.max(...automatic.map(item=>item.y+item.radius+8)):bounds.bottom;
    const distance=lowest-bounds.bottom;
    const softness=settings.ornamentExitSoftness;
    const exitOffset=(distance+Math.hypot(distance,softness))/2;
    for(const item of items) {
      if(item.manual&&!item.dragging&&!reduced.matches){
        const dt=delta/1000;
        item.scrollOffset=clamp(item.scrollOffset-scrollDelta,-settings.ornamentSpringMaxOffset,settings.ornamentSpringMaxOffset);
        item.scrollVelocity+=(-settings.ornamentSpringStiffness*item.scrollOffset-settings.ornamentSpringDamping*item.scrollVelocity)*dt;
        item.scrollOffset+=item.scrollVelocity*dt;
        if(Math.abs(item.scrollOffset)>.05||Math.abs(item.scrollVelocity)>.5)moving=true;
        else item.scrollOffset=item.scrollVelocity=0;
      }else item.scrollOffset=item.scrollVelocity=0;
      let displayY=item.manual?item.y+item.scrollOffset:item.y-exitOffset;
      if(item.manual){
        const inset=item.button.getBoundingClientRect().height/2+8;
        displayY=clamp(displayY,area.top+inset,Math.max(area.top+inset,area.bottom-inset));
      }
      item.button.style.translate=`${item.x-area.left-item.size/2}px ${displayY-area.top-item.size/2}px`;
    }
    if(moving)schedule();else lastTime=0;
  }
  function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(draw);}
  // Capture only ornament gestures; the rest of the landing keeps normal scrolling.
  for(const item of items) {
    const {button}=item;
    let press=null;
    button.addEventListener('pointerdown',event=>{
      if(!event.isPrimary||(event.pointerType==='mouse'&&event.button!==0))return;
      if(press)release({pointerId:press.id,type:'pointercancel',timeStamp:event.timeStamp});
      event.preventDefault();button.focus({preventScroll:true});
      clearTimeout(item.clickTimer);item.suppressClick=false;
      const rect=button.getBoundingClientRect();
      if(item.manual){
        const area=layer.getBoundingClientRect();
        item.x=rect.left+rect.width/2;item.y=rect.top+rect.height/2;
        item.manual={x:(item.x-area.left)/Math.max(1,area.width),y:(item.y-area.top)/Math.max(1,area.height)};
      }
      item.vx=item.vy=0;item.scrollOffset=item.scrollVelocity=0;
      press={id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,lastY:event.clientY,lastTime:event.timeStamp,vx:0,vy:0,
        offsetX:event.clientX-rect.left-rect.width/2,offsetY:event.clientY-rect.top-rect.height/2};
      button.setPointerCapture(event.pointerId);
    },{signal:controller.signal});
    button.addEventListener('pointermove',event=>{
      if(!press||press.id!==event.pointerId)return;
      if(!item.dragging&&Math.hypot(event.clientX-press.x,event.clientY-press.y)<5)return;
      const dt=Math.max(8,event.timeStamp-press.lastTime)/1000;
      press.vx=press.vx*.4+(event.clientX-press.lastX)/dt*.6;
      press.vy=press.vy*.4+(event.clientY-press.lastY)/dt*.6;
      press.lastX=event.clientX;press.lastY=event.clientY;press.lastTime=event.timeStamp;
      item.dragging=true;item.suppressClick=true;button.dataset.dragging='true';
      const area=layer.getBoundingClientRect(),visual=button.getBoundingClientRect();
      const insetX=visual.width/2+8,insetY=visual.height/2+8;
      const maxY=Math.max(insetY,area.height-insetY);
      const minY=Math.min(maxY,Math.max(insetY,80-area.top+insetY));
      const x=clamp(event.clientX-press.offsetX-area.left,insetX,Math.max(insetX,area.width-insetX));
      const y=clamp(event.clientY-press.offsetY-area.top,minY,maxY);
      item.manual={x:x/Math.max(1,area.width),y:y/Math.max(1,area.height)};
      schedule();
    },{signal:controller.signal});
    const release=event=>{
      if(!press||press.id!==event.pointerId)return;
      if(item.dragging&&event.type==='pointerup'&&!reduced.matches&&event.timeStamp-press.lastTime<100){
        const speed=settings.ornamentMaxVelocity,scale=settings.ornamentThrowVelocityScale;
        item.vx=clamp(press.vx*scale,-speed,speed);item.vy=clamp(press.vy*scale,-speed,speed);
      }
      press=null;item.dragging=false;delete button.dataset.dragging;schedule();
      if(button.hasPointerCapture(event.pointerId))button.releasePointerCapture(event.pointerId);
      // The release's synthetic click follows pointerup; suppress only that click.
      item.clickTimer=setTimeout(()=>{item.suppressClick=false;},0);
    };
    for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,release,{signal:controller.signal});
    for(const type of ['pointerup','pointercancel'])window.addEventListener(type,release,{capture:true,signal:controller.signal});
    window.addEventListener('blur',()=>{if(press)release({pointerId:press.id,type:'pointercancel',timeStamp:performance.now()});},{signal:controller.signal});
    button.addEventListener('click',event=>{
      if(!item.suppressClick)return;
      event.preventDefault();event.stopImmediatePropagation();item.suppressClick=false;
    },{capture:true,signal:controller.signal});
    button.addEventListener('dragstart',event=>event.preventDefault(),{signal:controller.signal});
  }
  window.addEventListener('scroll',schedule,{passive:true,signal:controller.signal});
  window.addEventListener('resize',schedule,{signal:controller.signal});
  document.addEventListener('visibilitychange',schedule,{signal:controller.signal});
  reduced.addEventListener('change',schedule,{signal:controller.signal});
  const observer=new ResizeObserver(schedule);observer.observe(hero);
  schedule();
  return {destroy(){disposed=true;cancelAnimationFrame(frame);controller.abort();observer.disconnect();items.forEach(item=>{clearTimeout(item.clickTimer);item.button.destroy();});layer.remove();}};
}
