import { design } from '../../design-settings.js';

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
  const transitions = new Map();
  let initialized = false;
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
    // Snapshot every row before changing layout; all animations share one clock.
    const changes = projects.map((project,index) => {
      const card=cards.children[index], rect=card.getBoundingClientRect();
      const matches=matchesProjectTags(project,selected);
      if(matches)visible++;
      return {card,matches,previous:transitions.get(card),height:rect.height,
        opacity:card.hidden ? 0 : Number(getComputedStyle(card).opacity),
        below:rect.top>=innerHeight,changed:transitions.has(card) || card.hidden===matches};
    });
    const animations=[];
    // Set ownership before any hidden-state/layout changes notify observers.
    if(initialized&&changes.some(change=>change.changed&&!change.below))cards.dataset.filtering='true';
    for(const change of changes) {
      const {card,matches,previous,height,opacity,below,changed}=change;
      previous?.cancel();transitions.delete(card);
      card.inert=!matches;
      card.setAttribute('aria-hidden',String(!matches));
      if(!initialized || !changed || below || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        card.hidden=!matches;
        continue;
      }
      card.hidden=false;
      const targetHeight=matches ? card.getBoundingClientRect().height : 0;
      const animation=card.animate([
        {height:`${height}px`,opacity,overflow:'clip'},
        {height:`${targetHeight}px`,opacity:matches?1:0,overflow:'clip'}
      ],{duration:design.effects.projectFilterTransitionDuration,easing:'cubic-bezier(.4,0,.2,1)',fill:'both'});
      animation.pause();
      transitions.set(card,animation);
      animations.push(animation);
      animation.onfinish=()=>{
        if(transitions.get(card)!==animation)return;
        transitions.delete(card);card.hidden=!matches;animation.cancel();
        if(!transitions.size){delete cards.dataset.filtering;onChange();}
      };
    }
    if(animations.length)cards.dataset.filtering='true';else delete cards.dataset.filtering;
    const start=document.timeline.currentTime;
    for(const animation of animations){animation.play();animation.startTime=start;}
    for (const [tag, button] of buttons) {
      button.setAttribute('aria-pressed', String(tag === null ? !selected.size : selected.has(tag)));
    }
    initialized = true;
    status.textContent = `${visible} of ${projects.length} projects${selected.size ? ' · Matching any selected tag' : ''}`;
  }
  makeButton('All', projects.length, null);
  for (const [tag, count] of counts) makeButton(tag, count, tag);
  container.append(bar, status);
  update();
  return container;
}
