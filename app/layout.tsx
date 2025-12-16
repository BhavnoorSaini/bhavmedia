import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AutoLogout from "@/components/auto-logout";
import { EthereumShim } from "@/components/ethereum-shim";

const defaultUrl = process.env.WEB_URL
  ? `https://${process.env.WEB_URL}`
  : "http://localhost:3000";
const siteName = "BhavMedia";

const canonicalTitle = "Professional Photography for Restaurants, Events, Automobiles, and Brands";
const canonicalDescription =
  "BhavMedia captures restaurant launches, car shoots, portraits, events, and real-estate stories with editorial polish, clear direction, and a Supabase-secured delivery pipeline.";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  icons: {
    icon: "/favicon.ico",
  },
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
    "Supabase client portal",
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
      </body>
    </html>
  );
}
