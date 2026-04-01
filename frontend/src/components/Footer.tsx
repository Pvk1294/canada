import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Lock, Landmark, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const footerBadges = [
  { icon: CheckCircle, text: "Licensed dealer partners" },
  { icon: Lock, text: "Secure application" },
  { icon: ShieldCheck, text: "Privacy protection" },
  { icon: Landmark, text: "Bank partnerships" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: "Subscribed! 🎉", description: "You'll receive our latest updates." });
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-white/80 relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-glow-pulse" />

      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {footerBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 justify-center px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                <badge.icon className="h-4 w-4 text-green flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-white/60 font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-extrabold text-white text-lg font-display">Stay Updated</h4>
              <p className="text-sm text-white/40">Get the latest financing tips and exclusive offers.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Input
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-full h-11 w-full md:w-64"
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-blue-light rounded-full px-6 font-bold h-11 min-h-[44px] w-full sm:w-auto">
                Subscribe <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 pb-28 md:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="ApprovalOnSpot" className="h-24 mb-4" />
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Your private approval partner. We help Canadians get approved for vehicle financing — all credit situations welcome.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-xs text-white/50">
              <span className="text-primary font-bold">1000+</span> Happy Customers
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-white mb-5 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Our Services</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#why-us" className="hover:text-primary transition-colors">Why ApprovalOnSpot</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white mb-5 text-sm tracking-wide uppercase">Services</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><a href="#services" className="hover:text-primary transition-colors">Auto Financing</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Cash Back Options</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Trade-In Services</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Credit Rebuilding</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Vehicle Inventory</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white mb-5 text-sm tracking-wide uppercase">Contact Info</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> 6786 King George Blvd, Surrey, BC V3W 4Z5</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary flex-shrink-0" /> <a href="tel:+17789177003" className="hover:text-primary transition-colors">(778) 917-7003</a></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary flex-shrink-0" /> <a href="mailto:info@approvalonspot.ca" className="hover:text-primary transition-colors">info@approvalonspot.ca</a></li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p>Mon–Thu: 9am–8pm</p>
                  <p>Fri–Sat: 9am–6pm</p>
                  <p>Sun: 11am–5pm</p>
                </div>
              </li>
            </ul>
            <div className="flex gap-2 mt-5">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-primary-foreground transition-all text-xs font-bold">f</a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-primary-foreground transition-all text-xs font-bold">in</a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-primary-foreground transition-all text-xs font-bold">ig</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Approvalonspot.ca. All Rights Reserved. Licensed dealership partnerships.
          </p>
          <p className="text-[10px] text-white/15 mt-1.5 max-w-2xl mx-auto">
            All offers subject to approved credit (O.A.C). Payments subject to bank approval. Terms &amp; conditions apply. Vehicle availability may vary. ApprovalOnSpot acts as a financing facilitator working with licensed dealerships across Canada.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;