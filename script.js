const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();
window.addEventListener('load', () => {
  window.requestAnimationFrame(() => {
    document.body.classList.add('is-ready');
  });
});

if (btn && nav) {
  const setMenuState = (isOpen) => {
    btn.setAttribute('aria-expanded', String(isOpen));
    nav.classList.toggle('open', isOpen);
  };

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    setMenuState(!expanded);
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    if (event.target instanceof Node && !event.target.closest('.nav')) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });
}
