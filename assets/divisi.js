/* =========================================================
   HALAMAN DIVISI
   Data diambil dari assets/divisi-data.js
========================================================= */

/* ---------------- NAVBAR (sama seperti halaman utama) ---------------- */
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
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

/* ---------------- ELEMEN HALAMAN ---------------- */
const $ = (id) => document.getElementById(id);
const main = $("dvMain");
const tabs = $("dvTabs");
const list = $("prokerList");
const leaderCard = $("dvLeaderCard");

/* foto pengganti kalau foto ketua belum diisi (siluet) */
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

/* huruf pertama tiap kata dibuat latin (seperti judul lain di website) */
function judulLatin(teks) {
  return teks
    .split(" ")
    .map((kata) => {
      if (kata === "&") return "&amp;";
      return '<span class="spesial-name">' + kata.charAt(0) + "</span>" + kata.slice(1);
    })
    .join(" ");
}

function ambilKodeDariURL() {
  const kode = new URLSearchParams(location.search).get("d");
  return DIVISI[kode] ? kode : URUTAN_DIVISI[0];
}

/* ---------------- TOMBOL PILIHAN DIVISI ---------------- */
function buatTabs(aktif) {
  tabs.innerHTML = "";
  URUTAN_DIVISI.forEach((kode) => {
    const d = DIVISI[kode];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dv-tab" + (kode === aktif ? " active" : "");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", kode === aktif ? "true" : "false");
    btn.innerHTML = '<img src="' + d.logo + '" alt="">' + d.singkatan;
    btn.addEventListener("click", () => gantiDivisi(kode));
    tabs.appendChild(btn);
  });

  // di HP: geser supaya tombol aktif terlihat
  const aktifBtn = tabs.querySelector(".active");
  if (aktifBtn) {
    tabs.scrollLeft = aktifBtn.offsetLeft - tabs.clientWidth / 2 + aktifBtn.clientWidth / 2;
  }
}

/* ---------------- DAFTAR PROKER ---------------- */
function buatProker(d) {
  list.innerHTML = "";
  document.querySelector(".dv-sub").style.display = d.proker.length ? "" : "none";

  // belum ada proker
  if (!d.proker.length) {
    list.innerHTML =
      '<div class="proker-empty reveal">' +
        '<span class="proker-empty-icon" aria-hidden="true"><span></span><span></span><span></span></span>' +
        "<h3>Work programs coming soon</h3>" +
        "<p>The " + d.nama + " work programs are being prepared.</p>" +
      "</div>";
    amatiReveal(list.querySelectorAll(".reveal"));
    return;
  }

  d.proker.forEach((p, i) => {
    const item = document.createElement("article");
    item.className = "proker-item reveal";
    item.style.transitionDelay = i * 0.08 + "s";

    const nomor = String(i + 1).padStart(2, "0");
    const idBody = "proker-body-" + i;

    item.innerHTML =
      '<button class="proker-head" type="button" aria-expanded="false" aria-controls="' + idBody + '">' +
        '<span class="proker-num">' + nomor + "</span>" +
        '<span class="proker-title"><h3>' + p.nama + "</h3>" +
          (p.waktu ? "<span>" + p.waktu + "</span>" : "") +
        "</span>" +
        '<span class="proker-arrow" aria-hidden="true"><span></span><span></span><span></span></span>' +
      "</button>" +
      '<div class="proker-body" id="' + idBody + '">' +
        '<div class="proker-body-inner">' +
          '<div class="proker-content">' +
            '<div class="proker-text">' +
              '<span class="proker-tag">' + d.singkatan + " · Program " + nomor + "</span>" +
              "<h4>" + p.nama + "</h4>" +
              (p.deskripsi ? "<p>" + p.deskripsi + "</p>" : "") +
              '<p class="proker-note">A work program of ' + d.nama + '</p>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";

    const head = item.querySelector(".proker-head");
    head.addEventListener("click", () => toggleProker(item));

    list.appendChild(item);
  });

  amatiReveal(list.querySelectorAll(".reveal"));
}

