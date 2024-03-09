import React from 'react'
import { CiUser } from "react-icons/ci";
import { GrAppsRounded } from "react-icons/gr";

const Header = () => {
  return (
    <header className="bg-[#151515] flex justify-between w-full p-5">
        <div className="flex justify-between w-full items-center">
            <button className="rounded-2xl p-5 bg-[#272727]">
                <GrAppsRounded size="24" /> 
            </button>

            <p className="text-2xl">ChitChat</p>

            <button className="rounded-2xl p-5 bg-[#272727]">
                <CiUser size="24" />
            </button>
            
        </div>
    </header>
  )
}

export default Header
