"use client"
import Link from 'next/link'
import React from 'react'
import { IoLogInOutline } from 'react-icons/io5'

import { SubmitHandler, useForm } from 'react-hook-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const SignInForm = () => {
    const supabase = createClientComponentClient<any>();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const { data: response, error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                console.log(error);
                throw error;
            }

            router.push('/');
        } catch (error) {
            console.log('error', error);
            setError('root', {
                message: '' + error,
            });
        }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
            <div className="flex items-center rounded bg-red-400 p-3.5 text-danger mb-4">
                <span>{errors.root.message}</span>
            </div>
        )}
      <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                    Email
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                    type="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                    placeholder="Enter Email"
                    {...register('email')}
                    />
                </div>
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Password
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                    type="password"
                    id="password"
                    className="block w-full rounded-md border-0 py-2 px-4 bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                    placeholder="Enter Password"
                    {...register('password')}
                    />
                </div>
                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}
                <Link className="text-sm float-right mb-3 mt-1 hover:text-primary" href="#">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full text-center text-[#151515] bg-primary rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80 flex gap-1 items-center justify-center my-4" disabled={isSubmitting} > 
                <IoLogInOutline size={18}/> {isSubmitting ? 'Loading...' : 'Sign in'}
            </button>

            <p className="text-center">Don't have an account? <Link href="signup" className="text-primary hover:opacity-80">Sign up.</Link></p>
    </form>
  )
}

export default SignInForm
