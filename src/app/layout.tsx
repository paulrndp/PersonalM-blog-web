import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "Hannah Montemayor | Personal Blog & Stories",
  description:
    "Official personal blog and story collection of Hannah Montemayor. Explore original novels, blog articles, and random musings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
