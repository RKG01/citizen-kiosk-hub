import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, ClipboardList, Search, Headphones, MessageCircleQuestion, Volume2, VolumeX, Globe, Phone } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";

type Lang = "en" | "hi" | "mr";

const helpTopics = [
  { id: "pay", label: { en: "How to Pay Bill", hi: "बिल कैसे भरें", mr: "बिल कसे भरावे" }, icon: CreditCard },
  { id: "complaint", label: { en: "How to Register Complaint", hi: "शिकायत कैसे दर्ज करें", mr: "तक्रार कशी नोंदवावी" }, icon: ClipboardList },
  { id: "track", label: { en: "How to Track Status", hi: "स्थिति कैसे ट्रैक करें", mr: "स्थिती कशी ट्रॅक करावी" }, icon: Search },
  { id: "support", label: { en: "Speak to Support", hi: "सहायता से बात करें", mr: "सपोर्टशी बोला" }, icon: Headphones },
  { id: "faq", label: { en: "FAQs", hi: "सामान्य प्रश्न", mr: "वारंवार विचारले जाणारे प्रश्न" }, icon: MessageCircleQuestion },
];

const helpContent: Record<string, Record<Lang, string>> = {
  pay: {
    en: "1. Tap 'Pay Bill' on the home screen.\n2. Select your department (Electricity, Gas, Water).\n3. Enter your Consumer ID, scan QR, or enter mobile number.\n4. Review the bill details.\n5. Choose a payment method and complete payment.\n6. Collect your receipt.",
    hi: "1. होम स्क्रीन पर 'बिल भुगतान' पर टैप करें।\n2. अपना विभाग चुनें।\n3. उपभोक्ता आईडी दर्ज करें।\n4. बिल विवरण की समीक्षा करें।\n5. भुगतान विधि चुनें।\n6. रसीद प्राप्त करें।",
    mr: "1. होम स्क्रीनवर 'बिल भरा' वर टॅप करा।\n2. तुमचा विभाग निवडा।\n3. ग्राहक आयडी प्रविष्ट करा।\n4. बिल तपशील पहा।\n5. पेमेंट पद्धत निवडा।\n6. पावती घ्या।",
  },
  complaint: {
    en: "1. Tap 'Register Complaint'.\n2. Select department.\n3. Verify identity via OTP.\n4. Choose complaint type.\n5. Add description (optional).\n6. Get your complaint number.",
    hi: "1. 'शिकायत दर्ज करें' टैप करें।\n2. विभाग चुनें।\n3. OTP से पहचान सत्यापित करें।\n4. शिकायत प्रकार चुनें।\n5. विवरण जोड़ें।\n6. शिकायत नंबर प्राप्त करें।",
    mr: "1. 'तक्रार नोंदवा' वर टॅप करा।\n2. विभाग निवडा।\n3. OTP ने ओळख सत्यापित करा।\n4. तक्रार प्रकार निवडा।\n5. वर्णन जोडा।\n6. तक्रार क्रमांक मिळवा।",
  },
  track: {
    en: "1. Tap 'Track Status'.\n2. Select what to track.\n3. Enter your tracking ID.\n4. View real-time status.",
    hi: "1. 'स्थिति ट्रैक करें' टैप करें।\n2. ट्रैकिंग प्रकार चुनें।\n3. ट्रैकिंग आईडी दर्ज करें।\n4. स्थिति देखें।",
    mr: "1. 'स्थिती ट्रॅक करा' वर टॅप करा।\n2. ट्रॅकिंग प्रकार निवडा।\n3. ट्रॅकिंग आयडी प्रविष्ट करा।\n4. स्थिती पहा।",
  },
  support: {
    en: "For immediate assistance, please call our helpline:\n\n📞 1800-XXX-XXXX (Toll Free)\n\nAvailable 24/7",
    hi: "तत्काल सहायता के लिए हमारी हेल्पलाइन पर कॉल करें:\n\n📞 1800-XXX-XXXX (टोल फ्री)\n\n24/7 उपलब्ध",
    mr: "त्वरित मदतीसाठी आमच्या हेल्पलाइनवर कॉल करा:\n\n📞 1800-XXX-XXXX (टोल फ्री)\n\n24/7 उपलब्ध",
  },
  faq: {
    en: "Q: What documents do I need?\nA: Aadhaar Card and Address Proof.\n\nQ: How long does service take?\nA: 7-10 working days.\n\nQ: Can I pay with cash?\nA: No, only digital payments accepted.",
    hi: "प्र: मुझे कौन से दस्तावेज चाहिए?\nउ: आधार कार्ड और पता प्रमाण।\n\nप्र: सेवा में कितना समय लगता है?\nउ: 7-10 कार्य दिवस।",
    mr: "प्र: मला कोणत्या कागदपत्रांची गरज आहे?\nउ: आधार कार्ड आणि पत्ता पुरावा।\n\nप्र: सेवेला किती वेळ लागतो?\nउ: 7-10 कार्यदिवस।",
  },
};

const Help = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>("en");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [audioOn, setAudioOn] = useState(false);

  if (selectedTopic) {
    return (
      <KioskLayout title={helpTopics.find((t) => t.id === selectedTopic)?.label[lang] || "Help"} onBack={() => setSelectedTopic(null)}>
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 shadow-lg">
          <pre className="whitespace-pre-wrap text-xl leading-relaxed text-foreground font-sans">
            {helpContent[selectedTopic]?.[lang]}
          </pre>
        </div>
        {selectedTopic === "support" && (
          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-3 rounded-xl bg-primary px-12 py-4 text-xl font-bold text-primary-foreground shadow-lg">
              <Phone size={28} /> Call Now
            </button>
          </div>
        )}
      </KioskLayout>
    );
  }

  return (
    <KioskLayout title="Help & Assistance" onBack={() => navigate("/")}>
      <div className="grid grid-cols-2 gap-6">
        {helpTopics.map((t) => {
          const Icon = t.icon;
          const isLast = helpTopics.indexOf(t) === helpTopics.length - 1 && helpTopics.length % 2 !== 0;
          return (
            <button key={t.id} onClick={() => setSelectedTopic(t.id)}
              className={`flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] ${isLast ? "col-span-2 mx-auto w-1/2" : ""}`}>
              <Icon size={44} strokeWidth={1.8} />
              <span className="text-xl font-bold text-center">{t.label[lang]}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom controls */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button onClick={() => setAudioOn(!audioOn)}
          className="flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-lg font-semibold text-secondary-foreground shadow">
          {audioOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
          {audioOn ? "Audio On" : "Audio Off"}
        </button>
        <div className="flex items-center gap-2">
          <Globe size={24} className="text-muted-foreground" />
          {(["en", "hi", "mr"] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}>
              {l === "en" ? "English" : l === "hi" ? "हिन्दी" : "मराठी"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-muted-foreground">📞 Helpline: 1800-XXX-XXXX (Toll Free, 24/7)</p>
      </div>
    </KioskLayout>
  );
};

export default Help;
