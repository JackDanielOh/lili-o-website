import type { StaticArticle } from "./types";

export const qualityData: StaticArticle = {
  id: "quality-data",
  slug: "3",
  title: "What quality data means at Lili-o",
  tag: "Data · Human behavior",
  excerpt:
    "Quality data is not volume. It is contact-rich manipulation, real-home variance, and the behavioral diversity that controlled environments cannot replicate.",
  image: "/blog/3/thumbnail.webp",
  featured: false,
  publishedAt: "2026. 6. 1.",
  status: "Published",
  blocks: [
    {
      type: "paragraph",
      text: "The robotics industry has a data problem that looks like an abundance problem. Datasets are growing. Episode counts are climbing. But the models trained on them still fail in real homes. The issue is not quantity — it is what the data actually captures.",
    },
    {
      type: "heading",
      level: 2,
      text: "Our definition of quality",
    },
    {
      type: "paragraph",
      text: "At Lili-o, quality data has three properties. It is contact-rich: every episode involves physical interaction with objects — grasping, placing, wiping, pouring — not just navigation or observation. It is environmentally diverse: captured across different home layouts, lighting conditions, and object configurations, not a single benchmark kitchen. And it is behaviorally grounded: it reflects how humans actually interact with their environments, not just what a robot can currently do.",
    },
    {
      type: "quote",
      text: "Whatever wins the household robotics race, it will need data. Real-world, contact-rich, home environment data. At scale.",
    },
    {
      type: "heading",
      level: 2,
      text: "The foundry channel",
    },
    {
      type: "paragraph",
      text: "Our primary data source is the foundry: purpose-built environments where robots run manipulation tasks continuously, 24/7, across a heterogeneous fleet. Each episode is instrumented with multi-modal sensing — RGB, depth, proprioception, force — and annotated with task state, contact events, and failure modes.",
    },
    {
      type: "image",
      src: "/blog/3/foundry-pipeline.webp",
      alt: "Data pipeline from robot episodes to training sets",
      caption:
        "From raw episodes to structured training data — automated, continuous, quality-controlled.",
    },
    {
      type: "paragraph",
      text: "Foundry data gives us repeatability and scale. We can run the same task thousands of times, vary parameters systematically, and measure exactly what changes when we modify a primitive or a retry strategy. This is the controlled half of our data strategy.",
    },
    {
      type: "heading",
      level: 2,
      text: "The human-centric channel",
    },
    {
      type: "paragraph",
      text: "Foundry runs have a blind spot: they only capture what a robot can physically do with its current embodiment. They miss the infinite variation of real human homes — the cluttered countertops, the non-standard object shapes, the improvised solutions people use every day.",
    },
    {
      type: "paragraph",
      text: "Our human-centric channel sends participants into their own kitchens and living rooms wearing RGB-D cameras and haptic gloves. The result is data that captures environmental chaos, natural behavioral variance, and physical interaction at a level no controlled environment can replicate.",
    },
    {
      type: "image",
      src: "/blog/3/home-capture.webp",
      alt: "Human behavior capture in a real home environment",
      caption: "Real homes, real behavior — the distribution that benchmarks miss.",
    },
    {
      type: "heading",
      level: 2,
      text: "What we filter out",
    },
    {
      type: "paragraph",
      text: "Quality also means knowing what not to include. We discard episodes with incomplete sensing, ambiguous task boundaries, or degenerate contact sequences. We tag and segment rather than dump raw footage. And we measure downstream model performance on held-out home scenarios — not just training loss — to validate that new data actually improves generalization.",
    },
    {
      type: "heading",
      level: 3,
      text: "The modalities that matter",
    },
    {
      type: "paragraph",
      text: "For household manipulation, the signal lives in contact events, gripper state, object pose relative to the scene, and the temporal structure of multi-step tasks. Video alone is not enough. Proprioception alone is not enough. Quality data fuses these modalities with task-level annotations so that models learn transferable structure, not memorized trajectories.",
    },
    {
      type: "quote",
      text: "The goal is not the largest dataset. It is the dataset that closes the gap between what works in the lab and what works in your kitchen.",
      attribution: "Lili-o data team",
    },
  ],
};
