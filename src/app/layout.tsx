import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: { default: "Disonancia | Vinyl Records", template: "%s | Disonancia" },
  description: "Vinyl records from Disonancia.",
  icons: { icon: "/diso-favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1a1a1a]">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
