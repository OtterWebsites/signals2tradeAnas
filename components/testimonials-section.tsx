"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
    date: " 13 hours ago",
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
    text:
      "Very smooth experience overall. The guidance and structure is clear...",
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
    text:
      "I stay in Cyprus how can I start I don't have...",
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
   {
    stars: 5,
    title: "I love this community",
    text:
      "This is just here to ensure the column is long enough to trigger the scrollbar functionality you requested...",
    name: "Another User.",
    date: "December 22",
  },
  {
    stars: 5,
    title: "more losses than wins",
    text:
      "How are there no negative reviews. ive set these up on a copier so enter each trade go to breakeven as soon as tp1 hits. they send 5 trades a day some win but majority lose. ive been at a loss everyday...",
    name: "Paul Darnbrook.",
    date: "Jun 11, 2025",
  },
   {
    stars: 5,
    title: "They are quite knowledgable and help me",
    text:
      "They are quite knowledgable and help me understand what is being done with the trades...",
    name: "B Repi.",
    date: "Sep 17, 2024",
  },
];;

const REVIEW_LINK = "https://www.trustpilot.com/review/signals2trade.com";

function StarsRow({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <span
            key={i}
            className={[
              "inline-flex items-center justify-center",
              "h-6 w-6 rounded-[2px]",
              filled ? "bg-emerald-500" : "bg-emerald-500/20",
            ].join(" ")}
            aria-hidden="true"
          >
            <Star
              className={filled ? "h-4 w-4 text-white" : "h-4 w-4 text-emerald-500"}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </span>
        );
      })}
    </div>
  );
}

export function TestimonialsSection() {
  const [filter, setFilter] = useState<"4-5" | "5">("4-5");

  const filtered = useMemo(() => {
    if (filter === "5") return reviews.filter((r) => r.stars === 5);
    return reviews.filter((r) => r.stars >= 4);
  }, [filter]);

  return (
    <section className="relative w-full bg-white py-12">
      {/* subtle background */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 opacity-40">
          <GridPattern
            width={28}
            height={28}
            x={0}
            y={0}
            strokeDasharray="3"
            className="stroke-gray-300/40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/60 to-white" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Excellent
              </h2>

              <StarsRow value={4} />
              
            </div>

            <p className="text-sm text-gray-700">
              Rated <span className="font-semibold">4.4</span> / 5 based on{" "}
              <a href="#" className="font-semibold underline underline-offset-2">
                2,493 reviews
              </a>{" "}
              on{" "}
              <a href="#" className="font-semibold text-emerald-600 underline underline-offset-2">
                ★ Trustpilot
              </a>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setFilter("4-5")}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                filter === "4-5"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              Showing our 4 & 5 star reviews
            </button>

          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((r, idx) => (
           <motion.article
  key={idx}
  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.05 * idx }}
  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
>
  <StarsRow value={r.stars} />

  {/* Name + Date */}
  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
    <span className="font-semibold text-gray-700">{r.name}</span>
    <span>{r.date}</span>
  </div>

  <h3 className="mt-3 text-base font-extrabold leading-snug text-gray-900">
    {r.title}
  </h3>

  <p className="mt-2 text-sm leading-relaxed text-gray-700">
    {r.text}
  </p>
<a
  href={REVIEW_LINK}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-block text-sm font-semibold text-emerald-600 underline underline-offset-4"
>
  Read more
</a>
</motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}