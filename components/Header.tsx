import { Grandstander } from 'next/font/google';
import Link from 'next/link';
import React from 'react'
import { CiFilter, CiUser } from "react-icons/ci";
import { GrAppsRounded } from "react-icons/gr";

const grandstander = Grandstander({
  weight: '600',
  subsets: ['latin'],
});

// import localFont from 'next/font/local'
// const DancingScript = localFont({
//   src: [
//     {
//       path: '../assets/fonts/DancingScript-Regular.otf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/DancingScript-Bold.otf',
//       weight: '700',
//       style: 'normal',
//     }
//   ],
// })

import ChitChatIcon from '@/assets/icons/logo_icon.svg'

import Image from 'next/image';

const Header = ({filter = false}) => {
  return (
    <header className=" flex justify-between w-full p-5">
        <div className="flex justify-between w-full items-center">
            <Link href="/play">
              <button className="rounded-2xl p-5 bg-[#272727]">
                  <GrAppsRounded size="24" /> 
              </button>
            </Link>

            <Link href="/">
              <div className="flex gap-2 items-start justify-center"> 
                <Image src={ChitChatIcon} alt="test" className="w-[30px]"/>
                <p className={`text-3xl ${grandstander.className} tracking-[0.05em]`} >
                  Chit<span className="text-[#FFD700]">Chat</span>
                </p>
                
              </div>
            </Link>

            {filter ? (
              <button className="rounded-2xl p-5 bg-[#272727]">
                  <CiFilter size="24" />
              </button>
            ) : (
              <button className="rounded-2xl p-5 bg-[#272727]">
                  <CiUser size="24" />
              </button>
            )}


        </div>
    </header>
  )
}

export default Header
