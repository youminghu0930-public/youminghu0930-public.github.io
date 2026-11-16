import { createBannerPreview } from './banner-preview.js';
import { installPreviewPanZoom } from './preview-pan-zoom.js';
import { design } from '../../design-settings.js';

export function installProjectPreviews(main, projects) {
  const controller=new AbortController();
  const {signal}=controller;
  const mobile=matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  const items=[];
  function update(item) {
    const expanded=item.expanded;
    item.setHeaderExpanded(expanded);
    item.trigger.hidden=false;
    item.trigger.setAttribute('aria-label',`${expanded?'Collapse':'Expand'} ${item.name}`);
    item.trigger.setAttribute('aria-expanded',String(expanded));
    item.title.hidden=true;
    item.title.tabIndex=-1;
    item.title.setAttribute('aria-expanded',String(expanded));
    item.title.setAttribute('aria-label',`${expanded?'Collapse':'Expand'} ${item.name}`);
    item.action.classList.toggle('is-preview-expanded',expanded);
    item.wrapper.setAttribute('aria-hidden',String(!expanded));
    item.wrapper.inert=!expanded;
    if(expanded && item.visible && !document.hidden) {
      if(!item.player && item.config) {
        if(item.config.interactive) {
          const iframe=document.createElement('iframe');
          iframe.title='Interactive Golf True 3D preview';iframe.src=item.config.interactive;
          iframe.className='project-interactive-frame';iframe.allow='autoplay';
          item.media.append(iframe);
          const visibility=visible=>iframe.contentWindow?.postMessage({type:'preview-visibility',visible},location.origin);
          iframe.addEventListener('load',()=>visibility(item.visible),{signal});
          item.player={play:()=>visibility(true),pause:()=>visibility(false),destroy:()=>iframe.remove()};
        } else item.player=createBannerPreview(item.canvas,item.config);
      }
      item.player?.play();
    } else item.player?.pause();
  }
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries) {
      const item=items.find(item=>item.action===entry.target);
      if(item){item.visible=entry.isIntersecting;update(item);}
    }
  },{threshold:0});
  for(const project of projects) {
    const action=main.querySelector(`[id="${project.id}"] .project-row-link`);
    if(!action)continue;
    const wrapper=document.createElement('div');
    wrapper.className='project-preview-expansion';
    const inline=document.createElement('div');
    inline.className='project-inline-preview';
    inline.style.setProperty('--project-preview-aspect',String(project.previewAspectRatio || 4/3));
    const poster=document.createElement('img');
    poster.src=project.banner?.poster || project.image;
    poster.alt=project.imageAlt || `${project.title} preview`;
    poster.loading='lazy';poster.decoding='async';
    const canvas=document.createElement('canvas');
    canvas.className='project-preview-canvas';canvas.hidden=true;
    canvas.setAttribute('aria-hidden','true');
    const media=document.createElement('div');media.className='project-preview-media';
    media.setAttribute('data-lenis-prevent','');media.append(poster,canvas);
    const tools=document.createElement('div');tools.className='project-preview-tools';
    const open=document.createElement('a');open.href=project.url;open.target='_blank';open.rel='noopener noreferrer';
    open.className='action-primary project-open-link';open.textContent='View project';
    const arrow=document.createElement('span');arrow.className='action-arrow';arrow.textContent='→';arrow.setAttribute('aria-hidden','true');open.append(arrow);
    const info=document.createElement('div');info.className='project-preview-info';
    info.dataset.theme=project.banner?.interactive?'light':'dark';
    const summary=document.createElement('button');summary.type='button';
    const question=document.createElement('span');question.className='project-preview-question';question.textContent='?';
    summary.append(question);
    summary.className='project-preview-info-toggle';summary.setAttribute('aria-label','Preview controls');
    summary.setAttribute('aria-expanded','false');
    const description=document.createElement('div');description.className='project-preview-help';
    description.id=`${project.id}-preview-help`;summary.setAttribute('aria-controls',description.id);
    const content=document.createElement('div');content.className='project-preview-help-content';
    const mouseControls=matchMedia('(hover:hover) and (pointer:fine)');
    const renderGestures=()=>{
      const gestures=project.banner?.interactive
        ? (mouseControls.matches ? ['Rotate: Left-drag','Pan: Right-drag','Zoom: Scroll'] : ['Rotate: One-finger drag','Pan: Two-finger drag','Zoom: Pinch'])
        : (mouseControls.matches ? ['Pan: Drag','Zoom: Scroll','Reset: Double-click'] : ['Pan: One-finger drag','Zoom: Pinch']);
      content.replaceChildren();
      for(const gesture of gestures){const line=document.createElement('p');line.textContent=gesture;content.append(line);}
    };
    renderGestures();
    mouseControls.addEventListener('change',renderGestures,{signal});
    description.append(content);info.append(summary,description);
    const setInfoOpen=expanded=>{if(expanded)info.style.setProperty('--preview-help-width',`${content.scrollWidth+16}px`);info.classList.toggle('is-open',expanded);summary.setAttribute('aria-expanded',String(expanded));description.inert=!expanded;};
    info.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')setInfoOpen(true);},{signal});
    info.addEventListener('pointerleave',()=>setInfoOpen(false),{signal});
    // Keep overlay gestures from starting a pan on the media beneath it.
    for(const type of ['pointerdown','wheel','dblclick'])info.addEventListener(type,event=>event.stopPropagation(),{signal});
    description.inert=true;
    const credit=document.createElement('p');credit.className='project-footage-credit';
    if(project.footageCredit?.url){const source=document.createElement('a');source.href=project.footageCredit.url;source.target='_blank';source.rel='noopener noreferrer';source.textContent=project.footageCredit.text || 'Footage source';credit.append(source);}
    let magnetX=0,magnetY=0;
    const resetMagnet=()=>{magnetX=magnetY=0;open.style.setProperty('--magnet-x','0px');open.style.setProperty('--magnet-y','0px');};
    action.addEventListener('pointermove',event=>{
      if(event.pointerType!=='mouse'||!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
      const rect=open.getBoundingClientRect();
      const offset=getComputedStyle(open).translate.split(' ').map(value=>parseFloat(value)||0);
      const dx=event.clientX-(rect.left-offset[0]+rect.width/2),dy=event.clientY-(rect.top-(offset[1]||0)+rect.height/2);
      const distance=Math.hypot(dx,dy),radius=Math.max(rect.width,rect.height)/2+design.effects.buttonMagnetRange;
      const amount=Math.max(0,1-distance/radius)*design.effects.buttonMagnetStrength;
      magnetX=distance?dx/distance*amount:0;magnetY=distance?dy/distance*amount:0;
      open.style.setProperty('--magnet-x',`${magnetX}px`);open.style.setProperty('--magnet-y',`${magnetY}px`);
    },{signal});
    action.addEventListener('pointerleave',resetMagnet,{signal});
    window.addEventListener('blur',resetMagnet,{signal});
    tools.append(credit,open);
    inline.append(media,tools);wrapper.append(inline);action.append(wrapper);
    const panCleanup=project.banner?.interactive ? ()=>{} : installPreviewPanZoom(media,signal);
    media.append(info);
    const title=action.querySelector('.project-title-link');
    action.append(title);
    let headerLocked=false,headerWidth=0;
    const sizeHeader=()=>{
      const width=action.offsetWidth;
      if(headerLocked&&!mobile.matches&&width===headerWidth)return;
      headerWidth=width;
      const nodes=[...action.querySelectorAll('.project-heading,.project-copy')];
      const top=mobile.matches?Math.min(...nodes.map(node=>node.offsetTop)):0;
      const bottom=Math.max(...nodes.map(node=>node.offsetTop+node.offsetHeight));
      action.style.setProperty('--project-header-top',`${top}px`);
      action.style.setProperty('--project-header-height',`${bottom-top+parseFloat(getComputedStyle(action).paddingBottom)}px`);
    };
    const setHeaderExpanded=expanded=>{
      if(expanded&&!headerLocked){
        sizeHeader();
        if(!mobile.matches){
          action.style.setProperty('--project-header-top','0px');
          action.style.setProperty('--project-header-height',`${action.getBoundingClientRect().height}px`);
        }
      }
      headerLocked=expanded;
      if(!expanded)sizeHeader();
    };
    const headerObserver=new ResizeObserver(sizeHeader);
    headerObserver.observe(action);headerObserver.observe(action.querySelector('.project-heading'));headerObserver.observe(action.querySelector('.project-copy'));
    sizeHeader();
    const trigger=document.createElement('button');trigger.type='button';trigger.className='project-expand-trigger';
    trigger.setAttribute('aria-label',`Expand ${project.title}`);
    wrapper.id=`${project.id}-preview`;trigger.setAttribute('aria-controls',wrapper.id);title.setAttribute('aria-controls',wrapper.id);
    action.append(trigger);
    const item={action,wrapper,canvas,media,tools,trigger,title,headerObserver,setHeaderExpanded,name:project.title,panCleanup,config:project.banner,player:null,visible:false,expanded:false};
    items.push(item);update(item);observer.observe(action);
    trigger.addEventListener('click',event=>{event.stopPropagation();if(item.expanded){setInfoOpen(false);resetMagnet();}item.expanded=!item.expanded;update(item);},{signal});
    title.addEventListener('click',event=>{event.stopPropagation();item.expanded=!item.expanded;setInfoOpen(false);resetMagnet();update(item);if(!item.expanded)trigger.focus({preventScroll:true});},{signal});
    action.addEventListener('keydown',event=>{if(event.key==='Escape'&&item.expanded){item.expanded=false;setInfoOpen(false);resetMagnet();update(item);trigger.focus();}},{signal});

  }
  const refresh=()=>items.forEach(update);
  mobile.addEventListener('change',refresh,{signal});
  document.addEventListener('visibilitychange',refresh,{signal});
  return ()=>{observer.disconnect();controller.abort();for(const item of items){item.player?.destroy();item.panCleanup();item.headerObserver.disconnect();item.wrapper.remove();item.tools.remove();item.trigger.remove();item.action.classList.remove('is-preview-expanded');}};
}
