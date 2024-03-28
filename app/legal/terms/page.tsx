"use client"
import Header from '@/components/Header';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <> 
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8 text-justify leading-relaxed">
        <Head>
          <title>Terms of Service - ChitChat</title>
        </Head>


        <h1 className="text-3xl font-bold mb-2 text-center text-primary">Terms of Service for ChitChat</h1>
        <p className="text-sm mb-4 text-center">Effective Date: March 28, 2024</p>

        <section className="mb-6">
          <p className="mb-2">Welcome to ChitChat, a web application developed by <a href="https://jimtech.solutions" className="text-primary">JimTech Solutions</a>. These Terms of Service ("Terms", "ToS") govern your use of our web application located at <a href="https://chitchat.cards" className="text-primary">https://chitchat.cards</a> (the "Service") operated by JimTech Solutions ("us", "we", or "our").</p>

          <p className="mb-2">Please read these Terms of Service carefully before using our Service. Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.</p>

          <p className="mb-2">By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you do not have permission to access the Service.</p>
        
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Communications</h2>
          <p className="mb-2">By creating an account on our Service, you agree to subscribe to newsletters, marketing or promotional materials, and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Purchases</h2>
          <p className="mb-2">If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>

          <p className="mb-2">You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct, and complete.</p>

        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Content</h2>
          <p className="mb-2">Content found on or through this Service are the property of JimTech Solutions or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>

        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Accounts</h2>
          <p className="mb-2">When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our Service.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
          <p className="mb-2">The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of JimTech Solutions and its licensors.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
          <p className="mb-2">We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p className="mb-2">In no event shall JimTech Solutions, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
          <p className="mb-2">These Terms shall be governed and construed in accordance with the laws of The Philippines, without regard to its conflict of law provisions.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Changes</h2>
          <p className="mb-2">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p className="mb-2">If you have any questions about these Terms, please contact us at <a href="mailto:admin@jimtech.solutions" className="text-primary">admin@jimtech.solutions</a>.</p>
        </section>

      </div>
    </>
  );
}
