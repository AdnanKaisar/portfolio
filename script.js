/* ==========================================================
   ADNAN KAISAR — PORTFOLIO  |  Main Script
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------- Typed.js ------- */
  new Typed('.typing', {
    strings: [
      'Computer Science Student',
      'Python Learner',
      'Aspiring Data Analyst',
      'AI & ML Enthusiast'
    ],
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 1800,
    loop: true
  });

  /* ------- Mobile Nav ------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  function closeNav() {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeNav);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* ------- Navbar scroll effect ------- */
  const nav = document.querySelector('nav');
  const navAnchors = navLinks.querySelectorAll('a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  /* ------- Scroll-reveal (IntersectionObserver) ------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObs.observe(el));

  /* ------- Skill-bar fill on scroll ------- */
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.level;
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(c => skillObs.observe(c));

  /* ------- Cursor glow (desktop only) ------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ------- Particle canvas ------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h;
    const particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 1.8 + .3;
        this.vx = (Math.random() - .5) * .3;
        this.vy = (Math.random() - .5) * .3;
        this.alpha = Math.random() * .35 + .05;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${this.alpha + 0.1})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${.12 * (1 - dist / 140)})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ------- Smooth scroll for nav links (fallback) ------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ------- Image lightbox ------- */
  const lightbox = document.getElementById('lightbox');
  const lbTrigger = document.getElementById('hero-img-trigger');
  const lbClose = document.getElementById('lightbox-close');

  if (lightbox && lbTrigger) {
    lbTrigger.addEventListener('click', () => lightbox.classList.add('active'));
    lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }
});
