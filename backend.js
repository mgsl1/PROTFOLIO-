/* ============================================================
   SUPABASE INTEGRATION FOR THE PORTFOLIO SITE
   - Reads content from the same tables the admin dashboard
     manages (hero_section, about_section, services, technologies,
     projects, statistics, contact_info, social_links…).
   - Falls back silently to the static HTML if a table is empty,
     missing, or the request fails — the site never breaks.
   - Wires the contact form to insert into contact_messages.
============================================================ */

const sbClient = (window.supabase || {}).createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/* ---------- language helpers ---------- */
function currentLang() {
  return document.documentElement.lang || localStorage.getItem("site-lang") || "en";
}
function pickI18n(val) {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  const lang = currentLang();
  return val[lang] || val.en || val.fr || val.ar || Object.values(val)[0] || "";
}
function escHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/* Cache of fetched rows so we can re-render text when the
   language is switched, without re-hitting the database. */
const DYN = {
  hero: null, about: null, statistics: null, services: null,
  technologies: null, categories: null, projects: null,
  contactInfo: null, socialLinks: null,
  seo: null, siteSettings: null,
};

/* ============================================================
   HERO SECTION
============================================================ */
function paintHero() {
  const row = DYN.hero;
  if (!row) return;
  if (row.is_visible === false) {
    document.getElementById("home")?.style.setProperty("display", "none");
    return;
  }
  const pill = document.querySelector(".hero .pill");
  if (pill) pill.style.display = row.availability_enabled === false ? "none" : "";
  const setText = (sel, val) => { const el = document.querySelector(sel); if (el && val) el.textContent = val; };

  setText(".hero .pill span[data-i18n='hero.available']", pickI18n(row.availability_text));
  setText(".hero h1 span[data-i18n='hero.title.line1']", pickI18n(row.title_line_1));
  setText(".hero h1 span[data-i18n='hero.title.line2']", pickI18n(row.title_line_2));
  setText(".hero .hero-sub[data-i18n='hero.sub']", pickI18n(row.description));

  const primaryBtn = document.querySelector(".hero-actions .btn-primary");
  if (primaryBtn) {
    const label = pickI18n(row.primary_button_text);
    if (label) { const span = primaryBtn.querySelector("span[data-i18n]"); if (span) span.textContent = label; }
    if (row.primary_button_url) primaryBtn.setAttribute("href", row.primary_button_url);
  }
  const secondaryBtn = document.querySelector(".hero-actions .btn-outline");
  if (secondaryBtn) {
    const label = pickI18n(row.secondary_button_text);
    if (label) secondaryBtn.textContent = label;
    if (row.cv_url) secondaryBtn.setAttribute("href", row.cv_url);
  }
}

/* ============================================================
   ABOUT SECTION
============================================================ */
function paintAbout() {
  const row = DYN.about;
  if (!row) return;
  if (row.is_visible === false) {
    document.getElementById("about")?.style.setProperty("display", "none");
    return;
  }
  const setText = (sel, val) => { const el = document.querySelector(sel); if (el && val) el.textContent = val; };
  setText("#about .eyebrow[data-i18n='about.eyebrow']", pickI18n(row.eyebrow));
  setText("#about h2 span[data-i18n='about.imtext']", pickI18n(row.heading_prefix));
  setText("#about h2 span[data-i18n='about.name']", pickI18n(row.name));
  setText("#about .hero-sub[data-i18n='about.bio']", pickI18n(row.short_bio));
  const img = document.querySelector(".about-photo img");
  if (img && row.image_url) img.src = row.image_url;
}

/* ============================================================
   STATISTICS
============================================================ */
function paintStatistics() {
  const rows = DYN.statistics;
  if (!rows || !rows.length) return;
  const wrap = document.querySelector("#about .stats-row");
  if (!wrap) return;
  wrap.innerHTML = rows
    .filter((r) => r.is_visible !== false)
    .map((r) => `<div class="stat"><b>${escHtml(r.value)}${escHtml(r.suffix || "")}</b><span>${escHtml(pickI18n(r.label))}</span></div>`)
    .join("");
}


