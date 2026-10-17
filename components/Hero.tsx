"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const WORD = "PORTFOLIO".split("");
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING = { stiffness: 110, damping: 18, mass: 0.6 };

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  // Posisi kursor (-0.5..0.5) -> pegas -> rotasi 3D. Tanpa re-render React.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const titleRY = useTransform(sx, (v) => v * 14);
  const titleRX = useTransform(sy, (v) => v * -10);
  const photoRY = useTransform(sx, (v) => v * -34);
  const photoRX = useTransform(sy, (v) => v * 24);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero-grid container">
        <div className="hero-text">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            {t.hero.hello}
          </motion.p>
          <motion.h1 className="hero-name" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: EASE }}>
            {profile.name}
          </motion.h1>
          <motion.div className="hero-title" role="presentation" aria-hidden style={{ rotateX: titleRX, rotateY: titleRY }}>
            {WORD.map((ch, i) => (
              <motion.span
                key={i}
                className="hero-letter"
                initial={{ opacity: 0, rotateX: -90, y: 60 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ delay: 0.35 + i * 0.05, duration: 0.7, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
          <motion.p className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
            <span className="line" />{t.hero.role} <em>·</em> {t.hero.sub}
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }}>
            <a href="#project" className="btn btn-primary">{t.hero.cta1} <span>»</span></a>
            <a href="#contact" className="btn btn-ghost">{t.hero.cta2}</a>
          </motion.div>
        </div>

        <motion.div className="hero-photo" initial={{ opacity: 0, y: 50, rotate: 8 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }}>
          <div className="pc-sway">
            <motion.div className="pc-stage" style={{ rotateX: photoRX, rotateY: photoRY }}>
              <div className="pc-glow" aria-hidden />
              <div className="pc-frame">
                <div className="pc-window" />
                <div className="pc-person">
                  <Image src="/img/portrait.webp" alt="Sabilatul Fazriah" width={828} height={1536} priority sizes="(max-width:900px) 70vw, 420px" />
                </div>
              </div>
              <div className="pc-shadow" aria-hidden />
              <div className="chip chip-a"><b>{t.hero.chips[0].b}</b><small>{t.hero.chips[0].s}</small></div>
              <div className="chip chip-b"><b>{t.hero.chips[1].b}</b><small>{t.hero.chips[1].s}</small></div>
              <div className="chip chip-c"><b>{t.hero.chips[2].b}</b><small>{t.hero.chips[2].s}</small></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll"><i /></a>
    </section>
  );
}