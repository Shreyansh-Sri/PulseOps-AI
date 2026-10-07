import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}
