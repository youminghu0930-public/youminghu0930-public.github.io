export function matchesProjectTags(project, selected) {
  return selected.size === 0 || (project.tags || []).some(tag => selected.has(tag));
}

export function createProjectFilters(projects, cards, onChange = () => {}) {
  const container = document.createElement('div');
  container.className = 'project-filters';
  const bar = document.createElement('div');
  bar.className = 'project-filter-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Filter projects by tag; matches any selected tag');
  const status = document.createElement('p');
  status.className = 'project-filter-status';
  status.setAttribute('role', 'status');
  const selected = new Set();
  const counts = new Map();
  for (const project of projects) {
    for (const tag of new Set(project.tags || [])) counts.set(tag, (counts.get(tag) || 0) + 1);
  }
  const buttons = new Map();
  function makeButton(label, count, tag) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-filter-button';
    const text = document.createElement('span');
    text.textContent = label;
    const badge = document.createElement('span');
    badge.className = 'project-filter-count';
    badge.textContent = count;
    button.append(text, badge);
    button.addEventListener('click', () => {
      if (tag === null) selected.clear();
      else if (selected.has(tag)) selected.delete(tag);
      else selected.add(tag);
      update();
      onChange();
    });
    buttons.set(tag, button);
    bar.append(button);
  }
  function update() {
    let visible = 0;
    projects.forEach((project, index) => {
      const matches = matchesProjectTags(project, selected);
      cards.children[index].hidden = !matches;
      if (matches) visible++;
    });
    for (const [tag, button] of buttons) {
      button.setAttribute('aria-pressed', String(tag === null ? !selected.size : selected.has(tag)));
    }
    status.textContent = `${visible} of ${projects.length} projects${selected.size ? ' · Matching any selected tag' : ''}`;
  }
  makeButton('All', projects.length, null);
  for (const [tag, count] of counts) makeButton(tag, count, tag);
  container.append(bar, status);
  update();
  return container;
}
