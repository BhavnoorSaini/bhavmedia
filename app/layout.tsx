import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import AutoLogout from "@/components/auto-logout";
import { EthereumShim } from "@/components/ethereum-shim";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
const siteName = "BhavMedia";

const canonicalTitle = "Professional Photography for Restaurants, Events, Automobiles, and Brands";
const canonicalDescription =
  "BhavMedia captures restaurant launches, car shoots, portraits, events, and real-estate stories with editorial polish, clear direction, and a Supabase-secured delivery pipeline.";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: {
      url: '/apple-touch-icon.png'},
  },
  manifest: '/site.webmanifest',
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: canonicalDescription,
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  authors: [{ name: siteName }],
  keywords: [
    "BhavMedia",
    "restaurant photography",
    "brand storytelling",
    "event photographer",
    "portrait sessions",
    "car photography",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | ${canonicalTitle}`,
    description: canonicalDescription,
    type: "website",
    url: "/",
    siteName,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <EthereumShim />
        <AutoLogout />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
