import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h1";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      {eyebrow ? (
        <span className="text-eyebrow font-medium uppercase text-slate-blue">
          {eyebrow}
        </span>
      ) : null}
      <Tag className="max-w-[18ch] text-headline font-normal text-balance text-navy">
        {title}
      </Tag>
      {lead ? (
        <p
          className={`text-lead max-w-[54ch] text-slate-blue ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
