
"use client"
import Image from "next/image";
import Link from "next/link";

import imageUrl from "../assets/images/thumbnail.webp";

import games from '@/data/games.json';

import Slider from "react-slick";
import { useState } from "react";

interface Question {
  category: string;
  question: string;
}

interface Game {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  thumbnail: string;
  data: string;
  slug: string;
}

export default function Home() {

  const [currentSlideNumber, setCurrentSlideNumber] = useState(0);
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3500,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
          setCurrentSlideNumber(newIndex);
      },
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1054,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 650,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          slidesToShow: 1,
        },
      },
    
    ]
  };
  
  return (
    <main className="min-h-screen">
      <div className=" shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">POPULAR GAMES</h2>

        <div className="slider-container">
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

        <div className="p-5">
            <p className="text-lg mb-3 font-bold">Description</p>
            <p className="text-md">{games[currentSlideNumber+1].long_description}</p>
            <p className="mb-3">Number of Cards: 50/100</p>
            <p className="mb-3">Recommended for:</p>
            <div className="flex gap-3">
              <span className="py-2 px-4 bg-black">test</span>
              <span className="py-2 px-4 bg-black">test</span>
            </div>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link className="w-full text-center text-[#e7e7e7] bg-[#151515] rounded-lg border px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80" href={`/game/${games[currentSlideNumber+1].slug}`}>View Deck</Link>
              <Link className="w-full text-center text-[#151515] bg-[#e7e7e7] rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80" href="/">Unlock All Cards</Link>
            </div>
        </div>

      
      </div>
      
      
    </main>
  );
}
