"use client";
import { Fragment, type ComponentType, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const letter: Variants = {
  hide: { opacity: 0, rotateX: -90, y: 50 },
  show: (d: number) => ({ opacity: 1, rotateX: 0, y: 0, transition: { delay: d, duration: 0.8, ease: EASE } }),
};

/** Judul per-huruf 3D (seperti intro hero), diputar ulang tiap section masuk layar. */
export function SplitTitle({ a, b, light = false }: { a: string; b: string; light?: boolean }) {
  const chars = Array.from(a + b).map((ch, i) => ({ ch, hl: i >= a.length }));
  const words: { ch: string; hl: boolean }[][] = [[]];
  chars.forEach((c) => (c.ch === " " ? words.push([]) : words[words.length - 1].push(c)));
  let n = 0;
  return (
    <motion.div
      className={`sec-title ${light ? "light" : ""}`}
      initial="hide"
      whileInView="show"
      viewport={{ once: false, amount: 0.6 }}
    >
      <h2 aria-label={a + b}>
        <span aria-hidden>
          {words.map((w, wi) => (
            <Fragment key={wi}>
              <span className="st-word">
                {w.map((c, ci) => (
                  <motion.span key={ci} className={`st-ch ${c.hl ? "hl" : ""}`} variants={letter} custom={0.1 + n++ * 0.045}>
                    {c.ch}
                  </motion.span>
                ))}
              </span>{" "}
            </Fragment>
          ))}
        </span>
      </h2>
      <motion.span
        className="arrows"
        aria-hidden
        variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { delay: 0.2 + n * 0.045, duration: 0.7 } } }}
      >
        »»»
      </motion.span>
    </motion.div>
  );
}

const wordV: Variants = {
  hide: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

/** Teks muncul kata per kata (naik dari balik topeng) saat masuk layar. */
export function RevealText({
  text,
  tag = "p",
  className = "",
  delay = 0,
  tail,
}: {
  text: string;
  tag?: "p" | "h3" | "span";
  className?: string;
  delay?: number;
  tail?: ReactNode;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  const stagger = Math.min(0.03, 1.1 / Math.max(words.length, 1));
  const MTag = (motion as unknown as Record<string, ComponentType<any>>)[tag];
  return (
    <MTag
      className={className}
      aria-label={text}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hide: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="rw-mask" aria-hidden>
            <motion.span className="rw" variants={wordV}>{w}</motion.span>
          </span>{" "}
        </Fragment>
      ))}
      {tail && (
        <span className="rw-mask">
          <motion.span className="rw" variants={wordV}>{tail}</motion.span>
        </span>
      )}
    </MTag>
  );
}