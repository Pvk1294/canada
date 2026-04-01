import { Star, Quote, ChevronDown, ChevronUp, MapPin, Car } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import delivered1 from "@/assets/delivered-1.jpeg";
import delivered2 from "@/assets/delivered-2.jpeg";
import delivered3 from "@/assets/delivered-3.jpeg";
import delivered4 from "@/assets/delivered-4.jpeg";
import delivered5 from "@/assets/delivered-5.jpeg";
import delivered6 from "@/assets/delivered-6.jpeg";
import delivered7 from "@/assets/delivered-7.jpeg";
import delivered8 from "@/assets/delivered-8.jpeg";
import delivered9 from "@/assets/delivered-9.png";
import delivered10 from "@/assets/delivered-10.png";
import delivered11 from "@/assets/delivered-11.png";
import delivered12 from "@/assets/delivered-12.png";
import delivered13 from "@/assets/delivered-13.jpeg";
import delivered14 from "@/assets/delivered-14.jpeg";
import delivered15 from "@/assets/delivered-15.jpeg";
import delivered16 from "@/assets/delivered-16.png";
import delivered17 from "@/assets/delivered-17.png";
import delivered18 from "@/assets/delivered-18.png";
import delivered19 from "@/assets/delivered-19.png";
import delivered20 from "@/assets/delivered-20.png";
import delivered21 from "@/assets/delivered-21.png";
import delivered22 from "@/assets/delivered-22.png";
import delivered23 from "@/assets/delivered-23.png";
import delivered24 from "@/assets/delivered-24.png";

const testimonials = [
  { name: "Careen D.", car: "Sold Unit MML6248", location: "Kelowna, BC", review: "Amazing experience! They helped me get approved when no one else could. Highly recommend!", image: delivered1 },
  { name: "Harpreet K.", car: "2024 Lexus RX", location: "Surrey, BC", review: "Professional service from start to finish. Got my dream car with great financing terms!", image: delivered2 },
  { name: "Raj P.", car: "2023 Honda Civic", location: "Abbotsford, BC", review: "Quick approval and hassle-free process. The team went above and beyond for me.", image: delivered3 },
  { name: "Jaskaran S.", car: "2024 Tesla Model 3", location: "Vancouver, BC", review: "Best car buying experience ever! They made everything so simple and stress-free.", image: delivered4 },
  { name: "Amanda R.", car: "2022 Dodge Grand Caravan", location: "Nanaimo, BC", review: "Even with my credit situation, they found me an amazing deal. So grateful!", image: delivered5 },
  { name: "Arun M.", car: "2023 Toyota Corolla", location: "Surrey, BC", review: "Transparent, honest, and fast. Got approved same day and drove home happy!", image: delivered6 },
  { name: "Carlos & Maria", car: "2023 Kia Sportage", location: "Langley, BC", review: "They treated us like family. Found the perfect vehicle within our budget.", image: delivered7 },
  { name: "Gurpreet S.", car: "2022 Ford Explorer", location: "Abbotsford, BC", review: "Outstanding service! The whole process was smooth and they kept me informed every step.", image: delivered8 },
  { name: "Navjot & Friends", car: "2024 Hyundai Elantra", location: "Surrey, BC", review: "Couldn't be happier with my purchase. The team is knowledgeable and friendly!", image: delivered9 },
  { name: "Priya & Family", car: "2023 Toyota Highlander", location: "Langley, BC", review: "Found the perfect family vehicle. Great rates and amazing customer service!", image: delivered10 },
  { name: "Marcus T.", car: "2024 Hyundai Tucson", location: "Surrey, BC", review: "From application to delivery, everything was seamless. Five stars all the way!", image: delivered11 },
  { name: "Imran & Son", car: "2024 Honda Civic", location: "Abbotsford, BC", review: "They made my son's first car purchase a wonderful experience. Thank you!", image: delivered12 },
  { name: "Sofia R.", car: "2023 Toyota Corolla Cross", location: "Surrey, BC", review: "Best dealership experience I've had. No pressure, just honest help.", image: delivered13 },
  { name: "Jasmine K.", car: "2023 Dodge Challenger", location: "Langley, BC", review: "Got my dream muscle car! The financing was better than I expected.", image: delivered14 },
  { name: "Kevin L.", car: "2024 Ford Mustang", location: "Surrey, BC", review: "Incredible team! They worked hard to get me the best deal possible.", image: delivered15 },
  { name: "Alex B.", car: "2024 Tesla Model 3", location: "Vancouver, BC", review: "Switching to electric was easy thanks to their amazing financing options!", image: delivered16 },
  { name: "Mandeep S.", car: "2023 Toyota Camry", location: "Surrey, BC", review: "Fast, reliable, and trustworthy. Will definitely recommend to everyone!", image: delivered17 },
  { name: "Luis & Ana", car: "2024 Kia Sportage", location: "Langley, BC", review: "We love our new SUV! The team made the entire process effortless.", image: delivered18 },
  { name: "Simran K.", car: "2023 BMW 330i", location: "Surrey, BC", review: "Luxury car, affordable payments. They made it happen!", image: delivered19 },
  { name: "Ravi & Priya", car: "2024 Nissan Rogue", location: "Surrey, BC", review: "Perfect family car at the perfect price. Exceptional service!", image: delivered20 },
  { name: "Harjot & Friends", car: "2023 Honda Civic", location: "Abbotsford, BC", review: "Best decision we made! Great car and great people to work with.", image: delivered21 },
  { name: "David M.", car: "2024 Hyundai Elantra", location: "Langley, BC", review: "Quick approval, great rate, beautiful car. What more could you ask for?", image: delivered22 },
  { name: "Singh Family", car: "2024 BMW X3", location: "Surrey, BC", review: "Premium service for a premium vehicle. Absolutely loved the experience!", image: delivered23 },
  { name: "Jason & Son", car: "2023 Nissan Rogue", location: "Langley, BC", review: "They found us exactly what we needed. Professional and caring team!", image: delivered24 },
];

