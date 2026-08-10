import type { Metadata } from "next";
import { headers } from "next/headers";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Pocket Tool — Small utilities for Discord",
      template: "%s — Pocket Tool",
    },
    description: "A lightweight, open-source Discord app for quotes, timestamps, translation, TTS, profiles and the little tasks that interrupt a conversation.",
    applicationName: "Pocket Tool",
    icons: {
      icon: "/pocket-tool-icon.png",
      apple: "/pocket-tool-icon.png",
    },
    keywords: ["Pocket Tool", "Discord app", "Discord bot", "Discord utilities", "open source"],
    openGraph: {
      type: "website",
      url: origin,
      siteName: "Pocket Tool",
      title: "Pocket Tool — Small utilities for Discord",
      description: "Quotes, timestamps, translation, TTS and more—right inside Discord.",
    },
    twitter: {
      card: "summary",
      title: "Pocket Tool — Small utilities for Discord",
      description: "Quotes, timestamps, translation, TTS and more—right inside Discord.",
    },
  };
}

const themeScript = `
  try {
    const saved = localStorage.getItem('pocket-tool-theme');
    document.documentElement.dataset.theme = saved || 'light';
  } catch (_) {
    document.documentElement.dataset.theme = 'dark';
  }
`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
