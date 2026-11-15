import { design } from '../../design-settings.js';
const edges=[['nose','atlas'],['nose','top_head'],['nose','left_ear'],['nose','right_ear'],['left_shoulder','right_shoulder'],['left_shoulder','left_elbow'],['left_elbow','left_wrist'],['right_shoulder','right_elbow'],['right_elbow','right_wrist'],['left_shoulder','left_hip'],['right_shoulder','right_hip'],['left_hip','right_hip'],['left_hip','left_knee'],['left_knee','left_ankle'],['right_hip','right_knee'],['right_knee','right_ankle'],['golf_club_grip','golf_club_shaft'],['golf_club_shaft','golf_club_heel'],['golf_club_heel','golf_club_head']];
export function createBannerPreview(canvas, config) {
  if(config.rendered) return createRenderedBannerPreview(canvas,config);
  const controller=new AbortController();
  const video=document.createElement('video');
  video.muted=true;video.playsInline=true;video.loop=true;video.preload='none';
  const poster=new Image();
  let pose,timing,frame=0,wanted=false,disposed=false,loading;
  const context=canvas.getContext('2d');
  const usable=p=>p && Number.isFinite(p[0]) && Number.isFinite(p[1]) && (p[0]!==0 || p[1]!==0) && (p.length<3 || p[2]>=0);
  function draw() {
    if(!timing || disposed)return;
    canvas.width=800;canvas.height=Math.round(800/(config.aspectRatio || 4/3));
    const height=canvas.height;
    context.fillStyle='#080808';context.fillRect(0,0,800,height);
    const fit=800/timing.width;
    const displayScale=800/Math.max(1,canvas.clientWidth || 400);
    const screenUnit=displayScale/fit;
    context.save();context.translate((800-timing.width*fit)/2,(height-timing.height*fit)/2);context.scale(fit,fit);
    const ready=video.readyState>=2;
    if(ready)context.drawImage(video,0,0,timing.width,timing.height);
    else if(poster.complete && poster.naturalWidth)context.drawImage(poster,0,0,timing.width,timing.height);
    const time=video.currentTime;
    let index=0;
    while(index+1<timing.times.length && timing.times[index+1]<=time)index++;
    const data=ready && pose?pose:timing.previewPose;
    const points=data?.pred?.[ready&&pose?index:0];
    if(points) {
      if(ready && pose) {
        const historyCount=design.effects.projectBannerHistoryFrames;
        const history=[...(pose.history || []),...pose.pred.slice(0,index+1) ].slice(-historyCount-1);
        const club=edges.filter(([a])=>a.startsWith('golf_club_'));
        const trailJoints=design.effects.projectBannerTrailJoints.map(name=>pose.joints.indexOf(name)).filter(index=>index>=0);
        const previous=new Map();
        history.forEach((sample,i)=> {
          const opacity=design.effects.projectBannerHistoryOpacity*((i+1)/Math.max(1,history.length))**2;
          context.globalAlpha=opacity;context.strokeStyle='#a2d8b9';context.fillStyle='#a2d8b9';context.lineWidth=design.effects.projectBannerGhostWidth*screenUnit;context.lineCap='round';
          for(const [a,b] of club) {
            const p=sample[pose.joints.indexOf(a)],q=sample[pose.joints.indexOf(b)];
            if(!usable(p)||!usable(q))continue;
            context.beginPath();context.moveTo(p[0],p[1]);context.lineTo(q[0],q[1]);context.stroke();
          }
          for(const jointIndex of trailJoints) {
            const point=sample[jointIndex],last=previous.get(jointIndex);
            if(usable(point)) {
              context.globalAlpha=design.effects.projectBannerTrailOpacity*(.2+.8*(i+1)/Math.max(1,history.length));
              context.strokeStyle='#63f5b4';context.fillStyle='#9affcf';
              context.lineWidth=design.effects.projectBannerTrailWidth*screenUnit;
              if(last) {context.beginPath();context.moveTo(last[0],last[1]);context.lineTo(point[0],point[1]);context.stroke();}
              context.beginPath();context.arc(point[0],point[1],design.effects.projectBannerTrailDotRadius*screenUnit,0,Math.PI*2);context.fill();
              previous.set(jointIndex,point);
            } else previous.delete(jointIndex);
          }
        });
        context.globalAlpha=1;
      }
      context.strokeStyle='#63f5b4';context.fillStyle='#63f5b4';context.lineWidth=design.effects.projectBannerSkeletonWidth*screenUnit;context.lineCap='round';
      for(const [a,b] of edges) {
        const p=points[data.joints.indexOf(a)],q=points[data.joints.indexOf(b)];
        if(!usable(p)||!usable(q))continue;
        context.beginPath();context.moveTo(p[0],p[1]);context.lineTo(q[0],q[1]);context.stroke();
      }
      for(const point of points)if(usable(point)) {context.beginPath();context.arc(point[0],point[1],design.effects.projectBannerJointRadius*screenUnit,0,Math.PI*2);context.fill();}
    }
    context.restore();
    canvas.hidden=false;
  }
  function tick() {frame=0;draw();if(wanted&&!disposed)frame=requestAnimationFrame(tick);}
  async function load() {
    if(loading)return loading;
    loading=(async()=> {
      const get=async url=>{const r=await fetch(url,{signal:controller.signal});if(!r.ok)throw new Error('Banner asset failed');return r.json();};
      [pose,timing]=await Promise.all([get(config.pose),get(config.timing)]);
      if(disposed)return;
      poster.src=config.poster;await poster.decode().catch(()=>{});
      if(disposed)return;
      draw();
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches) {video.src=config.video;video.load();if(wanted)video.play().catch(()=>{});}
    })().catch(()=>{if(!disposed)canvas.hidden=true;});
    return loading;
  }
  return {
    play(){wanted=true;load();if(video.src)video.play().catch(()=>{});if(!frame)frame=requestAnimationFrame(tick);},
    pause(){wanted=false;video.pause();cancelAnimationFrame(frame);frame=0;},
    destroy(){disposed=true;wanted=false;controller.abort();cancelAnimationFrame(frame);video.pause();video.removeAttribute('src');video.load();}
  };
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
      canvas.width=800;canvas.height=600;
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
