export type Insight = {
  source: string;
  statement: string;
  detail: string;
  href?: string;
};

/** One idea per recent session, drawn from what the session set out to cover. */
export const insights: Insight[] = [
  {
    source: "From Code Less, Create More",
    statement:
      "Writing less code only helps if you still understand all of it.",
    detail:
      "Assistants shrink the typing, not the responsibility. What you ship still has to be read, questioned and defended as if you had written every line yourself.",
  },
  {
    source: "From Your Roadmap to Becoming a GSoC Contributor",
    statement: "Open source is a route, not a lottery.",
    detail:
      "Contributors get picked because they showed up early, read the codebase and started small. That path can be planned, which is what a roadmap is for.",
  },
  {
    source: "From Community-Led Innovation",
    statement: "Communities build what no single contributor could.",
    detail:
      "Open source works because people who will never meet keep improving the same thing. Real impact comes from that accumulation, not from one brilliant commit.",
  },
  {
    source: "From Communication Skills and Freelancing",
    statement: "Communication turns a skill into an opportunity.",
    detail:
      "Being able to do the work is the first half. Being able to explain it, price it and follow up on it is what turns a conversation into income.",
  },
  {
    source: "From Decode the Interview",
    statement: "An interview is a process you can read, not a verdict.",
    detail:
      "Interviewers are checking how you think under pressure and how you handle not knowing. Both of those are practisable, which makes the room far less mysterious.",
  },
];
