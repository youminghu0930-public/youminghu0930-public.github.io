// WebKit can drop frame callbacks queued while an iframe is clipped or hidden.
// Scene readiness must still finish so the parent can reveal/start the preview.
export function afterPreviewPaint(callback){
 let active=true,frame,timer;
 const finish=()=>{if(!active)return;active=false;cancelAnimationFrame(frame);clearTimeout(timer);callback();};
 frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(finish);});
 timer=setTimeout(finish,120);
 return ()=>{active=false;cancelAnimationFrame(frame);clearTimeout(timer);};
}
