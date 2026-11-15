import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Gallery from "@/components/Gallery";
import Projects2025 from "@/components/Projects2025";
import Videos from "@/components/Videos";
import Financing from "@/components/Financing";
import Testimonials from "@/components/Testimonials";
import HiringBanner from "@/components/HiringBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-molave">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProjects />
        <Gallery />
        <Projects2025 />
        <Videos />
        <Financing />
        <Testimonials />
        <HiringBanner />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
