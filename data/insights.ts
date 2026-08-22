export type Insight = {
  source: string;
  statement: string;
  detail: string;
  href?: string;
};

/**
 * Each entry is taken from what the session's own poster or opening slide
 * printed: topics covered, the speaker's stated background, the framing on
 * screen. Nothing here is a paraphrase of something nobody said.
 */
export const insights: Insight[] = [
  {
    source: "From Code Less, Create More",
    statement:
      "Coding is shifting from manual implementation to AI-assisted development.",
    detail:
      "The opening slide set out the change directly: developers are increasingly problem solvers and decision makers rather than typists, and practical evidence of what you can build now counts for more than a list of what you know.",
  },
  {
    source: "From Communication Skills, Side Hustles and Freelancing",
    statement:
      "Communication creates opportunities faster than skills alone.",
    detail:
      "The session went from there into side hustles that actually work during college, and how a conversation turns into income: freelancing basics, and pricing the work once someone says yes.",
  },
  {
    source: "From Community-Led Innovation",
    statement: "Open source impact is community work, not solo work.",
    detail:
      "Led by the organizer of AI Geeks Chennai, the session looked at how a technology community forms, keeps going, and produces something that reaches well beyond the people in the room.",
  },
  {
    source: "From Your Roadmap to Becoming a GSoC Contributor",
    statement: "Contributing to open source is a route you can plan.",
    detail:
      "Walked through by an engineer working across cloud-native tooling, DevOps and testing, who advocates for open source, follows CNCF closely, and writes and speaks about the work in public.",
  },
  {
    source: "From Decode the Interview",
    statement: "The clearest account of an interview comes from someone who just sat one.",
    detail:
      "Run by the chapter's own President rather than a guest, which made the session a first-hand account of the process instead of general advice about it.",
  },
];
