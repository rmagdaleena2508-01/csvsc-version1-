import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SocialCTA } from "@/components/sections/SocialCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "What the Computer Society of India is, what the SRMIST Vadapalani Student Chapter does, and why it exists.",
  alternates: { canonical: "/about" },
};

const blocks = [
  {
    label: "The society",
    title: "India's oldest body of computing professionals.",
    body: "The Computer Society of India was founded in 1965. It brings together practitioners, academics and students across the country to share what they know about computing — through chapters, publications and events.",
  },
  {
    label: "The chapter",
    title: "A student chapter at SRMIST Vadapalani.",
    body: "Our chapter runs the local version of that idea: workshops, technical discussions, guest sessions and industry interactions, organised by students for students on campus.",
  },
  {
    label: "Why it exists",
    title: "Curiosity needs somewhere to go.",
    body: "Coursework tells you what to learn. A chapter is where you find out what you actually want to learn — by sitting in a room with people working on things you have not tried yet.",
  },
  {
    label: "How sessions work",
    title: "Short, specific and hands-on.",
    body: "Each session takes one topic seriously rather than surveying ten. Members leave with something they can use: a working example, a mental model, or a clear reason to go read further.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-editorial pt-32 pb-16 sm:pt-40 sm:pb-20">
        <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
          About
        </p>
        <h1 className="text-display mt-6 max-w-[15ch] font-normal text-navy text-balance">
          A place to be curious in public.
        </h1>
        <p className="text-lead mt-8 max-w-[54ch] text-slate-blue text-pretty">
          The Computer Society of India Student Chapter at SRMIST Vadapalani
          exists so students can explore technology together, out loud, with
          people who are figuring it out at the same time.
        </p>
      </section>

      <section className="container-editorial pb-section">
        <ul className="flex flex-col">
          {blocks.map((block, i) => (
            <Reveal as="li" key={block.label} index={i % 3}>
              <article className="grid grid-cols-1 gap-6 border-t border-navy/12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase lg:col-span-3">
                  {block.label}
                </p>
                <div className="lg:col-span-9">
                  <h2 className="text-title max-w-[22ch] font-normal tracking-[-0.028em] text-navy text-balance">
                    {block.title}
                  </h2>
                  <p className="text-lead mt-5 max-w-[58ch] text-slate-blue text-pretty">
                    {block.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-editorial pb-section">
        <Reveal>
          <div className="flex flex-col items-center gap-10 rounded-[2rem] bg-cream p-10 text-center ring-1 ring-navy/8 sm:p-16">
            <Image
              src="/images/brand/csi-emblem.png"
              alt=""
              width={120}
              height={120}
              loading="lazy"
              className="opacity-90"
            />
            <div>
              <h2 className="text-headline max-w-[18ch] font-normal text-navy text-balance">
                Leadership changes. The habit does not.
              </h2>
              <p className="text-lead mx-auto mt-6 max-w-[50ch] text-slate-blue text-pretty">
                Faculty coordinators guide the chapter; student office bearers
                run it, and hand it on each year. Everything published here is
                kept as a record for whoever comes next.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <SocialCTA />
    </>
  );
}
