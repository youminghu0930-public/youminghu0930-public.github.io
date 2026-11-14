import { design } from './design-settings.js';
export function installNavigation() {
  const header = document.querySelector('header');
  const nav = document.querySelector('#section-navigation');
  const toggle = document.querySelector('.navigation-toggle');
  const label = toggle.querySelector('.mobile-menu-label');
  const backdrop = document.querySelector('.navigation-backdrop');
  const mobile = matchMedia(`(max-width: ${design.mobileBreakpoint})`);
  let restoreFocus = null;
  let oldOverflow = null;
  function setNavigation(expanded, focusMenu = false) {
    const opened = expanded && mobile.matches;
    toggle.setAttribute('aria-expanded', String(expanded));
    header.dataset.expanded = String(expanded);
    nav.inert = !expanded;
    backdrop.dataset.visible = String(opened);
    if (label) label.textContent = opened ? toggle.dataset.closeLabel : toggle.dataset.openLabel;
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
