'use client';

import "./globals.css";
import TanStackProvider from "@/components/providers/TanStackProvider";
import AuthProvider from "@/components/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
          {children}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}