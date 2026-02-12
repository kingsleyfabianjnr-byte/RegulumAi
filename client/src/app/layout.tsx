import type { Metadata } from "next";
import SessionProvider from "@/components/auth/SessionProvider";
import "./globals.css";

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
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
