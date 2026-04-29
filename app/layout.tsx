import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Chatbot",
  description: "A simple chatbot interface for a Next.js website."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
