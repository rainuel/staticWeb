/* =====================================================================
   YOUR BUSINESS NAME — SCRIPT.JS
   Vanilla JavaScript only. No frameworks, no build tools.
   Handles: page loader, scroll progress bar, sticky navbar shadow,
   mobile menu toggle, smooth scrolling, scroll-triggered fade-ins,
   back-to-top button, and the footer year.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------
     1. PAGE LOADER
     Hides the loading screen once the page has fully loaded.
     ------------------------------------------------------------------- */
  const pageLoader = document.getElementById('page-loader');

  window.addEventListener('load', () => {
    // Small delay so the loader doesn't just flash instantly on fast connections
    setTimeout(() => {
      pageLoader.classList.add('loaded');
    }, 400);
  });

  /* -------------------------------------------------------------------
     2. SCROLL PROGRESS BAR
     Fills left-to-right as the user scrolls down the page.
     ------------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${scrolledPercent}%`;
  }

  /* -------------------------------------------------------------------
     3. STICKY NAVBAR SHADOW ON SCROLL
     ------------------------------------------------------------------- */
  const siteHeader = document.getElementById('site-header');

  function updateHeaderShadow() {
    if (window.scrollY > 12) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  /* -------------------------------------------------------------------
     4. BACK-TO-TOP BUTTON VISIBILITY
     ------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  function updateBackToTopVisibility() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Combine all scroll-driven updates into a single listener for performance */
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateHeaderShadow();
    updateBackToTopVisibility();
  });

  // Run once on load in case the page is refreshed mid-scroll
  updateScrollProgress();
  updateHeaderShadow();
  updateBackToTopVisibility();

  /* -------------------------------------------------------------------
     5. MOBILE HAMBURGER MENU TOGGLE
     ------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function closeMobileMenu() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu whenever a nav link is tapped
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* -------------------------------------------------------------------
     6. SMOOTH SCROLLING FOR ANCHOR LINKS
     (CSS `scroll-behavior: smooth` already covers most cases; this adds
     a small offset so the sticky header doesn't cover the target section.)
     ------------------------------------------------------------------- */
  const headerOffset = 70;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  /* -------------------------------------------------------------------
     7. SCROLL-TRIGGERED FADE-IN ANIMATIONS
     Uses IntersectionObserver to add `.in-view` to elements with the
     `.reveal` class once they enter the viewport.
     ------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* -------------------------------------------------------------------
     8. FOOTER YEAR
     ------------------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});