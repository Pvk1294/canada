import { FileText, Users, Car, CheckCircle, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";

const steps = [
  {
    number: "1",
    icon: FileText,
    title: "Apply Online",
    desc: "Fill out our secure application in under 2 minutes.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    number: "2",
    icon: Users,
    title: "Get Approved",
    desc: "Our finance specialists work with multiple banks to get you approved.",
    color: "text-green",
    bg: "bg-green/10",
  },
  {
    number: "3",
    icon: Car,
    title: "Drive Your Car",
    desc: "Pick up your vehicle or get delivery anywhere in Canada.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const badges = [
  { icon: Zap, text: "Fast" },
  { icon: Shield, text: "Secure" },
  { icon: CheckCircle, text: "No obligation" },
];

const HowItWorksSection = () => {
  const { openForm } = usePreApprovalForm();

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Simple Process</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground text-balance font-display">
            How It Works — <span className="gradient-text">3 Simple Steps</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}
              <div className="relative z-10">
                <div className={`w-20 h-20 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`h-9 w-9 ${step.color}`} />
                </div>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${step.bg} ${step.color} font-extrabold text-sm mb-3`}>
                  {step.number}
                </div>
                <h3 className="font-extrabold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-foreground">
              <b.icon className="h-4 w-4 text-green" />
              {b.text}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={openForm}
            className="shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full w-full sm:w-auto px-8 h-14 sm:h-16 text-sm sm:text-lg font-bold min-h-[56px] hover:scale-105 transition-transform"
            style={{ boxShadow: "var(--shadow-primary)" }}
          >
            Check My Approval Now →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;