/* ============================================================
   SERVICE ICONS (inline SVG, gold-friendly stroke icons)
============================================================ */
const serviceIcons = {
  mobile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  backend: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  api: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`,
  realtime: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
  devops: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>`,
  // common aliases
  "mobile-app": null, "mobile-development": null, "app": null,
  "web-development": null, "website": null,
  "backend-development": null, "server": null,
  "api-integration": null, "integration": null,
  "database-design": null, "db": null,
  "real-time": null, "realtime-features": null,
  "admin-dashboard": null, "analytics": null, "tableaux": null,
  "deployment": null, "maintenance": null, "devops-maintenance": null,
};
// resolve aliases
serviceIcons["mobile-app"] = serviceIcons.mobile;
serviceIcons["mobile-development"] = serviceIcons.mobile;
serviceIcons["app"] = serviceIcons.mobile;
serviceIcons["web-development"] = serviceIcons.web;
serviceIcons["website"] = serviceIcons.web;
serviceIcons["backend-development"] = serviceIcons.backend;
serviceIcons["server"] = serviceIcons.backend;
serviceIcons["api-integration"] = serviceIcons.api;
serviceIcons["integration"] = serviceIcons.api;
serviceIcons["database-design"] = serviceIcons.database;
serviceIcons["db"] = serviceIcons.database;
serviceIcons["real-time"] = serviceIcons.realtime;
serviceIcons["realtime-features"] = serviceIcons.realtime;
serviceIcons["admin-dashboard"] = serviceIcons.dashboard;
serviceIcons["analytics"] = serviceIcons.dashboard;
serviceIcons["tableaux"] = serviceIcons.dashboard;
serviceIcons["deployment"] = serviceIcons.devops;
serviceIcons["maintenance"] = serviceIcons.devops;
serviceIcons["devops-maintenance"] = serviceIcons.devops;

function resolveServiceIcon(r) {
  // 1) uploaded image
  if (r.icon_url) {
    return `<img src="${escHtml(r.icon_url)}" alt="" style="width:18px;height:18px;object-fit:contain;">`;
  }
  // 2) explicit icon key from dashboard
  const key = (r.icon || r.slug || "").toLowerCase().trim().replace(/\s+/g, "-");
  if (key && serviceIcons[key]) return serviceIcons[key];
  // 3) fuzzy match from title (en/fr/ar keywords)
  const title = (typeof pickI18n === "function" ? pickI18n(r.title) : "") || "";
  const t = title.toLowerCase();
  if (/mobile|flutter|android|ios|تطبيق|mobile|application mobile/.test(t)) return serviceIcons.mobile;
  if (/web|site|react|next/.test(t)) return serviceIcons.web;
  if (/backend|serveur|server|api backend|نظام/.test(t)) return serviceIcons.backend;
  if (/api|intégration|integration|rest/.test(t)) return serviceIcons.api;
  if (/base de données|database|postgres|mysql|mongo|firebase|بيانات/.test(t)) return serviceIcons.database;
  if (/temps réel|real.?time|realtime|مباشر|chat|notification/.test(t)) return serviceIcons.realtime;
  if (/tableau|dashboard|analytics|bord|إحصائ|لوحة/.test(t)) return serviceIcons.dashboard;
  if (/déploiement|deploy|devops|maintenance|صيانة/.test(t)) return serviceIcons.devops;
  // fallback: layers icon
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 8 12 14 22 8 12 2"/><polyline points="2 16 12 22 22 16"/></svg>`;
}

/* ============================================================
   SERVICES
============================================================ */
function paintServices() {
  const rows = DYN.services;
  if (!rows || !rows.length) return;
  const grid = document.querySelector("#services .service-grid");
  if (!grid) return;
  grid.innerHTML = rows
    .filter((r) => r.is_visible !== false)
    .map((r) => `
      <div class="service-card">
        <span class="service-icon">${resolveServiceIcon(r)}</span>
        <h4>${escHtml(pickI18n(r.title))}</h4>
        <p>${escHtml(pickI18n(r.short_description))}</p>
      </div>
    `).join("");
}

/* ============================================================
   TECHNOLOGIES
============================================================ */
function paintTechnologies() {
  const rows = DYN.technologies;
  if (!rows || !rows.length) return;
  const grid = document.querySelector("#services .tech-grid");
  if (!grid) return;
  grid.innerHTML = rows
    .filter((r) => r.is_visible !== false)
    .map((r) => {
      const key = (r.icon_key || r.slug || "").toLowerCase();
      let iconHtml;
      if (r.icon_url) iconHtml = `<img src="${escHtml(r.icon_url)}" alt="" style="width:100%;height:100%;object-fit:contain;">`;
      else if (typeof techIcons !== "undefined" && techIcons[key]) iconHtml = techIcons[key];
      else iconHtml = `<span style="font-size:.7rem;">${escHtml((r.name || "?")[0])}</span>`;
      return `<div class="tech-chip"><div class="tech-badge">${iconHtml}</div>${escHtml(r.name)}</div>`;
    }).join("");
}

/* ============================================================
   PROJECT LIKES (heart) — anonymous via visitor_key + RPC
============================================================ */
const LIKES_STORAGE_KEY = "portfolio_liked_projects";

function getVisitorKey() {
  let key = localStorage.getItem("portfolio_visitor_key");
  if (!key) {
    key = (crypto.randomUUID && crypto.randomUUID()) ||
      ("v_" + Math.random().toString(36).slice(2) + Date.now().toString(36));
    localStorage.setItem("portfolio_visitor_key", key);
  }
  return key;
}

