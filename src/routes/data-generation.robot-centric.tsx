import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/page-templates";
import img from "@/assets/robot-data.jpg";

export const Route = createFileRoute("/data-generation/robot-centric")({
  component: () => (
    <SubPage
      eyebrow="Data Generation · Robot-Centric"
      title="Autonomous Robot Foundry"
      description="Fleets of robots running 24/7, generating repetitive task and recovery trajectory data from the robot's own POV."
      longDescription="Our foundries operate around the clock with diverse robot platforms — from parallel grippers to dexterous humanoid hands. We script tasks, inject perturbations and capture recovery trajectories so your policy learns not just what success looks like, but how to get back to it. Every episode is logged with full proprioception, multi-camera streams and ground-truth scene state."
      image={img}
      backTo="/data-generation"
      backLabel="Back to Data Generation"
      features={[
        { title: "24/7 Throughput", desc: "Continuous fleet operation produces millions of episodes per month." },
        { title: "Recovery Trajectories", desc: "Engineered perturbations teach your policy how to recover from failure." },
        { title: "Multi-Embodiment", desc: "Same task, multiple robot platforms — for cross-embodiment transfer." },
      ]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Robot-Centric Data — Lili-o" },
      { name: "description", content: "Autonomous robot foundry generating real-world robot POV data." },
    ],
  }),
});
