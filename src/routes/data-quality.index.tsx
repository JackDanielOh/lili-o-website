import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/page-templates";
import img from "@/assets/quality-data.jpg";

export const Route = createFileRoute("/data-quality/")({
  component: () => (
    <CategoryPage
      eyebrow="Data Quality Management"
      title="Every Frame, Verified"
      description="A multi-stage QA pipeline scores every clip on coverage, integrity and label fidelity — only data that improves your model reaches your bucket."
      image={img}
      chips={[
        {
          label: "Auto Validation",
          to: "/data-quality/auto-validation",
          desc: "Automated checks score every frame on integrity, coverage and label fidelity.",
        },
        {
          label: "Expert Review",
          to: "/data-quality/expert-review",
          desc: "Human-in-the-loop reviewers catch the edge cases automation misses.",
        },
        {
          label: "Explore",
          to: "/contact",
          desc: "Talk to our team about quality SLAs for your training pipeline.",
        },
      ]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Data Quality Management — Lili-o" },
      { name: "description", content: "Multi-stage QA pipeline for robotic training data." },
    ],
  }),
});
