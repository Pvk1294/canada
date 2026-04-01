import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Building2, GraduationCap, HardHat, FileText, User } from "lucide-react";

const jobTypes = [
  "Employed Full-Time",
  "Employed Part-Time",
  "Self-Employed",
  "Student",
  "Work Permit",
  "Retired",
  "Other",
];

const incomeRanges = [
  "Under $25,000",
  "$25,000 - $40,000",
  "$40,000 - $60,000",
  "$60,000 - $80,000",
  "$80,000+",
];

interface Props {
  form: {
    jobType: string;
    income: string;
    companyName?: string;
    companyAddress?: string;
    profession?: string;
    collegeName?: string;
    workplaceName?: string;
    retiredDepartment?: string;
    otherSpecify?: string;
  };
  update: (field: string, value: string) => void;
}

const EmploymentStep = ({ form, update }: Props) => {
  const conditionalRef = useRef<HTMLInputElement>(null);

  // Auto-focus first conditional field when jobType changes
  useEffect(() => {
    if (form.jobType) {
      const timer = setTimeout(() => {
        conditionalRef.current?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [form.jobType]);

  const renderConditionalFields = () => {
    switch (form.jobType) {
      case "Employed Full-Time":
      case "Employed Part-Time":
        return (
          <div className="space-y-3 animate-fade-in">
            <div>
              <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                ref={conditionalRef}
                value={form.companyName || ""}
                onChange={(e) => update("companyName", e.target.value)}
                placeholder="e.g. ABC Corporation"
                className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
              />
            </div>
            <div>
              <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Company Address <span className="text-destructive">*</span>
              </Label>
              <Input
                value={form.companyAddress || ""}
                onChange={(e) => update("companyAddress", e.target.value)}
                placeholder="e.g. 123 Business St, Toronto, ON"
                className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
              />
            </div>
          </div>
        );
      case "Self-Employed":
        return (
          <div className="animate-fade-in">
            <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              Profession / Business Type
            </Label>
            <Input
              ref={conditionalRef}
              value={form.profession || ""}
              onChange={(e) => update("profession", e.target.value)}
              placeholder="e.g. Freelancer, Shop Owner, Consultant"
              className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
            />
          </div>
        );
      case "Student":
        return (
          <div className="animate-fade-in">
            <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              College / School Name
            </Label>
            <Input
              ref={conditionalRef}
              value={form.collegeName || ""}
              onChange={(e) => update("collegeName", e.target.value)}
              placeholder="e.g. University of Toronto"
              className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
            />
          </div>
        );
      case "Work Permit":
        return (
          <div className="animate-fade-in">
            <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
              <HardHat className="h-3.5 w-3.5 text-primary" />
              Workplace / Employer Name
            </Label>
            <Input
              ref={conditionalRef}
              value={form.workplaceName || ""}
              onChange={(e) => update("workplaceName", e.target.value)}
              placeholder="e.g. XYZ Industries"
              className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
            />
          </div>
        );
      case "Retired":
        return (
          <div className="animate-fade-in">
            <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-primary" />
              Department / Industry Retired From
            </Label>
            <Input
              ref={conditionalRef}
              value={form.retiredDepartment || ""}
              onChange={(e) => update("retiredDepartment", e.target.value)}
              placeholder="e.g. Government, Healthcare, Manufacturing"
              className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
            />
          </div>
        );
      case "Other":
        return (
          <div className="animate-fade-in">
            <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-primary" />
              Please Specify
            </Label>
            <Input
              ref={conditionalRef}
              value={form.otherSpecify || ""}
              onChange={(e) => update("otherSpecify", e.target.value)}
              placeholder="Describe your employment situation"
              className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-1">
        Employment & Income
      </h3>
      <p className="text-xs text-muted-foreground text-center mb-4">
        Complete this step to get faster approval & better matching results.
      </p>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-primary" />
            Employment Status
          </Label>
          <Select value={form.jobType} onValueChange={(v) => update("jobType", v)}>
            <SelectTrigger className="mt-1 h-10 sm:h-11 rounded-xl text-sm">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((j) => (
                <SelectItem key={j} value={j}>{j}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Conditional fields with min-height to prevent layout jumping */}
        <div className="min-h-[70px]">
          {renderConditionalFields()}
        </div>

        <div>
          <Label className="text-[11px] sm:text-xs font-semibold">Annual Income</Label>
          <Select value={form.income} onValueChange={(v) => update("income", v)}>
            <SelectTrigger className="mt-1 h-10 sm:h-11 rounded-xl text-sm">
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              {incomeRanges.map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-[10px] text-muted-foreground text-center mt-2">
          This helps us process your application faster
        </p>
      </div>
    </div>
  );
};

export default EmploymentStep;
