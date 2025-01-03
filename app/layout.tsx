import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PitchIn",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} __variable_4d318d __variable_ea5f4b antialiased vsc-initialized`}
          data-new-gr-c-s-check-loaded="14.1215.0"
          data-gr-ext-installed=""
          cz-shortcut-listen="true"
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
