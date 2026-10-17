"use client";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { RevealText, SplitTitle } from "./Fx";
import { certMeta, expMeta, profile, skillMeta } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SectionTitle({ a, b, light = false }: { a: string; b: string; light?: boolean }) {
  return <SplitTitle a={a} b={b} light={light} />;
}

function Sparkles({ n = 14 }: { n?: number }) {
  return (
    <div className="sparkles" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <i
          key={i}
          style={{ left: `${(i * 53 + 7) % 100}%`, top: `${(i * 37 + 13) % 100}%`, "--d": `${(i * 0.7) % 5}s`, "--s": `${4 + ((i * 3) % 7)}px` } as CSSProperties}
        />
      ))}
    </div>
  );
}

/* ---------------- ABOUT ---------------- */

const orbitNodes = [
  { s: "Σ", l: "Excel" },
  { s: "%", l: "Finance" },
  { s: "▤", l: "Data" },
  { s: "✓", l: "Admin" },
  { s: "◎", l: "Accounting" },
];

function Orbit() {
  return (
    <div className="orbit" aria-hidden>
      <div className="orbit-glow" />
      <span className="orbit-ring r1" />
      <span className="orbit-ring r2" />
      <span className="orbit-ring r3" />
      <div className="orbit-spin">
        {orbitNodes.map((n, i) => (
          <div key={n.l} className="orbit-node" style={{ "--a": `${i * 72}deg` } as CSSProperties}>
            <div className="orbit-chip"><b>{n.s}</b><small>{n.l}</small></div>
          </div>
        ))}
      </div>
      <div className="orbit-spin rev">
        {[0, 1, 2].map((i) => (
          <div key={i} className="orbit-node" style={{ "--a": `${i * 120}deg` } as CSSProperties}>
            <i className="orbit-dot" />
          </div>
        ))}
      </div>
      <div className="orbit-coin"><span>SF</span></div>
      <div className="orbit-chart">
        <div className="oc-bars">
          {[40, 65, 50, 80, 95].map((h, i) => (
            <i key={i} style={{ "--h": `${h}%`, "--i": i } as CSSProperties} />
          ))}
        </div>
        <svg viewBox="0 0 100 24" preserveAspectRatio="none">
          <path pathLength="1" d="M0,20 C14,18 22,6 38,11 S62,4 74,8 S92,2 100,1" />
        </svg>
      </div>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section section-first">
      <div className="container">
        <SectionTitle a={t.about.title.a} b={t.about.title.b} />
        <div className="about-grid">
          <Reveal x={-40} y={0}>
            <Tilt max={5} className="about-card">
              <RevealText tag="p" className="about-lead" text={t.about.lead} tail={<><strong>Sabilatul Fazriah</strong>.</>} />
              <RevealText tag="p" text={t.about.text} delay={0.3} />
              <div className="chips">
                {t.about.strengths.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.7, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.07, duration: 0.5, ease: EASE }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </Tilt>
          </Reveal>
          <Reveal x={40} y={0} className="orbit-wrap">
            <Orbit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */

function Gauge({ score, gid }: { score: string; gid: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const m = score.match(/\d+(?:[.,]\d+)?/);
  const raw = m ? parseFloat(m[0].replace(",", ".")) : 0;
  const dec = m && /[.,](\d+)/.test(m[0]) ? m[0].split(/[.,]/)[1].length : 0;
  const comma = !!m && m[0].includes(",");
  const max = raw <= 4 ? 4 : 100;
  const label = m ? score.replace(m[0], "").trim() : score;
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, raw, { duration: 1.8, ease: "easeOut", onUpdate: setV });
    return () => c.stop();
  }, [inView, raw]);
  const R = 44;
  const C = 2 * Math.PI * R;
  const shown = comma ? v.toFixed(dec).replace(".", ",") : v.toFixed(dec);
  return (
    <div className="gauge" ref={ref}>
      <svg viewBox="0 0 110 110" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d9a940" />
            <stop offset="100%" stopColor="#c9726f" />
          </linearGradient>
        </defs>
        <circle cx="55" cy="55" r={R} className="g-bg" />
        <circle
          cx="55" cy="55" r={R} className="g-fg" stroke={`url(#${gid})`}
          strokeDasharray={C} strokeDashoffset={inView ? C * (1 - Math.min(raw / max, 1)) : C}
          transform="rotate(-90 55 55)"
        />
      </svg>
      <div className="g-txt"><b>{shown}</b><small>{label}</small></div>
    </div>
  );
}

