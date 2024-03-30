"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CiFilter, CiHeart } from 'react-icons/ci'
import { HiArrowPathRoundedSquare, HiArrowUturnLeft, HiArrowUturnRight } from 'react-icons/hi2'
import { PiShuffle } from 'react-icons/pi'

import { createClient } from '@supabase/supabase-js'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Slider from "react-slick";

import { Categories, Questions, GameData, GameQuestion, GameCategory} from '@/types/games'
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '@/components/Header'
import Head from 'next/head'
import { checkUserAccess, getAuthUser } from '@/app/supabase-client'
import WelcomeForm from '@/components/welcome_form'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Option {
    id: number,
    category: string,
    checked: boolean,
}

interface SelectedOption {
  id: string | number; // Ensure this matches the 'id' type in GameCategory
  category: string;
  checked: boolean;
}

const Page: React.FC = () => {
    const pathname = usePathname();
    const slug = pathname?.split('/').pop();


    const [gameData, setGameData] = useState<any>([])
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [categoriesData, setCategoriesData] = useState<Categories[] | any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const [hasAccess, setHasAccess] = useState(false);
    const [loadingAccessCheck, setLoadingAccessCheck] = useState(false);


    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

        const checkUser = async () => {
            const user = await getAuthUser();

            if (!user) {
                router.push('/signin?redirect='+ pathname);
            }
        }

        checkUser();

        const fetchQuestions = async () => {
        let { data: result, error: gameError } = await supabase
        .rpc('fetchgamebyslug', {
            p_slug: slug
        }).single();

        // console.log(result);

        if (gameError) {
            console.error(gameError);
            router.push('/')
            setLoading(false);
            return;
        } else {

            const gameData: GameData = result as GameData;
            // console.log(gameData);

            const checkAccess = async () => {
                setLoadingAccessCheck(true);
                const access = await checkUserAccess(gameData.game_gid);
                setHasAccess(access);
                setLoadingAccessCheck(false);

                // console.log(gameData.game_gid, access);

                if (!access) {
                    router.push('/play')
                    return;
                }
            };

            if (gameData.game_privacy === 'private' ) {
                router.push('/play')
                return;
            }

            if (gameData.game_access !== 'free') {
                await checkAccess();
            } 



            setGameData(gameData);
            setCategoriesData(gameData.game_categories);
            setQuestions(shuffleArray(gameData.game_questions));
        }
            

        setLoading(false);
        };

        fetchQuestions();
    }, [slug]);

    useEffect(() => {
        const initialSelectedOptions: Option[] = categoriesData.map((category: { id: string | number; category: string }) => ({
            id: category.id,
            category: category.category,
            checked: true 
        }));
        setSelectedOptions(initialSelectedOptions);
    }, [categoriesData]);

    const handleShuffleButton = () => {
        setQuestions(shuffleArray(questions));
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    };

    const handleFilterChange = (changedCategory : GameCategory) => {

        setSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = prevSelectedOptions.map((option) => {
                if (option.category === changedCategory.category) {
                    return { ...option, checked: !option.checked }; // Toggle the 'checked' state
                }
                return option;
            });

            return updatedOptions;
        });
    };

    const filteredQuestions = questions.filter(question =>
        selectedOptions.some(option => option.category === question.category && option.checked)
    );

    // console.log('selected:', selectedOptions);

    const getCategoryColor = (category: string) => {
        const foundCategory = categoriesData.find((cat : GameCategory) => cat.category == category);
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
        <Header />
        <section className="flex  flex-col justify-center  relative mt-5">

                {loading && (
                    <div className="slider-container my-[150px] xl:my-[300px] flex items-center justify-center"> 
                        <div className="w-12 h-12 rounded-full animate-spin border-y border-solid border-5 border-yellow-500 border-t-transparent"></div>
                    </div>
                )}
                <div className="slider-container my-[100px] xl:my-[250px]">
                    <Slider ref={sliderRef}
                        {...settings}>
                        {filteredQuestions.map((question, index) => {
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
                <button className="rounded-2xl p-5 bg-[#272727] hover:opacity-50" onClick={previous}>
                    <HiArrowUturnLeft size="24"/>
                </button>

                <button className="rounded-2xl p-5 bg-[#272727] hover:opacity-50" onClick={handleShuffleButton}>
                    <PiShuffle size="24" />
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        className="rounded-2xl p-5 bg-[#272727] hover:opacity-50"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <CiFilter size={24} />
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 bg-[#272727] border-black rounded-md shadow-lg bottom-full mb-3 p-3 overflow-auto max-h-80 w-[200px] left-[-50px]">
                        {/* Content of your dropdown */}
                        <p className="mb-2">Filters</p>
                        {categoriesData.map((option : GameCategory, index : number) => (
                            <div key={index} className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id={option.category}
                                checked={selectedOptions.some(selectedOption => selectedOption.category === option.category && selectedOption.checked)}
                                onChange={() => handleFilterChange(option)} // Pass the whole category object
                                className="form-checkbox min-h-5 min-w-5 text-blue-600"
                            />
                            <label className="flex items-center space-x-3cursor-pointer" htmlFor={option.category}>
                                <span className="flex-1">{option.category} <span className="text-sm">({option.question_count})</span></span>
                            </label>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>

                <button className="rounded-2xl p-5 bg-[#272727] hover:opacity-50" onClick={next}>
                    <HiArrowUturnRight size="24"/>
                </button>
            </div>

            <WelcomeForm />
            
            <GoogleAnalytics gaId="G-X05HE2M1XM" />
        </section>
    </>
  )
}

export default Page
