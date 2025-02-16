import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Paytm",
  description: "Paytm clone made in NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} antialiased`}>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
