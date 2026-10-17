"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { SectionTitle } from "./Sections";
import { profile } from "@/lib/data";
import { useLang } from "@/lib/i18n";

type State = "idle" | "sending" | "ok" | "error";

export default function Contact() {
  const { t } = useLang();
  const f = t.contact.form;
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const t0 = useRef(0);
  useEffect(() => { t0.current = Date.now(); }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d.get("name"), email: d.get("email"), subject: d.get("subject") ?? "",
          message: d.get("message"), website: d.get("website") ?? "", t: Date.now() - t0.current,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) { setState("ok"); setMsg(f.ok); form.reset(); }
      else { setState("error"); setMsg(res.status === 429 ? f.rate : res.status === 503 ? f.conf : f.fail); }
    } catch {
      setState("error"); setMsg(f.net);
    }
  }

  const L = t.contact.labels;
  const items = [
    { icon: "☎", title: L.phone, label: profile.phone, href: profile.phoneLink },
    { icon: "✉", title: L.email, label: profile.email, href: `mailto:${profile.email}` },
    { icon: "in", title: L.linkedin, label: "sabilatul-fazriah", href: profile.linkedin },
    { icon: "◎", title: L.instagram, label: "@biiels_", href: profile.instagram },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle a={t.contact.title.a} b={t.contact.title.b} />
        <div className="contact-grid">
          <Reveal x={-40} y={0}>
            <ul className="contact-list">
              {items.map((c) => (
                <li key={c.title}>
                  <a href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer">
                    <span className="ci">{c.icon}</span>
                    <span className="ct"><small>{c.title}</small>{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Tilt max={10} className="mini-polaroid">
              <Image src="/img/portrait.webp" alt="" width={414} height={768} sizes="200px" />
            </Tilt>
          </Reveal>
          <Reveal x={40} y={0}>
            <form className="form" onSubmit={submit}>
              <div className="row">
                <label>{f.name}<input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label>
                <label>{f.email}<input name="email" type="email" required maxLength={120} autoComplete="email" /></label>
              </div>
              <label>{f.subject}<input name="subject" maxLength={120} /></label>
              <label>{f.message}<textarea name="message" rows={5} required minLength={10} maxLength={2000} /></label>
              <div className="hp" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? f.sending : <>{f.send} »</>}</button>
              {(state === "ok" || state === "error") && <p className={`note ${state}`} role="status">{msg}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}