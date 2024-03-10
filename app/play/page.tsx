
"use client"
import Image from "next/image";
import Link from "next/link";

import imageUrl from "../../assets/images/thumbnail.webp";


// import supabase from '@/utils/initSupabase';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')

import Slider from "react-slick";
import { useEffect, useState } from "react";

import {Game, Categories, Questions} from '@/types/games'

import { GrNext, GrPrevious } from "react-icons/gr";


export default function GamePage() {

  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase.from('games').select('*');
      if (error) {
        console.error('Error loading games:', error);
        return;
      }
      if (data && data.length > 0) {
        setGames(data);
        setCurrentGame(data[0]); // Initialize with the first game or any specific logic
      }
    };
    fetchData();
  }, []);

  function NextArrow(props : any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`bg-black bg-opacity-50 mx-auto absolute top-0 h-full right-0 p-4 border-lg` }
        style={{ ...style,  }}
        onClick={onClick}
      >
        <div className="z-[10] h-full  flex items-center justify-center">
          <GrNext className="mx-auto text-center text-[#e7e7e7]" size="16"/>
        </div>
      </div>
    );
  }

  function PrevArrow(props : any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`z-[10] bg-black bg-opacity-50 mx-auto absolute top-0 h-full left-0 p-4 border-lg` }
        style={{ ...style,  }}
        onClick={onClick}
      >
        <div className="h-full  flex items-center justify-center">
          <GrPrevious className="mx-auto text-center text-[#e7e7e7]" size="16"/>
        </div>
      </div>
    );
  }


  const settings = {
    // centerPadding: '100px',
    // centerMode: true,
    // infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3500,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow className=""/>,
    prevArrow: <PrevArrow className=""/>,
    beforeChange: (oldIndex: number, newIndex: number) => {
          setCurrentGame(games[newIndex]);
      },
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
        }
      },
  
      {
        breakpoint: 650,
        settings: {
          autoplay: false,
          infinite: true,
          slidesToShow: 1,
        },
      },
    
    ]
  };
  
  return (
    <main className="min-h-screen">
      <div className=" shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">POPULAR DECKS</h2>

        <div className="slider-container ">
          <Slider {...settings}> 
            {games.map((game, index) => {
              return (
                  <Link href="/" key={index}>
                    <div className="rounded-lg relative hover:scale-[1.05] duration-300 m-5">
                      <Image src={imageUrl} alt="Soul Searchers Game" className="rounded-xl" />

                      <div className="bg-black bg-opacity-50 p-5 absolute bottom-0 w-full rounded-b-lg">
                        <p className="text-lg font-bold mb-2">{game.title}</p>
                        <p className="text-md">{game.short_description}</p>
                      </div>
                    </div>
                  </Link>
              )
            
            })}
          
          </Slider>
        </div>

        {currentGame && (
          <div className="p-5">
              <p className="text-lg mb-3 font-bold">Description</p>
              <p className="text-md mb-3">{currentGame.long_description}</p>
              <p className="mb-3">Number of Cards: 50/100</p>
              <p className="mb-3">Recommended for:</p>
              <div className="flex gap-3">
                {currentGame.recommended.map((x, index) => {
                  return (<span key={index} className="py-2 px-4 bg-black">{x}</span>);
                })}
              </div>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link className="w-full text-center text-[#e7e7e7] bg-[#151515] rounded-lg border px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80" href={`/game/${currentGame.slug}`}>View Deck</Link>
                <Link className="w-full text-center text-[#151515] bg-[#e7e7e7] rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80" href="/">Unlock All Decks</Link>
              </div>
          </div>
        )}

      
      </div>
      
      
    </main>
  );
}
