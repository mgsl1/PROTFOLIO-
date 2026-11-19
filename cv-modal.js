/* ============================================================
   CV button -> friendly popup asking to get in touch on LinkedIn
   (no file is downloaded; the CV is sent personally)
============================================================ */
(function () {
  var LINKEDIN = 'https://www.linkedin.com/in/mohamed-abdo-667a0b335';
  var TEXTS = {
    en: { title: 'Let’s connect on LinkedIn', body: 'To receive my CV, send me a message on LinkedIn and I’ll share it with you personally.', go: 'Message me on LinkedIn', close: 'Maybe later', label: 'Request my CV' },
    fr: { title: 'Discutons sur LinkedIn', body: 'Pour recevoir mon CV, envoyez-moi un message sur LinkedIn et je vous le transmettrai personnellement.', go: 'Me contacter sur LinkedIn', close: 'Plus tard', label: 'Demander mon CV' },
    ar: { title: 'تواصل معي عبر لينكد إن', body: 'لاستلام سيرتي الذاتية، راسلني على لينكد إن وسأرسلها لك شخصيًا.', go: 'راسلني على لينكد إن', close: 'لاحقًا', label: 'طلب السيرة الذاتية' }
  };
  var lastFocus = null, root = null;

  function lang() {
    var l = (document.documentElement.lang || localStorage.getItem('site-lang') || 'en').slice(0, 2);
    return TEXTS[l] ? l : 'en';
  }

  function build() {
    root = document.createElement('div');
    root.className = 'cv-modal';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<div class="cv-modal-backdrop" data-cv-close></div>' +
      '<div class="cv-modal-card" tabindex="-1">' +
        '<button type="button" class="cv-modal-x" data-cv-close aria-label="Close">&times;</button>' +
        '<div class="cv-modal-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>' +
        '</div>' +
        '<h3 class="cv-modal-title"></h3>' +
        '<p class="cv-modal-body"></p>' +
        '<div class="cv-modal-actions">' +
          '<a class="btn btn-primary cv-modal-go" target="_blank" rel="noopener"></a>' +
          '<button type="button" class="cv-modal-later" data-cv-close></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-cv-close]')) close();
    });
    root.querySelector('.cv-modal-go').addEventListener('click', function () { setTimeout(close, 200); });
  }

  function open() {
    if (!root) build();
    var l = lang(), t = TEXTS[l];
    root.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    root.querySelector('.cv-modal-title').textContent = t.title;
    root.querySelector('.cv-modal-body').textContent = t.body;
    var go = root.querySelector('.cv-modal-go');
    go.textContent = t.go; go.href = LINKEDIN;
    root.querySelector('.cv-modal-later').textContent = t.close;
    root.querySelector('.cv-modal-x').setAttribute('aria-label', t.close);
    lastFocus = document.activeElement;
    root.setAttribute('aria-hidden', 'false');
    // next frame so the transition runs
    requestAnimationFrame(function () {
      root.classList.add('is-open');
      document.body.classList.add('cv-modal-lock');
      go.focus({ preventScroll: true });
    });
  }

  function close() {
    if (!root || !root.classList.contains('is-open')) return;
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cv-modal-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  // Capture phase: runs before any other handler and cancels the file download
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.hero-actions .btn-outline');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    open();
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // Make the button a plain, non-downloading link (also after backend.js rewrites its href)
  function neutralize() {
    var btn = document.querySelector('.hero-actions .btn-outline');
    if (!btn) return;
    btn.removeAttribute('download');
    btn.setAttribute('href', '#');
    btn.setAttribute('role', 'button');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', neutralize); else neutralize();
  window.addEventListener('load', function () { setTimeout(neutralize, 600); });
})();
