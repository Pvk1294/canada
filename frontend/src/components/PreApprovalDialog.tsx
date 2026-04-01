import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Check, Lock, Flame, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { usePreApprovalForm } from "./PreApprovalFormContext";
import { apiUrl } from "@/lib/api";
import VehicleTypeStep from "./form-steps/VehicleTypeStep";
import PersonalInfoStep from "./form-steps/PersonalInfoStep";
import AddressStep from "./form-steps/AddressStep";
import DateOfBirthStep from "./form-steps/DateOfBirthStep";
import CreditStep from "./form-steps/CreditStep";
import EmploymentStep from "./form-steps/EmploymentStep";
import BudgetStep from "./form-steps/BudgetStep";
import PhoneVerifyStep from "./form-steps/PhoneVerifyStep";

const TOTAL_STEPS = 8;

const STEP_HEADERS: Record<number, string> = {
  1: "Let's get started!",
  2: "Tell us about yourself",
  3: "Almost there!",
  4: "A few more details",
  5: "How's your credit?",
  6: "Employment info",
  7: "Your budget",
  8: "Just one more step!",
};

const isAtLeast18 = (day: string, month: string, year: string) => {
  const d = parseInt(day), m = parseInt(month), y = parseInt(year);
  if (!d || !m || !y) return false;
  const dob = new Date(y, m - 1, d);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) return age - 1 >= 18;
  return age >= 18;
};

const isValidDOBDate = (day: string, month: string, year: string) => {
  const d = parseInt(day), m = parseInt(month), y = parseInt(year);
  if (!d || !m || !y) return false;
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
};

