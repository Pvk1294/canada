import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";
import { AlertTriangle, CheckCircle } from "lucide-react";

const ExitPopup = () => {
  const [show, setShow] = useState(false);
  const { openForm } = usePreApprovalForm();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed]);

  const handleCheckApproval = () => {
    setShow(false);
    setDismissed(true);
    openForm();
  };

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <Dialog open={show} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="w-[calc(100vw-1rem)] max-w-md rounded-2xl p-0 border-border bg-card sm:w-full">
        <div className="p-6 sm:p-8 text-center">
          <DialogTitle className="sr-only">Before you go</DialogTitle>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-2 font-display">
            You're just a few steps away from approval!
          </h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            Don't miss out — it takes just 2 minutes and there's no obligation.
          </p>

          <div className="space-y-2 mb-6 text-left max-w-xs mx-auto">
            {["Takes only 2 minutes", "100% confidential", "No obligation"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-green flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <Button
            onClick={handleCheckApproval}
            className="shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full w-full h-12 sm:h-14 text-sm sm:text-base font-bold min-h-[48px] hover:scale-105 transition-transform"
            style={{ boxShadow: "var(--shadow-primary)" }}
          >
            ✅ Check My Approval Now →
          </Button>
          <button
            onClick={handleClose}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            No thanks, I'll pass
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitPopup;