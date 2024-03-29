"use client"
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

import SweetAlert2 from 'react-sweetalert2';


import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
    PayPalButtonsComponentProps,
    ReactPayPalScriptOptions
} from "@paypal/react-paypal-js";
import { getAuthUser, createClientSupabaseClient, checkUserAccess} from '@/app/supabase-client'

import {GameAccess, Payment} from '@/types/main'

const style : any= {"layout": "horizontal", "color": "black", "label": "pay"};

interface DeckCardProps {
    game: GameData;
}

const initialOptions : ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "PHP",
    intent: "capture",
};

const DeckCard: React.FC<DeckCardProps> = ({game}) => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [categoriesData, setCategoriesData] = useState<Categories[] | any>([]);

    const [hasAccess, setHasAccess] = useState(false);
    const [loadingAccessCheck, setLoadingAccessCheck] = useState(false);
    const [swalProps, setSwalProps] = useState({});

    // console.log(game);

    useEffect(() => {
        setCategoriesData(game.game_categories);
    }, [game.game_categories])

    const checkAccess = async () => {
        setLoadingAccessCheck(true);
        const access = await checkUserAccess(game.game_gid);
        setHasAccess(access);
        setLoadingAccessCheck(false);

        console.log(game.game_gid, access);
    };

    useEffect(() => {
        if (game.game_access !== 'free') {
            checkAccess();
        } else {
           
        }
    }, [game]);


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

    const createOrder = (data : any, actions : any) => {

        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: "PHP",
                    value: 249.00, // Use the price prop
                },
            }],
            application_context: {
                shipping_preference: 'NO_SHIPPING' // Disable shipping
            }
        });
    };

    const onApprove = (data: any, actions: any) => {

        return actions.order.capture().then(async (details: any) => {

            const supabase = createClientSupabaseClient();
            const user = await getAuthUser();
            console.log('User', user)
            console.log(game.game_gid)
            console.log('Payment successful!', details);

            // Construct the payment object
            const payment: Payment = {
                uid: user?.id,
                gid: game.game_gid,
                transaction_id: details.id,
                transaction_details: details, // Assuming 'details' is the object you want to store
            };

            // Construct the game access object
            const gameAccess: GameAccess = {
                uid: user?.id,
                gid: game.game_gid,
                access_type: 'one-time-purchase', 
                status: 'active', 
            };

            const { data: paymentData, error: paymentError } = await supabase
            .from('payments')
            .insert([payment]);

            const { data: accessData, error: accessError } = await supabase
            .from('game_access')
            .insert([gameAccess]);

            if (paymentError) {
                console.error('Error inserting payment:', paymentError);
            } else {
                console.log('Inserted payment:', paymentData);
            }

            if (accessError) {
                console.error('Error inserting game access:', accessError);
            } else {
                console.log('Inserted game access:', accessData);

                setHasAccess(true);


                setSwalProps({
                    show: true,
                    title: 'Success! ',
                    text: 'Your purchase has been confirmed. You may now access the deck!',
                    customClass: {
                        container: 'bg-[#151515] text-white',
                        popup: 'bg-[#151515]',
                        htmlContainer: 'text-white',
                        title: 'text-primary',
                        confirmButton: 'text-center text-[#151515] bg-[#e7e7e7] rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80',
                    },
                    buttonsStyling: false,
                });
            }

        });
    };

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
                <div className="h-full flex items-center justify-center ">
                    <button type="button" className="z-[100] bg-black  bg-opacity-50 rounded-full p-4 rounded-full" onClick={onClick} onTouchStart={onClick}> 
                        <GrNext className="text-center text-[#e7e7e7]" size="16" />
                    </button>
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
                    <button type="button" className="z-[100] bg-black  bg-opacity-50 rounded-full p-4 rounded-full" onClick={onClick} onTouchStart={onClick}> 
                        <GrPrevious className="mx-auto text-center text-[#e7e7e7]" size="16" />
                    </button>
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
        <div className="relative z-[-1] md:group-hover:z-99">
            <Image src={game.game_thumbnail} alt={game.game_title} className="rounded-xl" width={500} height={500}/>
            
            {game.game_access === 'free' ? (<div className="absolute top-0 right-0 duration-300">
                <div className="rounded-full bg-[green] py-1 px-3 m-2">
                    <p className="text-sm  text-[white] text-center ">Open</p>
                </div>
            </div>) : 
            hasAccess ? (<div className="absolute top-0 right-0 duration-300">
                <div className="rounded-full bg-[green] py-1 px-3 m-2">
                    <p className="text-sm  text-[white] text-center ">
                    Unlocked
                    </p>
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

        <div className="absolute inset-0 flex flex-col justify-between transition duration-300 ease-in-out opacity-0 md:group-hover:opacity-100 sm:hidden md:block shadow-lg !z-[99]">
            <div className="relative !z-[99]">
                <Image src={game.game_thumbnail} alt={game.game_title} className="rounded-xl" width={500} height={500}/>
                {game.game_access === 'free' ? (<div className="absolute top-0 right-0 duration-300">
                    <div className="rounded-full bg-[green] py-1 px-3 m-2">
                        <p className="text-sm  text-[white] text-center ">Open</p>
                    </div>
                    </div>) : 
                    hasAccess ? (<div className="absolute top-0 right-0 duration-300">
                        <div className="rounded-full bg-[green] py-1 px-3 m-2">
                            <p className="text-sm  text-[white] text-center ">
                            Unlocked
                            </p>
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
                <div className="absolute bottom-0 w-full duration-300 !z-[99]">
                    <div className="rounded-t-lg bg-[red] mx-auto w-[50%] p-1">
                        <p className="text-sm font-bold text-[white] text-center ">Recently Added</p>
                    </div>
                    
                    <div className="rounded-b-xl bg-[#ffd700] mx-auto p-1 text-center group-hover:rounded-b-[0px] duration-300">
                        <p className="text-md font-bold text-[#151515]">{game.game_title}</p>
                    </div>
                </div>
            </div>
            <div className="rounded-b-xl  w-full bg-[#181818] p-4 hidden group-hover:block duration-300 !z-[99]">
                <div className="flex gap-2 mb-4 justify-between !z-[99]"> 
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
                                    <div className="text-center p-10 sm:translate-y-[60%] translate-y-[15%]" >
                                        <div className=" bg-opacity-50 p-5 rounded-xl w-[85%] mx-auto "> 
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
                            {loadingAccessCheck ? (
                                <p>Loading...</p> // Loading state while checking access
                            ) : game.game_access === 'free' || hasAccess ? (
                                <Link className="w-full text-center text-[#e7e7e7] bg-[#151515] rounded-lg border px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80" href={`/play/${game.game_slug}`}>View Deck</Link>
                            ) : (
                                <> 
                                    <p className="w-full text-center text-[#151515] bg-[#e7e7e7] rounded-lg px-6 py-3 font-semibold text-sm shadow-md ">Unlock this Deck for Php 249.00 </p>
                                    <PayPalScriptProvider options={initialOptions}>
                                        <PayPalButtons
                                        style={style}
                                        disabled={false}
                                        forceReRender={[style]}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        className="w-full text-center text-[#151515] bg-[#e7e7e7] rounded-lg px-6 py-3 font-semibold text-sm shadow-md "
                                        />
                                    </PayPalScriptProvider>
                                </>
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

    <SweetAlert2 {...swalProps}
        didClose={() => {
            setSwalProps({})
        }}
    />
    </>
    
  )
}

export default DeckCard
