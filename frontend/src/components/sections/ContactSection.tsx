import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/17789177003?text=Hi%2C%20I%27d%20like%20to%20get%20in%20touch.";
const PHONE_NUMBER = "tel:+17789177003";

const subjects = ["Pre-Approval Inquiry", "Trade-In Question", "Financing Options", "General Question"];

const contactItems = [
  { icon: Phone, label: "Phone", value: "(778) 917-7003", href: PHONE_NUMBER },
  { icon: Mail, label: "Email", value: "info@approvalonspot.ca", href: "mailto:info@approvalonspot.ca" },
  { icon: Clock, label: "Hours", value: "Mon-Fri 9am-7pm · Sat 10am-5pm" },
  { icon: MapPin, label: "Areas", value: "Vancouver, Surrey, Calgary & all of BC / Alberta" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim()) return;
    setSent(true);
    toast({ title: "Message Sent! ✉️", description: "We'll get back to you shortly." });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Contact</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-foreground text-balance">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Ready to get approved? Contact us today and drive away in your dream car.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden relative" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute inset-0 dot-grid opacity-20" />
          
          <div className="grid md:grid-cols-2 relative z-10">
            {/* Left: Contact Info */}
            <div className="p-5 sm:p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              
              <h3 className="text-lg sm:text-xl font-extrabold mb-6 sm:mb-8 relative z-10">Contact Information</h3>
              <div className="space-y-4 sm:space-y-6 relative z-10">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs sm:text-sm">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors break-all">{item.value}</a>
                      ) : (
                        <p className="text-xs sm:text-sm text-white/60">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 sm:mt-8 flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-green/15 border border-green/20 hover:bg-green/25 transition-colors relative z-10"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm">Chat on WhatsApp</p>
                  <p className="text-[10px] sm:text-xs text-white/50">Get a quick response</p>
                </div>
              </a>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-card rounded-t-2xl sm:rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-4 sm:p-6 md:p-8">
              <h3 className="text-base sm:text-lg font-extrabold text-foreground mb-4 sm:mb-6">Send Us a Message</h3>
              {sent ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-6 w-6 sm:h-7 sm:w-7 text-green" />
                  </div>
                  <p className="text-base sm:text-lg font-bold text-foreground">Message sent!</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div><Label htmlFor="cf" className="text-[11px] sm:text-xs font-semibold">First Name *</Label><Input id="cf" placeholder="John" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl text-sm" /></div>
                    <div><Label htmlFor="cl" className="text-[11px] sm:text-xs font-semibold">Last Name</Label><Input id="cl" placeholder="Doe" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div><Label htmlFor="ce" className="text-[11px] sm:text-xs font-semibold">Email *</Label><Input id="ce" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl text-sm" /></div>
                    <div><Label htmlFor="cp" className="text-[11px] sm:text-xs font-semibold">Phone</Label><Input id="cp" type="tel" placeholder="(778) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl text-sm" /></div>
                  </div>
                  <div>
                    <Label className="text-[11px] sm:text-xs font-semibold">Subject</Label>
                    <Select value={form.subject} onValueChange={(v) => update("subject", v)}>
                      <SelectTrigger className="mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl text-sm"><SelectValue placeholder="Select Subject" /></SelectTrigger>
                      <SelectContent>{subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cm" className="text-[11px] sm:text-xs font-semibold">Message</Label>
                    <textarea
                      id="cm"
                      rows={3}
                      placeholder="Tell us about your situation..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="mt-1 sm:mt-1.5 flex w-full rounded-xl border border-input bg-background px-3 py-2.5 sm:py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-muted-foreground">
                    By submitting this form, you agree to our Terms &amp; Privacy Policy.
                  </p>
                  <Button type="submit" className="w-full shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full h-12 sm:h-14 font-bold text-sm sm:text-base min-h-[48px]" style={{ boxShadow: "var(--shadow-primary)" }}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="max-w-5xl mx-auto mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-lg">
          <iframe
            title="Approval on Spot Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.94137501422!2d-123.18696!3d49.26361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b81f38b!2sVancouver%2C%20BC%2C%20Canada!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[250px] sm:h-[350px] md:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
