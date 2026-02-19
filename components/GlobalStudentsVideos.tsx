"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

// ✅ Client-provided Wistia video IDs + captions (ADD caption here)
const wistiaVideos = [
  {
    id: "zuiyqothgc",
    aspect: "0.5625",
    caption:
      "Day trading requires discipline. Once I controlled my emotions, my success rate improved.",
  },
  {
    id: "kh0l7jgfbr",
    aspect: "0.5660377358490566",
    caption:
      "Trading changed my life! Started small, learned risk management, and now making consistent profits",
  },
  {
    id: "d2ghybfjp5",
    aspect: "0.565625",
    caption:
      "Tried copy trading, and it helped me earn strategies while earning side income.",
  },
  {
    id: "tzph98ssw0",
    aspect: "0.5555555555555556",
    caption:
      "Stock trading has helped me build wealth over time. Investing in fundamentally strong companies and holding for the long term has been my best decision.",
  },
  {
    id: "9rsfpoe0mf",
    aspect: "0.565625",
    caption:
      "Lost money in the beginning, but after proper education, I'm now seeing great returns!",
  },
  {
    id: "lrsknsyqvg",
    aspect: "0.565625",
    caption:
      "Crypto trading is wild! Made 5x profit in a month but also faced heavy losses—research is key",
  },
];


function ensureScript(src: string, type?: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (type) s.type = type;
  document.body.appendChild(s);
}

/* ---------------- HD THUMBNAIL LOGIC ---------------- */

function wistiaFallback(mediaId: string) {
  return `https://fast.wistia.com/embed/medias/${mediaId}/swatch?image_crop_resized=1600x2133&image_quality=100`;
}

function toHd(url: string) {
  const u = new URL(url);
  u.searchParams.set("image_crop_resized", "1600x2133");
  u.searchParams.set("image_quality", "100");
  return u.toString();
}

async function fetchHdThumb(mediaId: string, signal?: AbortSignal) {
  const wistiaUrl = `https://home.wistia.com/medias/${mediaId}`;
  const endpoint = `https://fast.wistia.com/oembed?url=${encodeURIComponent(
    wistiaUrl
  )}&format=json`;

  const res = await fetch(endpoint, { signal });
  if (!res.ok) throw new Error("oEmbed failed");

  const data = await res.json();
  if (!data.thumbnail_url) throw new Error("No thumbnail");

  return toHd(data.thumbnail_url);
}

const thumbCache = new Map<string, string>();

/* ---------------- COMPONENT ---------------- */

export default function GlobalStudentsVideos() {
  const [active, setActive] = useState<string | null>(null);
  const [activeAspect, setActiveAspect] = useState<string>("0.5625");

  useEffect(() => {
    ensureScript("https://fast.wistia.com/player.js");
  }, []);

  useEffect(() => {
    if (!active) return;
    ensureScript(`https://fast.wistia.com/embed/${active}.js`, "module");
  }, [active]);

  const renderEmbed = (id: string, aspect: string) => `
    <style>
      wistia-player[media-id='${id}']:not(:defined) {
        background: center / cover no-repeat url('${wistiaFallback(id)}');
        display: block;
        padding-top: ${100 / Number(aspect)}%;
      }
      wistia-player[media-id='${id}'] {
        width: 100%;
        height: 100%;
        display: block;
      }
    </style>
    <wistia-player media-id="${id}" aspect="${aspect}"></wistia-player>
  `;

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
          {wistiaVideos.map((v) => (
            <VideoCard
              key={v.id}
              mediaId={v.id}
              aspect={v.aspect}
              caption={v.caption}
              onClick={() => {
                setActive(v.id);
                setActiveAspect(v.aspect);
              }}
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

            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: renderEmbed(active, activeAspect),
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Video Card with HD Thumb + GREEN CAPTION BAR ---------------- */

function VideoCard({
  mediaId,
  aspect,
  caption,
  onClick,
}: {
  mediaId: string;
  aspect: string;
  caption: string;
  onClick: () => void;
}) {
  const [src, setSrc] = useState<string>(
    thumbCache.get(mediaId) || wistiaFallback(mediaId)
  );
  const tried = useRef(false);

  useEffect(() => {
    if (thumbCache.has(mediaId)) {
      setSrc(thumbCache.get(mediaId)!);
      return;
    }
    if (tried.current) return;
    tried.current = true;

    const controller = new AbortController();

    fetchHdThumb(mediaId, controller.signal)
      .then((hd) => {
        thumbCache.set(mediaId, hd);
        setSrc(hd);
      })
      .catch(() => {
        // fallback already set
      });

    return () => controller.abort();
  }, [mediaId]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] w-full">
        <img
          src={src}
          alt="Student video"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setSrc(wistiaFallback(mediaId))}
        />

        {/* ✅ Green caption bar (bottom) */}
        <div className="absolute inset-x-0 bottom-0 bg-emerald-500 px-4 pb-4 pt-10">
          <p className="text-center text-[13px] font-medium leading-snug text-white/95">
            &quot;{caption}&quot;
          </p>
        </div>

        {/* ✅ Play button (overlapping caption bar like screenshot) */}
        <div className="absolute left-1/2 bottom-[72px] -translate-x-1/2">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-[0_15px_35px_rgba(16,185,129,0.35)] transition group-hover:scale-105">
            <Play className="h-9 w-9 text-white" fill="white" />
          </span>
        </div>
      </div>
    </button>
  );
}
