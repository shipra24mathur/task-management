import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Management App",
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
