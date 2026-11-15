import { design } from '../../design-settings.js';
import { createExpansionScrollGuard } from './expansion-scroll.js';

export function installSkillsAccordion(root, {setScrollPosition} = {}) {
  const controller = new AbortController();
  const { signal } = controller;
  const expansionScroll = createExpansionScrollGuard({signal, setScrollPosition});
  const rows = [...root.querySelectorAll('.skills-group')];
  let openRow = null;
  let hoveredRow = null;
  let dismissedRow = null;
  let cooldownUntil = 0;
  let closeTimer;
  let expandTimer;
  let cooldownTimer;
  let disposed = false;
  const supportsHover = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
  function updateMarqueeSpeed() {
    if (disposed) return;
    const reference = rows.find(row => row.dataset.marqueeReference === 'true');
    const referenceRun = reference?.querySelector('.skills-hover-run');
    if (!referenceRun) return;
    const dot = reference.querySelector('.skills-hover-dot');
    // Preserve AI Research's earlier pace, including the width of its old
    // three-logo separator, while allowing each new dot-only loop to differ.
    const referenceWidth = referenceRun.getBoundingClientRect().width
      + design.effects.skillsMarqueeRepeats * (design.effects.skillsMarqueeReferenceSeparatorWidth - dot.getBoundingClientRect().width);
    if (referenceWidth <= 0) return;
    const speed = referenceWidth / design.effects.skillsMarqueeReferenceSeconds;
    for (const row of rows) {
      const width = row.querySelector('.skills-hover-run')?.getBoundingClientRect().width;
      if (width > 0) row.style.setProperty('--skills-marquee-duration', `${width / speed}s`);
    }
  }
  const marqueeObserver = new ResizeObserver(updateMarqueeSpeed);
  rows.forEach(row => {
    const run = row.querySelector('.skills-hover-run');
    if (run) marqueeObserver.observe(run);
  });
  updateMarqueeSpeed();
  document.fonts?.ready.then(updateMarqueeSpeed);


  function setOpen(row, open) {
    row.classList.toggle('is-open', open);
    row.querySelector('.skills-toggle').setAttribute('aria-expanded', String(open));
    const panel = row.querySelector('.skills-panel');
    panel.setAttribute('aria-hidden', String(!open));
    panel.inert = !open;
  }
  function setHovered(row) {
    hoveredRow = row;
    rows.forEach(other => other.classList.toggle('is-hovered', other === row));
  }
  function setCooldown(active) {
    if (active) document.documentElement.dataset.skillsCooldown = 'true';
    else delete document.documentElement.dataset.skillsCooldown;
    window.dispatchEvent(new Event('skills-cooldownchange'));
  }
  function collapse(row) {
    if (openRow !== row || !row) return;
    expansionScroll.cancel();
    setOpen(row, false);
    openRow = null;
    // The cooldown begins when content actually starts collapsing.
    cooldownUntil = performance.now() + design.effects.skillsCollapseCooldownMs;
    clearTimeout(cooldownTimer);
    setCooldown(true);
    cooldownTimer = setTimeout(() => setCooldown(false), design.effects.skillsCollapseCooldownMs);
  }
  function expand(row) {
    if (openRow === row) return;
    if (openRow) collapse(openRow);
    expansionScroll.hold(row.querySelector('.skills-panel'));
    setOpen(row, true);
    openRow = row;
  }
  function expandHovered() {
    clearTimeout(expandTimer);
    if (!hoveredRow || hoveredRow === dismissedRow || openRow === hoveredRow) return;
    if (openRow) collapse(openRow);
    const remaining = cooldownUntil - performance.now();
    if (remaining > 0) {
      expandTimer = setTimeout(expandHovered, remaining);
      return;
    }
    expand(hoveredRow);
  }
  for (const row of rows) {
    const toggle = row.querySelector('.skills-toggle');
    row.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse' || !supportsHover()) return;
      if (expansionScroll.ignoreShiftedBoundary()) return;
      clearTimeout(closeTimer);
      setHovered(row);
      expandHovered();
    }, {signal});
    row.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'mouse' || !supportsHover()) return;
      if (expansionScroll.ignoreShiftedBoundary()) return;
      if (dismissedRow === row) dismissedRow = null;
      if (hoveredRow === row) {
        setHovered(null);
        clearTimeout(expandTimer);
      }
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => collapse(row), design.effects.skillsCloseDelay);
    }, {signal});
    toggle.addEventListener('click', event => {
      clearTimeout(closeTimer);
      if (event.detail && supportsHover()) {
        setHovered(row);
        if (openRow === row) {
          dismissedRow = row;
          clearTimeout(expandTimer);
          collapse(row);
        } else if (dismissedRow !== row) {
          expandHovered();
        }
        return;
      }
      // Explicit touch and keyboard actions remain immediate.
      clearTimeout(expandTimer);
      if (openRow === row) collapse(row);
      else expand(row);
    }, {signal});
    row.addEventListener('focusout', event => {
      // Touch scrolling can move focus without an intentional close action.
      // Keep mobile panels open until their heading is tapped again.
      if (supportsHover() && !row.contains(event.relatedTarget) && !row.matches(':hover')) collapse(row);
    }, {signal});
    row.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        clearTimeout(expandTimer);
        clearTimeout(closeTimer);
        setHovered(null);
        collapse(row);
        toggle.focus();
      }
    }, {signal});
  }
  return () => {
    disposed = true;
    expansionScroll.cancel();
    marqueeObserver.disconnect();
    rows.forEach(row => row.style.removeProperty('--skills-marquee-duration'));
    clearTimeout(closeTimer);
    clearTimeout(expandTimer);
    clearTimeout(cooldownTimer);
    setCooldown(false);
    setHovered(null);
    controller.abort();
  };
}
