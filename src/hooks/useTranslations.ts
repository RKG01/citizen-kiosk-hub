import { useLanguage } from "@/context/LanguageContext";
import { translations, type Translations } from "@/i18n/messages";

export const useTranslations = (): Translations => {
  const { lang } = useLanguage();
  return translations[lang];
};
