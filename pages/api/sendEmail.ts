// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import EmailTemplate from '@/components/email_template'
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            // Assuming the request body contains the formData
            const {subject, header, content, reply_to} = req.body;

            // Replace the email sending details as needed
            const { data, error } = await resend.emails.send({
                from: 'ChitChat Team <team@chitchat.cards>',
                reply_to: reply_to || '',
                to: ['mrjim.development@gmail.com'],
                subject: subject,
                react: EmailTemplate({ header: header, content: content}),
                text: content,
                headers: {
                    'X-Entity-Ref-ID': '123456789',
                }
            });

            if (error) throw error;

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending email', error });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
