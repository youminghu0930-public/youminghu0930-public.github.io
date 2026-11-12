export function installNavigation() {
const header = document.querySelector('header');
const nav = document.querySelector('#section-navigation');
const toggle = document.querySelector('.navigation-toggle');
const backdrop = document.querySelector('.navigation-backdrop');
const mobile = matchMedia('(max-width: 1000px)');
function setNavigation(expanded) {
  toggle.setAttribute('aria-expanded', String(expanded));
  header.dataset.expanded = String(expanded);
  nav.inert = !expanded;
  backdrop.dataset.visible = String(expanded && mobile.matches);
}
setNavigation(!mobile.matches);
mobile.addEventListener('change', () => setNavigation(!mobile.matches));
toggle.addEventListener('click', () => setNavigation(toggle.getAttribute('aria-expanded') !== 'true'));
backdrop.addEventListener('click', () => { setNavigation(false); toggle.focus(); });
nav.addEventListener('click', event => {
  if (mobile.matches && event.target.closest('a')) {
    setNavigation(false);
    toggle.focus();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setNavigation(false);
    toggle.focus();
  }
});

}
