import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // ১. ফন্ট ইম্পোর্ট
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

// ২. ফন্ট কনফিগার করা
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains" 
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Built with Next.js and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ৩. বডি ট্যাগে ভেরিয়েবলগুলো পাস করা */}
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-deep text-text-main`}>
        {children}
        <Navbar/>
      </body>
    </html>
  );
}