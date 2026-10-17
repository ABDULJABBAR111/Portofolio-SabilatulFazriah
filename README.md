# Portfolio — Sabilatul Fazriah

Next.js 15 (App Router) + Supabase + three.js / framer-motion. Siap deploy ke Vercel.

## Menjalankan lokal
```bash
npm install
cp .env.example .env.local   # isi nilainya (lihat di bawah)
npm run dev                  # http://localhost:3000
```

## Setup Supabase (untuk form kontak)
1. Buat project di https://supabase.com
2. Buka **SQL Editor**, jalankan isi file `supabase/schema.sql` (membuat tabel `messages` + RLS aktif tanpa policy publik).
3. **Project Settings > API**: salin `Project URL` dan `service_role` key ke `.env.local`.
   - `service_role` hanya dipakai di server (API route). Jangan beri awalan `NEXT_PUBLIC_`.
4. Pesan masuk dilihat di Supabase > Table Editor > `messages`.

## Deploy ke Vercel
1. Upload project ke GitHub (file `.env*` sudah di-ignore).
2. Vercel > Add New > Project > pilih repo (framework terdeteksi otomatis: Next.js).
3. Isi Environment Variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`.
4. Deploy.

## Lapisan keamanan
- **CSP dengan nonce** per-request (middleware.ts): script liar/XSS tidak dieksekusi; `frame-ancestors 'none'` anti-clickjacking; `object-src 'none'`.
- Header: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP/CORP; `X-Powered-By` dimatikan.
- **Form kontak**: validasi Zod di server, batas ukuran body, cek Origin (anti-CSRF), honeypot + cek waktu isi (anti-bot), rate limit (in-memory + cek DB per jam), sanitasi teks.
- **Supabase**: RLS aktif tanpa policy -> anon key tidak bisa baca/tulis; hanya server (service role). IP disimpan sebagai hash bergaram, bukan IP asli.
- Tidak ada input pengguna yang dirender sebagai HTML; semua link eksternal memakai `rel="noopener noreferrer"`.
- Dependensi: `npm audit --omit=dev` = 0 vulnerability.
- Disarankan: aktifkan 2FA di GitHub, Vercel, dan Supabase, serta jangan membagikan service_role key.

## Mengubah konten
Semua teks ada di `lib/data.ts`. Foto di `public/img`, sertifikat di `public/cert`.
