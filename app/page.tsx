
"use client"
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularDeckSection from "@/components/popular_deck_section";
import { GoogleAnalytics } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";



export default function Home() {

  
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PopularDeckSection />


      <GoogleAnalytics gaId="G-X05HE2M1XM" />
    </main>
  );
}
