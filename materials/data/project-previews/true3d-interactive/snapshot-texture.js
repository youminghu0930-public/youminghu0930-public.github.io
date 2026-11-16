import * as THREE from './materials/projects/pose-information-extraction/vendor/three/three.module.js';

// Preserve Three's video upload/color path without its asynchronous per-video
// callbacks. Each decoder publishes only after its matching raw frame settles.
export function createCommittedVideoTexture(video){
  const texture=new THREE.Texture(video);
  texture.isVideoTexture=true;
  texture.minFilter=texture.magFilter=THREE.LinearFilter;
  texture.generateMipmaps=false;
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.update=()=>{};
  texture.commit=()=>{texture.needsUpdate=true;};
  return texture;
}

export function annotationDiameter(imageScale){
 const scale=Math.max(.0001,imageScale);
 return Math.max(10,Math.min(36,16*Math.sqrt(scale)))/scale;
}
// Bake detections and the decoded image into one committed camera surface.
export function createAnnotatedVideoTexture(video,{names,edges,getPose,makeCanvas=()=>document.createElement('canvas')}){
 const canvas=makeCanvas(),ctx=canvas.getContext('2d');
 const frozen=makeCanvas(),frozenContext=frozen.getContext('2d');
 let committedFrame,hasFrame=false,imageScale=1;
 const texture=new THREE.CanvasTexture(canvas);
 texture.minFilter=texture.magFilter=THREE.LinearFilter;
 texture.generateMipmaps=false;texture.colorSpace=THREE.SRGBColorSpace;
 const paint=()=>{
  const w=frozen.width,h=frozen.height;if(!hasFrame)return;
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
  ctx.clearRect(0,0,w,h);ctx.drawImage(frozen,0,0,w,h);
  const points=getPose(committedFrame),size=annotationDiameter(imageScale),ring=size*.425,stroke=size*.15;
  const valid=p=>p&&Number.isFinite(p[0])&&Number.isFinite(p[1])&&!(p[0]===0&&p[1]===0)&&(p.length<3||p[2]>0);
  ctx.strokeStyle='#ffce69';ctx.lineWidth=stroke;ctx.lineCap='round';
  ctx.beginPath();
  for(const [a,b] of edges){
   const p=points?.[a],q=points?.[b];if(!valid(p)||!valid(q))continue;
   const dx=q[0]-p[0],dy=q[1]-p[1],length=Math.hypot(dx,dy);if(length<=2*ring)continue;
   ctx.moveTo(p[0]+dx*ring/length,p[1]+dy*ring/length);
   ctx.lineTo(q[0]-dx*ring/length,q[1]-dy*ring/length);
  }
  ctx.stroke();
  names.forEach((name,i)=>{
   const p=points?.[i];if(name==='golf_club_shaft'||!valid(p))return;
   ctx.beginPath();ctx.arc(p[0],p[1],ring,0,Math.PI*2);ctx.stroke();
   ctx.fillStyle=name.startsWith('left_')?'#3b82f6':name.startsWith('right_')?'#ef4444':'#ffce69';
   ctx.beginPath();ctx.arc(p[0],p[1],size*.29,0,Math.PI*2);ctx.fill();
  });
  texture.needsUpdate=true;
 };
 texture.commit=frame=>{
  const w=video.videoWidth,h=video.videoHeight;if(!w||!h)return;
  if(frozen.width!==w||frozen.height!==h){frozen.width=w;frozen.height=h;}
  frozenContext.clearRect(0,0,w,h);frozenContext.drawImage(video,0,0,w,h);
  committedFrame=frame;hasFrame=true;paint();
 };
 texture.setImageScale=value=>{
  if(!Number.isFinite(value)||value<=0||Math.abs(value-imageScale)<.00001)return;
  imageScale=value;paint();
 };
 return texture;
}
