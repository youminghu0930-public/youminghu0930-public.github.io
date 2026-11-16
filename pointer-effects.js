import { design } from './design-settings.js';

export function installPointerEffects(hero) {
  const controller = new AbortController();
  const signal = controller.signal;
  const options = design.effects;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = hero?.querySelector('.hero-dots');
  const ctx = canvas?.getContext('2d');
  const stripe = hero?.parentElement?.querySelector('.landing-stripe');
  const cursor = document.createElement('div');
  cursor.className = 'pointer-diamond';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="cursor-frame"><span class="cursor-rotor"><i></i><i></i><i></i><i></i></span></span>';
  document.body.append(cursor);
  let pointer = null;
  let target = null;
  let trackingFrame = 0;
  let cornerColor = null;
  let touchId = null;
  let releaseTimer;
  let touchStrength = 0;
  let touchFrame;
  function fadeTouch(to) {
    cancelAnimationFrame(touchFrame);
    const from = touchStrength;
    const start = performance.now();
    const duration = to ? options.touchFadeInMs : options.touchFadeOutMs;
    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = progress * progress * (3 - 2 * progress);
      touchStrength = from + (to - from) * eased;
      if (progress === 1 && to === 0 && pointer?.touch) pointer = null;
      draw();
      if (progress < 1) touchFrame = requestAnimationFrame(step);
    }
    touchFrame = requestAnimationFrame(step);
  }
  const frame = cursor.firstElementChild;
  const corners = Array.from(frame.querySelectorAll('i'));
  const actionGroup = hero?.querySelector('.landing-actions');
  const magneticButtons = Array.from(actionGroup?.querySelectorAll('.landing-action') || []);
  function resetMagnets() {
    magneticButtons.forEach(button => {
      button.style.setProperty('--magnet-x', '0px');
      button.style.setProperty('--magnet-y', '0px');
    });
  }
  function updateMagnets(x, y) {
    if (!actionGroup) return;
    const base = actionGroup.getBoundingClientRect();
    for (const button of magneticButtons) {
      // Offset geometry is unaffected by the magnetic translation itself.
      const dx = x - (base.left + button.offsetLeft + button.offsetWidth / 2);
      const dy = y - (base.top + button.offsetTop + button.offsetHeight / 2);
      const distance = Math.hypot(dx, dy);
      const radius = Math.max(button.offsetWidth, button.offsetHeight) / 2 + options.buttonMagnetRange;
      const pull = Math.max(0, 1 - distance / radius);
      const amount = options.buttonMagnetStrength * pull;
      button.style.setProperty('--magnet-x', `${distance ? dx / distance * amount : 0}px`);
      button.style.setProperty('--magnet-y', `${distance ? dy / distance * amount : 0}px`);
    }
  }
  let flights = [];
  const stopFlights = () => { flights.forEach(animation => animation.cancel()); flights = []; };
  function targetBounds() {
    if (!target) return null;
    const bounds=target.getBoundingClientRect();
    if (target.matches('.project-title-link')) {
      const row=target.closest('.project-row-link').getBoundingClientRect();
      // Header corners span both columns, independently of the title control's width.
      return {left:row.left,right:row.right,top:bounds.top,bottom:bounds.bottom,width:row.width,height:bounds.height};
    }
    return bounds;
  }
  function flyToTarget(previous, direct = false) {
    stopFlights();
    if (!pointer || reduced.matches) return;
    const bounds = targetBounds();
    const center = bounds ? {x:bounds.left + bounds.width / 2, y:bounds.top + bounds.height / 2} : {x:pointer.x,y:pointer.y};
    const transform=getComputedStyle(frame.querySelector('.cursor-rotor')).transform;
    const inverse=new DOMMatrix(transform==='none'?undefined:transform).inverse();
    corners.forEach((corner, index) => {
      const end = corner.getBoundingClientRect();
      const x = end.left + end.width / 2, y = end.top + end.height / 2;
      const from = previous[index] || {x:pointer.x, y:pointer.y};
      if (direct && Math.hypot(from.x-x,from.y-y)<.5) return;
      const offset=new DOMPoint(from.x-x,from.y-y).matrixTransform(inverse);
      const keyframes=direct ? [
        {transform:`translate(${offset.x}px, ${offset.y}px)`,borderColor:cornerColor},
        {transform:'translate(0, 0)',borderColor:cornerColor}
      ] : [
        {transform:`translate(${from.x - x}px, ${from.y - y}px)`,borderColor:cornerColor,offset:0},
        {transform:`translate(${center.x - x}px, ${center.y - y}px) scale(1)`,borderColor:cornerColor,offset:options.cursorGatherOffset},
        {transform:'translate(0, 0) scale(1)',borderColor:cornerColor,offset:1}
      ];
      flights.push(corner.animate(keyframes,{duration:options.cursorFlightDuration,delay:direct?0:index*options.cursorFlightStagger,easing:'cubic-bezier(.2,.7,.25,1)',fill:'backwards'}));
    });
  }
  const palette = getComputedStyle(hero || document.documentElement);
  const accent = palette.getPropertyValue('--accent').trim();
  const muted = palette.getPropertyValue('--muted').trim();
  function draw() {
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.round(rect.width * ratio), height = Math.round(rect.height * ratio);
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    const bounds = hero.getBoundingClientRect();
    const stripeBounds = stripe?.getBoundingClientRect();
    const interactionBottom = Math.max(bounds.bottom, stripeBounds?.bottom ?? bounds.bottom);
    const inside = pointer && (pointer.touch || fine.matches) && !reduced.matches
      && pointer.x >= rect.left && pointer.x < rect.right
      && pointer.y >= bounds.top && pointer.y < interactionBottom;
    const influenceRadius = pointer?.touch ? options.touchDotInfluenceRadius : options.dotInfluenceRadius;
    for (let y = options.dotSpacing / 2; y < rect.height; y += options.dotSpacing) {
      for (let x = options.dotSpacing / 2; x < rect.width; x += options.dotSpacing) {
        const dx = inside ? x - (pointer.x - rect.left) : 0;
        const dy = inside ? y - (pointer.y - rect.top) : 0;
        const distance = Math.hypot(dx, dy);
        const t = inside ? Math.max(0, 1 - distance / influenceRadius) : 0;
        // Smoothstep gives a soft boundary and avoids a sharp central pinch.
        const influence = t * t * (3 - 2 * t) * (pointer?.touch ? touchStrength : 1);
        const displacement = pointer?.touch ? options.touchDotDisplacement : options.dotDisplacement;
        const offset = influence * displacement * Math.min(1, distance / influenceRadius);
        const px = x + (distance ? dx / distance * offset : 0);
        const py = y + (distance ? dy / distance * offset : 0);
        const radius = options.dotRadius * (1 + influence * options.dotEnlargement);
        // Crossfade dot colors too; switching to accent at first contact would pop.
        ctx.globalAlpha = options.dotBaseOpacity * (1 - influence);
        ctx.fillStyle = muted;
        ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI * 2); ctx.fill();
        if (influence > 0) {
          ctx.globalAlpha = options.dotHighlightOpacity * influence;
          ctx.fillStyle = accent;
          ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;
  }
  function position() {
    if (!pointer) return;
    const rect = targetBounds();
    const padding = target?.closest('.breadcrumbs') ? options.breadcrumbCursorPadding : target ? options.cursorButtonPadding : 0;
    // Position is assigned directly: no easing or trailing interpolation.
    cursor.style.transform = `translate3d(${rect ? rect.left + rect.width / 2 : pointer.x}px, ${rect ? rect.top + rect.height / 2 : pointer.y}px, 0)`;
    frame.style.width = rect ? `${rect.width + padding * 2}px` : '';
    frame.style.height = rect ? `${rect.height + padding * 2}px` : '';
    frame.style.transform = 'translate(-50%, -50%)';
    cursor.dataset.link = String(Boolean(rect));
    // Color comes only from the resolved control's state, never the previous target.
    const inactiveNavigation = target?.matches('#section-navigation a:not([aria-current="page"])');
    cursor.dataset.tone = target && !inactiveNavigation ? 'accent' : 'neutral';
    // Give animated borders concrete colors. Inherited currentColor can remain
    // cached on composited corner layers while their transform is animating.
    const nextColor = getComputedStyle(frame).color;
    if (cornerColor !== nextColor) {
      stopFlights();
      cornerColor = nextColor;
      for (const corner of corners) corner.style.borderColor = nextColor;
    }
  }
  function resolveTarget(node) {
    if (!(node instanceof Element)) return null;
    const marked = node.closest('[data-cursor-target]');
    const control = node.closest('a[href], button, [role="button"], [role="scrollbar"]');
    // Skill headings frame the entire expandable card; links inside it frame themselves.
    const next = control?.matches('.skills-toggle') ? marked || control : control || marked;
    return next?.matches(':disabled') || next?.closest('[hidden], [inert], [aria-disabled="true"]') ? null : next;
  }
  function setTarget(next) {
    if (next === target) return;
    targetObserver.disconnect();
    target = next;
    if (target) targetObserver.observe(target);
  }
  function retarget(animate = false) {
    if (!pointer || pointer.touch || cursor.hidden) return;
    const hit = document.elementFromPoint(pointer.x, pointer.y);
    if (hit instanceof HTMLIFrameElement && !hit.closest('[data-cursor-target]')) { hide(); return; }
    const next = resolveTarget(hit);
    const changed = next !== target;
    const direct = Boolean(target);
    const shouldAnimate = animate || direct;
    const previous = changed && shouldAnimate ? corners.map(corner => {
      const rect = corner.getBoundingClientRect();
      return {x:rect.left + rect.width / 2, y:rect.top + rect.height / 2};
    }) : [];
    if (changed) stopFlights();
    setTarget(next);
    position();
    if (changed && shouldAnimate) flyToTarget(previous, direct);
  }
  function track() {
    trackingFrame = 0;
    if (!pointer || pointer.touch || cursor.hidden) return;
    // Layout/hover animations can move controls beneath a stationary pointer.
    // Use the same physical hit test as pointer movement on every visible frame.
    retarget();
    if (pointer && !cursor.hidden) trackingFrame = requestAnimationFrame(track);
  }
  function refreshTarget() {
    if (fine.matches && !reduced.matches) retarget();
    draw();
  }
  function hide() { cancelAnimationFrame(trackingFrame); trackingFrame = 0; cancelAnimationFrame(touchFrame); touchStrength = 0; resetMagnets(); clearTimeout(releaseTimer); touchId = null; stopFlights(); cursor.hidden = true; pointer = null; setTarget(null); draw(); }
  function move(event) {
    if (event.pointerType === 'touch') return;
    if (!fine.matches || reduced.matches) { hide(); return; }
    pointer = {x:event.clientX, y:event.clientY};
    updateMagnets(event.clientX, event.clientY);
    cursor.hidden = false;
    // event.target may be a captured pointer's old control; never use it for color.
    retarget(true);
    if (pointer && !cursor.hidden && !trackingFrame) trackingFrame = requestAnimationFrame(track);
    draw();
  }
  function updateTouch(event) {
    if (reduced.matches) return;
    const beginning = touchId === null;
    const touches = Array.from(event.touches);
    if (touchId === null) touchId = touches[0]?.identifier ?? null;
    const touch = touches.find(item => item.identifier === touchId);
    if (!touch) return;
    clearTimeout(releaseTimer);
    stopFlights();
    cursor.hidden = true;
    setTarget(null);
    pointer = {x:touch.clientX, y:touch.clientY, touch:true};
    if (beginning) fadeTouch(1);
    draw();
  }
  function endTouch(event) {
    if (Array.from(event.touches).some(item => item.identifier === touchId)) return;
    touchId = null;
    clearTimeout(releaseTimer);
    fadeTouch(0);
  }
  window.addEventListener('touchstart', updateTouch, {passive:true, signal});
  window.addEventListener('touchmove', updateTouch, {passive:true, signal});
  window.addEventListener('touchend', endTouch, {passive:true, signal});
  window.addEventListener('touchcancel', () => { touchId = null; fadeTouch(0); }, {passive:true, signal});
  // Capture keeps nested controls from leaving the cursor on its previous target.
  window.addEventListener('pointermove', move, {passive:true, capture:true, signal});
  // Embedded 3D controls own their input; do not leave the parent cursor frozen at their edge.
  window.addEventListener('pointerover', event => { if (event.target instanceof HTMLIFrameElement && !event.target.closest('[data-cursor-target]')) hide(); }, {capture:true, signal});
  // Same-origin preview frames relay pointer coordinates without intercepting 3D gestures.
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin||event.data?.type!=='preview-pointer')return;
    const iframe=[...document.querySelectorAll('.project-interactive-frame')].find(frame=>frame.contentWindow===event.source);
    if(!iframe?.closest('[data-cursor-target]'))return;
    const {x,y,pointerType}=event.data;
    if(!Number.isFinite(x)||!Number.isFinite(y)||pointerType!=='mouse')return;
    const bounds=iframe.getBoundingClientRect();
    move({clientX:bounds.left+x,clientY:bounds.top+y,pointerType});
  },{signal});
  window.addEventListener('scroll', () => { resetMagnets(); stopFlights(); refreshTarget(); }, {passive:true, signal});
  window.addEventListener('resize', refreshTarget, {passive:true, signal});
  window.addEventListener('skills-cooldownchange', () => { stopFlights(); refreshTarget(); }, {signal});
  window.addEventListener('blur', hide, {signal});
  document.documentElement.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') hide(); }, {signal});
  fine.addEventListener('change', hide, {signal});
  reduced.addEventListener('change', hide, {signal});
  const stateObserver = new MutationObserver(refreshTarget);
  const app = document.getElementById('app');
  if (app) stateObserver.observe(app, {subtree:true, attributes:true,
    attributeFilter:['aria-current','aria-pressed','aria-disabled','disabled','hidden','inert','href','data-cursor-target']});
  const targetObserver = new ResizeObserver(() => position());
  const observer = new ResizeObserver(() => { position(); draw(); });
  if (hero) observer.observe(hero);
  hide();
  return () => { cancelAnimationFrame(trackingFrame); cancelAnimationFrame(touchFrame); resetMagnets(); clearTimeout(releaseTimer); stopFlights(); controller.abort(); stateObserver.disconnect(); observer.disconnect(); targetObserver.disconnect(); cursor.remove(); };
}
