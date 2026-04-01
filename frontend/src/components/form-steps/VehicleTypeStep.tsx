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
  <div>
    <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-4">
      What type of car are you looking to buy?
    </h3>
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {vehicles.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => onChange(v.id)}
          className={`relative rounded-xl border-2 p-2 sm:p-3 md:p-4 cursor-pointer transition-all text-center hover:shadow-md ${
            value === v.id
              ? "border-green bg-green/5 shadow-md"
              : "border-border hover:border-primary/30"
          }`}
        >
          {v.popular && (
            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full">
              Popular
            </span>
          )}
          <img src={v.img} alt={v.label} className="w-full h-16 sm:h-20 md:h-24 object-contain mb-2" />
          <p className="text-xs sm:text-sm font-semibold text-foreground">{v.label}</p>
        </button>
      ))}
    </div>
  </div>
);

export default VehicleTypeStep;
