import Image from "next/image";

/**
 * Cover image behind a page banner, faded into the page.
 * `intensity` controls how visible the art is:
 *   - "subtle" (default): faint texture behind text
 *   - "bold": branded art meant to be seen, lighter scrim so it reads
 */
export function BannerBg({
  src,
  intensity = "subtle",
}: {
  src: string;
  intensity?: "subtle" | "bold";
}) {
  const bold = intensity === "bold";
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${bold ? "opacity-[0.6]" : "opacity-[0.16]"}`}
      />
      <div
        className={`circuit-grid absolute inset-0 ${bold ? "opacity-20" : "opacity-30"}`}
      />
      <div
        className={`absolute inset-0 ${
          bold
            ? "bg-gradient-to-r from-bg via-bg/55 to-bg/10"
            : "bg-gradient-to-b from-bg/70 via-bg/40 to-bg"
        }`}
      />
    </div>
  );
}
