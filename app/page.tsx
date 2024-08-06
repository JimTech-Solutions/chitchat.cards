
"use client"
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularDeckSection from "@/components/popular_deck_section";
import WelcomeForm from "@/components/welcome_form";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { StepsProvider } from "react-step-builder";
import { getAuthUser } from "./supabase-client";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/footer";



export default function Home() {

  useEffect(() => {
    const checkUser = async () => {
        const user = await getAuthUser();
        // console.log(user);
    }

    checkUser();
  })

  
  return (
    <main className="min-h-screen">
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

      <UserProvider> 
        <Header />
        <HeroSection />
        <PopularDeckSection />

        <WelcomeForm />
      </UserProvider>
      
      <Footer />
      <GoogleAnalytics gaId="G-X05HE2M1XM" />
    </main>
  );
}
