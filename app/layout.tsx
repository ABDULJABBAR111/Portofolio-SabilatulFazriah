import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import "./globals.css";
import "./effects.css";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sabilatul Fazriah — Portfolio",
  description: "Portfolio Sabilatul Fazriah, S1 Manajemen Keuangan (IPK 3,83) · Finance & Accounting enthusiast.",
  robots: { index: true, follow: true },
  openGraph: { title: "Sabilatul Fazriah — Portfolio", description: "Finance & Accounting enthusiast · Manajemen Keuangan UNPAM", type: "website", locale: "id_ID" },
};
export const viewport: Viewport = { themeColor: "#f4ede6", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}