const PreApprovalDialog = () => {
  const { isOpen, closeForm } = usePreApprovalForm();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    vehicleType: "",
    fullName: "",
    phone: "",
    email: "",
    countryCode: "1",
    address: "",
    postalCode: "",
    province: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    creditScore: "",
    jobType: "",
    income: "",
    employer: "",
    yearsEmployed: "",
    monthlyBudget: "",
    downPayment: "",
    hasTrade: "",
    preferredContact: "",
    companyName: "",
    companyAddress: "",
    profession: "",
    collegeName: "",
    workplaceName: "",
    retiredDepartment: "",
    otherSpecify: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const autoAdvanceSteps = new Set([1, 5]);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canNext = useCallback(() => {
    switch (step) {
      case 1: return !!form.vehicleType;
      case 2: return form.fullName.trim() && form.phone.replace(/\D/g, "").length === 10 && form.email.trim();
      case 3: return form.address.trim() && !!form.province && /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(form.postalCode);
      case 4: {
        const hasAll = form.dobDay.length >= 1 && form.dobMonth.length >= 1 && form.dobYear.length === 4;
        return hasAll && isValidDOBDate(form.dobDay, form.dobMonth, form.dobYear) && isAtLeast18(form.dobDay, form.dobMonth, form.dobYear);
      }
      case 5: return !!form.creditScore;
      case 6: return !!form.jobType && !!form.income;
      case 7: return !!form.monthlyBudget;
      case 8: return true;
      default: return false;
    }
  }, [step, form]);

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  useEffect(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (autoAdvanceSteps.has(step) && canNext() && step !== 8) {
      advanceTimerRef.current = setTimeout(() => {
        setStep(step + 1);
      }, 400);
    }
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [form, step, canNext]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const dob = form.dobYear && form.dobMonth && form.dobDay
        ? `${form.dobYear}-${form.dobMonth.padStart(2, "0")}-${form.dobDay.padStart(2, "0")}`
        : null;

      const leadPayload = {
        vehicle_type: form.vehicleType,
        full_name: form.fullName,
        phone: form.phone,
        email: form.email,
        country_code: form.countryCode,
        address: form.address,
        postal_code: form.postalCode,
        province: form.province,
        date_of_birth: dob,
        credit_score: form.creditScore,
        job_type: form.jobType,
        income: form.income,
        employer: form.employer,
        years_employed: form.yearsEmployed,
        monthly_budget: form.monthlyBudget,
        down_payment: form.downPayment,
        has_trade: form.hasTrade,
        preferred_contact: form.preferredContact,
        company_name: form.companyName || "",
        company_address: form.companyAddress || "",
        profession: form.profession || "",
        college_name: form.collegeName || "",
        workplace_name: form.workplaceName || "",
        retired_department: form.retiredDepartment || "",
        other_specify: form.otherSpecify || "",
      };

      const res = await fetch(apiUrl("/api/leads/submit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
      toast({ title: "Application Received! 🎉", description: "We'll contact you within 24 hours." });
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    closeForm();
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setConsentChecked(false);
      setForm({
        vehicleType: "", fullName: "", phone: "", email: "", countryCode: "1", address: "", postalCode: "", province: "",
        dobDay: "", dobMonth: "", dobYear: "",
        creditScore: "", jobType: "", income: "", employer: "", yearsEmployed: "",
        monthlyBudget: "", downPayment: "", hasTrade: "", preferredContact: "",
        companyName: "", companyAddress: "", profession: "", collegeName: "",
        workplaceName: "", retiredDepartment: "", otherSpecify: "",
      });
    }, 300);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleOTPVerified = useCallback(() => {
    handleSubmit();
  }, [form]);

  const isAutoAdvance = autoAdvanceSteps.has(step);

  const vehicleLabel = form.vehicleType || null;
  const budgetLabel = form.monthlyBudget || null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        className="w-[calc(100vw-0.5rem)] sm:w-[calc(100vw-1rem)] max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-0 border-border bg-card gap-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Get Pre-Approved</DialogTitle>

        {submitted ? (
          <div className="text-center py-8 px-6">
            <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green" />
            </div>
            <h4 className="text-xl font-extrabold text-foreground mb-2">Application Submitted!</h4>
            <p className="text-muted-foreground text-sm mb-6">
              Thank you, {form.fullName}. We'll review and contact you within 24 hours.
            </p>
            <Button onClick={handleClose} variant="outline" className="rounded-full">
              Close
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-foreground text-background px-4 py-3 sm:px-5 sm:py-4 rounded-t-2xl relative">
              <p className="text-sm sm:text-base font-bold flex items-center gap-2">
                ⭐ {STEP_HEADERS[step] || "Takes just"} <span className="text-lg sm:text-xl font-extrabold">60 seconds</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i + 1 < step ? "bg-primary" : i + 1 === step ? "bg-primary scale-125" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs opacity-80">Step {step} of {TOTAL_STEPS}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6">
              {/* Urgency Badge */}
              <div className="flex justify-center mb-3">
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold">
                  <Flame className="h-3.5 w-3.5" />
                  Inventory Reset — Limited-Time Offers
                </span>
              </div>

              {/* Summary Bar (visible step 3+) */}
              {step >= 3 && (vehicleLabel || budgetLabel) && (
                <div className="flex items-center justify-center gap-3 mb-3 px-3 py-2 bg-muted/50 rounded-xl text-xs">
                  {vehicleLabel && (
                    <span className="flex items-center gap-1 text-foreground font-medium">
                      <Car className="h-3.5 w-3.5 text-primary" />
                      {vehicleLabel}
                    </span>
                  )}
                  {vehicleLabel && budgetLabel && <span className="text-muted-foreground">•</span>}
                  {budgetLabel && (
                    <span className="text-foreground font-medium">{budgetLabel}/mo</span>
                  )}
                  <button
                    onClick={() => setStep(1)}
                    className="text-primary hover:underline text-[10px] font-medium ml-1"
                  >
                    Edit
                  </button>
                </div>
              )}

              {/* Steps */}
              <div className="min-h-[220px] sm:min-h-[280px] md:min-h-[320px]">
                {step === 1 && <VehicleTypeStep value={form.vehicleType} onChange={(v) => update("vehicleType", v)} />}
                {step === 2 && <PersonalInfoStep form={form} update={update} />}
                {step === 3 && <AddressStep form={form} update={update} />}
                {step === 4 && <DateOfBirthStep form={form} update={update} />}
                {step === 5 && <CreditStep value={form.creditScore} onChange={(v) => update("creditScore", v)} />}
                {step === 6 && <EmploymentStep form={form} update={update} />}
                {step === 7 && <BudgetStep form={form} update={update} />}
                {step === 8 && (
                  <PhoneVerifyStep
                    phone={form.phone}
                    countryCode={form.countryCode}
                    onVerified={handleOTPVerified}
                    onEditPhone={() => setStep(2)}
                  />
                )}
              </div>

              {/* Consent checkbox (visible on OTP step) */}
              {step === 8 && (
                <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-muted/50 border border-border">
                  <Checkbox
                    id="consent"
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="consent" className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    I consent to a credit check and agree to the{" "}
                    <a href="/contact" className="text-primary hover:underline font-medium">Terms & Privacy Policy</a>.
                  </label>
                </div>
              )}

              {/* Consent disclaimer */}
              <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-3 leading-relaxed">
                By continuing, you give consent for lenders to perform a credit check and for ApprovalOnSpot to share your information to help match you with the best auto-financing options. See our{" "}
                <a href="/contact" className="text-primary hover:underline font-medium">Privacy Policy</a>.
              </p>

              {/* Navigation */}
              <div className="flex items-center gap-3 mt-5">
                {step > 1 && step !== 8 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="rounded-full px-6 py-4 text-sm font-semibold"
                  >
                    Back
                  </Button>
                )}
                {!isAutoAdvance && step !== 8 && (
                  <Button
                    onClick={handleNext}
                    disabled={!canNext() || submitting}
                    className="flex-1 shimmer-button bg-primary text-primary-foreground hover:bg-blue-light rounded-full py-4 sm:py-5 font-bold text-sm"
                    style={{ boxShadow: "var(--shadow-primary)" }}
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Continue →"
                    )}
                  </Button>
                )}
                {isAutoAdvance && submitting && (
                  <div className="flex-1 flex justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                )}
                {step === 8 && submitting && (
                  <div className="flex-1 flex justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                )}
              </div>

              <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green" />
                256-bit SSL • 100% confidential • No impact on credit score
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreApprovalDialog;