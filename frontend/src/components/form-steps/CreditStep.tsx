const creditRanges = [
  { id: "excellent", label: "Excellent (750+)", color: "bg-green" },
  { id: "good", label: "Good (700-749)", color: "bg-green-light" },
  { id: "fair", label: "Fair (600-699)", color: "bg-gold" },
  { id: "poor", label: "Poor (Below 600)", color: "bg-destructive" },
  { id: "none", label: "No Credit History", color: "bg-muted-foreground" },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const CreditStep = ({ value, onChange }: Props) => (
  <div>
    <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-1">
      What's your credit score range?
    </h3>
    <p className="text-xs text-muted-foreground text-center mb-4">Don't worry — all credit types are welcome!</p>
    <div className="space-y-2.5">
      {creditRanges.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          className={`w-full flex items-center gap-3 rounded-xl border-2 p-3 sm:p-3.5 cursor-pointer transition-all text-left ${
            value === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
          }`}
        >
          <div className={`w-3 h-3 rounded-full ${c.color} flex-shrink-0`} />
          <span className="text-sm font-medium text-foreground">{c.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default CreditStep;
