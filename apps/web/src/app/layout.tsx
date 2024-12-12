"use client";

import "./globals.css";
import { TabLayout } from "../components/tab-layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#1e1e1e] text-white">
        <TabLayout />
        {children}
      </body>
    </html>
  );
}
