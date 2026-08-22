export type EventCategory =
  | "Workshop"
  | "Discussion"
  | "Industry"
  | "Knowledge Session";

export type ChapterEvent = {
  slug: string;
  title: string;
  /** ISO date — formatted for display at render time. */
  date: string;
  category: EventCategory;
  /** One line, used on cards. */
  description: string;
  /** Two or three sentences, used on the event page. */
  summary: string;
  speaker?: { name: string; role: string };
  venue?: string;
  image: string;
  /** Bullets for "What we explored". */
  explored: string[];
  /** Bullets for "Key takeaways". */
  takeaways: string[];
  gallery?: string[];
  quote?: { text: string; attribution: string };
  reportUrl?: string;
  featured?: boolean;
};

/**
 * TODO (chapter team): replace speaker names, venues and report links with the
 * real records. Everything the site renders comes from this file — no event
 * copy is hardcoded in components.
 */
export const events: ChapterEvent[] = [
  {
    slug: "vibe-coding",
    title: "Vibe Coding: Building Software with AI",
    date: "2026-08-13",
    category: "Workshop",
    description: "Exploring AI-assisted software development.",
    summary:
      "A session exploring AI-assisted development, its advantages, limitations and the responsibility developers still carry. We wrote code alongside an assistant, then read every line back critically.",
    speaker: { name: "Guest Speaker", role: "Software Engineer" },
    venue: "SRMIST Vadapalani",
    image: "/images/events/vibe-coding.svg",
    explored: [
      "What vibe coding actually means in practice",
      "Advantages of AI-assisted development",
      "Where generated code quietly breaks down",
      "Security considerations when accepting suggestions",
      "Reliability, testing and review discipline",
      "Responsible use of AI tools in coursework and projects",
    ],
    takeaways: [
      "Speed is the easy win. Correctness still costs the same attention it always did.",
      "Read generated code the way you would review a stranger's pull request.",
      "Prompting is specification writing — vague input produces confidently wrong output.",
      "Never paste credentials, private data or unreleased work into a tool you do not control.",
    ],
    gallery: [
      "/images/events/vibe-coding-1.svg",
      "/images/events/vibe-coding-2.svg",
      "/images/events/vibe-coding-3.svg",
    ],
    quote: {
      text: "AI can accelerate development. Judgment still belongs to the developer.",
      attribution: "Closing note from the session",
    },
    featured: true,
  },
  {
    slug: "generative-ai-workshop",
    title: "Generative AI Workshop",
    date: "2026-07-24",
    category: "Workshop",
    description: "Understanding modern AI tools and workflows.",
    summary:
      "A hands-on introduction to the current generation of AI tooling — what these models are good at, where they fail, and how to fold them into an everyday workflow without outsourcing your thinking.",
    speaker: { name: "Guest Speaker", role: "Applied AI Practitioner" },
    venue: "SRMIST Vadapalani",
    image: "/images/events/generative-ai-workshop.svg",
    explored: [
      "How current generative models are built and served",
      "Prompting as an engineering discipline",
      "Retrieval, grounding and why models hallucinate",
      "Evaluating output instead of trusting it",
    ],
    takeaways: [
      "A model is a tool with a failure mode, not an oracle.",
      "Grounding a model in real sources beats a longer prompt almost every time.",
      "Measure quality before you ship anything built on a model.",
    ],
    gallery: [
      "/images/events/generative-ai-workshop-1.svg",
      "/images/events/generative-ai-workshop-2.svg",
      "/images/events/generative-ai-workshop-3.svg",
    ],
    quote: {
      text: "The interesting part is not what the model writes. It is what you decide to keep.",
      attribution: "Workshop discussion",
    },
  },
  {
    slug: "industry-interaction",
    title: "Industry Interaction",
    date: "2026-06-19",
    category: "Industry",
    description: "Learning directly from technology professionals.",
    summary:
      "An open conversation with practitioners about how engineering work actually happens after graduation — team structure, review culture, and the difference between a college project and a production system.",
    speaker: { name: "Industry Panel", role: "Technology Professionals" },
    venue: "SRMIST Vadapalani",
    image: "/images/events/industry-interaction.svg",
    explored: [
      "What a first year in industry really looks like",
      "How teams plan, review and ship",
      "Which fundamentals survive every framework change",
      "Building a portfolio that reads as evidence",
    ],
    takeaways: [
      "Communication is a technical skill, and it is the one most often missing.",
      "Depth in one stack beats a résumé listing twelve.",
      "Nobody is measuring you on how fast you type.",
    ],
    gallery: [
      "/images/events/industry-interaction-1.svg",
      "/images/events/industry-interaction-2.svg",
      "/images/events/industry-interaction-3.svg",
    ],
    quote: {
      text: "The habits you build in a student chapter are the habits you take to work.",
      attribution: "Panel remark",
    },
  },
  {
    slug: "open-source-clinic",
    title: "Open Source Clinic",
    date: "2026-05-08",
    category: "Discussion",
    description: "Making a first contribution, together.",
    summary:
      "A working session where members picked a real repository, read the contribution guide properly, and opened a first pull request before leaving the room.",
    venue: "SRMIST Vadapalani",
    image: "/images/events/open-source-clinic.svg",
    explored: [
      "Reading an unfamiliar codebase quickly",
      "Issue triage and choosing a first task",
      "Commit hygiene and pull request etiquette",
      "Responding to review without taking it personally",
    ],
    takeaways: [
      "A good first contribution is small, complete and well described.",
      "Maintainers are reviewing your patience as much as your patch.",
    ],
    gallery: [
      "/images/events/open-source-clinic-1.svg",
      "/images/events/open-source-clinic-2.svg",
      "/images/events/open-source-clinic-3.svg",
    ],
  },
  {
    slug: "cloud-foundations",
    title: "Cloud Foundations",
    date: "2026-04-03",
    category: "Knowledge Session",
    description: "The mental model behind cloud infrastructure.",
    summary:
      "A grounding session on what actually sits behind a deploy button — compute, storage, networking and the cost model that quietly shapes every architectural decision.",
    venue: "SRMIST Vadapalani",
    image: "/images/events/cloud-foundations.svg",
    explored: [
      "Compute, storage and networking primitives",
      "Regions, availability and failure domains",
      "Why cloud bills surprise people",
      "Reading architecture diagrams critically",
    ],
    takeaways: [
      "Managed does not mean magic — someone still runs the machine.",
      "Architecture decisions are cost decisions.",
    ],
    gallery: [
      "/images/events/cloud-foundations-1.svg",
      "/images/events/cloud-foundations-2.svg",
      "/images/events/cloud-foundations-3.svg",
    ],
  },
  {
    slug: "cyber-security-primer",
    title: "Security Primer",
    date: "2026-03-12",
    category: "Knowledge Session",
    description: "How systems break, and how they are defended.",
    summary:
      "An introduction to thinking like an attacker so you can build like a defender — the common classes of vulnerability, and the habits that prevent most of them.",
    venue: "SRMIST Vadapalani",
    image: "/images/events/cyber-security-primer.svg",
    explored: [
      "Threat modelling in plain language",
      "Injection, authentication and access-control failures",
      "Secrets management for student projects",
      "Reporting a vulnerability responsibly",
    ],
    takeaways: [
      "Most breaches are boring mistakes, not clever exploits.",
      "Security is a review habit before it is a tool.",
    ],
    gallery: [
      "/images/events/cyber-security-primer-1.svg",
      "/images/events/cyber-security-primer-2.svg",
      "/images/events/cyber-security-primer-3.svg",
    ],
  },
];

/** Categories with nothing published yet — their filter shows a notice. */
export const upcomingCategories: readonly EventCategory[] = [
  "Workshop",
  "Industry",
];

export const eventCategories: readonly ("All" | EventCategory)[] = [
  "All",
  "Workshop",
  "Discussion",
  "Industry",
  "Knowledge Session",
];

const byDateDesc = (a: ChapterEvent, b: ChapterEvent) =>
  b.date.localeCompare(a.date);

export const allEvents = [...events].sort(byDateDesc);

export const featuredEvent =
  allEvents.find((e) => e.featured) ?? allEvents[0];

export const recentEvents = allEvents.slice(0, 3);

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function relatedEvents(slug: string, limit = 3) {
  const current = getEvent(slug);
  if (!current) return [];
  const sameCategory = allEvents.filter(
    (e) => e.slug !== slug && e.category === current.category
  );
  const rest = allEvents.filter(
    (e) => e.slug !== slug && e.category !== current.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
