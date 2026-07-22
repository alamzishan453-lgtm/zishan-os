import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zishan Alam | Full Stack Developer",
  description:
    "Official portfolio of Zishan Alam. Full Stack Developer specializing in Next.js, React, TypeScript and modern web development.",

  keywords: [
    "Zishan Alam",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Web Developer",
    "TypeScript",
  ],

  authors: [{ name: "Zishan Alam" }],

  creator: "Zishan Alam",

  openGraph: {
    title: "Zishan Alam | Full Stack Developer",
    description:
      "Official portfolio of Zishan Alam.",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zishan Alam | Full Stack Developer",
    description:
      "Official portfolio of Zishan Alam.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
      <body className="min-h-full flex flex-col">
  <CartProvider>
    {children}
  </CartProvider>
</body>
    </html>
  );
}