/* hanya satu proker terbuka dalam satu waktu */
function toggleProker(item) {
  const sudahBuka = item.classList.contains("open");

  list.querySelectorAll(".proker-item.open").forEach((el) => {
    el.classList.remove("open");
    el.querySelector(".proker-head").setAttribute("aria-expanded", "false");
  });

  if (!sudahBuka) {
    item.classList.add("open");
    item.querySelector(".proker-head").setAttribute("aria-expanded", "true");

    // pastikan isi yang dibuka terlihat
    setTimeout(() => {
      const r = item.getBoundingClientRect();
      if (r.bottom > window.innerHeight) {
        window.scrollBy({ top: Math.min(r.bottom - window.innerHeight + 30, r.top - 90), behavior: "smooth" });
      }
    }, 450);
  }
}

/* ---------------- ISI HALAMAN ---------------- */
function tampilkan(kode) {
  const d = DIVISI[kode];

  document.title = d.nama + " | AMSA UMP";
  document.body.style.setProperty("--accent", d.warna);

  $("dvCrumb").textContent = d.nama;
  $("dvCode").textContent = d.singkatan;
  $("dvTitle").innerHTML = judulLatin(d.nama);
  $("dvDesc").textContent = d.deskripsi;

  $("dvLeaderLogo").src = d.logo;
  $("dvLeaderPhoto").src = d.ketua.foto || FOTO_KOSONG;
  $("dvLeaderPhoto").alt = d.ketua.nama;
  $("dvLeaderName").textContent = d.ketua.nama;
  $("dvLeaderDiv").textContent = d.nama;
  ketikQuote(d.ketua.quote || "");
  leaderCard.classList.remove("active");

  buatTabs(kode);
  buatProker(d);

  document.querySelectorAll(".sub-link").forEach((l) => {
    l.classList.toggle("current", l.dataset.div === kode);
  });
}

function gantiDivisi(kode) {
  if (kode === ambilKodeDariURL() && location.search) return;

  main.classList.add("switching");
  setTimeout(() => {
    history.pushState({ kode }, "", "?d=" + kode);
    tampilkan(kode);
    window.scrollTo({ top: 0, behavior: "instant" });
    main.classList.remove("switching");
  }, 350);
}

window.addEventListener("popstate", () => tampilkan(ambilKodeDariURL()));

/* ---------------- FOTO KETUA: ketuk di HP ---------------- */
leaderCard.addEventListener("click", () => {
  if (!window.matchMedia("(hover: hover)").matches) {
    leaderCard.classList.toggle("active");
  }
});

leaderCard.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    leaderCard.classList.toggle("active");
  }
});

/* ---------------- ANIMASI MUNCUL SAAT SCROLL ---------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

function amatiReveal(els) {
  els.forEach((el) => revealObserver.observe(el));
}

amatiReveal(document.querySelectorAll(".reveal"));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

/* ---------------- MULAI ---------------- */
tampilkan(ambilKodeDariURL());


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

/* klik divisi di sub-menu: ganti isi halaman tanpa memuat ulang */
document.querySelectorAll(".sub-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
    document.querySelectorAll(".nav-sub.open").forEach((s) => s.classList.remove("open"));
    gantiDivisi(link.dataset.div);
  });
});

/* ---------------- QUOTE KETUA (efek mengetik) ---------------- */
var quoteTimer;
var quoteText;   // tanpa nilai awal supaya tidak menimpa quote yang sudah diisi

function ketikQuote(teks, cepat) {
  const el = $("dvLeaderQuote");
  if (teks === undefined || teks === null) teks = quoteText || "";
  quoteText = teks;
  clearTimeout(quoteTimer);
  el.style.display = teks ? "" : "none";
  if (!teks) return;

  let i = 0;
  const jalan = () => {
    i++;
    el.innerHTML = teks.slice(0, i) + '<span class="caret"></span>';
    if (i < teks.length) quoteTimer = setTimeout(jalan, cepat ? 14 : 30);
    else quoteTimer = setTimeout(() => { el.textContent = teks; }, 900);
  };
  jalan();
}

/* quote cukup menyala saat foto di-hover / diketuk (tidak dihapus & diketik ulang) */
