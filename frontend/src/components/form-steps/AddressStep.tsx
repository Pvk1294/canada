/// <reference types="@types/google.maps" />
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Keyboard, Building2, ChevronDown, ChevronUp, Home } from "lucide-react";

const GOOGLE_MAPS_API_KEY = "AIzaSyA9KRJT42aRxNa_ikT4F2uatuh0ruvLxg8";

const provinces = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland & Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"];

const provinceMap: Record<string, string> = {
  AB: "Alberta", BC: "British Columbia", MB: "Manitoba", NB: "New Brunswick",
  NL: "Newfoundland & Labrador", NT: "Northwest Territories", NS: "Nova Scotia",
  NU: "Nunavut", ON: "Ontario", PE: "Prince Edward Island", QC: "Quebec",
  SK: "Saskatchewan", YT: "Yukon",
};

const provinceShortMap: Record<string, string> = Object.fromEntries(
  Object.entries(provinceMap).map(([k, v]) => [v, k])
);

interface Props {
  form: { address: string; province: string; postalCode: string };
  update: (field: string, value: string) => void;
}

interface ParsedAddress {
  street: string;
  city: string;
  province: string;
  provinceShort: string;
  postalCode: string;
  full: string;
}

const formatPostalCode = (value: string) => {
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);
  if (cleaned.length > 3) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  return cleaned;
};

const isValidPostalCode = (value: string) =>
  /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(value);

