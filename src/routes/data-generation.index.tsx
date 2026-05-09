import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/page-templates";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/data-generation/")({
  component: () => (
    <CategoryPage
      eyebrow="Data Generation"
      title="The Autonomous Data Foundry"
      description="Two complementary streams feed a single engine: human demonstrations in the wild and 24/7 robot foundries — covering diversity, recovery and edge cases."
      image={heroImg}
      chips={[
        {
          label: "Human-Centric",
          to: "/data-generation/human-centric",
          desc: "A vast variety of real humans performing complex everyday tasks across thousands of households.",
        },
        {
          label: "Robot-Centric",
          to: "/data-generation/robot-centric",
          desc: "Fleets of robots running 24/7 in our foundries, generating repetitive and recovery trajectory data from the robot's POV.",
        },
        {
          label: "Explore",
          to: "/contact",
          desc: "Talk to our team — we'll spin up a sample dataset for your task in under a week.",
        },
      ]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Data Generation — Lili-o" },
      { name: "description", content: "Human-centric and robot-centric data generation for physical AI." },
    ],
  }),
});
