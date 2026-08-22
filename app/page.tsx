import { Hero } from "@/components/hero/Hero";
import { CurrentEvent } from "@/components/sections/CurrentEvent";
import { MomentsGallery } from "@/components/sections/MomentsGallery";
import { RecentEvents } from "@/components/sections/RecentEvents";
import { TeamSection } from "@/components/sections/TeamSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { SocialCTA } from "@/components/sections/SocialCTA";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CurrentEvent />
      <MomentsGallery />
      <RecentEvents />
      <TeamSection />
      <InsightsSection />
      <SocialCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            alternateName: `${site.name}, ${site.institution}`,
            url: site.url,
            logo: `${site.url}/images/brand/csi-emblem.png`,
            image: `${site.url}/images/brand/og.jpg`,
            description: site.description,
            parentOrganization: {
              "@type": "CollegeOrUniversity",
              name: "SRM Institute of Science and Technology, Vadapalani Campus",
              url: "https://srmistvdp.edu.in/",
            },
            sameAs: [site.socials.linkedin, site.socials.instagram],
          }),
        }}
      />
    </>
  );
}
