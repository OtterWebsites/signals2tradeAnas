"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, X } from "lucide-react";

type VideoItem = {
  id: string;
  type: "wistia";
  mediaId: string;
  aspect: string;
  title?: string;
};

const videos: VideoItem[] = [
  { id: "w1", type: "wistia", mediaId: "s7i53j4klc", aspect: "1.7777777777777777" },
  { id: "w2", type: "wistia", mediaId: "tcksbcif7x", aspect: "1.7777777777777777" },
  { id: "w3", type: "wistia", mediaId: "o2h63xj3j7", aspect: "1.7777777777777777" },
  { id: "w4", type: "wistia", mediaId: "c5hqs1fcnq", aspect: "1.7777777777777777" },
  { id: "w5", type: "wistia", mediaId: "m2ugsq0gwh", aspect: "1.7777777777777777" },
  { id: "w6", type: "wistia", mediaId: "mxhauwls7d", aspect: "1.7777777777777777" },
  { id: "w7", type: "wistia", mediaId: "och156vzt8", aspect: "1.7777777777777777" },
  { id: "w8", type: "wistia", mediaId: "hu43a5dzh4", aspect: "1.7777777777777777" },
  { id: "w9", type: "wistia", mediaId: "6pc4oupbrm", aspect: "1.7777777777777777" },
];

type ActiveState = { mediaId: string; aspect: string } | null;

function ensureScript(src: string, type?: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (type) s.type = type;
  document.body.appendChild(s);
}

// ✅ Fallback (works even if oEmbed fails)
function wistiaSwatchHd(mediaId: string) {
  return `https://fast.wistia.com/embed/medias/${mediaId}/swatch?image_crop_resized=1920x1080&image_quality=100`;
}

/**
 * ✅ Convert any Wistia image URL into true HD size/quality
 * Keeps host/path, just applies Wistia image params.
 */
function toHdImageUrl(url: string, w = 1920, h = 1080) {
  try {
    const u = new URL(url);
    // Force crop resized for sharp 16:9 and max quality
    u.searchParams.set("image_crop_resized", `${w}x${h}`);
    u.searchParams.set("image_quality", "100");
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * ✅ oEmbed thumbnail fetch (client-side)
 * Returns a sharp still (thumbnail_url) if public/available.
 */
async function fetchWistiaThumbFromOembed(mediaId: string, signal?: AbortSignal) {
  const wistiaMediaUrl = `https://home.wistia.com/medias/${mediaId}`;
  const endpoint = `https://fast.wistia.com/oembed?url=${encodeURIComponent(
    wistiaMediaUrl
  )}&format=json`;

  const res = await fetch(endpoint, { signal });
  if (!res.ok) throw new Error(`oEmbed failed: ${res.status}`);
  const data = (await res.json()) as { thumbnail_url?: string };

  if (!data.thumbnail_url) throw new Error("No thumbnail_url in oEmbed response");
  return toHdImageUrl(data.thumbnail_url, 1920, 1080);
}

// ✅ simple in-memory cache so we don't refetch thumbnails
const thumbCache = new Map<string, string>();

function VideoCard({ mediaId, onClick }: { mediaId: string; onClick: () => void }) {
  const [src, setSrc] = useState<string>(() => thumbCache.get(mediaId) || wistiaSwatchHd(mediaId));
  const [isLoaded, setIsLoaded] = useState(false);
  const triedRef = useRef(false);

  useEffect(() => {
    if (thumbCache.has(mediaId)) {
      setSrc(thumbCache.get(mediaId)!);
      return;
    }
    if (triedRef.current) return;
    triedRef.current = true;

    const controller = new AbortController();

    fetchWistiaThumbFromOembed(mediaId, controller.signal)
      .then((hd) => {
        thumbCache.set(mediaId, hd);
        setSrc(hd);
      })
      .catch(() => {
        // fallback stays swatch (already set)
      });

    return () => controller.abort();
  }, [mediaId]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl bg-black shadow-[0_12px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/10"
    >
      <div className="relative aspect-video w-full">
        {/* ✅ Always show something (no black flash) */}
        {!isLoaded && <div className="absolute inset-0 bg-black" />}

        <img
          src={src}
          alt="Interview video"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            // If oEmbed thumb breaks for some reason, fallback to swatch
            const fallback = wistiaSwatchHd(mediaId);
            setSrc(fallback);
          }}
        />

        {/* Dark top strip */}
        <div className="absolute inset-x-0 top-0 h-12 bg-black/80" />

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

export default function MemberInterviewsSection() {
  const [active, setActive] = useState<ActiveState>(null);
  const title = useMemo(() => "Interviews with Members", []);

  useEffect(() => {
    ensureScript("https://fast.wistia.com/player.js");
  }, []);

  useEffect(() => {
    if (!active) return;
    ensureScript(`https://fast.wistia.com/embed/${active.mediaId}.js`, "module");
  }, [active]);

  const renderWistiaEmbed = (mediaId: string, aspect: string) => `
    <style>
      /* ✅ Use same HD swatch as placeholder while player loads */
      wistia-player[media-id='${mediaId}']:not(:defined) {
        background: center / cover no-repeat url('${wistiaSwatchHd(mediaId)}');
        display: block;
        padding-top: 56.25%;
      }
      wistia-player[media-id='${mediaId}']{
        width:100%;
        height:100%;
        display:block;
      }
    </style>
    <wistia-player media-id="${mediaId}" aspect="${aspect}"></wistia-player>
  `;

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-wide text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-40 bg-emerald-500" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <VideoCard
              key={v.id}
              mediaId={v.mediaId}
              onClick={() => setActive({ mediaId: v.mediaId, aspect: v.aspect })}
            />
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="block h-auto w-full"
              dangerouslySetInnerHTML={{
                __html: renderWistiaEmbed(active.mediaId, active.aspect),
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
