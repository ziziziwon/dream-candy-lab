import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import ProductSection from "../sections/ProductSection";
import EventSection from "../sections/EventSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-lab-cream">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductSection />
        <EventSection />
      </main>
      <Footer />
    </div>
  );
}




