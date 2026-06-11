import type { StaticArticle } from "./types";

export const founderInterview: StaticArticle = {
  id: "founder-interview",
  slug: "2",
  title: "Founder Interview: Building Lili-o",
  tag: "Company · Story",
  excerpt:
    "Why we believe the next revolution in robotics happens at home — and what it takes to build the data foundry that gets us there.",
  image: "/blog/2/thumbnail.webp",
  featured: false,
  publishedAt: "2026. 5. 20.",
  status: "Published",
  blocks: [
    {
      type: "paragraph",
      text: "Every generation of AI has had its defining moment of mass accessibility. For language models, it was millions of people using ChatGPT in their daily lives. For robotics, we believe that moment will happen at home — not in warehouses, not in factories, but in kitchens and living rooms around the world.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why household robotics",
    },
    {
      type: "paragraph",
      text: "Household is the final frontier. It is the most unstructured, contact-rich, and variable environment a robot will ever operate in. Objects move. Layouts differ. Humans intervene unpredictably. That complexity is exactly why the data problem is so hard — and so valuable to solve.",
    },
    {
      type: "quote",
      text: "We don't know which technology will get us there. World Models? VLAs? Something we haven't invented yet? What we know is this: whatever wins, it will need data. Real-world, contact-rich, home environment data. At scale.",
    },
    {
      type: "image",
      src: "/blog/2/vision.webp",
      alt: "Lili-o team working on household robotics",
      caption: "Building for the environment where robots will matter most.",
    },
    {
      type: "heading",
      level: 2,
      text: "The origin of Lili-o",
    },
    {
      type: "paragraph",
      text: "Lili-o started from a simple observation: the robotics industry has spent decades optimizing for controlled environments, but the models that will power household robots need data from the opposite end of the spectrum. They need contact-rich manipulation in real homes, captured at a scale no lab can replicate.",
    },
    {
      type: "paragraph",
      text: "We asked what infrastructure would be required to generate that data continuously — not as a one-off research project, but as an industrial process. The answer was a foundry: a system that takes a task specification and produces thousands of high-quality episodes across a heterogeneous robot fleet, running 24/7 without human operators.",
    },
    {
      type: "heading",
      level: 2,
      text: "What we are building",
    },
    {
      type: "paragraph",
      text: "Lili-o is a Physical AI data foundry. We build the software stack that lets robots learn new manipulation skills in minutes, chain those skills into long-horizon tasks, recover from failure autonomously, and generalize across different robot embodiments — all while generating the training data that downstream model builders need.",
    },
    {
      type: "image",
      src: "/blog/2/foundry.webp",
      alt: "Robot manipulation in the Lili-o foundry",
      caption: "The foundry: from task specification to continuous data generation.",
    },
    {
      type: "heading",
      level: 3,
      text: "Three bets we are making",
    },
    {
      type: "paragraph",
      text: "First, that data — not architecture — is the binding constraint on household robotics. Second, that the path to scale runs through automation: robots that teach themselves new skills without months of engineering per task. Third, that the winning data will combine controlled robot runs with human-centric capture in real homes, because neither alone captures the full distribution.",
    },
    {
      type: "quote",
      text: "To build this foundry, we had to solve a hard problem first: how do you make a robot autonomous on a task without months of engineering? We built the One-Shot method — from hours of demonstration to minutes. From months of engineering to days.",
      attribution: "Lili-o founding team",
    },
    {
      type: "heading",
      level: 2,
      text: "Looking ahead",
    },
    {
      type: "paragraph",
      text: "We are still early. The foundry is running, the fleet is growing, and every week we learn something new about what quality household data actually looks like. Our goal is not to build the robot that goes into your home — it is to build the data layer that makes whoever does possible.",
    },
    {
      type: "paragraph",
      text: "If you are working on Physical AI, training VLAs, or building household robots, we would like to talk. The bottleneck is data. We are here to solve it.",
    },
  ],
};
