import { useEffect, useState } from "react";
import { DollarSign, Banknote, CalendarOff, TrendingUp, Shield, Zap, ShieldCheck, CreditCard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";

const benefits = [
  { icon: DollarSign, title: "$0 Down O.A.C.", desc: "Drive today" },
  { icon: Banknote, title: "Up to $15K Cash-Back", desc: "Pay off high-interest cards" },
  { icon: CalendarOff, title: "6 Mo. No Payments", desc: "O.A.C. — start later" },
  { icon: TrendingUp, title: "From 6.29% Rate", desc: "Lowest rates possible" },
  { icon: Shield, title: "Free 1 Month Warranty", desc: "On all purchases" },
  { icon: Zap, title: "Fast Approvals", desc: "Most within hours" },
];

const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let s = 0; const inc = end / 100;
    const t = setInterval(() => { s += inc; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [end]);
  return <>{count.toLocaleString()}</>;
};

const FinancingSection = () => {
  const { openForm } = usePreApprovalForm();

  return (
    <section id="financing" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/30 to-background pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Pre-Approval</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground text-balance">
            Check Your <span className="gradient-text">Pre-Approval</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-base">
            Easy, simple, mobile-friendly — takes just 2 minutes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight text-center">
              Your Private <span className="text-primary">Approval Partner</span>
            </h3>
            <p className="text-white/50 text-sm mb-8 leading-relaxed text-center max-w-lg mx-auto">
              Not a dealership. Not pressure sales. We help you get approved honestly — all credit situations welcome.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8 pb-8 border-b border-white/5">
              <div className="text-center">
                <p className="text-xl sm:text-3xl font-extrabold text-primary"><CountUp end={720} /></p>
                <p className="text-[9px] sm:text-[10px] text-white/40">Approved this month</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-3xl font-extrabold text-green">99%</p>
                <p className="text-[9px] sm:text-[10px] text-white/40">Approval rate</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-3xl font-extrabold text-gold">300+</p>
                <p className="text-[9px] sm:text-[10px] text-white/40">Vehicles available</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <b.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{b.title}</p>
                    <p className="text-xs text-white/40">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center px-2 sm:px-0">
              <Button
                onClick={openForm}
                size="lg"
                className="shimmer-button animate-pulse-soft bg-primary text-primary-foreground hover:bg-blue-light rounded-full w-full sm:w-auto px-6 sm:px-10 h-12 sm:h-14 text-sm sm:text-base font-bold min-h-[48px]"
                style={{ boxShadow: "var(--shadow-primary)" }}
              >
                ✅ Check My Approval Now (2 mins) →
              </Button>
              <p className="text-[11px] text-white/30 mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                256-bit SSL · 100% confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;