import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { StructuredData } from "@/components/layout/StructuredData";
import { siteConfig } from "@/config/site-config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | CNC Machining & Automotive Components, Chennai`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_IN" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body>
        <a href="#main" style={{ position: "absolute", left: -9999 }}>Skip to content</a>
        <div className="scroll-progress" aria-hidden="true" />
        <StructuredData /><Header /><main id="main">{children}</main><Footer /><FloatingContact />
      </body>
    </html>
  );
}
