import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseOps Summit ?\" Where Builders Meet",
  description: "Annual tech and entrepreneurship summit for the next generation of founders.",
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
