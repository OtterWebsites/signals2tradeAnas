"use client";

import React, { useEffect, useMemo, useState } from "react";

const benefits = [
  "Free access to my trading group",
  "Free access to countless trading ideas every week",
  "Free access to countless trading ideas every week",
  "Free access to my 5-hour trading course",
  "A large community of traders from the DACH region (Germany, Austria, Switzerland).",
];

const COUNTDOWN_SECONDS = 15 * 60;
const STORAGE_KEY = "bonus_countdown_expires_at_v1";

// Full world countries list (common English names)
const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Congo (Democratic Republic of the Congo)",
  "Costa Rica",
  "Cote d’Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. “Swaziland”)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function formatTime(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function CreateAccountSection() {
  // form state
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // ui state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; msg: string }>(null);

  // countdown state (per session, for urgency only)
  const [remaining, setRemaining] = useState<number>(COUNTDOWN_SECONDS);

  useEffect(() => {
    try {
      const now = Date.now();
      const stored = sessionStorage.getItem(STORAGE_KEY);
      let expiresAt = stored ? Number(stored) : NaN;

      if (!stored || Number.isNaN(expiresAt) || expiresAt <= now) {
        expiresAt = now + COUNTDOWN_SECONDS * 1000;
        sessionStorage.setItem(STORAGE_KEY, String(expiresAt));
      }

      const tick = () => {
        const diffSec = Math.ceil((expiresAt - Date.now()) / 1000);
        setRemaining(Math.max(0, diffSec));
      };

      tick();
      const id = window.setInterval(tick, 1000);
      return () => window.clearInterval(id);
    } catch {
      const id = window.setInterval(() => {
        setRemaining((r) => Math.max(0, r - 1));
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, []);

  // Keep label always same (no "Offer ended")
  const countdownLabel = useMemo(() => {
    return `Offer ends in ${formatTime(remaining)}`;
  }, [remaining]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const payload = { firstName, lastName, email, phone, country };

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({ type: "error", msg: data?.message || "Something went wrong." });
        return;
      }

      setStatus({ type: "success", msg: "Registered successfully!" });

      setCountry("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Card wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* dotted background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative p-8 sm:p-12">
            {/* TOP: Promo + Countdown (centered) */}
            <div className="mx-auto w-full max-w-3xl">
              <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-6 py-5 shadow-sm">
                <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />
                <div className="absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-sky-200/30 blur-2xl" />

                <p className="relative text-center text-sm font-semibold leading-snug text-gray-900 sm:text-base">
                  TO SECURE A UNIQUE{" "}
                  <span className="text-emerald-700">200% WITHDRAWABLE</span> TRADING BONUS —{" "}
                  <span className="underline decoration-emerald-300 underline-offset-4">
                    REGISTER NOW
                  </span>{" "}
                  AND WE WILL CONTACT YOU
                </p>

                <div className="relative mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {countdownLabel}
                  </div>

                  <div
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold tabular-nums text-emerald-800"
                    aria-live="polite"
                  >
                    {formatTime(remaining)}
                  </div>
                </div>

                <p className="relative mt-3 text-center text-xs text-gray-600">
                  Limited-time bonus window. Register to secure your spot.
                </p>
              </div>
            </div>

            {/* Divider spacing */}
            <div className="h-10" />

            {/* BOTTOM: Left benefits + Right form (same level) */}
            <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Left: benefits */}
              <div className="flex h-full items-start">
                <div className="w-full max-w-lg space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    ✓ 100% Free access
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    What you get for free
                  </h2>

                  <ul className="space-y-5 pt-4">
                    {benefits.map((text, idx) => (
                      <li key={`${idx}-${text}`} className="flex items-start gap-4">
                        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                          ✓
                        </span>
                        <p className="text-base leading-relaxed text-gray-700">{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: form */}
              <div className="flex h-full items-start justify-center lg:justify-end">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Create account
                  </h3>

                  <form onSubmit={onSubmit} className="mt-6">
                    <div className="space-y-4">
                      {/* Country */}
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                          className="h-14 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-200"
                        >
                          <option value="" disabled>
                            Select country of residence...
                          </option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>

                        {/* dropdown chevron */}
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M7 10l5 5 5-5"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>

                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                      </div>

                      {/* First name */}
                      <div className="relative">
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          placeholder="Enter first name..."
                          className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                      </div>

                      {/* Last name */}
                      <div className="relative">
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          placeholder="Enter last name..."
                          className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          type="email"
                          placeholder="Enter email address..."
                          className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          type="tel"
                          placeholder="Enter phone number..."
                          className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                      </div>

                      {/* Status message */}
                      {status && (
                        <div
                          className={[
                            "rounded-2xl border px-4 py-3 text-sm",
                            status.type === "success"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                              : "border-red-200 bg-red-50 text-red-800",
                          ].join(" ")}
                        >
                          {status.msg}
                        </div>
                      )}

                      {/* Terms (NOT marked out => keep/add) */}
                      <p className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-[12px] leading-relaxed text-gray-700">
                        I hereby verify that I am 18 years or older, I have read and accept your{" "}
                        <a
                          className="text-sky-600 underline"
                          href="#"
                          target="_blank"
                          rel="noreferrer"
                        >
                          General Terms &amp; Conditions of Tauro Markets
                        </a>
                        ,{" "}
                        <a
                          className="text-sky-600 underline"
                          href="#"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Legal Documents
                        </a>
                        ,{" "}
                        <a
                          className="text-sky-600 underline"
                          href="#"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Personal Data Protection
                        </a>
                        .
                      </p>

                      {/* Register button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-sky-400 text-base font-semibold text-white shadow-[0_12px_30px_rgba(56,189,248,0.35)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M10 17l5-5-5-5"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>

                      {/* Footer note */}
                      <p className="pt-2 text-center text-xs leading-relaxed text-gray-500">
                        Your details will be forwarded to the webinar organizer, who might
                        communicate with you regarding this event or their services
                      </p>

                      <p className="text-center text-[11px] leading-relaxed text-gray-400">
                        Bonus terms may apply. Our team will contact you after registration.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* END bottom grid */}
          </div>
        </div>
      </div>
    </section>
  );
}
