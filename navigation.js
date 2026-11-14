import { design } from './design-settings.js';
export function installNavigation() {
  const header = document.querySelector('header');
  const nav = document.querySelector('#section-navigation');
  const toggle = document.querySelector('.navigation-toggle');
  const backdrop = document.querySelector('.navigation-backdrop');
  const mobile = matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  let restoreFocus = null;
  let oldOverflow = null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let drag = null;
  let dragged = false;
  let clickReset;
  function resetDrag() {
    drag = null;
    nav.dataset.dragging = 'false';
    nav.style.setProperty('--menu-drag-y', '0px');
    nav.style.setProperty('--menu-drag-scale', '1');
  }
  nav.addEventListener('touchstart', event => {
    clearTimeout(clickReset);
    dragged = false;
    if (!mobile.matches || reduced.matches || toggle.getAttribute('aria-expanded') !== 'true' || event.touches.length !== 1) return;
    const finger = event.touches[0];
    drag = {id:finger.identifier, y:finger.clientY};
  }, {passive:true});
  nav.addEventListener('touchmove', event => {
    if (!drag || event.touches.length !== 1) { resetDrag(); return; }
    const finger = Array.from(event.touches).find(touch => touch.identifier === drag.id);
    if (!finger) return;
    const dy = finger.clientY - drag.y;
    if (Math.abs(dy) > 8) dragged = true;
    const canScroll = nav.scrollHeight > nav.clientHeight + 1;
    const atTop = nav.scrollTop <= 0;
    const atBottom = nav.scrollTop + nav.clientHeight >= nav.scrollHeight - 1;
    const elastic = !canScroll || (atTop && dy > 0) || (atBottom && dy < 0);
    if (!elastic) {
      nav.style.setProperty('--menu-drag-y', '0px');
      nav.style.setProperty('--menu-drag-scale', '1');
      drag.y = finger.clientY;
      return;
    }
    if (event.cancelable) event.preventDefault();
    const limit = design.effects.menuElasticMaxDistance;
    const distance = Math.sign(dy) * limit * (1 - Math.exp(-Math.abs(dy) / design.effects.menuElasticResistance));
    nav.dataset.dragging = 'true';
    nav.style.setProperty('--menu-drag-y', `${distance}px`);
    nav.style.setProperty('--menu-drag-scale', String(1 - Math.max(0, -distance) / limit * design.effects.menuElasticCompression));
  }, {passive:false});
  function releaseDrag() {
    resetDrag();
    clickReset = setTimeout(() => { dragged = false; }, 400);
  }
  nav.addEventListener('touchend', releaseDrag, {passive:true});
  nav.addEventListener('touchcancel', releaseDrag, {passive:true});
  nav.addEventListener('click', event => {
    if (dragged) { event.preventDefault(); event.stopImmediatePropagation(); dragged = false; }
  }, {capture:true});
  function setNavigation(expanded, focusMenu = false) {
    const opened = expanded && mobile.matches;
    if (!opened) resetDrag();
    toggle.setAttribute('aria-expanded', String(expanded));
    header.dataset.expanded = String(expanded);
    nav.inert = !expanded;
    backdrop.dataset.visible = String(opened);
    toggle.setAttribute('aria-label', `${opened ? toggle.dataset.closeLabel : toggle.dataset.openLabel} navigation`);
    if (opened) {
      if (oldOverflow === null) { oldOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; }
      document.querySelector('main')?.setAttribute('inert', '');
      if (focusMenu) { restoreFocus = document.activeElement; nav.querySelector('a')?.focus(); }
    } else {
      if (oldOverflow !== null) { document.body.style.overflow = oldOverflow; oldOverflow = null; }
      document.querySelector('main')?.removeAttribute('inert');
    }
  }
  setNavigation(!mobile.matches);
  mobile.addEventListener('change', () => setNavigation(!mobile.matches));
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    setNavigation(expanded, expanded);
  });
  function close() { setNavigation(false); (restoreFocus || toggle).focus(); restoreFocus = null; }
  backdrop.addEventListener('click', close);
  nav.addEventListener('click', event => { if (mobile.matches && event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => {
    if (!mobile.matches || toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { close(); return; }
    if (event.key === 'Tab') {
      const links = Array.from(nav.querySelectorAll('a'));
      const first = links[0]; const last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); toggle.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.focus(); }
      else if (document.activeElement === toggle) { event.preventDefault(); (event.shiftKey ? last : first)?.focus(); }
    }
  });
  return {close: () => { if (mobile.matches) setNavigation(false); }};
}
