import Image from "next/image";

/**
 * The chapter emblem, held still in the sky. A soft radial lift sits behind it
 * so the fine ring lettering stays readable wherever the clouds fall.
 */
export function CSIMark() {
  return (
    <div className="relative flex justify-center">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.8), rgba(255,255,255,0))",
        }}
      />
      <Image
        src="/images/brand/csi-emblem.png"
        alt="Computer Society of India emblem"
        width={447}
        height={447}
        priority
        className="relative w-[min(56vw,28vh,15rem)] drop-shadow-[0_18px_40px_rgba(18,38,92,0.28)] sm:w-[min(28vw,26vh,17rem)]"
      />
    </div>
  );
}
