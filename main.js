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

// Nav dropdowns. The article pages outgrew a flat row, so they sit behind
// top-level items. There are two groups now, Deep Dives and Why & How, so this
// walks every .nav-group rather than one hardcoded pair. On mobile the whole
// nav is already a stacked column, so the submenus render inline there and
// these toggles are inert. See the media query in style.css.
const navGroups = Array.from(document.querySelectorAll('.nav-group')).map(group => {
  const btn = group.querySelector('.nav-group-btn');
  const submenu = group.querySelector('.nav-submenu');
  if (!btn || !submenu) return null;
  return {
    group,
    btn,
    isOpen: () => btn.getAttribute('aria-expanded') === 'true',
    setOpen: (open) => {
      btn.setAttribute('aria-expanded', String(open));
      submenu.classList.toggle('open', open);
    }
  };
}).filter(Boolean);

const closeGroups = (except) => {
  navGroups.forEach(g => { if (g !== except) g.setOpen(false); });
};

navGroups.forEach(g => {
  g.btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !g.isOpen();
    // Opening one closes the other, so two panels never sit open at once.
    closeGroups(g);
    g.setOpen(open);
  });

  // Tabbing out of a group closes it.
  g.group.addEventListener('focusout', (e) => {
    if (!g.group.contains(e.relatedTarget)) g.setOpen(false);
  });
});

if (navGroups.length) {
  // Clicking outside every group closes them all, including on another nav item.
  document.addEventListener('click', (e) => {
    if (!navGroups.some(g => g.group.contains(e.target))) closeGroups();
  });

  // Escape closes and returns focus to the button, so keyboard users are not
  // stranded inside a collapsed menu.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = navGroups.find(g => g.isOpen());
    if (open) {
      open.setOpen(false);
      open.btn.focus();
    }
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