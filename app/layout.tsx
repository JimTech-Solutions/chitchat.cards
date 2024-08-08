import type { Metadata } from "next";
import { Inter, Grandstander} from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Header from '@/components/Header';
import Head from "next/head";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/react"
import Footer from "@/components/footer";


const inter = Inter({ subsets: ["latin"] });

const grandstander = Grandstander({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "ChitChat | Deepen Connections with Interactive Conversation Games",
  description: "Discover ChitChat – the ultimate app for couples and friends looking to strengthen their bonds through interactive games and thought-provoking questions. Engage in meaningful conversations and explore new topics together. Start your journey towards deeper connections today!",
  generator: "Next.js",
  manifest: "/manifest.json",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#151515" }],
  openGraph: {
    title: "ChitChat | Deepen Connections with Interactive Conversation Games",
    description: "Discover ChitChat – the ultimate app for couples and friends looking to strengthen their bonds through interactive games and thought-provoking questions. Engage in meaningful conversations and explore new topics together. Start your journey towards deeper connections today!",
    images: ['https://chitchat.cards/images/thumbnail.png']
  },
  authors: [
    { name: "JimTech Solutions" },
    {
      name: "JimTech Solutions",
      url: "https://jimtech.solutions",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, user-scalable=no",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`text-white grandstander.className`}>
          {children}
        <Analytics />
      </body>
    </html>
  );
}
