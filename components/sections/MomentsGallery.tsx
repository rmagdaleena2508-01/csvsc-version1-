import { Img as Image } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";

const moments = [
  {
    src: "/images/moments/session.svg",
    alt: "Members during a CSI technical session",
    ratio: "aspect-[16/10]",
  },
  {
    src: "/images/moments/lab.svg",
    alt: "A hands-on lab at the chapter",
    ratio: "aspect-[4/5]",
  },
  {
    src: "/images/moments/questions.svg",
    alt: "Members asking questions after a talk",
    ratio: "aspect-[16/9]",
  },
  {
    src: "/images/moments/break.svg",
    alt: "Conversation between sessions",
    ratio: "aspect-[4/5]",
  },
];

function Frame({
  src,
  alt,
  ratio,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  ratio: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`metal-frame group relative ${ratio} overflow-hidden rounded-3xl bg-sky-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
      />
    </div>
  );
}

export function MomentsGallery() {
  return (
    <section
      aria-labelledby="moments-heading"
      className="container-editorial pt-section pb-[clamp(4rem,8vw,7rem)]"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:self-end">
          <h2
            id="moments-heading"
            className="display-serif text-headline max-w-[13ch] font-normal text-navy text-balance"
          >
            Learning looks better in action.
          </h2>
          <p className="text-lead mt-6 max-w-[40ch] text-slate-blue text-pretty">
            A glimpse into the sessions, conversations and experiences happening
            at CSI.
          </p>
        </Reveal>

        <Reveal index={1} className="lg:col-span-7">
          <Frame
            {...moments[0]}
            sizes="(min-width: 1024px) 56vw, 92vw"
          />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-4 lg:col-start-2">
          <Frame
            {...moments[1]}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          />
          {/* deliberate overlap — one only, on wide screens */}
          <div className="pointer-events-none absolute -right-14 -bottom-16 hidden w-52 xl:block">
            <div className="pointer-events-auto rounded-2xl bg-ivory p-1.5 shadow-[0_28px_60px_-40px_rgba(18,38,92,0.7)]">
              <Frame
                {...moments[3]}
                ratio="aspect-[4/5]"
                sizes="176px"
                className="rounded-xl"
              />
            </div>
          </div>
        </Reveal>

        <Reveal index={1} className="lg:col-span-5 lg:col-start-8 lg:mt-20">
          <Frame
            {...moments[2]}
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 46vw, 92vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
