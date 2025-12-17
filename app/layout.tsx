import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AutoLogout from "@/components/auto-logout";
import { EthereumShim } from "@/components/ethereum-shim";
import { Analytics } from "@vercel/analytics/react";

const defaultUrl = `https://bhavmedia.com`;
const siteName = "BhavMedia";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
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
    "car photographer",
  ],
  alternates: {
    canonical: "/",
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
