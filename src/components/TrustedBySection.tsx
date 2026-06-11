import Image from "next/image";

const LOGO_FILTER_CLASS = "grayscale brightness-0 invert opacity-45";

const PARTNERS = [
  { name: "Antler", logo: "/antler-logo.svg", width: 100, height: 24 },
  { name: "NVIDIA", logo: "/partnerLogos/nvidia_logo.webp", width: 160, height: 29 },
  { name: "WhatsLab", logo: "/partnerLogos/whatslab_logo.webp", width: 160, height: 34 },
  { name: "Metaba", logo: "/partnerLogos/metaba_logo.webp", width: 160, height: 38 },
  {
    name: "Niryo",
    logo: "/partnerLogos/niryo_logo.webp",
    width: 572,
    height: 72,
    imageClassName: "h-4 w-auto md:h-5",
  },
] as const;

export function TrustedBySection() {
  return (
    <section className="border-t border-white/5 bg-[#141414]">
      <div className="container-x py-10 md:py-12">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <span className="eyebrow text-paper/30">Trusted by</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {PARTNERS.map((partner) => (
              <li key={partner.name}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className={`object-contain ${LOGO_FILTER_CLASS} ${
                    "imageClassName" in partner
                      ? partner.imageClassName
                      : "h-8 w-auto md:h-9"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
