import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Speakers from "@/components/Speakers";
import Events from "@/components/Events";
import Schedule from "@/components/Schedule";
import Sponsors from "@/components/Sponsors";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Natural Narrative Flow */}
        <Hero />
        <About />
        <Speakers />
        <Events />
        <Schedule />
        <Sponsors />
        <Register />
      </main>
      <Footer />
    </>
  );
}
