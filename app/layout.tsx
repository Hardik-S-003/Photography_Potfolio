import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elena Vance | Fine Art & Editorial Photographer",
  description:
    "Award-winning fine-art, luxury wedding, and commercial editorial photography capturing human emotion and the stillness of light.",
  keywords: [
    "Photography Portfolio",
    "Editorial Photographer",
    "Luxury Wedding Photography",
    "Commercial Art Direction",
    "Lake Como Wedding Photographer",
    "Elena Vance",
  ],
  authors: [{ name: "Elena Vance" }],
  openGraph: {
    title: "Elena Vance | Fine Art & Editorial Photography",
    description:
      "Documenting the poetry of light, human stillness, and timeless editorial narratives.",
    url: "https://elenavance.com",
    siteName: "Elena Vance Atelier",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-950 text-neutral-100 font-sans selection:bg-editorial-gold selection:text-dark-950 antialiased">
        {children}
      </body>
    </html>
  );
}
