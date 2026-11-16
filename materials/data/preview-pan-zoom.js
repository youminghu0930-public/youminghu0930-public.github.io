export function installPreviewPanZoom(media,signal,options={}) {
  const stage=document.createElement('div');stage.className='project-preview-stage';
  stage.append(...media.childNodes);media.append(stage);
  const points=new Map();let zoom=1,x=0,y=0;
  const draw=()=>{
    let centerOffset=0;
    if(options.constrain){
      const width=media.clientWidth,height=media.clientHeight;
      const baseHeight=width/options.aspectRatio;
      const limitX=Math.max(0,(width*zoom-width)/2);
      const limitY=Math.max(0,(baseHeight*zoom-height)/2);
      x=Math.max(-limitX,Math.min(limitX,x));y=Math.max(-limitY,Math.min(limitY,y));
      stage.style.top='50%';stage.style.bottom='auto';stage.style.height=`${baseHeight}px`;
      centerOffset=baseHeight/2;
    }
    stage.style.transform=`translate(${x}px,${y-centerOffset}px) scale(${zoom})`;
  };
  const observer=options.constrain?new ResizeObserver(draw):null;
  observer?.observe(media);draw();
  const distance=()=>{const [a,b]=[...points.values()];return Math.hypot(a.x-b.x,a.y-b.y);};
  const scaleBy=ratio=>{zoom=Math.max(1,Math.min(6,zoom*ratio));if(zoom===1){x=0;y=0;}draw();};
  media.addEventListener('wheel',event=>{event.preventDefault();scaleBy(Math.exp(-event.deltaY*(event.ctrlKey?.01:.0015)));},{signal,passive:false});
  media.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    points.set(event.pointerId,{x:event.clientX,y:event.clientY});media.setPointerCapture(event.pointerId);
    media.classList.add('is-dragging');
  },{signal});
  media.addEventListener('pointermove',event=>{
    const old=points.get(event.pointerId);if(!old)return;
    const before=points.size===2?distance():0;
    x+=(event.clientX-old.x)/points.size;y+=(event.clientY-old.y)/points.size;
    points.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(before>0)scaleBy(distance()/before);else draw();
  },{signal});
  const release=event=>{points.delete(event.pointerId);if(!points.size)media.classList.remove('is-dragging');};
  for(const type of ['pointerup','pointercancel','lostpointercapture'])media.addEventListener(type,release,{signal});
  media.addEventListener('dblclick',()=>{zoom=1;x=0;y=0;draw();},{signal});
  return ()=>{points.clear();observer?.disconnect();};
}
