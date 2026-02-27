import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, FileText, CreditCard, Printer, CheckCircle2, Clock, Loader2 } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";

const trackingTypes = [
  { id: "complaint", label: "Complaint Status", icon: ClipboardList },
  { id: "service", label: "Service Application", icon: FileText },
  { id: "payment", label: "Payment Status", icon: CreditCard },
];

const TrackStatus = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [trackType, setTrackType] = useState("");
  const [trackId, setTrackId] = useState("");

  const handleBack = () => {
    if (step === 1) navigate("/");
    else setStep(step - 1);
  };

  // Step 1
  if (step === 1) {
    return (
      <KioskLayout title="Track Status" step={1} totalSteps={3} onBack={handleBack}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">What would you like to track?</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {trackingTypes.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => { setTrackType(t.id); setStep(2); }}
                className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <Icon size={48} strokeWidth={1.8} />
                <span className="text-xl font-bold">{t.label}</span>
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
      <KioskLayout title="Track Status" step={2} totalSteps={3} onBack={handleBack}>
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-2xl font-bold text-foreground">Enter Tracking ID or Mobile Number</h2>
          <input value={trackId} onChange={(e) => setTrackId(e.target.value)}
            placeholder="e.g. CMP-2026-00482"
            className="w-full max-w-md rounded-xl border-2 border-input bg-background px-6 py-5 text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none" />
          <button onClick={() => trackId && setStep(3)} disabled={!trackId}
            className="rounded-xl bg-primary px-16 py-4 text-xl font-bold text-primary-foreground shadow-lg disabled:opacity-50">
            Track
          </button>
        </div>
      </KioskLayout>
    );
  }

  // Step 3: Status Display
  const statusSteps = ["Submitted", "Under Review", "In Progress", "Resolved"];
  const currentStatusIndex = 2; // In Progress

  return (
    <KioskLayout title="Track Status" step={3} totalSteps={3}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-foreground">Status Details</h2>

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
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Tracking ID</span><span className="font-bold text-foreground">{trackId}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Status</span><span className="font-bold text-amber-600">In Progress</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Last Updated</span><span className="font-bold text-foreground">26 Feb 2026</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Department</span><span className="font-bold text-foreground capitalize">{trackType}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-muted-foreground">Assigned Officer</span><span className="font-bold text-foreground">Shri Anil Patil</span></div>
          </div>
        </div>

        <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg">
            <Printer size={24} /> Print Status
          </button>
          <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-accent-foreground shadow-lg">
            Back to Home
          </button>
        </div>
      </div>
    </KioskLayout>
  );
};

export default TrackStatus;
