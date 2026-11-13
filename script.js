/* Beyond the Sands — interactions */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  /* ---------- Sticky nav state ---------- */
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
      closeMenu();
    }
  });

  /* ---------- Scroll progress + back to top ---------- */
  var bar = document.getElementById('progressBar');
  var toTop = document.getElementById('toTop');

  function onScrollProgress() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct + '%';
    if (toTop) toTop.classList.toggle('is-visible', h.scrollTop > 600);
  }
  window.addEventListener('scroll', onScrollProgress, { passive: true });
  onScrollProgress();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Lightbox (gallery) ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      openLightbox(btn.getAttribute('data-full'), btn.getAttribute('data-alt') || (img && img.alt));
    });
  });

  if (lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ---------- Flip cards (moments / stages) ---------- */
  document.querySelectorAll('.moment, .stage').forEach(function (card) {
    card.addEventListener('click', function () {
      var flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
    });
  });

  /* ---------- Leadership page: founder & emirate toggles ---------- */
  document.querySelectorAll('.founder').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      var bio = btn.querySelector('.founder__bio');
      if (bio) bio.hidden = !open;
    });
  });

  document.querySelectorAll('.emirate__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.emirate');
      var detail = card.querySelector('.emirate__detail');
      var open = detail.hasAttribute('hidden');
      if (open) {
        detail.removeAttribute('hidden');
      } else {
        detail.setAttribute('hidden', '');
      }
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();
