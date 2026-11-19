/* ============================================================
   "View All Projects" -> full-screen gallery of every project
   (search + category filters, opens the usual project modal)
============================================================ */
(function () {
  var TEXTS = {
    en: { title: 'All Projects', count: function (n) { return n + (n === 1 ? ' project' : ' projects'); }, search: 'Search projects…', all: 'All', none: 'No project matches your search.', close: 'Close', eyebrow: 'Portfolio' },
    fr: { title: 'Tous les projets', count: function (n) { return n + (n > 1 ? ' projets' : ' projet'); }, search: 'Rechercher un projet…', all: 'Tout', none: 'Aucun projet ne correspond à votre recherche.', close: 'Fermer', eyebrow: 'Portfolio' },
    ar: { title: 'جميع المشاريع', count: function (n) { return n + ' مشروعًا'; }, search: 'ابحث عن مشروع…', all: 'الكل', none: 'لا يوجد مشروع يطابق بحثك.', close: 'إغلاق', eyebrow: 'المحفظة' }
  };
  var root = null, state = { filter: 'all', q: '' }, lastFocus = null, isOpen = false;

  function lng() {
    var l = (document.documentElement.lang || localStorage.getItem('site-lang') || 'en').slice(0, 2);
    return TEXTS[l] ? l : 'en';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pick(v) {
    if (typeof pickI18n === 'function') return pickI18n(v) || '';
    if (v && typeof v === 'object') return v[lng()] || v.en || '';
    return v || '';
  }
  function projects() {
    var d = (typeof DYN !== 'undefined' && DYN.projects) || [];
    if (d.length) return d;
    return typeof buildLocalProjects === 'function' ? buildLocalProjects() : [];
  }
  function categories() {
    var c = (typeof DYN !== 'undefined' && DYN.categories) || [];
    if (!c.length && typeof LOCAL_CATEGORIES !== 'undefined') c = LOCAL_CATEGORIES;
    return c.filter(function (x) { return x.is_visible !== false; });
  }
  function slugsOf(p) {
    var cats = (typeof DYN !== 'undefined' && DYN.categories) || (typeof LOCAL_CATEGORIES !== 'undefined' ? LOCAL_CATEGORIES : []);
    var fromLinks = (p.project_category_links || []).map(function (l) {
      var c = cats.find(function (x) { return x.id === l.category_id; });
      return c && c.slug;
    }).filter(Boolean);
    return fromLinks.length ? fromLinks : (p.categories || []);
  }
  function techsOf(p) {
    var t = (p.project_technologies || []).map(function (pt) { return pt.technologies && pt.technologies.name; }).filter(Boolean);
    return t.length ? t : (p.technologies || []);
  }
  function haystack(p) {
    var parts = [];
    ['ar', 'fr', 'en'].forEach(function (l) {
      ['title', 'short_description', 'badge'].forEach(function (k) {
        var v = p[k]; if (v && typeof v === 'object') parts.push(v[l]); else if (typeof v === 'string') parts.push(v);
      });
    });
    return parts.concat(techsOf(p)).join(' ').toLowerCase();
  }

  function build() {
    root = document.createElement('div');
    root.className = 'allp';
    root.id = 'allProjects';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<div class="allp-bar">' +
        '<div class="allp-bar-in">' +
          '<div class="allp-head">' +
            '<div><p class="allp-eyebrow"></p><h2 class="allp-title"></h2></div>' +
            '<span class="allp-count"></span>' +
            '<button type="button" class="allp-close" data-allp-close></button>' +
          '</div>' +
          '<div class="allp-tools">' +
            '<input type="search" class="allp-search" autocomplete="off" />' +
            '<div class="allp-filters"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="allp-body"><div class="allp-grid"></div><p class="allp-empty" hidden></p></div>';
    document.body.appendChild(root);

    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-allp-close]')) { close(); return; }
      var f = e.target.closest('.allp-filter');
      if (f) { state.filter = f.dataset.filter; paintFilters(); paintGrid(); return; }
      var card = e.target.closest('.allp-card');
      if (card) openProject(card.dataset.id);
    });
    root.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('allp-card')) {
        e.preventDefault(); openProject(e.target.dataset.id);
      }
    });
    root.querySelector('.allp-search').addEventListener('input', function (e) {
      state.q = e.target.value.trim().toLowerCase(); paintGrid();
    });
  }

  function paintTexts() {
    var t = TEXTS[lng()];
    root.setAttribute('dir', lng() === 'ar' ? 'rtl' : 'ltr');
    root.querySelector('.allp-eyebrow').textContent = t.eyebrow;
    root.querySelector('.allp-title').textContent = t.title;
    root.querySelector('.allp-search').placeholder = t.search;
    var cl = root.querySelector('.allp-close');
    cl.setAttribute('aria-label', t.close); cl.textContent = '×';
    root.querySelector('.allp-empty').textContent = t.none;
  }
  function paintFilters() {
    var t = TEXTS[lng()], list = projects();
    var html = '<button type="button" class="allp-filter' + (state.filter === 'all' ? ' active' : '') + '" data-filter="all">' +
      esc(t.all) + ' <span>' + list.length + '</span></button>';
    categories().forEach(function (c) {
      var n = list.filter(function (p) { return slugsOf(p).indexOf(c.slug) !== -1; }).length;
      if (!n) return;
      html += '<button type="button" class="allp-filter' + (state.filter === c.slug ? ' active' : '') + '" data-filter="' + esc(c.slug) + '">' +
        esc(pick(c.name)) + ' <span>' + n + '</span></button>';
    });
    root.querySelector('.allp-filters').innerHTML = html;
  }
  function paintGrid() {
    var t = TEXTS[lng()];
    var list = projects().filter(function (p) {
      if (state.filter !== 'all' && slugsOf(p).indexOf(state.filter) === -1) return false;
      return !state.q || haystack(p).indexOf(state.q) !== -1;
    });
    root.querySelector('.allp-count').textContent = t.count(list.length);
    root.querySelector('.allp-empty').hidden = list.length > 0;
    root.querySelector('.allp-grid').innerHTML = list.map(function (p, i) {
      var img = p.cover_image_url || p.thumbnail_url || '';
      var tags = techsOf(p).slice(0, 3).map(function (n) { return '<span class="tag">' + esc(n) + '</span>'; }).join('');
      return '<article class="allp-card" role="button" tabindex="0" data-id="' + esc(p.id) + '" style="animation-delay:' + Math.min(i, 14) * 35 + 'ms">' +
        '<div class="allp-thumb"' + (img ? ' style="background-image:url(\'' + esc(img) + '\')"' : '') + '>' +
          (p.badge ? '<span class="project-badge">' + esc(pick(p.badge)) + '</span>' : '') +
        '</div>' +
        '<div class="allp-info"><h3>' + esc(pick(p.title)) + '</h3><p>' + esc(pick(p.short_description)) + '</p>' +
        '<div class="tag-row">' + tags + '</div></div></article>';
    }).join('');
  }

  function openProject(id) {
    var p = projects().find(function (x) { return String(x.id) === String(id); });
    if (p && typeof openProjectModal === 'function') openProjectModal(p);
  }

  function open() {
    if (!root) build();
    state = { filter: 'all', q: '' };
    root.querySelector('.allp-search').value = '';
    paintTexts(); paintFilters(); paintGrid();
    lastFocus = document.activeElement;
    isOpen = true;
    root.setAttribute('aria-hidden', 'false');
    root.scrollTop = 0;
    root.querySelector('.allp-body').scrollTop = 0;
    document.body.classList.add('allp-lock');
    requestAnimationFrame(function () { root.classList.add('is-open'); });
    if (location.hash !== '#all-projects') {
      try { history.pushState({ allp: 1 }, '', '#all-projects'); } catch (e) {}
    }
  }
  function hide() {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('allp-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function close() {
    if (!isOpen) return;
    if (history.state && history.state.allp) history.back(); else hide();
  }

  // The link next to the "Selected Projects" heading
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('#projects .section-head .link-arrow');
    if (!a) return;
    e.preventDefault();
    open();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !isOpen) return;
    if (document.querySelector('.pm-overlay.show')) return; // the project modal closes first
    close();
  });
  window.addEventListener('popstate', function () {
    if (isOpen && !(history.state && history.state.allp)) hide();
    else if (!isOpen && location.hash === '#all-projects') open();
  });
  // keep the screen in sync when the visitor switches language
  new MutationObserver(function () {
    if (isOpen) { paintTexts(); paintFilters(); paintGrid(); }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  // deep link: yoursite.com/#all-projects
  window.addEventListener('load', function () {
    if (location.hash === '#all-projects') setTimeout(open, 400);
  });
})();
