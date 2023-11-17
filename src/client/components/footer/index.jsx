import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <div className="card">
        <div className="footer">
          <div className="cardImg">
            <img src="/images/connected-world.png" alt="" />
          </div>
          <div className="footerContainer">
            <Link to="/about">About</Link>
            <Link to="/accessibility">Accessibility</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/faq">FAQs</Link>
          </div>
        </div>
        <p className="footerBottom">Mascot &copy; 2023. All Rights Reserved.</p>
      </div>
    </>
  );
}
