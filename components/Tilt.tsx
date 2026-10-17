"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/** Kartu 3D: miring mengikuti kursor + kilau cahaya (di-throttle dengan rAF). */
export default function Tilt({
  children,
  max = 10,
  className = "",
  style,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    pos.current = { x: e.clientX, y: e.clientY };
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (pos.current.x - r.left) / r.width;
      const py = (pos.current.y - r.top) / r.height;
      el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    });
  };

  const leave = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div className={`tilt ${className}`} style={style} ref={ref} onPointerMove={move} onPointerLeave={leave}>
      <div className="tilt-inner">
        {children}
        <span className="tilt-glare" aria-hidden />
      </div>
    </div>
  );
}