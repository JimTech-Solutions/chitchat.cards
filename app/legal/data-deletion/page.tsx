"use client"
import Header from '@/components/Header';
import { UserProvider } from '@/context/UserContext';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <> 
      <UserProvider> 
        <Header />
      </UserProvider>

      <div className="max-w-6xl mx-auto px-4 py-8 text-justify leading-relaxed">
        <Head>
          <title>Data Deletion Instructions - ChitChat</title>
        </Head>


        <h1 className="text-3xl font-bold mb-2 text-center text-primary">Data Deletion Instructions for ChitChat</h1>
        <p className="text-sm mb-4 text-center">Effective Date: March 28, 2024</p>

        <section className="mb-6">
          <p className="mb-2">At ChitChat, developed by JimTech Solutions, we are committed to maintaining your trust and protecting your privacy. In compliance with privacy laws and regulations, we provide our users with the option to request the deletion of their personal data from our systems.</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How to Request Data Deletion</h2>
          <p className="mb-2">If you have an account with ChitChat and wish to have your personal data deleted, please follow the instructions below. If you logged in using Gmail or Facebook, you will first need to unlink your account from these services before we can proceed with the deletion of your data.</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Step 1: Unlink Your Account</h2>
          <p className="mb-2">For Gmail Users:</p>
          <ul className="list-decimal ml-10 mb-4">
            <li>Go to your Google Account's Security settings.</li>
            <li>Navigate to "Third-party apps with account access" under the "Security" tab.</li>
            <li>Find ChitChat in the list and click on it.</li>
            <li>Click "Remove Access" to unlink your Gmail account from ChitChat.</li>
          </ul>

          <p className="mb-2">For Facebook Users:</p>
          <ul className="list-decimal ml-10">
            <li>Log in to your Facebook account and go to the Settings & Privacy &#8250; Settings.</li>
            <li>Click on "Apps and Websites" in the left-hand column.</li>
            <li>Look for ChitChat in the list of active apps and websites.</li>
            <li>Select ChitChat and click "Remove" to unlink your Facebook account from ChitChat.</li>
          </ul>

        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Step 2: Request Data Deletion</h2>
          <p className="mb-2">After you have unlinked your account, please send an email to our support team at <a href="mailto:jimtech.solutions" className="text-primary">admin@jimtech.solutions</a> with the subject line "Request for Data Deletion". In your email, please include:</p>
          <ul className="list-disc ml-10 mb-4">
            <li>Website URL / Name.</li>
            <li>Your full name.</li>
            <li>Your account's email address.</li>
            <li>A clear statement of your request to have your personal data deleted from our systems.</li>
          </ul>

          <p className="mb-2">Our support team will review your request and may contact you to verify your identity before proceeding with the data deletion. This is to ensure that the request is legitimate and to protect your data from unauthorized deletion requests.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Processing Your Request</h2>
          <p className="mb-2">Upon verification, we will proceed with the deletion of your personal data from our systems. Please note that the deletion process may take up to 5-7 days to complete. We will confirm once your data has been successfully deleted.</p>

        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
          <p className="mb-2">Please be aware that we may retain certain information as required by law or for legitimate business purposes to the extent permitted by law. For instance, we may keep transactional records for financial reporting or to comply with tax laws.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-2">If you have any questions about the data deletion process or our privacy practices, please contact us a <a href="mailto:admin@jimtech.solutions" className="text-primary">admin@jimtech.solutions</a>.</p>
        </section>

      </div>
    </>
  );
}
