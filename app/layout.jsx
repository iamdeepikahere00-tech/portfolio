import "./globals.css";
import { DM_Sans, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import { site } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const head = Manrope({ subsets: ["latin"], variable: "--font-head", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: `${site.name} | ${site.role}`,
  description: `Portfolio of ${site.name}, ${site.role}.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>
        <Navbar />
        <main className="wrap">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
