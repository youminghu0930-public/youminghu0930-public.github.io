import { design } from './design-settings.js';

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function link(label, url, className) {
  const node = element('a', label, className);
  node.href = url;
  return node;
}
function installPageEntrance(hero, header, stripe = null, {animateHeader = true} = {}) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const settings = design.effects;
  const track = stripe?.querySelector('.stripe-track');
  function sizeTicker() {
    const width = track.firstElementChild.getBoundingClientRect().width;
    if (width > 0) track.style.setProperty('--stripe-duration', `${width / settings.stripePixelsPerSecond}s`);
  }
  let disposed = false;
  const controller = new AbortController();
  const tickerObserver = new ResizeObserver(sizeTicker);
  if (track) {
    sizeTicker();
    tickerObserver.observe(track.firstElementChild);
    document.fonts?.ready.then(() => { if (!disposed) sizeTicker(); });
  }
  const stopTicker = () => { disposed = true; tickerObserver.disconnect(); controller.abort(); };
  if (motion.matches) return stopTicker;
  const jobs = [];
  function prepare(node, delay, maxDuration = Infinity, fixedDuration = null, parallelLines = false) {
    if (!node) return;
    const text = node.textContent;
    const shell = element('span', undefined, 'type-shell');
    const reserved = element('span', text, 'type-reserved');
    reserved.setAttribute('aria-hidden', 'true');
    const visible = element('span', '', 'type-visible');
    visible.setAttribute('aria-hidden', 'true');
    const accessible = element('span', text, 'visually-hidden');
    shell.append(reserved, visible, accessible);
    node.replaceChildren(shell);
    node.dataset.typing = 'true';
    node.classList.add('typing-active');
    const chars = Array.from(text);
    const duration = fixedDuration ?? Math.min(chars.length * settings.typeCharacterMs, maxDuration);
    const lines = parallelLines ? text.split('\n').map(line => Array.from(line)) : null;
    jobs.push({node, visible, text, chars, lines, delay, duration, done:false});
  }
  prepare(hero.querySelector('.current-work'), settings.typeStatusDelay);
  prepare(hero.querySelector('.local-status > span'), settings.typeLocationDelay);
  prepare(hero.querySelector('.local-status time'), settings.typeLocationDelay);
  const title = hero.querySelector('.eyebrow');
  const paragraph = hero.querySelector('.intro, .section-intro');
  const sharedDuration = Array.from(title?.textContent || hero.querySelector('h1')?.textContent || '').length * settings.typeCharacterMs;
  prepare(title, settings.heroTypingDelay, Infinity, sharedDuration);
  prepare(paragraph, settings.heroTypingDelay, Infinity, sharedDuration, true);
  function finish(job) {
    job.node.textContent = job.text;
    job.node.classList.remove('typing-active');
    delete job.node.dataset.typing;
    job.done = true;
  }
  const start = performance.now();
  let frame;
  function tick(now) {
    let pending = false;
    for (const job of jobs) {
      if (job.done) continue;
      const progress = Math.max(0, (now - start - job.delay) / Math.max(1, job.duration));
      if (progress >= 1) finish(job);
      else {
        job.visible.textContent = job.lines
          ? job.lines.map(line => line.slice(0, Math.floor(progress * line.length)).join('')).join('\n')
          : job.chars.slice(0, Math.floor(progress * job.chars.length)).join('');
        pending = true;
      }
    }
    if (pending) frame = requestAnimationFrame(tick);
  }
  frame = requestAnimationFrame(tick);
  function complete() { cancelAnimationFrame(frame); jobs.filter(job => !job.done).forEach(finish); }
  motion.addEventListener('change', event => { if (event.matches) complete(); }, {signal:controller.signal});
  window.addEventListener('pagehide', complete, {once:true, signal:controller.signal});
  if (animateHeader) header.querySelectorAll('nav a').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
    item.classList.add('nav-entrance');
  });
  if (animateHeader) header.querySelector('.header-identity').classList.add('identity-entrance');
  stripe?.classList.add('stripe-entrance');
  prepare(hero.querySelector('.section-number'), settings.typeStatusDelay);
  hero.querySelector('.landing-actions')?.classList.add('actions-entrance');
  const breadcrumb = hero.querySelector('.breadcrumbs');
  breadcrumb?.classList.add('identity-entrance');
  return () => { complete(); stopTicker(); };
}

