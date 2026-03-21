import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "烟灰缸 Community App",
  description: "Choismoke forum frontend app preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
