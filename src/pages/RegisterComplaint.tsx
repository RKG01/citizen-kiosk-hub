import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Flame, Droplets, Trash2, Smartphone, CreditCard, Ban, Receipt, Droplet, Clock, HelpCircle, Upload, Camera, Printer, CheckCircle2 } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";

const departments = [
  { id: "electricity", label: "Electricity", icon: Zap },
  { id: "gas", label: "Gas", icon: Flame },
  { id: "water", label: "Water", icon: Droplets },
  { id: "waste", label: "Waste Management", icon: Trash2 },
];

const complaintTypes = [
  { id: "no_supply", label: "No Supply", icon: Ban },
  { id: "billing", label: "Billing Issue", icon: Receipt },
  { id: "leakage", label: "Leakage", icon: Droplet },
  { id: "delay", label: "Service Delay", icon: Clock },
  { id: "other", label: "Other", icon: HelpCircle },
];

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dept, setDept] = useState("");
  const [authMethod, setAuthMethod] = useState<"mobile" | "consumer" | null>(null);
  const [otp, setOtp] = useState("");
  const [authInput, setAuthInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");

  const handleBack = () => {
    if (step === 1) navigate("/");
    else setStep(step - 1);
  };

  // Step 1: Department
  if (step === 1) {
    return (
      <KioskLayout title="Register Complaint" step={1} totalSteps={6} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Select Department</h2>
        <div className="grid grid-cols-2 gap-6">
          {departments.map((d) => {
            const Icon = d.icon;
            return (
              <button key={d.id} onClick={() => { setDept(d.id); setStep(2); }}
                className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Icon size={44} strokeWidth={1.8} />
                <span className="text-xl font-bold">{d.label}</span>
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
      <KioskLayout title="Register Complaint" step={2} totalSteps={6} onBack={handleBack}>
        {!authMethod ? (
          <>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Verify Your Identity</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <button onClick={() => setAuthMethod("mobile")}
                className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Smartphone size={44} /> <span className="text-xl font-bold">Mobile OTP</span>
              </button>
              <button onClick={() => setAuthMethod("consumer")}
                className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <CreditCard size={44} /> <span className="text-xl font-bold">Consumer ID + OTP</span>
              </button>
            </div>
          </>
        ) : !verified ? (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-foreground">
              {authMethod === "mobile" ? "Enter Mobile Number" : "Enter Consumer ID"}
            </h2>
            <input value={authInput} onChange={(e) => setAuthInput(e.target.value)}
              placeholder={authMethod === "mobile" ? "Mobile Number" : "Consumer ID"}
              className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none" />
            <h2 className="text-2xl font-bold text-foreground">Enter OTP</h2>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6}
              className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold tracking-[0.5em] text-foreground focus:border-primary focus:outline-none" />
            <button onClick={() => { setVerified(true); setStep(3); }} disabled={!authInput || otp.length < 4}
              className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
              Verify
            </button>
          </div>
        ) : null}
      </KioskLayout>
    );
  }

  // Step 3: Complaint Type
  if (step === 3) {
    return (
      <KioskLayout title="Register Complaint" step={3} totalSteps={6} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Select Complaint Type</h2>
        <div className="grid grid-cols-2 gap-5">
          {complaintTypes.map((c) => {
            const Icon = c.icon;
            const isLast = complaintTypes.indexOf(c) === complaintTypes.length - 1 && complaintTypes.length % 2 !== 0;
            return (
              <button key={c.id} onClick={() => { setComplaintType(c.id); setStep(4); }}
                className={`flex min-h-[110px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-6 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] ${isLast ? "col-span-2 mx-auto w-1/2" : ""}`}>
                <Icon size={40} strokeWidth={1.8} />
                <span className="text-xl font-bold">{c.label}</span>
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
      <KioskLayout title="Register Complaint" step={4} totalSteps={6} onBack={handleBack}>
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Describe Your Issue (Optional)</h2>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6}
          placeholder="Type your complaint details here..."
          className="w-full rounded-xl border-2 border-input bg-background px-6 py-4 text-xl text-foreground focus:border-primary focus:outline-none" />
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => setStep(5)} className="rounded-xl bg-secondary px-10 py-4 text-xl font-bold text-secondary-foreground shadow-lg">
            Skip
          </button>
          <button onClick={() => setStep(5)} className="rounded-xl bg-primary px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg">
            Next
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 5: Upload
  if (step === 5) {
    return (
      <KioskLayout title="Register Complaint" step={5} totalSteps={6} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Attach Photo / Document (Optional)</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <button className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-primary bg-secondary px-6 py-8 text-foreground shadow transition-transform hover:scale-[1.03]">
            <Camera size={48} /> <span className="text-xl font-bold">Take Photo</span>
          </button>
          <button className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-primary bg-secondary px-6 py-8 text-foreground shadow transition-transform hover:scale-[1.03]">
            <Upload size={48} /> <span className="text-xl font-bold">Upload File</span>
          </button>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => setStep(6)} className="rounded-xl bg-secondary px-10 py-4 text-xl font-bold text-secondary-foreground shadow-lg">
            Skip
          </button>
          <button onClick={() => setStep(6)} className="rounded-xl bg-primary px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg">
            Submit
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 6: Success
  return (
    <KioskLayout title="Register Complaint" step={6} totalSteps={6}>
      <div className="flex flex-col items-center gap-8">
        <CheckCircle2 size={100} className="text-green-600" />
        <h2 className="text-3xl font-bold text-foreground">Complaint Registered!</h2>
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-4 text-xl">
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Complaint No.</span><span className="font-bold text-foreground">CMP-2026-00482</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Department</span><span className="font-bold text-foreground capitalize">{dept}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Est. Resolution</span><span className="font-bold text-foreground">3-5 Working Days</span></div>
          </div>
        </div>
        <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <Printer size={24} /> Print Receipt
          </button>
          <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-accent-foreground shadow-lg">
            Back to Home
          </button>
        </div>
      </div>
    </KioskLayout>
  );
};

export default RegisterComplaint;
