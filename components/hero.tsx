"use client";

import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full bg-white mt-10 md:mt-16">
      {/* Top Trust Bar */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center mt-25 md:mt-5">
            <span className="text-sm text-gray-600">Our customers say</span>
            <span className="text-sm font-semibold text-gray-900">Excellent</span>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="inline-flex h-5 w-5 items-center justify-center bg-emerald-500 text-white text-[12px]"
                >
                  ★
                </span>
              ))}
            </div>

            <span className="text-sm text-gray-600">
              4.5 out of 5 based on 2,386 reviews
            </span>

            <span className="flex items-center gap-1 text-sm font-semibold text-gray-900">
              <span className="text-emerald-500">★</span> Trustpilot
            </span>
          </div>
        </div>
      </div>

      {/* Video Section (Native Controls) */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mx-auto w-full">
          <video
            className="w-full h-[240px] sm:h-[320px] md:h-[470px] lg:h-[590px] object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source
              src="https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386157/hero_amjfbp.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
