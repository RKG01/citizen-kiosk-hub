import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import SpeechButton from "@/components/SpeechButton";
import { SPEECH_BUTTON_POSITION } from "@/config/accessibility";
import { useTranslations } from "@/hooks/useTranslations";

const NotFound = () => {
  const location = useLocation();
  const t = useTranslations();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={contentRef} className="relative flex min-h-screen items-center justify-center bg-muted">
      <div
        className="pointer-events-auto fixed z-40"
        style={{ top: SPEECH_BUTTON_POSITION.top, right: SPEECH_BUTTON_POSITION.right }}
      >
        <SpeechButton contentRef={contentRef} />
      </div>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.notFound.message}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t.notFound.cta}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
