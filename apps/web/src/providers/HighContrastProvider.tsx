"use client";

import { useEffect } from "react";

// Shared with the sidebar toggle in components/ui/app-sidebar.tsx.
const HIGH_CONTRAST_STORAGE_KEY = "jules-pay-high-contrast";

/**
 * Re-applies the saved high contrast preference to <html> on load so the
 * setting survives page refreshes on every route.
 */
export function HighContrastProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const enabled = window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === "true";
      document.documentElement.classList.toggle("high-contrast", enabled);
    } catch {
      // Storage can be unavailable (private mode); fall back to the default theme.
    }
  }, []);

  return <>{children}</>;
}
