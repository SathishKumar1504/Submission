import React from 'react';

const About = () => (
  <div className="about-page">

    <div className="about-box">
      <h2>🏦 SmartBank</h2>
      <h3>Your Trusted Digital Banking Partner</h3>

      <p>
        <b>SmartBank</b> is built with one mission — to redefine the way you experience
        digital banking. We focus on providing a fast, secure, and user-friendly
        environment where your finances are always under your control.
      </p>

      <p>
        From seamless fund transfers to smart account insights, SmartBank empowers you
        with powerful tools that work across all devices — anytime, anywhere.
      </p>

      <p>
        Our platform ensures <b>bank-grade security</b>, <b>real-time data accuracy</b>,
        and a <b>smooth user experience</b> crafted with modern UI technology.
      </p>

      <div className="features">
        <div className="feature-card">🔐 Bank-Grade Security</div>
        <div className="feature-card">⚡ Fast & Reliable</div>
        <div className="feature-card">📱 Mobile Friendly</div>
        <div className="feature-card">☁️ Cloud Ready</div>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} SmartBank —
        <span> Secure • Modern • Trusted</span>
      </footer>
    </div>

    {/* Premium Styles */}
    <style>{`
      .about-page {
        min-height: 100vh;
        padding: 60px 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        background: linear-gradient(135deg, #dee8ff, #f8fbff 40%, #eef2ff);

        font-family: "Inter", "Segoe UI", sans-serif;
        animation: fadeIn 0.6s ease;
      }

      .about-box {
        max-width: 900px;
        width: 100%;
        background: #ffffff;
        padding: 55px 40px;

        border-radius: 22px;
        text-align: center;

        box-shadow: 0 14px 35px rgba(0,0,0,0.08);
        border: 1px solid rgba(0,0,0,0.05);

        animation: slideUp 0.6s ease;

        position: relative;
        overflow: hidden;
      }

      /* Accent gradient bar */
      .about-box::before {
        content: "";
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 6px;
        background: linear-gradient(90deg, #3b82f6, #6366f1, #2563eb);
      }

      h2 {
        font-size: 2.2rem;
        font-weight: 800;
        color: #1e3a8a;
        margin-bottom: 6px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      h3 {
        font-size: 1.35rem;
        color: #475569;
        font-weight: 600;
        margin-bottom: 25px;
      }

      p {
        font-size: 1.08rem;
        line-height: 1.75;
        color: #374151;
        margin: 14px auto;
        max-width: 700px;
      }

      /* Feature Grid */
      .features {
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px;
      }

      .feature-card {
        background: #f0f4ff;
        padding: 14px;
        border-radius: 10px;
        text-align: center;
        font-weight: 600;
        color: #1e3a8a;
        border: 1px solid rgba(99,102,241,0.2);
        transition: 0.25s ease;
      }

      .feature-card:hover {
        transform: translateY(-4px);
        background: #e2e8ff;
        box-shadow: 0 8px 20px rgba(99,102,241,0.25);
      }

      /* Footer */
      .footer {
        margin-top: 40px;
        font-size: 1rem;
        color: #64748b;
      }

      .footer span {
        color: #2563eb;
        font-weight: 600;
      }

      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(35px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Mobile Responsive */
      @media (max-width: 650px) {
        .about-box { padding: 35px 22px; }
        h2 { font-size: 1.7rem; }
        p { font-size: 0.95rem; }
      }
    `}</style>
  </div>
);

export default About;
