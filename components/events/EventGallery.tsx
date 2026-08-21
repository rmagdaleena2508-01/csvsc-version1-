import { Img as Image } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";

export function EventGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="gallery-heading" className="py-section">
      <h2
        id="gallery-heading"
        className="text-headline font-normal text-navy"
      >
        Event gallery
      </h2>

      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {images.map((src, i) => (
          <Reveal as="li" key={src} index={i % 3}>
            <div
              className={`group relative overflow-hidden rounded-3xl bg-sky-100 ring-1 ring-navy/8 ${
                i === 0 ? "aspect-[4/3]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={src}
                alt={`${title} — photograph ${i + 1}`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
              />
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
