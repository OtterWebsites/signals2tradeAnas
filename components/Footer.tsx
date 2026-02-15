"use client";

import React, { useId, useState } from "react";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageCircle,
  Send,
} from "lucide-react";
import { div } from "framer-motion/client";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

function Accordion({
  items,
  defaultOpenIndex = -1,
}: {
  items: AccordionItem[];
  defaultOpenIndex?: number;
}) {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  return (
    <div className="w-full divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.03]">
      {items.map((it, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `${uid}-panel-${idx}`;
        const btnId = `${uid}-btn-${idx}`;

        return (
          <div key={idx} className="px-4 sm:px-5">
            <button
              id={btnId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="flex w-full items-center justify-between gap-3 py-4 text-left"
            >
              <span className="text-sm font-semibold text-white">
                {it.title}
              </span>

              <span
                className={[
                  "grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
              >
                <ChevronDown className="h-4 w-4 text-white/80" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={[
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] pb-4 opacity-100"
                  : "grid-rows-[0fr] pb-0 opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <div className="text-sm leading-relaxed text-gray-300/90">
                  {it.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Footer() {
  const socials = [
    { label: "Facebook", href: "#", Icon: Facebook },
    { label: "X", href: "#", Icon: Twitter },
    { label: "LinkedIn", href: "#", Icon: Linkedin },
    { label: "YouTube", href: "#", Icon: Youtube },
    { label: "Instagram", href: "#", Icon: Instagram },
    { label: "WhatsApp", href: "#", Icon: MessageCircle },
    { label: "Telegram", href: "#", Icon: Send },
  ];

  const accordions: AccordionItem[] = [
    {
      title: "StarTrader Entities",
      content: (
        <div className="space-y-8">
          <h3 className="font-bold text-[15px]">
            STARTRADER Global Financial Consultation & Financial Analysis L.L.C
          </h3>
          <p>
            Category 5 licensee regulated by the Securities and Commodities
            Authority (SCA) of the United Arab Emirates, with License No.
            20200000241, authorised to carry out regulated activities of
            Introduction and Promotion in the UAE. Its registered office is
            located at Level 2, Office 203, ONE CENTRAL, OFFICES 4, DWTC, Dubai,
            P.O. Box 129621, UAE. It is not authorised to provide brokerage
            services or execute client trades.
          </p>

          <h3 className="font-bold text-[15px]">STARTRADER Broker Limited</h3>
          <p>
            Authorised and regulated by the Financial Conduct Authority (FCA),
            FCA Reference No. 821704 and registered address Unit 1.5, 344–354
            Gray&apos;s Inn Road, London, England, WC1X 8BP
          </p>

          <h3 className="font-bold text-[15px]">
            STARTRADER Prime Global Pty Ltd
          </h3>
          <p>
            Regulated by the Australian Securities and Investments Commission
            (ASIC), with ACN 156005668 and AFSL No. 421210. Its registered office
            is located at Level 35, 31 Market Street, Sydney, NSW 2000,
            Australia.
          </p>

          <h3 className="font-bold text-[15px]">
            STARTRADER International Pty Ltd
          </h3>
          <p>
            Regulated by the Financial Sector Conduct Authority (FSCA) of South
            Africa, with FSP No. 52464 and Registration No. 2022/435897/07. Its
            registered office is located at 18 Cavendish Road, Claremont, Cape
            Town, Western Cape, 7708, South Africa.
          </p>

          <h3 className="font-bold text-[15px]">STARTRADER Limited</h3>
          <p>
            Regulated by the Financial Services Authority (FSA) of Seychelles,
            with License No. SD049 and Registration No. 8427362-1. Its registered
            office is located at Suite 3, Global Village, Jivan&apos;s Complex,
            Mont Fleuri, Mahe, Seychelles.
          </p>

          <h3 className="font-bold text-[15px]">
            STARTRADER Financial Markets Limited
          </h3>
          <p>
            Regulated by the Financial Services Commission (FSC) of Mauritius,
            with Company No. 212229 GBC and License No. GB24203371. Its
            registered office is located at Suite 201, 2nd Floor, The Catalyst,
            40 Silicon Avenue, Ebene Cybercity, Mauritius.
          </p>

          <h3 className="font-bold text-[15px]">STARTRADER (CY) Limited</h3>
          <p>
            Registered in the Republic of Cyprus under registration number
            HE421001 with its registered address at 160 Archiepiskopou Makariou
            III, 1st Floor, 3026 Limassol, Cyprus, facilitates payment services
            for licensed and regulated entities within the STARTRADER Group of
            Companies. This entity does not offer regulated financial products
            or provide trading services.
          </p>
          <p>
            StarTrader maintains Excess of Loss insurance coverage arranged
            through Willis Towers Watson (WTW), a global insurance brokerage
            established in 1828. Subject to the terms, conditions, and
            exclusions of the applicable policy, this coverage provides
            protection of up to USD 1,000,000 per claim.
          </p>
          <p>
            StarTrader is a member of The Financial Commission, an international
            organization engaged in the resolution of disputes within the
            financial services industry in the Forex market.
          </p>

          <p>
            *Does not imply guaranteed performance. CFDs involve significant
            risk and may not be suitable for all investors.
          </p>
        </div>
      ),
    },
    {
      title: "Vantage Market Entities",
      content: (
        <div className="space-y-7">
          <h3 className="font-bold text-[15px]">VIG Group</h3>
          <p>
            Operating under the brand Vantage Markets, is a full-service
            investment dealer (excluding underwriting) authorised and regulated
            by the Mauritius Financial Services Commission (FSC) under Licence
            No. GB20026165, with registered address at Suite 201, 2nd Floor, The
            Catalyst, 40 Silicon Avenue, Ebene Cybercity, Mauritius.
          </p>

          <h3 className="font-bold text-[15px]">Vantage Global Prime LLP</h3>
          <p>
            Authorised and regulated by the Financial Conduct Authority (FCA),
            registration number OC376560 and registered address 7 Bell Yard,
            London, WC2A 2JR.
          </p>

          <h3 className="font-bold text-[15px]">Vantage Markets (Pty) Ltd</h3>
          <p>
            Trading name of an authorised Financial Service Provider
            (&quot;FSP&quot;) registered and regulated by the Financial Sector
            Conduct Authority (&quot;FSCA&quot;) of South Africa under license
            number 51268. Registered address: 18 Cavendish St, Claremont, Cape
            Town, Western Cape 7708, South Africa.
          </p>

          <h3 className="font-bold text-[15px]">Vantage FX Pty Ltd</h3>
          <p>
            (ABN 31 140 903 886, AFS Authorised Representative no. 343547) is a
            corporate authorised representative of Vantage Global Prime Pty Ltd
            and may provide financial services on behalf of Vantage Global Prime
            Pty Ltd.
          </p>

          <h3 className="font-bold text-[15px]">Vantage Global Prime Pty Ltd</h3>
          <p>
            Trading under Vantage, is regulated by the Australian Securities and
            Investments Commission (ASIC), AFSL no. 428901 and is located at
            level 29, 31 Market St, Sydney, New South Wales, 2000, Australia.
            For clients who onboarded via https://www.vantagemarkets.com/en-au/,
            Vantage Global Prime Pty Ltd is the product issuer. If you decide to
            trade products offered by Vantage Global Prime Pty Ltd, you should
            consider whether you&apos;re part of our target market by reviewing
            our Target Market Determination (TMD), and read our Product
            Disclosure Statement (PDS), Financial Services Guide (FSG) and other
            legal documents to ensure you fully understand the risks before you
            make any trading decisions. We encourage you to seek independent
            advice if necessary.
          </p>
          <p>
            Vantage maintains Excess of Loss insurance coverage arranged through
            Willis Towers Watson (WTW), a global insurance brokerage established
            in 1828. Subject to the terms, conditions, and exclusions of the
            applicable policy, this coverage provides protection of up to USD
            1,000,000 per claim.
          </p>
          <p>
            Vantage is a member of The Financial Commission, an international
            organization engaged in the resolution of disputes within the
            financial services industry in the Forex market.
          </p>
          <p>
            *Does not imply guaranteed performance. CFDs involve significant
            risk and may not be suitable for all investors.
          </p>
        </div>
      ),
    },

    // ✅ NEW PARTNER: Fortune Prime
    {
      title: "Fortune Prime",
      content: (
        <div className="space-y-7">
          <h3 className="font-bold text-[15px]">
            Fortune Prime Global Capital Pty Ltd
          </h3>
          <p>
            Trading under Fortune Prime Global (FPG), is regulated by the
            Australian Securities and Investments Commission (ASIC), AFSL no.
            400364 and is located at Suite 5, 18-20 Prospect St, Box Hill, VIC
            3128, Australia.
          </p>

          <h3 className="font-bold text-[15px]">Fortune Prime Limited</h3>
          <p>
            Authorized and regulated by the Vanuatu Financial Services
            Commission (VFSC) under Licence No. 700507, with registered address
            at 1276 Govant Building, Kumul Highway, Port Vila, Republic of
            Vanuatu.
          </p>
        </div>
      ),
    },

    // ✅ NEW PARTNER: Pacific Union (PU Prime)
    {
      title: "Pacific Union",
      content: (
        <div className="space-y-7">
          <h3 className="font-bold text-[15px]">
            Pacific Union (Seychelles) Limited
          </h3>
          <p>
            Trading under PU Prime, is authorized and regulated by the Financial
            Services Authority (FSA) of Seychelles under Securities Dealer
            License No. SD050, with registered address at CT House, Office 9A,
            Providence, Mahé, Seychelles.
          </p>

          <h3 className="font-bold text-[15px]">PU Prime Trading Pty Ltd</h3>
          <p>
            An Australian Financial Services Licensee authorized and regulated
            by the Australian Securities and Investments Commission (ASIC) under
            License No. 410681. Registered address: Suite 103, Level 1, 17
            Castlereagh St, Sydney, NSW 2000, Australia.
          </p>

          <h3 className="font-bold text-[15px]">PU Prime Ltd (Mauritius)</h3>
          <p>
            An authorized investment dealer (excluding underwriting) regulated
            by the Financial Services Commission (FSC) of Mauritius under
            License No. GB23202672. Registered address: Suite 201, Level 2, The
            Catalyst, 40 Silicon Avenue, Cybercity, Ebene, Mauritius.
          </p>

          <h3 className="font-bold text-[15px]">PU Prime (Pty) Ltd</h3>
          <p>
            An authorized Financial Service Provider (&quot;FSP&quot;) registered
            and regulated by the Financial Sector Conduct Authority (FSCA) of
            South Africa under FSP No. 52218. Registered address: 18 Cavendish
            St, Claremont, Cape Town, 7708, South Africa.
          </p>
        </div>
      ),
    },
  ];

  const legalLinks = [
    { label: "Legal Notice", href: "#" },
    { label: "Imprint", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Data Privacy", href: "#" },
  ];

  return (
    <footer className="relative mt-20 text-gray-300">
      {/* Background (same vibe) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#061c2f] to-[#041726]" />
      <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {/* Product */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-300/90">
              <li className="hover:text-white transition">Forex</li>
              <li className="hover:text-white transition">Metals</li>
              <li className="hover:text-white transition">Indices</li>
              <li className="hover:text-white transition">Bonds</li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Platforms
            </h4>
            <ul className="space-y-2 text-sm text-gray-300/90">
              <li className="hover:text-white transition">App</li>
              <li className="hover:text-white transition">MT4</li>
              <li className="hover:text-white transition">MT5</li>
              <li className="hover:text-white transition">WebTrader</li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Learn
            </h4>
            <ul className="space-y-2 text-sm text-gray-300/90">
              <li className="hover:text-white transition">Academy</li>
              <li className="hover:text-white transition">Webinars</li>
              <li className="hover:text-white transition">Tutorials</li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Corporate
            </h4>
            <ul className="space-y-2 text-sm text-gray-300/90">
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Contact</li>
              <li className="hover:text-white transition">ESG</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Social row (left aligned) */}
        <div className="flex flex-wrap items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-gray-200/90 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Legal content (left aligned) */}
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-gray-400">
          <p>
            [BRAND] is a marketing/affiliate business registered at #10 Manoel
            Street, Castries, St.Lucia. Content is for informational and
            promotional purposes only.
          </p>

          <p>
            We are not the broker, not financial advisers, and we do not execute
            orders, manage accounts, or hold client funds.
          </p>

          <p>
            Client funds are held by the broker (the relevant legal entity) in
            segregated client/trust accounts where applicable and as described
            in the broker&apos;s legal documents.
          </p>

          <p>
            Depending on the broker entity and your jurisdiction, you may have
            access to independent dispute resolution through The Financial
            Commission and its Compensation Fund (e.g., up to €20,000 per
            complaint, subject to terms).
          </p>

          <p>
            Certain broker entities may also maintain excess-of-loss insurance
            arranged via an insurance broker and underwritten in the Lloyd&apos;s
            market, with coverage up to USD 1,000,000 per claim/account, subject
            to eligibility, policy terms, exclusions, and limitations (this does
            not cover trading losses and does not imply guaranteed performance).
          </p>

          <p>
            We may receive compensation if you open an account or trade via our
            links/IDs. Any regulatory references relate solely to the broker and
            its relevant legal entity.
          </p>

          <p>
            We actively but not exclusively work with the following Brokerage
            Companies
          </p>

          {/* Middle FAQ-style accordions (Partners) */}
          <div className="pt-2">
            <Accordion items={accordions} />
          </div>

          <p>
            <span className="font-semibold text-gray-300">Risk Warning:</span>{" "}
            Trading derivatives carries significant risks. It is not suitable
            for all investors and if you are a professional client, you could
            lose substantially more than your initial investment. When acquiring
            our derivative products, you have no entitlement, right or obligation
            to the underlying financial assets. Past performance is no
            indication of future performance and tax laws are subject to change.
            The information on this website is general in nature and doesn&apos;t
            take into account your personal objectives, financial circumstances,
            or needs. Accordingly, before acting on the advice, you should
            consider whether the advice is suitable for you having regard to
            your objectives, financial situation and needs. We encourage you to
            seek independent advice if necessary. Please read our legal
            documents and ensure that you fully understand the risks before you
            make any trading decisions.
          </p>

          <p>
            <span className="font-semibold text-gray-300">
              Regional Restrictions:
            </span>{" "}
            We do not offer our services to residents of certain jurisdictions
            such as United States and to jurisdictions on the FATF and EU/UN
            sanctions lists.
          </p>

          <p>
            The information on this site and the products and services offered
            are not intended for distribution to any person in any country or
            jurisdiction where such distribution or use would be contrary to
            local law or regulation.
          </p>
        </div>
      </div>

      {/* ✅ Bottom Legal Section (professional mobile spacing + bg) */}
      <div className="mt-7">
        <div className="mx-auto max-w-6xl px-6">
          {/* Top Border */}
          <div className="border-t border-white/15" />

          {/* Background Wrapper (only between borders) */}
          <div className="bg-[#041b2d]">
            {/* Links */}
            <div className="flex flex-col divide-y divide-white/10 sm:flex-row sm:items-center sm:justify-center sm:divide-y-0 sm:divide-x sm:divide-white/10">
              {legalLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="
                    flex h-16 items-center justify-center
                    text-center
                    text-[13px] font-medium uppercase tracking-[0.22em]
                    text-gray-200 transition hover:text-white
                    sm:h-auto sm:px-18 sm:py-4
                  "
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-white/15" />

          {/* Copyright */}
          <div className="pb-15 pt-12 text-center text-xs text-gray-500">
            Copyright © 2026 [BRAND]. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
