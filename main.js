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
async function renderPage() {
  const response = await fetch('materials/content.json');
  if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
  const { page, sections, projects } = await response.json();
  document.title = page.title;
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
  for (const item of sections) nav.append(link(item.title, `#${item.id}`));
  for (const item of projects) nav.append(link(item.navigationTitle, `#${item.id}`));
  nav.append(link(page.mainPage.label, page.mainPage.url, 'return-main-page'));
  header.append(nav);
  const main = element('main');
  main.id = sections[0].id;
  const hero = element('div', undefined, 'hero');
  hero.append(element('p', page.eyebrow, 'eyebrow'), element('h1', page.heading), element('p', page.intro, 'intro'), link(page.personalPage.label, page.personalPage.url));
  main.append(hero);
  const section = element('section');
  section.id = sections[1].id;
  section.setAttribute('aria-labelledby', 'projects-heading');
  const heading = element('h2', sections[1].title);
  heading.id = 'projects-heading';
  const cards = element('div', undefined, 'projects');
  for (const project of projects) {
    const card = element('article', undefined, 'project');
    card.id = project.id;
    card.append(element('h3', project.title), element('p', project.summary), link(project.linkLabel, project.url));
    cards.append(card);
  }
  section.append(heading, cards);
  main.append(section);
  document.querySelector('#app').replaceChildren(backdrop, toggle, header, main);
  installNavigation();
}
renderPage().catch(error => {
  console.error(error);
  const message = element('p', 'The page could not load. Please refresh and try again.');
  message.setAttribute('role', 'alert');
  document.querySelector('#app').replaceChildren(message);
});
