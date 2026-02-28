import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/auth/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RegulumAi - AI-Powered Compliance Monitoring",
  description:
    "RegTech SaaS platform for automated compliance monitoring and risk assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-gray-900 antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
