// Shared behavior for both index.html and tracker.html

// Nav background appears once you scroll past the top
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu toggle (mobile navigation)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Investigations dropdown. The site's first interactive nav: the article pages
// outgrew a flat row, so they sit behind one top-level item. On mobile the
// whole nav is already a stacked column, so the submenu renders inline there
// and this toggle is inert. See the media query in style.css.
const navGroupBtn = document.getElementById('nav-group-btn');
const navSubmenu = document.getElementById('nav-investigations');
if (navGroupBtn && navSubmenu) {
  const setOpen = (open) => {
    navGroupBtn.setAttribute('aria-expanded', String(open));
    navSubmenu.classList.toggle('open', open);
  };

  navGroupBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(navGroupBtn.getAttribute('aria-expanded') !== 'true');
  });

  // Clicking anywhere else closes it, including on another nav item.
  document.addEventListener('click', (e) => {
    if (!navSubmenu.contains(e.target)) setOpen(false);
  });

  // Escape closes and returns focus to the button, so keyboard users are not
  // stranded inside a collapsed menu.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navGroupBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      navGroupBtn.focus();
    }
  });

  // Tabbing out of the group closes it.
  navSubmenu.parentElement.addEventListener('focusout', (e) => {
    if (!navSubmenu.parentElement.contains(e.relatedTarget)) setOpen(false);
  });
}

// Fade-up animation as sections enter the viewport (index.html only,
// harmless no-op on pages with no .fade-up elements)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Smooth scroll for in-page anchor links (e.g. #why, #tools)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});