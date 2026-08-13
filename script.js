const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, {passive:true});

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.gallery-item');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  items.forEach(item => item.classList.toggle('hidden', f !== 'all' && item.dataset.category !== f));
}));

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
items.forEach(item => item.addEventListener('click', () => {
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = item.querySelector('img').alt;
  lightbox.showModal();
}));
lightboxClose.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if(e.target === lightbox) lightbox.close(); });

document.getElementById('quote-form').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const subject = `Drone project inquiry — ${fd.get('project')}`;
  const body = `Name: ${fd.get('name')}\nCompany: ${fd.get('company') || ''}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone') || ''}\nProject type: ${fd.get('project')}\n\nProject details:\n${fd.get('details') || ''}`;
  window.location.href = `mailto:Jlinderman@permiandrones.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
