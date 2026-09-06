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
   PROJECT SHARE — link based on project id (?project=<id>)
============================================================ */
function getProjectShareUrl(projectId) {
  // Share via /api/project-share so WhatsApp/Facebook/etc. get real OG
  // title + description + project image. Humans are redirected to /?project=id.
  const site =
    (DYN.siteSettings && DYN.siteSettings.site_url) ||
    window.location.origin ||
    "https://mohamedabdoprotportfolio.vercel.app";
  const base = String(site).replace(/\/$/, "");
  return base + "/api/project-share?id=" + encodeURIComponent(String(projectId));
}

function shareLabel() {
  return { en: "Share", fr: "Partager", ar: "مشاركة" }[currentLang()] || "Share";
}

function shareCopiedLabel() {
  return { en: "Link copied!", fr: "Lien copié !", ar: "تم نسخ الرابط!" }[currentLang()] || "Link copied!";
}

function shareButtonHtml(projectId, sizeClass = "") {
  const label = shareLabel();
  return `
    <button type="button" class="share-btn${sizeClass ? " " + sizeClass : ""}"
      data-project-id="${escHtml(String(projectId))}"
      aria-label="${escHtml(label)}"
      title="${escHtml(label)}">
      <svg class="share-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    </button>
  `;
}

function showShareToast(message) {
  let toast = document.getElementById("shareToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "shareToast";
    toast.className = "share-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showShareToast._t);
  showShareToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

function closeShareSheet() {
  const sheet = document.getElementById("shareSheetOverlay");
  if (!sheet) return;
  sheet.classList.remove("show");
  setTimeout(() => sheet.remove(), 280);
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) { /* fall through */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return !!ok;
  } catch (_) {
    return false;
  }
}

function shareSheetLabels() {
  const lang = currentLang();
  const map = {
    en: {
      title: "Share project",
      copy: "Copy link",
      copied: "Link copied!",
      whatsapp: "WhatsApp",
      messenger: "Messenger",
      telegram: "Telegram",
      facebook: "Facebook",
      x: "X / Twitter",
      linkedin: "LinkedIn",
      email: "Email",
      sms: "SMS",
      instagram: "Instagram",
      snapchat: "Snapchat",
      more: "More…",
      cancel: "Cancel",
      instagramHint: "Link copied — paste it in your Instagram story or bio",
      snapchatHint: "Link copied — paste it in Snapchat",
    },
    fr: {
      title: "Partager le projet",
      copy: "Copier le lien",
      copied: "Lien copié !",
      whatsapp: "WhatsApp",
      messenger: "Messenger",
      telegram: "Telegram",
      facebook: "Facebook",
      x: "X / Twitter",
      linkedin: "LinkedIn",
      email: "E-mail",
      sms: "SMS",
      instagram: "Instagram",
      snapchat: "Snapchat",
      more: "Plus…",
      cancel: "Annuler",
      instagramHint: "Lien copié — collez-le dans votre story ou bio Instagram",
      snapchatHint: "Lien copié — collez-le dans Snapchat",
    },
    ar: {
      title: "مشاركة المشروع",
      copy: "نسخ الرابط",
      copied: "تم نسخ الرابط!",
      whatsapp: "واتساب",
      messenger: "ماسنجر",
      telegram: "تيليجرام",
      facebook: "فيسبوك",
      x: "إكس / تويتر",
      linkedin: "لينكدإن",
      email: "البريد",
      sms: "رسالة SMS",
      instagram: "إنستغرام",
      snapchat: "سناب شات",
      more: "المزيد…",
      cancel: "إلغاء",
      instagramHint: "تم نسخ الرابط — الصقه في ستوري أو بايو إنستغرام",
      snapchatHint: "تم نسخ الرابط — الصقه في سناب شات",
    },
  };
  return map[lang] || map.en;
}

function openExternalShare(href) {
  try {
    window.open(href, "_blank", "noopener,noreferrer");
  } catch (_) {
    window.location.href = href;
  }
}

async function shareProject(projectId, btn) {
  if (!projectId) return;
  const url = getProjectShareUrl(projectId);
  const project = (DYN.projects || []).find((p) => String(p.id) === String(projectId));
  const title = project ? (pickI18n(project.title) || document.title) : document.title;
  const text = title;
  const L = shareSheetLabels();
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedPair = encodeURIComponent(text + "\n" + url);

  closeShareSheet();

  const channels = [
    {
      id: "copy",
      label: L.copy,
      className: "ss-copy",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
      action: async () => {
        const ok = await copyTextToClipboard(url);
        showShareToast(ok ? L.copied : url);
        if (btn) {
          btn.classList.add("share-copied");
          setTimeout(() => btn.classList.remove("share-copied"), 1200);
        }
        closeShareSheet();
      },
    },
    {
      id: "whatsapp",
      label: L.whatsapp,
      className: "ss-wa",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/><path d="M12 2a10 10 0 0 0-8.7 14.95L2.3 21.7l4.87-1.28A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.89.76.77-2.82-.2-.31A8.2 8.2 0 1 1 12 20.2z"/></svg>`,
      action: () => {
        openExternalShare(`https://wa.me/?text=${encodedPair}`);
        closeShareSheet();
      },
    },
    {
      id: "messenger",
      label: L.messenger,
      className: "ss-ms",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.45 5.48 3.72 7.18V22l3.4-1.87c.9.25 1.86.38 2.88.38 5.52 0 10-4.14 10-9.26S17.52 2 12 2zm1.02 12.48-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82z"/></svg>`,
      action: () => {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isMobile) {
          // Prefer native Messenger scheme; falls back to web Facebook share
          openExternalShare(`fb-messenger://share/?link=${encodedUrl}`);
          setTimeout(() => openExternalShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`), 600);
        } else {
          openExternalShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
        }
        closeShareSheet();
      },
    },
    {
      id: "telegram",
      label: L.telegram,
      className: "ss-tg",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M21.95 4.3c-.22-.2-.54-.25-.82-.13L2.7 11.6c-.33.14-.55.45-.55.8 0 .34.2.65.52.8l4.56 2.15 1.76 5.5c.1.31.37.53.7.57h.06c.3 0 .58-.17.72-.44l2.55-4.8 4.9 3.6c.14.1.3.15.47.15.14 0 .28-.03.4-.1.27-.15.44-.42.45-.73l1.3-13.2c.03-.34-.13-.66-.42-.9zM9.6 14.1l7.9-6.9-6.4 8.05-.2.24-.9 3.38-.95-2.97 1.55-1.8z"/></svg>`,
      action: () => {
        openExternalShare(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`);
        closeShareSheet();
      },
    },
    {
      id: "facebook",
      label: L.facebook,
      className: "ss-fb",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H16.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3V14h2.7v8h3.5z"/></svg>`,
      action: () => {
        openExternalShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
        closeShareSheet();
      },
    },
    {
      id: "x",
      label: L.x,
      className: "ss-x",
      icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.9 2H21.7l-6.8 7.8L23 22h-6.4l-5-6.5L6 22H3.2l7.3-8.3L1 2h6.6l4.5 5.9L18.9 2zm-1.1 18h1.8L7.3 3.9H5.4L17.8 20z"/></svg>`,
      action: () => {
        openExternalShare(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`);
        closeShareSheet();
      },
    },
    {
      id: "linkedin",
      label: L.linkedin,
      className: "ss-li",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6.5 9H3.7v11.5h2.8V9zM5.1 3.4C4.1 3.4 3.3 4.2 3.3 5.2s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zM20.7 13.4c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5.9-2.9 1.6h-.1V9H11.2c0 .8 0 11.5 0 11.5h2.8v-6.4c0-.3 0-.7.1-1 .3-.7.9-1.4 2-1.4 1.4 0 2 1.1 2 2.7v6.1h2.8v-6.5z"/></svg>`,
      action: () => {
        openExternalShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`);
        closeShareSheet();
      },
    },
    {
      id: "email",
      label: L.email,
      className: "ss-mail",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><polyline points="22 6 12 13 2 6"/></svg>`,
      action: () => {
        openExternalShare(`mailto:?subject=${encodedText}&body=${encodedPair}`);
        closeShareSheet();
      },
    },
    {
      id: "sms",
      label: L.sms,
      className: "ss-sms",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      action: () => {
        openExternalShare(`sms:?&body=${encodedPair}`);
        closeShareSheet();
      },
    },
    {
      id: "instagram",
      label: L.instagram,
      className: "ss-ig",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.5 6.8a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z"/></svg>`,
      action: async () => {
        await copyTextToClipboard(url);
        showShareToast(L.instagramHint);
        closeShareSheet();
      },
    },
    {
      id: "snapchat",
      label: L.snapchat,
      className: "ss-snap",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.05 2c-2.7 0-4.5 1.8-4.5 4.5v1.1c-1.4.3-2.3 1.1-2.6 2.3-.2.7-.1 1.4.2 2 .3.6.2 1-.2 1.5-.5.6-1.2 1-1.3 1.6-.1.6.4 1.1 1.1 1.3.4.1.7.3.8.5.2.4 0 .9-.5 1.4-.7.7-1.1 1.5-.9 2.3.2.8 1 1.3 2.2 1.5 1 .2 1.7.6 2.2 1.2.5.6 1.2.9 2 .9s1.5-.3 2-.9c.5-.6 1.2-1 2.2-1.2 1.2-.2 2-.7 2.2-1.5.2-.8-.2-1.6-.9-2.3-.5-.5-.7-1-.5-1.4.1-.2.4-.4.8-.5.7-.2 1.2-.7 1.1-1.3-.1-.6-.8-1-1.3-1.6-.4-.5-.5-.9-.2-1.5.3-.6.4-1.3.2-2-.3-1.2-1.2-2-2.6-2.3V6.5C16.55 3.8 14.75 2 12.05 2z"/></svg>`,
      action: async () => {
        await copyTextToClipboard(url);
        showShareToast(L.snapchatHint);
        closeShareSheet();
      },
    },
  ];

  if (typeof navigator.share === "function") {
    channels.push({
      id: "native",
      label: L.more,
      className: "ss-more",
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
      action: async () => {
        closeShareSheet();
        try {
          await navigator.share({ title, text, url });
        } catch (e) {
          if (e && e.name === "AbortError") return;
          console.warn("Native share failed:", e);
        }
      },
    });
  }

  const overlay = document.createElement("div");
  overlay.id = "shareSheetOverlay";
  overlay.className = "ss-overlay";
  overlay.innerHTML = `
    <div class="ss-sheet" role="dialog" aria-modal="true" aria-labelledby="ssTitle">
      <div class="ss-handle" aria-hidden="true"></div>
      <div class="ss-header">
        <h3 id="ssTitle">${escHtml(L.title)}</h3>
        <button type="button" class="ss-close" aria-label="${escHtml(L.cancel)}">×</button>
      </div>
      <p class="ss-project-title">${escHtml(title)}</p>
      <div class="ss-link-row">
        <input type="text" class="ss-link-input" readonly value="${escHtml(url)}" aria-label="${escHtml(L.copy)}">
        <button type="button" class="ss-link-copy btn btn-primary">${escHtml(L.copy)}</button>
      </div>
      <div class="ss-grid">
        ${channels.map((c) => `
          <button type="button" class="ss-item ${c.className}" data-share-id="${c.id}">
            <span class="ss-icon">${c.icon}</span>
            <span class="ss-label">${escHtml(c.label)}</span>
          </button>
        `).join("")}
      </div>
      <button type="button" class="ss-cancel">${escHtml(L.cancel)}</button>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("show"));

  const byId = Object.fromEntries(channels.map((c) => [c.id, c]));
  overlay.querySelectorAll("[data-share-id]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const ch = byId[el.dataset.shareId];
      if (ch) ch.action();
    });
  });
  overlay.querySelector(".ss-link-copy")?.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyTextToClipboard(url);
    showShareToast(ok ? L.copied : url);
    closeShareSheet();
  });
  overlay.querySelector(".ss-link-input")?.addEventListener("click", (e) => {
    e.target.select?.();
  });
  overlay.querySelector(".ss-close")?.addEventListener("click", closeShareSheet);
  overlay.querySelector(".ss-cancel")?.addEventListener("click", closeShareSheet);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeShareSheet();
  });
  const onKey = (e) => {
    if (e.key === "Escape") {
      closeShareSheet();
      document.removeEventListener("keydown", onKey);
    }
  };
  document.addEventListener("keydown", onKey);
}

function wireShareButtons(root = document) {
  root.querySelectorAll(".share-btn").forEach((btn) => {
    if (btn.dataset.wired === "1") return;
    btn.dataset.wired = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      shareProject(btn.dataset.projectId, btn);
    });
  });
}

/** Open project modal if URL has ?project=<id> or #project=<id> */
function openProjectFromUrl() {
  const params = new URLSearchParams(window.location.search);
  let id = params.get("project");
  if (!id && window.location.hash) {
    const m = window.location.hash.match(/[#&?]project=([^&]+)/i) || window.location.hash.match(/^#project[=/](.+)$/i);
    if (m) id = decodeURIComponent(m[1]);
  }
  if (!id) return;
  const project = (DYN.projects || []).find((p) => String(p.id) === String(id));
  if (project) {
    // Scroll to projects section then open
    const sec = document.getElementById("projects");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    openProjectModal(project);
  }
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
          <div class="project-actions-wrap">
            ${shareButtonHtml(p.id)}
            ${likeButtonHtml(p.id, likes)}
          </div>
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

  // Click / keyboard → open project detail modal (ignore clicks on like/share buttons)
  gridWrap.querySelectorAll(".project-card").forEach((card) => {
    const open = (e) => {
      if (e.target.closest(".like-btn, .share-btn")) return;
      const idx = Number(card.dataset.projectIdx);
      const project = projects[idx];
      if (project) openProjectModal(project);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest(".like-btn, .share-btn")) return;
        e.preventDefault();
        open(e);
      }
    });
  });

  wireLikeButtons(gridWrap);
  wireShareButtons(gridWrap);
  wireProjectFilters();
  openProjectFromUrl();
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
            <div class="pm-title-actions">
              ${shareButtonHtml(p.id, "share-btn-lg")}
              ${likeButtonHtml(p.id, p.likes_count ?? 0, "like-btn-lg")}
            </div>
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
  wireShareButtons(overlay);

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
  // Sync WhatsApp links (nav / footer) from contact_info.whatsapp
  const phone = resolveWhatsAppNumber();
  if (phone) {
    document.querySelectorAll("a.nav-whatsapp, a[href*='wa.me'], [data-social='whatsapp']").forEach((el) => {
      const a = el.tagName === "A" ? el : el.closest("a");
      if (a) a.href = `https://wa.me/${phone}`;
    });
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
  email:      { en: "Your email (optional)",        fr: "Votre e-mail (optionnel)",           ar: "البريد الإلكتروني (اختياري)" },
  whatsapp:   { en: "WhatsApp (optional)",          fr: "WhatsApp (optionnel)",               ar: "واتساب (اختياري)" },
  contactHint:{ en: "Leave at least email or WhatsApp so I can reply.", fr: "Laissez au moins un e-mail ou WhatsApp pour que je puisse répondre.", ar: "اترك على الأقل إيميل أو واتساب حتى أتمكن من الرد." },
  subject:    { en: "Subject",                      fr: "Sujet",                              ar: "الموضوع" },
  message:    { en: "Tell me about your project…",  fr: "Parlez-moi de votre projet…",        ar: "أخبرني عن مشروعك…" },
  send:       { en: "Send Message",                 fr: "Envoyer le message",                 ar: "إرسال الرسالة" },
  sending:    { en: "Sending…",                     fr: "Envoi en cours…",                    ar: "جارٍ الإرسال…" },
  success:    {
    en: "Thank you! Your message was sent successfully. I'll get back to you soon.",
    fr: "Merci ! Votre message a été envoyé avec succès. Je vous répondrai bientôt.",
    ar: "شكراً لك! تم إرسال رسالتك بنجاح. سأرد عليك قريباً.",
  },
  needContact:{ en: "Please enter email or WhatsApp (at least one).", fr: "Veuillez saisir un e-mail ou WhatsApp (au moins un).", ar: "يرجى إدخال إيميل أو واتساب (واحد على الأقل)." },
  error:      { en: "Couldn't send — please try again later.", fr: "Échec de l'envoi — réessayez plus tard.", ar: "تعذّر الإرسال — حاول لاحقًا." },
};

function updateContactFormLanguage() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const nameInput      = form.querySelector('input[name="name"]');
  const emailInput     = form.querySelector('input[name="email"]');
  const whatsappInput  = form.querySelector('input[name="whatsapp"]');
  const subjectInput   = form.querySelector('input[name="subject"]');
  const messageArea    = form.querySelector('textarea[name="message"]');
  const sendBtnSpan    = form.querySelector('button[type="submit"] span');
  const hintEl         = form.querySelector(".contact-hint");
  if (nameInput)     nameInput.placeholder     = pickI18n(contactFormI18n.name);
  if (emailInput)    emailInput.placeholder    = pickI18n(contactFormI18n.email);
  if (whatsappInput) whatsappInput.placeholder = pickI18n(contactFormI18n.whatsapp);
  if (subjectInput)  subjectInput.placeholder  = pickI18n(contactFormI18n.subject);
  if (messageArea)   messageArea.placeholder   = pickI18n(contactFormI18n.message);
  if (sendBtnSpan)   sendBtnSpan.textContent   = pickI18n(contactFormI18n.send);
  if (hintEl)        hintEl.textContent        = pickI18n(contactFormI18n.contactHint);
}

function buildContactForm() {
  const footer = document.querySelector("footer.footer#contact");
  if (!footer || document.getElementById("contactForm")) return;

  const wrap = document.createElement("div");
  wrap.className = "container";
  wrap.style.cssText = "padding-top:10px; padding-bottom:50px;";
  wrap.innerHTML = `
    <form id="contactForm" style="max-width:640px; margin:0 auto; display:grid; gap:14px;">
      <input required name="name" type="text" placeholder="${pickI18n(contactFormI18n.name)}"
        style="background:#ffffff08; border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:10px; font-family:var(--font-body);">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
        <input name="email" type="email" placeholder="${pickI18n(contactFormI18n.email)}"
          style="background:#ffffff08; border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:10px; font-family:var(--font-body);">
        <input name="whatsapp" type="tel" inputmode="tel" placeholder="${pickI18n(contactFormI18n.whatsapp)}"
          style="background:#ffffff08; border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:10px; font-family:var(--font-body);">
      </div>
      <p class="contact-hint" style="font-size:.8rem; color:var(--text-dim); margin:-6px 0 0;">${pickI18n(contactFormI18n.contactHint)}</p>
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
    const email = (data.email || "").trim();
    const whatsapp = (data.whatsapp || "").trim();

    if (!email && !whatsapp) {
      statusEl.style.color = "#e74c3c";
      statusEl.textContent = pickI18n(contactFormI18n.needContact);
      return;
    }

    btn.disabled = true;
    statusEl.style.color = "";
    statusEl.textContent = pickI18n(contactFormI18n.sending);
    try {
      // email column stores email if present, otherwise visitor WhatsApp so admin always has a contact
      const contactChannel = email || whatsapp;
      const messageBody = [
        data.message,
        whatsapp && email ? `\n\n—\nWhatsApp: ${whatsapp}` : (whatsapp && !email ? "" : ""),
        email && whatsapp ? `\nEmail: ${email}` : "",
      ].join("").trim();

      const { error } = await sbClient.from("contact_messages").insert({
        name: data.name,
        email: contactChannel,
        subject: data.subject || null,
        message: whatsapp && email
          ? `${data.message}\n\n—\nEmail: ${email}\nWhatsApp: ${whatsapp}`
          : data.message,
        language: currentLang(),
        status: "new",
      });
      if (error) throw error;

      await notifyOwnerWhatsApp({
        name: data.name,
        email,
        whatsapp,
        subject: data.subject,
        message: data.message,
      });

      statusEl.textContent = "";
      form.reset();
      showContactSuccessModal();
    } catch (err) {
      statusEl.style.color = "#e74c3c";
      statusEl.textContent = pickI18n(contactFormI18n.error);
      console.error(err);
    } finally {
      btn.disabled = false;
    }
  });
}

/** Green success popup with checkmark */
function showContactSuccessModal() {
  document.getElementById("contactSuccessModal")?.remove();
  const msg = pickI18n(contactFormI18n.success);
  const overlay = document.createElement("div");
  overlay.id = "contactSuccessModal";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.style.cssText = [
    "position:fixed", "inset:0", "z-index:99999",
    "display:flex", "align-items:center", "justify-content:center",
    "background:rgba(0,0,0,.55)", "backdrop-filter:blur(6px)",
    "padding:20px", "opacity:0", "transition:opacity .25s ease",
  ].join(";");
  overlay.innerHTML = `
    <div style="
      background:var(--card, #14141f); border:1px solid #ffffff18; border-radius:20px;
      padding:32px 28px 26px; max-width:380px; width:100%; text-align:center;
      box-shadow:0 24px 60px -20px rgba(0,0,0,.6); transform:scale(.92);
      transition:transform .28s cubic-bezier(.2,.9,.3,1);
    " id="contactSuccessCard">
      <div style="
        width:72px; height:72px; margin:0 auto 18px; border-radius:50%;
        background:linear-gradient(145deg,#1dbf7318,#1dbf7308);
        border:2px solid #1dbf7366; display:grid; place-items:center;
      ">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1dbf73" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>
      <p style="margin:0 0 8px; font-size:1.15rem; font-weight:600; color:var(--text, #fff);">${msg.split("!")[0] ? msg.split("!")[0] + "!" : "✓"}</p>
      <p style="margin:0 0 22px; font-size:.92rem; line-height:1.55; color:var(--text-dim, #aaa);">${msg.includes("!") ? msg.slice(msg.indexOf("!") + 1).trim() : msg}</p>
      <button type="button" class="btn btn-primary" id="contactSuccessOk" style="min-width:120px;">OK</button>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    const card = document.getElementById("contactSuccessCard");
    if (card) card.style.transform = "scale(1)";
  });
  const close = () => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 250);
  };
  overlay.querySelector("#contactSuccessOk")?.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });
}

