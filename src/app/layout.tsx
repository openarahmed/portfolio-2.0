import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
// 👇 ১. Widget ইমপোর্ট করা হলো (পাথ ঠিক আছে কিনা চেক করে নিও)
import WhatsAppWidget from "../components/shared/WhatsAppWidget"; 

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains" 
});

export const metadata: Metadata = {
  title: "Shakil Ahmed - Digital Alchemist",
  description: "Built with Next.js and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-deep text-text-main`}>
        
        {/* মেইন কন্টেন্ট */}
        {children}
        
        {/* 👇 ২. এখানে Widget বসানো হলো, যাতে সব পেজে দেখায় */}
        <WhatsAppWidget />
        
        {/* নেভিগেশন বার (Dock) */}
        <Navbar/>
        
      </body>
    </html>
  );
}