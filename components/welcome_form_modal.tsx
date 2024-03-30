import React from 'react'

import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import { FaWaveSquare } from 'react-icons/fa'
import {Steps, useSteps } from "react-step-builder";
import { UserIcon } from '@heroicons/react/24/outline'
import { createClientSupabaseClient, getAuthUser } from '@/app/supabase-client'

interface FormOption {
  label: string;
  value: string;
}

interface FormQuestion {
  title: string;
  options: FormOption[];
}

interface SelectedOptions {
  [key: number]: { [key: string]: boolean };
}

interface FormDataItem {
  question: string;
  options: string[];
}


const questions : FormQuestion[]= [
  {
    title: "How did you discover ChitChat?",
    options: [
      { label: 'Social Media (Instagram, Facebook, TikTok, Twitter)', value: 'Social Media' },
      { label: 'Referral from a friend or family member', value: 'referral' },
      { label: 'Online Advertisement', value: 'online_advertisement' },
      { label: 'News article / Blog post', value: 'articles' },
      { label: 'Search Engines (Google, Bing)', value: 'search_engine' },
      { label: 'Others', value: 'others' },
    ],
  },
  {
    title: "What's the primary reason you're using ChitChat today?",
    options: [
      { label: 'Improve communication skills', value: 'Improve communication skills' },
      { label: 'Strengthen personal relationships', value: 'Strengthen personal relationships' },
      { label: 'Team building or professional development', value: 'Team building or professional development' },
      { label: 'Entertainment and fun', value: 'Entertainment and fun' },
      { label: 'Educational purposes', value: 'Educational purposes' },
      { label: 'Others', value: 'Others' },
    ],
  },
  {
    title: "Who are you planning to interact with on ChitChat?",
    options: [
      { label: 'Alone for self-reflection', value: 'Alone for self-reflection' },
      { label: 'Friends', value: 'Friends' },
      { label: 'Family', value: 'Family' },
      { label: 'Partner/Spouse', value: 'Partner/Spouse' },
      { label: 'Online community', value: 'Online community' },
      { label: 'Others', value: 'Others' },
    ],
  },
  {
    title: "What is your age group?",
    options: [
      { label: 'Under 18', value: 'Under 18' },
      { label: '18-24', value: '18-24' },
      { label: '25-34', value: '25-34' },
      { label: '35-44', value: '35-44' },
      { label: '45-54', value: '45-54' },
      { label: '55-64', value: '55-64' },
      { label: '64 or older', value: '64 or older' },
    ],
  },
  {
    title: "Which of the following topics are you most interested in?",
    options: [
      { label: 'Personal growth and self-improvement', value: 'Personal growth and self-improvement' },
      { label: 'Relationships and dating', value: 'Relationships and dating' },
      { label: 'Career and professional development', value: 'Career and professional development' },
      { label: 'Mental and physical health', value: 'Mental and physical health' },
      { label: 'Science and technology trends', value: 'Science and technology trends' },
      { label: 'Art, music, and entertainment', value: 'Art, music, and entertainment' },
      { label: 'Travel and cultures', value: 'Travel and cultures' },
      { label: 'Politics and social issues', value: 'Politics and social issues' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    title: "How frequently do you plan to use ChitChat?",
    options: [
      { label: 'Daily', value: 'Daily' },
      { label: 'Several times a week', value: 'Several times a week' },
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Occasionally/as needed', value: 'Occasionally/as needed' },
    ],
  },
];

const WelcomeFormModal: React.FC = () => {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const modalContentRef = useRef<HTMLDivElement>(null);

    const { prev, next, total, current } = useSteps();
    const [formStart, setFormStart] = useState(false);
    const [formEnd, setformEnd] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
    const [formData, setFormData] = useState<FormDataItem[]>([]);

    const toggleOption = (questionIndex : number, optionValue : string) => {
        setSelectedOptions(prev => ({
        ...prev,
        [questionIndex]: { ...prev[questionIndex], [optionValue]: !prev[questionIndex]?.[optionValue] }
        }));

        const updatedFormData = [...formData];
        const questionText = questions[questionIndex].title;
        const optionText = questions[questionIndex].options.find(option => option.value === optionValue)!.label;


        const existingQuestionIndex = updatedFormData.findIndex(data => data.question === questionText);
        if (existingQuestionIndex !== -1) {
        if (selectedOptions[questionIndex]?.[optionValue]) {
            updatedFormData[existingQuestionIndex].options = updatedFormData[existingQuestionIndex].options.filter(opt => opt !== optionText);
        } else {
            updatedFormData[existingQuestionIndex].options.push(optionText);
        }
        } else {
            updatedFormData.push({ question: questionText, options: [optionText] });
        }

        setFormData(updatedFormData.filter(question => question.options.length > 0));

        // console.log(selectedOptions);
        // console.log(current);

    };

    const isSelectionMade = (currentStep : number) => {
        const selections = selectedOptions[currentStep];
        return selections && Object.values(selections).some(value => value);
    };

    const handleSubmit = async () => {

        const supabase = createClientSupabaseClient();

        const user = await getAuthUser();
        
        if (user) {
          const { data, error } = await supabase
          .from('welcome_form')
          .insert([
              { formData: formData },
          ]).select();
          if (!error) {
              setformEnd(true);
          } else {
              console.log(error);
          }
        }

        
    };

    const preventClose = () => {};


  return (
    
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={preventClose}>
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

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto" ref={modalContentRef}>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-[#151515] text-left shadow-xl transition-all max-w-xl min-w-xl my-5 p-10">

                    {!formStart && (
                        <div className="step text-center">
                            <FaWaveSquare size={120} className="mx-auto"/>
                            <h2 className="text-2xl mb-3">Welcome to ChitChat!</h2>
                            <p className="mb-4">Your journey to meaningful conversations starts here. This brief form is designed to enhance your experience by understanding your preferences and how you plan to use ChitChat. Your feedback is crucial for us to deliver content that resonates with you. </p>
                            <button className="bg-primary py-2 px-5 rounded-lg text-[#151515] font-bold " onClick={() => setFormStart(true)}>Get Started</button>
                        </div>

                    )}
                    {formStart && !formEnd && (
                        <> 
                            <Steps>
                                {questions.map((question, qIndex) => (
                                    <div key={qIndex} className="step">
                                    <h2 className="text-2xl mb-4">{question.title}</h2>
                                    <div className="flex flex-wrap gap-3 items-center mb-5">
                                        {question.options.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => toggleOption(qIndex, option.value)}
                                            className={`p-3 px-5 rounded-lg text-center ${
                                            selectedOptions[qIndex]?.[option.value] ? 'bg-opacity-80 text-yellow-200 border-yellow-300' : 'border-gray-200'
                                            } border focus:outline-none`}
                                        >
                                            {option.label}
                                        </button>
                                        ))}
                                    </div>
                                    </div>
                                ))}
                                

                            </Steps>
                            <Navigation handleSubmit={handleSubmit} isSelectionMade={() => isSelectionMade(current - 1)} />
                        </>
                    )}

                    {formEnd && (
                        <div className="step text-center">
                            <FaWaveSquare size={120} className="mx-auto"/>
                            <h2 className="text-2xl mb-3">Welcome to ChitChat!</h2>
                            <p className="mb-4">We truly appreciate you taking the time to tell us a bit about yourself. Your preferences will guide us in crafting a ChitChat experience that's just right for you.
                            </p> 
                            <p className="mb-4">
                            As we move forward, the details you've shared will be instrumental in refining our features and conversations to better align with your interests.
                            </p> 
                            <p className="mb-4">
                            We're excited to have you on board and are looking forward to this journey together. Thank you for helping us make ChitChat a place you'll love to be a part of. 
                            </p>
                            <button className="bg-primary py-2 px-5 rounded-lg text-[#151515] font-bold " onClick={() => setOpen(false)}>Explore ChitChat</button>
                        </div>
                    )}
                        

                    </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
  )
}

