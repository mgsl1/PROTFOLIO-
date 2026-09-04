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
        <span class="service-icon">${r.icon_url ? `<img src="${escHtml(r.icon_url)}" alt="" style="width:18px;height:18px;">` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"></rect></svg>`}</span>
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
    return `
      <article class="project-card reveal${p.featured ? " featured" : ""}" data-cat="${escHtml(catSlugs)}" data-project-idx="${idx}" role="button" tabindex="0">
        <div class="project-thumb" style="${img ? `background:center/cover no-repeat url('${escHtml(img)}');` : ""}">
          ${p.badge ? `<span class="project-badge">${escHtml(pickI18n(p.badge))}</span>` : ""}
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

  // Click / keyboard → open project detail modal
  gridWrap.querySelectorAll(".project-card").forEach((card) => {
    const open = () => {
      const idx = Number(card.dataset.projectIdx);
      const project = projects[idx];
      if (project) openProjectModal(project);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

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
          ${p.badge ? `<span class="pm-badge">${escHtml(pickI18n(p.badge))}</span>` : ""}
          <h2 id="pmTitle">${escHtml(pickI18n(p.title))}</h2>
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
    const el = document.querySelector(`[data-social="${platform}"]`);
    const anchor = el ? el.closest("a") : null;
    if (anchor && r.url) anchor.href = r.url;
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
    technologies, categories, socialLinks, projects
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

  repaintAllDynamic();
  paintContactInfo();
  paintSocialLinks();
}

initBackend();
