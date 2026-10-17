export type Lang = "id" | "en";

export const profile = {
  name: "SABILATUL FAZRIAH",
  phone: "089509687991",
  phoneLink: "https://wa.me/6289509687991",
  email: "sabilatulfazriah@gmail.com",
  linkedin: "https://www.linkedin.com/in/sabilatul-fazriah-11b580323/",
  instagram: "https://www.instagram.com/biiels_",
  project: "https://proyek-portofoliobilaa.vercel.app/",
};

export const navIds = ["home", "about", "education", "experience", "skills", "certificate", "project", "contact"] as const;

export const statsMeta = [
  { value: 3.83, decimals: 2, suffix: "" },
  { value: 3, decimals: 0, suffix: "+" },
  { value: 1.5, decimals: 1, suffix: "" },
  { value: 2, decimals: 0, suffix: "" },
];

export const expMeta = [
  { photos: ["/img/exp-2.webp", "/img/exp-1.webp", "/img/exp-3.webp", "/img/exp-4.webp", "/img/exp-5.webp"] },
  { photos: ["/img/muse-1.webp", "/img/muse-3.webp", "/img/muse-2.webp"] },
];

export const skillMeta = [
  { level: 85, items: ["excel", "word", "ppt"] },
  { level: 82, items: ["sheet", "doc"] },
  { level: 50, items: ["capcut", "canva"] },
  { level: 50, items: [] as string[], text: "English" },
];

export const certMeta = [
  { id: "toefl", img: "/cert/toefl.webp", ratio: "702 / 496", badge: "TOEFL" },
  { id: "bnsp", img: "/cert/bnsp.webp", ratio: "496 / 702", badge: "BNSP" },
];

