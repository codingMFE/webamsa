const navbar = document.getElementById("navbar");
const links = document.querySelectorAll(".nav-link");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

/* NAVBAR: background + menu aktif, digabung dalam 1 fungsi */
const navSections = Array.from(document.querySelectorAll("section[id]"))
  .filter(sec => document.querySelector('.nav-link[href="#' + sec.id + '"]'));

function updateNavbar() {
  // background muncul setelah scroll sedikit
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // menu aktif sesuai section yang sedang dilihat
  let current = navSections.length ? navSections[0].id : "";
  navSections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });

  // kalau sudah di paling bawah halaman, aktifkan menu terakhir
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
    current = navSections[navSections.length - 1].id;
  }

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

let navTicking = false;
window.addEventListener("scroll", () => {
  if (navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => {
    updateNavbar();
    navTicking = false;
  });
}, { passive: true });

/* SMOOTH SCROLL */
links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth"
    });

    closeMenu();
  });
});

/* HAMBURGER TOGGLE */
function openMenu() {
  hamburger.classList.add("active");
  navMenu.classList.add("active");
  navbar.classList.add("menu-open");
  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "Close menu");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  navbar.classList.remove("menu-open");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Open menu");
}

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.contains("active") ? closeMenu() : openMenu();
});

/* tutup menu kalau klik di luar menu atau tekan Esc */
document.addEventListener("click", (e) => {
  if (navMenu.classList.contains("active") && !navMenu.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

/* kalau layar dibesarkan lagi, reset menu */
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

/* KONDISI AWAL (juga benar kalau halaman di-refresh di tengah) */
updateNavbar();

const mainText = "AMSA-Muhammadiyah Palembang";
const loopWords = ["Knowledge", "Action", "Friendship"];

const img = document.querySelector(".home-image img");
const fadeTop = document.querySelector(".fade-top");

const mainEl = document.getElementById("typing-main");
const loopEl = document.getElementById("typing-loop");

let i = 0;
let j = 0;
let k = 0;
let deleting = false;

/* START ON LOAD */
window.addEventListener("load", () => {

  // IMAGE ANIMATION
  setTimeout(() => {
    img.style.transition = "1s ease";
    img.style.opacity = "1";
    img.style.transform = "translateX(0)";
    setTimeout(() => img.parentElement.classList.add("floating"), 1000);
  }, 200);

  // deskripsi, tombol & info muncul menyusul
  setTimeout(() => document.getElementById("home").classList.add("ready"), 1500);

  // TEXT 1
  setTimeout(() => {
    fadeTop.style.transition = "1s ease";
    fadeTop.style.opacity = "1";
    fadeTop.style.transform = "translateY(0)";
  }, 400);

  // MAIN TYPING
  setTimeout(typeMain, 1000);

});

/* MAIN TYPING */
function typeMain() {
  if (i < mainText.length) {
    mainEl.innerHTML =
      mainText.substring(0, i + 1) +
      '<span class="cursor">|</span>';

    i++;
    setTimeout(typeMain, 90);
  } else {
    mainEl.textContent = mainText;   // hapus kursor judul utama
    setTimeout(typeLoop, 600);
  }
}

/* LOOP TYPING */
function typeLoop() {
  const word = loopWords[j];

  // tambah / kurangi 1 huruf
  k += deleting ? -1 : 1;
  loopEl.innerHTML = word.substring(0, k) + '<span class="cursor">|</span>';

  let speed = deleting ? 55 : 110;

  if (!deleting && k === word.length) {
    speed = 1400;          // jeda saat kata sudah lengkap
    deleting = true;
  } else if (deleting && k === 0) {
    speed = 350;           // jeda sebelum kata berikutnya
    deleting = false;
    j = (j + 1) % loopWords.length;
  }

  setTimeout(typeLoop, speed);
}

const elements = document.querySelectorAll(".animate, .fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

const impactCards = document.querySelectorAll(".impact-card");

const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

impactCards.forEach(card => {
  observer2.observe(card);
});

document.addEventListener("DOMContentLoaded", function () {

  const difSection = document.querySelector(".difcount");

  if (!difSection) return; // biar ga error

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startDifcountAnimation();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(difSection);

  function startDifcountAnimation() {

    difSection.classList.add("is-visible");

    // ANGKA: naik pelan dalam 2,5 detik, melambat di akhir (ease-out)
    const numbers = difSection.querySelectorAll(".difcount-number");
    const durasi = 2500;

    numbers.forEach((num, i) => {
      const target = +num.getAttribute("data-target");
      const mulai = performance.now() + i * 200;   // kartu berikutnya menyusul sedikit

      const update = (now) => {
        const t = Math.min(Math.max((now - mulai) / durasi, 0), 1);
        const ease = 1 - Math.pow(1 - t, 3);
        num.innerText = Math.round(target * ease);
        const bar = num.closest(".stat-card")?.querySelector(".stat-bar span");
        if (bar) bar.style.width = (ease * 100) + "%";
        if (t < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    });
  }

});


const eventContainer = document.querySelector(".event-container");
const nextBtn = document.querySelector(".event-btn.next");
const prevBtn = document.querySelector(".event-btn.prev");

let isDown = false;
let startX;
let scrollLeft;
let autoSlide;

/* jarak 1 langkah = lebar 1 kartu + jarak antar kartu */
function slideStep(container) {
  const card = container.firstElementChild;
  if (!card) return 0;
  const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
}

/* DRAG pakai mouse (desktop) */
function endDrag() {
  isDown = false;
  eventContainer.classList.remove("active");
  eventContainer.style.scrollSnapType = "";   // aktifkan snap lagi
}

eventContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  eventContainer.classList.add("active");
  eventContainer.style.scrollSnapType = "none"; // snap dimatikan saat drag
  startX = e.pageX - eventContainer.offsetLeft;
  scrollLeft = eventContainer.scrollLeft;
});

eventContainer.addEventListener("mouseleave", endDrag);
eventContainer.addEventListener("mouseup", endDrag);

eventContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - eventContainer.offsetLeft;
  const walk = (x - startX) * 2;
  eventContainer.scrollLeft = scrollLeft - walk;
});

/* BUTTON */
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    eventContainer.scrollBy({ left: slideStep(eventContainer), behavior: "smooth" });
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    eventContainer.scrollBy({ left: -slideStep(eventContainer), behavior: "smooth" });
  });
}

