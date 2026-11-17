import { createVectorBannerPreview } from './vector-banner-preview.js';
import { installPreviewPanZoom } from './preview-pan-zoom.js';
import { design } from '../../design-settings.js';
const edges=[['nose','atlas'],['nose','top_head'],['nose','left_ear'],['nose','right_ear'],['left_shoulder','right_shoulder'],['left_shoulder','left_elbow'],['left_elbow','left_wrist'],['right_shoulder','right_elbow'],['right_elbow','right_wrist'],['left_shoulder','left_hip'],['right_shoulder','right_hip'],['left_hip','right_hip'],['left_hip','left_knee'],['left_knee','left_ankle'],['right_hip','right_knee'],['right_knee','right_ankle'],['golf_club_grip','golf_club_shaft'],['golf_club_shaft','golf_club_heel'],['golf_club_heel','golf_club_head']];
export function createBannerPreview(canvas, config) {
  if(config.views?.length)return createPairedBannerPreview(canvas,config);
  if(config.rendered) return createRenderedBannerPreview(canvas,config);
  return createVectorBannerPreview(canvas,config,edges);
}



function createRenderedBannerPreview(canvas,config) {
  const video=document.createElement('video');
  video.muted=true;video.playsInline=true;video.loop=true;video.preload='none';
  const poster=new Image();
  let wanted=false,disposed=false,frame=0,loaded=false;
  const context=canvas.getContext('2d');
  function draw() {
    frame=0;
    if(disposed)return;
    const media=video.readyState>=2?video:poster;
    if(media===video || poster.complete && poster.naturalWidth) {
      if(canvas.width!==800)canvas.width=800;
      if(canvas.height!==600)canvas.height=600;
      const width=media.videoWidth || media.naturalWidth,height=media.videoHeight || media.naturalHeight;
      const scale=800/width;
      context.fillStyle='#080808';context.fillRect(0,0,800,600);
      context.drawImage(media,0,(600-height*scale)/2,800,height*scale);
      canvas.hidden=false;
    }
    if(wanted)frame=requestAnimationFrame(draw);
  }
  poster.onload=()=>{if(wanted&&!disposed&&!frame)frame=requestAnimationFrame(draw);};
  return {
    play(){
      wanted=true;
      if(!loaded) {loaded=true;poster.src=config.poster;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){video.src=config.video;video.load();}}
      if(video.src)video.play().catch(()=>{});
      if(!frame)frame=requestAnimationFrame(draw);
    },
    pause(){wanted=false;video.pause();cancelAnimationFrame(frame);frame=0;},
    destroy(){disposed=true;wanted=false;poster.onload=null;cancelAnimationFrame(frame);video.pause();video.removeAttribute('src');video.load();}
  };
}

// Camera slots stay fixed while their video content pans and zooms independently.
function createPairedBannerPreview(canvas,config) {
  const pair=document.createElement('div');pair.className='project-preview-pair';pair.style.setProperty('--preview-view-count',config.views.length);
  const media=canvas.closest('.project-preview-media');media.classList.add('has-paired-preview');
  canvas.parentElement.append(pair);canvas.hidden=true;
  let active=0,wanted=false,disposed=false;
  const mobile=matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  const players=[],panes=[],cleanups=[];
  const controller=new AbortController();
  const select=index=>{
    active=index;
    panes.forEach((pane,i)=>{
      pane.classList.toggle('is-active',i===active);
      pane.dataset.playing=String(i===active);
      if(wanted&&i===active)players[i]?.play();else players[i]?.pause();
    });
  };
  config.views.forEach((view,index)=>{
    const pane=document.createElement('div');pane.className='project-preview-pane';pane.setAttribute('aria-label',view.label);pane.setAttribute('data-cursor-target','');
    const surface=document.createElement('canvas');surface.setAttribute('aria-hidden','true');pane.append(surface);pair.append(pane);panes.push(pane);
    cleanups.push(installPreviewPanZoom(pane,controller.signal,{constrain:true,aspectRatio:view.aspectRatio}));
    players.push(createBannerPreview(surface,{...view,onEnded:()=>{if(!disposed)select((active+1)%config.views.length);}}));
    // Only tiny first-frame geometry is prepared during expansion; videos wait.
    players.at(-1).prepare();
    let press=null;
    pane.addEventListener('pointerdown',event=>{
      if(mobile.matches)return;
      if(event.pointerType==='mouse'&&event.button!==0)return;
      if(press){press.dragged=true;return;}
      press={id:event.pointerId,x:event.clientX,y:event.clientY,dragged:false};
    },{signal:controller.signal});
    pane.addEventListener('pointermove',event=>{
      if(press&&Math.hypot(event.clientX-press.x,event.clientY-press.y)>5)press.dragged=true;
    },{signal:controller.signal});
    pane.addEventListener('pointerup',event=>{
      if(mobile.matches){press=null;return;}
      if(!press||press.id!==event.pointerId)return;
      if(!press.dragged)select(index);
      press=null;
    },{signal:controller.signal});
    pane.addEventListener('pointercancel',()=>{press=null;},{signal:controller.signal});

  });
  select(0);
  return {
    play(){wanted=true;players.forEach(player=>player.prepare());select(active);},
    pause(){wanted=false;players.forEach(player=>player.pause());},
    destroy(){disposed=true;controller.abort();cleanups.forEach(cleanup=>cleanup());players.forEach(player=>player.destroy());pair.remove();media.classList.remove('has-paired-preview');}
  };
}