/* ---------- analytics: site visits + project views ---------- */
async function trackSiteVisit() {
  if (!sbClient) return;
  try {
    const visitorKey = getVisitorKey();
    const today = new Date().toISOString().slice(0, 10);
    const stampKey = `portfolio_visit_${today}`;
    // One recorded visit per browser per day (keeps dashboard numbers clean)
    if (localStorage.getItem(stampKey)) return;
    localStorage.setItem(stampKey, "1");
    await sbClient.from("site_visits").insert({
      path: location.pathname || "/",
      visitor_key: visitorKey,
    });
  } catch (e) {
    console.warn("site_visits tracking skipped:", e?.message || e);
  }
}

async function trackProjectView(projectId) {
  if (!sbClient || !projectId) return;
  try {
    const sessionKey = `portfolio_viewed_${projectId}`;
    // Count at most once per tab session for the same project
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "1");

    // Prefer RPC (atomic). Fallback: read + update.
    const { error: rpcErr } = await sbClient.rpc("increment_project_views", { p_id: projectId });
    if (rpcErr) {
      const { data } = await sbClient.from("projects").select("views_count").eq("id", projectId).maybeSingle();
      const next = (Number(data?.views_count) || 0) + 1;
      await sbClient.from("projects").update({ views_count: next }).eq("id", projectId);
      const proj = (DYN.projects || []).find((p) => String(p.id) === String(projectId));
      if (proj) proj.views_count = next;
    } else {
      const proj = (DYN.projects || []).find((p) => String(p.id) === String(projectId));
      if (proj) proj.views_count = (Number(proj.views_count) || 0) + 1;
    }
  } catch (e) {
    console.warn("project view tracking skipped:", e?.message || e);
  }
}

function getLikedSet() {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveLikedSet(set) {
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify([...set]));
}

function hasLiked(projectId) {
  return getLikedSet().has(String(projectId));
}

function formatLikeCount(n) {
  const num = Number(n) || 0;
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(num);
}

function heartSvg(filled) {
  // Filled path always — unliked state is styled via CSS (outline look);
  // liked state forces solid red fill so the change is obvious.
  const cls = filled ? "heart-icon heart-filled" : "heart-icon heart-outline";
  return `<svg class="${cls}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>`;
}

function likeLabel(liked) {
  return {
    en: liked ? "Unlike" : "Like",
    fr: liked ? "Retirer" : "J'aime",
    ar: liked ? "إزالة الإعجاب" : "إعجاب",
  }[currentLang()] || (liked ? "Unlike" : "Like");
}

function applyLikeVisual(btn, liked) {
  if (!btn) return;
  btn.classList.toggle("liked", liked);
  btn.setAttribute("aria-pressed", liked ? "true" : "false");
  const label = likeLabel(liked);
  btn.setAttribute("aria-label", label);
  btn.title = label;
  const icon = btn.querySelector(".heart-icon");
  if (icon) {
    // Swap SVG markup so fill/outline is unmistakable
    const wrap = document.createElement("div");
    wrap.innerHTML = heartSvg(liked);
    icon.replaceWith(wrap.firstElementChild);
  }
}

function likeButtonHtml(projectId, count, sizeClass = "") {
  const liked = hasLiked(projectId);
  const label = likeLabel(liked);
  return `
    <button type="button" class="like-btn${liked ? " liked" : ""}${sizeClass ? " " + sizeClass : ""}"
      data-project-id="${escHtml(String(projectId))}"
      aria-pressed="${liked ? "true" : "false"}"
      aria-label="${escHtml(label)}"
      title="${escHtml(label)}">
      ${heartSvg(liked)}
      <span class="like-count">${escHtml(formatLikeCount(count))}</span>
    </button>
  `;
}

