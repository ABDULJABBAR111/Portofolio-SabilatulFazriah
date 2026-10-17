"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { navIds } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const Lang = (
    <div className="lang" role="group" aria-label="Language">
      {(["id", "en"] as const).map((l) => (
        <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>
          {lang === l && <motion.i layoutId="lang-thumb" className="lang-thumb" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
          <span>{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden />
      <motion.header
        className={`nav ${scrolled ? "nav-scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#home" className="nav-logo" aria-label="Home">
          <span>S</span><b>F</b>
        </a>

        <nav className="nav-links" aria-label="Main">
          {navIds.map((id, i) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {active === id && (
                <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="nav-label">{t.nav[i]}</span>
            </a>
          ))}
        </nav>

        <div className="nav-right">
          {Lang}
          <button className={`burger ${open ? "open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <i /><i />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <nav>
              {navIds.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className={active === id ? "active" : ""}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}
                >
                  <em>0{i + 1}</em>{t.nav[i]}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}