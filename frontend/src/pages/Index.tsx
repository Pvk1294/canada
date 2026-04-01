import Header from "@/components/Header";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import TrustBanner from "@/components/TrustBanner";
import Hero from "@/components/sections/Hero";
import DeliveredSection from "@/components/sections/DeliveredSection";
import Services from "@/components/sections/Services";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import IndigenousSection from "@/components/sections/IndigenousSection";
import TrustSection from "@/components/sections/TrustSection";

import FinancingSection from "@/components/sections/FinancingSection";
import FeaturedVehiclesSection from "@/components/sections/FeaturedVehiclesSection";

import Footer from "@/components/Footer";
import ExitPopup from "@/components/ExitPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustBanner />
        <Services />
        <FeaturedVehiclesSection />
        <HowItWorksSection />
        <WhyUsSection />
        <TrustSection />
        <IndigenousSection />
        <DeliveredSection />
        
        <FinancingSection />
        
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingWhatsApp />
      <ExitPopup />
    </div>
  );
};

export default Index;