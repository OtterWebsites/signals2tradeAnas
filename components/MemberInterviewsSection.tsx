"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";

type VideoItem = {
  id: string;
  src: string;      // mp4/webm url
  title?: string;   // optional
};

const videos: VideoItem[] = [
  { id: "v1", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386451/v1_f1nb7i.mp4" },
  { id: "v2", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386612/v2_eftoz9.mp4" },
  { id: "v3", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386692/v3_fwstrp.mp4" },
  { id: "v4", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386847/v4_r1xuas.mp4" },
  { id: "v5", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386966/v5_s91owc.mp4" },
  { id: "v6", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387053/v6_ncfpw2.mp4" },
  { id: "v7", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387139/v7_tbjuhx.mp4" },
  { id: "v8", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387209/v8_dwslef.mp4" },
  { id: "v9", src: "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770387322/v9_xgogx4.mp4" },
];

// Generate poster from first frame (client-side)
function useVideoPoster(src: string) {
  const [poster, setPoster] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function makePoster() {
      try {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous"; // works if CDN allows CORS
        video.src = src;
        video.muted = true;
        video.playsInline = true;

        await new Promise<void>((resolve, reject) => {
          video.addEventListener("loadeddata", () => resolve(), { once: true });
          video.addEventListener("error", () => reject(new Error("video error")), { once: true });
        });

        // jump slightly to ensure frame is ready
        try {
          video.currentTime = 0.1;
        } catch {}

        await new Promise<void>((resolve) => {
          video.addEventListener("seeked", () => resolve(), { once: true });
          // fallback if seek doesn't fire
          setTimeout(() => resolve(), 200);
        });

        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 360;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);

        if (!cancelled) setPoster(dataUrl);
      } catch {
        // fallback: no poster (we'll show gradient)
        if (!cancelled) setPoster(null);
      }
    }

    makePoster();
    return () => {
      cancelled = true;
    };
  }, [src]);

  return poster;
}

function VideoCard({
  item,
  onClick,
}: {
  item: VideoItem;
  onClick: (src: string) => void;
}) {
  const poster = useVideoPoster(item.src);

  return (
    <button
      type="button"
      onClick={() => onClick(item.src)}
      className="group relative w-full overflow-hidden rounded-2xl bg-black shadow-[0_12px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/10"
    >
      <div className="relative aspect-video w-full">
        {/* Poster / fallback */}
        {poster ? (
          <img
            src={poster}
            alt={item.title ?? "Interview video"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-100" />
        )}

        {/* Dark top strip like screenshot */}
        <div className="absolute inset-x-0 top-0 h-12 bg-black/80" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-[0_15px_35px_rgba(16,185,129,0.35)] transition group-hover:scale-105">
            <Play className="h-8 w-8 text-white" fill="white" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function MemberInterviewsSection() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const title = useMemo(() => "Interviews with Members", []);

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-wide text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-40 bg-emerald-500" />
        </div>

        {/* Grid (Responsive) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <VideoCard key={v.id} item={v} onClick={setActiveSrc} />
          ))}
        </div>
      </div>

      {/* Modal Player (Lazy load actual video) */}
      {activeSrc && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveSrc(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveSrc(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <video
              src={activeSrc}
              controls
              autoPlay
              playsInline
              className="block h-auto w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}