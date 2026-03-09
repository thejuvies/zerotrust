import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import "./zero-trust.css";

export const metadata: Metadata = {
  title: "Zero Trust Network Security in IoT Environment",
  description: "Zero Trust Network Security in IoT Environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
