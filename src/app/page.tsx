import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Gallery from "@/components/Gallery";
import Videos from "@/components/Videos";
import Financing from "@/components/Financing";
import Testimonials from "@/components/Testimonials";
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
        <Videos />
        <Financing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
