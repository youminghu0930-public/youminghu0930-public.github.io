import { createBannerPreview } from './banner-preview.js';
import { installPreviewPanZoom } from './preview-pan-zoom.js';
import { design } from '../../design-settings.js';

export function installProjectPreviews(main, projects) {
  const controller=new AbortController();
  const {signal}=controller;
  const mobile=matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  const items=[];
  function arrangeProject(item){
    const copy=item.action.querySelector('.project-copy');
    const text=item.action.querySelector('.project-title-text');
    if(mobile.matches&&text.tagName!=='A'){
      const link=document.createElement('a');link.className='project-title-text project-mobile-title-link';
      link.textContent=item.name;link.href=item.open.href;link.target='_blank';link.rel='noopener noreferrer';
      link.setAttribute('aria-label',`${item.name} — view project (opens in a new tab)`);text.replaceWith(link);
    }else if(!mobile.matches&&text.tagName==='A'){
      const label=document.createElement('span');label.className='project-title-text';label.textContent=item.name;text.replaceWith(label);
    }
    item.open.hidden=mobile.matches;
    if(mobile.matches){
      item.action.insertBefore(item.wrapper,copy);
      if(item.qa)item.action.append(item.qa);
      item.action.append(item.open);
    }else{
      item.action.insertBefore(item.wrapper,item.title);
      if(item.qa)item.inline.append(item.qa);
      item.tools.append(item.open);
    }
  }
  function finishExpansion(item){
    if(!item.wrapper.classList.contains('is-animating'))return;
    clearTimeout(item.expansionTimer);item.wrapper.classList.remove('is-animating');
    update(item);
  }
  function update(item) {
    const expanded=mobile.matches||item.expanded;
    const changed=item.renderedExpanded!==undefined&&item.renderedExpanded!==expanded;
    item.renderedExpanded=expanded;
    if(changed){
      clearTimeout(item.expansionTimer);
      const animate=!mobile.matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
      item.wrapper.classList.toggle('is-animating',animate);
      if(animate){
        const duration=Math.max(...getComputedStyle(item.wrapper).transitionDuration.split(',').map(value=>parseFloat(value)*(value.trim().endsWith('ms')?1:1000)));
        item.expansionTimer=setTimeout(()=>finishExpansion(item),duration+60);
      }
    }
    item.setHeaderExpanded(expanded);
    item.trigger.hidden=mobile.matches;
    item.trigger.setAttribute('aria-label',`${expanded?'Collapse':'Expand'} ${item.name}`);
    item.trigger.setAttribute('aria-expanded',String(expanded));
    item.title.hidden=true;
    item.title.tabIndex=-1;
    item.title.setAttribute('aria-expanded',String(expanded));
    item.title.setAttribute('aria-label',`${expanded?'Collapse':'Expand'} ${item.name}`);
    item.action.classList.toggle('is-preview-expanded',expanded);
    item.wrapper.setAttribute('aria-hidden',String(!expanded));
    item.wrapper.inert=!expanded;
    // Build the fixed camera slots before the expansion reveals any media.
    // Playback still waits until the expansion has finished.
    if(expanded&&item.visible&&!item.player&&item.config?.views?.length)item.player=createBannerPreview(item.canvas,item.config);
    if(item.visible&&!document.hidden&&(item.config?.interactive||(expanded&&!item.wrapper.classList.contains('is-animating')))) {
      if(!item.player && item.config) {
        if(item.config.interactive) {
          const iframe=document.createElement('iframe');
          iframe.title='Interactive Golf True 3D preview';iframe.src=item.config.interactive;
          iframe.className='project-interactive-frame';iframe.allow='autoplay';
          // Safari may suspend frame callbacks in a fully transparent iframe.
          // Keep the frame visible so initialization can finish; its own scene
          // draws only after geometry and metrics have been initialized.
          iframe.style.opacity='1';iframe.style.pointerEvents='none';
          item.media.append(iframe);
          const visibility=visible=>iframe.contentWindow?.postMessage({type:'preview-visibility',visible:visible&&iframe.dataset.ready==='true'},location.origin);
          const ready=event=>{
            if(event.origin!==location.origin||event.source!==iframe.contentWindow||event.data?.type!=='preview-ready')return;
            iframe.dataset.ready='true';iframe.style.opacity='1';iframe.style.pointerEvents='';
            visibility(item.visible&&item.renderedExpanded&&!document.hidden&&!item.wrapper.classList.contains('is-animating'));
          };
          window.addEventListener('message',ready,{signal});
          iframe.addEventListener('load',()=>visibility(item.visible&&item.renderedExpanded&&!document.hidden&&!item.wrapper.classList.contains('is-animating')),{signal});
          item.player={play:()=>visibility(true),pause:()=>visibility(false),destroy:()=>iframe.remove()};
        } else item.player=createBannerPreview(item.canvas,item.config);
      }
      if(expanded&&!item.wrapper.classList.contains('is-animating'))item.player?.play();else item.player?.pause();
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
    if(project.banner?.interactive){
      media.setAttribute('data-cursor-target','');
      // A raster poster cannot share the live scene's adaptive camera framing.
      // Keep one fixed surface and reveal the actual scene when it has painted.
      poster.style.display='none';
    }
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
    info.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&mouseControls.matches)setInfoOpen(true);},{signal});
    info.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&mouseControls.matches)setInfoOpen(false);},{signal});
    summary.addEventListener('click',()=>{if(!matchMedia('(hover:hover) and (pointer:fine)').matches)setInfoOpen(!info.classList.contains('is-open'));},{signal});
    document.addEventListener('pointerdown',event=>{if(!info.contains(event.target))setInfoOpen(false);},{signal});
    // Keep overlay gestures from starting a pan on the media beneath it.
    for(const type of ['pointerdown','wheel','dblclick'])info.addEventListener(type,event=>event.stopPropagation(),{signal});
    description.inert=true;
    const credit=document.createElement('p');credit.className='project-footage-credit';
    if(project.banner?.views?.length){
      credit.classList.add('has-credit-options');
      const toggle=document.createElement('button');toggle.type='button';toggle.className='project-credit-toggle';toggle.textContent='Footage source';toggle.setAttribute('aria-expanded','false');
      const options=document.createElement('div');options.className='project-credit-options';options.id=`${project.id}-credit-options`;toggle.setAttribute('aria-controls',options.id);options.inert=true;
      for(const [index,view] of project.banner.views.entries()){const link=document.createElement('a');link.textContent=['First','Second','Third'][index] || `Source ${index+1}`;link.href=view.creditUrl;link.target='_blank';link.rel='noopener noreferrer';options.append(link);}
      const setOpen=open=>{credit.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));options.inert=!open;};
      toggle.addEventListener('click',event=>{event.stopPropagation();setOpen(!credit.classList.contains('is-open'));},{signal});
      document.addEventListener('pointerdown',event=>{if(!credit.contains(event.target))setOpen(false);},{signal});
      credit.addEventListener('keydown',event=>{if(event.key==='Escape'){setOpen(false);toggle.focus();}},{signal});
      credit.append(toggle,options);
    }else if(project.footageCredit?.url){const source=document.createElement('a');source.href=project.footageCredit.url;source.target='_blank';source.rel='noopener noreferrer';source.textContent=project.footageCredit.text || 'Footage source';credit.append(source);}
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
    inline.append(media,tools);
    if(project.qa?.length){
      const qa=document.createElement('dl');qa.className='project-preview-qa';
      qa.setAttribute('aria-label',`${project.title} questions and answers`);
      for(const entry of project.qa){
        const item=document.createElement('div');item.className='project-qa-item';
        const question=document.createElement('dt');question.className='project-qa-question';question.textContent=entry.question;
        const answer=document.createElement('dd');answer.className='project-qa-answer';
        let remaining=entry.answer;
        for(const phrase of entry.highlights || []){
          const index=remaining.indexOf(phrase);if(index<0)continue;
          const highlight=document.createElement('strong');highlight.className='project-qa-highlight';highlight.textContent=phrase;
          answer.append(document.createTextNode(remaining.slice(0,index)),highlight);
          remaining=remaining.slice(index+phrase.length);
        }
        answer.append(document.createTextNode(remaining));
        item.append(question,answer);qa.append(item);
      }
      inline.append(qa);
    }
    wrapper.append(inline);action.append(wrapper);
    const panCleanup=project.banner?.interactive || project.banner?.views?.length ? ()=>{} : installPreviewPanZoom(media,signal);
    media.append(info);
    const title=action.querySelector('.project-title-link');
    action.append(title);
    let headerLocked=false,headerWidth=0;
    const sizeHeader=()=>{
      const width=action.offsetWidth;
      if(headerLocked&&!mobile.matches&&width===headerWidth)return;
      headerWidth=width;
      const nodes=[...action.querySelectorAll(mobile.matches?'.project-heading':'.project-heading,.project-copy')];
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
    const sizeHighlightTimings=()=>{
      const highlights=[...action.querySelectorAll('.project-summary-highlight')];
      const widths=highlights.map(node=>{const range=document.createRange();range.selectNodeContents(node);return [...range.getClientRects()].reduce((sum,rect)=>sum+rect.width,0);});
      const longest=Math.max(1,...widths);
      const duration=Math.min(design.effects.projectHighlightMaxDuration,longest/design.effects.projectHighlightPixelsPerSecond*1000);
      highlights.forEach((node,index)=>node.style.setProperty('--project-highlight-duration',`${duration*widths[index]/longest}ms`));
    };
    const headerObserver=new ResizeObserver(()=>{sizeHeader();sizeHighlightTimings();});
    document.fonts.ready.then(()=>{if(!signal.aborted)sizeHighlightTimings();});
    sizeHighlightTimings();

    headerObserver.observe(action);headerObserver.observe(action.querySelector('.project-heading'));headerObserver.observe(action.querySelector('.project-copy'));
    sizeHeader();
    const trigger=document.createElement('button');trigger.type='button';trigger.className='project-expand-trigger';
    trigger.setAttribute('aria-label',`Expand ${project.title}`);
    wrapper.id=`${project.id}-preview`;trigger.setAttribute('aria-controls',wrapper.id);title.setAttribute('aria-controls',wrapper.id);
    action.append(trigger);
    const item={action,wrapper,canvas,media,tools,inline,open,qa:inline.querySelector('.project-preview-qa'),trigger,title,headerObserver,setHeaderExpanded,name:project.title,panCleanup,config:project.banner,player:null,visible:false,expanded:false};
    items.push(item);arrangeProject(item);update(item);observer.observe(action);
    wrapper.addEventListener('transitionend',event=>{if(event.target===wrapper&&event.propertyName==='grid-template-rows')finishExpansion(item);},{signal});
    trigger.addEventListener('click',event=>{event.stopPropagation();if(item.expanded){setInfoOpen(false);resetMagnet();}item.expanded=!item.expanded;update(item);},{signal});
    title.addEventListener('click',event=>{event.stopPropagation();item.expanded=!item.expanded;setInfoOpen(false);resetMagnet();update(item);if(!item.expanded)trigger.focus({preventScroll:true});},{signal});
    action.addEventListener('keydown',event=>{if(event.key==='Escape'&&item.expanded){item.expanded=false;setInfoOpen(false);resetMagnet();update(item);trigger.focus();}},{signal});

  }
  let rowLayoutFrame=0;
  const syncRowLayout=()=>{
    rowLayoutFrame=0;
    const reference=items[0]?.action;if(!reference)return;
    const heading=reference.querySelector('.project-heading');
    const title=heading.querySelector('h2'),company=heading.querySelector('.project-company');
    const headingStyle=getComputedStyle(heading),companyStyle=getComputedStyle(company);
    const titleHeight=title.offsetHeight+company.offsetHeight+parseFloat(companyStyle.marginTop)+parseFloat(headingStyle.paddingTop)+parseFloat(headingStyle.paddingBottom);
    for(const item of items)item.action.querySelector('.project-copy').classList.remove('is-content-tight');
    const copy=reference.querySelector('.project-copy');
    const copyHeight=[...copy.children].reduce((sum,node)=>sum+node.offsetHeight,0)+Math.max(0,copy.childElementCount-1)*parseFloat(getComputedStyle(copy).rowGap);
    const cellHeight=Math.ceil(Math.max(titleHeight,copyHeight));
    const qaHeight=Math.ceil(Math.max(0,...items.map(item=>item.action.querySelector('.project-preview-qa')?.offsetHeight || 0)));
    for(const item of items){
      item.action.style.setProperty('--project-cell-height',`${cellHeight}px`);
      item.action.style.setProperty('--project-qa-shared-height',`${qaHeight}px`);
      item.action.style.setProperty('--project-mobile-heading-height',`${Math.ceil(titleHeight)}px`);
      item.action.style.setProperty('--project-mobile-copy-height',`${Math.ceil(copyHeight)}px`);
      item.action.style.setProperty('--project-title-half-height',`${item.action.querySelector('.project-heading h2').offsetHeight/2}px`);
      if(!mobile.matches){
        const content=item.action.querySelector('.project-copy');
        const naturalHeight=[...content.children].reduce((sum,node)=>sum+node.offsetHeight,0)+Math.max(0,content.childElementCount-1)*parseFloat(getComputedStyle(content).rowGap);
        content.classList.toggle('is-content-tight',naturalHeight>cellHeight+1);
      }

    }
  };
  const scheduleRowLayout=()=>{if(!rowLayoutFrame)rowLayoutFrame=requestAnimationFrame(syncRowLayout);};
  const rowLayoutObserver=new ResizeObserver(scheduleRowLayout);
  for(const item of items){
    rowLayoutObserver.observe(item.action.querySelector('.project-heading h2'));
    const qa=item.action.querySelector('.project-preview-qa');if(qa)rowLayoutObserver.observe(qa);
    for(const node of item.action.querySelector('.project-copy').children)rowLayoutObserver.observe(node);
  }
  window.addEventListener('resize',scheduleRowLayout,{passive:true,signal});
  document.fonts.ready.then(()=>{if(!signal.aborted)scheduleRowLayout();});
  scheduleRowLayout();
  let centerFrame=0;
  const highlightCenter=()=>{
    centerFrame=0;
    const viewport=window.visualViewport;
    const top=viewport?.offsetTop || 0,height=viewport?.height || innerHeight,center=top+height/2;
    for(const item of items){
      let progress=0;
      const bounds=item.action.getBoundingClientRect();
      const title=item.action.querySelector('h2').getBoundingClientRect();
      if(mobile.matches&&!item.action.closest('[hidden],[inert],[aria-hidden="true"]')&&bounds.bottom>top&&bounds.top<top+height){
        const titleCenter=title.top+title.height/2;
        const finishCenter=top+height*.08+title.height/2;
        progress=Math.max(0,Math.min(1,(center-titleCenter)/Math.max(1,center-finishCenter)));
      }
      item.action.classList.toggle('is-center-highlighted',progress>0);
      item.action.style.setProperty('--project-title-fill',`${progress*100}%`);
      const heading=item.action.querySelector('.project-heading').getBoundingClientRect();
      item.action.style.setProperty('--project-title-ink-cut',`${progress*heading.height-(title.top-heading.top)}px`);
      const highlights=[...item.action.querySelectorAll('.project-summary-highlight')];
      const durations=highlights.map(node=>parseFloat(node.style.getPropertyValue('--project-highlight-duration'))||1);
      const longest=Math.max(1,...durations);
      highlights.forEach((node,index)=>node.style.setProperty('--project-marker-fill',`${Math.min(1,progress*longest/durations[index])*100}%`));
    }
  };
  const scheduleCenterHighlight=()=>{if(!centerFrame)centerFrame=requestAnimationFrame(highlightCenter);};
  const centerObserver=new ResizeObserver(scheduleCenterHighlight);
  for(const item of items)centerObserver.observe(item.action);
  const filterObserver=new MutationObserver(scheduleCenterHighlight);
  filterObserver.observe(main,{subtree:true,attributes:true,attributeFilter:['hidden','inert']});
  window.addEventListener('scroll',scheduleCenterHighlight,{passive:true,signal});
  window.addEventListener('resize',scheduleCenterHighlight,{passive:true,signal});
  window.visualViewport?.addEventListener('resize',scheduleCenterHighlight,{passive:true,signal});
  window.visualViewport?.addEventListener('scroll',scheduleCenterHighlight,{passive:true,signal});
  scheduleCenterHighlight();
  const refresh=()=>{for(const item of items){arrangeProject(item);update(item);}scheduleRowLayout();scheduleCenterHighlight();};
  mobile.addEventListener('change',refresh,{signal});
  document.addEventListener('visibilitychange',refresh,{signal});
  return ()=>{cancelAnimationFrame(centerFrame);centerObserver.disconnect();filterObserver.disconnect();cancelAnimationFrame(rowLayoutFrame);rowLayoutObserver.disconnect();observer.disconnect();controller.abort();for(const item of items){clearTimeout(item.expansionTimer);item.player?.destroy();item.panCleanup();item.headerObserver.disconnect();item.wrapper.remove();item.tools.remove();item.trigger.remove();item.qa?.remove();item.open.remove();item.action.classList.remove('is-preview-expanded','is-center-highlighted');}};
}
