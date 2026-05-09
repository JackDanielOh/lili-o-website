import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/page-templates";
import img from "@/assets/quality-data.jpg";

export const Route = createFileRoute("/data-quality/expert-review")({
  component: () => (
    <SubPage
      eyebrow="Quality · Expert Review"
      title="Human-in-the-Loop Review"
      description="Trained robotics experts catch the edge cases automation misses — every flagged clip gets a second pair of eyes."
      longDescription="Automated metrics catch most issues, but the long tail of robotics data quality requires human judgment. Our roster of trained reviewers — many with hands-on robotics experience — audit flagged clips, verify labels and score trajectories on criteria automation can't yet measure. The result: training data you can trust."
      image={img}
      backTo="/data-quality"
      backLabel="Back to Data Quality"
      features={[
        { title: "Trained Reviewers", desc: "Specialists with hands-on robotics and ML experience." },
        { title: "Multi-Pass Audit", desc: "Critical datasets get blind double-review for label accuracy." },
        { title: "Feedback Loop", desc: "Reviewer findings continuously retrain our auto-validation models." },
      ]}
    />
  ),
  head: () => ({
    meta: [{ title: "Expert Review — Lili-o" }],
  }),
});
