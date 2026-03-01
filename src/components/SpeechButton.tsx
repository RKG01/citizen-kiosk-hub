import { type RefObject } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useSpeech } from "@/hooks/useSpeech";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

interface SpeechButtonProps {
  content?: string;
  contentRef?: RefObject<HTMLElement | null>;
  className?: string;
}

const SpeechButton = ({ content, contentRef, className }: SpeechButtonProps) => {
  const { lang } = useLanguage();
  const t = useTranslations();
  const { toast } = useToast();
  const { isSupported, isSpeaking, speak, stop } = useSpeech();

  const getReadableContent = () => {
    const root = contentRef?.current;
    if (!root) return "";
    const clone = root.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-speech-skip="true"]').forEach((node) => node.remove());
    return clone.innerText ?? "";
  };

  const handleClick = () => {
    if (!isSupported) {
      toast({ title: t.common.speechUnavailable });
      return;
    }

    if (isSpeaking) {
      stop();
      return;
    }

    const fallbackText = getReadableContent();
    const selectedText = content && content.trim().length > 0 ? content : fallbackText;
    const didSpeak = speak(selectedText, lang);
    if (!didSpeak) {
      toast({ title: t.common.speechUnavailable });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSpeaking}
        className={cn(
        "flex items-center gap-3 rounded-2xl bg-accent/90 px-5 py-3 text-lg font-semibold text-accent-foreground shadow-xl backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      {isSpeaking ? <VolumeX size={28} /> : <Volume2 size={28} />}
      <span>{isSpeaking ? t.common.stopListening : t.common.listen}</span>
    </button>
  );
};

export default SpeechButton;
