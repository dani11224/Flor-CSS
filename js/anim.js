/* ═══════════════════════════════════════════════════════
   anim.js — Lógica de la escena de flores
   Maneja: transición fade-in y revelación del mensaje final.
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var overlayEl = document.getElementById('fade-overlay');
  var messageEl = document.getElementById('final-message');

  // ─── FADE-IN AL ENTRAR ─────────────────────────────
  function fadeIn() {
    if (overlayEl) {
      setTimeout(function () {
        overlayEl.classList.remove('fade-overlay--active');
      }, 100);
    }
  }

  // ─── MENSAJE FINAL ────────────────────────────────
  // Aparece tras crecer las flores (~5 segundos)
  function showFinalMessage() {
    if (!messageEl) return;

    // Accesibilidad: si el usuario prefiere menos movimiento, mostrar de inmediato
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      messageEl.classList.add('final-message--visible');
      return;
    }

    setTimeout(function () {
      messageEl.classList.add('final-message--visible');
    }, 5000);
  }

  // ─── INICIALIZACIÓN ────────────────────────────────
  function init() {
    fadeIn();
    showFinalMessage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
