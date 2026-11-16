import "./globals.css";
import TanStackProvider from "@/components/providers/TanStackProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import Header from "@/components/Header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Cars rent',
};

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
            <Header/>
          {children}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}