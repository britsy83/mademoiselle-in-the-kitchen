const splash = document.getElementById('splash');
if (splash) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const parseCssTimeToMs = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    if (trimmed.endsWith('ms')) return Number.parseFloat(trimmed);
    if (trimmed.endsWith('s')) return Number.parseFloat(trimmed) * 1000;
    return Number.parseFloat(trimmed) || 0;
  };

  if (prefersReducedMotion.matches) {
    splash.hidden = true;
  } else {
    const splashStyles = window.getComputedStyle(splash);
    const preExitDelay =
      parseCssTimeToMs(splashStyles.getPropertyValue('--splash-exit-delay')) -
      parseCssTimeToMs(splashStyles.getPropertyValue('--splash-pre-exit-lead'));

    document.body.classList.add('has-splash-motion');
    window.setTimeout(() => {
      splash.classList.add('is-pre-exit');
    }, Math.max(0, preExitDelay));

    splash.addEventListener('animationstart', (e) => {
      if (e.animationName === 'splash-exit') {
        splash.classList.add('is-exiting');
        document.body.classList.add('reveal-site');
      }
    });

    splash.addEventListener('animationend', (e) => {
      if (e.animationName === 'splash-exit') {
        splash.hidden = true;
        document.body.classList.add('splash-complete');
      }
    });
  }
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
