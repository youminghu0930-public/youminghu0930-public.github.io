import {fetchPreviewJson} from './preview-json.js';
import { design } from '../../design-settings.js';
let nextId=0;
const ns='http://www.w3.org/2000/svg';
const usable=p=>p&&Number.isFinite(p[0])&&Number.isFinite(p[1])&&(p[0]!==0||p[1]!==0)&&(p.length<3||p[2]>=0);
export function createVectorBannerPreview(placeholder,config,edges){
  const controller=new AbortController(),id=`pose-vector-${++nextId}`;
  const root=document.createElement('div');root.className='project-vector-preview';root.setAttribute('aria-hidden','true');
  const video=document.createElement('video');video.muted=video.defaultMuted=true;video.playsInline=true;video.setAttribute('muted','');video.setAttribute('playsinline','');video.loop=!config.onEnded;video.preload='none';video.poster=config.poster;
  const svg=document.createElementNS(ns,'svg');svg.classList.add('project-vector-overlay');
  // Poster footage must not be exposed ahead of its matching geometry.
  video.style.opacity='0';
  root.append(video,svg);placeholder.replaceWith(root);
  let pose,timing,wanted=false,disposed=false,loading,motionLoading,frame=0,lastKey='',transition;
  let clock=0,videoFrame=0,finished=false;
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const settings=design.effects;
  const line=(p,q,color,width,opacity=1)=>`<path d="M${p[0]} ${p[1]}L${q[0]} ${q[1]}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${opacity}"/>`;
  const circle=(p,r,fill,stroke='none',width=0,opacity=1)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}"/>`;
  function draw(){
    if(!timing||disposed)return;
    let index=0;while(index+1<timing.times.length&&timing.times[index+1]<=clock)index++;
    root.dataset.frame=String(index);
    const unit=timing.width/Math.max(1,root.clientWidth),key=`${index}:${unit}`;
    if(key===lastKey)return;lastKey=key;
    const points=pose.pred[index];if(!points)return;
    const radius=settings.projectBannerJointRadius*unit;
    const jointIndex=new Map(pose.joints.map((name,i)=>[name,i]));
    const get=(sample,name)=>sample[jointIndex.get(name)];
    const history=[...(pose.history||[]),...pose.pred.slice(Math.max(0,index-settings.projectBannerHistoryFrames),index+1)].slice(-settings.projectBannerHistoryFrames-1);
    const previous=new Map(),historyShapes=[],boneShapes=[],jointShapes=[],clips=[];
    history.forEach((sample,i)=>{
      const age=(i+1)/history.length,color=`hsl(${240*(1-i/Math.max(1,history.length-1))} 90% 62%)`;
      const opacity=settings.projectBannerHistoryOpacity*age**2;
      for(const [a,b] of edges.filter(([a])=>a.startsWith('golf_club_'))){const p=get(sample,a),q=get(sample,b);if(usable(p)&&usable(q))historyShapes.push(line(p,q,color,settings.projectBannerGhostWidth*unit,opacity));}
      for(const name of settings.projectBannerTrailJoints){
        const p=get(sample,name),last=previous.get(name);
        if(usable(p)){
          const alpha=settings.projectBannerTrailOpacity*(.2+.8*age);
          if(last)historyShapes.push(line(last,p,color,settings.projectBannerTrailWidth*unit,alpha));
          historyShapes.push(circle(p,settings.projectBannerTrailDotRadius*unit,color,'none',0,alpha));previous.set(name,p);
        }else previous.delete(name);
      }
    });
    edges.forEach(([a,b],i)=>{
      const p=get(points,a),q=get(points,b);if(!usable(p)||!usable(q)||Math.hypot(q[0]-p[0],q[1]-p[1])<=2*radius)return;
      // Circular cutouts stop bones beneath the ring without entering the center gap.
      const holes=[p,q].map(p=>`M${p[0]+radius} ${p[1]}a${radius} ${radius} 0 1 0 ${-2*radius} 0a${radius} ${radius} 0 1 0 ${2*radius} 0Z`).join('');
      const clip=`${id}-bone-${i}`;
      clips.push(`<clipPath id="${clip}"><path clip-rule="evenodd" d="M0 0H${timing.width}V${timing.height}H0Z${holes}"/></clipPath>`);
      boneShapes.push(`<g clip-path="url(#${clip})">${line(p,q,settings.projectBannerPoseColor,settings.projectBannerSkeletonWidth*unit)}</g>`);
    });
    points.forEach((p,i)=>{
      if(!usable(p))return;const name=pose.joints[i],color=name.startsWith('left_')?settings.projectBannerLeftColor:name.startsWith('right_')?settings.projectBannerRightColor:settings.projectBannerPoseColor;
      const inner=Math.max(0,radius-(settings.projectBannerJointRingWidth/2+settings.projectBannerJointCenterGap)*unit);
      jointShapes.push(circle(p,inner,color),circle(p,radius,'none',settings.projectBannerPoseColor,settings.projectBannerJointRingWidth*unit));
    });
    svg.innerHTML=`<defs>${clips.join('')}</defs><g data-layer="history">${historyShapes.join('')}</g><g data-layer="bones">${boneShapes.join('')}</g><g data-layer="joints">${jointShapes.join('')}</g>`;
    video.style.opacity='';root.dataset.geometryReady='true';
  }
  function end(){
    if(finished)return;finished=true;config.onEnded?.();
  }
  function tick(){
    frame=0;if(!wanted||disposed)return;
    if(!video.requestVideoFrameCallback)clock=video.currentTime;
    draw();frame=requestAnimationFrame(tick);
  }
  function followVideo(){
    if(!video.requestVideoFrameCallback||videoFrame||!wanted||disposed)return;
    videoFrame=video.requestVideoFrameCallback((_,metadata)=>{
      videoFrame=0;if(!wanted||disposed)return;
      if(!video.seeking){clock=metadata.mediaTime;draw();root.dataset.videoState='ready';}
      followVideo();
    });
  }
  function startVideo(){
    if(!wanted||disposed||reduced||video.readyState<2)return;
    // Use the native video clock from the first frame. An independent geometry
    // clock forced a visible rewind when the footage eventually caught up.
    followVideo();video.play().catch(()=>{});
  }
  video.addEventListener('canplay',startVideo,{signal:controller.signal});
  video.addEventListener('ended',end,{signal:controller.signal});
  async function load(){
    if(loading)return loading;
    loading=(async()=>{
      timing=await fetchPreviewJson(config.timing,{signal:controller.signal});if(disposed)return;
      pose=timing.previewPose;
      svg.setAttribute('viewBox',`0 0 ${timing.width} ${timing.height}`);draw();
    })().catch(error=>{if(!disposed)console.error('Could not load preview timing',error);});return loading;
  }
  async function loadMotion(){
    if(motionLoading)return motionLoading;
    motionLoading=(async()=>{
      await load();
      const data=await fetchPreviewJson(config.pose,{signal:controller.signal});if(disposed)return;
      pose=data;lastKey='';draw();
      if(!reduced){
        root.dataset.videoState='pending';
        // Paint the lightweight vector layer before starting the active footage.
        requestAnimationFrame(()=>{if(!disposed&&wanted&&!video.src){video.src=config.video;video.load();}});
      }
    })().catch(error=>{if(!disposed)console.error('Could not load vector preview',error);});return motionLoading;
  }
  function restart(){
    transition?.remove();transition=document.createElement('div');transition.className='project-vector-restart';
    // Only the video frame is raster. All overlay geometry remains native SVG.
    const snapshot=document.createElement('canvas');snapshot.width=video.videoWidth;snapshot.height=video.videoHeight;
    if(video.readyState>=2)snapshot.getContext('2d').drawImage(video,0,0);
    const image=new Image();image.src=snapshot.toDataURL('image/jpeg',.9);
    const oldSvg=svg.cloneNode(true);
    // Keep the cloned SVG's clip IDs distinct from the live frame during the crossfade.
    oldSvg.innerHTML=oldSvg.innerHTML.replaceAll(id,`${id}-restart`);
    transition.append(image,oldSvg);root.append(transition);clock=0;finished=false;video.currentTime=0;lastKey='';
    const overlay=transition;
    const fade=()=>{if(disposed)return;overlay.animate([{opacity:1},{opacity:0}],{duration:500,easing:'ease-out',fill:'forwards'}).finished.then(()=>overlay.remove()).catch(()=>{});};
    if(video.seeking)video.addEventListener('seeked',fade,{once:true,signal:controller.signal});else fade();
  }
  return {
    prepare:load,
    play(){wanted=true;if(finished||video.ended)restart();loadMotion().then(()=>{if(!wanted||disposed)return;if(!video.src&&!reduced){video.src=config.video;video.load();}startVideo();});if(!frame)frame=requestAnimationFrame(tick);},
    pause(){wanted=false;video.pause();if(videoFrame)video.cancelVideoFrameCallback(videoFrame);videoFrame=0;cancelAnimationFrame(frame);frame=0;},
    destroy(){disposed=true;wanted=false;controller.abort();cancelAnimationFrame(frame);if(videoFrame)video.cancelVideoFrameCallback(videoFrame);video.pause();video.removeAttribute('src');video.load();root.remove();}
  };
}
