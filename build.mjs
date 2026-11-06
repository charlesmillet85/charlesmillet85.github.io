// Builds the whole site from data/apps.mjs.  Run:  node build.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { site, apps } from "./data/apps.mjs";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const year = new Date().getFullYear();
const storeApps = apps.filter((a) => a.status !== "open");
const projects = apps.filter((a) => a.status === "open");
const ALL_PLATFORMS = ["iPhone", "iPad", "Mac", "Apple TV", "Apple Vision Pro"];

const icon = {
  apple: '<svg viewBox="0 0 14 17" width="14" height="17" fill="currentColor" aria-hidden="true"><path d="M11.6 9c0-2 1.7-3 1.8-3.1-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8-.6 0-1.6-.7-2.7-.7C3.1 4.3 1.8 5.1 1 6.4-.5 9-.4 13 1.1 15.2c.7 1 1.6 2.2 2.7 2.2 1 0 1.5-.7 2.8-.7s1.6.7 2.7.7c1.1 0 1.9-1.1 2.6-2.1.8-1.2 1.1-2.3 1.1-2.4 0 0-2.4-.9-2.4-3.9ZM9.5 2.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z"/></svg>',
  play: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="currentColor"/><path d="M13 10.5v11l9-5.5-9-5.5Z" fill="#fff"/></svg>',
  left: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 3 5 9l6 6"/></svg>',
  right: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 3 6 6-6 6"/></svg>',
  github: '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.5 15.6c.4 0 .5-.2.5-.4v-1.5c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.5.8.5 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 0Z"/></svg>',
};

