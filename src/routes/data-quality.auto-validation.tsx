import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/page-templates";
import img from "@/assets/quality-data.jpg";

export const Route = createFileRoute("/data-quality/auto-validation")({
  component: () => (
    <SubPage
      eyebrow="Quality · Auto Validation"
      title="Automated Quality Scoring"
      description="Automated checks score every frame on integrity, coverage and label fidelity — at the speed of your foundry."
      longDescription="Our auto-validation pipeline runs in real time as data is generated. We compute sensor integrity scores, label consistency metrics and coverage statistics across the task distribution. Frames that don't meet your project's quality threshold are flagged before they ever reach your training bucket."
      image={img}
      backTo="/data-quality"
      backLabel="Back to Data Quality"
      features={[
        { title: "Real-Time", desc: "Quality checks run inline as data is generated, not after the fact." },
        { title: "Custom Thresholds", desc: "Configure pass/fail criteria per project, per task, per modality." },
        { title: "Coverage Tracking", desc: "Live dashboards show coverage gaps in your task distribution." },
      ]}
    />
  ),
  head: () => ({
    meta: [{ title: "Auto Validation — Lili-o" }],
  }),
});
