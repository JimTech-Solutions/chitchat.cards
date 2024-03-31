import React from 'react'
import parse from 'html-react-parser';

type EmailTemplateProps = {
  header: string;
  content: string;
};

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({header, content}) => {
  return (
    <div className="max-w-lg mx-auto shadow-lg rounded-lg overflow-hidden">
      <div className=" text-white text-xl font-bold p-4">
        <img src={`${process.env.NEXT_PUBLIC_SITE_URL}/icons/72x72.png`} alt="chitchat icon" className="mx-auto"/>
      </div>
      <div className="p-4 ">
        
        <h2 className="text-center text-2xl mb-4">{header}</h2>
        
        <div className="mt-2">
            {parse(content)}
        </div>
      </div>
      {/* <div className="p-4">
        <p className="">Best Regards,</p>
        <p className="font-bold">ChitChat Team</p>
      </div> */}
    </div>
  )
}

export default EmailTemplate
