import Lenis from './materials/data/vendor/lenis/lenis.js';
import { design } from './design-settings.js';
import { createLanding, installLandingEntrance } from './landing.js';
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
  const destination = new URL(url, location.href);
  if (['http:', 'https:'].includes(destination.protocol) && destination.origin !== location.origin) {
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
  }
  return node;
}
function installScrollMotion(main) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const settings = design.effects;
  const items = Array.from(main.querySelectorAll('.landing-content, .project-index, .project-copy > *, .experience-heading > *, .experience-period, .experience-copy > *, .skills-heading > *, .skills-group')).map(node => ({node, offset:0, opacity:1, initialized:false, order:node.matches('.experience-copy > *, .experience-heading > *, .project-copy > *') ? Array.from(node.parentElement.children).indexOf(node) : 0}));
  const timeline = main.querySelector('.experience-rail');
  const markers = Array.from(main.querySelectorAll('.experience-marker'));
  let frame = 0;
  let lastTime = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => value * value * (3 - 2 * value);
  function draw(time) {
    frame = 0;
    const delta = lastTime ? Math.min(64, Math.max(1, time - lastTime)) : 16.67;
    lastTime = time;
    const blend = 1 - Math.exp(-delta / settings.scrollMotionResponseMs);
    let settling = false;
    const height = innerHeight;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - height);
    if (timeline) {
      const rail = timeline.getBoundingClientRect();
      const readingLine = height * settings.timelineReadingPosition;
      const progress = media.matches ? 1 : clamp((readingLine - rail.top) / Math.max(1, rail.height));
      timeline.style.setProperty('--timeline-progress', String(progress));
      markers.forEach(marker => {
        marker.dataset.reached = String(media.matches || marker.getBoundingClientRect().top <= readingLine);
      });
    }
    // Read all bounds before writing, subtracting our own offset to avoid feedback.
    const bounds = items.map(item => {
      const rect = item.node.getBoundingClientRect();
      return {top:rect.top - item.offset, bottom:rect.bottom - item.offset};
    });
    items.forEach((item, index) => {
      if (media.matches) {
        item.node.style.removeProperty('translate');
        item.node.style.removeProperty('opacity');
        item.offset = 0;
        item.opacity = 1;
        item.initialized = false;
        return;
      }
      const rect = bounds[index];
      // Short pages still reveal fully, without an abrupt end-of-page override.
      const finishTop = Math.max(height * (settings.scrollRevealEnd - item.order * settings.scrollRevealStagger), rect.top + scrollY - maxScroll);
      const startTop = finishTop + height * (settings.scrollRevealStart - settings.scrollRevealEnd);
      const entering = ease(clamp((startTop - rect.top) / (startTop - finishTop)));
      const leaving = ease(clamp(rect.bottom / (height * settings.scrollFadeExitRange)));
      const targetOffset = (1 - entering) * settings.scrollRevealDistance - (1 - leaving) * settings.scrollExitDistance;
      const targetOpacity = settings.scrollMinOpacity + (1 - settings.scrollMinOpacity) * entering * leaving;
      if (!item.initialized) {
        item.offset = targetOffset;
        item.opacity = targetOpacity;
        item.initialized = true;
      } else {
        item.offset += (targetOffset - item.offset) * blend;
        item.opacity += (targetOpacity - item.opacity) * blend;
      }
      if (Math.abs(targetOffset - item.offset) > 0.05 || Math.abs(targetOpacity - item.opacity) > 0.001) settling = true;
      else { item.offset = targetOffset; item.opacity = targetOpacity; }
      item.node.style.translate = `0 ${item.offset}px`;
      item.node.style.opacity = String(item.opacity);
    });
    if (settling) schedule();
    else lastTime = 0;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  media.addEventListener('change', schedule);
  const observer = new ResizeObserver(schedule);
  observer.observe(main);
  schedule();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    media.removeEventListener('change', schedule);
    items.forEach(({node}) => { node.style.removeProperty('translate'); node.style.removeProperty('opacity'); });
  };
}
async function startApp() {
  const response = await fetch(new URL('./materials/content.json', import.meta.url));
  if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
  const { page, projects, navigation, landings, experience, skills } = await response.json();
  // Measure and animate against the final fonts, avoiding fallback-font line wraps.
  if (document.fonts) await Promise.all([
    document.fonts.load('400 16px "Geist Sans"'),
    document.fonts.load('500 32px "Geist Sans"'),
    document.fonts.load('600 80px "Geist Sans"'),
    document.fonts.load('400 14px "Geist Mono"')
  ]).catch(error => console.warn('Using available font fallback:', error));
  const app = document.querySelector('#app');
  let currentRoute;
  let cleanup = () => {};
  const backdrop = element('div', undefined, 'navigation-backdrop');
  backdrop.setAttribute('aria-hidden', 'true');
  const toggle = element('button', undefined, 'navigation-toggle');
  toggle.type = 'button';
  toggle.title = page.navigationToggle;
  toggle.dataset.openLabel = page.mobileMenuLabel;
  toggle.dataset.closeLabel = page.mobileMenuCloseLabel;
  toggle.setAttribute('aria-label', page.navigationToggle);
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-controls', 'section-navigation');
  const icon = element('span', undefined, 'menu-icon');
  icon.setAttribute('aria-hidden', 'true');
  icon.append(element('span'), element('span'), element('span'));
  const menuLabel = element('span', undefined, 'mobile-menu-label');
  menuLabel.setAttribute('aria-hidden', 'true');
  menuLabel.append(element('span', page.mobileMenuLabel, 'menu-label-open'), element('span', page.mobileMenuCloseLabel, 'menu-label-close'));
  toggle.append(menuLabel, icon);
  const header = element('header');
  header.dataset.expanded = 'true';
  const nav = element('nav');
  nav.id = 'section-navigation';
  nav.setAttribute('aria-label', page.navigationLabel);
  for (const [index, item] of navigation.entries()) {
    const itemLink = link('', item.url);
    itemLink.setAttribute('aria-label', item.label);
    const word = element('span', undefined, 'menu-word');
    word.setAttribute('aria-hidden', 'true');
    Array.from(item.label).forEach((character, letterIndex) => {
      const letter = element('span', character, 'menu-letter');
      letter.style.setProperty('--letter-index', letterIndex);
      word.append(letter);
    });
    itemLink.style.setProperty('--menu-index', index);
    itemLink.append(word);
    itemLink.dataset.number = String(index + 1).padStart(2, '0');
    nav.append(itemLink);
  }
  const brand = link('', '/', 'header-identity');
  brand.setAttribute('aria-label', `${page.brandLabel} — Home`);
  const monogram = element('span', page.brandMonogram, 'brand-monogram');
  brand.append(monogram, element('span', page.brandLabel, 'brand-name'));
  header.append(brand, nav);
  app.classList.add('portfolio-shell');
  app.replaceChildren(backdrop, toggle, header);
  // A compact, draggable page progress bar; all content still uses document scrolling.
  const scrollRail = element('div', undefined, 'page-scrollbar');
  const scrollThumb = element('div', undefined, 'page-scrollbar-thumb');
  scrollRail.append(scrollThumb);
  scrollRail.tabIndex = 0;
  scrollRail.setAttribute('role', 'scrollbar');
  scrollRail.setAttribute('aria-label', 'Page reading progress');
  scrollRail.setAttribute('aria-orientation', 'vertical');
  scrollRail.setAttribute('aria-valuemin', '0');
  scrollRail.setAttribute('aria-valuemax', '100');
  app.append(scrollRail);
  document.documentElement.classList.add('custom-page-scrollbar');
  function updateScrollbar() {
    const limit = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const progress = limit ? Math.max(0, Math.min(1, scrollY / limit)) : 0;
    scrollRail.hidden = limit <= 1 || document.body.style.overflow === 'hidden';
    scrollRail.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    scrollThumb.style.transform = `scaleY(${progress})`;
  }
  function seekScrollbar(event) {
    const rect = scrollRail.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const y = progress * Math.max(0, document.documentElement.scrollHeight - innerHeight);
    if (smoothScroll) smoothScroll.scrollTo(y, {immediate:true, force:true});
    else window.scrollTo({top:y, behavior:'instant'});
  }
  scrollRail.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    scrollRail.setPointerCapture(event.pointerId);
    seekScrollbar(event);
  });
  scrollRail.addEventListener('pointermove', event => {
    if (scrollRail.hasPointerCapture(event.pointerId)) seekScrollbar(event);
  });
  scrollRail.addEventListener('keydown', event => {
    const limit = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const positions = {ArrowDown:scrollY+40, ArrowUp:scrollY-40, PageDown:scrollY+innerHeight, PageUp:scrollY-innerHeight, Home:0, End:limit};
    if (!(event.key in positions)) return;
    event.preventDefault();
    const y = Math.max(0, Math.min(limit, positions[event.key]));
    if (smoothScroll) smoothScroll.scrollTo(y); else window.scrollTo({top:y});
  });
  window.addEventListener('scroll', updateScrollbar, {passive:true});
  const scrollbarObserver = new ResizeObserver(updateScrollbar);
  scrollbarObserver.observe(document.body);
  window.addEventListener('resize', updateScrollbar);
  const menu = installNavigation();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let smoothScroll;
  function configureScrolling() {
    smoothScroll?.destroy();
    smoothScroll = reducedMotion.matches ? null : new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: design.effects.scrollLerp,
      wheelMultiplier: design.effects.scrollWheelMultiplier,
      anchors: true,
      prevent: node => node === nav,
    });
    updateScrollLock();
  }
  function updateScrollLock() {
    updateScrollbar();
    if (document.body.style.overflow === 'hidden') smoothScroll?.stop();
    else smoothScroll?.start();
  }
  const scrollLockObserver = new MutationObserver(updateScrollLock);
  scrollLockObserver.observe(document.body, {attributes:true, attributeFilter:['style']});
  reducedMotion.addEventListener('change', configureScrolling);
  configureScrolling();
  function renderRoute({initial = false, scroll = {x:0, y:0}} = {}) {
    const requested = location.pathname.split('/').filter(Boolean)[0] || 'home';
    const route = landings[requested] ? requested : 'home';
    if (route === currentRoute) return;
    cleanup();
    const currentPage = navigation.find(item => item.page === route);
    document.title = route === 'home' ? page.title : `${currentPage.label} | ${page.title}`;
    document.querySelector('meta[name="description"]').content = page.description;
    for (const item of nav.querySelectorAll('a')) {
      if (item.pathname === currentPage.url) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    }
  const main = element('main');
  main.id = 'about';
  main.className = `portfolio-page ${route === 'home' ? 'home-page' : 'inner-page'}`;
  const landing = createLanding(landings[route], {page, navigation});
  main.append(landing.root);
  if (route === 'home' && experience?.items?.length) {
    const section = element('section', undefined, 'experience-section');
    section.id = 'experience';
    section.setAttribute('aria-labelledby', 'experience-title');
    const heading = element('div', undefined, 'experience-heading');
    const title = element('h2', undefined);
    title.id = 'experience-title';
    const words = experience.title.split(' ');
    title.append(words.slice(0, -1).join(' ') + ' ', element('span', words.at(-1) + '.'));
    heading.append(element('p', experience.eyebrow, 'experience-label'), title, element('p', experience.description, 'experience-intro'));
    const timeline = element('div', undefined, 'experience-timeline');
    const rail = element('div', undefined, 'experience-rail');
    rail.setAttribute('aria-hidden', 'true');
    rail.append(element('div', undefined, 'experience-rail-fill'));
    const list = element('ol', undefined, 'experience-list');
    for (const item of experience.items) {
      const entry = element('li', undefined, 'experience-entry');
      const marker = element('span', undefined, 'experience-marker');
      marker.setAttribute('aria-hidden', 'true');
      const copy = element('div', undefined, 'experience-copy');
      const highlights = element('ul', undefined, 'experience-highlights');
      for (const highlight of item.highlights || []) highlights.append(element('li', highlight));
      copy.append(element('h3', item.role), element('p', item.company, 'experience-company'), element('p', item.summary, 'experience-summary'), highlights);
      entry.append(element('p', item.period, 'experience-period'), marker, copy);
      list.append(entry);
    }
    timeline.append(rail, list);
    section.append(heading, timeline);
    main.append(section);
  }
  if (route === 'home' && skills?.groups?.length) {
    const section = element('section', undefined, 'skills-section');
    section.id = 'skills';
    section.setAttribute('aria-labelledby', 'skills-title');
    const heading = element('div', undefined, 'skills-heading');
    const title = element('h2');
    title.id = 'skills-title';
    const words = skills.title.split(' ');
    title.append(words.slice(0,-1).join(' ')+' ', element('span',words.at(-1)+'.'));
    heading.append(element('p',skills.eyebrow,'skills-label'),title,element('p',skills.description,'skills-intro'));
    section.append(heading);
    for (const group of skills.groups) {
      const row = element('div',undefined,'skills-group');
      const list = element('ul',undefined,'skills-items');
      for (const skill of group.items) list.append(element('li',skill));
      row.append(element('h3',group.title),list);
      section.append(row);
    }
    main.append(section);
  }
  if (route === 'works') {
    const section = element('section');
    section.id = 'projects';
    section.setAttribute('aria-label', currentPage.label);
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
    section.append(cards);
    main.append(section);
  }
  const footer = element('div', undefined, 'portfolio-footer');
  footer.append(element('p', page.footerLabel), link(page.footerLinkLabel, '#about', 'text-action'));
  main.append(footer);

    const old = app.querySelector('main');
    if (old) old.replaceWith(main); else app.append(main);
    const stopEntrance = installLandingEntrance(landing, header, {animateHeader:initial});
    const stopPointer = installPointerEffects(landing.hero);
    const stopScrollMotion = installScrollMotion(main);
    cleanup = () => { stopScrollMotion(); stopEntrance?.(); stopPointer?.(); landing.destroy(); };
    currentRoute = route;
    menu.close();
    if (!initial) {
      smoothScroll?.resize();
      if (smoothScroll) smoothScroll.scrollTo(scroll.y, {immediate:true, force:true});
      else window.scrollTo({left:scroll.x, top:scroll.y, behavior:'instant'});
      const title = main.querySelector('h1');
      title.tabIndex = -1;
      title.focus({preventScroll:true});
    }
  }
  app.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href);
    if (url.origin !== location.origin || url.search || url.hash) return;
    if (!navigation.some(item => item.url === url.pathname)) return;
    event.preventDefault();
    if (url.pathname === location.pathname) { menu.close(); return; }
    history.replaceState({...history.state, scroll:{x:scrollX,y:scrollY}}, '', location.href);
    history.pushState({scroll:{x:0,y:0}}, '', url.pathname);
    renderRoute();
  });
  window.addEventListener('popstate', event => renderRoute({scroll:event.state?.scroll || {x:0,y:0}}));
  history.scrollRestoration = 'manual';
  window.addEventListener('pagehide', () => {
    cleanup();
    smoothScroll?.destroy();
    scrollLockObserver.disconnect();
    scrollbarObserver.disconnect();
    window.removeEventListener('scroll', updateScrollbar);
    window.removeEventListener('resize', updateScrollbar);
    reducedMotion.removeEventListener('change', configureScrolling);
  }, {once:true});
  renderRoute({initial:true});
  if (location.hash) requestAnimationFrame(() => {
    const target=document.getElementById(location.hash.slice(1));
    if (!target) return;
    smoothScroll?.resize();
    if(smoothScroll) smoothScroll.scrollTo(target,{immediate:true,force:true});
    else target.scrollIntoView({behavior:'instant'});
  });
}
startApp().catch(error => {
  console.error(error);
  const message = element('p', 'The page could not load. Please refresh and try again.');
  message.setAttribute('role', 'alert');
  document.querySelector('#app').replaceChildren(message);
});
