import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novencia HR",
  description: "A human resources (HR) software that helps CEOs and HR pros streamline employee time tracking, time off management, performance, and more - all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

      <SpeedInsights/>
      {children}
      </body>
    </html>
  );
}
