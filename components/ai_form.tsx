import { Fragment, useEffect, useRef, useState } from 'react'
import { Steps, StepsProvider, useSteps } from "react-step-builder";
import { createClientSupabaseClient, getAuthUser } from '@/app/supabase-client';
import { FaWaveSquare } from 'react-icons/fa';
import OpenAI from "openai";
import { redirect, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

interface Questions {
  gid: string;
  category: string;
  question: string;
}

const questions: FormQuestion[] = [
  {
    title: "Who are you playing with?",
    options: [
      { label: 'Friends', value: 'Friends' },
      { label: 'Family', value: 'Family' },
      { label: 'Partner/Spouse', value: 'Partner/Spouse' },
      { label: 'Colleagues', value: 'Colleagues' },
      { label: 'Strangers', value: 'Strangers' },
    ],
  },
  {
    title: "What is the occasion?",
    options: [
      { label: 'Casual Hangout', value: 'Casual Hangout' },
      { label: 'Date Night', value: 'Date Night' },
      { label: 'Family Gathering', value: 'Family Gathering' },
      { label: 'Team Building', value: 'Team Building' },
      { label: 'Icebreaker', value: 'Icebreaker' },
    ],
  },
  {
    title: "What is your age group?",
    options: [
      { label: 'Kids', value: 'Kids' },
      { label: 'Teens', value: 'Teens' },
      { label: 'Adults', value: 'Adults' },
      { label: 'Seniors', value: 'Seniors' },
    ],
  },
  {
    title: "What are your interests and hobbies?",
    options: [
      { label: 'Music', value: 'Music' },
      { label: 'Movies', value: 'Movies' },
      { label: 'Sports', value: 'Sports' },
      { label: 'Books', value: 'Books' },
      { label: 'Travel', value: 'Travel' },
      { label: 'Food', value: 'Food' },
      { label: 'Technology', value: 'Technology' },
      { label: 'Art', value: 'Art' },
      { label: 'Others', value: 'Others' },
    ],
  },
  {
    title: "What type of questions do you prefer?",
    options: [
      { label: 'Fun', value: 'Fun' },
      { label: 'Deep/Philosophical', value: 'Deep/Philosophical' },
      { label: 'Humorous', value: 'Humorous' },
      { label: 'Personal Growth', value: 'Personal Growth' },
      { label: 'Icebreakers', value: 'Icebreakers' },
      { label: 'Random', value: 'Random' },
    ],
  },
  {
    title: "How comfortable are you with personal questions?",
    options: [
      { label: 'Comfortable', value: 'Comfortable' },
      { label: 'Somewhat Comfortable', value: 'Somewhat Comfortable' },
      { label: 'Not Comfortable', value: 'Not Comfortable' },
    ],
  },
  {
    title: "What is your desired outcome?",
    options: [
      { label: 'Have Fun', value: 'Have Fun' },
      { label: 'Get to Know Each Other Better', value: 'Get to Know Each Other Better' },
      { label: 'Bond Over Shared Interests', value: 'Bond Over Shared Interests' },
      { label: 'Learn Something New', value: 'Learn Something New' },
      { label: 'Deepen Conversations', value: 'Deepen Conversations' },
    ],
  },
  {
    title: "What is your preferred language?",
    options: [
      { label: 'English', value: 'English' },
      { label: 'Filipino', value: 'Filipino' },
      { label: 'Bisaya', value: 'Bisaya' },
      { label: 'Spanish', value: 'Spanish' },
      { label: 'French', value: 'French' },
      { label: 'German', value: 'German' },
      { label: 'Other', value: 'Other' },
    ],
  },
];

const AIForm: React.FC = () => {
  const { prev, next, total, current } = useSteps();
  const [formStart, setFormStart] = useState(false);
  const [formEnd, setformEnd] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const isSelectionMade = (currentStep: number) => {
    const selections = selectedOptions[currentStep];
    return selections && Object.values(selections).some(value => value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    const promptTemplate = `
      Generate 10 questions in different categories for a conversation game based on the following user preferences:

      Playing with: ${formData.find(item => item.question === "Who are you playing with?")?.options.join(', ')}
      Occasion: ${formData.find(item => item.question === "What is the occasion?")?.options.join(', ')}
      Age Group: ${formData.find(item => item.question === "What is your age group?")?.options.join(', ')}
      Interests and Hobbies: ${formData.find(item => item.question === "What are your interests and hobbies?")?.options.join(', ')}
      Preferred Type of Questions: ${formData.find(item => item.question === "What type of questions do you prefer?")?.options.join(', ')}
      Comfort Level with Personal Questions: ${formData.find(item => item.question === "How comfortable are you with personal questions?")?.options.join(', ')}
      Desired Outcome: ${formData.find(item => item.question === "What is your desired outcome?")?.options.join(', ')}
      Preferred Language: ${formData.find(item => item.question === "What is your preferred language?")?.options.join(', ')}

      Make sure each question is prefixed with its category followed by a colon. For example: "Category: (Question)", no need for number list. Make sure the questions are tailored to the user’s preferences, age group, and occasion, ensuring they align with their comfort level and desired outcome. Provide a variety of questions, ranging from light-hearted and fun to deeper, more thought-provoking ones, according to the user's preferences.
    `;

    console.log(promptTemplate);

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant that generates conversation questions." },
          { role: "user", content: promptTemplate }
        ],
        model: "gpt-3.5-turbo",
      });

      const generatedText = completion.choices[0]?.message?.content || '';
      const generatedQuestions = generatedText.split('\n').filter(Boolean).map((line, index) => {
        const [category, ...questionParts] = line.split(':');
        const question = questionParts.join(':').trim();
        return {
          gid: `q${index + 1}`,
          category: category.trim().toLowerCase(),
          question: question,
        };
      });

      console.log(JSON.stringify(generatedQuestions, null, 2));

      const { data, error } = await supabase
        .from('generated_questions')
        .insert([
          { questions: generatedQuestions }
        ]).select().single();

      if (error) {
        console.error('Error inserting into Supabase:', error);
      } else {
        console.log('Data inserted successfully:', data);
        router.push(`/ai/${data.game_id}`);
      }
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <StepsProvider>
        <div className="max-w-xl mx-auto my-10 p-5 bg-[#151515] rounded-xl">
          {!formStart && (
            <div className="step text-center">
              <FaWaveSquare size={120} className="mx-auto" />
              <h2 className="text-2xl mb-3">Welcome to the AI-Driven ChitChat Experience!</h2>
              <p className="mb-4">Start your journey to personalized and meaningful conversations with our AI-powered question generator. By providing a few details about your preferences and the context of your interaction, we'll tailor questions just for you.</p>
              <button className="bg-primary py-2 px-5 rounded-lg text-[#151515] font-bold" onClick={() => setFormStart(true)}>Get Started</button>
            </div>
          )}
          {formStart && !formEnd && (
            <>
              <Steps>
                {questions.map((question, qIndex) => (
                  <div key={qIndex} className="step mb-5">
                    <h2 className="text-2xl mb-4">{question.title}</h2>
                    <div className="flex flex-wrap gap-3 items-center">
                      {question.options.map(option => (
                        <button
                          key={option.value}
                          onClick={() => toggleOption(qIndex, option.value)}
                          className={`p-3 px-5 rounded-lg w-full ${selectedOptions[qIndex]?.[option.value] ? 'bg-opacity-80 text-yellow-200 border-yellow-300' : 'border-gray-200'} border focus:outline-none`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </Steps>
              <Navigation handleSubmit={handleSubmit} isSelectionMade={() => isSelectionMade(current - 1)} loading={loading}/>
            </>
          )}
          {formEnd && (
            <div className="step text-center">
              <FaWaveSquare size={120} className="mx-auto" />
              <h2 className="text-2xl mb-3">Welcome to ChitChat!</h2>
              <p className="mb-4">We truly appreciate you taking the time to tell us a bit about yourself. Your preferences will guide us in crafting a ChitChat experience that's just right for you.</p>
              <p className="mb-4">As we move forward, the details you've shared will be instrumental in refining our features and conversations to better align with your interests.</p>
              <p className="mb-4">We're excited to have you on board and are looking forward to this journey together. Thank you for helping us make ChitChat a place you'll love to be a part of.</p>
              <button className="bg-primary py-2 px-5 rounded-lg text-[#151515] font-bold" onClick={() => setFormStart(false)}>Explore ChitChat</button>
            </div>
          )}
        </div>
      </StepsProvider>
    </>
  );
}

export default AIForm;

interface NavigationProps {
  handleSubmit: () => void;
  isSelectionMade: () => boolean;
  loading: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ handleSubmit, isSelectionMade, loading }) => {
  const { prev, next, total, current, progress } = useSteps();
  const [validationError, setValidationError] = useState(false);

  const handleNext = () => {
    if (isSelectionMade()) {
      setValidationError(false);
      next();
    } else {
      setValidationError(true);
    }
  };

  return (
    <>
      {validationError && <p className="text-red-500 mb-2">Please select an option to continue.</p>}
      <div className="navigation flex justify-between mb-4">
        <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none bg-transparent text-gray-100 rounded-lg border border-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 hover:opacity-50" onClick={prev} disabled={current <= 1}>Prev</button>
        {current === total ? (
          <button className="bg-primary py-2.5 px-5 rounded-lg text-[#151515] font-bold" onClick={handleSubmit} disabled={loading}>{loading ? "Loading..." :"Submit"}</button>
        ) : (
          <button className="bg-primary py-2.5 px-5 rounded-lg text-[#151515] font-bold" onClick={handleNext}>Next</button>
        )}
      </div>
      <div className="steps_data flex justify-between mt-4 text-sm">
        <div>Total Steps: {total}</div>
        <div>Current Step: {current}</div>
        <div>Progress: {(progress * 100).toFixed(2)}%</div>
      </div>
    </>
  );
};
