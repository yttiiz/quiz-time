import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const {
  PAGE_TITLE: title,
  PAGE_DESCRIPTION: description,
} = process.env
const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
