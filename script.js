// ============================================================
// PIYUSH MALVIYA - GAMING PORTFOLIO JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------
  // 1. CUSTOM CURSOR
  // ----------------------------------------------------------
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left     = e.clientX + 'px';
    cursor.style.top      = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.borderColor = 'rgba(0, 240, 255, 0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(0, 240, 255, 0.5)';
    });
  });

  // ----------------------------------------------------------
  // 2. TYPEWRITER TAGLINE
  // Edit 'phrases' array to change the rotating taglines
  // ----------------------------------------------------------
  const phrases = [
    'Unity 3D Developer',
    'AR / VR Engineer',
    'XR Experience Creator',
    'Interactive World Builder',
    'Game Systems Architect',
  ];

  const typedEl = document.querySelector('.typed-text');
  const blinkEl = document.querySelector('.cursor-blink');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIdx];

    if (!deleting) {
      typedEl.textContent = currentPhrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentPhrase.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typedEl.textContent = currentPhrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 50 : 80);
  }
  typeLoop();

  // ----------------------------------------------------------
  // 3. MOBILE NAV TOGGLE
  // ----------------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ----------------------------------------------------------
  // 4. SCROLL REVEAL
  // ----------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if .stagger parent
        if (entry.target.classList.contains('stagger')) {
          entry.target.querySelectorAll('.reveal-child').forEach((child, idx) => {
            setTimeout(() => child.classList.add('visible'), idx * 120);
          });
        }
        setTimeout(() => entry.target.classList.add('visible'), 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // ----------------------------------------------------------
  // 5. ACTIVE NAV LINK on scroll
  // ----------------------------------------------------------
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 100 && scrollY < sec.offsetTop + sec.offsetHeight - 100) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // ----------------------------------------------------------
  // 6. YEAR in footer
  // ----------------------------------------------------------
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  
});
// LIGHTBOX
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
