import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Crimson_Text } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Interactive Lineage",
  description: "A digital manuscript of the Bodhipathapradipa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${jetbrainsMono.variable} ${crimsonText.variable} antialiased bg-charcoal text-cloud-white`}
      >
        {children}
      </body>
    </html>
  );
}
