"use client";

import { useMemo, useState } from "react";
import { EventsGrid } from "./EventsGrid";
import {
  eventCategories,
  type ChapterEvent,
  type EventCategory,
} from "@/data/events";

export function EventsExplorer({ events }: { events: ChapterEvent[] }) {
  const [filter, setFilter] = useState<"All" | EventCategory>("All");

  const visible = useMemo(
    () =>
      filter === "All" ? events : events.filter((e) => e.category === filter),
    [events, filter]
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter sessions by type"
        className="flex flex-wrap gap-2 border-t border-navy/12 pt-8"
      >
        {eventCategories.map((category) => {
          const active = category === filter;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-[0.875rem] tracking-[-0.01em] transition-colors duration-300 ${
                active
                  ? "bg-navy text-cream"
                  : "text-navy/70 ring-1 ring-navy/12 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-14">
        <EventsGrid events={visible} priorityCount={3} />
      </div>
    </>
  );
}
