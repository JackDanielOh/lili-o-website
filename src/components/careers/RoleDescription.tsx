import type { ReactNode } from "react";
import type { RoleBlock } from "@/lib/careers";

type Props = { blocks: RoleBlock[] };

export function RoleDescription({ blocks }: Props) {
  if (!blocks.length) return null;

  const rendered: ReactNode[] = [];
  let listBuffer: { kind: "bullet" | "number"; items: string[] } | null = null;

  function flushList() {
    if (!listBuffer) return;
    const key = `list-${rendered.length}`;
    if (listBuffer.kind === "bullet") {
      rendered.push(
        <ul key={key} className="list-disc space-y-2 pl-6 marker:text-[var(--violet)]">
          {listBuffer.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>,
      );
    } else {
      rendered.push(
        <ol key={key} className="list-decimal space-y-2 pl-6 marker:text-paper/40">
          {listBuffer.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>,
      );
    }
    listBuffer = null;
  }

  blocks.forEach((block, i) => {
    if (block.kind === "bullet" || block.kind === "number") {
      if (listBuffer && listBuffer.kind !== block.kind) flushList();
      if (!listBuffer) listBuffer = { kind: block.kind, items: [] };
      listBuffer.items.push(block.text);
      return;
    }

    flushList();

    if (block.kind === "heading") {
      rendered.push(
        block.level === 2 ? (
          <h2 key={i} className="pt-4 text-2xl font-bold tracking-tight text-paper md:text-3xl">
            {block.text}
          </h2>
        ) : (
          <h3 key={i} className="pt-2 text-xl font-bold tracking-tight text-paper md:text-2xl">
            {block.text}
          </h3>
        ),
      );
    } else {
      rendered.push(<p key={i}>{block.text}</p>);
    }
  });

  flushList();

  return (
    <div className="mt-12 space-y-6 border-t border-white/10 pt-12 text-lg leading-relaxed text-paper/80">
      {rendered}
    </div>
  );
}
