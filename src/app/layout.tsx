import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseOps AI - AI-Powered DevOps Copilot",
  description: "Stop reading logs by hand. Let AI tell you what broke, why, and what it's costing you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