async function toggleProjectLike(projectId, btn) {
  if (!sbClient || !projectId) return;
  if (btn.dataset.busy === "1") return;
  btn.dataset.busy = "1";

  const likedSet = getLikedSet();
  const idStr = String(projectId);
  const currentlyLiked = likedSet.has(idStr);
  const visitorKey = getVisitorKey();
  const countEl = btn.querySelector(".like-count");
  const prevCount = Number((DYN.projects || []).find((p) => String(p.id) === idStr)?.likes_count) || 0;

  // Optimistic UI — heart turns solid red when liked
  if (currentlyLiked) {
    likedSet.delete(idStr);
    applyLikeVisual(btn, false);
    if (countEl) countEl.textContent = formatLikeCount(Math.max(0, prevCount - 1));
  } else {
    likedSet.add(idStr);
    applyLikeVisual(btn, true);
    if (countEl) countEl.textContent = formatLikeCount(prevCount + 1);
    btn.classList.remove("like-pop");
    void btn.offsetWidth; // restart animation
    btn.classList.add("like-pop");
    setTimeout(() => btn.classList.remove("like-pop"), 450);
  }
  saveLikedSet(likedSet);

  try {
    if (currentlyLiked) {
      // Remove like
      const { error } = await sbClient
        .from("project_likes")
        .delete()
        .eq("project_id", projectId)
        .eq("visitor_key", visitorKey);
      if (error) throw error;
    } else {
      const { error } = await sbClient
        .from("project_likes")
        .insert({ project_id: projectId, visitor_key: visitorKey });
      if (error) {
        // unique violation = already liked on server — ignore
        if (error.code !== "23505") throw error;
      }
    }

    // Refresh count from server (trigger maintains likes_count)
    const { data } = await sbClient
      .from("projects")
      .select("likes_count")
      .eq("id", projectId)
      .maybeSingle();
    if (data && typeof data.likes_count === "number") {
      const proj = (DYN.projects || []).find((p) => String(p.id) === idStr);
      if (proj) proj.likes_count = data.likes_count;
      if (countEl) countEl.textContent = formatLikeCount(data.likes_count);
      // Sync any other like buttons for same project
      document.querySelectorAll(`.like-btn[data-project-id="${CSS.escape(idStr)}"]`).forEach((other) => {
        if (other === btn) return;
        const c = other.querySelector(".like-count");
        if (c) c.textContent = formatLikeCount(data.likes_count);
        applyLikeVisual(other, likedSet.has(idStr));
      });
    }
  } catch (err) {
    console.warn("Like failed:", err);
    // Revert optimistic update
    if (currentlyLiked) {
      likedSet.add(idStr);
      applyLikeVisual(btn, true);
    } else {
      likedSet.delete(idStr);
      applyLikeVisual(btn, false);
    }
    saveLikedSet(likedSet);
    if (countEl) countEl.textContent = formatLikeCount(prevCount);
  } finally {
    btn.dataset.busy = "0";
  }
}

function wireLikeButtons(root = document) {
  root.querySelectorAll(".like-btn").forEach((btn) => {
    if (btn.dataset.wired === "1") return;
    btn.dataset.wired = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleProjectLike(btn.dataset.projectId, btn);
    });
  });
}

/* ============================================================
   PROJECTS + CATEGORIES (with client-side filtering)
============================================================ */
function paintProjects() {
  const projects = DYN.projects || [];
  const categories = DYN.categories || [];

  const filtersWrap = document.getElementById("filters");
  const gridWrap = document.getElementById("projectsGrid");
  if (!gridWrap) return;

  // Always rebuild filters from backend only (no hardcoded defaults)
  if (filtersWrap) {
    const allLabel = { en: "All", fr: "Tout", ar: "الكل" }[currentLang()] || "All";
    const visibleCats = categories.filter((c) => c.is_visible !== false);
    filtersWrap.innerHTML = [`<button class="filter-btn active" data-filter="all">${escHtml(allLabel)}</button>`]
      .concat(visibleCats.map((c) =>
        `<button class="filter-btn" data-filter="${escHtml(c.slug)}">${escHtml(pickI18n(c.name))}</button>`
      )).join("");
  }

  // Only projects from the backend — never show static/demo cards
  if (!projects.length) {
    gridWrap.innerHTML = "";
    return;
  }

  gridWrap.innerHTML = projects.map((p, idx) => {
    const catSlugs = (p.project_category_links || [])
      .map((l) => (categories.find((c) => c.id === l.category_id) || {}).slug)
      .filter(Boolean).join(" ");
    const techTags = (p.project_technologies || [])
      .map((pt) => pt.technologies && pt.technologies.name)
      .filter(Boolean)
      .map((n) => `<span class="tag">${escHtml(n)}</span>`).join("");
    const img = p.cover_image_url || p.thumbnail_url;
    const likes = p.likes_count ?? 0;
    return `
      <article class="project-card reveal${p.featured ? " featured" : ""}" data-cat="${escHtml(catSlugs)}" data-project-idx="${idx}" role="button" tabindex="0">
        <div class="project-thumb" style="${img ? `background:center/cover no-repeat url('${escHtml(img)}');` : ""}">
          ${p.badge ? `<span class="project-badge">${escHtml(pickI18n(p.badge))}</span>` : ""}
          <div class="project-like-wrap">${likeButtonHtml(p.id, likes)}</div>
        </div>
        <div class="project-body">
          <h3>${escHtml(pickI18n(p.title))}</h3>
          <p>${escHtml(pickI18n(p.short_description))}</p>
          <div class="tag-row">${techTags}</div>
        </div>
      </article>
    `;
  }).join("");

  // Re-observe new cards for scroll reveal (if observer exists)
  if (typeof revealObserver !== "undefined") {
    gridWrap.querySelectorAll(".project-card").forEach((el) => revealObserver.observe(el));
  }

  // Click / keyboard → open project detail modal (ignore clicks on like button)
  gridWrap.querySelectorAll(".project-card").forEach((card) => {
    const open = (e) => {
      if (e.target.closest(".like-btn")) return;
      const idx = Number(card.dataset.projectIdx);
      const project = projects[idx];
      if (project) openProjectModal(project);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest(".like-btn")) return;
        e.preventDefault();
        open(e);
      }
    });
  });

  wireLikeButtons(gridWrap);
  wireProjectFilters();
}

