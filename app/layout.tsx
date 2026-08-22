import type { Metadata, Viewport } from "next";
import {
  Great_Vibes,
  Instrument_Sans,
  Inter,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShineDriver } from "@/components/ui/ShineDriver";
import { site } from "@/data/site";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

// Accent faces, both used only in the hero headline.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Section headings below the hero.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-playfair",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.institution}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    "Computer Society of India",
    "CSI Student Chapter",
    "SRMIST Vadapalani",
    "student technology community",
    "workshops",
    "technical sessions",
  ],
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.name} | ${site.institution}`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "/images/brand/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.institution}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.institution}`,
    description: site.description,
    images: ["/images/brand/og.jpg"],
  },
  alternates: { canonical: "/" },
  // The GitHub Pages copy is a mirror. Only one of the two may be indexed, or
  // they compete as duplicates of each other.
  robots: site.noindex
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f2e9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${instrument.variable} ${inter.variable} ${playfair.variable} ${script.variable}`}>
      <body className="grain antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <ShineDriver />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
