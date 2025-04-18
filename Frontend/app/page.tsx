import ButtonGradient from "@/assets/svg/ButtonGradient";
import Benefits from "@/components/Benefits";
import Collaboration from "@/components/Collaboration";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-black">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

