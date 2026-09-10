import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { VideoHero } from "@/components/heroes/VideoHero";
import { HomeBody } from "@/components/HomeBody";
import { MobileActionBar } from "@/components/Sections";

/**
 * Landing page: skyline → why us (3D spatial) → three client quotes → contact.
 *
 * The estimator is not here. "Price your own project" in the testimonials
 * section routes to /pricing.
 *
 * `MobileActionBar` sits outside `<main>` on purpose: it is page furniture,
 * not content, and its spacer has to come after the footer to clear it.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <VideoHero />
        <HomeBody />
      </main>
      <SiteFooter />
      {/* After the footer, so its in-flow spacer clears the last footer row
          rather than the end of <main>. */}
      <MobileActionBar />
    </>
  );
}
