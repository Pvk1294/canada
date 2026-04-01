import { Phone, MessageCircle, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/17789177003?text=Hi%2C%20I%27d%20like%20to%20book%20a%20quick%20approval%20call.";
const PHONE_NUMBER = "tel:+17789177003";

const AdvisorSection = () => {
  const { toast } = useToast();
  const [callForm, setCallForm] = useState({ name: "", phone: "", preferredTime: "" });
  const [booked, setBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callForm.name.trim() || !callForm.phone.trim()) return;
    setBooked(true);
    toast({ title: "Call Booked! 📞", description: "We'll call you at your preferred time." });
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Your Advisor</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground text-balance">
            Who You'll Be <span className="gradient-text">Working With</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Advisor card */}
          <div className="text-center md:text-left">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-blue-glow flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-lg mx-auto md:mx-0 mb-6">
              AD
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-2">ApprovedDrive Team</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              "I personally work with Canadian lenders to help you get approved honestly — not pushed into something you don't need."
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full gap-2 border-green/30 text-green hover:bg-green/10">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Approval Chat
                </Button>
              </a>
              <a href={PHONE_NUMBER}>
                <Button variant="outline" className="rounded-full gap-2">
                  <Phone className="h-4 w-4" /> Call / Text Now
                </Button>
              </a>
            </div>
          </div>

          {/* Call Scheduler */}
          <div className="bg-card rounded-3xl border border-border p-6 md:p-8" style={{ boxShadow: "var(--shadow-card-hover)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h4 className="font-extrabold text-foreground">Book a 10-Minute Approval Call</h4>
            </div>
            
            {booked ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="h-7 w-7 text-green" />
                </div>
                <p className="font-bold text-foreground">Call Booked!</p>
                <p className="text-sm text-muted-foreground mt-1">We'll reach out to you shortly, {callForm.name}.</p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold">Your Name</Label>
                  <Input placeholder="John Doe" value={callForm.name} onChange={(e) => setCallForm(p => ({...p, name: e.target.value}))} className="mt-1.5 h-11 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Phone Number</Label>
                  <Input type="tel" placeholder="(778) 000-0000" value={callForm.phone} onChange={(e) => setCallForm(p => ({...p, phone: e.target.value}))} className="mt-1.5 h-11 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Preferred Time</Label>
                  <Input placeholder="e.g. Tomorrow 2pm" value={callForm.preferredTime} onChange={(e) => setCallForm(p => ({...p, preferredTime: e.target.value}))} className="mt-1.5 h-11 rounded-xl" />
                </div>
                <Button type="submit" className="w-full shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full py-5 font-bold" style={{ boxShadow: "var(--shadow-primary)" }}>
                  Book My Call →
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">No obligation · 100% free · No credit impact</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorSection;
