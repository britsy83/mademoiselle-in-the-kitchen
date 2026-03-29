const parseCssTimeToMs = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  if (trimmed.endsWith('ms')) return Number.parseFloat(trimmed);
  if (trimmed.endsWith('s')) return Number.parseFloat(trimmed) * 1000;
  return Number.parseFloat(trimmed) || 0;
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.body.classList.add('reveal-site');
} else {
  const pageStyles = window.getComputedStyle(document.body);
  const revealDelay = parseCssTimeToMs(pageStyles.getPropertyValue('--intro-reveal-delay'));

  document.body.classList.add('has-intro-motion');
  window.setTimeout(() => {
    document.body.classList.add('reveal-site');
  }, revealDelay);
}

const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-list');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();
if (btn && nav) {
  const setMenuState = (isOpen) => {
    btn.setAttribute('aria-expanded', String(isOpen));
    nav.classList.toggle('open', isOpen);
  };

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    setMenuState(!expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    if (event.target instanceof Node && !event.target.closest('.nav')) {
      setMenuState(false);
    }
  });
}
