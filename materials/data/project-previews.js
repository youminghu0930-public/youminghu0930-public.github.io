import { createBannerPreview } from './banner-preview.js';
import { design } from '../../design-settings.js';

export function positionProjectPreview({x,y,width,height,viewportWidth,viewportHeight,margin,gap}) {
  const right=x+gap, left=x-gap-width;
  const above=y-gap-height, below=y+gap;
  return {
    left:Math.max(margin,Math.min(viewportWidth-width-margin,right+width<=viewportWidth-margin?right:left)),
    top:Math.max(margin,Math.min(viewportHeight-height-margin,above>=margin?above:below))
  };
}

export function installProjectPreviews(main, projects) {
  const controller = new AbortController();
  const {signal} = controller;
  const preview = document.createElement('div');
  preview.className = 'project-hover-preview';
  preview.setAttribute('aria-hidden','true');
  const image = document.createElement('img');
  image.alt=''; image.width=800; image.height=600;
  const canvas=document.createElement('canvas');
  canvas.className='project-preview-canvas';canvas.hidden=true;
  canvas.width=800;canvas.height=600;
  preview.append(image,canvas); main.append(preview);
  const banners=new Map();
  const inlinePreviews=[];
  // Inline previews use their own player so desktop hover playback stays independent.
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries) {
      const item=inlinePreviews.find(item=>item.node===entry.target);
      if(!item)continue;
      item.visible=entry.isIntersecting;
      updateInline(item);
    }
  },{threshold:.05});
  function updateInline(item) {
    if(getComputedStyle(item.node).display!=='none' && item.visible && !document.hidden) {
      if(!item.player && item.config)item.player=createBannerPreview(item.canvas,item.config);
      item.player?.play();
    } else item.player?.pause();
  }
  function updateInlinePreviews(){inlinePreviews.forEach(updateInline);}
  window.addEventListener('resize',updateInlinePreviews,{signal,passive:true});
  document.addEventListener('visibilitychange',updateInlinePreviews,{signal});
  let activeBanner=null;
  let frame=0, point=null, current=null, row=null, spring=null, lastTime=0, portrait=false;
  function place(time) {
    frame=0;
    if(!point || !row) return;
    const settings=design.effects;
    const {projectPreviewMargin:margin,projectPreviewGap:gap,projectPreviewWidth:preferred}=settings;
    const bounds=row.getBoundingClientRect();
    const side='above';
    const rowGap=settings.projectPreviewRowGap;
    // Preview dimensions depend only on the design setting and viewport width,
    // never on nearby rows or the amount of space above the hovered item.
    const width=Math.min(portrait?settings.projectPreviewPortraitWidth:preferred,innerWidth-2*margin);
    preview.style.width=`${width}px`;
    const height=preview.offsetHeight;
    const maxY=bounds.top-rowGap-height;
    const maxTravel=bounds.height*settings.projectPreviewRowTravelRatio;
    const minY=maxY-maxTravel;
    const target=positionProjectPreview({...point,width:preview.offsetWidth,height,viewportWidth:innerWidth,viewportHeight:innerHeight,margin,gap});
    // Start next to the row, rise quickly, then taper the travel logarithmically.
    const controlTop=bounds.top+bounds.height*settings.projectPreviewControlTopRatio;
    const controlBottom=bounds.top+bounds.height*settings.projectPreviewControlBottomRatio;
    const controlHeight=controlBottom-controlTop;
    const upwardProgress=Math.max(0,Math.min(1,(controlBottom-point.y)/Math.max(1,controlHeight)));
    const curve=settings.projectPreviewVerticalCurve;
    const eased=Math.log1p(curve*upwardProgress)/Math.log1p(curve);
    target.top=maxY-maxTravel*eased;
    if(!spring || spring.side!==side) spring={x:target.left,y:target.top,vx:0,vy:0,side};
    const dt=Math.min(32,lastTime?time-lastTime:16)/1000;
    lastTime=time;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spring.x=target.left;spring.y=target.top;spring.vx=spring.vy=0;
    } else {
      // Small integration steps keep the spring stable after slow frames.
      const steps=Math.ceil(dt/.008), step=dt/steps;
      for(let i=0;i<steps;i++) {
        spring.vx+=((target.left-spring.x)*settings.projectPreviewSpring-spring.vx*settings.projectPreviewDamping)*step;
        spring.vy+=((target.top-spring.y)*settings.projectPreviewSpring-spring.vy*settings.projectPreviewDamping)*step;
        spring.x+=spring.vx*step;spring.y+=spring.vy*step;
      }
    }
    spring.x=Math.max(margin,Math.min(innerWidth-preview.offsetWidth-margin,spring.x));
    spring.y=Math.max(minY,Math.min(maxY,spring.y));
    preview.style.left=`${spring.x}px`;
    preview.style.top=`${spring.y}px`;
    preview.classList.add('is-visible');
    if(Math.abs(spring.x-target.left)+Math.abs(spring.y-target.top)+Math.abs(spring.vx)+Math.abs(spring.vy)>.2) schedule();
    else lastTime=0;
  }
  function schedule() {if(!frame)frame=requestAnimationFrame(place);}
  function hide() {activeBanner?.pause();point=null;current=null;row=null;spring=null;lastTime=0;cancelAnimationFrame(frame);frame=0;preview.classList.remove('is-visible');}
  image.addEventListener('load',()=>{if(point)schedule();},{signal});
  for(const project of projects) {
    const action = document.getElementById(project.id).querySelector('.project-row-link');
    const inline=document.createElement('div');
    inline.className='project-inline-preview';
    inline.style.setProperty('--project-preview-aspect',String(project.previewAspectRatio || 4/3));
    const poster=document.createElement('img');
    poster.src=project.banner?.poster || project.image;
    poster.alt=project.imageAlt || `${project.title} preview`;
    poster.loading='lazy';poster.decoding='async';
    const inlineCanvas=document.createElement('canvas');
    inlineCanvas.className='project-preview-canvas';inlineCanvas.hidden=true;
    inlineCanvas.setAttribute('aria-hidden','true');
    inline.append(poster,inlineCanvas);action.prepend(inline);
    inlinePreviews.push({node:inline,canvas:inlineCanvas,config:project.banner,player:null,visible:false});
    observer.observe(inline);
    action.addEventListener('pointermove', event => {
      if(event.pointerType!=='mouse' || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
      if(current!==project.id) {
        current=project.id; image.src=project.image;
        portrait=(project.previewAspectRatio || 4/3)<1;
        preview.style.setProperty('--project-preview-aspect',String(project.previewAspectRatio || 4/3));
        activeBanner?.pause();canvas.hidden=true;
        if(project.banner) {
          if(!banners.has(project.id))banners.set(project.id,createBannerPreview(canvas,project.banner));
          activeBanner=banners.get(project.id);activeBanner.play();
        } else activeBanner=null;
      }
      row=action;
      point={x:event.clientX,y:event.clientY};
      schedule();
    },{signal});
    action.addEventListener('pointerleave',hide,{signal});
    action.addEventListener('click',hide,{signal});
  }
  window.addEventListener('scroll',hide,{signal,passive:true});
  window.addEventListener('resize',hide,{signal});
  window.addEventListener('blur',hide,{signal});
  return ()=>{hide();observer.disconnect();for(const item of inlinePreviews){item.player?.destroy();item.node.remove();}for(const banner of banners.values())banner.destroy();controller.abort();preview.remove();};
}
