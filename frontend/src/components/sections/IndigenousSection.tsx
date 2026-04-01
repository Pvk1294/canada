import { Heart, CheckCircle, Truck, Zap, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";

const benefits = [
  { icon: Shield, text: "Special approval programs" },
  { icon: DollarSign, text: "Flexible down payment options" },
  { icon: Truck, text: "Delivery to remote communities" },
  { icon: Zap, text: "Fast approval with major lenders" },
];

const IndigenousSection = () => {
  const { openForm } = usePreApprovalForm();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-primary/15" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 text-balance">
                Indigenous Community <span className="text-primary">Support Program</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                We proudly support Indigenous communities. Special financing programs, flexible approvals, and exclusive discounts may be available for eligible First Nations customers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto mb-8">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="h-5 w-5 text-green flex-shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={openForm}
                className="shimmer-button animate-pulse-soft bg-primary text-primary-foreground hover:bg-blue-light rounded-full w-full sm:w-auto px-8 h-12 sm:h-14 text-sm sm:text-base font-bold min-h-[48px]"
                style={{ boxShadow: "var(--shadow-primary)" }}
              >
                Check My Approval Now (2 mins) →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndigenousSection;