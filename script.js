// ═══════════════════════════════════════════════════════════════════
// Red Dragons School of Shaolin Tai Chi & Kung Fu — script.js
// ═══════════════════════════════════════════════════════════════════

// ─── Footer year ──────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Nav scroll effect ────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Mobile nav toggle ────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-label', 'Open menu');
  });
});

// ─── Scroll reveal ────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Apply reveal class to major content blocks
const revealSelectors = [
  '.about__text',
  '.about__cards',
  '.stat-card',
  '.pillar',
  '.class-card',
  '.shaolin__text',
  '.shaolin__visual',
  '.contact__info',
  '.contact__form',
  '.philosophy__quote',
];

revealSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    if (el.classList.contains('stat-card') || el.classList.contains('pillar') || el.classList.contains('class-card')) {
      el.style.transitionDelay = `${i * 0.08}s`;
    }
    revealObserver.observe(el);
  });
});

// ─── Contact form (demo handler) ──────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const interest = document.getElementById('interest').value;

    if (!name || !email) return;

    // Replace form with success message
    contactForm.innerHTML = `
      <div class="form__success">
        <p style="font-size:2.5rem; margin-bottom:0.5rem;">🐉</p>
        <p>感谢你，${name}！</p>
        <p style="font-size:0.95rem; color: var(--muted); margin-top:0.75rem; font-family: var(--font-body);">
          Thank you for your interest${interest ? ' in <em>' + interest + '</em>' : ''}.
          We will be in touch at <strong style="color:var(--gold)">${email}</strong> very soon.
        </p>
        <p style="margin-top:1.5rem; font-size:0.85rem; color:var(--muted); font-family:var(--font-body);">
          它都是物理学 — It's all physics.
        </p>
      </div>
    `;
  });
}
