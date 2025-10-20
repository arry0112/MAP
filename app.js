// Mallakhamb Association of Punjab - Final JS

// ---------------------------- Data ----------------------------
const appData = {
  organizationInfo: {
    name: "Mallakhamb Association of Punjab",
    established: "2018",
    mission:
      "To promote, develop and popularize the ancient Indian sport of Mallakhamb in Punjab state through systematic training, competitions, and cultural preservation.",
    vision:
      "To make Punjab a leading state in Mallakhamb sports and produce world-class athletes who bring glory to India on international platforms.",
  },

  members: [
    { name: "Mr. S.S. Chhina", designation: "Patron", image: "assets/chhina.jpeg" },
    { name: "Dr. Sandeepa Sood", designation: "Chairman", image: "assets/sandeepa.jpeg" },
    { name: "Dr. Rainder Pathania", designation: "President", image: "assets/rajinder.jpeg" },
    { name: "Dr. Vipan Pathania", designation: "General Secretary", image: "assets/vipan.jpeg", phone: "+91-99157-05868", email: "sports.pma@gmail.com" },
    { name: "Mr. Neetan Bawa", designation: "Treasurer", image: "assets/neetan.jpeg" },
    { name: "Mr. A.K. Bansal", designation: "Senior Vice President"},
    { name: "Mr. Parminder Singh", designation: "Organising Secretary"},
    { name: "Dr. Neeru Ghai", designation: "Joint Secretary", image: "assets/neeru.jpeg" },
    { name: "Mr. Ravinder Singh", designation: "Joint Secretary", image: "assets/ravinder.jpeg" },    
    { name: "Mrs. Neetu Bala", designation: "EC Member", image: "assets/neetu.jpeg" },
  ],

  achievements: [],
  players: [],
  eventGalleries: [],

  carouselImages: [
    { url: "assets/bg1.png", title: "Ancient Tradition", subtitle: "Preserving 12th Century Heritage" },
    { url: "assets/bg2.jpg", title: "Modern Excellence", subtitle: "Training Champions of Tomorrow" },
    { url: "assets/bg3.jpg", title: "Punjab Pride", subtitle: "Leading the Nation in Traditional Sports" },
  ],

  notices: [
    { id: 1, title: "State Championship 2025 - Registration Open", content: "Punjab State Mallakhamb Championship 2025 registration is now open. Last date for registration: 15th October 2025.", date: "2025-09-01", expiryDate: "2025-10-15", type: "event", priority: "high", pdfUrl: "assets/pdfs/championship-registration.pdf", pdfFilename: "Championship_Registration_2025.pdf" },
    { id: 2, title: "Winter Training Camp Announcement", content: "Special winter training camp for advanced practitioners from November 1-30, 2025 at Patiala Sports Complex.", date: "2025-08-20", expiryDate: "2025-09-30", type: "notice", priority: "medium", pdfUrl: "assets/pdfs/winter-camp.pdf", pdfFilename: "Winter_Training_Camp_2025.pdf" },
    { id: 3, title: "Equipment Subsidy Scheme", content: "Government subsidy available for Mallakhamb equipment purchase. Apply through our office with required documents.", date: "2025-08-15", expiryDate: "2025-09-31", type: "notice", priority: "medium", pdfUrl: "assets/pdfs/subsidy-form.pdf", pdfFilename: "Equipment_Subsidy_Form.pdf" },
    { id: 4, title: "Annual General Meeting 2025", content: "Annual General Meeting scheduled for 5th November 2025 at 2:00 PM. All members requested to attend.", date: "2025-09-01", expiryDate: "2025-10-05", type: "event", priority: "high", pdfUrl: "assets/pdfs/agm-agenda.pdf", pdfFilename: "AGM_Agenda_2025.pdf" },
  ],

  events: [
    { id: 1, title: "All India Inter-University Mallakhamb Championship", date: "2025-10-24", venue: "Vinayaka Mission's Research Foundation, Chennai", categories: ["Senior MEN & WOMEN"], registrationDeadline: "2025-10-07", expiryDate: "2025-10-24" },
    { id: 2, title: "Khelo India Inter-University Games 2025 - Mallakhamb", date: "2025-11", venue:"Rajasthan University, Jaipur", categories:["College Students"], expiryDate: "2025-10-30" },
  ],
};

