import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/context/LanguageContext";

const langToLocale: Record<Lang, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
};

const sentenceTerminatorRegex = /[.!?।]$/;

const prepareSpeechText = (text: string, lang: Lang): string => {
  const normalized = text.replace(/\r/g, "").trim();
  if (!normalized) return "";

  const segments = normalized
    .split(/\n{2,}/)
    .map((segment) => segment.replace(/\s*\n+\s*/g, " "))
    .map((segment) => segment.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (!segments.length) return "";

  const closingSymbol = lang === "en" ? "." : "।";

  return segments
    .map((segment) => (sentenceTerminatorRegex.test(segment) ? segment : `${segment}${closingSymbol}`))
    .join(" ");
};

export const useSpeech = () => {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return () => undefined;
    }

    const synth = window.speechSynthesis;
    synthRef.current = synth;
    setIsSupported(true);

    const updateVoices = () => {
      const available = synth.getVoices();
      if (available.length) {
        setVoices(available);
      }
    };

    if (document.readyState === "complete") {
      updateVoices();
    } else {
      window.addEventListener("load", updateVoices, { once: true });
    }

    synth.addEventListener("voiceschanged", updateVoices);

    return () => {
      synth.removeEventListener("voiceschanged", updateVoices);
      synthRef.current?.cancel();
      setIsSpeaking(false);
    };
  }, []);

  const resolveVoice = useCallback(
    (lang: Lang): SpeechSynthesisVoice | null => {
      if (!voices.length) return null;
      const locale = langToLocale[lang] ?? "en-IN";
      const normalizedLocale = locale.toLowerCase();
    //   const base = normalizedLocale.split("-")[0];

      return (
        voices.find((voice) => voice.lang?.toLowerCase() === normalizedLocale) ??
        // voices.find((voice) => voice.lang?.toLowerCase().startsWith(base)) ??
        voices.find((voice) => voice.lang?.toLowerCase().startsWith("en")) ??
        null
      );
    },
    [voices],
  );

  const speak = useCallback(
    (text: string, lang: Lang) => {
      if (!synthRef.current) return false;
      const prepared = prepareSpeechText(text, lang);
      if (!prepared) return false;

      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(prepared);
      const assignedVoice = resolveVoice(lang);
      if (assignedVoice) {
        utterance.voice = assignedVoice;
        utterance.lang = assignedVoice.lang;
      } else {
        utterance.lang = langToLocale[lang] ?? "en-IN";
      }
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      synthRef.current.speak(utterance);
      return true;
    },
    [resolveVoice],
  );

  const stop = useCallback(() => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsSpeaking(false);
  }, []);

  return { isSupported, isSpeaking, speak, stop };
};

export type UseSpeechReturn = ReturnType<typeof useSpeech>;
