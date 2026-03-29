const splash = document.getElementById('splash');
if (splash) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    splash.hidden = true;
  } else {
    document.body.classList.add('has-splash-motion');

    splash.addEventListener('animationstart', (e) => {
      if (e.animationName === 'splash-exit') {
        document.body.classList.add('reveal-site');
      }
    });

    splash.addEventListener('animationend', (e) => {
      if (e.animationName === 'splash-exit') splash.hidden = true;
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
