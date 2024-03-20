import type { Metadata } from "next";
import { Inter, Grandstander} from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css";
import Header from '@/components/Header';
import Head from "next/head";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  authors: [
    { name: "JimTech Solutions" },
    {
      name: "JimTech Solutions",
      url: "https://jimtech.solutions",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <> 
      <Head> 
        <title>ChitChat: Interactive Conversation Games for Better Connections</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="description" content="Boost your relationships with ChitChat! Explore interactive games and intriguing questions designed for couples and friends." />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="ChitChat: Interactive Conversation Games for Better Connections" />
        <meta property="og:description" content="Boost your relationships with ChitChat! Explore interactive games and intriguing questions designed for couples and friends." />
        <meta property="og:image" content="https://chitchat.cards/images/thumbnail.png" />
        <meta property="og:url" content="https://chitchat.cards" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChitChat: Interactive Conversation Games for Better Connections" />
        <meta name="twitter:description" content="Boost your relationships with ChitChat! Explore interactive games and intriguing questions designed for couples and friends." />
        <meta name="twitter:image" content="https://chitchat.cards/images/thumbnail.png" />
      </Head>
      <main>
        
        {children}
      </main>
    </>
  )

}
