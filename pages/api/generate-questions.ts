import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

type FormDataItem = {
  question: string;
  options: string[];
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { formData }: { formData: FormDataItem[] } = req.body;

  const getOptionValues = (question: string) => {
    const item = formData.find((item: FormDataItem) => item.question === question);
    return item ? item.options.join(', ') : 'N/A';
  };

  const promptTemplate = `
    Generate 10 questions in different categories for a conversation game based on the following user preferences:
    Playing with: ${getOptionValues('Who are you playing with?')}
    Occasion: ${getOptionValues('What is the occasion?')}
    Age Group: ${getOptionValues('What is your age group?')}
    Interests and Hobbies: ${getOptionValues('What are your interests and hobbies?')}
    Preferred Type of Questions: ${getOptionValues('What type of questions do you prefer?')}
    Comfort Level with Personal Questions: ${getOptionValues('How comfortable are you with personal questions?')}
    Desired Outcome: ${getOptionValues('What is your desired outcome?')}
    Preferred Language: ${getOptionValues('What is your preferred language?')}

    Make sure each question is prefixed with its category followed by a colon. For example: "LOVE: (Question)", no need for number list. Make sure the questions are tailored to the user’s preferences, age group, and occasion, ensuring they align with their comfort level and desired outcome. Provide a variety of questions, ranging from light-hearted and fun to deeper, more thought-provoking ones, according to the user's preferences.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates conversation questions.' },
        { role: 'user', content: promptTemplate }
      ],
      model: 'gpt-3.5-turbo',
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

    const { data, error } = await supabase
      .from('generated_questions')
      .insert([{ questions: generatedQuestions }])
      .select()
      .single();

    if (error) {
      console.error('Error inserting into Supabase:', error);
      return res.status(500).json({ error: 'Error inserting into Supabase' });
    }

    res.status(200).json({ gameId: data.game_id, questions: generatedQuestions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ error: 'Error generating questions' });
  }
}