/* AUTO SLIDE (hanya jalan kalau kartunya memang bisa digeser) */
function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(() => {
    const max = eventContainer.scrollWidth - eventContainer.clientWidth;
    if (max <= 5) return;

    if (eventContainer.scrollLeft >= max - 10) {
      eventContainer.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      eventContainer.scrollBy({ left: slideStep(eventContainer), behavior: "smooth" });
    }
  }, 3500);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

eventContainer.addEventListener("mouseenter", stopAutoSlide);
eventContainer.addEventListener("mouseleave", startAutoSlide);

/* di HP: berhenti saat disentuh, lanjut lagi setelah dilepas */
eventContainer.addEventListener("touchstart", stopAutoSlide, { passive: true });
eventContainer.addEventListener("touchend", () => {
  setTimeout(() => {
    if (!eventContainer.querySelector(".event-card.ev-rich.active")) startAutoSlide();
  }, 2000);
}, { passive: true });

startAutoSlide();

/* TITIK PENANDA SLIDE (Division & Event, tampil di HP saja) */
function makeDots(container) {
  if (!container) return;
  const items = Array.from(container.children);
  if (items.length < 2) return;

  const dots = document.createElement("div");
  dots.className = "slider-dots";

  items.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Slide " + (index + 1));
    dot.addEventListener("click", () => {
      container.scrollTo({ left: index * slideStep(container), behavior: "smooth" });
    });
    dots.appendChild(dot);
  });

  container.insertAdjacentElement("afterend", dots);

  const update = () => {
    const step = slideStep(container) || 1;
    const active = Math.round(container.scrollLeft / step);
    dots.querySelectorAll("button").forEach((d, i) => {
      d.classList.toggle("active", i === active);
    });
  };

  container.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  window.addEventListener("resize", update);
  update();
}

makeDots(document.querySelector(".division-wrapper"));
makeDots(eventContainer);

const joinText = document.querySelector('.join-text');

