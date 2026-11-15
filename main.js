import Lenis from './materials/data/vendor/lenis/lenis.js';
import { design } from './design-settings.js';
import { createLanding, installLandingEntrance } from './landing.js';
import { installPointerEffects } from './pointer-effects.js';
import { installSkillsAccordion } from './materials/data/skills-accordion.js';
import { installNavigation } from './navigation.js';
import { installProjectPreviews } from './materials/data/project-previews.js';
import { createProjectFilters } from './materials/data/project-filters.js';

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
  const items = Array.from(main.querySelectorAll('.landing-content, .project-index, .project-copy > *, .project-heading > *, .project-visual > *, .project-detail > *, .experience-heading > *, .experience-period, .experience-copy > *, .skills-heading > *')).map(node => ({node, offset:0, opacity:1, initialized:false, order:node.matches('.experience-copy > *, .experience-heading > *, .project-copy > *') ? Array.from(node.parentElement.children).indexOf(node) : 0}));
  const timelineRails = Array.from(main.querySelectorAll('.experience-rail'));
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
    if (timelineRails.length) {
      const readingLine = height * settings.timelineReadingPosition;
      timelineRails.forEach(segment => {
        const rail = segment.getBoundingClientRect();
        const progress = media.matches ? 1 : clamp((readingLine - rail.top) / Math.max(1, rail.height));
        segment.style.setProperty('--timeline-progress', String(progress));
      });
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
      // Long experience cards should not accumulate a delay for every label
      // and subsection. Their footer reveals at the normal viewport threshold.
      const revealOrder = item.node.parentElement.matches('.experience-copy')
        ? (item.node.matches('.experience-footer') ? 0 : Math.min(item.order, 2))
        : item.order;
      const finishTop = Math.max(height * (settings.scrollRevealEnd - revealOrder * settings.scrollRevealStagger), rect.top + scrollY - maxScroll);
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
  main.className = `portfolio-page ${route}-page ${route === 'home' ? '' : 'inner-page'}`;
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
    title.append(words.slice(0, -1).join(' ') + ' ', element('span', words.at(-1)), element('span', '.', 'title-dot'));
    heading.append(element('p', experience.eyebrow, 'experience-label'), title, element('p', experience.description, 'experience-intro'));
    const timeline = element('div', undefined, 'experience-timeline');
    const list = element('ol', undefined, 'experience-list');
    for (const item of experience.items) {
      const entry = element('li', undefined, 'experience-entry');
      const rail = element('div', undefined, 'experience-rail');
      rail.setAttribute('aria-hidden', 'true');
      rail.append(element('div', undefined, 'experience-rail-fill'));
      const marker = element('span', undefined, 'experience-marker');
      marker.setAttribute('aria-hidden', 'true');
      const copy = element('div', undefined, 'experience-copy');
      const highlights = element('ul', undefined, item.highlightStyle === 'compact' ? 'experience-highlights experience-highlights-compact' : 'experience-highlights');
      for (const highlight of item.highlights || []) highlights.append(element('li', highlight));
      const cardHeading = element('div', undefined, 'experience-card-heading');
      cardHeading.append(element('h3', item.role));
      copy.append(cardHeading);
      if (item.company) copy.append(element('p', item.company, 'experience-company'));
      copy.append(element('p', item.summary, 'experience-summary'));
      if (item.progression) {
        copy.append(element('p', item.progressionLabel || 'Career progression', 'experience-sublabel'), element('p', item.progression, 'experience-progression'));
      }
      for (const detail of item.sections || []) {
        const points = element('ul', undefined, 'experience-highlights');
        for (const point of detail.items) points.append(element('li', point));
        copy.append(element('p', detail.label, 'experience-sublabel'), points);
      }
      if (highlights.childElementCount) {
        copy.append(element('p', item.highlightsLabel || 'Responsibilities', 'experience-sublabel'), highlights);
      }
      for (const award of item.recognitions || []) {
        const recognition = element('div', undefined, 'experience-recognition');
        recognition.append(element('p', award.label, 'experience-recognition-label'), element('p', award.detail, 'experience-recognition-detail'));
        if (award.url) recognition.append(link(award.linkLabel || 'Read more ↗', award.url, 'experience-recognition-link'));
        copy.append(recognition);
      }
      if (item.positions?.length) copy.append(element('p', item.positionsLabel || 'Experience', 'experience-sublabel'));
      for (const position of item.positions || []) {
        const subsection = element('section', undefined, 'experience-position');
        subsection.append(element('h4', position.company), element('p', position.period, 'experience-position-period'));
        if (position.focus) subsection.append(element('p', position.focus, 'experience-position-focus'));
        if (position.summary) subsection.append(element('p', position.summary, 'experience-summary'));
        if (position.highlights?.length) {
          const responsibilities = element('ul', undefined, 'experience-highlights experience-highlights-compact');
          for (const point of position.highlights) responsibilities.append(element('li', point));
          subsection.append(element('p', position.highlightsLabel || 'Responsibilities', 'experience-sublabel'), responsibilities);
        }
        copy.append(subsection);
      }
      if (item.tags?.length) {
        const tags = element('ul', undefined, 'experience-tags');
        for (const tag of item.tags) tags.append(element('li', tag));
        const footer = element('div', undefined, 'experience-footer');
        footer.append(element('p', item.tagsLabel || 'Focus areas', 'experience-sublabel'), tags);
        copy.append(footer);
      }
      entry.append(rail, element('p', item.period, 'experience-period'), marker, copy);
      list.append(entry);
    }
    timeline.append(list);
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
    title.append(words.slice(0,-1).join(' ')+' ', element('span',words.at(-1)), element('span', '.', 'title-dot'));
    heading.append(element('p',skills.eyebrow,'skills-label'),title,element('p',skills.description,'skills-intro'));
    if (skills.overview?.length) {
      const tools = new Map();
      for (const group of skills.groups) {
        const items = group.items || group.badgeRows.flatMap(row => row.items);
        for (const item of items) if (!tools.has(item.label)) tools.set(item.label,item);
      }
      const overview = element('ul',undefined,'skills-overview');
      overview.setAttribute('aria-label',skills.overviewLabel);
      for (const name of skills.overview) {
        const tool = tools.get(name);
        if (!tool?.icon || !tool.url) continue;
        const item = element('li');
        const action = link('',tool.url,'skills-overview-link');
        action.setAttribute('aria-label',`${name} (opens in a new tab)`);
        action.title = name;
        const image = element('img');
        image.src = tool.icon; image.alt = ''; image.width = 24; image.height = 24;
        action.append(image); item.append(action); overview.append(item);
      }
      heading.append(overview);
    }
    section.append(heading);
    for (const [index, group] of skills.groups.entries()) {
      const row = element('article',undefined,'skills-group');
      row.dataset.cursorTarget = '';
      if (group.title === 'AI Research') row.dataset.marqueeReference = 'true';
      const heading = element('h3',undefined,'skills-group-heading');
      const toggle = element('button',undefined,'skills-toggle');
      toggle.type = 'button';
      toggle.id = `skill-toggle-${index}`;
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-controls',`skill-panel-${index}`);
      const icon = element('span',undefined,'skills-toggle-icon');
      icon.setAttribute('aria-hidden','true');
      toggle.append(element('span',String(index+1).padStart(2,'0'),'skills-number'),element('span',group.title,'skills-name'),icon);
      const hoverBand = element('span',undefined,'skills-hover-band');
      hoverBand.setAttribute('aria-hidden','true');
      const hoverTrack = element('span',undefined,'skills-hover-track');
      for (let copy = 0; copy < 2; copy++) {
        const run = element('span',undefined,'skills-hover-run');
        for (let repeat = 0; repeat < design.effects.skillsMarqueeRepeats; repeat++) {
          run.append(element('span',group.title,'skills-hover-title'));
          run.append(element('span',undefined,'skills-hover-dot'));
        }
        hoverTrack.append(run);
      }
      const hoverWindow = element('span',undefined,'skills-hover-window');
      hoverWindow.append(hoverTrack);
      hoverBand.append(hoverWindow);
      toggle.append(hoverBand);
      heading.append(toggle);
      const panel = element('div',undefined,'skills-panel');
      panel.id = `skill-panel-${index}`;
      panel.setAttribute('role','region');
      panel.setAttribute('aria-labelledby',toggle.id);
      panel.setAttribute('aria-hidden','true');
      panel.inert = true;
      const inner = element('div',undefined,'skills-panel-inner');
      const copy = element('div',undefined,'skills-copy');
      copy.append(element('p',group.description));
      const toolkit = element('div',undefined,'skills-toolkit');
      const badgeRows = group.badgeRows || [{items:group.items}];
      for (const [rowIndex, badgeRow] of badgeRows.entries()) {
        const badgeGroup = element('div',undefined,'skills-badge-row');
        const list = element('ul',undefined,'skills-items');
        if (badgeRow.label) {
          badgeGroup.classList.add('skills-badge-row-labeled');
          const label = element('h4',badgeRow.label,'skills-row-label');
          label.id = `skill-row-${index}-${rowIndex}`;
          list.setAttribute('aria-labelledby',label.id);
          badgeGroup.append(label);
        }
        for (const skill of badgeRow.items) {
          const item = element('li');
          const action = skill.url ? link('',skill.url,'skill-link') : element('span',undefined,'skill-link');
          if (skill.url) action.setAttribute('aria-label',`${skill.label} (opens in a new tab)`);
          const iconSource = skill.icon || (skill.url && new URL(skill.url, location.href).hostname === 'github.com' ? '/materials/data/skill-icons/github.svg' : null);
          if (iconSource) {
            const icon = element('img',undefined,'skill-icon');
            icon.src = iconSource;
            icon.alt = '';
            icon.width = 20; icon.height = 20;
            const tile = element('span',undefined,'skill-icon-tile');
            tile.append(icon);
            action.append(tile);
          }
          action.append(element('span',skill.label));
          item.append(action); list.append(item);
        }
        badgeGroup.append(list);
        toolkit.append(badgeGroup);
      }
      inner.append(copy,toolkit); panel.append(inner);
      row.append(heading,panel); section.append(row);
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
      const action = link('', project.url, 'project-row-link');
      action.setAttribute('data-cursor-target', '');
      const heading = element('div', undefined, 'project-heading');
      heading.append(element('h2', project.title), element('p', project.company, 'project-company'));
      const copy = element('div', undefined, 'project-copy');
      copy.append(element('p', project.summary, 'project-summary'));
      const tags = element('ul', undefined, 'project-tags');
      tags.setAttribute('aria-label', 'Technologies');
      for (const tag of project.tags) tags.append(element('li', tag));
      const labels = element('ul', undefined, 'project-labels');
      labels.setAttribute('aria-label', 'Project topics');
      for (const label of project.labels || []) labels.append(element('li', label));
      copy.append(tags, labels);
      const arrow = element('span', '↗', 'project-row-arrow');
      arrow.setAttribute('aria-hidden', 'true');
      action.append(heading, arrow, copy);
      card.append(action);
      cards.append(card);
    }
    const filters = createProjectFilters(projects, cards, () => {
      smoothScroll?.resize();
      window.dispatchEvent(new Event('resize'));
    });
    landing.hero.querySelector('.landing-content').append(filters);
    section.append(cards);
    main.append(section);
  }

  const footer = element('div', undefined, 'portfolio-footer');
  footer.append(link(page.footerLinkLabel, '#about', 'text-action'));
  main.append(footer);

    const old = app.querySelector('main');
    if (old) old.replaceWith(main); else app.append(main);
    const stopEntrance = installLandingEntrance(landing, header, {animateHeader:initial});
    const stopPointer = installPointerEffects(landing.hero);
    const stopSkills = installSkillsAccordion(main, {setScrollPosition:position => {
      if (smoothScroll) {
        smoothScroll.resize();
        smoothScroll.scrollTo(position.top, {immediate:true, force:true});
      } else window.scrollTo({...position, behavior:'instant'});
    }});
    const stopScrollMotion = installScrollMotion(main);
    const stopProjectPreviews = route === 'works' ? installProjectPreviews(main, projects) : () => {};
    cleanup = () => { stopProjectPreviews(); stopSkills(); stopScrollMotion(); stopEntrance?.(); stopPointer?.(); landing.destroy(); };
    currentRoute = route;
    updateScrollbar();
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
  // Explicitly reset the first render after content and fonts are ready.
  // SPA back/forward navigation still uses its saved route position.
  if (!location.hash) {
    smoothScroll?.resize();
    if (smoothScroll) smoothScroll.scrollTo(0, {immediate:true, force:true});
    else window.scrollTo({left:0, top:0, behavior:'instant'});
  }
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
