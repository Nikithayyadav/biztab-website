import type { Metadata, Viewport } from "next";
import { Sora, Figtree } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/common/Motion";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "BIZTAB.AI | Technology Consulting, Enterprise Products, Innovation and Training",
  description:
    "BIZTAB.AI combines enterprise technology consulting, AI-powered products, an innovation lab and corporate training to help businesses innovate, transform and grow.",
  openGraph: {
    siteName: "BIZTAB.AI",
    title: "BIZTAB.AI",
    description: "Consulting. Products. Innovation. Training.",
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#07509D" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${figtree.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
