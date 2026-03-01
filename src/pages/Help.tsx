import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, ClipboardList, Search, Headphones, MessageCircleQuestion, Volume2, VolumeX, Globe, Phone } from "lucide-react";
import KioskLayout from "@/components/KioskLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";

type HelpTopic = "pay" | "complaint" | "track" | "support" | "faq";

const helpTopics: { id: HelpTopic; icon: typeof CreditCard }[] = [
  { id: "pay", icon: CreditCard },
  { id: "complaint", icon: ClipboardList },
  { id: "track", icon: Search },
  { id: "support", icon: Headphones },
  { id: "faq", icon: MessageCircleQuestion },
];

const Help = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const { lang, setLang } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);
  const [audioOn, setAudioOn] = useState(false);

  if (selectedTopic) {
    return (
      <KioskLayout title={t.help.topics[selectedTopic]} onBack={() => setSelectedTopic(null)}>
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 shadow-lg">
          <pre className="whitespace-pre-wrap text-xl leading-relaxed text-foreground font-sans">
            {t.help.content[selectedTopic]}
          </pre>
        </div>
        {selectedTopic === "support" && (
          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-3 rounded-xl bg-primary px-12 py-4 text-xl font-bold text-primary-foreground shadow-lg">
              <Phone size={28} /> {t.common.callNow}
            </button>
          </div>
        )}
      </KioskLayout>
    );
  }

  return (
    <KioskLayout title={t.help.title} onBack={() => navigate("/")}>
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {helpTopics.map((topic) => {
          const Icon = topic.icon;
          const isLast = helpTopics.indexOf(topic) === helpTopics.length - 1 && helpTopics.length % 2 !== 0;
          return (
            <button key={topic.id} onClick={() => setSelectedTopic(topic.id)}
              className={`flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] ${isLast ? "col-span-2 mx-auto w-1/2" : ""}`}>
              <Icon size={44} strokeWidth={1.8} />
              <span className="text-xl font-bold text-center">{t.help.topics[topic.id]}</span>
            </button>
          );
        })}
      </div>

    </KioskLayout>
  );
};

export default Help;
