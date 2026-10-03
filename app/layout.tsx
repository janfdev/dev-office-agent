import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevOffice-360 — Live AI Engineering Squad & Virtual Office",
  description: "3D Virtual Tech Office Observability Dashboard for Autonomous AI Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        {children}
      </body>
    </html>
  );
}
