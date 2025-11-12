import React from 'react';

const Contact = () => (
  <div className="contact-container">
    <h2>📞 Contact SmartBank</h2>
    <p className="intro">
      We’re here to help you with any banking inquiries, service support, or feedback.
      Our team is available 24/7 to ensure your experience with <b>SmartBank</b> is smooth and secure.
    </p>

    <div className="contact-info">
      <p><b>Email:</b> support@smartbank.com</p>
      <p><b>Phone:</b> +91 98765 43210</p>
      <p><b>Address:</b> SmartBank Corporate Office, MG Road, Bengaluru, India</p>
    </div>

    <footer className="footer">
      <p>© {new Date().getFullYear()} SmartBank | Customer Care & Support</p>
    </footer>

    {/* Styling */}
    <style jsx>{`
      .contact-container {
        text-align: center;
        padding: 60px 20px;
        background: linear-gradient(to bottom right, #e3f2fd, #ffffff);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        min-height: 100vh;
      }

      h2 {
        color: #0056b3;
        margin-bottom: 15px;
        font-size: 2rem;
      }

      .intro {
        font-size: 1rem;
        color: #333;
        max-width: 700px;
        margin: 0 auto 30px;
        line-height: 1.6;
      }

      .contact-info {
        background: #ffffff;
        padding: 25px 20px;
        margin: 0 auto;
        max-width: 500px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .contact-info p {
        font-size: 1rem;
        color: #555;
        margin: 10px 0;
      }

      b {
        color: #007bff;
      }

      .footer {
        margin-top: 40px;
        font-size: 0.9rem;
        color: #666;
      }
    `}</style>
  </div>
);

export default Contact;
