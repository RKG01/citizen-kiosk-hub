import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  ClipboardList,
  Search,
  FileText,
  HelpCircle,
  Shield,
} from "lucide-react";

const services = [
  { icon: Wallet, label: { en: "Pay Bill", hi: "बिल भुगतान", mr: "बिल भरा" } },
  { icon: ClipboardList, label: { en: "Register Complaint", hi: "शिकायत दर्ज करें", mr: "तक्रार नोंदवा" } },
  { icon: Search, label: { en: "Track Status", hi: "स्थिति ट्रैक करें", mr: "स्थिती ट्रॅक करा" } },
  { icon: FileText, label: { en: "Apply for Service", hi: "सेवा के लिए आवेदन", mr: "सेवेसाठी अर्ज करा" } },
  { icon: HelpCircle, label: { en: "Help", hi: "सहायता", mr: "मदत" } },
];

const instructions = {
  en: "Touch a service to begin",
  hi: "शुरू करने के लिए सेवा स्पर्श करें",
  mr: "सुरू करण्यासाठी सेवा स्पर्श करा",
};

type Lang = "en" | "hi" | "mr";

const Index = () => {
  const [lang, setLang] = useState<Lang>("en");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background p-6 select-none">
      {/* Header */}
      <header className="flex flex-col items-center gap-3 pt-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Shield size={36} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Citizen Utility Service Kiosk
        </h1>
        <div className="h-px w-48 bg-border" />
      </header>

      {/* Service Buttons Grid */}
      <main className="my-8 w-full max-w-2xl">
        <div className="grid grid-cols-2 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const isLast = i === services.length - 1 && services.length % 2 !== 0;
            return (
              <button
                key={i}
                className={`flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98] ${
                  isLast ? "col-span-2 mx-auto w-1/2" : ""
                }`}
              >
                <Icon size={40} strokeWidth={1.8} />
                <span className="text-xl font-bold md:text-2xl">
                  {svc.label[lang]}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex w-full max-w-2xl flex-col items-center gap-4 pb-4">
        <div className="flex gap-2">
          {(["en", "hi", "mr"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                lang === l
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {l === "en" ? "English" : l === "hi" ? "हिन्दी" : "मराठी"}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {now.toLocaleDateString()} &middot; {now.toLocaleTimeString()}
        </p>
        <p className="text-base font-medium text-muted-foreground">
          {instructions[lang]}
        </p>
      </footer>
    </div>
  );
};

export default Index;