function createTitle(config) {
  const title = element('h1');
  title.id = 'landing-heading';
  const text = config.title.replace(/[.。]+$/, '') + (config.terminalDot ? '.' : '');
  title.setAttribute('aria-label', text);
  const line = element('span', undefined, 'name-line');
  line.setAttribute('aria-hidden', 'true');
  const words = text.split(/\s+/);
  let index = 0;
  words.forEach((text, wordIndex) => {
    const last = wordIndex === words.length - 1;
    const word = element('span', undefined, config.accentLastWord && last ? 'title-word title-accent' : 'title-word');
    for (const character of Array.from(text)) {
      const letter = element('span', character, 'name-letter');
      letter.style.setProperty('--letter-index', index++);
      word.append(letter);
    }
    line.append(word);
    if (!last) line.append(' ');
  });
  title.append(line);
  return title;
}
function createStripe(items) {
  const stripe = element('div', undefined, 'landing-stripe');
  const track = element('div', undefined, 'stripe-track');
  // Equal groups longer than a wide viewport make the half-track loop seamless.
  const repeats = Math.ceil(32 / items.length);
  for (let group = 0; group < 2; group++) {
    const list = element('ul');
    if (group) list.setAttribute('aria-hidden', 'true');
    for (let repeat = 0; repeat < repeats; repeat++) {
      for (const text of items) {
        const item = element('li', text);
        if (repeat) item.setAttribute('aria-hidden', 'true');
        list.append(item);
      }
    }
    track.append(list);
  }
  stripe.append(track);
  return stripe;
}
function createStatus(work) {
  const status = element('div', undefined, 'hero-status');
  const text = `${work.label} ${work.role}${work.company ? ` ${work.connector} ${work.company}` : ''}`;
  const role = element('p', text, 'current-work');
  const local = element('div', undefined, 'local-status');
  const clock = element('time');
  clock.setAttribute('aria-label', work.clockLabel);
  clock.setAttribute('aria-live', 'off');
  const format = new Intl.DateTimeFormat('en-GB', {timeZone:work.timeZone, hour:'2-digit', minute:'2-digit', hourCycle:'h23'});
  function update() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    if (clock.dataset.typing !== 'true') clock.textContent = `${format.format(now)} ${work.timeZoneLabel}`;
  }
  update();
  const timer = setInterval(update, 1000);
  const stop = () => clearInterval(timer);
  window.addEventListener('pagehide', stop, {once:true});
  status.destroy = () => { stop(); window.removeEventListener('pagehide', stop); };
  local.append(element('span', work.location), clock);
  status.append(role, local);
  return status;
}
export function createLanding(config, {page, navigation}) {
  const root = element('div', undefined, 'landing');
  const hero = element('section', undefined, 'hero');
  hero.setAttribute('aria-labelledby', 'landing-heading');
  const dots = element('canvas', undefined, 'hero-dots');
  dots.setAttribute('aria-hidden', 'true');
  hero.append(dots);
  const status = config.showCurrentWork && page.currentWork ? createStatus(page.currentWork) : null;
  if (status) hero.append(status);
  if (config.showBreadcrumb) {
    const path = element('nav', undefined, 'breadcrumbs');
    path.setAttribute('aria-label', page.breadcrumbLabel);
    const list = element('ol');
    const home = element('li');
    home.append(link(navigation[0].label, navigation[0].url));
    const current = element('li', config.label);
    current.setAttribute('aria-current', 'page');
    list.append(home, current);
    path.append(list);
    hero.append(path);
  }
  const content = element('div', undefined, 'landing-content');
  if (config.showBreadcrumb) content.append(element('p', config.label, 'section-number'));
  content.append(createTitle(config));
  const details = element('div', undefined, 'hero-details');
  if (config.role) details.append(element('p', config.role, 'eyebrow'));
  details.append(element('p', config.description, 'intro'));
  content.append(details);
  if (config.actions?.length) {
    root.classList.add('landing--actions');
    const actions = element('div', undefined, 'landing-actions');
    for (const action of config.actions) {
      const item = action.url ? link(action.label, action.url) : element('button', action.label);
      item.className = `landing-action action-${action.style}`;
      if (!action.url) item.type = 'button';
      if (action.arrow) {
        const arrow = element('span', action.arrow, 'action-arrow');
        arrow.setAttribute('aria-hidden', 'true');
        item.append(arrow);
      }
      actions.append(item);
    }
    content.append(actions);
  }
  hero.append(content);
  const stripe = createStripe(config.stripeItems);
  root.append(hero, stripe);
  return {root, hero, stripe, destroy:() => status?.destroy()};
}
export function installLandingEntrance(landing, header, options) {
  return installPageEntrance(landing.hero, header, landing.stripe, options);
}
