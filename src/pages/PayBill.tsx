import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Flame, Droplets, Smartphone, QrCode, Phone, CreditCard, Landmark, CheckCircle2, Printer, MessageSquare } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";

type Dept = "electricity" | "gas" | "water";
type InputMethod = "consumer" | "qr" | "mobile";
type PayMethod = "upi" | "debit" | "netbanking";

const departments = [
  { id: "electricity" as Dept, label: "Electricity", icon: Zap },
  { id: "gas" as Dept, label: "Gas", icon: Flame },
  { id: "water" as Dept, label: "Water", icon: Droplets },
];

const PayBill = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dept, setDept] = useState<Dept | null>(null);
  const [inputMethod, setInputMethod] = useState<InputMethod | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleBack = () => {
    if (step === 1) navigate("/");
    else setStep(step - 1);
  };

  // Step 1: Department Selection
  if (step === 1) {
    return (
      <KioskLayout title="Pay Bill" step={1} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Select Department</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {departments.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => { setDept(d.id); setStep(2); }}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-2xl font-bold">{d.label}</span>
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
      { id: "consumer" as InputMethod, label: "Enter Consumer ID", icon: CreditCard, placeholder: "Consumer ID" },
      { id: "qr" as InputMethod, label: "Scan QR Code", icon: QrCode, placeholder: "" },
      { id: "mobile" as InputMethod, label: "Enter Mobile Number", icon: Phone, placeholder: "Mobile Number" },
    ];
    return (
      <KioskLayout title="Pay Bill" step={2} totalSteps={5} onBack={handleBack}>
        {!inputMethod ? (
          <>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Choose Input Method</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {methods.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setInputMethod(m.id)}
                    className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <Icon size={48} strokeWidth={1.8} />
                    <span className="text-xl font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : inputMethod === "qr" ? (
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-64 w-64 items-center justify-center rounded-2xl border-4 border-dashed border-primary bg-secondary">
              <QrCode size={80} className="text-muted-foreground" />
            </div>
            <p className="text-xl font-semibold text-muted-foreground">Place QR Code in front of scanner</p>
            <button onClick={() => { setInputValue("QR-SCANNED"); setStep(3); }} className="rounded-xl bg-primary px-12 py-4 text-xl font-bold text-primary-foreground shadow-lg">
              Simulate Scan
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold text-foreground">
              {inputMethod === "consumer" ? "Enter Consumer ID" : "Enter Mobile Number"}
            </h2>
            <input
              type={inputMethod === "mobile" ? "tel" : "text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputMethod === "consumer" ? "e.g. 123456789" : "e.g. 9876543210"}
              className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none"
            />
            <button
              onClick={() => inputValue && setStep(3)}
              disabled={!inputValue}
              className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        )}
      </KioskLayout>
    );
  }

  // Step 3: Bill Details
  if (step === 3) {
    return (
      <KioskLayout title="Pay Bill" step={3} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Bill Details</h2>
        <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-6 text-xl">
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-muted-foreground">Consumer Name</span>
              <span className="font-bold text-foreground">Rajesh Kumar</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-muted-foreground">Department</span>
              <span className="font-bold text-foreground capitalize">{dept}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-muted-foreground">Amount Due</span>
              <span className="text-2xl font-bold text-destructive">₹ 2,450.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Due Date</span>
              <span className="font-bold text-foreground">15 Mar 2026</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={() => setStep(4)} className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg">
            Proceed to Pay
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 4: Payment Method
  if (step === 4) {
    const payMethods = [
      { id: "upi" as PayMethod, label: "UPI", icon: Smartphone },
      { id: "debit" as PayMethod, label: "Debit Card", icon: CreditCard },
      { id: "netbanking" as PayMethod, label: "Net Banking", icon: Landmark },
    ];
    return (
      <KioskLayout title="Pay Bill" step={4} totalSteps={5} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Select Payment Method</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {payMethods.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setStep(5)}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-2xl font-bold">{m.label}</span>
              </button>
            );
          })}
        </div>
      </KioskLayout>
    );
  }

  // Step 5: Success
  return (
    <KioskLayout title="Pay Bill" step={5} totalSteps={5}>
      <div className="flex flex-col items-center gap-8">
        <CheckCircle2 size={100} className="text-green-600" />
        <h2 className="text-3xl font-bold text-foreground">Payment Successful!</h2>
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-4 text-xl">
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Transaction ID</span>
              <span className="font-bold text-foreground">TXN-2026-0384756</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-foreground">₹ 2,450.00</span>
            </div>
          </div>
        </div>
        <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <Printer size={24} /> Print Receipt
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <MessageSquare size={24} /> Send SMS
          </button>
          <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-accent-foreground shadow-lg">
            Back to Home
          </button>
        </div>
      </div>
    </KioskLayout>
  );
};

export default PayBill;
