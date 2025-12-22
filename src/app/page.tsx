import Evolution from "@/components/sections/Evolution";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stack from "@/components/sections/Stack";
import Work from "@/components/sections/Work";
import LatestInsights from "@/components/sections/LatestInsights"; // 1. Import This
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main className="relative bg-[#050511]">
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="stack">
        <Stack />
      </section>

      <Services />

      <section id="work">
        <Work />
      </section>

      <section id="about">
        <Evolution />
      </section>

      {/* 2. Add LatestInsights Here */}
      {/* We don't strictly need an ID for scroll spy since the nav link goes to /blog page, 
          but you can keep it just as a section. */}
      <LatestInsights />

      <section id="contact">
        <Footer />
      </section>

    </main>
  );
}