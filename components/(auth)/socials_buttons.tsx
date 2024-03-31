"use client"
import React from 'react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'

import { SubmitHandler, useForm } from 'react-hook-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';


const handleFacebookAuth = async () => {
    const supabase = createClientComponentClient<any>();

    let { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook'
    })

}

const handleGoogleAuth = async () => {
    const supabase = createClientComponentClient<any>();

    let { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
    })

}

const SocialButtons = () => {
  return (
    <div className="my-4"> 
        {/* <button type="button" className="text-gray-900  border border-gray-300 focus:outline-none hover:opacity-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:text-white flex gap-2 w-full justify-center text-[blue]"
        onClick={handleFacebookAuth}>
                <FaFacebook /> Sign in with Facebook
        </button> */}
        <button type="button" className="text-gray-900  border border-gray-300 focus:outline-none hover:opacity-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:text-white flex gap-2 w-full justify-center"
        onClick={handleGoogleAuth}>
                <FaGoogle /> Sign in with Google
        </button>
    </div>
  )
}

export default SocialButtons
