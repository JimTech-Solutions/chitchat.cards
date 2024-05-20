import React, { Dispatch, SetStateAction } from 'react';

import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import { FaWaveSquare } from 'react-icons/fa'
import { Steps, useSteps } from "react-step-builder";
import { UserIcon } from '@heroicons/react/24/outline'
import { createClientSupabaseClient, getAuthUser } from '@/app/supabase-client'
import { Resend } from 'resend';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

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

const schema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  purpose: z.enum(['General Inquiry', 'Feature Request', 'Technical Support', 'Billing', 'Other']),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
});
type FormFields = z.infer<typeof schema>;

interface ContactFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ContactForm: React.FC<ContactFormProps> = ({ setOpen }) => {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FormFields) => {
    // Example submission logic
    // console.log(formData);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `${formData.purpose}`,
          header: `${formData.subject}`,
          content: `${formData.content}`,
          reply_to: `${formData.email}`
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');

      const result = await response.json();
      console.log(result.message);
      setShowSuccessMessage(true); // Show success message
      reset(); // Clear the form fields

    } catch (error) {
      console.error('Email sending error:', error);
    }

  };

  return (
    <>
      <div className="mb-4">
        <p className="text-2xl text-primary mb-2">Contact Us</p>
        <p className="text-gray-300 text-md">Let us know you questions, inquiries and concerns. We'll get back to you as soon as we can.</p>
      </div>

      <button className="absolute top-0 right-0 p-3 m-3 " onClick={() => setOpen(false)}>
        <IoClose size={24} />
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {showSuccessMessage && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            Your message has been sent successfully!
          </div>
        )}
        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
              {...register('first_name')}
            />
          </div>
          <div className="w-full">
            <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              id="last_name"
              className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
              {...register('last_name')}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            {...register('email')}
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium">Purpose</label>
          <select
            id="purpose"
            className="block w-full rounded-md border-0 py-3 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            {...register('purpose')}
          >
            <option className="bg-[#151515]" value="">Select a purpose</option>
            <option className="bg-[#151515]" value="General Inquiry">General Inquiry</option>
            <option className="bg-[#151515]" value="Feature Request">Feature Request</option>
            <option className="bg-[#151515]" value="Technical Support">Technical Support</option>
            <option className="bg-[#151515]" value="Billing">Billing</option>
          </select>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            id="subject"
            className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            {...register('subject')}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium">Content</label>
          <textarea
            id="content"
            className="block w-full rounded-md border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            {...register('content')}
          />
          {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>}
        </div>
        <div>
          <button type="submit" className="text-center text-[#151515] bg-primary rounded-lg px-6 py-3 font-semibold text-sm shadow-md hover:opacity-80 flex gap-1 items-centers justify-center my-4" disabled={isSubmitting} >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;