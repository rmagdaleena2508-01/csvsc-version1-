export type Insight = {
  source: string;
  statement: string;
  detail: string;
  href?: string;
};

export const insights: Insight[] = [
  {
    source: "From our Vibe Coding session",
    statement:
      "AI can accelerate development. Judgment still belongs to the developer.",
    detail:
      "An assistant will happily produce code that compiles, passes a quick glance and fails in production. The reading, the questioning and the responsibility do not transfer.",
  },
  {
    source: "From our Generative AI Workshop",
    statement: "A vague prompt is a vague specification.",
    detail:
      "Most disappointing model output traces back to an under-specified request. Writing a clear prompt is the same skill as writing a clear ticket.",
  },
  {
    source: "From our Industry Interaction",
    statement: "Depth in one stack beats a résumé listing twelve.",
    detail:
      "Practitioners consistently said the same thing: they hire for the ability to go deep and communicate clearly, not for the length of a technology list.",
  },
  {
    source: "From our Security Primer",
    statement: "Most breaches are boring mistakes, not clever exploits.",
    detail:
      "Hardcoded secrets, missing access checks, unvalidated input. The defence is a review habit long before it is a security tool.",
  },
];
