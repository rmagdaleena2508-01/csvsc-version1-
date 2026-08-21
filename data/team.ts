export type TeamMember = {
  /** Omit while a position is still being announced — the card renders a
   *  quiet "announcing soon" state instead of a portrait. */
  name?: string;
  role: string;
  quote?: string;
  image?: string;
  linkedin?: string;
};

/**
 * TODO (chapter team): fill in the remaining office bearers, portraits and
 * LinkedIn links. Positions left without a `name` render as pending on purpose.
 */
export const team: TeamMember[] = [
  {
    role: "President",
  },
  {
    name: "R. Magdaleena",
    role: "Vice President",
    quote: "Confidence often comes after action.",
    image: "/images/team/member-02.svg",
  },
  {
    role: "Secretary",
  },
  {
    role: "Treasurer",
  },
  {
    role: "Technical Lead",
  },
  {
    role: "Events Lead",
  },
  {
    role: "Design Lead",
  },
  {
    role: "Outreach Lead",
  },
];

export const faculty: TeamMember[] = [
  { role: "Faculty Coordinator" },
  { role: "Head of Department" },
];
