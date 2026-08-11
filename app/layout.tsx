import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FeedbackWidget } from "@/components/feedback-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Career Garage — Personality Tests & Career Assessments",
    template: "%s | Career Garage",
  },
  description:
    "Free, thoughtful personality tests and career assessments. Discover your personality type, explore your strengths, and find work and relationships that fit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Review tool. Set NEXT_PUBLIC_FEEDBACK_WIDGET=off before public launch. */}
        {process.env.NEXT_PUBLIC_FEEDBACK_WIDGET !== "off" && <FeedbackWidget />}
      </body>
    </html>
  );
}
