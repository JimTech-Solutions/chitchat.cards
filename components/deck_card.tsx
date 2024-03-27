import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { IconBase } from 'react-icons';
import { IoBookmarkOutline, IoChevronDown, IoClose, IoPlay, IoThumbsUp } from 'react-icons/io5';
import { FaThumbsUp } from 'react-icons/fa';
import Slider from "react-slick";

import parse from 'html-react-parser';

import { Game, GameData, Categories, Questions, GameCategory } from '@/types/games'
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { GrNext, GrPrevious } from 'react-icons/gr';
interface DeckCardProps {
    game: GameData;
}

const DeckCard: React.FC<DeckCardProps> = ({game}) => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [categoriesData, setCategoriesData] = useState<Categories[] | any>([]);

    useEffect(() => {
        setCategoriesData(game.game_categories);
    }, [game.game_categories])


    useEffect(() => {
        const handleScroll = (event : any) => {
            const { scrollTop, scrollHeight, clientHeight } = event.target;
            if (scrollTop + clientHeight >= scrollHeight || scrollTop === 0) {
            setOpen(false); // Closes the modal if scrolled to top or bottom
            }
        };

        const modalContent = modalContentRef.current;
        if (modalContent) {
            modalContent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (modalContent) {
            modalContent.removeEventListener('scroll', handleScroll);
            }
        };

    }, []);

    const handleTouchStart = (e : any) => {
    setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e : any) => {
    setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
        // Swipe Left
        setOpen(false);
    }

    if (touchStart - touchEnd < -150) {
        // Swipe Right
        setOpen(false);
    }
    };

    // console.log(game)

    function NextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={` absolute top-0 right-0 p-4  h-full`}
                style={{ ...style, }}
                
            >
                <div className="h-full flex items-center justify-center">
                    <div className="z-[10] bg-black  bg-opacity-50 rounded-full p-4 rounded-full" onClick={onClick}> 
                        <GrNext className="text-center text-[#e7e7e7]" size="16" />
                    </div>
                </div>
            </div>
        );
    }

    function PrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`absolute top-0 left-0 p-4  h-full`}
                style={{ ...style, }}
            >
                <div className="h-full flex items-center justify-center">
                    <div className="z-[10] bg-black  bg-opacity-50 rounded-full p-4 rounded-full" onClick={onClick}> 
                        <GrPrevious className="mx-auto text-center text-[#e7e7e7]" size="16" />
                    </div>
                </div>
            </div>
        );
    }

    const getCategoryColor = (category: string) => {
        const foundCategory = categoriesData?.find((cat : GameCategory) => cat.category == category);
        return foundCategory ? foundCategory.color : 'white'; 
    };

    const settings = {
        dots: true,
        speed: 500,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
  return (
    <> 
    <div className="group relative duration-300 m-5 md:hover:drop-shadow-xl hover:scale-[1.05]" onClick={() => setOpen(true)}>
        <div className="relative">
            <Image src={game.game_thumbnail} alt={game.game_title} className="rounded-xl" width={500} height={500}/>
            
            {game.game_access === 'free' ? (<div className="absolute top-0 right-0 duration-300">
                <div className="rounded-full bg-[green] py-1 px-3 m-2">
                    <p className="text-sm  text-[white] text-center ">Open</p>
                </div>
            </div>) : 
            (<div className="absolute top-0 right-0 duration-300">
                <div className="rounded-full bg-gray-500 py-1 px-3 m-2">
                    <p className="text-sm  text-[white] text-center ">
                    Locked
                    </p>
                </div>
            </div>) 
            }
            
            <div className="absolute bottom-0 w-full duration-300">
                <div className="rounded-t-lg bg-[red] mx-auto w-[50%] p-1">
                    <p className="text-sm font-bold text-[white] text-center ">Recently Added</p>
                </div>
                
                <div className="rounded-b-xl bg-[#ffd700] mx-auto p-1 text-center md:group-hover:rounded-b-[0px] duration-300">
                    <p className="text-md font-bold text-[#151515]">{game.game_title}</p>
                </div>
            </div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between transition duration-300 ease-in-out opacity-0 md:group-hover:opacity-100 sm:hidden md:block ">
            <div className="relative">
                <Image src={game.game_thumbnail} alt={game.game_title} className="rounded-xl" width={500} height={500}/>
                {game.game_access === 'free' ? (<div className="absolute top-0 right-0 duration-300">
                    <div className="rounded-full bg-[green] py-1 px-3 m-2">
                        <p className="text-sm  text-[white] text-center ">Open</p>
                    </div>
                    </div>) : 
                    (<div className="absolute top-0 right-0 duration-300">
                        <div className="rounded-full bg-gray-500 py-1 px-3 m-2">
                            <p className="text-sm  text-[white] text-center ">
                            Locked
                            </p>
                        </div>
                    </div>) 
                }
                <div className="absolute bottom-0 w-full duration-300">
                    <div className="rounded-t-lg bg-[red] mx-auto w-[50%] p-1">
                        <p className="text-sm font-bold text-[white] text-center ">Recently Added</p>
                    </div>
                    
                    <div className="rounded-b-xl bg-[#ffd700] mx-auto p-1 text-center group-hover:rounded-b-[0px] duration-300">
                        <p className="text-md font-bold text-[#151515]">{game.game_title}</p>
                    </div>
                </div>
            </div>
            <div className="rounded-b-xl relative w-full bg-[#181818] p-4 hidden group-hover:block duration-300">
                <div className="flex gap-2 mb-4 justify-between"> 
                    <div className="flex gap-2"> 
                        <Link href={`/play/${game.game_slug}`} className="bg-black hover:opacity-50 p-2 rounded-full border-2 border-[##e7e7e7]"><IoPlay size={24}/></Link>
                        <button className="bg-black hover:opacity-50  p-2 rounded-full border-2 border-[##e7e7e7] text-[##e7e7e7]"><IoBookmarkOutline size={24}/></button>
                    </div>
                    <div>
                        <button className="bg-black hover:opacity-50 p-2 rounded-full border-2 border-[##e7e7e7] text-[##e7e7e7]" onClick={() => setOpen(true)}><IoChevronDown size={24}/></button>
                    </div>
                </div>
                <p className="text-md ">{game.game_short_description}</p>
                <div className="flex gap-2 mt-2"> 
                    {game.game_recommended.map((x, index) => {
                        return (<span key={index} className="py-2 px-4 bg-black">{x}</span>);
                    })}

                </div>
            </div>
        </div>
    </div>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto"
            ref={modalContentRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-[#151515] text-left shadow-xl transition-all max-w-4xl my-5">
                <button onClick={() => setOpen(false)} className="absolute right-0 p-2 z-[100] hover:cursor-pointer hover:opacity-80 bg-[#151515] rounded-full m-3">
                    <IoClose size={24} className="text-gray-200"/>
                </button>
                <div className="relative">

                    <div className="slider-container ">
                        <Slider {...settings}>
                            <div> 
                            <Image src={game.game_thumbnail} alt={game.game_title} className="rounded-xl w-100 max-h-[500px] object-cover" width={1000} height={1000}/>

                            </div>

                            {game.game_questions
                            .filter(question => question.featured)
                            .map(question => {
                                const textColor = getCategoryColor(question.category);
                                return(
                                    <div className="text-center p-10 translate-y-[50%]" >
                                        <div className=" bg-opacity-50 p-5 rounded-xl w-[80%] mx-auto "> 
                                            <p className={`mb-3`} style={{ color: textColor }}>{question.category}</p>
                                            <p className="text-2xl">{question.question}</p>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </Slider>
                    </div>

                    <div className="absolute bottom-0 w-full duration-300">
                        <div className="rounded-t-lg bg-[red] mx-auto w-[50%] p-1">
                            <p className="text-sm font-bold text-[white] text-center ">Recently Added</p>
                        </div>
                        
                        <div className=" bg-[#ffd700] mx-auto p-1 text-center group-hover:rounded-b-[0px] duration-300">
                            <p className="text-md font-bold text-[#151515]">{game.game_title}</p>
                        </div>
                    </div>
                </div>


                <div className="bg-[#151515] px-2 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                   
                    <div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left">
                     <div className="p-4">
                        <p className="text-lg mb-3 font-bold">Description</p>
                        <p className="text-md mb-3">{parse(game.game_long_description)}</p>
                        <p className="mb-3">Number of Questions: {game.total_questions}</p>
                        <p className="mb-3">Recommended for:</p>
                        <div className="flex gap-3">
                            {game.game_recommended.map((x, index) => {
                                return (<span key={index} className="py-2 px-4 bg-black">{x}</span>);
                            })}
                        </div>
                        <div className="my-6 flex gap-3 flex-wrap">
                            {game.game_access === 'free' ? (
                                <Link className="w-full text-center text-[#e7e7e7] bg-[#151515] rounded-lg border px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80" href={`/play/${game.game_slug}`}>View Deck</Link>
                            ) : (
                                <Link className="w-full text-center text-[#151515] bg-[#e7e7e7] rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80" href="/">Unlock Deck</Link>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
    
  )
}

export default DeckCard
