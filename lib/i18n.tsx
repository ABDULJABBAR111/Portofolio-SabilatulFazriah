"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Lang } from "./data";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content };
const LangCtx = createContext<Ctx>({ lang: "id", setLang: () => {}, t: content.id });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const s = localStorage.getItem("lang");
      if (s === "id" || s === "en") setLangState(s);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  }, []);

  return <LangCtx.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);