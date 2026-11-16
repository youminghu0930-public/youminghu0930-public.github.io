// Keep the optical/zoom center in the clear region above a bottom overlay.
// The overlay offset is separate from user pan so zoom scales only manual pan.
export function snapshotViewCenter(height,stripTop=height,panX=0,panY=0){
  const clearHeight=Math.max(0,Math.min(height,stripTop));
  return {clearHeight,cameraZoomScale:height>0?clearHeight/height:1,centerY:clearHeight/2,offsetX:-panX,offsetY:(height-clearHeight)/2-panY};
}

// Move a projected fixed focus into the usable area's center, retaining user pan.
export function focusedSnapshotOffset(width,height,viewport,projected){
 const targetY=1-viewport.clearHeight/height;
 return {offsetX:viewport.offsetX+projected.x*width/2,offsetY:viewport.offsetY+(targetY-projected.y)*height/2};
}

// Fit the combined subject bounds around the exact banner center.
export function bannerProjectionFit(points,margin=.08,targetX=0,targetY=0){
 const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
 const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const limit=1-margin,width=maxX-minX,height=maxY-minY;
 return {zoomFactor:Math.min(2*(limit-Math.abs(targetX))/Math.max(width,1e-8),2*(limit-Math.abs(targetY))/Math.max(height,1e-8)),centerX:(minX+maxX)/2,centerY:(minY+maxY)/2,targetX,targetY};
}
