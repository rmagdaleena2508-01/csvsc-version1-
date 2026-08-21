import type { Metadata } from "next";
import { TeamCard } from "@/components/team/TeamCard";
import { Reveal } from "@/components/ui/Reveal";
import { SocialCTA } from "@/components/sections/SocialCTA";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The student office bearers and faculty leadership behind the CSI Student Chapter at SRMIST Vadapalani.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <section className="container-editorial pt-32 pb-16 sm:pt-40 sm:pb-20">
        <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
          Office bearers
        </p>
        <h1 className="inter-accent text-display mt-6 max-w-[13ch] font-normal text-navy text-balance">
          Meet the Team
        </h1>
        <p className="script-alt mt-4 text-[1.25rem] text-navy/75">
          of CSI SRMIST VDP Student Chapter
        </p>
        <p className="text-lead mt-8 max-w-[52ch] text-slate-blue text-pretty">
          Students who plan the sessions, run the room and keep the chapter
          moving, supported by faculty who make it possible.
        </p>
      </section>

      <section
        aria-label="Student leadership"
        className="container-editorial pb-section"
      >
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 border-t border-navy/12 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal
              as="li"
              key={`${member.role}-${i}`}
              index={i % 4}
              className="h-full"
            >
              <TeamCard member={member} />
            </Reveal>
          ))}
        </ul>
      </section>

      <SocialCTA />
    </>
  );
}
