// Collision feedback lives beside the ornament, never inside its artwork/effects.
export function installOrnamentImpact(wrapper,scene=wrapper.parentElement){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const bursts=new Set();let lastImpact=-Infinity;
  function trigger({kind='ornament',speed,nx,ny,x,y,impactTime}){
    const now=performance.now();
    if(speed<60||now-lastImpact<45||document.hidden)return;
    lastImpact=now;
    const intensity=Math.min(1,speed/1000),half=wrapper.offsetWidth/2;
    const burst=document.createElement('span');burst.className='ornament-impact';
    burst.setAttribute('aria-hidden','true');
    const wall=kind==='wall';
    burst.style.left=`${wall?x:half+nx*half*.85}px`;burst.style.top=`${wall?y:half+ny*half*.85}px`;
    (wall?scene:wrapper).append(burst);bursts.add(burst);
    const animations=[];
    const flash=document.createElement('i');flash.className='ornament-impact-flash';burst.append(flash);
    animations.push(flash.animate([
      {opacity:.45+intensity*.5,transform:'translate(-50%,-50%) scale(1)'},
      {opacity:0,transform:`translate(-50%,-50%) scale(${reduced.matches?1:1.2+intensity*.4})`}
    ],{duration:reduced.matches?100:90,easing:'ease-out',fill:'forwards'}));
    if(!reduced.matches){
      // Wall particles spray back into the scene from a fixed contact location.
      const direction=Math.atan2(wall?-ny:ny,wall?-nx:nx);
      const count=12+Math.round(intensity*8);
      for(let i=0;i<count;i++){
        const spark=document.createElement('i');spark.className='ornament-impact-spark';burst.append(spark);
        const random=salt=>{
          const value=Math.sin((i+1)*127.1+now*.01+salt*311.7)*43758.5453;
          return value-Math.floor(value);
        };
        spark.style.background=random(1)<.15?'var(--accent)':'#edfff2';
        spark.style.width=`${2+Math.pow(random(2),1.5)*7}px`;
        spark.style.height=`${1+random(3)*1}px`;
        const angle=direction+(random(4)-.5)*2.7;
        const distance=(45+intensity*120)*(.25+Math.pow(random(5),1.4)*.75);
        const phase=random(6)*Math.PI*2;
        const curl=distance*(.05+random(7)*.09);
        const gravity=4+random(8)*12;
        const path=t=>{
          const travel=(1-Math.exp(-5.5*t))/(1-Math.exp(-5.5));
          const wander=Math.sin(Math.PI*t)*(1-Math.exp(-8*t))*Math.sin(t*Math.PI*1.5+phase)*curl;
          return {x:Math.cos(angle)*distance*travel-Math.sin(angle)*wander,
            y:Math.sin(angle)*distance*travel+Math.cos(angle)*wander+gravity*t*t};
        };
        const keyframes=Array.from({length:19},(_,step)=>{
          const t=step/18,point=path(t),next=path(t+.001);
          const heading=Math.atan2(next.y-point.y,next.x-point.x);
          return {offset:t,opacity:t<.18?1:Math.pow((1-t)/.82,1.05),
            transform:`translate(${point.x}px,${point.y}px) rotate(${heading}rad) scaleX(${1.25-1.1*t})`};
        });
        animations.push(spark.animate(keyframes,{duration:380+random(9)*260,easing:'linear',fill:'forwards'}));
      }
    }
    // Physics and sparks use the same timestamp, including substeps between paints.
    // Otherwise WAAPI can begin on the following frame, after the visible rebound.
    const timelineTime=document.timeline?.currentTime;
    if(typeof timelineTime==='number'){
      const start=Number.isFinite(impactTime)?Math.min(impactTime,timelineTime):timelineTime;
      for(const animation of animations)animation.startTime=start;
    }
    Promise.allSettled(animations.map(animation=>animation.finished)).then(()=>{burst.remove();bursts.delete(burst);});
  }
  return {trigger,destroy(){for(const burst of bursts){for(const animation of burst.getAnimations({subtree:true}))animation.cancel();burst.remove();}bursts.clear();}};
}
