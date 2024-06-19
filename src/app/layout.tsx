import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviderComponent from "./_components/AuthProviderComponent";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth website - first 10 days of nextjs",
  description: "Auth website for 100 days of nextjs", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviderComponent>
        {children}
        </AuthProviderComponent>
        </body>
    </html>
  );
}