
import React from 'react';
import Footer from '../footer';

const PrivacyPolicy = () => {
  return (
    <>
      <h1 className="card" style={{ color: 'white', width: '90%', margin: '0 auto', marginTop: '5rem', textAlign: 'center', fontSize: '3rem' }}>
        Privacy & Policy
      </h1>
      <main className="twoColumnGrid">
        <div className="leftContent">
          <div className="card">
            <p style={{ marginBottom: '0.5rem' }}>
                At our Mascot app, we understand the importance of protecting your personal information and are committed to maintaining the privacy and security of all user data. This Privacy Policy outlines how we collect, use, and protect your personal information.
              <br />
              <br />
                Information We Collect
              <br />
                We may collect personal information, such as your name, email address, job title, location, and professional experience, when you create an account with us. We may also collect information about your use of our platform, including your activity history, job applications, and messages.
              <br />
              <br />
                How We Use Your Information
              <br />
                We use your personal information to provide you with a personalized experience on our platform, including connecting you with potential employers, sharing relevant job opportunities, and improving our services. We may also use your information to send you promotional and marketing communications that we believe may be of interest to you.
              <br />
              <br />
                How We Share Your Information
              <br />
                We may share your personal information with our trusted partners, such as recruiters or potential employers, to help you find relevant job opportunities or to improve our services. We will never sell your personal information to third parties. We may also share your information in compliance with legal requirements, such as responding to a court order or complying with a legal request.
              <br /><br />
                How We Protect Your Information
              <br />
                We take data security seriously and implement various technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. We also limit access to your personal information to only those employees, contractors, or partners who require access to perform their job duties.
              <br /><br />
                Your Rights
              <br />
                You have the right to access, modify, or delete your personal information at any time. You can also opt-out of receiving promotional communications from us. If you have any questions or concerns about our Privacy Policy or the way we handle your personal information, please contact us at [contact email].
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

export default PrivacyPolicy;
