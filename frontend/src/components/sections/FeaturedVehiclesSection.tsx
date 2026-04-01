import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePreApprovalForm } from "@/components/PreApprovalFormContext";
import vehicleAccord from "@/assets/vehicle-accord.png";
import vehicleTesla from "@/assets/vehicle-tesla.png";
import vehicleLexus from "@/assets/vehicle-lexus.png";
import vehicleCivic from "@/assets/vehicle-civic.png";
import vehicleCivicHybrid from "@/assets/vehicle-civic-hybrid.png";
import vehicleAudiQ5 from "@/assets/vehicle-audi-q5.png";
import vehicleBmw330e from "@/assets/vehicle-bmw-330e.png";
import vehicleBmw330i from "@/assets/vehicle-bmw-330i.png";
import vehicleDodgeDurangoRt from "@/assets/vehicle-dodge-durango-rt.png";
import vehicleHyundaiSantaFeHybrid from "@/assets/vehicle-hyundai-santa-fe-hybrid.png";
import vehicleHyundaiElantra from "@/assets/vehicle-hyundai-elantra.png";
import vehicleNissanKicks from "@/assets/vehicle-nissan-kicks.png";

const vehicles = [
  {
    name: "2020 Honda Accord",
    image: vehicleAccord,
    estimate: "$250–$290 Biweekly O.A.C",
  },
  {
    name: "2023 Tesla Model 3",
    image: vehicleTesla,
    estimate: "$240–$280 Biweekly O.A.C",
  },
  {
    name: "2025 Lexus UX300h",
    image: vehicleLexus,
    estimate: "$290–$350 Biweekly O.A.C",
  },
  {
    name: "2022 Honda Civic",
    image: vehicleCivic,
    estimate: "$230–$260 Biweekly O.A.C",
  },
  {
    name: "2025 Honda Civic Hybrid",
    image: vehicleCivicHybrid,
    estimate: "$250–$290 Biweekly O.A.C",
  },
  {
    name: "2018 Audi Q5",
    image: vehicleAudiQ5,
    estimate: "$180–$220 Biweekly O.A.C",
  },
  {
    name: "2023 BMW 330e",
    image: vehicleBmw330e,
    estimate: "$280–$340 Biweekly O.A.C",
  },
  {
    name: "2024 BMW 330i",
    image: vehicleBmw330i,
    estimate: "$280–$320 Biweekly O.A.C",
  },
  {
    name: "2022 Dodge Durango RT",
    image: vehicleDodgeDurangoRt,
    estimate: "$290–$320 Biweekly O.A.C",
  },
  {
    name: "2023 Hyundai Santa Fe Hybrid",
    image: vehicleHyundaiSantaFeHybrid,
    estimate: "$240–$280 Biweekly O.A.C",
  },
  {
    name: "2024 Hyundai Elantra",
    image: vehicleHyundaiElantra,
    estimate: "$150–$180 Biweekly O.A.C",
  },
  {
    name: "2025 Nissan Kicks",
    image: vehicleNissanKicks,
    estimate: "$160–$200 Biweekly O.A.C",
  },
];

const FeaturedVehiclesSection = () => {
  const { openForm } = usePreApprovalForm();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? 1 : w < 768 ? 2 : w < 1024 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxStart = Math.max(0, vehicles.length - visibleCount);
  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(maxStart, i + 1));

  return (
    <section id="vehicles" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
            Featured <span className="gradient-text">Vehicles</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base md:text-lg">
            Explore our top picks. Get pre-approved today and drive home your dream car tomorrow.
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={startIndex === 0}
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-20 disabled:cursor-not-allowed shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={startIndex >= maxStart}
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-20 disabled:cursor-not-allowed shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
            {vehicles.slice(startIndex, startIndex + visibleCount).map((v) => (
              <div
                key={v.name}
                className="group bg-muted/50 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-xl m-2">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="px-4 pb-5 pt-2">
                  <h3 className="font-extrabold text-foreground text-lg mt-1 leading-tight">
                    {v.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Est. {v.estimate}
                  </p>

                  <button
                    onClick={openForm}
                    className="mt-4 text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 group/cta"
                  >
                    Get Pre-Approved
                    <span className="group-hover/cta:translate-x-0.5 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehiclesSection;