function wireProjectFilters() {
  const filterButtons = document.querySelectorAll("#filters .filter-btn");
  const projectCards = document.querySelectorAll("#projectsGrid .project-card");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const cats = card.dataset.cat || "";
        card.style.display = filter === "all" || cats.split(" ").includes(filter) ? "" : "none";
      });
    });
  });
}

/* ============================================================
   PROJECT DETAIL MODAL (gallery + full info)
============================================================ */
function getProjectGallery(p) {
  const media = [...(p.project_media || [])]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const urls = media
    .filter((m) => m.url)
    .map((m) => ({ url: m.url, type: m.media_type || "image", caption: pickI18n(m.caption), is_cover: !!m.is_cover }));

  // Fallback to cover / thumbnail / logo if no gallery rows
  if (!urls.length) {
    [p.cover_image_url, p.thumbnail_url, p.logo_url].filter(Boolean).forEach((url) => {
      urls.push({ url, type: "image", caption: "", is_cover: false });
    });
  }
  // Put cover first if marked
  urls.sort((a, b) => (b.is_cover ? 1 : 0) - (a.is_cover ? 1 : 0));
  return urls;
}

function closeProjectModal() {
  const overlay = document.getElementById("projectModalOverlay");
  if (!overlay) return;
  overlay.classList.remove("show");
  document.body.style.overflow = "";
  setTimeout(() => overlay.remove(), 280);
}

