
"use client"


// import supabase from '@/utils/initSupabase';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')

import Slider from "react-slick";
import { useEffect, useState } from "react";

import {Game, Categories, Questions} from '@/types/games'

import { GrNext, GrPrevious } from "react-icons/gr";
import PopularDeckSection from "@/components/popular_deck_section";
import Header from '@/components/Header';


export default function GamePage() {
  
  return (
    <main className="min-h-screen">
      <Header />
      <PopularDeckSection />
    </main>
  );
}
