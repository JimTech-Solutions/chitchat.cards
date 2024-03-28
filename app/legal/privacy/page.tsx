"use client"
import Header from '@/components/Header';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <> 
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8 text-justify leading-relaxed">
        <Head>
          <title>Privacy Policy - ChitChat</title>
        </Head>


        <h1 className="text-3xl font-bold mb-2 text-center text-primary">Privacy Policy for ChitChat</h1>
        <p className="text-sm mb-4 text-center">Effective Date: March 28, 2024</p>

        <section className="mb-6">
          <p className="mb-2">Welcome to ChitChat, a service provided by <a href="https://jimtech.solutions" className="text-primary">JimTech Solutions</a> ("we", "our", or "us"). This Privacy Policy is designed to inform you about our practices regarding the collection, use, and disclosure of personal information we receive from users of our web application. By accessing or using ChitChat, you agree to the collection and use of information in accordance with this policy.</p>
        
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Information Collection and Use</h2>
          <p className="mb-2">To provide and improve our Service, we may collect personally identifiable information, such as your name, email address, and payment information for premium features. Additionally, we collect non-personally identifiable information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Cookies</h2>
          <p className="mb-2">We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data, which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Use of Data</h2>
          <p className="mb-2">ChitChat uses the collected data for various purposes:</p>
          <ul className="list-disc ml-10">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Sharing and Disclosure</h2>
          <p className="mb-2">We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>
          <p className="mb-2">We may use third-party service providers to help us operate our business and the Service or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
          <p className="mb-2">We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Changes To This Privacy Policy</h2>
          <p className="mb-2">This Privacy Policy is effective as of March 28, 2024 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically.</p>
        </section>

        

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className="mb-2">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:admin@jimtech.solutions" className="text-primary">admin@jimtech.solutions</a>.</p>
        </section>
      </div>
    </>
  );
}
