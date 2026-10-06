/* =========================================================
   DATA HALAMAN DIVISI  —  CUKUP EDIT FILE INI SAJA
   ---------------------------------------------------------
   Setiap divisi punya:
   - nama        : nama divisi (huruf pertama tiap kata otomatis dibuat latin)
   - singkatan   : singkatan divisi
   - logo        : logo divisi (muncul di belakang foto ketua saat di-hover)
   - warna       : warna aksen divisi (kode hex)
   - deskripsi   : penjelasan singkat divisi
   - ketua.nama  : nama ketua divisi
   - ketua.quote : kutipan singkat ketua (bahasa Inggris)
   - ketua.foto  : foto ketua. PALING BAGUS pakai PNG tanpa background
                   (seperti representative.png). Kosongkan ("") kalau belum ada.
   - proker      : daftar program kerja. Tambah / hapus baris sesuai kebutuhan.
       nama      : nama program kerja
       deskripsi : penjelasan singkat (boleh dikosongkan "")

   Link ke tiap divisi: divisi.html?d=KODE  (KODE = nama kunci di bawah, misal "anr")
========================================================= */

const DIVISI = {

  anr: {
    nama: "Academic & Research",
    singkatan: "AnR",
    logo: "assets/gambar/anr.jpeg",
    warna: "#f4a259",
    deskripsi: "The division that builds a scientific culture among members through academic activities, research, and scientific competitions.",
    ketua: { nama: "Tsurayya Fatinah Fasya Lubis", foto: "assets/gambar/ketua-1.png", quote: "Curiosity is the first step of every great discovery." },
    proker: [
      { nama: "VISCERA (Visual Scientific Art Competition)", deskripsi: "A visual art competition with a scientific theme that invites students to share health knowledge through creative and communicative works." },
      { nama: "LAT (Local Academic Training)", deskripsi: "Local academic training that equips members with practical skills, such as emergency medical training." },
      { nama: "AMSA Scientific Talk", deskripsi: "A scientific discussion forum with expert speakers to broaden members' insight into the latest topics in medicine and research." },
      { nama: "AMSA Research Fun Day", deskripsi: "A relaxed and fun introduction to the world of research, so members feel more confident to start their own studies." }
    ]
  },

  mnd: {
    nama: "Member & Development",
    singkatan: "MnD",
    logo: "assets/gambar/WhatsApp Image 2026-04-30 at 23.35.49.jpeg",
    warna: "#6ec3e0",
    deskripsi: "The division that keeps our members close together and helps every AMSA-UMP member grow to their full potential.",
    ketua: { nama: "M Fikriansyah Ekman", foto: "assets/gambar/ketua-4.png", quote: "We grow the fastest when we grow together." },
    proker: [
      { nama: "Work Meeting (Rapat Kerja)", deskripsi: "The opening meeting of the board term to plan and agree on the work programs of every division for the year." },
      { nama: "Anniversary AMSA", deskripsi: "A celebration of AMSA's anniversary as a moment of togetherness and reflection on the organization's journey with all members." },
      { nama: "AMSA Indonesia Day", deskripsi: "A celebration of AMSA-Indonesia Day with our members to grow a sense of pride and belonging in AMSA." },
      { nama: "Fun Day", deskripsi: "A day full of games and fun to strengthen the bond between members outside of busy academic life." },
      { nama: "Open Recruitment (OPREC)", deskripsi: "The recruitment of new AMSA-UMP members for medical students who want to learn, create, and grow together." },
      { nama: "Bonding", deskripsi: "An activity that brings new members and the board closer, so everyone gets to know each other and builds strong teamwork." },
      { nama: "General Assembly (MUBES)", deskripsi: "The highest forum of the organization to evaluate the board, present the accountability report, and set the direction for the next term." }
    ]
  },

  co: {
    nama: "Community Outreach",
    singkatan: "CO",
    logo: "assets/gambar/co.jpeg",
    warna: "#e0566f",
    deskripsi: "The division that brings AMSA's impact directly to the community through social and health activities.",
    ketua: { nama: "Amanda Salsabila Nadia", foto: "assets/gambar/ketua-6.png", quote: "The best way to find yourself is to lose yourself in the service of others." },
    proker: [
      { nama: "CircumCare", deskripsi: "A free mass circumcision program for underprivileged children in Palembang and Banyuasin, run in collaboration with IKA FK UMP and Makelar Amal Indonesia." },
      { nama: "EOTY (Event of The Year)", deskripsi: "AMSA's flagship community service event and the highlight of the Community Outreach programs in one board term." },
      { nama: "OSOCA (Orphanage Social and Charity)", deskripsi: "A social visit to an orphanage to share care, happiness, and support with the children there." },
      { nama: "ACB (AMSA Charity Box)", deskripsi: "AMSA-UMP's fundraising program, with the donations distributed to people in need." },
      { nama: "AMSA Collab with IKA FK UMP", deskripsi: "A collaboration between AMSA-UMP and IKA FK UMP in health service activities for the community." },
      { nama: "Special Needs School Visit (SLB)", deskripsi: "A visit and health education session at a special needs school, showing AMSA-UMP's care for children with special needs." },
      { nama: "Ramadhan Sharing (Ramadhan Berbagi)", deskripsi: "A sharing activity during the month of Ramadhan to spread kindness to people in need." }
    ]
  },

  ea: {
    nama: "External Affairs",
    singkatan: "EA",
    logo: "assets/gambar/ea.jpeg",
    warna: "#b69ad9",
    deskripsi: "The division that builds AMSA-UMP's network and partnerships with organizations at the national and international level.",
    ketua: { nama: "Rachel Namira Ramadhani", foto: "assets/gambar/ketua-2.png", quote: "Borders divide maps, but friendship connects the world." },
    proker: [
      { nama: "AMSA UMP x AMSA UNSRI", deskripsi: "An inter-chapter collaboration with AMSA Universitas Sriwijaya to strengthen the network of medical students in Palembang." },
      { nama: "AMSEP Upgrading Session", deskripsi: "A preparation session about AMSEP (Asian Medical Students' Exchange Program) for members who want to join AMSA's student exchange." },
      { nama: "AMSEP Delegation", deskripsi: "Sending AMSA-UMP delegates to the AMSEP exchange program alongside medical students from other countries." },
      { nama: "Bidding Host AMSEP", deskripsi: "AMSA-UMP's bid to host AMSEP and welcome medical students from abroad." },
      { nama: "AMSA UMP Collab GO: With Ratu Lenny", deskripsi: "A collaboration between AMSA-UMP and a government partner together with Ratu Lenny." },
      { nama: "AMSA UMP Collab NGO: Yoga", deskripsi: "A collaboration with a non-governmental organization (NGO) through yoga activities that invite people to live healthier." },
      { nama: "AMSATOK (with FnP)", deskripsi: "AMSA-UMP's creative TikTok content, produced together with the FnP division throughout the board term." },
      { nama: "AMSA (EA with CO) x ALSA", deskripsi: "A cross-organization collaboration with ALSA (Asian Law Students' Association), run by the EA and CO divisions." },
      { nama: "AMSA (EA with CO) x IKA", deskripsi: "A collaboration of the EA and CO divisions with IKA FK UMP in activities for the community." },
      { nama: "Gathering", deskripsi: "A casual meet-up to strengthen AMSA-UMP's relationship with partners and external networks." }
    ]
  },

  pnp: {
    nama: "Publication & Promotion",
    singkatan: "PnP",
    logo: "assets/gambar/pnp.jpeg",
    warna: "#6d7fe0",
    deskripsi: "The division that manages AMSA-UMP's publications, design, and social media.",
    ketua: { nama: "Amelia", foto: "assets/gambar/ketua-5.png", quote: "Every story deserves to be told beautifully." },
    proker: [
      { nama: "Feeds Instagram", deskripsi: "Designing Instagram feed content for @amsaump so every piece of AMSA-UMP information and activity is shared in an engaging way." },
      { nama: "AMSA Talk", deskripsi: "A talk program with inspiring speakers, published through AMSA-UMP's media channels." },
      { nama: "Short Reels", deskripsi: "Short videos released every month to show AMSA-UMP's activities and fun moments." },
      { nama: "Special Day Posters", deskripsi: "Greeting posters to celebrate national holidays, religious holidays, and health awareness days." },
      { nama: "AMSA UMP Merchandise", deskripsi: "Designing official AMSA-UMP merchandise as a symbol of identity and pride for our members." }
    ]
  },

  fnp: {
    nama: "Finance & Partnership",
    singkatan: "FnP",
    logo: "assets/gambar/fnp.jpeg",
    warna: "#f0c94a",
    deskripsi: "The division that manages the organization's finances and builds partnerships with sponsors and partners.",
    ketua: { nama: "Azmia Iqlila", foto: "assets/gambar/ketua-3.png", quote: "Good management turns small resources into a big impact." },
    proker: [
      { nama: "AMSA Uniform Production", deskripsi: "Designing and producing the official AMSA-UMP uniform as a shared identity for every member." },
      { nama: "AMSA Merchandise Sales", deskripsi: "Selling official AMSA-UMP merchandise to support the organization's funding while spreading the AMSA spirit." }
    ]
  }
};

/* urutan tombol divisi di bagian atas halaman */
const URUTAN_DIVISI = ["anr", "mnd", "co", "ea", "pnp", "fnp"];
