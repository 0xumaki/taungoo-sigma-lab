import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taungoosigma.lab"),
  title: "TAUNGOO SIGMA LAB — Innovation Hub for Tomorrow's Technology",
  description:
    "Taungoo Sigma Lab — a brutalist research lab at the intersection of AI, Web3, and community resilience. 11 sectors. One sigma variable.",
  keywords: [
    "Taungoo Sigma Lab",
    "research lab",
    "AI",
    "Web3",
    "Myanmar tech",
    "brutalist design",
    "sigma variable",
    "neural forge",
  ],
  authors: [{ name: "Taungoo Sigma Lab" }],
  creator: "Taungoo Sigma Lab",
  publisher: "Taungoo Sigma Lab",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "TAUNGOO SIGMA LAB",
    description:
      "We are the sigma variable. 11 sectors. One engine. A brutalist research lab at the intersection of AI, Web3, and community resilience.",
    siteName: "Taungoo Sigma Lab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/sections/map.png",
        width: 1280,
        height: 800,
        alt: "Taungoo Sigma Lab — Nexus Map with 11 sectors",
      },
      {
        url: "/sections/s01.png",
        width: 1280,
        height: 800,
        alt: "Taungoo Sigma Lab — Sector 01: INITIALIZING",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAUNGOO SIGMA LAB",
    description: "We are the sigma variable. 11 sectors. One engine.",
    images: ["/sections/map.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
