import { Label } from "@/components/ui/label";

const contactMethods = ["Phone Call", "Text / SMS", "Email", "WhatsApp"];

interface Props {
  form: { preferredContact: string };
  update: (field: string, value: string) => void;
}

const TimelineStep = ({ form, update }: Props) => (
  <div>
    <h3 className="text-lg sm:text-xl font-extrabold text-foreground text-center mb-4">
      Almost done! 🎉
    </h3>
    <div>
      <Label className="text-[11px] sm:text-xs font-semibold">Preferred Contact Method</Label>
      <div className="grid grid-cols-2 gap-2 mt-1.5">
        {contactMethods.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => update("preferredContact", c)}
            className={`rounded-xl border-2 p-2.5 text-sm font-medium transition-all ${
              form.preferredContact === c ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default TimelineStep;