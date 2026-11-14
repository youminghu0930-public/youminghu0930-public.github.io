import { design } from './design-settings.js';

export function installPointerEffects(hero) {
  const options = design.effects;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = hero?.querySelector('.hero-dots');
  const ctx = canvas?.getContext('2d');
  const cursor = document.createElement('div');
  cursor.className = 'pointer-diamond';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="cursor-frame"><span class="cursor-rotor"><i></i><i></i><i></i><i></i></span></span>';
  document.body.append(cursor);
  let pointer = null;
  let target = null;
  const frame = cursor.firstElementChild;
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
    const inside = pointer && fine.matches && !reduced.matches && pointer.y >= rect.top && pointer.y <= rect.bottom;
    for (let y = options.dotSpacing / 2; y < rect.height; y += options.dotSpacing) {
      for (let x = options.dotSpacing / 2; x < rect.width; x += options.dotSpacing) {
        const dx = inside ? x - (pointer.x - rect.left) : 0;
        const dy = inside ? y - (pointer.y - rect.top) : 0;
        const distance = Math.hypot(dx, dy);
        const t = inside ? Math.max(0, 1 - distance / options.dotInfluenceRadius) : 0;
        // Smoothstep gives a soft boundary and avoids a sharp central pinch.
        const influence = t * t * (3 - 2 * t);
        const offset = influence * options.dotDisplacement * Math.min(1, distance / options.dotInfluenceRadius);
        ctx.globalAlpha = options.dotBaseOpacity + influence * (options.dotHighlightOpacity - options.dotBaseOpacity);
        ctx.fillStyle = influence > 0 ? accent : muted;
        ctx.beginPath();
        ctx.arc(x + (distance ? dx / distance * offset : 0), y + (distance ? dy / distance * offset : 0), options.dotRadius * (1 + influence * options.dotEnlargement), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
  function position() {
    if (!pointer) return;
    const rect = target?.getBoundingClientRect();
    const padding = target?.closest('.breadcrumbs') ? options.breadcrumbCursorPadding : 0;
    // Position is assigned directly: no easing or trailing interpolation.
    cursor.style.transform = `translate3d(${rect ? rect.left + rect.width / 2 : pointer.x}px, ${rect ? rect.top + rect.height / 2 : pointer.y}px, 0)`;
    frame.style.width = rect ? `${rect.width + padding * 2}px` : '';
    frame.style.height = rect ? `${rect.height + padding * 2}px` : '';
    frame.style.transform = 'translate(-50%, -50%)';
    cursor.dataset.link = String(Boolean(rect));
  }
  function hide() { cursor.hidden = true; pointer = null; target = null; draw(); }
  function move(event) {
    if (!fine.matches || reduced.matches || event.pointerType === 'touch') { hide(); return; }
    pointer = {x:event.clientX, y:event.clientY};
    target = event.target instanceof Element ? event.target.closest('header nav a, .breadcrumbs a') : null;
    cursor.hidden = false;
    position();
    draw();
  }
  window.addEventListener('pointermove', move, {passive:true});
  window.addEventListener('scroll', () => { target = null; position(); draw(); }, {passive:true});
  window.addEventListener('blur', hide);
  document.documentElement.addEventListener('pointerleave', hide);
  fine.addEventListener('change', hide);
  reduced.addEventListener('change', hide);
  if (hero) new ResizeObserver(() => { position(); draw(); }).observe(hero);
  hide();
}
