"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Why is it free?", href: "#why-free" },
  { label: "Members' Results", href: "#results" },
  { label: "Our Services", href: "#services" },
  { label: "Who is Leannard?", href: "#leannard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* outer glow strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-sky-500/20 to-transparent blur-2xl" />

      <nav
        className="
          mx-auto mt-3 w-[min(1200px,calc(100%-24px))]
          rounded-2xl border border-white/10
          bg-gradient-to-r from-[#042235]/95 via-[#07324a]/90 to-[#0a4b6b]/95
          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
        "
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-6">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-wide text-white"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
              {/* simple logo mark */}
              <span className="text-sm">S</span>
            </span>
            <span className="text-sm lg:text-base">
              <span className="opacity-90">SIGNALS</span>
              <span className="opacity-60">2</span>
              <span className="opacity-90">TRADE</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  text-sm font-medium text-white/85
                  hover:text-white transition
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#join"
              className="
                hidden lg:inline-flex
                items-center justify-center
                rounded-full px-5 py-2
                text-sm font-semibold text-white
                bg-gradient-to-r from-emerald-400 to-emerald-600
                hover:brightness-110 transition
                shadow-[0_10px_25px_rgba(16,185,129,0.25)]
                ring-1 ring-white/10
              "
            >
              Join the free group
            </a>

            {/* Mobile button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="
                inline-flex lg:hidden
                h-10 w-10 items-center justify-center
                rounded-xl bg-white/10 ring-1 ring-white/15
                text-white/90 hover:text-white transition
              "
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {/* hamburger / close */}
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4">
            <div className="mt-2 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="flex flex-col">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="
                      px-4 py-3 text-sm font-medium
                      text-white/85 hover:text-white
                      hover:bg-white/5 transition
                      first:rounded-t-2xl last:rounded-b-2xl
                    "
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="
                mt-3 inline-flex w-full
                items-center justify-center
                rounded-full px-5 py-2
                text-sm font-semibold text-white
                bg-gradient-to-r from-emerald-400 to-emerald-600
                hover:brightness-110 transition
                shadow-[0_10px_25px_rgba(16,185,129,0.25)]
                ring-1 ring-white/10
              "
            >
              Join the free group
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}