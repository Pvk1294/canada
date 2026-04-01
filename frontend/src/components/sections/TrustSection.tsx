import { FileCheck, Search, Users, Landmark, CheckCircle } from "lucide-react";

const trustItems = [
  { icon: FileCheck, text: "Carfax available" },
  { icon: Search, text: "Certified inspection" },
  { icon: Users, text: "1000+ happy customers" },
  { icon: Landmark, text: "Bank partnerships" },
];

const TrustSection = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">
            Trusted By <span className="gradient-text">Thousands</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
          {trustItems.map((item) => (
            <div key={item.text} className="flex flex-col items-center gap-3 p-5 sm:p-7 rounded-2xl bg-card border border-border hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-green" />
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-foreground text-center">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;