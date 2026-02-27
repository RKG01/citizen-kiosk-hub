import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Flame, Droplets, Smartphone, Printer, CheckCircle2 } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";

const services = [
  { id: "electricity", label: "New Electricity Connection", icon: Zap },
  { id: "gas", label: "New Gas Connection", icon: Flame },
  { id: "water", label: "New Water Connection", icon: Droplets },
];

const ApplyForService = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [form, setForm] = useState({ name: "", aadhaar: "", address: "", city: "", pincode: "" });

  const handleBack = () => {
    if (step === 1) navigate("/");
    else if (step === 3 && formStep > 1) setFormStep(formStep - 1);
    else setStep(step - 1);
  };

  // Step 1: Service selection
  if (step === 1) {
    return (
      <KioskLayout title="Apply for Service" step={1} totalSteps={4} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Select Service</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.id} onClick={() => { setService(s.id); setStep(2); }}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-xl font-bold text-center">{s.label}</span>
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
      <KioskLayout title="Apply for Service" step={2} totalSteps={4} onBack={handleBack}>
        <div className="flex flex-col items-center gap-6">
          <Smartphone size={60} className="text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Verify via Mobile OTP</h2>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number"
            className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none" />
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" maxLength={6}
            className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold tracking-[0.5em] text-foreground focus:border-primary focus:outline-none" />
          <button onClick={() => { setStep(3); setFormStep(1); }} disabled={!mobile || otp.length < 4}
            className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
            Verify & Continue
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 3: Multi-step form
  if (step === 3) {
    const formLabels = ["Personal Details", "Address Details", "Upload Documents", "Review & Submit"];
    return (
      <KioskLayout title="Apply for Service" step={3} totalSteps={4} onBack={handleBack}>
        {/* Sub-step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {formLabels.map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                i + 1 <= formStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>{i + 1}</div>
              <span className={`hidden text-sm font-semibold sm:inline ${i + 1 <= formStep ? "text-foreground" : "text-muted-foreground"}`}>{l}</span>
              {i < 3 && <div className={`h-0.5 w-6 ${i + 1 < formStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {formStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-foreground">Personal Details</h2>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name"
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <input value={form.aadhaar} onChange={(e) => setForm({ ...form, aadhaar: e.target.value })} placeholder="Aadhaar Number"
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <div className="flex justify-end">
              <button onClick={() => setFormStep(2)} className="rounded-xl bg-primary px-12 py-4 text-xl font-bold text-primary-foreground shadow-lg">Next</button>
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-foreground">Address Details</h2>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full Address"
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City"
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="PIN Code"
              className="w-full rounded-xl border-2 border-input bg-background px-6 py-5 text-xl text-foreground focus:border-primary focus:outline-none" />
            <div className="flex justify-end">
              <button onClick={() => setFormStep(3)} className="rounded-xl bg-primary px-12 py-4 text-xl font-bold text-primary-foreground shadow-lg">Next</button>
            </div>
          </div>
        )}

        {formStep === 3 && (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold text-foreground">Upload Documents</h2>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {["Aadhaar Card", "Address Proof"].map((doc) => (
                <button key={doc} className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary bg-secondary px-6 py-6 text-foreground">
                  <span className="text-xl font-bold">{doc}</span>
                  <span className="text-sm text-muted-foreground">Tap to upload</span>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setFormStep(4)} className="rounded-xl bg-secondary px-10 py-4 text-xl font-bold text-secondary-foreground shadow-lg">Skip</button>
              <button onClick={() => setFormStep(4)} className="rounded-xl bg-primary px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg">Next</button>
            </div>
          </div>
        )}

        {formStep === 4 && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-foreground">Review & Submit</h2>
            <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
              <div className="space-y-4 text-lg">
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-bold capitalize">{service}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-bold">{form.name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="font-bold">{form.address || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-bold">{form.city || "—"}</span></div>
              </div>
            </div>
            <button onClick={() => setStep(4)} className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg">Submit Application</button>
          </div>
        )}
      </KioskLayout>
    );
  }

  // Step 4: Success
  return (
    <KioskLayout title="Apply for Service" step={4} totalSteps={4}>
      <div className="flex flex-col items-center gap-8">
        <CheckCircle2 size={100} className="text-green-600" />
        <h2 className="text-3xl font-bold text-foreground">Application Submitted!</h2>
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-4 text-xl">
            <div className="flex justify-between"><span className="text-muted-foreground">Application ID</span><span className="font-bold">APP-2026-07291</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-bold capitalize">{service}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Est. Processing</span><span className="font-bold">7-10 Working Days</span></div>
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

export default ApplyForService;
