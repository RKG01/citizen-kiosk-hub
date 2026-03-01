import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Flame, Droplets, Smartphone, Phone, CreditCard, Landmark, CheckCircle2, Printer, MessageSquare } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";
import NumericKeypad from "@/components/NumericKeypad";
import { useTranslations } from "@/hooks/useTranslations";
import { maskPhoneDisplay } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Dept = "electricity" | "gas" | "water";
type InputMethod = "consumer" | "mobile";
type PayMethod = "upi" | "debit" | "netbanking";

const departments = [
  { id: "electricity" as Dept, icon: Zap },
  { id: "gas" as Dept, icon: Flame },
  { id: "water" as Dept, icon: Droplets },
];

const PayBill = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [dept, setDept] = useState<Dept | null>(null);
  const [inputMethod, setInputMethod] = useState<InputMethod | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [activeKeypadField, setActiveKeypadField] = useState<"input" | "otp" | null>(null);
  const smsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const printTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const registeredMask = maskPhoneDisplay("645");
  const sanitizeNumericInput = (value: string) => value.replace(/\D/g, "").slice(0, 10);
  const customerName = "Rajesh Kumar";
  const billAmount = "₹ 2,450.00";
  const transactionId = "TXN-2026-0384756";
  const defaultConsumerId = "1234567890";
  const defaultMobileNumber = "9876543210";
  const billDate = "15 Mar 2026";

  useEffect(() => {
    return () => {
      if (smsTimeoutRef.current) {
        clearTimeout(smsTimeoutRef.current);
      }
      if (printTimeoutRef.current) {
        clearTimeout(printTimeoutRef.current);
      }
    };
  }, []);

  const resetAuthFlow = (nextActiveField: "input" | null = null) => {
    setInputValue("");
    setOtpSent(false);
    setOtp("");
    setActiveKeypadField(nextActiveField);
  };

  const handleSelectMethod = (method: InputMethod) => {
    setInputMethod(method);
    resetAuthFlow("input");
  };

  const handleChangeMethod = () => {
    setInputMethod(null);
    resetAuthFlow(null);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setOtpSent(false);
    setOtp("");
  };

  const handleSendOtp = () => {
    if (!inputValue) return;
    setOtpSent(true);
    setOtp("");
    setActiveKeypadField("otp");
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setStep(3);
  };

  const handleKeypadDigit = (digit: string) => {
    if (activeKeypadField === "input" && inputMethod) {
      const nextValue = sanitizeNumericInput(`${inputValue}${digit}`);
      handleInputChange(nextValue);
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp((prev) => (prev.length >= 6 ? prev : `${prev}${digit}`));
    }
  };

  const handleKeypadBackspace = () => {
    if (activeKeypadField === "input") {
      handleInputChange(inputValue.slice(0, -1));
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp((prev) => prev.slice(0, -1));
    }
  };

  const handleKeypadClear = () => {
    if (activeKeypadField === "input") {
      handleInputChange("");
      return;
    }

    if (activeKeypadField === "otp") {
      setOtp("");
    }
  };

  const handleDepartmentSelect = (department: Dept) => {
    setDept(department);
    setInputMethod(null);
    resetAuthFlow(null);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 1) navigate("/");
    else setStep(step - 1);
  };

  const handleSendReceiptSms = () => {
    if (smsTimeoutRef.current) {
      clearTimeout(smsTimeoutRef.current);
    }

    toast({ title: t.common.sendingReceiptSms });
    smsTimeoutRef.current = setTimeout(() => {
      toast({ title: t.common.receiptSmsSent });
      smsTimeoutRef.current = null;
    }, 1500);
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

  // Step 1: Department Selection
  if (step === 1) {
    return (
      <KioskLayout title={t.payBill.title} step={1} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.payBill.selectDepartment}</h2>
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => handleDepartmentSelect(d.id)}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-2xl font-bold">{t.payBill.departments[d.id]}</span>
              </button>
            );
          })}
        </div>
      </KioskLayout>
    );
  }

  // Step 2: Enter Details
  if (step === 2) {
    const methods = [
      { id: "consumer" as InputMethod, icon: CreditCard },
      { id: "mobile" as InputMethod, icon: Phone },
    ];
    return (
      <KioskLayout title={t.payBill.title} step={2} totalSteps={5} onBack={handleBack}>
        {!inputMethod ? (
          <>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.payBill.chooseInputMethod}</h2>
            <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
              {methods.map((m) => {
                const copy = t.payBill.inputMethods[m.id];
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMethod(m.id)}
                    className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <Icon size={48} strokeWidth={1.8} />
                    <span className="text-xl font-bold">{copy.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="w-full max-w-5xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-1 flex-col items-center gap-6">
                <h2 className="text-2xl font-bold text-foreground text-center">
                  {inputMethod === "consumer" ? t.payBill.inputMethods.consumer.heading : t.payBill.inputMethods.mobile.heading}
                </h2>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={inputValue}
                  onChange={(e) => handleInputChange(sanitizeNumericInput(e.target.value))}
                  onFocus={() => setActiveKeypadField("input")}
                  onClick={() => setActiveKeypadField("input")}
                  placeholder={inputMethod === "consumer" ? t.payBill.inputMethods.consumer.placeholder : t.payBill.inputMethods.mobile.placeholder}
                  className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none"
                />
                {!otpSent ? (
                  <button
                    onClick={handleSendOtp}
                    disabled={!inputValue}
                    className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50"
                  >
                    {t.common.sendOtp}
                  </button>
                ) : (
                  <>
                    <p className="text-center text-lg font-semibold text-muted-foreground">
                      {inputMethod === "mobile"
                        ? `${t.common.otpSentTo} ${maskPhoneDisplay(inputValue)}`
                        : `${t.common.otpSentRegistered} ${registeredMask}`}
                    </p>
                    <h3 className="text-2xl font-bold text-foreground">{t.payBill.otp.heading}</h3>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      onFocus={() => setActiveKeypadField("otp")}
                      onClick={() => setActiveKeypadField("otp")}
                      placeholder={t.payBill.otp.placeholder}
                      maxLength={6}
                      className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold tracking-[0.5em] text-foreground focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.length < 4}
                      className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50"
                    >
                      {t.common.verify}
                    </button>
                  </>
                )}
              </div>
              <div className="w-full lg:w-auto lg:min-w-[260px]">
                <NumericKeypad
                  label={
                    activeKeypadField === "otp"
                      ? t.payBill.otp.heading
                      : inputMethod === "consumer"
                        ? t.payBill.inputMethods.consumer.heading
                        : t.payBill.inputMethods.mobile.heading
                  }
                  onDigitPress={handleKeypadDigit}
                  onBackspace={handleKeypadBackspace}
                  onClear={handleKeypadClear}
                />
              </div>
            </div>
          </div>
        )}
      </KioskLayout>
    );
  }

  // Step 3: Bill Details
  if (step === 3) {
    return (
      <KioskLayout title={t.payBill.title} step={3} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.payBill.billDetails.heading}</h2>
        <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-6 text-xl">
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-muted-foreground">{t.payBill.billDetails.consumerName}</span>
              <span className="font-bold text-foreground">{customerName}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-muted-foreground">{t.payBill.billDetails.department}</span>
              <span className="font-bold text-foreground">{dept ? t.payBill.departments[dept] : "—"}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-muted-foreground">{t.payBill.billDetails.amountDue}</span>
              <span className="text-2xl font-bold text-destructive">{billAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t.payBill.billDetails.dueDate}</span>
              <span className="font-bold text-foreground">{billDate}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={() => setStep(4)} className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg">
            {t.payBill.billDetails.proceed}
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 4: Payment Method
  if (step === 4) {
    const payMethods = [
      { id: "upi" as PayMethod, icon: Smartphone },
      { id: "debit" as PayMethod, icon: CreditCard },
      { id: "netbanking" as PayMethod, icon: Landmark },
    ];
    return (
      <KioskLayout title={t.payBill.title} step={4} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t.payBill.paymentMethod.heading}</h2>
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {payMethods.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setStep(5)}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-2xl font-bold">{t.payBill.paymentMethod.methods[m.id]}</span>
              </button>
            );
          })}
        </div>
      </KioskLayout>
    );
  }

  // Step 5: Success
  const paidDepartment = dept ? t.payBill.departments[dept] : t.payBill.departments.electricity;
  return (
    <KioskLayout title={t.payBill.title} step={5} totalSteps={5}>
      <div className="flex flex-col items-center gap-8">
        <CheckCircle2 size={100} className="text-green-600" />
        <h2 className="text-3xl font-bold text-foreground">{t.payBill.success.heading}</h2>
        <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">{t.payBill.success.receiptHeading}</p>
            <p className="mt-1 text-base text-muted-foreground">{billDate}</p>
          </div>
          <div className="mt-6 space-y-4 text-base">
            {[
              { label: t.payBill.success.consumerId, value: inputMethod === "consumer" && inputValue ? inputValue : defaultConsumerId },
              { label: t.payBill.success.name, value: customerName },
              { label: t.payBill.success.mobile, value: inputMethod === "mobile" && inputValue ? inputValue : defaultMobileNumber },
              { label: t.payBill.success.billFor, value: paidDepartment },
              { label: t.payBill.success.amountPaid, value: billAmount },
              { label: t.payBill.success.transactionId, value: transactionId },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-dashed border-border pb-2 last:border-b-0 last:pb-0">
                <span className="font-semibold text-muted-foreground">{item.label}</span>
                <span className="font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
          <button onClick={handlePrintReceipt} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <Printer size={24} /> {t.common.printReceipt}
          </button>
          <button
            onClick={handleSendReceiptSms}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg"
          >
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

export default PayBill;
