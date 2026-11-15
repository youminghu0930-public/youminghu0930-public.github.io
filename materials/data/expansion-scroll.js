// Keep layout-driven scroll adjustments from moving an opening accordion upward.
export function createExpansionScrollGuard({signal, setScrollPosition = position => window.scrollTo({...position, behavior:'instant'})}) {
  let cancel = () => {};
  let restorePosition = () => false;
  let correctedUntil = 0;
  window.addEventListener('scroll', () => restorePosition(), {passive:true, signal});
  function release() { cancel(); correctedUntil = 0; }
  for (const type of ['wheel','touchstart','pointerdown','keydown','resize']) {
    window.addEventListener(type, release, {passive:true, signal});
  }
  signal.addEventListener('abort', release, {once:true});
  function hold(panel, {anchor, anchorTop = anchor?.getBoundingClientRect().top} = {}) {
    release();
    const style = getComputedStyle(panel);
    const milliseconds = value => parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000) || 0;
    const durations = style.transitionDuration.split(',').map(milliseconds);
    const delays = style.transitionDelay.split(',').map(milliseconds);
    const duration = Math.max(...durations.map((value,index) => value + delays[index % delays.length]));
    if ((!duration || matchMedia('(prefers-reduced-motion: reduce)').matches) && !anchor) return;
    const position = {left:window.scrollX, top:window.scrollY};
    const deadline = performance.now() + duration + 34;
    let active = true;
    let frame;
    let timer;
    const restore = () => {
      if (!active) return false;
      // On touch switches, preserve the tapped heading's viewport position
      // as the previous panel above it shrinks, rather than fixing scrollY.
      const targetTop = anchor ? Math.max(0, window.scrollY + anchor.getBoundingClientRect().top - anchorTop) : position.top;
      if (Math.abs(window.scrollY - targetTop) > .5 || Math.abs(window.scrollX - position.left) > .5) {
        correctedUntil = performance.now() + 34;
        setScrollPosition({...position, top:targetTop});
        return true;
      }
      return false;
    };
    restorePosition = restore;
    const observer = new ResizeObserver(restore);
    cancel = () => {
      if (!active) return;
      active = false;
      restorePosition = () => false;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      observer.disconnect();
      delete document.documentElement.dataset.skillsExpanding;
    };
    document.documentElement.dataset.skillsExpanding = 'true';
    // Synchronize a smooth scroller's target before the document height changes.
    setScrollPosition(position);
    observer.observe(panel);
    function step() {
      if (!active) return;
      restore();
      if (performance.now() >= deadline) release();
      else frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    timer = setTimeout(release, duration + 50);
  }
  return {hold, cancel:release, ignoreShiftedBoundary:() => restorePosition() || performance.now() < correctedUntil};
}
