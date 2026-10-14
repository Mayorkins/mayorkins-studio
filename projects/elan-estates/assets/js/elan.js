/* ÉLAN ESTATES — interaction engine */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var isFine = window.matchMedia("(pointer:fine)").matches;
  var isTouch = !isFine;
  var reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ============ PAGE TRANSITIONS ============ */
  var curtain = document.querySelector(".curtain");
  function go(url) {
    if (curtain) {
      curtain.classList.add("is-in");
      setTimeout(function () { window.location.href = url; }, 620);
    } else {
      window.location.href = url;
    }
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-lightbox]")) return; /* let lightbox handle it */
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("http") === 0 || href.indexOf("mailto") === 0 || href.indexOf("tel") === 0) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(href);
  });
  window.addEventListener("pageshow", function () {
    if (curtain && curtain.classList.contains("is-in")) {
      curtain.classList.remove("is-in");
      curtain.classList.add("is-out");
      setTimeout(function () { curtain.classList.remove("is-out"); }, 750);
    }
    window.scrollTo(0, 0);
  });
  if (curtain && !curtain.classList.contains("is-in")) {
    curtain.classList.add("is-out");
    setTimeout(function () { curtain.classList.remove("is-out"); }, 750);
  }

  /* ============ CURSOR ============ */
  var dot = $(".cursor-dot"), ring = $(".cursor-ring");
  if (dot && ring && isFine && !reduced) {
    document.documentElement.classList.add("has-cursor");
    var mx = -100, my = -100, rx = -100, ry = -100, raf = null;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
      if (!raf) { raf = requestAnimationFrame(loop); }
    });
    function loop() {
      rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      raf = null;
    }
    document.addEventListener("mouseover", function (e) {
      var t = e.target;
      var hover = t.closest("a,button,.sel,[data-cursor-hover]");
      var label = t.closest("[data-cursor-label]");
      ring.classList.toggle("is-hover", !!hover);
      ring.classList.toggle("is-view", !!label);
      var lab = ring.querySelector(".cursor-label");
      if (lab) lab.textContent = label ? label.getAttribute("data-cursor-label") : "";
    });
    document.addEventListener("mouseleave", function () {
      dot.style.opacity = 0; ring.style.opacity = 0;
    });
    document.addEventListener("mouseenter", function () {
      dot.style.opacity = 1; ring.style.opacity = 1;
    });
    /* hide cursor when leaving window */
    document.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget) { dot.style.opacity = 0; ring.style.opacity = 0; }
    });
  }

  /* ============ MAGNETIC ============ */
  if (isFine && !reduced) {
    $$(".magnetic").forEach(function (el) {
      var strength = parseFloat(el.getAttribute("data-magnet") || "0.32");
      var raf2 = null, tx = 0, ty = 0, cx = 0, cy = 0;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        cx = (e.clientX - r.left - r.width / 2) * strength;
        cy = (e.clientY - r.top - r.height / 2) * strength;
        if (!raf2) raf2 = requestAnimationFrame(loop2);
      });
      el.addEventListener("mouseleave", function () { cx = 0; cy = 0; });
      function loop2() {
        tx = lerp(tx, cx, 0.18); ty = lerp(ty, cy, 0.18);
        el.style.transform = "translate(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px)";
        if (Math.abs(cx) < 0.3 && Math.abs(cy) < 0.3 && Math.abs(tx) < 0.3 && Math.abs(ty) < 0.3) {
          el.style.transform = ""; raf2 = null; return;
        }
        raf2 = requestAnimationFrame(loop2);
      }
    });
  }

  /* ============ HEADER ============ */
  var header = $(".header");
  function onScrollHeader() {
    if (!header) return;
    var sc = window.scrollY > 40;
    header.classList.toggle("scrolled", sc);
    var dark = false;
    if (!sc) {
      var probe = document.elementFromPoint(window.innerWidth / 2, 30);
      dark = !!(probe && probe.closest(".hero,.phero,.pd-hero,.fcta,.map-sec,.contact-hero,.dark"));
      header.classList.toggle("on-dark", dark);
    } else {
      var darkSections = $$("[data-header-dark]");
      for (var i = 0; i < darkSections.length; i++) {
        var r = darkSections[i].getBoundingClientRect();
        if (r.top <= 88 && r.bottom > 88) { dark = true; break; }
      }
      header.classList.toggle("on-dark", dark);
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ============ MOBILE MENU ============ */
  var burger = $(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
      document.body.classList.toggle("is-locked");
    });
    $$(".menu a.menu-link").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open", "is-locked");
      });
    });
  }

  /* ============ REVEALS ============ */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal],.reveal-img,.stagger,.fcta").forEach(function (el) { io.observe(el); });

  /* ============ PARALLAX ============ */
  var parEls = [];
  $$("[data-parallax]").forEach(function (el) {
    parEls.push({ el: el, speed: parseFloat(el.getAttribute("data-parallax") || "0.12") });
  });
  var bgEls = [];
  $$(".hero-bg,.phero-bg,.fcta-bg").forEach(function (el) { bgEls.push(el); });
  var pfRaf = null;
  function parallaxLoop() {
    var sy = window.scrollY, vh = window.innerHeight;
    parEls.forEach(function (p) {
      var r = p.el.getBoundingClientRect();
      var center = r.top + r.height / 2 - vh / 2;
      var y = -center * p.speed;
      p.el.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
    });
    bgEls.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      var prog = clamp(r.top / vh, -1, 1);
      el.style.transform = "translate3d(0," + (prog * -60).toFixed(1) + "px,0) scale(1.08)";
    });
    pfRaf = null;
  }
  function onParallax() { if (!pfRaf && !reduced) pfRaf = requestAnimationFrame(parallaxLoop); }
  window.addEventListener("scroll", onParallax, { passive: true });
  onParallax();

  /* ============ HERO LOAD ============ */
  var hero = $(".hero"), phero = $(".phero");
  if (hero) setTimeout(function () { hero.classList.add("loaded"); }, 60);
  if (phero) setTimeout(function () { phero.classList.add("loaded"); }, 60);

  /* ============ MARQUEE ============ */
  $$(".marquee-track").forEach(function (t) {
    t.innerHTML += t.innerHTML;
  });

  /* ============ CUSTOM SELECTS ============ */
  function buildSelect(el) {
    var opts;
    try { opts = JSON.parse(el.getAttribute("data-options")); }
    catch (err) { return; }
    if (!opts) return;
    var label = el.getAttribute("data-label") || "";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = '<span class="slab">' + label + '</span><span class="caret">▼</span>';
    var ul = document.createElement("ul");
    opts.forEach(function (o) {
      var li = document.createElement("li");
      li.textContent = o;
      li.setAttribute("data-v", o);
      if (o === (el.getAttribute("data-value") || opts[0])) li.classList.add("sel");
      li.addEventListener("click", function () {
        el.setAttribute("data-value", o);
        btn.querySelector(".slab").textContent = (el.getAttribute("data-empty-label") && o === opts[0]) ? el.getAttribute("data-empty-label") : o;
        $$("li", ul).forEach(function (x) { x.classList.remove("sel"); });
        li.classList.add("sel");
        close();
        el.dispatchEvent(new CustomEvent("change"));
      });
      ul.appendChild(li);
    });
    function close() { el.classList.remove("open"); }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var was = el.classList.contains("open");
      $$(".sel.open").forEach(function (s) { if (s !== el) s.classList.remove("open"); });
      el.classList.toggle("open", !was);
    });
    document.addEventListener("click", function (e) {
      if (!el.contains(e.target)) close();
    });
    el.appendChild(btn); el.appendChild(ul);
  }
  $$(".sel[data-options]").forEach(buildSelect);

  /* ============ HERO SEARCH ============ */
  var hform = $(".hsearch form");
  if (hform) {
    hform.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = [];
      var loc = $(".sel[data-key=loc]", hform), typ = $(".sel[data-key=type]", hform),
          prc = $(".sel[data-key=price]", hform), bed = $(".sel[data-key=beds]", hform);
      var v = function (s, def) { return s && s.getAttribute("data-value") !== def ? s.getAttribute("data-value") : ""; };
      q.push("loc=" + encodeURIComponent(v(loc, "All Locations")));
      q.push("type=" + encodeURIComponent(v(typ, "All Types")));
      q.push("price=" + encodeURIComponent(v(prc, "Any Price")));
      q.push("beds=" + encodeURIComponent(v(bed, "Any Bedrooms")));
      go("properties.html?" + q.join("&"));
    });
  }

  /* ============ PROPERTIES PAGE ============ */
  var plist = $(".plist");
  if (plist && window.ELAN && ELAN.PROPERTIES) {
    var money = function (s) { return parseFloat(String(s).replace(/[^0-9.]/g, "")) || 0; };
    var state = { loc: "", type: "", price: "", beds: "", life: "" };
    var params = new URLSearchParams(window.location.search);
    state.loc = params.get("loc") || ""; state.type = params.get("type") || "";
    state.price = params.get("price") || ""; state.beds = params.get("beds") || "";
    state.life = params.get("life") || "";

    function matches(p) {
      var num = money(p.price);
      if (state.loc && p.location.toLowerCase().indexOf(state.loc.toLowerCase()) === -1) return false;
      if (state.type && p.type !== state.type) return false;
      if (state.price) {
        if (state.price === "Under $5M" && num >= 5000000) return false;
        if (state.price === "$5M – $8M" && (num < 5000000 || num >= 8000000)) return false;
        if (state.price === "$8M – $12M" && (num < 8000000 || num >= 12000000)) return false;
        if (state.price === "$12M+" && num < 12000000) return false;
      }
      if (state.beds) {
        var min = parseInt(state.beds, 10) || 0;
        if (p.beds < min) return false;
      }
      if (state.life && p.lifestyle !== state.life) return false;
      return true;
    }
    function cardHtml(p, i) {
      var cls = i % 3 === 0 ? "pcard wide" : (i % 3 === 1 ? "pcard alt" : "pcard alt2");
      return '<article class="' + cls + '" data-reveal>' +
        '<a href="property.html?slug=' + p.slug + '" class="pmedia" data-cursor-label="VIEW">' +
        (p.tag ? '<span class="ptag">' + p.tag + "</span>" : "") +
        '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
        '<div class="pexp"><span>Explore Property</span><span class="plus">+</span></div></a>' +
        '<div class="pinfo"><div><a href="property.html?slug=' + p.slug + '" class="pname">' + p.name + "</a>" +
        '<div class="ploc">' + p.location + "</div>" +
        '<div class="pstats"><span><b>' + p.beds + "</b> Beds</span><span><b>" + p.baths + "</b> Baths</span><span><b>" + p.sqft + '</b> Sq. Ft.</span></div></div>' +
        '<div class="pprice">' + p.price + "</div></div></article>";
    }
    var switchTimer = null;
    function render() {
      var list = ELAN.PROPERTIES.filter(matches);
      plist.classList.add("is-switching");
      clearTimeout(switchTimer);
      switchTimer = setTimeout(function () {
        plist.innerHTML = list.map(cardHtml).join("");
        plist.classList.remove("is-switching");
        plist.classList.remove("in");
        plist.classList.add("stagger");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { plist.classList.add("in"); });
        });
        var res = $(".f-results");
        if (res) res.textContent = list.length + (list.length === 1 ? " residence" : " residences");
      }, 260);
    }
    function bindFilterSelects() {
      $$(".filters .sel").forEach(function (s) {
        var key = s.getAttribute("data-key");
        var def = s.getAttribute("data-def");
        if (key) {
          s.addEventListener("change", function () {
            var nv = s.getAttribute("data-value");
            state[key] = (nv && nv !== def) ? nv : "";
            syncUrl();
            render();
          });
        }
      });
    }
    function syncUrl() {
      var q = new URLSearchParams();
      if (state.loc) q.set("loc", state.loc);
      if (state.type) q.set("type", state.type);
      if (state.price) q.set("price", state.price);
      if (state.beds) q.set("beds", state.beds);
      if (state.life) q.set("life", state.life);
      try { history.replaceState(null, "", "properties.html" + (q.toString() ? "?" + q.toString() : "")); }
      catch (err) { /* file:// protocol */ }
    }
    function setSelectsFromState() {
      $$(".filters .sel").forEach(function (s) {
        var key = s.getAttribute("data-key");
        if (state[key]) {
          s.setAttribute("data-value", state[key]);
          var slab = $(".slab", s);
          if (slab) slab.textContent = state[key];
          $$("li", s).forEach(function (li) {
            li.classList.toggle("sel", li.getAttribute("data-v") === state[key]);
          });
        }
      });
    }
    var fClear = $(".f-clear");
    if (fClear) {
      fClear.addEventListener("click", function () {
        state = { loc: "", type: "", price: "", beds: "", life: "" };
        $$(".filters .sel").forEach(function (s) {
          s.setAttribute("data-value", s.getAttribute("data-def") || "");
          var slab = $(".slab", s);
          if (slab) slab.textContent = s.getAttribute("data-def") || s.getAttribute("data-label") || "";
          $$("li", s).forEach(function (li) { li.classList.remove("sel"); });
        });
        history.replaceState(null, "", "properties.html");
        render();
      });
    }
    setSelectsFromState();
    bindFilterSelects();
    render();
  }

  /* ============ HORIZONTAL PINNED SCROLLER ============ */
  $$(".hs").forEach(function (hs) {
    if (isTouch || reduced) return;
    var sticky = $(".hs-sticky", hs);
    var track = $(".hs-track", hs);
    var bar = $(".hs-progress i", hs);
    if (!sticky || !track) return;
    var maxTx = 0;
    function measure() {
      maxTx = Math.max(0, track.scrollWidth - hs.clientWidth);
      hs.style.height = (window.innerHeight + maxTx * 0.5) + "px";
    }
    measure();
    window.addEventListener("resize", measure);
    var tx = 0, target = 0, rafH = null;
    function step() {
      tx = lerp(tx, target, 0.12);
      track.style.transform = "translate3d(" + (-tx).toFixed(1) + "px,0,0)";
      if (bar) bar.style.width = (maxTx ? (tx / maxTx) * 100 : 0) + "%";
      if (Math.abs(tx - target) < 0.4) { rafH = null; return; }
      rafH = requestAnimationFrame(step);
    }
    function setTarget(v) { target = clamp(v, 0, maxTx); if (!rafH) rafH = requestAnimationFrame(step); }
    hs.addEventListener("wheel", function (e) {
      var r = hs.getBoundingClientRect();
      if (r.top > 0 || r.bottom < window.innerHeight) return;
      if ((target >= maxTx - 1 && e.deltaY > 0) || (target <= 1 && e.deltaY < 0)) return;
      e.preventDefault();
      setTarget(target + e.deltaY);
    }, { passive: false });
    var dragging = false, startX = 0, startT = 0;
    track.addEventListener("pointerdown", function (e) {
      dragging = true; startX = e.clientX; startT = target;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      setTarget(startT - (e.clientX - startX));
    });
    ["pointerup", "pointercancel"].forEach(function (ev) {
      track.addEventListener(ev, function () { dragging = false; });
    });
  });

  /* ============ GALLERY SCROLL + PROGRESS ============ */
  var galleryUpdaters = [];
  $$(".gscroll").forEach(function (gs) {
    var track = $(".gscroll-track", gs);
    var bar = $(".gbar i", gs);
    if (!track) return;
    function upd() {
      var m = track.scrollWidth - track.clientWidth;
      if (bar) bar.style.width = (m ? (track.scrollLeft / m) * 100 : 0) + "%";
    }
    track.addEventListener("scroll", upd, { passive: true });
    galleryUpdaters.push(upd);
    upd();
    /* drag to scroll */
    if (isFine && !reduced) {
      var down = false, sx = 0, sl = 0;
      track.addEventListener("pointerdown", function (e) {
        down = true; sx = e.clientX; sl = track.scrollLeft;
        track.classList.add("dragging");
      });
      window.addEventListener("pointermove", function (e) {
        if (!down) return;
        track.scrollLeft = sl - (e.clientX - sx);
      });
      ["pointerup", "pointercancel"].forEach(function (ev) {
        window.addEventListener(ev, function () { down = false; track.classList.remove("dragging"); });
      });
    }
  });
  function refreshGalleries() {
    galleryUpdaters.forEach(function (f) { f(); });
  }
  window.addEventListener("load", refreshGalleries);

  /* ============ LIGHTBOX ============ */
  var lightbox = $(".lightbox");
  if (lightbox) {
    var lbImg = $(".lightbox img"), lbCap = $(".lightbox figcaption"),
        lbCount = $(".lb-count"), cur = 0, items = [];
    function openAt(i) {
      cur = clamp(i, 0, items.length - 1);
      lbImg.src = items[cur].src;
      lbImg.alt = items[cur].cap || "";
      lbCap.textContent = items[cur].cap || "";
      if (lbCount) lbCount.textContent = (cur + 1) + " / " + items.length;
      lightbox.classList.add("open");
      document.body.classList.add("is-locked");
    }
    function closeLb() {
      lightbox.classList.remove("open");
      document.body.classList.remove("is-locked");
    }
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-lightbox]");
      if (!t) return;
      e.preventDefault();
      try {
        items = JSON.parse(t.getAttribute("data-images"));
      } catch (err) { items = []; }
      if (!items.length) items = [{ src: t.getAttribute("href") || t.querySelector("img").src, cap: t.getAttribute("data-cap") || "" }];
      openAt(0);
    });
    $(".lb-close", lightbox).addEventListener("click", closeLb);
    $(".lb-prev", lightbox).addEventListener("click", function () { openAt(cur - 1); });
    $(".lb-next", lightbox).addEventListener("click", function () { openAt(cur + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") openAt(cur - 1);
      if (e.key === "ArrowRight") openAt(cur + 1);
    });
  }

  /* ============ NEIGHBORHOODS INTERACTIVE ============ */
  var nbWrap = $(".nb-wrap");
  if (nbWrap) {
    var items = $$(".nb-item");
    var imgs = $$(".nb-visual img");
    var cap = $(".nb-cap");
    var capStory = $(".nb-story", cap || nbWrap);
    var capPrice = $(".nb-price", cap || nbWrap);
    function activate(nb) {
      items.forEach(function (it, i) {
        var on = it === nb;
        it.classList.toggle("is-active", on);
        if (on && imgs[i]) {
          imgs.forEach(function (im) { im.classList.remove("is-active"); });
          imgs[i].classList.add("is-active");
        }
      });
      if (nb && cap) {
        cap.classList.add("is-visible");
        setTimeout(function () {
          if (capStory) capStory.textContent = nb.getAttribute("data-story");
          if (capPrice) capPrice.textContent = nb.getAttribute("data-price") + " · " + nb.getAttribute("data-count") + " residences";
        }, 240);
      }
    }
    items.forEach(function (it, i) {
      it.addEventListener("mouseenter", function () { activate(it); });
      it.addEventListener("focus", function () { activate(it); });
      it.addEventListener("click", function () {
        go("properties.html?loc=" + encodeURIComponent(it.getAttribute("data-loc")));
      });
    });
    if (items.length) activate(items[0]);
  }

  /* ============ COUNT UP ============ */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, target = parseFloat(el.getAttribute("data-count")), t0 = null;
      var pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
      function tick(ts) {
        if (!t0) t0 = ts;
        var p = clamp((ts - t0) / 1800, 0, 1);
        p = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(target * p).toLocaleString() + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach(function (el) { cio.observe(el); });

  /* ============ FORMS ============ */
  $$(".js-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $$("[required]", form).forEach(function (f) {
        var v = f.value.trim();
        var bad = !v || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        var wrap = f.closest(".f-field");
        if (wrap) wrap.classList.toggle("is-error", bad);
        if (bad) ok = false;
      });
      if (!ok) {
        var firstBad = $(".f-field.is-error", form);
        if (firstBad) firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      var btn = $('button[type="submit"]', form);
      if (btn) {
        var old = btn.innerHTML;
        btn.innerHTML = "Sending…";
        btn.disabled = true;
        setTimeout(function () {
          form.style.display = "none";
          var succ = form.parentElement.querySelector(".form-success");
          if (succ) succ.classList.add("show");
          btn.innerHTML = old; btn.disabled = false;
        }, 900);
      }
    });
    $$("input,textarea", form).forEach(function (f) {
      f.addEventListener("input", function () {
        var wrap = f.closest(".f-field");
        if (wrap) wrap.classList.remove("is-error");
      });
    });
  });

  /* ============ FOOTER NEWSLETTER ============ */
  var ff = $(".foot-form");
  if (ff) {
    ff.addEventListener("submit", function (e) {
      e.preventDefault();
      var inp = $("input", ff);
      inp.value = "";
      inp.placeholder = "Thank you — welcome to ÉLAN.";
    });
  }

  /* ============ ARTICLE / DETAIL RENDER ============ */
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }
  if (window.ELAN && $("[data-detail]")) {
    var slug = getParam("slug");
    var P = (ELAN.PROPERTIES || []).filter(function (p) { return p.slug === slug; })[0];
    if (!P) { window.location.href = "properties.html"; }
    else {
      var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
      $("[data-detail=hero]").style.backgroundImage = "url('" + P.image + "')";
      $("[data-detail=name]").textContent = P.name;
      $("[data-detail=loc]").textContent = P.location;
      $("[data-detail=price]").textContent = P.price;
      $("[data-detail=beds]").textContent = P.beds;
      $("[data-detail=baths]").textContent = P.baths;
      $("[data-detail=sqft]").textContent = P.sqft;
      $("[data-detail=type]").textContent = P.type;
      $("[data-detail=year]").textContent = P.year;
      $("[data-detail=desc-1]").textContent = P.description[0];
      $("[data-detail=desc-2]").textContent = P.description[1];
      document.title = P.name + " — Élan Estates";
      var featBox = $("[data-detail=features]");
      if (featBox) {
        var ICONS = {
          pool: '<path d="M2 12c2.5-1.5 5.5 1.5 8 0s5.5 1.5 8 0 4 1.2 4 1.2"/><path d="M2 17c2.5-1.5 5.5 1.5 8 0s5.5 1.5 8 0 4 1.2 4 1.2"/><path d="M2 7c2.5-1.5 5.5 1.5 8 0s5.5 1.5 8 0 4 1.2 4 1.2"/>',
          cinema: '<rect x="2.5" y="5" width="19" height="13" rx="1.5"/><path d="m10 9.5 5 2.5-5 2.5z"/>',
          wine: '<path d="M8 3h8v5a4 4 0 0 1-8 0z"/><path d="M8.5 3h7"/><path d="M12 12v7"/><path d="M9 19h6"/>',
          smart: '<path d="M4 10a8 8 0 0 1 16 0"/><path d="M7 11a5 5 0 0 1 10 0"/><circle cx="12" cy="13.5" r="2.2"/><path d="M12 16v4"/>',
          elevator: '<rect x="8" y="2.5" width="8" height="19" rx="1"/><path d="M8 9 12 5.5 16 9"/><path d="m8 15 4 3.5L16 15"/>',
          gym: '<path d="M6.5 8v8M17.5 8v8"/><rect x="2.5" y="6" width="3" height="12" rx="1"/><rect x="18.5" y="6" width="3" height="12" rx="1"/><path d="M6.5 12h11"/>',
          dock: '<path d="M3 21h18"/><path d="M5 21V10l7-6 7 6v11"/><path d="M9 21v-6h6v6"/>',
          view: '<circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/>',
          terrace: '<path d="M2 13h20"/><path d="M5 13v8M19 13v8"/><path d="M12 13v8"/><path d="m12 3-4 4h8z"/>',
          kitchen: '<path d="M5 3v18M5 3c3 0 4 2.5 4 5s-1 4-4 4"/><path d="M16 3h3v18h-3z"/>',
          garden: '<path d="M12 21v-9"/><path d="M12 12c0-4 2.5-7 7-7 0 5-2.5 7-7 7z"/><path d="M12 12c0-3-2-5.5-6-5.5C6 11 8 13 12 12z"/>',
          fireplace: '<path d="M12 3c2 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.8-2.8 2-4 0 1.5.6 2.5 1.5 3.5C12 8 11 6 12 3z"/>',
          key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9"/><path d="m17 6 3 3M14 9l2.5 2.5"/>'
        };
        featBox.innerHTML = P.features.map(function (f) {
          var k = f.toLowerCase();
          var icon = ICONS.pool;
          if (k.indexOf("pool") > -1 || k.indexOf("spring") > -1) icon = ICONS.pool;
          else if (k.indexOf("cinema") > -1) icon = ICONS.cinema;
          else if (k.indexOf("wine") > -1) icon = ICONS.wine;
          else if (k.indexOf("smart") > -1 || k.indexOf("automation") > -1) icon = ICONS.smart;
          else if (k.indexOf("elevator") > -1) icon = ICONS.elevator;
          else if (k.indexOf("gym") > -1 || k.indexOf("wellness") > -1 || k.indexOf("spa") > -1) icon = ICONS.gym;
          else if (k.indexOf("dock") > -1) icon = ICONS.dock;
          else if (k.indexOf("view") > -1) icon = ICONS.view;
          else if (k.indexOf("terrace") > -1 || k.indexOf("rooftop") > -1 || k.indexOf("deck") > -1) icon = ICONS.terrace;
          else if (k.indexOf("kitchen") > -1 || k.indexOf("island") > -1) icon = ICONS.kitchen;
          else if (k.indexOf("garden") > -1 || k.indexOf("court") > -1) icon = ICONS.garden;
          else if (k.indexOf("fire") > -1) icon = ICONS.fireplace;
          else if (k.indexOf("key") > -1) icon = ICONS.key;
          return '<div class="detail-item"><svg viewBox="0 0 24 24">' + icon + '</svg><h4>' + esc(f) + "</h4><p>Defined to the detail</p></div>";
        }).join("");
      }
      var gtrack = $("[data-detail=gallery]");
      if (gtrack) {
        var images = P.gallery.map(function (src, i) {
          return { src: src, cap: P.name + " — view " + (i + 1) };
        });
        gtrack.innerHTML = images.map(function (im, i) {
          return '<a class="gitem" data-lightbox href="' + im.src + '" data-images=\'' + JSON.stringify(images) + '\' data-cursor-label="VIEW" data-cap="' + esc(im.cap) + '">' +
            '<img src="' + im.src + '" alt="' + esc(P.name) + ' ' + (i + 1) + '" loading="lazy">' +
            '<span class="gcap">View ' + String(i + 1).padStart(2, "0") + "</span></a>";
        }).join("");
      }
      var highlights = $("[data-detail=highlights]");
      if (highlights) {
        highlights.innerHTML = P.highlights.map(function (h) {
          return "<li><span class='ni'></span><b>" + esc(h) + "</b><span>— min</span></li>";
        }).join("");
      }
      var inqSubject = $("[data-detail=inquiry-subject]");
      if (inqSubject) inqSubject.value = "Inquiry — " + P.name;
      var pn = $("[data-detail=prevnext]");
      if (pn) {
        var idx = ELAN.PROPERTIES.indexOf(P);
        var prev = ELAN.PROPERTIES[(idx - 1 + ELAN.PROPERTIES.length) % ELAN.PROPERTIES.length];
        var next = ELAN.PROPERTIES[(idx + 1) % ELAN.PROPERTIES.length];
        pn.innerHTML =
          '<a class="btn-link" href="property.html?slug=' + prev.slug + '">← ' + prev.name + "</a>" +
          '<a class="btn-link" href="property.html?slug=' + next.slug + '">' + next.name + ' →</a>';
      }
      refreshGalleries();
    }
  }
  if (window.ELAN && $("[data-article]")) {
    var aslug = getParam("id");
    var A = (ELAN.JOURNAL || []).filter(function (a) { return a.slug === aslug; })[0];
    if (!A) { window.location.href = "journal.html"; }
    else {
      var escA = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
      $("[data-article=hero]").style.backgroundImage = "url('" + A.image + "')";
      $("[data-article=title]").textContent = A.title;
      $("[data-article=meta]").textContent = A.category + " · " + A.date + " · " + A.read;
      $("[data-article=lead]").textContent = A.excerpt;
      var body = $("[data-article=body]");
      if (body) {
        body.innerHTML = A.body.map(function (p, i) {
          if (i === 1) return "<p>" + escA(p) + "</p><div class='art-quote'>Architecture is the art of composing silence — so that when you arrive, you arrive.</div>";
          return "<p>" + escA(p) + "</p>";
        }).join("");
      }
      document.title = A.title + " — Élan Estates";
    }
  }

  /* ============ THEME TOGGLE ============ */
  $$(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", cur);
      document.documentElement.classList.add("theme-anim");
      setTimeout(function () { document.documentElement.classList.remove("theme-anim"); }, 650);
      try { localStorage.setItem("elan-theme", cur); } catch (e) { /* private mode */ }
    });
  });

  /* ============ SMOOTH ANCHORS ============ */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var t = $(a.getAttribute("href"));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    });
  });
})();