if (joinText) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        joinText.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(joinText);
}






/* =========================================================
   OUR TEAM: animasi muncul, efek 3D + cahaya kursor, lightbox
========================================================= */
(function () {
  const photo = document.getElementById("teamPhoto");
  const lightbox = document.getElementById("teamLightbox");
  const closeBtn = document.getElementById("lightboxClose");
  const scroller = document.getElementById("lightboxScroller");
  if (!photo || !lightbox) return;

  const inner = photo.querySelector(".team-photo-inner");

  /* muncul saat discroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        photo.classList.add("in-view");
        io.unobserve(photo);
        // setelah animasi muncul selesai, efek miring dibuat lebih responsif
        setTimeout(() => photo.classList.add("ready"), 1300);
      }
    });
  }, { threshold: 0.25 });
  io.observe(photo);

  /* efek miring 3D + cahaya mengikuti kursor (hanya untuk mouse) */
  const canHover = window.matchMedia("(hover: hover)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canHover && !reduceMotion) {
    photo.addEventListener("mousemove", (e) => {
      const r = inner.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;   // 0 - 1
      const py = (e.clientY - r.top) / r.height;   // 0 - 1
      photo.style.setProperty("--x", (px * 100) + "%");
      photo.style.setProperty("--y", (py * 100) + "%");
      photo.style.setProperty("--ry", ((px - 0.5) * 6) + "deg");
      photo.style.setProperty("--rx", ((0.5 - py) * 6) + "deg");
    });

    photo.addEventListener("mouseleave", () => {
      photo.style.setProperty("--rx", "0deg");
      photo.style.setProperty("--ry", "0deg");
    });
  }

  /* LIGHTBOX */
  function openLightbox() {
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // di HP: mulai dari tengah foto
    requestAnimationFrame(() => {
      scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;
    });
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    photo.focus();
  }

  photo.addEventListener("click", openLightbox);
  photo.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox();
    }
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();   // klik area gelap
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
})();


/* SUB-MENU DIVISI DI NAVBAR */
document.querySelectorAll(".nav-sub").forEach((sub) => {
  const btn = sub.querySelector(".sub-toggle");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const buka = !sub.classList.contains("open");
    sub.classList.toggle("open", buka);
    btn.setAttribute("aria-expanded", buka ? "true" : "false");
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".nav-sub.open").forEach((sub) => {
    if (!sub.contains(e.target)) {
      sub.classList.remove("open");
      sub.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
    }
  });
});


/* =========================================================
   KARTU EVENT: ketuk di HP untuk membuka detail
========================================================= */
document.querySelectorAll(".event-card.ev-rich").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (window.matchMedia("(hover: hover)").matches) return;
    if (e.target.closest(".ev-div-logo") && card.classList.contains("active")) return; // biarkan link logo jalan
    e.preventDefault();
    const buka = !card.classList.contains("active");
    document.querySelectorAll(".event-card.ev-rich.active").forEach((c) => c.classList.remove("active"));
    card.classList.toggle("active", buka);
    if (buka) stopAutoSlide();
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("active");
    }
  });
});

/* tutup detail kalau ketuk di luar kartu atau kartu digeser */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".event-card.ev-rich")) {
    document.querySelectorAll(".event-card.ev-rich.active").forEach((c) => c.classList.remove("active"));
  }
});

if (eventContainer) {
  eventContainer.addEventListener("scroll", () => {
    const aktif = eventContainer.querySelector(".event-card.ev-rich.active");
    if (!aktif) return;
    const r = aktif.getBoundingClientRect();
    const c = eventContainer.getBoundingClientRect();
    if (r.right < c.left + 40 || r.left > c.right - 40) aktif.classList.remove("active");
  }, { passive: true });
}


/* =========================================================
   OUR DIVISIONS: ketuk sekali untuk membalik kartu (HP),
   ketuk lagi untuk membuka halaman divisi
========================================================= */
document.querySelectorAll(".div-flip").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (window.matchMedia("(hover: hover)").matches) return;   // laptop: langsung buka
    if (!card.classList.contains("flipped")) {
      e.preventDefault();
      document.querySelectorAll(".div-flip.flipped").forEach((c) => c.classList.remove("flipped"));
      card.classList.add("flipped");
    }
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".div-flip")) {
    document.querySelectorAll(".div-flip.flipped").forEach((c) => c.classList.remove("flipped"));
  }
});


