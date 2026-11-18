/**
 * Vercel Serverless Function — Project share preview (Open Graph)
 *
 * Shared URL:  https://yoursite.com/api/project-share?id=<project-uuid>
 *
 * Social bots (WhatsApp, Facebook, Telegram, …) read og:* meta tags from this HTML.
 * Real visitors are redirected to /?project=<id> so the SPA opens the project modal.
 *
 * Deploy: put this file at /api/project-share.js on your Vercel project (static site is fine).
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://kmnpmcsrzcuzlpcdfrvc.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_DRWizJD7cm1aZSCWIBtD-g_lW6hR4qj";

const SITE_URL = (process.env.SITE_URL || "https://mohamedabdoprotportfolio.vercel.app").replace(/\/$/, "");
const SITE_NAME = process.env.SITE_NAME || "Mohamed Abdo";

function pickI18n(val, lang = "en") {
  if (val == null) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    return val[lang] || val.en || val.fr || val.ar || Object.values(val).find((v) => typeof v === "string") || "";
  }
  return String(val);
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return SITE_URL + (url.startsWith("/") ? url : "/" + url);
}

async function fetchProject(id) {
  const select =
    "id,title,short_description,full_description,cover_image_url,thumbnail_url,badge,status,is_visible";
  const qs =
    `id=eq.${encodeURIComponent(id)}` +
    `&status=eq.published&is_visible=eq.true` +
    `&select=${encodeURIComponent(select)}` +
    `&limit=1`;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?${qs}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${body.slice(0, 200)}`);
  }
  const rows = await res.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

function renderHtml({ title, description, image, shareUrl, redirectUrl, siteName }) {
  const safeTitle = esc(title);
  const safeDesc = esc(description);
  const safeImage = esc(image);
  const safeShare = esc(shareUrl);
  const safeRedirect = esc(redirectUrl);
  const safeSite = esc(siteName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${safeTitle}</title>
<meta name="description" content="${safeDesc}">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="${safeSite}">
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDesc}">
<meta property="og:image" content="${safeImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${safeTitle}">
<meta property="og:url" content="${safeShare}">
<meta property="og:locale" content="en_US">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDesc}">
<meta name="twitter:image" content="${safeImage}">

<link rel="canonical" href="${safeRedirect}">
<meta http-equiv="refresh" content="0;url=${safeRedirect}">
<style>
  body{font-family:system-ui,-apple-system,sans-serif;background:#0b0b12;color:#f2f2f7;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;text-align:center}
  a{color:#8b5cf6}
  .card{max-width:420px}
  img{max-width:100%;border-radius:16px;margin:16px 0}
</style>
</head>
<body>
  <div class="card">
    ${image ? `<img src="${safeImage}" alt="${safeTitle}" width="1200" height="630">` : ""}
    <h1>${safeTitle}</h1>
    <p>${safeDesc}</p>
    <p><a href="${safeRedirect}">Open project →</a></p>
  </div>
  <script>location.replace(${JSON.stringify(redirectUrl)});</script>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  try {
    const id = (req.query && (req.query.id || req.query.project)) || "";
    if (!id || typeof id !== "string") {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Missing project id. Use /api/project-share?id=<uuid>");
      return;
    }

    const project = await fetchProject(id.trim());
    if (!project) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60");
      res.end(
        renderHtml({
          title: SITE_NAME,
          description: "Project not found.",
          image: "",
          shareUrl: `${SITE_URL}/api/project-share?id=${encodeURIComponent(id)}`,
          redirectUrl: SITE_URL + "/",
          siteName: SITE_NAME,
        })
      );
      return;
    }

    const title = pickI18n(project.title, "en") || SITE_NAME;
    const description =
      pickI18n(project.short_description, "en") ||
      pickI18n(project.full_description, "en") ||
      "";
    const image = absoluteUrl(project.cover_image_url || project.thumbnail_url || "");
    const shareUrl = `${SITE_URL}/api/project-share?id=${encodeURIComponent(project.id)}`;
    const redirectUrl = `${SITE_URL}/?project=${encodeURIComponent(project.id)}`;

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // Cache previews a bit — bots hit often; 1 hour is a good balance
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.end(
      renderHtml({
        title,
        description: description.slice(0, 300),
        image,
        shareUrl,
        redirectUrl,
        siteName: SITE_NAME,
      })
    );
  } catch (err) {
    console.error("[project-share]", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Share preview error");
  }
};
