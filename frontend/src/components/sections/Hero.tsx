import { CheckCircle, Users, Zap, Truck, MessageCircle, Phone, CreditCard, Briefcase, Globe, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_URL = "https://wa.me/17789177003?text=Hi%2C%20I%27d%20like%20to%20check%20my%20approval%20options.";
const PHONE_NUMBER = "tel:+17789177003";

const badges = [
  { icon: Users, label: "All Credit Types Welcome" },
  { icon: Globe, label: "PR · Work Permit · Student · New Immigrant" },
  { icon: Zap, label: "Fast Bank Approvals" },
  { icon: Truck, label: "Delivery Across BC, Alberta & All Over Canada" },
];

const Hero = () => {
  const { openForm } = usePreApprovalForm();

  return (
    <section className="relative pt-16 min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-dark text-primary text-xs sm:text-sm font-medium mb-6 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse flex-shrink-0" />
              🇨🇦 Serving All of Canada · Pre-Owned Vehicles · Fast Online Approval
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-extrabold text-white leading-[1.08] mb-4 text-balance font-display">
              Get Approved for a Car in Minutes —{" "}
              <span className="gradient-text">Drive Today</span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg font-medium mb-2">
              Fast approvals · All credit welcome · No pressure · Real vehicles ready
            </p>

            <p className="text-primary font-bold text-sm sm:text-base mb-8">
              Bankruptcy / Collections — No problem
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-8">
              <Button
                size="lg"
                onClick={openForm}
                className="shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full px-6 sm:px-10 h-14 sm:h-16 text-sm sm:text-lg font-bold shadow-lg w-full sm:w-auto min-h-[56px] hover:scale-105 transition-transform"
                style={{ boxShadow: "var(--shadow-primary)" }}
              >
                ✅ Check My Approval Now →
              </Button>
              <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
                <a
                  href={PHONE_NUMBER}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 h-11 sm:h-auto sm:py-3 rounded-full glass-dark text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium text-xs sm:text-sm min-h-[44px]"
                >
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="truncate">Call / Text</span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 h-11 sm:h-auto sm:py-3 rounded-full glass-dark text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium text-xs sm:text-sm min-h-[44px]"
                >
                  <MessageCircle className="h-4 w-4 text-green flex-shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {badges.map((b) => (
                <div key={b.label} className="flex items-center gap-2 px-3 py-2 rounded-full glass-dark text-white/70 text-[11px] sm:text-xs font-medium badge-glow">
                  <b.icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { label: "$0 Down O.A.C.", sub: "Drive today" },
            { label: "$15K Cash-Back", sub: "O.A.C." },
            { label: "3–6 Mo. No Payments", sub: "O.A.C." },
            { label: "From 6.29%", sub: "Lowest rates" },
          ].map((o) => (
            <div key={o.label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass-dark">
              <CheckCircle className="h-3.5 w-3.5 text-green flex-shrink-0" />
              <div>
                <p className="text-white text-xs font-bold">{o.label}</p>
                <p className="text-white/40 text-[10px]">{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;