import { useRef } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpeechButton from "@/components/SpeechButton";
import { SPEECH_BUTTON_POSITION } from "@/config/accessibility";
import { useTranslations } from "@/hooks/useTranslations";

interface KioskLayoutProps {
  title: string;
  children: React.ReactNode;
  step?: number;
  totalSteps?: number;
  onBack?: () => void;
  showHome?: boolean;
  speechContent?: string;
}
const KioskLayout = ({ title, children, step, totalSteps, onBack, showHome = true, speechContent }: KioskLayoutProps) => {
  const navigate = useNavigate();
  const t = useTranslations();
  const contentRef = useRef<HTMLDivElement>(null);

  const topButtonClasses = "flex items-center justify-center gap-3 rounded-xl border-2 border-primary-foreground/40 bg-primary-foreground/15 px-6 py-3 text-2xl font-black uppercase tracking-wide shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-primary";

  return (
    <div className="flex min-h-screen flex-col bg-background select-none">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground">
        <div className="flex min-w-[220px] justify-start">
          {onBack ? (
            <button onClick={onBack} className={`${topButtonClasses} w-full`} aria-label={t.common.back}>
              <ArrowLeft size={34} /> {t.common.back}
            </button>
          ) : (
            <div className="h-0 w-[220px]" aria-hidden />
          )}
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <div className="flex min-w-[260px] items-center justify-end gap-3">
          {showHome ? (
            <button onClick={() => navigate("/")} className={`${topButtonClasses} w-full`} aria-label={t.common.home}>
              <Home size={34} /> {t.common.home}
            </button>
          ) : (
            <div className="h-0 w-[220px]" aria-hidden />
          )}
        </div>
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
      <main className="relative flex flex-1 flex-col items-center justify-center p-6">
        <div ref={contentRef} className="w-full max-w-3xl">
          {children}
        </div>
        <div
          className="pointer-events-auto fixed z-40"
          style={{ top: SPEECH_BUTTON_POSITION.top, right: SPEECH_BUTTON_POSITION.right }}
        >
          <SpeechButton content={speechContent} contentRef={contentRef} />
        </div>
      </main>
    </div>
  );
};

export default KioskLayout;
