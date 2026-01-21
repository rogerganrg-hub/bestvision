// apps/web/src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BestVision | RIA Compliance Portal",
  description: "Secure investment account aggregation and audit platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* 全局简易导航栏 */}
        <nav className="border-b bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-xl font-bold text-blue-600">BestVision 0001</h1>
            <div className="text-sm text-slate-500">MVP Stage: Plaid + Audit</div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}