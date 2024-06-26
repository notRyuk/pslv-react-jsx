import React from 'react';
import Footer from '../footer';

const FAQs = () => {
  return (
    <>
      
      <h1 className="card" style={{ color: 'white', width: '90%', margin: '0 auto', marginTop: '5rem', textAlign: 'center', fontSize: '3rem' }}>
        FAQs
      </h1>
      <main className="twoColumnGrid">
        <div className="leftContent">
          <div className="card">
            <p style={{ marginBottom: '0.5rem', color: '#c8c8c8' }}>
                <span className="FAQ-ques"><b>1. What is Mascot?</b></span><br />
                Mascot is a professional networking platform that provides opportunities for all members of the global workforce, regardless of their goals, ideas, and abilities.
            </p><br />
            <p style={{ marginBottom: '0.5rem', color: '#c8c8c8' }}>
                <span className="FAQ-ques"><b>2. How do I create a Mascot profile?</b></span><br />
                To create a Mascot profile, go to the Mascot website and follow the prompts to sign up. You'll be asked to provide information about your professional experience, education, and skills, as well as to upload a profile photo.
            </p><br />
            <p style={{ marginBottom: '0.5rem', color: '#c8c8c8' }}>
            <span className="FAQ-ques"><b>3.Is Mascot free to use?</b></span><br /> 
                Mascot offers a basic membership level that is free to use, but there are also paid membership options with additional features and benefits.
            </p><br />
            <p style={{ marginBottom: '0.5rem', color: '#c8c8c8' }}>
            <span className="FAQ-ques"><b>4.Can I search for jobs on Mascot?</b></span><br /> 
                Yes, Mascot has a robust job search feature that allows users to search for jobs by keyword, location, industry, and other criteria.
            </p><br />
            <p style={{ marginBottom: '0.5rem', color: '#c8c8c8' }}>
            <span className="FAQ-ques"><b>5.Can I connect with people I don't know on Mascot?</b></span><br /> 
                Yes, Mascot encourages users to build their networks by connecting with people they don't know, but it's important to send personalized invitations and to only connect with people who are relevant to your professional goals.
            </p><br />
            <p style={{ marginBottom: '0.5rem', color: '#c8c8c8' }}>
            <span className="FAQ-ques"><b>6.Can I use Mascot to promote my business?</b></span><br /> 
                Yes, Mascot offers several tools and features for businesses to promote their brand and connect with potential customers and partners.
            </p><br />
            <p style={{ marginBottom: '0.5rem', color: '#c8c8c8' }}>
            <span className="FAQ-ques"><b>7.How do I get recommendations on Mascot?</b></span><br /> 
                To get recommendations on Mascot, you can reach out to current and former colleagues, supervisors, and other professional contacts and ask them to provide a recommendation on your profile.
            </p><br />
            <p style={{marginbottom: '0.5rem', color: '#c8c8c8' }}> 
            <span className="FAQ-ques"> <b>8.Can I use Mascot to publish articles and other content?</b> </span><br /> 
                Yes, Mascot has a publishing platform that allows users to publish articles, blog posts, and other content directly on the site.
            </p><br />
            <p style={{marginbottom: '0.5rem' , color: '#c8c8c8' }}>
             <span className="FAQ-ques"><b> 9.How can I make my Mascot profile stand out?</b></span><br /> 
                To make your Mascot profile stand out, make sure to complete your profile with detailed information about your professional experience and skills, use a professional profile photo, and engage with other users by sharing and commenting on their content.
            </p><br />
            <p style={{marginbottom: '0.5rem', color: '#c8c8c8' }}> 
            <span className="FAQ-ques"><b>10.How can I protect my privacy on Mascot?</b></span><br /> 
                Mascot offers several privacy settings that allow users to control who can see their profile and activity on the site, as well as to block or report other users who engage in inappropriate behavior.
            </p>
          </div>
        </div>
        <div className="rightContent">
            <Footer></Footer>
        </div>
      </main>
    </>
  );
};

export default FAQs;
