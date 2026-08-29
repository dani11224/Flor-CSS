/* ═══════════════════════════════════════════════════════
   anim.js — Lógica de la escena de flores
   Maneja: fade-in, audio, y mensaje final.
   Las animaciones son 100% CSS (no dependen de JS).
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var overlayEl     = document.getElementById('fade-overlay');
  var audioToggleEl = document.getElementById('audio-toggle');
  var audioIconEl   = document.getElementById('audio-icon');
  var musicEl       = document.getElementById('bg-music');
  var messageEl     = document.getElementById('final-message');

  // ─── FADE-IN ───────────────────────────────────────
  function fadeIn() {
    setTimeout(function () {
      overlayEl.classList.remove('fade-overlay--active');
    }, 100);
  }

  // ─── AUDIO ─────────────────────────────────────────
  var musicStarted = false;
  var musicPlaying = false;

  function tryPlayMusic() {
    if (musicStarted) return;
    musicStarted = true;
    musicEl.volume = 0.5;
    var p = musicEl.play();
    if (p !== undefined) {
      p.then(function () {
        musicPlaying = true;
        audioIconEl.textContent = '🔊';
      }).catch(function () {
        musicStarted = false;
      });
    }
  }

  function toggleMusic() {
    if (!musicStarted) { tryPlayMusic(); return; }
    if (musicPlaying) {
      musicEl.pause();
      musicPlaying = false;
      audioIconEl.textContent = '🔇';
    } else {
      musicEl.play();
      musicPlaying = true;
      audioIconEl.textContent = '🔊';
    }
  }

  // ─── MENSAJE FINAL ────────────────────────────────
  // Aparece tras ~6s (cuando las flores ya florecieron
  // y la vegetación terminó de crecer).
  function showFinalMessage() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      messageEl.classList.add('final-message--visible');
      return;
    }
    setTimeout(function () {
      messageEl.classList.add('final-message--visible');
    }, 6500);
  }

  // ─── INIT ──────────────────────────────────────────
  function init() {
    fadeIn();
    document.addEventListener('click', tryPlayMusic, { once: true });
    document.addEventListener('touchstart', tryPlayMusic, { once: true });
    audioToggleEl.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMusic();
    });
    showFinalMessage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
