import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-editorial flex min-h-[70svh] flex-col justify-center py-section">
      <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
        404
      </p>
      <h1 className="text-display mt-6 max-w-[14ch] font-normal text-navy text-balance">
        That page is not here.
      </h1>
      <p className="text-lead mt-8 max-w-[46ch] text-slate-blue">
        The link may be old, or the session may have moved. The archive has
        everything.
      </p>
      <div className="mt-10 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-navy px-6 py-3 text-[0.9375rem] text-cream transition-colors hover:bg-navy-700"
        >
          Back home
        </Link>
        <Link
          href="/events"
          className="rounded-full px-6 py-3 text-[0.9375rem] text-navy ring-1 ring-navy/15 transition-colors hover:bg-navy/5"
        >
          Browse sessions
        </Link>
      </div>
    </section>
  );
}