// ---------------------------- Helpers ----------------------------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const byId = (id) => document.getElementById(id);
// Format dates. Supports full dates (YYYY-MM-DD) and month-only (YYYY-MM)
const fmt = (d) => {
  if (!d) return "";
  // Month-only (YYYY-MM)
  const monthOnly = /^\d{4}-\d{2}$/.test(d);
  if (monthOnly) {
    const [y, m] = d.split("-").map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString("en-IN", { year: "numeric", month: "long" });
  }
  const dt = new Date(d);
  if (isNaN(dt)) return String(d);
  return dt.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
};

// Helper to parse a date-like string into a timestamp for sorting
function parseDateForSort(d) {
  if (!d) return 0;
  if (/^\d{4}-\d{2}$/.test(d)) {
    const [y, m] = d.split("-").map(Number);
    return new Date(y, m - 1, 1).getTime();
  }
  const t = new Date(d).getTime();
  return isNaN(t) ? 0 : t;
}
const isExpired = (d) => new Date() > new Date(d);

// Generate a small inline SVG placeholder (data URL) with initials or label
function svgPlaceholder(text = "", opts = {}) {
  const bg = opts.bg || "#eef3ff";
  const fg = opts.fg || "#2e6dd8";
  const w = opts.w || 240;
  const h = opts.h || 180;
  const label = (text || "?").substring(0, 2).toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Poppins, Arial, sans-serif' font-weight='600' fill='${fg}' font-size='${Math.floor(w / 4)}'>${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// PDF download helper
function downloadPDF(url, filename) {
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "notice.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch {
    alert("Unable to download PDF, please try again.");
  }
}
window.downloadPDF = downloadPDF;

// ---------------------------- Navigation (delegated + explicit CTAs) ----------------------------
const Navigation = {
  init() {
    // Ensure in-page anchors account for sticky navbar height
    const setScrollPadding = () => {
      const nav = document.querySelector('.navbar');
      const ribbon = document.querySelector('.notice-ribbon');
      const navH = nav ? nav.offsetHeight : 0;
      const ribbonH = ribbon ? ribbon.offsetHeight : 0;
  const offset = 8; // small gap so content isn't flush against the ribbon
  const total = navH + ribbonH + offset;
      // set CSS variable for sticky positioning
      document.documentElement.style.setProperty('--nav-height', navH + 'px');
      document.documentElement.style.scrollPaddingTop = total + 'px';
    };
    setScrollPadding();
    window.addEventListener('resize', setScrollPadding);

    // Top nav links
    document.addEventListener("click", (e) => {
      const nav = e.target.closest(".nav-link[data-section]");
      if (!nav) return;
      e.preventDefault();
      const section = nav.getAttribute("data-section");
      this.goto(section);
    });

    // Any in-page #anchor, including hero CTAs
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a.js-scroll, a[href^="#"]');
      if (!link) return;
      const section = link.dataset.section || (link.getAttribute("href") || "").replace(/^#/, "");
      if (!section) return;
      e.preventDefault();
      this.goto(section);
    });

    // Mobile menu
    const toggle = byId("nav-toggle");
    const menu = byId("nav-menu");
    if (toggle && menu) toggle.addEventListener("click", () => menu.classList.toggle("open"));

    // Explicit hero bindings to avoid any stacking/overlay edge cases
    const eventsBtn = byId("cta-events");
    const aboutBtn  = byId("cta-about");
    eventsBtn && eventsBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); this.goto("events"); });
    aboutBtn  && aboutBtn.addEventListener("click",  (e) => { e.preventDefault(); e.stopPropagation(); this.goto("about");  });
  },

  goto(sectionId) {
    // Animated page switch using overlay
    const overlay = document.getElementById('page-transition');
    const switchPage = () => {
      $$(".page").forEach((p) => p.classList.remove("active"));
      const page = byId(sectionId);
      if (page) {
        page.classList.add("active");
        // add entrance animation class
        page.classList.remove('animate-in');
        void page.offsetWidth; // force reflow
        page.classList.add('animate-in');
      }
    };
    if (overlay) {
      // read CSS transition duration (fallback to 450ms)
      const cssDur = getComputedStyle(document.documentElement).getPropertyValue('--page-transition-duration') || '450ms';
      const ms = parseFloat(cssDur) * (cssDur.includes('ms') ? 1 : 1000);
      const lead = Math.max(80, Math.round(ms * 0.55)); // start switch slightly after overlay in
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';
      setTimeout(() => { switchPage(); overlay.style.opacity = '0'; overlay.style.pointerEvents = 'none'; }, lead);
    } else {
      switchPage();
    }
    // Update nav active
    $$(".nav-link").forEach((a) => a.classList.toggle("active", a.getAttribute("data-section") === sectionId));
    // Section-specific init
    if (sectionId === "events") Events.load();
    // Smooth scroll to section (native)
    const el = byId(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); // MDN
  },
};

