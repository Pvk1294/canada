import { Phone, MessageCircle, FileCheck } from "lucide-react";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";

const WHATSAPP_URL = "https://wa.me/17789177003?text=Hi%2C%20I%27d%20like%20to%20check%20my%20approval%20options.";
const PHONE_NUMBER = "tel:+17789177003";

const MobileBottomBar = () => {
  const { openForm } = usePreApprovalForm();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-foreground/95 backdrop-blur-xl border-t border-white/5" style={{ boxShadow: "0 -4px 30px rgba(0,0,0,0.4), 0 -1px 0 hsla(45,93%,47%,0.15)" }}>
      <div className="grid grid-cols-3 h-[60px]">
        <button
          onClick={openForm}
          className="flex flex-col items-center justify-center gap-0.5 text-primary-foreground font-bold"
          style={{ background: "var(--gradient-primary)" }}
        >
          <FileCheck className="h-4 w-4" />
          <span className="text-[10px] font-bold">Check Approval</span>
        </button>
        <a href={PHONE_NUMBER} className="flex flex-col items-center justify-center gap-0.5 text-white/70 active:bg-white/5 transition-colors">
          <Phone className="h-4 w-4" />
          <span className="text-[10px] font-medium">Call Now</span>
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 text-white bg-green active:bg-green-light transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default MobileBottomBar;