
"use client"
import HeroSection from "@/components/HeroSection";
import PopularDeckSection from "@/components/popular_deck_section";
import Image from "next/image";
import Link from "next/link";



export default function Home() {

  
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PopularDeckSection />

    </main>
  );
}