const id = {
  nav: ["Beranda", "Tentang Saya", "Pendidikan", "Pengalaman", "Skill", "Sertifikat", "Proyek", "Kontak"],
  hero: {
    hello: "Hello, saya",
    role: "Finance & Accounting Enthusiast",
    sub: "Manajemen Keuangan · UNPAM",
    cta1: "Lihat Proyek",
    cta2: "Hubungi Saya",
    chips: [
      { b: "IPK 3,83", s: "S1 Manajemen Keuangan" },
      { b: "BNSP", s: "Back Office Certified" },
      { b: "3 Thn", s: "Marketing Operasional" },
    ],
  },
  about: {
    title: { a: "Tentang ", b: "Saya" },
    lead: "Halo, saya",
    text: "Lulusan S1 Manajemen Keuangan dari Universitas Pamulang dengan IPK 3,83. Memiliki pemahaman dasar dalam pengelolaan keuangan, administrasi, pengolahan data, dan Microsoft Excel. Saya memiliki pengalaman kerja selama 3 tahun di bidang pemasaran operasional, dan 1,5 tahun sebagai freelance muse. Pengalaman tersebut membentuk kemampuan dalam administrasi, komunikasi, koordinasi, serta penyelesaian pekerjaan secara teliti dan bertanggung jawab. Didukung dengan latar belakang pendidikan di bidang manajemen keuangan, saya memiliki minat untuk mengembangkan karier di bidang Finance dan Accounting, serta siap berkontribusi secara profesional dengan mengutamakan ketelitian, kedisiplinan, dan kemauan untuk terus belajar.",
    strengths: ["Ketelitian", "Kedisiplinan", "Komunikasi", "Koordinasi", "Administrasi", "Pengolahan Data", "Mau Belajar"],
    stats: ["IPK S1 Manajemen", "Tahun Marketing Operasional", "Tahun Freelance Muse", "Sertifikat Resmi"],
  },
  edu: {
    title: { a: "Pendi", b: "dikan" },
    items: [
      { school: "Universitas Pamulang", period: "2022 - 2026", degree: "Sarjana Manajemen", detail: "Manajemen Keuangan", score: "IPK 3,83", badge: "S1" },
      { school: "SMA Negeri 1 Cimpea", period: "", degree: "Ilmu Pengetahuan Sosial (IPS)", detail: "", score: "Nilai 85.20", badge: "SMA" },
    ],
  },
  exp: {
    title: { a: "Pengalaman ", b: "Kerja" },
    items: [
      {
        title: "Marketing Operasional",
        period: "2023 - 2026",
        tag: "3 Tahun",
        desc: "Bekerja di bidang jasa fotografi dan dokumentasi untuk kegiatan wisuda universitas, foto wisudawan dan wisudawati, serta acara perpisahan sekolah. Bertanggung jawab mendukung kegiatan pemasaran dan operasional, melayani pelanggan, memberikan informasi mengenai paket jasa fotografi, serta membantu proses pemesanan dan koordinasi layanan. Turut membantu persiapan kebutuhan logistik dan perlengkapan fotografi, mengatur kebutuhan operasional sebelum dan selama kegiatan, serta berkoordinasi dengan pihak terkait untuk memastikan layanan berjalan lancar. Selain itu, mendukung kegiatan promosi dan menjaga kualitas pelayanan guna meningkatkan kepuasan pelanggan.",
        points: ["Layanan pelanggan & informasi paket", "Pemesanan & koordinasi layanan", "Logistik & perlengkapan", "Promosi & kepuasan pelanggan"],
        alts: ["Fotografer dengan payung reflektor di sekolah", "Sesi foto wisuda dengan latar rak buku", "Tim bekerja di area foto wisuda", "Kamera dan photo book wisuda", "Studio lighting dengan payung"],
      },
      {
        title: "Freelance - Muse",
        period: "2024 - 2026",
        tag: "1,5 Tahun",
        desc: "Bekerja sebagai freelance muse dalam kegiatan pemotretan dengan mengikuti konsep dan arahan klien. Bertanggung jawab dalam menjaga profesionalisme, kedisiplinan, dan ketepatan waktu, serta berkoordinasi dengan fotografer dan tim untuk memastikan kegiatan berjalan dengan lancar. Terbiasa mengatur jadwal pekerjaan secara mandiri dan menyelesaikan tanggung jawab sesuai kesepakatan.",
        points: ["Mengikuti konsep & arahan klien", "Profesional & tepat waktu", "Koordinasi dengan fotografer & tim", "Manajemen jadwal mandiri"],
        alts: ["Sesi pemotretan dengan busana adat", "Hasil pemotretan pada layar kamera", "Persiapan make up sebelum pemotretan"],
      },
    ],
  },
  skills: { title: { a: "Skill ", b: "& Toolset" }, groups: ["Microsoft Office", "Google Workspace", "Editing", "Bahasa"] },
  cert: {
    title: { a: "Sertifi", b: "kat" },
    view: "Lihat sertifikat",
    zoom: "Perbesar",
    close: "Tutup",
    items: [
      { title: "TOEFL Prediction Test", issuer: "Lembaga Bahasa Universitas Pamulang (LBU)", tag: "Bahasa Inggris",
        meta: [["Nomor", "0625 / LBU / II / 2025"], ["Skor Total", "367 (Beginner)"], ["Berlaku s.d.", "27 Februari 2027"]],
        chips: ["Listening 42", "Structure 31", "Reading 37"],
        alt: "Sertifikat TOEFL Prediction Test atas nama Sabilatul Fazriah" },
      { title: "Sertifikat Kompetensi BNSP", issuer: "Badan Nasional Sertifikasi Profesi · LSP Universitas Pamulang", tag: "Kompetensi Kerja",
        meta: [["Kompetensi", "Pengelolaan Kegiatan Back Office"], ["Nomor", "64999 4312 0 0023761 2026"], ["Diterbitkan", "30 Januari 2026 (berlaku 3 tahun)"]],
        chips: ["Back Office", "Jasa Keuangan"],
        alt: "Sertifikat Kompetensi BNSP atas nama Sabilatul Fazriah" },
    ],
  },
  project: {
    title: { a: "Proyek ", b: "Saya" },
    open: "Buka Proyek Langsung",
    label: "PORTOFOLIO",
    h1: "Simulasi Data Transaksi Keuangan",
    h2: "di Microsoft Excel",
    pill: "Proyek Portofolio • Finance Staff",
    desc: "Mencatat transaksi kas PT. Maju Bersama periode 1–10 September 2026, lalu merangkum kas masuk, kas keluar, dan saldo akhir secara otomatis.",
    features: [
      { t: "SUMIF", d: "Menjumlahkan nominal berdasarkan arus kas." },
      { t: "Pencatatan Transaksi", d: "Tanggal, keterangan, dan kategori." },
      { t: "Laporan Arus Kas", d: "Saldo awal sampai saldo akhir." },
    ],
    outLabel: "HASIL / OUTCOME",
    out: "Laporan arus kas tersusun otomatis: saldo awal, kas masuk, kas keluar, dan saldo akhir.",
    tableTitle: "SIMULASI DATA TRANSAKSI KEUANGAN",
    company: "PT. MAJU BERSAMA",
    period: "Periode 1–10 September 2026",
    balance: "Saldo Kas Perusahaan Pada Awal Periode Rp 5.000.000",
    head: ["Tanggal", "Keterangan", "Kategori", "Arus Kas", "Nominal"],
    rows: [
      ["01/09/2026", "Penerimaan Jasa", "Pendapatan Jasa", "Masuk", "Rp2.500.000"],
      ["02/09/2026", "Penerimaan Pembayaran Pelanggan", "Pendapatan Jasa", "Masuk", "Rp1.500.000"],
      ["03/09/2026", "Pembelian Perlengkapan Kantor", "Operasional", "Keluar", "Rp350.000"],
      ["04/09/2026", "Penerimaan jasa proyek", "Pendapatan Jasa", "Masuk", "Rp3.000.000"],
      ["05/09/2026", "Pembayaran Transportasi", "Operasional", "Keluar", "Rp150.000"],
      ["06/09/2026", "Pembayaran Gaji Staff", "Gaji", "Keluar", "Rp1.000.000"],
    ],
  },
  contact: {
    title: { a: "Kon", b: "tak" },
    labels: { phone: "WhatsApp", email: "Email", linkedin: "LinkedIn", instagram: "Instagram" },
    form: { name: "Nama", email: "Email", subject: "Subjek", message: "Pesan", send: "Kirim Pesan", sending: "Mengirim…", ok: "Terima kasih! Pesan Anda sudah terkirim.", rate: "Terlalu banyak percobaan. Coba lagi nanti.", conf: "Layanan pesan belum aktif.", fail: "Gagal mengirim pesan. Periksa isian Anda.", net: "Koneksi bermasalah. Coba lagi." },
  },
  footer: "Terima kasih",
};

