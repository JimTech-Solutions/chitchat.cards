import type { Metadata } from "next";
import { Inter, Grandstander} from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        <GoogleAnalytics gaId="G-X05HE2M1XM" />
      </Head>
      <body className={grandstander.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
