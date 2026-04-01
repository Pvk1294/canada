import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/17789177003?text=Hi%2C%20I%27d%20like%20to%20check%20my%20pre-approval%20options.";

const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 md:z-50 flex items-center gap-3 group"
    >
      <span className="hidden md:block bg-navy/90 backdrop-blur-xl text-primary-foreground text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap border border-white/10">
        Chat with us
      </span>
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green flex items-center justify-center shadow-lg hover:bg-green-light transition-colors">
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
        <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-light border-2 border-background animate-pulse-soft" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
