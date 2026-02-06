"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";

type VideoItem = {
  id: string;
  src: string;
};

const videos: VideoItem[] = [
  { id: "s1", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387491/v1_urrlnz.mp4" },
  { id: "s2", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387641/v2_d3giow.mp4" },
  { id: "s3", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387712/v3_xtwrkz.mp4" },
  { id: "s4", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387773/v4_yvxbmo.mp4" },
  { id: "s5", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387828/v5_enbv51.mp4" },
  { id: "s6", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387880/v6_ywiwjt.mp4" },
];

function VideoThumb({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl bg-gray-200 shadow-md"
    >
      {/* Aspect ratio portrait */}
      <div className="relative aspect-[3/4] w-full">
        {/* Video used as thumbnail only */}
        <video
          src={src}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-[0_15px_35px_rgba(16,185,129,0.35)] transition group-hover:scale-105">
            <Play className="h-8 w-8 text-white" fill="white" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function GlobalStudentsVideos() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold tracking-wide text-gray-900 sm:text-2xl">
            STUDENTS FROM ALL AROUND THE WORLD SAY
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-40 bg-emerald-500" />
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <VideoThumb
              key={v.id}
              src={v.src}
              onClick={() => setActive(v.src)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <video
              src={active}
              controls
              autoPlay
              playsInline
              className="w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}