// ---------------------------- Carousel ----------------------------
const Carousel = {
  i: 0,
  t: null,
  init() {
    const c = byId("hero-carousel");
    const cap = byId("slide-caption");
    const ind = byId("carousel-indicators");
    if (!c || !cap || !ind) return;

    c.innerHTML = "";
    ind.innerHTML = "";
    // Filter valid images (having a URL)
    const validImages = (appData.carouselImages || []).filter((img) => img && img.url);
    if (!validImages.length) {
      // Greeting fallback slide
      const s = document.createElement("div");
      s.className = "slide active greeting";
      s.style.background = "linear-gradient(135deg,#f8fafc,#eef2ff)";
      s.style.display = "flex";
      s.style.alignItems = "center";
      s.style.justifyContent = "center";
      s.innerHTML = `<div style="text-align:center;padding:2rem"><h1 style="margin:0;color:#0f172a">Welcome to Mallakhamb Association of Punjab</h1><p style="margin:.5rem 0;color:#334155">Explore events, notices and our legacy.</p></div>`;
      c.appendChild(s);
      // No indicators for single greeting
      cap.innerHTML = `<h1>Welcome</h1><p>Discover Mallakhamb in Punjab</p>`;
      // Ensure autoplay is stopped
      this.stop();
      return;
    }

    validImages.forEach((img, idx) => {
      const s = document.createElement("div");
      s.className = "slide" + (idx === 0 ? " active" : "");
      s.style.backgroundImage = `url(${img.url})`;
      c.appendChild(s);

      const dot = document.createElement("div");
      dot.className = "indicator" + (idx === 0 ? " active" : "");
      dot.addEventListener("click", () => this.go(idx));
      ind.appendChild(dot);
    });
    this.updateCaption();

    const prev = byId("carousel-prev");
    const next = byId("carousel-next");
    prev && prev.addEventListener("click", () => this.go((this.i - 1 + appData.carouselImages.length) % appData.carouselImages.length));
    next && next.addEventListener("click", () => this.go((this.i + 1) % appData.carouselImages.length));

    this.play();
  },
  go(n) {
    const slides = $$(".slide");
    const dots = $$(".indicator");
    slides[this.i]?.classList.remove("active");
    dots[this.i]?.classList.remove("active");
    this.i = n;
    slides[this.i]?.classList.add("active");
    dots[this.i]?.classList.add("active");
    this.updateCaption();
  },
  updateCaption() {
    const cap = byId("slide-caption");
    const item = appData.carouselImages[this.i];
    if (cap && item) cap.innerHTML = `<h1>${item.title}</h1><p>${item.subtitle}</p>`;
  },
  play() {
    this.stop();
    this.t = setInterval(() => this.go((this.i + 1) % appData.carouselImages.length), 5000);
  },
  stop() {
    if (this.t) clearInterval(this.t);
    this.t = null;
  },
};

