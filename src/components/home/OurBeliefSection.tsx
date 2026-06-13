"use client";

import Image from "next/image";

const FOUNDERS = [
  { name: "Nicolas", image: "/founders/nicolas.png" },
  { name: "Ludovic", image: "/founders/ludovic.png" },
  { name: "Jiseong", image: "/founders/jiseong.png" },
  { name: "Quentin", image: "/founders/Quentin-Headshot.webp" },
  { name: "Antoine", image: "/founders/Antoine-Headshot.webp" },
] as const;

export function OurBeliefSection() {
  return (
    <section className="relative border-t border-white/5">
      <div className="container-x py-28 md:py-40 grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
        <div>
          <div className="eyebrow text-[var(--violet)]">Our belief</div>
          <h2 className="display-lg mt-4">Household </h2>
          <h2 className="display-lg mt-0">is the final frontier.</h2>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center">
              {FOUNDERS.map((founder, i) => (
                <div
                  key={founder.name}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-ink bg-ink"
                  style={{ marginLeft: i === 0 ? 0 : "-0.625rem", zIndex: FOUNDERS.length - i }}
                >
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
            <div className="text-xs text-paper/45">
              <span className="font-medium text-paper/65">Team Lili-o</span>
              <span className="block mt-0.5">Founding Members</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-paper/80 max-w-2xl">
          <p>
            We believe the next revolution in robotics won&apos;t happen in warehouses or factories.
            It will happen at home.
          </p>
          <p>
            What made GPT a cultural moment wasn&apos;t the technology — it was mass market
            accessibility. Millions of people using it, every day, in their own lives. Robots will
            follow the same path.
          </p>
          <p>
            We don&apos;t know which technology will get us there. World Models? VLAs? Something we
            haven&apos;t invented yet? What we know is this: whatever wins, it will need{" "}
            <span className="text-[var(--violet)]">data</span>. Real-world, contact-rich, home
            environment data. At scale.
          </p>
          <p className="text-paper/60 border-l-2 border-[var(--violet)] pl-6">
            To build this foundry, we had to solve a hard problem first: how do you make a robot
            autonomous on a task without months of engineering? We built the One-Shot method—from
            hours of demonstration to minutes. From months of engineering to days.
          </p>
        </div>
      </div>
    </section>
  );
}
