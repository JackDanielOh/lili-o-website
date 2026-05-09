import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/page-templates";
import img from "@/assets/human-data.jpg";

export const Route = createFileRoute("/data-generation/human-centric")({
  component: () => (
    <SubPage
      eyebrow="Data Generation · Human-Centric"
      title="Human Demonstrations in the Wild"
      description="Real people. Real homes. Real edge cases. The diversity your model needs to generalize."
      longDescription="Our network of trained operators captures complex everyday tasks across thousands of households worldwide — folding laundry, cleaning, cooking, organizing, manipulating tools. Every clip is recorded from a first-person POV with calibrated sensors, then aligned, annotated and labeled to feed your foundation models with the variety they need to truly generalize."
      image={img}
      backTo="/data-generation"
      backLabel="Back to Data Generation"
      features={[
        { title: "Diversity at Scale", desc: "Thousands of households across geographies, demographics and home setups." },
        { title: "Complex Tasks", desc: "Long-horizon, multi-step manipulation tasks captured end-to-end." },
        { title: "First-Person POV", desc: "Egocentric capture with synced depth, IMU and gaze data." },
      ]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Human-Centric Data — Lili-o" },
      { name: "description", content: "Human demonstrations in real homes for robotic foundation models." },
    ],
  }),
});
