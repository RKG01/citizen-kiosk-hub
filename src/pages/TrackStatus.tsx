import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, FileText, CreditCard, Printer, CheckCircle2, Clock, Loader2, MessageSquare } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";
import OnScreenKeyboard from "@/components/OnScreenKeyboard";
import { useTranslations } from "@/hooks/useTranslations";
import { useToast } from "@/hooks/use-toast";

type TrackType = "complaint" | "service" | "payment";

const trackingTypes: { id: TrackType; icon: typeof ClipboardList }[] = [
  { id: "complaint", icon: ClipboardList },
  { id: "service", icon: FileText },
  { id: "payment", icon: CreditCard },
];

const TrackStatus = () => {
  const t = useTranslations();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [trackType, setTrackType] = useState<TrackType | "">("");
  const [trackId, setTrackId] = useState("");
  const printTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (printTimeoutRef.current) {
        clearTimeout(printTimeoutRef.current);
      }
      if (smsTimeoutRef.current) {
        clearTimeout(smsTimeoutRef.current);
      }
    };
  }, []);

  const handleBack = () => {
    if (step === 1) navigate("/");
    else setStep(step - 1);
  };

  const handlePrintStatus = () => {
    if (printTimeoutRef.current) {
      clearTimeout(printTimeoutRef.current);
    }

    toast({ title: t.common.printingStatus });
    printTimeoutRef.current = setTimeout(() => {
      toast({ title: t.common.statusPrinted });
      printTimeoutRef.current = null;
    }, 1500);
  };

  const handleSendSms = () => {
    if (smsTimeoutRef.current) {
      clearTimeout(smsTimeoutRef.current);
    }

    toast({ title: t.common.sendingReceiptSms });
    smsTimeoutRef.current = setTimeout(() => {
      toast({ title: t.common.receiptSmsSent });
      smsTimeoutRef.current = null;
    }, 1500);
  };

  const handleTrackIdInsert = (value: string) => {
    setTrackId((prev) => `${prev}${value}`);
  };

  const handleTrackIdBackspace = () => {
    setTrackId((prev) => prev.slice(0, -1));
  };

  const handleTrackIdClear = () => {
    setTrackId("");
  };

  // Step 1
  if (step === 1) {
    return (
      <KioskLayout title={t.trackStatus.title} step={1} totalSteps={3} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.trackStatus.selectType}</h2>
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trackingTypes.map((option) => {
            const Icon = option.icon;
            return (
              <button key={option.id} onClick={() => { setTrackType(option.id); setStep(2); }}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-xl font-bold">{t.trackStatus.trackTypes[option.id]}</span>
              </button>
            );
          })}
        </div>
      </KioskLayout>
    );
  }

  // Step 2
  if (step === 2) {
    return (
      <KioskLayout title={t.trackStatus.title} step={2} totalSteps={3} onBack={handleBack}>
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-2xl font-bold text-foreground">{t.trackStatus.enterId}</h2>
          <div className="flex w-full max-w-4xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            <input
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              placeholder={t.trackStatus.idPlaceholder}
              className="w-full flex-1 rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none"
            />
            <div className="w-full lg:flex-[1.4] lg:max-w-[520px]">
              <OnScreenKeyboard
                label={t.trackStatus.enterId}
                onInsert={handleTrackIdInsert}
                onBackspace={handleTrackIdBackspace}
                onClear={handleTrackIdClear}
              />
            </div>
          </div>
          <button onClick={() => trackId && setStep(3)} disabled={!trackId}
            className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
            {t.trackStatus.trackButton}
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 3: Status Display
  const statusSteps = t.trackStatus.steps;
  const currentStatusIndex = 2; // In Progress

  return (
    <KioskLayout title={t.trackStatus.title} step={3} totalSteps={3}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-foreground">{t.trackStatus.statusHeading}</h2>

        {/* Progress tracker */}
        <div className="flex w-full max-w-xl items-center justify-between">
          {statusSteps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                i <= currentStatusIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < currentStatusIndex ? <CheckCircle2 size={24} /> : i === currentStatusIndex ? <Loader2 size={24} className="animate-spin" /> : <Clock size={24} />}
              </div>
              <span className={`text-sm font-semibold ${i <= currentStatusIndex ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-4 text-xl">
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.trackStatus.labels.trackingId}</span><span className="font-bold text-foreground">{trackId}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.trackStatus.labels.status}</span><span className="font-bold text-amber-600">{t.trackStatus.statusValue}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.trackStatus.labels.lastUpdated}</span><span className="font-bold text-foreground">26 Feb 2026</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.trackStatus.labels.department}</span><span className="font-bold text-foreground capitalize">{trackType ? t.trackStatus.trackTypes[trackType as TrackType] : "-"}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.trackStatus.labels.officer}</span><span className="font-bold text-foreground">Shri Anil Patil</span></div>
          </div>
        </div>

        <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
          <button onClick={handlePrintStatus} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <Printer size={24} /> {t.common.printStatus}
          </button>
          <button onClick={handleSendSms} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <MessageSquare size={24} /> {t.common.sendSms}
          </button>
          <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-accent-foreground shadow-lg">
            {t.common.backToHome}
          </button>
        </div>
      </div>
    </KioskLayout>
  );
};

export default TrackStatus;
