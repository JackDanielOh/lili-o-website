"use client";

import { useEffect } from "react";

export function RecoveryRedirect() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.get("type") === "recovery" && params.get("access_token")) {
      window.location.replace(`/auth/reset${window.location.hash}`);
    }
  }, []);
  return null;
}
