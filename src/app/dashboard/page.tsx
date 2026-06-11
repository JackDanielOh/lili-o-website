import type { Metadata } from "next";
import { DashboardPage } from "./DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard — Lili-o Robot API",
  description: "Manage your API keys and robot skills.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DashboardPage />;
}
