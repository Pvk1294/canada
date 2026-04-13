import suvImg from "@/assets/vehicles/suv.png";
import sedanImg from "@/assets/vehicles/sedan.png";
import truckImg from "@/assets/vehicles/truck.png";
import hatchbackImg from "@/assets/vehicles/hatchback.png";
import minivanImg from "@/assets/vehicles/minivan.png";
import coupeImg from "@/assets/vehicles/coupe.png";

const vehicles = [
  { id: "suv", label: "SUV & Crossover", img: suvImg, popular: true },
  { id: "sedan", label: "Sedan", img: sedanImg },
  { id: "truck", label: "Truck", img: truckImg },
  { id: "hatchback", label: "Hatchback", img: hatchbackImg },
  { id: "minivan", label: "Minivan", img: minivanImg },
  { id: "coupe", label: "Coupe", img: coupeImg },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const VehicleTypeStep = ({ value, onChange }: Props) => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-[1.7rem] sm:text-[1.95rem] font-extrabold text-foreground leading-tight text-balance">
        What type of vehicle are you looking for?
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
        Pick the body style you want and we’ll match you with the best approval options.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {vehicles.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => onChange(v.id)}
          className={`group relative min-h-[168px] sm:min-h-[188px] rounded-2xl border bg-gradient-to-b from-white to-muted/30 px-3 py-4 sm:px-4 sm:py-5 cursor-pointer text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
            value === v.id
              ? "border-primary bg-primary/5 shadow-[0_16px_40px_-24px_hsl(var(--primary)/0.6)]"
              : "border-border/80 hover:border-primary/40"
          }`}
        >
          {v.popular && (
            <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-sm">
              Popular
            </span>
          )}
          <div className="flex h-full flex-col items-center justify-center">
            <img
              src={v.img}
              alt={v.label}
              className="w-full h-20 sm:h-24 object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
            />
            <p className="text-sm sm:text-[15px] font-semibold text-foreground leading-snug">{v.label}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default VehicleTypeStep;
