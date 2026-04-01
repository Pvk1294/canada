import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  form: { fullName: string; phone: string; email: string; countryCode: string };
  update: (field: string, value: string) => void;
}

const COUNTRY_CODES = [
  { value: "1", label: "🇨🇦 +1", desc: "Canada/US" },
  { value: "91", label: "🇮🇳 +91", desc: "India" },
  { value: "44", label: "🇬🇧 +44", desc: "UK" },
  { value: "61", label: "🇦🇺 +61", desc: "Australia" },
  { value: "33", label: "🇫🇷 +33", desc: "France" },
  { value: "49", label: "🇩🇪 +49", desc: "Germany" },
];

const PersonalInfoStep = ({ form, update }: Props) => {
  const phoneDigits = form.phone.replace(/\D/g, "");
  const showPhoneError = form.phone.length > 0 && phoneDigits.length > 0 && phoneDigits.length < 10;

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-4">
        Tell us about yourself
      </h3>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <Label htmlFor="fn" className="text-[11px] sm:text-xs font-semibold">Full Name</Label>
          <Input id="fn" placeholder="John Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="mt-1 h-10 sm:h-11 rounded-xl text-sm" />
        </div>
        <div>
          <Label htmlFor="ph" className="text-[11px] sm:text-xs font-semibold">Phone Number</Label>
          <div className="flex gap-2 mt-1">
            <Select value={form.countryCode} onValueChange={(v) => update("countryCode", v)}>
              <SelectTrigger className="w-[100px] h-10 sm:h-11 rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_CODES.map((cc) => (
                  <SelectItem key={cc.value} value={cc.value}>
                    {cc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="ph"
              type="tel"
              placeholder="7838367994"
              value={form.phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                update("phone", digits);
              }}
              maxLength={10}
              inputMode="numeric"
              className="flex-1 h-10 sm:h-11 rounded-xl text-sm"
            />
          </div>
          {showPhoneError && (
            <p className="text-xs text-destructive mt-1">Please enter a valid 10-digit phone number.</p>
          )}
        </div>
        <div>
          <Label htmlFor="em" className="text-[11px] sm:text-xs font-semibold">Email Address</Label>
          <Input id="em" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1 h-10 sm:h-11 rounded-xl text-sm" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;