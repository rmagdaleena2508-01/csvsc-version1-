import { Img as Image } from "@/components/ui/Img";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatEventDate, type ChapterEvent } from "@/data/events";

export function EventHero({ event }: { event: ChapterEvent }) {
  const meta = [
    { label: "Date", value: formatEventDate(event.date) },
    { label: "Category", value: event.category },
    event.speaker ? { label: "Speaker", value: event.speaker.name } : null,
    event.venue ? { label: "Venue", value: event.venue } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <header className="container-editorial pt-32 sm:pt-36">
      <Link
        href="/events"
        className="group inline-flex items-center gap-2 text-[0.875rem] text-navy/65 transition-colors hover:text-navy"
      >
        <ArrowLeft
          size={15}
          strokeWidth={1.7}
          aria-hidden
          className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:-translate-x-0.5"
        />
        <span className="link-underline">All sessions</span>
      </Link>

      <h1 className="text-display mt-8 max-w-[15ch] font-normal text-navy text-balance">
        {event.title}
      </h1>

      <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-navy/12 pt-8 sm:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label} className="flex flex-col gap-2">
            <dt className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
              {m.label}
            </dt>
            <dd className="text-[1.0625rem] leading-snug text-navy">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="metal-frame relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] bg-sky-100 sm:mt-16">
        <Image
          src={event.image}
          alt={`${event.title} — photograph from the session`}
          fill
          priority
          sizes="(min-width: 1440px) 88rem, 100vw"
          className="object-cover"
        />
      </div>
    </header>
  );
}