const AddressStep = ({ form, update }: Props) => {
  const [manualMode, setManualMode] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [noResults, setNoResults] = useState(false);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const dummyDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    if (form.address) localStorage.setItem("aos_address", JSON.stringify(form));
  }, [form]);

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("aos_address");
    if (saved && !form.address) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.address) update("address", parsed.address);
        if (parsed.province) update("province", parsed.province);
        if (parsed.postalCode) update("postalCode", parsed.postalCode);
      } catch { /* ignore */ }
    }
  }, []);

  // Load Google Maps script
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) { setManualMode(true); return; }
    if ((window as any).google?.maps?.places) {
      setScriptLoaded(true);
      return;
    }
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) existingScript.remove();

    const callbackName = '__gmapsCallback_' + Date.now();
    (window as any)[callbackName] = () => {
      setScriptLoaded(true);
      delete (window as any)[callbackName];
    };
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setManualMode(true);
      delete (window as any)[callbackName];
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !(window as any).google?.maps?.places) return;
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    if (dummyDivRef.current) {
      placesServiceRef.current = new google.maps.places.PlacesService(dummyDivRef.current);
    }
  }, [scriptLoaded]);

  // Autofocus
  useEffect(() => {
    if (!manualMode) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [manualMode]);

  const fetchPredictions = useCallback((input: string) => {
    if (!autocompleteServiceRef.current || input.length < 2) {
      setPredictions([]);
      setNoResults(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      autocompleteServiceRef.current!.getPlacePredictions(
        { input, componentRestrictions: { country: "ca" }, types: ["address"] },
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

  const parsePlace = (place: google.maps.places.PlaceResult, description: string): ParsedAddress => {
    let street = "", city = "", prov = "", provShort = "", postal = "";
    if (place?.address_components) {
      const get = (type: string) => place.address_components!.find(c => c.types.includes(type));
      const num = get("street_number")?.long_name || "";
      const route = get("route")?.long_name || "";
      street = `${num} ${route}`.trim();
      city = get("locality")?.long_name || get("sublocality")?.long_name || "";
      const provComp = get("administrative_area_level_1");
      if (provComp) {
        provShort = provComp.short_name;
        prov = provinceMap[provShort] || provComp.long_name;
      }
      postal = formatPostalCode(get("postal_code")?.long_name || "");
    }
    return { street, city, province: prov, provinceShort: provShort, postalCode: postal, full: place.formatted_address || description };
  };

  const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    setShowDropdown(false);
    setSearchValue(prediction.description);
    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      { placeId: prediction.place_id, fields: ["address_components", "formatted_address"] },
      (place) => {
        if (!place) return;
        const parsed = parsePlace(place, prediction.description);
        update("address", parsed.full);
        if (parsed.province) update("province", parsed.province);
        if (parsed.postalCode) update("postalCode", parsed.postalCode);
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

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll('[data-suggestion]');
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const formatSuggestion = (description: string) => {
    const parts = description.split(",");
    const street = parts[0]?.trim() || description;
    const rest = parts.slice(1).map(p => p.trim()).join(", ");
    return { street, rest };
  };

  const postalError = form.postalCode && !isValidPostalCode(form.postalCode) && form.postalCode.replace(/\s/g, "").length >= 6;

  // ═══════════════════════════════════════
  // MANUAL MODE
  // ═══════════════════════════════════════
  if (manualMode) {
    return (
      <div className="animate-fade-in">
        <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-1">
          What is your home address?
        </h3>
        <p className="text-xs text-muted-foreground text-center mb-5">
          Used only to match you with lenders — never for marketing.
        </p>

        <div className="space-y-3">
          {/* Street Address */}
          <div>
            <Label htmlFor="street" className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Street Address
            </Label>
            <div className="relative mt-1">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="street"
                placeholder="123 Main Street"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="h-11 sm:h-12 rounded-xl text-sm pl-10 border-border focus:border-primary focus:ring-primary/20"
                autoFocus
              />
            </div>
          </div>

          {/* City + Province row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Province
              </Label>
              <Select value={form.province} onValueChange={(v) => update("province", v)}>
                <SelectTrigger className="mt-1 h-11 sm:h-12 rounded-xl text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="postal" className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Postal Code
              </Label>
              <Input
                id="postal"
                placeholder="A1A 1A1"
                value={form.postalCode}
                onChange={(e) => update("postalCode", formatPostalCode(e.target.value))}
                className={`mt-1 h-11 sm:h-12 rounded-xl text-sm ${postalError ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
                maxLength={7}
              />
              {postalError && (
                <p className="text-[10px] text-destructive mt-1 animate-fade-in">
                  Enter a valid postal code (e.g. A1A 1A1)
                </p>
              )}
            </div>
          </div>

          {/* Switch to autocomplete */}
          {GOOGLE_MAPS_API_KEY && (
            <button
              onClick={() => setManualMode(false)}
              className="text-xs text-primary hover:text-primary/80 hover:underline flex items-center gap-1.5 mx-auto mt-2 transition-colors"
            >
              <Search className="h-3.5 w-3.5" /> Search address instead
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════
  // AUTOCOMPLETE MODE
  // ═══════════════════════════════════════
  return (
    <div className="animate-fade-in">
      <div ref={dummyDivRef} style={{ display: "none" }} />

      <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-1">
        What is your home address?
      </h3>
      <p className="text-xs text-muted-foreground text-center mb-5">
        Used only to match you with lenders — never for marketing.
      </p>

      {/* Search Input */}
      <div className="relative">
        <div className="relative group">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            ref={inputRef}
            placeholder="Start typing your address…"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              fetchPredictions(e.target.value);
            }}
            onFocus={() => predictions.length > 0 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onKeyDown={handleKeyDown}
            className={`h-12 sm:h-14 rounded-2xl text-sm sm:text-base pl-11 pr-4 border-2 transition-all duration-200 shadow-sm
              ${form.address ? "border-green/50 bg-green/5" : "border-border"}
              focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-md`}
            autoComplete="off"
          />
        </div>

        {/* Dropdown */}
        {showDropdown && (predictions.length > 0 || noResults) && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in"
            style={{ animation: "fade-in 0.2s ease-out, slideDown 0.2s ease-out" }}
          >
            {predictions.length > 0 ? (
              predictions.map((p, i) => {
                const { street, rest } = formatSuggestion(p.description);
                return (
                  <button
                    key={p.place_id}
                    data-suggestion
                    onMouseDown={() => handleSelect(p)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full text-left px-4 py-3 transition-colors flex items-start gap-3 border-b border-border/50 last:border-b-0
                      ${activeIndex === i ? "bg-primary/5" : "hover:bg-muted/60"}`}
                  >
                    <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{street}</p>
                      {rest && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{rest}</p>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-4 text-center">
                <p className="text-sm text-muted-foreground">No results found</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">Try a different search or enter manually</p>
              </div>
            )}

            {/* Manual entry link inside dropdown */}
            <button
              onMouseDown={() => {
                setShowDropdown(false);
                setManualMode(true);
              }}
              className="w-full text-left px-4 py-3 bg-muted/30 hover:bg-muted/60 transition-colors flex items-center gap-2 border-t border-border/50"
            >
              <Keyboard className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">Enter address manually</span>
            </button>
          </div>
        )}
      </div>

      {/* Selected Address Summary */}
      {form.address && !showDropdown && (
        <div className="mt-4 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/15 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <MapPin className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground leading-snug">{form.address.split(",")[0]}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {[form.province, form.postalCode].filter(Boolean).join(" · ") || form.address.split(",").slice(1).join(",").trim()}
              </p>
            </div>
            <button
              onClick={() => {
                update("address", "");
                update("province", "");
                update("postalCode", "");
                setSearchValue("");
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className="text-[11px] text-primary hover:underline font-medium shrink-0"
            >
              Change
            </button>
          </div>

          {/* Editable postal code when incomplete */}
          {!isValidPostalCode(form.postalCode) && (
            <div className="mt-3 pt-3 border-t border-primary/10 animate-fade-in">
              <Label htmlFor="postal-fix" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Complete your postal code
              </Label>
              <Input
                id="postal-fix"
                placeholder="A1A 1A1"
                value={form.postalCode}
                onChange={(e) => update("postalCode", formatPostalCode(e.target.value))}
                className="mt-1 h-10 rounded-xl text-sm border-border focus:border-primary"
                maxLength={7}
                autoFocus
              />
            </div>
          )}
        </div>
      )}

      {/* Manual entry fallback (when no dropdown is showing) */}
      {!form.address && !showDropdown && (
        <button
          onClick={() => setManualMode(true)}
          className="text-xs text-primary hover:text-primary/80 hover:underline flex items-center gap-1.5 mx-auto mt-4 transition-colors"
        >
          <Keyboard className="h-3.5 w-3.5" /> Enter address manually
        </button>
      )}
    </div>
  );
};

export default AddressStep;
