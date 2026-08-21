export const site = {
  name: "CSI Student Chapter",
  institution: "SRMIST Vadapalani",
  legalName: "Computer Society of India — SRMIST Vadapalani Student Chapter",
  // Set per deployment; canonical tags, Open Graph and the sitemap read it.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://csi-srmvdp.org",
  description:
    "Official website of the Computer Society of India Student Chapter at SRMIST Vadapalani. Explore our workshops, technical sessions, events and insights.",
  socials: {
    linkedin: "https://www.linkedin.com/company/computer-society-of-india-csi-srmist-vadapalani/",
    instagram: "https://www.instagram.com/csi_srmvdp/",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/#insights" },
] as const;
