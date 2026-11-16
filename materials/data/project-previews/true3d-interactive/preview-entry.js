import {mountSnapshotCard} from './snapshot-viewer.js';
// The parent starts playback explicitly; preparing a collapsed scene loads no video.
window.previewPaused=window.parent!==window;
window.addEventListener('pointermove',event=>{if(event.pointerType==='mouse')parent.postMessage({type:'preview-pointer',x:event.clientX,y:event.clientY,pointerType:event.pointerType},location.origin);},{capture:true,passive:true});
window.addEventListener('message',event=>{if(event.source===parent&&event.data?.type==='preview-visibility')window.previewPaused=!event.data.visible;});
try{await mountSnapshotCard(document.getElementById('feature-card'),'00',{range:[0,null]},'Absolute hip, shoulder rotations and x factor','feature-2');
const scene=document.querySelector('.snapshot-overview-scene');
const layer=document.createElement('div');layer.className='preview-measurement-layer';
layer.append(...scene.querySelectorAll('.rotation-angle-labels,.snapshot-rotation-plots'));scene.append(layer);
// Expose the scene only after its canvas, metrics and sizing have painted.
requestAnimationFrame(()=>requestAnimationFrame(()=>parent.postMessage({type:'preview-ready'},location.origin)));
}catch(error){document.getElementById('feature-card').textContent='Preview unavailable. Open the project to explore the demo.';console.error(error);}
