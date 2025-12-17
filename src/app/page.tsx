import Evolution from "@/components/sections/Evolution";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services"; // Note: Navbar e 'Services' nei, tai ID dei ni.
import Stack from "@/components/sections/Stack";
import Work from "@/components/sections/Work";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main className="relative bg-[#050511]">
      {/* 1. Navbar Added */}
      <Navbar />

      {/* 2. Sections Wrapped with IDs for Scroll Spy */}
      
      <section id="home">
        <Hero />
      </section>

      {/* Note: Tumi Navbar e 'Stack' age rekhecho, kintu Page flow te pore. 
         Navbar: Home > Work > Stack
         Page:   Home > Stack > Services > Work
         Jodi click korle jump kore, eta normal. */}
         
      <section id="stack">
        <Stack />
      </section>

      {/* Services Nav e nei, tai direct render korlam */}
      <Services />

      <section id="work">
        <Work />
      </section>

      <section id="about">
        <Evolution /> {/* Evolution ke 'About' section hisebe dhorlam */}
      </section>

      <section id="contact">
        <Footer /> {/* Footer ke 'Contact' section hisebe dhorlam */}
      </section>

    </main>
  );
}