export type Content = typeof id;

const en: Content = {
  nav: ["Home", "About me", "Education", "Work Experience", "Skill", "Certificate", "Project", "Contact"],
  hero: {
    hello: "Hello, I'm",
    role: "Finance & Accounting Enthusiast",
    sub: "Financial Management · UNPAM",
    cta1: "View Project",
    cta2: "Contact Me",
    chips: [
      { b: "GPA 3.83", s: "B.Mgt Financial Management" },
      { b: "BNSP", s: "Back Office Certified" },
      { b: "3 Yrs", s: "Operational Marketing" },
    ],
  },
  about: {
    title: { a: "About ", b: "Me" },
    lead: "Hi, I'm",
    text: "S1 Financial Management graduate from Universitas Pamulang with a GPA of 3.83. I have a foundational understanding of financial management, administration, data processing, and Microsoft Excel. I have 3 years of work experience in operational marketing and 1.5 years as a freelance muse. These experiences built my skills in administration, communication, coordination, and completing work carefully and responsibly. Backed by an educational background in financial management, I am interested in developing a career in Finance and Accounting, ready to contribute professionally with precision, discipline, and a willingness to keep learning.",
    strengths: ["Accuracy", "Discipline", "Communication", "Coordination", "Administration", "Data Processing", "Eager to Learn"],
    stats: ["GPA, B.Mgt Management", "Years in Operational Marketing", "Years as Freelance Muse", "Official Certificates"],
  },
  edu: {
    title: { a: "Edu", b: "cation" },
    items: [
      { school: "Universitas Pamulang", period: "2022 - 2026", degree: "Bachelor of Management", detail: "Financial Management", score: "GPA 3.83", badge: "S1" },
      { school: "SMA Negeri 1 Cimpea", period: "", degree: "Social Sciences (IPS)", detail: "", score: "Score 85.20", badge: "SMA" },
    ],
  },
  exp: {
    title: { a: "Work ", b: "Experience" },
    items: [
      {
        title: "Operational Marketing",
        period: "2023 - 2026",
        tag: "3 Years",
        desc: "Worked in photography and documentation services for university graduation events, graduate portraits, and school farewell events. Responsible for supporting marketing and operational activities, serving customers, providing information on photography packages, and assisting with ordering and service coordination. Also helped prepare logistics and photography equipment, arranged operational needs before and during events, and coordinated with related parties to keep services running smoothly. In addition, supported promotional activities and maintained service quality to improve customer satisfaction.",
        points: ["Customer service & package information", "Ordering & service coordination", "Logistics & equipment", "Promotion & customer satisfaction"],
        alts: ["Photographer with a reflector umbrella at a school", "Graduation photo session with a bookshelf backdrop", "Team working at the graduation photo area", "Camera and graduation photo books", "Studio lighting with umbrellas"],
      },
      {
        title: "Freelance - Muse",
        period: "2024 - 2026",
        tag: "1.5 Years",
        desc: "Worked as a freelance muse in photo shoots, following the client's concept and direction. Responsible for maintaining professionalism, discipline, and punctuality, and coordinating with photographers and the team to keep sessions running smoothly. Accustomed to managing my own work schedule and completing responsibilities as agreed.",
        points: ["Following client concept & direction", "Professional & punctual", "Coordination with photographers & team", "Independent schedule management"],
        alts: ["Photo shoot in traditional attire", "Shoot result on the camera screen", "Make-up preparation before the shoot"],
      },
    ],
  },
  skills: { title: { a: "Skill ", b: "& Toolset" }, groups: ["Microsoft Office", "Google Workspace", "Editing", "Language"] },
  cert: {
    title: { a: "Certi", b: "ficates" },
    view: "View certificate",
    zoom: "Enlarge",
    close: "Close",
    items: [
      { title: "TOEFL Prediction Test", issuer: "Language Institute, Universitas Pamulang (LBU)", tag: "English",
        meta: [["Number", "0625 / LBU / II / 2025"], ["Total Score", "367 (Beginner)"], ["Valid until", "27 February 2027"]],
        chips: ["Listening 42", "Structure 31", "Reading 37"],
        alt: "TOEFL Prediction Test certificate of Sabilatul Fazriah" },
      { title: "BNSP Certificate of Competence", issuer: "National Professional Certification Agency · LSP Universitas Pamulang", tag: "Work Competency",
        meta: [["Competency", "Back Office Activity Management"], ["Number", "64999 4312 0 0023761 2026"], ["Issued", "30 January 2026 (valid for 3 years)"]],
        chips: ["Back Office", "Financial Services"],
        alt: "BNSP Certificate of Competence of Sabilatul Fazriah" },
    ],
  },
  project: {
    title: { a: "My ", b: "Project" },
    open: "Open Live Project",
    label: "PORTFOLIO",
    h1: "Financial Transaction Data Simulation",
    h2: "in Microsoft Excel",
    pill: "Portfolio Project • Finance Staff",
    desc: "Records the cash transactions of PT. Maju Bersama for 1–10 September 2026, then automatically summarizes cash in, cash out, and the closing balance.",
    features: [
      { t: "SUMIF", d: "Totals amounts by cash flow type." },
      { t: "Transaction Records", d: "Date, description, and category." },
      { t: "Cash Flow Report", d: "From opening to closing balance." },
    ],
    outLabel: "RESULT / OUTCOME",
    out: "The cash flow report is built automatically: opening balance, cash in, cash out, and closing balance.",
    tableTitle: "FINANCIAL TRANSACTION DATA SIMULATION",
    company: "PT. MAJU BERSAMA",
    period: "Period 1–10 September 2026",
    balance: "Company Cash Balance at Start of Period: Rp 5.000.000",
    head: ["Date", "Description", "Category", "Cash Flow", "Amount"],
    rows: [
      ["01/09/2026", "Service receipt", "Service Revenue", "In", "Rp2.500.000"],
      ["02/09/2026", "Customer payment received", "Service Revenue", "In", "Rp1.500.000"],
      ["03/09/2026", "Office supplies purchase", "Operational", "Out", "Rp350.000"],
      ["04/09/2026", "Project service receipt", "Service Revenue", "In", "Rp3.000.000"],
      ["05/09/2026", "Transportation payment", "Operational", "Out", "Rp150.000"],
      ["06/09/2026", "Staff salary payment", "Salary", "Out", "Rp1.000.000"],
    ],
  },
  contact: {
    title: { a: "Con", b: "tact" },
    labels: { phone: "WhatsApp", email: "Email", linkedin: "LinkedIn", instagram: "Instagram" },
    form: { name: "Name", email: "Email", subject: "Subject", message: "Message", send: "Send Message", sending: "Sending…", ok: "Thank you! Your message has been sent.", rate: "Too many attempts. Please try again later.", conf: "Messaging service is not active yet.", fail: "Failed to send. Please check your input.", net: "Connection problem. Try again." },
  },
  footer: "Thank You",
};

export const content: Record<Lang, Content> = { id, en };