// ---------------------------- Notice Ticker (requestAnimationFrame) ----------------------------
const Ticker = {
  speed: 60, // px/s
  x: 0,
  last: 0,
  track1: null,
  track2: null,
  init() {
    this.track1 = byId("ticker-track");
    this.track2 = byId("ticker-track-2");
    if (!this.track1 || !this.track2) return;
    const items = this.buildItems();
    this.track1.innerHTML = items;
    this.track2.innerHTML = items;
    this.x = 0;
    this.last = performance.now();
    requestAnimationFrame(this.step.bind(this));
  },
  buildItems() {
    const active = appData.notices.filter((n) => !isExpired(n.expiryDate));
    if (!active.length) return `<span class="item">📢 Welcome to Mallakhamb Association of Punjab</span>`;
    return active
      .map((n) => {
        const badge =
          n.priority === "high" ? `<span class="badge high">High</span>` :
          n.priority === "medium" ? `<span class="badge medium">Med</span>` :
          `<span class="badge low">Low</span>`;
        return `<span class="item">${badge} ${n.title} — ${n.content}</span>`;
      })
      .join("");
  },
  step(now) {
    const dt = (now - this.last) / 1000; // seconds
    this.last = now;
    const w = this.track1.scrollWidth;
    this.x -= this.speed * dt;
    if (-this.x >= w) this.x += w; // loop
    const tx = `translateX(${this.x}px)`;
    this.track1.style.transform = tx;
    this.track2.style.transform = `translateX(${this.x + w}px)`;
    requestAnimationFrame(this.step.bind(this));
  },
};

// ---------------------------- Members ----------------------------
const Members = {
  load() {
    const grid = byId("members-grid");
    if (!grid) return;
    grid.innerHTML = "";
    appData.members.forEach((m) => {
      const el = document.createElement("div");
      el.className = "member-card reveal";
  const imgSrc = m.image || svgPlaceholder(m.name, { w: 90, h: 115 });
  const imgHtml = `<img class="member-img" src="${imgSrc}" alt="${m.name}">`;
      el.innerHTML = `
        ${imgHtml}
        <div class="member-info">
          <h4>${m.name}</h4>
          <p>${m.designation}</p>
          ${m.phone ? `<p>📞 ${m.phone}</p>` : ""}
          ${m.email ? `<p>✉️ ${m.email}</p>` : ""}
        </div>
      `;
      grid.appendChild(el);
    });

    const mission = byId("mission-text");
    const vision = byId("vision-text");
    const estd = byId("estd-text");
    mission && (mission.textContent = appData.organizationInfo.mission);
    vision && (vision.textContent = appData.organizationInfo.vision);
    estd && (estd.textContent = `Established in ${appData.organizationInfo.established}`);
  },
};

