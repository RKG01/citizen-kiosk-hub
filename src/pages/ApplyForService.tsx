import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Flame, Droplets, Smartphone, Printer, CheckCircle2, MessageSquare } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";
import NumericKeypad from "@/components/NumericKeypad";
import OnScreenKeyboard from "@/components/OnScreenKeyboard";
import { useTranslations } from "@/hooks/useTranslations";
import { maskPhoneDisplay } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ServiceType = "electricity" | "gas" | "water";

const services: { id: ServiceType; icon: typeof Zap }[] = [
  { id: "electricity", icon: Zap },
  { id: "gas", icon: Flame },
  { id: "water", icon: Droplets },
];

type ApplicationForm = {
  name: string;
  aadhaar: string;
  address: string;
  city: string;
  pincode: string;
};

const ApplyForService = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType | "">("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [activeKeypadField, setActiveKeypadField] = useState<"mobile" | "otp" | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [form, setForm] = useState<ApplicationForm>({ name: "", aadhaar: "", address: "", city: "", pincode: "" });
  const [activeFormField, setActiveFormField] = useState<keyof ApplicationForm | null>(null);
  const printTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sanitizeMobileInput = (value: string) => value.replace(/\D/g, "").slice(0, 10);

  const handleFormInputChange = (field: keyof ApplicationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateActiveFormField = (transform: (current: string) => string) => {
    if (!activeFormField) return;
    setForm((prev) => ({ ...prev, [activeFormField]: transform(prev[activeFormField]) }));
  };

  const handlePersonalKeyboardInsert = (value: string) => {
    updateActiveFormField((current) => `${current}${value}`);
  };

  const handlePersonalKeyboardBackspace = () => {
    updateActiveFormField((current) => current.slice(0, -1));
  };

  const handlePersonalKeyboardClear = () => {
    updateActiveFormField(() => "");
  };

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

  useEffect(() => {
    if (step !== 2) {
      if (activeKeypadField !== null) {
        setActiveKeypadField(null);
      }
      return;
    }

    if (activeKeypadField === null) {
      setActiveKeypadField(otpSent ? "otp" : "mobile");
    }
  }, [step, otpSent, activeKeypadField]);

  const handleMobileChange = (value: string) => {
    setMobile(sanitizeMobileInput(value));
    setOtp("");
    setOtpSent(false);
  };

  const handleSendOtp = () => {
    if (!mobile) return;
    setOtpSent(true);
    setOtp("");
    setActiveKeypadField("otp");
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setStep(3);
    setFormStep(1);
    setActiveFormField("name");
  };

  const handleKeypadDigit = (digit: string) => {
    if (activeKeypadField === "mobile") {
      handleMobileChange(mobile + digit);
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp((prev) => (prev.length >= 6 ? prev : `${prev}${digit}`));
    }
  };

  const handleKeypadBackspace = () => {
    if (activeKeypadField === "mobile") {
      handleMobileChange(mobile.slice(0, -1));
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp((prev) => prev.slice(0, -1));
    }
  };

  const handleKeypadClear = () => {
    if (activeKeypadField === "mobile") {
      handleMobileChange("");
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp("");
    }
  };

  const handleBack = () => {
    if (step === 1) navigate("/");
    else if (step === 3 && formStep > 1) {
      const nextFormStep = formStep - 1;
      setFormStep(nextFormStep);
      setActiveFormField(nextFormStep === 1 ? "name" : null);
    } else {
      if (step === 3) {
        setActiveFormField(null);
      }
      setStep(step - 1);
    }
  };

  const handlePrintReceipt = () => {
    if (printTimeoutRef.current) {
      clearTimeout(printTimeoutRef.current);
    }

    toast({ title: t.common.printingReceipt });
    printTimeoutRef.current = setTimeout(() => {
      toast({ title: t.common.receiptPrinted });
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

  // Step 1: Service selection
  if (step === 1) {
    return (
      <KioskLayout title={t.applyService.title} step={1} totalSteps={4} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.applyService.selectService}</h2>
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => {
                  setService(option.id);
                  setStep(2);
                  setMobile("");
                  setOtp("");
                  setOtpSent(false);
                  setActiveKeypadField("mobile");
                }}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-xl font-bold text-center">{t.applyService.services[option.id]}</span>
              </button>
            );
          })}
        </div>
      </KioskLayout>
    );
  }

  // Step 2: OTP Auth
  if (step === 2) {
    return (
      <KioskLayout title={t.applyService.title} step={2} totalSteps={4} onBack={handleBack}>
        <div className="w-full max-w-4xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-1 flex-col items-center gap-6">
              <Smartphone size={60} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground text-center">{t.applyService.otpStepHeading}</h2>
              <input
                type="tel"
                inputMode="numeric"
                value={mobile}
                maxLength={10}
                onChange={(e) => handleMobileChange(e.target.value)}
                onFocus={() => setActiveKeypadField("mobile")}
                onClick={() => setActiveKeypadField("mobile")}
                placeholder={t.applyService.mobilePlaceholder}
                className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none"
              />
              {!otpSent ? (
                <button onClick={handleSendOtp} disabled={!mobile}
                  className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
                  {t.common.sendOtp}
                </button>
              ) : (
                <>
                  <p className="text-center text-lg font-semibold text-muted-foreground">
                    {`${t.common.otpSentTo} ${maskPhoneDisplay(mobile)}`}
                  </p>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    onFocus={() => setActiveKeypadField("otp")}
                    onClick={() => setActiveKeypadField("otp")}
                    placeholder={t.applyService.otpPlaceholder}
                    maxLength={6}
                    className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold tracking-[0.5em] text-foreground focus:border-primary focus:outline-none"
                  />
                  <button onClick={handleVerifyOtp} disabled={otp.length < 4}
                    className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
                    {t.common.verifyContinue}
                  </button>
                </>
              )}
            </div>
            <div className="w-full lg:w-auto lg:min-w-[260px]">
              <NumericKeypad
                label={activeKeypadField === "otp" ? t.applyService.otpPlaceholder : t.applyService.mobilePlaceholder}
                onDigitPress={handleKeypadDigit}
                onBackspace={handleKeypadBackspace}
                onClear={handleKeypadClear}
              />
            </div>
          </div>
        </div>
      </KioskLayout>
    );
  }

  // Step 3: Multi-step form
  if (step === 3) {
    const formLabels = t.applyService.subSteps;
    return (
      <KioskLayout title={t.applyService.title} step={3} totalSteps={4} onBack={handleBack}>
        {/* Sub-step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {formLabels.map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                i + 1 <= formStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>{i + 1}</div>
              <span className={`hidden text-sm font-semibold sm:inline ${i + 1 <= formStep ? "text-foreground" : "text-muted-foreground"}`}>{l}</span>
              {i < formLabels.length - 1 && <div className={`h-0.5 w-6 ${i + 1 < formStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {formStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-foreground">{t.applyService.personalHeading}</h2>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              <div className="flex-1 space-y-4">
                <input
                  value={form.name}
                  onChange={(e) => handleFormInputChange("name", e.target.value)}
                  onFocus={() => setActiveFormField("name")}
                  onClick={() => setActiveFormField("name")}
                  placeholder={t.applyService.namePlaceholder}
                  className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none"
                />
                <input
                  value={form.aadhaar}
                  onChange={(e) => handleFormInputChange("aadhaar", e.target.value)}
                  onFocus={() => setActiveFormField("aadhaar")}
                  onClick={() => setActiveFormField("aadhaar")}
                  placeholder={t.applyService.aadhaarPlaceholder}
                  className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="w-full lg:flex-[1.3] lg:max-w-[520px]" data-speech-skip="true">
                <OnScreenKeyboard
                  label={t.applyService.personalHeading}
                  onInsert={handlePersonalKeyboardInsert}
                  onBackspace={handlePersonalKeyboardBackspace}
                  onClear={handlePersonalKeyboardClear}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setFormStep(2);
                  setActiveFormField(null);
                }}
                className="rounded-xl bg-primary px-12 py-4 text-xl font-bold text-primary-foreground shadow-lg"
              >
                {t.common.next}
              </button>
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-foreground">{t.applyService.addressHeading}</h2>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder={t.applyService.addressPlaceholder}
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder={t.applyService.cityPlaceholder}
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder={t.applyService.pincodePlaceholder}
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setFormStep(3);
                  setActiveFormField(null);
                }}
                className="rounded-xl bg-primary px-12 py-4 text-xl font-bold text-primary-foreground shadow-lg"
              >
                {t.common.next}
              </button>
            </div>
          </div>
        )}

        {formStep === 3 && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-foreground">{t.applyService.reviewHeading}</h2>
            <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
              <div className="space-y-4 text-lg">
                <div className="flex justify-between"><span className="text-muted-foreground">{t.applyService.reviewLabels.service}</span><span className="font-bold capitalize">{service ? t.applyService.services[service as ServiceType] : "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t.applyService.reviewLabels.name}</span><span className="font-bold">{form.name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t.applyService.reviewLabels.address}</span><span className="font-bold">{form.address || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t.applyService.reviewLabels.city}</span><span className="font-bold">{form.city || "—"}</span></div>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveFormField(null);
                setStep(4);
              }}
              className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg"
            >
              {t.applyService.submitApplication}
            </button>
          </div>
        )}
      </KioskLayout>
    );
  }

  // Step 4: Success
  return (
    <KioskLayout title={t.applyService.title} step={4} totalSteps={4}>
      <div className="flex flex-col items-center gap-8">
        <CheckCircle2 size={100} className="text-green-600" />
        <h2 className="text-3xl font-bold text-foreground">{t.applyService.successHeading}</h2>
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-4 text-xl">
            <div className="flex justify-between"><span className="text-muted-foreground">{t.applyService.applicationId}</span><span className="font-bold">APP-2026-07291</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t.applyService.reviewLabels.service}</span><span className="font-bold capitalize">{service ? t.applyService.services[service as ServiceType] : "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t.applyService.processing}</span><span className="font-bold">7-10 Working Days</span></div>
          </div>
        </div>
        <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
          <button onClick={handlePrintReceipt} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <Printer size={24} /> {t.common.printReceipt}
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

export default ApplyForService;
