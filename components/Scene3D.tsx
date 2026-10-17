"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Input bersama (diisi listener window, dibaca di useFrame tanpa re-render)
const input = { px: 0, py: 0, sy: 0 };

const COIN_GEO = new THREE.CylinderGeometry(1, 1, 0.16, 32);
const RIM_GEO = new THREE.TorusGeometry(0.78, 0.04, 8, 32);
const RIM_MAT = new THREE.MeshStandardMaterial({ color: "#fff2d0", metalness: 0.6, roughness: 0.3 });
const matCache = new Map<string, THREE.MeshStandardMaterial>();
function coinMat(color: string) {
  let m = matCache.get(color);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, metalness: 0.75, roughness: 0.28 });
    matCache.set(color, m);
  }
  return m;
}

type CoinData = { p: [number, number, number]; s: number; v: number; c: string };

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

// 6 koin pertama = tampilan hero; sisanya di tepi kiri/kanan layar sepanjang halaman
const TAN = Math.tan(THREE.MathUtils.degToRad(25)); // setengah fov 50°
const COINS: CoinData[] = (() => {
  const out: CoinData[] = [
    { p: [-6.0, 3.0, -2], s: 0.45, v: 0.8, c: "#d4a84b" },
    { p: [-3.6, -3.4, -1], s: 0.4, v: 1.2, c: "#c9726f" },
    { p: [4.8, 2.6, -2], s: 0.9, v: 0.6, c: "#d4a84b" },
    { p: [5.6, -1.8, 0], s: 0.55, v: 1.0, c: "#ee9a8d" },
    { p: [0.4, 3.4, -3], s: 0.4, v: 1.4, c: "#dcc6b3" },
    { p: [2.4, -3.3, -1.5], s: 0.6, v: 0.7, c: "#d4a84b" },
  ];
  const r = seeded(7);
  const palette = ["#d4a84b", "#c9726f", "#ee9a8d", "#dcc6b3", "#d4a84b"];
  for (let i = 0; i < 14; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const z = -1 - r() * 3;
    const halfW = (8 - z) * TAN * 1.8; // setengah lebar layar pada kedalaman z
    out.push({
      p: [side * halfW * (0.84 + r() * 0.2), -4.5 - i * 2.4 - r() * 1.2, z],
      s: 0.3 + r() * 0.35,
      v: 0.5 + r(),
      c: palette[i % palette.length],
    });
  }
  return out;
})();

function Coin({ c }: { c: CoinData }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * c.v;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.6}>
      <group position={c.p} scale={c.s} rotation={[Math.PI / 2.4, 0, 0.3]}>
        <group ref={ref}>
          <mesh geometry={COIN_GEO} material={coinMat(c.c)} />
          <mesh geometry={RIM_GEO} material={RIM_MAT} />
        </group>
      </group>
    </Float>
  );
}

function Rig() {
  const lights = useRef<THREE.Group>(null);
  const dust = useMemo(() => {
    const a = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      a[i * 3] = (Math.random() - 0.5) * 18;
      a[i * 3 + 1] = 4 - Math.random() * 46;
      a[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return a;
  }, []);

  useFrame(({ camera }) => {
    const ty = -input.sy * 0.0042 + input.py * 0.35;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, input.px * 0.7, 0.05);
    if (lights.current) lights.current.position.y = camera.position.y; // lampu ikut kamera
  });

  return (
    <>
      <group ref={lights}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 6]} intensity={3.2} color="#fff0dc" />
        <pointLight position={[-6, -2, 4]} intensity={30} color="#ee9a8d" />
        <pointLight position={[6, 3, 2]} intensity={25} color="#d4a84b" />
      </group>
      {COINS.map((c, i) => (
        <Coin key={i} c={c} />
      ))}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#f3d9c2" transparent opacity={0.6} sizeAttenuation />
      </points>
    </>
  );
}

export default function Scene3D() {
  const [tabVisible, setTabVisible] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [dpr, setDpr] = useState(1.25);

  // Mulai saat browser idle; lewati di layar kecil / reduced-motion
  useEffect(() => {
    const small = window.matchMedia("(max-width: 720px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (small || reduce) return;
    const start = () => setEnabled(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 600);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      input.px = (e.clientX / window.innerWidth) * 2 - 1;
      input.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      input.sy = window.scrollY;
    };
    const onVis = () => setTabVisible(!document.hidden);
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className={`bd-canvas ${ready ? "ready" : ""}`}>
      {enabled && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={dpr}
          frameloop={tabVisible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => setReady(true)}
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} />
          <Rig />
        </Canvas>
      )}
    </div>
  );
}