import { Lock, Star, Users, Landmark } from "lucide-react";

const items = [
  { icon: Lock, text: "256-bit Encrypted" },
  { icon: Users, text: "1000+ Happy Customers" },
  { icon: Star, text: "4.9 Star Rating" },
  { icon: Landmark, text: "Bank Partnerships" },
  { icon: Lock, text: "100% Confidential" },
  { icon: Users, text: "All Credit Welcome" },
];

const TrustBanner = () => {
  return (
    <div className="bg-foreground border-y border-white/5 py-3 overflow-hidden">
      <div className="marquee flex items-center gap-8 w-max">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-white/50 whitespace-nowrap">
            <item.icon className="h-3.5 w-3.5 text-primary/70" />
            <span className="text-xs font-medium">{item.text}</span>
            <span className="text-white/10 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBanner;