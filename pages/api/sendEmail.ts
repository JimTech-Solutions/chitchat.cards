// // pages/api/sendEmail.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import Resend from 'resend';

// // Initialize Resend with your API key
// const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method === 'POST') {
//         try {
//             // Assuming the request body contains the formData
//             const formData = req.body.formData;

//             const htmlContent = formData.map(question => {
//                 const options = question.options.map(option =>
//                     `<li>${option}</li>`).join('');
//                 return `<h3>${question.question}</h3><ul>${options}</ul>`;
//             }).join('');

//             // Replace the email sending details as needed
//             const { data, error } = await resend.emails.send({
//                 from: 'ChitChat Team <team@chitchat.cards>',
//                 to: ['mrjim.development@gmail.com'],
//                 subject: 'Welcome to ChitChat!',
//                 html: `<html><body><p>Someone sent a response:</p> ${htmlContent}</body></html>`,
//                 headers: {
//                     'X-Entity-Ref-ID': '123456789',
//                 }
//             });

//             if (error) throw error;

//             res.status(200).json({ message: 'Email sent successfully' });
//         } catch (error) {
//             res.status(500).json({ message: 'Error sending email', error });
//         }
//     } else {
//         // Handle any other HTTP method
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
