import type { Metadata } from "next";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { SocialCTA } from "@/components/sections/SocialCTA";
import { allEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, technical discussions, guest sessions and industry interactions hosted by the CSI Student Chapter at SRMIST Vadapalani.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <section className="container-editorial pt-32 pb-16 sm:pt-40 sm:pb-20">
        <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
          Archive
        </p>
        <h1 className="text-display mt-6 max-w-[19ch] font-normal text-navy text-balance">
          Sessions, conversations and ideas we&rsquo;ve explored.
        </h1>
        <p className="text-lead mt-8 max-w-[52ch] text-slate-blue text-pretty">
          Every session the chapter has run, kept as a record for members,
          speakers and anyone curious about what happens here.
        </p>
      </section>

      <div className="container-editorial pb-section">
        <EventsExplorer events={allEvents} />
      </div>

      <SocialCTA />
    </>
  );
}
