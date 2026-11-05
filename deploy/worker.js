/**
 * Cloudflare Pages worker (advanced mode).
 *
 * Three complete versions of the portfolio live on the same domain and the
 * same URL. A `site_version` cookie decides which one is rendered at `/`:
 *
 *   site_version=v1  -> original glass portfolio (archived build)
 *   site_version=v2  -> current master / revamp (default)
 *   site_version=v3  -> new editorial design
 *
 * Switch with /api/version?to=v1|v2|v3, which sets the cookie and redirects
 * back to `/`. Values `1`, `2`, `3` are accepted as aliases.
 *
 * `?preview=v1|v2|v3` renders a version for one request without touching the
 * cookie.
 */

const COOKIE_NAME = "site_version";
const DEFAULT_VERSION = "v2";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const VARIANTS = {
  v1: "/v1/",
  v2: "/v2/",
  v3: "/v3/",
};

function normalizeVersion(value) {
  if (!value) return "";
  const clean = String(value).trim().toLowerCase();
  if (clean === "1" || clean === "v1") return "v1";
  if (clean === "2" || clean === "v2") return "v2";
  if (clean === "3" || clean === "v3") return "v3";
  return "";
}

function readCookieVersion(request) {
  const header = request.headers.get("Cookie") || "";
  const match = new RegExp("(?:^|;\\s*)" + COOKIE_NAME + "=([^;]+)").exec(header);
  if (!match) return "";
  try {
    return normalizeVersion(decodeURIComponent(match[1]));
  } catch (error) {
    return normalizeVersion(match[1]);
  }
}

function variantHeaders(response) {
  const headers = new Headers(response.headers);
  // The body is rewritten to inject the version switcher.
  headers.delete("Content-Length");
  headers.delete("ETag");
  headers.set("Cache-Control", "no-store");
  headers.set("Vary", "Cookie");
  return headers;
}

const SWITCHER_STYLE = `<style id="pk-version-switch-style">
#pk-version-switch{position:fixed;left:16px;bottom:16px;z-index:2147483000;display:flex;align-items:center;gap:2px;padding:4px;border-radius:999px;background:rgba(12,11,9,.92);color:#f2efe6;border:1px solid rgba(242,239,230,.28);box-shadow:0 10px 30px rgba(0,0,0,.35);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:1;letter-spacing:.06em;text-transform:uppercase}
#pk-version-switch a,#pk-version-switch span{padding:8px 10px;border-radius:999px;color:#cfc9bb;text-decoration:none}
#pk-version-switch a:hover{color:#fff;background:rgba(255,255,255,.12)}
#pk-version-switch .pk-vs-current{background:#d7ff45;color:#16140f}
#pk-version-switch .pk-vs-label{color:#8e887b;padding-right:4px}
@media(max-width:600px){#pk-version-switch{left:10px;bottom:10px;font-size:10px}#pk-version-switch a,#pk-version-switch span{padding:7px 8px}#pk-version-switch .pk-vs-label{display:none}}
</style>`;

function switcherMarkup(current) {
  const item = (id) =>
    id === current
      ? `<span class="pk-vs-current" aria-current="true">${id}</span>`
      : `<a href="/api/version?to=${id}">${id}</a>`;

  return `<div id="pk-version-switch" role="navigation" aria-label="Site version">${item(
    "v1"
  )}${item("v2")}${item("v3")}</div>`;
}

function injectSwitcher(html, current) {
  if (!/<\/body>/i.test(html)) return html;
  return html.replace(
    /<\/body>/i,
    `${SWITCHER_STYLE}\n${switcherMarkup(current)}\n</body>`
  );
}

async function serveVariant(env, request, url, version, { embed = false } = {}) {
  const target = new URL(VARIANTS[version], url.origin);
  const response = await env.ASSETS.fetch(new Request(target, request));
  const headers = variantHeaders(response);

  if (request.method === "HEAD") {
    return new Response(null, { status: response.status, headers });
  }

  let html = await response.text();
  if (!embed) html = injectSwitcher(html, version);

  return new Response(html, { status: response.status, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Cookie-based toggle. Always redirects to the root so the chosen variant
    // is rendered on the next request without changing the visitor's URL.
    if (url.pathname === "/api/version") {
      const to =
        normalizeVersion(url.searchParams.get("to")) || DEFAULT_VERSION;
      const secure = url.protocol === "https:" ? "; Secure" : "";
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
          "Set-Cookie":
            `${COOKIE_NAME}=${to}; Path=/; Max-Age=${COOKIE_MAX_AGE}; ` +
            `SameSite=Lax${secure}`,
          "Cache-Control": "no-store",
          Vary: "Cookie",
        },
      });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return env.ASSETS.fetch(request);
    }

    const embed = url.searchParams.get("embed") === "1";
    const preview = normalizeVersion(url.searchParams.get("preview"));
    const version = preview || readCookieVersion(request) || DEFAULT_VERSION;

    // One URL, three documents: the cookie (or a preview override) picks the
    // HTML, while the address bar stays exactly where it is.
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveVariant(env, request, url, version, { embed });
    }

    // Routes that only exist in v2. Serve its shell without a redirect so the
    // Vue router can resolve /blog and /blog/:id from the same URL.
    if (
      url.pathname === "/blog" ||
      url.pathname.startsWith("/blog/") ||
      url.pathname === "/projects" ||
      url.pathname.startsWith("/projects/")
    ) {
      return serveVariant(env, request, url, "v2", { embed });
    }

    // Direct preview entry points.
    if (url.pathname === "/v1/" || url.pathname === "/v1/index.html") {
      return serveVariant(env, request, url, "v1", { embed });
    }
    if (url.pathname === "/v2/" || url.pathname === "/v2/index.html") {
      // v2's router expects `/`, so preview it at the root instead.
      return Response.redirect(
        new URL(`/?preview=v2${embed ? "&embed=1" : ""}`, url.origin),
        302
      );
    }
    if (url.pathname === "/v3/" || url.pathname === "/v3/index.html") {
      return serveVariant(env, request, url, "v3", { embed });
    }

    return env.ASSETS.fetch(request);
  },
};
