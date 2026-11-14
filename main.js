import { design } from './design-settings.js';
import { installPointerEffects } from './pointer-effects.js';
import { installNavigation } from './navigation.js';

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
function installPageEntrance(hero, header, stripe = null) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const settings = design.effects;
  const track = stripe?.querySelector('.stripe-track');
  function sizeTicker() {
    const width = track.firstElementChild.getBoundingClientRect().width;
    if (width > 0) track.style.setProperty('--stripe-duration', `${width / settings.stripePixelsPerSecond}s`);
  }
  if (track) {
    sizeTicker();
    new ResizeObserver(sizeTicker).observe(track.firstElementChild);
    document.fonts?.ready.then(sizeTicker);
  }
  if (motion.matches) return;
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
  motion.addEventListener('change', event => { if (event.matches) complete(); });
  window.addEventListener('pagehide', complete, {once:true});
  header.querySelectorAll('nav a').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
    item.classList.add('nav-entrance');
  });
  header.querySelector('.header-identity').classList.add('identity-entrance');
  stripe?.classList.add('stripe-entrance');
  prepare(hero.querySelector('.section-number'), settings.typeStatusDelay);
  const breadcrumb = hero.querySelector('.breadcrumbs');
  breadcrumb?.classList.add('identity-entrance');
}
function pageTitle(text, id) {
  const title = element('h1');
  title.id = id;
  const words = text.trim().replace(/[.。]+$/, '').split(/\s+/);
  title.setAttribute('aria-label', `${words.join(' ')}.`);
  const line = element('span', undefined, 'name-line');
  line.setAttribute('aria-hidden', 'true');
  let index = 0;
  words.forEach((text, wordIndex) => {
    const last = wordIndex === words.length - 1;
    const word = element('span', undefined, last ? 'title-word title-accent' : 'title-word');
    for (const character of Array.from(text + (last ? '.' : ''))) {
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
async function renderPage() {
  const response = await fetch(new URL('./materials/content.json', import.meta.url));
  if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
  const { page, sections, projects, navigation, placeholders } = await response.json();
  const route = location.pathname.split('/').filter(Boolean)[0] || 'home';
  const currentPage = navigation.find(item => item.page === route) || navigation[0];
  document.title = route === 'home' ? page.title : `${currentPage.label} | ${page.title}`;
  document.querySelector('meta[name="description"]').content = page.description;
  const backdrop = element('div', undefined, 'navigation-backdrop');
  backdrop.setAttribute('aria-hidden', 'true');
  const toggle = element('button', undefined, 'navigation-toggle');
  toggle.type = 'button';
  toggle.title = page.navigationToggle;
  toggle.setAttribute('aria-label', page.navigationToggle);
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-controls', 'section-navigation');
  const icon = element('span', undefined, 'menu-icon');
  icon.setAttribute('aria-hidden', 'true');
  icon.append(element('span'), element('span'), element('span'));
  toggle.append(icon);
  const header = element('header');
  header.dataset.expanded = 'true';
  const nav = element('nav');
  nav.id = 'section-navigation';
  nav.setAttribute('aria-label', page.navigationLabel);
  for (const item of navigation) {
    const itemLink = link(item.label, item.url);
    if (item.page === route) itemLink.setAttribute('aria-current', 'page');
    nav.append(itemLink);
  }
  const brand = element('div', undefined, 'header-identity');
  const monogram = element('span', page.brandMonogram, 'brand-monogram');
  brand.append(monogram, element('span', page.brandLabel, 'brand-name'));
  header.append(brand, nav);
  const main = element('main');
  main.id = sections[0].id;
  main.className = `portfolio-page ${route === 'home' ? 'home-page' : 'inner-page'}`;
  const subLanding = element('div', undefined, 'subpage-landing');
  if (route !== 'home') {
    main.append(subLanding);
    const path = element('nav', undefined, 'breadcrumbs');
    path.setAttribute('aria-label', page.breadcrumbLabel);
    const list = element('ol');
    const home = element('li');
    home.append(link(navigation[0].label, navigation[0].url));
    const current = element('li', currentPage.label);
    current.setAttribute('aria-current', 'page');
    list.append(home, current);
    path.append(list);
    subLanding.append(path);
  }
  const hero = element('section', undefined, 'hero');
  hero.setAttribute('aria-labelledby', 'intro-heading');
  const name = element('h1');
  name.id = 'intro-heading';
  name.setAttribute('aria-label', page.heading);
  let letterIndex = 0;
  for (const line of page.nameLines) {
    const span = element('span', undefined, 'name-line');
    span.setAttribute('aria-hidden', 'true');
    for (const character of Array.from(line)) {
      const letter = element('span', character, 'name-letter');
      letter.style.setProperty('--letter-index', letterIndex++);
      span.append(letter);
    }
    name.append(span);
  }
  const details = element('div', undefined, 'hero-details');
  const description = element('div');
  description.append(element('p', page.role, 'eyebrow'), element('p', page.intro, 'intro'));
  details.append(description);
  if (route === 'home' && page.currentWork) {
    const work = page.currentWork;
    const status = element('div', undefined, 'hero-status');
    const text = `${work.label} ${work.role}${work.company ? ` ${work.connector} ${work.company}` : ''}`;
    const currentWork = element('p', text, 'current-work');
    const local = element('div', undefined, 'local-status');
    const clock = element('time');
    clock.setAttribute('aria-label', work.clockLabel);
    clock.setAttribute('aria-live', 'off');
    const format = new Intl.DateTimeFormat('en-GB', { timeZone: work.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    const updateClock = () => {
      const now = new Date();
      clock.dateTime = now.toISOString();
      if (clock.dataset.typing !== 'true') clock.textContent = `${format.format(now)} ${work.timeZoneLabel}`;
    };
    updateClock();
    setInterval(updateClock, 1000);
    local.append(element('span', work.location), clock);
    status.append(currentWork, local);
    hero.append(status);
  }
  hero.append(name, details);
  const dotField = element('canvas', undefined, 'hero-dots');
  dotField.setAttribute('aria-hidden', 'true');
  hero.prepend(dotField);
  const stripe = element('div', undefined, 'landing-stripe');
  const track = element('div', undefined, 'stripe-track');
  for (let group = 0; group < 2; group++) {
    const focus = element('ul');
    if (group) focus.setAttribute('aria-hidden', 'true');
    for (let repeat = 0; repeat < 4; repeat++) {
      for (const area of page.focusAreas) {
        const item = element('li', area);
        if (repeat) item.setAttribute('aria-hidden', 'true');
        focus.append(item);
      }
    }
    track.append(focus);
  }
  stripe.append(track);
  const landing = element('div', undefined, 'landing');
  landing.append(hero, stripe);
  if (route === 'home') main.append(landing);
  const section = element('section');
  section.id = sections[1].id;
  section.setAttribute('aria-labelledby', 'projects-heading');
  const heading = element('h2', sections[1].title);
  heading.id = 'projects-heading';
  const sectionHeader = element('div', undefined, 'section-heading');
  sectionHeader.append(element('span', currentPage.label, 'section-number'), heading, element('p', sections[1].intro, 'section-intro'));
  const cards = element('div', undefined, 'projects');
  for (const project of projects) {
    const card = element('article', undefined, 'project');
    card.id = project.id;
    const index = element('div', undefined, 'project-index');
    index.append(element('span', project.number), element('span', project.category));
    const copy = element('div', undefined, 'project-copy');
    const tags = element('ul', undefined, 'project-tags');
    for (const tag of project.tags) tags.append(element('li', tag));
    copy.append(element('h3', project.title), element('p', project.summary), tags, link(project.linkLabel, project.url));
    card.append(index, copy);
    cards.append(card);
  }
  section.append(sectionHeader, cards);
  if (route === 'works') {
    heading.replaceWith(pageTitle(sections[1].title, 'projects-heading'));
    subLanding.append(sectionHeader);
    main.append(section);
  }
  for (const item of placeholders.filter(item => item.id === route)) {
    const placeholder = element('section', undefined, 'placeholder-section');
    placeholder.id = item.id;
    placeholder.setAttribute('aria-labelledby', `${item.id}-heading`);
    const title = pageTitle(item.title, `${item.id}-heading`);
    const row = element('div', undefined, 'section-heading');
    row.append(element('span', item.title, 'section-number'), title, element('p', item.description, 'section-intro'));
    subLanding.append(row);
  }
  const footer = element('div', undefined, 'portfolio-footer');
  footer.append(element('p', page.footerLabel), link(page.mainPage.label, page.mainPage.url, 'text-action'), link(page.footerLinkLabel, '#about', 'text-action'));
  main.append(footer);
  document.querySelector('#app').classList.add('portfolio-shell');
  document.querySelector('#app').replaceChildren(backdrop, toggle, header, main);
  installPageEntrance(route === 'home' ? hero : subLanding, header, route === 'home' ? stripe : null);
  installNavigation();
  installPointerEffects(route === 'home' ? hero : null);
}
renderPage().catch(error => {
  console.error(error);
  const message = element('p', 'The page could not load. Please refresh and try again.');
  message.setAttribute('role', 'alert');
  document.querySelector('#app').replaceChildren(message);
});