/** Resolve owner WhatsApp number from backend (contact_info.whatsapp). */
function resolveWhatsAppNumber() {
  const info = DYN.contactInfo || {};
  let raw = info.whatsapp || info.phone || "";
  if (!raw && Array.isArray(DYN.socialLinks)) {
    const wa = DYN.socialLinks.find((r) => String(r.platform || "").toLowerCase() === "whatsapp");
    if (wa && wa.url) raw = wa.url;
  }
  const fromUrl = String(raw).match(/(?:wa\.me\/|whatsapp\.com\/send\?phone=)(\d+)/i);
  if (fromUrl) return fromUrl[1];
  const digits = String(raw).replace(/[^\d]/g, "");
  return digits || "";
}

/**
 * Send a standalone WhatsApp notification to the site owner via CallMeBot.
 * Does NOT open the visitor's WhatsApp — you receive one message with full details.
 * Requires WHATSAPP_CALLMEBOT_APIKEY in config.js (free setup, ~1 minute).
 */
async function notifyOwnerWhatsApp(data) {
  const phone = resolveWhatsAppNumber();
  const apikey = (typeof WHATSAPP_CALLMEBOT_APIKEY !== "undefined" && WHATSAPP_CALLMEBOT_APIKEY)
    ? String(WHATSAPP_CALLMEBOT_APIKEY).trim()
    : "";

  const name = (data.name || "").trim();
  const visitorWa = (data.whatsapp || "").trim();
  const visitorEmail = (data.email || "").trim();
  const subject = (data.subject || "").trim();
  const message = (data.message || "").trim();

  const text = [
    "📩 رسالة جديدة من الموقع",
    name ? `الاسم: ${name}` : "",
    visitorEmail ? `الإيميل: ${visitorEmail}` : "",
    visitorWa ? `واتساب الزائر: ${visitorWa}` : "",
    subject ? `الموضوع: ${subject}` : "",
    message ? `الرسالة:\n${message}` : "",
  ].filter(Boolean).join("\n");

  if (!phone) {
    console.warn("[Contact] No owner WhatsApp in contact_info");
    return;
  }
  if (!apikey) {
    console.warn("[Contact] WHATSAPP_CALLMEBOT_APIKEY is empty — message saved in dashboard only. Set the key in config.js for WhatsApp notify.");
    return;
  }

  const url = "https://api.callmebot.com/whatsapp.php"
    + "?phone=" + encodeURIComponent(phone)
    + "&text=" + encodeURIComponent(text)
    + "&apikey=" + encodeURIComponent(apikey);

  try {
    // no-cors: CallMeBot may not send CORS headers; request still reaches their server
    await fetch(url, { method: "GET", mode: "no-cors" });
  } catch (err) {
    // Fallback: image ping (also works without CORS)
    try {
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = url + "&_=" + Date.now();
        setTimeout(resolve, 2500);
      });
    } catch (_) {
      console.warn("[Contact] WhatsApp notify failed", err);
    }
  }
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

  // Notify AI chat (and others) that dynamic data is ready
  document.dispatchEvent(new CustomEvent("portfolio-data-loaded", {
    detail: { projects: projects || [], services: services || [] }
  }));

  // Record a site visit (once per visitor per day)
  trackSiteVisit();
}

initBackend();
