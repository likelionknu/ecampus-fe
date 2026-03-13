import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function LegalFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth >= 1024;
  });
  const [frozenStyle, setFrozenStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);
  const [hasCapturedPosition, setHasCapturedPosition] = useState(false);

  useEffect(() => {
    const syncViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop || hasCapturedPosition) {
      return;
    }

    let cancelled = false;

    const capturePosition = () => {
      const footer = footerRef.current;

      if (!footer || cancelled) {
        return;
      }

      const { left, top } = footer.getBoundingClientRect();

      setFrozenStyle({
        left: `${left}px`,
        top: `${top}px`,
        right: "auto",
        bottom: "auto",
      });
      setHasCapturedPosition(true);
    };

    const frameId = window.requestAnimationFrame(capturePosition);

    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        window.requestAnimationFrame(capturePosition);
      });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [hasCapturedPosition, isDesktop]);

  return (
    <footer
      ref={footerRef}
      style={isDesktop ? frozenStyle : undefined}
      className="fixed right-8 bottom-8 z-20 flex flex-col items-end gap-2"
    >
      <Link
        to="/privacy-policy"
        className="typo-caption text-ec-blue transition-opacity hover:underline hover:opacity-80"
      >
        개인정보 처리방침
      </Link>
      <p className="typo-caption text-ec-sub">
        LIKELION KNU 2026. 모든 권리 보유.
      </p>
    </footer>
  );
}

export default LegalFooter;
