import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { HiArrowPathRoundedSquare, HiArrowUturnLeft, HiArrowUturnRight } from 'react-icons/hi2'
import { PiShuffle } from 'react-icons/pi'

const page = () => {
  return (
    <section className="flex min-h-screen flex-col justify-center top-[-100px] relative ">
        <div className="text-center p-10 min-h-[600px] flex flex-col justify-center">
            <p className="text-[red] mb-3">Love and Relationships</p>
            <p className="text-2xl">What's your most previous memory of us?</p>
        </div>
        

        <div className="flex justify-center w-full items-center gap-3 xl:gap-5 mt-20">
            <button className="rounded-2xl p-5 bg-[#272727]">
                <HiArrowUturnLeft size="24"/>
            </button>

            <button className="rounded-2xl p-5 bg-[#272727]">
                <PiShuffle size="24"/>
            </button>

            <button className="rounded-2xl p-5 bg-[#272727]">
                <CiHeart size="24"/>
            </button>

            <button className="rounded-2xl p-5 bg-[#272727]">
                <HiArrowUturnRight size="24"/>
            </button>
        </div>
    </section>
  )
}

export default page