// ---------------------------- About (Achievements, Players, Galleries) ----------------------------
const About = {
  load() {
    // Achievements
    const ag = byId("achievements-grid");
    if (ag) {
      ag.innerHTML = appData.achievements
        .map((a) => {
          const imgSrc = a.image || svgPlaceholder(a.title, { w: 420, h: 180 });
          const img = `<img src="${imgSrc}" alt="${a.title}" class="achievement-image" loading="lazy" />`;
          return `
          <div class="achievement-card reveal">
            ${img}
            <div class="achievement-year">${a.year}</div>
            <h3 class="achievement-title">${a.title}</h3>
            <p class="achievement-description">${a.description}</p>
          </div>`;
        })
        .join("");
    }

    // Players
    const pg = byId("players-grid");
    if (pg) {
      pg.innerHTML = appData.players
        .map((p) => {
          const imgSrc = p.image || svgPlaceholder(p.name, { w: 120, h: 150 });
          const img = `<img src="${imgSrc}" alt="${p.name}" class="player-image" loading="lazy" />`;
          return `
          <div class="player-card reveal">
            ${img}
            <div class="player-info">
              <h3>${p.name}</h3>
              <span class="player-category">${p.category} • Age ${p.age}</span>
              <p><strong>Coach:</strong> ${p.coach}</p>
              <p><strong>Hometown:</strong> ${p.hometown}</p>
              <div class="player-achievements">
                <h4>🏆 Major Achievements</h4>
                <ul class="achievements-list">${p.achievements.map((x) => `<li>${x}</li>`).join("")}</ul>
                ${p.records?.length ? `<h4>📊 Records</h4><ul class="achievements-list">${p.records.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}
              </div>
            </div>
          </div>`;
        })
        .join("");
    }

    // Galleries
    const gg = byId("galleries-grid");
    if (gg) {
      gg.innerHTML = appData.eventGalleries
        .map((g) => {
          const imgSrc = g.coverImage || svgPlaceholder(g.eventName, { w: 420, h: 220 });
          const img = `<img src="${imgSrc}" class="gallery-cover" alt="${g.eventName}" onclick="openGallery(${g.id})" />`;
          return `
          <div class="gallery-card reveal">
            ${img}
            <div class="gallery-info">
              <h3 class="gallery-title">${g.eventName}</h3>
              <p class="gallery-date">${fmt(g.date)}</p>
              <p class="gallery-description">${g.description}</p>
              <button class="btn btn-ghost view-gallery-btn" onclick="openGallery(${g.id})">View Gallery (${g.images.length} photos)</button>
            </div>
          </div>`;
        })
        .join("");
    }
  },
};

// Lightbox helpers
let currentGallery = null;
let currentImageIndex = 0;
function openGallery(id) {
  currentGallery = appData.eventGalleries.find((g) => g.id === id);
  currentImageIndex = 0;
  showModalImage();
}
function showModalImage() {
  const modal = byId("imageModal");
  const modalImg = byId("modalImage");
  const caption = byId("modalCaption");
  if (!currentGallery) return;
  modal.style.display = "block";
  modalImg.src = currentGallery.images[currentImageIndex].url;
  caption.textContent = currentGallery.images[currentImageIndex].caption;
}
function changeImage(dir) {
  if (!currentGallery) return;
  currentImageIndex = (currentImageIndex + dir + currentGallery.images.length) % currentGallery.images.length;
  showModalImage();
}
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".modal .close");
  const modal = byId("imageModal");
  closeBtn && (closeBtn.onclick = () => (modal.style.display = "none"));
  modal && (modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; });
});
window.openGallery = openGallery;
window.changeImage = changeImage;

// ---------------------------- Events & Notices ----------------------------
const Events = {
  currentFilter: "all",
  load() {
    this.bindFilters();
    this.render();
  },
  bindFilters() {
    $$(".filter-btn").forEach((b) =>
      b.addEventListener("click", () => {
        $$(".filter-btn").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        this.currentFilter = b.dataset.filter;
        this.render();
      })
    );
  },
  merged() {
    const items = [];
    // Only include non-expired events
    appData.events.filter((e) => !isExpired(e.expiryDate)).forEach((e) => items.push({ itemType: "event", ...e }));
    // Only include non-expired notices
    appData.notices.filter((n) => !isExpired(n.expiryDate)).forEach((n) => items.push({ itemType: "notice", ...n }));
  return items.sort((a, b) => parseDateForSort(a.date) - parseDateForSort(b.date));
  },
  render() {
    const grid = byId("events-list");
    if (!grid) return;
    grid.innerHTML = "";
    const items = this.merged().filter((it) => this.currentFilter === "all" || it.itemType === this.currentFilter);
    if (!items.length) {
      grid.innerHTML = `<div class="card">No items found for the selected filter.</div>`;
      return;
    }
    items.forEach((item) => grid.appendChild(this.card(item)));
  },
  card(item) {
    const el = document.createElement("div");
    // Determine priority class
    let priority = item.priority || "low";
    let priorityClass = `priority-${priority}`;
    if (item.itemType === "event") {
      // Optionally, allow events to have a priority property, else default to low
      el.className = `card event-card ${priorityClass}`;
  const desc = item.description ? `<div class="event-description">${item.description}</div>` : "";
  const categories = item.categories?.length ? `<div class="event-categories">${item.categories.map((c) => `<span class="category-tag">${c}</span>`).join("")}</div>` : "";
  const reg = item.registrationDeadline ? `<div class="meta">Registration Deadline: ${fmt(item.registrationDeadline)}</div>` : "";
  const venueBlock = item.venue ? `<div class="event-meta"><div class="event-meta-header">Location</div><div class="event-venue">📍 ${item.venue}</div></div>` : "";
  const categoriesBlock = item.categories?.length ? `<div class="event-meta"><div class="event-meta-header">Categories</div>${categories}</div>` : "";
      el.innerHTML = `
        <div class="meta notice-chip">Event</div>
        <h3 class="event-title">${item.title}</h3>
        <div class="meta">📅 ${fmt(item.date)}</div>
        ${venueBlock}
        ${desc}
        ${categoriesBlock}
        ${reg}
      `;
    } else {
      el.className = `card notice-card ${priorityClass}`;
      el.innerHTML = `
        <div class="meta notice-chip">Notice</div>
        <h3 class="notice-title">${item.title}</h3>
        <div class="notice-date">📅 ${fmt(item.date)} • Valid until: ${fmt(item.expiryDate)}</div>
        <div class="notice-content">${item.content}</div>
        ${item.pdfUrl ? `<button class="btn btn-ghost download-btn" onclick="downloadPDF('${item.pdfUrl}','${item.pdfFilename || 'Notice.pdf'}')">Download PDF</button>` : ""}
      `;
    }
    return el;
  },
};

// ---------------------------- Scroll Reveal (IntersectionObserver) ----------------------------
function initScrollReveal() {
  const targets = $$(".reveal");
  if (!targets.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in-view");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  targets.forEach((t) => io.observe(t));
}

// ---------------------------- Contact Form ----------------------------
const ContactForm = {
  init() {
    const form = byId("contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      // Basic client-side validation before native submit
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
      };
      if (!data.name || !data.email || !data.subject || !data.message) {
        e.preventDefault();
        alert("Please fill in all fields.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        return;
      }
      // If valid, allow native form submission to Formspree
    });

    // Secretary profile
    const sec = byId("sec-profile");
    if (sec) {
      const gs = appData.members.find((m) => m.designation.toLowerCase().includes("general secretary"));
      if (gs) {
  const imgSrc = gs.image || svgPlaceholder(gs.name, { w: 120, h: 150 });
  const img = `<img src="${imgSrc}" alt="${gs.name}">`;
        sec.innerHTML = `
          ${img}
          <div>
            <p><strong>${gs.name}</strong></p>
            <p>${gs.designation}</p>
            ${gs.phone ? `<p>📞 ${gs.phone}</p>` : ""}
            ${gs.email ? `<p>✉️ ${gs.email}</p>` : ""}
          </div>
        `;
      }
    }
  },
};

// ---------------------------- App Init ----------------------------
function initYear() {
  const y = byId("year");
  if (y) y.textContent = 2018;
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  Navigation.init();
  Carousel.init();
  Ticker.init();           // Smooth ticker
  Members.load();
  About.load();
  Events.load();
  ContactForm.init();
  initScrollReveal();      // IntersectionObserver reveals
});
