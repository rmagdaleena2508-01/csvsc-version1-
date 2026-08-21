import { Hero } from "@/components/hero/Hero";
import { CurrentEvent } from "@/components/sections/CurrentEvent";
import { MomentsGallery } from "@/components/sections/MomentsGallery";
import { RecentEvents } from "@/components/sections/RecentEvents";
import { TeamSection } from "@/components/sections/TeamSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { SocialCTA } from "@/components/sections/SocialCTA";

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
    </>
  );
}