/* STATISTIK: ketuk kartu di HP untuk menyalakan bingkai */
document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (window.matchMedia("(hover: hover)").matches) return;
    const on = !card.classList.contains("lifted");
    document.querySelectorAll(".stat-card.lifted").forEach((c) => c.classList.remove("lifted"));
    card.classList.toggle("lifted", on);
  });
});


/* ABOUT: ketuk foto Representative di HP */
const leaderStage = document.getElementById("leaderStage");
if (leaderStage) {
  leaderStage.addEventListener("click", () => {
    if (!window.matchMedia("(hover: hover)").matches) leaderStage.classList.toggle("active");
  });
  leaderStage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); leaderStage.classList.toggle("active"); }
  });
}


/* =========================================================
   OUR TEAM: SLIDER FOTO (otomatis + tombol + penanda)
========================================================= */
(function () {
  const wrap = document.getElementById("teamSlides");
  if (!wrap) return;

  const photo   = document.getElementById("teamPhoto");
  const slides  = Array.from(wrap.querySelectorAll(".team-slide"));
  const dotsBox = document.getElementById("teamDots");
  const cur     = document.getElementById("teamCur");
  const total   = document.getElementById("teamTotal");
  const caption = document.getElementById("teamCaption");
  const lbImg   = document.getElementById("teamLightboxImg");
  const DUR = 6000;                       // lama tiap foto (ms)

  let index = 0;
  let timer = null;
  let sisa = DUR;
  let mulai = 0;
  let jeda = false;

  dotsBox.style.setProperty("--team-dur", DUR + "ms");
  total.textContent = String(slides.length).padStart(2, "0");

  /* buat titik penanda */
  const dots = slides.map((sl, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "team-dot";
    d.setAttribute("aria-label", "Photo " + (i + 1));
    d.innerHTML = "<i></i>";
    d.addEventListener("click", () => go(i, i > index ? 1 : -1));
    dotsBox.appendChild(d);
    return d;
  });

  function restartDot() {
    dots.forEach((d) => d.classList.remove("active"));
    const d = dots[index];
    void d.offsetWidth;                  // ulang animasi isi titik
    d.classList.add("active");
  }

  function go(n, arah) {
    if (n === index) return;
    const lama = slides[index];
    index = (n + slides.length) % slides.length;
    const baru = slides[index];

    // lingkaran terbuka dari sisi arah geser
    baru.style.setProperty("--cx", arah < 0 ? "0%" : "100%");

    slides.forEach((sl) => sl.classList.remove("is-leaving"));
    lama.classList.remove("is-active");
    lama.classList.add("is-leaving");
    void baru.offsetWidth;
    baru.classList.add("is-active");
    setTimeout(() => lama.classList.remove("is-leaving"), 1300);

    cur.textContent = String(index + 1).padStart(2, "0");
    cur.classList.remove("flip"); void cur.offsetWidth; cur.classList.add("flip");

    if (caption) {
      caption.textContent = baru.dataset.caption || caption.textContent;
      caption.classList.remove("swap"); void caption.offsetWidth; caption.classList.add("swap");
    }
    if (lbImg) lbImg.src = baru.src;

    restartDot();
    jadwal(DUR);
  }

  function jadwal(ms) {
    clearTimeout(timer);
    sisa = ms;
    mulai = Date.now();
    if (!jeda) timer = setTimeout(() => go(index + 1, 1), ms);
  }

  function pause() {
    if (jeda) return;
    jeda = true;
    clearTimeout(timer);
    sisa -= Date.now() - mulai;
    dotsBox.classList.add("paused");
  }

  function resume() {
    if (!jeda) return;
    jeda = false;
    dotsBox.classList.remove("paused");
    mulai = Date.now();
    timer = setTimeout(() => go(index + 1, 1), Math.max(sisa, 300));
  }

  /* tombol kiri/kanan (tidak membuka layar penuh) */
  photo.querySelectorAll(".team-nav").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.add("bump");
      setTimeout(() => btn.classList.remove("bump"), 300);
      go(index + (btn.classList.contains("next") ? 1 : -1), btn.classList.contains("next") ? 1 : -1);
    });
  });

  /* berhenti sebentar saat kursor di atas foto */
  photo.addEventListener("mouseenter", () => { if (window.matchMedia("(hover: hover)").matches) pause(); });
  photo.addEventListener("mouseleave", () => { if (window.matchMedia("(hover: hover)").matches) resume(); });

  /* geser jari di HP */
  let x0 = null;
  wrap.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) {
      photo.dataset.swiped = "1";                  // cegah terbuka layar penuh
      setTimeout(() => delete photo.dataset.swiped, 400);
      go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }
    x0 = null;
  }, { passive: true });

  photo.addEventListener("click", (e) => {
    if (photo.dataset.swiped) e.stopImmediatePropagation();
  }, true);

  /* berhenti saat layar penuh terbuka / tab tidak aktif */
  const lb = document.getElementById("teamLightbox");
  if (lb) new MutationObserver(() => lb.classList.contains("open") ? pause() : resume())
    .observe(lb, { attributes: true, attributeFilter: ["class"] });

  document.addEventListener("visibilitychange", () => document.hidden ? pause() : resume());

  /* mulai setelah section terlihat */
  const obs = new IntersectionObserver((en) => {
    if (en[0].isIntersecting) {
      restartDot();
      jadwal(DUR + 1400);                           // beri waktu animasi tirai
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(photo);
})();


/* =========================================================
   NAVBAR: tombol Join Us + garis progres scroll
========================================================= */
(function () {
  const cta = document.querySelector(".nav-cta");
  if (cta) cta.addEventListener("click", () => closeMenu());

  const bar = document.getElementById("navProgress");
  if (!bar) return;
  let jalan = false;
  function isi() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
    jalan = false;
  }
  window.addEventListener("scroll", () => {
    if (!jalan) { jalan = true; requestAnimationFrame(isi); }
  }, { passive: true });
  window.addEventListener("resize", isi);
  isi();
})();

