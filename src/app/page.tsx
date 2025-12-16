import Evolution from "@/components/sections/Evolution";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stack from "@/components/sections/Stack";
import Work from "@/components/sections/Work";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <Stack></Stack>
      <Services></Services>
      <Work></Work>
      <Evolution></Evolution>
      <Footer></Footer>
    </div>
  );
}
