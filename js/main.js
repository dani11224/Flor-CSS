(function () {
  'use strict';

  // ─── CONFIG ─────────────────────────────────────────
  const MESSAGE = 'Se que estos dias no te has sentido muy bien...';
  const TYPING_SPEED = 70;        // ms por carácter
  const PARTICLE_COUNT = 30;      // Número de partículas

  // ─── ELEMENTOS ──────────────────────────────────────
  const typewriterEl = document.getElementById('typewriter-text');
  const btnEl = document.getElementById('btn-enter');
  const particlesEl = document.getElementById('particles');
  const overlayEl = document.getElementById('fade-overlay');

  // ─── PARTÍCULAS FLOTANTES ───────────────────────────
  // Genera partículas con posiciones y delays aleatorios
  function createParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const span = document.createElement('span');
      span.classList.add('particle');
      span.style.left = Math.random() * 100 + '%';
      span.style.top = (30 + Math.random() * 70) + '%'; // Solo mitad inferior
      span.style.animationDelay = (Math.random() * 8) + 's';
      span.style.animationDuration = (6 + Math.random() * 6) + 's';
      // Tamaño variable
      const size = 2 + Math.random() * 4;
      span.style.width = size + 'px';
      span.style.height = size + 'px';
      particlesEl.appendChild(span);
    }
  }

  // ─── EFECTO TYPEWRITER ──────────────────────────────
  // Escribe el mensaje carácter por carácter
  function typewrite(text, element, speed) {
    return new Promise(function (resolve) {
      let index = 0;
      element.classList.add('typewriter--cursor');

      // Respeta prefers-reduced-motion: muestra todo de golpe
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.textContent = text;
        element.classList.remove('typewriter--cursor');
        resolve();
        return;
      }

      function tick() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(tick, speed);
        } else {
          // Deja el cursor un momento antes de quitarlo
          setTimeout(function () {
            element.classList.remove('typewriter--cursor');
            resolve();
          }, 600);
        }
      }

      tick();
    });
  }

  // ─── MOSTRAR BOTÓN ─────────────────────────────────
  function showButton() {
    btnEl.classList.add('btn-enter--visible');
  }

  // ─── TRANSICIÓN FADE-OUT AL NAVEGAR ────────────────
  // Intercepta el clic en el botón para hacer fade-out
  // antes de navegar a flower.html
  function setupNavigation() {
    btnEl.addEventListener('click', function (e) {
      e.preventDefault();
      const href = btnEl.getAttribute('href');

      // Activa el overlay oscuro
      overlayEl.classList.add('fade-overlay--active');

      // Navega tras la transición
      setTimeout(function () {
        window.location.href = href;
      }, 800); // Coincide con --duration-fade
    });
  }

  // ─── INICIALIZACIÓN ────────────────────────────────
  function init() {
    createParticles();
    setupNavigation();

    // Secuencia: typewriter → botón
    typewrite(MESSAGE, typewriterEl, TYPING_SPEED)
      .then(function () {
        showButton();
      });
  }

  // Arranca cuando el DOM está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
