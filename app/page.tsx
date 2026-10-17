import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import { About, Education, Experience, Skills, Certificates, Project, Footer } from "@/components/Sections";

// Dinamis agar CSP nonce per-request diterapkan pada script Next.js
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Certificates />
        <Project />
        <Contact />
      </main>
      <Footer />
    </>
  );
}