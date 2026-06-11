"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RecoveryRedirect() {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.get("type") === "recovery" && params.get("access_token")) {
      router.replace(`/auth/reset${window.location.hash}`);
    }
  }, [router]);
  return null;
}
