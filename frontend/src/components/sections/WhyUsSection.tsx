import { User, Landmark, HandCoins, Gift, Truck, HeartHandshake, Lock, ArrowLeftRight, Wrench, CheckCircle, CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";

const reasons = [
  { icon: User, title: "Personal 1-on-1 Service", desc: "You work with one person — not passed around between departments." },
  { icon: Landmark, title: "Strong Bank Relationships", desc: "We work with top Canadian lenders daily to get you the lowest rates possible." },
  { icon: HandCoins, title: "Honest Payment Guidance", desc: "Transparent quotes before you come in. No pressure, no surprises." },
  { icon: Gift, title: "Returning Customer Benefits", desc: "Loyalty perks for customers who come back for their next vehicle." },
  { icon: Truck, title: "Delivery Options Available", desc: "Vehicle delivery across BC, Alberta including remote communities and all over Canada." },
  { icon: HeartHandshake, title: "No Judgment", desc: "All credit situations welcome. We're here to help, not to judge." },
  { icon: Lock, title: "Private & Secure", desc: "Your information is 100% confidential and protected." },
  { icon: TrendingUp, title: "Build Your Credit", desc: "Many of our customers improve their credit score within 6-12 months." },
];

const WhyUsSection = () => {
  const { openForm } = usePreApprovalForm();

  return (
    <section id="why-us" className="section-padding bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Why ApprovalOnSpot</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground text-balance font-display">
            Why <span className="gradient-text">Choose Us?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            We're not a dealership. We're your private approval partner — focused on getting you approved honestly.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {reasons.map((r, i) => (
            <div key={r.title} className="group bg-card rounded-2xl p-6 border border-border hover-lift relative overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <span className="absolute top-3 right-4 text-5xl font-extrabold text-foreground/[0.03] select-none">{String(i + 1).padStart(2, "0")}</span>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <r.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1.5">{r.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
          <div className="rounded-3xl p-5 sm:p-8 relative overflow-hidden bg-foreground">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <ArrowLeftRight className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-extrabold text-white mb-2 font-display">🔁 Still Owe Money On Your Car?</h3>
              <p className="text-white/70 text-base font-bold mb-3">We Can Help!</p>
              <ul className="space-y-2.5 mb-4">
                {["Negative equity solutions", "Trade in your old vehicle", "Lower your payments", "We'll beat written offers"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle className="h-4 w-4 text-green flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={openForm} className="text-primary font-semibold text-xs sm:text-sm hover:underline min-h-[44px] flex items-center">
                Get Your Trade-In Value →
              </button>
            </div>
          </div>
          <div className="rounded-3xl p-5 sm:p-8 relative overflow-hidden bg-foreground">
            <div className="absolute top-0 right-0 w-48 h-48 bg-green/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Wrench className="h-8 w-8 text-green mb-4" />
              <h3 className="text-xl font-extrabold text-white mb-2 font-display">🧰 Peace of Mind</h3>
              <ul className="space-y-2.5 mb-4">
                {["100+ point inspection on every vehicle", "Warranty options available", "Carfax report available", "Free one month warranty on all purchases", "No pressure — transparent quotes before you come in"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle className="h-4 w-4 text-green flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto rounded-3xl p-5 sm:p-8 relative overflow-hidden border border-primary/20 bg-foreground">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10 text-center">
            <CreditCard className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-extrabold text-white mb-2 font-display">
              Build Your Credit <span className="text-primary">While Driving</span>
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              Many of our customers improve their credit score within 6-12 months.
            </p>
            <Button
              onClick={openForm}
              className="shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full w-full sm:w-auto px-8 h-14 sm:h-16 text-sm sm:text-lg font-bold min-h-[56px] hover:scale-105 transition-transform"
              style={{ boxShadow: "var(--shadow-primary)" }}
            >
              Check My Approval Now →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;