const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const inc = end / 60;
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, started]);

  return <span ref={ref}>{count}</span>;
};

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0]; index: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${(index % 3) * 150}ms` }}
    >
      {/* Glass card */}
      <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.3)]">
        {/* Image section */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img
            src={t.image}
            alt={`${t.name} with ${t.car}`}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))] via-[hsl(var(--navy)/0.3)] to-transparent" />
          
          {/* Floating vehicle badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <Car className="h-3 w-3 text-primary" />
            <span className="text-[11px] text-white/90 font-medium">{t.car}</span>
          </div>

          {/* Stars overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-primary text-primary drop-shadow-sm" />
            ))}
          </div>

          {/* Client info at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">{t.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-primary/80" />
                  <span className="text-white/60 text-xs">{t.location}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center shrink-0">
                <Quote className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Review text */}
        <div className="p-5 pt-4">
          <p className="text-white/70 text-sm leading-relaxed italic">
            "{t.review}"
          </p>
          {/* Gold accent line */}
          <div className="mt-4 h-[2px] w-12 rounded-full bg-gradient-to-r from-primary/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

const DeliveredSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 6%) 50%, hsl(0 0% 3%) 100%)" }}>
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }} />
        <div className="absolute -bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/[0.08] border border-primary/20 mb-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">5-Star Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Real Customers,{" "}
            <span className="relative">
              <span className="text-primary">Real Stories</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="text-white/50 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Hear from hundreds of happy customers who drove away with confidence and a smile.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 max-w-2xl mx-auto">
          {[
            { value: 500, label: "Happy Customers", suffix: "+" },
            { value: 98, label: "Satisfaction", suffix: "%" },
            { value: 24, label: "Hr Approvals", suffix: "h" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex-1 min-w-[120px] text-center py-5 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
                <CountUp end={stat.value} />{stat.suffix}
              </p>
              <p className="text-white/40 text-xs font-medium tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {displayed.map((t, index) => (
            <TestimonialCard key={t.name} t={t} index={index} />
          ))}
        </div>

        {/* Show More / Less */}
        {testimonials.length > 6 && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group/btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary/[0.08] border border-primary/25 text-primary font-semibold text-sm hover:bg-primary/15 hover:border-primary/40 transition-all duration-300"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="h-4 w-4 group-hover/btn:-translate-y-0.5 transition-transform" /></>
              ) : (
                <>View All {testimonials.length} Reviews <ChevronDown className="h-4 w-4 group-hover/btn:translate-y-0.5 transition-transform" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeliveredSection;
