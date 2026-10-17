"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

// Deterministik (tanpa Math.random) supaya tidak bentrok saat hydration
const DOTS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 41 + 9) % 100,
  size: 5 + ((i * 7) % 9),
  dur: 16 + ((i * 5) % 14),
  delay: -((i * 2.3) % 20),
  ring: i % 5 === 0,
}));

/** Latar animasi untuk seluruh halaman: warna hangat hero, glow melayang, grid, titik emas, dan koin 3D. */
export default function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      el.style.setProperty("--hero", String(Math.max(0, 1 - y / (vh * 0.9))));
      el.style.setProperty("--sp", String(Math.min(1, y / max)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="backdrop" ref={ref} aria-hidden>
      <div className="bd-warm" />
      <div className="bd-grid" />
      <div className="bd-blob bd-a" />
      <div className="bd-blob bd-b" />
      <div className="bd-blob bd-c" />
      {DOTS.map((d, i) => (
        <i
          key={i}
          className={`bd-dot ${d.ring ? "ring" : ""}`}
          style={{ left: `${d.left}%`, width: d.size, height: d.size, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }}
        />
      ))}
      <Scene3D />
    </div>
  );
}