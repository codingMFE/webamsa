/* =========================================================
   HALAMAN MAIN BOARD
   Data diambil dari assets/mainboard-data.js
========================================================= */

/* ---------------- NAVBAR ---------------- */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", () => requestAnimationFrame(updateNavbar), { passive: true });
updateNavbar();

function openMenu() {
  hamburger.classList.add("active");
  navMenu.classList.add("active");
  navbar.classList.add("menu-open");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  navbar.classList.remove("menu-open");
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.contains("active") ? closeMenu() : openMenu();
});

document.addEventListener("click", (e) => {
  if (navMenu.classList.contains("active") && !navMenu.contains(e.target)) closeMenu();
  document.querySelectorAll(".nav-sub.open").forEach((sub) => {
    if (!sub.contains(e.target)) sub.classList.remove("open");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

document.querySelectorAll(".nav-sub").forEach((sub) => {
  const btn = sub.querySelector(".sub-toggle");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const buka = !sub.classList.contains("open");
    sub.classList.toggle("open", buka);
    btn.setAttribute("aria-expanded", buka ? "true" : "false");
  });
});

/* ---------------- BANTUAN ---------------- */
const LOGO_AMSA = "assets/gambar/logoamsa.png";

/* siluet kalau foto belum diisi */
const FOTO_KOSONG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#ffc2d9"/><stop offset="1" stop-color="#b36bff"/></linearGradient></defs>' +
      '<circle cx="200" cy="170" r="88" fill="url(#g)" opacity=".9"/>' +
      '<path d="M40 500c0-110 72-190 160-190s160 80 160 190z" fill="url(#g)" opacity=".9"/>' +
    "</svg>"
  );

/* kartu foto (stage) */
function kartuFoto(orang, kelas) {
  const el = document.createElement("article");
  el.className = "mb-person reveal " + (kelas || "");
  el.tabIndex = 0;
  el.setAttribute("aria-label", orang.jabatan + ": " + orang.nama);
  el.innerHTML =
    '<div class="mb-stage">' +
      '<span class="mb-glow" aria-hidden="true"></span>' +
      '<span class="mb-ring" aria-hidden="true"></span>' +
      '<img class="mb-logo" src="' + LOGO_AMSA + '" alt="" aria-hidden="true">' +
      '<span class="mb-spark s1" aria-hidden="true"></span>' +
      '<span class="mb-spark s2" aria-hidden="true"></span>' +
      '<span class="mb-spark s3" aria-hidden="true"></span>' +
      '<img class="mb-photo" src="' + (orang.foto || FOTO_KOSONG) + '" alt="' + orang.nama + '">' +
      '<span class="mb-badge">' + orang.jabatan + "</span>" +
    "</div>";
  return el;
}

/* blok teks: nama, jabatan, quote */
function blokTeks(orang) {
  return (
    '<h3 class="mb-name">' + orang.nama + "</h3>" +
    '<p class="mb-role">' + orang.jabatan + "</p>" +
    '<p class="mb-quote" data-quote="' + orang.quote.replace(/"/g, "&quot;") + '"></p>'
  );
}

/* ---------------- SECTION 1: TRIO ---------------- */
const trio = document.getElementById("mbTrio");

[
  [MAIN_BOARD.viceInternal, ""],
  [MAIN_BOARD.representative, "is-rep"],
  [MAIN_BOARD.viceExternal, ""]
].forEach(([orang, kelas], i) => {
  const kartu = kartuFoto(orang, kelas);
  kartu.style.transitionDelay = [0.15, 0, 0.3][i] + "s";
  const info = document.createElement("div");
  info.className = "mb-info";
  info.innerHTML = blokTeks(orang);
  kartu.appendChild(info);
  trio.appendChild(kartu);
});

/* ---------------- SECTION 2 & 3: DUO ---------------- */
function buatDuo(grup, data) {
  const grid = document.querySelector('.mb-duo-grid[data-group="' + grup + '"]');
  if (!grid) return;

  data.slice(0, 2).forEach((orang, i) => {
    const n = i + 1;

    const kartu = kartuFoto(orang, "p" + n);
    kartu.dataset.pair = grup + "-" + n;
    kartu.style.transitionDelay = i * 0.2 + "s";

    const teks = document.createElement("div");
    teks.className = "mb-text reveal t" + n;
    teks.dataset.pair = grup + "-" + n;
    teks.style.transitionDelay = 0.1 + i * 0.2 + "s";
    teks.innerHTML = '<span class="mb-num" aria-hidden="true">0' + n + "</span>" + blokTeks(orang);

    grid.appendChild(kartu);
    grid.appendChild(teks);
  });
}

buatDuo("secretary", MAIN_BOARD.secretary);
buatDuo("treasurer", MAIN_BOARD.treasurer);

/* ---------------- HOVER / KETUK ---------------- */
const bisaHover = () => window.matchMedia("(hover: hover)").matches;

function pasangan(el) {
  if (!el.dataset.pair) return [el];
  return Array.from(document.querySelectorAll('[data-pair="' + el.dataset.pair + '"]'));
}

function setAktif(el, aktif) {
  pasangan(el).forEach((x) => x.classList.toggle("active", aktif));
  if (aktif) {
    const q = el.querySelector(".mb-quote") ||
      pasangan(el).map((x) => x.querySelector(".mb-quote")).find(Boolean);
    // kalau quote belum pernah muncul, ketik sekarang; kalau sudah, biarkan tetap tampil
    if (q && !q.dataset.done && !q._typing) ketik(q, true);
  }
}

document.querySelectorAll(".mb-person, .mb-text").forEach((el) => {
  el.addEventListener("mouseenter", () => { if (bisaHover()) setAktif(el, true); });
  el.addEventListener("mouseleave", () => { if (bisaHover()) setAktif(el, false); });

  // di HP: ketuk untuk menyalakan / mematikan
  el.addEventListener("click", () => {
    if (bisaHover()) return;
    const nyala = !el.classList.contains("active");
    document.querySelectorAll(".mb-person.active, .mb-text.active").forEach((x) => x.classList.remove("active"));
    if (nyala) setAktif(el, true);
  });

  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setAktif(el, !el.classList.contains("active"));
    }
  });
});

/* ---------------- QUOTE DIKETIK ---------------- */
function ketik(el, ulang) {
  const teks = el.dataset.quote || "";
  if (el._typing) return;
  if (el.dataset.done && !ulang) return;
  if (el.dataset.done && ulang && el.textContent === teks) {
    // sudah lengkap: ketik ulang cepat supaya terasa hidup
  }

  el._typing = true;
  el.innerHTML = '<span class="caret"></span>';
  let i = 0;
  const speed = ulang ? 14 : 28;

  const langkah = () => {
    i++;
    el.innerHTML = teks.slice(0, i) + '<span class="caret"></span>';
    if (i < teks.length) {
      setTimeout(langkah, speed);
    } else {
      setTimeout(() => {
        el.textContent = teks;
        el._typing = false;
        el.dataset.done = "1";
      }, 900);
    }
  };
  langkah();
}

/* ---------------- MUNCUL SAAT SCROLL ---------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in-view");
    const q = entry.target.querySelector(".mb-quote");
    if (q) setTimeout(() => ketik(q, false), 500);
    io.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
