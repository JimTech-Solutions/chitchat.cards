"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { HiArrowPathRoundedSquare, HiArrowUturnLeft, HiArrowUturnRight } from 'react-icons/hi2'
import { PiShuffle } from 'react-icons/pi'

import { createClient } from '@supabase/supabase-js'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Slider from "react-slick";

import { Categories, Questions} from '@/types/games'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Page: React.FC = () => {
    const pathname = usePathname();
    const slug = pathname.split('/').pop();

    const [questions, setQuestions] = useState<Questions[]>([]);
    const [categoriesData, setCategoriesData] = useState<Categories[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const shuffleArray = (array: any[]) => {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr;
    }

    useEffect(() => {
        if (!slug) return; // Do nothing if slug is not yet available

        const fetchQuestions = async () => {
        // Fetch the game ID using the slug
        const { data: gameData, error: gameError } = await supabase
            .from('games')
            .select('gid')
            .eq('slug', slug)
            .single();

        let { data: catData, error } = await supabase
            .from('questions_categories')
            .select('*')

        if (!error && catData) { 
            setCategoriesData(catData);
        } else {
            // Handle the case where catData is null or an error occurred
            console.log(error); // Assuming you meant to log `error` instead of `gameError` which isn't defined in the provided code snippet.
            setCategoriesData([]); // Setting to an empty array as a fallback
        }

        if (gameError) {
            console.error(gameError);
            router.push('/')
            setLoading(false);
            return;
        }

        const { data: questionsData, error: questionsError } = await supabase
            .from('questions')
            .select('*')
            .eq('gid', gameData.gid);
            
        if (questionsError) {
            console.error(questionsError);
        } else {
            setQuestions(shuffleArray(questionsData));
        }

        setLoading(false);
        };

        fetchQuestions();
    }, [slug]);

    const handleShuffleButton = () => {
        setQuestions(shuffleArray(questions));
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    };

    const getCategoryColor = (category: string) => {
        console.log(categoriesData)
        const foundCategory = categoriesData.find((cat) => cat.category == category);
        return foundCategory ? foundCategory.color : 'white'; 
    };

    let sliderRef = useRef<Slider | null>(null);
    const next = () => {
        sliderRef.current?.slickNext();
    };

    const previous = () => {
        sliderRef.current?.slickPrev();
    };

    const settings = {
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

  return (
    <section className="flex  flex-col justify-center  relative mt-5">


            {loading && (
            <div className="text-center p-10  flex flex-col justify-center">
                    <p className="text-2xl">Loading...</p>
            </div>
            )}
            <div className="slider-container my-[150px] xl:my-[250px]">
                <Slider ref={sliderRef}
                    {...settings}>
                    {questions.map((question, index) => {
                        const textColor = getCategoryColor(question.category);

                        return (
                        <div key={index} className="text-center p-10 my-auto justify-center items-center">
                                <p className={`mb-3`} style={{ color: textColor }}>{question.category}</p>
                                <p className="text-2xl">{question.question}</p>
                        </div>
                        )
                    })}
                </Slider>
            </div>

    
        <div className="flex justify-center w-full items-center gap-3 xl:gap-5 mt-20  bottom-20 fixed">
            <button className="rounded-2xl p-5 bg-[#272727]" onClick={previous}>
                <HiArrowUturnLeft size="24"/>
            </button>

            <button className="rounded-2xl p-5 bg-[#272727]" onClick={handleShuffleButton}>
                <PiShuffle size="24" />
            </button>

            <button className="rounded-2xl p-5 bg-[#272727]">
                <CiHeart size="24"/>
            </button>

            <button className="rounded-2xl p-5 bg-[#272727]" onClick={next}>
                <HiArrowUturnRight size="24"/>
            </button>
        </div>
    </section>
  )
}

export default Page