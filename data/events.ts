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
  explored?: string[];
  /** Bullets for "Key takeaways". */
  takeaways?: string[];
  gallery?: string[];
  quote?: { text: string; attribution: string };
  reportUrl?: string;
  /** The one shown under "Happening this month". */
  featured?: boolean;
  /** The one shown as the month's highlight, above it. */
  highlight?: boolean;
};

/**
 * TODO (chapter team): replace speaker names, venues and report links with the
 * real records. Everything the site renders comes from this file — no event
 * copy is hardcoded in components.
 */
export const events: ChapterEvent[] = [
  {
    slug: "beyond-the-cgpa",
    title: "Beyond the CGPA: Building a Tech Career That Actually Works",
    date: "2026-08-27",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #8.",
    summary:
      "Knowledge Updates Seminar Series #8, held with IEEE CS. What a technology career is built on once marks stop being the measure, from a final-year student already working across the full software development life cycle.",
    speaker: {
      name: "Hameed Salihu",
      role: "Student, Department of CSE, SRMIST Vadapalani",
    },
    venue: "CSE Lab 2, 2:00 to 3:00 PM",
    image: "/images/events/beyond-the-cgpa.jpg",
    featured: true,
  },
  {
    slug: "vibe-coding",
    title: "Code Less, Create More: The Vibe Coding Revolution",
    date: "2026-08-13",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #6.",
    summary:
      "A session exploring AI-assisted development, its advantages, limitations and the responsibility developers still carry. We wrote code alongside an assistant, then read every line back critically.",
    speaker: {
      name: "Jaiarthi",
      role: "III Year CSE, SRM Institute of Science and Technology",
    },
    venue: "Hardware Lab, 2:00 PM",
    image: "/images/events/vibe-coding.jpg",
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
      "Prompting is specification writing, vague input produces confidently wrong output.",
      "Never paste credentials, private data or unreleased work into a tool you do not control.",
    ],
    quote: {
      text: "AI can accelerate development. Judgment still belongs to the developer.",
      attribution: "Closing note from the session",
    },
    highlight: true,
  },
  {
    slug: "gsoc-roadmap",
    title: "Your Roadmap to Becoming a GSoC Contributor",
    date: "2026-03-12",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #6.",
    summary:
      "Knowledge Updates Seminar Series #6, held with IEEE CS. A walk through what it takes to contribute to Google Summer of Code, from an engineer working in cloud-native technologies, DevOps and open source.",
    speaker: { name: "Achanandhi M", role: "Advanced Analyst at EY" },
    venue: "CSE Lab 2, 10:00 to 11:00 AM",
    image: "/images/events/gsoc-roadmap.jpg",
  },
  {
    slug: "community-led-innovation",
    title:
      "Community-Led Innovation: How Open Source and AI Geeks Create Real Impact",
    date: "2026-02-13",
    category: "Knowledge Session",
    description: "Knowledge Updates Seminar Series #5.",
    summary:
      "Knowledge Updates Seminar Series #5, held with IEEE CS. How open source communities form, how they sustain themselves, and the impact they create, from someone running one.",
    speaker: {
      name: "Crystal Darling",
      role: "Lead and Organizer, AI Geeks Chennai",
    },
    venue: "CSE Lab 2, 10:00 to 11:00 AM",
    image: "/images/events/community-led-innovation.jpg",
  },
  {
    slug: "communication-side-hustles",
    title: "Communication Skills, Side Hustles and Freelancing for Income",
    date: "2026-01-30",
    category: "Knowledge Session",
    description: "Turning communication into opportunities and income.",
    summary:
      "A session on the skills that open doors alongside technical ability: communicating well, finding work that fits around college, and turning conversations into freelance income.",
    speaker: {
      name: "Jaishree B",
      role: "B.Tech CSE IV Year, SRM IST Vadapalani",
    },
    venue: "CSE Hardware Lab, 9:00 to 10:00 AM",
    image: "/images/events/communication-side-hustles.jpg",
    explored: [
      "How communication creates opportunities faster than skills alone",
      "Side hustles that actually work during college",
      "Turning conversations into income: freelancing basics and commercialization",
    ],
  },
  {
    slug: "decode-the-interview",
    title: "Decode the Interview",
    date: "2025-10-27",
    category: "Knowledge Session",
    description: "How technical interviews actually run.",
    summary:
      "A session on what technical interviews look like from the other side of the table, led by the chapter's own President.",
    speaker: {
      name: "Antony Saju David",
      role: "President, CSI Student Chapter, SRMIST VDP",
    },
    venue: "CSE Hardware Lab, 11:40 AM",
    image: "/images/events/decode-the-interview.jpg",
  },
];

/** Categories with nothing published yet — their filter shows a notice. */
export const upcomingCategories: readonly EventCategory[] = [
  "Workshop",
  "Discussion",
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

export const highlightEvent = allEvents.find((e) => e.highlight);

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

/** "August 2026", used for the highlight heading so it stays right on its own. */
export function formatEventMonth(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
