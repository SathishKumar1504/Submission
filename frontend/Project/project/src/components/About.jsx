import React from 'react';

const About = () => (
  <div className="about-page">
    <h2>🏦 About Our Bank</h2>
    <p>
      Welcome to <b>SmartBank</b>, your trusted financial partner.  
      We provide secure, reliable, and customer-friendly banking services designed to make your
      financial life easier. Our goal is to deliver innovative digital banking solutions that you
      can access anytime, anywhere.
    </p>

    <p>
      Whether you're managing your savings, checking account balances, or handling transactions,
      SmartBank ensures every operation is safe and efficient. We value transparency, customer
      satisfaction, and data security above all else.
    </p>

    <p>
      At SmartBank, we believe in empowering our customers — from individuals to businesses — to
      achieve their financial goals through modern technology and personal care.
    </p>

    <footer className="footer">
      <p>© {new Date().getFullYear()} SmartBank | Secure • Reliable • Trusted</p>
    </footer>

    {/* Styling */}
    <style jsx>{`
      .about-page {
        text-align: center;
        padding: 60px 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(to bottom right, #e3f2fd, #ffffff);
        min-height: 100vh;
      }

      h2 {
        color: #0056b3;
        margin-bottom: 20px;
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
        color: #333;
        line-height: 1.6;
        max-width: 700px;
        margin: 15px auto;
      }

      .footer {
        margin-top: 40px;
        font-size: 0.9rem;
        color: #666;
      }
    `}</style>
  </div>
);

export default About;
