import { createClient } from '@supabase/supabase-js';
import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from 'next';

// Define a type for the form data items
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
        return res.status(405).json({ error: 'Method Not Allowed' }); // Only allow POST requests
    }

    const { formData }: { formData: FormDataItem[] } = req.body;

    const promptTemplate = `
    Generate 10 questions in different categories for a conversation game based on the following user preferences:

    Playing with: ${formData.find((item: FormDataItem) => item.question === "Who are you playing with?")?.options.join(', ')}
    Occasion: ${formData.find((item: FormDataItem) => item.question === "What is the occasion?")?.options.join(', ')}
    Age Group: ${formData.find((item: FormDataItem) => item.question === "What is your age group?")?.options.join(', ')}
    Interests and Hobbies: ${formData.find((item: FormDataItem) => item.question === "What are your interests and hobbies?")?.options.join(', ')}
    Preferred Type of Questions: ${formData.find((item: FormDataItem) => item.question === "What type of questions do you prefer?")?.options.join(', ')}
    Comfort Level with Personal Questions: ${formData.find((item: FormDataItem) => item.question === "How comfortable are you with personal questions?")?.options.join(', ')}
    Desired Outcome: ${formData.find((item: FormDataItem) => item.question === "What is your desired outcome?")?.options.join(', ')}
    Preferred Language: ${formData.find((item: FormDataItem) => item.question === "What is your preferred language?")?.options.join(', ')}

    Make sure each question is prefixed with its category followed by a colon. For example: "LOVE: (Question)", no need for number list. Make sure the questions are tailored to the user’s preferences, age group, and occasion, ensuring they align with their comfort level and desired outcome. Provide a variety of questions, ranging from light-hearted and fun to deeper, more thought-provoking ones, according to the user's preferences.
  `;

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

        const { data, error } = await supabase
            .from('generated_questions')
            .insert([
                { questions: generatedQuestions }
            ]).select().single();

        if (error) {
            console.error('Error inserting into Supabase:', error);
            return res.status(500).json({ error: 'Error inserting into Supabase' });
        }

        res.status(200).json({ gameId: data.game_id });
    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({ error: 'Error generating questions' });
    }
}
