const header = document.querySelector('[data-header]');
const reveals = document.querySelectorAll('.reveal');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  let current = '';
  for (const section of sections) {
    if (window.scrollY >= section.offsetTop - 180) current = `#${section.id}`;
  }
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === current));
};

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

reveals.forEach(item => revealObserver.observe(item));
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${y * -3}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