function openProjectModal(p) {
  closeProjectModal(); // ensure only one
  // Count a project view when the visitor opens its details
  trackProjectView(p?.id);

  const gallery = getProjectGallery(p);
  const techTags = (p.project_technologies || [])
    .map((pt) => pt.technologies && pt.technologies.name)
    .filter(Boolean)
    .map((n) => `<span class="tag">${escHtml(n)}</span>`).join("");

  const features = (() => {
    const f = p.features;
    if (!f) return [];
    if (Array.isArray(f)) return f.map(pickI18n).filter(Boolean);
    if (typeof f === "object") {
      // i18n list: { en: [...], fr: [...], ar: [...] }
      const arr = f[currentLang()] || f.en || f.fr || f.ar || [];
      return Array.isArray(arr) ? arr.filter(Boolean) : [];
    }
    return [];
  })();

  const links = [
    { key: "demo_url", label: { en: "Live Demo", fr: "Démo", ar: "تجربة حية" }, icon: "▶" },
    { key: "website_url", label: { en: "Website", fr: "Site web", ar: "الموقع" }, icon: "🌐" },
    { key: "github_url", label: { en: "GitHub", fr: "GitHub", ar: "GitHub" }, icon: "⌥" },
    { key: "app_store_url", label: { en: "App Store", fr: "App Store", ar: "App Store" }, icon: "" },
    { key: "play_store_url", label: { en: "Play Store", fr: "Play Store", ar: "Play Store" }, icon: "▶" },
    { key: "video_url", label: { en: "Video", fr: "Vidéo", ar: "فيديو" }, icon: "🎬" },
  ].filter((l) => p[l.key]);

  const metaBits = [];
  if (p.client_name) metaBits.push(`<span><strong>${escHtml({ en: "Client", fr: "Client", ar: "العميل" }[currentLang()] || "Client")}:</strong> ${escHtml(p.client_name)}${p.client_country ? ` · ${escHtml(p.client_country)}` : ""}</span>`);
  if (p.year) metaBits.push(`<span><strong>${escHtml({ en: "Year", fr: "Année", ar: "السنة" }[currentLang()] || "Year")}:</strong> ${escHtml(p.year)}</span>`);
  if (p.start_date || p.end_date) {
    const range = [p.start_date, p.end_date].filter(Boolean).map((d) => {
      try { return new Date(d).toLocaleDateString(currentLang() === "ar" ? "ar-DZ" : currentLang() === "fr" ? "fr-FR" : "en-GB", { year: "numeric", month: "short" }); }
      catch { return d; }
    }).join(" – ");
    metaBits.push(`<span><strong>${escHtml({ en: "Period", fr: "Période", ar: "الفترة" }[currentLang()] || "Period")}:</strong> ${escHtml(range)}</span>`);
  }

  const labels = {
    problem: { en: "Problem", fr: "Problème", ar: "المشكلة" },
    solution: { en: "Solution", fr: "Solution", ar: "الحل" },
    features: { en: "Key features", fr: "Fonctionnalités clés", ar: "أبرز الميزات" },
    about: { en: "About the project", fr: "À propos du projet", ar: "عن المشروع" },
    close: { en: "Close", fr: "Fermer", ar: "إغلاق" },
  };
  const L = (k) => labels[k][currentLang()] || labels[k].en;

  const galleryHtml = gallery.length
    ? `
      <div class="pm-gallery">
        <div class="pm-main">
          ${gallery[0].type === "video"
            ? `<video src="${escHtml(gallery[0].url)}" controls playsinline></video>`
            : `<img src="${escHtml(gallery[0].url)}" alt="${escHtml(pickI18n(p.title))}" id="pmMainImg">`}
          ${gallery.length > 1 ? `
            <button type="button" class="pm-nav pm-prev" aria-label="Previous">‹</button>
            <button type="button" class="pm-nav pm-next" aria-label="Next">›</button>
          ` : ""}
        </div>
        ${gallery.length > 1 ? `
          <div class="pm-thumbs">
            ${gallery.map((g, i) => `
              <button type="button" class="pm-thumb${i === 0 ? " active" : ""}" data-idx="${i}">
                ${g.type === "video"
                  ? `<span class="pm-thumb-video">🎬</span>`
                  : `<img src="${escHtml(g.url)}" alt="">`}
              </button>
            `).join("")}
          </div>
        ` : ""}
      </div>`
    : `<div class="pm-gallery pm-gallery-empty"></div>`;

  const overlay = document.createElement("div");
  overlay.id = "projectModalOverlay";
  overlay.className = "pm-overlay";
  overlay.innerHTML = `
    <div class="pm-dialog" role="dialog" aria-modal="true" aria-labelledby="pmTitle">
      <button type="button" class="pm-close" aria-label="${escHtml(L("close"))}">×</button>
      <div class="pm-layout">
        ${galleryHtml}
        <div class="pm-content">
          <div class="pm-title-row">
            <div class="pm-title-text">
              ${p.badge ? `<span class="pm-badge">${escHtml(pickI18n(p.badge))}</span>` : ""}
              <h2 id="pmTitle">${escHtml(pickI18n(p.title))}</h2>
            </div>
            ${likeButtonHtml(p.id, p.likes_count ?? 0, "like-btn-lg")}
          </div>
          ${pickI18n(p.short_description) ? `<p class="pm-lead">${escHtml(pickI18n(p.short_description))}</p>` : ""}
          ${metaBits.length ? `<div class="pm-meta">${metaBits.join("")}</div>` : ""}
          ${techTags ? `<div class="tag-row pm-tags">${techTags}</div>` : ""}
          ${links.length ? `
            <div class="pm-links">
              ${links.map((l) => `
                <a class="pm-link" href="${escHtml(p[l.key])}" target="_blank" rel="noopener noreferrer">
                  <span>${l.icon}</span> ${escHtml(l.label[currentLang()] || l.label.en)}
                </a>
              `).join("")}
            </div>
          ` : ""}
          ${pickI18n(p.full_description) ? `
            <div class="pm-section">
              <h3>${escHtml(L("about"))}</h3>
              <p>${escHtml(pickI18n(p.full_description)).replace(/\n/g, "<br>")}</p>
            </div>
          ` : ""}
          ${pickI18n(p.problem) ? `
            <div class="pm-section">
              <h3>${escHtml(L("problem"))}</h3>
              <p>${escHtml(pickI18n(p.problem)).replace(/\n/g, "<br>")}</p>
            </div>
          ` : ""}
          ${pickI18n(p.solution) ? `
            <div class="pm-section">
              <h3>${escHtml(L("solution"))}</h3>
              <p>${escHtml(pickI18n(p.solution)).replace(/\n/g, "<br>")}</p>
            </div>
          ` : ""}
          ${features.length ? `
            <div class="pm-section">
              <h3>${escHtml(L("features"))}</h3>
              <ul class="pm-features">${features.map((f) => `<li>${escHtml(f)}</li>`).join("")}</ul>
            </div>
          ` : ""}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => overlay.classList.add("show"));
  wireLikeButtons(overlay);

  // Close handlers
  overlay.querySelector(".pm-close").addEventListener("click", closeProjectModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeProjectModal(); });
  const onKey = (e) => {
    if (e.key === "Escape") { closeProjectModal(); document.removeEventListener("keydown", onKey); }
  };
  document.addEventListener("keydown", onKey);

  // Gallery navigation
  if (gallery.length > 1) {
    let current = 0;
    const main = overlay.querySelector(".pm-main");
    const thumbs = overlay.querySelectorAll(".pm-thumb");

    function show(i) {
      current = (i + gallery.length) % gallery.length;
      const g = gallery[current];
      if (g.type === "video") {
        main.querySelector("img, video")?.remove();
        const v = document.createElement("video");
        v.src = g.url;
        v.controls = true;
        v.playsInline = true;
        main.insertBefore(v, main.firstChild);
      } else {
        let img = main.querySelector("img");
        if (!img) {
          main.querySelector("video")?.remove();
          img = document.createElement("img");
          img.id = "pmMainImg";
          img.alt = pickI18n(p.title);
          main.insertBefore(img, main.firstChild);
        }
        img.src = g.url;
      }
      thumbs.forEach((t, ti) => t.classList.toggle("active", ti === current));
    }

    overlay.querySelector(".pm-prev")?.addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
    overlay.querySelector(".pm-next")?.addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });
    thumbs.forEach((t) => t.addEventListener("click", (e) => { e.stopPropagation(); show(Number(t.dataset.idx)); }));
  }
}

/* ============================================================
   CONTACT INFO + SOCIAL LINKS
============================================================ */
function paintContactInfo() {
  const row = DYN.contactInfo;
  if (!row) return;
  if (row.email) {
    document.querySelectorAll("a[href^='mailto:']").forEach((a) => { a.href = `mailto:${row.email}`; });
  }
}
function paintSocialLinks() {
  const rows = DYN.socialLinks;
  if (!rows || !rows.length) return;
  rows.forEach((r) => {
    const platform = (r.platform || "").toLowerCase();
    document.querySelectorAll(`[data-social="${platform}"]`).forEach((el) => {
      const anchor = el.closest("a");
      if (anchor && r.url) anchor.href = r.url;
    });
  });
}

/* ============================================================
   CONTACT FORM (insert into contact_messages)
   Fully multilingual — placeholders & button update on language switch
============================================================ */
const contactFormI18n = {
  name:       { en: "Your name",                    fr: "Votre nom",                          ar: "الاسم الكامل" },
  email:      { en: "Your email",                   fr: "Votre e-mail",                       ar: "البريد الإلكتروني" },
  subject:    { en: "Subject",                      fr: "Sujet",                              ar: "الموضوع" },
  message:    { en: "Tell me about your project…",  fr: "Parlez-moi de votre projet…",        ar: "أخبرني عن مشروعك…" },
  send:       { en: "Send Message",                 fr: "Envoyer le message",                 ar: "إرسال الرسالة" },
  sending:    { en: "Sending…",                     fr: "Envoi en cours…",                    ar: "جارٍ الإرسال…" },
  success:    { en: "Thanks! I'll get back to you soon.", fr: "Merci ! Je vous répondrai bientôt.", ar: "شكرًا لك! سأرد عليك قريبًا." },
  error:      { en: "Couldn't send — please try again later.", fr: "Échec de l'envoi — réessayez plus tard.", ar: "تعذّر الإرسال — حاول لاحقًا." },
};

function updateContactFormLanguage() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const nameInput    = form.querySelector('input[name="name"]');
  const emailInput   = form.querySelector('input[name="email"]');
  const subjectInput = form.querySelector('input[name="subject"]');
  const messageArea  = form.querySelector('textarea[name="message"]');
  const sendBtnSpan  = form.querySelector('button[type="submit"] span');
  if (nameInput)    nameInput.placeholder    = pickI18n(contactFormI18n.name);
  if (emailInput)   emailInput.placeholder   = pickI18n(contactFormI18n.email);
  if (subjectInput) subjectInput.placeholder = pickI18n(contactFormI18n.subject);
  if (messageArea)  messageArea.placeholder  = pickI18n(contactFormI18n.message);
  if (sendBtnSpan)  sendBtnSpan.textContent  = pickI18n(contactFormI18n.send);
}

function buildContactForm() {
  const footer = document.querySelector("footer.footer#contact");
  if (!footer || document.getElementById("contactForm")) return;

  const wrap = document.createElement("div");
  wrap.className = "container";
  wrap.style.cssText = "padding-top:10px; padding-bottom:50px;";
  wrap.innerHTML = `
    <form id="contactForm" style="max-width:640px; margin:0 auto; display:grid; gap:14px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
        <input required name="name" type="text" placeholder="${pickI18n(contactFormI18n.name)}"
          style="background:#ffffff08; border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:10px; font-family:var(--font-body);">
        <input required name="email" type="email" placeholder="${pickI18n(contactFormI18n.email)}"
          style="background:#ffffff08; border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:10px; font-family:var(--font-body);">
      </div>
      <input name="subject" type="text" placeholder="${pickI18n(contactFormI18n.subject)}"
        style="background:#ffffff08; border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:10px; font-family:var(--font-body);">
      <textarea required name="message" rows="5" placeholder="${pickI18n(contactFormI18n.message)}"
        style="background:#ffffff08; border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:10px; font-family:var(--font-body); resize:vertical;"></textarea>
      <button type="submit" class="btn btn-primary" style="justify-self:start;">
        <span>${pickI18n(contactFormI18n.send)}</span>
      </button>
      <p id="contactFormStatus" style="font-size:.85rem; color:var(--text-dim); min-height:1.2em;"></p>
    </form>
  `;
  footer.insertBefore(wrap, footer.firstChild);

  document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!sbClient) return;
    const form = e.target;
    const statusEl = document.getElementById("contactFormStatus");
    const btn = form.querySelector("button[type='submit']");
    const data = Object.fromEntries(new FormData(form).entries());
    btn.disabled = true;
    statusEl.textContent = pickI18n(contactFormI18n.sending);
    try {
      const { error } = await sbClient.from("contact_messages").insert({
        name: data.name, email: data.email, subject: data.subject || null,
        message: data.message, language: currentLang(), status: "new",
      });
      if (error) throw error;
      statusEl.textContent = pickI18n(contactFormI18n.success);
      form.reset();
    } catch (err) {
      statusEl.textContent = pickI18n(contactFormI18n.error);
      console.error(err);
    } finally {
      btn.disabled = false;
    }
  });
}

/* ============================================================
   SEO / Open Graph (Admin → SEO, page_key = home)
============================================================ */
function setMeta(attr, key, value) {
  if (value === null || value === undefined) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function applySeoMeta() {
  const seo = DYN.seo;
  const site = DYN.siteSettings;
  const lang = currentLang();

  const title =
    (seo && (pickI18n(seo.og_title) || pickI18n(seo.title))) ||
    document.title ||
    "Mohamed Abdo | Flutter & Full-Stack Developer";
  const description =
    (seo && (pickI18n(seo.og_description) || pickI18n(seo.description))) ||
    document.querySelector('meta[name="description"]')?.content ||
    "";
  let image = (seo && seo.og_image_url) || "";
  let siteUrl = (site && site.site_url) || "https://mohamedabdoprotportfolio.vercel.app";
  if (image && !/^https?:\/\//i.test(image)) {
    image = siteUrl.replace(/\/$/, "") + (image.startsWith("/") ? image : "/" + image);
  }
  if (!image) {
    image = "https://kmnpmcsrzcuzlpcdfrvc.supabase.co/storage/v1/object/public/portfolio/seo/1788633517525-1h5zas6.png";
  }
  const pageUrl = (seo && seo.canonical_url) || (siteUrl.replace(/\/$/, "") + "/");

  if (title) document.title = title;
  setMeta("name", "description", description);
  if (seo) {
    const robots = [
      seo.robots_index === false ? "noindex" : "index",
      seo.robots_follow === false ? "nofollow" : "follow",
    ].join(", ");
    setMeta("name", "robots", robots);
  }

  setMeta("property", "og:type", "website");
  setMeta("property", "og:site_name", (site && site.site_name) || "Mohamed Abdo");
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:image", image);
  setMeta("property", "og:url", pageUrl);
  setMeta("property", "og:locale", lang === "ar" ? "ar_AR" : lang === "fr" ? "fr_FR" : "en_US");

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", image);
}

/* ============================================================
   RE-PAINT ON LANGUAGE CHANGE
============================================================ */
function repaintAllDynamic() {
  paintHero();
  paintAbout();
  paintStatistics();
  paintServices();
  paintTechnologies();
  paintProjects();
  updateContactFormLanguage();
  applySeoMeta();
}
document.querySelectorAll(".lang-menu li").forEach((li) => {
  li.addEventListener("click", () => setTimeout(repaintAllDynamic, 0));
});

/* ============================================================
   INITIAL LOAD
============================================================ */
async function initBackend() {
  buildContactForm();
  if (!sbClient) { console.warn("Supabase client not available — check the CDN script tag."); return; }

  const safe = async (label, promise) => {
    try { return (await promise).data; }
    catch (e) { console.warn(`Supabase: couldn't load ${label}`, e); return null; }
  };

  // Parallel fetch for speed — all tables load at once
  const [
    hero, about, contactInfo, statistics, services,
    technologies, categories, socialLinks, projects,
    seo, siteSettings
  ] = await Promise.all([
    safe("hero_section", sbClient.from("hero_section").select("*").limit(1).maybeSingle()),
    safe("about_section", sbClient.from("about_section").select("*").limit(1).maybeSingle()),
    safe("contact_info", sbClient.from("contact_info").select("*").limit(1).maybeSingle()),
    safe("statistics", sbClient.from("statistics").select("*").order("sort_order")),
    safe("services", sbClient.from("services").select("*").order("sort_order")),
    safe("technologies", sbClient.from("technologies").select("*").order("sort_order")),
    safe("project_categories", sbClient.from("project_categories").select("*").order("sort_order")),
    safe("social_links", sbClient.from("social_links").select("*").order("sort_order")),
    safe("projects", sbClient.from("projects")
      .select("*, project_category_links(category_id), project_technologies(technologies(name)), project_media(*)")
      .eq("status", "published").eq("is_visible", true).order("sort_order")),
    safe("seo_settings", sbClient.from("seo_settings").select("*").eq("page_key", "home").limit(1).maybeSingle()),
    safe("site_settings", sbClient.from("site_settings").select("*").limit(1).maybeSingle()),
  ]);

  DYN.hero = hero;
  DYN.about = about;
  DYN.contactInfo = contactInfo;
  DYN.statistics = statistics;
  DYN.services = services;
  DYN.technologies = technologies;
  DYN.categories = categories;
  DYN.socialLinks = socialLinks;
  DYN.projects = projects;
  DYN.seo = seo;
  DYN.siteSettings = siteSettings;

  repaintAllDynamic();
  paintContactInfo();
  paintSocialLinks();
  applySeoMeta();

  // Record a site visit (once per visitor per day)
  trackSiteVisit();
}

initBackend();
