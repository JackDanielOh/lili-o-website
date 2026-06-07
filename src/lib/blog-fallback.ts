import type { BlogPost } from "@/lib/blog";

export const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    tag: "Manipulation · Learning",
    title: "Teaching robots new skills in 5 minutes",
    excerpt:
      "Our proprietary One-Shot method reduces manipulation primitive creation from 1 hour to 5 minutes. Here's how.",
    content:
      "One of the hardest problems in robotics data collection is making robots autonomous on tasks quickly enough to justify the infrastructure. Traditional approaches require days of engineering per task. Our One-Shot method changes that.\n\nBy combining visual demonstration with a novel primitive extraction pipeline, we reduce the time to create a new manipulation skill from over an hour to under five minutes. The robot watches a single human demonstration, extracts the key contact events, and generalises to new object positions and orientations.\n\nThis is what makes the foundry viable at scale.",
    image: "",
    featured: true,
    slug: "one-shot-learning",
    publishedAt: "2025-05-01",
    status: "Published",
  },
  {
    id: "2",
    tag: "Planning · Automation",
    title: "From primitives to full tasks — the logic layer",
    excerpt:
      "Chaining manipulation primitives into complex, long-horizon tasks is the hardest open problem we're working on.",
    content:
      "A manipulation primitive is a single contact-rich action: pick, place, wipe, pour. Useful in isolation — but a household robot needs to chain dozens of them in sequence, adapting to failure at each step.\n\nThe logic layer is the orchestration system that turns primitives into tasks. It monitors execution state, detects failures, triggers retries, and decides when to escalate. Building it robustly is where most of our current research effort lives.",
    image: "",
    featured: false,
    slug: "logic-layer",
    publishedAt: "2025-04-15",
    status: "Published",
  },
  {
    id: "3",
    tag: "Autonomy · Robotics",
    title: "How robots learn to retry — without asking for help",
    excerpt:
      "Vision-based failure detection and autonomous retry loops — how we keep the foundry running 24/7 without human operators.",
    content:
      "The foundry runs 24/7. That means no human can intervene when a robot fails. Instead, the robot has to detect the failure itself and decide what to do next.\n\nWe use a vision-based failure detector trained on thousands of episodes. When the detector fires, the robot rolls back to the last known good state and retries with a modified strategy. This loop is what makes continuous autonomous data generation possible.",
    image: "",
    featured: false,
    slug: "retry-loops",
    publishedAt: "2025-03-28",
    status: "Published",
  },
  {
    id: "4",
    tag: "Hardware · Generalization",
    title: "One use case. Any robot.",
    excerpt:
      "How we build hardware-agnostic task programs that run on Unitree, Rainbow Robotics, Agibot — without reprogramming.",
    content:
      "When we deploy a new household task to the foundry, it has to run on every robot in the fleet — regardless of embodiment. Unitree, Rainbow Robotics, Agibot, and others all have different kinematics, grippers, and APIs.\n\nOur hardware abstraction layer normalises these differences at the primitive level. A pick primitive specifies contact geometry, not joint angles. The layer translates that to the specific robot's control interface at runtime.",
    image: "",
    featured: false,
    slug: "hardware-agnostic",
    publishedAt: "2025-03-10",
    status: "Published",
  },
  {
    id: "5",
    tag: "Data · Human behavior",
    title: "Capturing what robots can't — human behavior in real homes",
    excerpt:
      "Why we instrument real people in real households, and what that data adds to the training pipeline.",
    content:
      "Robot runs in purpose-built environments are our primary data source. But they have a blind spot: they only capture what a robot can physically do with its current embodiment. They miss the infinite variation of real human homes.\n\nOur human-centric channel sends participants into their own kitchens and living rooms wearing RGB-D cameras and haptic gloves. The result is data that captures environmental chaos, natural behavioral variance, and physical interaction at a level no controlled environment can replicate.",
    image: "",
    featured: false,
    slug: "human-behavior",
    publishedAt: "2025-02-20",
    status: "Published",
  },
];

export function getStaticPostBySlug(slug: string): BlogPost | undefined {
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug);
}
