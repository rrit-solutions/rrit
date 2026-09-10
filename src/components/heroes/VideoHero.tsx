import { HeroContent, HeroScrim } from "./HeroContent";

/** A calm, static skyline keeps the landing page consistently bright. */
export function VideoHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#a9c8e6]">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{ backgroundImage: "url('/skyline/poster.jpg')" }}
      />
      <HeroScrim />
      <HeroContent />
    </section>
  );
}
