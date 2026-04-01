import { useState, useEffect, useRef } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Smartphone, Pencil, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  phone: string;
  countryCode: string;
  onVerified: () => void;
  onEditPhone: () => void;
}

const COOLDOWN = 30;

const PhoneVerifyStep = ({ phone, countryCode, onVerified, onEditPhone }: Props) => {
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const hasSentRef = useRef(false);
  const { toast } = useToast();

  const sendOTP = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, countryCode }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to send code");
      }
      setCooldown(COOLDOWN);
    } catch (err: any) {
      console.error("Send OTP error:", err);
      setError("Failed to send verification code. Please try again.");
      toast({ title: "Failed to send code", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  // Send OTP on mount
  useEffect(() => {
    if (!hasSentRef.current) {
      hasSentRef.current = true;
      sendOTP();
    }
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Verify when 4 digits entered
  useEffect(() => {
    if (code.length !== 4) return;

    const verify = async () => {
      setVerifying(true);
      setError("");
      try {
        const res = await fetch("/api/otp/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, code, countryCode }),
        });
        const data = await res.json();
        if (data.success) {
          onVerified();
        } else {
          setError(data.error || "Invalid code. Please try again.");
          setCode("");
        }
      } catch (err: any) {
        console.error("Verify OTP error:", err);
        setError("Verification failed. Please try again.");
        setCode("");
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [code]);

  const handleResend = () => {
    setCode("");
    sendOTP();
  };

  const maskedPhone = phone.length > 4
    ? "•".repeat(phone.length - 4) + phone.slice(-4)
    : phone;

  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
        <Smartphone className="h-7 w-7 text-primary" />
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-1">
        Verify Your Phone
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
        {sending ? "Sending verification code..." : "We sent a 4-digit code to"}
      </p>
      <div className="flex items-center justify-center gap-1.5 mb-5">
        <span className="font-semibold text-foreground text-sm">{maskedPhone}</span>
        <button
          onClick={onEditPhone}
          className="text-primary hover:underline text-xs font-medium inline-flex items-center gap-0.5"
        >
          <Pencil className="h-3 w-3" /> Edit
        </button>
      </div>

      <div className="flex justify-center mb-3">
        <InputOTP maxLength={4} value={code} onChange={setCode} disabled={verifying || sending}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-lg sm:text-xl font-bold rounded-xl" />
            <InputOTPSlot index={1} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-lg sm:text-xl font-bold rounded-xl" />
            <InputOTPSlot index={2} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-lg sm:text-xl font-bold rounded-xl" />
            <InputOTPSlot index={3} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-lg sm:text-xl font-bold rounded-xl" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {verifying && (
        <div className="flex items-center justify-center gap-2 mb-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive mb-3 font-medium">{error}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Didn't receive the code?{" "}
        {cooldown > 0 ? (
          <span className="text-muted-foreground/60">Resend in {cooldown}s</span>
        ) : (
          <button onClick={handleResend} disabled={sending} className="text-primary hover:underline font-medium">
            {sending ? "Sending..." : "Resend"}
          </button>
        )}
      </p>
    </div>
  );
};

export default PhoneVerifyStep;
