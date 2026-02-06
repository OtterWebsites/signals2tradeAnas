"use client";

import React, { useState } from "react";

type Country = "Austria" | "Switzerland" | "Germany";

const benefits = [
  "Free access to my trading group",
  "Free access to countless trading ideas every week",
  "Free access to my 5-hour trading course",
  "A large community of traders from the DACH region (Germany, Austria, Switzerland).",
];

const countries: { name: Country; code: string; flag: string }[] = [
  { name: "Austria", code: "AT", flag: "🇦🇹" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
];

export default function CreateAccountSection() {
  const [active, setActive] = useState<Country>("Austria");

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Card wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* dotted background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: benefits */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                ✓ 100% Free access
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                What you get for free
              </h2>

              <ul className="mt-4 space-y-4">
                {benefits.map((text, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: create account */}
            <div className="flex flex-col justify-center">
              <h3 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create account
              </h3>

              <p className="mt-3 text-center text-sm text-gray-600 sm:text-base">
                Choose your country to continue.
              </p>

              {/* Buttons */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {countries.map((c) => {
                  const isActive = active === c.name;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setActive(c.name)}
                      className={[
                        "group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
                        "border bg-white shadow-sm",
                        isActive
                          ? "border-emerald-500 ring-2 ring-emerald-200"
                          : "border-emerald-300/70 hover:border-emerald-500",
                        "focus:outline-none focus:ring-2 focus:ring-emerald-300",
                      ].join(" ")}
                      aria-pressed={isActive}
                    >
                      <span className="text-lg" aria-hidden="true">
                        {c.flag}
                      </span>
                      <span className="text-gray-900">{c.name}</span>

                      {/* subtle hover glow */}
                      <span
                        className={[
                          "pointer-events-none absolute inset-0 rounded-full opacity-0 transition",
                          isActive ? "opacity-100" : "group-hover:opacity-100",
                        ].join(" ")}
                        style={{
                          boxShadow: "0 0 0 4px rgba(16,185,129,0.10)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Optional CTA below buttons */}
              <div className="mt-6 flex justify-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.25)] hover:brightness-110 transition"
                >
                  Continue
                </a>
              </div>

              <p className="mt-3 text-center text-xs text-gray-500">
                By continuing, you agree to our terms & privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}