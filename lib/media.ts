/**
 * Vector art (the emblem, the sky, the placeholder frames) gains nothing from
 * the image optimizer — it is already small and resolution-independent — so it
 * is served straight from /public. Photographs still go through Next/Image.
 */
export const isVector = (src: string) => src.endsWith(".svg");
