"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-b from-[#061c2f] to-[#041726] text-gray-300">
      {/* Top shadow */}
      <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Forex</li>
              <li>Metals</li>
              <li>Indices</li>
              <li>Bonds</li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Platforms
            </h4>
            <ul className="space-y-2 text-sm">
              <li>App</li>
              <li>MT4</li>
              <li>MT5</li>
              <li>WebTrader</li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Learn
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Academy</li>
              <li>Webinars</li>
              <li>Tutorials</li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Corporate
            </h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
              <li>ESG</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Legal content */}
        <div className="space-y-6 text-[17px] leading-relaxed text-gray-400">
          <p>
            <span className="font-semibold text-gray-300">SIGNAL2TRADE</span> is a marketing/affiliate business registered at #10 Manoel Street, Castries, St.Lucia. Content is for informational and promotional purposes only.
          </p>

          <p>
            We are not the broker, not financial advisers, and we do not execute orders, manage accounts, or hold client funds. Client funds are held by the broker (the relevant legal entity) in segregated client/trust accounts where applicable and as described in the broker’s legal documents.
          </p>

          <p>
            Depending on the broker entity and your jurisdiction, you may have access to independent dispute resolution through The Financial Commission and its Compensation Fund (e.g., up to €20,000 per complaint, subject to terms).
          </p>

          <p>Certain broker entities may also maintain excess-of-loss insurance arranged via an insurance broker and underwritten in the Lloyd’s market, with coverage up to USD 1,000,000 per claim/account, subject to eligibility, policy terms, exclusions, and limitations (this does not cover trading losses and does not imply guaranteed performance).</p>

          <p>We may receive compensation if you open an account or trade via our links/IDs. Any regulatory references relate solely to the broker and its relevant legal entity. We actively but not exclusively work with the following Brokerage Companies.</p>

          <p>
            <span className="font-semibold text-gray-300">
              Risk Warning:
            </span>{" "}
            Trading derivatives carries significant risks. It is not suitable for all investors and if you are a professional client, you could lose substantially more than your initial investment. When acquiring our derivative products, you have no entitlement, right or obligation to the underlying financial assets. Past performance is no indication of future performance and tax laws are subject to change. The information on this website is general in nature and doesn't take into account your personal objectives, financial circumstances, or needs. Accordingly, before acting on the advice, you should consider whether the advice is suitable for you having regard to your objectives, financial situation and needs. We encourage you to seek independent advice if necessary. Please read our legal documents and ensure that you fully understand the risks before you make any trading decisions.
          </p>

          <p>
            <span className="font-semibold text-gray-300">
              Regional Restrictions:
            </span>{" "}
            We do not offer our services to residents of certain jurisdictions such as United States and to jurisdictions on the FATF and EU/UN sanctions lists.
          </p>
          <p>The information on this site and the products and services offered are not intended for distribution to any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. While the Authority has granted a securities or derivatives investment business licence to the Licensee, the Authority does not endorse or vouch for the merits of the products offered by the Licensee.</p>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex-row">
          <div>© 2025 Signal2Trade. All rights reserved.</div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-white">
              Legal Notice
            </a>
            <a href="#" className="hover:text-white">
              Imprint
            </a>
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white">
              Data Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}