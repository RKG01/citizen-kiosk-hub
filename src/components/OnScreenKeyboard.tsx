import { cn } from "@/lib/utils";

interface OnScreenKeyboardProps {
  onInsert: (value: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  label?: string;
  className?: string;
}

const keyRows: { keys: string[]; gridClass: string }[] = [
  { keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], gridClass: "grid-cols-10" },
  { keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], gridClass: "grid-cols-10" },
  { keys: ["A", "S", "D", "F", "G", "H", "J", "K", "L"], gridClass: "grid-cols-9" },
  { keys: ["Z", "X", "C", "V", "B", "N", "M"], gridClass: "grid-cols-7" },
  { keys: [".", ",", "?", "!", "-", "'", "@", "#", "&"], gridClass: "grid-cols-9" },
];

const OnScreenKeyboard = ({ onInsert, onBackspace, onClear, label, className }: OnScreenKeyboardProps) => {
  const handlePress = (value: string) => {
    onInsert(value);
  };

  return (
    <div data-speech-skip="true" className={cn("w-full rounded-2xl bg-muted/70 p-3 shadow-inner", className)}>
      {label ? <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">{label}</p> : null}
      <div className="space-y-2">
        {keyRows.map((row) => (
          <div key={row.gridClass} className={cn("grid gap-2", row.gridClass)}>
            {row.keys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handlePress(key)}
                className="rounded-lg bg-card py-1.5 text-lg font-semibold text-foreground shadow-md transition active:scale-95"
                aria-label={`Enter ${key}`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onBackspace}
          className="flex-1 rounded-lg bg-secondary px-4 py-1.5 text-base font-semibold text-secondary-foreground shadow-md transition active:scale-95"
        >
          Backspace
        </button>
        <button
          type="button"
          onClick={() => handlePress(" ")}
          className="flex-[2.2] rounded-lg bg-card px-4 py-1.5 text-base font-semibold text-foreground shadow-md transition active:scale-95"
        >
          Space
        </button>
        <button
          type="button"
          onClick={onClear}
          className="flex-1 rounded-lg bg-secondary px-4 py-1.5 text-base font-semibold text-secondary-foreground shadow-md transition active:scale-95"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
