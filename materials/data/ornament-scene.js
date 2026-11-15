// Repositioning ornaments belong to the landing's coordinate space, not the page.
export function installOrnamentScene({hero,createOrnament,kinds,design}) {
  const settings=design.effects;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  const layer=document.createElement('div');
  layer.className='landing-ornament-scene';
  const items=kinds.map((kind,index)=>{
    const button=createOrnament(kind);layer.append(button);
    return {button,index,x:null,y:null,localY:null,exitX:null,exitY:null};
  });
  hero.append(layer);
  let frame=0,lastTime=0,disposed=false,exiting=false;
  const controller=new AbortController();
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  function draw(time) {
    frame=0;
    if(disposed || document.hidden) return;
    const bounds=hero.getBoundingClientRect(), area=layer.getBoundingClientRect();
    if(bounds.bottom<=0 || bounds.top>=innerHeight) {lastTime=0;return;}
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
      if(!exiting) {
        target={x:clamp(item.index?heading.right+radius*.65:heading.left-radius*.6,left,right),
          y:clamp(item.index?heading.bottom+radius*.45:heading.top-radius*.6,bounds.top+radius+8,Math.max(bounds.top+radius+8,bottom))};
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
      if(item.x===null){item.x=x;item.y=y;}
      else {item.x+=(x-item.x)*blend;item.y+=(y-item.y)*blend;}
      if(Math.hypot(x-item.x,y-item.y)>.25)moving=true;
      item.size=size;item.radius=radius;
      item.localY=item.y-bounds.top;
    }
    // Move the whole pair upward together as the stripe approaches. Independent
    // clamps collapsed their separation; a shared offset preserves it exactly.
    const lowest=Math.max(...items.map(item=>item.y+item.radius+8));
    const distance=lowest-bounds.bottom;
    const softness=settings.ornamentExitSoftness;
    const exitOffset=(distance+Math.hypot(distance,softness))/2;
    for(const item of items) {
      const displayY=item.y-exitOffset;
      item.button.style.translate=`${item.x-area.left-item.size/2}px ${displayY-area.top-item.size/2}px`;
    }
    if(moving)schedule();else lastTime=0;
  }
  function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(draw);}
  window.addEventListener('scroll',schedule,{passive:true,signal:controller.signal});
  window.addEventListener('resize',schedule,{signal:controller.signal});
  document.addEventListener('visibilitychange',schedule,{signal:controller.signal});
  reduced.addEventListener('change',schedule,{signal:controller.signal});
  const observer=new ResizeObserver(schedule);observer.observe(hero);
  schedule();
  return {destroy(){disposed=true;cancelAnimationFrame(frame);controller.abort();observer.disconnect();items.forEach(item=>item.button.destroy());layer.remove();}};
}
