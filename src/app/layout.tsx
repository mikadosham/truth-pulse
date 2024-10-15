import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Truth Pulse 3000",
  description: "Find out what the feck is going on",
  icons: {
    icon: "/favicon.ico",
  },
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
