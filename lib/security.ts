import "server-only";
import { createHash } from "node:crypto";

/** Rate limit sederhana in-memory (lapis pertama; lapis kedua cek DB). */
const hits = new Map<string, number[]>();
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return true;
}

export function getIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? headers.get("x-real-ip") ?? "unknown").trim().slice(0, 64);
}

/** IP tidak disimpan mentah, hanya hash bergaram. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "dev-salt";
  return createHash("sha256").update(salt + ip).digest("hex");
}

/** Hapus karakter kontrol & tag HTML; React tetap meng-escape saat render. */
export function clean(input: string): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/‮/g, "")
    .trim();
}

/** Cegah CSRF lintas-situs: Origin harus sama dengan Host. */
export function sameOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  const host = headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
