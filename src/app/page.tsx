import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import About from "@/components/home/About";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Technology from "@/components/home/Technology";
import Training from "@/components/home/Training";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Pillars />
        <FeaturedProducts />
        <Technology />
        <Training />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
