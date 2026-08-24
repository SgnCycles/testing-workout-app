import type { Metadata } from "next";
import { Anton, Oswald, Work_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: "400",
  subsets: ["latin"],
});

const work_sans = Work_Sans({
  variable: "--font-work-sans",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get moving",
  description: "Choose the workout that suites you best",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${work_sans.variable} antialiased`}
    >
      <body className="bg-background">{children}</body>
    </html>
  );
}
