"use client";

import React, { useMemo, useState } from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Star } from "lucide-react";

type Review = {
  stars: 4 | 5;
  title: string;
  text: string;
  name: string;
  date: string;
};

const reviews: Review[] = [
  {
    stars: 5,
    title: "Just insane how accurate they can be!",
    text:
      "Just insane how accurate they can be. Both Fred and YVM. I had blown my account a few times for greediness and in moments i didn't follow the right signals but i can say that...",
    name: "Rafael Belo.",
    date: "13 hours ago",
  },
  {
    stars: 5,
    title: "I thought it was too good to be true but it's LEGIT.",
    text:
      "I literally thought it was too good to be true but these guys are LEGIT! Harje AKA YVM is the most awesome gold...",
    name: "Laura Rose.",
    date: "19 hours ago",
  },
  {
    stars: 5,
    title: "Waqasqureshi",
    text: "Very smooth experience overall. The guidance and structure is clear...",
    name: "Waqasqureshi.",
    date: "December 25",
  },
  {
    stars: 5,
    title: "19 year old Australian making 5k/week minimum",
    text:
      "The community support alone makes this worth it. Everyone helps each other...",
    name: "Kai Callaway.",
    date: "December 24",
  },
  {
    stars: 4,
    title: "I stay in Cyprus how can I start I.",
    text: "I stay in Cyprus how can I start I don't have...",
    name: "Sanie Mansaray.",
    date: "January 3",
  },
  {
    stars: 5,
    title: "How to trade",
    text:
      "Well the company doesn't make things hard for new traders that wants to pop up...",
    name: "Lechuti Lehlohonolo.",
    date: "3 days ago",
  },
  {
    stars: 5,
    title: "Great training and signals",
    text:
      "I recently joined the community and the amount of training and value provided for free is amazing...",
    name: "Jessica.",
    date: "January 8",
  },
];

const REVIEW_LINK = "https://www.trustpilot.com/review/signals2trade.com";

// ⭐ Stars
function StarsRow({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <span
            key={i}
            className={`h-6 w-6 rounded-[2px] flex items-center justify-center ${
              filled ? "bg-emerald-500" : "bg-emerald-500/20"
            }`}
          >
            <Star
              className={filled ? "h-4 w-4 text-white" : "h-4 w-4 text-emerald-500"}
              fill={filled ? "currentColor" : "none"}
            />
          </span>
        );
      })}
    </div>
  );
}

export function TestimonialsSection() {
  // show-more behavior
  const INITIAL_COUNT = 3; // start with 3 reviews
  const STEP = 3; // each "show more" adds 3
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const canShowMore = visibleCount < reviews.length;

  const visibleReviews = useMemo(() => {
    return reviews.slice(0, visibleCount);
  }, [visibleCount]);

  const onShowMore = () => setVisibleCount((c) => Math.min(reviews.length, c + STEP));
  const onShowLess = () => setVisibleCount(INITIAL_COUNT);

  return (
    <section className="relative w-full bg-white py-12">
      {/* background */}
      <div aria-hidden className="absolute inset-0">
        <GridPattern
          width={28}
          height={28}
          strokeDasharray="3"
          className="stroke-gray-300/40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/70 to-white" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-4">
            <h2 className="text-4xl font-extrabold text-gray-900">Excellent</h2>
            <StarsRow value={4} />
          </div>

          <p className="mt-2 text-sm text-gray-700">
            Rated <span className="font-semibold">4.4</span> / 5 on{" "}
            <a
              href={REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 underline"
            >
              Trustpilot
            </a>
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {visibleReviews.map((r, i) => (
            <article
              key={i}
              className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <StarsRow value={r.stars} />

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{r.name}</span>
                <span>{r.date}</span>
              </div>

              <h3 className="mt-3 font-extrabold text-gray-900">{r.title}</h3>

              <p className="mt-2 text-sm text-gray-700">{r.text}</p>

              <a
                href={REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-emerald-600 underline"
              >
                Read more
              </a>
            </article>
          ))}
        </div>

        {/* Show More / Show Less */}
        <div className="mt-10 flex flex-col items-center gap-3">
          {canShowMore ? (
            <button
              onClick={onShowMore}
              className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              Show more
            </button>
          ) : (
            <button
              onClick={onShowLess}
              className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              Show less
            </button>
          )}

         
        </div>
      </div>
    </section>
  );
}