import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  form: { dobDay: string; dobMonth: string; dobYear: string };
  update: (field: string, value: string) => void;
}

const currentYear = new Date().getFullYear();

const isValidDate = (day: string, month: string, year: string) => {
  const d = parseInt(day), m = parseInt(month), y = parseInt(year);
  if (!d || !m || !y) return false;
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
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

const DateOfBirthStep = ({ form, update }: Props) => {
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const hasFullDate = form.dobDay.length >= 2 && form.dobMonth.length >= 2 && form.dobYear.length === 4;
  const validDate = hasFullDate && isValidDate(form.dobDay, form.dobMonth, form.dobYear);
  const under18 = hasFullDate && validDate && !isAtLeast18(form.dobDay, form.dobMonth, form.dobYear);
  const yearNum = parseInt(form.dobYear);
  const yearOutOfRange = form.dobYear.length === 4 && (yearNum < 1920 || yearNum > currentYear);

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-1">
        What's your date of birth?
      </h3>
      <p className="text-xs text-muted-foreground text-center mb-5">
        You must be 18+ to apply for financing.
      </p>

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="text-center">
          <Label className="text-[10px] sm:text-xs font-semibold text-muted-foreground">Day</Label>
          <Input
            placeholder="DD"
            value={form.dobDay}
            maxLength={2}
            inputMode="numeric"
            className="mt-1 h-12 sm:h-14 w-16 sm:w-20 rounded-xl text-center text-lg sm:text-xl font-bold"
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 2);
              update("dobDay", v);
              if (v.length === 2) monthRef.current?.focus();
            }}
          />
        </div>
        <span className="text-xl font-bold text-muted-foreground mt-5">/</span>
        <div className="text-center">
          <Label className="text-[10px] sm:text-xs font-semibold text-muted-foreground">Month</Label>
          <Input
            ref={monthRef}
            placeholder="MM"
            value={form.dobMonth}
            maxLength={2}
            inputMode="numeric"
            className="mt-1 h-12 sm:h-14 w-16 sm:w-20 rounded-xl text-center text-lg sm:text-xl font-bold"
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 2);
              update("dobMonth", v);
              if (v.length === 2) yearRef.current?.focus();
            }}
          />
        </div>
        <span className="text-xl font-bold text-muted-foreground mt-5">/</span>
        <div className="text-center">
          <Label className="text-[10px] sm:text-xs font-semibold text-muted-foreground">Year</Label>
          <Input
            ref={yearRef}
            placeholder="YYYY"
            value={form.dobYear}
            maxLength={4}
            inputMode="numeric"
            className="mt-1 h-12 sm:h-14 w-20 sm:w-24 rounded-xl text-center text-lg sm:text-xl font-bold"
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
              update("dobYear", v);
            }}
          />
        </div>
      </div>

      {yearOutOfRange && (
        <p className="text-xs text-destructive text-center mt-3">Please enter a year between 1920 and {currentYear}.</p>
      )}
      {hasFullDate && !validDate && !yearOutOfRange && (
        <p className="text-xs text-destructive text-center mt-3">Please enter a valid date.</p>
      )}
      {under18 && (
        <p className="text-xs text-destructive text-center mt-3">You must be at least 18 years old to apply.</p>
      )}
    </div>
  );
};

export default DateOfBirthStep;