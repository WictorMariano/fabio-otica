"use client";

import { useEffect, useState } from "react";
import { BrandButton } from "@/components/BrandButton";

const STORAGE_KEY = "fabio-otica-cookies-accepted";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className="cookie-consent__inner">
        <div className="cookie-consent__copy">
          <p className="cookie-consent__title">Cookies e privacidade</p>
          <p>
            Usamos cookies essenciais e de análise para melhorar sua experiência neste site.
            Ao continuar, você confirma que está de acordo com o uso de cookies.
          </p>
        </div>
        <BrandButton type="button" onClick={accept}>
          Aceitar e continuar
        </BrandButton>
      </div>
    </div>
  );
}

export default CookieConsent;
