import type { Metadata } from "next";
import Script from "next/script";
import { Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const siteName = "Signals 2 Trade";
const siteUrl = "https://signal-bank2-trade.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Signals 2 Trade | Free Trading Signals & Community",
    template: "%s | Signals 2 Trade",
  },

  description:
    "Join Signals 2 Trade for free trading signals, weekly market insights, and exclusive trading education. Discover real member results and improve your trading strategy.",

  keywords: [
    "trading signals",
    "free trading signals",
    "forex signals",
    "crypto trading signals",
    "stock trading signals",
    "trading community",
    "telegram trading group",
    "signals 2 trade",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Signals 2 Trade | Free Trading Signals & Community",
    description:
      "Access free trading signals, expert insights, and community trading results. Join Signals 2 Trade today.",
    siteName,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Signals 2 Trade",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Signals 2 Trade | Free Trading Signals",
    description:
      "Join our free trading signals group and access professional market insights.",
    images: [`${siteUrl}/twitter-image`],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {/* ✅ Structured Data (JSON-LD) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Signals 2 Trade",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              sameAs: [
                "https://t.me/+qTBeOiPtYEkyOTBi"
              ],
            }),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Signals 2 Trade",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
