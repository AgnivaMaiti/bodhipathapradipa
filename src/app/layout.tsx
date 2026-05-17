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
  title: "Bodhipathapradīpa | Atisha Dīpaṅkara's Interactive Manuscript",
  description: "Explore the digital manuscript of the Bodhipathapradīpa (Lamp for the Path to Enlightenment) by Atisha Dīpaṅkara. A journey through Bengali Buddhist roots, featuring Sanskrit IAST and Bengali script transliterations.",
  keywords: [
    "Atisha Dipamkara",
    "Bodhipathapradipa",
    "Bengali Buddhism",
    "Lamrim",
    "Buddhism in Bengal",
    "Lamp for the Path to Enlightenment",
    "Sanskrit Transliteration",
    "IAST Transliteration",
    "Tibetan Buddhism",
    "Nalanda",
    "Vikramashila",
    "Buddhist Philosophy",
    "Agniva Maiti"
  ],
  authors: [{ name: "Atisha Dīpaṅkara" }, { name: "Agniva Maiti", url: "https://www.linkedin.com/in/agniva-maiti/" }],
  creator: "Agniva Maiti",
  metadataBase: new URL("https://bodhipathapradipa.agniva.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bodhipathapradīpa | Atisha Dīpaṅkara's Interactive Manuscript",
    description: "Explore the digital manuscript of the Lamp for the Path to Enlightenment, bridging Bengali Buddhist heritage and Sanskrit IAST transliterations.",
    url: "https://bodhipathapradipa.agniva.in",
    siteName: "Bodhipathapradīpa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bodhipathapradīpa | Atisha Dīpaṅkara's Interactive Manuscript",
    description: "Explore the digital manuscript of the Lamp for the Path to Enlightenment.",
    creator: "@AgnivaMait67736",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
