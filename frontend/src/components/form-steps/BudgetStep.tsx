import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const budgetRanges = ["Under $200/mo", "$200 - $350/mo", "$350 - $500/mo", "$500 - $700/mo", "$700+/mo"];
const downPayments = ["$0", "Under $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000+"];

interface Props {
  form: { monthlyBudget: string; downPayment: string; hasTrade: string };
  update: (field: string, value: string) => void;
}

const BudgetStep = ({ form, update }: Props) => (
  <div>
    <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-4">
      Your Budget
    </h3>
    <div className="space-y-3 sm:space-y-4">
      <div>
        <Label className="text-[11px] sm:text-xs font-semibold">Monthly Payment Budget</Label>
        <Select value={form.monthlyBudget} onValueChange={(v) => update("monthlyBudget", v)}>
          <SelectTrigger className="mt-1 h-10 sm:h-11 rounded-xl text-sm"><SelectValue placeholder="Select monthly budget" /></SelectTrigger>
          <SelectContent>{budgetRanges.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-[11px] sm:text-xs font-semibold">Down Payment</Label>
        <Select value={form.downPayment} onValueChange={(v) => update("downPayment", v)}>
          <SelectTrigger className="mt-1 h-10 sm:h-11 rounded-xl text-sm"><SelectValue placeholder="Select down payment" /></SelectTrigger>
          <SelectContent>{downPayments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-[11px] sm:text-xs font-semibold">Do you have a trade-in?</Label>
        <div className="grid grid-cols-3 gap-2 mt-1.5">
          {["Yes", "No", "Not Sure"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update("hasTrade", opt)}
              className={`rounded-xl border-2 p-2.5 text-sm font-medium transition-all ${
                form.hasTrade === opt ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default BudgetStep;
