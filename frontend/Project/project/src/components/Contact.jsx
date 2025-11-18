import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Saved messages
  const [contactList, setContactList] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("📩 Contact Form Submitted:", form);

    setContactList((prev) => [...prev, { ...form, id: Date.now() }]);

    setShowPopup(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      category: "General Inquiry",
      subject: "",
      message: "",
    });

    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <div className="contact-wrapper-pro">

      {/* ========== CONTACT INFO BOX ========== */}
      <div className="contact-info-card">
        <h2>🏦 SmartBank HQ</h2>
        <p className="info-text">We're always here to help you 24/7.</p>

        <div className="info-list">
          <p><b>📞 Phone:</b> +91 98765 43210</p>
          <p><b>☎️ Toll-Free:</b> 1800-123-456</p>
          <p><b>📧 Email:</b> support@smartbank.com</p>
          <p><b>📍 Address:</b> SmartBank Towers, Chennai, Tamil Nadu, India</p>
        </div>
      </div>

      {/* ========== CONTACT FORM ========== */}
      <div className="contact-card-pro">

        <h1>📨 Send Us a Message</h1>
        <p className="sub">Our support team will reach out shortly.</p>

        <form className="contact-form-pro" onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
            <label>Your Name</label>
          </div>

          <div className="input-box">
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <label>Email Address</label>
          </div>

          <div className="input-box">
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
            <label>Phone Number (optional)</label>
          </div>

          <div className="input-box">
            <select name="category" value={form.category} onChange={handleChange}>
              <option>General Inquiry</option>
              <option>Account Support</option>
              <option>Card/ATM Issues</option>
              <option>Loan / EMI Support</option>
              <option>Technical Problem</option>
            </select>
            <label className="floating">Category</label>
          </div>

          <div className="input-box">
            <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
            <label>Subject</label>
          </div>

          <div className="input-box textarea-box">
            <textarea name="message" value={form.message} onChange={handleChange} required></textarea>
            <label>Your Message...</label>
          </div>

          <button type="submit" className="send-btn-pro">🚀 Send Message</button>
        </form>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>✅ Message Sent!</h3>
            <p>Our support team will contact you soon.</p>
          </div>
        </div>
      )}

      {/* ========== MESSAGE HISTORY LIST ========== */}
      <div className="history-card-container">
        <h2>📜 Submitted Messages</h2>

        {contactList.length === 0 ? (
          <p className="no-msg">No messages submitted yet.</p>
        ) : (
          contactList.map((msg) => (
            <div className="history-card" key={msg.id}>
              <h3>{msg.subject}</h3>
              <p><b>Name:</b> {msg.name}</p>
              <p><b>Email:</b> {msg.email}</p>
              <p><b>Phone:</b> {msg.phone || "N/A"}</p>
              <p><b>Category:</b> {msg.category}</p>
              <p><b>Message:</b> {msg.message}</p>
            </div>
          ))
        )}
      </div>

      {/* CSS */}
      <style>{`
        .contact-wrapper-pro {
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, #e0e7ff, #f0f7ff);
          font-family: "Inter", sans-serif;
        }

        /* Contact info box */
        .contact-info-card {
          max-width: 700px;
          width: 100%;
          padding: 25px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          margin-bottom: 25px;
          text-align: center;
        }

        .contact-info-card h2 {
          margin-bottom: 8px;
          color: #1e3a8a;
        }

        .info-text {
          color: #475569;
          margin-bottom: 15px;
        }

        .info-list p {
          margin: 6px 0;
          font-size: 1rem;
          color: #1e293b;
        }

        /* Contact Form Card */
        .contact-card-pro {
          width: 100%;
          max-width: 700px;
          background: rgba(255,255,255,0.9);
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        .contact-form-pro {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-box {
          position: relative;
        }

        .input-box input,
        .input-box select,
        .input-box textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #cbd5e1;
          background: #f8f9ff;
          border-radius: 10px;
          outline: none;
        }

        textarea {
          min-height: 110px;
          resize: vertical;
        }

        .input-box label {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          background: white;
          padding: 0 5px;
          pointer-events: none;
          transition: 0.2s;
        }

        .input-box input:focus + label,
        .input-box textarea:focus + label,
        .input-box select:focus + label,
        .input-box input:not(:placeholder-shown) + label,
        .input-box textarea:not(:placeholder-shown) + label {
          top: -7px;
          font-size: 0.75rem;
          color: #2563eb;
        }

        .send-btn-pro {
          padding: 12px;
          background: #2563eb;
          color: white;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
        }

        /* History Section */
        .history-card-container {
          width: 100%;
          max-width: 700px;
        }

        .history-card {
          background: white;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 12px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
        }

        .no-msg {
          text-align: center;
          color: #64748b;
        }

        /* Popup */
        .popup {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-content {
          background: white;
          padding: 25px 35px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default Contact;
