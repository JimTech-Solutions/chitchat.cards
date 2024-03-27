
"use client"
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularDeckSection from "@/components/popular_deck_section";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ChitChatIcon from '@/assets/icons/logo_icon.svg'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { IoLogIn, IoLogInOutline } from "react-icons/io5";


export default function Home() {

  
  return (
    <main className="min-h-screen">
      <Head>
        <title>ChitChat - Sign up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="description" content="Boost your relationships with ChitChat! Explore interactive games and intriguing questions designed for couples and friends." />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="ChitChat - Sign up" />
        <meta property="og:description" content="Boost your relationships with ChitChat! Explore interactive games and intriguing questions designed for couples and friends." />
        <meta property="og:image" content="https://chitchat.cards/images/thumbnail.png" />
        <meta property="og:url" content="https://chitchat.cards" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChitChat - Sign up" />
        <meta name="twitter:description" content="Boost your relationships with ChitChat! Explore interactive games and intriguing questions designed for couples and friends." />
        <meta name="twitter:image" content="https://chitchat.cards/images/thumbnail.png" />
      </Head>

      <div className="flex justify-center items-center min-h-screen"> 
        <div></div>
        
        <div className="bg-[#1d1d1d] px-8 py-10 m-3 rounded-xl sm:min-w-[100%] md:min-w-[500px]">
            <div className="mb-4 text-center"> 
                <Link href="/">
                    <div className="flex gap-2 items-start justify-center mb-3"> 
                        <Image src={ChitChatIcon} alt="test" className="w-[30px]"/>
                        <p className={`text-3xl tracking-[0.05em]`} >
                        Chit<span className="text-[#FFD700]">Chat</span>
                        </p>
                    </div>
                </Link>


                <p className="text-md">Welcome to ChitChat!</p>
                <p className="text-md">Sign up to create your account.</p>
                
                <div className="my-4"> 
                    <button className="text-gray-900  border border-gray-300 focus:outline-none hover:opacity-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:text-white flex gap-2 w-full justify-center text-[blue]">
                            <FaFacebook /> Sign in with Facebook
                    </button>
                    <button className="text-gray-900  border border-gray-300 focus:outline-none hover:opacity-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:text-white flex gap-2 w-full justify-center">
                            <FaGoogle /> Sign in with Google
                    </button>
                </div>
                
                <div className="relative flex py- items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">or with Email</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
            </div>

            <div className="flex gap-2 justify-between mb-3">
                <div className="w-full">
                    <label htmlFor="first_name" className="block text-sm font-medium leading-6">
                        First Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                        type="text"
                        name="last_name"
                        id="first_name"
                        className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                        placeholder="Enter First Name"
                        />
                    </div>
                </div>
                <div className=" w-full">
                    <label htmlFor="last_name" className="block text-sm font-medium leading-6">
                        Last Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                        placeholder="Enter First Name"
                        />
                    </div>
                </div>

            </div>
            <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                    Email
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                    type="email"
                    name="Email"
                    id="email"
                    className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                    placeholder="Enter Email"
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Password
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                    type="password"
                    name="Password"
                    id="password"
                    className="block w-full rounded-md border-0 py-2 px-4 bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                    placeholder="Enter Password"
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Confirm Password
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                    type="password"
                    name="Password"
                    id="password"
                    className="block w-full rounded-md border-0 py-2 px-4 bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                    placeholder="Confirm Password"
                    />
                </div>
            </div>
            <button type="button" className="w-full text-center text-[#151515] bg-primary rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80 flex gap-1 items-center justify-center my-4"> <IoLogInOutline size={18}/> Sign up</button>

            <p className="text-center">Already have an account? <Link href="signin" className="text-primary hover:opacity-80">Sign in.</Link></p>
        </div>
      </div>



      <GoogleAnalytics gaId="G-X05HE2M1XM" />
    </main>
  );
}
