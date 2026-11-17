import { createBannerPreview } from './banner-preview.js';
import { installPreviewPanZoom } from './preview-pan-zoom.js';
import { design } from '../../design-settings.js';

export function installProjectPreviews(main, projects) {
  const controller=new AbortController();
  const {signal}=controller;
  const mobile=matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  const nativeScrollHighlight=typeof CSS.registerProperty==='function'&&CSS.supports('animation-timeline','view()')&&CSS.supports('timeline-scope','--project-title-scroll')&&CSS.supports('animation-range','entry 50% exit 50%');
  const items=[];
  function arrangeProject(item){
    const copy=item.action.querySelector('.project-copy');
    item.action.classList.toggle('has-native-scroll-highlight',mobile.matches&&nativeScrollHighlight);
    if(mobile.matches&&nativeScrollHighlight){delete item.action.dataset.titleInk;for(const marker of item.action.querySelectorAll('.project-summary-highlight'))delete marker.dataset.markerInk;}
    const text=item.action.querySelector('.project-title-text');
    if(text.tagName!=='A'){
      const link=document.createElement('a');link.className='project-title-text project-mobile-title-link';
      link.textContent=item.name;link.href=item.open.href;link.target='_blank';link.rel='noopener noreferrer';
      link.setAttribute('aria-label',`${item.name} — view project (opens in a new tab)`);text.replaceWith(link);

    }
    item.open.hidden=true;
    item.media.toggleAttribute('data-lenis-prevent',!mobile.matches);
    const frame=item.media.querySelector('iframe');
    if(frame){frame.tabIndex=mobile.matches?-1:0;frame.style.pointerEvents=mobile.matches||frame.dataset.ready!=='true'?'none':'';}
    const heading=item.action.querySelector('.project-heading'),company=heading.querySelector('.project-company'),headingTitle=heading.querySelector('h2');
    company.hidden=true;
    item.editorial.hidden=mobile.matches;item.writeup.hidden=mobile.matches;item.editorialActions.hidden=mobile.matches;
    if(mobile.matches){
      item.action.insertBefore(heading,item.wrapper);
      item.action.insertBefore(copy,item.editorial);
      heading.insertBefore(headingTitle,company);
      item.action.insertBefore(item.wrapper,copy);
      if(item.qa)item.action.append(item.qa);

      copy.append(item.open);
    }else{
      heading.insertBefore(company,headingTitle);
      item.editorial.prepend(heading,copy);
      item.action.insertBefore(item.wrapper,item.editorial);
      if(item.qa)item.writeupInner.append(item.qa);

      item.editorial.insertBefore(item.open,copy);item.editorialActions.append(item.readToggle);
      item.action.append(item.writeup,item.editorialActions);
    }
    updateWriteup(item);
  }
  function updateWriteup(item,animate=false){
    const panel=item.writeup;
    const from=panel.getBoundingClientRect().height;
    item.writeupAnimation?.cancel();item.writeupAnimation=null;
    panel.classList.toggle('is-open',item.writeupExpanded);
    panel.inert=!item.writeupExpanded;
    panel.setAttribute('aria-hidden',String(!item.writeupExpanded));
    item.readToggle.setAttribute('aria-expanded',String(item.writeupExpanded));
    item.readLabel.classList.toggle('is-expanded',item.writeupExpanded);
    item.readToggle.setAttribute('aria-label',item.writeupExpanded?'Close':'Explore the thinking');
    if(!animate||mobile.matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const natural=item.writeupInner.getBoundingClientRect().height;
    const to=item.writeupExpanded?natural:0;
    if(Math.abs(to-from)<.5)return;
    const style=getComputedStyle(panel);
    const value=style.getPropertyValue(item.writeupExpanded?'--project-writeup-duration':'--project-writeup-collapse-duration').trim();
    const base=(parseFloat(value)||(item.writeupExpanded?820:950))*(value.endsWith('s')&&!value.endsWith('ms')?1000:1);
    // Short reversals still need breathing room; do not accelerate them into a snap.
    const distance=Math.min(1,Math.abs(to-from)/Math.max(1,natural));
    const duration=Math.max(item.writeupExpanded?280:340,base*Math.sqrt(distance));
    const frames=[{height:`${from}px`,opacity:1},{height:`${to}px`,opacity:1}];
    // Document-bottom scroll clamping uses whole CSS pixels. Match that grid
    // so neighbouring rows and thin dividers do not oscillate by a subpixel.
    if(CSS.supports('height','round(nearest, 1.5px, 1px)')){
      for(const frame of frames){
        frame['--project-writeup-height']=frame.height;
        frame.height='round(nearest, var(--project-writeup-height), 1px)';
      }
    }
    // Older WebKit lacks CSS round(); dense integer steps avoid fractional layout there too.
    const pixelFrames=CSS.supports('height','round(nearest, 1.5px, 1px)')?frames:
      Array.from({length:241},(_,index)=>({height:`${Math.round(from+(to-from)*index/240)}px`,opacity:1,offset:index/240,easing:'steps(1,end)'}));
    const animation=panel.animate(pixelFrames,{duration,easing:style.getPropertyValue('--project-writeup-ease').trim()||'ease-in-out',fill:'both'});
    item.writeupAnimation=animation;
    animation.onfinish=()=>{
      if(item.writeupAnimation!==animation)return;
      item.writeupAnimation=null;animation.cancel();
    };
  }
  function finishExpansion(item){
    if(!item.wrapper.classList.contains('is-animating'))return;
    clearTimeout(item.expansionTimer);item.wrapper.classList.remove('is-animating');
    update(item);
  }
  function update(item) {
    const expanded=true;
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
    item.trigger.hidden=true;
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
          iframe.className='project-interactive-frame';iframe.allow='autoplay';iframe.tabIndex=mobile.matches?-1:0;
          // Safari may suspend frame callbacks in a fully transparent iframe.
          // Keep the frame visible so initialization can finish; its own scene
          // draws only after geometry and metrics have been initialized.
          iframe.style.opacity='1';iframe.style.pointerEvents='none';
          item.media.append(iframe);
          const visibility=visible=>iframe.contentWindow?.postMessage({type:'preview-visibility',visible:visible&&iframe.dataset.ready==='true'},location.origin);
          const ready=event=>{
            if(event.origin!==location.origin||event.source!==iframe.contentWindow||event.data?.type!=='preview-ready')return;
            iframe.dataset.ready='true';iframe.style.opacity='1';iframe.style.pointerEvents=mobile.matches?'none':'';
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
    if(project.banner?.interactive){
      // A real parent-page hit surface also blocks iOS iframe gesture routing.
      // It has no handlers or pointer capture, so vertical swipes stay native.
      const swipeSurface=document.createElement('div');swipeSurface.className='project-preview-swipe-surface';
      swipeSurface.setAttribute('aria-hidden','true');media.append(swipeSurface);
    }
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
    const resetMagnet=()=>{magnetX=magnetY=0;readToggle.style.setProperty('--magnet-x','0px');readToggle.style.setProperty('--magnet-y','0px');};
    action.addEventListener('pointermove',event=>{
      if(mobile.matches||items.some(item=>item.action===action&&item.writeupAnimation))return;
      if(event.pointerType!=='mouse'||!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
      const rect=readToggle.getBoundingClientRect();
      const offset=getComputedStyle(readToggle).translate.split(' ').map(value=>parseFloat(value)||0);
      const dx=event.clientX-(rect.left-offset[0]+rect.width/2),dy=event.clientY-(rect.top-(offset[1]||0)+rect.height/2);
      const distance=Math.hypot(dx,dy),radius=Math.max(rect.width,rect.height)/2+design.effects.buttonMagnetRange;
      const amount=Math.max(0,1-distance/radius)*design.effects.buttonMagnetStrength;
      magnetX=distance?dx/distance*amount:0;magnetY=distance?dy/distance*amount:0;
      readToggle.style.setProperty('--magnet-x',`${magnetX}px`);readToggle.style.setProperty('--magnet-y',`${magnetY}px`);
    },{signal});
    action.addEventListener('pointerleave',resetMagnet,{signal});
    window.addEventListener('blur',resetMagnet,{signal});
    tools.append(credit,open);
    inline.append(media,tools);
    if(project.qa?.length){
      const qa=document.createElement('dl');qa.className='project-preview-qa';
      qa.setAttribute('aria-label',`${project.title} questions and answers`);
      for(const [qaIndex,entry] of project.qa.entries()){
        const item=document.createElement('div');item.className='project-qa-item';
        const question=document.createElement('dt');question.className='project-qa-question';
        const number=document.createElement('span');number.className='project-qa-number';
        number.setAttribute('aria-hidden','true');number.textContent=String(qaIndex+1).padStart(2,'0');
        const questionText=document.createElement('span');questionText.className='project-qa-question-text';questionText.textContent=entry.question;
        question.append(number,questionText);
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
      const heading=action.querySelector('.project-heading'),headingTitle=heading.querySelector('h2');
      action.style.setProperty('--project-heading-height',`${heading.offsetHeight}px`);
      action.style.setProperty('--project-title-height',`${headingTitle.offsetHeight}px`);
      action.style.setProperty('--project-title-offset',`${headingTitle.offsetTop}px`);
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
      highlights.forEach((node,index)=>{node.style.setProperty('--project-highlight-duration',`${duration*widths[index]/longest}ms`);node.style.setProperty('--project-marker-share',String(Math.max(.001,widths[index]/longest)));});
      const editorial=action.querySelector('.project-editorial-copy');
      if(!mobile.matches&&editorial&&!editorial.hidden){
        const heading=action.querySelector('.project-heading'),title=heading.querySelector('h2');
        const origin=editorial.getBoundingClientRect().top;
        const previewTop=`${Math.round((title.getBoundingClientRect().top-origin)*100)/100}px`;
        if(action.style.getPropertyValue('--project-preview-title-top')!==previewTop)action.style.setProperty('--project-preview-title-top',previewTop);
        const previewHeight=action.querySelector('.project-preview-media').offsetHeight;
        const editorialHeight=`${Math.round((parseFloat(previewTop)+previewHeight)*100)/100}px`;
        if(action.style.getPropertyValue('--project-editorial-min-height')!==editorialHeight)action.style.setProperty('--project-editorial-min-height',editorialHeight);
        const headingHeight=Math.max(1,heading.offsetHeight);
        const titleText=title.querySelector('.project-title-text');
        titleText.style.setProperty('--project-ink-start',String(title.offsetTop/headingHeight));
        titleText.style.setProperty('--project-ink-scale',String(headingHeight/Math.max(1,title.offsetHeight)));
      }
    };
    action.addEventListener('pointerenter',sizeHighlightTimings,{signal});
    const headerObserver=new ResizeObserver(()=>{sizeHeader();sizeHighlightTimings();});
    document.fonts.ready.then(()=>{if(!signal.aborted)sizeHighlightTimings();});
    sizeHighlightTimings();

    // Q&A height changes do not affect the header; observe only its actual content.
    headerObserver.observe(action.querySelector('.project-heading'));headerObserver.observe(action.querySelector('.project-copy'));
    sizeHeader();
    const trigger=document.createElement('button');trigger.type='button';trigger.className='project-expand-trigger';
    trigger.setAttribute('aria-label',`Expand ${project.title}`);
    wrapper.id=`${project.id}-preview`;trigger.setAttribute('aria-controls',wrapper.id);title.setAttribute('aria-controls',wrapper.id);
    action.append(trigger);
    const editorial=document.createElement('div');editorial.className='project-editorial-copy';
    const editorialActions=document.createElement('div');editorialActions.className='project-editorial-actions';editorial.append(editorialActions);
    const readToggle=document.createElement('button');readToggle.type='button';readToggle.className='project-writeup-toggle';
    const readLabel=document.createElement('span');readLabel.className='project-writeup-label';readLabel.setAttribute('aria-hidden','true');
    for(const [state,text] of [['closed','Explore the thinking'],['open','Close']]){const label=document.createElement('span');label.dataset.state=state;label.textContent=text;readLabel.append(label);}
    const readArrow=document.createElementNS('http://www.w3.org/2000/svg','svg');
    readArrow.classList.add('project-writeup-chevron');readArrow.setAttribute('viewBox','0 0 16 16');
    readArrow.setAttribute('aria-hidden','true');readArrow.setAttribute('focusable','false');
    const arrowPath=document.createElementNS('http://www.w3.org/2000/svg','path');
    arrowPath.setAttribute('d','M3 5.5 L8 10.5 L13 5.5');arrowPath.setAttribute('fill','none');
    arrowPath.setAttribute('stroke','currentColor');arrowPath.setAttribute('stroke-width','1.5');
    arrowPath.setAttribute('stroke-linecap','round');arrowPath.setAttribute('stroke-linejoin','round');
    readArrow.append(arrowPath);readToggle.append(readArrow,readLabel);
    const writeup=document.createElement('div');writeup.className='project-writeup';writeup.id=`${project.id}-writeup`;
    const writeupInner=document.createElement('div');writeupInner.className='project-writeup-inner';writeup.append(writeupInner);
    const related=document.createElement('section');related.className='project-related';
    const relatedHeading=document.createElement('h3');relatedHeading.textContent='Related subprojects';related.append(relatedHeading);
    const groups=new Map();
    for(const tag of project.tags || []){const url=project.technologyLinks?.[tag];if(!url)continue;if(!groups.has(url))groups.set(url,[]);groups.get(url).push(tag);}
    const names={
      'improving-golf-swing-pose-estimation':'Golf-specific pose estimation',
      'integrating-golfer-club-detection-models':'Model training and integration',
      'enhancing-blurry-club-recall':'Blurry club detection',
      'trajectory-postprocessing':'Trajectory smoothing',
      'golf-swing-3d-reconstruction':'Calibration-free reconstruction',
      'two-event-time-sync':'Camera synchronization',
      'pose-information-extraction':'Movement measurements'
    };
    for(const [url,tags] of groups){
      const row=document.createElement('div');row.className='project-related-row';
      const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';
      link.textContent=(names[new URL(url).pathname.split('/').filter(Boolean).pop()] || tags[0])+' ↗';
      const technologies=document.createElement('ul');technologies.className='project-related-technologies';technologies.setAttribute('aria-label','Technologies');
      for(const tag of tags){const pill=document.createElement('li');pill.textContent=tag;technologies.append(pill);}
      row.append(link,technologies);related.append(row);
    }
    const technologies=action.querySelector('.project-technologies');
    if(groups.size)technologies.replaceWith(related);

    readToggle.setAttribute('aria-controls',writeup.id);action.append(editorial,writeup);
    const item={action,wrapper,canvas,media,tools,inline,open,related,qa:inline.querySelector('.project-preview-qa'),trigger,title,headerObserver,setHeaderExpanded,name:project.title,panCleanup,config:project.banner,player:null,visible:false,expanded:false,editorial,editorialActions,writeup,writeupInner,readToggle,readLabel,writeupExpanded:false};
    readToggle.addEventListener('click',()=>{resetMagnet();item.writeupExpanded=!item.writeupExpanded;updateWriteup(item,true);},{signal});
    items.push(item);arrangeProject(item);update(item);observer.observe(action);
    wrapper.addEventListener('transitionend',event=>{if(event.target===wrapper&&event.propertyName==='grid-template-rows')finishExpansion(item);},{signal});
    trigger.addEventListener('click',event=>{event.stopPropagation();if(item.expanded){setInfoOpen(false);resetMagnet();}item.expanded=!item.expanded;update(item);},{signal});
    title.addEventListener('click',event=>{event.stopPropagation();item.expanded=!item.expanded;setInfoOpen(false);resetMagnet();update(item);if(!item.expanded)trigger.focus({preventScroll:true});},{signal});
    action.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobile.matches&&item.writeupExpanded){resetMagnet();item.writeupExpanded=false;updateWriteup(item,true);readToggle.focus({preventScroll:true});}},{signal});

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
        const introduction=[item.wrapper,item.editorial].filter(Boolean);
        const introHeight=Math.max(0,...introduction.map(node=>node.offsetTop+node.offsetHeight))+12;
        item.action.style.setProperty('--project-intro-height',`${Math.ceil(introHeight)}px`);
        const content=item.action.querySelector('.project-copy');
        const naturalHeight=[...content.children].reduce((sum,node)=>sum+node.offsetHeight,0)+Math.max(0,content.childElementCount-1)*parseFloat(getComputedStyle(content).rowGap);
        content.classList.toggle('is-content-tight',naturalHeight>cellHeight+1);
      }

    }
  };
  const scheduleRowLayout=()=>{if(!rowLayoutFrame)rowLayoutFrame=requestAnimationFrame(syncRowLayout);};
  const rowLayoutObserver=new ResizeObserver(()=>{
    for(const item of items)if(item.writeupAnimation&&item.writeupExpanded)updateWriteup(item,true);
    scheduleRowLayout();
  });
  for(const item of items){
    rowLayoutObserver.observe(item.action.querySelector('.project-heading h2'));
    rowLayoutObserver.observe(item.wrapper);
    if(item.editorial)rowLayoutObserver.observe(item.editorial);
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
    const top=viewport?.offsetTop || 0,height=viewport?.height || innerHeight;
    for(const item of items){
      let progress=0;
      const bounds=item.action.getBoundingClientRect();
      const title=item.action.querySelector('h2').getBoundingClientRect();
      if(mobile.matches&&!item.action.closest('[hidden],[inert],[aria-hidden="true"]')&&bounds.bottom>top&&bounds.top<top+height){
        const titleCenter=title.top+title.height/2;
        const startCenter=top+height*.75,finishCenter=top+height*.25;
        progress=Math.max(0,Math.min(1,(startCenter-titleCenter)/Math.max(1,startCenter-finishCenter)));
      }
      item.action.classList.toggle('is-center-highlighted',progress>0);
      item.action.style.setProperty('--project-title-fill',`${progress*100}%`);
      const heading=item.action.querySelector('.project-heading').getBoundingClientRect();
      const inkCut=progress*heading.height-(title.top-heading.top);
      item.action.style.setProperty('--project-title-ink-cut',`${inkCut}px`);
      item.action.dataset.titleInk=inkCut<=0?'light':inkCut>=title.height?'dark':'split';
      const highlights=[...item.action.querySelectorAll('.project-summary-highlight')];
      const durations=highlights.map(node=>parseFloat(node.style.getPropertyValue('--project-highlight-duration'))||1);
      const longest=Math.max(1,...durations);
      highlights.forEach((node,index)=>{const fill=Math.min(1,progress*longest/durations[index]);node.style.setProperty('--project-marker-fill',`${fill*100}%`);node.dataset.markerInk=fill<=0?'light':fill>=1?'dark':'split';});
    }
  };
  const scheduleCenterHighlight=()=>{if(mobile.matches&&nativeScrollHighlight)return;if(!centerFrame)centerFrame=requestAnimationFrame(highlightCenter);};
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
  return ()=>{cancelAnimationFrame(centerFrame);centerObserver.disconnect();filterObserver.disconnect();cancelAnimationFrame(rowLayoutFrame);rowLayoutObserver.disconnect();observer.disconnect();controller.abort();for(const item of items){clearTimeout(item.expansionTimer);item.writeupAnimation?.cancel();item.player?.destroy();item.panCleanup();item.headerObserver.disconnect();item.wrapper.remove();item.tools.remove();item.trigger.remove();item.qa?.remove();item.open.remove();item.action.classList.remove('is-preview-expanded','is-center-highlighted','has-native-scroll-highlight');}};
}
