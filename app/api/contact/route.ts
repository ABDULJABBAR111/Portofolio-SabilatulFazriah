import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import { clean, getIp, hashIp, rateLimit, sameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional().default(""), // honeypot: harus kosong
  t: z.number().int().min(0).max(1000 * 60 * 60 * 6), // ms sejak form tampil
});

const json = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  if (!sameOrigin(req.headers)) return json({ ok: false, error: "Permintaan ditolak." }, 403);
  if (!req.headers.get("content-type")?.includes("application/json"))
    return json({ ok: false, error: "Format tidak valid." }, 415);

  const ip = getIp(req.headers);
  if (!rateLimit(`c:${ip}`, 3, 10 * 60 * 1000))
    return json({ ok: false, error: "Terlalu banyak percobaan. Coba lagi beberapa menit lagi." }, 429);

  const raw = await req.text();
  if (raw.length > 6000) return json({ ok: false, error: "Data terlalu besar." }, 413);

  let parsed;
  try {
    parsed = schema.safeParse(JSON.parse(raw));
  } catch {
    return json({ ok: false, error: "Data tidak valid." }, 400);
  }
  if (!parsed.success) return json({ ok: false, error: "Periksa kembali isian formulir." }, 422);

  const d = parsed.data;
  // Bot: honeypot terisi atau submit terlalu cepat -> pura-pura sukses
  if (d.website || d.t < 2500) return json({ ok: true });

  const db = getSupabase();
  if (!db) return json({ ok: false, error: "Layanan pesan belum dikonfigurasi." }, 503);

  const ip_hash = hashIp(ip);
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await db
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ip_hash)
    .gte("created_at", since);
  if ((count ?? 0) >= 5)
    return json({ ok: false, error: "Batas pesan per jam tercapai." }, 429);

  const { error } = await db.from("messages").insert({
    name: clean(d.name),
    email: clean(d.email),
    subject: clean(d.subject) || null,
    message: clean(d.message),
    ip_hash,
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 200),
  });
  if (error) return json({ ok: false, error: "Gagal mengirim pesan." }, 500);
  return json({ ok: true });
}

export function GET() {
  return json({ ok: false, error: "Not found" }, 404);
}