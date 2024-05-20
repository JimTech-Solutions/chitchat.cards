import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <section>
      <div className="text-center my-[50px] p-5">
        <h2 className="text-4xl lg:text-6xl mb-5">Deepen Your Talks<br /><span className="text-[#FFD700]">One Question at a Time</span></h2>
        
        <div className="my-5 text-lg"> 
            <p>ChitChat brings you closer to your loved ones through fun, thought-provoking games and questions.</p> 
            <p>Dive into topics that matter and explore each other's worlds — one question at a time.</p>
        </div>

        <div className="my-10 space-x-2">
            <Link className="w-full text-center text-[#151515] bg-[#FFD700] rounded-lg px-6 py-3 font-semibold text-md shadow-md  hover:bg-[#e7e7e7]" href="/play">Start your chat</Link>
            <Link className="w-full text-center text-[#151515] bg-gray-200 rounded-lg px-6 py-3 font-semibold text-md shadow-md  hover:bg-[#e7e7e7]" href="/play">Generate Questions</Link>

        </div>

        <p className="my-5 text-muted text-md">Access 10,000+ questions in different categories and deepen your conversations.</p>
        
      </div>
    </section>
  )
}

export default HeroSection
