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
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const SignUpForm = () => {

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

    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        console.log(formData);

        const username = Math.random().toString(36).substring(2, 15);

        try {
            const { data: response, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: username,
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                    },
                },
            });

            if (error) {
                console.log(error);
                throw error;
            }

            if (response) {
                router.push(`/play`);
            }
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
      <div className="flex gap-2 justify-between mb-3">
                <div className="w-full">
                    <label htmlFor="first_name" className="block text-sm font-medium leading-6">
                        First Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                        type="text"
                        id="first_name"
                        className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                        placeholder="Enter First Name"
                        {...register('first_name')}
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
                        id="last_name"
                        className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                        placeholder="Enter Last Name"
                        {...register('last_name')}
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
                    id="email"
                    className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                    placeholder="Enter Email"
                    {...register('email')}
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
                    id="password"
                    className="block w-full rounded-md border-0 py-2 px-4 bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                    placeholder="Enter Password"
                    {...register('password')}
                    />
                </div>
            </div>

            <button type="submit" className="w-full text-center text-[#151515] bg-primary rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80 flex gap-1 items-center justify-center my-4" disabled={isSubmitting} > 
                <IoLogInOutline size={18}/> {isSubmitting ? 'Loading...' : 'Sign Up'}
            </button>

            <p className="text-center">Already have an account? <Link href="signin" className="text-primary hover:opacity-80">Sign in.</Link></p>
    </form>
  )
}

export default SignUpForm