/* =========================================================
   SECTION VIDEO
   - video diputar otomatis (tanpa suara) saat mendekati layar
   - suara naik pelan saat section video terlihat,
     lalu turun pelan (fade) saat di-scroll menjauh
   - browser hanya mengizinkan suara setelah pengunjung pernah
     klik / tap / tekan tombol di halaman; kalau belum, muncul
     tombol "Tap to turn on sound"
========================================================= */
(function () {
  const video = document.getElementById("amsaVideo");
  const stage = document.getElementById("vidStage");
  if (!video || !stage) return;

  const frame = stage.querySelector(".vid-frame");
  const btnPlay = document.getElementById("vidPlay");
  const btnSound = document.getElementById("vidSound");
  const btnFull = document.getElementById("vidFull");
  const btnTap = document.getElementById("vidTap");
  const bar = document.getElementById("vidProgress");
  const fill = document.getElementById("vidFill");
  const timeEl = document.getElementById("vidTime");

  const MAX_VOL = 1;        // volume maksimal (0 - 1)
  let vol = 0;              // volume saat ini (dihaluskan)
  let wantSound = true;     // pengunjung mau suara? (bisa dimatikan lewat tombol)
  let userPaused = false;   // pengunjung menekan pause sendiri
  let unlocked = !!(navigator.userActivation && navigator.userActivation.hasBeenActive);
  let adaVideo = true;

  // iPhone/iPad tidak mengizinkan volume diatur lewat kode -> pakai mute saja
  video.volume = 0.5;
  const volBisaDiatur = Math.abs(video.volume - 0.5) < 0.01;
  video.volume = 0;
  video.muted = true;

  /* ---------- video belum ada ---------- */
  function tandaiKosong() {
    adaVideo = false;
    stage.classList.add("no-video");
  }
  const src = video.querySelector("source");
  if (src) src.addEventListener("error", tandaiKosong);
  video.addEventListener("error", tandaiKosong);
  if (video.networkState === 3) tandaiKosong();

  /* ---------- izin suara dari browser ---------- */
  function buka() { unlocked = true; }
  ["pointerdown", "keydown", "touchend"].forEach((ev) =>
    window.addEventListener(ev, buka, { capture: true, passive: true })
  );

  /* ---------- seberapa banyak video terlihat (0 - 1) ---------- */
  function terlihat() {
    if (document.fullscreenElement || document.webkitFullscreenElement) return 1;
    const r = frame.getBoundingClientRect();
    const vh = window.innerHeight;
    const atas = Math.max(r.top, 0);
    const bawah = Math.min(r.bottom, vh);
    const tampak = Math.max(0, bawah - atas);
    return Math.min(1, tampak / Math.min(r.height, vh));
  }

  /* kurva halus: suara mulai muncul saat 30% video terlihat, penuh saat 80% */
  function targetVolume(v) {
    const t = Math.min(1, Math.max(0, (v - 0.3) / 0.5));
    return t * t * (3 - 2 * t) * MAX_VOL;
  }

  function mainkan() {
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  }

  /* ---------- loop utama (jalan terus, ringan) ---------- */
  let loop = function () {
    requestAnimationFrame(loop);
    if (!adaVideo) return;

    const v = terlihat();

    // putar / hentikan otomatis
    if (v > 0.05 && video.paused && !userPaused) mainkan();
    if (v === 0 && vol < 0.01 && !video.paused) video.pause();

    // hitung target suara
    let target = wantSound ? targetVolume(v) : 0;
    const bolehBersuara = unlocked && !video.paused;
    stage.classList.toggle("need-tap", wantSound && !unlocked && v > 0.5 && !video.paused);
    if (!bolehBersuara) target = 0;

    // fade: naik sedikit lebih cepat, turun lebih pelan
    const kecepatan = target > vol ? 0.03 : 0.025;
    vol += (target - vol) * kecepatan;
    if (Math.abs(target - vol) < 0.002) vol = target;

    if (vol > 0.005) {
      if (video.muted) video.muted = false;
      if (volBisaDiatur) video.volume = Math.min(1, vol);
    } else if (!video.muted) {
      video.muted = true;
    }
    // iPhone: tanpa fade, cukup nyala/mati
    if (!volBisaDiatur) video.muted = vol < 0.4;

    const bersuara = !video.muted && target > 0;
    stage.classList.toggle("is-loud", bersuara);
    btnSound.setAttribute("aria-label", bersuara ? "Turn sound off" : "Turn sound on");
  };
  /* loop hanya jalan saat section video dekat layar (hemat baterai) */
  let dekat = false, jalanLoop = false;
  const loopAsli = loop;
  loop = function () {
    if (!dekat && vol < 0.005 && video.paused) { jalanLoop = false; return; }
    loopAsli();
  };
  function mulaiLoop() {
    if (!jalanLoop) { jalanLoop = true; requestAnimationFrame(loop); }
  }
  new IntersectionObserver((es) => {
    dekat = es[0].isIntersecting;
    if (dekat) mulaiLoop();
  }, { rootMargin: "300px 0px" }).observe(stage);

  /* ---------- tombol ---------- */
  btnTap.addEventListener("click", () => {
    unlocked = true;
    wantSound = true;
  });

  btnSound.addEventListener("click", () => {
    unlocked = true;
    wantSound = !(wantSound && !video.muted);   // sedang bersuara -> matikan, sedang diam -> nyalakan
  });

  btnPlay.addEventListener("click", () => {
    if (video.paused) { userPaused = false; mainkan(); }
    else { userPaused = true; video.pause(); }
  });

  video.addEventListener("click", () => btnPlay.click());

  function syncPlay() {
    stage.classList.toggle("is-paused", video.paused);
    btnPlay.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
  }
  video.addEventListener("play", syncPlay);
  video.addEventListener("pause", syncPlay);
  syncPlay();

  btnFull.addEventListener("click", () => {
    if (document.fullscreenElement) return document.exitFullscreen();
    if (frame.requestFullscreen) frame.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });

  /* ---------- progress & waktu ---------- */
  function fmt(d) {
    if (!isFinite(d)) return "0:00";
    const m = Math.floor(d / 60), s = Math.floor(d % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  video.addEventListener("timeupdate", () => {
    const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    fill.style.width = pct + "%";
    bar.setAttribute("aria-valuenow", Math.round(pct));
    timeEl.textContent = fmt(video.currentTime);
  });

  function geser(e) {
    const r = bar.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const t = Math.min(1, Math.max(0, x / r.width));
    if (video.duration) video.currentTime = t * video.duration;
  }

  let seret = false;
  bar.addEventListener("pointerdown", (e) => { seret = true; bar.setPointerCapture(e.pointerId); geser(e); });
  bar.addEventListener("pointermove", (e) => { if (seret) geser(e); });
  bar.addEventListener("pointerup", () => { seret = false; });
  bar.addEventListener("keydown", (e) => {
    if (!video.duration) return;
    if (e.key === "ArrowRight") video.currentTime = Math.min(video.duration, video.currentTime + 5);
    if (e.key === "ArrowLeft") video.currentTime = Math.max(0, video.currentTime - 5);
  });
})();

/* =========================================================
   SECTION TIM NASIONAL: confetti, tap di HP, foto cadangan
========================================================= */
(function () {
  const sec = document.getElementById("national");
  if (!sec) return;

  // foto belum ada -> siluet
  const SILUET =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ffc2d9"/><stop offset="1" stop-color="#b36bff"/></linearGradient></defs>' +
        '<circle cx="200" cy="190" r="86" fill="url(#g)" opacity=".85"/>' +
        '<path d="M50 500c0-105 68-180 150-180s150 75 150 180z" fill="url(#g)" opacity=".85"/>' +
      "</svg>"
    );
  sec.querySelectorAll(".nt-photo").forEach((img) => {
    const ganti = () => { img.onerror = null; img.src = SILUET; };
    img.onerror = ganti;
    if (img.complete && img.naturalWidth === 0) ganti();
  });

  // confetti
  const wadah = document.getElementById("ntConfetti");
  const warna = ["#f0c94a", "#ffe08a", "#ff2d75", "#ff8fb8", "#b36bff", "#ffffff"];
  const jumlah = window.innerWidth < 768 ? 22 : 40;
  for (let i = 0; i < jumlah; i++) {
    const c = document.createElement("i");
    c.style.left = Math.random() * 100 + "%";
    c.style.background = warna[i % warna.length];
    c.style.animationDuration = 6 + Math.random() * 6 + "s";
    c.style.animationDelay = -Math.random() * 12 + "s";
    c.style.setProperty("--dx", (Math.random() * 160 - 80).toFixed(0) + "px");
    c.style.setProperty("--r", (Math.random() * 900 + 200).toFixed(0) + "deg");
    const k = 0.6 + Math.random() * 0.7;
    c.style.width = 8 * k + "px";
    c.style.height = (Math.random() < 0.3 ? 8 : 14) * k + "px";
    if (Math.random() < 0.3) c.style.borderRadius = "50%";
    wadah.appendChild(c);
  }

  // confetti hanya jalan saat section terlihat (hemat baterai)
  new IntersectionObserver((es) => {
    es.forEach((e) => sec.classList.toggle("in-view", e.isIntersecting));
  }, { threshold: 0.05 }).observe(sec);

  // kartu muncul berurutan saat di-scroll
  const cards = sec.querySelectorAll(".nt-card");
  const obsKartu = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("shown");
      // jeda muncul hanya untuk pertama kali, setelah itu hover langsung responsif
      setTimeout(() => { e.target.style.transitionDelay = "0s"; }, 1600);
      obsKartu.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  cards.forEach((c) => obsKartu.observe(c));

  // tap di HP: satu kartu aktif
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (window.matchMedia("(hover: hover)").matches) return;
      const nyala = !card.classList.contains("active");
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.toggle("active", nyala);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.classList.toggle("active"); }
    });
  });
})();


/* =========================================================
   OPTIMASI: hentikan animasi CSS di section yang tidak terlihat
========================================================= */
(function () {
  if (!("IntersectionObserver" in window)) return;
  const obs = new IntersectionObserver((es) => {
    es.forEach((e) => e.target.classList.toggle("anim-off", !e.isIntersecting));
  }, { rootMargin: "150px 0px" });
  document.querySelectorAll("section, footer").forEach((sec) => obs.observe(sec));
})();
