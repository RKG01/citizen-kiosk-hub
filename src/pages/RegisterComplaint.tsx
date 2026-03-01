import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Flame, Droplets, Trash2, Smartphone, CreditCard, Ban, Receipt, Droplet, Clock, HelpCircle, Printer, CheckCircle2, MessageSquare } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";
import NumericKeypad from "@/components/NumericKeypad";
import OnScreenKeyboard from "@/components/OnScreenKeyboard";
import { useTranslations } from "@/hooks/useTranslations";
import { maskPhoneDisplay } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Dept = "electricity" | "gas" | "water" | "waste";
type ComplaintType = "no_supply" | "billing" | "leakage" | "delay" | "other";

const departments = [
  { id: "electricity" as Dept, icon: Zap },
  { id: "gas" as Dept, icon: Flame },
  { id: "water" as Dept, icon: Droplets },
  { id: "waste" as Dept, icon: Trash2 },
];

const complaintTypes = [
  { id: "no_supply" as ComplaintType, icon: Ban },
  { id: "billing" as ComplaintType, icon: Receipt },
  { id: "leakage" as ComplaintType, icon: Droplet },
  { id: "delay" as ComplaintType, icon: Clock },
  { id: "other" as ComplaintType, icon: HelpCircle },
];

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [dept, setDept] = useState<Dept | "">("");
  const [authMethod, setAuthMethod] = useState<"mobile" | "consumer" | null>(null);
  const [otp, setOtp] = useState("");
  const [authInput, setAuthInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [complaintType, setComplaintType] = useState<ComplaintType | "">("");
  const [description, setDescription] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [activeKeypadField, setActiveKeypadField] = useState<"auth" | "otp" | null>(null);
  const registeredMask = maskPhoneDisplay("645");
  const printTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sanitizeNumericInput = (value: string) => value.replace(/\D/g, "").slice(0, 10);

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

  const handleAuthSelection = (method: "mobile" | "consumer") => {
    setAuthMethod(method);
    setAuthInput("");
    setOtp("");
    setOtpSent(false);
    setVerified(false);
    setActiveKeypadField("auth");
  };

  const handleAuthInputChange = (value: string) => {
    setAuthInput(authMethod ? sanitizeNumericInput(value) : value);
    setOtp("");
    setOtpSent(false);
    setVerified(false);
  };

  const handleSendOtp = () => {
    if (!authInput) return;
    setOtpSent(true);
    setOtp("");
    setActiveKeypadField("otp");
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setVerified(true);
    setStep(3);
  };

  const handleKeypadDigit = (digit: string) => {
    if (activeKeypadField === "auth") {
      handleAuthInputChange(authInput + digit);
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp((prev) => (prev.length >= 6 ? prev : `${prev}${digit}`));
    }
  };

  const handleKeypadBackspace = () => {
    if (activeKeypadField === "auth") {
      handleAuthInputChange(authInput.slice(0, -1));
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp((prev) => prev.slice(0, -1));
    }
  };

  const handleKeypadClear = () => {
    if (activeKeypadField === "auth") {
      handleAuthInputChange("");
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp("");
    }
  };

  const handleDescriptionInsert = (value: string) => {
    setDescription((prev) => `${prev}${value}`);
  };

  const handleDescriptionBackspace = () => {
    setDescription((prev) => prev.slice(0, -1));
  };

  const handleDescriptionClear = () => {
    setDescription("");
  };

  const handleBack = () => {
    if (step === 1) navigate("/");
    else setStep(step - 1);
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

  // Step 1: Department
  if (step === 1) {
    return (
      <KioskLayout title={t.registerComplaint.title} step={1} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.registerComplaint.selectDepartment}</h2>
        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {departments.map((d) => {
            const Icon = d.icon;
            return (
              <button key={d.id} onClick={() => { setDept(d.id); setStep(2); }}
                className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Icon size={44} strokeWidth={1.8} />
                <span className="text-xl font-bold">{t.registerComplaint.departments[d.id]}</span>
              </button>
            );
          })}
        </div>
      </KioskLayout>
    );
  }

  // Step 2: Authentication
  if (step === 2) {
    return (
      <KioskLayout title={t.registerComplaint.title} step={2} totalSteps={5} onBack={handleBack}>
        {!authMethod ? (
          <>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.registerComplaint.verifyIdentity}</h2>
            <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              <button onClick={() => handleAuthSelection("mobile")}
                className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Smartphone size={44} /> <span className="text-xl font-bold">{t.registerComplaint.authMethods.mobile}</span>
              </button>
              <button onClick={() => handleAuthSelection("consumer")}
                className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <CreditCard size={44} /> <span className="text-xl font-bold">{t.registerComplaint.authMethods.consumer}</span>
              </button>
            </div>
          </>
        ) : !verified ? (
          <div className="w-full max-w-4xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-1 flex-col items-center gap-6">
                <h2 className="text-2xl font-bold text-foreground text-center">
                  {authMethod === "mobile" ? t.registerComplaint.enterMobile : t.registerComplaint.enterConsumer}
                </h2>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={authInput}
                  onChange={(e) => handleAuthInputChange(e.target.value)}
                  onFocus={() => setActiveKeypadField("auth")}
                  onClick={() => setActiveKeypadField("auth")}
                  placeholder={authMethod === "mobile" ? t.registerComplaint.enterMobile : t.registerComplaint.enterConsumer}
                  className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none"
                />
                {!otpSent ? (
                  <button onClick={handleSendOtp} disabled={!authInput}
                    className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
                    {t.common.sendOtp}
                  </button>
                ) : (
                  <>
                    <p className="text-center text-lg font-semibold text-muted-foreground">
                      {authMethod === "mobile"
                        ? `${t.common.otpSentTo} ${maskPhoneDisplay(authInput)}`
                        : `${t.common.otpSentRegistered} ${registeredMask}`}
                    </p>
                    <h2 className="text-2xl font-bold text-foreground">{t.registerComplaint.enterOtp}</h2>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      onFocus={() => setActiveKeypadField("otp")}
                      onClick={() => setActiveKeypadField("otp")}
                      placeholder={t.registerComplaint.otpPlaceholder}
                      maxLength={6}
                      className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold tracking-[0.5em] text-foreground focus:border-primary focus:outline-none"
                    />
                    <button onClick={handleVerifyOtp} disabled={otp.length < 4}
                      className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
                      {t.common.verify}
                    </button>
                  </>
                )}
              </div>
              <div className="w-full lg:w-auto lg:min-w-[260px]">
                <NumericKeypad
                  label={
                    activeKeypadField === "otp"
                      ? t.registerComplaint.enterOtp
                      : authMethod === "mobile"
                        ? t.registerComplaint.enterMobile
                        : t.registerComplaint.enterConsumer
                  }
                  onDigitPress={handleKeypadDigit}
                  onBackspace={handleKeypadBackspace}
                  onClear={handleKeypadClear}
                />
              </div>
            </div>
          </div>
        ) : null}
      </KioskLayout>
    );
  }

  // Step 3: Complaint Type
  if (step === 3) {
    return (
      <KioskLayout title={t.registerComplaint.title} step={3} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.registerComplaint.complaintType}</h2>
        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          {complaintTypes.map((c) => {
            const Icon = c.icon;
            const isLast = complaintTypes.indexOf(c) === complaintTypes.length - 1 && complaintTypes.length % 2 !== 0;
            return (
              <button key={c.id} onClick={() => { setComplaintType(c.id); setStep(4); }}
                className={`flex min-h-[110px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-6 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] ${isLast ? "col-span-2 mx-auto w-1/2" : ""}`}>
                <Icon size={40} strokeWidth={1.8} />
                <span className="text-xl font-bold">{t.registerComplaint.complaintTypes[c.id]}</span>
              </button>
            );
          })}
        </div>
      </KioskLayout>
    );
  }

  // Step 4: Description
  if (step === 4) {
    return (
      <KioskLayout title={t.registerComplaint.title} step={4} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">{t.registerComplaint.descriptionHeading}</h2>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            placeholder={t.registerComplaint.descriptionPlaceholder}
            className="min-h-[320px] w-full flex-1 rounded-xl border-2 border-input bg-background px-6 py-4 text-xl text-foreground focus:border-primary focus:outline-none lg:flex-[2]"
          />
          <div className="w-full lg:flex-[3] lg:max-w-[520px]">
            <OnScreenKeyboard
              label={t.registerComplaint.descriptionHeading}
              onInsert={handleDescriptionInsert}
              onBackspace={handleDescriptionBackspace}
              onClear={handleDescriptionClear}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => setStep(5)} className="rounded-xl bg-secondary px-10 py-4 text-xl font-bold text-secondary-foreground shadow-lg">
            {t.registerComplaint.buttons.skip}
          </button>
          <button onClick={() => setStep(5)} className="rounded-xl bg-primary px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg">
            {t.registerComplaint.buttons.next}
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 5: Success
  return (
    <KioskLayout title={t.registerComplaint.title} step={5} totalSteps={5}>
      <div className="flex flex-col items-center gap-8">
        <CheckCircle2 size={100} className="text-green-600" />
        <h2 className="text-3xl font-bold text-foreground">{t.registerComplaint.successHeading}</h2>
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-4 text-xl">
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.registerComplaint.complaintNumber}</span><span className="font-bold text-foreground">CMP-2026-00482</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.registerComplaint.department}</span><span className="font-bold text-foreground capitalize">{dept ? t.registerComplaint.departments[dept as Dept] : "-"}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">{t.registerComplaint.resolution}</span><span className="font-bold text-foreground">{t.registerComplaint.resolutionEta}</span></div>
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

export default RegisterComplaint;
