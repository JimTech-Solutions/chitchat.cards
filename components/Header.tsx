import React from 'react'
import { Grandstander } from 'next/font/google';
import Link from 'next/link';
import { CiFilter, CiUser } from "react-icons/ci";
import { GrAppsRounded } from "react-icons/gr";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-[#181818] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none drop-shadow-xl">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Login
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Shop
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Request a Feature
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Contribute
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    
                  </Menu.Items>
                </Transition>
              </Menu>
            )}


        </div>
    </header>
  )
}

export default Header
