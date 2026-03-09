import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Oroki Foods | Premium Traditional Grains",
  description: "NAFDAC-approved traditional Nigerian cereals and health foods crafted from natural ingredients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-secondary selection:bg-accent selection:text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}