function EduIcon({ cap }: { cap: boolean }) {
  return cap ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 9l10-5 10 5-10 5-10-5z" /><path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" /><path d="M22 9v6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" /><path d="M8 7h7M8 11h5" />
    </svg>
  );
}

export function Education() {
  const { t } = useLang();
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionTitle a={t.edu.title.a} b={t.edu.title.b} />
        <div className="ed-track">
          {t.edu.items.map((e, i) => (
            <Fragment key={e.school}>
              {i > 0 && (
                <div className="ed-link" aria-hidden>
                  <span className="ed-dot" />
                  <span className="ed-node">»</span>
                </div>
              )}
              <Reveal delay={i * 0.15} x={i % 2 ? 50 : -50} y={20}>
                <Tilt max={8} className="ed-card">
                  <span className="ed-border" aria-hidden />
                  <div className="ed-body">
                    <span className="ed-mark" aria-hidden>{e.badge}</span>
                    <div className="ed-top">
                      <div className="ed-medal"><EduIcon cap={/^[SD]\d/i.test(e.badge)} /></div>
                      <div className="ed-tags">
                        <span className="ed-pill">{e.badge}</span>
                        {e.period && <span className="ed-period">{e.period}</span>}
                      </div>
                    </div>
                    <RevealText tag="h3" text={e.school} />
                    <p className="ed-degree">{e.degree}</p>
                    {e.detail && <p className="ed-detail">{e.detail}</p>}
                    <div className="ed-foot"><Gauge score={e.score} gid={`eg${i}`} /></div>
                  </div>
                </Tilt>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */

export function Experience() {
  const { t } = useLang();
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle a={t.exp.title.a} b={t.exp.title.b} />
        <div className="timeline">
          {t.exp.items.map((x, idx) => (
            <article key={x.title} className={`job ${idx % 2 ? "job-rev" : ""}`}>
              <div className="job-text">
                <motion.span
                  className="job-period"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {x.period} <em>{x.tag}</em>
                </motion.span>
                <RevealText tag="h3" text={x.title} />
                <RevealText tag="p" text={x.desc} delay={0.15} />
                <ul>
                  {x.points.map((p, k) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: 0.25 + k * 0.07, duration: 0.5, ease: EASE }}
                    >
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className={`mosaic mosaic-${expMeta[idx].photos.length}`}>
                {expMeta[idx].photos.map((src, i) => (
                  <Reveal key={src} delay={i * 0.1} className={`m m-${i}`}>
                    <Tilt max={10} className="photo">
                      <Image src={src} alt={x.alts[i]} width={900} height={1200} sizes="(max-width:900px) 45vw, 22vw" />
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */

const icons: Record<string, { bg: string; t: string; label: string }> = {
  excel: { bg: "#1d6f42", t: "X", label: "Excel" },
  word: { bg: "#2b579a", t: "W", label: "Word" },
  ppt: { bg: "#d24726", t: "P", label: "PowerPoint" },
  sheet: { bg: "#188038", t: "▦", label: "Sheets" },
  doc: { bg: "#4285f4", t: "≡", label: "Docs" },
  capcut: { bg: "#1c1c1c", t: "✂", label: "CapCut" },
  canva: { bg: "linear-gradient(135deg,#00c4cc,#7d2ae8)", t: "C", label: "Canva" },
};

function Ring({ level }: { level: number }) {
  const r = 44, c = 2 * Math.PI * r;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <svg ref={ref} viewBox="0 0 110 110" className="ring" role="img" aria-label={`${level}%`}>
      <circle cx="55" cy="55" r={r} className="ring-bg" />
      <circle cx="55" cy="55" r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={inView ? c * (1 - level / 100) : c} transform="rotate(-90 55 55)" />
      <text x="55" y="61" textAnchor="middle">{level}%</text>
    </svg>
  );
}

export function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle a={t.skills.title.a} b={t.skills.title.b} />
        <div className="skills">
          {skillMeta.map((g, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Tilt max={12} className="skill">
                <Ring level={g.level} />
                <div>
                  <h3>{t.skills.groups[i]}</h3>
                  <div className="skill-icons">
                    {g.items.map((k) => (
                      <span key={k} className="app-icon" style={{ background: icons[k].bg }}>
                        {icons[k].t}<small>{icons[k].label}</small>
                      </span>
                    ))}
                    {g.text && <strong className="lang-word">{g.text}</strong>}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATES ---------------- */

function Medal({ id, badge }: { id: string; badge: string }) {
  const txt = `${[badge, "CERTIFIED", "VERIFIED"].join(" • ")} • `.repeat(2);
  return (
    <>
      <svg className="cc-ring" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <path id={`cp-${id}`} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text><textPath href={`#cp-${id}`} textLength="496" lengthAdjust="spacing">{txt}</textPath></text>
      </svg>
      <span className="cc-core"><b>{badge}</b><i>✓</i></span>
    </>
  );
}

export function Certificates() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="certificate" className="section cert-sec">
      <svg className="wave wave-top" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden><path d="M0,0H1440V34C1220,96 1000,6 760,46C520,86 250,10 0,56Z" /></svg>
      <svg className="wave wave-bot" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden><path d="M0,0H1440V34C1220,96 1000,6 760,46C520,86 250,10 0,56Z" /></svg>
      <div className="cert-glow" aria-hidden />
      <Sparkles n={18} />
      <div className="container">
        <SectionTitle a={t.cert.title.a} b={t.cert.title.b} light />
        <div className="certs">
          {certMeta.map((c, i) => {
            const it = t.cert.items[i];
            return (
              <Reveal key={c.id} delay={i * 0.15} y={60} className={`cc-wrap cert-${c.id}`}>
                <Tilt max={11} className="cc">
                  <div className="cc-card">
                    <div className="cc-clip" aria-hidden><span className="cc-sheen" /></div>
                    <button className="cc-medal" onClick={() => setOpen(i)} aria-label={`${t.cert.view} ${it.title}`}>
                      <Medal id={String(c.id)} badge={c.badge} />
                    </button>
                    <div className="cc-info">
                      <span className="cert-tag">{it.tag}</span>
                      <h3>{it.title}</h3>
                      <p className="issuer">{it.issuer}</p>
                      <div className="cert-chips">{it.chips.map((x) => <span key={x}>{x}</span>)}</div>
                      <dl>
                        {it.meta.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
                      </dl>
                      <button className="btn btn-gold" onClick={() => setOpen(i)}>{t.cert.view} »</button>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.cert.items[open].title} onClick={() => setOpen(null)}>
          <button className="lb-close" aria-label={t.cert.close}>✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={certMeta[open].img} alt={t.cert.items[open].alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

/* ---------------- PROJECT ---------------- */

export function Project() {
  const { t } = useLang();
  const p = t.project;
  return (
    <section id="project" className="section">
      <div className="container">
        <SectionTitle a={p.title.a} b={p.title.b} />
        <Reveal>
          <Tilt max={3} className="project">
            <div className="proj-left">
              <span className="proj-label"><i />{p.label}</span>
              <h3>{p.h1} <em>{p.h2}</em></h3>
              <span className="proj-pill">{p.pill}</span>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-feats">
                {p.features.map((f, i) => (
                  <div key={f.t} className="feat">
                    <span className="feat-ic">{["Σ", "▤", "◧"][i]}</span>
                    <div><b>{f.t}</b><small>{f.d}</small></div>
                  </div>
                ))}
              </div>
              <div className="proj-out">
                <span className="out-ic">✓</span>
                <div><small>{p.outLabel}</small><p>{p.out}</p></div>
              </div>
            </div>
            <div className="proj-right">
              <div className="xls">
                <div className="xls-title">{p.tableTitle}</div>
                <div className="xls-co"><b>{p.company}</b><span>{p.period}</span></div>
                <p className="xls-bal">{p.balance}</p>
                <div className="xls-wrap">
                  <table>
                    <thead><tr>{p.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                      {p.rows.map((r) => (
                        <tr key={r[0]}>
                          {r.map((c, j) => (<td key={j} className={j === 3 ? (j && (c === "Masuk" || c === "In") ? "in" : "out") : j === 4 ? "amt" : ""}>{c}</td>))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <a className="btn btn-brown" href={profile.project} target="_blank" rel="noopener noreferrer">{p.open} <span>↗</span></a>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <svg className="wave wave-top" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden><path d="M0,0H1440V34C1220,96 1000,6 760,46C520,86 250,10 0,56Z" /></svg>
      <Sparkles n={12} />
      <p className="foot-big">{t.footer} <span>»»»</span></p>
      <p className="foot-small">© {new Date().getFullYear()} Sabilatul Fazriah</p>
    </footer>
  );
}