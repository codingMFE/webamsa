/* =========================================================
   DATA HALAMAN MAIN BOARD  —  CUKUP EDIT FILE INI SAJA
   ---------------------------------------------------------
   nama    : nama pengurus
   jabatan : jabatan (sudah diisi)
   foto    : foto pengurus. PALING BAGUS pakai PNG tanpa background
             (seperti representative.png). Kosongkan ("") kalau belum ada,
             nanti tampil siluet.
   quote   : kutipan singkat dalam bahasa Inggris
========================================================= */

const MAIN_BOARD = {

  /* SECTION 1 : Representative di tengah, Vice di kiri & kanan */
  representative: {
    nama: "Dzaky Arva Rizy",
    jabatan: "Representative",
    foto: "assets/gambar/mb-7.png",
    quote: "Leadership is not about being in charge, it is about taking care of those in your charge."
  },
  viceInternal: {
    nama: "Reza Yuniarti",
    jabatan: "Vice Representative of Internal Affairs",
    foto: "assets/gambar/mb-6.png",
    quote: "A strong organization is built from within, one heart at a time."
  },
  viceExternal: {
    nama: "M. Alfathan Dzikri",
    jabatan: "Vice Representative of External Affairs",
    foto: "assets/gambar/mb-5.png",
    quote: "Every connection we build today opens a door for tomorrow."
  },

  /* SECTION 2 : Secretary */
  secretary: [
    {
      nama: "Adhe Rizki Maharani",
      jabatan: "General Secretary I",
      foto: "assets/gambar/mb-3.png",
      quote: "Great things are done by a series of small things brought together."
    },
    {
      nama: "Dona Bela Herman",
      jabatan: "General Secretary II",
      foto: "assets/gambar/mb-1.png",
      quote: "Order and simplicity are the first steps toward mastery."
    }
  ],

  /* SECTION 3 : Treasurer (Bendahara) */
  treasurer: [
    {
      nama: "Firaldo Prawira Marpaung",
      jabatan: "General Treasurer I",
      foto: "assets/gambar/mb-4.png",
      quote: "Trust is the most valuable currency we will ever hold."
    },
    {
      nama: "Maricha Liasti",
      jabatan: "General Treasurer II",
      foto: "assets/gambar/mb-2.png",
      quote: "Every rupiah well managed is a step closer to a bigger impact."
    }
  ]
};
