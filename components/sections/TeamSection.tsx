import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TeamCard } from "@/components/team/TeamCard";
import { team } from "@/data/team";

export function TeamSection({
  members = team.slice(0, 4),
  showAllLink = true,
}: {
  members?: typeof team;
  showAllLink?: boolean;
}) {
  return (
    <section
      aria-labelledby="team-heading"
      className="container-editorial py-section"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-navy/12 pt-8">
          <h2 id="team-heading" className="text-headline font-normal text-navy">
            The people behind CSI
          </h2>
          {showAllLink ? (
            <Link
              href="/team"
              className="link-underline text-[0.9375rem] text-navy/70 hover:text-navy"
            >
              Full team
            </Link>
          ) : null}
        </div>
      </Reveal>

      <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => (
          <Reveal
            as="li"
            key={`${member.role}-${member.name ?? i}`}
            index={i % 4}
            className="h-full"
          >
            <TeamCard member={member} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
