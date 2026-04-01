import { DollarSign, Banknote, ArrowLeftRight, TrendingUp, Shield, Calendar, ArrowRight, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";

const services = [
  { icon: DollarSign, title: "$0 Down O.A.C.", desc: "Drive today — no down payment required on approved credit.", accent: "bg-primary", iconBg: "bg-primary/10 text-primary", badge: null },
  { icon: Banknote, title: "Up to $15,000 Cash-Back O.A.C.", desc: "Use your cash-back to pay off high-interest credit cards!", accent: "bg-green", iconBg: "bg-green/10 text-green", badge: null },
  { icon: Calendar, title: "3–6 Months No Payments O.A.C.", desc: "Breathe easy — defer your first payment for up to 6 months.", accent: "bg-primary", iconBg: "bg-primary/10 text-primary", badge: "Limited Time Offer" },
  { icon: TrendingUp, title: "Rates From 6.29% O.A.C.", desc: "Lowest possible interest rates through our top Canadian lender partnerships.", accent: "bg-primary", iconBg: "bg-primary/10 text-primary", badge: null },
  { icon: Shield, title: "First-Year Insurance Credit", desc: "Available on select units O.A.C. — start saving from day one.", accent: "bg-green", iconBg: "bg-green/10 text-green", badge: "Limited Time Offer" },
  { icon: Car, title: "300+ Vehicles in Inventory", desc: "SUVs, sedans, trucks, hatchbacks — find the right vehicle through our licensed dealership partners.", accent: "bg-primary", iconBg: "bg-primary/10 text-primary", badge: null },
];

const Services = () => {
  const { openForm } = usePreApprovalForm();

  return (
    <section id="services" className="section-padding bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">What We Offer</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground text-balance font-display">
            Flexible <span className="gradient-text">Financing Options</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            We work with top Canadian lenders daily to get you the best deal possible — all credit situations welcome.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <div key={s.title} className="group bg-card rounded-2xl p-7 border border-border hover-lift relative overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className={`absolute top-0 left-0 right-0 h-1 ${s.accent} group-hover:h-1.5 transition-all duration-300`} />
              <span className="absolute top-3 right-4 text-6xl font-extrabold text-foreground/[0.03] select-none">{String(i + 1).padStart(2, "0")}</span>
              {s.badge && (
                <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-3">
                  {s.badge}
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2 relative z-10">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed relative z-10">{s.desc}</p>
              <button onClick={openForm} className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all relative z-10 min-h-[44px] sm:min-h-0">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-14 px-2 sm:px-0">
          <Button onClick={openForm} className="shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full w-full sm:w-auto px-8 sm:px-12 h-14 sm:h-16 text-sm sm:text-lg font-bold min-h-[56px] hover:scale-105 transition-transform" style={{ boxShadow: "var(--shadow-primary)" }}>
            Check My Approval Now →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;