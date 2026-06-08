import type { StaticArticle } from "./types";

export const oneShotLearning: StaticArticle = {
  id: "one-shot-learning",
  slug: "1",
  title: "One-Shot Method: teaching robots new skills under a minute",
  tag: "Manipulation · Learning",
  excerpt:
    "Our proprietary One-Shot method reduces manipulation primitive creation from over an hour to under five minutes — the unlock that makes the foundry viable at scale.",
  image: "/blog/1/thumbnail.png",
  featured: false,
  publishedAt: "2026. 4. 24.",
  status: "Published",
  blocks: [
    {
      type: "paragraph",
      text: "One of the hardest problems in robotics data collection is making robots autonomous on tasks quickly enough to justify the infrastructure. Traditional approaches require days of engineering per task: hand-tuned waypoints, environment-specific calibration, and iterative debugging before a single useful episode can be recorded.",
    },
    {
      type: "heading",
      level: 2,
      text: "The problem with the old way",
    },
    {
      type: "paragraph",
      text: "Industry standard for creating a new manipulation primitive — a single contact-rich action like pick, place, or wipe — is over an hour of engineering time. Multiply that across hundreds of household tasks and dozens of robot embodiments, and the economics collapse. You cannot run a 24/7 data foundry if every new skill takes a day to deploy.",
    },
    {
      type: "image",
      src: "/blog/1/timeline.webp",
      alt: "Comparison of traditional skill creation time versus One-Shot method",
      caption: "From 1+ hour of engineering to under 5 minutes of demonstration.",
    },
    {
      type: "heading",
      level: 2,
      text: "How One-Shot works",
    },
    {
      type: "paragraph",
      text: "The One-Shot method combines visual demonstration with a novel primitive extraction pipeline. A human performs the task once in front of the robot. The system records the demonstration, extracts the key contact events — where the gripper makes and breaks contact, how force is applied, what object poses matter — and synthesizes an autonomous skill that generalizes to new object positions and orientations.",
    },
    {
      type: "heading",
      level: 3,
      text: "Three stages",
    },
    {
      type: "paragraph",
      text: "Demonstration: a single human run, captured with multi-modal sensing. Extraction: the pipeline identifies contact geometry, approach vectors, and success criteria without hand-coded waypoints. Generalization: the resulting primitive runs autonomously across varied object poses within the demonstrated task distribution.",
    },
    {
      type: "image",
      src: "/blog/1/demo.webp",
      alt: "Robot learning from a single human demonstration",
      caption: "One demonstration in, autonomous skill out.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why generalization matters",
    },
    {
      type: "paragraph",
      text: "A primitive that only works at the exact pose of the demonstration is useless for data generation. The foundry needs thousands of episodes per task, which means the skill must handle the natural variation of object placement, lighting, and minor scene changes. One-Shot primitives are designed for this: they encode contact geometry, not joint angles, so they transfer across the fleet through our hardware abstraction layer.",
    },
    {
      type: "quote",
      text: "We had to solve a hard problem first: how do you make a robot autonomous on a task without months of engineering? One-Shot was the answer — from hours of demonstration to minutes. From months of engineering to days.",
    },
    {
      type: "heading",
      level: 2,
      text: "What this unlocks",
    },
    {
      type: "paragraph",
      text: "One-Shot is not a research curiosity. It is the operational foundation of the foundry. When a new household task enters the pipeline, we demonstrate it once, extract the primitives, chain them into a task program, and start generating episodes within hours — not weeks. That speed is what makes continuous, autonomous, 24/7 data generation economically viable.",
    },
    {
      type: "paragraph",
      text: "From there, the logic layer takes over: chaining primitives into long-horizon tasks, detecting failures, triggering retries, and keeping the fleet running without human operators. But none of that works without fast skill creation at the base. One-Shot is where the foundry starts.",
    },
    {
      type: "image",
      src: "/blog/1/foundry-output.webp",
      alt: "Continuous episode generation in the Lili-o foundry",
      caption: "One build. Infinite episodes. The foundry at work.",
    },
  ],
};
