import { cn } from "@/lib/utils";

interface NumericKeypadProps {
  onDigitPress: (digit: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  label?: string;
  className?: string;
}

const keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "backspace"] as const;

const NumericKeypad = ({ onDigitPress, onBackspace, onClear, label, className }: NumericKeypadProps) => {
  const handlePress = (key: (typeof keyLayout)[number]) => {
    if (key === "backspace") {
      onBackspace();
      return;
    }
    if (key === "clear") {
      onClear();
      return;
    }
    onDigitPress(key);
  };

  return (
    <div data-speech-skip="true" className={cn("w-full rounded-2xl bg-muted/70 p-4 shadow-inner", className)}>
      {label ? <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">{label}</p> : null}
      <div className="grid grid-cols-3 gap-3">
        {keyLayout.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handlePress(key)}
            className={cn(
              "rounded-2xl px-6 py-5 text-2xl font-bold text-foreground shadow-md transition active:scale-95",
              key === "backspace" || key === "clear" ? "bg-secondary text-secondary-foreground" : "bg-card"
            )}
            aria-label={key === "backspace" ? "Delete last digit" : key === "clear" ? "Clear input" : `Enter ${key}`}
          >
            {key === "backspace" ? "Del" : key === "clear" ? "Clear" : key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumericKeypad;
