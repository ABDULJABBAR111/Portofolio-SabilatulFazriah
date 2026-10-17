-- Jalankan di Supabase Dashboard > SQL Editor
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 2 and 80),
  email       text not null check (char_length(email) between 5 and 120),
  subject     text check (char_length(subject) <= 120),
  message     text not null check (char_length(message) between 10 and 2000),
  ip_hash     text not null,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create index if not exists messages_ip_time_idx on public.messages (ip_hash, created_at desc);

-- KEAMANAN: aktifkan Row Level Security & JANGAN buat policy apa pun.
-- Artinya anon key / pengunjung TIDAK bisa membaca/menulis/menghapus tabel ini.
-- Hanya server (API route Next.js) dengan service_role key yang bisa menulis.
alter table public.messages enable row level security;
revoke all on public.messages from anon, authenticated;
