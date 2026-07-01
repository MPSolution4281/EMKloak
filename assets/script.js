/* EM Kloak ApS — site scripts */

(function () {
  'use strict';

  /* ── NAV SCROLL ──────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── HERO BG PARALLAX LOAD ────────────────────────────────────────── */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('load', () => hero.classList.add('loaded'));
  }

  /* ── MOBILE NAV ──────────────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobNav     = document.getElementById('mob-nav');
  const mobOverlay = document.getElementById('mob-overlay');
  const mobClose   = document.getElementById('mob-close');

  if (hamburger && mobNav && mobOverlay) {
    const openMenu = () => {
      hamburger.setAttribute('aria-expanded', 'true');
      mobNav.classList.add('open');
      mobNav.setAttribute('aria-hidden', 'false');
      mobOverlay.classList.add('visible');
    };
    const closeMenu = () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobNav.classList.remove('open');
      mobNav.setAttribute('aria-hidden', 'true');
      mobOverlay.classList.remove('visible');
    };

    hamburger.addEventListener('click', () => {
      mobNav.classList.contains('open') ? closeMenu() : openMenu();
    });
    if (mobClose) mobClose.addEventListener('click', closeMenu);
    mobOverlay.addEventListener('click', closeMenu);

    mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobNav.classList.contains('open')) closeMenu();
    });
  }

  /* ── SCROLL ANIMATIONS ────────────────────────────────────────────── */
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── ACTIVE NAV LINK ──────────────────────────────────────────────── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  /* ── SMOOTH ANCHOR SCROLL ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (nav ? nav.offsetHeight : 0) + 24;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ── CONTACT FORM SUBMIT (basic client validation) ─────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name    = form.querySelector('[name="name"]');
      const phone   = form.querySelector('[name="phone"]');
      const message = form.querySelector('[name="message"]');
      let valid = true;
      [name, phone, message].forEach(f => {
        if (f && !f.value.trim()) {
          f.style.borderColor = 'var(--accent)';
          valid = false;
        } else if (f) {
          f.style.borderColor = '';
        }
      });
      if (!valid) return;

      const btn = form.querySelector('.form-submit');
      const orig = btn.textContent;
      btn.textContent = 'Sender…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Besked sendt — vi kontakter dig inden for 24 timer';
        btn.style.background = 'var(--bg-3)';
        btn.style.color = 'var(--text-0)';
        form.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 4000);
      }, 800);
    });
  }

})();
