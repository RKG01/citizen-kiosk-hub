import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  ClipboardList,
  Search,
  FileText,
  HelpCircle,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import { useTextScale, type TextScaleLevel } from "@/context/TextScaleContext";
import { useTranslations } from "@/hooks/useTranslations";
import SpeechButton from "@/components/SpeechButton";
import { SPEECH_BUTTON_POSITION } from "@/config/accessibility";
import type { Translations } from "@/i18n/messages";

type ServiceKey = keyof Translations["index"]["services"];

const services: { icon: LucideIcon; labelKey: ServiceKey; path: string }[] = [
  { icon: Wallet, labelKey: "payBill", path: "/pay-bill" },
  { icon: ClipboardList, labelKey: "registerComplaint", path: "/register-complaint" },
  { icon: Search, labelKey: "trackStatus", path: "/track-status" },
  { icon: FileText, labelKey: "applyService", path: "/apply-for-service" },
  { icon: HelpCircle, labelKey: "help", path: "/help" },
];

const Index = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const { level: textScale, setLevel: setTextScale } = useTextScale();
  const t = useTranslations();
  const contentRef = useRef<HTMLDivElement>(null);
  const textSizeOptions = useMemo<{ key: TextScaleLevel; label: string; glyphSize: number }[]>(
    () => [
      { key: "decrease", label: t.common.textSize.decrease, glyphSize: 20 },
      { key: "default", label: t.common.textSize.default, glyphSize: 24 },
      { key: "increase", label: t.common.textSize.increase, glyphSize: 28 },
    ],
    [t.common.textSize.decrease, t.common.textSize.default, t.common.textSize.increase],
  );

  return (
    <div className="relative min-h-screen bg-background p-6 select-none">
      <div
        className="pointer-events-auto fixed z-40"
        style={{ top: SPEECH_BUTTON_POSITION.top, right: SPEECH_BUTTON_POSITION.right }}
      >
        <SpeechButton contentRef={contentRef} />
      </div>
      <div ref={contentRef} className="flex flex-col items-center justify-center gap-10 text-center">
        <div className="kiosk-text-controls" data-speech-skip="true">
        {textSizeOptions.map((option) => {
          const isActive = textScale === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setTextScale(option.key)}
              aria-pressed={isActive}
              aria-label={option.label}
              className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] bg-white/70 text-muted-foreground shadow-lg shadow-black/5 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isActive ? "border-primary text-primary" : "border-border"
              }`}
            >
              <span
                className="font-black leading-none"
                style={{ fontSize: `${option.glyphSize}px` }}
              >
                A
              </span>
              <span className="sr-only">{option.label}</span>
            </button>
          );
        })}
      </div>
      {/* Header */}
      <header className="flex w-full max-w-3xl flex-col items-center gap-5 pt-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Shield size={56} />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
            {t.common.kioskTitle}
          </h1>
          <div className="mx-auto mt-3 h-px w-48 bg-border" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3" data-speech-skip="true">
          {(["en", "hi", "mr"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-xl px-6 py-3 text-lg font-semibold transition-colors shadow ${
                lang === l
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {t.common.languageNames[l]}
            </button>
          ))}
        </div>
      </header>

      {/* Service Buttons Grid */}
      <main className="my-8 w-full px-4">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-2 gap-6">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                const isLast = i === services.length - 1 && services.length % 2 !== 0;
                return (
                  <button
                    key={i}
                    onClick={() => navigate(svc.path)}
                    className={`flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98] ${
                      isLast ? "col-span-2 mx-auto w-1/2" : ""
                    }`}
                  >
                    <Icon size={56} strokeWidth={1.8} />
                    <span className="text-2xl font-bold md:text-3xl">
                      {t.index.services[svc.labelKey]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Index;
