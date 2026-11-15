import { design } from '../../design-settings.js';

export function installSkillsAccordion(root) {
  const controller = new AbortController();
  const { signal } = controller;
  const rows = [...root.querySelectorAll('.skills-group')];
  let timer;
  const setOpen = (row, open) => {
    row.classList.toggle('is-open', open);
    row.querySelector('.skills-toggle').setAttribute('aria-expanded', String(open));
    const panel = row.querySelector('.skills-panel');
    panel.setAttribute('aria-hidden', String(!open));
    panel.inert = !open;
  };
  const open = row => {
    clearTimeout(timer);
    rows.forEach(other => setOpen(other, other === row));
  };
  for (const row of rows) {
    const toggle = row.querySelector('.skills-toggle');
    row.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') open(row);
    }, {signal});
    row.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'mouse') return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        setOpen(row, false);
      }, design.effects.skillsCloseDelay);
    }, {signal});
    toggle.addEventListener('click', event => {
      // Mouse hover owns the open state; touch and keyboard can toggle it.
      if (event.detail && matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (row.classList.contains('is-open')) setOpen(row, false);
      else open(row);
    }, {signal});
    row.addEventListener('focusout', event => {
      if (!row.contains(event.relatedTarget) && !row.matches(':hover')) setOpen(row, false);
    }, {signal});
    row.addEventListener('keydown', event => {
      if (event.key === 'Escape') { setOpen(row, false); toggle.focus(); }
    }, {signal});
  }
  return () => { clearTimeout(timer); controller.abort(); };
}