/* ---------- shared pieces ---------- */
const head = ({ title, description, root, accent, image, canonical }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
${image ? `<meta property="og:image" content="${esc(site.url + image)}">` : ""}
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${esc(accent || "#0b0b0e")}">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${root}assets/site.css">
</head>`;

const gnav = (root, current, dark) => `
<header class="gnav${dark ? " dark" : ""}">
  <nav class="wrap" aria-label="Main">
    <a class="brand" href="${root}"><span class="brand-mark" aria-hidden="true"></span>${esc(site.name)}</a>
    <button class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="gnav-list"><span></span><span></span></button>
    <ul id="gnav-list">
      ${apps.map((a) => `<li><a href="${root}apps/${a.slug}/"${a.slug === current ? ' aria-current="page"' : ""}>${esc(a.name)}</a></li>`).join("\n      ")}
    </ul>
  </nav>
</header>`;

const footer = (root, app) => `
<footer class="footer${app?.theme === "dark" ? " dark" : ""}">
  <div class="wrap">
    ${app?.note ? `<p class="note muted">${esc(app.note)}</p>` : ""}
    <div class="footer-cols">
      <div>
        <h4>Apps</h4>
        <ul>${storeApps.map((a) => `<li><a href="${root}apps/${a.slug}/">${esc(a.name)}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Projects</h4>
        <ul>${projects.map((a) => `<li><a href="${root}apps/${a.slug}/">${esc(a.name)}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Support</h4>
        <ul>
          ${storeApps.filter((a) => a.links?.support).map((a) => `<li><a href="${esc(a.links.support)}">${esc(a.name)} support</a></li>`).join("")}
        </ul>
      </div>
      <div>
        <h4>Privacy</h4>
        <ul>
          ${storeApps.filter((a) => a.links?.privacy).map((a) => `<li><a href="${esc(a.links.privacy)}">${esc(a.name)} privacy</a></li>`).join("")}
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul><li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li></ul>
      </div>
    </div>
    <p class="muted">© ${year} ${esc(site.name)}. Apple, iPhone, iPad, Mac, Apple TV and Apple Vision Pro are trademarks of Apple Inc. App Store is a service mark of Apple Inc.</p>
  </div>
</footer>
<script src="${root}assets/site.js" defer></script>
</body>
</html>
`;

const storeButton = (a, cls = "") => {
  if (a.status === "live") return `<a class="btn ${cls}" href="${esc(a.storeUrl)}">${icon.apple} Download on the App Store</a>`;
  if (a.status === "open") return `<a class="btn ${cls}" href="${esc(a.repoUrl)}">${icon.github} View on GitHub</a>`;
  return `<span class="btn disabled ${cls}">Coming soon to the App Store</span>`;
};
const shortButton = (a) => {
  if (a.status === "live") return `<a class="btn small" href="${esc(a.storeUrl)}">Get</a>`;
  if (a.status === "open") return `<a class="btn small" href="${esc(a.repoUrl)}">GitHub</a>`;
  return `<span class="btn small disabled">Soon</span>`;
};
const accentVars = (a) => `--accent:${a.accent};--accent-2:${a.accent2 || a.accent}`;
const layersMarkup = (root, a, tilt = true) =>
  `<div class="layers"${tilt ? ' data-tilt="18"' : ""}>${a.hero.layers.map((l) => `<img src="${root}assets/${l}" alt="" loading="lazy">`).join("")}</div>`;

/* ---------- home page ---------- */
const spots = [
  { x: 0, y: -24, r: 0, z: 6 },
  { x: -140, y: 14, r: -14, z: 5 },
  { x: 140, y: 14, r: 12, z: 5 },
  { x: -262, y: 74, r: -22, z: 4 },
  { x: 262, y: 74, r: 20, z: 4 },
  { x: 0, y: 112, r: 8, z: 3 },
];

const tileMedia = {
  "home-glass": (root) => `<img src="${root}assets/media/home-ecosystem.webp" alt="Home Glass on iPhone, iPad, Mac and Apple Vision Pro" loading="lazy">`,
  "hello-duo": (root) => `<img src="${root}assets/media/hello-family.webp" alt="The Hello Duo characters" loading="lazy" style="object-fit:contain">`,
  "folio-player-plus": (root) => `<img src="${root}assets/media/folio-still-30.webp" alt="Folio Player Plus library" loading="lazy">`,
  "relief-player": (root, a) => layersMarkup(root, a, false),
  "spatial-posts": (root) => `<img src="${root}assets/media/posts-timeline.webp" alt="Spatial Posts on Apple Vision Pro" loading="lazy">`,
};

const home = () => {
  const root = "./";
  const counts = Object.fromEntries(ALL_PLATFORMS.map((p) => [p, storeApps.filter((a) => a.platforms.includes(p)).length]));
  return `${head({ title: site.title, description: site.description, root, canonical: site.url, image: "assets/media/home-ecosystem.webp" })}
<body class="theme-light">
${gnav(root, null, false)}
<main>
  <section class="home-hero">
    <div class="wrap">
      <h1 class="display">
        <span class="hero-line"><span style="--d:.05s">Apps with</span></span>
        <span class="hero-line"><span class="grad-word" style="--d:.18s">personality.</span></span>
      </h1>
      <p class="lead fade-up">Independent apps for iPhone, iPad, Mac, Apple TV and Apple Vision Pro. Designed and built by ${esc(site.name)}.</p>
    </div>
    <div class="constellation" data-scrub="constellation" aria-label="All apps">
      ${apps.map((a, i) => {
        const s = spots[i % spots.length];
        return `<a href="apps/${a.slug}/" style="--x:${s.x};--y:${s.y};--r:${s.r};--z:${s.z}" aria-label="${esc(a.name)}"><img src="assets/${a.icon}" alt=""></a>`;
      }).join("\n      ")}
    </div>
  </section>

  <section class="section" id="apps">
    <div class="wrap">
      <div class="section-head reveal">
        <h2 class="h2">The apps.</h2>
        <p class="lead muted">Pick a device to see what runs on it.</p>
      </div>
      <div class="chips reveal" role="group" aria-label="Filter by device">
        <button class="chip" data-platform="all" aria-pressed="true">All<span class="chip-count">${storeApps.length}</span></button>
        ${ALL_PLATFORMS.map((p) => `<button class="chip" data-platform="${esc(p)}" aria-pressed="false">${esc(p)}<span class="chip-count">${counts[p]}</span></button>`).join("\n        ")}
      </div>
      <div class="tiles">
        ${storeApps.map((a, i) => `
        <a class="tile theme-${a.theme} reveal scale${i === 0 ? " wide" : ""}" href="apps/${a.slug}/" data-platforms="${esc(a.platforms.join("|"))}" style="${accentVars(a)};--d:${(i % 2) * 0.08}s">
          <span class="glow" aria-hidden="true"></span>
          <img class="tile-icon" src="assets/${a.icon}" alt="">
          ${a.status === "live" ? '<span class="badge">On the App Store</span>' : '<span class="badge">Coming soon</span>'}
          <h3 class="h2">${esc(a.name)}</h3>
          <p class="lead">${esc(a.tagline)}</p>
          <span class="btns"><span class="link">Learn more</span></span>
          <span class="platforms muted">${esc(a.platforms.join(" · "))}</span>
          <span class="tile-media${a.hero.type === "layers" ? " layers-mini" : ""}">${tileMedia[a.slug] ? tileMedia[a.slug](root, a) : ""}</span>
        </a>`).join("")}
      </div>
    </div>
  </section>

  <section class="section tight" id="projects" style="background:var(--grey-1)">
    <div class="wrap">
      <div class="section-head reveal">
        <h2 class="h2">Projects.</h2>
        <p class="lead muted">Open-source experiments. Read the code, build your own.</p>
      </div>
      ${projects.map((a) => `
      <a class="project reveal" href="apps/${a.slug}/" style="${accentVars(a)}">
        <img src="assets/${a.icon}" alt="">
        <div>
          <h3 class="h3">${esc(a.name)}</h3>
          <p class="muted">${esc(a.tagline)} ${esc(a.platforms.join(" · "))} · ${esc(a.license)}</p>
        </div>
        <span class="btns"><span class="link">Learn more</span></span>
      </a>`).join("")}
    </div>
  </section>
</main>
${footer(root)}`;
};

/* ---------- app page ---------- */
const appPage = (a) => {
  const root = "../../";
  const A = (p) => `${root}assets/${p}`;
  const others = apps.filter((o) => o.slug !== a.slug);
  const sections = [
    ["overview", "Overview"],
    ["features", "Features"],
    a.story && ["devices", "Devices"],
    (a.gallery || a.film) && ["gallery", a.film ? "Film" : "Gallery"],
    a.faq && ["faq", "FAQ"],
  ].filter(Boolean);

  const heroMedia = (() => {
    const h = a.hero;
    if (h.type === "layers")
      return `<div class="expand-inner"><div class="layers-stage" data-tilt-zone>${layersMarkup(root, a)}</div></div>`;
    if (h.type === "video")
      return `<div class="expand-inner${a.theme === "light" ? " contain" : ""}">
          <video data-loop muted playsinline loop preload="metadata" poster="${A(h.poster)}" aria-label="${esc(a.name)} preview"><source src="${A(h.src)}" type="video/mp4"></video>
          <button class="media-toggle" aria-label="Pause video"></button>
        </div>`;
    return `<div class="expand-inner"><img src="${A(h.src)}" alt=""></div>`;
  })();

  return `${head({
    title: `${a.fullName || a.name} — ${a.tagline}`,
    description: a.intro,
    root,
    accent: a.accent,
    canonical: `${site.url}apps/${a.slug}/`,
    image: `assets/${a.hero.poster || a.gallery?.[0]?.src || a.icon}`,
  })}
<body class="theme-${a.theme}" style="${accentVars(a)}">
${gnav(root, a.slug, a.theme === "dark")}
<div class="lnav">
  <div class="wrap">
    <a class="lnav-title" href="#overview"><img src="${A(a.icon)}" alt="">${esc(a.name)}</a>
    <div class="lnav-right">
      <nav class="lnav-links" aria-label="${esc(a.name)}">${sections.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav>
      ${shortButton(a)}
    </div>
  </div>
</div>
<main>
  <section class="app-hero" id="overview" data-tilt-zone>
    <div class="wrap">
      <img class="app-icon" src="${A(a.icon)}" alt="${esc(a.name)} icon" data-tilt="16">
      <p class="kicker fade-up" style="--d:.1s">${esc(a.fullName || a.name)}</p>
      <h1 class="display">${a.headline.split("\n").map((l, i) => `<span class="hero-line"><span style="--d:${0.15 + i * 0.12}s">${esc(l)}</span></span>`).join("")}</h1>
      <p class="lead fade-up" style="--d:.45s">${esc(a.intro)}</p>
      <div class="btns fade-up" style="--d:.55s">
        ${storeButton(a)}
        ${a.film ? `<button class="link no-arrow" style="background:none;border:0;cursor:pointer" data-film="${A(a.film.src)}">${esc(a.film.label)} ▸</button>` : ""}
      </div>
      <ul class="platform-list muted fade-up" style="--d:.6s">${a.platforms.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>
    <div class="expand" data-scrub="expand">
      ${heroMedia}
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="statement">${esc(a.statement)}</p>
    </div>
  </section>

  ${a.quotes ? `
  <section class="section tight">
    <div class="wrap quotes-wrap">
      <div class="quotes" aria-live="polite">
        ${a.quotes.map((q) => `<figure class="quote"><blockquote>“${esc(q.text)}”</blockquote><figcaption>${esc(q.who)}</figcaption></figure>`).join("")}
      </div>
      <div class="dots" role="group" aria-label="Choose a line">${a.quotes.map((q, i) => `<button aria-label="Line ${i + 1}"></button>`).join("")}</div>
    </div>
  </section>` : ""}

  <section class="section" id="features">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">Features</p>
        <h2 class="h2">${esc(a.tagline)}</h2>
      </div>
      <div class="features">
        ${a.features.map((f, i) => `
        <article class="feature reveal" style="--d:${(i % 2) * 0.1}s">
          <span class="num">0${i + 1}</span>
          <h3 class="h3">${esc(f.title)}</h3>
          <p class="muted">${esc(f.text)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>

  ${a.story ? `
  <section class="section" id="devices">
    <div class="wrap story">
      <div class="story-steps">
        ${a.story.map((s, i) => `
        <div class="story-step${i === 0 ? " active" : ""}">
          <p class="kicker">${esc(s.kicker)}</p>
          <h3 class="h2">${esc(s.title)}</h3>
          <p class="lead muted">${esc(s.text)}</p>
          <img class="story-inline" src="${A(s.image)}" alt="" loading="lazy">
        </div>`).join("")}
      </div>
      <div class="story-media" aria-hidden="true">
        ${a.story.map((s, i) => `<img src="${A(s.image)}" alt="" loading="lazy"${i === 0 ? ' class="active"' : ""}>`).join("")}
      </div>
    </div>
  </section>` : ""}

  ${a.gallery || a.film ? `
  <section class="section" id="gallery">
    ${a.film ? `
    <div class="wrap reveal scale">
      <button class="film-card" data-film="${A(a.film.src)}" aria-label="${esc(a.film.label)}">
        <img src="${A(a.film.poster)}" alt="" loading="lazy">
        <span class="film-play">${icon.play}${esc(a.film.label)}</span>
      </button>
    </div>` : ""}
    ${a.gallery ? `
    <div class="gallery reveal" style="margin-top:${a.film ? "clamp(40px,6vw,80px)" : "0"}">
      <div class="gallery-track">
        ${a.gallery.map((g) => `<figure class="gallery-item"><img src="${A(g.src)}" alt="${esc(g.alt)}" loading="lazy"><figcaption class="muted">${esc(g.alt)}</figcaption></figure>`).join("")}
      </div>
      ${a.gallery.length > 1 ? `<div class="wrap gallery-nav"><button class="round-btn prev" aria-label="Previous">${icon.left}</button><button class="round-btn next" aria-label="Next">${icon.right}</button></div>` : ""}
    </div>` : ""}
  </section>` : ""}

  ${a.faq ? `
  <section class="section" id="faq">
    <div class="wrap">
      <div class="section-head reveal"><h2 class="h2">Questions.</h2></div>
      <div class="faq">
        ${a.faq.map((f) => `<details class="reveal"><summary>${esc(f.q)}</summary><div class="answer"><p class="muted">${esc(f.a)}</p></div></details>`).join("")}
      </div>
    </div>
  </section>` : ""}

  <section class="section cta">
    <div class="wrap reveal">
      <img src="${A(a.icon)}" alt="">
      <h2 class="h2">${esc(a.name)}</h2>
      <p class="lead muted" style="margin:0 auto">${esc(a.tagline)}</p>
      <div class="btns">
        ${storeButton(a)}
        ${a.links?.support ? `<a class="link" href="${esc(a.links.support)}">Support</a>` : ""}
        ${a.links?.privacy ? `<a class="link" href="${esc(a.links.privacy)}">Privacy</a>` : ""}
      </div>
    </div>
  </section>

  <section class="section tight">
    <div class="wrap">
      <h2 class="h3" style="margin-bottom:24px">More from ${esc(site.name)}</h2>
      <div class="more-apps">
        ${others.map((o) => `<a class="more-app" href="${root}apps/${o.slug}/"><img src="${A(o.icon)}" alt="">${esc(o.name)}</a>`).join("")}
      </div>
    </div>
  </section>
</main>
${a.film ? `
<dialog class="film-dialog" aria-label="${esc(a.film.label)}">
  <button class="dialog-close" aria-label="Close">×</button>
  <video controls playsinline preload="none"></video>
</dialog>` : ""}
${footer(root, a)}`;
};

/* ---------- 404 ---------- */
const notFound = () => `${head({ title: `Page not found — ${site.name}`, description: site.description, root: "/", canonical: site.url })}
<body class="theme-light">
${gnav("/", null, false)}
<main class="section" style="text-align:center;min-height:60vh">
  <div class="wrap">
    <h1 class="display">Lost?</h1>
    <p class="lead muted" style="margin:24px auto">This page doesn't exist. The apps are this way.</p>
    <div class="btns" style="justify-content:center"><a class="btn" href="/">See all apps</a></div>
  </div>
</main>
${footer("/")}`;

/* ---------- write ---------- */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7cff"/><stop offset=".5" stop-color="#f5b24a"/><stop offset="1" stop-color="#e8516f"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#g)"/></svg>`;

writeFileSync("index.html", home());
writeFileSync("404.html", notFound());
writeFileSync("assets/favicon.svg", favicon);
writeFileSync(".nojekyll", "");
for (const a of apps) {
  mkdirSync(`apps/${a.slug}`, { recursive: true });
  writeFileSync(`apps/${a.slug}/index.html`, appPage(a));
}
console.log(`Built index.html, 404.html and ${apps.length} app pages.`);
