import React from "react";
import Hero from "./components/Hero";
import MarqueeSection from "./components/MarqueeSection";
import HowItWorksSection from "./components/HowItWorksSection";
import './index.css';
import PlayerSection from "./components/Playersection";
import LiveshopAdCarousel from './components/LiveshopAdCarousel';
import VideoPlayerSection from "./components/VideoPlayerSection";
import AudienceDataSection from "./components/AudienceDataSection";
import CompatiblePlatformsSection from "./components/CompatiblePlatformsSection";
import VideoCommerceSection from "./components/VideoCommerceSection";
import NumerosSection from "./components/NumerosSection";
import SectionPlanos from "./components/SectionPlanos";
import SectionBeneficios from "./components/SectionBeneficios";
import SectionCTA from "./components/SectionCTA";
import SectionContato from "./components/SectionContato";


export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <MarqueeSection />
      <NumerosSection />
      <HowItWorksSection />
      <PlayerSection />
      <LiveshopAdCarousel />
      <VideoPlayerSection />
      <AudienceDataSection />
      <CompatiblePlatformsSection />
      <VideoCommerceSection />
      <SectionPlanos />
      <SectionBeneficios />
      <SectionCTA />
      <SectionContato />
      {/* próximas seções */}
    </div>
  );
}
