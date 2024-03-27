
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


import SignUpForm from "@/components/(auth)/signup_form";


import { redirect } from 'next/navigation';
import { getAuthUser } from '@/app/supabase-server';
import SocialButtons from "@/components/(auth)/socials_buttons";


export default async function Home() {
  const user = await getAuthUser();

  if (user) {
      redirect('/play');
  }

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
                
                <SocialButtons />
                
                <div className="relative flex py- items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">or with Email</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
            </div>

            <SignUpForm />
        </div>
      </div>



      <GoogleAnalytics gaId="G-X05HE2M1XM" />
    </main>
  );
}
