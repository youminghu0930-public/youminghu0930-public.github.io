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
  return node;
}
async function startApp() {
  const response = await fetch(new URL('./materials/content.json', import.meta.url));
  if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
  const { page, projects, navigation, landings } = await response.json();
  // Measure and animate against the final fonts, avoiding fallback-font line wraps.
  if (document.fonts) await Promise.all([
    document.fonts.load('400 16px Inter'),
    document.fonts.load('500 32px "Noto Sans TC"'),
    document.fonts.load('700 80px "Noto Sans TC"')
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
  const brand = element('div', undefined, 'header-identity');
  const monogram = element('span', page.brandMonogram, 'brand-monogram');
  brand.append(monogram, element('span', page.brandLabel, 'brand-name'));
  header.append(brand, nav);
  app.classList.add('portfolio-shell');
  app.replaceChildren(backdrop, toggle, header);
  const menu = installNavigation();
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
  footer.append(element('p', page.footerLabel), link(page.mainPage.label, page.mainPage.url, 'text-action'), link(page.footerLinkLabel, '#about', 'text-action'));
  main.append(footer);

    const old = app.querySelector('main');
    if (old) old.replaceWith(main); else app.append(main);
    const stopEntrance = installLandingEntrance(landing, header, {animateHeader:initial});
    const stopPointer = installPointerEffects(landing.hero);
    cleanup = () => { stopEntrance?.(); stopPointer?.(); landing.destroy(); };
    currentRoute = route;
    menu.close();
    if (!initial) {
      window.scrollTo({left:scroll.x, top:scroll.y, behavior:'instant'});
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
  window.addEventListener('pagehide', () => cleanup(), {once:true});
  renderRoute({initial:true});
}
startApp().catch(error => {
  console.error(error);
  const message = element('p', 'The page could not load. Please refresh and try again.');
  message.setAttribute('role', 'alert');
  document.querySelector('#app').replaceChildren(message);
});
