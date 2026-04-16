/// <reference types="@types/google.maps" />
import { useEffect, useRef, useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Building2, GraduationCap, HardHat, FileText, User, MapPin } from "lucide-react";

const GOOGLE_MAPS_API_KEY = "AIzaSyCQYCaVJJ9swpZM0Kl2g6mR36bvuCRDwMI";

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
    jobPosition?: string;
    yearsEmployed?: string;
    profession?: string;
    collegeName?: string;
    workplaceName?: string;
    retiredDepartment?: string;
    otherSpecify?: string;
  };
  update: (field: string, value: string) => void;
}

// ─── Company Address Autocomplete ───────────────────────────────────────────

interface CompanyAddressInputProps {
  value: string;
  onChange: (val: string) => void;
}

const CompanyAddressInput = ({ value, onChange }: CompanyAddressInputProps) => {
  const [searchValue, setSearchValue] = useState(value || "");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [noResults, setNoResults] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const autocompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesRef = useRef<google.maps.places.PlacesService | null>(null);
  const dummyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load or reuse Google Maps script
  useEffect(() => {
    if ((window as any).google?.maps?.places) {
      setScriptReady(true);
      return;
    }
    const existing = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existing) {
      // Script tag exists but maps not ready yet — poll briefly
      const interval = setInterval(() => {
        if ((window as any).google?.maps?.places) {
          setScriptReady(true);
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
    if (!GOOGLE_MAPS_API_KEY) return;
    const callbackName = "__gmapsCallback_emp_" + Date.now();
    (window as any)[callbackName] = () => {
      setScriptReady(true);
      delete (window as any)[callbackName];
    };
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // Init services once script is ready
  useEffect(() => {
    if (!scriptReady || !(window as any).google?.maps?.places) return;
    autocompleteRef.current = new google.maps.places.AutocompleteService();
    if (dummyRef.current) {
      placesRef.current = new google.maps.places.PlacesService(dummyRef.current);
    }
  }, [scriptReady]);

  const fetchPredictions = useCallback((input: string) => {
    if (!autocompleteRef.current || input.length < 2) {
      setPredictions([]);
      setNoResults(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      autocompleteRef.current!.getPlacePredictions(
        { input, componentRestrictions: { country: "ca" }, types: ["establishment", "geocode"] },
        (results) => {
          const limited = (results || []).slice(0, 5);
          setPredictions(limited);
          setNoResults(limited.length === 0 && input.length >= 2);
          setShowDropdown(true);
          setActiveIndex(-1);
        }
      );
    }, 300);
  }, []);

  const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    setShowDropdown(false);
    if (!placesRef.current) {
      setSearchValue(prediction.description);
      onChange(prediction.description);
      return;
    }
    placesRef.current.getDetails(
      { placeId: prediction.place_id, fields: ["formatted_address"] },
      (place) => {
        const addr = place?.formatted_address || prediction.description;
        setSearchValue(addr);
        onChange(addr);
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || predictions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev < predictions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : predictions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(predictions[activeIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll("[data-suggestion]");
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const formatSuggestion = (description: string) => {
    const parts = description.split(",");
    return { main: parts[0]?.trim() || description, sub: parts.slice(1).map(p => p.trim()).join(", ") };
  };

  return (
    <div className="relative">
      <div ref={dummyRef} style={{ display: "none" }} />
      <div className="relative group">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input
          ref={inputRef}
          placeholder="Start typing company address…"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onChange(e.target.value);
            fetchPredictions(e.target.value);
          }}
          onFocus={() => predictions.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={handleKeyDown}
          className="mt-1 h-10 sm:h-11 rounded-xl text-sm pl-9"
          autoComplete="off"
        />
      </div>

      {showDropdown && (predictions.length > 0 || noResults) && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-xl shadow-xl overflow-hidden animate-fade-in"
        >
          {predictions.length > 0 ? (
            predictions.map((p, i) => {
              const { main, sub } = formatSuggestion(p.description);
              return (
                <button
                  key={p.place_id}
                  data-suggestion
                  onMouseDown={() => handleSelect(p)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full text-left px-3 py-2.5 transition-colors flex items-start gap-2.5 border-b border-border/50 last:border-b-0
                    ${activeIndex === i ? "bg-primary/5" : "hover:bg-muted/60"}`}
                >
                  <div className="mt-0.5 h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{main}</p>
                    {sub && <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</p>}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-3 py-3 text-center">
              <p className="text-sm text-muted-foreground">No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── EmploymentStep ──────────────────────────────────────────────────────────

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
                <Briefcase className="h-3.5 w-3.5 text-primary" />
                Job Position
              </Label>
              <Input
                value={form.jobPosition || ""}
                onChange={(e) => update("jobPosition", e.target.value)}
                placeholder="e.g. Sales Associate"
                className="mt-1 h-10 sm:h-11 rounded-xl text-sm"
              />
            </div>
            <div>
              <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Company Address <span className="text-destructive">*</span>
              </Label>
              <CompanyAddressInput
                value={form.companyAddress || ""}
                onChange={(val) => update("companyAddress", val)}
              />
            </div>
            <div>
              <Label className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                How long have you worked there?
              </Label>
              <Input
                value={form.yearsEmployed || ""}
                onChange={(e) => update("yearsEmployed", e.target.value)}
                placeholder="e.g. 2 years"
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
