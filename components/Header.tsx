import React, { useEffect, useRef, useState } from 'react'
import { Grandstander } from 'next/font/google';
import Link from 'next/link';
import { CiFilter, CiUser } from "react-icons/ci";
import { GrAppsRounded } from "react-icons/gr";

import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

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
import { getAuthUser, logOutUser} from '@/app/supabase-client';
import { User } from '@/types/main';
import { useUser } from '@/context/UserContext';
import ContactForm from './contact_form';
import { IoClose } from 'react-icons/io5';

const Header = ({filter = false}) => {

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const { user, refreshUser } = useUser();

  const handleLogout = () => { 
    logOutUser();
    refreshUser();
  }

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
              <button className="rounded-2xl p-5 bg-[#272727] hover:opacity-50">
                  <CiFilter size="24" />
              </button>
            ) : (

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="rounded-2xl p-5 bg-[#272727] hover:opacity-50">
                    <CiUser size="24" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 !z-[999] mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-[#181818] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none drop-shadow-xl ">
                    <div className="py-1">

                      {user && (
                        <div className="p-3 px-5 text-wrap w-full">
                          <p className="text-sm ">
                            {user.user_metadata.first_name}
                          </p> 
                          <span className="text-xs"> 
                            {user.email}
                          </span>
                        </div>
                      )}

                      {!user && (
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <Link
                              href="/signin"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      ) }
                    
                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                              'block px-4 py-2 text-sm'
                            )}
                            onClick={() => setOpen(true)}
                          >
                            Request a Feature
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <Link
                            href="https://github.com/JimTech-Solutions/chitchat.cards"
                            target='_blank'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Contribute
                          </Link>
                        )}
                      </Menu.Item>
                      {user && (
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <Link
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={handleLogout}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      ) }
                    </div>
                    
                  </Menu.Items>
                </Transition>
              </Menu>
            )}


        </div>

        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto overflow-y-auto flex justify-center items-center min-h-screen " ref={modalContentRef}>
            <div className="flex items-end justify-center p-4  sm:items-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-[#151515] text-left shadow-xl transition-all max-w-xl min-w-xl my-5 p-10 ">

                      <ContactForm setOpen={setOpen}/> 

                    </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    </header>
  )
}

export default Header
