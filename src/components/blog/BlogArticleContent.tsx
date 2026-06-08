import Image from "next/image";
import type { ContentBlock } from "@/content/blog/types";

type Props = {
  blocks?: ContentBlock[];
  plainContent?: string;
};

export function BlogArticleContent({ blocks, plainContent }: Props) {
  if (blocks && blocks.length > 0) {
    return (
      <div className="mt-12 border-t border-white/10 pt-12 space-y-6 text-paper/80 leading-relaxed text-lg">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "heading":
              if (block.level === 2) {
                return (
                  <h2 key={i} className="text-2xl md:text-3xl font-bold tracking-tight text-paper pt-4">
                    {block.text}
                  </h2>
                );
              }
              return (
                <h3 key={i} className="text-xl md:text-2xl font-bold tracking-tight text-paper pt-2">
                  {block.text}
                </h3>
              );
            case "paragraph":
              return <p key={i}>{block.text}</p>;
            case "image":
              return (
                <figure key={i} className="my-8 -mx-4 md:mx-0">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-3 text-sm text-paper/40 text-center">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            case "quote":
              return (
                <blockquote
                  key={i}
                  className="text-paper/60 border-l-2 border-[var(--violet)] pl-6 my-8 italic"
                >
                  <p>{block.text}</p>
                  {block.attribution && (
                    <footer className="mt-3 text-sm text-paper/40 not-italic">
                      — {block.attribution}
                    </footer>
                  )}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }

  if (plainContent) {
    return (
      <div className="mt-12 border-t border-white/10 pt-12 space-y-6 text-paper/80 leading-relaxed text-lg">
        {plainContent.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    );
  }

  return null;
}
