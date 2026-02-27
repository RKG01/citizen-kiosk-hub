import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KioskLayoutProps {
  title: string;
  children: React.ReactNode;
  step?: number;
  totalSteps?: number;
  onBack?: () => void;
  showHome?: boolean;
}

const KioskLayout = ({ title, children, step, totalSteps, onBack, showHome = true }: KioskLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background select-none">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground">
        {onBack ? (
          <button onClick={onBack} className="flex items-center gap-2 text-lg font-semibold">
            <ArrowLeft size={28} /> Back
          </button>
        ) : (
          <div className="w-20" />
        )}
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {showHome ? (
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-lg font-semibold">
            <Home size={28} /> Home
          </button>
        ) : (
          <div className="w-20" />
        )}
      </header>

      {/* Step Indicator */}
      {step && totalSteps && (
        <div className="flex items-center justify-center gap-2 bg-secondary px-6 py-3">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                  i + 1 <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`h-1 w-8 rounded ${i + 1 < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl">{children}</div>
      </main>
    </div>
  );
};

export default KioskLayout;
