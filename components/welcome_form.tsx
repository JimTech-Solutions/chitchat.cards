import React from 'react'

import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import { FaWaveSquare } from 'react-icons/fa'
import {Steps, StepsProvider, useSteps } from "react-step-builder";
import { UserIcon } from '@heroicons/react/24/outline'
import { createClientSupabaseClient, getAuthUser } from '@/app/supabase-client'
import WelcomeFormModal from './welcome_form_modal'
import { useUser } from '@/context/UserContext'

const WelcomeForm: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { 
        const checkWelcomeStatus = async () => {
            const supabase = createClientSupabaseClient(); 
             const user = await getAuthUser();
            if (user) {
                let { data: welcome_form, error } = await supabase
                .from('welcome_form')
                .select("*")
                .eq('uid', user.id);

                if (error) {
                    console.log('welcome form', error)
                }

                if (!welcome_form || welcome_form.length === 0) {
                    setShowModal(true);
                }  
            }
        };

        checkWelcomeStatus();
    }, []); // Empty dependency array means this effect runs once on component mount

    return (
        <>
            {showModal && (
                <StepsProvider> 
                    <WelcomeFormModal />
                </StepsProvider>
            )}
        </>
    );
}

export default WelcomeForm;