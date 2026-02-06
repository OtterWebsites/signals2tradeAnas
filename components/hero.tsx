"use client";

import React, { useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    const nextMuted = !muted;
    v.muted = nextMuted;
    setMuted(nextMuted);

    // If user unmuted, make sure it plays (some browsers require user gesture)
    if (!nextMuted) {
      v.play().catch(() => {});
    }
  };

  return (
    <section className="w-full bg-white mt-25">
      {/* Top Trust Bar */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <span className="text-sm text-gray-600">Our customers say</span>
            <span className="text-sm font-semibold text-gray-900">Excellent</span>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-[2px] bg-emerald-500 text-white text-[12px] leading-none"
                  aria-hidden="true"
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

      {/* Video Block */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mx-auto w-full overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          <div className="relative w-full">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386157/hero_amjfbp.webm"
              autoPlay
              loop
              muted={muted}
              playsInline
              controls
              preload="metadata"
              className="
                block w-full object-cover
                h-[240px] sm:h-[320px] md:h-[470px] lg:h-[590px]
              "
            />

            
          </div>
        </div>
      </div>
    </section>
  );
}