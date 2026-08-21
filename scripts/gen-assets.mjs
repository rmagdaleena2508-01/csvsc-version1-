/**
 * Generates the static SVG art used across the site:
 * atmospheric sky backdrop, paper grain, the CSI emblem placeholder,
 * and typed placeholder imagery for events, moments and team portraits.
 *
 * Run with: node scripts/gen-assets.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const out = (p, s) => {
  mkdirSync(p.split("/").slice(0, -1).join("/"), { recursive: true });
  writeFileSync(p, s.trim() + "\n");
};

/* ---------- placeholder imagery ---------- */
const palettes = [
  ["#12265c", "#2b52a8", "#96c0dd"],
  ["#1b3a86", "#6ba3ca", "#dceaf5"],
  ["#2f4a3c", "#5c6f8a", "#ece5d8"],
  ["#5c6f8a", "#96c0dd", "#fcf9f4"],
  ["#12265c", "#5c6f8a", "#bed8ec"],
  ["#1b3a86", "#96c0dd", "#f7f2e9"],
];

const esc = (t) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function placeholder(path, w, h, label, i) {
  const [a, b, c] = palettes[i % palettes.length];
  out(
    path,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/><stop offset="58%" stop-color="${b}"/><stop offset="100%" stop-color="${c}"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="24%" r="68%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.42"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g opacity="0.2" stroke="#ffffff" stroke-width="1.2" fill="none">
    ${Array.from({ length: 7 }, (_, k) => `<circle cx="${w * 0.5}" cy="${h * 0.5}" r="${(k + 1) * Math.min(w, h) * 0.09}"/>`).join("\n    ")}
  </g>
  <text x="${w / 2}" y="${h / 2}" fill="#ffffff" fill-opacity="0.8" text-anchor="middle" dominant-baseline="central"
        font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.05)}"
        letter-spacing="${Math.round(Math.min(w, h) * 0.008)}" font-weight="500">${esc(label)}</text>
</svg>`
  );
}

const events = [
  ["vibe-coding", "Vibe Coding"],
  ["generative-ai-workshop", "Generative AI Workshop"],
  ["industry-interaction", "Industry Interaction"],
  ["open-source-clinic", "Open Source Clinic"],
  ["cloud-foundations", "Cloud Foundations"],
  ["cyber-security-primer", "Security Primer"],
];
events.forEach(([slug, label], i) => {
  placeholder(`public/images/events/${slug}.svg`, 1600, 1000, label, i);
  placeholder(`public/images/events/${slug}-1.svg`, 1200, 900, `${label} — gallery 01`, i + 1);
  placeholder(`public/images/events/${slug}-2.svg`, 1200, 900, `${label} — gallery 02`, i + 2);
  placeholder(`public/images/events/${slug}-3.svg`, 1200, 900, `${label} — gallery 03`, i + 3);
});

[
  ["session", 1800, 1125, "Session in progress"],
  ["lab", 1000, 1250, "Hands-on lab"],
  ["questions", 1400, 875, "Speaker questions"],
  ["break", 900, 1125, "Between sessions"],
].forEach(([n, w, h, l], i) => placeholder(`public/images/moments/${n}.svg`, w, h, l, i + 2));

Array.from({ length: 8 }, (_, i) =>
  placeholder(`public/images/team/member-${String(i + 1).padStart(2, "0")}.svg`, 900, 1125, "Portrait", i)
);

console.log("assets generated");
