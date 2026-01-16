import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AutoLogout from "@/components/auto-logout";
import { EthereumShim } from "@/components/ethereum-shim";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const defaultUrl = `https://bhavmedia.com`;
const siteName = "BhavMedia";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  authors: [{ name: siteName }],
  keywords: [
    "Chicago photographer", 
    "Plainfield IL photographer", 
    "Chicagoland photography", 
    "Illinois event photography", 
    "Chicago restaurant photography", 
    "commercial photographer Chicago", 
    "car photography Illinois", 
    "Plainfield portrait sessions", 
    "brand storytelling photography",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon2.png", sizes: "32x32", type: "image/png" },
      { url: "/icon3.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icon4.png",
    apple: "/apple-icon.png",
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
  preload: false,
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
        <SpeedInsights />
      </body>
    </html>
  );
}
