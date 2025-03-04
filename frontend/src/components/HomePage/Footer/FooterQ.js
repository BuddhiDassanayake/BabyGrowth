// Footer.js
import React, { useState } from "react";
import "./FooterQ.css"; // Importing the CSS file

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What baby care products do you offer?",
      answer: "We offer baby lotions, diapers, wipes, feeding bottles, and organic skincare products.",
    },
    {
      question: "Are your products safe for newborns?",
      answer: "Yes, all our products are dermatologically tested and made from natural ingredients safe for newborns.",
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order through our website under the 'Order Tracking' section or contact our support team.",
    },
  ];

  return (
    <footer className="footerQ">
      <div className="faq">
        <h3>Frequently Asked Questions</h3>
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="question" onClick={() => toggleFAQ(index)}>
              {item.question}
            </div>
            <div className="answer">{item.answer}</div>
          </div>
        ))}
      </div>

    
    </footer>
  );
};

export default Footer;