export default WelcomeFormModal

interface NavigationProps {
  handleSubmit: () => void;
  isSelectionMade: () => boolean;
}

const Navigation: React.FC<NavigationProps> = ({handleSubmit, isSelectionMade }) => {
    const { prev, next, jump, total, current, progress } = useSteps();

    const [validationError, setValidationError] = useState(false);

    const handleNext = () => {
        if (isSelectionMade()) {
            setValidationError(false); // Reset validation error state
            next(); // Proceed to the next step
        } else {
            setValidationError(true); // Set validation error state to show feedback or prevent navigation
        }
    };
    
    return (
        <Fragment> 
        {validationError && <p className="text-red-500 mb-2">Please select an option to continue.</p>}
        <div className="navigation flex justify-between mb-4">
            <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none bg-transparent text-gray-100 rounded-lg border border-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 hover:opacity-50" onClick={prev} disabled={current <= 1}>Prev</button>
            {current === total ? (
                <button className="bg-primary py-2.5 px-5 rounded-lg text-[#151515] font-bold " onClick={handleSubmit}>Submit</button>
            ) : (
                <button className="bg-primary py-2.5 px-5 rounded-lg text-[#151515] font-bold " onClick={handleNext}>Next</button>
            )}
        </div>
        <div className="steps_data flex justify-between mt-4 text-sm">
            <div>Total Steps: {total}</div>
            <div>Current Step: {current}</div>
            <div>Progress: {progress * 100}%</div>
        </div>
        </Fragment>
)};