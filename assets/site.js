// Charles Millet — Apps. All interactions, no dependencies.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---------- mobile menu ---------- */
  const menuBtn = $(".menu-btn");
  if (menuBtn) {
    const setMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$(".gnav ul a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  }

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- word-by-word statements ---------- */
  const statements = $$(".statement");
  statements.forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  });

  /* ---------- scroll-linked effects (one rAF loop) ---------- */
  const scrubbers = $$("[data-scrub]");
  let ticking = false;
  const progress = (el, start = 1, end = 0.25) => {
    // 0 when the element's top is at `start` of the viewport, 1 when it reaches `end`
    const r = el.getBoundingClientRect();
    const vh = innerHeight;
    return clamp((vh * start - r.top) / (vh * (start - end)));
  };
  const onScroll = () => {
    ticking = false;
    scrubbers.forEach((el) => {
      const kind = el.dataset.scrub;
      let p;
      if (kind === "constellation") p = clamp(scrollY / (innerHeight * 0.55));
      else if (kind === "expand") p = progress(el, 0.95, 0.15);
      else p = progress(el);
      el.style.setProperty("--p", reduced ? 1 : p.toFixed(4));
    });
    statements.forEach((el) => {
      const words = el.children;
      const p = reduced ? 1 : progress(el, 0.85, 0.35);
      const lit = Math.round(p * words.length);
      for (let i = 0; i < words.length; i++) words[i].classList.toggle("on", i < lit);
    });
  };
  const requestTick = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  addEventListener("scroll", requestTick, { passive: true });
  addEventListener("resize", requestTick);
  onScroll();

  /* ---------- pointer tilt (icons, layered parallax) ---------- */
  if (!reduced && matchMedia("(hover: hover)").matches) {
    $$("[data-tilt]").forEach((el) => {
      const max = Number(el.dataset.tilt) || 10;
      const zone = el.closest("[data-tilt-zone]") || el;
      zone.addEventListener("pointermove", (e) => {
        const r = zone.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
      });
      zone.addEventListener("pointerleave", () => {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      });
    });
  }

  /* ---------- looping videos: play only when visible ---------- */
  const loops = $$("video[data-loop]");
  const vio = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = e.target;
    if (v.dataset.userPaused === "1") return;
    if (e.isIntersecting && !reduced) v.play().catch(() => {});
    else v.pause();
  }), { threshold: 0.2 });
  loops.forEach((v) => vio.observe(v));
  $$(".media-toggle").forEach((btn) => {
    const v = btn.parentElement.querySelector("video");
    const sync = () => {
      const playing = !v.paused;
      btn.setAttribute("aria-label", playing ? "Pause video" : "Play video");
      btn.innerHTML = playing
        ? '<svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>'
        : '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11a.5.5 0 0 0 .76.43l9-5.5a.5.5 0 0 0 0-.86l-9-5.5A.5.5 0 0 0 4 2.5Z"/></svg>';
    };
    v.addEventListener("play", sync); v.addEventListener("pause", sync); sync();
    btn.addEventListener("click", () => {
      if (v.paused) { v.dataset.userPaused = "0"; v.play(); } else { v.dataset.userPaused = "1"; v.pause(); }
    });
  });

  /* ---------- sticky story: the image follows the active step ---------- */
  $$(".story").forEach((story) => {
    const steps = $$(".story-step", story);
    const imgs = $$(".story-media img", story);
    const sio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = steps.indexOf(e.target);
      steps.forEach((s, j) => s.classList.toggle("active", j === i));
      imgs.forEach((im, j) => im.classList.toggle("active", j === i));
    }), { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => sio.observe(s));
  });

  /* ---------- quotes carousel ---------- */
  $$(".quotes-wrap").forEach((wrap) => {
    const quotes = $$(".quote", wrap);
    const dots = $$(".dots button", wrap);
    let i = 0, timer;
    const show = (n) => {
      i = (n + quotes.length) % quotes.length;
      quotes.forEach((q, j) => { q.classList.toggle("active", j === i); q.setAttribute("aria-hidden", String(j !== i)); });
      dots.forEach((d, j) => d.setAttribute("aria-current", String(j === i)));
    };
    const start = () => { if (!reduced) { clearInterval(timer); timer = setInterval(() => show(i + 1), 3200); } };
    const stop = () => clearInterval(timer);
    dots.forEach((d, j) => d.addEventListener("click", () => { show(j); start(); }));
    wrap.addEventListener("pointerenter", stop);
    wrap.addEventListener("pointerleave", start);
    wrap.addEventListener("focusin", stop);
    show(0); start();
  });

  /* ---------- gallery arrows ---------- */
  $$(".gallery").forEach((g) => {
    const track = $(".gallery-track", g);
    const prev = $(".prev", g), next = $(".next", g);
    if (!prev) return;
    const step = () => track.querySelector(".gallery-item")?.getBoundingClientRect().width + 20 || 600;
    const update = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
    next.addEventListener("click", () => track.scrollBy({ left: step() }));
    track.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  });

  /* ---------- film dialog ---------- */
  const dialog = $("dialog.film-dialog");
  if (dialog) {
    const video = $("video", dialog);
    $$("[data-film]").forEach((btn) => btn.addEventListener("click", () => {
      if (video.getAttribute("src") !== btn.dataset.film) video.src = btn.dataset.film;
      dialog.showModal();
      video.currentTime = 0;
      video.play().catch(() => {});
    }));
    const close = () => dialog.close();
    $(".dialog-close", dialog).addEventListener("click", close);
    dialog.addEventListener("click", (e) => { if (e.target === dialog) close(); });
    dialog.addEventListener("close", () => video.pause());
  }

  /* ---------- local nav: highlight the section in view ---------- */
  const lnavLinks = $$(".lnav-links a");
  if (lnavLinks.length) {
    const sections = lnavLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const lio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      lnavLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    }), { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => lio.observe(s));
  }

  /* ---------- home: filter tiles by platform ---------- */
  const chips = $$(".chip");
  if (chips.length) {
    const tiles = $$(".tile[data-platforms]");
    chips.forEach((chip) => chip.addEventListener("click", () => {
      const want = chip.dataset.platform;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      tiles.forEach((t) => {
        const match = want === "all" || t.dataset.platforms.split("|").includes(want);
        if (match) {
          t.classList.remove("is-hidden");
          requestAnimationFrame(() => t.classList.remove("is-leaving"));
        } else {
          t.classList.add("is-leaving");
          setTimeout(() => t.classList.contains("is-leaving") && t.classList.add("is-hidden"), reduced ? 0 : 320);
        }
      });
      // the first visible tile spans the full width, and so does the last one if it would sit alone
      setTimeout(() => {
        const visible = tiles.filter((t) => !t.classList.contains("is-hidden"));
        const n = visible.length;
        tiles.forEach((t) => t.classList.remove("wide"));
        visible.forEach((t, i) => t.classList.toggle("wide", i === 0 || (i === n - 1 && (n - 1) % 2 === 1)));
        requestTick();
      }, reduced ? 0 : 330);
    }));
  }
})();
