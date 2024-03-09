import { Grandstander } from 'next/font/google';
import Link from 'next/link';
import React from 'react'
import { CiUser } from "react-icons/ci";
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


const Header = () => {
  return (
    <header className="bg-[#151515] flex justify-between w-full p-5">
        <div className="flex justify-between w-full items-center">
            <Link href="/">
              <button className="rounded-2xl p-5 bg-[#272727]">
                  <GrAppsRounded size="24" /> 
              </button>
            </Link>

            <p className={`text-3xl ${grandstander.className} tracking-[0.05em]`} >ChitChat</p>

            <button className="rounded-2xl p-5 bg-[#272727]">
                <CiUser size="24" />
            </button>
            
        </div>
    </header>
  )
}

export default Header
