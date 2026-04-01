import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingWhatsApp />
    </div>
  );
};

export default Contact;
